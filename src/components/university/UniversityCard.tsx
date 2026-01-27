import React, { useState } from 'react';
import { MapPin, Star, Users, BookOpen, Heart, BarChart3, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import { useSavedUniversities } from '../../hooks/useSavedUniversities';
import { AcademicProgram } from '../../lib/supabase';

export interface University {
  id: number;
  name: string;
  location: string;
  province: string;
  established: string;
  type: string;
  students: string;
  programs: number;
  description: string;
  longDescription?: string;
  subjects: string[];
  imageUrl: string;
  galleryImages?: string[];

  accreditation: string[];
  campusSize?: string;
  founded?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  facilities?: string[];
  amenities?: string[];
  achievements?: string[];
  quickfacts?: string[];
  admissionRequirements?: string[];
  applicationProcess?: string[];
  admissionStatus: 'open' | 'not-yet-open' | 'closed';
  admissionDeadline: string;

  academicCalendar?: {
    semesterStart: string;
    semesterEnd: string;
    applicationDeadline: string;
  };
  rankings?: {
    source: string;
    details: string;
  };
  mapLocation?: {
    lat: number;
    lng: number;
  };
}

export interface UniversityCardProps extends University {
  viewMode: 'grid' | 'list';
  admissionStatus: 'open' | 'not-yet-open' | 'closed';
}


function AdmissionStatusBadge({ status }: { status: 'open' | 'not-yet-open' | 'closed' }) {
  const getStatusConfig = () => {
    switch (status) {
      case 'open':
        return {
          label: 'Open',
          color: 'bg-green-100 text-green-800 border-green-200',
          dot: 'bg-green-500'
        };
      case 'not-yet-open':
        return {
          label: 'Soon',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          dot: 'bg-yellow-500'
        };
      case 'closed':
        return {
          label: 'Closed',
          color: 'bg-red-100 text-red-800 border-red-200',
          dot: 'bg-red-500'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
      <div className={`w-2 h-2 rounded-full mr-1 ${config.dot}`}></div>
      {config.label}
    </div>
  );
}
export default function UniversityCard({ viewMode, ...university }: UniversityCardProps) {
  const { isSaved, toggleSaved, isLoaded } = useSavedUniversities();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleCompare = () => {
    const compareList = JSON.parse(localStorage.getItem('compareUniversities') || '[]');
    const universityData = {
      id: university.id,
      name: university.name,
      imageUrl: university.imageUrl,
      type: university.type,
      location: university.location,
      programs: university.programs
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

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        {/* Stacked layout on extra small screens, horizontal on larger screens */}
        <div className="flex flex-col">
          <div className="w-full h-20 sm:h-24 md:h-32 flex-shrink-0">
            <img
              src={university.imageUrl}
              alt={university.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-3 sm:p-4">
            {/* Always visible: Name and Location */}
            <div className="mb-3">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{university.name}</h3>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {university.location}, {university.province}
              </div>
            </div>

            {/* Hidden details - only show when expanded */}
            <div className={isExpanded ? 'block' : 'hidden'}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                <div className="mb-2 md:mb-0">
                  <div className="text-gray-500 text-sm">Est. {university.established}</div>
                </div>
                <div className="flex items-center space-x-2 md:space-x-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${university.type === 'Public' ? 'bg-blue-100 text-blue-800' :
                    university.type === 'State' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                    {university.type}
                  </span>
                  <AdmissionStatusBadge status={university.admissionStatus} />
                </div>
              </div>

              <div className="flex items-center justify-between mb-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="font-medium">{university.students} students</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span className="font-medium">{university.programs} programs</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{university.description}</p>

              <div className="mb-3 text-xs text-gray-600">
                📅 {university.admissionDeadline}
              </div>
              <div className="mb-4">
                <div className="flex flex-wrap gap-1.5">
                  {university.subjects.slice(0, 4).map((subject, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-maroon-50 text-maroon-700 text-xs rounded-full font-medium hover:bg-maroon-100 transition-colors"
                    >
                      {subject}
                    </span>
                  ))}
                  {university.subjects.length > 4 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                      +{university.subjects.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* See More/Less button - always visible */}
            <div className="mt-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-maroon-600 hover:text-maroon-800 font-medium text-sm transition-colors"
              >
                {isExpanded ? 'See Less' : 'See More'}
              </button>
            </div>

            {/* Action buttons - always visible, below See More */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => toggleSaved(university.id)}
                disabled={!isLoaded}
                className={`p-1.5 border rounded-lg transition-colors ${
                  isSaved(university.id)
                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                    : 'text-maroon-700 border-maroon-200 hover:bg-maroon-50'
                } ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Heart className={`h-3.5 w-3.5 ${isSaved(university.id) ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleCompare}
                className="p-1.5 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-colors"
              >
                <BarChart3 className="h-3.5 w-3.5" />
              </button>
              <Link
                to={`/universities/${university.id}`}
                className="px-3 py-1.5 bg-maroon-800 text-white rounded-lg hover:bg-maroon-700 transition-colors flex items-center text-sm"
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1" />
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative h-40 sm:h-44 md:h-48">
        <img
          src={university.imageUrl}
          alt={university.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${university.type === 'Public' ? 'bg-blue-100 text-blue-800' :
            university.type === 'State' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
            {university.type}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <AdmissionStatusBadge status={university.admissionStatus} />
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="mb-3">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 group-hover:text-maroon-800 transition-colors">
            {university.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mb-0.5">
            <MapPin className="h-4 w-4 mr-1" />
            {university.location}, {university.province}
          </div>
          <div className="text-gray-500 text-sm">Est. {university.established}</div>
        </div>

        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span className="font-medium">{university.students} students</span>
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen className="h-4 w-4 mr-1" />
            <span className="font-medium">{university.programs} programs</span>
          </div>
        </div>

        {/* Hidden on small and medium screens unless expanded */}
        <div className={`lg:block ${isExpanded ? 'block' : 'hidden'}`}>
          <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-3">{university.description}</p>

          <div className="mb-3 text-xs text-gray-600">
            📅 {university.admissionDeadline}
          </div>
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {university.subjects.slice(0, 4).map((subject, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-maroon-50 text-maroon-700 text-xs rounded-full font-medium hover:bg-maroon-100 transition-colors"
                >
                  {subject}
                </span>
              ))}
              {university.subjects.length > 4 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                  +{university.subjects.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* See More/Less button - only show on small and medium screens */}
        <div className="lg:hidden mb-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-maroon-600 hover:text-maroon-800 font-medium text-sm transition-colors"
          >
            {isExpanded ? 'See Less' : 'See More'}
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
          <button
            onClick={() => toggleSaved(university.id)}
            disabled={!isLoaded}
            className={`flex-1 min-w-0 px-2 py-1.5 border rounded-lg transition-colors text-xs sm:text-sm flex items-center ${
              isSaved(university.id)
                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                : 'text-maroon-700 border-maroon-200 hover:bg-maroon-50'
            } ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Heart className={`h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 ${isSaved(university.id) ? 'fill-current' : ''}`} />
            <span className="text-xs sm:text-sm">{isSaved(university.id) ? 'Saved' : 'Save'}</span>
          </button>
          <button
            onClick={handleCompare}
            className="flex-1 min-w-0 px-2 py-1.5 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-colors text-xs sm:text-sm flex items-center"
          >
            <BarChart3 className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
            <span className="text-xs sm:text-sm">Compare</span>
          </button>
          <Link
            to={`/universities/${university.id}`}
            className="flex-1 min-w-0 px-2 py-1.5 bg-maroon-800 text-white rounded-lg hover:bg-maroon-700 transition-colors flex items-center justify-center text-xs sm:text-sm"
          >
            <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1" />
            <span className="text-xs sm:text-sm">View</span>
          </Link>
        </div>
      </div>
    </div>
  );
}