-- University of the Philippines Manila (UPM) Data
-- Reference: https://www.upm.edu.ph/
-- Programs Reference: College websites under upm.edu.ph

INSERT INTO universities (
  name, location, province, established, type, rating, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES (
  'University of the Philippines Manila',
  'Manila',
  'Metro Manila',
  '1905', -- established (year)
  'Public',
  NULL, -- rating (no specific data)
  '10000', -- students (as string)
  50, -- programs (placeholder)
  'The premier state university in the Philippines in the fields of health and medical sciences.',
  'The University of the Philippines Manila is a public, research university in Manila, Philippines. It is the oldest of the seven constituent universities of the University of the Philippines System, even predating the founding of UP by three years. It is the national university of the Philippines.',
  ARRAY['Occupational Therapy', 'Physical Therapy', 'Speech Pathology', 'Clinical Audiology', 'Rehabilitation Science', 'Applied Physics', 'Behavioral Sciences', 'Biochemistry', 'Biology', 'Computer Science', 'Development Studies', 'Organizational Communication', 'Philippine Arts', 'Political Science', 'Social Science', 'Management', 'Health Policy Studies', 'Health Informatics', 'Dentistry', 'Medicine', 'Nursing', 'Pharmacy', 'Public Health', 'Epidemiology', 'Occupational Health', 'Hospital Administration']::text[], -- subjects (inferred from programs)
  'https://www.upm.edu.ph/sites/default/files/styles/carousel_image/public/2021-01/upm-pylon.jpg?itok=8c6C4j4M', -- image_url
  ARRAY['https://www.upm.edu.ph/sites/default/files/styles/carousel_image/public/2021-01/upm-pylon.jpg?itok=8c6C4j4M', 'https://www.upm.edu.ph/sites/default/files/styles/carousel_image/public/2021-01/pgh-facade.jpg?itok=5W5o0b0B']::text[], -- gallery_images
  ARRAY['Center of Excellence in Medicine, Nursing, and Public Health.']::text[], -- accreditation
  NULL, -- campus_size (no specific data)
  '1905', -- founded
  'https://www.upm.edu.ph/',
  'info@upm.edu.ph',
  '(02) 8525 4322',
  'Padre Faura St, Ermita, Manila, 1000 Metro Manila',
  ARRAY['Philippine General Hospital', 'National Institutes of Health', 'UP Manila Museum of a History of Ideas', 'College Libraries', 'Computer Laboratories', 'Research Laboratories']::text[], -- facilities
  ARRAY['Dormitories', 'Cafeteria', 'Gymnasium', 'Student Center', 'Medical Clinic', 'Auditorium', 'Parking']::text[], -- amenities
  ARRAY['Home to the Philippine General Hospital (PGH), the largest government hospital in the country.']::text[], -- achievements
  ARRAY['The university has 9 degree-granting units.']::text[], -- quickfacts
  ARRAY[
    'GENERAL REQUIREMENTS',
    'Must be a graduate of a high school accredited by the Department of Education.',
    'Must pass the UP College Admission Test (UPCAT).'
  ]::text[], -- admission_requirements
  ARRAY[
    'Submit an online application through the UPCAT portal.',
    'Pay the application fee.',
    'Take the UPCAT exam on the scheduled date.',
    'Wait for the release of the UPCAT results.'
  ]::text[], -- application_process
  'Varies', -- admission_status
  'Varies', -- admission_deadline (default)
  'August', -- academic_semester_start
  'May', -- academic_semester_end
  'Varies', -- academic_application_deadline
  'QS World University Rankings 2024', -- ranking_source
  'Ranked #1 in the Philippines for Medicine and Life Sciences.', -- ranking_details
  14.578, -- map_location_lat
  120.988 -- map_location_lng
);

-- UPM Academic Programs
INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Science in Occupational Therapy', 'College of Allied Medical Professions', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Science in Physical Therapy', 'College of Allied Medical Professions', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Science in Speech Pathology', 'College of Allied Medical Professions', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Clinical Audiology', 'College of Allied Medical Professions', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Physical Therapy', 'College of Allied Medical Professions', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Rehabilitation Science', 'College of Allied Medical Professions', 'graduate', 'Masters', NULL);

INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Science in Applied Physics', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', ARRAY['Health Physics']::text[]),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Arts in Behavioral Sciences', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Science in Biochemistry', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Science in Biology', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Science in Computer Science', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', ARRAY['Health Informatics', 'Statistical Computing']::text[]),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Arts in Development Studies', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Arts in Organizational Communication', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Arts in Philippine Arts', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Arts in Political Science', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Arts in Social Science', 'College of Arts and Sciences', 'undergraduate', 'Bachelors', ARRAY['Area Studies']::text[]),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master in Management', 'College of Arts and Sciences', 'graduate', 'Masters', ARRAY['Business Management', 'Public Management', 'Educational Management']::text[]),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Arts in Health Policy Studies', 'College of Arts and Sciences', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Health Informatics', 'College of Arts and Sciences', 'graduate', 'Masters', ARRAY['Bioinformatics track']::text[]);

INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Doctor of Dental Medicine', 'College of Dentistry', 'undergraduate', 'Doctorate', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Dentistry', 'College of Dentistry', 'graduate', 'Masters', ARRAY['Orthodontics']::text[]);

INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Science in Basic Medical Sciences', 'College of Medicine', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Doctor of Medicine', 'College of Medicine', 'graduate', 'Doctorate', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Doctor of Philosophy in Biochemistry', 'College of Medicine', 'graduate', 'Doctorate', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'MD-PhD in Molecular Medicine', 'College of Medicine', 'graduate', 'Doctorate', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Basic Medical Sciences', 'College of Medicine', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Clinical Audiology', 'College of Medicine', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Clinical Medicine', 'College of Medicine', 'graduate', 'Masters', ARRAY['Child Health', 'Family and Community Health', 'Medical Oncology', 'Obstetrics and Gynecology', 'Surgery']::text[]),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Medical Anthropology', 'College of Medicine', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Orthopedics', 'College of Medicine', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Biochemistry', 'College of Medicine', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Bioethics', 'College of Medicine', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Epidemiology', 'College of Medicine', 'graduate', 'Masters', ARRAY['Clinical Epidemiology']::text[]),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Genetic Counselling', 'College of Medicine', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Health Informatics', 'College of Medicine', 'graduate', 'Masters', ARRAY['Medical Informatics track']::text[]),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Pharmacology', 'College of Medicine', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Physiology', 'College of Medicine', 'graduate', 'Masters', NULL);

INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Science in Nursing', 'College of Nursing', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Arts in Nursing', 'College of Nursing', 'graduate', 'Masters', ARRAY['Adult Health Nursing Track', 'Maternal and Child Nursing Track', 'Mental Health and Psychiatric Nursing Track', 'Public Health Nursing Track', 'Nursing Administration Track']::text[]),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Doctor of Philosophy in Nursing', 'College of Nursing', 'graduate', 'Doctorate', NULL);

INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Science in Pharmacy', 'College of Pharmacy', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Science in Industrial Pharmacy', 'College of Pharmacy', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Pharmaceutical Science', 'College of Pharmacy', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Social and Administrative Pharmacy', 'College of Pharmacy', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Pharmacy', 'College of Pharmacy', 'graduate', 'Masters', ARRAY['Hospital Pharmacy', 'Pharmaceutical Chemistry', 'Industrial Pharmacy']::text[]);

-- College of Public Health
INSERT INTO academic_programs (university_id, program_name, college_name, program_type, degree_level, specializations)
VALUES
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Bachelor of Science in Public Health', 'College of Public Health', 'undergraduate', 'Bachelors', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Public Health', 'College of Public Health', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Science in Epidemiology', 'College of Public Health', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Public Health', 'College of Public Health', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Occupational Health', 'College of Public Health', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Hospital Administration', 'College of Public Health', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Master of Arts in Health Policy Studies', 'College of Public Health', 'graduate', 'Masters', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Doctor of Public Health', 'College of Public Health', 'graduate', 'Doctorate', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Diploma in Dental Public Health', 'College of Public Health', 'graduate', 'Diploma', NULL),
  ((SELECT id from universities where name = 'University of the Philippines Manila'), 'Certificate in Hospital Administration', 'College of Public Health', 'graduate', 'Diploma', NULL);