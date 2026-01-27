import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for potential redirection after untracking
import { Session } from '@supabase/supabase-js';
import { AdmissionRequirementService, UserRequirementChecklistItem } from '../services/admissionRequirementService';
import { University } from '../components/university/UniversityCard'; // Assuming University interface is exported
import { CheckCircle, ChevronDown, Star, ArrowLeft } from 'lucide-react';
import LoginPromptModal from '../components/common/LoginPromptModal';

// Extend UserRequirementChecklistItem to include university details
interface TrackedRequirement extends UserRequirementChecklistItem {
  universities: {
    name: string;
    image_url: string;
  };
}

interface TrackedRequirementsPageProps {
  session: Session | null;
}

export default function TrackedRequirements({ session }: TrackedRequirementsPageProps) {
  const navigate = useNavigate(); // Initialize useNavigate
  const [trackedRequirements, setTrackedRequirements] = useState<TrackedRequirement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [expandedUniversities, setExpandedUniversities] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchTrackedRequirements = async () => {
      if (!session?.user?.id) {
        setIsLoading(false);
        setShowLoginModal(true);
        return;
      }

      try {
        setIsLoading(true);
        const data = await AdmissionRequirementService.getAllTrackedRequirements(session.user.id);
        setTrackedRequirements(data as TrackedRequirement[]);
      } catch (error) {
        console.error('Failed to fetch tracked requirements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrackedRequirements();
  }, [session]);

  const handleToggleRequirement = async (requirement: TrackedRequirement, isCompleted: boolean) => {
    if (!session?.user?.id) {
      setShowLoginModal(true);
      return;
    }

    try {
      await AdmissionRequirementService.toggleRequirementCompletion(
        session.user.id,
        requirement.university_id,
        requirement.requirement_text,
        isCompleted
      );
      // Update local state
      setTrackedRequirements(prev =>
        prev.map(item =>
          item.id === requirement.id ? { ...item, is_completed: isCompleted } : item
        )
      );
    } catch (error) {
      console.error('Failed to toggle requirement completion:', error);
    }
  };

  const handleUntrackUniversity = async (universityId: number) => {
    if (!session?.user?.id) {
      setShowLoginModal(true);
      return;
    }

    try {
      await AdmissionRequirementService.untrackAllRequirements(session.user.id, universityId);
      // Remove untracked university's requirements from local state
      setTrackedRequirements(prev =>
        prev.filter(req => req.university_id !== universityId)
      );
      // Close the expanded section if it was open
      setExpandedUniversities(prev => {
        const newState = { ...prev };
        delete newState[universityId];
        return newState;
      });
      // Optional: Show a toast or notification that university was untracked
    } catch (error) {
      console.error('Failed to untrack university requirements:', error);
      // Optionally, show an error message
    }
  };

  const groupedByUniversity = trackedRequirements.reduce((acc, req) => {
    if (!acc[req.university_id]) {
      acc[req.university_id] = {
        name: req.universities.name,
        imageUrl: req.universities.image_url,
        requirements: [],
      };
    }
    acc[req.university_id].requirements.push(req);
    return acc;
  }, {} as Record<number, { name: string; imageUrl: string; requirements: TrackedRequirement[] }>);

  const toggleUniversityExpansion = (universityId: number) => {
    setExpandedUniversities(prev => ({
      ...prev,
      [universityId]: !prev[universityId],
    }));
  };

  if (showLoginModal && !session) {
    return (
      <LoginPromptModal onClose={() => setShowLoginModal(false)} message="Please log in to view and manage your tracked admission requirements." />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon-800"></div>
          <p className="text-gray-600">Loading your tracked requirements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <Link to="/profile" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Profile
        </Link>
      </div>
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4">Tracked Admission Requirements</h1>
          <p className="text-xs sm:text-base text-maroon-100 max-w-3xl">
            Keep tabs on your application progress for all your chosen universities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {Object.keys(groupedByUniversity).length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Star className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Tracked Requirements Yet</h3>
            <p className="text-sm text-gray-600 mb-6">
              Head to university details pages and click "Track Requirements" to get started!
            </p>
            <Link
              to="/universities"
              className="bg-maroon-800 text-white px-6 py-3 rounded-lg hover:bg-maroon-700 transition-colors font-semibold"
            >
              Browse Universities
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedByUniversity).map(([universityId, uniData]) => (
              <div key={universityId} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div
                onClick={() => toggleUniversityExpansion(Number(universityId))}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                  <div className="flex items-center">
                    <img
                      src={uniData.imageUrl || 'placeholder-university-logo.png'} // Add a placeholder image if needed
                      alt={uniData.name}
                      className="h-8 w-8 rounded-full object-cover mr-3"
                    />
                    <span className="text-base font-semibold text-gray-900">{uniData.name}</span>
                  </div>
                  <div className="flex items-center space-x-2"> {/* New wrapper for untrack button and chevron */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent toggling expansion when clicking untrack
                        handleUntrackUniversity(Number(universityId));
                      }}
                      className="flex items-center px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                      title="Untrack all requirements for this university"
                    >
                      Untrack<Star className="h-3 w-3 ml-1 text-red-600" />
                    </button>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform ${
                        expandedUniversities[Number(universityId)] ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
                {expandedUniversities[Number(universityId)] && (
                  <div className="px-4 pb-3 border-t border-gray-100">
                    <div className="space-y-2 pt-3">
                      {uniData.requirements
                        .sort((a, b) => a.requirement_text.localeCompare(b.requirement_text)) // Sort alphabetically
                        .map((requirement) => (
                        <div key={requirement.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={requirement.is_completed}
                            onChange={(e) => handleToggleRequirement(requirement, e.target.checked)}
                            className="form-checkbox h-4 w-4 text-green-600 rounded focus:ring-green-500 border-gray-300 cursor-pointer"
                          />
                          <span className={`text-sm text-gray-700 ml-2 ${requirement.is_completed ? 'line-through text-gray-500' : ''}`}>
                            {requirement.requirement_text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}