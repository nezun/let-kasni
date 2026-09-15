/* eslint-disable @typescript-eslint/no-explicit-any -- predmet je JSON zapis (crm_predmeti.podaci) */
import { dubokoSpoji, prazanPredmet, type Kontekst } from "../kontekst.ts";
import { status as aerodrom } from "../pravila/udaljenost.ts";

/**
 * Prijem: forma na sajtu upisuje claim pravo u CRM bazu (src/lib/crm/prijem.ts); ovaj korak ga dopuni
 * do punog zapisa predmeta. Rezerva: kad upis u bazu sa forme nije uspeo, isti claim čeka kao JSON u
 * Drive „<sistem>/prijem/“ — odatle se pravi predmet i fajl ide u „prijem/obradjeno/“.
 */
const FOLDER = "application/vnd.google-apps.folder";
const TIP: Record<string, string> = { delay_3h_plus: "delay", missed_connection_same_booking: "delay", denied_boarding: "denied_boarding", other: "other" };

export const refIzClaima = (id: unknown) => String(id ?? "").replace(/[^0-9a-f]/gi, "").slice(0, 8).toUpperCase();

export function brojLeta(s: unknown) {
  const m = String(s ?? "").toUpperCase().replace(/\s+/g, "").match(/^([A-Z0-9]{2})(\d{1,4})[A-Z]?$/);
  return m ? `${m[1]} ${m[2]}` : null;
}

export function rutaIzTeksta(s: unknown): [string | null, string | null] {
  const kodovi = (String(s ?? "").toUpperCase().match(/\b[A-Z]{3}\b/g) ?? []).filter((k) => aerodrom(k).poznat);
  return kodovi.length >= 2 ? [kodovi[0], kodovi[kodovi.length - 1]] : [null, null];
}

export function mapiraj(j: any, imeFajla: string) {
  const cl = j.claim;
  const [od, doo] = rutaIzTeksta(cl.route);
  const ime = [cl.firstName, cl.lastName].filter(Boolean).join(" ").trim();
  return {
    status: "NEW",
    putnik: { ime_prezime: ime || null, email: cl.email ? String(cl.email).trim().toLowerCase() : null, telefon: cl.phone ?? null },
    let: { broj: brojLeta(cl.flightNumber), datum: /^\d{4}-\d{2}-\d{2}$/.test(cl.flightDate ?? "") ? cl.flightDate : null, od, do: doo, ruta_opis: cl.route ?? null, konekcija: cl.issueType === "missed_connection_same_booking" },
    tip: TIP[cl.issueType] ?? "other",
    problem_iz_forme: cl.issueType ?? null,
    provider_status: cl.providerStatus ?? null,
    prijem: { izvor: "sajt", claim_id: cl.id, primljeno: j.poslato ?? cl.createdAt ?? null, jezik: cl.locale ?? null, drive_fajl: imeFajla },
  };
}

export default async function prijem(ctx: Kontekst) {
  const r = ctx.korak("prijem");
  if (r.rezim === "iskljuceno") return;

  // 1. claim-ovi koje je forma upisala direktno u bazu
  for (const c of ctx.predmeti.svi()) {
    if (c.sistem?.primljeno) continue;
    if (c.prijem?.izvor !== "sajt" || c.status !== "NEW") {
      // predmet iz pipeline-a (već pun zapis): samo oznaka da je viđen
      if (r.auto) ctx.predmeti.azuriraj(c.ref, (x) => { x.sistem = { ...(x.sistem ?? {}), primljeno: ctx.sad }; });
      continue;
    }
    const email = String(c.putnik?.email ?? "").toLowerCase();
    const opis = `${c.ref} — ${c.tip}, ${c.let?.broj ?? "bez broja leta"} ${c.let?.od ?? "?"}→${c.let?.do ?? "?"} ${c.let?.datum ?? ""}`.trim();
    if (!r.auto) {
      r.predlog(`nov predmet ${opis}`);
      continue;
    }
    if (ctx.konfig.ignorisiEmailove.includes(email)) {
      ctx.predmeti.azuriraj(c.ref, (x) => { x.test = true; x.sistem = { ...(x.sistem ?? {}), primljeno: ctx.sad }; });
      r.napomena(`${c.ref}: test claim — ignorisan`);
      continue;
    }
    ctx.predmeti.azuriraj(c.ref, (x) => {
      const pun = dubokoSpoji(prazanPredmet(x.ref, x.prijem?.primljeno ?? ctx.sad), structuredClone(x));
      for (const k of Object.keys(pun)) x[k] = pun[k];
      x.sistem = { ...(x.sistem ?? {}), primljeno: ctx.sad };
    });
    ctx.predmeti.log(c.ref, "prijem (kod): predmet sa forme preuzet iz CRM baze");
    r.uradjeno(`nov predmet ${opis}`);
    if (!c.putnik?.ime_prezime) ctx.zadatak({ ref: c.ref, vrsta: "prijem_bez_imena", opis: "Forma bez imena putnika — draft ne može da se napiše" });
  }

  // 2. rezerva: Drive prijem/
  const koren = ctx.konfig.drive.sistem;
  if (!koren) return;
  const d = ctx.servisi.drive;
  const prijemId = await d.folder("prijem", koren);
  const fajlovi = (await d.lista(prijemId)).filter((f) => f.mimeType !== FOLDER && f.name.endsWith(".json"));
  if (!fajlovi.length) return;
  const obradjenoId = await d.folder("obradjeno", prijemId);
  const skloni = async (id: string) => { if (r.auto && !ctx.suvo) await d.premesti(id, prijemId, obradjenoId); };

  for (const f of fajlovi) {
    let j: any;
    try {
      j = JSON.parse(new TextDecoder().decode(await d.citaj(f.id)));
    } catch (e) {
      r.greska(`prijem/${f.name}: nije JSON (${e instanceof Error ? e.message : e})`);
      continue;
    }
    if (j?.sema !== 1 || !j.claim?.id) {
      r.greska(`prijem/${f.name}: nepoznat format`);
      continue;
    }
    const ref = refIzClaima(j.claim.id);
    const email = String(j.claim.email ?? "").toLowerCase();
    if (ctx.konfig.ignorisiEmailove.includes(email) || ctx.predmeti.ima(ref)) {
      await skloni(f.id);
      continue;
    }
    const podaci = dubokoSpoji(prazanPredmet(ref, ctx.sad), mapiraj(j, f.name));
    if (!r.auto) {
      r.predlog(`nov predmet ${ref} (Drive rezerva)`);
      continue;
    }
    podaci.sistem = { primljeno: ctx.sad };
    if (!(await ctx.predmeti.novi(ref, podaci))) {
      await skloni(f.id);
      continue;
    }
    ctx.predmeti.log(ref, `prijem (kod): predmet napravljen iz forme (Drive prijem/${f.name} — upis u bazu sa forme nije uspeo)`);
    await skloni(f.id);
    r.uradjeno(`nov predmet ${ref} (Drive rezerva)`);
    if (!podaci.putnik.ime_prezime) ctx.zadatak({ ref, vrsta: "prijem_bez_imena", opis: "Forma bez imena putnika — draft ne može da se napiše" });
  }
}
