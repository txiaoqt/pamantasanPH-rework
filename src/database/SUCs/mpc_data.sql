-- Marikina Polytechnic College (MPC) Data
-- Reference: https://mpc.edu.ph/
-- Programs Reference: https://mpc.edu.ph/academics/

INSERT INTO universities (
  name, location, province, established, type, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES (
  'Marikina Polytechnic College',
  'Marikina City',
  'Metro Manila',
  '1947', -- established (year)
  'Public',
  '5000', -- students (as string)
  25, -- programs
  'A public polytechnic college in Marikina City, Philippines. It is one of the premier polytechnic colleges in the country.',
  'Marikina Polytechnic College is a public polytechnic college in Marikina City, Philippines. It was established in 1947. The college is funded and operated by the City Government of Marikina.',
  ARRAY['Technical Vocational Teacher Education', 'Industrial Technology', 'Electronics Engineering', 'Entrepreneurship', 'Education', 'Technology']::text[], -- subjects (inferred from programs)
  'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', -- image_url
  ARRAY['https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg']::text[], -- gallery_images
  ARRAY['Accredited by the Accrediting Agency of Chartered Colleges and Universities in the Philippines (AACCUP).']::text[], -- accreditation
  NULL, -- campus_size (no specific data)
  '1947', -- founded
  'https://mpc.edu.ph/',
  'info@mpc.edu.ph',
  '(02) 8942 9736',
  'Shoe Ave, Sto. Niño, Marikina, 1800 Metro Manila',
  ARRAY['Main Library', 'College of Technology', 'College of Education', 'Computer Laboratories', 'Workshops']::text[], -- facilities
  ARRAY['Cafeteria', 'Gymnasium', 'Student Center', 'Medical and Dental Clinic', 'Auditorium']::text[], -- amenities
  ARRAY['Known for its strong programs in technical and vocational education.']::text[], -- achievements
  ARRAY['The college has a strong partnership with the local government and industries in Marikina City.']::text[], -- quickfacts
  ARRAY[
    'GENERAL REQUIREMENTS',
    'Must be a graduate of a high school accredited by the Department of Education.',
    'Must pass the MPC Admission Test (MPC-AT).'
  ]::text[], -- admission_requirements
  ARRAY[
    'Submit an online application through the MPC website.',
    'Pay the application fee.',
    'Take the MPC-AT exam on the scheduled date.',
    'Wait for the release of the MPC-AT results.'
  ]::text[], -- application_process
  'open', -- admission_status
  NULL, -- admission_deadline
  NULL, -- academic_semester_start
  NULL, -- academic_semester_end
  NULL, -- academic_application_deadline
  'UniRank 2023', -- ranking_source
  'Ranked among the top 300 universities in the Philippines.', -- ranking_details
  14.629, -- map_location_lat
  121.096 -- map_location_lng
);

-- MPC Academic Programs
INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ((SELECT id from universities where name = 'Marikina Polytechnic College'), 'Bachelor of Technical Vocational Teacher Education', 'College of Education', 'undergraduate', 'Bachelors', ARRAY['Automotive Technology', 'Civil Technology', 'Drafting Technology', 'Electrical Technology', 'Electronics Technology', 'Food and Service Management', 'Garments, Fashion and Design', 'Heating, Ventilating, Air-Conditioning and Refrigeration Technology', 'Mechanical Technology', 'Welding and Fabrication Technology']::text[]),
  ((SELECT id from universities where name = 'Marikina Polytechnic College'), 'Bachelor of Industrial Technology', 'College of Industrial Technology', 'undergraduate', 'Bachelors', ARRAY['Automotive Technology', 'Civil Technology', 'Drafting Technology', 'Electrical Technology', 'Electronics Technology', 'Food and Service Management', 'Garments, Fashion and Design', 'Heating, Ventilating, Air-Conditioning and Refrigeration Technology', 'Mechanical Technology', 'Welding and Fabrication Technology']::text[]),
  ((SELECT id from universities where name = 'Marikina Polytechnic College'), 'Bachelor of Science in Electronics Engineering', 'College of Engineering', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Marikina Polytechnic College'), 'Bachelor of Science in Entrepreneurship', 'College of Business and Management', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Marikina Polytechnic College'), 'Certificate of Technology', 'College of Industrial Technology', 'diploma', 'Certificate', ARRAY['Automotive Technology', 'Civil Technology', 'Drafting Technology', 'Electrical Technology', 'Electronics Technology', 'Food and Service Management', 'Garments, Fashion and Design', 'Heating, Ventilating, Air-Conditioning and Refrigeration Technology', 'Mechanical Technology', 'Welding and Fabrication Technology']::text[]),
  ((SELECT id from universities where name = 'Marikina Polytechnic College'), 'Continuing Professional Education', 'College of Education', 'graduate', 'Diploma', NULL),
  ((SELECT id from universities where name = 'Marikina Polytechnic College'), 'Doctor of Education', 'Graduate School', 'graduate', 'Doctorate', NULL),
  ((SELECT id from universities where name = 'Marikina Polytechnic College'), 'Master of Education', 'Graduate School', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Marikina Polytechnic College'), 'Master of Technician Education', 'Graduate School', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Marikina Polytechnic College'), 'Master of Arts in Teaching', 'Graduate School', 'graduate', 'Masters', NULL);