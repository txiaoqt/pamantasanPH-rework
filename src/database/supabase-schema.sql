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
  quickfacts TEXT[], -- Array of quick facts
  admission_requirements TEXT[], -- Array of requirements
  application_process TEXT[], -- Array of application process steps
  admission_status VARCHAR(20), -- 'open', 'not-yet-open', 'closed'
  admission_deadline DATE,
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

CREATE POLICY "Academic programs can be created by authenticated users" ON academic_programs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Academic programs can be updated by authenticated users" ON academic_programs
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Academic programs can be deleted by authenticated users" ON academic_programs
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create trigger for academic_programs updated_at
CREATE TRIGGER update_academic_programs_updated_at BEFORE UPDATE ON academic_programs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
