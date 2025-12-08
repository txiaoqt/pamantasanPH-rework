import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Grid, List } from 'lucide-react';
import UniversityCard, { University } from '../components/university/UniversityCard';
import { UniversityService } from '../services/universityService';

export default function Universities() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('id');
  const [universities, setUniversities] = useState<University[]>([]);
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

  const filteredUniversities = useMemo(() => {
    const filtered = universities.filter(university => {
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
        case 'rating':
          return b.rating - a.rating;
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
  }, [universities, searchQuery, locationFilter, typeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Universities</h1>
          <p className="text-xl text-maroon-100 max-w-3xl">
            Discover and explore universities across the Philippines. Find the
            perfect institution for your educational journey.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
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
                <option value="rating">Sort by Rating</option>
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
        ) : (
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
        )}
      </div>
    </div>
  );
}
