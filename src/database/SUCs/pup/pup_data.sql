-- PUP University Data and Academic Programs
-- Insert PUP university information
DELETE FROM universities WHERE id = 1;

INSERT INTO universities (
  id, name, location, province, established, type, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES
(
  1,
  'Polytechnic University of the Philippines',
  'Manila',
  'Metro Manila',
  '1904',
  'State',
  '65,000',
  94,
  'The premier state university known for affordable and quality higher education in the Philippines.',
  'Established in 1904, the Polytechnic University of the Philippines (PUP) has grown to become the largest state university in terms of enrollment in the Philippines. PUP offers various degree programs in technology, education, business, and other fields through its main campus in Sta. Mesa, Manila and its four satellite campuses.',
  ARRAY['Engineering', 'Computer Science', 'Business Administration', 'Education', 'Information Technology', 'Architecture', 'Psychology', 'Tourism Management'],
  '/Images/School Images/pup.jpg',
  ARRAY['https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg'],
  ARRAY['CHED Recognition – PUP is a state university recognized by the Commission on Higher Education (CHED).', 'AACCUP Accreditation – Many academic programs are accredited by the Accrediting Agency of Chartered Colleges and Universities in the Philippines (Levels I–IV).', 'ISO 9001:2015 Certified – PUP holds ISO certification for its Quality Management System, ensuring standardized academic and administrative processes.'],
  '15 hectares',
  '1904',
  'https://www.pup.edu.ph',
  '+63 2 5335-1787',
  'inquire@pup.edu.ph',
  'A. Mabini Campus, Anonas St., Sta. Mesa, Manila 1016, Metro Manila, Philippines',
  ARRAY['Ninoy Aquino Library and Learning Resources Center', 'Academic Classrooms and Lecture Rooms', 'Science Laboratories', 'Computer Laboratories', 'Engineering Laboratories', 'Multimedia and Audio-Visual Rooms', 'Research and Development Centers', 'Conference Rooms (e.g., Mateo, Olonan, Carague Rooms)', 'Co-working and Study Spaces', 'Graduate School Facilities', 'Laboratory High School Building', 'Office of the University President', 'Registrar''s Office', 'Admissions Office', 'Accounting and Finance Offices', 'Human Resources Office', 'Student Services Offices', 'Alumni Relations Office (Tahanan ng Alumni)', 'Faculty and Staff Offices', 'University Medical Clinic', 'Dental Clinic', 'Guidance and Counseling Office', 'Charlie del Rosario Student Development Center', 'Student Lounges and Social Rooms', 'Interfaith Chapel', 'Security and Safety Offices', 'Condrada Benitez Hall (Hasmin Hostel)', 'PUP Gymnasium / Multi-Purpose Sports Complex', 'Indoor Sports Courts (basketball, volleyball, badminton)', 'Outdoor Basketball Courts', 'Tennis Courts', 'Football Field', 'Track and Oval', 'Grandstand', 'Olympic-Sized Swimming Pool'],
  ARRAY['University Canteens', 'Food Stalls and Kiosks', 'Coffee Shops', 'Bookstore', 'Printing and Photocopying Services', 'Souvenir and Merchandise Shops', 'Small Retail and Commercial Spaces', 'Walkways and Covered Paths', 'Seating and Rest Areas', 'Parking Areas', 'Restrooms', 'Internet-enabled Areas (Wi-Fi zones)', 'Campus Transportation Access Points'],
  ARRAY['QS Asia University Rankings – Included in QS Asia rankings and awarded QS Stars for employability and online learning.', 'WURI World Rankings – Ranked among the Top 300 Innovative Universities worldwide.', 'Philippine Quality Award (PQA) – Awarded Level II for excellence in management and performance.', 'High Employability – Recognized by employers for producing industry-ready graduates.', 'Strong Licensure Exam Performance – Consistent top-performing results in various board examinations.'],
  ARRAY['One of the largest state universities in the Philippines by student population.', 'Known as "The Country''s First Polytechnic" (founded in 1904).', 'Offers undergraduate and graduate programs across business, engineering, education, and sciences.', 'Widely recognized for affordable, quality public education.'],
  ARRAY['Passed PUP College Entrance Exam Test (PUPCET)', 'Confirmation Requirements', 'High School Graduate', 'High School Card (Form 138)', 'Form 137-A', 'Medical Clearance from PUP Medical Clinic', 'Certification of Good Moral Character duly signed by the high school principal/guidance counselor of the school last attended.', 'NSO authenticated copy of Birth Certificate/ Certificate of Live Birth'],
  ARRAY['Visit the Official Page: Go to the PUP iApply for PUPCET page and read all the provided information.', 'Start Application: Click Apply Now to be redirected to the PUP iApply portal.', 'Account Creation: Click Register Here to create your new account.', 'Select Examination: Read the service agreement, click the I have read... button, and select PUPCET on the following page to begin.', 'Prequalification: Answer the prequalification questions to confirm your eligibility, then click Next.', 'Fill Registration Form: Enter the required information carefully.', 'Ensure your name and birth date match your PSA birth certificate exactly.', 'Provide a valid, active email address (this will be used for all transactions).', 'If you previously applied but did not enroll, you must use a new email address for this application.', 'Create and remember a strong password using a mix of letters, numbers, and special characters.', 'Verify Information: Ensure all details are accurate; any misrepresentation or false information will automatically invalidate your admission.', 'Submit and Sign In: Click Submit to create the account, then sign in using your credentials.', 'Complete Application Form: On the Applicant''s page, select Application Form to provide your full details.', 'Type in the Digital Security Code.', 'Type your complete name as your Digital Signature.', 'Check the box confirming you have read and understood the terms.', 'Finalize Application: Click Finalize to lock your form and submit it for evaluation by the University Admission and Registration Services.', 'Upload Requirements (If Prompted): If your photo or document is disapproved, follow the link provided to upload a clear, correctly formatted replacement. Note that validation can take 6–20 working days.', 'Print ePermit: Once your application is finalized and approved (usually after 6–20 working days), click Print ePermit to download and print your permit in color. You must bring this on your examination date.', 'Check Results: When results are officially released, log back in to click the Check PUPCET Results link.', 'Sign Out: Always sign out of the portal after your session for security.'],
  'open',
  '2024-05-31',
  '2024-08-01',
  '2025-05-31',
  '2024-04-15',
  'Edurank 2025',
  'Edurank 2025: 4th among SUCs in the Philippines, 14th among all universities in the Philippines, 2nd among SUCs in Metro Manila. QS Asia University Rankings 2026: #2 SUC in the Philippines, #8 overall Philippine university.',
  14.5981270,
  121.0115000
);

-- Migration script to populate PUP academic programs
-- Run this after creating the academic_programs table

-- Delete existing PUP programs if any (for re-running migration)
DELETE FROM academic_programs WHERE university_id = 1;

-- Insert PUP Graduate School programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
-- Doctorate Degree Programs
(1, 'Graduate School', 'Doctorate Degree Programs', 'Doctor of Philosophy in Communication', NULL, 'graduate'),
(1, 'Graduate School', 'Doctorate Degree Programs', 'Doctor of Philosophy in Economics', NULL, 'graduate'),
(1, 'Graduate School', 'Doctorate Degree Programs', 'Doctor of Philosophy in English Language Studies', NULL, 'graduate'),
(1, 'Graduate School', 'Doctorate Degree Programs', 'Doctor of Philosophy in Filipino', ARRAY['Wika', 'Panitikan'], 'graduate'),
(1, 'Graduate School', 'Doctorate Degree Programs', 'Doctor of Philosophy in Psychology', NULL, 'graduate'),

-- Master's Degree Programs
(1, 'Graduate School', 'Master''s Degree Programs', 'Master in Applied Statistics', ARRAY['Data Analytics', 'Official Statistics', 'Statistical Methods'], 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Arts in Communication', NULL, 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Arts in English Language Studies', NULL, 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Arts in Filipino', ARRAY['Wika', 'Panitikan'], 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Arts in Philippine Studies', NULL, 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Arts in Philosophy', NULL, 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Arts in Psychology', ARRAY['Clinical Psychology', 'Industrial Psychology'], 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Arts in Sociology', NULL, 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Science in Biology', NULL, 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Science in Civil Engineering', ARRAY['Structural Engineering', 'Transport Engineering', 'Geotechnical Engineering', 'Water Resources Engineering'], 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Science in Computer Engineering', ARRAY['Applied Security and Digital Forensics', 'Data Science and Engineering'], 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Science in Economics', NULL, 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Science in Electronics Engineering', ARRAY['Artificial Intelligence and Automation', 'Telecommunications'], 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Science in Industrial Engineering', NULL, 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Science in Information Technology', ARRAY['Data Analytics', 'Information Security'], 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Science in International Tourism and Hospitality Management', ARRAY['Hotel Operations', 'Travel and Tourism Operations'], 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Science in Mathematics', NULL, 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Science in Mechanical Engineering', NULL, 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Master of Science in Nutrition and Dietetics', NULL, 'graduate'),
(1, 'Graduate School', 'Master''s Degree Programs', 'Professional Science Masters in Railway Engineering Management', NULL, 'graduate'),

-- Graduate Diploma Program
(1, 'Graduate School', 'Graduate Diploma Program', 'Graduate Diploma in Project Management', NULL, 'graduate');

-- Insert Open University System programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'Open University System', 'Open University System', 'Doctor in Business Administration', NULL, 'graduate'),
(1, 'Open University System', 'Open University System', 'Doctor in Engineering Management', NULL, 'graduate'),
(1, 'Open University System', 'Open University System', 'Doctor of Philsophy in Education Management', NULL, 'graduate'),
(1, 'Open University System', 'Open University System', 'Doctor in Public Administration', NULL, 'graduate'),
(1, 'Open University System', 'Open University System', 'Master in Communication', NULL, 'graduate'),
(1, 'Open University System', 'Open University System', 'Master in Business Administration', NULL, 'graduate'),
(1, 'Open University System', 'Open University System', 'Master of Arts in Education Management', NULL, 'graduate'),
(1, 'Open University System', 'Open University System', 'Master in Information Technology', NULL, 'graduate'),
(1, 'Open University System', 'Open University System', 'Master in Public Administration', NULL, 'graduate'),
(1, 'Open University System', 'Open University System', 'Master of Science in Construction Management', NULL, 'graduate'),
(1, 'Open University System', 'Open University System', 'Post Baccalaureate Diploma in Information Technology', NULL, 'graduate'),
(1, 'Open University System', 'Open University System', 'Bachelor of Science in Entrepreneurship', NULL, 'undergraduate'),
(1, 'Open University System', 'Open University System', 'Bachelor of Arts in Broadcasting', NULL, 'undergraduate'),
(1, 'Open University System', 'Open University System', 'Bachelor of Science in Business Administration major in Human Resource Management', NULL, 'undergraduate'),
(1, 'Open University System', 'Open University System', 'Bachelor of Science in Business Administration major in Marketing Management', NULL, 'undergraduate'),
(1, 'Open University System', 'Open University System', 'Bachelor of Science in Office Administration', NULL, 'undergraduate'),
(1, 'Open University System', 'Open University System', 'Bachelor of Science in Tourism Management', NULL, 'undergraduate'),
(1, 'Open University System', 'Open University System', 'Bachelor of Public Administration', NULL, 'undergraduate');

-- Insert College of Accountancy and Finance programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Accountancy and Finance', 'Bachelor''s Degree Programs', 'Bachelor of Science in Accountancy', NULL, 'undergraduate'),
(1, 'College of Accountancy and Finance', 'Bachelor''s Degree Programs', 'Bachelor of Science in Business Administration Major in Financial Management', NULL, 'undergraduate'),
(1, 'College of Accountancy and Finance', 'Bachelor''s Degree Programs', 'Bachelor of Science in Management Accounting', NULL, 'undergraduate');

-- Insert College of Architecture, Design and the Built Environment programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Architecture, Design and the Built Environment', 'Bachelor''s Degree Programs', 'Bachelor of Science in Architecture', NULL, 'undergraduate'),
(1, 'College of Architecture, Design and the Built Environment', 'Bachelor''s Degree Programs', 'Bachelor of Science in Interior Design', NULL, 'undergraduate'),
(1, 'College of Architecture, Design and the Built Environment', 'Bachelor''s Degree Programs', 'Bachelor of Science in Environmental Planning', NULL, 'undergraduate');

-- Insert College of Arts and Letters programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Arts and Letters', 'Bachelor''s Degree Programs', 'Bachelor of Arts in English Language Studies', NULL, 'undergraduate'),
(1, 'College of Arts and Letters', 'Bachelor''s Degree Programs', 'Bachelor of Arts in Filipinology', NULL, 'undergraduate'),
(1, 'College of Arts and Letters', 'Bachelor''s Degree Programs', 'Bachelor of Arts in Literary and Cultural Studies', NULL, 'undergraduate'),
(1, 'College of Arts and Letters', 'Bachelor''s Degree Programs', 'Bachelor of Arts in Philosophy', NULL, 'undergraduate'),
(1, 'College of Arts and Letters', 'Bachelor''s Degree Programs', 'Bachelor of Performing Arts major in Theater Arts', NULL, 'undergraduate');

-- Insert College of Business Administration programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Business Administration', 'Doctorate Degree Programs', 'Doctor in Business Administration', NULL, 'graduate'),
(1, 'College of Business Administration', 'Master''s Degree Programs', 'Master in Business Administration', NULL, 'graduate'),
(1, 'College of Business Administration', 'Bachelor''s Degree Programs', 'Bachelor of Science in Business Administration major in Human Resource Management', NULL, 'undergraduate'),
(1, 'College of Business Administration', 'Bachelor''s Degree Programs', 'Bachelor of Science in Business Administration major in Marketing Management', NULL, 'undergraduate'),
(1, 'College of Business Administration', 'Bachelor''s Degree Programs', 'Bachelor of Science in Entrepreneurship', NULL, 'undergraduate'),
(1, 'College of Business Administration', 'Bachelor''s Degree Programs', 'Bachelor of Science in Office Administration', NULL, 'undergraduate');

-- Insert College of Communication programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Communication', 'Bachelor''s Degree Programs', 'Bachelor in Advertising and Public Relations', NULL, 'undergraduate'),
(1, 'College of Communication', 'Bachelor''s Degree Programs', 'Bachelor of Arts in Broadcasting', NULL, 'undergraduate'),
(1, 'College of Communication', 'Bachelor''s Degree Programs', 'Bachelor of Arts in Communication Research', NULL, 'undergraduate'),
(1, 'College of Communication', 'Bachelor''s Degree Programs', 'Bachelor of Arts in Journalism', NULL, 'undergraduate');

-- Insert College of Computer and Information Sciences programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Computer and Information Sciences', 'Bachelor''s Degree Programs', 'Bachelor of Science in Computer Science', NULL, 'undergraduate'),
(1, 'College of Computer and Information Sciences', 'Bachelor''s Degree Programs', 'Bachelor of Science in Information Technology', NULL, 'undergraduate');

-- Insert College of Education programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Education', 'Doctorate Degree Programs', 'Doctor of Philsophy in Education Management', NULL, 'graduate'),
(1, 'College of Education', 'Master''s Degree Programs', 'Master of Arts in Education Management', ARRAY['Educational Leadership', 'Instructional Leadership'], 'graduate'),
(1, 'College of Education', 'Master''s Degree Programs', 'Master in Business Education', NULL, 'graduate'),
(1, 'College of Education', 'Master''s Degree Programs', 'Master in Library and Information Science', NULL, 'graduate'),
(1, 'College of Education', 'Master''s Degree Programs', 'Master of Arts in English Language Teaching', NULL, 'graduate'),
(1, 'College of Education', 'Master''s Degree Programs', 'Master of Arts in Education major in Mathematics Education', NULL, 'graduate'),
(1, 'College of Education', 'Master''s Degree Programs', 'Master of Arts in Physical Education and Sports', NULL, 'graduate'),
(1, 'College of Education', 'Master''s Degree Programs', 'Master of Arts in Education major in Teaching in the Challenged Areas', NULL, 'graduate'),
(1, 'College of Education', 'Graduate Diploma Program', 'Post-Baccalaureate Diploma in Education', NULL, 'graduate'),
(1, 'College of Education', 'Bachelor''s Degree Programs', 'Bachelor of Technology and Livelihood Education major in Home Economics', NULL, 'undergraduate'),
(1, 'College of Education', 'Bachelor''s Degree Programs', 'Bachelor of Technology and Livelihood Education major in Industrial Arts', NULL, 'undergraduate'),
(1, 'College of Education', 'Bachelor''s Degree Programs', 'Bachelor of Technology and Livelihood Education major in Information and Communication Technology', NULL, 'undergraduate'),
(1, 'College of Education', 'Bachelor''s Degree Programs', 'Bachelor of Library and Information Science', NULL, 'undergraduate'),
(1, 'College of Education', 'Bachelor''s Degree Programs', 'Bachelor of Secondary Education major in English', NULL, 'undergraduate'),
(1, 'College of Education', 'Bachelor''s Degree Programs', 'Bachelor of Secondary Education major in Mathematics', NULL, 'undergraduate'),
(1, 'College of Education', 'Bachelor''s Degree Programs', 'Bachelor of Secondary Education major in Science', NULL, 'undergraduate'),
(1, 'College of Education', 'Bachelor''s Degree Programs', 'Bachelor of Secondary Education major in Filipino', NULL, 'undergraduate'),
(1, 'College of Education', 'Bachelor''s Degree Programs', 'Bachelor of Secondary Education major in Social Studies', NULL, 'undergraduate'),
(1, 'College of Education', 'Bachelor''s Degree Programs', 'Bachelor of Elementary Education', NULL, 'undergraduate'),
(1, 'College of Education', 'Bachelor''s Degree Programs', 'Bachelor of Early Childhood Education', NULL, 'undergraduate');

-- Insert College of Engineering programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Civil Engineering', NULL, 'undergraduate'),
(1, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Computer Engineering', NULL, 'undergraduate'),
(1, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Electrical Engineering', NULL, 'undergraduate'),
(1, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Electronics Engineering', NULL, 'undergraduate'),
(1, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Industrial Engineering', NULL, 'undergraduate'),
(1, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Mechanical Engineering', NULL, 'undergraduate'),
(1, 'College of Engineering', 'Bachelor''s Degree Programs', 'Bachelor of Science in Railway Engineering', NULL, 'undergraduate');

-- Insert College of Human Kinetics programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Human Kinetics', 'Bachelor''s Degree Programs', 'Bachelor of Physical Education', NULL, 'undergraduate'),
(1, 'College of Human Kinetics', 'Bachelor''s Degree Programs', 'Bachelor of Science in Exercises and Sports', NULL, 'undergraduate');

-- Insert College of Law programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Law', 'Doctorate Degree Programs', 'Juris Doctor', NULL, 'graduate');

-- Insert College of Political Science and Public Administration programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Political Science and Public Administration', 'Doctorate Degree Programs', 'Doctor in Public Administration', NULL, 'graduate'),
(1, 'College of Political Science and Public Administration', 'Master''s Degree Programs', 'Master in Public Administration', NULL, 'graduate'),
(1, 'College of Political Science and Public Administration', 'Bachelor''s Degree Programs', 'Bachelor of Arts in Political Science', NULL, 'undergraduate'),
(1, 'College of Political Science and Public Administration', 'Bachelor''s Degree Programs', 'Bachelor of Arts in Political Economy', NULL, 'undergraduate'),
(1, 'College of Political Science and Public Administration', 'Bachelor''s Degree Programs', 'Bachelor of Arts in International Studies', NULL, 'undergraduate'),
(1, 'College of Political Science and Public Administration', 'Bachelor''s Degree Programs', 'Bachelor of Public Administration', NULL, 'undergraduate');

-- Insert College of Social Sciences and Development programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Social Sciences and Development', 'Bachelor''s Degree Programs', 'Bachelor of Arts in History', NULL, 'undergraduate'),
(1, 'College of Social Sciences and Development', 'Bachelor''s Degree Programs', 'Bachelor of Arts in Sociology', NULL, 'undergraduate'),
(1, 'College of Social Sciences and Development', 'Bachelor''s Degree Programs', 'Bachelor of Science in Cooperatives', NULL, 'undergraduate'),
(1, 'College of Social Sciences and Development', 'Bachelor''s Degree Programs', 'Bachelor of Science in Economics', NULL, 'undergraduate'),
(1, 'College of Social Sciences and Development', 'Bachelor''s Degree Programs', 'Bachelor of Science in Psychology', NULL, 'undergraduate');

-- Insert College of Science programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Science', 'Bachelor''s Degree Programs', 'Bachelor of Science Food Technology', NULL, 'undergraduate'),
(1, 'College of Science', 'Bachelor''s Degree Programs', 'Bachelor of Science in Applied Mathematics', NULL, 'undergraduate'),
(1, 'College of Science', 'Bachelor''s Degree Programs', 'Bachelor of Science in Biology', NULL, 'undergraduate'),
(1, 'College of Science', 'Bachelor''s Degree Programs', 'Bachelor of Science in Chemistry', NULL, 'undergraduate'),
(1, 'College of Science', 'Bachelor''s Degree Programs', 'Bachelor of Science in Mathematics', NULL, 'undergraduate'),
(1, 'College of Science', 'Bachelor''s Degree Programs', 'Bachelor of Science in Nutrition and Dietetics', NULL, 'undergraduate'),
(1, 'College of Science', 'Bachelor''s Degree Programs', 'Bachelor of Science in Physics', NULL, 'undergraduate'),
(1, 'College of Science', 'Bachelor''s Degree Programs', 'Bachelor of Science in Statistics', NULL, 'undergraduate');

-- Insert College of Tourism, Hospitality and Transportation Management programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Tourism, Hospitality and Transportation Management', 'Bachelor''s Degree Programs', 'Bachelor of Science in Hospitality Management', NULL, 'undergraduate'),
(1, 'College of Tourism, Hospitality and Transportation Management', 'Bachelor''s Degree Programs', 'Bachelor of Science in Tourism Management', NULL, 'undergraduate'),
(1, 'College of Tourism, Hospitality and Transportation Management', 'Bachelor''s Degree Programs', 'Bachelor of Science in Transportation Management', NULL, 'undergraduate');

-- Insert Institute of Technology programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'Institute of Technology', 'Graduate Diploma Program', 'Diploma in Computer Engineering Technology', NULL, 'diploma'),
(1, 'Institute of Technology', 'Graduate Diploma Program', 'Diploma in Electrical Engineering Technology', NULL, 'diploma'),
(1, 'Institute of Technology', 'Graduate Diploma Program', 'Diploma in Electronics Engineering Technology', NULL, 'diploma'),
(1, 'Institute of Technology', 'Graduate Diploma Program', 'Diploma in Information Communication Technology', NULL, 'diploma'),
(1, 'Institute of Technology', 'Graduate Diploma Program', 'Diploma in Mechanical Engineering Technology', NULL, 'diploma'),
(1, 'Institute of Technology', 'Graduate Diploma Program', 'Diploma in Office Management', NULL, 'diploma');

-- Update the programs count for PUP
UPDATE universities SET programs = (SELECT COUNT(*) FROM academic_programs WHERE university_id = 1) WHERE id = 1;
