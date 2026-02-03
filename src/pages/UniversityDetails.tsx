import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Session } from '@supabase/supabase-js';
import Highlighter from '../components/common/Highlighter';

import { UniversityService } from '../services/universityService';
import { AcademicProgramService } from '../services/academicProgramService';
import { University } from '../components/university/UniversityCard';
import { AcademicProgram } from '../lib/supabase';
import { useSavedUniversities } from '../hooks/useSavedUniversities';
import { AdmissionRequirementService, UserRequirementChecklistItem } from '../services/admissionRequirementService';
import LoginPromptModal from '../components/common/LoginPromptModal';

import { supabase } from '../lib/supabase'; // Make sure supabase is imported
import { unslugify } from '../lib/utils';
import {
  ArrowLeft,
  Star,
  MapPin,
  Users,
  BookOpen,
  Calendar,
  Award,
  Phone,
  Mail,
  Globe,
  Heart,
  Share2,
  BarChart3,
  CheckCircle,
  Clock,
  TrendingUp,
  Building,
  ChevronDown
} from 'lucide-react';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string; label: string }[];
}

function TabNavigation({ activeTab, setActiveTab, tabs }: TabProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
      <style dangerouslySetInnerHTML={{
        __html: `
          .tab-navigation::-webkit-scrollbar {
            display: none;
          }
        `
      }} />
      <nav className="tab-navigation flex overflow-x-auto space-x-6 pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
              ? 'border-maroon-600 dark:border-maroon-400 text-maroon-600 dark:text-maroon-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

interface UniversityDetailsProps {
  session: Session | null;
}

export default function UniversityDetails({ session }: UniversityDetailsProps) {
  const navigate = useNavigate();
  const { acronym } = useParams<{ acronym: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [university, setUniversity] = useState<University | null>(null);
  const [academicPrograms, setAcademicPrograms] = useState<Record<string, AcademicProgram[]>>({});
  const [allPrograms, setAllPrograms] = useState<AcademicProgram[]>([]);
  const [overviewPrograms, setOverviewPrograms] = useState<AcademicProgram[]>([]);
  const [dynamicProgramCount, setDynamicProgramCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProgramsLoading, setIsProgramsLoading] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [expandedColleges, setExpandedColleges] = useState<Record<string, boolean>>({});
  const [expandedAmenities, setExpandedAmenities] = useState<Record<string, boolean>>({});
  const [userChecklistProgress, setUserChecklistProgress] = useState<Map<string, boolean>>(new Map());
  const [isUniversityTracked, setIsUniversityTracked] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [programLevelFilter, setProgramLevelFilter] = useState('All');

  const filteredAndGroupedPrograms = React.useMemo(() => {
    const filtered = allPrograms.filter(program => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const acronym = AcademicProgramService.generateAcronym(program.programName);
        const keywords = AcademicProgramService.generateSearchKeywords(program.programName, acronym);
        
        const matchesSearch = keywords.some(keyword => keyword.toLowerCase().includes(lowerCaseSearchTerm));
        const matchesLevel = programLevelFilter === 'All' || program.degreeLevel === programLevelFilter;
        
        return matchesSearch && matchesLevel;
    });

    const grouped: Record<string, AcademicProgram[]> = {};
    filtered.forEach(program => {
        if (!grouped[program.collegeName]) {
            grouped[program.collegeName] = [];
        }
        grouped[program.collegeName].push(program);
    });
    return grouped;
}, [allPrograms, searchTerm, programLevelFilter]);

  const degreeLevels = React.useMemo(() => {
    const levels = new Set(allPrograms.map(p => p.degreeLevel).filter(Boolean));
    return ['All', ...Array.from(levels)];
  }, [allPrograms]);
      
  const { isSaved, toggleSaved, isLoaded } = useSavedUniversities();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };
  
  // Handle sharing functionality
  const handleShare = async () => {
    if (!university) return;

    const url = window.location.href;
    const title = `${university.name} - University Details`;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out ${university.name} on our university platform!`,
          url,
        });
      } catch (error) {
        // User cancelled share or error occurred
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  };

  const handleSaveClick = () => {
    if (!session) {
      console.log('Showing login modal from handleSaveClick');
      setShowLoginModal(true);
    } else if (university) {
      toggleSaved(university.id);
    }
  };

  const handleCompare = () => {
    if (!session) {
      console.log('Showing login modal from handleCompare');
      setShowLoginModal(true);
      return;
    }

    if (!university) return;

    const compareList = JSON.parse(localStorage.getItem('compareUniversities') || '[]');
    const universityData = {
      id: university.id,
      name: university.name,
      imageUrl: university.imageUrl,
      type: university.type,
      location: university.location,
      programs: dynamicProgramCount || university.programs
    };

    // Check if university is already in compare list
    const existingIndex = compareList.findIndex((item: any) => item.id === university.id);

    if (existingIndex >= 0) {
      // Remove from compare list
      compareList.splice(existingIndex, 1);
    } else {
      // Add to compare list (max 3 universities)
      if (compareList.length >= 3) {
        alert('You can compare up to 3 universities at a time. Please remove one first.');
        return;
      }
      compareList.push(universityData);
    }

    localStorage.setItem('compareUniversities', JSON.stringify(compareList));

    // Navigate to compare page
    navigate('/compare');
  };

  const handleRequirementToggle = async (requirementText: string, isCompleted: boolean) => {
    if (!session?.user?.id || !university?.id) {
      console.log('Showing login modal from handleRequirementToggle');
      // If not logged in or university not loaded, prompt for login
      setShowLoginModal(true);
      return;
    }

    try {
      await AdmissionRequirementService.toggleRequirementCompletion(
        session.user.id,
        university.id,
        requirementText,
        isCompleted
      );
      // Update local state to reflect the change
      setUserChecklistProgress(prev => {
        const newState = new Map(prev);
        newState.set(requirementText, isCompleted);
        return newState;
      });
    } catch (error) {
      console.error('Failed to toggle requirement completion:', error);
      // Optionally, revert UI change or show error message
    }
  };

  const handleToggleUniversityTracking = async () => {
    if (!session?.user?.id || !university?.id || !university.admissionRequirements) {
      console.log('Showing login modal from handleToggleUniversityTracking');
      setShowLoginModal(true); // Prompt login if not logged in
      return;
    }

    try {
      if (isUniversityTracked) {
        // Stop tracking: delete all entries for this university
        await AdmissionRequirementService.untrackAllRequirements(
          session.user.id,
          university.id
        );
        // Clear local state
        setUserChecklistProgress(new Map());
        setIsUniversityTracked(false);
      } else {
        // Start tracking: insert all requirements
        // Filter out sub-headers before tracking
        const actualRequirements = university.admissionRequirements.filter(req =>
          !req.startsWith('GENERAL REQUIREMENTS') &&
          !req.startsWith('SPECIAL CATEGORIES') &&
          !req.startsWith('For ') &&
          !req.startsWith('Bachelor in ') &&
          !req.startsWith('Bachelor of ') &&
          req !== '(Allowed only for TUP graduates of specific programs if slots are available.)'
        );

        await AdmissionRequirementService.trackAllRequirements(
          session.user.id,
          university.id,
          actualRequirements
        );
        // After tracking, refetch the progress to update checkboxes
        const updatedProgress = await AdmissionRequirementService.getUserChecklistProgress(
          session.user.id,
          university.id
        );
        setUserChecklistProgress(updatedProgress);
        setIsUniversityTracked(true);
      }
    } catch (error) {
      console.error('Failed to toggle university tracking:', error);
      // Optionally, show an error message
    }
  };

  useEffect(() => {
    const fetchUniversity = async () => {
      if (!acronym) return;
  
      try {
        setIsLoading(true);
        const data = await UniversityService.getUniversityByAcronym_CaseInsensitive(acronym);
        setUniversity(data);
  
        if (data) {
          // Also fetch a few programs for the overview
          try {
            const programs = await AcademicProgramService.getProgramsByUniversityId(data.id);
            // Take first 6 programs for overview display
            const overviewPrograms = programs.slice(0, 6);
            setOverviewPrograms(overviewPrograms);
          } catch (error) {
            console.error('Failed to fetch overview programs:', error);
          }
        }
      } catch (error) {
        console.error('Failed to fetch university:', error);
        setUniversity(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUniversity();
  }, [name]);

  useEffect(() => {
    const fetchDynamicProgramCount = async () => {
      if (!university) return;

      try {
        const count = await AcademicProgramService.getProgramCount(university.id);
        setDynamicProgramCount(count);
      } catch (error) {
        console.error('Failed to fetch dynamic program count:', error);
        // Fall back to static count if dynamic fetch fails
        setDynamicProgramCount(university.programs || 0);
      }
    };

    fetchDynamicProgramCount();
  }, [university]);

  useEffect(() => {
    const fetchAcademicPrograms = async () => {
      if (!university || activeTab !== 'academic-programs' || allPrograms.length > 0) return;

      try {
        setIsProgramsLoading(true);
        const programs = await AcademicProgramService.getProgramsByUniversityId(university.id);
        setAllPrograms(programs);

        // Group programs by college for initial display
        const grouped: Record<string, AcademicProgram[]> = {};
        programs.forEach(program => {
          if (!grouped[program.collegeName]) {
            grouped[program.collegeName] = [];
          }
          grouped[program.collegeName].push(program);
        });
        setAcademicPrograms(grouped);
      } catch (error) {
        console.error('Failed to fetch academic programs:', error);
      } finally {
        setIsProgramsLoading(false);
      }
    };

    fetchAcademicPrograms();
  }, [university, activeTab, allPrograms]);

  // Group programs by college
  useEffect(() => {
    if (allPrograms.length === 0) return;

    const grouped: Record<string, AcademicProgram[]> = {};
    allPrograms.forEach(program => {
      if (!grouped[program.collegeName]) {
        grouped[program.collegeName] = [];
      }
      grouped[program.collegeName].push(program);
    });
    setAcademicPrograms(grouped);
  }, [allPrograms]);

  // Fetch user's admission requirement checklist progress
  useEffect(() => {
    const fetchUserChecklist = async () => {
      if (session?.user?.id && university?.id && activeTab === 'admissions') {
        try {
          const progress = await AdmissionRequirementService.getUserChecklistProgress(
            session.user.id,
            university.id
          );
          setUserChecklistProgress(progress);
        } catch (error) {
          console.error('Failed to fetch user checklist progress:', error);
          // Optionally, show a toast or message to the user
        }
      }
    };

    fetchUserChecklist();
  }, [session?.user?.id, university?.id, activeTab]);

  // Check if this university's requirements are being tracked
  useEffect(() => {
    const checkTrackingStatus = async () => {
      if (session?.user?.id && university?.id) {
        try {
          const tracked = await AdmissionRequirementService.isUniversityBeingTracked(
            session.user.id,
            university.id
          );
          setIsUniversityTracked(tracked);
        } catch (error) {
          console.error('Failed to check university tracking status:', error);
        }
      } else {
        setIsUniversityTracked(false); // Not tracked if not logged in or no university
      }
    };

    checkTrackingStatus();
  }, [session?.user?.id, university?.id]); // Runs when session or university changes


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon-800"></div>
          <p className="text-gray-600">Loading university details...</p>
        </div>
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">University Not Found</h2>
          <Link to="/universities" className="text-maroon-600 hover:text-maroon-700">
            ← Back to Universities
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'academic-programs', label: 'Academic Programs' },
    { id: 'academics', label: 'Academics' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'contact', label: 'Contact' }
  ];

  const hasContactInfo = university.website || university.phone || university.email || university.address;
  const mapLocation = university.mapLocation;
  const hasGalleryImages = university.galleryImages && university.galleryImages.length > 0;

  const mapClass = isExpanded ? 'h-[500px]' : 'h-64';

  // Function to group admission requirements by categories
  const groupAdmissionRequirements = (requirements: string[]) => {
    const grouped: Record<string, string[]> = {};
    let currentCategory = 'General';

    requirements.forEach((requirement) => {
      // Check if this is a main category header
      if (requirement === 'GENERAL REQUIREMENTS' || requirement === 'SPECIAL CATEGORIES') {
        currentCategory = requirement;
        grouped[currentCategory] = [];
      }
      // Check if this is a subcategory header
      else if (requirement.startsWith('For ') || requirement.startsWith('Bachelor in ') || requirement.startsWith('Bachelor of ')) {
        if (!grouped[currentCategory]) {
          grouped[currentCategory] = [];
        }
        grouped[currentCategory].push(requirement);
      }
      // Otherwise it's a requirement item
      else {
        if (!grouped[currentCategory]) {
          grouped[currentCategory] = [];
        }
        grouped[currentCategory].push(requirement);
      }
    });

    return grouped;
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const toggleCollege = (collegeName: string) => {
    setExpandedColleges(prev => ({
      ...prev,
      [collegeName]: !prev[collegeName]
    }));
  };

  const toggleAmenity = (sectionName: string) => {
    setExpandedAmenities(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {showLoginModal && <LoginPromptModal onClose={() => setShowLoginModal(false)} />}
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/universities"
            className="inline-flex items-center text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Universities
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 mr-4">{university.name}</h1>
                <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${university.type === 'Public' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                  university.type === 'State' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                    'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                  }`}>
                  {university.type}
                </span>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{university.address || 'Address not available'}</span>
              </div>

              <div className="flex items-center space-x-4 text-sm sm:text-base">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{university.students} students</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <span>{dynamicProgramCount !== null ? dynamicProgramCount : university.programs} programs</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Est. {university.established}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start space-x-2 mt-4 lg:mt-0">
              <button
                onClick={handleSaveClick}
                disabled={!isLoaded}
                className={`flex items-center px-3 py-1.5 text-xs sm:text-sm border rounded-lg transition-colors ${
                  isSaved(university.id)
                    ? 'bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300 border-red-200 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900'
                    : 'text-maroon-700 dark:text-maroon-400 border-maroon-200 dark:border-maroon-700 hover:bg-maroon-50 dark:hover:bg-maroon-950'
                } ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Heart className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${isSaved(university.id) ? 'fill-current' : ''}`} />
                {isSaved(university.id) ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={handleCompare}
                className="flex items-center px-3 py-1.5 text-xs sm:text-sm text-maroon-700 dark:text-maroon-400 border-maroon-200 dark:border-maroon-700 rounded-lg hover:bg-maroon-50 dark:hover:bg-maroon-950 transition-colors"
              >
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Compare
              </button>
              <button
                onClick={handleShare}
                className="flex items-center px-3 py-1.5 text-xs sm:text-sm text-maroon-700 dark:text-maroon-400 border-maroon-200 dark:border-maroon-700 rounded-lg hover:bg-maroon-50 dark:hover:bg-maroon-950 transition-colors"
              >
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Share
              </button>
              {showShareToast && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-3 py-1.5 text-sm rounded-lg shadow-lg">
                  Link copied to clipboard!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {hasGalleryImages && (
        <div className="bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
              <div className="lg:col-span-3">
                <img
                  src={university.galleryImages?.[selectedImage] || university.imageUrl}
                  alt={university.name}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl"
                />
              </div>
              <div className="grid grid-cols-4 lg:grid-cols-1 gap-2">
                {university.galleryImages?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-16 sm:h-20 lg:h-24 rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-maroon-600 dark:ring-maroon-400' : ''
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${university.name} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <TabNavigation activeTab={activeTab} setActiveTab={handleTabChange} tabs={tabs} />

        {activeTab === 'overview' && (
          <div className="max-w-7xl mx-auto space-y-8">
            {university.longDescription && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">About {university.name}</h2>
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-relaxed">{university.longDescription}</p>
                </div>
              </div>
            )}

            {(university.accreditation?.length > 0 || (university.achievements && university.achievements.length > 0) || (university.quickfacts && university.quickfacts.length > 0)) && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Key Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {university.accreditation && university.accreditation.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-50 mb-3 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-yellow-500" />
                        Accreditation
                      </h3>
                      <ul className="space-y-2">
                        {university.accreditation.map((item, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                            <span className="mr-2 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {university.achievements && university.achievements.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-50 mb-3 flex items-center">
                        <Star className="h-5 w-5 mr-2 text-yellow-500" />
                        Achievements
                      </h3>
                      <ul className="space-y-2">
                        {university.achievements.map((item, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                            <span className="mr-2 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {university.quickfacts && university.quickfacts.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-50 mb-3 flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-yellow-500" />
                        Quick Facts
                      </h3>
                      <ul className="space-y-2">
                        {university.quickfacts.map((item, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                            <span className="mr-2 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {university.rankings?.source && university.rankings?.details && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-4">Rankings</h2>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-50">{university.rankings.source}</h3>
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {university.rankings.details.split('. ').map((sentence, index) => (
                      <p key={index} className="mb-1 last:mb-0">{sentence}{sentence.endsWith('.') ? '' : '.'}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {overviewPrograms.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">Popular Programs</h2>
                  <button
                    onClick={() => handleTabChange('academic-programs')}
                    className="px-4 py-2 bg-maroon-800 dark:bg-maroon-700 text-white text-sm rounded-lg hover:bg-maroon-700 dark:hover:bg-maroon-600 transition-colors font-medium"
                  >
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {overviewPrograms.map((program) => (
                    <div key={program.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-maroon-200 dark:hover:border-maroon-500 hover:shadow-md transition-all duration-200">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-50">{program.programName}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{program.collegeName}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'academic-programs' && (
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">Academic Programs</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">Explore our comprehensive range of degree programs</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder="Search for a program..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-maroon-500 dark:focus:ring-maroon-400 focus:border-maroon-500 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-400 transition-all shadow-sm hover:shadow-md"
                  />
                </div>
                <div>
                  <select
                    value={programLevelFilter}
                    onChange={(e) => setProgramLevelFilter(e.target.value)}
                    className="w-full px-5 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-maroon-500 dark:focus:ring-maroon-400 focus:border-maroon-500 dark:bg-gray-800 dark:text-gray-50 transition-all shadow-sm hover:shadow-md font-medium"
                  >
                    {degreeLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {isProgramsLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-maroon-600 dark:border-maroon-400"></div>
                <span className="ml-4 text-gray-600 dark:text-gray-400 text-lg font-medium">Loading academic programs...</span>
              </div>
            ) : Object.keys(filteredAndGroupedPrograms).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(filteredAndGroupedPrograms).map(([collegeName, programs]) => (
                  <div key={collegeName} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-maroon-100 dark:border-maroon-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="px-4 py-3 bg-gradient-to-r from-maroon-800 to-maroon-700 dark:from-maroon-900 dark:to-maroon-800 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 opacity-10 rounded-full -mr-16 -mt-16"></div>
                      <div className="relative">
                        <h3 className="text-base sm:text-lg font-bold text-white flex items-center">
                          <BookOpen className="h-5 w-5 mr-2 text-yellow-400" />
                          {collegeName}
                        </h3>
                        <div className="flex items-center mt-2">
                          <span className="px-3 py-1 bg-yellow-400 text-maroon-900 rounded-full text-xs font-bold">
                            {programs.length} program{programs.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {programs.map((program) => (
                        <div key={program.id} className="p-3 sm:p-4 hover:bg-maroon-50/50 dark:hover:bg-maroon-950/30 transition-all duration-200 group">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex-1 mb-3 sm:mb-0">
                              <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-50 leading-tight group-hover:text-maroon-700 dark:group-hover:text-maroon-300 transition-colors">
                                <Highlighter text={program.programName} highlight={searchTerm} />
                              </h4>
                              {program.specializations && program.specializations.length > 0 && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex items-start">
                                  <span className="font-semibold text-maroon-700 dark:text-maroon-400 mr-2">Specializations:</span>
                                  <span>{program.specializations.join(', ')}</span>
                                </p>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2 sm:ml-6 mt-2 sm:mt-0">
                              {program.degreeLevel && (
                                <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-maroon-100 dark:bg-maroon-900 text-maroon-800 dark:text-maroon-200 border-2 border-maroon-200 dark:border-maroon-800 shadow-sm">
                                  {program.degreeLevel}
                                </span>
                              )}
                              {program.programType && (
                                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 shadow-sm ${
                                  program.programType === 'undergraduate' ? 'bg-maroon-50 dark:bg-maroon-950 text-maroon-700 dark:text-maroon-300 border-maroon-200 dark:border-maroon-800' :
                                  program.programType === 'graduate' ? 'bg-maroon-200 dark:bg-maroon-800 text-maroon-900 dark:text-maroon-100 border-maroon-300 dark:border-maroon-700' :
                                  'bg-maroon-100 dark:bg-maroon-900 text-maroon-800 dark:text-maroon-200 border-maroon-300 dark:border-maroon-700'
                                }`}>
                                  {program.programType}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700">
                <div className="bg-maroon-100 dark:bg-maroon-900 mb-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-lg">
                  <BookOpen className="h-10 w-10 text-maroon-600 dark:text-maroon-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-3">No matching programs found</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto leading-relaxed">
                  Try adjusting your search term or filter to find the program you're looking for.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'academics' && (
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-3">Academic & Campus Life</h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
                Key dates, facilities, and amenities available at {university.name}.
              </p>
            </div>

            {university.academicCalendar && (
              <div className="bg-gradient-to-br from-maroon-50 to-white dark:from-maroon-950 dark:to-gray-900 p-6 sm:p-8 rounded-2xl border-2 border-maroon-200 dark:border-maroon-800 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-maroon-900 dark:text-maroon-100 mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-maroon-700 dark:text-maroon-300" />
                  Academic Calendar
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-maroon-200 dark:border-maroon-700 shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Semester Start</p>
                    <p className="text-xl sm:text-2xl font-bold text-maroon-800 dark:text-maroon-300 mt-2">{university.academicCalendar.semesterStart || 'TBA'}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-maroon-200 dark:border-maroon-700 shadow-md hover:shadow-lg transition-shadow">
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">Semester End</p>
                    <p className="text-xl sm:text-2xl font-bold text-maroon-800 dark:text-maroon-300 mt-2">{university.academicCalendar.semesterEnd || 'TBA'}</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-6 rounded-xl border-2 border-yellow-600 shadow-md hover:shadow-xl transition-all transform hover:scale-105">
                    <p className="text-sm font-bold text-maroon-900 uppercase tracking-wide mb-2">Application Deadline</p>
                    <p className="text-xl sm:text-2xl font-bold text-maroon-900 mt-2">{university.academicCalendar.applicationDeadline || 'TBA'}</p>
                  </div>
                </div>
              </div>
            )}

            {university.facilities && university.facilities.length > 0 && (
              <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 flex items-center">
                  <Building className="h-6 w-6 mr-3 text-maroon-700 dark:text-maroon-300" />
                  Campus Facilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {university.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center bg-gradient-to-r from-maroon-50 to-white dark:from-maroon-950 dark:to-gray-800 p-4 rounded-xl border-l-4 border-maroon-600 dark:border-maroon-400 shadow-sm hover:shadow-md transition-all hover:translate-x-1">
                      <div className="bg-maroon-100 dark:bg-maroon-900 p-2 rounded-lg mr-3">
                        <Building className="h-5 w-5 text-maroon-700 dark:text-maroon-300" />
                      </div>
                      <span className="text-sm text-gray-800 dark:text-gray-50 font-semibold">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {university.amenities && university.amenities.length > 0 && (
              <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 text-maroon-700 dark:text-maroon-300" />
                  Campus Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {university.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center bg-gradient-to-r from-green-50 to-white dark:from-green-950 dark:to-gray-800 p-4 rounded-xl border-l-4 border-green-500 dark:border-green-400 shadow-sm hover:shadow-md transition-all hover:translate-x-1">
                      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
                        <CheckCircle className="h-5 w-5 text-green-700 dark:text-green-300" />
                      </div>
                      <span className="text-sm text-gray-800 dark:text-gray-50 font-semibold">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(!university.academicCalendar && (!university.facilities || university.facilities.length === 0)) && (
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-12 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-center shadow-lg">
                <div className="bg-maroon-100 dark:bg-maroon-900 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-10 w-10 text-maroon-600 dark:text-maroon-300" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-50 mb-2">More Information Coming Soon</h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">Detailed academic and campus life information is being prepared.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'admissions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {university.admissionRequirements && university.admissionRequirements.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 flex items-center">
                      <div className="bg-maroon-100 dark:bg-maroon-900 p-2 rounded-lg mr-3">
                        <CheckCircle className="h-6 w-6 text-maroon-700 dark:text-maroon-300" />
                      </div>
                      Admission Requirements
                    </h2>
                    {session && university.admissionRequirements && university.admissionRequirements.length > 0 && (
                      <button
                        onClick={handleToggleUniversityTracking}
                        className={`flex items-center px-4 py-2 text-xs sm:text-sm border-2 rounded-xl transition-all shadow-md hover:shadow-lg font-bold ${
                          isUniversityTracked
                            ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900'
                            : 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900'
                        }`}
                      >
                        {isUniversityTracked ? 'Stop Tracking' : 'Track Requirements'}
                        <Star className={`h-4 w-4 ml-2 ${isUniversityTracked ? 'fill-current text-red-500' : 'text-green-500'}`} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    {(() => {
                      const groupedRequirements = groupAdmissionRequirements(university.admissionRequirements);
                      return Object.entries(groupedRequirements).map(([category, requirements]) => (
                        <div key={category} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-maroon-200 dark:border-maroon-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                          <button
                            onClick={() => toggleCategory(category)}
                            className="w-full px-5 py-4 text-left flex items-center justify-between bg-gradient-to-r from-maroon-700 to-maroon-600 dark:from-maroon-900 dark:to-maroon-800 hover:from-maroon-600 hover:to-maroon-500 dark:hover:from-maroon-800 dark:hover:to-maroon-700 transition-all group"
                          >
                            <span className="text-sm sm:text-base font-bold text-white flex items-center">
                              <div className="bg-yellow-400 p-1.5 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                                <Award className="h-4 w-4 text-maroon-900" />
                              </div>
                              {category}
                            </span>
                            <ChevronDown
                              className={`h-5 w-5 text-yellow-400 transition-transform duration-200 ${
                                expandedCategories[category] ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {expandedCategories[category] && (
                            <div className="px-5 py-4 border-t-2 border-maroon-100 dark:border-maroon-900">
                              <div className="space-y-3">
                                {requirements.map((requirement, index) => {
                                  // Check if this is a subcategory header
                                  const isSubHeader = requirement.startsWith('For ') ||
                                                    requirement.startsWith('Bachelor in ') ||
                                                    requirement.startsWith('Bachelor of ') ||
                                                    requirement === '(Allowed only for TUP graduates of specific programs if slots are available.)';

                                  if (isSubHeader) {
                                    return (
                                      <div key={index} className="font-bold text-maroon-800 dark:text-maroon-200 text-xs sm:text-sm border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 pl-4 py-2 rounded-r-lg mt-2 font-bold">
                                        {requirement}
                                      </div>
                                    );
                                  }

                                  return (
                                    <div key={index} className="flex items-start bg-white dark:bg-gray-800 p-3 rounded-lg hover:bg-maroon-50 dark:hover:bg-maroon-950/30 transition-colors border border-gray-200 dark:border-gray-700">
                                      {session ? (
                                        <input
                                          type="checkbox"
                                          checked={userChecklistProgress.get(requirement) || false}
                                          onChange={(e) => handleRequirementToggle(requirement, e.target.checked)}
                                          className="form-checkbox h-5 w-5 text-green-600 rounded-md focus:ring-2 focus:ring-green-500 border-2 border-gray-300 cursor-pointer mt-0.5"
                                        />
                                      ) : (
                                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                      )}
                                      <span className={`text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed ml-3 ${userChecklistProgress.get(requirement) && session ? 'line-through text-gray-500 dark:text-gray-600' : ''}`}>
                                        {requirement}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              )}

            </div>
            <div className="space-y-6">
              {university.applicationProcess && university.applicationProcess.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6 flex items-center">
                    <div className="bg-maroon-100 dark:bg-maroon-900 p-2 rounded-lg mr-3">
                      <Clock className="h-6 w-6 text-maroon-700 dark:text-maroon-300" />
                    </div>
                    Application Process
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-maroon-200 dark:border-maroon-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all">
                      <button
                        onClick={() => toggleCategory('application-process')}
                        className="w-full px-5 py-4 text-left flex items-center justify-between bg-gradient-to-r from-maroon-700 to-maroon-600 dark:from-maroon-900 dark:to-maroon-800 hover:from-maroon-600 hover:to-maroon-500 dark:hover:from-maroon-800 dark:hover:to-maroon-700 transition-all group"
                      >
                        <span className="text-sm sm:text-base font-bold text-white flex items-center">
                          <div className="bg-yellow-400 p-1.5 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                            <Clock className="h-4 w-4 text-maroon-900" />
                          </div>
                          Complete Application Process
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 text-yellow-400 transition-transform duration-200 ${
                            expandedCategories['application-process'] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {expandedCategories['application-process'] && (
                          <div className="px-5 py-4 border-t-2 border-maroon-100 dark:border-maroon-900">
                            <div className="space-y-3">
                              {university.applicationProcess.map((step, index) => (
                                <div key={index} className="flex items-start bg-white dark:bg-gray-800 p-4 rounded-lg hover:bg-maroon-50 dark:hover:bg-maroon-950/30 transition-colors border-l-4 border-green-500 dark:border-green-400 shadow-sm">
                                  <div className="bg-green-100 dark:bg-green-900 p-1.5 rounded-lg mr-3 flex-shrink-0">
                                    <CheckCircle className="h-5 w-5 text-green-700 dark:text-green-300" />
                                  </div>
                                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line flex-1 font-medium">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}



        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hasContactInfo ? (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Contact Information</h2>
                <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-maroon-600 dark:text-maroon-400 mr-2 shrink-0" />
                    <div>
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-50">Address</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{university.address || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-maroon-600 dark:text-maroon-400 mr-2 shrink-0" />
                    <div>
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-50">Phone</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{university.phone || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-maroon-600 dark:text-maroon-400 mr-2 shrink-0" />
                    <div>
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-50">Email</div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{university.email || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-maroon-600 dark:text-maroon-400 mr-2 shrink-0" />
                    <div>
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-50">Website</div>
                      <a href={university.website} className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 text-xs sm:text-sm">
                        {university.website || 'N/A'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {mapLocation && mapLocation.lat && mapLocation.lng ? (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Location Map</h2>
                <div className={`rounded-xl overflow-hidden ${mapClass}`}>
                  <MapContainer
                    center={[mapLocation.lat, mapLocation.lng]}
                    zoom={16}
                    scrollWheelZoom={false}
                    style={{ height: '100%', width: '100%' }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[mapLocation.lat, mapLocation.lng]}>
                      <Popup>{university.name}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
                <button
                  className="mt-3 px-3 py-1.5 text-sm bg-maroon-600 dark:bg-maroon-700 text-white rounded-md hover:bg-maroon-700 dark:hover:bg-maroon-600 transition-colors"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Collapse Map' : 'Expand Map'}
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">Location Map</h2>
                <div className="h-48 sm:h-64 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 text-sm">
                  📍 Location data not available
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}