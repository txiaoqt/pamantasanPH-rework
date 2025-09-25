import { useState, useEffect } from 'react';

interface SavedUniversity {
  id: number;
  savedAt: string;
}

export function useSavedUniversities() {
  const [savedUniversities, setSavedUniversities] = useState<SavedUniversity[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('savedUniversities');
      if (saved) {
        const parsedSaved = JSON.parse(saved);
        setSavedUniversities(parsedSaved);
      }
    } catch (error) {
      console.error('Error loading saved universities:', error);
      setSavedUniversities([]);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever savedUniversities changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('savedUniversities', JSON.stringify(savedUniversities));
      } catch (error) {
        console.error('Error saving universities:', error);
      }
    }
  }, [savedUniversities, isLoaded]);

  const isSaved = (id: number) => {
    return savedUniversities.some(saved => saved.id === id);
  };

  const toggleSaved = (id: number) => {
    setSavedUniversities(prev => {
      if (prev.some(saved => saved.id === id)) {
        // Remove from saved
        return prev.filter(saved => saved.id !== id);
      } else {
        // Add to saved
        return [...prev, { id, savedAt: new Date().toISOString() }];
      }
    });
  };

  const clearAll = () => {
    setSavedUniversities([]);
  };

  return {
    savedUniversities,
    isSaved,
    toggleSaved,
    clearAll,
    isLoaded
  };
}