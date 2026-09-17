import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Regression: GA4 initial/manual URL context and unverified Meta transport.
// Executes application modules, with external Google/Meta/email/storage boundaries
// isolated. This is NOT a Google SDK / Meta Events Manager acceptance test.
const nativeRequire = createRequire(import.meta.url);
function runtime(globals, overrides = {}) {
  const cache = new Map();
  function load(name) {
    if (name in overrides) return overrides[name];
    if (!name.startsWith("@/")) return nativeRequire(name);
    if (cache.has(name)) return cache.get(name).exports;
    const loadedModule = { exports: {} };
    cache.set(name, loadedModule);
    let path = new URL(`../src/${name.slice(2)}${name.endsWith(".json") ? "" : ".ts"}`, import.meta.url);
    if (!existsSync(path)) path = new URL(`../src/${name.slice(2)}.tsx`, import.meta.url);
    const source = readFileSync(path, "utf8");
    if (name.endsWith(".json")) loadedModule.exports = JSON.parse(source);
    else vm.runInNewContext(ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, jsx: ts.JsxEmit.ReactJSX },
    }).outputText, { ...globals, module: loadedModule, exports: loadedModule.exports, require: load, URL, Date, Request, Response, AbortController, setTimeout, clearTimeout, console: { info() {}, error() {} } });
    return loadedModule.exports;
  }
  return load;
}

const publicPaths = ["/", "/en", "/proveri-let", "/en/check-flight", "/privacy"];
const marker = "TEST_PRIVATE_MARKER_20260916";
function googleRuntime(analytics = true) {
  const consent = { analytics, marketing: false };
  const calls = [];
  const hits = [];
  const destinations = new Map();
  const window = { location: new URL(`https://preview.example/?gclid=TEST_GCLID_123&utm_source=google&utm_medium=cpc&utm_campaign=SEARCH_RS_CORE&email=${marker}%40example.com&pnr=${marker}#${marker}`) };
  window.gtag = (command, target, params = {}) => {
    calls.push([command, target, params]);
    if (command === "config") {
      destinations.set(target, { ...destinations.get(target), ...params });
      if (params.send_page_view !== false && !params.update) hits.push({ event: "page_view", ...destinations.get(target) });
    }
    if (command === "event" && !window["ga-disable-G-LOCALTEST"]) {
      hits.push({ event: target, ...destinations.get("G-LOCALTEST"), ...params });
    }
  };
  const document = { title: marker, referrer: `https://preview.example/privacy?token=${marker}#${marker}` };
  const load = runtime({ window, document }, {
    "@/lib/consent": { hasAnalyticsConsent: () => consent.analytics },
    "@/lib/env": { getGoogleAnalyticsId: () => "G-LOCALTEST" },
  });
  return { window, document, consent, calls, hits, analytics: load("@/lib/analytics") };
}

test("GA4 initialization disables automatic config PV before first sanitized transport hit", () => {
  const run = googleRuntime();
  run.analytics.syncAnalytics(publicPaths);
  run.analytics.syncAnalytics(publicPaths);
  assert.equal(run.hits.length, 1);
  assert.equal(run.calls.find(([command]) => command === "config")[2].send_page_view, false);
  assert.equal(run.hits[0].page_location, "https://preview.example/?utm_source=google&utm_medium=cpc&utm_campaign=SEARCH_RS_CORE");
  assert.equal(run.hits[0].page_referrer, "https://preview.example/privacy");
  assert.equal(JSON.stringify(run.hits).includes(marker), false);
  assert.equal(run.window.location.search.includes("TEST_GCLID_123"), true);
  assert.equal(run.window.location.search.includes(marker), true);
});

test("GA4 SPA, Back and legacy events use safe context, retaining one PV per transition", () => {
  const run = googleRuntime();
  run.analytics.syncAnalytics(publicPaths);
  run.window.location = new URL(`https://preview.example/en?utm_source=${marker}%40example.com&utm_campaign=${marker}&phone=${marker}`);
  run.analytics.syncAnalytics(publicPaths);
  run.analytics.trackEvent("begin_checkout", { event_category: "claim", event_label: "nav_cta", email: marker, link_url: `https://example.com/${marker}` });
  run.analytics.trackEvent("generate_lead", { event_category: "claim", event_label: "inline_form", form_locale: "en", form_destination: marker, reused: false });
  run.window.location = new URL("https://preview.example/");
  run.analytics.syncAnalytics(publicPaths);
  assert.equal(run.hits.filter((hit) => hit.event === "page_view").length, 3);
  assert.equal(run.hits.filter((hit) => hit.event === "generate_lead").length, 1);
  assert.equal(JSON.stringify(run.hits).includes(marker), false);
  assert.equal(run.hits[1].page_location, "https://preview.example/en");
  for (const hit of run.hits) assert.equal(hit.send_to, "G-LOCALTEST");
});

test("GA4 private utility paths and revoked consent opt out an already initialized destination", () => {
  const run = googleRuntime(false);
  run.analytics.syncAnalytics(publicPaths);
  assert.equal(run.hits.length, 0);
  run.consent.analytics = true;
  run.analytics.syncAnalytics(publicPaths);
  for (const pathname of ["/admin", `/admin/claims/${marker}`, `/documents/${marker}`, "/marketing/confirm", "/auth/confirm"]) {
    run.window.location = new URL(`https://preview.example${pathname}?token=${marker}`);
    run.analytics.syncAnalytics(publicPaths);
    run.analytics.trackEvent("generate_lead", { event_label: "inline_form" });
    assert.equal(run.window["ga-disable-G-LOCALTEST"], true);
  }
  assert.equal(run.hits.length, 1);
  run.window.location = new URL("https://preview.example/en");
  run.consent.analytics = false;
  run.analytics.syncAnalytics(publicPaths);
  assert.equal(run.hits.length, 1);
});

test("GA4 encoded sensitive campaign values and external private referrers are excluded", () => {
  const run = googleRuntime();
  run.document.referrer = `https://external.example/documents/${marker}?access_token=${marker}`;
  run.window.location = new URL(`https://preview.example/?utm_source=%2565mail%2540example.com&utm_medium=${marker}&utm_campaign=${marker}&wbraid=TEST_WBRAID`);
  run.analytics.syncAnalytics(publicPaths);
  assert.equal(run.hits[0].page_referrer, "https://external.example");
  assert.equal(run.hits[0].page_location, "https://preview.example/");
  assert.equal(JSON.stringify(run.hits).includes(marker), false);
});

test("all four consent combinations preserve Google UUID delivery and separate GA4 destination", () => {
  for (const analytics of [false, true]) for (const marketing of [false, true]) {
    const messages = [];
    const window = { location: new URL("https://preview.example/"), dataLayer: messages, sessionStorage: { getItem() {}, setItem() {} } };
    window.gtag = function () { messages.push(Array.from(arguments)); };
    const load = runtime({ window, document: { referrer: "" } }, {
      "@/lib/consent": { hasAnalyticsConsent: () => analytics, hasMarketingConsent: () => marketing },
      "@/lib/env": { getGoogleAnalyticsId: () => "G-LOCALTEST" },
    });
    load("@/lib/analytics").syncAnalytics(publicPaths);
    const tracking = load("@/lib/google-tracking");
    tracking.updateGoogleConsent({ analytics, marketing });
    const consentUpdate = messages.find((values) => values[0] === "consent")[2];
    assert.equal(consentUpdate.analytics_storage, analytics ? "granted" : "denied");
    for (const key of ["ad_storage", "ad_user_data", "ad_personalization"]) assert.equal(consentUpdate[key], marketing ? "granted" : "denied");
    const input = { claimId: "00000000-0000-4000-8000-000000000005", source: "inline_form", locale: "sr" };
    assert.equal(tracking.trackLeadSubmitOnce(input), analytics || marketing);
    assert.equal(tracking.trackLeadSubmitOnce(input), false);
    assert.equal(messages.filter((values) => values[0] === "event" && values[1] === "lead_submit").length, analytics || marketing ? 1 : 0);
    assert.equal(window["ga-disable-G-LOCALTEST"], !analytics);
  }
});

test("actual GoogleMeasurement admin transition denies all four signals and does not capture attribution", () => {
  for (const pathname of ["/admin", "/admin/claims/LOCAL_PRIVATE_ID"]) {
    const calls = [];
    let captures = 0;
    const window = { location: { pathname }, gtag: (...args) => calls.push(args), addEventListener() {}, removeEventListener() {} };
    const load = runtime({ window, document: { addEventListener() {}, removeEventListener() {} } }, {
      react: { useEffect: (effect) => effect(), useState: (value) => [value, () => {}] },
      "react/jsx-runtime": { jsx: () => null, jsxs: () => null },
      "next/script": () => null,
      "next/navigation": { usePathname: () => pathname, useSearchParams: () => null },
      "@/lib/env": { getGoogleTagManagerId: () => "GTM-LOCALTEST" },
      "@/lib/consent": { getTrackingConsent: () => ({ analytics: true, marketing: true }), trackingConsentEvent: "local-consent" },
      "@/lib/attribution": { captureCurrentAttribution: () => { captures++; }, clearStoredAttribution() {} },
    });
    assert.equal(load("@/components/google-measurement").GoogleMeasurement(), null);
    assert.equal(captures, 0);
    assert.deepEqual(Object.values(calls[0][2]), ["denied", "denied", "denied", "denied"]);
  }
});

function metaRuntime({ marketing = true, configured = true, apiOk = true, transportThrows = false } = {}) {
  const sent = [];
  const pixel = [];
  const notifications = [];
  let reused = false;
  const load = runtime({
    window: { fbq: (...args) => pixel.push(args), crypto: { randomUUID: () => "local-meta-event-20260916" } },
    fetch: async (url, options) => {
      sent.push({ url, payload: JSON.parse(options.body) });
      if (transportThrows) throw new Error("isolated transport failure");
      return new Response(JSON.stringify(apiOk ? { events_received: 1 } : { error: { message: "local failure" } }), { status: apiOk ? 200 : 400 });
    },
  }, {
    "@/lib/env": {
      getMetaPixelId: () => configured ? "LOCAL_PIXEL_NOT_LIVE" : undefined,
      getMetaConversionsApiToken: () => configured ? "LOCAL_TOKEN_NOT_A_CREDENTIAL" : undefined,
      getMetaGraphApiVersion: () => "v23.0",
      getMetaTestEventCode: () => "LOCAL_TEST_NOT_LIVE",
    },
    "@/lib/consent": { hasMarketingConsent: () => marketing },
    "next/server": { NextResponse: { json: (body, options) => Response.json(body, options) } },
    "@/lib/claims": { createOrReuseClaim: async (input) => {
      const result = { reused, claim: { ...input, id: "00000000-0000-4000-8000-000000000001", originalInputSnapshot: input, providerSnapshot: { status: "provider_unconfigured" } } };
      reused = true;
      return result;
    } },
    "@/lib/notifications": {
      sendAdminClaimNotification: async () => { notifications.push("admin"); return { skipped: true }; },
      sendUserClaimConfirmation: async () => { notifications.push("user"); return { skipped: true }; },
    },
    "@/lib/rate-limit": { isRateLimited: () => false },
  });
  const cookie = load("@/lib/consent-cookie");
  const rawCookie = encodeURIComponent(JSON.stringify({ v: 3, analytics: false, marketing, ts: Date.now(), notice: cookie.trackingConsentNoticeVersion }));
  const body = { flightNumber: "JU123", flightDate: "2026-09-15", route: "BEG-LHR", email: "qa-local@example.com", firstName: "TEST", lastName: "LOCAL", issueType: "delay_3h_plus", privacyConsent: true, locale: "en", formStartedAt: String(Date.now() - 10000), metaEventId: "local-meta-event-20260916", eventSourceUrl: "https://preview.example/?token=LOCAL_PRIVATE_URL" };
  const request = (data = body, consentCookie = rawCookie) => new Request("https://preview.example/claim/submit", {
    method: "POST", headers: { "content-type": "application/json", cookie: `lk_consent=${consentCookie}` }, body: JSON.stringify(data),
  });
  return { sent, pixel, notifications, body, request, route: load("@/app/claim/submit/route"), browser: load("@/lib/meta") };
}

test("actual submit route plus browser helper produce one matching Lead ID, reuse sends no CAPI retry", async () => {
  const run = metaRuntime();
  const response = await run.route.POST(run.request());
  const accepted = await response.json();
  assert.equal(response.status, 200);
  assert.equal(accepted.ok, true);
  assert.equal(accepted.reused, false);
  // The same existing success-only browser call used by the form, not a live Pixel.
  run.browser.trackMetaEvent("Lead", { content_name: "flight_compensation_claim", content_category: "claim", form_locale: "en" }, run.body.metaEventId);
  assert.equal(run.sent.length, 1);
  assert.equal(run.pixel.length, 1);
  const serverEvent = run.sent[0].payload.data[0];
  assert.equal(serverEvent.event_name, run.pixel[0][1]);
  assert.equal(serverEvent.event_id, run.pixel[0][3].eventID);
  assert.equal(serverEvent.event_source_url, "https://preview.example/");
  assert.equal(serverEvent.action_source, "website");
  for (const key of ["em", "ph", "fn", "ln", "external_id", "fbp", "fbc"]) assert.equal(serverEvent.user_data[key], undefined);
  assert.equal(run.sent[0].payload.test_event_code, "LOCAL_TEST_NOT_LIVE");
  const retry = await (await run.route.POST(run.request())).json();
  assert.equal(retry.reused, true);
  assert.equal(run.sent.length, 1);
  assert.equal(run.notifications.length, 2);
});

test("Meta server/browser gates reject denied/stale consent and invalid submissions", async () => {
  const run = metaRuntime({ marketing: false });
  assert.equal((await run.route.POST(run.request())).status, 200);
  run.browser.trackMetaEvent("Lead", {}, run.body.metaEventId);
  assert.equal(run.sent.length + run.pixel.length, 0);
  const stale = metaRuntime();
  await stale.route.POST(stale.request(stale.body, encodeURIComponent(JSON.stringify({ v: 3, analytics: true, marketing: true, ts: Date.now(), notice: "stale" }))));
  assert.equal(stale.sent.length, 0);
  const invalid = metaRuntime();
  assert.equal((await invalid.route.POST(invalid.request({}))).status, 400);
  assert.equal(invalid.sent.length + invalid.notifications.length, 0);
});

test("Meta missing configuration and API/transport failure cannot break accepted claim response", async () => {
  for (const options of [{ configured: false }, { apiOk: false }, { transportThrows: true }]) {
    const run = metaRuntime(options);
    assert.equal((await run.route.POST(run.request())).status, 200);
    assert.equal(run.sent.length, options.configured === false ? 0 : 1);
    assert.equal(run.notifications.length, 2);
  }
});
