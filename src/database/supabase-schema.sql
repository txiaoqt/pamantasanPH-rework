-- Supabase Schema for PamantasanPH University Platform
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
  subjects TEXT[], -- Array of subjects
  image_url TEXT,
  gallery_images TEXT[], -- Array of image URLs
  tuition_range VARCHAR(100),
  accreditation TEXT[], -- Array of accreditations
  admission_rate VARCHAR(10),
  graduation_rate VARCHAR(10),
  employment_rate VARCHAR(10),
  campus_size VARCHAR(100),
  founded VARCHAR(10),
  website TEXT,
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  facilities TEXT[], -- Array of facilities
  achievements TEXT[], -- Array of achievements
  admission_requirements TEXT[], -- Array of requirements
  admission_status VARCHAR(20), -- 'open', 'not-yet-open', 'closed'
  admission_deadline DATE,
  scholarships TEXT[], -- Array of scholarships
  student_life_clubs INTEGER,
  student_life_sports INTEGER,
  student_life_dormitories BOOLEAN,
  student_life_library BOOLEAN,
  academic_semester_start DATE,
  academic_semester_end DATE,
  academic_application_deadline DATE,
  ranking_national INTEGER,
  ranking_regional INTEGER,
  ranking_category VARCHAR(100),
  map_location_lat DECIMAL(10,7),
  map_location_lng DECIMAL(10,7),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_universities_location ON universities(location);
CREATE INDEX idx_universities_province ON universities(province);
CREATE INDEX idx_universities_type ON universities(type);
CREATE INDEX idx_universities_rating ON universities(rating);
CREATE INDEX idx_universities_admission_status ON universities(admission_status);

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
  tuition_range, accreditation, admission_rate, graduation_rate, employment_rate,
  campus_size, founded, website, phone, email, address, facilities, achievements,
  admission_requirements, admission_status, admission_deadline, scholarships,
  student_life_clubs, student_life_sports, student_life_dormitories, student_life_library,
  academic_semester_start, academic_semester_end, academic_application_deadline,
  ranking_national, ranking_regional, ranking_category, map_location_lat, map_location_lng
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
  ARRAY['/Images/School Images/pup.jpg', '/Images/School Images/pup.jpg', '/Images/School Images/pup.jpg', '/Images/School Images/pup.jpg'],
  '₱8,000 - ₱12,000',
  ARRAY['CHED', 'AACCUP', 'ISO 9001:2015', 'ABET', 'PACUCOA'],
  '20%',
  '87%',
  '89%',
  '15 hectares',
  '1904',
  'https://www.pup.edu.ph',
  '+63 2 8713 2835',
  'ouc@pup.edu.ph',
  'A. Mabini Campus, Anonas St., Sta. Mesa, Manila 1016',
  ARRAY['Modern Computer Laboratories', 'Digital Library', 'Sports Complex', 'Student Dormitories', 'Research Centers', 'Auditoriums', 'Food Court', 'Medical Clinic'],
  ARRAY['First ISO 9001:2015 Certified State University in the Philippines', 'QS Asia University Rankings', 'Best University for Technology Education', 'Autonomous Status from CHED'],
  ARRAY['PUP College Entrance Test (PUP-CET)', 'High School Report Card', 'Good Moral Character Certificate', 'Medical Certificate', 'Birth Certificate (PSA)', 'Barangay Clearance'],
  'open',
  '2024-05-31',
  ARRAY['Tulong Dunong Program', 'Academic Scholarships', 'Athletic Scholarships', 'Cultural Grant', 'Student Assistantship Program', 'PWD Scholarships'],
  95,
  22,
  true,
  true,
  '2024-08-01',
  '2025-05-31',
  '2024-04-15',
  4,
  12,
  'State University',
  14.6019,
  121.0118
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
  '₱10,000 - ₱18,000',
  ARRAY['CHED', 'AACCUP', 'ISO 9001:2015', 'ABET'],
  '18%',
  '82%',
  '85%',
  '8 hectares',
  '1901',
  'https://www.tup.edu.ph',
  '+63 2 337 5813',
  'info@tup.edu.ph',
  'Ayala Blvd., Ermita, Manila 1000',
  ARRAY['Engineering Laboratories', 'Computer Labs', 'Library', 'Sports Facilities', 'Research Centers', 'Innovation Hub', 'Auditorium', 'Cafeteria'],
  ARRAY['Center of Excellence in Engineering Education', 'ISO 9001:2015 Certified', 'Best Engineering University', 'Research Excellence Award'],
  ARRAY['University Entrance Examination', 'High School Diploma', 'GMC Certificate', 'Medical Certificate', 'Birth Certificate', '2x2 Picture'],
  'open',
  '2024-06-15',
  ARRAY['Academic Excellence Scholarship', 'Engineering Scholarships', 'Entrance Scholarships', 'Grant-in-Aid Program', 'Athletic Scholarships'],
  68,
  15,
  false,
  true,
  '2024-08-01',
  '2025-05-31',
  '2024-04-30',
  8,
  15,
  'Technological University',
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
