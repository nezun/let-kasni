create extension if not exists pgcrypto;

create table if not exists public.claims (
  id uuid primary key default gen_random_uuid(),
  idempotency_key text not null unique,
  flight_number text not null,
  flight_date date not null,
  route text not null,
  issue_type text not null,
  email text not null,
  phone text,
  verdict text not null,
  verdict_title text not null,
  verdict_body text not null,
  operator_status text not null default 'new',
  operator_notes text,
  next_action text,
  original_input_snapshot jsonb not null,
  normalized_input_snapshot jsonb not null,
  provider_snapshot jsonb not null,
  verdict_snapshot jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_claims_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists claims_set_updated_at on public.claims;
create trigger claims_set_updated_at
before update on public.claims
for each row
execute function public.set_claims_updated_at();

alter table public.claims add column if not exists operator_notes text;
alter table public.claims add column if not exists next_action text;

create index if not exists claims_created_at_idx on public.claims (created_at desc);
create index if not exists claims_operator_status_idx on public.claims (operator_status);
create index if not exists claims_email_idx on public.claims (email);

alter table public.claims enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'claims'
      and policyname = 'service_role_full_access'
  ) then
    create policy service_role_full_access
    on public.claims
    for all
    using (auth.role() = 'service_role')
    with check (auth.role() = 'service_role');
  end if;
end $$;
