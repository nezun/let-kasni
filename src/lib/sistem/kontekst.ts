/* eslint-disable @typescript-eslint/no-explicit-any -- predmet je JSON zapis (crm_predmeti.podaci) */
import type { Konfig, ImeKoraka, Rezim } from "./konfig.ts";
import { izracunajPregled } from "./pregled.ts";
import { napraviRed } from "./red.ts";
import type { Posao, Predmet, RedPredmeta, Servisi } from "./servisi.ts";

/**
 * Kontekst jednog serverskog prolaza: predmeti iz CRM baze u memoriji, prelazi statusa, zadaci za ljude,
 * izveštaj po koraku. Isto ponašanje kao pipeline lib/kontekst.mjs + scripts/case.mjs, samo bez diska:
 * izmene idu nazad u bazu uz proveru verzije.
 */
export const STATUSI = [
  "NEW", "VERIFIED", "REVIEWED", "DRAFTED", "SENT", "AWAITING_DOCS", "CLIENT_REPLIED",
  "DOCS_RECEIVED", "POA_GENERATED", "POA_DRAFTED", "POA_SENT", "POA_SIGNED", "LAWYER",
  "CLOSED", "NOT_ELIGIBLE", "HUMAN_REVIEW", "LOST",
];

export const PRELAZI: Record<string, string[]> = {
  NEW: ["VERIFIED", "HUMAN_REVIEW", "NOT_ELIGIBLE", "DRAFTED"],
  VERIFIED: ["REVIEWED", "HUMAN_REVIEW", "NOT_ELIGIBLE"],
  REVIEWED: ["DRAFTED", "HUMAN_REVIEW", "NOT_ELIGIBLE", "VERIFIED"],
  DRAFTED: ["SENT", "REVIEWED", "HUMAN_REVIEW", "CLIENT_REPLIED"],
  SENT: ["AWAITING_DOCS", "CLIENT_REPLIED", "LOST", "HUMAN_REVIEW"],
  AWAITING_DOCS: ["CLIENT_REPLIED", "DOCS_RECEIVED", "LOST", "DRAFTED", "HUMAN_REVIEW"],
  CLIENT_REPLIED: ["DOCS_RECEIVED", "POA_GENERATED", "POA_SIGNED", "AWAITING_DOCS", "DRAFTED", "HUMAN_REVIEW", "NOT_ELIGIBLE", "LOST", "VERIFIED"],
  DOCS_RECEIVED: ["POA_GENERATED", "AWAITING_DOCS", "HUMAN_REVIEW", "DRAFTED"],
  POA_GENERATED: ["POA_DRAFTED", "POA_SENT", "HUMAN_REVIEW"],
  POA_DRAFTED: ["POA_SENT", "POA_GENERATED", "HUMAN_REVIEW"],
  POA_SENT: ["POA_SIGNED", "CLIENT_REPLIED", "LOST", "HUMAN_REVIEW"],
  POA_SIGNED: ["LAWYER", "DRAFTED", "HUMAN_REVIEW"],
  LAWYER: ["CLOSED", "CLIENT_REPLIED", "HUMAN_REVIEW"],
  CLOSED: [],
  NOT_ELIGIBLE: ["DRAFTED", "SENT", "CLOSED", "HUMAN_REVIEW", "CLIENT_REPLIED"],
  HUMAN_REVIEW: STATUSI.filter((s) => s !== "HUMAN_REVIEW"),
  LOST: ["CLIENT_REPLIED", "CLOSED"],
};

export const OSETLJIVO = ["pasos", "jmbg", "licna_karta"];

export function ocisti(v: any): any {
  if (Array.isArray(v)) return v.map(ocisti);
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).filter(([k]) => !OSETLJIVO.includes(k)).map(([k, x]) => [k, ocisti(x)]));
  return v;
}

// ── vreme (Beograd, kao na Nikovom Macu) ──────────────────────────────────
const FORMAT = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Belgrade", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false });
export const beograd = (d: Date) => FORMAT.format(d).replace(",", ""); // "2026-09-15 11:30"
export const danasIz = (d: Date) => beograd(d).slice(0, 10);
export const satIz = (d: Date) => Number(beograd(d).slice(11, 13));

const dan = (iso: string) => new Date(`${iso.slice(0, 10)}T00:00:00Z`);
export function radnihDanaOd(datum: string | null | undefined, doDatuma: string) {
  if (!datum) return Infinity;
  let n = 0;
  for (const x = dan(datum); x < dan(doDatuma); x.setUTCDate(x.getUTCDate() + 1)) if (x.getUTCDay() !== 0 && x.getUTCDay() !== 6) n++;
  return n;
}
export function plusRadnihDana(datum: string, n: number) {
  const x = dan(datum);
  while (n > 0) {
    x.setUTCDate(x.getUTCDate() + 1);
    if (x.getUTCDay() !== 0 && x.getUTCDay() !== 6) n--;
  }
  return x.toISOString().slice(0, 10);
}

export function prazanPredmet(ref: string, sad: string): Predmet {
  return {
    ref, status: "NEW", kreirano: sad, azurirano: null,
    putnik: { ime_prezime: null, email: null, telefon: null, pol: null, adresa: null, podnosilac: null },
    saputnici: [],
    let: { broj: null, datum: null, od: null, do: null, ruta_opis: null, prevozilac: null, konekcija: false, marketing_carrier: null },
    tip: null, problem_iz_forme: null, provider_status: null,
    gmail: { claim_thread: null, claim_message: null, client_thread: null, last_client_message: null, draft_id: null, subject: null },
    nalaz: null, kasnjenje_dolazak_min: null, udaljenost_km: null, iznos_eur: null, iznos_odobren: false, revizija: null,
    dokumenta: { pasos: false, boarding: false, rezervacija: false, obavestenje: false, punomocje_potpisano: false, napomena: null },
    poslednji_kontakt: null, poslednji_kontakt_ko: null, followup: null, followupi: 0, prosledjeno_advokatu: null, obecanje: null,
    beleske: [], test: false,
  };
}

export function dubokoSpoji(cilj: any, izvor: any) {
  for (const [k, v] of Object.entries(izvor ?? {})) {
    if (v && typeof v === "object" && !Array.isArray(v) && cilj[k] && typeof cilj[k] === "object") dubokoSpoji(cilj[k], v);
    else cilj[k] = v;
  }
  return cilj;
}

const datum = (s: any) => (typeof s === "string" && /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : null);
const ceo = (n: any) => (Number.isFinite(n) ? Math.round(n) : null);
const uuid = (s: any) => (typeof s === "string" && /^[0-9a-f-]{36}$/i.test(s) ? s : null);

/** Kolone za upite; ceo zapis ide u `podaci` (bez ličnih brojeva). */
export function kolone(c: Predmet) {
  return {
    status: c.status,
    claim_id: uuid(c.prijem?.claim_id),
    tip: c.tip ?? null,
    nalaz: c.nalaz ?? null,
    let_broj: c.let?.broj ?? null,
    let_datum: datum(c.let?.datum),
    let_od: c.let?.od ?? null,
    let_do: c.let?.do ?? null,
    prevozilac: c.let?.prevozilac ?? null,
    kasnjenje_min: ceo(c.kasnjenje_dolazak_min),
    udaljenost_km: ceo(c.udaljenost_km),
    iznos_eur: ceo(c.iznos_eur),
    iznos_odobren: !!c.iznos_odobren,
    email: c.putnik?.email ?? null,
    telefon: c.putnik?.telefon ?? null,
    poslednji_kontakt: datum(c.poslednji_kontakt),
    poslednji_kontakt_ko: c.poslednji_kontakt_ko ?? null,
    podsetnik: datum(c.followup),
    prosledjeno_advokatu: datum(c.prosledjeno_advokatu),
    podaci: ocisti(c),
  };
}

const POLJA_PORTALA = ["ime_prezime", "rodjena", "adresa", "maloletan", "zakonski_zastupnik"];
const REDOSLED_PORTALA = ["DRAFTED", "SENT", "AWAITING_DOCS", "CLIENT_REPLIED", "DOCS_RECEIVED", "POA_GENERATED", "POA_SENT"];

/**
 * Konflikt verzija (klijent je u portalu upisao podatke dok je prolaz radio): naše izmene ostaju,
 * a iz baze se preuzima ono što piše samo portal — podaci putnika, `portal`, i ugovor/potpisi koje je sajt napravio.
 */
export function spojiSaBazom(nase: Predmet, izBaze: Predmet): Predmet {
  const novi = structuredClone(nase);
  novi.portal = { ...(nase.portal ?? {}), ...(izBaze.portal ?? {}) };
  const prenesi = (cilj: any, izvor: any) => {
    for (const k of POLJA_PORTALA) if (izvor?.[k] !== undefined) cilj[k] = izvor[k];
    return cilj;
  };
  novi.putnik = prenesi(novi.putnik ?? {}, izBaze.putnik);
  novi.saputnici = (izBaze.saputnici ?? []).map((s: any, i: number) => prenesi({ ...(novi.saputnici?.[i] ?? {}) }, s));
  if (izBaze.portal?.pripremio === "sajt") {
    const sajta = (izBaze.potpisivanje ?? []).filter((z: any) => z.kanal === "portal");
    const zadrzani = (nase.potpisivanje ?? []).filter((z: any) => z.stanje !== "poslato" || !sajta.some((n: any) => n.dokument_id === z.dokument_id));
    novi.potpisivanje = [...zadrzani, ...sajta.filter((n: any) => !zadrzani.some((z: any) => z.dokument_id === n.dokument_id))];
    const dokle = (s: string) => REDOSLED_PORTALA.indexOf(s);
    if (dokle(nase.status) > -1 && dokle(izBaze.status) > dokle(nase.status)) {
      novi.status = izBaze.status;
      novi.istorija_statusa = { ...(izBaze.istorija_statusa ?? {}), ...(nase.istorija_statusa ?? {}) };
    }
  }
  return novi;
}

export interface IzvestajKoraka {
  rezim: Rezim;
  uradjeno: string[];
  predlog: string[];
  napomene: string[];
  greske: string[];
}

export interface Zadatak {
  ref: string | null;
  ko: "niko" | "advokat" | "sistem";
  vrsta: string;
  opis: string;
  od: string;
}

interface Stavka {
  red: RedPredmeta;
  c: Predmet;
  izmenjen: boolean;
  log: Array<{ vreme: string; poruka: string }>;
}

export type Kontekst = ReturnType<typeof napraviKontekst>;

export function napraviKontekst(
  konfig: Konfig,
  servisi: Servisi,
  redovi: RedPredmeta[],
  { suvo = false, poslovi = [] as Posao[], letovi = {} as Record<string, any> } = {},
) {
  const sadDatum = servisi.sada();
  const sad = beograd(sadDatum);
  const danas = sad.slice(0, 10);
  const stavke = new Map<string, Stavka>();
  for (const red of [...redovi].sort((a, b) => a.ref.localeCompare(b.ref))) {
    stavke.set(red.ref, { red, c: structuredClone({ ...red.podaci, ref: red.ref, status: red.status }), izmenjen: false, log: [] });
  }
  const stavka = (ref: string) => {
    const s = stavke.get(ref);
    if (!s) throw new Error(`nema predmeta ${ref}`);
    return s;
  };
  const izvestaj: Partial<Record<ImeKoraka, IzvestajKoraka>> = {};
  const zadaci: Zadatak[] = [];

  const log = (ref: string, poruka: string) => {
    const s = stavka(ref);
    s.log.push({ vreme: sadDatum.toISOString(), poruka: poruka.slice(0, 2000) });
    s.izmenjen = true;
  };

  const predmeti = {
    svi: () => [...stavke.values()].map((s) => s.c).filter((c) => !c.test),
    ima: (ref: string) => stavke.has(ref),
    ucitaj: (ref: string) => stavka(ref).c,
    /** Menja polja (ne status); fn menja predmet na mestu. */
    azuriraj(ref: string, fn: (c: Predmet) => void) {
      const s = stavka(ref);
      const pre = s.c.status;
      fn(s.c);
      if (s.c.status !== pre) throw new Error(`${ref}: status se menja samo kroz predmeti.status()`);
      s.c.azurirano = sad;
      s.izmenjen = true;
      return s.c;
    },
    status(ref: string, novi: string) {
      const s = stavka(ref);
      const c = s.c;
      if (!STATUSI.includes(novi)) throw new Error(`Nepoznat status ${novi}`);
      if (c.status === novi) return;
      if (!PRELAZI[c.status]?.includes(novi)) throw new Error(`${ref}: nedozvoljen prelaz ${c.status} → ${novi}`);
      const staro = c.status;
      c.status = novi;
      if (["SENT", "POA_SENT", "AWAITING_DOCS"].includes(novi)) Object.assign(c, { poslednji_kontakt: danas, poslednji_kontakt_ko: "mi" });
      if (["CLIENT_REPLIED", "DOCS_RECEIVED", "POA_SIGNED"].includes(novi)) Object.assign(c, { poslednji_kontakt: danas, poslednji_kontakt_ko: "klijent" });
      c.istorija_statusa = { ...(c.istorija_statusa ?? {}) };
      c.istorija_statusa[novi] ??= sad;
      c.azurirano = sad;
      log(ref, `sistem: status ${staro} → ${novi}`);
    },
    log,
    /** Nov predmet (rezervni prijem sa Drive-a): upis u bazu odmah, da se ne napravi dvaput. */
    async novi(ref: string, podaci: Predmet) {
      const c = { ...podaci, ref };
      const red: RedPredmeta = { ref, verzija: 1, status: c.status, izvor_izmene: "server", podaci: ocisti(c), pregled: izracunajPregled(c, sadDatum) };
      if (!suvo && !(await servisi.baza.ubaci({ ...kolone(c), ref, pregled: red.pregled, verzija: 1, izvor_izmene: "server" }))) return false;
      stavke.set(ref, { red, c, izmenjen: false, log: [] });
      return true;
    },
    /** Ponovo učitaj iz baze (posle izmene koju je napravio neko drugi, npr. priprema ugovora sa sajta). */
    async osvezi(ref: string) {
      const sveze = await servisi.baza.predmet(ref);
      if (!sveze) return null;
      const s = stavka(ref);
      Object.assign(s, { red: sveze, c: structuredClone({ ...sveze.podaci, ref: sveze.ref, status: sveze.status }) });
      return s.c;
    },
    /** Red za pregled je zastareo (npr. „čeka dana“) — upis bez nove verzije predmeta. */
    async osveziPregled() {
      if (suvo) return 0;
      let n = 0;
      for (const s of stavke.values()) {
        if (s.izmenjen) continue;
        const pregled = izracunajPregled(s.c, sadDatum);
        if (JSON.stringify(pregled) === JSON.stringify(s.red.pregled)) continue;
        if (await servisi.baza.izmeni(s.c.ref, s.red.verzija, { pregled })) {
          s.red = { ...s.red, pregled };
          n++;
        }
      }
      return n;
    },
  };

  const ctx = {
    konfig,
    servisi,
    suvo,
    sad,
    danas,
    sat: satIz(sadDatum),
    sadDatum,
    predmeti,
    red: napraviRed(servisi.baza, poslovi, suvo),
    letovi,
    zadaci,
    izvestaj,
    dogadjaji: [] as any[],
    rezim(korak: ImeKoraka): Rezim {
      const r = konfig.koraci[korak] ?? "iskljuceno";
      return suvo && r === "auto" ? "predlog" : r;
    },
    korak(ime: ImeKoraka) {
      const s = (izvestaj[ime] ??= { rezim: ctx.rezim(ime), uradjeno: [], predlog: [], napomene: [], greske: [] });
      return {
        rezim: s.rezim,
        auto: s.rezim === "auto",
        uradjeno: (m: string) => s.uradjeno.push(m),
        predlog: (m: string) => { if (!s.predlog.includes(m)) s.predlog.push(m); },
        napomena: (m: string) => { if (!s.napomene.includes(m)) s.napomene.push(m); },
        greska: (m: string) => s.greske.push(m),
      };
    },
    /** Zadatak za čoveka. ko: niko | advokat | sistem. Bez ličnih podataka osim imena putnika. */
    zadatak({ ref = null, ko = "niko", vrsta, opis }: { ref?: string | null; ko?: Zadatak["ko"]; vrsta: string; opis: string }) {
      if (zadaci.some((z) => z.ref === ref && z.vrsta === vrsta)) return;
      zadaci.push({ ref, ko, vrsta, opis, od: danas });
    },
    izmenjeni: () => [...stavke.values()].filter((s) => s.izmenjen).map((s) => s.c.ref),

    /**
     * Upis izmena u bazu (jedan predmet ili sve izmenjene). Koraci ga zovu odmah posle spoljne radnje
     * (Gmail draft, poziv za potpis), da se ta radnja ne ponovi ako prolaz padne kasnije.
     */
    async sacuvaj(ref?: string) {
      if (suvo) return [];
      const neuspeli: string[] = [];
      for (const s of ref ? [stavka(ref)] : [...stavke.values()].filter((x) => x.izmenjen)) {
        if (!s.izmenjen) continue;
        let ok = false;
        for (let pokusaj = 0; pokusaj < 2 && !ok; pokusaj++) {
          const polja = { ...kolone(s.c), pregled: izracunajPregled(s.c, sadDatum), verzija: s.red.verzija + 1, izvor_izmene: "server" };
          ok = await servisi.baza.izmeni(s.c.ref, s.red.verzija, polja);
          if (ok) {
            s.red = { ...s.red, verzija: s.red.verzija + 1, status: s.c.status, podaci: polja.podaci, pregled: polja.pregled };
          } else {
            const sveze = await servisi.baza.predmet(s.c.ref);
            if (!sveze) break;
            s.c = spojiSaBazom(s.c, { ...sveze.podaci, ref: sveze.ref, status: sveze.status });
            s.red = sveze;
          }
        }
        if (!ok) {
          neuspeli.push(s.c.ref);
          continue;
        }
        if (s.log.length) await servisi.baza.dogadjaji(s.log.map((l) => ({ ref: s.c.ref, ...l })));
        s.log = [];
        s.izmenjen = false;
      }
      return neuspeli;
    },
  };
  return ctx;
}
