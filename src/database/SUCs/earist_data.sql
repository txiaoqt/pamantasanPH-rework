-- Eulogio "Amang" Rodriguez Institute of Science and Technology (EARIST) Data
-- Reference: https://earist.edu.ph/
-- Programs Reference: https://earist.edu.ph/academic-programs-2/

INSERT INTO universities (
  name, location, province, established, type, rating, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES (
  'Eulogio "Amang" Rodriguez Institute of Science and Technology',
  'Manila',
  'Metro Manila',
  '1945', -- established (year)
  'Public',
  NULL, -- rating (no specific data)
  '20000', -- students (as string)
  60, -- programs
  'A state university in Manila, Philippines, that offers a wide range of undergraduate and graduate programs in science, technology, education, and more.',
  'The Eulogio "Amang" Rodriguez Institute of Science and Technology (EARIST) is a public university located in Sampaloc, Manila. The university is known for its programs in science, technology, and education. It was founded in 1945 by the late President Manuel L. Quezon.',
  ARRAY['Psychology', 'Criminology', 'Computer Science', 'Hospitality Management', 'Business Administration', 'Office Administration', 'Information Technology', 'Industrial Technology', 'Applied Physics', 'Architecture', 'Fine Arts', 'Education', 'Special Needs Education', 'Chemical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Electronics and Communication Engineering', 'Mechanical Engineering', 'Computer Engineering', 'Entrepreneurship', 'Mathematics', 'Nursing', 'Industrial Psychology', 'Computer Technology', 'Interior Design', 'Tourism', 'Educational Management', 'Public Administration']::text[], -- subjects (inferred from programs)
  'https://earist.edu.ph/wp-content/uploads/2021/08/earist-facade.jpg', -- image_url
  ARRAY['https://earist.edu.ph/wp-content/uploads/2021/08/earist-facade.jpg', 'https://earist.edu.ph/wp-content/uploads/2021/08/earist-campus.jpg']::text[], -- gallery_images
  ARRAY['Accredited by the Accrediting Agency of Chartered Colleges and Universities in the Philippines (AACCUP).']::text[], -- accreditation
  NULL, -- campus_size (no specific data)
  '1945', -- founded
  'https://earist.edu.ph/',
  'info@earist.edu.ph',
  '(02) 8715 0993',
  'Nagtahan, Sampaloc, Manila, 1008 Metro Manila',
  ARRAY['Main Library', 'College of Engineering', 'College of Education', 'Computer Laboratories', 'Workshops', 'Science Laboratories']::text[], -- facilities
  ARRAY['Cafeteria', 'Gymnasium', 'Student Center', 'Medical and Dental Clinic', 'Auditorium', 'Parking']::text[], -- amenities
  ARRAY['Known for its strong programs in engineering and industrial technology.']::text[], -- achievements
  ARRAY['The university has a satellite campus in Cavite.']::text[], -- quickfacts
  ARRAY[
    'GENERAL REQUIREMENTS',
    'Must be a graduate of a high school accredited by the Department of Education.',
    'Must pass the EARIST College Admission Test (EARIST-CAT).'
  ]::text[], -- admission_requirements
  ARRAY[
    'Submit an online application through the EARIST website.',
    'Pay the application fee.',
    'Take the EARIST-CAT exam on the scheduled date.',
    'Wait for the release of the EARIST-CAT results.'
  ]::text[], -- application_process
  'Varies', -- admission_status
  'Varies', -- admission_deadline (default)
  'August', -- academic_semester_start
  'May', -- academic_semester_end
  'Varies', -- academic_application_deadline
  'UniRank 2023', -- ranking_source
  'Ranked among the top 150 universities in the Philippines.', -- ranking_details
  14.5985, -- map_location_lat
  121.002 -- map_location_lng
);

INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Psychology', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Criminology', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Computer Science', 'College of Computer Studies', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Hospitality Management', 'College of Hospitality Management', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Business Administration', 'College of Business Administration', 'undergraduate', 'Bachelors', ARRAY['Marketing Management', 'Human Resource Development Management']::text[]),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Office Administration', 'College of Business Administration', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Information Technology', 'College of Computer Studies', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Industrial Technology', 'College of Industrial Technology', 'undergraduate', 'Bachelors', ARRAY['Electronics Technology', 'Electrical Technology', 'Automotive Technology', 'Drafting Technology', 'Food Technology']::text[]),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Applied Physics with Computer Science Emphasis', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Architecture', 'College of Architecture and Fine Arts', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor in Fine Arts', 'College of Architecture and Fine Arts', 'undergraduate', 'Bachelors', ARRAY['Advertising', 'Painting']::text[]),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor in Secondary Education', 'College of Education', 'undergraduate', 'Bachelors', ARRAY['Science', 'Mathematics', 'Filipino']::text[]),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor in Special Needs Education', 'College of Education', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor in Technology and Livelihood Education', 'College of Education', 'undergraduate', 'Bachelors', ARRAY['Home Economics', 'Industrial Arts']::text[]),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Chemical Engineering', 'College of Engineering', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Civil Engineering', 'College of Engineering', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Electrical Engineering', 'College of Engineering', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Electronics and Communication Engineering', 'College of Engineering', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Mechanical Engineering', 'College of Engineering', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Computer Engineering', 'College of Engineering', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Entrepreneurship', 'College of Business Administration', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Mathematics', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Nursing', 'College of Nursing', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Industrial Psychology', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Computer Technology', 'College of Computer Studies', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Interior Design', 'College of Architecture and Fine Arts', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Bachelor of Science in Tourism', 'College of Hospitality Management', 'undergraduate', 'Bachelors', NULL);

-- EARIST Graduate Programs
INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Doctor of Education', 'Graduate School', 'graduate', 'Doctorate', ARRAY['Educational Management', 'Industrial Education Management']::text[]),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Master of Arts in Education', 'Graduate School', 'graduate', 'Masters', ARRAY['Administration and Supervision', 'Guidance and Counseling', 'Special Education']::text[]),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Master in Business Administration', 'Graduate School', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Professional Education', 'Graduate School', 'graduate', 'Diploma', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Master of Science in Mathematics', 'Graduate School', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Master of Arts in Industrial Psychology', 'Graduate School', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Master in Public Administration', 'Graduate School', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Master of Arts in Industrial Education', 'Graduate School', 'graduate', 'Masters', ARRAY['Hotel Management']::text[]),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Master of Arts in Teaching', 'Graduate School', 'graduate', 'Masters', ARRAY['Automotive Technology', 'Electrical Technology', 'Electronics Technology', 'Food Technology', 'Garments Trades', 'Home Making Arts', 'Industrial Technology', 'Machine Shop Technology', 'Practical Arts', 'Refrigeration and Air-Conditioning', 'Mathematics', 'Science']::text[]),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Doctor of Philosophy in Industrial Psychology', 'Graduate School', 'graduate', 'Doctorate', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Doctor of Business Administration', 'Graduate School', 'graduate', 'Doctorate', NULL),
  ((SELECT id from universities where name = 'Eulogio "Amang" Rodriguez Institute of Science and Technology'), 'Doctor of Public Administration', 'Graduate School', 'graduate', 'Doctorate', NULL);