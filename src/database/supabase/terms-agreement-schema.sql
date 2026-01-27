-- Terms Agreement Schema for UniCentral University Platform

-- 1. Create a table to track user agreements
CREATE TABLE user_terms_agreements (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  agreed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable RLS
ALTER TABLE user_terms_agreements ENABLE ROW LEVEL SECURITY;

-- 3. Create policies
CREATE POLICY "Users can view their own agreement."
  ON user_terms_agreements FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own agreement."
  ON user_terms_agreements FOR INSERT
  WITH CHECK (auth.uid() = id);
