"use client";

import { withCurrentAttributionParameters } from "@/lib/attribution";

type Locale = "sr" | "en";
type Problem = "delay" | "cancelled" | "other";

/** Adresa forme. Formu služi aplikacija za klijente na istom domenu (multi-zone), pa se ide punim učitavanjem strane. */
export function adresaForme(locale: Locale, problem?: Problem) {
  const putanja = locale === "en" ? "/en/check-flight" : "/proveri-let";
  return problem ? `${putanja}?step=2&issue=${encodeURIComponent(problem)}` : putanja;
}

export function idiNaFormu(locale: Locale, problem?: Problem) {
  // poreklo klika iz oglasa (gclid, utm…) ide sa korisnikom u formu — samo uz pristanak za marketing (attribution.ts)
  window.location.href = withCurrentAttributionParameters(adresaForme(locale, problem));
}
