import type { NextRequest } from "next/server";

import { preporukaRedirect } from "@/lib/preporuka-link";

export async function GET(request: NextRequest, { params }: { params: Promise<{ kod: string }> }) {
  return preporukaRedirect(request, (await params).kod, "/proveri-let");
}

export const HEAD = GET;
