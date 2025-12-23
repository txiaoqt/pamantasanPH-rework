import { createClient } from '@supabase/supabase-js'
import { University } from '../components/university/UniversityCard'

// Get Supabase credentials from environment variables
// In Vite, client-side env vars must be prefixed with VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zdixoeqnifczswpxospm.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkaXhvZXFuaWZjenN3cHhvc3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NjQzNjMsImV4cCI6MjA4MDI0MDM2M30.VUhhm8xzl6Ah2yyG67_kSlin4iDMAfPEg0PExeNPZ4E'

if (!supabaseUrl || supabaseUrl === 'https://zdixoeqnifczswpxospm.supabase.co') {
  console.warn('⚠️  Supabase URL not configured. Set VITE_SUPABASE_URL in your .env file.')
}

if (!supabaseAnonKey || supabaseAnonKey === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkaXhvZXFuaWZjenN3cHhvc3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NjQzNjMsImV4cCI6MjA4MDI0MDM2M30.VUhhm8xzl6Ah2yyG67_kSlin4iDMAfPEg0PExeNPZ4E') {
  console.warn('⚠️  Supabase anon key not configured. Set VITE_SUPABASE_ANON_KEY in your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types based on our schema
export interface DatabaseUniversity {
  id: number
  name: string
  location: string | null
  province: string | null
  established: string | null
  type: string | null
  rating: number | null
  students: string | null
  programs: number | null
  description: string | null
  long_description: string | null
  subjects: string[] | null
  image_url: string | null
  gallery_images: string[] | null
  accreditation: string[] | null
  campus_size: string | null
  founded: string | null
  website: string | null
  phone: string | null
  email: string | null
  address: string | null
  facilities: string[] | null
  amenities: string[] | null
  achievements: string[] | null
  quickfacts: string[] | null
  admission_requirements: string[] | null
  application_process: string[] | null
  admission_status: string
  admission_deadline: string | null
  academic_semester_start: string | null
  academic_semester_end: string | null
  academic_application_deadline: string | null
  ranking_source: string | null
  ranking_details: string | null
  map_location_lat: number | null
  map_location_lng: number | null
  created_at: string
  updated_at: string
}

// Database types for academic programs
export interface DatabaseAcademicProgram {
  id: number
  university_id: number
  college_name: string
  degree_level: string | null
  program_name: string
  specializations: string[] | null
  program_type: string | null
  created_at: string
  updated_at: string
}

// Frontend interface for academic programs
export interface AcademicProgram {
  id: number
  universityId: number
  collegeName: string
  degreeLevel?: string
  programName: string
  specializations?: string[]
  programType?: string
}

// Transform database university to our frontend University interface
export const transformDbUniversityToUniversity = (dbUni: DatabaseUniversity): University => {
  return {
    id: dbUni.id,
    name: dbUni.name,
    location: dbUni.location || '',
    province: dbUni.province || '',
    established: dbUni.established || '',
    type: dbUni.type || '',
    rating: dbUni.rating || 0,
    students: dbUni.students || '',
    programs: dbUni.programs || 0,
    description: dbUni.description || '',
    longDescription: dbUni.long_description || '',
    subjects: dbUni.subjects || [],
    imageUrl: dbUni.image_url || '',
    galleryImages: dbUni.gallery_images || [],
    accreditation: dbUni.accreditation || [],
    campusSize: dbUni.campus_size || undefined,
    founded: dbUni.founded || undefined,
    website: dbUni.website || undefined,
    phone: dbUni.phone || undefined,
    email: dbUni.email || undefined,
    address: dbUni.address || undefined,
    facilities: dbUni.facilities || [],
    amenities: dbUni.amenities || [],
    achievements: dbUni.achievements || [],
    quickfacts: dbUni.quickfacts || [],
    admissionRequirements: dbUni.admission_requirements || [],
    applicationProcess: dbUni.application_process || [],
    admissionStatus: dbUni.admission_status as 'open' | 'not-yet-open' | 'closed',
    admissionDeadline: dbUni.admission_deadline || '',
    academicCalendar: dbUni.academic_semester_start && dbUni.academic_semester_end && dbUni.academic_application_deadline ? {
      semesterStart: dbUni.academic_semester_start,
      semesterEnd: dbUni.academic_semester_end,
      applicationDeadline: dbUni.academic_application_deadline,
    } : undefined,
    rankings: dbUni.ranking_source && dbUni.ranking_details ? {
      source: dbUni.ranking_source,
      details: dbUni.ranking_details,
    } : undefined,
    mapLocation: dbUni.map_location_lat && dbUni.map_location_lng ? {
      lat: dbUni.map_location_lat,
      lng: dbUni.map_location_lng,
    } : undefined,
  }
}

// Transform database academic program to frontend interface
export const transformDbAcademicProgramToAcademicProgram = (dbProgram: DatabaseAcademicProgram): AcademicProgram => {
  return {
    id: dbProgram.id,
    universityId: dbProgram.university_id,
    collegeName: dbProgram.college_name,
    degreeLevel: dbProgram.degree_level || undefined,
    programName: dbProgram.program_name,
    specializations: dbProgram.specializations || undefined,
    programType: dbProgram.program_type || undefined,
  }
}
