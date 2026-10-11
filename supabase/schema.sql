-- ArticularUZ admin content schema. Run once in Supabase → SQL Editor.

create extension if not exists "pgcrypto";

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  sort_order int not null default 0
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  logo_light text not null,
  logo_dark text not null,
  sort_order int not null default 0
);

-- Row Level Security: everyone can read, only logged-in admin can write.
alter table public.news enable row level security;
alter table public.stats enable row level security;
alter table public.partners enable row level security;

do $$
declare t text;
begin
  foreach t in array array['news','stats','partners'] loop
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('drop policy if exists "admin write" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (true)', t);
    execute format('create policy "admin write" on public.%I for all to authenticated using (true) with check (true)', t);
  end loop;
end $$;

-- Storage bucket for images (public read, authenticated write).
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
drop policy if exists "media admin write" on storage.objects;
create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');
create policy "media admin write" on storage.objects
  for all to authenticated
  using (bucket_id = 'media') with check (bucket_id = 'media');

-- Seed current landing content.
insert into public.news (title, description, image_url, created_at)
select * from (values
  (
    'ArticularUZ 2026 Space Tournament Registration Open',
    'Registration for young aerospace and physics talents across Uzbekistan has officially commenced. Form your teams of 3 to 5 participants and submit your credentials via @articularuzbot.',
    './assets/workshop.jpg',
    '2026-10-01 10:00:00+00'::timestamptz
  ),
  (
    'Uzcosmos Agency Confirmed as Scientific Patron & Jury Mentors',
    'Uzbekistan Space Agency (Uzcosmos) joins ArticularUZ as official partner. Top finalists will defend their orbital mechanics solutions before leading agency engineers.',
    './assets/uzcosmos-banner.jpg',
    '2026-10-05 12:00:00+00'::timestamptz
  ),
  (
    'Orbital Math & 100% English Defense Workshops Announced',
    'Masterclasses and preparation sessions in trajectory modeling, scientific hypothesis defense, and academic English presentation will be conducted across all 14 regional chapters.',
    './assets/mentoring.jpg',
    '2026-10-08 15:30:00+00'::timestamptz
  )
) as v(title, description, image_url, created_at)
where not exists (select 1 from public.news);

insert into public.stats (value, label, sort_order)
select * from (values
  ('5', 'Active Regions', 0),
  ('2', 'Official Partners', 1),
  ('100%', 'English Defense', 2),
  ('500+', 'Youth Participants', 3)
) as v(value, label, sort_order)
where not exists (select 1 from public.stats);

insert into public.partners (name, url, logo_light, logo_dark, sort_order)
select * from (values
  ('Uzcosmos Agency', 'https://uzspace.uz', './assets/uzcosmos-dark.svg', './assets/uzcosmos-white.svg', 0),
  ('Youth Volunteering Club', 'https://t.me/yvc_uz', './assets/yvc-png.png', './assets/yvc-white.png', 1)
) as v(name, url, logo_light, logo_dark, sort_order)
where not exists (select 1 from public.partners);
