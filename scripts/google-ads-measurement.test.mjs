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
const claimsSource = readFileSync(
  new URL("../src/lib/claims.ts", import.meta.url),
  "utf8",
);
const trackingKeysSource = readFileSync(
  new URL("../src/lib/google-tracking-keys.ts", import.meta.url),
  "utf8",
);
const trackingKeysModule = ts.transpileModule(trackingKeysSource, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const trackingKeys = await import(
  `data:text/javascript;base64,${Buffer.from(trackingKeysModule).toString("base64")}`
);
const optionalTrackingPathSource = readFileSync(
  new URL("../src/lib/optional-tracking-path.ts", import.meta.url),
  "utf8",
);
const optionalTrackingPathModule = ts.transpileModule(optionalTrackingPathSource, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const { allowsOptionalTracking } = await import(
  `data:text/javascript;base64,${Buffer.from(optionalTrackingPathModule).toString("base64")}`
);
const conversionRecoverySource = readFileSync(
  new URL("../src/lib/conversion-recovery.ts", import.meta.url),
  "utf8",
);
const conversionRecoveryModule = ts.transpileModule(conversionRecoverySource, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const {
  isConversionRecoveryEligible,
  sanitizeSubmissionAttemptId,
} = await import(
  `data:text/javascript;base64,${Buffer.from(conversionRecoveryModule).toString("base64")}`
);
const {
  appendAttributionParameters,
  attributionMaxAgeMs,
  attributionStorageKey,
  getAttributionFromPage,
  hasPaidAttribution,
  mergeAttribution,
  sanitizeClaimAttribution,
} = await import(
  `data:text/javascript;base64,${Buffer.from(attributionCoreModule).toString("base64")}`
);

const capturedAt = "2026-09-15T08:00:00.000Z";

function compileCommonJs(source) {
  return ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
}

function loadGoogleTracking({
  analytics = false,
  marketing = false,
  withGtag = true,
  storageThrows = false,
} = {}) {
  const source = readFileSync(
    new URL("../src/lib/google-tracking.ts", import.meta.url),
    "utf8",
  )
    .replace(
      'import { hasAnalyticsConsent, hasMarketingConsent } from "@/lib/consent";',
      "const { hasAnalyticsConsent, hasMarketingConsent } = globalThis.__consent;",
    )
    .replace(
      /import \{[\s\S]*?\} from "@\/lib\/google-tracking-keys";/,
      "const { googleEventStoragePrefix, hasDeliveredGoogleEvent, markGoogleEventDelivered } = globalThis.__trackingKeys;",
    );
  const sessionValues = new Map();
  const gtagCalls = [];
  const deliveredKeys = new Set();
  const testModule = { exports: {} };
  const window = {
    dataLayer: [],
    location: { pathname: "/proveri-let" },
    sessionStorage: {
      getItem(key) {
        if (storageThrows) throw new Error("storage unavailable");
        return sessionValues.get(key) ?? null;
      },
      setItem(key, value) {
        if (storageThrows) throw new Error("storage unavailable");
        sessionValues.set(key, value);
      },
    },
  };
  if (withGtag) {
    window.gtag = (...args) => {
      gtagCalls.push(args);
      window.dataLayer.push(args);
    };
  }

  vm.runInNewContext(compileCommonJs(source), {
    module: testModule,
    exports: testModule.exports,
    window,
    __consent: {
      hasAnalyticsConsent: () => analytics,
      hasMarketingConsent: () => marketing,
    },
    __trackingKeys: {
      googleEventStoragePrefix: trackingKeys.googleEventStoragePrefix,
      hasDeliveredGoogleEvent: (key) => deliveredKeys.has(key),
      markGoogleEventDelivered: (key) => deliveredKeys.add(key),
    },
  });

  return { exports: testModule.exports, gtagCalls, sessionValues, window };
}

function loadAttributionClient({
  marketing = true,
  storedValue,
  pageUrl = "https://letkasni.rs/?gclid=TEST&utm_medium=cpc",
  referrer = "https://www.google.com/search?q=private",
  storageThrows = false,
} = {}) {
  const source = readFileSync(
    new URL("../src/lib/attribution.ts", import.meta.url),
    "utf8",
  )
    .replace(
      /import \{[\s\S]*?\} from "@\/lib\/attribution-core";/,
      "const { appendAttributionParameters, attributionMaxAgeMs, attributionStorageKey, getAttributionFromPage, mergeAttribution, sanitizeClaimAttribution } = globalThis.__attributionCore;",
    )
    .replace(
      'import { hasMarketingConsent } from "@/lib/consent";',
      "const { hasMarketingConsent } = globalThis.__consent;",
    );
  const storageValues = new Map();
  if (storedValue !== undefined) {
    storageValues.set(attributionStorageKey, storedValue);
  }
  const localStorage = {
    getItem(key) {
      if (storageThrows) throw new Error("storage unavailable");
      return storageValues.get(key) ?? null;
    },
    setItem(key, value) {
      if (storageThrows) throw new Error("storage unavailable");
      storageValues.set(key, value);
    },
    removeItem(key) {
      if (storageThrows) throw new Error("storage unavailable");
      storageValues.delete(key);
    },
  };
  const testModule = { exports: {} };
  const window = { localStorage, location: { href: pageUrl } };

  vm.runInNewContext(compileCommonJs(source), {
    module: testModule,
    exports: testModule.exports,
    window,
    document: { referrer },
    __attributionCore: {
      appendAttributionParameters,
      attributionMaxAgeMs,
      attributionStorageKey,
      getAttributionFromPage,
      mergeAttribution,
      sanitizeClaimAttribution,
    },
    __consent: { hasMarketingConsent: () => marketing },
  });

  return { exports: testModule.exports, storageValues };
}

function loadConsentClient({ storageThrows = false } = {}) {
  const source = readFileSync(
    new URL("../src/lib/consent.ts", import.meta.url),
    "utf8",
  )
    .replace(
      /import \{[\s\S]*?\} from "@\/lib\/consent-cookie";/,
      "const { getCookieHeaderValue, parseTrackingConsentValue, serializeTrackingConsentCookie, trackingConsentCookieMaxAge, trackingConsentCookieName, trackingConsentNoticeVersion } = globalThis.__consentCookie;",
    )
    .replace(
      'import { attributionStorageKey } from "@/lib/attribution-core";',
      "const { attributionStorageKey } = globalThis.__attributionCore;",
    )
    .replace(
      /import \{[\s\S]*?\} from "@\/lib\/google-tracking-keys";/,
      "const { clearDeliveredGoogleEvents, googleEventStoragePrefix } = globalThis.__trackingKeys;",
    );

  const makeStorage = (entries) => {
    const values = new Map(entries);
    return {
      get length() {
        if (storageThrows) throw new Error("storage unavailable");
        return values.size;
      },
      key(index) {
        if (storageThrows) throw new Error("storage unavailable");
        return [...values.keys()][index] ?? null;
      },
      getItem(key) {
        if (storageThrows) throw new Error("storage unavailable");
        return values.get(key) ?? null;
      },
      setItem(key, value) {
        if (storageThrows) throw new Error("storage unavailable");
        values.set(key, value);
      },
      removeItem(key) {
        if (storageThrows) throw new Error("storage unavailable");
        values.delete(key);
      },
      values,
    };
  };

  const localStorage = makeStorage([
    [attributionStorageKey, "paid-touch"],
    ["_gcl_au", "google-cookie-mirror"],
    ["unrelated-local", "keep"],
  ]);
  const sessionStorage = makeStorage([
    ["letkasni-google-event:lead_submit:claim-1", "1"],
    ["unrelated-session", "keep"],
  ]);
  const cookieWrites = [];
  let clearedMemory = false;
  const document = {
    documentElement: { dataset: {} },
    get cookie() {
      return "_gcl_au=a; _gac_test=b; _fbp=c; _fbc=d; unrelated=e";
    },
    set cookie(value) {
      cookieWrites.push(value);
    },
  };
  const window = {
    localStorage,
    sessionStorage,
    dispatchEvent() {},
  };
  const testModule = { exports: {} };

  vm.runInNewContext(compileCommonJs(source), {
    module: testModule,
    exports: testModule.exports,
    window,
    document,
    Event,
    __consentCookie: {
      getCookieHeaderValue: () => null,
      parseTrackingConsentValue: () => null,
      serializeTrackingConsentCookie: () => "",
      trackingConsentCookieMaxAge: 1,
      trackingConsentCookieName: "lk_consent",
      trackingConsentNoticeVersion: "1.3",
    },
    __attributionCore: { attributionStorageKey },
    __trackingKeys: {
      clearDeliveredGoogleEvents: () => {
        clearedMemory = true;
      },
      googleEventStoragePrefix: trackingKeys.googleEventStoragePrefix,
    },
  });

  return {
    exports: testModule.exports,
    localStorage,
    sessionStorage,
    cookieWrites,
    wasMemoryCleared: () => clearedMemory,
  };
}

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

test("does not forward campaign parameters before advertising consent", () => {
  const denied = loadAttributionClient({ marketing: false });
  assert.equal(
    denied.exports.withCurrentAttributionParameters("/proveri-let"),
    "/proveri-let",
  );

  const granted = loadAttributionClient({ marketing: true });
  assert.equal(
    granted.exports.withCurrentAttributionParameters("/proveri-let"),
    "/proveri-let?gclid=TEST&utm_medium=cpc",
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

test("rejects invalid and non-web attribution URLs", () => {
  assert.equal(getAttributionFromPage("not a URL", "", capturedAt), null);
  assert.equal(
    sanitizeClaimAttribution({
      initial_landing_page: "javascript:alert(1)",
      captured_at: capturedAt,
    }),
    undefined,
  );
  assert.equal(
    sanitizeClaimAttribution({
      initial_landing_page: [
        "https://",
        "fixture-user:fixture-password@",
        "letkasni.rs/",
      ].join(""),
      captured_at: capturedAt,
    }),
    undefined,
  );
  assert.equal(
    sanitizeClaimAttribution({ initial_landing_page: "https://letkasni.rs/" }),
    undefined,
  );
});

test("server validation binds attribution to the current site and a recent timestamp", () => {
  const nowMs = Date.parse(capturedAt) + 60_000;
  const valid = {
    gclid: "TEST\u0000_GCLID",
    initial_landing_page: "https://letkasni.rs/?private=value",
    captured_at: capturedAt,
  };

  assert.equal(
    sanitizeClaimAttribution(valid, {
      allowedOrigins: ["https://letkasni.rs"],
      nowMs,
    })?.gclid,
    "TEST_GCLID",
  );
  assert.equal(
    sanitizeClaimAttribution(
      { ...valid, initial_landing_page: "https://evil.example/" },
      { allowedOrigins: ["https://letkasni.rs"], nowMs },
    ),
    undefined,
  );
  assert.equal(
    sanitizeClaimAttribution(
      {
        ...valid,
        captured_at: new Date(nowMs - attributionMaxAgeMs - 1).toISOString(),
      },
      { allowedOrigins: ["https://letkasni.rs"], nowMs },
    ),
    undefined,
  );
  assert.equal(
    sanitizeClaimAttribution(
      {
        ...valid,
        captured_at: new Date(nowMs + 5 * 60 * 1000 + 1).toISOString(),
      },
      { allowedOrigins: ["https://letkasni.rs"], nowMs },
    ),
    undefined,
  );
  assert.equal(
    sanitizeClaimAttribution(
      { ...valid, captured_at: "2026-09-15T08:00:00Z" },
      { allowedOrigins: ["https://letkasni.rs"], nowMs },
    )?.captured_at,
    capturedAt,
  );
});

test("blocks all optional measurement on admin routes", () => {
  assert.equal(allowsOptionalTracking(null), false);
  assert.equal(allowsOptionalTracking(undefined), false);
  assert.equal(allowsOptionalTracking("/"), true);
  assert.equal(allowsOptionalTracking("/en/check-flight"), true);
  assert.equal(allowsOptionalTracking("/admin"), false);
  assert.equal(allowsOptionalTracking("/admin/claims/claim-id"), false);
  assert.equal(allowsOptionalTracking("/administrator"), true);
});

test("stores measurement audit metadata only in the original claim snapshot", () => {
  assert.match(
    claimsSource,
    /const inputWithoutAuditMetadata = \{ \.\.\.input \};\s*delete inputWithoutAuditMetadata\.attribution;\s*delete inputWithoutAuditMetadata\.submissionAttemptId;/,
  );
  assert.match(
    claimsSource,
    /const normalizedInputSnapshot = \{\s*\.\.\.inputWithoutAuditMetadata,/,
  );
  assert.match(
    claimsSource,
    /const claim: ClaimRecord = \{\s*\.\.\.inputWithoutAuditMetadata,/,
  );
  assert.match(claimsSource, /originalInputSnapshot: \{ \.\.\.input \}/);
});

test("allows Ads recovery only for the same server-recorded submit attempt", () => {
  const attemptId = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";
  assert.equal(sanitizeSubmissionAttemptId(attemptId.toUpperCase()), attemptId);
  assert.equal(sanitizeSubmissionAttemptId("not-a-uuid"), undefined);
  assert.equal(
    isConversionRecoveryEligible(true, attemptId, {
      submissionAttemptId: attemptId,
    }),
    true,
  );
  assert.equal(
    isConversionRecoveryEligible(true, attemptId, {
      submissionAttemptId: "11111111-2222-4333-8444-555555555555",
    }),
    false,
  );
  assert.equal(
    isConversionRecoveryEligible(false, attemptId, {
      submissionAttemptId: attemptId,
    }),
    false,
  );
});

test("keeps organic first touch and handles an empty attribution history", () => {
  const first = getAttributionFromPage(
    "https://letkasni.rs/blog",
    "https://example.com/",
    capturedAt,
  );
  const second = getAttributionFromPage(
    "https://letkasni.rs/privacy",
    "https://letkasni.rs/blog",
    "2026-09-15T08:05:00.000Z",
  );

  assert.ok(first);
  assert.ok(second);
  assert.deepEqual(mergeAttribution(null, first), first);
  assert.deepEqual(mergeAttribution(first, second), first);
});

test("does not forward attribution to external or invalid destinations", () => {
  assert.equal(
    appendAttributionParameters(
      "https://example.com/claim",
      "https://letkasni.rs/?gclid=TEST",
    ),
    "https://example.com/claim",
  );
  assert.equal(
    appendAttributionParameters("not a valid url", "not a valid current url"),
    "not a valid url",
  );
});

test("returns fresh stored attribution and evicts expired or malformed values", () => {
  const fresh = {
    gclid: "FRESH",
    initial_landing_page: "https://letkasni.rs/",
    captured_at: new Date(Date.now() - 1_000).toISOString(),
  };
  const freshRuntime = loadAttributionClient({
    storedValue: JSON.stringify(fresh),
  });
  assert.equal(freshRuntime.exports.getStoredAttribution()?.gclid, "FRESH");

  for (const storedValue of [
    JSON.stringify({ ...fresh, captured_at: "2020-01-01T00:00:00.000Z" }),
    JSON.stringify({ ...fresh, captured_at: "2999-01-01T00:00:00.000Z" }),
    "{malformed",
  ]) {
    const runtime = loadAttributionClient({ storedValue });
    assert.equal(runtime.exports.getStoredAttribution(), undefined);
    assert.equal(runtime.storageValues.has(attributionStorageKey), false);
  }
});

test("captures a consented paid touch and strips query data before storage", () => {
  const runtime = loadAttributionClient();
  const captured = runtime.exports.captureCurrentAttribution();

  assert.equal(captured?.gclid, "TEST");
  assert.equal(captured?.initial_landing_page, "https://letkasni.rs/");
  assert.equal(captured?.referrer, "https://www.google.com/search");
  assert.equal(
    JSON.parse(runtime.storageValues.get(attributionStorageKey)).gclid,
    "TEST",
  );
});

test("clears attribution without marketing consent and fails closed when storage is unavailable", () => {
  const storedValue = JSON.stringify({
    gclid: "OLD",
    initial_landing_page: "https://letkasni.rs/",
    captured_at: new Date().toISOString(),
  });
  const denied = loadAttributionClient({ marketing: false, storedValue });
  assert.equal(denied.exports.captureCurrentAttribution(), undefined);
  assert.equal(denied.storageValues.has(attributionStorageKey), false);

  const unavailable = loadAttributionClient({ storageThrows: true });
  assert.equal(unavailable.exports.getStoredAttribution(), undefined);
  assert.equal(unavailable.exports.captureCurrentAttribution(), undefined);
});

test("advertising revocation clears Google, Meta, attribution, and conversion-dedupe storage", () => {
  const runtime = loadConsentClient();
  runtime.exports.clearOptionalTrackingCookies({
    analytics: false,
    advertising: true,
  });

  assert.equal(runtime.localStorage.values.has(attributionStorageKey), false);
  assert.equal(runtime.localStorage.values.has("_gcl_au"), false);
  assert.equal(runtime.localStorage.values.get("unrelated-local"), "keep");
  assert.equal(
    runtime.sessionStorage.values.has(
      "letkasni-google-event:lead_submit:claim-1",
    ),
    false,
  );
  assert.equal(
    runtime.sessionStorage.values.get("unrelated-session"),
    "keep",
  );
  assert.equal(runtime.wasMemoryCleared(), true);
  for (const name of ["_gcl_au", "_gac_test", "_fbp", "_fbc"]) {
    assert.ok(runtime.cookieWrites.some((value) => value.startsWith(`${name}=`)));
  }
  const unavailable = loadConsentClient({ storageThrows: true });
  assert.doesNotThrow(() => {
    unavailable.exports.clearOptionalTrackingCookies({
      analytics: false,
      advertising: true,
    });
  });
  assert.equal(unavailable.wasMemoryCleared(), true);
});

test("shared conversion-dedupe memory can be cleared on consent withdrawal", () => {
  const key = `${trackingKeys.googleEventStoragePrefix}lead_submit:claim-shared`;
  assert.equal(trackingKeys.hasDeliveredGoogleEvent(key), false);
  trackingKeys.markGoogleEventDelivered(key);
  assert.equal(trackingKeys.hasDeliveredGoogleEvent(key), true);
  trackingKeys.clearDeliveredGoogleEvents();
  assert.equal(trackingKeys.hasDeliveredGoogleEvent(key), false);
});

test("emits exactly one lead_submit for the same successful claim ID", () => {
  const runtime = loadGoogleTracking({ analytics: true, marketing: true });
  const input = {
    claimId: "00000000-0000-4000-8000-000000000001",
    source: "focused_claim_flow",
    locale: "sr",
    providerStatus: "manual_review",
  };

  assert.equal(runtime.exports.trackLeadSubmitOnce(input), true);
  assert.equal(runtime.exports.trackLeadSubmitOnce(input), false);
  assert.equal(runtime.window.dataLayer.length, 1);
  assert.equal(runtime.gtagCalls.length, 1);
  assert.equal(runtime.gtagCalls[0][0], "event");
  assert.equal(runtime.gtagCalls[0][1], "lead_submit");
  assert.equal(runtime.gtagCalls[0][2].transaction_id, input.claimId);
});

test("suppresses journey events without consent", () => {
  const runtime = loadGoogleTracking({ withGtag: true });
  assert.equal(
    runtime.exports.trackGoogleJourneyEvent("phone_click", {
      event_category: "contact",
    }),
    false,
  );
  assert.equal(runtime.gtagCalls.length, 0);
  assert.equal(runtime.window.dataLayer.length, 0);
});

test("uses the dataLayer fallback when marketing consent exists before gtag", () => {
  const runtime = loadGoogleTracking({ marketing: true, withGtag: false });
  assert.equal(
    runtime.exports.trackGoogleJourneyEvent("whatsapp_click", {
      event_category: "contact",
      event_label: "site_whatsapp",
    }),
    true,
  );
  assert.equal(runtime.window.dataLayer.length, 1);
  assert.equal(runtime.window.dataLayer[0].event, "whatsapp_click");
});

test("updates all Google consent signals and bounds event parameters", () => {
  const runtime = loadGoogleTracking({ analytics: true, marketing: true });
  runtime.exports.updateGoogleConsent({ analytics: false, marketing: true });
  runtime.exports.trackGoogleJourneyEvent("lead_submit", {
    event_category: "claim",
    provider_status: undefined,
    transaction_id: "X".repeat(250),
  });

  assert.equal(runtime.gtagCalls[0][0], "consent");
  assert.equal(runtime.gtagCalls[0][1], "update");
  assert.equal(runtime.gtagCalls[0][2].analytics_storage, "denied");
  assert.equal(runtime.gtagCalls[0][2].ad_storage, "granted");
  assert.equal(runtime.gtagCalls[0][2].ad_user_data, "granted");
  assert.equal(runtime.gtagCalls[0][2].ad_personalization, "granted");
  assert.equal(runtime.gtagCalls[1][2].transaction_id.length, 200);
  assert.equal("provider_status" in runtime.gtagCalls[1][2], false);
});

test("deduplicates claim_start by page and still delivers when session storage is unavailable", () => {
  const normal = loadGoogleTracking({ analytics: true });
  assert.equal(normal.exports.trackClaimStartOnce("inline_form", "sr"), true);
  assert.equal(normal.exports.trackClaimStartOnce("inline_form", "sr"), false);

  const unavailable = loadGoogleTracking({
    analytics: true,
    storageThrows: true,
  });
  assert.equal(
    unavailable.exports.trackLeadSubmitOnce({
      claimId: "00000000-0000-4000-8000-000000000002",
      source: "inline_form",
      locale: "sr",
    }),
    true,
  );
  assert.equal(
    unavailable.exports.trackLeadSubmitOnce({
      claimId: "00000000-0000-4000-8000-000000000002",
      source: "inline_form",
      locale: "sr",
    }),
    false,
  );
  assert.equal(unavailable.gtagCalls.length, 1);
});

test("recovers a reused claim for Ads without duplicating GA4 delivery", () => {
  const runtime = loadGoogleTracking({ analytics: true, marketing: true });
  const input = {
    claimId: "00000000-0000-4000-8000-000000000003",
    source: "inline_form",
    locale: "sr",
    providerStatus: "live_match",
  };

  assert.equal(runtime.exports.trackRecoveredLeadSubmitOnce(input), true);
  assert.equal(runtime.exports.trackRecoveredLeadSubmitOnce(input), false);
  assert.equal(runtime.gtagCalls.length, 0);
  assert.equal(runtime.window.dataLayer.length, 1);
  assert.equal(runtime.window.dataLayer[0].event, "lead_submit");
  assert.equal(
    runtime.window.dataLayer[0].transaction_id,
    "00000000-0000-4000-8000-000000000003",
  );
});

test("tracking wiring is consent-gated, success-gated and PII-minimized", () => {
  const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const layout = read("src/app/layout.tsx");
  const measurement = read("src/components/google-measurement.tsx");
  const analytics = read("src/components/analytics.tsx");
  const metaPixel = read("src/components/meta-pixel.tsx");
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
  assert.match(layout, /location\.pathname!=="\/admin"/);
  for (const source of [measurement, analytics, metaPixel]) {
    assert.match(source, /allowsOptionalTracking\(pathname\)/);
  }
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
    assert.match(form, /trackRecoveredLeadSubmitOnce/);
    assert.match(form, /if \(!data\.reused\)/);
    assert.match(form, /else if \(data\.conversionRecoveryEligible\)/);
    assert.match(form, /addEventListener\(trackingConsentEvent/);
  }
});
