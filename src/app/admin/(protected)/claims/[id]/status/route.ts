import { NextRequest, NextResponse } from "next/server";

import { updateClaimOperatorFields } from "@/lib/claims";
import type { ClaimRecord } from "@/lib/types";

function isOperatorStatus(
  value: string,
): value is ClaimRecord["operatorStatus"] {
  return [
    "new",
    "manual_review",
    "awaiting_customer",
    "ready_for_review",
    "closed",
  ].includes(value);
}

type Context = {
  params: Promise<{ id: string }>;
};

function getRedirectUrl(request: NextRequest, pathname: string) {
  const protocol =
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(":", "");
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.host;

  return `${protocol}://${host}${pathname}`;
}

export async function POST(request: NextRequest, context: Context) {
  const params = await context.params;
  const contentType = request.headers.get("content-type") ?? "";
  let operatorStatus = "";
  let operatorNotes = "";
  let nextAction = "";

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const body = await request.text();
    const searchParams = new URLSearchParams(body);
    operatorStatus = String(searchParams.get("operatorStatus") ?? "");
    operatorNotes = String(searchParams.get("operatorNotes") ?? "").trim();
    nextAction = String(searchParams.get("nextAction") ?? "").trim();
  } else {
    const formData = await request.formData();
    operatorStatus = String(formData.get("operatorStatus") ?? "");
    operatorNotes = String(formData.get("operatorNotes") ?? "").trim();
    nextAction = String(formData.get("nextAction") ?? "").trim();
  }

  if (!isOperatorStatus(operatorStatus)) {
    return NextResponse.redirect(
      getRedirectUrl(request, `/admin/claims/${params.id}?error=invalid_status`),
      {
        status: 303,
      },
    );
  }

  await updateClaimOperatorFields(params.id, {
    operatorStatus,
    operatorNotes,
    nextAction,
  });

  return NextResponse.redirect(
    getRedirectUrl(request, `/admin/claims/${params.id}?updated=1`),
    {
      status: 303,
    },
  );
}
