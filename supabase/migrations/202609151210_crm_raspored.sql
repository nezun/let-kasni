-- Raspored serverskog prolaza: Supabase (pg_cron + pg_net) na sat vremena zove sajt.
-- Adresa i ključ poziva su u crm_sistem[raspored_poziv] ({ "url", "kljuc", "bypass" }), ne u ovom fajlu:
-- upisuje ih scripts/sistem/alati/raspored-poziv.mjs (service role). Tabela nije izložena (RLS, bez politika).

create extension if not exists pg_cron;
create extension if not exists pg_net;

create or replace function public.crm_pokreni_prolaz()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  p jsonb := (select vrednost from public.crm_sistem where kljuc = 'raspored_poziv');
begin
  if p is null or coalesce(p->>'url', '') = '' or coalesce(p->>'kljuc', '') = '' then
    raise exception 'crm_sistem[raspored_poziv] nije podešen';
  end if;
  return net.http_post(
    url := p->>'url',
    headers := jsonb_build_object('authorization', 'Bearer ' || (p->>'kljuc'), 'content-type', 'application/json')
      || case when coalesce(p->>'bypass', '') <> '' then jsonb_build_object('x-vercel-protection-bypass', p->>'bypass') else '{}'::jsonb end,
    body := '{"izvor":"pg_cron"}'::jsonb,
    timeout_milliseconds := 300000
  );
end;
$$;

revoke all on function public.crm_pokreni_prolaz() from public, anon, authenticated;

select cron.unschedule(jobid) from cron.job where jobname = 'letkasni-prolaz';
select cron.schedule('letkasni-prolaz', '7 * * * *', 'select public.crm_pokreni_prolaz()');
