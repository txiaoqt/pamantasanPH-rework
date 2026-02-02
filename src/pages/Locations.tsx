import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { UniversityService } from '../services/universityService';

export default function Locations() {
  const [locations, setLocations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        const universities = await UniversityService.getAllUniversities();
        const uniqueLocations = [...new Set(universities.map(uni => uni.province))];
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 dark:from-maroon-800 dark:via-maroon-700 dark:to-red-800 text-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Locations
          </h1>
          <p className="text-xs sm:text-base md:text-lg lg:text-xl text-maroon-100 dark:text-gray-400 max-w-3xl">
            Explore universities by location.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-maroon-800 dark:border-maroon-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {locations.map(location => (
              <Link
                key={location}
                to={`/universities?location=${location}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex items-center space-x-4"
              >
                <MapPin className="h-8 w-8 text-maroon-800 dark:text-maroon-400" />
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-50">{location}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
