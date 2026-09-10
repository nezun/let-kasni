import { NextResponse } from "next/server";

import { MarketingUnavailableError, unsubscribeMarketing } from "@/lib/marketing-consent-store";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? await request.json().catch(() => null) as Record<string, unknown> | null
    : Object.fromEntries((await request.formData().catch(() => new FormData())).entries());
  const urlToken = new URL(request.url).searchParams.get("token");
  const token = typeof body?.token === "string" ? body.token : urlToken ?? "";
  if (!/^[A-Za-z0-9_-]{40,80}$/.test(token)) return NextResponse.json({ ok: false, error: "invalid_token" }, { status: 400 });
  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0]?.trim() || "unknown";
  if (isRateLimited(`marketing-unsubscribe-ip:${ip}`, { windowMs: 60_000, maxHits: 20 })) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  try {
    const result = await unsubscribeMarketing(token);
    return NextResponse.json({ ok: result.status === "withdrawn", status: result.status }, { status: result.status === "invalid" ? 400 : 200 });
  } catch (error) {
    if (error instanceof MarketingUnavailableError) return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
    console.error("Marketing unsubscribe failed.", { error: error instanceof Error ? error.message : "unknown_error" });
    return NextResponse.json({ ok: false, error: "temporary_failure" }, { status: 503 });
  }
}
