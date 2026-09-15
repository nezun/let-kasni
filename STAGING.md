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

## Kako radi
- **Server** (`src/lib/sistem/`): prijem, Gmail, prilozi, pravila EU261, dokumenta, portal, e-potpis, draftovi,
  dnevni pregled za advokate, CRM pregled. Zove ga pg_cron na sat i Mac posle svakog završenog agenta.
- **Mac** radi samo agente (Provera leta, Revizor, Dokumenta) iz tabele `crm_poslovi`. Kad je Mac ugašen, poslovi
  čekaju; server te predmete preskače i nastavlja kad rezultat stigne. Posao prekinut usred rada vraća se u red.
- **Klijent**: link iz mejla → portal → „Sačuvaj podatke“ → sajt odmah pravi ugovor i otvara potpis.

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
