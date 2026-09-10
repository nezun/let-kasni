import { NextResponse } from "next/server";

import {
  getAnalyticsMode,
  getMetaConversionsApiToken,
  getMetaPixelId,
  getSupportEmail,
  isAdminPasswordConfigured,
  isMarketingSubscriptionsEnabled,
  isSupabaseConfigured,
} from "@/lib/env";
import { getFlightProviderMode } from "@/lib/env";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "letkasni-phase1",
      timestamp: new Date().toISOString(),
      deployment: {
        gitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
        deploymentId: process.env.VERCEL_DEPLOYMENT_ID ?? null,
      },
      checks: {
        supabaseConfigured: isSupabaseConfigured(),
        localAdminFallbackConfigured: isAdminPasswordConfigured(),
        flightProviderMode: getFlightProviderMode() ?? "off",
        analyticsMode: getAnalyticsMode() ?? "off",
        metaCapiConfigured: Boolean(getMetaPixelId() && getMetaConversionsApiToken()),
        marketingSubscriptionsEnabled: isMarketingSubscriptionsEnabled(),
        supportEmail: getSupportEmail(),
      },
    },
    {
      status: 200,
      headers: {
        "cache-control": "no-store",
      },
    },
  );
}
