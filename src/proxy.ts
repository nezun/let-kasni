import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
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
