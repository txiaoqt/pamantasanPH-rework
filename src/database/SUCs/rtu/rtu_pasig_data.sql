-- RTU Pasig Campus Data and Academic Programs
-- Insert RTU Pasig Campus information

DELETE FROM universities WHERE id = 106;

INSERT INTO universities (
  id, name, location, province, established, type, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES
(
  106,
  'Rizal Technological University - Pasig Campus',
  'Pasig City',
  'Metro Manila',
  '1994',
  'State',
  'Not available',
  3,
  'A satellite campus of Rizal Technological University located in Pasig City.',
  'The RTU Pasig Campus was established to expand the university''s reach, offering programs in architecture, information technology, and physical education to the residents of Pasig and its neighboring areas.',
  ARRAY['Architecture', 'Information Technology', 'Physical Education'],
  '/Images/School Images/rtu.jpg', -- Placeholder image from main campus
  ARRAY['https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg'],
  ARRAY['Part of the RTU System, which is recognized by CHED and has various accredited programs.'],
  'Not available',
  '1994',
  'https://www.rtu.edu.ph/',
  '+6385348267',
  'csapasig@rtu.edu.ph',
  'Urbano Velasco Ave, Pasig, Metro Manila',
  ARRAY['Classrooms', 'Computer Laboratories', 'Library', 'Gymnasium'],
  ARRAY['Canteen'],
  ARRAY['Part of the nationally recognized achievements of the RTU System.'],
  ARRAY['Focuses on programs in architecture, IT, and human kinetics.'],
  ARRAY['Passed RTU College Admission Test', 'High School Graduate', 'Form 138', 'Good Moral Character Certificate', 'Birth Certificate'],
  ARRAY['Follow the general RTU application process through the official RTU website.'],
  'open',
  NULL, -- admission_deadline
  NULL, -- academic_semester_start
  NULL, -- academic_semester_end
  NULL, -- academic_application_deadline
  'Not applicable',
  'Not applicable',
  14.5721, -- Approximate Latitude
  121.0830  -- Approximate Longitude
);

-- Delete existing RTU Pasig programs if any (for re-running migration)
DELETE FROM academic_programs WHERE university_id = 106;

-- Insert RTU Pasig academic programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(106, 'Institute of Architecture', 'Undergraduate', 'Bachelor of Science in Architecture', NULL, 'undergraduate'),
(106, 'Institute of Computer Studies', 'Undergraduate', 'Bachelor of Science in Information Technology', NULL, 'undergraduate'),
(106, 'Institute of Human Kinetics', 'Undergraduate', 'Bachelor of Physical Education', NULL, 'undergraduate');

-- Update the programs count for RTU Pasig
UPDATE universities SET programs = (SELECT COUNT(*) FROM academic_programs WHERE university_id = 106) WHERE id = 106;
