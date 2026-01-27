-- TUP University Data and Academic Programs
-- Insert TUP university information

-- Delete existing TUP data (university id = 2)
DELETE FROM universities WHERE id = 2;

INSERT INTO universities (
  id, name, location, province, established, type, rating, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES
(
  2,
  'Technological University of the Philippines',
  'Manila',
  'Metro Manila',
  '1901',
  'State',
  NULL,
  '10,000',
  49,
  'A leading engineering and technology university focused on innovation and industry-relevant education.',
  'Founded in 1901, the Technological University of the Philippines (TUP) is one of the oldest institutions of higher learning in the country. Located in Manila, TUP specializes in engineering, technology, and vocational programs that prepare students for careers in various industries. The university emphasizes practical learning and research in technology and innovation.',
  ARRAY['Engineering', 'Information Technology', 'Architecture', 'Industrial Education', 'Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'],
  '/Images/School Images/tup.jpg',
  ARRAY['/Images/School Images/tup.jpg', '/Images/School Images/tup.jpg', '/Images/School Images/tup.jpg'],
  ARRAY['CHED Recognition – TUP is a government-funded state university under CHED.', 'AACCUP Accreditation – Several engineering and technology programs are accredited, including Level IV accreditation for selected programs.', 'ASAIHL Membership – Member of the Association of Southeast Asian Institutions of Higher Learning.'],
  NULL,
  '1901',
  'http://www.tup.edu.ph',
  '+63 (2) 5301.3042 / 5301.3001 local 603',
  'tup@tup.edu.ph',
  'Ayala Boulevard corner San Marcelino Street, Ermita, Manila, Metro Manila, Philippines',
  ARRAY['University Library', 'Engineering and Technology Laboratories', 'Computer and Information Technology Laboratories', 'Integrated Research and Training Center (IRTC)', 'Architecture and Drafting Studios', 'Academic and Administrative Buildings', 'Research and Development Facilities'],
  ARRAY['University Canteens and Food Stalls', 'Student Lounges and Study Areas', 'Medical and Dental Clinic', 'Guidance and Counseling Office', 'Open Courtyards and Seating Areas', 'Campus Security and Safety Services'],
  ARRAY['QS Asia University Rankings 2026 – Ranked in the 1301–1400 bracket in Asia.', 'AACCUP Level IV Accreditation – Civil Engineering and other programs recognized for high academic standards.', 'Top Performing School – Recognized for strong performance in engineering licensure examinations.', 'National HEI Ranking – Ranked among the top higher education institutions in the Philippines.'],
  ARRAY['Specializes in engineering, technology, and industrial education.', 'Established in 1901, making it one of the oldest technical schools in the country.', 'Main campus located in Ermita, Manila with several satellite campuses.', 'Known for producing technically skilled and industry-ready graduates.'],
  ARRAY['GENERAL REQUIREMENTS', 'For Senior High School Graduates', 'Passed the written TUP Scholastic and Technical Aptitude Test (TUPSTAT) and oral tests.', 'With Good Moral Character', 'Physically and Mentally Fit', 'Have met the prescribed admission requirements for the program/course applied for.', 'For Transferees (Within the TUP System)', 'Endorsement from the Admissions Office', 'With Good Scholastic Records', 'With Good Moral Character', 'Certification of Available Slot from the Department', 'For Transferees (From other schools)', 'Certificate of Transfer Credentials', 'With Good Scholastic Records (No Failing Grades)', 'With Good Moral Character', 'Certification of Available Slot from the Department', 'Have met the prescribed admission requirements for the program/course applied for.', 'SPECIAL CATEGORIES', 'For Foreign Students', 'Meet the prescribed admission requirements for the program/course applied for.', 'Submission of necessary requirements for student visa conversion, including:', 'Transcript of Records/Scholastic records duly authenticated by the Philippine Foreign Service', 'Proficiency in English Test (for non-native speakers of English language)', 'Notarized affidavit of support including bank statement, notice accommodation, and other subsistence, as well as other school dues and incidental expenses.', 'Five (5) copies of duly signed student''s personal history statement (PHS), both in English and his/her national alphabet, accompanied by his/her personal seal (if any), left and right thumbprints, and a 2x2 photograph on a plain white background taken within the last six months.', 'Photocopy of the data page of the student''s passport showing date and place of birth, and birth certificate or its equivalent.', 'Philippine Police Clearance', 'For Second Degree Takers', '(Allowed only for TUP graduates of specific programs if slots are available.)', 'Bachelor in Engineering Technology', 'No failing grades', 'Must obtain a grade point average (GPA) of 2.25 or higher', 'With Good Moral Character', 'Must pass the qualifying examination conducted by the College of Engineering', 'Pass a comprehensive examination (score of 70/100) to credit third and fourth-year subjects to BSCE, BSECE, BSEE, or BSME.', 'Bachelor of Arts Major in Industrial Management', 'Must obtain a grade point average (GPA) of 2.50 or higher', 'With Good Moral Character', 'Bachelor of Technical Teacher Education', 'With Good Moral Character'],
  ARRAY['Report to the Office of Admissions', 'Present the following required documents:', 'Pre-Registration Form (Printed and filled out)', 'Applicant Patient Record Form (Printed and filled out)', 'Original and Photocopy of Grade 12 SHS card', 'Certificate of Good Moral Character', 'PSA/NSO Birth Certificate (Original and photocopy)', 'PSA/NSO Marriage Certificate (Original and photocopy; required for married female students only)', 'Report to College for Interview', 'Report to Medical/Dental Clinic', 'Bring the Original and Photocopy of these medical requirements:', 'Chest X-ray (PA View)', 'Drug Test', 'Return to the Office of Admissions', 'Obtain your Notice of Admission, Undertaking, and Student Pledge.', 'Report to College for Enlistment', 'Confirmation of Enrollment', 'Final confirmation is processed by the Registrar.'],
  'open',
  NULL,
  NULL,
  NULL,
  NULL,
  'Edurank 2025 & QS Asia 2026',
  'Edurank 2025: Ranked among the top universities in the Philippines for engineering and technology. QS Asia 2026: Ranked 1301–1400 in Asia',
  14.5873000,
  120.9844700
);

-- Migration script to populate TUP academic programs
-- Run this after creating the academic_programs table

-- Delete existing TUP programs if any (for re-running migration)
DELETE FROM academic_programs WHERE university_id = 2;

-- Insert TUP College of Industrial Technology programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Science in Food Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Computer Engineering Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Civil Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Electrical Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Electronics Communications Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Electronics Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Instrumentation and Control Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Mechanical Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Mechatronics Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Railway Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Mechanical Engineering Technology option in Automotive Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Mechanical Engineering Technology option in Foundry Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Mechanical Engineering Technology option in Heating Ventilating & Air-Conditioning / Refrigeration Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Mechanical Engineering Technology option in Power Plant Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Mechanical Engineering Technology option in Welding Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Engineering Technology major in Mechanical Engineering Technology option in Dies and Moulds Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Technology in Apparel and Fashion', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Technology in Nutrition and Food Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Technology', 'Bachelor''s Degree Programs', 'Bachelor of Technology in Print Media Technology', NULL, 'undergraduate');

-- Insert TUP College of Industrial Education programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(2, 'College of Industrial Education', 'Bachelor''s Degree Programs', 'Bachelor of Technology and Livelihood Education major in Information and Communication Technology', NULL, 'undergraduate'),
(2, 'College of Industrial Education', 'Bachelor''s Degree Programs', 'Bachelor of Technology and Livelihood Education major in Home Economics', NULL, 'undergraduate'),
(2, 'College of Industrial Education', 'Bachelor''s Degree Programs', 'Bachelor of Technology and Livelihood Education major in Industrial Arts', NULL, 'undergraduate'),
(2, 'College of Industrial Education', 'Bachelor''s Degree Programs', 'Bachelor of Technical Vocational Teachers Education major in Animation', NULL, 'undergraduate'),
(2, 'College of Industrial Education', 'Bachelor''s Degree Programs', 'Bachelor of Technical Vocational Teachers Education major in Beauty Care and Wellness', NULL, 'undergraduate'),
(2, 'College of Industrial Education', 'Bachelor''s Degree Programs', 'Bachelor of Technical Vocational Teachers Education major in Computer Programming', NULL, 'undergraduate'),
(2, 'College of Industrial Education', 'Bachelor''s Degree Programs', 'Bachelor of Technical Vocational Teachers Education major in Electrical', NULL, 'undergraduate'),
(2, 'College of Industrial Education', 'Bachelor''s Degree Programs', 'Bachelor of Technical Vocational Teachers Education major in Electronics', NULL, 'undergraduate'),
(2, 'College of Industrial Education', 'Bachelor''s Degree Programs', 'Bachelor of Technical Vocational Teachers Education major in Food Service Management', NULL, 'undergraduate'),
(2, 'College of Industrial Education', 'Bachelor''s Degree Programs', 'Bachelor of Technical Vocational Teachers Education major in Fashion and Garment', NULL, 'undergraduate'),
(2, 'College of Industrial Education', 'Bachelor''s Degree Programs', 'Bachelor of Technical Vocational Teachers Education major in Heat Ventilation & Air Conditioning', NULL, 'undergraduate'),
(2, 'College of Industrial Education', 'Bachelor''s Degree Programs', 'Bachelor of Technical Teacher Education', NULL, 'undergraduate');

-- Insert TUP College of Engineering programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(2, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Civil Engineering', NULL, 'undergraduate'),
(2, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Electrical Engineering', NULL, 'undergraduate'),
(2, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Electronics Engineering', NULL, 'undergraduate'),
(2, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Mechanical Engineering', NULL, 'undergraduate');

-- Insert TUP College of Liberal Arts programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(2, 'College of Liberal Arts', 'Bachelor''s Degree Programs', 'Bachelor of Arts in Management major in Industrial Management', NULL, 'undergraduate'),
(2, 'College of Liberal Arts', 'Bachelor''s Degree Programs', 'Bachelor of Science in Entrepreneurship Management', NULL, 'undergraduate'),
(2, 'College of Liberal Arts', 'Bachelor''s Degree Programs', 'Bachelor of Science in Hospitality Management', NULL, 'undergraduate');

-- Insert TUP College of Science programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(2, 'College of Science', 'Bachelor''s Degree Programs', 'Bachelor of Applied Science in Laboratory Technology', NULL, 'undergraduate'),
(2, 'College of Science', 'Bachelor''s Degree Programs', 'Bachelor of Science in Computer Science', NULL, 'undergraduate'),
(2, 'College of Science', 'Bachelor''s Degree Programs', 'Bachelor of Science in Environmental Science', NULL, 'undergraduate'),
(2, 'College of Science', 'Bachelor''s Degree Programs', 'Bachelor of Science in Information System', NULL, 'undergraduate'),
(2, 'College of Science', 'Bachelor''s Degree Programs', 'Bachelor of Science in Information Technology', NULL, 'undergraduate');

-- Insert TUP College of Architecture and Fine Arts programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(2, 'College of Architecture and Fine Arts', 'Bachelor''s Degree Programs', 'Bachelor of Science in Architecture', NULL, 'undergraduate'),
(2, 'College of Architecture and Fine Arts', 'Bachelor''s Degree Programs', 'Bachelor of Fine Arts', NULL, 'undergraduate'),
(2, 'College of Architecture and Fine Arts', 'Bachelor''s Degree Programs', 'Bachelor in Graphics Technology major in Architecture Technology', NULL, 'undergraduate'),
(2, 'College of Architecture and Fine Arts', 'Bachelor''s Degree Programs', 'Bachelor in Graphics Technology major in Industrial Design', NULL, 'undergraduate'),
(2, 'College of Architecture and Fine Arts', 'Bachelor''s Degree Programs', 'Bachelor in Graphics Technology major in Mechanical Drafting Technology', NULL, 'undergraduate');

-- Update the programs count for TUP
UPDATE universities SET programs = (SELECT COUNT(*) FROM academic_programs WHERE university_id = 2) WHERE id = 2;
