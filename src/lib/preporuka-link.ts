import { NextResponse, type NextRequest } from "next/server";

// Kratak link za preporuku: /p/{KOD} i /en/p/{KOD} vode na formu sa kodom i UTM oznakama. Kod je samo A–Z, 0–9 i
// „-“, najviše 20 znakova (mala slova se prevode u velika); sve ostalo vodi na formu bez parametara.
const KOD = /^[A-Z0-9-]{1,20}$/;

export function preporukaRedirect(request: NextRequest, rawKod: string, formPath: "/proveri-let" | "/en/check-flight") {
  const kod = rawKod.trim().toUpperCase();
  const target = new URL(formPath, request.url);
  if (KOD.test(kod)) {
    target.searchParams.set("preporuka", kod);
    target.searchParams.set("utm_source", "preporuka");
    target.searchParams.set("utm_medium", "referral");
    target.searchParams.set("utm_campaign", "preporuka");
  }
  const response = NextResponse.redirect(target, 302);
  response.headers.set("x-robots-tag", "noindex, nofollow, noarchive");
  response.headers.set("cache-control", "private, no-store");
  return response;
}
