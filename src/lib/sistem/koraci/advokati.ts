/* eslint-disable @typescript-eslint/no-explicit-any -- predmet je JSON zapis (crm_predmeti.podaci) */
import { createHash } from "node:crypto";

import type { Kontekst } from "../kontekst.ts";

/**
 * Dnevni pregled za advokate: JEDAN mejl dnevno (od `dnevnoOdSata`), i to samo kad ima nečeg novog.
 * Izmene se izvode iz razlike snimaka stanja (predmet predat advokatu, nova dokumenta kod predmeta posle
 * potpisa, potpisan ugovor), skupljaju se u red i idu zajedno sa spiskom svih predmeta kod advokata.
 * Staging: mejl ide u bazu (crm_sistem), ne u Gmail. Prod: Gmail draft sa kontakt@letkasni.rs.
 */
const dmy = (iso: string) => `${iso.slice(8, 10)}.${iso.slice(5, 7)}.${iso.slice(0, 4)}.`;
const hm = (min: number) => `${Math.floor(min / 60)}h${String(min % 60).padStart(2, "0")}`;
const POSLE_POTPISA = ["POA_SIGNED", "LAWYER", "CLOSED"];
const imena = (c: any) => [c.putnik, ...(c.saputnici ?? [])].filter((p: any) => p?.ime_prezime).map((p: any) => p.ime_prezime);
const naziv = (c: any) => (c.drive_folder ? String(c.drive_folder).split("/").pop() : `${imena(c).join(" + ")} — ${c.let?.broj ?? "?"}`);
const id = (...delovi: unknown[]) => createHash("sha1").update(delovi.join("|")).digest("hex").slice(0, 16);

type Snimak = Record<string, { status: string; nalaz: string | null; dokumenata: number; potpisi: Record<string, string> }>;

export function snimi(predmeti: any[]): Snimak {
  return Object.fromEntries(predmeti.map((c) => [c.ref, {
    status: c.status,
    nalaz: c.nalaz ?? null,
    dokumenata: (c.dokumenta_fajlovi ?? []).length,
    potpisi: Object.fromEntries((c.potpisivanje ?? []).map((p: any) => [p.putnik, p.stanje])),
  }]));
}

/** Prvi prolaz (nema starog snimka) ne pravi događaje — inače bi se sve istorijsko javilo odjednom. */
export function razlika(stari: Snimak | null, novi: Snimak) {
  if (!stari) return [];
  const out: any[] = [];
  for (const [ref, n] of Object.entries(novi)) {
    const s = stari[ref];
    if (!s) {
      out.push({ id: id("nov", ref), tip: "nov_predmet", ref, do: n.status });
      continue;
    }
    if (s.status !== n.status) out.push({ id: id("status", ref, s.status, n.status), tip: "status", ref, od: s.status, do: n.status });
    if (n.dokumenata > s.dokumenata) out.push({ id: id("dok", ref, n.dokumenata), tip: "nova_dokumenta", ref, broj: n.dokumenata - s.dokumenata });
    for (const [putnik, stanje] of Object.entries(n.potpisi)) {
      if (s.potpisi?.[putnik] !== stanje) out.push({ id: id("potpis", ref, putnik, stanje), tip: "potpis", ref, putnik, od: s.potpisi?.[putnik] ?? null, do: stanje });
    }
  }
  return out;
}

function opisPredmeta(c: any) {
  return [
    naziv(c),
    `  Let: ${c.let?.broj ?? "?"}, ${c.let?.od ?? "?"} – ${c.let?.do ?? "?"}, ${c.let?.datum ? dmy(c.let.datum) : "?"}${c.let?.prevozilac ? ` (${c.let.prevozilac})` : ""}`,
    `  Putnika: ${imena(c).length}${c.kasnjenje_dolazak_min != null ? ` · kašnjenje u dolasku: ${hm(c.kasnjenje_dolazak_min)}` : ""}${c.iznos_eur ? ` · po putniku: ${c.iznos_eur} EUR` : ""}`,
  ].join("\n");
}

const OPIS: Record<string, (e: any) => string> = {
  status: () => "predmet je predat advokatu",
  nova_dokumenta: (e) => `stigla nova dokumenta (${e.broj})`,
  potpis: (e) => `potpisan ugovor o ustupanju: ${e.putnik}`,
};

export default async function advokati(ctx: Kontekst) {
  const r = ctx.korak("advokati");
  const baza = ctx.servisi.baza;
  const predmeti = ctx.predmeti.svi();
  const snimak = snimi(predmeti);
  const dogadjaji = razlika(await baza.sistem("snimak"), snimak);
  ctx.dogadjaji.push(...dogadjaji);
  if (!ctx.suvo) await baza.upisiSistem("snimak", snimak);
  if (r.rezim === "iskljuceno") return;

  const red = (await baza.sistem("advokati_red")) ?? { dogadjaji: [], poslato: [], poslednje_slanje: null };
  const po = Object.fromEntries(predmeti.map((c) => [c.ref, c]));
  const vec = new Set([...red.poslato, ...red.dogadjaji.map((e: any) => e.id)]);
  const bitni = dogadjaji.filter((e) => !vec.has(e.id) && po[e.ref] && (
    (e.tip === "status" && e.do === "LAWYER") ||
    (e.tip === "nova_dokumenta" && POSLE_POTPISA.includes(po[e.ref].status)) ||
    (e.tip === "potpis" && e.do === "potpisano")));
  if (r.auto && bitni.length) {
    red.dogadjaji.push(...bitni.map((e) => ({ ...e, dan: ctx.danas })));
    if (!ctx.suvo) await baza.upisiSistem("advokati_red", red);
  }

  const k = ctx.konfig.posta.advokati;
  const cekaju = [...red.dogadjaji, ...(r.auto ? [] : bitni)];
  if (!cekaju.length) return;                                   // nema ništa novo → ne šalje se
  if (red.poslednje_slanje === ctx.danas) {
    r.napomena(`${cekaju.length} izmena čeka sutrašnji pregled za advokate`);
    return;
  }
  if (ctx.sat < k.dnevnoOdSata) return;
  if (!r.auto) {
    r.predlog(`dnevni pregled za advokate: ${[...new Set(cekaju.map((e: any) => e.ref))].join(", ")}`);
    return;
  }
  if (!k.za.length) {
    r.greska("SISTEM_ADVOKATI_ZA nije podešen — dnevni pregled nema kome da ide");
    return;
  }

  const poRef: Record<string, any[]> = {};
  for (const e of cekaju) if (po[e.ref]) (poRef[e.ref] ??= []).push(e);
  const kodAdvokata = predmeti.filter((c) => c.status === "LAWYER").sort((a, b) => String(a.prosledjeno_advokatu ?? "").localeCompare(String(b.prosledjeno_advokatu ?? "")));

  const telo = [
    "Poštovani,",
    "",
    `dnevni pregled LetKasni predmeta za ${dmy(ctx.danas)}`,
    "",
    `IZMENE OD POSLEDNJEG PREGLEDA (${Object.keys(poRef).length})`,
    "",
    ...Object.entries(poRef).map(([ref, ee]) => `${opisPredmeta(po[ref])}\n${ee.map((e) => `  – ${OPIS[e.tip]?.(e) ?? e.tip}`).join("\n")}\n`),
    `SVI PREDMETI KOD ADVOKATA (${kodAdvokata.length})`,
    "",
    ...kodAdvokata.map((c) => `- ${naziv(c)}${c.prosledjeno_advokatu ? ` · predato ${dmy(c.prosledjeno_advokatu)}` : ""}`),
    "",
    ...(ctx.konfig.drive.advokati ? ["Dokumenti su u folderu za advokate:", `https://drive.google.com/drive/folders/${ctx.konfig.drive.advokati}`, ""] : []),
    ...(ctx.konfig.pregledLinkAdvokati ? ["Pregled svih predmeta:", ctx.konfig.pregledLinkAdvokati, ""] : []),
    "Za pitanja: kontakt@letkasni.rs",
    "",
    "Tim letkasni.rs",
  ].join("\n");
  const naslov = `LetKasni — dnevni pregled predmeta ${dmy(ctx.danas)}`;

  try {
    const g = ctx.servisi.gmail;
    const from = (await g.aliasi()).includes(k.od) ? k.od : null;
    const d = await g.napraviDraft({ from, to: k.za, cc: k.cc, subject: naslov, body: telo });
    red.poslato.push(...red.dogadjaji.map((e: any) => e.id));
    red.poslato = red.poslato.slice(-2000);
    red.dogadjaji = [];
    red.poslednje_slanje = ctx.danas;
    await baza.upisiSistem("advokati_red", red);
    r.uradjeno(`dnevni pregled za advokate (${k.transport}, draft ${d.draftId}): ${Object.keys(poRef).join(", ")}`);
  } catch (e) {
    r.greska(`pregled za advokate: ${String(e instanceof Error ? e.message : e).slice(0, 200)}`);
  }
}
