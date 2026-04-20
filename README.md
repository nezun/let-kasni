# letkasni.rs — Phase 1 Next.js Foundation

Ovaj app prati zaključani pravac iz `PLAN.autoplan.md`:

- Next.js App Router foundation
- native claim intake
- conservative triage
- Supabase-ready claim persistence
- minimal admin auth + internal queue

## Trenutni status

- `/` — public claims landing + native intake
- `/claim/submit` — route handler za intake
- `/admin/login` — minimal admin login
- `/admin/claims` — protected internal queue
- `/admin/claims/[id]` — detail view + operator workflow
- `/blog` — editorial shell za kasniji content/SEO sloj
- `/privacy` i `/terms` — minimalni legal/trust layer
- `robots.txt` i `sitemap.xml` — SEO foundation
- `opengraph-image` / `twitter-image` / `manifest.webmanifest` — share + install metadata

## Setup

1. Kopiraj `.env.example` u `.env.local`
2. Za lokalni admin fallback podesi:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
3. Za Supabase mode podesi:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Za live AeroDataBox lookup podesi:
   - `FLIGHT_PROVIDER_MODE=rapidapi`
   - `AERODATABOX_API_KEY`
   - opciono `AERODATABOX_API_HOST`

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Deployment

- Preporučeni platform choice za ovaj app: `Vercel`
- Minimalni health endpoint za deploy proveru: `/api/health`
- Basic production security headers su uključeni:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`
- App može biti pušten live i bez live flight provider integracije:
  - public intake radi
  - admin queue radi
  - claimovi bez provider-a idu na konzervativni manual review flow

### Production env minimum

- `NEXT_PUBLIC_SITE_URL=https://letkasni.rs`
- `NEXT_PUBLIC_SUPPORT_EMAIL=podrska@letkasni.rs`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_SESSION_SECRET`

### Production env optional

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` kada bude spreman GA4
- flight provider env kada budemo uvodili live lookup

## Persistence modes

- Bez Supabase env-a: claims idu u lokalni `.data/claims.json`
- Sa Supabase env-om: claims idu u `public.claims`

## Phase 1 guardrails

- Honeypot polje blokira najosnovniji bot spam bez dodatnog servisa
- Basic rate limit štiti submit endpoint od kratkih burst pokušaja
- Provider odgovor razlikuje `live_match`, `no_match`, `timeout` i `unconfigured`
- Queue sada ima osnovne filtere po statusu, provider ishodu i verdict-u
- `normalized_input_snapshot` sada stvarno koristi provider normalizaciju kada postoji

## Optional production wiring

- Analytics je spreman za env-based uključivanje:
  - `ANALYTICS_MODE=plausible` + `PLAUSIBLE_DOMAIN`
  - ili `ANALYTICS_MODE=ga4` + `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Kontakt email ide kroz `NEXT_PUBLIC_SUPPORT_EMAIL`

## Auth policy

- Preporučeno: `Supabase Auth` za produkciju
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` local fallback ostaje koristan za development i emergency pristup
- Nakon Supabase URL konfiguracije, admin login ekran sada eksplicitno upućuje na recovery/link troubleshooting smer

## Database

SQL migration za `claims` tabelu je u:

- `supabase/migrations/202604181905_phase1_claims.sql`
