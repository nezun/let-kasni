-- Naš elektronski potpis (bez signNow-a): zapisi o potpisivanju ugovora o ustupanju.
-- Svaki događaj (ugovor pripremljen, potpisan) je jedan red sa otiskom (SHA-256) dokumenta pre i posle potpisa,
-- IP adresom, uređajem i vremenom. Zapisi se samo DODAJU: izmena ili brisanje baca grešku (okidač ispod),
-- pa je baza nezavisan trag i kad bi neko hteo naknadno da menja PDF na Drive-u.

create table if not exists public.crm_potpisi (
  id bigint generated always as identity primary key,
  ref text not null,
  putnik text not null,
  zahtev_id text not null,
  dogadjaj text not null check (dogadjaj in ('pripremljeno', 'potpisano')),
  vreme timestamptz not null default now(),
  sha256_dokumenta text,
  sha256_podataka text,
  sha256_potpisanog text,
  ip text,
  user_agent text,
  detalji jsonb not null default '{}'::jsonb
);

create index if not exists crm_potpisi_ref_idx on public.crm_potpisi (ref, vreme);

create or replace function public.crm_potpisi_samo_dodavanje()
returns trigger
language plpgsql
as $$
begin
  raise exception 'crm_potpisi: zapis o potpisu se ne menja';
end;
$$;

create trigger crm_potpisi_nepromenljivo before update or delete on public.crm_potpisi
for each row execute function public.crm_potpisi_samo_dodavanje();

alter table public.crm_potpisi enable row level security;
grant select, insert on public.crm_potpisi to service_role;
grant usage, select on all sequences in schema public to service_role;
