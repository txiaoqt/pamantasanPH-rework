import { useState, useEffect } from 'react';
import { SavedUniversitiesService } from '../services/savedUniversitiesService';

interface SavedUniversity {
  id: number;
  savedAt: string;
}

export function useSavedUniversities() {
  const [savedUniversities, setSavedUniversities] = useState<SavedUniversity[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadSavedUniversities = async () => {
      try {
        const savedIds = await SavedUniversitiesService.getSavedUniversities();
        // Convert to the expected format for backward compatibility
        const savedUniversitiesData: SavedUniversity[] = savedIds.map(id => ({
          id,
          savedAt: new Date().toISOString() // Default timestamp, could be enhanced to store actual timestamps
        }));
        setSavedUniversities(savedUniversitiesData);
      } catch (error) {
        console.error('Error loading saved universities:', error);
        setSavedUniversities([]);
      }
      setIsLoaded(true);
    };

    loadSavedUniversities();
  }, []);

  const isSaved = (id: number) => {
    return savedUniversities.some(saved => saved.id === id);
  };

  const toggleSaved = async (id: number) => {
    const isCurrentlySaved = isSaved(id);

    // Optimistically update the state first
    setSavedUniversities(prev => {
      if (isCurrentlySaved) {
        // Remove from saved
        return prev.filter(saved => saved.id !== id);
      } else {
        // Add to saved
        return [...prev, { id, savedAt: new Date().toISOString() }];
      }
    });

    try {
      if (isCurrentlySaved) {
        await SavedUniversitiesService.unsaveUniversity(id);
      } else {
        await SavedUniversitiesService.saveUniversity(id);
      }
    } catch (error) {
      console.error('Error toggling saved university:', error);
      // Revert the optimistic update on error
      setSavedUniversities(prev => {
        if (isCurrentlySaved) {
          // Re-add to saved
          return [...prev, { id, savedAt: new Date().toISOString() }];
        } else {
          // Re-remove from saved
          return prev.filter(saved => saved.id !== id);
        }
      });
    }
  };

  const clearAll = async () => {
    // Optimistically clear the state first
    setSavedUniversities([]);

    try {
      await SavedUniversitiesService.clearAllSavedUniversities();
    } catch (error) {
      console.error('Error clearing saved universities:', error);
      // Revert the optimistic update on error
      const savedIds = await SavedUniversitiesService.getSavedUniversities();
      const savedUniversitiesData: SavedUniversity[] = savedIds.map(id => ({
        id,
        savedAt: new Date().toISOString()
      }));
      setSavedUniversities(savedUniversitiesData);
    }
  };

  return {
    savedUniversities,
    isSaved,
    toggleSaved,
    clearAll,
    isLoaded
  };
}
