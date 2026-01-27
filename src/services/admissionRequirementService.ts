import { supabase } from '../lib/supabase';

export interface UserRequirementChecklistItem {
  id: string;
  user_id: string;
  university_id: number;
  requirement_text: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export class AdmissionRequirementService {
  /**
   * Fetches the user's checklist progress for a specific university.
   * @param userId The ID of the logged-in user.
   * @param universityId The ID of the university.
   * @returns A map where the key is `requirement_text` and the value is `is_completed`.
   */
  static async getUserChecklistProgress(userId: string, universityId: number): Promise<Map<string, boolean>> {
    const { data, error } = await supabase
      .from('user_requirement_checklist')
      .select('requirement_text, is_completed')
      .eq('user_id', userId)
      .eq('university_id', universityId);

    if (error) {
      console.error('Error fetching user checklist progress:', error);
      throw error;
    }

    const progressMap = new Map<string, boolean>();
    data.forEach(item => {
      progressMap.set(item.requirement_text, item.is_completed);
    });

    return progressMap;
  }

  /**
   * Toggles the completion status of a specific admission requirement for a user and university.
   * If the entry doesn't exist, it creates it. If it exists, it updates it.
   * @param userId The ID of the logged-in user.
   * @param universityId The ID of the university.
   * @param requirementText The exact text of the requirement.
   * @param isCompleted The new completion status.
   */
  static async toggleRequirementCompletion(
    userId: string,
    universityId: number,
    requirementText: string,
    isCompleted: boolean
  ): Promise<void> {
    const { data, error } = await supabase
      .from('user_requirement_checklist')
      .upsert(
        {
          user_id: userId,
          university_id: universityId,
          requirement_text: requirementText,
          is_completed: isCompleted,
        },
        { onConflict: 'user_id, university_id, requirement_text' }
      );

    if (error) {
      console.error('Error toggling requirement completion:', error);
      throw error;
    }
  }

  /**
   * Tracks all provided admission requirements for a university for a given user.
   * Inserts new requirements if they don't exist, leaving existing ones untouched.
   * Initial status for new requirements will be `is_completed: false`.
   * @param userId The ID of the logged-in user.
   * @param universityId The ID of the university.
   * @param requirements An array of requirement text strings to track.
   */
  static async trackAllRequirements(
    userId: string,
    universityId: number,
    requirements: string[]
  ): Promise<void> {
    const itemsToUpsert = requirements.map(reqText => ({
      user_id: userId,
      university_id: universityId,
      requirement_text: reqText,
      is_completed: false, // Initially false when tracking
    }));

    if (itemsToUpsert.length === 0) {
      return; // Nothing to track
    }

    const { error } = await supabase
      .from('user_requirement_checklist')
      .upsert(itemsToUpsert, { onConflict: 'user_id, university_id, requirement_text', ignoreDuplicates: true }); // Use ignoreDuplicates for existing items

    if (error) {
      console.error('Error tracking all requirements:', error);
      throw error;
    }
  }

  /**
   * Untracks all admission requirements for a specific university for a given user.
   * Deletes all checklist entries associated with that user and university.
   * @param userId The ID of the logged-in user.
   * @param universityId The ID of the university.
   */
  static async untrackAllRequirements(
    userId: string,
    universityId: number
  ): Promise<void> {
    const { error } = await supabase
      .from('user_requirement_checklist')
      .delete()
      .eq('user_id', userId)
      .eq('university_id', universityId);

    if (error) {
      console.error('Error untracking all requirements:', error);
      throw error;
    }
  }

  /**
   * Checks if any admission requirement for a specific university is being tracked by a user.
   * @param userId The ID of the logged-in user.
   * @param universityId The ID of the university.
   * @returns `true` if at least one requirement is being tracked, `false` otherwise.
   */
  static async isUniversityBeingTracked(userId: string, universityId: number): Promise<boolean> {
    const { count, error } = await supabase
      .from('user_requirement_checklist')
      .select('id', { count: 'exact' })
      .eq('user_id', userId)
      .eq('university_id', universityId)
      .limit(1); // Only need to find one to know if it's tracked

    if (error) {
      console.error('Error checking if university is tracked:', error);
      throw error;
    }

    return (count || 0) > 0;
  }

  /**
   * Fetches all tracked admission requirements for a specific user, grouped by university.
   * @param userId The ID of the logged-in user.
   * @returns An array of UserRequirementChecklistItem, potentially with university details.
   */
  static async getAllTrackedRequirements(userId: string): Promise<UserRequirementChecklistItem[]> {
    const { data, error } = await supabase
      .from('user_requirement_checklist')
      .select(`
        *,
        universities ( name, image_url )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all tracked requirements:', error);
      throw error;
    }

    return data as UserRequirementChecklistItem[];
  }
}