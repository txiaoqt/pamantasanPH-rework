import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, BookOpen, Clock, Users, Award, TrendingUp } from 'lucide-react';
import { AcademicProgramService, AggregatedProgram } from '../services/academicProgramService';
import { UniversityService } from '../services/universityService';

function ProgramCard({ program, onViewDetails, onFindUniversities }: {
  program: AggregatedProgram;
  onViewDetails: (program: AggregatedProgram) => void;
  onFindUniversities: (program: AggregatedProgram) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bachelor': return 'bg-blue-100 text-blue-800';
      case 'Master': return 'bg-purple-100 text-purple-800';
      case 'Doctorate': return 'bg-indigo-100 text-indigo-800';
      case 'Certificate': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group h-full flex flex-col">
      <div className="p-4 md:p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="mb-2">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-maroon-800 transition-colors">
                {program.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(program.level)}`}>
                {program.level}
              </span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {program.duration}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">{program.category}</div>
            <div className="text-sm font-medium text-gray-800">{program.acronym}</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span className="font-medium">{program.universities.length}</span> universities
          </div>
        </div>

        {/* Hidden on small and medium screens unless expanded */}
        <div className={`lg:block ${isExpanded ? 'block' : 'hidden'}`}>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{program.description}</p>

          <div className="mb-6 flex-1">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Available at:</h4>
            <div className="flex flex-wrap gap-2">
              {program.universities.slice(0, 3).map((university, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                >
                  {university}
                </span>
              ))}
              {program.universities.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                  +{program.universities.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* See More/Less button - only show on small and medium screens */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-maroon-600 hover:text-maroon-800 font-medium text-sm transition-colors"
          >
            {isExpanded ? 'See Less' : 'See More'}
          </button>
        </div>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onViewDetails(program)}
            className="flex-1 px-4 py-2 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-all duration-300"
          >
            View Details
          </button>
          <button
            onClick={() => onFindUniversities(program)}
            className="flex-1 px-4 py-2 bg-maroon-800 text-white rounded-lg hover:bg-maroon-700 transition-all duration-300"
          >
            Find Universities
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Programs() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [programs, setPrograms] = useState<AggregatedProgram[]>([]);
  const [totalProgramsCount, setTotalProgramsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '');
  const [levelFilter, setLevelFilter] = useState('');
  const [sortBy] = useState('popularity');

  // Fetch programs data
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setIsLoading(true);
        const [aggregatedData, allPrograms] = await Promise.all([
          AcademicProgramService.getAggregatedPrograms(),
          AcademicProgramService.getAllPrograms()
        ]);
        setPrograms(aggregatedData);
        setTotalProgramsCount(allPrograms.length);
      } catch (error) {
        console.error('Failed to fetch programs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const categories = [...new Set(programs.map(p => p.category))];
  const levels = [...new Set(programs.map(p => p.level))];

  const filteredPrograms = useMemo(() => {
    const filtered = programs.filter(program => {
      // Enhanced search using searchKeywords array for better matching
      const matchesSearch = searchQuery === '' ||
        program.searchKeywords.some(keyword =>
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.acronym.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = !categoryFilter || program.category === categoryFilter;
      const matchesLevel = !levelFilter || program.level === levelFilter;

      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort programs by popularity (default sort)
    filtered.sort((a, b) => b.popularity - a.popularity);

    return filtered;
  }, [searchQuery, categoryFilter, levelFilter, programs]);

  const handleViewDetails = (program: AggregatedProgram) => {
    // For now, show program details. Could be enhanced to navigate to a dedicated program details page
    const details = `Program: ${program.name} (${program.acronym})\n\nDescription: ${program.description}\n\nRequirements: ${program.requirements.join(', ')}\n\nDuration: ${program.duration}\n\nCategory: ${program.category}\n\nAvailable at: ${program.universities.join(', ')}`;
    alert(details);
  };

  const handleFindUniversities = (program: AggregatedProgram) => {
    // Navigate to universities page with program filter
    // Use the original program name for display, but the system will normalize it
    const programName = encodeURIComponent(program.name.toLowerCase());
    navigate(`/universities?program=${programName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Programs</h1>
          <p className="text-xl text-maroon-100 max-w-3xl">
            Explore diverse academic programs and find the perfect course for your career goals.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-maroon-800 mb-2">{totalProgramsCount}</div>
              <div className="text-gray-600">Programs Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-maroon-800 mb-2">{categories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-maroon-800 mb-2">{[...new Set(programs.flatMap(p => p.universities))].length}</div>
              <div className="text-gray-600">Universities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-row gap-2 md:gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search programs, careers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
            >
              <option value="">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredPrograms.length} of {programs.length} programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onViewDetails={handleViewDetails}
              onFindUniversities={handleFindUniversities}
            />
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <BookOpen className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
