import React, { useState, useEffect } from 'react';
import {
  Plus,
  X,
  Star,
  Users,
  BookOpen,
  MapPin,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { UniversityService } from '../services/universityService';

interface University {
  id: number;
  name: string;
  location: string;
  type: string;
  established: string;
  students: string;
  programs: number;
  accreditation: string[];
  imageUrl: string;
  strengths?: string[];
  facilities?: string[];
  admissionRate?: string;
  graduationRate?: string;
  employmentRate?: string;
}

interface ComparisonTableProps {
  selectedUniversities: University[];
  onRemove: (id: number) => void;
}

function ComparisonTable({ selectedUniversities, onRemove }: ComparisonTableProps) {
  if (selectedUniversities.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <TrendingUp className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Start Comparing Universities
        </h3>
        <p className="text-gray-600">
          Select universities from the list below to compare their features.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-maroon-50">
            <tr>
              <td className="px-6 py-4 font-semibold text-gray-900 w-48">
                University
              </td>
              {selectedUniversities.map((university) => (
                <td
                  key={university.id}
                  className="px-6 py-4 text-center min-w-64"
                >
                  <div className="relative">
                    <button
                      onClick={() => onRemove(university.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <img
                      src={university.imageUrl}
                      alt={university.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-bold text-gray-900 text-sm">
                      {university.name}
                    </h3>
                  </div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
                Location
              </td>
              {selectedUniversities.map((university) => (
                <td key={university.id} className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {university.location}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
                Type
              </td>
              {selectedUniversities.map((university) => (
                <td key={university.id} className="px-6 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      university.type === 'Public'
                        ? 'bg-blue-100 text-blue-800'
                        : university.type === 'State'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {university.type}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
                Established
              </td>
              {selectedUniversities.map((university) => (
                <td
                  key={university.id}
                  className="px-6 py-4 text-center text-gray-600"
                >
                  {university.established}
                </td>
              ))}
            </tr>

            <tr>
              <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
                Students
              </td>
              {selectedUniversities.map((university) => (
                <td key={university.id} className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {university.students}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
                Programs
              </td>
              {selectedUniversities.map((university) => (
                <td key={university.id} className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center text-gray-600">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {university.programs}
                  </div>
                </td>
              ))}
            </tr>


            {/* Optional fields – only render if present in universities.ts */}
            {['admissionRate', 'graduationRate', 'employmentRate'].map((field) => (
              <tr key={field}>
                <td className="px-6 py-4 font-medium text-gray-900 bg-gray-50">
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </td>
                {selectedUniversities.map((university) => (
                  <td
                    key={university.id}
                    className="px-6 py-4 text-center text-gray-600"
                  >
                    {university[field as keyof University] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Compare() {
  const [selectedUniversities, setSelectedUniversities] = useState<University[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await UniversityService.getAllUniversities();
        setUniversities(data);
      } catch (error) {
        console.error('Failed to fetch universities:', error);
        setUniversities([]);
      }
    };

    fetchUniversities();
  }, []);

  const addUniversity = (university: University) => {
    if (
      selectedUniversities.length < 4 &&
      !selectedUniversities.find((u) => u.id === university.id)
    ) {
      setSelectedUniversities([...selectedUniversities, university]);
    }
  };

  const removeUniversity = (id: number) => {
    setSelectedUniversities(selectedUniversities.filter((u) => u.id !== id));
  };

  const availableUniversities = universities.filter(
    (u) => !selectedUniversities.find((selected) => selected.id === u.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-maroon-900 via-maroon-800 to-red-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Compare Universities</h1>
          <p className="text-xl text-maroon-100 max-w-3xl">
            Compare universities side-by-side to make an informed decision about
            your education.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selection Info */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                University Comparison
              </h2>
              <p className="text-gray-600">
                Selected {selectedUniversities.length} of 4 universities for
                comparison
              </p>
            </div>
            {selectedUniversities.length > 0 && (
              <button
                onClick={() => setSelectedUniversities([])}
                className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-8">
          <ComparisonTable
            selectedUniversities={selectedUniversities}
            onRemove={removeUniversity}
          />
        </div>

        {/* Available Universities */}
        {availableUniversities.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Add Universities to Compare
              {selectedUniversities.length >= 4 && (
                <span className="text-sm font-normal text-gray-600 ml-2">
                  (Maximum 4 universities reached)
                </span>
              )}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableUniversities.map((university) => (
                <div
                  key={university.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <img
                    src={university.imageUrl}
                    alt={university.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {university.name}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {university.location}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          university.type === 'Public'
                            ? 'bg-blue-100 text-blue-800'
                            : university.type === 'State'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {university.type}
                      </span>
                    </div>
                    <button
                      onClick={() => addUniversity(university)}
                      disabled={selectedUniversities.length >= 4}
                      className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors ${
                        selectedUniversities.length >= 4
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-maroon-800 text-white hover:bg-maroon-700'
                      }`}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add to Compare
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
