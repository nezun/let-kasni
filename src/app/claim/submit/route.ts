import { NextResponse } from "next/server";

import { createOrReuseClaim } from "@/lib/claims";
import { sendAdminClaimNotification } from "@/lib/notifications";
import { isRateLimited } from "@/lib/rate-limit";
import type { ClaimInput, IssueType } from "@/lib/types";

function isIssueType(value: string): value is IssueType {
  return [
    "delay_3h_plus",
    "missed_connection_same_booking",
    "denied_boarding",
    "other",
  ].includes(value);
}

function validateInput(body: unknown): ClaimInput | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const data = body as Record<string, unknown>;

  if (
    typeof data.flightNumber !== "string" ||
    typeof data.flightDate !== "string" ||
    typeof data.route !== "string" ||
    typeof data.email !== "string" ||
    typeof data.issueType !== "string" ||
    !isIssueType(data.issueType)
  ) {
    return null;
  }

  const normalized: ClaimInput = {
    flightNumber: data.flightNumber.trim(),
    flightDate: data.flightDate.trim(),
    route: data.route.trim(),
    email: data.email.trim(),
    issueType: data.issueType,
    firstName:
      typeof data.firstName === "string" && data.firstName.trim().length > 0
        ? data.firstName.trim()
        : undefined,
    lastName:
      typeof data.lastName === "string" && data.lastName.trim().length > 0
        ? data.lastName.trim()
        : undefined,
    phone:
      typeof data.phone === "string" && data.phone.trim().length > 0
        ? data.phone.trim()
        : undefined,
    website:
      typeof data.website === "string" && data.website.trim().length > 0
        ? data.website.trim()
        : undefined,
  };

  if (
    !normalized.flightNumber ||
    !normalized.flightDate ||
    !normalized.route ||
    !normalized.email ||
    normalized.website
  ) {
    return null;
  }

  return normalized;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const input = validateInput(body);

  if (!input) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_input",
      },
      { status: 400 },
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for") ?? "unknown";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  const emailKey = input.email.trim().toLowerCase();

  if (
    isRateLimited(`claim-ip:${ip}`, { windowMs: 60_000, maxHits: 6 }) ||
    isRateLimited(`claim-email:${emailKey}`, { windowMs: 10 * 60_000, maxHits: 3 })
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: "rate_limited",
      },
      { status: 429 },
    );
  }

  const { claim, reused } = await createOrReuseClaim(input);

  if (!reused) {
    sendAdminClaimNotification(claim).catch((error) => {
      console.error("Failed to send admin claim notification.", error);
    });
  }

  return NextResponse.json({
    ok: true,
    reused,
    claim: {
      id: claim.id,
      verdictTitle: claim.verdictTitle,
      verdictBody: claim.verdictBody,
      verdict: claim.verdict,
      operatorStatus: claim.operatorStatus,
      providerStatus: claim.providerSnapshot.status,
    },
  });
}
