import { ImageResponse } from "next/og";

import { SocialPreviewCard } from "@/components/social-preview-card";
import type { SocialPreviewLocale } from "@/lib/social-preview";

export const runtime = "edge";

export function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const locale = searchParams.get("locale");
  const resolvedLocale: SocialPreviewLocale = locale === "en" ? "en" : "sr";

  return new ImageResponse(<SocialPreviewCard locale={resolvedLocale} />, {
    width: 1200,
    height: 630,
  });
}
