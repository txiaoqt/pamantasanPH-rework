-- PUP Taguig Campus Data and Academic Programs
-- Insert PUP Taguig Campus information

DELETE FROM universities WHERE id = 105;

INSERT INTO universities (
  id, name, location, province, established, type, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES
(
  105,
  'Polytechnic University of the Philippines Taguig',
  'Taguig City',
  'Metro Manila',
  '1992',
  'State',
  'Not available',
  12,
  'A branch of the Polytechnic University of the Philippines in Taguig City, offering various programs in technology and business.',
  'PUP Taguig is a major satellite campus that provides quality, affordable education to the residents of Taguig and nearby areas. It has a strong focus on engineering, technology, and business-related courses.',
  ARRAY['Accountancy', 'Applied Mathematics', 'Business Administration', 'Engineering', 'Entrepreneurship', 'Information Technology', 'Education'],
  '/Images/School Images/pup.jpg', -- Placeholder image
  ARRAY['https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg'],
  ARRAY['Part of the PUP System, which is recognized by CHED and has various accredited programs.'],
  'Not available',
  '1992',
  'https://www.pup.edu.ph/taguig/',
  '(+63 2) 5335-1787',
  'inquire@pup.edu.ph',
  'General Santos Ave, Lower Bicutan, Taguig, Metro Manila',
  ARRAY['Classrooms', 'Computer Laboratories', 'Engineering Laboratories', 'Library', 'Auditorium'],
  ARRAY['Canteen', 'Gymnasium'],
  ARRAY['Part of the nationally recognized achievements of the PUP System.'],
  ARRAY['One of the larger satellite campuses of PUP.', 'Known for its engineering and technology programs.'],
  ARRAY['Passed PUP College Entrance Exam Test (PUPCET)', 'High School Graduate', 'Form 138', 'Form 137-A', 'Medical Clearance', 'Good Moral Character Certificate', 'NSO/PSA Birth Certificate'],
  ARRAY['Follow the general PUP application process through the official PUP website.'],
  'open',
  NULL, -- admission_deadline
  NULL, -- academic_semester_start
  NULL, -- academic_semester_end
  NULL, -- academic_application_deadline
  'Not applicable',
  'Not applicable',
  14.5126, -- Approximate Latitude
  121.0592  -- Approximate Longitude
);

-- Delete existing PUP Taguig programs if any (for re-running migration)
DELETE FROM academic_programs WHERE university_id = 105;

-- Insert PUP Taguig academic programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(105, 'College of Accountancy and Finance', 'Undergraduate', 'Bachelor of Science in Accountancy', NULL, 'undergraduate'),
(105, 'College of Science', 'Undergraduate', 'Bachelor of Science in Applied Mathematics', NULL, 'undergraduate'),
(105, 'College of Business Administration', 'Undergraduate', 'Bachelor of Science in Business Administration', ARRAY['Human Resource Development Management', 'Marketing Management'], 'undergraduate'),
(105, 'College of Engineering', 'Undergraduate', 'Bachelor of Science in Electronics Engineering', NULL, 'undergraduate'),
(105, 'College of Business Administration', 'Undergraduate', 'Bachelor of Science in Entrepreneurship', NULL, 'undergraduate'),
(105, 'College of Computer and Information Sciences', 'Undergraduate', 'Bachelor of Science in Information Technology', NULL, 'undergraduate'),
(105, 'College of Engineering', 'Undergraduate', 'Bachelor of Science in Mechanical Engineering', NULL, 'undergraduate'),
(105, 'College of Business Administration', 'Undergraduate', 'Bachelor of Science in Office Administration', NULL, 'undergraduate'),
(105, 'College of Education', 'Undergraduate', 'Bachelor in Secondary Education', ARRAY['English', 'Mathematics'], 'undergraduate'),
(105, 'Institute of Technology', 'Diploma', 'Diploma in Information Communication Technology', NULL, 'diploma'),
(105, 'Institute of Technology', 'Diploma', 'Diploma in Office Management Technology', NULL, 'diploma');

-- Update the programs count for PUP Taguig
UPDATE universities SET programs = (SELECT COUNT(*) FROM academic_programs WHERE university_id = 105) WHERE id = 105;
