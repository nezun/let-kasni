import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const redirects: Record<string, string> = {
  "/blog/preusmeren-let-drugi-aerodrom-prava-putnika":
    "/naknada-za-kasnjenje-leta/preusmeren-let-drugi-aerodrom-prava-putnika",
  "/en/blog/flight-diverted-different-airport-passenger-rights":
    "/en/flight-delay-compensation/flight-diverted-different-airport-passenger-rights",
  "/blog/let-pomeren-ranije-prava-putnika":
    "/naknada-za-otkazan-let/let-pomeren-ranije-prava-putnika",
  "/en/blog/flight-moved-earlier-passenger-rights":
    "/en/flight-cancellation-compensation/flight-moved-earlier-passenger-rights",
};

export function proxy(request: NextRequest) {
  const redirectTarget = redirects[request.nextUrl.pathname];

  if (redirectTarget) {
    return NextResponse.redirect(new URL(redirectTarget, request.url), 308);
  }

  const requestHeaders = new Headers(request.headers);
  const locale = request.nextUrl.pathname.startsWith("/en") ? "en" : "sr";

  requestHeaders.set("x-site-locale", locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|opengraph-image|twitter-image|robots.txt|sitemap.xml).*)",
  ],
};
