-- Run this in Supabase SQL Editor for the initial database structure.
create extension if not exists vector;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  subject text,
  storage_path text,
  processing_status text not null default 'pending' check (processing_status in ('pending','processing','ready','failed')),
  created_at timestamptz not null default now()
);

create table if not exists public.document_chunks (
  id bigint generated always as identity primary key,
  document_id uuid not null references public.documents(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  chunk_text text not null,
  page_number integer,
  section_title text,
  embedding vector(1536),
  created_at timestamptz not null default now()
);

create index if not exists document_chunks_embedding_idx on public.document_chunks using hnsw (embedding vector_cosine_ops);

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  document_id uuid references public.documents(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.topics(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  question_text text not null,
  options jsonb not null,
  correct_answer_index integer not null,
  explanation text,
  source_chunk_id bigint references public.document_chunks(id) on delete set null,
  difficulty text not null default 'medium' check (difficulty in ('easy','medium','hard')),
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  question_id uuid not null references public.quiz_questions(id) on delete cascade,
  selected_answer_index integer,
  is_correct boolean not null,
  answer_feedback text,
  attempted_at timestamptz not null default now()
);

create table if not exists public.revision_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete set null,
  title text not null,
  description text,
  priority integer not null default 3 check (priority between 1 and 5),
  planned_minutes integer not null default 20,
  due_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

-- Enable RLS before using real student data. Add and test per-table policies
-- for authenticated users before deployment. Do not expose service-role keys.
