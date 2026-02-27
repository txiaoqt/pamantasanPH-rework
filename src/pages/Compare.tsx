import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, X, BarChart3
} from 'lucide-react';
import { UniversityService } from '../services/universityService';
import { University } from '../components/university/UniversityCard';

type ComparisonUniversity = University;

function Compare() {
  const navigate = useNavigate();
  const [selectedUniversities, setSelectedUniversities] = useState<ComparisonUniversity[]>([]);
  const [allUniversities, setAllUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setIsLoading(true);
        const storedIds = JSON.parse(localStorage.getItem('compareUniversities') || '[]').map((u: { id: number }) => u.id);
        
        const allData = await UniversityService.getAllUniversities();
        setAllUniversities(allData);

        if (storedIds.length > 0) {
          const selectedData = allData.filter(u => storedIds.includes(u.id));
          setSelectedUniversities(selectedData);
        }
      } catch (error) {
        console.error('Failed to fetch universities:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUniversities();
  }, []);

  const handleRemove = (id: number) => {
    const updatedSelection = selectedUniversities.filter(u => u.id !== id);
    setSelectedUniversities(updatedSelection);
    
    const storedItems = JSON.parse(localStorage.getItem('compareUniversities') || '[]').filter((u: { id: number }) => u.id !== id);
    localStorage.setItem('compareUniversities', JSON.stringify(storedItems));
    
    if (mobileActiveIndex >= updatedSelection.length) {
      setMobileActiveIndex(Math.max(0, updatedSelection.length - 1));
    }
  };
  
  const availableUniversities = allUniversities.filter(
    (u) => !selectedUniversities.find((selected) => selected.id === u.id)
  );

  const addUniversity = (university: University) => {
    if (selectedUniversities.length < 3) {
      const newSelection = [...selectedUniversities, university];
      setSelectedUniversities(newSelection);
      
      const storedItems = JSON.parse(localStorage.getItem('compareUniversities') || '[]');
      storedItems.push({ id: university.id, name: university.name, imageUrl: university.imageUrl });
      localStorage.setItem('compareUniversities', JSON.stringify(storedItems));
    } else {
      alert('You can compare a maximum of 3 universities.');
    }
  };

  const getBestValue = (key: 'students' | 'programs' | 'established', higherIsBetter: boolean) => {
    if (selectedUniversities.length < 2) return null;
    
    const values = selectedUniversities.map(u => {
      const value = u[key];
      if (typeof value === 'string') {
        // Attempt to parse string numbers, removing commas
        return parseInt(value.replace(/,/g, ''), 10);
      }
      return value;
    }).filter(v => !isNaN(v as number)) as number[];

    if (values.length === 0) return null;
    
    return higherIsBetter ? Math.max(...values) : Math.min(...values);
  };
  
  const best = {
    students: getBestValue('students', true),
    programs: getBestValue('programs', true),
    established: getBestValue('established', false),
  };

  const comparisonRows = [
    { label: 'Type', key: 'type' },
    { label: 'Location', key: 'location' },
    { label: 'Established', key: 'established' },
    { label: 'Student Population', key: 'students' },
    { label: 'Number of Programs', key: 'programs' },
    { label: 'Accreditation', key: 'accreditation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-maroon-800 dark:bg-maroon-700 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Compare Universities</h1>
          <p className="text-xs sm:text-sm text-maroon-100 dark:text-gray-400 max-w-3xl">
            Compare universities side-by-side to make an informed decision about your education.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedUniversities.length > 0 ? (
          <>
            {/* Desktop View */}
            <div className="hidden lg:block bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex">
                <div className="w-1/4 p-4 font-semibold text-gray-600 dark:text-gray-400 border-r border-gray-200 dark:border-gray-700">Feature</div>
                {selectedUniversities.map(uni => (
                  <div key={uni.id} className="w-1/4 p-4 text-center border-r border-gray-200 dark:border-gray-700 last:border-r-0 relative">
                    <button
                      onClick={() => handleRemove(uni.id)}
                      className="absolute top-2 right-2 bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300 rounded-full p-1 hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <img src={uni.imageUrl} alt={uni.name} className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"/>
                    <p className="font-bold text-gray-800 dark:text-gray-50 text-sm">{uni.name}</p>
                  </div>
                ))}
              </div>
              {comparisonRows.map(row => (
                <div key={row.key} className="flex border-t border-gray-200 dark:border-gray-700">
                  <div className="w-1/4 p-4 font-medium text-gray-700 dark:text-gray-400 bg-gray-50/70 dark:bg-gray-700/70 border-r border-gray-200 dark:border-gray-700">{row.label}</div>
                  {selectedUniversities.map(uni => {
                    const value = uni[row.key as keyof ComparisonUniversity];
                    const isBest = value && (best as Record<string, number | null>)[row.key] !== null && parseInt(String(value).replace(/,/g, '')) === (best as Record<string, number | null>)[row.key];
                    return (
                      <div key={uni.id} className={`w-1/4 p-4 text-center text-sm text-gray-700 dark:text-gray-400 ${isBest ? 'bg-green-50 dark:bg-green-950' : ''}`}>
                        {Array.isArray(value) ? value.slice(0, 2).join(', ') + (value.length > 2 ? '...' : '') : value}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="lg:hidden">
              <div className="flex justify-center mb-4 border border-gray-200 dark:border-gray-700 rounded-lg p-1 bg-gray-100 dark:bg-gray-700">
                {selectedUniversities.map((uni, index) => (
                  <button
                    key={uni.id}
                    onClick={() => setMobileActiveIndex(index)}
                    className={`flex-1 text-center text-sm font-medium py-2 rounded-md transition-colors ${mobileActiveIndex === index ? 'bg-white dark:bg-gray-800 shadow' : 'text-gray-600 dark:text-gray-400'}`}
                  >
                    {uni.name}
                  </button>
                ))}
              </div>
              
              {selectedUniversities[mobileActiveIndex] && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-4 text-center relative">
                    <button
                      onClick={() => handleRemove(selectedUniversities[mobileActiveIndex].id)}
                      className="absolute top-2 right-2 bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300 rounded-full p-1 hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <img src={selectedUniversities[mobileActiveIndex].imageUrl} alt={selectedUniversities[mobileActiveIndex].name} className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"/>
                    <p className="font-bold text-gray-800 dark:text-gray-50">{selectedUniversities[mobileActiveIndex].name}</p>
                  </div>
                  {comparisonRows.map(row => (
                    <div key={row.key} className="flex justify-between p-4 border-t border-gray-100 dark:border-gray-700">
                      <p className="font-medium text-gray-700 dark:text-gray-400">{row.label}</p>
                      <p className="text-gray-700 dark:text-gray-400 text-right">
                        {Array.isArray(selectedUniversities[mobileActiveIndex][row.key as keyof ComparisonUniversity])
                          ? (selectedUniversities[mobileActiveIndex][row.key as keyof ComparisonUniversity] as string[]).slice(0, 2).join(', ') + ((selectedUniversities[mobileActiveIndex][row.key as keyof ComparisonUniversity] as string[]).length > 2 ? '...' : '')
                          : selectedUniversities[mobileActiveIndex][row.key as keyof ComparisonUniversity]
                        }
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-50 mb-2">Your Comparison List is Empty</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Add up to 3 universities to compare them side-by-side.</p>
            <button
              onClick={() => navigate('/universities')}
              className="px-6 py-2 bg-maroon-800 dark:bg-maroon-700 text-white rounded-lg hover:bg-maroon-700 dark:hover:bg-maroon-600 transition-colors"
            >
              Browse Universities
            </button>
          </div>
        )}
        
        <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-6">
              Add More Universities to Compare
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {isLoading ? (
                 [...Array(4)].map((_, i) => <div key={i} className="bg-white dark:bg-gray-800 rounded-xl h-64 animate-pulse"></div>)
              ) : (
                availableUniversities.slice(0, 4).map(uni => (
                  <div key={uni.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center text-center">
                     <img src={uni.imageUrl} alt={uni.name} className="w-20 h-20 rounded-full mb-3 object-cover"/>
                     <h4 className="font-semibold text-sm flex-grow dark:text-gray-50">{uni.name}</h4>
                     <button
                       onClick={() => addUniversity(uni)}
                       disabled={selectedUniversities.length >= 3}
                       className="w-full mt-4 flex items-center justify-center px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-400 dark:disabled:text-gray-500 transition-colors"
                     >
                       <Plus className="h-4 w-4 mr-1" />
                       Add to Compare
                     </button>
                  </div>
                ))
              )}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Compare;

