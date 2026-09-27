import { getCrmUrl } from "@/lib/env";

/**
 * Podaci za stranu „Letovi koji su kasnili“ (opis: ~/Documents/Letkasni/marketing/opis-letovi-koji-su-kasnili.md).
 * Izvor je javni izvoz BEG audita, preko CRM endpointa GET {CRM_URL}/api/javno/letovi-kasnili — samo javne kolone,
 * bez internih ocena (claim_decision, eu261_scope, rules_finding, compensation_band, final_circumstances_status) i
 * bez ičega o predmetima ili putnicima. U repo se ne čuva nijedan podatak o letu; strana ga dohvata uživo (ISR).
 *
 * Očekivan oblik odgovora (dogovoren sa CTO-om/CRM-om, endpoint je u izradi 27.09.2026):
 * { azurirano: "2026-09-27T12:05:00+02:00", letovi: [ {
 *   datum: "2026-09-26", brojLeta: "JU 385", codeshareBrojevi: ["LH 1491"], aviokompanija: "Air Serbia",
 *   polazniGrad: "Beograd", polazniIata: "BEG", odredisniGrad: "Frankfurt", odredisniIata: "FRA",
 *   smer: "polazak" | "dolazak", planiranoVreme: "2026-09-26T14:30:00+02:00",
 *   stvarnoVreme: "2026-09-26T18:10:00+02:00" | null, kasnjenjeMinuta: 220 | null,
 *   status: "kasnio" | "otkazan" | "preusmeren",
 * } ] }
 */

export type LetStatus = "kasnio" | "otkazan" | "preusmeren";

export type ZakasneliLet = {
  datum: string;
  brojLeta: string;
  codeshareBrojevi: string[];
  aviokompanija: string;
  polazniGrad: string;
  polazniIata: string;
  odredisniGrad: string;
  odredisniIata: string;
  smer: "polazak" | "dolazak";
  planiranoVreme: string;
  stvarnoVreme: string | null;
  kasnjenjeMinuta: number | null;
  status: LetStatus;
};

export type ZakasneliLetoviOdgovor = {
  letovi: ZakasneliLet[];
  azurirano: string | null;
  /** false znači da podaci nisu dostupni (CRM_URL nije podešen, endpoint ne radi, ili je odgovor neispravan). */
  dostupno: boolean;
};

const prazanOdgovor: ZakasneliLetoviOdgovor = { letovi: [], azurirano: null, dostupno: false };

function jeString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function normalizujLet(sirovo: unknown): ZakasneliLet | null {
  if (typeof sirovo !== "object" || sirovo === null) return null;
  const l = sirovo as Record<string, unknown>;
  if (
    !jeString(l.datum) ||
    !jeString(l.brojLeta) ||
    !jeString(l.aviokompanija) ||
    !jeString(l.polazniGrad) ||
    !jeString(l.polazniIata) ||
    !jeString(l.odredisniGrad) ||
    !jeString(l.odredisniIata) ||
    !jeString(l.planiranoVreme) ||
    (l.smer !== "polazak" && l.smer !== "dolazak") ||
    (l.status !== "kasnio" && l.status !== "otkazan" && l.status !== "preusmeren")
  ) {
    return null;
  }
  return {
    datum: l.datum,
    brojLeta: l.brojLeta,
    codeshareBrojevi: Array.isArray(l.codeshareBrojevi) ? l.codeshareBrojevi.filter(jeString) : [],
    aviokompanija: l.aviokompanija,
    polazniGrad: l.polazniGrad,
    polazniIata: l.polazniIata,
    odredisniGrad: l.odredisniGrad,
    odredisniIata: l.odredisniIata,
    smer: l.smer,
    planiranoVreme: l.planiranoVreme,
    stvarnoVreme: jeString(l.stvarnoVreme) ? l.stvarnoVreme : null,
    kasnjenjeMinuta: typeof l.kasnjenjeMinuta === "number" ? l.kasnjenjeMinuta : null,
    status: l.status,
  };
}

/**
 * Dohvata spisak letova. Nikad ne baca grešku: ako CRM_URL nije podešen, endpoint ne odgovori na vreme (5 s) ili
 * vrati neispravan oblik, strana dobija prazan spisak i dostupno:false, pa prikazuje objašnjenje umesto pada strane.
 */
export async function getZakasneliLetovi(): Promise<ZakasneliLetoviOdgovor> {
  const base = getCrmUrl();
  if (!base) return prazanOdgovor;

  try {
    const kontrolor = new AbortController();
    const vreme = setTimeout(() => kontrolor.abort(), 5000);
    const odgovor = await fetch(`${base}/api/javno/letovi-kasnili`, {
      signal: kontrolor.signal,
      next: { revalidate: 3600 },
    }).finally(() => clearTimeout(vreme));

    if (!odgovor.ok) return prazanOdgovor;

    const telo = (await odgovor.json()) as unknown;
    if (typeof telo !== "object" || telo === null || !Array.isArray((telo as Record<string, unknown>).letovi)) {
      return prazanOdgovor;
    }

    const letovi = (telo as { letovi: unknown[] }).letovi
      .map(normalizujLet)
      .filter((l): l is ZakasneliLet => l !== null)
      .sort((a, b) => b.planiranoVreme.localeCompare(a.planiranoVreme));

    const azurirano = jeString((telo as Record<string, unknown>).azurirano)
      ? ((telo as Record<string, unknown>).azurirano as string)
      : null;

    return { letovi, azurirano, dostupno: true };
  } catch {
    return prazanOdgovor;
  }
}

const enMonthsShort = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Delovi datuma/vremena iz ISO stringa TAČNO kako piše (npr. "…T14:30:00+02:00"), bez pretvaranja kroz UTC —
 *  vreme leta je uvek lokalno vreme aerodroma, pa se ne sme pomeriti prevodom u drugu zonu. */
function delovi(iso: string) {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?/);
  if (!m) return null;
  return {
    godina: m[1],
    mesec: Number(m[2]),
    dan: m[3],
    sat: m[4] ?? null,
    minut: m[5] ?? null,
  };
}

/** Kratak datum bez naziva meseca (samo cifre za SR, da nema rizika od ćirilice): "26.09." / "26 Sep". */
export function kratakDatum(iso: string, locale: "sr" | "en") {
  const d = delovi(iso);
  if (!d) return iso;
  const mesecStr = String(d.mesec).padStart(2, "0");
  return locale === "sr" ? `${d.dan}.${mesecStr}.` : `${d.dan} ${enMonthsShort[d.mesec - 1]}`;
}

/** Vreme HH:mm iz ISO stringa, ili "—" ako sat/minut nisu poznati (npr. otkazan let bez stvarnog vremena). */
export function vremeHHmm(iso: string | null) {
  if (!iso) return "—";
  const d = delovi(iso);
  return d?.sat && d.minut ? `${d.sat}:${d.minut}` : "—";
}

/** Kašnjenje kao "4 h 10 min" (SR) / "4h 10m" (EN), ili "—" ako nije poznato. */
export function formatKasnjenje(minuti: number | null, locale: "sr" | "en") {
  if (minuti === null || minuti < 0) return "—";
  const h = Math.floor(minuti / 60);
  const min = minuti % 60;
  if (locale === "sr") return h > 0 ? `${h} h ${min} min` : `${min} min`;
  return h > 0 ? `${h}h ${min}m` : `${min}m`;
}
