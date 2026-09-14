-- LetKasni CRM: predmeti, istorija, podaci o letovima i stanje sistema.
-- Piše ih LetKasni pipeline (orkestrator) i forma sa sajta; čita pregled /pregled/<ključ>.
-- Pristup ISKLJUČIVO serverski, preko service role ključa: RLS je uključen, a politika nema,
-- pa anon i authenticated ne vide ništa.
-- Broj pasoša, JMBG i broj lične karte se NE upisuju (ugovor traži ime, datum rođenja i adresu).

create table if not exists public.crm_predmeti (
  ref text primary key,
  claim_id uuid,
  status text not null,
  tip text,
  nalaz text,
  let_broj text,
  let_datum date,
  let_od text,
  let_do text,
  prevozilac text,
  kasnjenje_min integer,
  udaljenost_km integer,
  iznos_eur integer,
  iznos_odobren boolean not null default false,
  email text,
  telefon text,
  poslednji_kontakt date,
  poslednji_kontakt_ko text,
  podsetnik date,
  prosledjeno_advokatu date,
  -- ceo zapis predmeta (putnici, dokumenta, potpisivanje, gmail…) bez ličnih brojeva
  podaci jsonb not null,
  -- red za pregled (šema PredmetV1), računa pipeline; null dok ga pipeline prvi put ne obradi
  pregled jsonb,
  verzija integer not null default 1,
  izvor_izmene text not null default 'pipeline',
  kreirano timestamptz not null default now(),
  azurirano timestamptz not null default now(),
  constraint crm_predmeti_status_check check (status in (
    'NEW','VERIFIED','REVIEWED','DRAFTED','SENT','AWAITING_DOCS','CLIENT_REPLIED','DOCS_RECEIVED',
    'POA_GENERATED','POA_DRAFTED','POA_SENT','POA_SIGNED','LAWYER','CLOSED','NOT_ELIGIBLE','HUMAN_REVIEW','LOST'
  )),
  constraint crm_predmeti_bez_licnih_brojeva check (
    not (podaci::text ~ '"(pasos|jmbg|licna_karta)"\s*:')
  )
);

create index if not exists crm_predmeti_status_idx on public.crm_predmeti (status);
create index if not exists crm_predmeti_claim_idx on public.crm_predmeti (claim_id);

create table if not exists public.crm_dogadjaji (
  id bigint generated always as identity primary key,
  ref text not null references public.crm_predmeti (ref) on delete cascade,
  vreme timestamptz not null default now(),
  poruka text not null
);

create index if not exists crm_dogadjaji_ref_idx on public.crm_dogadjaji (ref, vreme);

create table if not exists public.crm_letovi (
  kljuc text primary key,
  podaci jsonb not null,
  azurirano timestamptz not null default now()
);

-- zadaci za ljude, stanje poslednjeg prolaza i sl. (ključ → JSON)
create table if not exists public.crm_sistem (
  kljuc text primary key,
  vrednost jsonb not null,
  azurirano timestamptz not null default now()
);

create or replace function public.crm_set_azurirano()
returns trigger
language plpgsql
as $$
begin
  new.azurirano = now();
  return new;
end;
$$;

drop trigger if exists crm_predmeti_azurirano on public.crm_predmeti;
create trigger crm_predmeti_azurirano before update on public.crm_predmeti
for each row execute function public.crm_set_azurirano();

drop trigger if exists crm_letovi_azurirano on public.crm_letovi;
create trigger crm_letovi_azurirano before update on public.crm_letovi
for each row execute function public.crm_set_azurirano();

drop trigger if exists crm_sistem_azurirano on public.crm_sistem;
create trigger crm_sistem_azurirano before update on public.crm_sistem
for each row execute function public.crm_set_azurirano();

alter table public.crm_predmeti enable row level security;
alter table public.crm_dogadjaji enable row level security;
alter table public.crm_letovi enable row level security;
alter table public.crm_sistem enable row level security;

revoke all on public.crm_predmeti, public.crm_dogadjaji, public.crm_letovi, public.crm_sistem from anon, authenticated;
