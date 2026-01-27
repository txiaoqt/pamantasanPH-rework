import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Session } from '@supabase/supabase-js';

import { UniversityService } from '../services/universityService';
import { AcademicProgramService } from '../services/academicProgramService';
import { University } from '../components/university/UniversityCard';
import { AcademicProgram } from '../lib/supabase';
import { useSavedUniversities } from '../hooks/useSavedUniversities';
import LoginPromptModal from '../components/common/LoginPromptModal';

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
    <div className="border-b border-gray-200 mb-6">
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
              ? 'border-maroon-600 text-maroon-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
  const { id } = useParams<{ id: string }>();
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

  const { isSaved, toggleSaved, isLoaded } = useSavedUniversities();

  const handleTabChange = (tabId: string) => {
    const protectedTabs = ['academic-programs', 'academics', 'admissions', 'contact'];
    if (protectedTabs.includes(tabId) && !session) {
      setShowLoginModal(true);
    } else {
      setActiveTab(tabId);
    }
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

  // Handle comparison functionality
  const handleCompare = () => {
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

  useEffect(() => {
    const fetchUniversity = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const data = await UniversityService.getUniversityById(parseInt(id));
        setUniversity(data);

        // Also fetch a few programs for the overview
        try {
          const programs = await AcademicProgramService.getProgramsByUniversityId(parseInt(id));
          // Take first 6 programs for overview display
          const overviewPrograms = programs.slice(0, 6);
          setOverviewPrograms(overviewPrograms);
        } catch (error) {
          console.error('Failed to fetch overview programs:', error);
        }
      } catch (error) {
        console.error('Failed to fetch university:', error);
        setUniversity(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversity();
  }, [id]);

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
    <div className="min-h-screen bg-gray-50">
      {showLoginModal && <LoginPromptModal onClose={() => setShowLoginModal(false)} />}
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/universities"
            className="inline-flex items-center text-maroon-600 hover:text-maroon-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Universities
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mr-4">{university.name}</h1>
                <span className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${university.type === 'Public' ? 'bg-blue-100 text-blue-800' :
                  university.type === 'State' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                  {university.type}
                </span>
              </div>

              <div className="flex items-center text-gray-600 mb-4 text-sm sm:text-base">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{university.address || 'Address not available'}</span>
              </div>

              <div className="flex items-center space-x-4 text-sm sm:text-base">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{university.students} students</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{dynamicProgramCount !== null ? dynamicProgramCount : university.programs} programs</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Est. {university.established}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start space-x-2 mt-4 lg:mt-0">
              <button
                onClick={() => toggleSaved(university.id)}
                disabled={!isLoaded}
                className={`flex items-center px-3 py-1.5 text-xs sm:text-sm border rounded-lg transition-colors ${
                  isSaved(university.id)
                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                    : 'text-maroon-700 border-maroon-200 hover:bg-maroon-50'
                } ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Heart className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${isSaved(university.id) ? 'fill-current' : ''}`} />
                {isSaved(university.id) ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={handleCompare}
                className="flex items-center px-3 py-1.5 text-xs sm:text-sm text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-colors"
              >
                <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Compare
              </button>
              <button
                onClick={handleShare}
                className="flex items-center px-3 py-1.5 text-xs sm:text-sm text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-colors"
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
        <div className="bg-white">
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
                    className={`relative h-16 sm:h-20 lg:h-24 rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-maroon-600' : ''
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-8">
              {university.longDescription && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">About {university.name}</h2>
                  <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{university.longDescription}</p>
                  </div>
                </div>
              )}
              {university.rankings?.source && university.rankings?.details && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Edurank 2025 & QS Asia 2026</h3>
                  <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                    <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {university.rankings.details.split('. ').map((sentence, index) => (
                        <p key={index} className="mb-1 last:mb-0">{sentence}{sentence.endsWith('.') ? '' : '.'}</p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {overviewPrograms.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Academic Programs</h3>
                    <button
                      onClick={() => handleTabChange('academic-programs')}
                      className="px-3 py-1.5 bg-indigo-600 text-white text-xs sm:text-sm rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      View All Programs
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {overviewPrograms.slice(0, 6).map((program) => (
                      <div key={program.id} className="bg-white p-3 rounded-lg border border-gray-200 hover:border-indigo-200 hover:shadow-sm transition-all duration-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 leading-tight mb-0.5">
                              {program.programName}
                            </h4>
                            <p className="text-xs text-gray-600">{program.collegeName}</p>
                          </div>
                          {program.programType && (
                            <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                              program.programType === 'undergraduate' ? 'bg-emerald-100 text-emerald-800' :
                              program.programType === 'graduate' ? 'bg-violet-100 text-violet-800' :
                              program.programType === 'diploma' ? 'bg-amber-100 text-amber-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {program.programType}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-6">

              {university.accreditation && university.accreditation.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Accreditation</h3>
                  <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                    <div className="space-y-2">
                      {university.accreditation.map((acc, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-maroon-600 mr-2 mt-0.5">•</span>
                          <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{acc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {university.achievements && university.achievements.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Achievements & Recognition</h3>
                  <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                    <div className="space-y-2">
                      {university.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-maroon-600 mr-2 mt-0.5">•</span>
                          <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {university.quickfacts && university.quickfacts.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Quick Facts</h3>
                  <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200">
                    <div className="space-y-2">
                      {university.quickfacts.map((fact, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-maroon-600 mr-2 mt-0.5">•</span>
                          <span className="text-sm sm:text-base text-gray-700 leading-relaxed">{fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'academic-programs' && (
          <div className="max-w-7xl mx-auto">
            {isProgramsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                <span className="ml-3 text-gray-600 text-base">Loading academic programs...</span>
              </div>
            ) : Object.keys(academicPrograms).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(academicPrograms).map(([collegeName, programs], index) => {
                    const colors = [
                      'from-blue-50 to-indigo-50 border-blue-200',
                      'from-emerald-50 to-teal-50 border-emerald-200',
                      'from-violet-50 to-purple-50 border-violet-200',
                      'from-amber-50 to-orange-50 border-amber-200',
                      'from-rose-50 to-pink-50 border-rose-200',
                      'from-cyan-50 to-sky-50 border-cyan-200'
                    ];
                    const colorClass = colors[index % colors.length];

                    return (
                      <div key={collegeName} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleCollege(collegeName)}
                          className={`w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors ${colorClass.replace('border-', 'border-l-4 ')}`}
                        >
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">{collegeName}</h3>
                            <p className="text-gray-600 mt-1 text-sm">{programs.length} program{programs.length !== 1 ? 's' : ''}</p>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 text-gray-500 transition-transform ${
                              expandedColleges[collegeName] ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expandedColleges[collegeName] && (
                          <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 pt-4 sm:pt-6">
                              {programs.map((program) => (
                                <div key={program.id} className="bg-white p-3 rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 group">
                                  <div className="space-y-2">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-gray-900 leading-tight mb-0.5 group-hover:text-indigo-700 transition-colors">
                                          {program.programName}
                                        </h4>
                                        {program.degreeLevel && (
                                          <p className="text-xs text-gray-600 mb-1">{program.degreeLevel}</p>
                                        )}
                                      </div>
                                      {program.programType && (
                                        <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium border ${
                                          program.programType === 'undergraduate' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                                          program.programType === 'graduate' ? 'bg-violet-100 text-violet-800 border-violet-300' :
                                          program.programType === 'diploma' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                                          'bg-gray-100 text-gray-800 border-gray-300'
                                        }`}>
                                          {program.programType}
                                        </span>
                                      )}
                                    </div>

                                    {program.specializations && program.specializations.length > 0 && (
                                      <div className="space-y-1">
                                        <p className="text-xs font-medium text-gray-700">Specializations</p>
                                        <div className="flex flex-wrap gap-1">
                                          {program.specializations.map((spec, index) => (
                                            <span key={index} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 text-xs rounded-lg border border-slate-300 hover:bg-slate-200 transition-colors">
                                              {spec}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-indigo-100 mb-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-light text-gray-900 mb-3">Programs Coming Soon</h3>
                <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto leading-relaxed">
                  We're organizing detailed program information for {university.name}.
                  Check back soon for the complete academic offerings.
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-indigo-100 border border-indigo-300 rounded-xl">
                  <p className="text-xs text-indigo-800 font-medium">
                    Program details are being enhanced for better clarity
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'academics' && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Academic & Campus Life</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                Academic calendar, campus amenities, and campus facilities available at {university.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                {university.academicCalendar && university.academicCalendar.semesterStart && university.academicCalendar.semesterEnd && university.academicCalendar.applicationDeadline && (
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Academic Calendar</h2>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-maroon-600 mr-3" />
                            <span className="text-sm text-gray-900 font-medium">Semester Start</span>
                          </div>
                          <span className="text-base font-semibold text-maroon-600">{university.academicCalendar.semesterStart}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-maroon-600 mr-3" />
                            <span className="text-sm text-gray-900 font-medium">Semester End</span>
                          </div>
                          <span className="text-base font-semibold text-maroon-600">{university.academicCalendar.semesterEnd}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-maroon-50 rounded-lg">
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-maroon-600 mr-3" />
                            <span className="text-sm text-gray-900 font-medium">Application Deadline</span>
                          </div>
                          <span className="text-base font-semibold text-maroon-600">{university.academicCalendar.applicationDeadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {university.amenities && university.amenities.length > 0 && (
                  <div>
                    {/* Always expanded on desktop, collapsible on mobile */}
                    <div className="hidden lg:block">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Campus Amenities</h3>
                      <div className="space-y-2">
                        {university.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center bg-white p-3 rounded-lg border border-gray-200">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-3" />
                            <span className="text-sm sm:text-base text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Collapsible on mobile */}
                    <div className="lg:hidden">
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleAmenity('amenities')}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="text-base sm:text-lg font-bold text-gray-900">Campus Amenities</h3>
                          <ChevronDown
                            className={`h-4 w-4 text-gray-500 transition-transform ${
                              expandedAmenities['amenities'] ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expandedAmenities['amenities'] && (
                          <div className="px-4 pb-3 border-t border-gray-100">
                            <div className="space-y-2 pt-3">
                              {university.amenities.map((amenity, index) => (
                                <div key={index} className="flex items-center bg-gray-50 p-2 rounded-lg border border-gray-100">
                                  <CheckCircle className="h-3.5 w-3.5 text-green-600 mr-2" />
                                  <span className="text-xs sm:text-sm text-gray-700">{amenity}</span>
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

              <div className="space-y-6">
                {university.facilities && university.facilities.length > 0 && (
                  <div>
                    {/* Always expanded on desktop, collapsible on mobile */}
                    <div className="hidden lg:block">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Campus Facilities</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {university.facilities.map((facility, index) => (
                          <div key={index} className="flex items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center">
                              <Building className="h-5 w-5 text-maroon-600 mr-3 flex-shrink-0" />
                              <span className="text-sm sm:text-base text-gray-900 font-medium">{facility}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Collapsible on mobile */}
                    <div className="lg:hidden">
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleAmenity('facilities')}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="text-base sm:text-lg font-bold text-gray-900">Campus Facilities</h3>
                          <ChevronDown
                            className={`h-4 w-4 text-gray-500 transition-transform ${
                              expandedAmenities['facilities'] ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {expandedAmenities['facilities'] && (
                          <div className="px-4 pb-3 border-t border-gray-100">
                            <div className="space-y-2 pt-3">
                              {university.facilities.map((facility, index) => (
                                <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                  <Building className="h-3.5 w-3.5 text-maroon-600 mr-2 flex-shrink-0" />
                                  <span className="text-xs sm:text-sm text-gray-900 font-medium">{facility}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {(!university.academicCalendar?.semesterStart || !university.facilities || university.facilities.length === 0) && (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                    <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600">Additional academic and campus information will be displayed here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admissions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              {university.admissionRequirements && university.admissionRequirements.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Admission Requirements</h2>
                  <div className="space-y-3">
                    {(() => {
                      const groupedRequirements = groupAdmissionRequirements(university.admissionRequirements);
                      return Object.entries(groupedRequirements).map(([category, requirements]) => (
                        <div key={category} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleCategory(category)}
                            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-base sm:text-lg font-semibold text-gray-900">{category}</span>
                            <ChevronDown
                              className={`h-4 w-4 text-gray-500 transition-transform ${
                                expandedCategories[category] ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {expandedCategories[category] && (
                            <div className="px-4 pb-3 border-t border-gray-100">
                              <div className="space-y-2 pt-3">
                                {requirements.map((requirement, index) => {
                                  // Check if this is a subcategory header
                                  const isSubHeader = requirement.startsWith('For ') ||
                                                    requirement.startsWith('Bachelor in ') ||
                                                    requirement.startsWith('Bachelor of ') ||
                                                    requirement === '(Allowed only for TUP graduates of specific programs if slots are available.)';

                                  if (isSubHeader) {
                                    return (
                                      <div key={index} className="font-medium text-maroon-700 text-xs sm:text-sm border-l-2 border-maroon-200 pl-2 py-1">
                                        {requirement}
                                      </div>
                                    );
                                  }

                                  return (
                                    <div key={index} className="flex items-start">
                                      <CheckCircle className="h-3.5 w-3.5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                      <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">{requirement}</span>
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
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Application Process</h2>
                  <div className="space-y-3">
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleCategory('application-process')}
                        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-base sm:text-lg font-semibold text-gray-900">Complete Application Process</span>
                        <ChevronDown
                          className={`h-4 w-4 text-gray-500 transition-transform ${
                            expandedCategories['application-process'] ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {expandedCategories['application-process'] && (
                          <div className="px-4 pb-3 border-t border-gray-100">
                            <div className="space-y-2 pt-3">
                              {university.applicationProcess.map((step, index) => (
                                <div key={index} className="flex items-start">
                                  <CheckCircle className="h-3.5 w-3.5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line flex-1">{step}</span>
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
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200 space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-maroon-600 mr-2 shrink-0" />
                    <div>
                      <div className="font-medium text-sm text-gray-900">Address</div>
                      <div className="text-xs sm:text-sm text-gray-600">{university.address || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-maroon-600 mr-2 shrink-0" />
                    <div>
                      <div className="font-medium text-sm text-gray-900">Phone</div>
                      <div className="text-xs sm:text-sm text-gray-600">{university.phone || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-maroon-600 mr-2 shrink-0" />
                    <div>
                      <div className="font-medium text-sm text-gray-900">Email</div>
                      <div className="text-xs sm:text-sm text-gray-600">{university.email || 'N/A'}</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 text-maroon-600 mr-2 shrink-0" />
                    <div>
                      <div className="font-medium text-sm text-gray-900">Website</div>
                      <a href={university.website} className="text-maroon-600 hover:text-maroon-700 text-xs sm:text-sm">
                        {university.website || 'N/A'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {mapLocation && mapLocation.lat && mapLocation.lng ? (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Location Map</h2>
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
                  className="mt-3 px-3 py-1.5 text-sm bg-maroon-600 text-white rounded-md hover:bg-maroon-700 transition-colors"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Collapse Map' : 'Expand Map'}
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Location Map</h2>
                <div className="h-48 sm:h-64 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 border border-gray-200 text-sm">
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