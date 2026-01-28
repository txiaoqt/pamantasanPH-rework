-- PUP Parañaque Campus Data and Academic Programs
-- Insert PUP Parañaque Campus information

DELETE FROM universities WHERE id = 102;

INSERT INTO universities (
  id, name, location, province, established, type, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES
(
  102,
  'Polytechnic University of the Philippines Parañaque',
  'Parañaque City',
  'Metro Manila',
  '2011',
  'State',
  'Not available',
  7,
  'A branch of the Polytechnic University of the Philippines located in Parañaque City.',
  'PUP Parañaque is a satellite campus established to extend quality and affordable education to the residents of Parañaque and its neighboring cities in the southern part of Metro Manila.',
  ARRAY['Computer Engineering', 'Hospitality Management', 'Information Technology', 'Office Administration'],
  '/Images/School Images/pup.jpg', -- Placeholder image
  ARRAY['https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg'],
  ARRAY['Part of the PUP System, which is recognized by CHED and has various accredited programs.'],
  'Not available',
  '2011',
  'https://www.pup.edu.ph/paranaque/',
  '(+63 2) 5335-1787',
  'inquire@pup.edu.ph',
  '1230 Mayor''s Dr, Parañaque, 1700 Metro Manila',
  ARRAY['Classrooms', 'Computer Laboratories', 'Library', 'Hospitality Management Laboratory'],
  ARRAY['Canteen'],
  ARRAY['Part of the nationally recognized achievements of the PUP System.'],
  ARRAY['Offers programs focused on technology and hospitality.', 'Caters to students in the south of Metro Manila.'],
  ARRAY['Passed PUP College Entrance Exam Test (PUPCET)', 'High School Graduate', 'Form 138', 'Form 137-A', 'Medical Clearance', 'Good Moral Character Certificate', 'NSO/PSA Birth Certificate'],
  ARRAY['Follow the general PUP application process through the official PUP website.'],
  'open',
  NULL, -- admission_deadline
  NULL, -- academic_semester_start
  NULL, -- academic_semester_end
  NULL, -- academic_application_deadline
  'Not applicable',
  'Not applicable',
  14.4984, -- Approximate Latitude
  121.0150  -- Approximate Longitude
);

-- Delete existing PUP Parañaque programs if any (for re-running migration)
DELETE FROM academic_programs WHERE university_id = 102;

-- Insert PUP Parañaque academic programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(102, 'College of Engineering', 'Undergraduate', 'Bachelor of Science in Computer Engineering', NULL, 'undergraduate'),
(102, 'College of Tourism, Hospitality and Transportation Management', 'Undergraduate', 'Bachelor of Science in Hospitality Management', NULL, 'undergraduate'),
(102, 'College of Computer and Information Sciences', 'Undergraduate', 'Bachelor of Science in Information Technology', NULL, 'undergraduate'),
(102, 'College of Business Administration', 'Undergraduate', 'Bachelor of Science in Office Administration', NULL, 'undergraduate'),
(102, 'Institute of Technology', 'Diploma', 'Diploma in Computer Engineering Technology', NULL, 'diploma'),
(102, 'Institute of Technology', 'Diploma', 'Diploma in Information Communication Technology', NULL, 'diploma'),
(102, 'Institute of Technology', 'Diploma', 'Diploma in Office Management Technology - Legal Office Management', NULL, 'diploma');

-- Update the programs count for PUP Parañaque
UPDATE universities SET programs = (SELECT COUNT(*) FROM academic_programs WHERE university_id = 102) WHERE id = 102;
