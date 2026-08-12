# Meta Ads tracking setup

Ovaj projekat ima pripremljen Meta Pixel + Conversions API funnel za oba jezika.
Kod je bezopasan dok Pixel ID i server token nisu podešeni: bez tih env vrednosti
ne učitava se Meta skripta i server ne šalje događaje.

## Šta se meri

- `PageView` na prvom učitavanju i pri Next.js navigaciji bez reload-a
- `InitiateCheckout` kada korisnik započne proveru leta
- `Lead` tek kada server uspešno primi novi zahtev

Server-side `Lead` šalje, kada postoje i kada je marketing consent odobren:
hashovani email, ime i prezime, country signal, hashovani `external_id` iz ID-ja
predmeta, `fbp`, `fbc`, IP adresu i user-agent. `fbc` se čita iz `_fbc` cookie-ja,
uz bezbedan fallback iz `fbclid` parametra na istom domenu. Telefon ostaje
opcion i nije deo ove implementacione izmene.

Consent je upisan u `lk_consent` cookie na 12 meseci (`SameSite=Lax`, `Secure`,
bez `HttpOnly` atributa kako bi podešavanja privatnosti mogla da ga promene).
Server ga čita direktno za CAPI odluku. `localStorage` ostaje kao kompatibilni
lokalni zapis i ogledalo, ali nikada nije autoritet za odluku o slanju. Blocking
head bootstrap pre prvog bojenja proverava validan cookie, a postojeće korisnike
bez cookie-ja jednokratno migrira iz localStorage-a.

`Lead` se šalje dvaput, iz browsera i servera, ali sa istim `event_id`. To je
namerno, jer Pixel pokriva browser signal, a Conversions API pokriva gubitak signala
i server potvrdu. Meta ih treba spojiti u jedan događaj.

## Jednokratno podešavanje u Meta

1. U Meta Business Settings napravi ili izaberi Business portfolio i Ad Account.
2. U Events Manager napravi Web Dataset/Pixel za domen koji će stvarno primati oglase.
3. Kopiraj Pixel ID.
4. U Events Manager otvori Settings, Conversions API, Generate access token. Token je tajna i ne sme u GitHub, browser ili `NEXT_PUBLIC_*` promenljivu.
5. U domen verification i Aggregated Event Measurement proveri domen i prioritizuj `Lead` event.
6. Ako je oglasni domen `leadcast.rs`, Pixel ID mora biti povezan sa tim domenom i produkcija mora stvarno biti dostupna na tom hostu. Trenutni canonical production checkout je podešen za `letkasni.rs`, zato se domen ne menja automatski.

## Vercel env promenljive

U Vercel projektu `let-kasni`, za Production environment podesi:

```text
NEXT_PUBLIC_META_PIXEL_ID=<Pixel ID>
META_CONVERSIONS_API_ACCESS_TOKEN=<Conversions API token>
META_GRAPH_API_VERSION=v23.0
```

Privremeno, samo za Test Events:

```text
META_TEST_EVENT_CODE=<code iz Meta Events Manager>
```

Posle testa ukloni `META_TEST_EVENT_CODE` iz Production environment-a.

## Test bez stvarnog lead-a

1. Deploy preview sa Pixel ID-em i tokenom, ili ih postavi u lokalni `.env.local`.
2. U Events Manager otvori Test Events i kopiraj test code u `META_TEST_EVENT_CODE`.
3. Otvori `/` i `/en`, klikni CTA i prođi do forme.
4. Pošalji samo testni podatak koji nije stvarni korisnik. Server i dalje može napraviti lokalni claim zapis, zato koristi disposable/test email i lokalnu bazu ili preview Supabase projekat.
5. U Test Events proveri `PageView`, `InitiateCheckout` i `Lead`.
6. Kod `Lead` proveri da je browser/server kombinacija deduplikovana, a ne prikazana kao dva lead-a.
7. Proveri Vercel logs: greška Meta API-ja ne sme oboriti prijem claim-a.

## Pre produkcijskog puštanja

- Ukloni test event code.
- Proveri da je Pixel povezan sa pravim Business portfolio-om i Ad Account-om.
- Proveri da Meta Event Match Quality prima `fbp`, `fbc`, user-agent, IP i hashovane email/phone signale kada postoje.
- Ažuriraj Privacy policy i cookie/consent ponašanje prema konačnom pravnom osnovu, teritoriji korisnika i Meta uslovima. Ovo je human/legal review, nije zaključeno samim kodom.
- Ne koristi `generate_lead` kao Meta custom event za optimizaciju. Za kampanje koristi standardni Meta `Lead`.

## Automatizacija

`Lead` se emituje iz jedne server rute nakon uspešnog upisa, browser i server dobijaju isti ID, a token se čita iz env-a. Sledeći korak može biti automatski nightly health check koji proverava da je Pixel prisutan na oba locale URL-a i da `/claim/submit` ne vraća Meta API greške.
