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
(1, 'Open University System', NULL, 'Doctor in Business Administration', NULL, 'graduate'),
(1, 'Open University System', NULL, 'Doctor in Engineering Management', NULL, 'graduate'),
(1, 'Open University System', NULL, 'Doctor of Philsophy in Education Management', NULL, 'graduate'),
(1, 'Open University System', NULL, 'Doctor in Public Administration', NULL, 'graduate'),
(1, 'Open University System', NULL, 'Master in Communication', NULL, 'graduate'),
(1, 'Open University System', NULL, 'Master in Business Administration', NULL, 'graduate'),
(1, 'Open University System', NULL, 'Master of Arts in Education Management', NULL, 'graduate'),
(1, 'Open University System', NULL, 'Master in Information Technology', NULL, 'graduate'),
(1, 'Open University System', NULL, 'Master in Public Administration', NULL, 'graduate'),
(1, 'Open University System', NULL, 'Master of Science in Construction Management', NULL, 'graduate'),
(1, 'Open University System', NULL, 'Post Baccalaureate Diploma in Information Technology', NULL, 'graduate'),
(1, 'Open University System', NULL, 'Bachelor of Science in Entrepreneurship', NULL, 'undergraduate'),
(1, 'Open University System', NULL, 'Bachelor of Arts in Broadcasting', NULL, 'undergraduate'),
(1, 'Open University System', NULL, 'Bachelor of Science in Business Administration major in Human Resource Management', NULL, 'undergraduate'),
(1, 'Open University System', NULL, 'Bachelor of Science in Business Administration major in Marketing Management', NULL, 'undergraduate'),
(1, 'Open University System', NULL, 'Bachelor of Science in Office Administration', NULL, 'undergraduate'),
(1, 'Open University System', NULL, 'Bachelor of Science in Tourism Management', NULL, 'undergraduate'),
(1, 'Open University System', NULL, 'Bachelor of Public Administration', NULL, 'undergraduate');

-- Insert College of Accountancy and Finance programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Accountancy and Finance', NULL, 'Bachelor of Science in Accountancy', NULL, 'undergraduate'),
(1, 'College of Accountancy and Finance', NULL, 'Bachelor of Science in Business Administration Major in Financial Management', NULL, 'undergraduate'),
(1, 'College of Accountancy and Finance', NULL, 'Bachelor of Science in Management Accounting', NULL, 'undergraduate');

-- Insert College of Architecture, Design and the Built Environment programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Architecture, Design and the Built Environment', NULL, 'Bachelor of Science in Architecture', NULL, 'undergraduate'),
(1, 'College of Architecture, Design and the Built Environment', NULL, 'Bachelor of Science in Interior Design', NULL, 'undergraduate'),
(1, 'College of Architecture, Design and the Built Environment', NULL, 'Bachelor of Science in Environmental Planning', NULL, 'undergraduate');

-- Insert College of Arts and Letters programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Arts and Letters', NULL, 'Bachelor of Arts in English Language Studies', NULL, 'undergraduate'),
(1, 'College of Arts and Letters', NULL, 'Bachelor of Arts in Filipinology', NULL, 'undergraduate'),
(1, 'College of Arts and Letters', NULL, 'Bachelor of Arts in Literary and Cultural Studies', NULL, 'undergraduate'),
(1, 'College of Arts and Letters', NULL, 'Bachelor of Arts in Philosophy', NULL, 'undergraduate'),
(1, 'College of Arts and Letters', NULL, 'Bachelor of Performing Arts major in Theater Arts', NULL, 'undergraduate');

-- Insert College of Business Administration programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Business Administration', NULL, 'Doctor in Business Administration', NULL, 'graduate'),
(1, 'College of Business Administration', NULL, 'Master in Business Administration', NULL, 'graduate'),
(1, 'College of Business Administration', NULL, 'Bachelor of Science in Business Administration major in Human Resource Management', NULL, 'undergraduate'),
(1, 'College of Business Administration', NULL, 'Bachelor of Science in Business Administration major in Marketing Management', NULL, 'undergraduate'),
(1, 'College of Business Administration', NULL, 'Bachelor of Science in Entrepreneurship', NULL, 'undergraduate'),
(1, 'College of Business Administration', NULL, 'Bachelor of Science in Office Administration', NULL, 'undergraduate');

-- Insert College of Communication programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Communication', NULL, 'Bachelor in Advertising and Public Relations', NULL, 'undergraduate'),
(1, 'College of Communication', NULL, 'Bachelor of Arts in Broadcasting', NULL, 'undergraduate'),
(1, 'College of Communication', NULL, 'Bachelor of Arts in Communication Research', NULL, 'undergraduate'),
(1, 'College of Communication', NULL, 'Bachelor of Arts in Journalism', NULL, 'undergraduate');

-- Insert College of Computer and Information Sciences programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Computer and Information Sciences', NULL, 'Bachelor of Science in Computer Science', NULL, 'undergraduate'),
(1, 'College of Computer and Information Sciences', NULL, 'Bachelor of Science in Information Technology', NULL, 'undergraduate');

-- Insert College of Education programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Education', NULL, 'Doctor of Philsophy in Education Management', NULL, 'graduate'),
(1, 'College of Education', NULL, 'Master of Arts in Education Management', ARRAY['Educational Leadership', 'Instructional Leadership'], 'graduate'),
(1, 'College of Education', NULL, 'Master in Business Education', NULL, 'graduate'),
(1, 'College of Education', NULL, 'Master in Library and Information Science', NULL, 'graduate'),
(1, 'College of Education', NULL, 'Master of Arts in English Language Teaching', NULL, 'graduate'),
(1, 'College of Education', NULL, 'Master of Arts in Education major in Mathematics Education', NULL, 'graduate'),
(1, 'College of Education', NULL, 'Master of Arts in Physical Education and Sports', NULL, 'graduate'),
(1, 'College of Education', NULL, 'Master of Arts in Education major in Teaching in the Challenged Areas', NULL, 'graduate'),
(1, 'College of Education', NULL, 'Post-Baccalaureate Diploma in Education', NULL, 'graduate'),
(1, 'College of Education', NULL, 'Bachelor of Technology and Livelihood Education major in Home Economics', NULL, 'undergraduate'),
(1, 'College of Education', NULL, 'Bachelor of Technology and Livelihood Education major in Industrial Arts', NULL, 'undergraduate'),
(1, 'College of Education', NULL, 'Bachelor of Technology and Livelihood Education major in Information and Communication Technology', NULL, 'undergraduate'),
(1, 'College of Education', NULL, 'Bachelor of Library and Information Science', NULL, 'undergraduate'),
(1, 'College of Education', NULL, 'Bachelor of Secondary Education major in English', NULL, 'undergraduate'),
(1, 'College of Education', NULL, 'Bachelor of Secondary Education major in Mathematics', NULL, 'undergraduate'),
(1, 'College of Education', NULL, 'Bachelor of Secondary Education major in Science', NULL, 'undergraduate'),
(1, 'College of Education', NULL, 'Bachelor of Secondary Education major in Filipino', NULL, 'undergraduate'),
(1, 'College of Education', NULL, 'Bachelor of Secondary Education major in Social Studies', NULL, 'undergraduate'),
(1, 'College of Education', NULL, 'Bachelor of Elementary Education', NULL, 'undergraduate'),
(1, 'College of Education', NULL, 'Bachelor of Early Childhood Education', NULL, 'undergraduate');

-- Insert College of Engineering programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Engineering', NULL, 'Bachelor of Science in Civil Engineering', NULL, 'undergraduate'),
(1, 'College of Engineering', NULL, 'Bachelor of Science in Computer Engineering', NULL, 'undergraduate'),
(1, 'College of Engineering', NULL, 'Bachelor of Science in Electrical Engineering', NULL, 'undergraduate'),
(1, 'College of Engineering', NULL, 'Bachelor of Science in Electronics Engineering', NULL, 'undergraduate'),
(1, 'College of Engineering', NULL, 'Bachelor of Science in Industrial Engineering', NULL, 'undergraduate'),
(1, 'College of Engineering', NULL, 'Bachelor of Science in Mechanical Engineering', NULL, 'undergraduate'),
(1, 'College of Engineering', NULL, 'Bachelor of Science in Railway Engineering', NULL, 'undergraduate');

-- Insert College of Human Kinetics programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Human Kinetics', NULL, 'Bachelor of Physical Education', NULL, 'undergraduate'),
(1, 'College of Human Kinetics', NULL, 'Bachelor of Science in Exercises and Sports', NULL, 'undergraduate');

-- Insert College of Law programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Law', NULL, 'Juris Doctor', NULL, 'graduate');

-- Insert College of Political Science and Public Administration programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Political Science and Public Administration', NULL, 'Doctor in Public Administration', NULL, 'graduate'),
(1, 'College of Political Science and Public Administration', NULL, 'Master in Public Administration', NULL, 'graduate'),
(1, 'College of Political Science and Public Administration', NULL, 'Bachelor of Arts in Political Science', NULL, 'undergraduate'),
(1, 'College of Political Science and Public Administration', NULL, 'Bachelor of Arts in Political Economy', NULL, 'undergraduate'),
(1, 'College of Political Science and Public Administration', NULL, 'Bachelor of Arts in International Studies', NULL, 'undergraduate'),
(1, 'College of Political Science and Public Administration', NULL, 'Bachelor of Public Administration', NULL, 'undergraduate');

-- Insert College of Social Sciences and Development programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Social Sciences and Development', NULL, 'Bachelor of Arts in History', NULL, 'undergraduate'),
(1, 'College of Social Sciences and Development', NULL, 'Bachelor of Arts in Sociology', NULL, 'undergraduate'),
(1, 'College of Social Sciences and Development', NULL, 'Bachelor of Science in Cooperatives', NULL, 'undergraduate'),
(1, 'College of Social Sciences and Development', NULL, 'Bachelor of Science in Economics', NULL, 'undergraduate'),
(1, 'College of Social Sciences and Development', NULL, 'Bachelor of Science in Psychology', NULL, 'undergraduate');

-- Insert College of Science programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Science', NULL, 'Bachelor of Science Food Technology', NULL, 'undergraduate'),
(1, 'College of Science', NULL, 'Bachelor of Science in Applied Mathematics', NULL, 'undergraduate'),
(1, 'College of Science', NULL, 'Bachelor of Science in Biology', NULL, 'undergraduate'),
(1, 'College of Science', NULL, 'Bachelor of Science in Chemistry', NULL, 'undergraduate'),
(1, 'College of Science', NULL, 'Bachelor of Science in Mathematics', NULL, 'undergraduate'),
(1, 'College of Science', NULL, 'Bachelor of Science in Nutrition and Dietetics', NULL, 'undergraduate'),
(1, 'College of Science', NULL, 'Bachelor of Science in Physics', NULL, 'undergraduate'),
(1, 'College of Science', NULL, 'Bachelor of Science in Statistics', NULL, 'undergraduate');

-- Insert College of Tourism, Hospitality and Transportation Management programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'College of Tourism, Hospitality and Transportation Management', NULL, 'Bachelor of Science in Hospitality Management', NULL, 'undergraduate'),
(1, 'College of Tourism, Hospitality and Transportation Management', NULL, 'Bachelor of Science in Tourism Management', NULL, 'undergraduate'),
(1, 'College of Tourism, Hospitality and Transportation Management', NULL, 'Bachelor of Science in Transportation Management', NULL, 'undergraduate');

-- Insert Institute of Technology programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'Institute of Technology', NULL, 'Diploma in Computer Engineering Technology', NULL, 'diploma'),
(1, 'Institute of Technology', NULL, 'Diploma in Electrical Engineering Technology', NULL, 'diploma'),
(1, 'Institute of Technology', NULL, 'Diploma in Electronics Engineering Technology', NULL, 'diploma'),
(1, 'Institute of Technology', NULL, 'Diploma in Information Communication Technology', NULL, 'diploma'),
(1, 'Institute of Technology', NULL, 'Diploma in Mechanical Engineering Technology', NULL, 'diploma'),
(1, 'Institute of Technology', NULL, 'Diploma in Office Management', NULL, 'diploma');

-- Insert Senior High School programs
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(1, 'Senior High School', 'Academic Track', 'General Academic Strand', NULL, 'certificate'),
(1, 'Senior High School', 'Academic Track', 'Science, Technology, Engineering and Mathematics Strand', NULL, 'certificate'),
(1, 'Senior High School', 'Academic Track', 'Accountancy, Business and Management Strand', NULL, 'certificate'),
(1, 'Senior High School', 'Academic Track', 'Humanities and Social Sciences Strand', NULL, 'certificate'),
(1, 'Senior High School', 'Arts and Design Track', 'Arts and Design Track', NULL, 'certificate'),
(1, 'Senior High School', 'Technical, Vocational and Livelihood Track', 'Tourism, Home Economics', NULL, 'certificate'),
(1, 'Senior High School', 'Technical, Vocational and Livelihood Track', 'Industrial Arts (Automotive, Electronics, Electrical)', NULL, 'certificate'),
(1, 'Senior High School', 'Technical, Vocational and Livelihood Track', 'Information and Communications Technology', NULL, 'certificate');

-- Update the programs count for PUP
UPDATE universities SET programs = (SELECT COUNT(*) FROM academic_programs WHERE university_id = 1) WHERE id = 1;
