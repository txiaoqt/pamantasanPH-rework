import { supabase, DatabaseAcademicProgram, AcademicProgram, transformDbAcademicProgramToAcademicProgram } from '../lib/supabase'

// Aggregated program interface for the Programs page
export interface AggregatedProgram {
  id: number;
  name: string;
  acronym: string;
  category: string;
  level: 'Bachelor' | 'Master' | 'Doctorate' | 'Certificate';
  duration: string;
  universities: string[];
  description: string;
  averageSalary: string;
  popularity: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Very Challenging';
  requirements: string[];
  programType?: string;
  specializations?: string[];
  searchKeywords: string[];
}

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

  /**
   * Fetch all academic programs across all universities
   */
  static async getAllPrograms(): Promise<AcademicProgram[]> {
    try {
      const { data, error } = await supabase
        .from('academic_programs')
        .select('*')
        .order('program_name', { ascending: true })

      if (error) {
        console.error('Error fetching all academic programs:', error)
        throw error
      }

      return (data as DatabaseAcademicProgram[]).map(transformDbAcademicProgramToAcademicProgram)
    } catch (error) {
      console.error('Failed to fetch all academic programs:', error)
      throw error
    }
  }

  /**
   * Get aggregated program data for the Programs page
   */
  static async getAggregatedPrograms(): Promise<AggregatedProgram[]> {
    try {
      // Fetch all programs and universities
      const [programs, universities] = await Promise.all([
        this.getAllPrograms(),
        supabase.from('universities').select('id, name')
      ]);

      if (universities.error) {
        console.error('Error fetching universities:', universities.error);
        throw universities.error;
      }

      // Create university name map
      const universityMap = new Map(universities.data.map(u => [u.id, u.name]));

      // Group programs by normalized program name and create aggregated data
      const programGroups: Record<string, AcademicProgram[]> = {};
      programs.forEach(program => {
        const key = this.normalizeProgramName(program.programName);
        if (!programGroups[key]) {
          programGroups[key] = [];
        }
        programGroups[key].push(program);
      });

      // Convert to aggregated programs
      const aggregatedPrograms: AggregatedProgram[] = Object.entries(programGroups).map(([, programs]) => {
        const firstProgram = programs[0];
        const universityNames = programs.map(p => universityMap.get(p.universityId) || 'Unknown').filter((name, index, arr) => arr.indexOf(name) === index);
        const acronym = this.generateAcronym(firstProgram.programName);

        return {
          id: firstProgram.id,
          name: firstProgram.programName,
          acronym: acronym,
          category: this.categorizeProgram(firstProgram.programName),
          level: this.mapDegreeLevel(firstProgram.degreeLevel),
          duration: this.estimateDuration(firstProgram.degreeLevel),
          universities: universityNames,
          description: this.generateDescription(firstProgram.programName),
          averageSalary: this.estimateSalary(firstProgram.programName),
          popularity: this.calculatePopularity(programs.length),
          difficulty: this.assessDifficulty(firstProgram.programName),
          requirements: this.generateRequirements(firstProgram.programName),
          programType: firstProgram.programType,
          specializations: firstProgram.specializations,
          searchKeywords: this.generateSearchKeywords(firstProgram.programName, acronym)
        };
      });

      return aggregatedPrograms;
    } catch (error) {
      console.error('Failed to get aggregated programs:', error);
      throw error;
    }
  }

  private static categorizeProgram(programName: string): string {
    const name = programName.toLowerCase();

    if (name.includes('computer') || name.includes('information technology') || name.includes('software') || name.includes('data')) {
      return 'Technology';
    }
    if (name.includes('business') || name.includes('management') || name.includes('finance') || name.includes('marketing') || name.includes('account') || name.includes('economics')) {
      return 'Business';
    }
    if (name.includes('engineering') || name.includes('civil') || name.includes('mechanical') || name.includes('electrical') || name.includes('chemical')) {
      return 'Engineering';
    }
    if (name.includes('nursing') || name.includes('medicine') || name.includes('medical') || name.includes('pharmacy') || name.includes('physical therapy')) {
      return 'Healthcare';
    }
    if (name.includes('education') || name.includes('teaching') || name.includes('pedagogy')) {
      return 'Education';
    }
    if (name.includes('architecture') || name.includes('design') || name.includes('urban planning')) {
      return 'Design';
    }
    if (name.includes('law') || name.includes('juris') || name.includes('legal')) {
      return 'Law';
    }
    if (name.includes('science') || name.includes('biology') || name.includes('chemistry') || name.includes('physics') || name.includes('mathematics')) {
      return 'Science';
    }
    if (name.includes('arts') || name.includes('humanities') || name.includes('communication') || name.includes('psychology') || name.includes('sociology')) {
      return 'Social Sciences';
    }

    return 'Other';
  }

  private static mapDegreeLevel(degreeLevel?: string): 'Bachelor' | 'Master' | 'Doctorate' | 'Certificate' {
    if (!degreeLevel) return 'Bachelor';

    const level = degreeLevel.toLowerCase();

    if (level.includes('doctorate') || level.includes('phd') || level.includes('doctor')) {
      return 'Doctorate';
    }
    if (level.includes('master') || level.includes('graduate') || level.includes('open university system')) {
      return 'Master';
    }
    if (level.includes('certificate') || level.includes('diploma')) {
      return 'Certificate';
    }

    return 'Bachelor';
  }

  private static estimateDuration(degreeLevel?: string): string {
    if (!degreeLevel) return '4 years';

    if (degreeLevel.toLowerCase().includes('doctorate') || degreeLevel.toLowerCase().includes('phd')) {
      return '4-6 years';
    }
    if (degreeLevel.toLowerCase().includes('master')) {
      return '1-2 years';
    }
    if (degreeLevel.toLowerCase().includes('certificate') || degreeLevel.toLowerCase().includes('diploma')) {
      return '6-12 months';
    }

    return '4 years';
  }

  private static generateDescription(programName: string): string {
    // Generate basic descriptions based on program name
    const descriptions: Record<string, string> = {
      'computer science': 'Study algorithms, programming, software development, and computer systems.',
      'information technology': 'Learn about information systems, networks, cybersecurity, and IT infrastructure.',
      'business administration': 'Learn management principles, finance, marketing, and organizational behavior.',
      'civil engineering': 'Design and construct infrastructure projects like buildings, roads, and bridges.',
      'nursing': 'Provide healthcare services and patient care in various medical settings.',
      'education': 'Prepare to become a professional educator and shape future generations.',
      'psychology': 'Study human behavior, mental processes, and psychological principles.',
      'accountancy': 'Learn financial reporting, auditing, taxation, and business analysis.',
      'architecture': 'Design buildings and spaces that are functional, safe, and aesthetically pleasing.',
      'law': 'Study legal principles, justice systems, and prepare for legal practice.',
      'medicine': 'Comprehensive medical education covering diagnosis, treatment, and patient care.'
    };

    const key = programName.toLowerCase().split(' ').slice(0, 2).join(' ');
    return descriptions[key] || `Study ${programName} and develop expertise in this specialized field.`;
  }

  private static generateCareerProspects(programName: string): string[] {
    const prospects: Record<string, string[]> = {
      'computer science': ['Software Developer', 'Data Scientist', 'Systems Analyst', 'IT Consultant'],
      'information technology': ['IT Specialist', 'Network Administrator', 'Cybersecurity Analyst', 'Systems Engineer'],
      'business administration': ['Business Manager', 'Marketing Specialist', 'Financial Analyst', 'Entrepreneur'],
      'civil engineering': ['Civil Engineer', 'Project Manager', 'Construction Manager', 'Structural Engineer'],
      'nursing': ['Registered Nurse', 'Nurse Practitioner', 'Healthcare Administrator', 'Clinical Specialist'],
      'education': ['Teacher', 'School Administrator', 'Curriculum Developer', 'Educational Consultant'],
      'psychology': ['Clinical Psychologist', 'Counselor', 'HR Specialist', 'Research Psychologist'],
      'accountancy': ['Certified Public Accountant', 'Financial Analyst', 'Auditor', 'Tax Consultant'],
      'architecture': ['Licensed Architect', 'Urban Planner', 'Interior Designer', 'Construction Manager'],
      'law': ['Lawyer', 'Legal Consultant', 'Judge', 'Legal Researcher'],
      'medicine': ['Physician', 'Surgeon', 'Medical Specialist', 'Healthcare Administrator']
    };

    const key = programName.toLowerCase().split(' ').slice(0, 2).join(' ');
    return prospects[key] || [`${programName} Specialist`, `${programName} Professional`, `${programName} Consultant`];
  }

  private static estimateSalary(programName: string): string {
    const salaries: Record<string, string> = {
      'computer science': '₱35,000 - ₱80,000',
      'information technology': '₱30,000 - ₱70,000',
      'business administration': '₱25,000 - ₱60,000',
      'civil engineering': '₱30,000 - ₱70,000',
      'nursing': '₱20,000 - ₱50,000',
      'education': '₱18,000 - ₱40,000',
      'psychology': '₱22,000 - ₱55,000',
      'accountancy': '₱25,000 - ₱65,000',
      'architecture': '₱28,000 - ₱75,000',
      'law': '₱35,000 - ₱100,000',
      'medicine': '₱40,000 - ₱120,000'
    };

    const key = programName.toLowerCase().split(' ').slice(0, 2).join(' ');
    return salaries[key] || '₱20,000 - ₱50,000';
  }

  private static calculatePopularity(universityCount: number): number {
    // Base popularity on how many universities offer the program
    const basePopularity = Math.min(universityCount * 15, 95);
    return Math.max(basePopularity, 60); // Minimum 60% popularity
  }

  private static assessDifficulty(programName: string): 'Easy' | 'Moderate' | 'Challenging' | 'Very Challenging' {
    const challengingPrograms = ['medicine', 'law', 'engineering', 'architecture', 'computer science'];
    const veryChallengingPrograms = ['civil engineering', 'chemical engineering', 'architecture', 'medicine', 'law'];

    const name = programName.toLowerCase();

    if (veryChallengingPrograms.some(p => name.includes(p))) {
      return 'Very Challenging';
    }
    if (challengingPrograms.some(p => name.includes(p))) {
      return 'Challenging';
    }

    return 'Moderate';
  }

  public static normalizeProgramName(programName: string): string {
    // Normalize program names to group similar programs together
    let normalized = programName.toLowerCase().trim();

    // Remove common prefixes and suffixes
    normalized = normalized
      .replace(/^(bachelor|master|doctor|associate|certificate)\s+(of\s+)?/gi, '')
      .replace(/\s*\([^)]*\)/g, '') // Remove parentheses and contents
      .replace(/\s+/g, ' ') // Normalize spaces
      .trim();

    // Handle specific cases
    const normalizations: Record<string, string> = {
      'science in information technology': 'information technology',
      'science in computer science': 'computer science',
      'science in nursing': 'nursing',
      'science in accountancy': 'accountancy',
      'science in business administration': 'business administration',
      'science in civil engineering': 'civil engineering',
      'science in architecture': 'architecture',
      'science in psychology': 'psychology',
      'science in education': 'education',
      'science in medicine': 'medicine',
      'arts in communication': 'communication',
      'arts in english language studies': 'english',
      'arts in history': 'history',
      'science in food technology': 'food technology',
      'science in hospitality management': 'hospitality management',
      'science in computer engineering': 'computer engineering',
      'science in electrical engineering': 'electrical engineering',
      'science in electronics engineering': 'electronics engineering',
      'science in mechanical engineering': 'mechanical engineering',
      'science in chemical engineering': 'chemical engineering',
      'science in biology': 'biology',
      'science in chemistry': 'chemistry',
      'science in mathematics': 'mathematics',
      'science in physics': 'physics',
      'science in social work': 'social work',
      'science in physical therapy': 'physical therapy',
      'science in entrepreneurship': 'entrepreneurship',
      'science in business economics': 'business economics',
      'science in tourism management': 'tourism management',
      'science in real estate management': 'real estate management',
      'science in public administration': 'public administration',
      'arts in management major in industrial management': 'industrial management',
      'science in information system': 'information systems'
    };

    // Apply normalizations
    for (const [pattern, replacement] of Object.entries(normalizations)) {
      if (normalized.includes(pattern)) {
        return replacement;
      }
    }

    // If no specific normalization applies, return the cleaned version
    return normalized;
  }

  public static generateAcronym(programName: string): string {
    // Clean the program name by removing parentheses and their contents
    const cleanedName = programName.replace(/\s*\([^)]*\)/g, '').trim();
    const name = cleanedName.toLowerCase();

    // Common acronyms
    const acronyms: Record<string, string> = {
      'bachelor of science in information technology': 'BSIT',
      'bachelor of science in computer science': 'BSCS',
      'bachelor of science in business administration': 'BSBA',
      'bachelor of science in accountancy': 'BSA',
      'bachelor of science in nursing': 'BSN',
      'bachelor of science in civil engineering': 'BSCE',
      'bachelor of science in mechanical engineering': 'BSME',
      'bachelor of science in electrical engineering': 'BSEE',
      'bachelor of science in electronics engineering': 'BSECE',
      'bachelor of science in computer engineering': 'BSCpE',
      'bachelor of science in chemical engineering': 'BSChE',
      'bachelor of science in architecture': 'BSArch',
      'bachelor of science in psychology': 'BSPsych',
      'bachelor of science in education': 'BSEd',
      'bachelor of science in biology': 'BSBio',
      'bachelor of science in chemistry': 'BSChem',
      'bachelor of science in mathematics': 'BSMath',
      'bachelor of science in physics': 'BSPhysics',
      'bachelor of arts in communication': 'BAC',
      'bachelor of arts in english language studies': 'BAELS',
      'bachelor of arts in history': 'BAHist',
      'bachelor of science in food technology': 'BSFT',
      'bachelor of science in hospitality management': 'BSHM',
      'bachelor of science in tourism management': 'BSTM',
      'bachelor in real estate management': 'BREM',
      'bachelor of science in business economics': 'BSBE',
      'bachelor of science in entrepreneurship': 'BSEntre',
      'bachelor of science in social work': 'BSSW',
      'bachelor of science in physical therapy': 'BSPT',
      'bachelor of science in public administration': 'BSPA',
      'juris doctor': 'JD',
      'doctor of medicine': 'MD'
    };

    // Try exact match first
    if (acronyms[name]) {
      return acronyms[name];
    }

    // Generate acronym from cleaned program name
    const words = cleanedName.split(' ');
    let acronym = '';

    // Skip common words and take first letter of important words
    const skipWords = ['of', 'in', 'the', 'and', 'for', 'with', 'major', 'specialization', 'specializing', 'development', 'delays'];

    for (const word of words) {
      const cleanWord = word.replace(/[^a-zA-Z]/g, ''); // Remove non-alphabetic characters
      if (!skipWords.includes(cleanWord.toLowerCase()) && cleanWord.length > 1) {
        acronym += cleanWord.charAt(0).toUpperCase();
      }
    }

    return acronym || cleanedName.substring(0, 4).toUpperCase();
  }

  public static generateSearchKeywords(programName: string, acronym: string): string[] {
    const keywords = new Set<string>();

    // Add the full program name
    keywords.add(programName.toLowerCase());

    // Add the acronym
    keywords.add(acronym.toLowerCase());
    keywords.add(acronym.toUpperCase());

    // Add common variations
    const name = programName.toLowerCase();

    // Extract key terms
    if (name.includes('information technology')) {
      keywords.add('it');
      keywords.add('information technology');
      keywords.add('bsit');
      keywords.add('bs it');
    }

    if (name.includes('computer science')) {
      keywords.add('cs');
      keywords.add('computer science');
      keywords.add('bscs');
      keywords.add('comp sci');
    }

    if (name.includes('business administration')) {
      keywords.add('ba');
      keywords.add('business admin');
      keywords.add('bsba');
    }

    if (name.includes('nursing')) {
      keywords.add('nurse');
      keywords.add('bsn');
    }

    if (name.includes('civil engineering')) {
      keywords.add('civil eng');
      keywords.add('bsce');
    }

    if (name.includes('accountancy')) {
      keywords.add('accounting');
      keywords.add('bsa');
    }

    if (name.includes('psychology')) {
      keywords.add('psych');
      keywords.add('bspsych');
    }

    if (name.includes('education')) {
      keywords.add('teaching');
      keywords.add('bsed');
    }

    if (name.includes('architecture')) {
      keywords.add('arch');
      keywords.add('bsarch');
    }

    if (name.includes('hospitality management')) {
      keywords.add('hrim');
      keywords.add('HRIM');
    }

    if (name.includes('human resource management')) {
      keywords.add('hrm');
      keywords.add('human resources');
      keywords.add('hr management');
    }

    // Add individual words from program name
    const words = programName.toLowerCase().split(' ');
    words.forEach(word => {
      if (word.length > 2) {
        keywords.add(word);
      }
    });

    return Array.from(keywords);
  }

  private static generateRequirements(programName: string): string[] {
    const requirements: Record<string, string[]> = {
      'computer science': ['Mathematics', 'Physics', 'English Proficiency'],
      'information technology': ['Mathematics', 'English Proficiency', 'Basic Programming'],
      'business administration': ['Mathematics', 'English Proficiency', 'Communication Skills'],
      'civil engineering': ['Mathematics', 'Physics', 'Chemistry', 'Technical Drawing'],
      'nursing': ['Biology', 'Chemistry', 'Mathematics', 'English Proficiency'],
      'education': ['English Proficiency', 'Communication Skills', 'Psychology'],
      'psychology': ['English Proficiency', 'Mathematics', 'Social Studies'],
      'accountancy': ['Mathematics', 'English Proficiency', 'Analytical Skills'],
      'architecture': ['Mathematics', 'Physics', 'Art', 'Technical Drawing'],
      'law': ['English Proficiency', 'Critical Thinking', 'Research Skills'],
      'medicine': ['Biology', 'Chemistry', 'Physics', 'English Proficiency']
    };

    const key = programName.toLowerCase().split(' ').slice(0, 2).join(' ');
    return requirements[key] || ['English Proficiency', 'Mathematics'];
  }
}
