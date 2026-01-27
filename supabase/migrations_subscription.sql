-- Add subscription_level enum type
CREATE TYPE subscription_level AS ENUM ('none', 'peon', 'torre', 'rey');

-- Add subscription_level to profiles table
ALTER TABLE profiles 
ADD COLUMN subscription_level subscription_level DEFAULT 'none';

-- Create transactions table
CREATE TABLE transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'PYG',
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    plan_id TEXT NOT NULL,
    payment_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can see their own transactions
CREATE POLICY "Users can view own transactions" 
ON transactions FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Users can insert their own transactions (for now, mainly for manual reporting)
CREATE POLICY "Users can insert own transactions" 
ON transactions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- RLS for content access (Example based on requirement, adapt to actual table names)
-- ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Subscribers can view lessons" 
-- ON lessons FOR SELECT 
-- USING (
--   (is_free = true) OR 
--   (EXISTS (
--     SELECT 1 FROM profiles 
--     WHERE profiles.id = auth.uid() 
--     AND profiles.subscription_level IN ('peon', 'torre', 'rey')
--   ))
-- );
