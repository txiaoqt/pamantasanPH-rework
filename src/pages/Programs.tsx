import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, BookOpen, Clock, Users, Award, TrendingUp } from 'lucide-react';
import { AcademicProgramService, AggregatedProgram } from '../services/academicProgramService';
import { UniversityService } from '../services/universityService';

function ProgramCard({ program, onFindUniversities }: {
  program: AggregatedProgram;
  onFindUniversities: (program: AggregatedProgram) => void;
}) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bachelors': return 'bg-blue-100 text-blue-800';
      case 'Masters': return 'bg-purple-100 text-purple-800';
      case 'Doctorate': return 'bg-indigo-100 text-indigo-800';
      case 'Diploma': return 'bg-green-100 text-green-800';
      case 'Certificate': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 group h-full flex flex-col">
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${getLevelColor(program.level)}`}>
            {program.level}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-maroon-800 transition-colors">
          {program.name}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-grow">
          {program.description}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <span>Offered in <span className="font-bold text-gray-700">{program.universities.length}</span> Universities</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
            <span>Category: <span className="font-bold text-gray-700">{program.category}</span></span>
          </div>
        </div>
      </div>
      <div className="p-5 bg-gray-50/70 rounded-b-xl">
        <button
          onClick={() => onFindUniversities(program)}
          className="w-full px-4 py-2 bg-maroon-800 text-white text-sm font-semibold rounded-lg hover:bg-maroon-700 transition-colors"
        >
          Find Universities
        </button>
      </div>
    </div>
  );
}

export default function Programs() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [programs, setPrograms] = useState<AggregatedProgram[]>([]);
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
        const [aggregatedData] = await Promise.all([
          AcademicProgramService.getAggregatedPrograms(),
          AcademicProgramService.getAllPrograms()
        ]);
                  setPrograms(aggregatedData);      } catch (error) {
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
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Academic Programs</h1>
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-maroon-100 max-w-3xl">
            Explore diverse academic programs and find the perfect course for your career goals.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-maroon-800 mb-2">{programs.length}</div>
              <div className="text-gray-600">Unique Programs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-maroon-800 mb-2">{categories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-maroon-800 mb-2">{[...new Set(programs.flatMap(p => p.universities))].length}</div>
              <div className="text-gray-600">Universities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-maroon-500 focus:border-maroon-500"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-maroon-500 focus:border-maroon-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-maroon-500 focus:border-maroon-500"
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
          <p className="text-sm text-gray-600">
            Showing {filteredPrograms.length} of {programs.length} programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onFindUniversities={handleFindUniversities}
            />
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <BookOpen className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No programs found</h3>
            <p className="text-sm text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>


    </div>
  );
}
