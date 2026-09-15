/* eslint-disable @typescript-eslint/no-explicit-any -- činjenice dolaze iz JSON-a agenta; oblik proverava cinjenice.ts */
import PREVOZIOCI_JSON from "./prevozioci.json" with { type: "json" };
import { analiza } from "./udaljenost.ts";

/**
 * EU261 / ECAA — pravila kao kod (prepis pipeline pravila/eu261.mjs, isti eval set u eval/slucajevi.json).
 * Agent Provera leta SAKUPLJA činjenice, ovaj modul ODLUČUJE: isti ulaz uvek daje isti nalaz.
 * Kad se SOP menja, menja se i ovaj fajl i eval set — inače `node --test` pada.
 */
const PREVOZIOCI = PREVOZIOCI_JSON as unknown as Record<string, { naziv: string; drzava: string; ecaa: boolean | null; poseban?: string }>;

export const PRAG_MIN = 180;
export const POJAS = { od: 165, do: 195 };
export const PROCENA_VRATA_MIN = { od: 0, do: 12 };
export const MARGINA_OTKAZIVANJE_MIN = 15;
const VANREDNI = new Set(["vreme", "vazdusni_prostor", "atc_strajk", "bezbednost", "ptica", "drzavni_organ"]);
const NIJE_VANREDNO = new Set(["tehnicki", "posada", "rotacija", "strajk_osoblja", "nepoznat"]);

const min = (a: number[]) => Math.min(...a);
const max = (a: number[]) => Math.max(...a);
const medijana = (a: number[]) => {
  const s = [...a].sort((x, y) => x - y);
  return s[Math.floor((s.length - 1) / 2)];
};
const t = (iso: string) => {
  if (!/(Z|[+-]\d{2}:?\d{2})$/.test(String(iso))) throw new Error(`Vreme „${iso}“ nema zonu — upiši lokalno sa +hh:mm`);
  const v = Date.parse(iso);
  if (Number.isNaN(v)) throw new Error(`Neispravno vreme „${iso}“ (očekujem ISO sa zonom)`);
  return v;
};
const minuta = (ms: number) => Math.round(ms / 60000);

export interface Kasnjenje {
  minimalno: number;
  centralno: number;
  maksimalno: number;
  mera: string;
}

/** Kašnjenje u dolasku kao raspon [minimalno, centralno, maksimalno] po protokolu uporedne analize. */
export function rasponKasnjenja(k: any): Kasnjenje | null {
  if (!k) return null;
  if (Array.isArray(k.procena_min) && k.procena_min.length === 2) {
    const [a, b] = k.procena_min;
    return { minimalno: a, centralno: Math.round((a + b) / 2), maksimalno: b, mera: "procena iz izvora (bez tačnih vremena)" };
  }
  const sta = (k.sta ?? []).map(t);
  const vrata = (k.vrata ?? []).map(t);
  const sletanje = (k.sletanje ?? []).map(t);
  if (!sta.length || (!vrata.length && !sletanje.length)) return null;
  const stvarno = vrata.length
    ? { nisko: min(vrata), sredina: medijana(vrata), visoko: max(vrata), mera: "vrata (on-block)" }
    : {
        nisko: min(sletanje) + PROCENA_VRATA_MIN.od * 60000,
        sredina: medijana(sletanje) + 5 * 60000,
        visoko: max(sletanje) + PROCENA_VRATA_MIN.do * 60000,
        mera: `sletanje + ${PROCENA_VRATA_MIN.od}–${PROCENA_VRATA_MIN.do} min procena vrata`,
      };
  return {
    minimalno: minuta(stvarno.nisko - max(sta)),
    centralno: minuta(stvarno.sredina - medijana(sta)),
    maksimalno: minuta(stvarno.visoko - min(sta)),
    mera: stvarno.mera,
  };
}

const kategorija = (km: number) => (km <= 1500 ? 1 : km <= 3500 ? 2 : 3);
const PRAG_UMANJENJA_MIN: Record<number, number> = { 1: 120, 2: 180, 3: 240 };

export interface Korak {
  korak: string;
  ishod: string;
  obrazlozenje: string;
}

export interface Nalaz {
  nalaz: "ELIGIBLE" | "POTENTIALLY_ELIGIBLE" | "NOT_ELIGIBLE" | "HUMAN_REVIEW";
  iznos_eur: number | null;
  iznos_pun_eur?: number;
  umanjenje_50?: boolean;
  km: number | null;
  granicno_km?: boolean;
  kasnjenje: Kasnjenje | null;
  granicno: boolean;
  sigurnost: "visoka" | "srednja" | "niska";
  koraci: Korak[];
  tvrdi_razlozi: string[];
  human_review: string[];
  sta_fali: string[];
}

export function proceni(c: any): Nalaz {
  const koraci: Korak[] = [];
  const tvrdo: string[] = [];
  const rucno: string[] = [];
  const fali: string[] = [];
  let granicno = false;
  const korak = (k: string, ishod: string, obrazlozenje: string) => koraci.push({ korak: k, ishod, obrazlozenje });

  // STEP 0 — definicija leta
  if (!c?.od || !c?.do) {
    return {
      nalaz: "HUMAN_REVIEW", koraci: [{ korak: "STEP 0", ishod: "NEPOTPUNO", obrazlozenje: "nema polaska ili krajnjeg odredišta" }],
      sta_fali: ["polazni aerodrom i krajnje odredište"], human_review: ["ruta nepoznata"], tvrdi_razlozi: [], iznos_eur: null, km: null, kasnjenje: null, granicno: false, sigurnost: "niska",
    };
  }
  const ruta = analiza(String(c.od).toUpperCase(), String(c.do).toUpperCase());
  if (ruta.greska !== undefined) {
    return {
      nalaz: "HUMAN_REVIEW", koraci: [{ korak: "STEP 0", ishod: "NEPOTPUNO", obrazlozenje: ruta.greska }], sta_fali: [ruta.greska],
      human_review: ["nepoznat aerodrom"], tvrdi_razlozi: [], iznos_eur: null, km: null, kasnjenje: null, granicno: false, sigurnost: "niska",
    };
  }

  // STEP 1 — režim
  const p = c.prevozilac ? PREVOZIOCI[String(c.prevozilac).toUpperCase()] : null;
  if (ruta.upozorenja.length) rucno.push(...ruta.upozorenja);
  if (ruta.od.ecaa) korak("STEP 1", "DA", `polazak iz ${ruta.od.drzava} (EU/ECAA), prevozilac nebitan`);
  else if (ruta.do.ecaa) {
    if (!p || p.ecaa == null) {
      korak("STEP 1", "REVIEW", `dolazak u ECAA, a operativni prevozilac ${c.prevozilac ?? "nije poznat"} nije u prevozioci.json`);
      rucno.push("operativni prevozilac nepoznat za ulazak u ECAA");
    } else if (p.poseban) {
      korak("STEP 1", "REVIEW", p.poseban);
      rucno.push(p.poseban);
    } else if (p.ecaa) korak("STEP 1", "DA", `dolazak u ECAA sa ECAA prevoziocem (${p.naziv}, ${p.drzava})`);
    else {
      korak("STEP 1", "NE", `dolazak u ECAA, ali ${p.naziv} (${p.drzava}) nije ECAA prevozilac`);
      tvrdo.push("ruta ne ulazi u EU261/ECAA");
    }
  } else {
    korak("STEP 1", "NE", "ruta potpuno van EU/ECAA");
    tvrdo.push("ruta ne ulazi u EU261/ECAA");
  }

  // STEP 2 — uslovi putnika
  if (c.tarifa === "besplatna") {
    korak("STEP 2", "NE", "besplatna karta / tarifa nedostupna javnosti");
    tvrdo.push("besplatna karta");
  } else korak("STEP 2", "DA", c.tarifa ? `tarifa: ${c.tarifa}` : "tarifa nije sporna");
  for (const o of c.okidaci ?? []) rucno.push(`okidač: ${o}`);

  // STEP 3 + 4 — tip poremećaja i prag
  let kasnjenje: Kasnjenje | null = null;
  let kasnjenjeZaUmanjenje: number | null = null;
  const km = ruta.km;
  switch (c.tip) {
    case "delay": {
      korak("STEP 3", "delay", "kašnjenje");
      kasnjenje = rasponKasnjenja(c.kasnjenje);
      if (!kasnjenje) {
        korak("STEP 4", "NEPOTPUNO", "nema planiranog i stvarnog dolaska");
        fali.push("stvarno vreme dolaska na krajnje odredište (i planirano sa karte)");
        break;
      }
      const { minimalno: a, maksimalno: b } = kasnjenje;
      const opis = `${a}–${b} min u dolasku (${kasnjenje.mera})`;
      if (a >= PRAG_MIN) {
        if (a < POJAS.do) {
          granicno = true;
          korak("STEP 4", "PROLAZI-GRANIČNO", `${opis}; u graničnom pojasu ${POJAS.od}–${POJAS.do}`);
          fali.push("potvrda plaćenim izvorom (granični pojas)");
        } else korak("STEP 4", "PROLAZI", opis);
      } else if (b < POJAS.od) {
        korak("STEP 4", "NE PROLAZI", opis);
        tvrdo.push(`kašnjenje u dolasku ispod ${PRAG_MIN} min`);
      } else {
        granicno = true;
        korak("STEP 4", "GRANIČNO", `${opis}; raspon ${b >= PRAG_MIN ? "seče prag" : "u graničnom pojasu ispod praga"}`);
        rucno.push("granični slučaj — plaćeni izvor pre odluke");
      }
      if (!granicno && a >= PRAG_MIN && (c.kasnjenje?.izvori_stvarno ?? 0) < 2) fali.push("drugi nezavisan izvor za stvarno vreme dolaska");
      break;
    }
    case "cancellation": {
      korak("STEP 3", "cancellation", "otkazivanje");
      const o = c.otkazivanje ?? {};
      if (o.obavesten_dana_pre == null) {
        korak("STEP 4", "NEPOTPUNO", "nije poznato kada je putnik obavešten");
        fali.push("datum obaveštenja o otkazivanju");
        break;
      }
      if (o.obavesten_dana_pre >= 14) {
        korak("STEP 4", "NE PROLAZI", `obavešten ${o.obavesten_dana_pre} dana pre`);
        tvrdo.push("obaveštenje 14+ dana pre leta");
        break;
      }
      const [ranije, kasnije] = o.obavesten_dana_pre >= 7 ? [120, 240] : [60, 120];
      if (o.alternativa_polazak_ranije_min == null || o.alternativa_dolazak_kasnije_min == null) {
        korak("STEP 4", "NEPOTPUNO", `obavešten ${o.obavesten_dana_pre} dana pre; fali alternativni let`);
        fali.push("vreme polaska i dolaska alternativnog leta");
        break;
      }
      kasnjenjeZaUmanjenje = o.alternativa_dolazak_kasnije_min;
      const stiti = o.alternativa_polazak_ranije_min <= ranije && o.alternativa_dolazak_kasnije_min < kasnije;
      const blizu =
        Math.abs(o.alternativa_dolazak_kasnije_min - kasnije) <= MARGINA_OTKAZIVANJE_MIN ||
        Math.abs(o.alternativa_polazak_ranije_min - ranije) <= MARGINA_OTKAZIVANJE_MIN;
      const opis = `obavešten ${o.obavesten_dana_pre} d pre; alternativa polazi ${o.alternativa_polazak_ranije_min} min ranije, stiže ${o.alternativa_dolazak_kasnije_min} min kasnije (granica ${ranije}/${kasnije})`;
      if (stiti) {
        korak("STEP 4", blizu ? "GRANIČNO" : "NE PROLAZI", opis);
        if (blizu) {
          granicno = true;
          rucno.push("alternativni let na granici izuzetka — potvrda on-block vremena");
        } else tvrdo.push("alternativni let u granicama izuzetka");
      } else if (blizu) {
        granicno = true;
        korak("STEP 4", "PROLAZI-GRANIČNO", opis);
        fali.push("potvrda on-block vremena alternativnog leta (margina ≤ 15 min)");
      } else korak("STEP 4", "PROLAZI", opis);
      if (!blizu && !stiti && (o.izvori_stvarno ?? 0) < 2) fali.push("drugi nezavisan izvor za dolazak alternativnog leta");
      break;
    }
    case "denied_boarding": {
      korak("STEP 3", "denied_boarding", "uskraćeno ukrcavanje");
      const u = c.uskracivanje ?? {};
      if (u.dobrovoljno === true) {
        korak("STEP 4", "NE PROLAZI", "putnik se dobrovoljno odrekao mesta");
        tvrdo.push("dobrovoljno odricanje");
      } else if (u.opravdan_razlog === true) {
        korak("STEP 4", "NE PROLAZI", "opravdan razlog (zdravlje, bezbednost, dokumenta)");
        tvrdo.push("opravdano uskraćivanje");
      } else if (u.dobrovoljno == null || u.opravdan_razlog == null) {
        korak("STEP 4", "NEPOTPUNO", "nije jasno da li je uskraćivanje bilo protiv volje i bez opravdanog razloga");
        fali.push("okolnosti uskraćivanja (overbooking?)");
      } else korak("STEP 4", "PROLAZI", "uskraćeno protiv volje, bez opravdanog razloga");
      kasnjenjeZaUmanjenje = u.alternativa_dolazak_kasnije_min ?? null;
      break;
    }
    default:
      korak("STEP 3", "other", "nije kašnjenje, otkazivanje ni uskraćeno ukrcavanje");
      rucno.push("tip poremećaja van fiksne naknade — posebna prava (prtljag, nega, downgrade)");
  }

  // STEP 5 — vanredne okolnosti (ne važi za denied boarding)
  if (["delay", "cancellation"].includes(c.tip)) {
    const u = c.uzrok ?? "nepoznat";
    if (VANREDNI.has(u)) {
      korak("STEP 5", "REVIEW", `potencijalno vanredna okolnost: ${u}`);
      rucno.push(`EXTRAORDINARY_CIRCUMSTANCES_REVIEW (${u})`);
    } else if (u === "carrier_tvrdi_vanredne") {
      korak("STEP 5", "REVIEW", "prevozilac tvrdi vanredne okolnosti, dokazi nisu jasni");
      rucno.push("EXTRAORDINARY_CIRCUMSTANCES_REVIEW (tvrdnja prevozioca)");
    } else if (NIJE_VANREDNO.has(u)) korak("STEP 5", "NEMA NAZNAKA", u === "nepoznat" ? "uzrok nepoznat — nije osnov za odbijanje" : `uzrok ${u} nije vanredna okolnost`);
    else throw new Error(`Nepoznat uzrok „${u}“`);
  }

  // STEP 6 — iznos
  const pun = ruta.iznos_eur;
  const kat = kategorija(km);
  const umanjenje = kasnjenjeZaUmanjenje != null && kasnjenjeZaUmanjenje <= PRAG_UMANJENJA_MIN[kat];
  const iznos = umanjenje ? pun / 2 : pun;
  korak(
    "STEP 6",
    `${iznos} €`,
    `${km} km → ${pun} €${umanjenje ? `, umanjeno 50% (alternativa stigla ${kasnjenjeZaUmanjenje} min kasnije, granica ${PRAG_UMANJENJA_MIN[kat]})` : ""}${ruta.granicno ? " — granična udaljenost, navedi izračun" : ""}`,
  );

  const nalaz = tvrdo.length ? "NOT_ELIGIBLE" : rucno.length ? "HUMAN_REVIEW" : fali.length ? "POTENTIALLY_ELIGIBLE" : "ELIGIBLE";
  const izvori = c.tip === "cancellation" ? c.otkazivanje?.izvori_stvarno : c.kasnjenje?.izvori_stvarno;
  const sigurnost = (izvori ?? 0) >= 2 && !granicno ? "visoka" : (izvori ?? 0) >= 1 ? "srednja" : "niska";

  return {
    nalaz,
    iznos_eur: nalaz === "NOT_ELIGIBLE" ? null : iznos,
    iznos_pun_eur: pun,
    umanjenje_50: umanjenje,
    km,
    granicno_km: ruta.granicno,
    kasnjenje,
    granicno,
    sigurnost,
    koraci,
    tvrdi_razlozi: tvrdo,
    human_review: rucno,
    sta_fali: fali,
  };
}

/** Kratak izveštaj nalaza (deo koji piše kod, ne agent). */
export function tekstNalaza(r: Nalaz) {
  const redovi = r.koraci.map((k) => `${k.korak.padEnd(7)} ${String(k.ishod).padEnd(18)} ${k.obrazlozenje}`);
  return [
    ...redovi,
    "",
    `NALAZ: ${r.nalaz}`,
    r.kasnjenje ? `KAŠNJENJE U DOLASKU: min ${r.kasnjenje.minimalno} · centralno ${r.kasnjenje.centralno} · max ${r.kasnjenje.maksimalno} (${r.kasnjenje.mera})` : null,
    `SIGURNOST: ${r.sigurnost}${r.granicno ? " · GRANIČNO" : ""}`,
    r.human_review.length ? `HUMAN_REVIEW: ${r.human_review.join("; ")}` : null,
    r.tvrdi_razlozi.length ? `RAZLOG: ${r.tvrdi_razlozi.join("; ")}` : null,
    `ŠTA FALI: ${r.sta_fali.length ? r.sta_fali.join("; ") : "ništa"}`,
  ]
    .filter((x) => x != null)
    .join("\n");
}
