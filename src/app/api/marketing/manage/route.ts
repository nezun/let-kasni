import { NextResponse } from "next/server";

import { isValidEmail } from "@/lib/email-validation";
import { MarketingUnavailableError, requestMarketingManagementLink } from "@/lib/marketing-consent-store";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const email = typeof body?.email === "string" ? body.email : "";
  if (!isValidEmail(email)) return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0]?.trim() || "unknown";
  if (isRateLimited(`marketing-manage-ip:${ip}`, { windowMs: 60_000, maxHits: 4 }) || isRateLimited(`marketing-manage-email:${email.trim().toLowerCase()}`, { windowMs: 60 * 60_000, maxHits: 3 })) return NextResponse.json({ ok: true, status: "accepted" });
  try {
    await requestMarketingManagementLink({ email, locale: body?.locale === "en" ? "en" : "sr", sourcePath: typeof body?.sourcePath === "string" ? body.sourcePath : "/email-offers" });
    return NextResponse.json({ ok: true, status: "accepted" });
  } catch (error) {
    if (error instanceof MarketingUnavailableError) return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
    console.error("Marketing management-link request failed.", { error: error instanceof Error ? error.message : "unknown_error" });
    return NextResponse.json({ ok: true, status: "accepted" });
  }
}
