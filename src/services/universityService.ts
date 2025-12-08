import { supabase, DatabaseUniversity, transformDbUniversityToUniversity } from '../lib/supabase'
import { University } from '../components/university/UniversityCard'

export class UniversityService {
  /**
   * Fetch all universities from Supabase
   */
  static async getAllUniversities(): Promise<University[]> {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .order('name', { ascending: true })

      if (error) {
        console.error('Error fetching universities:', error)
        throw error
      }

      return (data as DatabaseUniversity[]).map(transformDbUniversityToUniversity)
    } catch (error) {
      console.error('Failed to fetch universities:', error)
      // No fallback - throw error to let components handle it
      throw error
    }
  }

  /**
   * Fetch a single university by ID
   */
  static async getUniversityById(id: number): Promise<University | null> {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching university:', error)
        throw error
      }

      return transformDbUniversityToUniversity(data as DatabaseUniversity)
    } catch (error) {
      console.error('Failed to fetch university:', error)
      throw error // Let components handle the error
    }
  }

  /**
   * Filter universities by criteria
   */
  static async filterUniversities(filters: {
    location?: string
    type?: string
    minRating?: number
    maxTuition?: number
    subjects?: string[]
  }): Promise<University[]> {
    try {
      let query = supabase.from('universities').select('*')

      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`)
      }

      if (filters.type) {
        query = query.eq('type', filters.type)
      }

      if (filters.minRating) {
        query = query.gte('rating', filters.minRating)
      }

      // For tuition filtering, this would require parsing the tuition_range string
      // For now, we'll skip this advanced filtering and handle it in the frontend

      const { data, error } = await query.order('rating', { ascending: false })

      if (error) {
        console.error('Error filtering universities:', error)
        throw error
      }

      let universities = (data as DatabaseUniversity[]).map(transformDbUniversityToUniversity)

      // Additional client-side filtering for complex criteria
      if (filters.subjects && filters.subjects.length > 0) {
        universities = universities.filter(uni =>
          filters.subjects!.some(subject =>
            uni.subjects.some((uniSubject: string) =>
              uniSubject.toLowerCase().includes(subject.toLowerCase())
            )
          )
        )
      }

      return universities
    } catch (error) {
      console.error('Failed to filter universities:', error)
      throw error // Let components handle the error
    }
  }

  /**
   * Search universities by name or description
   */
  static async searchUniversities(query: string): Promise<University[]> {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)

      if (error) {
        console.error('Error searching universities:', error)
        throw error
      }

      return (data as DatabaseUniversity[]).map(transformDbUniversityToUniversity)
    } catch (error) {
      console.error('Failed to search universities:', error)
      throw error // Let components handle the error
    }
  }

  /**
   * Get featured universities (top rated)
   */
  static async getFeaturedUniversities(limit: number = 6): Promise<University[]> {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .order('rating', { ascending: false })
        .limit(limit)

      if (error) {
        console.error('Error fetching featured universities:', error)
        throw error
      }

      return (data as DatabaseUniversity[]).map(transformDbUniversityToUniversity)
    } catch (error) {
      console.error('Failed to fetch featured universities:', error)
      throw error // Let components handle the error
    }
  }

  /**
   * Get universities by admission status
   */
  static async getUniversitiesByAdmissionStatus(status: 'open' | 'not-yet-open' | 'closed'): Promise<University[]> {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .eq('admission_status', status)

      if (error) {
        console.error('Error fetching universities by admission status:', error)
        throw error
      }

      return (data as DatabaseUniversity[]).map(transformDbUniversityToUniversity)
    } catch (error) {
      console.error('Failed to fetch universities by admission status:', error)
      throw error // Let components handle the error
    }
  }

  /**
   * Get universities by location
   */
  static async getUniversitiesByLocation(location: string): Promise<University[]> {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .ilike('province', `%${location}%`)

      if (error) {
        console.error('Error fetching universities by location:', error)
        throw error
      }

      return (data as DatabaseUniversity[]).map(transformDbUniversityToUniversity)
    } catch (error) {
      console.error('Failed to fetch universities by location:', error)
      throw error // Let components handle the error
    }
  }


}
