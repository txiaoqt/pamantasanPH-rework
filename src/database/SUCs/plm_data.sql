-- PLM University Data and Academic Programs
-- Insert PLM university information

-- Delete existing PLM data (university id = 3)
DELETE FROM universities WHERE id = 3;

INSERT INTO universities (
  id, name, location, province, established, type, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, quickfacts, admission_requirements, application_process, admission_status, admission_deadline,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES
(
  3,
  'Pamantasan ng Lungsod ng Maynila',
  'Manila',
  'Metro Manila',
  '1965',
  'State',
  '13,000',
  62,
  'The premier city-funded university providing accessible, high-quality education to academically deserving students.',
  'Municipal public university funded by the City of Manila; provides accessible, high-quality tertiary education to academically deserving students and aims to develop professionals and leaders dedicated to national progress.',
  ARRAY['Medicine', 'Law', 'Engineering', 'Education', 'Business Administration', 'Architecture', 'Nursing', 'Physical Therapy', 'Computer Science', 'Information Technology'],
  '/Images/School Images/plm.jpg',
  ARRAY['https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/PLACEHOLDER.jpg'],
  ARRAY['CHED Recognition – PLM is a public higher education institution fully recognized by the Commission on Higher Education (CHED).', 'AACCUP Accreditation – Several undergraduate and graduate programs are accredited by the Accrediting Agency of Chartered Colleges and Universities in the Philippines (AACCUP) at various accreditation levels.', 'ASAIHL & IAU Memberships – Member of the Association of Southeast Asian Institutions of Higher Learning (ASAIHL) and the International Association of Universities (IAU).'],
  NULL,
  '1965',
  'https://www.plm.edu.ph/',
  '(02) 527-7941',
  'registrar@plm.edu.ph',
  'General Luna Street, Intramuros, Manila 1000, Metro Manila, Philippines',
  ARRAY['University library and study halls', 'Sports and athletic facilities', 'Distance education centers and learning support services', 'Research and specialized centers'],
  ARRAY['Financial aid and scholarship support', 'Student services including study abroad and exchange programs', 'Administrative support services'],
  ARRAY['EduRank 2025 – Ranked 26th in the Philippines and among the top universities in Asia based on research output and academic impact.', 'Board Examination Performance – Recognized for consistently high passing rates in licensure exams (Law, Education, Accountancy, Medicine).', 'Quality Public Education – Widely acknowledged as one of the leading local universities producing competitive professionals.', 'Outstanding Alumni Recognition – Honors graduates who excel in public service, law, education, and healthcare sectors.'],
  ARRAY['First city-funded university in the Philippines, established to provide free or highly subsidized education.', 'Founded in 1965 and officially opened in 1967.', 'Located inside Intramuros, Manila, a historic and academic district.', 'Offers programs in medicine, law, engineering, education, business, sciences, and liberal arts.', 'Known for producing top-performing professionals committed to public service and nation-building.'],
  ARRAY['Qualifications: A student-applicant may apply if they comply with any of the following basic criteria:', 'Currently Enrolled Grade 12 Students: Must be enrolled in a DepEd-accredited senior high school with a Grade 11 General Weighted Average (GWA) of 80 or above.', 'Senior High School Graduates: Must have graduated from a DepEd-accredited school with a Grade 11 GWA of 80 or above and must not have taken any college units or programs prior to the application period.', 'ALS Completers: Must have completed the Alternative Learning System (ALS) and passed the Accreditation & Equivalency (A&E) as recommended for tertiary education, provided they have not yet taken any college units.', 'Documentary Requirements: Applicants must prepare a scanned copy (PDF) of the following documents:', 'PSA Birth Certificate', 'Grade 11 Certificate of General Weighted Average (GWA) (Required for Senior High School applicants)', 'Certificate of Completion (Required for ALS completers and A&E passers)'],
  ARRAY['Visit the PLM Admission Portal: Go to http://web1.plm.edu.ph/crs/admission.', 'Fill out the Application Form: Complete the required fields in the online form.', 'Upload Requirements: Submit the necessary digital copies of your documents.', 'Receive Log-in Credentials: Once submitted successfully, check your email for your account details.', 'Log in to the Portal: Use the credentials sent to your email to access your account.', 'Check Requirement Status: Validated: Print the PLM Application Form. Attach a 1.5 x 1.5 colored ID picture (white background) and sign the form. Not Validated: Re-submit the valid versions of the specific requirement(s) requested.', 'Upload the Signed Form: Scan the signed PLM Application Form (with the attached photo) and upload it back to the portal.', 'Final Status Check: Check your account periodically for the validation of your Application Form. Validated: Wait for the official Admission Result. Not Validated: Re-submit the valid Application Form as instructed.'],
  'open',
  NULL,
  NULL,
  NULL,
  NULL,
  'EduRank 2025 & QS Asia 2026',
  'EduRank 2025: 26th nationwide and 6390th worldwide. QS Asia: Not currently listed in the official QS Asia University Rankings (as of available 2025/2026 data). N/A (No ranking found)',
  14.587054766751088,
  120.97617355893664
);

-- Migration script to populate PLM academic programs
-- Run this after creating the academic_programs table

-- Delete existing PLM programs if any (for re-running migration)
DELETE FROM academic_programs WHERE university_id = 3;

-- Insert PLM UNDERGRADUATE PROGRAMS
-- College Of Architecture And Urban Planning (CAUP)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College Of Architecture And Urban Planning (CAUP)', 'Undergraduate Programs', 'Bachelor of Science in Architecture (BSARCH)', NULL, 'undergraduate');

-- College Of Business And Government Management (CBGM)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College Of Business And Government Management (CBGM)', 'Undergraduate Programs', 'Bachelor of Science in Accountancy (BS ACCTG)', NULL, 'undergraduate'),
(3, 'College Of Business And Government Management (CBGM)', 'Undergraduate Programs', 'Bachelor of Science in Business Administration - Major in Financial Management (BSBA-FM)', NULL, 'undergraduate'),
(3, 'College Of Business And Government Management (CBGM)', 'Undergraduate Programs', 'Bachelor of Science in Business Administration - Major in Human Resource Management (BSBA-HRM)', NULL, 'undergraduate'),
(3, 'College Of Business And Government Management (CBGM)', 'Undergraduate Programs', 'Bachelor of Science in Business Administration - Major in Operations Management (BSBA-OM)', NULL, 'undergraduate'),
(3, 'College Of Business And Government Management (CBGM)', 'Undergraduate Programs', 'Bachelor of Science in Business Administration - Major in Marketing Management (BSBA-MM)', NULL, 'undergraduate'),
(3, 'College Of Business And Government Management (CBGM)', 'Undergraduate Programs', 'Bachelor of Science in Business Economics (BSBE)', NULL, 'undergraduate'),
(3, 'College Of Business And Government Management (CBGM)', 'Undergraduate Programs', 'Bachelor of Science in Entrepreneurship (BSENTRE)', NULL, 'undergraduate'),
(3, 'College Of Business And Government Management (CBGM)', 'Undergraduate Programs', 'Bachelor of Science in Hospitality Management (BSHM)', NULL, 'undergraduate'),
(3, 'College Of Business And Government Management (CBGM)', 'Undergraduate Programs', 'Bachelor of Science in Tourism Management (BSTM)', NULL, 'undergraduate'),
(3, 'College Of Business And Government Management (CBGM)', 'Undergraduate Programs', 'Bachelor in Real Estate Management (BREM)', NULL, 'undergraduate');

-- College Of Education (CEd)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College Of Education (CEd)', 'Undergraduate Programs', 'Bachelor of Elementary Education - with specialization in Pre-School Education (BEEd-PSE)', NULL, 'undergraduate'),
(3, 'College Of Education (CEd)', 'Undergraduate Programs', 'Bachelor of Physical Education - Major in School Physical Education (BPE-SPE)', NULL, 'undergraduate'),
(3, 'College Of Education (CEd)', 'Undergraduate Programs', 'Bachelor of Secondary Education - with specialization in Biological Sciences (BSE-BS)', NULL, 'undergraduate'),
(3, 'College Of Education (CEd)', 'Undergraduate Programs', 'Bachelor of Secondary Education - with specialization in English (BSEd-Eng)', NULL, 'undergraduate'),
(3, 'College Of Education (CEd)', 'Undergraduate Programs', 'Bachelor of Secondary Education - with specialization in Filipino (BSEd-Fil)', NULL, 'undergraduate'),
(3, 'College Of Education (CEd)', 'Undergraduate Programs', 'Bachelor of Secondary Education - with specialization in Mathematics (BSEd-Math)', NULL, 'undergraduate'),
(3, 'College Of Education (CEd)', 'Undergraduate Programs', 'Bachelor of Secondary Education - with specialization in Social Studies (BSEd-SS)', NULL, 'undergraduate');

-- College Of Engineering And Technology (CET)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College Of Engineering And Technology (CET)', 'Undergraduate Programs', 'Bachelor of Science in Chemical Engineering (BSCHE)', NULL, 'undergraduate'),
(3, 'College Of Engineering And Technology (CET)', 'Undergraduate Programs', 'Bachelor of Science in Civil Engineering (BSCE)', NULL, 'undergraduate'),
(3, 'College Of Engineering And Technology (CET)', 'Undergraduate Programs', 'Bachelor of Science in Computer Engineering (BSCpE)', NULL, 'undergraduate'),
(3, 'College Of Engineering And Technology (CET)', 'Undergraduate Programs', 'Bachelor of Science in Computer Science (BSCS)', NULL, 'undergraduate'),
(3, 'College Of Engineering And Technology (CET)', 'Undergraduate Programs', 'Bachelor of Science in Electrical Engineering (BSEE)', NULL, 'undergraduate'),
(3, 'College Of Engineering And Technology (CET)', 'Undergraduate Programs', 'Bachelor of Science in Electronics Engineering (BSECE)', NULL, 'undergraduate'),
(3, 'College Of Engineering And Technology (CET)', 'Undergraduate Programs', 'Bachelor of Science in Information Technology (BSIT)', NULL, 'undergraduate'),
(3, 'College Of Engineering And Technology (CET)', 'Undergraduate Programs', 'Bachelor of Science in Manufacturing Engineering (BSMFGE)', NULL, 'undergraduate'),
(3, 'College Of Engineering And Technology (CET)', 'Undergraduate Programs', 'Bachelor of Science in Mechanical Engineering (BSME)', NULL, 'undergraduate');

-- College Of Humanities, Arts And Social Sciences (CHASS)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College Of Humanities, Arts And Social Sciences (CHASS)', 'Undergraduate Programs', 'Bachelor of Arts in Communication (BAC)', NULL, 'undergraduate'),
(3, 'College Of Humanities, Arts And Social Sciences (CHASS)', 'Undergraduate Programs', 'Bachelor of Arts in Communication - Major in Public Relations (BAC-PR)', NULL, 'undergraduate'),
(3, 'College Of Humanities, Arts And Social Sciences (CHASS)', 'Undergraduate Programs', 'Bachelor of Science in Social Work (BSSW)', NULL, 'undergraduate');

-- College Of Nursing (CN)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College Of Nursing (CN)', 'Undergraduate Programs', 'Bachelor of Science in Nursing (BSN)', NULL, 'undergraduate');

-- College Of Physical Therapy (CPT)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College Of Physical Therapy (CPT)', 'Undergraduate Programs', 'Bachelor of Science in Physical Therapy (BSPT)', NULL, 'undergraduate');

-- College Of Science (CS)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College Of Science (CS)', 'Undergraduate Programs', 'Bachelor of Science in Biology (BS Bio)', NULL, 'undergraduate'),
(3, 'College Of Science (CS)', 'Undergraduate Programs', 'Bachelor of Science in Chemistry (BS Chem)', NULL, 'undergraduate'),
(3, 'College Of Science (CS)', 'Undergraduate Programs', 'Bachelor of Science in Mathematics (BS Math)', NULL, 'undergraduate'),
(3, 'College Of Science (CS)', 'Undergraduate Programs', 'Bachelor of Science in Psychology (BSPSY)', NULL, 'undergraduate');

-- School of Government
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'School of Government', 'Undergraduate Programs', 'Bachelor of Science in Public Administration', NULL, 'undergraduate');

-- PROFESSIONAL SCHOOLS
-- College Of Law (CL)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College Of Law (CL)', 'Professional Schools', 'Juris Doctor (formerly Bachelor of Laws)', NULL, 'graduate');

-- College Of Medicine (CL)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College Of Medicine (CL)', 'Professional Schools', 'Doctor of Medicine', NULL, 'graduate');

-- GRADUATE PROGRAMS
-- College Of Humanities, Arts And Social Sciences (CHASS)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College Of Humanities, Arts And Social Sciences (CHASS)', 'Graduate Programs', 'Master of Arts in Education: Educational Administration', ARRAY['Educational Administration', 'Social Studies', 'Biological Sciences', 'Physical Sciences'], 'graduate'),
(3, 'College Of Humanities, Arts And Social Sciences (CHASS)', 'Graduate Programs', 'Master of Arts in Psychology', ARRAY['Industrial Psychology', 'Clinical Psychology'], 'graduate'),
(3, 'College Of Humanities, Arts And Social Sciences (CHASS)', 'Graduate Programs', 'Master of Arts in Communication Management', NULL, 'graduate'),
(3, 'College Of Humanities, Arts And Social Sciences (CHASS)', 'Graduate Programs', 'Master of Arts in School Principalship', NULL, 'graduate'),
(3, 'College Of Humanities, Arts And Social Sciences (CHASS)', 'Graduate Programs', 'Master in Family Science', NULL, 'graduate'),
(3, 'College Of Humanities, Arts And Social Sciences (CHASS)', 'Graduate Programs', 'Master of Arts in Special Education - Specializing in Development Delays', NULL, 'graduate'),
(3, 'College Of Humanities, Arts And Social Sciences (CHASS)', 'Graduate Programs', 'Doctor of Education in Educational Administration', NULL, 'graduate');

-- College Of Engineering And Technology (CET)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College Of Engineering And Technology (CET)', 'Graduate Programs', 'Master of Engineering', ARRAY['Structural Engineering', 'Computer Engineering', 'Construction Management'], 'graduate'),
(3, 'College Of Engineering And Technology (CET)', 'Graduate Programs', 'Master of Science in Information and Communications Technology', NULL, 'graduate'),
(3, 'College Of Engineering And Technology (CET)', 'Graduate Programs', 'Master of Science in Management Engineering', NULL, 'graduate');

-- College of Nursing (CN)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College of Nursing (CN)', 'Graduate Programs', 'Master of Arts in Nursing', NULL, 'graduate');

-- Graduate School of Law (GSL)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'Graduate School of Law (GSL)', 'Graduate Programs', 'Master of Laws', NULL, 'graduate');

-- College of Business and Government Management (CBGM)
INSERT INTO academic_programs (university_id, college_name, degree_level, program_name, specializations, program_type) VALUES
(3, 'College of Business and Government Management (CBGM)', 'Graduate Programs', 'Bachelor of Business Management-Master in Business Administration', NULL, 'graduate'),
(3, 'College of Business and Government Management (CBGM)', 'Graduate Programs', 'Master in Business Administration', NULL, 'graduate'),
(3, 'College of Business and Government Management (CBGM)', 'Graduate Programs', 'Master in Business Administration - Top Executive Program', NULL, 'graduate'),
(3, 'College of Business and Government Management (CBGM)', 'Graduate Programs', 'Doctor of Business Administration', NULL, 'graduate'),
(3, 'College of Business and Government Management (CBGM)', 'Graduate Programs', 'Bachelor in Government Management', NULL, 'graduate'),
(3, 'College of Business and Government Management (CBGM)', 'Graduate Programs', 'Master in Government Management', NULL, 'graduate'),
(3, 'College of Business and Government Management (CBGM)', 'Graduate Programs', 'Master in Government Management-Executive Special Program', NULL, 'graduate'),
(3, 'College of Business and Government Management (CBGM)', 'Graduate Programs', 'Doctor of Public Management', NULL, 'graduate'),
(3, 'College of Business and Government Management (CBGM)', 'Graduate Programs', 'Professionalization Program for Public Procurement Practitioners', NULL, 'graduate');

-- Update the programs count for PLM
UPDATE universities SET programs = (SELECT COUNT(*) FROM academic_programs WHERE university_id = 3) WHERE id = 3;
