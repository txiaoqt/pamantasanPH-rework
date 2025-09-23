import React from 'react';
import { Star, Users, BookOpen, MapPin, Heart, BarChart3, ExternalLink } from 'lucide-react';
import { Link } from "react-router-dom";
import { universities } from "./data/universities"; // ✅ import shared data

interface UniversityCardProps {
  id: number;
  name: string;
  location: string;
  province: string;
  established: string;
  type: string; // allow all valid values
  rating: number;
  students: string;
  programs: number;
  description: string;
  subjects: string[];
  imageUrl: string;
  tuitionRange: string;
  accreditation: string[];
}


function UniversityCard({
  id,
  name,
  location,
  established,
  type,
  rating,
  students,
  programs,
  description,
  subjects,
  imageUrl,
  tuitionRange,
  accreditation
}: UniversityCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${type === 'Public'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-purple-100 text-purple-800'
            }`}>
            {type}
          </span>
        </div>
        <div className="absolute top-4 right-4 flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
          <span className="text-sm font-medium text-gray-900">{rating}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-900 transition-colors">
            {name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mb-1">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
          <div className="text-gray-500 text-sm">Est. {established}</div>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span className="font-medium">{students}</span> students
          </div>
          <div className="flex items-center text-gray-600">
            <BookOpen className="h-4 w-4 mr-1" />
            <span className="font-medium">{programs}</span> programs
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-50 text-red-700 text-xs rounded-full font-medium hover:bg-red-100 transition-colors"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center px-4 py-2 text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-all duration-300">
            <Heart className="h-4 w-4 mr-1" />
            Save
          </button>
          <button className="flex-1 flex items-center justify-center px-4 py-2 text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-all duration-300">
            <BarChart3 className="h-4 w-4 mr-1" />
            Compare
          </button>
          <Link
            to={`/universities/${id}`}
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

export default function FeaturedUniversities() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Universities
            </h2>
            <p className="text-xl text-gray-600">
              Top-rated institutions across the Philippines
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link to="/universities">
              <button className="bg-gradient-to-r from-red-900 to-red-700 text-white px-6 py-3 rounded-xl hover:from-red-800 hover:to-red-600 transition-all duration-300 font-semibold">
                View All →
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.slice(0, 3).map((university) => ( // ✅ only show first 3 featured
            <UniversityCard key={university.id} {...university} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/universities">
            <button className="bg-gradient-to-r from-red-900 to-red-700 text-white px-8 py-4 rounded-xl hover:from-red-800 hover:to-red-600 transition-all duration-300 font-semibold text-lg">
              Browse All Universities →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
