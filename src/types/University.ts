
export interface University {
  id: number;
  name: string;
  acronym?: string;
  location: string;
  province: string;
  established: string;
  type: string;
  students: string;
  programs: number;
  description: string;
  long_description: string;
  subjects: string[];
  image_url: string;
  gallery_images: string[];
  accreditation: string[];
  campus_size: string | null;
  founded: string;
  website: string;
  phone: string;
  email: string;
  address: string;
  facilities: string[];
  amenities: string[];
  achievements: string[];
  quickfacts: string[];
  admission_requirements: string[];
  application_process: string[];
  admission_status: string;
  admission_deadline: string | null;
  academic_semester_start: string | null;
  academic_semester_end: string | null;
  academic_application_deadline: string | null;
  ranking_source: string;
  ranking_details: string;
  map_location_lat: number;
  map_location_lng: number;
}

export interface AcademicProgram {
  id?: number;
  university_id: number;
  college_name: string;
  degree_level: string;
  program_name: string;
  specializations: string[] | null;
  program_type: string;
  keywords?: string[];
}
