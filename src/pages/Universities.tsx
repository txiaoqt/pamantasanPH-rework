import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Grid, List } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import UniversityCard, { University } from '../components/university/UniversityCard';
import { UniversityService } from '../services/universityService';
import { AcademicProgramService } from '../services/academicProgramService';

export default function Universities() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  const [programFilter, setProgramFilter] = useState(searchParams.get('program') || '');
  const [typeFilter, setTypeFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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

        // Find programs that match the search
        const matchingPrograms = allPrograms.filter(program =>
          program.programName.toLowerCase().includes(decodedProgram.toLowerCase())
        );
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
    let filtered = universities.filter(university => {
      // If program filter is active, only show universities that offer the program
      if (programFilter) {
        return programUniversities.includes(university.id);
      }

      const matchesSearch =
        university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {programFilter ? `Universities offering ${decodeURIComponent(programFilter)}` : 'Universities'}
          </h1>
          <p className="text-xl text-maroon-100 max-w-3xl">
            {programFilter
              ? `Find universities that offer ${decodeURIComponent(programFilter)} and explore your options.`
              : 'Discover and explore universities across the Philippines. Find the perfect institution for your educational journey.'
            }
          </p>
          {programFilter && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-maroon-800/50 rounded-lg border border-maroon-700">
              <span className="text-sm font-medium">Filtering by program: {decodeURIComponent(programFilter)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 lg:sticky lg:top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-row gap-2 md:gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search universities, programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full sm:w-48 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
                />
              </div>

              {/* Type filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="State">State</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="students">Sort by Students</option>
                <option value="established">Sort by Year</option>
              </select>
            </div>

            {/* View mode */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-maroon-100 text-maroon-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-maroon-100 text-maroon-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon-800"></div>
              <p className="text-gray-600">Loading universities...</p>
            </div>
          </div>
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
                admissionStatus={university.admissionStatus}
              />
            ))}
          </div>
        ) : programFilter ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
            <p className="text-gray-600 mb-4">
              No universities currently offer "{decodeURIComponent(programFilter)}" program.
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-maroon-600 text-white rounded-lg hover:bg-maroon-700 transition-colors"
            >
              ← Go Back to Programs
            </button>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <MapPin className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
