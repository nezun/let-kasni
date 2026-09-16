import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Regression: ISSUE-001 — GTM resolved an undefined Ads transaction ID.
// Found by /qa on 2026-09-16.
// Report: docs/GOOGLE-ADS-PREVIEW-QA-2026-09-16.md
const runbook = readFileSync(new URL("../docs/GOOGLE-ADS-LAUNCH.md", import.meta.url), "utf8");
const variablePath = runbook.match(/Data Layer Variable Name: `([^`]+)`/)?.[1];

function loadTracking({ analytics = true, marketing = true, withGtag = true } = {}) {
  const source = readFileSync(new URL("../src/lib/google-tracking.ts", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const keys = new Set();
  const storage = new Map();
  const calls = [];
  const window = {
    dataLayer: [],
    location: { pathname: "/proveri-let" },
    sessionStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) },
  };
  if (withGtag) window.gtag = function (...args) { calls.push(args); window.dataLayer.push(arguments); };
  const trackingModule = { exports: {} };
  vm.runInNewContext(compiled, {
    window, module: trackingModule, exports: trackingModule.exports,
    require: (name) => {
      if (name === "@/lib/consent") return { hasAnalyticsConsent: () => analytics, hasMarketingConsent: () => marketing };
      if (name === "@/lib/google-tracking-keys") return {
        googleEventStoragePrefix: "letkasni-google-event:",
        hasDeliveredGoogleEvent: (key) => keys.has(key),
        markGoogleEventDelivered: (key) => keys.add(key),
      };
      throw new Error(`Unexpected dependency: ${name}`);
    },
  });
  return { tracking: trackingModule.exports, window, calls };
}

// Model GTM's observed gtag event transformation plus v2 object-field merging.
// The path comes from the actual runbook used to configure the GTM variable.
function resolvedTransactions(messages) {
  const state = {};
  const transactions = [];
  for (const message of messages) {
    const values = message[0] === "event"
      ? { event: message[1], eventModel: message[2] }
      : message;
    Object.assign(state, values, {
      eventModel: { ...state.eventModel, ...values.eventModel },
    });
    if (values.event === "lead_submit") {
      transactions.push(variablePath.split(".").reduce((value, key) => value?.[key], state));
    }
  }
  return transactions;
}

test("GTM transaction variable resolves normal, fallback and recovery Leads exactly once", () => {
  assert.equal(variablePath, "eventModel.transaction_id");
  for (const options of [
    { analytics: true, marketing: true },
    { analytics: false, marketing: true },
    { analytics: false, marketing: true, withGtag: false },
  ]) {
    for (const method of ["trackLeadSubmitOnce", "trackRecoveredLeadSubmitOnce"]) {
      const runtime = loadTracking(options);
      const input = { claimId: "00000000-0000-4000-8000-000000000001", source: "focused_claim_flow", locale: "sr" };
      assert.equal(runtime.tracking[method](input), true);
      assert.equal(runtime.tracking[method](input), false);
      assert.equal(runtime.window.dataLayer.length, 1);
      assert.deepEqual(resolvedTransactions(runtime.window.dataLayer), [input.claimId]);
      if (method === "trackRecoveredLeadSubmitOnce") assert.equal(runtime.calls.length, 0);
    }
  }
});

test("a recovery Lead followed by a fresh Lead cannot reuse an earlier transaction UUID", () => {
  for (const withGtag of [true, false]) {
    const runtime = loadTracking({ withGtag });
    const base = { source: "focused_claim_flow", locale: "en" };
    const ids = ["00000000-0000-4000-8000-000000000002", "00000000-0000-4000-8000-000000000003"];
    runtime.tracking.trackRecoveredLeadSubmitOnce({ ...base, claimId: ids[0] });
    runtime.tracking.trackLeadSubmitOnce({ ...base, claimId: ids[1] });
    assert.deepEqual(resolvedTransactions(runtime.window.dataLayer), ids);
  }
});

test("recovery remains marketing-consent gated and does not send a GA4 gtag event", () => {
  const denied = loadTracking({ analytics: true, marketing: false });
  assert.equal(denied.tracking.trackRecoveredLeadSubmitOnce({ claimId: "test-denied", source: "focused_claim_flow", locale: "sr" }), false);
  assert.equal(denied.window.dataLayer.length, 0);
  assert.equal(denied.calls.length, 0);
});
