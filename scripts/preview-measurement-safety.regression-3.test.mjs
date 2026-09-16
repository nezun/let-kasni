import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Regression: Preview QA could not verify email side effects without key access.
// Found by /qa on 2026-09-16. Report: docs/GOOGLE-ADS-FINAL-QA-2026-09-16.md.
// Executes the real health route, not a synthesized safety response.
const source = ts.transpileModule(readFileSync(new URL("../src/app/api/health/route.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

async function health(environment, configured) {
  const module = { exports: {} };
  const env = {
    getAnalyticsMode: () => "ga4", getSupportEmail: () => "qa@example.invalid",
    getMetaConversionsApiToken: () => undefined, getMetaPixelId: () => undefined,
    isAdminPasswordConfigured: () => false, isMarketingSubscriptionsEnabled: () => false,
    isSupabaseConfigured: () => false, getFlightProviderMode: () => "off",
    getResendApiKey: () => configured ? "TEST_NOT_A_CREDENTIAL" : undefined,
    getResendAdminToEmail: () => configured ? "TEST_PRIVATE_RECIPIENT@example.invalid" : undefined,
  };
  vm.runInNewContext(source, {
    module, exports: module.exports, process: { env: { VERCEL_ENV: environment } }, Date,
    require: (name) => {
      if (name === "@/lib/env") return env;
      if (name === "next/server") return { NextResponse: { json: (body, options) => Response.json(body, options) } };
      throw new Error(`Unexpected health dependency ${name}`);
    },
  });
  const response = await module.exports.GET();
  assert.equal(response.headers.get("cache-control"), "no-store");
  return response.json();
}

test("Preview health exposes only email configuration booleans, not secret/recipient values", async () => {
  for (const configured of [false, true]) {
    const body = await health("preview", configured);
    assert.equal(body.previewQa.claimEmailTransportConfigured, configured);
    assert.equal(body.previewQa.adminClaimEmailRecipientConfigured, configured);
    assert.equal(JSON.stringify(body).includes("TEST_NOT_A_CREDENTIAL"), false);
    assert.equal(JSON.stringify(body).includes("TEST_PRIVATE_RECIPIENT"), false);
  }
});

test("Production/development health output has no Preview QA fields", async () => {
  for (const environment of ["production", "development", undefined]) {
    assert.equal(Object.hasOwn(await health(environment, true), "previewQa"), false);
  }
});
