-- Red poslova za agente (Provera leta, Revizor, Dokumenta).
-- Server (sajt, /api/sistem/prolaz) upisuje posao i ide dalje; Nikov Mac (scripts/sistem/radnik.mjs)
-- na 5 minuta preuzima poslove, pokreće agenta i vraća rezultat. Kad je Mac ugašen, posao čeka —
-- predmet se u tom prolazu preskače i nastavlja se kad rezultat stigne.
-- Posao ostao „radi“ duže od roka (Mac ugašen usred rada) server vraća na „ceka“.

create table if not exists public.crm_poslovi (
  id text primary key,                       -- <vrsta>--<ref>--<ključ>, isti posao je uvek isti id
  vrsta text not null check (vrsta in ('provera-leta', 'revizija', 'dokumenta')),
  ref text not null,                         -- ključ leta (JU557_2026-08-31) ili ref predmeta
  kljuc text not null,
  opis text,
  ulaz jsonb not null default '{}'::jsonb,
  stanje text not null default 'ceka' check (stanje in ('ceka', 'radi', 'gotovo', 'greska')),
  pokusaja integer not null default 0,
  radnik text,
  preuzeto timestamptz,
  rezultat jsonb,                            -- kratak odgovor agenta (šema iz agenti/<vrsta>.json)
  izlaz jsonb,                               -- fajl koji je agent upisao (dokumenta.json / revizija); letovi idu u crm_letovi
  trosak_usd numeric,
  poslednja_greska text,
  kreirano timestamptz not null default now(),
  azurirano timestamptz not null default now()
);

create index if not exists crm_poslovi_stanje_idx on public.crm_poslovi (stanje, kreirano);

drop trigger if exists crm_poslovi_azurirano on public.crm_poslovi;
create trigger crm_poslovi_azurirano before update on public.crm_poslovi
for each row execute function public.crm_set_azurirano();

alter table public.crm_poslovi enable row level security;
revoke all on public.crm_poslovi from anon, authenticated;
grant select, insert, update, delete on public.crm_poslovi to service_role;
