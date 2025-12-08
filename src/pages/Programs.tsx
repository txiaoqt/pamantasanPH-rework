import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Clock, Users, Award, TrendingUp } from 'lucide-react';

interface Program {
  id: number;
  name: string;
  category: string;
  level: 'Bachelor' | 'Master' | 'Doctorate' | 'Certificate';
  duration: string;
  universities: string[];
  description: string;
  careerProspects: string[];
  averageSalary: string;
  popularity: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Very Challenging';
  requirements: string[];
}

const programs: Program[] = [
  {
    id: 1,
    name: 'Computer Science',
    category: 'Technology',
    level: 'Bachelor',
    duration: '4 years',
    universities: ['UP Diliman', 'PUP', 'DLSU', 'Ateneo'],
    description: 'Study algorithms, programming, software development, and computer systems.',
    careerProspects: ['Software Developer', 'Data Scientist', 'Systems Analyst', 'IT Consultant'],
    averageSalary: '₱35,000 - ₱80,000',
    popularity: 95,
    difficulty: 'Challenging',
    requirements: ['Mathematics', 'Physics', 'English Proficiency']
  },
  {
    id: 2,
    name: 'Business Administration',
    category: 'Business',
    level: 'Bachelor',
    duration: '4 years',
    universities: ['Ateneo', 'DLSU', 'UST', 'PUP'],
    description: 'Learn management principles, finance, marketing, and organizational behavior.',
    careerProspects: ['Business Manager', 'Marketing Specialist', 'Financial Analyst', 'Entrepreneur'],
    averageSalary: '₱25,000 - ₱60,000',
    popularity: 88,
    difficulty: 'Moderate',
    requirements: ['Mathematics', 'English Proficiency', 'Communication Skills']
  },
  {
    id: 3,
    name: 'Civil Engineering',
    category: 'Engineering',
    level: 'Bachelor',
    duration: '5 years',
    universities: ['UP Diliman', 'PUP', 'DLSU', 'UST'],
    description: 'Design and construct infrastructure projects like buildings, roads, and bridges.',
    careerProspects: ['Civil Engineer', 'Project Manager', 'Construction Manager', 'Structural Engineer'],
    averageSalary: '₱30,000 - ₱70,000',
    popularity: 82,
    difficulty: 'Very Challenging',
    requirements: ['Mathematics', 'Physics', 'Chemistry', 'Technical Drawing']
  },
  {
    id: 4,
    name: 'Nursing',
    category: 'Healthcare',
    level: 'Bachelor',
    duration: '4 years',
    universities: ['UST', 'PUP', 'FEU', 'San Beda'],
    description: 'Provide healthcare services and patient care in various medical settings.',
    careerProspects: ['Registered Nurse', 'Nurse Practitioner', 'Healthcare Administrator', 'Clinical Specialist'],
    averageSalary: '₱20,000 - ₱50,000',
    popularity: 90,
    difficulty: 'Challenging',
    requirements: ['Biology', 'Chemistry', 'Mathematics', 'English Proficiency']
  },
  {
    id: 5,
    name: 'Education',
    category: 'Education',
    level: 'Bachelor',
    duration: '4 years',
    universities: ['PUP', 'UP Diliman', 'DLSU', 'UST'],
    description: 'Prepare to become a professional educator and shape future generations.',
    careerProspects: ['Teacher', 'School Administrator', 'Curriculum Developer', 'Educational Consultant'],
    averageSalary: '₱18,000 - ₱40,000',
    popularity: 75,
    difficulty: 'Moderate',
    requirements: ['English Proficiency', 'Communication Skills', 'Psychology']
  },
  {
    id: 6,
    name: 'Psychology',
    category: 'Social Sciences',
    level: 'Bachelor',
    duration: '4 years',
    universities: ['Ateneo', 'UP Diliman', 'DLSU', 'UST'],
    description: 'Study human behavior, mental processes, and psychological principles.',
    careerProspects: ['Clinical Psychologist', 'Counselor', 'HR Specialist', 'Research Psychologist'],
    averageSalary: '₱22,000 - ₱55,000',
    popularity: 78,
    difficulty: 'Moderate',
    requirements: ['English Proficiency', 'Mathematics', 'Social Studies']
  },
  {
    id: 7,
    name: 'Accountancy',
    category: 'Business',
    level: 'Bachelor',
    duration: '4 years',
    universities: ['DLSU', 'UST', 'PUP', 'San Beda'],
    description: 'Learn financial reporting, auditing, taxation, and business analysis.',
    careerProspects: ['Certified Public Accountant', 'Financial Analyst', 'Auditor', 'Tax Consultant'],
    averageSalary: '₱25,000 - ₱65,000',
    popularity: 85,
    difficulty: 'Challenging',
    requirements: ['Mathematics', 'English Proficiency', 'Analytical Skills']
  },
  {
    id: 8,
    name: 'Architecture',
    category: 'Design',
    level: 'Bachelor',
    duration: '5 years',
    universities: ['UP Diliman', 'UST', 'DLSU', 'Mapua'],
    description: 'Design buildings and spaces that are functional, safe, and aesthetically pleasing.',
    careerProspects: ['Licensed Architect', 'Urban Planner', 'Interior Designer', 'Construction Manager'],
    averageSalary: '₱28,000 - ₱75,000',
    popularity: 70,
    difficulty: 'Very Challenging',
    requirements: ['Mathematics', 'Physics', 'Art', 'Technical Drawing']
  }
];

function ProgramCard(program: Program) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Challenging': return 'bg-orange-100 text-orange-800';
      case 'Very Challenging': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-maroon-800 transition-colors">
              {program.name}
            </h3>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(program.level)}`}>
                {program.level}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(program.difficulty)}`}>
                {program.difficulty}
              </span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {program.duration}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-gray-900">{program.popularity}% popularity</span>
            </div>
            <div className="text-sm text-gray-600">{program.category}</div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{program.description}</p>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Career Prospects:</h4>
          <div className="flex flex-wrap gap-2">
            {program.careerProspects.slice(0, 3).map((career, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-maroon-50 text-maroon-700 text-xs rounded-full font-medium"
              >
                {career}
              </span>
            ))}
            {program.careerProspects.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{program.careerProspects.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Award className="h-4 w-4 mr-1" />
            <span className="font-medium">{program.averageSalary}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span className="font-medium">{program.universities.length}</span> universities
          </div>
        </div>

        <div className="mb-6">
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

        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-all duration-300">
            View Details
          </button>
          <button className="flex-1 px-4 py-2 bg-maroon-800 text-white rounded-lg hover:bg-maroon-700 transition-all duration-300">
            Find Universities
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Programs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const categories = [...new Set(programs.map(p => p.category))];
  const levels = [...new Set(programs.map(p => p.level))];

  const filteredPrograms = useMemo(() => {
    const filtered = programs.filter(program => {
      const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          program.careerProspects.some(career => career.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = !categoryFilter || program.category === categoryFilter;
      const matchesLevel = !levelFilter || program.level === levelFilter;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort programs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        default:
          return b.popularity - a.popularity;
      }
    });

    return filtered;
  }, [searchQuery, categoryFilter, levelFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 text-white py-16">
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-maroon-800 mb-2">{programs.length}+</div>
              <div className="text-gray-600">Programs Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-maroon-800 mb-2">{categories.length}</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-maroon-800 mb-2">120+</div>
              <div className="text-gray-600">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-maroon-800 mb-2">85%</div>
              <div className="text-gray-600">Employment Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
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

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="name">Sort by Name</option>
              <option value="duration">Sort by Duration</option>
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
            <ProgramCard key={program.id} {...program} />
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
