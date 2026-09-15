# Staging — staging.letkasni.rs

Staging je samostalna kopija sistema: svoj Vercel projekat, svoja baza, svoji folderi. Razvija se i proba ovde;
na produkciju (letkasni.rs) prelazi tek kad Niko kaže, po spisku na dnu. **Produkcija se sa staginga ne dira.**

| | Staging | Produkcija |
|---|---|---|
| Git grana | `staging` (trajna) | `main` |
| Vercel projekat | `let-kasni-staging` | `let-kasni` |
| Adresa | https://staging.letkasni.rs (traži Vercel prijavu, noindex) | https://letkasni.rs |
| CRM baza | Supabase `fkjojrefskexxkrjzgve` | nema još — pravi se pri prelasku |
| Drive | „LetKasni — test“ (prijem, uploads, ugovori, dokumenta klijenata (test), sabloni) | „Letkasni.rs“ folderi |
| Pošta | nikad pravi Gmail: draftovi idu u bazu (`crm_sistem.posta_staging`) | Gmail draftovi sa kontakt@letkasni.rs, Niko šalje |
| Režim koraka | sve `auto` | `predlog`, pa korak po korak na `auto` (`SISTEM_KORACI_AUTO`) |
| Raspored | Supabase pg_cron na sat → `/api/sistem/prolaz` | isto, posle prelaska |
| Agenti | Nikov Mac: `scripts/sistem/radnik.mjs --okruzenje test` | Mac: `radnik.mjs --okruzenje prod` (posle prelaska) |
| signNow | isti nalog (Development mode, vodeni žig) | plaćeni plan pre prelaska |

## Kako radi — tok predmeta
1. **Forma** na sajtu → predmet odmah u CRM bazi (NEW).
2. **Server** dopuni predmet; **agent na Macu** sakupi činjenice o letu; **kod** izračuna nalaz (EU261); **Revizor** (agent) proveri izvore.
3. ELIGIBLE → **draft A-delay / A-cancel koji traži pasoš i boarding kartu**. Niko ga šalje.
4. Klijent odgovori mejlom sa dokumentima → Apps Script ih spusti na Drive („LetKasni prilozi/<thread>“) →
   server ih uzme u predmet i u folder za advokate.
5. **Agent Dokumenta** (Mac) pročita ime, datum rođenja i adresu. Sve sigurno → server napravi ugovor o ustupanju
   i poziv za potpis u signNow-u (POA_GENERATED). Nesigurno ili razlika → zadatak za Nika (HUMAN_REVIEW).
6. **Draft G-potpis** sa ličnim linkom za potpis (POA_DRAFTED). Niko ga šalje → POA_SENT.
7. Klijent otvori link i potpiše (bez upisivanja podataka i bez naloga) → server preuzme potpisan PDF → POA_SIGNED,
   PDF u folderu za advokate, dnevni pregled advokatima (jedan mejl dnevno, samo kad ima novog).

Mac radi samo agente (tabela `crm_poslovi`). Kad je Mac ugašen, poslovi čekaju; server te predmete preskače i
nastavlja kad rezultat stigne. Posao prekinut usred rada vraća se u red.

**Staging i pošta:** draftovi idu u bazu, ne u Gmail. Pregled i „slanje“:
`node scripts/sistem/alati/staging-posta.mjs [--pokazi <id> | --posalji <id>]` (pipeline repo). Odgovore klijenata i
priloge staging samo čita iz pravog Gmaila i foldera „LetKasni prilozi“ (`SISTEM_GMAIL_CITANJE=pravo`) — ništa u
njima ne menja. Za probu: odgovor sa priloga pošalji na kontakt@letkasni.rs sa adrese koja nije naša.

## Provera
```bash
node --test src/lib/sistem/pravila/eu261.test.ts   # pravila EU261 (28 slučajeva)
node --test src/lib/sistem/test/prolaz.test.ts     # ceo serverski tok sa lažnim servisima
```

## Prelazak na produkciju (kad Niko kaže)
1. Supabase: nov produkcijski projekat (pravi Niko) → migracije `202609141800_crm.sql`, `202609151200_crm_poslovi.sql`, `202609151210_crm_raspored.sql`.
2. Vercel `let-kasni` (produkcija): env promenljive kao na stagingu, sa produkcijskim vrednostima — `SISTEM_OKRUZENJE=prod`,
   Drive folderi „Letkasni.rs“, `SISTEM_ADVOKATI_ZA`, `SISTEM_ADVOKATI_DRIVE_FOLDER_ID`, `SISTEM_DOKUMENTA_KLIJENATA_DRIVE_FOLDER_ID`,
   `SISTEM_PRILOZI_GMAIL_DRIVE_FOLDER_ID`, nov `SISTEM_KLJUC`, `DOKUMENTA_TAJNA`, `PREGLED_KLJUCEVI`.
3. Postojeći predmeti sa Maca u produkcijsku bazu (pipeline `koraci/baza.mjs posalji`), pa provera pregleda.
4. Merge `staging` → `main` (PR), deploy.
5. `crm_sistem[raspored_poziv]` za produkciju; prvi prolaz ručno sa `?suvo=1`, pa uključiti pg_cron.
6. Mac: ukloniti stari orkestrator (`raspored.mjs ukloni`), instalirati radnika (`raspored.mjs instaliraj --radnik --okruzenje prod`).
7. Koraci na `auto` jedan po jedan, na Nikovu reč.
