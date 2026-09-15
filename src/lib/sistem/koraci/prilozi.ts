/* eslint-disable @typescript-eslint/no-explicit-any -- predmet je JSON zapis (crm_predmeti.podaci) */
import { folderZaAdvokate } from "../folder-advokata.ts";
import type { Kontekst } from "../kontekst.ts";
import type { FajlNaDrive } from "../servisi.ts";

/**
 * Prilozi iz dva izvora, bez kopiranja na disk — predmet pamti Drive ID i md5 svakog fajla (`dokumenta_fajlovi`):
 *  1. portal na sajtu → Drive „<sistem>/uploads/<REF>/“
 *  2. Gmail → Apps Script → Drive „LetKasni prilozi/<threadId>/“ (samo gde je podešen folder)
 * Šta je dokument (pasoš, karta, ugovor) ne odlučuje ovaj korak — to radi korak „dokumenta“ (agent).
 * Posle novih fajlova ažurira se folder za advokate.
 */
const FOLDER = "application/vnd.google-apps.folder";

const poznat = (c: any, f: FajlNaDrive) => (c.dokumenta_fajlovi ?? []).some((x: any) => x.id === f.id || (f.md5Checksum && x.md5 === f.md5Checksum));

function dodaj(ctx: Kontekst, ref: string, fajlovi: FajlNaDrive[], izvor: string) {
  ctx.predmeti.azuriraj(ref, (x) => {
    x.dokumenta_fajlovi = [
      ...(x.dokumenta_fajlovi ?? []),
      ...fajlovi.map((f) => ({ id: f.id, ime: f.name, md5: f.md5Checksum ?? null, mime: f.mimeType, izvor, dodato: (f.createdTime ?? ctx.sadDatum.toISOString()).slice(0, 10) })),
    ];
  });
}

export default async function prilozi(ctx: Kontekst) {
  const r = ctx.korak("prilozi");
  if (r.rezim === "iskljuceno") return;
  const d = ctx.servisi.drive;
  const koren = ctx.konfig.drive.sistem;
  if (!koren) {
    r.napomena("Drive folder sistema nije podešen (PIPELINE_DRIVE_FOLDER_ID)");
    return;
  }
  const izmenjeni = new Set<string>();

  // 1. portal
  const uploadsId = await d.folder("uploads", koren);
  for (const fo of (await d.lista(uploadsId)).filter((f) => f.mimeType === FOLDER)) {
    const ref = fo.name.toUpperCase();
    if (!ctx.predmeti.ima(ref)) {
      r.napomena(`portal: uploads/${fo.name} nema predmet`);
      continue;
    }
    const c = ctx.predmeti.ucitaj(ref);
    const novi = (await d.lista(fo.id)).filter((f) => f.mimeType !== FOLDER && !poznat(c, f));
    if (!novi.length) continue;
    if (!r.auto) {
      r.predlog(`portal: ${ref} — preuzeo bih ${novi.length} fajl(ova)`);
      continue;
    }
    dodaj(ctx, ref, novi, "portal");
    ctx.predmeti.log(ref, `portal: klijent postavio ${novi.length} fajl(ova) preko sajta`);
    if (["SENT", "AWAITING_DOCS"].includes(c.status)) ctx.predmeti.status(ref, "CLIENT_REPLIED");
    izmenjeni.add(ref);
    r.uradjeno(`portal: ${ref} — ${novi.length} fajl(ova)`);
  }

  // 2. Gmail prilozi (Apps Script)
  if (ctx.konfig.drive.priloziGmail) {
    const folderi = new Map((await d.lista(ctx.konfig.drive.priloziGmail)).filter((f) => f.mimeType === FOLDER).map((f) => [f.name, f.id]));
    for (const c of ctx.predmeti.svi()) {
      const threadovi = [c.gmail?.client_thread, c.gmail?.claim_thread, ...(Array.isArray(c.gmail?.threadovi) ? c.gmail.threadovi : Object.values(c.gmail?.threadovi ?? {}))].filter(Boolean);
      const novi: FajlNaDrive[] = [];
      for (const t of new Set(threadovi)) {
        const id = folderi.get(String(t));
        if (!id) continue;
        for (const f of await d.lista(id)) {
          if (f.mimeType === FOLDER || f.name.endsWith("_META.txt") || poznat(c, f)) continue;
          if (novi.some((n) => n.md5Checksum && n.md5Checksum === f.md5Checksum)) continue;
          novi.push(f);
        }
      }
      if (!novi.length) continue;
      if (!r.auto) {
        r.predlog(`gmail: ${c.ref} — preuzeo bih ${novi.length} prilog(a)`);
        continue;
      }
      dodaj(ctx, c.ref, novi, "gmail");
      ctx.predmeti.log(c.ref, `gmail: ${novi.length} prilog(a) iz prepiske`);
      izmenjeni.add(c.ref);
      r.uradjeno(`gmail: ${c.ref} — ${novi.length} prilog(a)`);
    }
  }

  // 3. folder za advokate
  for (const ref of izmenjeni) {
    try {
      await folderZaAdvokate(ctx, ref);
    } catch (e) {
      r.greska(`folder za advokate ${ref}: ${e instanceof Error ? e.message : e}`);
    }
  }
}
