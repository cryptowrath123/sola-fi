-- Create a table for user profiles with wallet information
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  wallet_address TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id),
  UNIQUE(wallet_address)
);

-- Create a table for wallet transactions
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  wallet_address TEXT NOT NULL,
  transaction_signature TEXT NOT NULL,
  amount DECIMAL(20, 9) NOT NULL,
  transaction_type TEXT NOT NULL, -- 'send', 'receive', 'airdrop', etc.
  status TEXT NOT NULL, -- 'pending', 'confirmed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(transaction_signature)
);

-- Create RLS policies for user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Users can only read their own profile
CREATE POLICY "Users can view their own profile" 
  ON user_profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Only allow insert through service role or for authenticated users (their own profile)
CREATE POLICY "Users can insert their own profile" 
  ON user_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Only allow update through service role or for authenticated users (their own profile)
CREATE POLICY "Users can update their own profile" 
  ON user_profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create RLS policies for wallet_transactions
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Users can only read their own transactions
CREATE POLICY "Users can view their own transactions" 
  ON wallet_transactions 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Only allow insert through service role or for authenticated users (their own transactions)
CREATE POLICY "Users can insert their own transactions" 
  ON wallet_transactions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at timestamp on user_profiles
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();