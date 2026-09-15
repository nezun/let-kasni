import AERODROMI_JSON from "./airports.json" with { type: "json" };

/**
 * Udaljenost po velikom krugu, iznos po EU261 i ECAA status krajnjih tačaka
 * (isto kao scripts/distance.mjs u pipeline-u).
 * Iznos: ≤1500 km 250 €; 1500–3500 km 400 €; >3500 km 400 € ako su oba kraja u EU, inače 600 €.
 */
const AERODROMI = AERODROMI_JSON as unknown as Record<string, [number, number, string]>;

const EU = new Set(["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"]);
const ECAA_DODATNI = new Set(["NO", "IS", "RS", "ME", "BA", "MK", "AL", "XK"]);
const POSEBAN_REZIM: Record<string, string> = { CH: "Švajcarska — poseban bilateralni režim, HUMAN_REVIEW", GB: "UK — UK261, HUMAN_REVIEW" };

export interface StatusAerodroma {
  iata: string;
  poznat: boolean;
  lat?: number;
  lon?: number;
  drzava?: string;
  eu?: boolean;
  ecaa?: boolean;
  poseban?: string | null;
}

export function status(iata: string): StatusAerodroma {
  const a = AERODROMI[iata];
  if (!a) return { iata, poznat: false };
  const [lat, lon, drzava] = a;
  return { iata, poznat: true, lat, lon, drzava, eu: EU.has(drzava), ecaa: EU.has(drzava) || ECAA_DODATNI.has(drzava), poseban: POSEBAN_REZIM[drzava] ?? null };
}

export function km(a: string, b: string) {
  const R = 6371.0088;
  const r = Math.PI / 180;
  const [la1, lo1] = AERODROMI[a];
  const [la2, lo2] = AERODROMI[b];
  const dLat = (la2 - la1) * r;
  const dLon = (lo2 - lo1) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1 * r) * Math.cos(la2 * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function iznos(kmVal: number, obaUEu: boolean) {
  if (kmVal <= 1500) return 250;
  if (kmVal <= 3500) return 400;
  return obaUEu ? 400 : 600;
}

export type AnalizaRute =
  | { greska: string }
  | { greska?: undefined; od: StatusAerodroma; do: StatusAerodroma; km: number; iznos_eur: number; granicno: boolean; upozorenja: string[] };

export function analiza(od: string, doo: string): AnalizaRute {
  const s1 = status(od);
  const s2 = status(doo);
  if (!s1.poznat || !s2.poznat) return { greska: `Nepoznat aerodrom: ${!s1.poznat ? od : doo}. Dodaj ga u airports.json.` };
  const d = km(od, doo);
  return {
    od: s1,
    do: s2,
    km: Math.round(d),
    iznos_eur: iznos(d, !!(s1.eu && s2.eu)),
    granicno: Math.abs(d - 1500) < 60 || Math.abs(d - 3500) < 60,
    upozorenja: [s1.poseban, s2.poseban].filter((x): x is string => !!x),
  };
}
