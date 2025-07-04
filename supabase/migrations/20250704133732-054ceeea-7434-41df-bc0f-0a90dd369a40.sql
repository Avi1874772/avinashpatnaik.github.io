-- Enable Row Level Security for contact attempt table
ALTER TABLE public."contact attempt" ENABLE ROW LEVEL SECURITY;

-- Allow anyone (including anonymous users) to insert contact messages
CREATE POLICY "Anyone can submit contact messages" 
ON public."contact attempt" 
FOR INSERT 
WITH CHECK (true);

-- Allow authenticated users to view all contact messages (optional - for admin purposes)
CREATE POLICY "Authenticated users can view contact messages" 
ON public."contact attempt" 
FOR SELECT 
TO authenticated
USING (true);