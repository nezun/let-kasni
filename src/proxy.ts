import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const KOLACIC_STAGING = "lk_staging";

async function sha256(tekst: string) {
  const bajtovi = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(tekst));
  return Array.from(new Uint8Array(bajtovi), (b) => b.toString(16).padStart(2, "0")).join("");
}

function zatvoreno() {
  return new NextResponse("LetKasni staging — pristup samo za tim.", {
    status: 401,
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow, noarchive" },
  });
}

/**
 * Staging je samo za tim. Kad je STAGING_KLJUC podešen (samo na staging projektima), strana traži kolačić koji se
 * dobija jednom, otvaranjem linka sa ?staging=<ključ> (link ispisuje pipeline alati/linkovi.mjs). Produkcija nema
 * tu promenljivu, pa kapija tamo ne radi ništa. Vercel zaštita na Hobby planu ne pokriva glavni domen projekta.
 */
async function stagingKapija(request: NextRequest): Promise<NextResponse | null> {
  const kljuc = process.env.STAGING_KLJUC?.trim();
  if (!kljuc) return null;
  const ocekivano = await sha256(kljuc);
  const izLinka = request.nextUrl.searchParams.get("staging");
  if (izLinka !== null) {
    if ((await sha256(izLinka)) !== ocekivano) return zatvoreno();
    const cilj = request.nextUrl.clone();
    cilj.searchParams.delete("staging");
    const odgovor = NextResponse.redirect(cilj);
    odgovor.cookies.set(KOLACIC_STAGING, ocekivano, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 180 * 24 * 60 * 60 });
    return odgovor;
  }
  return request.cookies.get(KOLACIC_STAGING)?.value === ocekivano ? null : zatvoreno();
}

export async function proxy(request: NextRequest) {
  const kapija = await stagingKapija(request);
  if (kapija) return kapija;

  const requestHeaders = new Headers(request.headers);
  const locale = request.nextUrl.pathname.startsWith("/en") ? "en" : "sr";

  requestHeaders.set("x-site-locale", locale);

  const odgovor = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // ceo staging (staging.letkasni.rs) ostaje van pretrage, bez obzira na putanju
  if (request.headers.get("host")?.startsWith("staging.")) {
    odgovor.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  return odgovor;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|opengraph-image|twitter-image|robots.txt|sitemap.xml).*)",
  ],
};
