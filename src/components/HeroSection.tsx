import React, { useState } from 'react';
import { Search, MapPin, Building, Users, Award } from 'lucide-react';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="University campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-red-800/85 to-amber-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">
              University
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-100 mb-12 leading-relaxed">
            Discover, compare, and choose from over 120 universities
            <br className="hidden sm:block" />
            across the Philippines
          </p>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl mb-16 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search universities, courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-lg"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Location (e.g., Manila, Cebu)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-lg"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-gradient-to-r from-red-900 to-red-700 text-white px-8 py-4 rounded-xl hover:from-red-800 hover:to-red-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl">
                <Search className="inline h-5 w-5 mr-2" />
                Search Universities
              </button>
              <button className="px-8 py-4 border-2 border-red-900 text-red-900 rounded-xl hover:bg-red-900 hover:text-white transition-all duration-300 font-semibold text-lg">
                Browse All
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
                <Building className="h-8 w-8 text-red-900" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">120+</div>
              <div className="text-gray-200 text-lg">Universities</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-red-900" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">81</div>
              <div className="text-gray-200 text-lg">Provinces</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
                <Users className="h-8 w-8 text-red-900" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">50K+</div>
              <div className="text-gray-200 text-lg">Students Helped</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}