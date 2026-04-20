import { NextRequest, NextResponse } from "next/server";

import { clearAdminSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  await clearAdminSessionCookie();

  const protocol = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? request.nextUrl.host;

  return NextResponse.redirect(`${protocol}://${host}/admin/login`, {
    status: 303,
  });
}
