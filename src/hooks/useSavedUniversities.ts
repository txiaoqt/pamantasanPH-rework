import { useState, useEffect } from 'react';

interface SavedUniversity {
  id: number;
  savedAt: string;
}

export function useSavedUniversities() {
  const [savedUniversities, setSavedUniversities] = useState<SavedUniversity[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedUniversities');
    if (saved) {
      setSavedUniversities(JSON.parse(saved));
    }
  }, []);

  const isSaved = (id: number) => {
    return savedUniversities.some(saved => saved.id === id);
  };

  const toggleSaved = (id: number) => {
    let updated: SavedUniversity[];
    
    if (isSaved(id)) {
      updated = savedUniversities.filter(saved => saved.id !== id);
    } else {
      updated = [...savedUniversities, { id, savedAt: new Date().toISOString() }];
    }
    
    setSavedUniversities(updated);
    localStorage.setItem('savedUniversities', JSON.stringify(updated));
  };

  return {
    savedUniversities,
    isSaved,
    toggleSaved
  };
}