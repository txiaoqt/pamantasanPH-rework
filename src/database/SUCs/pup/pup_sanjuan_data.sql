-- PUP San Juan Campus Data and Academic Programs
-- Insert PUP San Juan Campus information

DELETE FROM universities WHERE id = 104;

INSERT INTO universities (
  id, name, location, province, established, type, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES
(
  104,
  'Polytechnic University of the Philippines San Juan',
  'San Juan City',
  'Metro Manila',
  '2008',
  'State',
  'Not available',
  9,
  'A branch of the Polytechnic University of the Philippines located in San Juan City.',
  'PUP San Juan was established through a partnership with the local government of San Juan City to provide quality tertiary education to its residents.',
  ARRAY['Accountancy', 'Education', 'Entrepreneurship', 'Business Administration', 'Information Technology', 'Hospitality Management', 'Psychology'],
  '/Images/School Images/pup.jpg', -- Placeholder image
  ARRAY['https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg'],
  ARRAY['Part of the PUP System, which is recognized by CHED and has various accredited programs.'],
  'Not available',
  '2008',
  'https://www.pup.edu.ph/sanjuan/',
  '(+63 2) 5335-1787',
  'inquire@pup.edu.ph',
  'Addition Hills, San Juan City, Metro Manila',
  ARRAY['Classrooms', 'Computer Laboratories', 'Library', 'Auditorium'],
  ARRAY['Canteen'],
  ARRAY['Part of the nationally recognized achievements of the PUP System.'],
  ARRAY['Offers a diverse range of programs from business to technology.', 'A result of a MOA between PUP and the City Government of San Juan.'],
  ARRAY['Passed PUP College Entrance Exam Test (PUPCET)', 'Must be a bonafide resident of San Juan City', 'High School Graduate', 'Form 138', 'Form 137-A', 'Medical Clearance', 'Good Moral Character Certificate', 'NSO/PSA Birth Certificate'],
  ARRAY['Follow the general PUP application process through the official PUP website, with special coordination for San Juan residents.'],
  'open',
  NULL, -- admission_deadline
  NULL, -- academic_semester_start
  NULL, -- academic_semester_end
  NULL, -- academic_application_deadline
  'Not applicable',
  'Not applicable',
  14.5975, -- Approximate Latitude
  121.0345  -- Approximate Longitude
);

-- Delete existing PUP San Juan programs if any (for re-running migration)
DELETE FROM academic_programs WHERE university_id = 104;

-- Insert PUP San Juan academic programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(104, 'College of Accountancy and Finance', 'Undergraduate', 'Bachelor of Science in Accountancy', NULL, 'undergraduate'),
(104, 'College of Education', 'Undergraduate', 'Bachelor of Secondary Education major in English', NULL, 'undergraduate'),
(104, 'College of Business Administration', 'Undergraduate', 'Bachelor of Science in Entrepreneurship', NULL, 'undergraduate'),
(104, 'College of Business Administration', 'Undergraduate', 'Bachelor of Science in Business Administration major in Financial Management', NULL, 'undergraduate'),
(104, 'College of Computer and Information Sciences', 'Undergraduate', 'Bachelor of Science in Information Technology', NULL, 'undergraduate'),
(104, 'College of Tourism, Hospitality and Transportation Management', 'Undergraduate', 'Bachelor of Science in Hospitality Management', NULL, 'undergraduate'),
(104, 'College of Social Sciences and Development', 'Undergraduate', 'Bachelor of Science in Psychology', NULL, 'undergraduate'),
(104, 'Institute of Technology', 'Diploma', 'Diploma in Information and Communications Technology', NULL, 'diploma'),
(104, 'College of Education', 'Undergraduate', 'Bachelor of Secondary Education major in Mathematics', NULL, 'undergraduate');

-- Update the programs count for PUP San Juan
UPDATE universities SET programs = (SELECT COUNT(*) FROM academic_programs WHERE university_id = 104) WHERE id = 104;
