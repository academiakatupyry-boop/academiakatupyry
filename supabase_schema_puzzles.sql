-- Create table for chess puzzles
create table puzzles (
  id text primary key,
  fen text not null,
  moves text not null,
  rating integer,
  temas text[] -- Stores themes like 'mateIn1', 'anastasiaMate' as an array
);

-- Enable RLS (Optional depending on your policy, usually public read is fine for puzzles)
alter table puzzles enable row level security;

-- Allow anyone to read puzzles
create policy "Puzzles are public"
  on puzzles for select
  using (true);
