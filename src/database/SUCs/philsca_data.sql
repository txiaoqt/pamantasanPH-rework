-- Philippine State College of Aeronautics (PhilSCA) Data
-- Reference: https://www.philsca.edu.ph/
-- Programs Reference: https://www.philsca.edu.ph/academics

INSERT INTO universities (
  name, location, province, established, type, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES (
  'Philippine State College of Aeronautics',
  'Pasay City',
  'Metro Manila',
  '1968', -- established (year)
  'Public',
  '10000', -- students (as string)
  15, -- programs
  'A state college in the Philippines specializing in aviation and aeronautics.',
  'The Philippine State College of Aeronautics is a state college in the Philippines with a curriculum focused on aviation and aeronautics. Its main campus is in Pasay City. The college has other campuses in the Philippines.',
  ARRAY['Aeronautical Engineering', 'Information Management', 'Aviation Information Technology', 'Air Transportation', 'Aircraft Maintenance Technology', 'Aviation Electronics Technology', 'Aviation Communication', 'Aviation Tourism', 'Aviation Logistics', 'Aviation Safety and Security Management', 'Public Administration', 'Aeronautical Management']::text[], -- subjects (inferred from programs)
  'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', -- image_url
  ARRAY['https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg']::text[], -- gallery_images
  ARRAY['ISO 9001:2015 Certified', 'Accredited by the Accrediting Agency of Chartered Colleges and Universities in the Philippines (AACCUP).']::text[], -- accreditation
  NULL, -- campus_size (no specific data)
  '1968', -- founded
  'https://www.philsca.edu.ph/',
  'info@philsca.edu.ph',
  '(02) 8521 6811',
  'Piccio Garden, Villamor, Pasay, 1309 Metro Manila',
  ARRAY['Main Library', 'Aeronautical Engineering Building', 'Aircraft Maintenance Hangar', 'Flight Simulators', 'Computer Laboratories', 'Classrooms']::text[], -- facilities
  ARRAY['Dormitories', 'Cafeteria', 'Gymnasium', 'Student Center', 'Medical Clinic', 'Bookstore']::text[], -- amenities
  ARRAY['The only state college in the Philippines that offers a degree in aeronautical engineering.']::text[], -- achievements
  ARRAY['The college has a fleet of training aircraft for its students.']::text[], -- quickfacts
  ARRAY[
    'GENERAL REQUIREMENTS',
    'Must be a graduate of a high school accredited by the Department of Education.',
    'Must pass the PhilSCA Admission Test (PhilSCA-AT).'
  ]::text[], -- admission_requirements
  ARRAY[
    'Submit an online application through the PhilSCA website.',
    'Pay the application fee.',
    'Take the PhilSCA-AT exam on the scheduled date.',
    'Wait for the release of the PhilSCA-AT results.'
  ]::text[], -- application_process
  'open', -- admission_status
  NULL, -- admission_deadline
  NULL, -- academic_semester_start
  NULL, -- academic_semester_end
  NULL, -- academic_application_deadline
  'UniRank 2023', -- ranking_source
  'Ranked among the top 200 universities in the Philippines.', -- ranking_details
  14.522, -- map_location_lat
  121.018 -- map_location_lng
);

-- PhilSCA Academic Programs
INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Bachelor of Science in Aeronautical Engineering', 'College of Aeronautical Engineering', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Bachelor of Science in Information Management Major in Airline Operation Procedures', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Bachelor of Science in Aviation Information Technology', 'College of Computer Studies', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Bachelor of Science in Air Transportation', 'College of Aviation', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Bachelor of Science in Aircraft Maintenance Technology', 'College of Aircraft Maintenance Technology', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Bachelor of Science in Aviation Electronics Technology', 'College of Aviation Electronics Technology', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Bachelor of Arts in Aviation Communication', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Bachelor of Arts in Aviation Tourism', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Bachelor of Arts in Aviation Logistics', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Bachelor of Arts in Aviation Safety and Security Management', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Associate in Aviation Information Management', 'College of Arts and Sciences', 'diploma', 'Associate', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Associate in Aviation Information Technology', 'College of Computer Studies', 'diploma', 'Associate', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Associate in Aircraft Maintenance Technology', 'College of Aircraft Maintenance Technology', 'diploma', 'Associate', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Associate in Aviation Electronics Technology', 'College of Aviation Electronics Technology', 'diploma', 'Associate', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Master in Public Administration', 'Graduate School', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Philippine State College of Aeronautics'), 'Master of Education in Aeronautical Management', 'Graduate School', 'graduate', 'Masters', NULL);