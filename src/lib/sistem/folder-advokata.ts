/* eslint-disable @typescript-eslint/no-explicit-any -- predmet je JSON zapis (crm_predmeti.podaci) */
import type { Kontekst } from "./kontekst.ts";

/**
 * Folder predmeta za advokata na Drive-u (prepis pipeline scripts/drive-predmet.mjs, sada preko Drive API-ja):
 *   LetKasni — dokumenta klijenata / <YYYY-MM mesec> / <NN> <Ime Prezime> — <let>, <datum leta> /
 * Pravi se čim stigne prvi dokument, dopunjuje se sa svakim novim. Mesec = mesec prvog dokumenta,
 * redni broj je globalan. Predato se pamti po sadržaju (md5) u `drive_prilozi`.
 * Struktura se ne menja bez Nika — advokat po njoj radi.
 */
const FOLDER = "application/vnd.google-apps.folder";
const MESECI = ["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar"];
const AUTO = "[automatski — dopunjuje se ručno pri pregledu dokumenata]";
const STATUS_OPIS: Record<string, string> = {
  NEW: "nov upit", VERIFIED: "let proveren", REVIEWED: "nalaz revidiran", DRAFTED: "odgovor klijentu pripremljen",
  SENT: "klijentu odgovoreno, čekamo dokumenta", AWAITING_DOCS: "čekamo dokumenta od klijenta",
  CLIENT_REPLIED: "klijent odgovorio", DOCS_RECEIVED: "dokumenta primljena, ugovor u pripremi",
  POA_GENERATED: "ugovor napravljen, još nije poslat klijentu", POA_DRAFTED: "ugovor pripremljen za slanje klijentu",
  POA_SENT: "ugovor poslat klijentu, ČEKA SE POTPIS", POA_SIGNED: "potpisano", LAWYER: "potpisano, predmet kod advokata",
  CLOSED: "zatvoreno", NOT_ELIGIBLE: "nema osnova", HUMAN_REVIEW: "na ručnoj proveri", LOST: "izgubljen",
};

const dmy = (iso: string | null | undefined) => (iso && /^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso.slice(8)}.${iso.slice(5, 7)}.${iso.slice(0, 4)}.` : (iso ?? "—"));

function opisPredmeta(c: any, fajlovi: string[], sad: string) {
  const putnici = [c.putnik, ...(c.saputnici ?? [])].filter(Boolean);
  const km = c.kasnjenje_dolazak_min;
  return [
    putnici.map((p: any) => p.ime_prezime + (p.maloletan ? " (mlt.)" : "")).join(", "),
    `Let: ${c.let?.broj ?? "broj nepoznat"}, ${c.let?.od ?? "?"} – ${c.let?.do ?? "?"}, ${dmy(c.let?.datum)}`,
    `Interna oznaka predmeta: ${c.ref}`,
    "",
    `STATUS: ${STATUS_OPIS[c.status] ?? c.status}`,
    km ? `Kašnjenje u dolasku: ${Math.floor(km / 60)} h ${km % 60} min` : "Kašnjenje u dolasku: nije još utvrđeno",
    c.iznos_eur ? `Procena: ${c.iznos_eur} EUR po putniku (${putnici.length} putnik/a)` : "",
    "",
    "PUTNICI",
    ...putnici.map((p: any) => `  ${p.ime_prezime}${p.rodjena ? " · rođ. " + dmy(p.rodjena) : ""}${p.adresa ? " · " + p.adresa : ""}`),
    "",
    "SADRŽAJ FOLDERA",
    ...[...fajlovi].sort().map((f) => `  - ${f}`),
    "",
    AUTO,
    `Poslednje ažuriranje: ${sad}`,
    "",
  ].filter((l, i, a) => !(l === "" && a[i - 1] === "")).join("\n");
}

async function korenFoldera(ctx: Kontekst) {
  if (ctx.konfig.drive.dokumentaKlijenata) return ctx.konfig.drive.dokumentaKlijenata;
  // staging: poseban folder u sistemskom, nikad pravi folder za advokate
  if (ctx.konfig.ime !== "prod" && ctx.konfig.drive.sistem) return ctx.servisi.drive.folder("dokumenta klijenata (test)", ctx.konfig.drive.sistem);
  return null;
}

export async function folderZaAdvokate(ctx: Kontekst, ref: string) {
  const d = ctx.servisi.drive;
  const c = ctx.predmeti.ucitaj(ref);
  if (c.test || ctx.suvo) return null;
  const iskljuci = new Set<string>(c.drive_iskljuci ?? []);
  const fajlovi = (c.dokumenta_fajlovi ?? []).filter((f: any) => !iskljuci.has(f.ime));
  if (!fajlovi.length) return null;
  const koren = await korenFoldera(ctx);
  if (!koren) return null;

  let folderId: string | null = c.drive_folder_id ?? null;
  let putanja: string | null = c.drive_folder ?? null;
  if (!folderId && putanja) {
    let id: string | null = koren;
    for (const deo of putanja.split("/")) id = id ? await d.nadji(id, deo) : null;
    folderId = id;
  }
  let novFolder = false;
  if (!folderId) {
    let max = 0;
    for (const m of (await d.lista(koren)).filter((f) => f.mimeType === FOLDER && /^\d{4}-\d{2} /.test(f.name))) {
      for (const f of (await d.lista(m.id)).filter((x) => x.mimeType === FOLDER)) {
        const n = parseInt(f.name, 10);
        if (Number.isFinite(n)) max = Math.max(max, n);
      }
    }
    const prvi = fajlovi.map((f: any) => String(f.dodato ?? ctx.danas)).sort()[0];
    const mesec = `${prvi.slice(0, 7)} ${MESECI[Number(prvi.slice(5, 7)) - 1]}`;
    const ime = `${String(max + 1).padStart(2, "0")} ${c.putnik?.ime_prezime ?? c.ref} — ${c.let?.broj ?? "let nepoznat"}, ${c.let?.datum ?? "datum nepoznat"}`;
    folderId = await d.folder(ime, await d.folder(mesec, koren));
    putanja = `${mesec}/${ime}`;
    novFolder = true;
  }

  const predato: Record<string, string> = { ...(c.drive_prilozi ?? {}) };
  const kopirano: string[] = [];
  for (const f of fajlovi) {
    const kljuc = f.md5 ?? f.id;
    if (predato[kljuc]) continue;
    const ime = String(f.ime).replace(/^[0-9a-f]{6}_/, "");
    await d.kopiraj(f.id, folderId, ime);
    predato[kljuc] = ime;
    kopirano.push(ime);
  }

  const opisId = await d.nadji(folderId, "_O PREDMETU.txt");
  const rucni = opisId ? !new TextDecoder().decode(await d.citaj(opisId)).includes(AUTO) : false;
  if (!rucni && (kopirano.length || novFolder || !opisId)) {
    const tekst = opisPredmeta(c, Object.values(predato), ctx.sad);
    if (opisId) await d.zameni(opisId, tekst, "text/plain");
    else await d.upisi(folderId, "_O PREDMETU.txt", tekst, "text/plain");
  }
  ctx.predmeti.azuriraj(ref, (x) => {
    x.drive_folder_id = folderId;
    x.drive_folder = putanja;
    x.drive_prilozi = predato;
  });
  if (kopirano.length || novFolder) {
    ctx.predmeti.log(ref, `drive: ${novFolder ? `napravljen folder ${putanja}; ` : ""}kopirano ${kopirano.length} fajl(ova) u folder za advokata${kopirano.length ? `: ${kopirano.join(", ")}` : ""}`);
  }
  return { novFolder, kopirano };
}
