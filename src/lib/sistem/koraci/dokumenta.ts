/* eslint-disable @typescript-eslint/no-explicit-any -- predmet i izlaz agenta su JSON zapisi */
import { createHash } from "node:crypto";

import type { Kontekst } from "../kontekst.ts";

/**
 * Dokumenta: agent (na Nikovom Macu) pregleda sve fajlove predmeta i vrati dokumenta.json; kod iz toga menja
 * predmet — zastavice dokumenata, prazna lična polja, statuse, ugovor (prepis pipeline koraci/dokumenta.mjs).
 * Lična polja se samo POPUNJAVAJU kad su prazna i pročitana sigurno; razlika je zadatak, nikad prepisivanje.
 */
const STATUSI = ["SENT", "AWAITING_DOCS", "CLIENT_REPLIED", "DOCS_RECEIVED", "POA_GENERATED", "POA_SENT", "POA_SIGNED"];
const MIME_PDF = "application/pdf";

export const norm = (s: unknown) =>
  String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/gi, "dj").toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean).sort().join(" ");

export const putniciPredmeta = (c: any) => [c.putnik, ...(c.saputnici ?? [])].filter((p: any) => p?.ime_prezime);
export const kljucDokumenata = (fajlovi: any[]) => createHash("sha1").update(fajlovi.map((f) => f.md5 ?? f.id).sort().join(",")).digest("hex").slice(0, 10);

export function nazivUgovoraPdf(ime: string) {
  const delovi = ime.trim().split(/\s+/);
  return `${delovi.slice(1).join(" ")} ${delovi[0]} - Ugovor o ustupanju.pdf`;
}

/**
 * Ugovori (PDF, jedan po putniku) za slanje mejlom: .docx iz šablona sa Drive-a, PDF renderuje signNow,
 * čuva se u „<sistem>/ugovori/<REF>/“. Portal ne ide ovuda — tamo sajt pravi ugovor i poziv za potpis.
 */
export async function napraviUgovore(ctx: Kontekst, ref: string) {
  const c = ctx.predmeti.ucitaj(ref);
  const koren = ctx.konfig.drive.sistem;
  if (!koren) throw new Error("Drive folder sistema nije podešen");
  const putnici = putniciPredmeta(c);
  const odrasli = putnici.filter((p: any) => !p.maloletan);
  const folder = await ctx.servisi.drive.folder(ref, await ctx.servisi.drive.folder("ugovori", koren));
  const ugovori: Array<{ putnik: string; naziv: string; pdf_id: string; napravljen: string }> = [];
  for (const [i, p] of putnici.entries()) {
    const putnik = {
      ime_prezime: p.ime_prezime, rodjena: p.rodjena ?? null, adresa: p.adresa ?? c.putnik?.adresa ?? null, maloletan: !!p.maloletan,
      zakonski_zastupnik: p.zakonski_zastupnik ?? (p.maloletan ? (odrasli[0]?.ime_prezime ?? null) : null),
      claim_id: `${ref}-${String(i + 1).padStart(2, "0")}`,
    };
    const docx = await ctx.servisi.sabloni.ugovor(putnik, c.let ?? {});
    const naziv = nazivUgovoraPdf(p.ime_prezime);
    const pdf = await ctx.servisi.potpis.pdfIzDocx(docx, naziv.replace(/\.pdf$/, ".docx"));
    ugovori.push({ putnik: p.ime_prezime, naziv, pdf_id: await ctx.servisi.drive.upisi(folder, naziv, pdf, MIME_PDF), napravljen: ctx.sad });
  }
  ctx.predmeti.azuriraj(ref, (x) => { x.ugovori = ugovori; });
  return ugovori;
}

async function ugovor(ctx: Kontekst, c: any, dj: any, r: ReturnType<Kontekst["korak"]>) {
  const ref = c.ref;
  const odobreno = (c.beleske ?? []).some((b: string) => /ugovor odobren|punomoćje odobreno/i.test(b));
  if (!["ELIGIBLE", "POTENTIALLY_ELIGIBLE"].includes(c.nalaz) || (c.revizija !== "SLAZEM_SE" && !odobreno)) {
    ctx.zadatak({ ref, vrsta: "ugovor_ceka_nalaz", opis: `Dokumenta su stigla, a nalaz (${c.nalaz ?? "nema"}) nije revidiran i pozitivan — ugovor se ne pravi` });
    return;
  }
  const putnici = putniciPredmeta(c);
  const nesigurni = putnici.filter((p: any) => {
    const d = (dj.putnici ?? []).find((x: any) => norm(x.ime_prezime) === norm(p.ime_prezime));
    return !d || !d.ime_sigurno || !d.rodjena_sigurno || !d.adresa_sigurno || (p.maloletan && !p.zakonski_zastupnik);
  });
  if (nesigurni.length) {
    ctx.predmeti.status(ref, "HUMAN_REVIEW");
    ctx.zadatak({ ref, vrsta: "ugovor_podaci_nesigurni", opis: `Ime, datum rođenja ili adresa nisu pročitani sigurno (ili se ne zna zakonski zastupnik): ${nesigurni.map((p: any) => p.ime_prezime).join(", ")}` });
    return;
  }
  try {
    const ugovori = await napraviUgovore(ctx, ref);
    ctx.predmeti.status(ref, "POA_GENERATED");
    ctx.predmeti.log(ref, `dokumenta (kod): ugovor o ustupanju generisan — ${ugovori.length} PDF`);
    r.uradjeno(`${ref}: ugovor generisan → POA_GENERATED`);
  } catch (e) {
    r.greska(`${ref}: ugovor — ${e instanceof Error ? e.message : e}`);
    ctx.zadatak({ ref, ko: "sistem", vrsta: "ugovor_greska", opis: "Generisanje ugovora nije uspelo — vidi izveštaj prolaza" });
  }
}

async function primeni(ctx: Kontekst, ref: string, dj: any, r: ReturnType<Kontekst["korak"]>) {
  const c = ctx.predmeti.ucitaj(ref);
  const vrste = new Set((dj.fajlovi ?? []).map((f: any) => f.vrsta));
  const konflikti: string[] = [];

  ctx.predmeti.azuriraj(ref, (x) => {
    x.dokumenta ??= {};
    if (vrste.has("pasos") || vrste.has("licna_karta")) x.dokumenta.pasos = true;
    if (vrste.has("boarding")) x.dokumenta.boarding = true;
    if (vrste.has("rezervacija")) x.dokumenta.rezervacija = true;
    if (vrste.has("obavestenje")) x.dokumenta.obavestenje = true;
    const svi = [x.putnik, ...(x.saputnici ?? [])];
    for (const p of dj.putnici ?? []) {
      const cilj = svi.find((s: any) => s?.ime_prezime && norm(s.ime_prezime) === norm(p.ime_prezime));
      if (!cilj) {
        konflikti.push(`na dokumentu je putnik koga nema u predmetu (${p.ime_prezime})`);
        continue;
      }
      for (const [polje, sigurno] of [["rodjena", "rodjena_sigurno"], ["adresa", "adresa_sigurno"]]) {
        if (!p[polje] || !p[sigurno]) continue;
        if (cilj[polje] == null) cilj[polje] = p[polje];
        else if (norm(cilj[polje]) !== norm(p[polje])) konflikti.push(`${cilj.ime_prezime}: ${polje === "rodjena" ? "datum rođenja" : "adresa"} u predmetu se razlikuje od dokumenta`);
      }
      if (p.maloletan != null && cilj.maloletan == null) cilj.maloletan = p.maloletan;
      if (p.zakonski_zastupnik && !cilj.zakonski_zastupnik) cilj.zakonski_zastupnik = p.zakonski_zastupnik;
    }
  });

  const k = dj.let_sa_karte;
  const bez = (s: unknown) => String(s ?? "").replace(/\s+/g, "").toUpperCase();
  if (k?.broj && c.let?.broj && bez(k.broj) !== bez(c.let.broj)) konflikti.push(`boarding karta glasi na let ${k.broj}, predmet na ${c.let.broj}`);
  if (k?.datum && c.let?.datum && k.datum !== c.let.datum) konflikti.push(`boarding karta: datum ${k.datum}, predmet: ${c.let.datum}`);
  konflikti.push(...(dj.neslaganja ?? []));
  if (konflikti.length) ctx.zadatak({ ref, vrsta: "dokumenta_neslaganje", opis: konflikti.join("; ") });
  ctx.predmeti.log(ref, `dokumenta (agent + kod): ${[...vrste].join(", ") || "ništa prepoznato"}${konflikti.length ? `; neslaganja: ${konflikti.length}` : ""}${dj.sta_fali?.length ? `; fali: ${dj.sta_fali.join(", ")}` : ""}`);

  let cur = ctx.predmeti.ucitaj(ref);
  // Portal: ugovor pravi sajt iz podataka koje je klijent upisao; ovde samo poređenje sa dokumentima.
  if (cur.portal?.link_napravljen || cur.portal?.podaci_poslati) {
    const fali = [!cur.dokumenta?.pasos && "pasoš ili lična karta", !(cur.dokumenta?.boarding || cur.dokumenta?.rezervacija) && "boarding karta"].filter(Boolean);
    if (fali.length && ["POA_SENT", "POA_SIGNED"].includes(cur.status)) ctx.zadatak({ ref, vrsta: "portal_fale_dokumenta", opis: `Portal: fali ${fali.join(" i ")}` });
    return;
  }
  const imena = putniciPredmeta(cur).map((p: any) => p.ime_prezime);

  // potpisani ugovori stigli mejlom
  const potpisani = new Set((dj.potpisani_ugovori ?? []).map(norm));
  if (cur.status === "POA_SENT" && potpisani.size) {
    const potpisali = imena.filter((i: string) => potpisani.has(norm(i)));
    ctx.predmeti.azuriraj(ref, (x) => {
      for (const ime of potpisali) {
        const z = (x.potpisivanje ??= []).find((y: any) => y.putnik === ime);
        if (z?.stanje === "potpisano") continue;
        if (z) Object.assign(z, { stanje: "potpisano", potpisano: ctx.danas });
        else x.potpisivanje.push({ putnik: ime, stanje: "potpisano", provajder: "email", kanal: "email", potpisano: ctx.danas });
      }
    });
    if (potpisali.length) ctx.predmeti.log(ref, `potpis: potpisano (email) — ${potpisali.join(", ")}, ${ctx.danas}`);
    if (potpisali.length === imena.length && !konflikti.length) {
      ctx.predmeti.status(ref, "POA_SIGNED");
      r.uradjeno(`${ref}: svi ugovori potpisani → POA_SIGNED`);
    } else {
      ctx.zadatak({ ref, vrsta: "potpis_delimican", opis: `Potpisano ${potpisali.length} od ${imena.length} ugovora` });
    }
    return;
  }

  if (cur.dokumenta?.pasos && (cur.dokumenta?.boarding || cur.dokumenta?.rezervacija) && !konflikti.length) {
    if (cur.status === "SENT") cur = (ctx.predmeti.status(ref, "CLIENT_REPLIED"), ctx.predmeti.ucitaj(ref));
    if (["CLIENT_REPLIED", "AWAITING_DOCS"].includes(cur.status)) {
      ctx.predmeti.status(ref, "DOCS_RECEIVED");
      r.uradjeno(`${ref}: dokumenta kompletna → DOCS_RECEIVED`);
    }
  } else if (dj.sta_fali?.length) {
    r.napomena(`${ref}: fali ${dj.sta_fali.join(", ")}`);
  }

  cur = ctx.predmeti.ucitaj(ref);
  if (cur.status === "DOCS_RECEIVED") await ugovor(ctx, cur, dj, r);
}

export default async function dokumenta(ctx: Kontekst) {
  const r = ctx.korak("dokumenta");
  if (r.rezim === "iskljuceno") return;

  for (const c of ctx.predmeti.svi().filter((x) => STATUSI.includes(x.status) && (!["POA_GENERATED", "POA_SIGNED"].includes(x.status) || x.portal))) {
    const fajlovi = c.dokumenta_fajlovi ?? [];
    if (!fajlovi.length) continue;
    const kljuc = kljucDokumenata(fajlovi);
    if (c.dokumenta_pregled?.primenjeno === kljuc) continue;

    const posao = ctx.red.nadji("dokumenta", c.ref, kljuc);
    if (!posao) {
      if (!r.auto) {
        r.predlog(`${c.ref}: agent bi pregledao ${fajlovi.length} dokument(a)`);
        continue;
      }
      await ctx.red.dodaj({ vrsta: "dokumenta", ref: c.ref, kljuc, ulaz: { fajlovi: fajlovi.map((f: any) => ({ id: f.id, ime: f.ime, md5: f.md5 ?? null })) }, opis: `Pregled ${fajlovi.length} dokumenata` });
      r.napomena(`${c.ref}: čeka agenta (${fajlovi.length} dokument(a))`);
      continue;
    }
    if (posao.stanje === "greska") {
      ctx.zadatak({ ref: c.ref, ko: "sistem", vrsta: "agent_dokumenta", opis: `Agent za dokumenta nije uspeo: ${String(posao.poslednja_greska ?? "").slice(0, 160)}` });
      continue;
    }
    if (posao.stanje !== "gotovo") {
      r.napomena(`${c.ref}: čeka agenta (${fajlovi.length} dokument(a))`);
      continue;
    }
    if (!r.auto) {
      r.predlog(`${c.ref}: primenio bih pregled dokumenata`);
      continue;
    }
    await primeni(ctx, c.ref, posao.izlaz ?? {}, r);
    ctx.predmeti.azuriraj(c.ref, (x) => { x.dokumenta_pregled = { kljuc, primenjeno: kljuc, vreme: ctx.sad }; });
  }
}
