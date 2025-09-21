import React, { useState, useMemo } from 'react';
import { Search, MapPin, Filter, Star, Users, BookOpen, Heart, BarChart3, ExternalLink, Grid, List } from 'lucide-react';

interface University {
  id: number;
  name: string;
  location: string;
  province: string;
  established: string;
  type: 'Public' | 'Private' | 'State';
  rating: number;
  students: string;
  programs: number;
  description: string;
  subjects: string[];
  imageUrl: string;
  tuitionRange: string;
  accreditation: string[];
}

const universities: University[] = [
  {
    id: 1,
    name: 'University of the Philippines Diliman',
    location: 'Quezon City',
    province: 'Metro Manila',
    established: '1908',
    type: 'Public',
    rating: 4.6,
    students: '27,000',
    programs: 85,
    description: 'The flagship campus of the University of the Philippines System, known for academic excellence and research.',
    subjects: ['Engineering', 'Medicine', 'Law', 'Liberal Arts', 'Science'],
    imageUrl: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    tuitionRange: '₱12,000 - ₱24,000',
    accreditation: ['CHED', 'PAASCU', 'ISO 9001:2015']
  },
  {
    id: 2,
    name: 'Polytechnic University of the Philippines',
    location: 'Manila',
    province: 'Metro Manila',
    established: '1904',
    type: 'State',
    rating: 4.4,
    students: '65,000',
    programs: 120,
    description: 'A premier state university offering quality education with emphasis on technology and innovation.',
    subjects: ['Engineering', 'Business', 'Computer Science', 'Architecture', 'Education'],
    imageUrl: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    tuitionRange: '₱8,000 - ₱15,000',
    accreditation: ['CHED', 'AACCUP', 'PRC']
  },
  {
    id: 3,
    name: 'Ateneo de Manila University',
    location: 'Quezon City',
    province: 'Metro Manila',
    established: '1859',
    type: 'Private',
    rating: 4.5,
    students: '12,500',
    programs: 45,
    description: 'A premier Jesuit university known for holistic education and leadership development.',
    subjects: ['Business', 'Liberal Arts', 'Engineering', 'Medicine', 'Law'],
    imageUrl: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    tuitionRange: '₱180,000 - ₱250,000',
    accreditation: ['CHED', 'PAASCU', 'WASC']
  },
  {
    id: 4,
    name: 'De La Salle University',
    location: 'Manila',
    province: 'Metro Manila',
    established: '1911',
    type: 'Private',
    rating: 4.4,
    students: '20,000',
    programs: 65,
    description: 'A leading Christian Brothers university with strong focus on innovation and technology.',
    subjects: ['Engineering', 'Business', 'Computer Science', 'Liberal Arts', 'Architecture'],
    imageUrl: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    tuitionRange: '₱150,000 - ₱220,000',
    accreditation: ['CHED', 'PAASCU', 'WASC']
  },
  {
    id: 5,
    name: 'University of Santo Tomas',
    location: 'Manila',
    province: 'Metro Manila',
    established: '1611',
    type: 'Private',
    rating: 4.3,
    students: '40,000',
    programs: 78,
    description: 'The oldest existing university in Asia, known for its rich history and academic tradition.',
    subjects: ['Medicine', 'Law', 'Engineering', 'Liberal Arts', 'Pharmacy'],
    imageUrl: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    tuitionRange: '₱120,000 - ₱200,000',
    accreditation: ['CHED', 'PAASCU', 'Vatican']
  },
  {
    id: 6,
    name: 'University of the Philippines Los Baños',
    location: 'Los Baños',
    province: 'Laguna',
    established: '1908',
    type: 'Public',
    rating: 4.5,
    students: '15,000',
    programs: 55,
    description: 'Premier institution for agriculture, forestry, and environmental sciences in Southeast Asia.',
    subjects: ['Agriculture', 'Forestry', 'Veterinary Medicine', 'Engineering', 'Development Communication'],
    imageUrl: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    tuitionRange: '₱12,000 - ₱24,000',
    accreditation: ['CHED', 'PAASCU', 'ISO 9001:2015']
  }
];

interface UniversityCardProps extends University {
  viewMode: 'grid' | 'list';
}

function UniversityCard({ viewMode, ...university }: UniversityCardProps) {
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
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                university.type === 'Public' ? 'bg-blue-100 text-blue-800' :
                university.type === 'State' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {university.type}
              </span>
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
              <button className="p-2 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-colors">
                <Heart className="h-4 w-4" />
              </button>
              <button className="p-2 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-colors">
                <BarChart3 className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 bg-maroon-800 text-white rounded-lg hover:bg-maroon-700 transition-colors flex items-center">
                <ExternalLink className="h-4 w-4 mr-1" />
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative h-48">
        <img
          src={university.imageUrl}
          alt={university.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            university.type === 'Public' ? 'bg-blue-100 text-blue-800' :
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
          <button className="flex-1 flex items-center justify-center px-4 py-2 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-all duration-300">
            <Heart className="h-4 w-4 mr-1" />
            Save
          </button>
          <button className="flex-1 flex items-center justify-center px-4 py-2 text-maroon-700 border border-maroon-200 rounded-lg hover:bg-maroon-50 transition-all duration-300">
            <BarChart3 className="h-4 w-4 mr-1" />
            Compare
          </button>
          <button className="flex-1 flex items-center justify-center px-4 py-2 bg-maroon-800 text-white rounded-lg hover:bg-maroon-700 transition-all duration-300">
            <ExternalLink className="h-4 w-4 mr-1" />
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Universities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  const filteredUniversities = useMemo(() => {
    let filtered = universities.filter(university => {
      const matchesSearch = university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          university.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesLocation = !locationFilter || university.province.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesType = !typeFilter || university.type === typeFilter;
      
      return matchesSearch && matchesLocation && matchesType;
    });

    // Sort universities
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'students':
          return parseInt(b.students.replace(',', '')) - parseInt(a.students.replace(',', ''));
        case 'established':
          return parseInt(a.established) - parseInt(b.established);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, locationFilter, typeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Universities</h1>
          <p className="text-xl text-maroon-100 max-w-3xl">
            Discover and explore universities across the Philippines. Find the perfect institution for your educational journey.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
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

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="rating">Sort by Rating</option>
                <option value="students">Sort by Students</option>
                <option value="established">Sort by Year</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-maroon-100 text-maroon-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-maroon-100 text-maroon-800' : 'text-gray-600 hover:bg-gray-100'
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
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredUniversities.length} of {universities.length} universities
          </p>
        </div>

        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          : "space-y-6"
        }>
          {filteredUniversities.map((university) => (
            <UniversityCard key={university.id} viewMode={viewMode} {...university} />
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No universities found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}