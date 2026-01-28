-- TUP Taguig Campus Data and Academic Programs
-- Insert TUP Taguig Campus information

DELETE FROM universities WHERE id = 107;

INSERT INTO universities (
  id, name, location, province, established, type, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES
(
  107,
  'Technological University of the Philippines - Taguig Campus',
  'Taguig City',
  'Metro Manila',
  '1977',
  'State',
  'Not available',
  23, -- Approximate count
  'A satellite campus of the Technological University of the Philippines, specializing in engineering and technology programs.',
  'TUP-Taguig has a mandate to provide higher and advanced vocational, technical, industrial, technological, and professional education and training in the industries and technology for the City of Taguig and its neighboring areas.',
  ARRAY['Engineering', 'Technology', 'Information Technology', 'Environmental Science', 'Teacher Education'],
  '/Images/School Images/tup.jpg', -- Placeholder image from main campus
  ARRAY['https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg'],
  ARRAY['Part of the TUP System, which is recognized by CHED and has various accredited programs.'],
  'Not available',
  '1977',
  'https://www.tupt.edu.ph/',
  '(+632) 8247-5250',
  'taguig@tup.edu.ph',
  'KM14 East Service Road, Western Bicutan, Taguig City, Metro Manila',
  ARRAY['Classrooms', 'Engineering Laboratories', 'Computer Laboratories', 'Library', 'Gymnasium', 'Auditorium'],
  ARRAY['Canteen', 'Student Center'],
  ARRAY['Part of the nationally recognized achievements of the TUP System.'],
  ARRAY['Known for its strong focus on engineering and technology education.', 'Offers a direct line to industry through its specialized programs.'],
  ARRAY['Passed TUP Admission Test (TUP-STAT)', 'High School Graduate', 'Form 138', 'Good Moral Character Certificate', 'Birth Certificate'],
  ARRAY['Follow the general TUP application process through the official TUP website.'],
  'open',
  'See TUP Main website',
  'See TUP Main website',
  'See TUP Main website',
  'See TUP Main website',
  'Not applicable',
  'Not applicable',
  14.5126, -- Approximate Latitude (Same as PUP Taguig, likely nearby)
  121.0592  -- Approximate Longitude (Same as PUP Taguig, likely nearby)
);

-- Delete existing TUP Taguig programs if any (for re-running migration)
DELETE FROM academic_programs WHERE university_id = 107;

-- Insert TUP Taguig academic programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
-- College of Engineering
(107, 'College of Engineering', 'Undergraduate', 'Bachelor of Science in Civil Engineering', NULL, 'undergraduate'),
(107, 'College of Engineering', 'Undergraduate', 'Bachelor of Science in Electrical Engineering', NULL, 'undergraduate'),
(107, 'College of Engineering', 'Undergraduate', 'Bachelor of Science in Electronics Engineering', NULL, 'undergraduate'),
(107, 'College of Engineering', 'Undergraduate', 'Bachelor of Science in Mechanical Engineering', NULL, 'undergraduate'),
-- College of Science
(107, 'College of Science', 'Undergraduate', 'Bachelor of Science in Environmental Science', NULL, 'undergraduate'),
(107, 'College of Science', 'Undergraduate', 'Bachelor of Science in Information Technology', NULL, 'undergraduate'),
-- College of Industrial Technology
(107, 'College of Industrial Technology', 'Undergraduate', 'Bachelor of Engineering Technology', ARRAY['Automotive Technology'], 'undergraduate'),
(107, 'College of Industrial Technology', 'Undergraduate', 'Bachelor of Engineering Technology', ARRAY['Electrical Technology'], 'undergraduate'),
(107, 'College of Industrial Technology', 'Undergraduate', 'Bachelor of Engineering Technology', ARRAY['Electronics Technology'], 'undergraduate'),
(107, 'College of Industrial Technology', 'Undergraduate', 'Bachelor of Engineering Technology', ARRAY['Instrumentation & Control Technology'], 'undergraduate'),
(107, 'College of Industrial Technology', 'Undergraduate', 'Bachelor of Engineering Technology', ARRAY['Mechatronics Technology'], 'undergraduate'),
(107, 'College of Industrial Technology', 'Undergraduate', 'Bachelor of Engineering Technology', ARRAY['Dies & Moulds Technology'], 'undergraduate'),
(107, 'College of Industrial Technology', 'Undergraduate', 'Bachelor of Engineering Technology', ARRAY['Heating, Ventilation, Airconditioning/Refrigeration Technology'], 'undergraduate'),
(107, 'College of Industrial Technology', 'Undergraduate', 'Bachelor of Engineering Technology', ARRAY['Chemical Technology'], 'undergraduate'),
(107, 'College of Industrial Technology', 'Undergraduate', 'Bachelor of Engineering Technology', ARRAY['Mechanical Technology'], 'undergraduate'),
(107, 'College of Industrial Technology', 'Undergraduate', 'Bachelor of Engineering Technology', ARRAY['Non-Destructive Testing Technology'], 'undergraduate'),
(107, 'College of Industrial Technology', 'Undergraduate', 'Bachelor of Engineering Technology', ARRAY['Civil Technology'], 'undergraduate'),
-- College of Education
(107, 'College of Education', 'Undergraduate', 'Bachelor of Technical-Vocational Teacher Education', ARRAY['Electrical Technology'], 'undergraduate'),
(107, 'College of Education', 'Undergraduate', 'Bachelor of Technical-Vocational Teacher Education', ARRAY['Electronics Technology'], 'undergraduate'),
(107, 'College of Education', 'Undergraduate', 'Bachelor of Technical-Vocational Teacher Education', ARRAY['Computer Programming'], 'undergraduate'),
(107, 'College of Education', 'Undergraduate', 'Bachelor of Technical-Vocational Teacher Education', ARRAY['Computer Hardware Servicing'], 'undergraduate');


-- Update the programs count for TUP Taguig
UPDATE universities SET programs = (SELECT COUNT(*) FROM academic_programs WHERE university_id = 107) WHERE id = 107;
