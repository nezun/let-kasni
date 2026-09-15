import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const attributionCoreSource = readFileSync(
  new URL("../src/lib/attribution-core.ts", import.meta.url),
  "utf8",
);
const attributionCoreModule = ts.transpileModule(attributionCoreSource, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const {
  appendAttributionParameters,
  getAttributionFromPage,
  hasPaidAttribution,
  mergeAttribution,
  sanitizeClaimAttribution,
} = await import(
  `data:text/javascript;base64,${Buffer.from(attributionCoreModule).toString("base64")}`
);

const capturedAt = "2026-09-15T08:00:00.000Z";

test("captures allowlisted click IDs and campaign parameters without URL query PII", () => {
  const result = getAttributionFromPage(
    "https://letkasni.rs/?gclid=TEST_GCLID_123&utm_source=google&utm_medium=cpc&utm_campaign=SEARCH_RS_CORE&utm_term=naknada-test&email=private%40example.com",
    "https://www.google.com/search?q=private-query",
    capturedAt,
  );

  assert.deepEqual(result, {
    gclid: "TEST_GCLID_123",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "SEARCH_RS_CORE",
    utm_term: "naknada-test",
    initial_landing_page: "https://letkasni.rs/",
    referrer: "https://www.google.com/search",
    captured_at: capturedAt,
  });
});

test("preserves the first paid touch instead of replacing it with navigation", () => {
  const firstPaid = getAttributionFromPage(
    "https://letkasni.rs/?gclid=FIRST&utm_medium=cpc",
    "https://google.com/",
    capturedAt,
  );
  const internalPage = getAttributionFromPage(
    "https://letkasni.rs/proveri-let?step=2",
    "https://letkasni.rs/",
    "2026-09-15T08:05:00.000Z",
  );

  assert.ok(firstPaid);
  assert.ok(internalPage);
  assert.equal(hasPaidAttribution(firstPaid), true);
  assert.deepEqual(mergeAttribution(firstPaid, internalPage), firstPaid);
});

test("replaces an earlier organic touch when the first paid touch arrives", () => {
  const organic = getAttributionFromPage(
    "https://letkasni.rs/blog",
    "https://example.com/",
    capturedAt,
  );
  const paid = getAttributionFromPage(
    "https://letkasni.rs/?wbraid=PAID&utm_medium=paid_search",
    "https://google.com/",
    "2026-09-15T09:00:00.000Z",
  );

  assert.ok(organic);
  assert.ok(paid);
  assert.deepEqual(mergeAttribution(organic, paid), paid);
});

test("forwards attribution through the focused-flow navigation", () => {
  assert.equal(
    appendAttributionParameters(
      "/proveri-let?step=2&issue=delay",
      "https://letkasni.rs/?gclid=TEST&utm_source=google&utm_medium=cpc&untrusted=x",
    ),
    "/proveri-let?step=2&issue=delay&gclid=TEST&utm_source=google&utm_medium=cpc",
  );
});

test("server sanitizer accepts only bounded structured attribution", () => {
  const result = sanitizeClaimAttribution({
    gclid: "X".repeat(600),
    email: "must-not-survive@example.com",
    initial_landing_page: "https://letkasni.rs/?email=private@example.com",
    referrer: "https://google.com/search?q=private",
    captured_at: capturedAt,
  });

  assert.equal(result?.gclid?.length, 500);
  assert.equal(result?.initial_landing_page, "https://letkasni.rs/");
  assert.equal(result?.referrer, "https://google.com/search");
  assert.equal("email" in (result ?? {}), false);
});

test("emits exactly one lead_submit for the same successful claim ID", () => {
  const source = readFileSync(
    new URL("../src/lib/google-tracking.ts", import.meta.url),
    "utf8",
  ).replace(
    'import { hasAnalyticsConsent, hasMarketingConsent } from "@/lib/consent";',
    "const hasAnalyticsConsent = () => true; const hasMarketingConsent = () => true;",
  );
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  const sessionValues = new Map();
  const gtagCalls = [];
  const module = { exports: {} };
  const window = {
    dataLayer: [],
    gtag: (...args) => gtagCalls.push(args),
    location: { pathname: "/proveri-let" },
    sessionStorage: {
      getItem: (key) => sessionValues.get(key) ?? null,
      setItem: (key, value) => sessionValues.set(key, value),
    },
  };

  vm.runInNewContext(compiled, { module, exports: module.exports, window });
  const input = {
    claimId: "00000000-0000-4000-8000-000000000001",
    source: "focused_claim_flow",
    locale: "sr",
    providerStatus: "manual_review",
  };

  assert.equal(module.exports.trackLeadSubmitOnce(input), true);
  assert.equal(module.exports.trackLeadSubmitOnce(input), false);
  assert.equal(window.dataLayer.length, 1);
  assert.equal(gtagCalls.length, 1);
  assert.equal(window.dataLayer[0].event, "lead_submit");
  assert.equal(window.dataLayer[0].transaction_id, input.claimId);
});

test("tracking wiring is consent-gated, success-gated and PII-minimized", () => {
  const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const layout = read("src/app/layout.tsx");
  const measurement = read("src/components/google-measurement.tsx");
  const tracking = read("src/lib/google-tracking.ts");
  const route = read("src/app/claim/submit/route.ts");
  const forms = [
    read("src/components/claim-flow.tsx"),
    read("src/components/claim-modal.tsx"),
    read("src/components/claim-intake-form.tsx"),
  ];

  for (const consentType of [
    "analytics_storage",
    "ad_storage",
    "ad_user_data",
    "ad_personalization",
  ]) {
    assert.match(layout, new RegExp(`${consentType}:'denied'`));
    assert.match(tracking, new RegExp(consentType));
  }

  assert.match(measurement, /consent\?\.marketing/);
  assert.match(measurement, /NEXT_PUBLIC_GTM_ID|getGoogleTagManagerId/);
  assert.match(
    read("src/lib/env.ts"),
    /process\.env\.NEXT_PUBLIC_GTM_ID\?\.trim\(\)/,
  );
  assert.match(route, /marketingConsent[\s\S]*submission\.input\.attribution/);
  assert.match(tracking, /trackOnce\(`lead_submit:\$\{input\.claimId\}`/);
  assert.doesNotMatch(tracking, /email|firstName|lastName|phoneNumber|passport|pnr/i);

  for (const form of forms) {
    assert.match(form, /getAttributionForSubmission\(\)/);
    assert.match(form, /trackLeadSubmitOnce/);
    assert.match(form, /if \(!data\.reused\)/);
  }
});
