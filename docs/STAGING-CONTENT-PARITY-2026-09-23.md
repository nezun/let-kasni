# Usklađivanje marketing sadržaja sa produkcijom

23.09.2026. — prvi korak pripreme za produkciju, po zahtevu vlasnika.

## Izvor i obim

- Produkcioni izvor: `nezun/let-kasni`, `main`, `5ea961725077c326a5a85b52fb7261ce22886a26`.
- Polazni staging: `e5caac8f05d640f34dabe6f905cd99d2d3e2918f`.
- Radna grana: `codex/staging-content-parity`; cilj objave: grana `staging`, projekat `let-kasni-staging`.
- Preneti su produkcioni sadržaj i pravila uklanjanja članaka, lista glavnih vodiča i njihovih linkova, footer, PP 1.3 na srpskom i engleskom, 404 strana i slike mejl potpisa.
- Uklonjeno je 62 članka u oba jezika: 124 kanonske adrese i 248 starih blog adresa. Te adrese treba da vraćaju 404 kao na produkciji. Sačuvano je 68 aktivnih članaka, osam glavnih vodiča i šest grupa prethodnih preusmerenja. Sitemap ima 158 adresa.
- Prenet je javni tekst PP 1.3. Postojeća zajednička verzija izbora kolačića (marketing + aplikacija prijave) ostaje nepromenjena dok se ne prenese ceo paket merenja. Ova izmena ne uključuje nove tagove, ID-eve, kampanje ili servise praćenja.

## Sačuvano ponašanje staginga

Forma i portal ostaju u zasebnoj aplikaciji preko `PRIJAVA_URL`. Marketing ne vraća stari lokalni prijem prijava, admin ili CRM. Ostaju pristupna kapija, `noindex`, CSP Report-Only i postojeće verzije zavisnosti. Produkcioni kod, domeni, baze, poslovi, draftovi i poruke nisu menjani.

Ovo je prenos određenog sadržaja, ne Git spajanje kojim bi se sve produkcione funkcionalnosti proglasile prenetim. Google Ads/GA4/Meta integracija produkcije sa izdvojenom aplikacijom prijave ostaje poseban korak. Tada treba istovremeno prebaciti verziju pristanka i proveriti praćenje kroz obe aplikacije. Proba u pregledaču otkrila je da promena verzije samo u marketingu ponovo prikazuje baner pri ulasku u formu, pa je ta promena vraćena pre završetka ovog koraka.

## Provere pre objave

- `npm ci`: zaključane zavisnosti instalirane, audit bez prijavljenih ranjivosti.
- `NEXT_PUBLIC_SITE_URL=https://staging.letkasni.rs PRIJAVA_URL=https://prijava-staging.letkasni.rs npm run verify`: PASS, uključujući standardni Next 16.3.5 Turbopack build i TypeScript.
- Postojeće provere sadržaja, internih linkova, kvaliteta, oba jezika, privatnosti, workflow-a i mejl transporta prolaze.
- Osam produkcionih provera uklonjenih stranica i provera SHA-256 četiri slike potpisa dodate su u obavezni `verify`.
- Lint: 0 grešaka, 2 ranija upozorenja u `scripts/resend-delivery.test.mjs`.
- Poređenje svih 78 fajlova odabranog sadržaja i javnih resursa sa produkcionim komitom: identično; nema dodatnih fajlova u direktorijumima sadržaja i javnih resursa.
- `git diff --check`: PASS.

## Provera posle objave

Posle Ready objave proveriti sitemap, aktivne stranice i njihov tekst/linkove, svih 372 uklonjene adrese, postojeća preusmerenja, četiri slike potpisa, pristupnu kapiju i SR/EN prelazak na izdvojenu formu. Uporedna provera je isključivo GET/HEAD: ne pravi prijavu i ne šalje poruke.

Dokazi i ponovljiva skripta čuvaju se lokalno u pipeline-u: `outputs/staging-content-sync-2026-09-23/`. `live-content-parity.json` sadrži stvarni rezultat provere posle objave; ovaj dokument ne proglašava proveru završenom unapred.

## Sledeći uslovi za produkciju

Usklađen marketing sadržaj ne dokazuje pouzdan prijem prijave, ispravnost vraćanja rezervne kopije ili merenje konverzija kroz novu arhitekturu. Ove stavke ostaju u planu prelaska na produkciju. Pristup otvorenom Drive folderu vlasnik je prihvatio. Sistem i dalje priprema draftove koje Niko šalje.
