-- Create table for tracking user progress
create table if not exists user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  lesson_id text not null, -- 'coordinates', 'pieces', or specific lesson id from lessons.ts
  status text not null check (status in ('completed', 'unlocked')),
  score int default 0,
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Ensure one record per user per lesson
  unique(user_id, lesson_id)
);

-- Enable RLS
alter table user_progress enable row level security;

-- Policies
-- 1. Users can view their own progress
create policy "Users can view their own progress"
  on user_progress for select
  using (auth.uid() = user_id);

-- 2. Users can insert/update their own progress (system will handle logic, but RLS must allow it)
create policy "Users can insert their own progress"
  on user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on user_progress for update
  using (auth.uid() = user_id);
