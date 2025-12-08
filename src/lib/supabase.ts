import { createClient } from '@supabase/supabase-js'
import { University } from '../pages/UniversityCard'

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
  tuition_range: string | null
  accreditation: string[] | null
  admission_rate: string | null
  graduation_rate: string | null
  employment_rate: string | null
  campus_size: string | null
  founded: string | null
  website: string | null
  phone: string | null
  email: string | null
  address: string | null
  facilities: string[] | null
  achievements: string[] | null
  admission_requirements: string[] | null
  admission_status: string
  admission_deadline: string | null
  scholarships: string[] | null
  student_life_clubs: number | null
  student_life_sports: number | null
  student_life_dormitories: boolean | null
  student_life_library: boolean | null
  academic_semester_start: string | null
  academic_semester_end: string | null
  academic_application_deadline: string | null
  ranking_national: number | null
  ranking_regional: number | null
  ranking_category: string | null
  map_location_lat: number | null
  map_location_lng: number | null
  created_at: string
  updated_at: string
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
    tuitionRange: dbUni.tuition_range || '',
    accreditation: dbUni.accreditation || [],
    admissionRate: dbUni.admission_rate || undefined,
    graduationRate: dbUni.graduation_rate || undefined,
    employmentRate: dbUni.employment_rate || undefined,
    campusSize: dbUni.campus_size || undefined,
    founded: dbUni.founded || undefined,
    website: dbUni.website || undefined,
    phone: dbUni.phone || undefined,
    email: dbUni.email || undefined,
    address: dbUni.address || undefined,
    facilities: dbUni.facilities || [],
    achievements: dbUni.achievements || [],
    admissionRequirements: dbUni.admission_requirements || [],
    admissionStatus: dbUni.admission_status as 'open' | 'not-yet-open' | 'closed',
    admissionDeadline: dbUni.admission_deadline || '',
    scholarships: dbUni.scholarships || [],
    studentLife: {
      clubs: dbUni.student_life_clubs || 0,
      sports: dbUni.student_life_sports || 0,
      dormitories: dbUni.student_life_dormitories || false,
      library: dbUni.student_life_library || false,
    },
    academicCalendar: dbUni.academic_semester_start && dbUni.academic_semester_end && dbUni.academic_application_deadline ? {
      semesterStart: dbUni.academic_semester_start,
      semesterEnd: dbUni.academic_semester_end,
      applicationDeadline: dbUni.academic_application_deadline,
    } : undefined,
    rankings: dbUni.ranking_national && dbUni.ranking_regional && dbUni.ranking_category ? {
      national: dbUni.ranking_national,
      regional: dbUni.ranking_regional,
      category: dbUni.ranking_category,
    } : undefined,
    mapLocation: dbUni.map_location_lat && dbUni.map_location_lng ? {
      lat: dbUni.map_location_lat,
      lng: dbUni.map_location_lng,
    } : undefined,
  }
}
