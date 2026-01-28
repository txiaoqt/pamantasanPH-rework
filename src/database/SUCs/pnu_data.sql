-- Philippine Normal University (PNU) Data
-- Reference: https://www.pnu.edu.ph/
-- Programs Reference: https://www.pnu.edu.ph/academics/colleges-and-institutes/

INSERT INTO universities (
  name, location, province, established, type, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES (
  'Philippine Normal University',
  'Manila',
  'Metro Manila',
  '1901', -- established (year)
  'Public',
  '15000', -- students (as string)
  50, -- programs
  'The National Center for Teacher Education, a premier institution for teacher education in the Philippines.',
  'The Philippine Normal University is a public research university in Manila, Philippines. It was established in 1901 through Act No. 74 of the Philippine Commission as the Philippine Normal School, a teacher training institution. It is the first and oldest institution for teacher education in the country.',
  ARRAY['Teacher Education', 'Elementary Education', 'Secondary Education', 'Early Childhood Education', 'Library and Information Science', 'Physical Education', 'Technology and Livelihood Education', 'Educational Leadership and Management', 'English Language Education', 'Mathematics Education', 'Science Education', 'Social Studies Education', 'Values Education']::text[], -- subjects (inferred from programs)
  'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', -- image_url (first from gallery)
  ARRAY['https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg']::text[], -- gallery_images
  ARRAY['Center of Excellence in Teacher Education']::text[], -- accreditation
  NULL, -- campus_size
  '1901', -- founded
  'https://www.pnu.edu.ph/',
  'contact@pnu.edu.ph',
  '(02) 8527 0378',
  'Taft Ave, Ermita, Manila, 1000 Metro Manila',
  ARRAY['Main Library', 'College of Teacher Development', 'College of Flexible Learning and e-PNU', 'Research Center', 'Computer Laboratories', 'Lecture Halls']::text[], -- facilities
  ARRAY['Dormitories', 'Cafeteria', 'Gymnasium', 'Student Center', 'Medical Clinic', 'Auditorium']::text[], -- amenities
  ARRAY['Produced numerous topnotchers in the Licensure Examination for Teachers (LET).']::text[], -- achievements
  ARRAY['The university has 4 other branches in the Philippines.']::text[], -- quickfacts
  ARRAY[
    'GENERAL REQUIREMENTS',
    'Must be a graduate of a high school accredited by the Department of Education.',
    'Must pass the PNU Admission Test (PNUAT).'
  ]::text[], -- admission_requirements
  ARRAY[
    'Submit an online application through the PNU website.',
    'Pay the application fee.',
    'Take the PNUAT exam on the scheduled date.',
    'Wait for the release of the PNUAT results.'
  ]::text[], -- application_process
  'Varies', -- admission_status
  NULL, -- admission_deadline
  NULL, -- academic_semester_start
  NULL, -- academic_semester_end
  NULL, -- academic_application_deadline
  'CHED', -- ranking_source
  'Designated as the National Center for Teacher Education.', -- ranking_details
  14.5828, -- map_location_lat
  120.9859 -- map_location_lng
);

-- PNU Academic Programs
-- College of Teacher Development (CTD)
INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)

-- College of Graduate Studies and Teacher Education Research (CGSTER)
INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ( (SELECT id from universities where name = 'Philippine Normal University'), 'Master of Arts in Education with specialization in Educational Leadership and Management', 'College of Graduate Studies and Teacher Education Research', 'graduate', 'Masters', ARRAY['Educational Leadership and Management']::text[]),
  ( (SELECT id from universities where name = 'Philippine Normal University'), 'Master of Arts in English Language Education', 'College of Graduate Studies and Teacher Education Research', 'graduate', 'Masters', NULL),
  ( (SELECT id from universities where name = 'Philippine Normal University'), 'Master of Arts in Mathematics Education', 'College of Graduate Studies and Teacher Education Research', 'graduate', 'Masters', NULL),
  ( (SELECT id from universities where name = 'Philippine Normal University'), 'Doctor of Philosophy in Educational Leadership and Management', 'College of Graduate Studies and Teacher Education Research', 'graduate', 'Doctorate', ARRAY['Educational Leadership and Management']::text[]),
  ( (SELECT id from universities where name = 'Philippine Normal University'), 'Doctor of Philosophy in English Language Education', 'College of Graduate Studies and Teacher Education Research', 'graduate', 'Doctorate', NULL);

-- College of Flexible Learning and e-PNU (CFLeX)
INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ( (SELECT id from universities where name = 'Philippine Normal University'), 'Bachelor of Library and Information Science', 'College of Flexible Learning and e-PNU', 'undergraduate', 'Bachelors', NULL);

INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ( (SELECT id from universities where name = 'Philippine Normal University'), 'Bachelor of Physical Education', 'Institute of Physical Education, Health, Recreation, Dance, and Sports', 'undergraduate', 'Bachelors', NULL);

-- Institute of Teaching and Learning (ITL)
INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ( (SELECT id from universities where name = 'Philippine Normal University'), 'Bachelor of Technology and Livelihood Education', 'Institute of Teaching and Learning', 'undergraduate', 'Bachelors', NULL);