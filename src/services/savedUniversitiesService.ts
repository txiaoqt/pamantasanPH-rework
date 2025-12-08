import { supabase } from '../lib/supabase'

export interface SavedUniversity {
  id: number
  university_id: number
  user_id: string
  saved_at: string
}

export class SavedUniversitiesService {
  /**
   * Get all saved universities for the current user
   */
  static async getSavedUniversities(): Promise<number[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Fallback to localStorage for unauthenticated users
        return this.getLocalSavedUniversities()
      }

      const { data, error } = await supabase
        .from('saved_universities')
        .select('university_id')
        .eq('user_id', user.id)

      if (error) {
        console.error('Error fetching saved universities:', error)
        throw error
      }

      return data.map(item => item.university_id)
    } catch (error) {
      console.error('Failed to fetch saved universities:', error)
      // Fallback to local storage
      return this.getLocalSavedUniversities()
    }
  }

  /**
   * Save a university for the current user
   */
  static async saveUniversity(universityId: number): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Fallback to localStorage for unauthenticated users
        return this.saveUniversityLocally(universityId)
      }

      const { error } = await supabase
        .from('saved_universities')
        .insert({
          university_id: universityId,
          user_id: user.id
        })

      if (error) {
        console.error('Error saving university:', error)
        throw error
      }
    } catch (error) {
      console.error('Failed to save university:', error)
      // Fallback to local storage
      return this.saveUniversityLocally(universityId)
    }
  }

  /**
   * Remove a saved university for the current user
   */
  static async unsaveUniversity(universityId: number): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Fallback to localStorage for unauthenticated users
        return this.unsaveUniversityLocally(universityId)
      }

      const { error } = await supabase
        .from('saved_universities')
        .delete()
        .eq('user_id', user.id)
        .eq('university_id', universityId)

      if (error) {
        console.error('Error unsaving university:', error)
        throw error
      }
    } catch (error) {
      console.error('Failed to unsave university:', error)
      // Fallback to local storage
      return this.unsaveUniversityLocally(universityId)
    }
  }

  /**
   * Check if a university is saved by the current user
   */
  static async isUniversitySaved(universityId: number): Promise<boolean> {
    try {
      const savedIds = await this.getSavedUniversities()
      return savedIds.includes(universityId)
    } catch (error) {
      console.error('Failed to check if university is saved:', error)
      return this.isUniversitySavedLocally(universityId)
    }
  }

  /**
   * Clear all saved universities for the current user
   */
  static async clearAllSavedUniversities(): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // Fallback to localStorage for unauthenticated users
        return this.clearAllSavedUniversitiesLocally()
      }

      const { error } = await supabase
        .from('saved_universities')
        .delete()
        .eq('user_id', user.id)

      if (error) {
        console.error('Error clearing saved universities:', error)
        throw error
      }
    } catch (error) {
      console.error('Failed to clear saved universities:', error)
      // Fallback to local storage
      return this.clearAllSavedUniversitiesLocally()
    }
  }

  // Local storage fallback methods for unauthenticated users
  private static getLocalSavedUniversities(): number[] {
    try {
      const saved = localStorage.getItem('savedUniversities')
      if (saved) {
        const parsedSaved: SavedUniversity[] = JSON.parse(saved)
        return parsedSaved.map((item) => item.id)
      }
      return []
    } catch (error) {
      console.error('Error loading local saved universities:', error)
      return []
    }
  }

  private static saveUniversityLocally(universityId: number): void {
    try {
      const saved = localStorage.getItem('savedUniversities')
      let savedUniversities: SavedUniversity[] = []

      if (saved) {
        savedUniversities = JSON.parse(saved) as SavedUniversity[]
      }

      // Check if already saved
      if (!savedUniversities.some(item => item.id === universityId)) {
        savedUniversities.push({
          id: universityId,
          university_id: universityId,
          user_id: 'local-user',
          saved_at: new Date().toISOString()
        })

        localStorage.setItem('savedUniversities', JSON.stringify(savedUniversities))
      }
    } catch (error) {
      console.error('Error saving university locally:', error)
    }
  }

  private static unsaveUniversityLocally(universityId: number): void {
    try {
      const saved = localStorage.getItem('savedUniversities')
      if (saved) {
        let savedUniversities: SavedUniversity[] = JSON.parse(saved) as SavedUniversity[]
        savedUniversities = savedUniversities.filter(item => item.id !== universityId)
        localStorage.setItem('savedUniversities', JSON.stringify(savedUniversities))
      }
    } catch (error) {
      console.error('Error unsaving university locally:', error)
    }
  }

  private static isUniversitySavedLocally(universityId: number): boolean {
    try {
      const savedIds = this.getLocalSavedUniversities()
      return savedIds.includes(universityId)
    } catch (error) {
      console.error('Error checking if university is saved locally:', error)
      return false
    }
  }

  private static clearAllSavedUniversitiesLocally(): void {
    try {
      localStorage.removeItem('savedUniversities')
    } catch (error) {
      console.error('Error clearing local saved universities:', error)
    }
  }
}
