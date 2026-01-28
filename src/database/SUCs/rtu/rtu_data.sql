-- Rizal Technological University (RTU) Data
-- Reference: https://www.rtu.edu.ph/
-- Programs Reference: https://www.rtu.edu.ph/academics-and-admissions/

INSERT INTO universities (
  name, location, province, established, type, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES (
  'Rizal Technological University',
  'Mandaluyong City',
  'Metro Manila',
  '1969', -- established (year)
  'Public',
  '25000', -- students (as string)
  90, -- programs
  'A state university in the Philippines that is mandated to provide instruction and professional training in science, technology and other areas.',
  'Rizal Technological University (RTU) is a state university located at Mandaluyong, Philippines. It was established on July 11, 1969 as the College of Rizal, part of the University of Rizal System, before it was granted autonomy in 1975. The university is the first educational institution in the country to use cooperative education as a curriculum plan which is recognized by various industries, businesses and agencies all over the country.',
  ARRAY['Engineering', 'Architecture', 'Computer Studies', 'Business', 'Education', 'Arts and Sciences', 'Human Kinetics', 'Astronomy']::text[], -- subjects (inferred from programs)
  'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', -- image_url
  ARRAY['https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg']::text[], -- gallery_images
  ARRAY['ISO 9001:2015 Certified', 'Accredited by the Accrediting Agency of Chartered Colleges and Universities in the Philippines (AACCUP).']::text[], -- accreditation
  NULL, -- campus_size
  '1969', -- founded
  'https://www.rtu.edu.ph/',
  '(02) 8534 8267',
  'info@rtu.edu.ph',
  'Boni Ave, Mandaluyong, 1550 Metro Manila',
  ARRAY['Main Library', 'Engineering Building', 'Astronomy Observatory', 'Sports Complex', 'Computer Laboratories']::text[], -- facilities
  ARRAY['Dormitories', 'Canteens', 'Medical and Dental Clinic', 'Student Center']::text[], -- amenities
  ARRAY['Known for its programs in astronomy, engineering, and technology.']::text[], -- achievements
  ARRAY['The first state university to offer a degree in astronomy.']::text[], -- quickfacts
  ARRAY[
    'GENERAL REQUIREMENTS',
    'Must be a graduate of a high school accredited by the Department of Education.',
    'Must pass the RTU College Admission Test (RTUCAT).'
  ]::text[], -- admission_requirements
  ARRAY[
    'Submit an online application through the RTU website.',
    'Pay the application fee.',
    'Take the RTUCAT exam on the scheduled date.',
    'Wait for the release of the RTUCAT results.'
  ]::text[], -- application_process
  'Varies', -- admission_status
  NULL, -- admission_deadline
  NULL, -- academic_semester_start
  NULL, -- academic_semester_end
  NULL, -- academic_application_deadline
  'UniRank 2023', -- ranking_source
  'Ranked among the top 100 universities in the Philippines.', -- ranking_details
  14.577, -- map_location_lat
  121.042 -- map_location_lng
);

-- RTU Academic Programs
INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Mechanical Engineering', 'College of Engineering and Architecture', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Civil Engineering', 'College of Engineering and Architecture', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Electrical Engineering', 'College of Engineering and Architecture', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Electronics Engineering', 'College of Engineering and Architecture', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Computer Engineering', 'College of Engineering and Architecture', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Industrial Engineering', 'College of Engineering and Architecture', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Instrumentation and Control Engineering', 'College of Engineering and Architecture', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Mechatronics', 'College of Engineering and Architecture', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Accountancy', 'College of Business, Entrepreneurship, and Accountancy', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Entrepreneurship', 'College of Business, Entrepreneurship, and Accountancy', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Office Administration', 'College of Business, Entrepreneurship, and Accountancy', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Business Administration', 'College of Business, Entrepreneurship, and Accountancy', 'undergraduate', 'Bachelors', '{"Operations Management", "Marketing Management", "Financial Management", "Human Resource Management"}'),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Secondary Education', 'College of Education', 'undergraduate', 'Bachelors', '{"English", "Math", "Science", "Social Studies", "Filipino"}'),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Technical-Vocational Teacher Education', 'College of Education', 'undergraduate', 'Bachelors', '{"Animation", "Computer Hardware Servicing", "Visual Graphic Design", "Garments Fashion and Design", "Electronics Technology", "Welding and Fabrications Technology"}'),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Psychology', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Arts in Political Science', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Statistics', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Biology', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Bachelor of Science in Astronomy', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Master of Arts in Psychology', 'College of Arts and Sciences', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Master of Science in Astronomy', 'College of Arts and Sciences', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Master of Arts in Public Administration', 'College of Arts and Sciences', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Graduate Diploma in Astronomy', 'College of Arts and Sciences', 'graduate', 'Diploma', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Doctor of Philosophy in Public Administration', 'College of Arts and Sciences', 'graduate', 'Doctorate', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Master in Business Administration', 'College of Business, Entrepreneurship, and Accountancy', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Doctor in Business Administration', 'College of Business, Entrepreneurship, and Accountancy', 'graduate', 'Doctorate', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Master of Science in Engineering', 'College of Engineering and Architecture', 'graduate', 'Masters', '{"Instrumentation and Control Engineering", "Industrial Engineering", "Computer Engineering"}'),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Master of Science in Information Technology', 'Institute of Computer Studies', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Master of Arts in Literature and Language Instruction', 'College of Education', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Master of Arts in Science Education', 'College of Education', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Master of Arts in Mathematics Education', 'College of Education', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Master of Arts in Instructional Technology', 'College of Education', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Master of Arts in Educational Management', 'College of Education', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'Rizal Technological University'), 'Doctor of Philosophy in Technology Education', 'College of Education', 'graduate', 'Doctorate', NULL);