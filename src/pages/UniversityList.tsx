import React from 'react';
import { universities } from '../components/data/universities'; 
import { Heart } from 'lucide-react';

const UniversityList = () => {

  const handleSave = (universityId: number) => {
    // 1. Retrieve the current saved list from localStorage, or initialize an empty array
    const savedUniversities = JSON.parse(localStorage.getItem('savedUniversities') || '[]');

    // Check if the university is already saved to prevent duplicates
    const isAlreadySaved = savedUniversities.some((item: { id: number }) => item.id === universityId);

    if (!isAlreadySaved) {
      // 2. Add the new university with a timestamp
      const newSavedItem = { id: universityId, savedAt: new Date().toISOString() };
      const updatedSavedList = [...savedUniversities, newSavedItem];

      // 3. Save the complete, updated list back to localStorage
      localStorage.setItem('savedUniversities', JSON.stringify(updatedSavedList));
      console.log(`University with ID ${universityId} has been saved.`);
    } else {
      console.log(`University with ID ${universityId} is already saved.`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Explore Universities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {universities.map(university => (
          <div key={university.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <img src={university.imageUrl} alt={university.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{university.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{university.location}</p>
              <button
                onClick={() => handleSave(university.id)}
                className="flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Heart className="h-4 w-4 mr-2" />
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityList;