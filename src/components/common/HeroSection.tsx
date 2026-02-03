import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Building, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { University } from '../university/UniversityCard';
import { UniversityService } from '../../services/universityService';
import { AcademicProgramService, AggregatedProgram } from '../../services/academicProgramService';
import trollfaceImage from '../../assets/Images/Trollface.png';
import Fuse from 'fuse.js';
import { slugify } from '../../lib/utils';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<University[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [allUniversities, setAllUniversities] = useState<University[]>([]);
  const [allPrograms, setAllPrograms] = useState<AggregatedProgram[]>([]);
  const [universityAcronyms, setUniversityAcronyms] = useState<string[]>([]);
  const [programAcronyms, setProgramAcronyms] = useState<string[]>([]);
  const [stats, setStats] = useState({
    universities: 0,
    locations: 0,
    programs: 0
  });

  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const locationInputRef = useRef<HTMLInputElement>(null);
  const fuseRef = useRef<Fuse<University> | null>(null);

  // Fetch universities and programs on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const universities = await UniversityService.getAllUniversities();
        setAllUniversities(universities);

        const programs = await AcademicProgramService.getAggregatedPrograms();
        setAllPrograms(programs);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  // Populate acronym lists
  useEffect(() => {
    if (allUniversities.length > 0) {
      const uniAcronyms = allUniversities
        .map(uni => uni.acronym)
        .filter((acronym): acronym is string => !!acronym);
      setUniversityAcronyms(uniAcronyms);
    }
    if (allPrograms.length > 0) {
      const progAcronyms = allPrograms.flatMap(program => program.searchKeywords);
      setProgramAcronyms(progAcronyms);
    }
  }, [allUniversities, allPrograms]);

  // Initialize Fuse.js
  useEffect(() => {
    if (allUniversities.length > 0) {
      fuseRef.current = new Fuse(allUniversities, {
        keys: ['name', 'acronym', 'subjects'],
        includeScore: true,
        threshold: 0.4,
      });
    }
  }, [allUniversities]);

  // Calculate stats when universities data is available
  useEffect(() => {
    if (allUniversities.length > 0 && allPrograms.length > 0) {
      const locations = new Set(allUniversities.map(uni => uni.location));
      setStats({
        universities: allUniversities.length,
        locations: locations.size,
        programs: allPrograms.length
      });
    }
  }, [allUniversities, allPrograms]);

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 1 && fuseRef.current) {
      const results = fuseRef.current.search(searchQuery.trim());
      setSearchSuggestions(results.map(result => result.item).slice(0, 5));
      setShowSearchSuggestions(true);
    } else {
      setShowSearchSuggestions(false);
    }
  }, [searchQuery]);

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
    const query = searchQuery.trim().toUpperCase();
    if (universityAcronyms.includes(query)) {
      navigate(`/universities?search=${encodeURIComponent(searchQuery.trim())}`);
    } else if (programAcronyms.includes(query)) {
      navigate(`/programs?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set('search', searchQuery.trim());
      if (location.trim()) params.set('location', location.trim());
      navigate(`/universities?${params.toString()}`);
    }
  };

  // Handle browse all
  const handleBrowseAll = () => {
    navigate('/universities');
  };

  // Handle suggestion selection
  const handleSearchSuggestionSelect = (university: University) => {
    const universityUrl = university.acronym
      ? university.acronym.toLowerCase()
      : slugify(university.name);
    navigate(`/universities/${universityUrl}`);
  };

  const handleLocationSuggestionSelect = (province: string) => {
    setLocation(province);
    setShowLocationSuggestions(false);
  };

  const handleProgramSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/programs?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/programs');
    }
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
          src={trollfaceImage}
          alt="University campus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-red-800/85 to-amber-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-300">
              University
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 sm:mb-10 leading-relaxed">
            Discover, compare, and choose from over {stats.universities > 0 ? stats.universities : '200'} State Universities
            <br className="hidden md:block" />
            {' '}across Metro Manila.
          </p>

          {/* Search Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-2xl mb-10 sm:mb-12 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="relative" ref={searchInputRef}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  placeholder="Search universities, courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length > 1 && setShowSearchSuggestions(true)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-base"
                />
                {/* Quick Results Overlay */}
                {showSearchSuggestions && searchQuery.trim().length > 0 && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 rounded-xl shadow-lg mt-1 max-h-64 overflow-y-auto">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">Quick Results</div>
                    {searchSuggestions.map((university) => (
                      <div
                        key={university.id}
                        onClick={() => handleSearchSuggestionSelect(university)}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-sm text-gray-900">{university.name}</div>
                        <div className="text-xs text-gray-500 flex items-center">
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
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  placeholder="Location (e.g., Manila, Cebu)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => location.trim().length > 0 && setShowLocationSuggestions(true)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-base"
                />
                {/* Location Suggestions */}
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 rounded-xl shadow-lg mt-1 max-h-64 overflow-y-auto">
                    {locationSuggestions.map((province) => (
                      <div
                        key={province}
                        onClick={() => handleLocationSuggestionSelect(province)}
                        className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-sm text-gray-900 flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-2 text-gray-400" />
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
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-red-900 to-red-700 text-white px-6 py-3 rounded-xl hover:from-red-800 hover:to-red-600 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl"
              >
                <Search className="inline h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Search Universities
              </button>
              <button
                onClick={handleBrowseAll}
                className="px-6 py-3 border-2 border-red-900 text-red-900 rounded-xl hover:bg-red-900 hover:text-white transition-all duration-300 font-semibold text-base"
              >
                Browse All
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto mb-6">
            <Link to="/universities" className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-yellow-400 rounded-full mb-1 sm:mb-2 md:mb-4">
                <Building className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-red-900" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 sm:mb-1 md:mb-2">
                {stats.universities > 0 ? stats.universities : '200+'}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-200">Universities</div>
            </Link>

            <Link to="/locations" className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-yellow-400 rounded-full mb-1 sm:mb-2 md:mb-4">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-red-900" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 sm:mb-1 md:mb-2">
                {stats.locations > 0 ? stats.locations : '17'}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-200">Locations</div>
            </Link>

            <Link to="/programs" className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-yellow-400 rounded-full mb-1 sm:mb-2 md:mb-4">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-red-900" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0.5 sm:mb-1 md:mb-2">
                {stats.programs > 0 ? stats.programs : '1,500+'}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-200">Programs</div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
