import { NextRequest, NextResponse } from "next/server";

import {
  clearAdminSessionCookie,
  createAdminSession,
  setAdminSessionCookie,
} from "@/lib/auth";

function getRedirectUrl(request: NextRequest, pathname: string) {
  const protocol = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.host;
  return `${protocol}://${host}${pathname}`;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  const result = await createAdminSession(email, password);

  if (!result.ok) {
    return NextResponse.redirect(
      getRedirectUrl(
        request,
        `/admin/login?error=${encodeURIComponent(result.error)}`,
      ),
      { status: 303 },
    );
  }

  const requestUrl = new URL(request.url);
  const isLocalHost =
    requestUrl.hostname === "localhost" || requestUrl.hostname === "127.0.0.1";

  await setAdminSessionCookie(result.cookieValue, {
    secure: requestUrl.protocol === "https:" && !isLocalHost,
  });

  return NextResponse.redirect(getRedirectUrl(request, "/admin/claims"), {
    status: 303,
  });
}

export async function DELETE() {
  await clearAdminSessionCookie();
  return NextResponse.json({ ok: true, redirectTo: "/admin/login" });
}
