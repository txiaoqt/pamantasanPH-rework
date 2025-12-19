import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Building, Users, BookOpen, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { University } from '../university/UniversityCard';
import { UniversityService } from '../../services/universityService';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<University[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [allUniversities, setAllUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    universities: 0,
    locations: 0,
    programs: 0
  });

  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);

  // Fetch universities on mount
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const universities = await UniversityService.getAllUniversities();
        setAllUniversities(universities);
      } catch (error) {
        console.error('Failed to fetch universities:', error);
      }
    };
    fetchUniversities();
  }, []);

  // Calculate stats when universities data is available
  useEffect(() => {
    if (allUniversities.length > 0) {
      const locations = new Set(allUniversities.map(uni => uni.location));
      const totalPrograms = allUniversities.reduce((sum, uni) => sum + uni.programs, 0);

      setStats({
        universities: allUniversities.length,
        locations: locations.size,
        programs: totalPrograms
      });
    }
  }, [allUniversities]);

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = allUniversities.filter(university =>
        university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.subjects.some((subject: string) =>
          subject.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ).slice(0, 5); // Limit to 5 suggestions
      setSearchSuggestions(filtered);
      setShowSearchSuggestions(true);
    } else {
      setShowSearchSuggestions(false);
    }
  }, [searchQuery, allUniversities]);

  // Handle location suggestions
  useEffect(() => {
    if (location.trim().length > 0) {
      const provinces = [...new Set(allUniversities.map(uni => uni.province))];
      const filtered = provinces.filter(province =>
        province.toLowerCase().includes(location.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setLocationSuggestions(filtered);
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
    }
  }, [location, allUniversities]);

  // Handle search submission
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (location.trim()) params.set('location', location.trim());

    navigate(`/universities?${params.toString()}`);
  };

  // Handle browse all
  const handleBrowseAll = () => {
    navigate('/universities');
  };

  // Handle suggestion selection
  const handleSearchSuggestionSelect = (university: University) => {
    setSearchQuery(university.name);
    setShowSearchSuggestions(false);
  };

  const handleLocationSuggestionSelect = (province: string) => {
    setLocation(province);
    setShowLocationSuggestions(false);
  };

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
      if (locationInputRef.current && !locationInputRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img
          src="/Images/pup.jpg"
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
            Discover, compare, and choose from over {stats.universities > 0 ? stats.universities : '200'} State Universities
            <br className="hidden sm:block" />
            across Metro Manila.
          </p>

          {/* Search Form */}
          <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl mb-16 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
              <div className="relative" ref={searchInputRef}>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search universities, courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length > 1 && setShowSearchSuggestions(true)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-lg"
                />
                {/* Search Suggestions */}
                {showSearchSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 rounded-xl shadow-lg mt-1 max-h-64 overflow-y-auto">
                    {searchSuggestions.map((university) => (
                      <div
                        key={university.id}
                        onClick={() => handleSearchSuggestionSelect(university)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-gray-900">{university.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {university.location}, {university.province}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          Subjects: {university.subjects.slice(0, 2).join(', ')}
                          {university.subjects.length > 2 && ` +${university.subjects.length - 2} more`}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative" ref={locationInputRef}>
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Location (e.g., Manila, Cebu)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => location.trim().length > 0 && setShowLocationSuggestions(true)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-lg"
                />
                {/* Location Suggestions */}
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 rounded-xl shadow-lg mt-1 max-h-64 overflow-y-auto">
                    {locationSuggestions.map((province) => (
                      <div
                        key={province}
                        onClick={() => handleLocationSuggestionSelect(province)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-gray-900 flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {province}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {allUniversities.filter(uni => uni.province === province).length} universities
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSearch}
                className="flex-1 bg-gradient-to-r from-red-900 to-red-700 text-white px-8 py-4 rounded-xl hover:from-red-800 hover:to-red-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
              >
                <Search className="inline h-5 w-5 mr-2" />
                Search Universities
              </button>
              <button
                onClick={handleBrowseAll}
                className="px-8 py-4 border-2 border-red-900 text-red-900 rounded-xl hover:bg-red-900 hover:text-white transition-all duration-300 font-semibold text-lg"
              >
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
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stats.universities > 0 ? stats.universities : '200+'}
              </div>
              <div className="text-gray-200 text-lg">Universities</div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-red-900" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stats.locations > 0 ? stats.locations : '17'}
              </div>
              <div className="text-gray-200 text-lg">Locations</div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
                <BookOpen className="h-8 w-8 text-red-900" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stats.programs > 0 ? stats.programs : '1,500+'}
              </div>
              <div className="text-gray-200 text-lg">Programs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
