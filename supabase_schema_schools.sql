-- Create a table for school inquiries (leads)
create table school_inquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  school_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  role text,
  message text,
  status text default 'new' -- 'new', 'contacted', 'closed'
);

-- Enable RLS
alter table school_inquiries enable row level security;

-- Policy: Allow anyone (even anonymous) to insert
create policy "Anyone can insert school inquiries" on school_inquiries
  for insert with check (true);

-- Policy: Only authenticated SERVICE_ROLE (admins) can view
-- Note: 'service_role' key bypasses RLS, but we can prevent anon select.
create policy "Only admins can view inquiries" on school_inquiries
  for select using (false); -- Implicitly 'false' for anon/authenticated users (need admin console)

-- Enable Realtime for admins
alter publication supabase_realtime add table school_inquiries;
