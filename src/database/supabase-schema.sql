-- Supabase Schema for UniCentral University Platform
-- Create the universities table with all required information

-- Create the universities table
CREATE TABLE universities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(100),
  province VARCHAR(100),
  established VARCHAR(10),
  type VARCHAR(50),
  rating DECIMAL(3,1),
  students VARCHAR(50),
  programs INTEGER,
  description TEXT,
  long_description TEXT,
  subjects TEXT[], -- Array of subjects (kept for backward compatibility)
  image_url TEXT,
  gallery_images TEXT[], -- Array of image URLs

  accreditation TEXT[], -- Array of accreditations
  campus_size VARCHAR(100),
  founded VARCHAR(10),
  website TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  facilities TEXT[], -- Array of facilities
  amenities TEXT[], -- Array of amenities (services, conveniences)
  achievements TEXT[], -- Array of achievements
  admission_requirements TEXT[], -- Array of requirements
  application_process TEXT[], -- Array of application process steps
  admission_status VARCHAR(20), -- 'open', 'not-yet-open', 'closed'
  admission_deadline DATE,
  scholarships TEXT[], -- Array of scholarships
  academic_semester_start DATE,
  academic_semester_end DATE,
  academic_application_deadline DATE,
  ranking_source VARCHAR(100), -- e.g., 'Edurank 2025', 'QS Asia 2026'
  ranking_details TEXT, -- Complete ranking information
  map_location_lat DECIMAL(10,7),
  map_location_lng DECIMAL(10,7),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the academic_programs table for hierarchical program structure
CREATE TABLE academic_programs (
  id SERIAL PRIMARY KEY,
  university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
  college_name VARCHAR(255) NOT NULL, -- e.g., "Graduate School", "College of Accountancy and Finance"
  degree_level VARCHAR(100), -- e.g., "Doctorate Degree Programs", "Bachelor's Degree Programs"
  program_name VARCHAR(255) NOT NULL, -- e.g., "Doctor of Philosophy in Communication"
  specializations TEXT[], -- Array of specializations like ["Data Analytics", "Structural Engineering"]
  program_type VARCHAR(50), -- 'undergraduate', 'graduate', 'diploma', 'certificate'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_universities_location ON universities(location);
CREATE INDEX idx_universities_province ON universities(province);
CREATE INDEX idx_universities_type ON universities(type);
CREATE INDEX idx_universities_rating ON universities(rating);
CREATE INDEX idx_universities_admission_status ON universities(admission_status);
CREATE INDEX idx_academic_programs_university_id ON academic_programs(university_id);
CREATE INDEX idx_academic_programs_college_name ON academic_programs(college_name);
CREATE INDEX idx_academic_programs_program_type ON academic_programs(program_type);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_universities_updated_at BEFORE UPDATE ON universities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

-- Create policies (allow read access for all users, but require authentication for write operations)
-- Public read policy
CREATE POLICY "Universities are viewable by everyone" ON universities
    FOR SELECT USING (true);

-- Insert policy (require authentication for creating new universities)
CREATE POLICY "Universities can be created by authenticated users" ON universities
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Update policy (require authentication for updating universities)
CREATE POLICY "Universities can be updated by authenticated users" ON universities
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Delete policy (require authentication for deleting universities)
CREATE POLICY "Universities can be deleted by authenticated users" ON universities
    FOR DELETE USING (auth.role() = 'authenticated');

-- Insert sample data (Only PUP and TUP as requested)
INSERT INTO universities (
  name, location, province, established, type, rating, students, programs,
  description, long_description, subjects, image_url, gallery_images,
  accreditation, campus_size, founded, website, phone, email, address,
  facilities, amenities, achievements, admission_requirements, application_process, admission_status, admission_deadline, scholarships,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_source, ranking_details, map_location_lat, map_location_lng
) VALUES
(
  'Polytechnic University of the Philippines',
  'Manila',
  'Metro Manila',
  '1904',
  'State',
  4.4,
  '65,000',
  94,
  'The premier state university known for affordable and quality higher education in the Philippines.',
  'Established in 1904, the Polytechnic University of the Philippines (PUP) has grown to become the largest state university in terms of enrollment in the Philippines. PUP offers various degree programs in technology, education, business, and other fields through its main campus in Sta. Mesa, Manila and its four satellite campuses.',
  ARRAY['Engineering', 'Computer Science', 'Business Administration', 'Education', 'Information Technology', 'Architecture', 'Psychology', 'Tourism Management'],
  '/Images/School Images/pup.jpg',
  ARRAY['https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/pup1.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/pup2.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/pup3.jpg', 'https://zdixoeqnifczswpxospm.supabase.co/storage/v1/object/public/Images/PUP%20images/pup4.jpg'],
  ARRAY['CHED', 'AACCUP', 'ISO 9001:2015', 'ABET', 'PACUCOA'],
  '15 hectares',
  '1904',
  'https://www.pup.edu.ph',
  '+63 2 5335-1787',
  'inquire@pup.edu.ph',
  'A. Mabini Campus, Anonas St., Sta. Mesa, Manila 1016, Metro Manila, Philippines',
  ARRAY['Ninoy Aquino Library and Learning Resources Center', 'Academic Classrooms and Lecture Rooms', 'Science Laboratories', 'Computer Laboratories', 'Engineering Laboratories', 'Multimedia and Audio-Visual Rooms', 'Research and Development Centers', 'Conference Rooms (e.g., Mateo, Olonan, Carague Rooms)', 'Co-working and Study Spaces', 'Graduate School Facilities', 'Laboratory High School Building', 'Office of the University President', 'Registrar''s Office', 'Admissions Office', 'Accounting and Finance Offices', 'Human Resources Office', 'Student Services Offices', 'Alumni Relations Office (Tahanan ng Alumni)', 'Faculty and Staff Offices', 'University Medical Clinic', 'Dental Clinic', 'Guidance and Counseling Office', 'Charlie del Rosario Student Development Center', 'Student Lounges and Social Rooms', 'Interfaith Chapel', 'Security and Safety Offices', 'PUP Gymnasium / Multi-Purpose Sports Complex', 'Indoor Sports Courts (basketball, volleyball, badminton)', 'Outdoor Basketball Courts', 'Tennis Courts', 'Football Field', 'Track and Oval', 'Grandstand', 'Olympic-Sized Swimming Pool'],
  ARRAY['University Canteens', 'Food Stalls and Kiosks', 'Coffee Shops', 'Bookstore', 'Printing and Photocopying Services', 'Souvenir and Merchandise Shops', 'Small Retail and Commercial Spaces', 'Walkways and Covered Paths', 'Seating and Rest Areas', 'Parking Areas', 'Restrooms', 'Internet-enabled Areas (Wi-Fi zones)', 'Campus Transportation Access Points'],
  ARRAY['First ISO 9001:2015 Certified State University in the Philippines', 'QS Asia University Rankings', 'Best University for Technology Education', 'Autonomous Status from CHED'],
  ARRAY['Passed PUP College Entrance Exam Test (PUPCET)', 'Confirmation Requirements', 'High School Graduate', 'High School Card (Form 138)', 'Form 137-A', 'Medical Clearance from PUP Medical Clinic', 'Certification of Good Moral Character duly signed by the high school principal/guidance counselor of the school last attended.', 'NSO authenticated copy of Birth Certificate/ Certificate of Live Birth'],
  ARRAY['Visit the Official Page: Go to the PUP iApply for PUPCET page and read all the provided information.', 'Start Application: Click Apply Now to be redirected to the PUP iApply portal.', 'Account Creation: Click Register Here to create your new account.', 'Select Examination: Read the service agreement, click the I have read... button, and select PUPCET on the following page to begin.', 'Prequalification: Answer the prequalification questions to confirm your eligibility, then click Next.', 'Fill Registration Form: Enter the required information carefully.', 'Ensure your name and birth date match your PSA birth certificate exactly.', 'Provide a valid, active email address (this will be used for all transactions).', 'If you previously applied but did not enroll, you must use a new email address for this application.', 'Create and remember a strong password using a mix of letters, numbers, and special characters.', 'Verify Information: Ensure all details are accurate; any misrepresentation or false information will automatically invalidate your admission.', 'Submit and Sign In: Click Submit to create the account, then sign in using your credentials.', 'Complete Application Form: On the Applicant''s page, select Application Form to provide your full details.', 'Type in the Digital Security Code.', 'Type your complete name as your Digital Signature.', 'Check the box confirming you have read and understood the terms.', 'Finalize Application: Click Finalize to lock your form and submit it for evaluation by the University Admission and Registration Services.', 'Upload Requirements (If Prompted): If your photo or document is disapproved, follow the link provided to upload a clear, correctly formatted replacement. Note that validation can take 6–20 working days.', 'Print ePermit: Once your application is finalized and approved (usually after 6–20 working days), click Print ePermit to download and print your permit in color. You must bring this on your examination date.', 'Check Results: When results are officially released, log back in to click the Check PUPCET Results link.', 'Sign Out: Always sign out of the portal after your session for security.'],
  'open',
  '2024-05-31',
  ARRAY['Tulong Dunong Program', 'Academic Scholarships', 'Athletic Scholarships', 'Cultural Grant', 'Student Assistantship Program', 'PWD Scholarships'],
  '2024-08-01',
  '2025-05-31',
  '2024-04-15',
  'Edurank 2025',
  'Edurank 2025: 4th among SUCs in the Philippines, 14th among all universities in the Philippines, 2nd among SUCs in Metro Manila. QS Asia University Rankings 2026: #2 SUC in the Philippines, #8 overall Philippine university.',
  14.5981270,
  121.0115000
),
(
  'Technological University of the Philippines',
  'Manila',
  'Metro Manila',
  '1901',
  'State',
  4.2,
  '38,000',
  78,
  'A leading engineering and technology university focused on innovation and industry-relevant education.',
  'Founded in 1901, the Technological University of the Philippines (TUP) is one of the oldest institutions of higher learning in the country. Located in Manila, TUP specializes in engineering, technology, and vocational programs that prepare students for careers in various industries. The university emphasizes practical learning and research in technology and innovation.',
  ARRAY['Engineering', 'Information Technology', 'Architecture', 'Industrial Education', 'Electronics Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'],
  '/Images/School Images/tup.jpg',
  ARRAY['/Images/School Images/tup.jpg', '/Images/School Images/tup.jpg', '/Images/School Images/tup.jpg'],
  ARRAY['CHED', 'AACCUP', 'ISO 9001:2015', 'ABET'],
  '8 hectares',
  '1901',
  'https://www.tup.edu.ph',
  '+63 2 337 5813',
  'info@tup.edu.ph',
  'Ayala Blvd., Ermita, Manila 1000',
  ARRAY['Engineering Laboratories', 'Computer Labs', 'Library', 'Sports Facilities', 'Research Centers', 'Innovation Hub', 'Auditorium', 'Cafeteria'],
  ARRAY['Campus WiFi', 'Student parking', 'Cafeteria and food services', 'Medical and dental clinic', 'ATM machines', 'Printing services', 'Computer laboratories', 'Study areas', 'Security services', 'Guidance office', 'Bookstore', 'Engineering workshops'],
  ARRAY['Center of Excellence in Engineering Education', 'ISO 9001:2015 Certified', 'Best Engineering University', 'Research Excellence Award'],
  ARRAY['University Entrance Examination', 'High School Diploma', 'GMC Certificate', 'Medical Certificate', 'Birth Certificate', '2x2 Picture'],
  'open',
  '2024-06-15',
  ARRAY['Academic Excellence Scholarship', 'Engineering Scholarships', 'Entrance Scholarships', 'Grant-in-Aid Program', 'Athletic Scholarships'],
  '2024-08-01',
  '2025-05-31',
  '2024-04-30',
  14.5833,
  120.9817
);

-- Create saved_universities table for user bookmarks (requires authentication)
CREATE TABLE saved_universities (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  university_id INTEGER REFERENCES universities(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, university_id)
);

-- Enable RLS for saved_universities
ALTER TABLE saved_universities ENABLE ROW LEVEL SECURITY;

-- Policy for saved universities (users can only see their own saved universities)
CREATE POLICY "Users can view their own saved universities" ON saved_universities
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved universities" ON saved_universities
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved universities" ON saved_universities
    FOR DELETE USING (auth.uid() = user_id);

-- Create user_preferences table (optional, for future features)
CREATE TABLE user_preferences (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_locations TEXT[],
  preferred_course_types TEXT[],
  tuition_budget_min INTEGER,
  tuition_budget_max INTEGER,
  ranking_preference VARCHAR(20), -- 'national', 'regional', 'international'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS for user_preferences
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own preferences" ON user_preferences
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences" ON user_preferences
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences" ON user_preferences
    FOR UPDATE USING (auth.uid() = user_id);

-- Enable RLS for academic_programs
ALTER TABLE academic_programs ENABLE ROW LEVEL SECURITY;

-- Academic programs policies (public read, authenticated write)
CREATE POLICY "Academic programs are viewable by everyone" ON academic_programs
    FOR SELECT USING (true);

CREATE POLICY "Academic programs can be created by authenticated users" ON academic_programs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Academic programs can be updated by authenticated users" ON academic_programs
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Academic programs can be deleted by authenticated users" ON academic_programs
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create trigger for academic_programs updated_at
CREATE TRIGGER update_academic_programs_updated_at BEFORE UPDATE ON academic_programs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
