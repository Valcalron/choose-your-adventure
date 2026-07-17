create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.player_characters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  origin text not null check (origin in ('human', 'cybertronian')),
  sex text not null check (sex in ('male', 'female', 'mech', 'femme')),
  pronouns jsonb not null,
  starting_era text not null check (starting_era in ('earth_1984', 'early_war')),
  background_or_function text not null,
  human_appearance jsonb,
  cybertronian_appearance jsonb,
  alt_mode jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.story_scenes (
  id text primary key,
  origin text not null check (origin in ('human', 'cybertronian', 'shared')),
  chapter integer not null default 1,
  title text not null,
  speaker text,
  body text not null,
  background_url text,
  portrait_url text,
  is_ending boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.story_choices (
  id text primary key,
  scene_id text not null references public.story_scenes(id) on delete cascade,
  label text not null,
  next_scene_id text references public.story_scenes(id),
  requirements jsonb not null default '[]'::jsonb,
  effects jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0
);

create table if not exists public.player_saves (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  character_id uuid references public.player_characters(id) on delete cascade,
  slot_number integer not null check (slot_number between 1 and 10),
  current_scene_id text not null,
  state jsonb not null,
  saved_at timestamptz not null default now(),
  unique (user_id, slot_number)
);

create table if not exists public.unlocked_endings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  ending_key text not null,
  unlocked_at timestamptz not null default now(),
  unique (user_id, ending_key)
);

alter table public.profiles enable row level security;
alter table public.player_characters enable row level security;
alter table public.player_saves enable row level security;
alter table public.unlocked_endings enable row level security;

create policy "Profiles are viewable by their owner"
on public.profiles for select
using (auth.uid() = id);

create policy "Profiles are editable by their owner"
on public.profiles for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Characters belong to their owner"
on public.player_characters for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Saves belong to their owner"
on public.player_saves for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Endings belong to their owner"
on public.unlocked_endings for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

grant select on public.story_scenes to anon, authenticated;
grant select on public.story_choices to anon, authenticated;
