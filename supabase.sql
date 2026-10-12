-- Run once in the Supabase SQL editor if you deploy on Vercel (or any host with a read-only disk).
create table if not exists public.sps_kv (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- The site talks to this table only from the server with the service-role key.
-- Turn on RLS with no policies so the public anon key can never read enquiries or TC records.
alter table public.sps_kv enable row level security;
