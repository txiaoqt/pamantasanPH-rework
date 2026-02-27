import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Grid, List, Map } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import UniversityCard, { University } from '../components/university/UniversityCard';
import MapView from '../components/university/MapView';
import { UniversityService } from '../services/universityService';
import { AcademicProgramService } from '../services/academicProgramService';

export default function Universities() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  const [programFilter] = useState(searchParams.get('program') || '');
  const [typeFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>(
    searchParams.get('view') === 'map' ? 'map' : 'grid'
  );
  const [sortBy, setSortBy] = useState('id');
  const [universities, setUniversities] = useState<University[]>([]);
  const [programUniversities, setProgramUniversities] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setIsLoading(true);
        const data = await UniversityService.getAllUniversities();
        setUniversities(data);
      } catch (error) {
        console.error('Failed to fetch universities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  // Fetch universities that offer the specific program
  useEffect(() => {
    const fetchProgramUniversities = async () => {
      if (!programFilter) {
        setProgramUniversities([]);
        return;
      }

      try {
        const decodedProgram = decodeURIComponent(programFilter);
        console.log('Fetching universities for program:', decodedProgram);

        const allPrograms = await AcademicProgramService.getAllPrograms();
        console.log('All programs fetched:', allPrograms.length);

        // Normalize the program name from URL for matching
        const normalizedSearchProgram = AcademicProgramService.normalizeProgramName(decodedProgram);
        console.log('Normalized search program:', normalizedSearchProgram);

        // Find programs that match by normalizing both sides
        const matchingPrograms = allPrograms.filter(program => {
          const normalizedProgramName = AcademicProgramService.normalizeProgramName(program.programName);
          return normalizedProgramName === normalizedSearchProgram;
        });
        console.log('Matching programs:', matchingPrograms.length, matchingPrograms);

        // Get unique university IDs that offer these programs
        const universityIds = [...new Set(matchingPrograms.map(p => p.universityId))];
        console.log('University IDs offering program:', universityIds);

        setProgramUniversities(universityIds);
      } catch (error) {
        console.error('Failed to fetch program universities:', error);
        setProgramUniversities([]);
      }
    };

    fetchProgramUniversities();
  }, [programFilter]);

  const filteredUniversities = useMemo(() => {
    const filtered = universities.filter(university => {
      // If program filter is active, only show universities that offer the program
      if (programFilter) {
        return programUniversities.includes(university.id);
      }

      const matchesSearch =
        university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (university.acronym && university.acronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        university.subjects.some((subject: string) =>
          subject.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesLocation =
        !locationFilter ||
        university.province.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesType =
        !typeFilter || university.type.toLowerCase() === typeFilter.toLowerCase();

      return matchesSearch && matchesLocation && matchesType;
    });

    filtered.sort((a: University, b: University) => {
      switch (sortBy) {
        case 'students':
          return (
            parseInt(b.students.replace(/,/g, '')) -
            parseInt(a.students.replace(/,/g, ''))
          );
        case 'established':
          return parseInt(a.established) - parseInt(b.established);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'id':
        default:
          return a.id - b.id;
      }
    });

    return filtered;
  }, [universities, searchQuery, locationFilter, typeFilter, sortBy, programFilter, programUniversities]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 dark:from-maroon-800 dark:via-maroon-700 dark:to-red-800 text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {programFilter ? `Universities offering ${decodeURIComponent(programFilter)}` : 'Universities'}
          </h1>
          <p className={`text-xs sm:text-base md:text-lg lg:text-xl text-maroon-100 dark:text-gray-400 max-w-3xl ${programFilter ? 'hidden sm:block' : ''}`}>
            {programFilter
              ? `Find universities that offer ${decodeURIComponent(programFilter)} and explore your options.`
              : 'Discover and explore universities across the Philippines. Find the perfect institution for your educational journey.'
            }
          </p>
          {programFilter && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-maroon-800/50 dark:bg-maroon-900/50 rounded-lg border border-maroon-700 dark:border-maroon-800">
              <span className="text-xs sm:text-sm font-medium">Filtering by program: {decodeURIComponent(programFilter)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 lg:sticky lg:top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4">
            {/* Search - Full width on mobile */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search universities, programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 dark:focus:ring-maroon-400 focus:border-transparent dark:text-gray-50 dark:placeholder-gray-400 dark:bg-gray-800"
              />
            </div>

            {/* Filters row - Better mobile layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 items-center">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 dark:focus:ring-maroon-400 focus:border-transparent text-sm dark:text-gray-50 dark:placeholder-gray-400 dark:bg-gray-800"
                />
              </div>

              {/* Type filter */}


              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-maroon-500 dark:focus:ring-maroon-400 focus:border-transparent text-sm dark:text-gray-50 dark:bg-gray-800"
              >
                <option value="name">Sort by Name</option>
                <option value="students">Sort by Students</option>
                <option value="established">Sort by Year</option>
              </select>

              {/* View mode - Takes full width on mobile, positioned last */}
              <div className="flex items-center justify-center gap-2 sm:col-span-1 col-span-2 sm:col-span-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-maroon-100 dark:bg-maroon-900 text-maroon-800 dark:text-maroon-100'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-maroon-100 dark:bg-maroon-900 text-maroon-800 dark:text-maroon-100'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'map'
                      ? 'bg-maroon-100 dark:bg-maroon-900 text-maroon-800 dark:text-maroon-100'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Map className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon-800 dark:border-maroon-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Loading universities...</p>
            </div>
          </div>
        ) : viewMode === 'map' ? (
          <MapView universities={filteredUniversities} />
        ) : filteredUniversities.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }
          >
            {filteredUniversities.map((university) => (
              <UniversityCard
                key={university.id}
                viewMode={viewMode}
                {...university}
                name={university.name}
                admissionStatus={university.admissionStatus}
              />
            ))}
          </div>
        ) : programFilter ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">No universities found</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              No universities currently offer "{decodeURIComponent(programFilter)}" program.
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-maroon-600 dark:bg-maroon-700 text-white rounded-lg hover:bg-maroon-700 dark:hover:bg-maroon-600 transition-colors"
            >
              ← Go Back to Programs
            </button>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-2">No universities found</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
