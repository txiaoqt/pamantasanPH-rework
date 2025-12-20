import { supabase, DatabaseAcademicProgram, AcademicProgram, transformDbAcademicProgramToAcademicProgram } from '../lib/supabase'

export class AcademicProgramService {
  /**
   * Fetch all academic programs for a specific university
   */
  static async getProgramsByUniversityId(universityId: number): Promise<AcademicProgram[]> {
    try {
      const { data, error } = await supabase
        .from('academic_programs')
        .select('*')
        .eq('university_id', universityId)
        .order('college_name', { ascending: true })
        .order('degree_level', { ascending: true })
        .order('program_name', { ascending: true })

      if (error) {
        console.error('Error fetching academic programs:', error)
        throw error
      }

      return (data as DatabaseAcademicProgram[]).map(transformDbAcademicProgramToAcademicProgram)
    } catch (error) {
      console.error('Failed to fetch academic programs:', error)
      throw error
    }
  }

  /**
   * Fetch academic programs grouped by college for a university
   */
  static async getProgramsGroupedByCollege(universityId: number): Promise<Record<string, AcademicProgram[]>> {
    try {
      const programs = await this.getProgramsByUniversityId(universityId)

      // Group programs by college name
      const grouped: Record<string, AcademicProgram[]> = {}
      programs.forEach(program => {
        if (!grouped[program.collegeName]) {
          grouped[program.collegeName] = []
        }
        grouped[program.collegeName].push(program)
      })

      return grouped
    } catch (error) {
      console.error('Failed to fetch grouped academic programs:', error)
      throw error
    }
  }

  /**
   * Create a new academic program
   */
  static async createProgram(program: Omit<AcademicProgram, 'id'>): Promise<AcademicProgram> {
    try {
      const { data, error } = await supabase
        .from('academic_programs')
        .insert({
          university_id: program.universityId,
          college_name: program.collegeName,
          degree_level: program.degreeLevel || null,
          program_name: program.programName,
          specializations: program.specializations || null,
          program_type: program.programType || null,
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating academic program:', error)
        throw error
      }

      return transformDbAcademicProgramToAcademicProgram(data as DatabaseAcademicProgram)
    } catch (error) {
      console.error('Failed to create academic program:', error)
      throw error
    }
  }

  /**
   * Update an existing academic program
   */
  static async updateProgram(id: number, updates: Partial<Omit<AcademicProgram, 'id' | 'universityId'>>): Promise<AcademicProgram> {
    try {
      const { data, error } = await supabase
        .from('academic_programs')
        .update({
          college_name: updates.collegeName,
          degree_level: updates.degreeLevel || null,
          program_name: updates.programName,
          specializations: updates.specializations || null,
          program_type: updates.programType || null,
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        console.error('Error updating academic program:', error)
        throw error
      }

      return transformDbAcademicProgramToAcademicProgram(data as DatabaseAcademicProgram)
    } catch (error) {
      console.error('Failed to update academic program:', error)
      throw error
    }
  }

  /**
   * Delete an academic program
   */
  static async deleteProgram(id: number): Promise<void> {
    try {
      const { error } = await supabase
        .from('academic_programs')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting academic program:', error)
        throw error
      }
    } catch (error) {
      console.error('Failed to delete academic program:', error)
      throw error
    }
  }

  /**
   * Get program count for a university
   */
  static async getProgramCount(universityId: number): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('academic_programs')
        .select('*', { count: 'exact', head: true })
        .eq('university_id', universityId)

      if (error) {
        console.error('Error counting academic programs:', error)
        throw error
      }

      return count || 0
    } catch (error) {
      console.error('Failed to count academic programs:', error)
      throw error
    }
  }
}
