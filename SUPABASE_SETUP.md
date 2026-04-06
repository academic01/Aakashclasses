# Final Supabase SQL Setup

Run these commands in your **Supabase SQL Editor** to ensure all tables, relationships, and permissions are correctly configured for the Aakash Management Portal.

### 1. Clean Slate (Optional)
If you want to start fresh and remove old tables:
```sql
drop table if exists public.doubts;
drop table if exists public.remarks;
drop table if exists public.marks;
drop table if exists public.attendance;
drop table if exists public.students;
drop table if exists public.profiles;
```

### 2. Core Tables Setup

```sql
-- 1. Profiles (Main identity table for all users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text,
  mobile text,
  role text check (role in ('admin', 'teacher', 'student')),
  subject text,      -- Assigned to Teachers
  batch_type text,   -- MWF, TTS, or Full Week (Assigned to Teachers)
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Students (Sub-account details for students)
create table public.students (
  id uuid references public.profiles(id) on delete cascade primary key,
  teacher_id uuid references public.profiles(id),
  roll_number text unique,
  class_id text,
  batch text,        -- MWF, TTS, or Full Week
  mobile text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Attendance Logs
create table public.attendance (
  id uuid primary key default uuid_generate_v4(),
  teacher_id uuid references public.profiles(id),
  date date not null,
  batch text,
  records jsonb not null, -- [{ studentId: 'uuid', status: 'present' }]
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (date, batch, teacher_id)
);

-- 4. Marks Logs
create table public.marks (
  id uuid primary key default uuid_generate_v4(),
  teacher_id uuid references public.profiles(id),
  date date not null,
  batch text,
  subject text,
  records jsonb not null, -- [{ studentId: 'uuid', mark: 85 }]
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Remarks/Reports
create table public.remarks (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references public.profiles(id),
  teacher_id uuid references public.profiles(id),
  title text,
  content text,
  type text check (type in ('performance', 'behavior')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Doubts System
create table public.doubts (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid references public.profiles(id),
  title text,
  content text,
  status text default 'pending' check (status in ('pending', 'resolved')),
  answer text,
  resolved_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### 3. Permissions & Admin Access

Run this to disable RLS restrictions (simplifies testing) and assign yourself as **Admin**:

```sql
-- Disable RLS for all tables to allow the app to work freely
alter table public.profiles disable row level security;
alter table public.students disable row level security;
alter table public.attendance disable row level security;
alter table public.marks disable row level security;
alter table public.remarks disable row level security;
alter table public.doubts disable row level security;

-- Set your Admin Email
update public.profiles 
set role = 'admin' 
where email = 'aakashacademics01@gmail.com';
```

### 4. Important Relationship Note
If the teacher dashboard fails to load doubts, ensure the foreign key relationship for doubts is explicit:
```sql
alter table public.doubts 
drop constraint if exists doubts_student_id_fkey,
add constraint doubts_student_id_fkey 
foreign key (student_id) references public.profiles(id);
```
