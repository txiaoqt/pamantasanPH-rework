import React from 'react';
import { MapPin, Star, Users, BookOpen, Heart, BarChart3, ExternalLink } from 'lucide-react';
import { Link } from "react-router-dom";
import { useSavedUniversities } from '../../hooks/useSavedUniversities';
import { AcademicProgram } from '../../lib/supabase';

export interface University {
  id: number;
  name: string;
  location: string;
  province: string;
  established: string;
  type: string;
  rating: number;
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
    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
      <div className={`w-2 h-2 rounded-full mr-1 ${config.dot}`}></div>
      {config.label}
    </div>
  );
}
export default function UniversityCard({ viewMode, ...university }: UniversityCardProps) {
  const { isSaved, toggleSaved, isLoaded } = useSavedUniversities();

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex">
        <div className="w-48 h-32 flex-shrink-0">
          <img
            src={university.imageUrl}
            alt={university.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{university.name}</h3>
              <div className="flex items-center text-gray-600 text-sm mb-1">
                <MapPin className="h-4 w-4 mr-1" />
                {university.location}, {university.province}
              </div>
              <div className="text-gray-500 text-sm">Est. {university.established}</div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${university.type === 'Public' ? 'bg-blue-100 text-blue-800' :
                university.type === 'State' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                {university.type}
              </span>
              <AdmissionStatusBadge status={university.admissionStatus} />
              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                <span className="text-sm font-medium text-gray-900">{university.rating}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{university.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {university.students} students
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                {university.programs} programs
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => toggleSaved(university.id)}
                disabled={!isLoaded}
                className={`p-2 border rounded-lg transition-colors ${
                  isSaved(university.id)
                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                    : 'text-maroon-700 border-maroon-200 hover:bg-maroon-50'
                } ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Heart className={`h-4 w-4 ${isSaved(university.id) ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-colors">
                <BarChart3 className="h-4 w-4" />
              </button>
              <Link
                to={`/universities/${university.id}`}
                className="px-4 py-2 bg-maroon-800 text-white rounded-lg hover:bg-maroon-700 transition-colors flex items-center"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
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
      <div className="relative h-48">
        <img
          src={university.imageUrl}
          alt={university.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${university.type === 'Public' ? 'bg-blue-100 text-blue-800' :
            university.type === 'State' ? 'bg-green-100 text-green-800' :
              'bg-purple-100 text-purple-800'
            }`}>
            {university.type}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
          <span className="text-sm font-medium text-gray-900">{university.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4">
          <AdmissionStatusBadge status={university.admissionStatus} />
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-maroon-800 transition-colors">
            {university.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mb-1">
            <MapPin className="h-4 w-4 mr-1" />
            {university.location}, {university.province}
          </div>
          <div className="text-gray-500 text-sm">Est. {university.established}</div>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{university.description}</p>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span className="font-medium">{university.students}</span> students
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen className="h-4 w-4 mr-1" />
            <span className="font-medium">{university.programs}</span> programs
          </div>
        </div>

        <div className="mb-4 text-xs text-gray-600">
          📅 {university.admissionDeadline}
        </div>
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {university.subjects.slice(0, 3).map((subject, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-maroon-50 text-maroon-700 text-xs rounded-full font-medium hover:bg-maroon-100 transition-colors"
              >
                {subject}
              </span>
            ))}
            {university.subjects.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{university.subjects.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => toggleSaved(university.id)}
            disabled={!isLoaded}
            className={`flex-1 flex items-center justify-center px-4 py-2 border rounded-lg transition-all duration-300 ${
              isSaved(university.id)
                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                : 'text-maroon-700 border-maroon-200 hover:bg-maroon-50'
            } ${!isLoaded ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Heart className={`h-4 w-4 mr-1 ${isSaved(university.id) ? 'fill-current' : ''}`} />
            {isSaved(university.id) ? 'Saved' : 'Save'}
          </button>
          <button className="flex-1 flex items-center justify-center px-4 py-2 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-all duration-300">
            <BarChart3 className="h-4 w-4 mr-1" />
            Compare
          </button>

          <Link
            to={`/universities/${university.id}`}
            className="px-4 py-2 bg-maroon-800 text-white rounded-lg hover:bg-maroon-700 transition-colors flex items-center"
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
