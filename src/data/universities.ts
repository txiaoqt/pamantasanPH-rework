import { University } from "../components/university/UniversityCard";
import { UniversityService } from "../services/universityService";

/**
 * Fetch all universities directly from Supabase - no fallbacks!
 * All university data is now purely dynamic from your database.
 */
export const getUniversities = async (): Promise<University[]> => {
  try {
    // Direct fetch from Supabase - if it fails, components will show appropriate error states
    return await UniversityService.getAllUniversities();
  } catch (error) {
    console.error('Failed to fetch universities from Supabase:', error);
    // Let components handle the error gracefully - no static fallback
    throw error; // Throw error instead of returning empty array to allow proper error handling
  }
};
