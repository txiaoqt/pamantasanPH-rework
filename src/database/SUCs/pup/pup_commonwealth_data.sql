-- PUP Commonwealth Campus Data and Academic Programs
-- Insert PUP Commonwealth Campus information

DELETE FROM universities WHERE id = 101;

INSERT INTO universities (
  id, name, location, province, established, type, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES
(
  101,
  'Polytechnic University of the Philippines Commonwealth',
  'Quezon City',
  'Metro Manila',
  '1997',
  'State',
  'Not available',
  11,
  'A branch of the Polytechnic University of the Philippines located in Commonwealth, Quezon City.',
  'The PUP Commonwealth Campus, also known as PUP Quezon City, was established to provide accessible and quality education to the residents of Quezon City and nearby areas. It offers a range of undergraduate and graduate programs.',
  ARRAY['Information Technology', 'Business Administration', 'Public Administration', 'Education'],
  '/Images/School Images/pup.jpg', -- Placeholder image
  ARRAY['https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg'],
  ARRAY['Part of the PUP System, which is recognized by CHED and has various accredited programs.'],
  'Not available',
  '1997',
  'https://www.pup.edu.ph/quezoncity/',
  '(+63 2) 5335-1787',
  'inquire@pup.edu.ph',
  'Don Fabian St., Commonwealth, Quezon City, Metro Manila',
  ARRAY['Classrooms', 'Computer Laboratories', 'Library'],
  ARRAY['Canteen', 'Student Lounge'],
  ARRAY['Part of the nationally recognized achievements of the PUP System.'],
  ARRAY['A key satellite campus of the Polytechnic University of the Philippines.', 'Serves students from Quezon City and neighboring communities.'],
  ARRAY['Passed PUP College Entrance Exam Test (PUPCET)', 'High School Graduate', 'Form 138', 'Form 137-A', 'Medical Clearance', 'Good Moral Character Certificate', 'NSO/PSA Birth Certificate'],
  ARRAY['Follow the general PUP application process through the official PUP website.'],
  'open',
  NULL, -- admission_deadline
  NULL, -- academic_semester_start
  NULL, -- academic_semester_end
  NULL, -- academic_application_deadline
  'Not applicable',
  'Not applicable',
  14.6999, -- Approximate Latitude
  121.0950  -- Approximate Longitude
);

-- Delete existing PUP Commonwealth programs if any (for re-running migration)
DELETE FROM academic_programs WHERE university_id = 101;

-- Insert PUP Commonwealth academic programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(101, 'College of Technology and Vocational Education', 'Undergraduate', 'Bachelor of Science in Information Technology', NULL, 'undergraduate'),
(101, 'College of Education', 'Undergraduate', 'Bachelor in Business Teacher and Livelihood Education major in Home Economics', NULL, 'undergraduate'),
(101, 'College of Education', 'Undergraduate', 'Bachelor in Business Teacher and Livelihood Education major in Information Communication Technology', NULL, 'undergraduate'),
(101, 'College of Business Administration', 'Undergraduate', 'Bachelor of Science in Business Administration major in Marketing Management', NULL, 'undergraduate'),
(101, 'College of Business Administration', 'Undergraduate', 'Bachelor of Science in Business Administration major in Human Resource Management', NULL, 'undergraduate'),
(101, 'College of Business Administration', 'Undergraduate', 'Bachelor of Science in Entrepreneurship', NULL, 'undergraduate'),
(101, 'College of Political Science and Public Administration', 'Undergraduate', 'Bachelor of Public Administration with specialization in Fiscal Administration', NULL, 'undergraduate'),
(101, 'College of Technology', 'Diploma', 'Diploma in Office Management Technology with specialization in Medical Office Management', NULL, 'diploma'),
(101, 'Open University System', 'Graduate', 'Master in Educational Management', NULL, 'graduate'),
(101, 'Open University System', 'Graduate', 'Master in Public Administration', NULL, 'graduate'),
(101, 'Open University System', 'Graduate', 'Master of Science in Information Technology', NULL, 'graduate');

-- Update the programs count for PUP Commonwealth
UPDATE universities SET programs = (SELECT COUNT(*) FROM academic_programs WHERE university_id = 101) WHERE id = 101;
