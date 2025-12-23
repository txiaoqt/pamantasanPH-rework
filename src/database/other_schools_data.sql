-- Other Schools Data Template
-- This file serves as a template for adding additional universities
-- Copy this structure and modify the data for new schools

-- Example: Adding a new university (University of the Philippines Diliman)
-- Uncomment and modify the following INSERT statements for new schools

/*
-- Insert new university information
INSERT INTO universities (
  name, location, province, established, type, rating, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES
(
  'University of the Philippines Diliman',
  'Quezon City',
  'Metro Manila',
  '1908',
  'State',
  4.8,
  '25,000',
  250,
  'The flagship campus of the University of the Philippines System, known for academic excellence and research.',
  'Established in 1908, the University of the Philippines Diliman (UP Diliman) is the flagship campus of the University of the Philippines System. Located in Quezon City, UP Diliman is recognized as one of the premier universities in the Philippines and Asia, offering a wide range of undergraduate and graduate programs.',
  ARRAY['Liberal Arts', 'Social Sciences', 'Natural Sciences', 'Engineering', 'Business', 'Law', 'Medicine'],
  '/Images/School Images/UPdiliman.jpg',
  ARRAY['/Images/School Images/UPdiliman.jpg'],
  ARRAY['CHED', 'AACCUP', 'PACUCOA', 'ABET'],
  '493 hectares',
  '1908',
  'https://upd.edu.ph',
  '+63 2 8981 8500',
  'info@upd.edu.ph',
  'Lozano Drive, Diliman, Quezon City 1101',
  ARRAY['Academic Buildings', 'Libraries', 'Laboratories', 'Sports Complex', 'Auditorium', 'Museums', 'Research Centers'],
  ARRAY['Student Centers', 'Cafeterias', 'Medical Facilities', 'Banks', 'Bookstores', 'Internet Services'],
  ARRAY['National University of the Philippines', 'QS Asia University Rankings Top 100', 'ASEAN University Network Member', 'Research Excellence'],
  ARRAY['UP College Admission Test (UPCAT)', 'High School Report Card', 'Certificate of Good Moral Character', 'Birth Certificate'],
  ARRAY['Take UPCAT', 'Submit application form', 'Provide required documents', 'Wait for results', 'Enroll if admitted'],
  'open',
  '2024-07-01',
  '2024-08-15',
  '2025-06-30',
  '2024-05-31',
  'QS World University Rankings',
  'QS Asia University Rankings 2025: #58 in Asia, #1 in Philippines. QS World University Rankings 2025: #334 globally.',
  14.6538,
  121.0681
);

-- Insert academic programs for the new university
-- (University ID will be auto-assigned, update the number accordingly)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
-- Example programs - modify according to actual offerings
(3, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Civil Engineering', NULL, 'undergraduate'),
(3, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Electrical Engineering', NULL, 'undergraduate'),
(3, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Mechanical Engineering', NULL, 'undergraduate'),
(3, 'College of Arts and Sciences', 'Bachelor''s Degree Programs', 'Bachelor of Arts in Psychology', NULL, 'undergraduate'),
(3, 'College of Arts and Sciences', 'Bachelor''s Degree Programs', 'Bachelor of Science in Biology', NULL, 'undergraduate'),
(3, 'College of Business Administration', 'Bachelor''s Degree Programs', 'Bachelor of Science in Business Administration', NULL, 'undergraduate'),
(3, 'College of Law', 'Doctorate Degree Programs', 'Juris Doctor', NULL, 'graduate'),
(3, 'College of Medicine', 'Doctor of Medicine', 'Doctor of Medicine', NULL, 'graduate');

-- Update the programs count for the new university
UPDATE universities SET programs = (SELECT COUNT(*) FROM academic_programs WHERE university_id = 3) WHERE id = 3;
*/
