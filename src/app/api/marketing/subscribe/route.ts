import { NextResponse } from "next/server";

import { isValidEmail } from "@/lib/email-validation";
import { MarketingUnavailableError, requestMarketingSubscription } from "@/lib/marketing-consent-store";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  const email = typeof body?.email === "string" ? body.email : "";
  if (!isValidEmail(email) || body?.consent !== true || body?.adult !== true) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }
  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0]?.trim() || "unknown";
  if (isRateLimited(`marketing-subscribe-ip:${ip}`, { windowMs: 60_000, maxHits: 4 }) || isRateLimited(`marketing-subscribe-email:${email.trim().toLowerCase()}`, { windowMs: 60 * 60_000, maxHits: 3 })) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }
  try {
    const result = await requestMarketingSubscription({ email, locale: body?.locale === "en" ? "en" : "sr", sourcePath: typeof body?.sourcePath === "string" ? body.sourcePath : "/" });
    return NextResponse.json({ ok: true, status: result.status });
  } catch (error) {
    if (error instanceof MarketingUnavailableError) return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
    console.error("Marketing subscription request failed.", { error: error instanceof Error ? error.message : "unknown_error" });
    return NextResponse.json({ ok: false, error: "temporary_failure" }, { status: 503 });
  }
}
