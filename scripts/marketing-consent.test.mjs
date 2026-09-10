import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  canConfirmationGrant,
  isEligibleForMarketing,
  marketingScopeId,
  sanitizeMarketingSourcePath,
} from "../src/lib/marketing-consent-core.ts";
import { parseTrackingConsentValue, trackingConsentNoticeVersion } from "../src/lib/consent-cookie.ts";
import { approvedMarketingProducts, getApprovedMarketingProduct } from "../src/lib/marketing-products.ts";

const future = "2099-01-01T00:00:00.000Z";
const valid = {
  controllerId: "21873446",
  purposeId: "direct_marketing_email",
  channel: "email",
  scopeId: marketingScopeId,
  productScopeId: marketingScopeId,
  status: "granted",
  contactVerifiedAt: "2026-09-09T10:00:00.000Z",
  confirmedAt: "2026-09-09T10:00:00.000Z",
  expiresAt: future,
  suppressed: false,
};

test("send eligibility requires the exact controller, purpose, channel, approved scope, proof and live period", () => {
  assert.equal(isEligibleForMarketing(valid, new Date("2026-09-10T00:00:00Z")), true);
  for (const change of [
    { controllerId: "another-company" },
    { purposeId: "service_email" },
    { channel: "sms" },
    { scopeId: "unrelated_product" },
    { productScopeId: "unrelated_product" },
    { status: "pending" },
    { contactVerifiedAt: null },
    { confirmedAt: null },
    { expiresAt: "2026-09-09T09:00:00Z" },
    { suppressed: true },
  ]) {
    assert.equal(isEligibleForMarketing({ ...valid, ...change }, new Date("2026-09-10T00:00:00Z")), false);
  }
});

test("old confirmation cannot override withdrawal and expired confirmation cannot grant", () => {
  assert.equal(canConfirmationGrant({ status: "pending", confirmationExpiresAt: future }, new Date("2026-09-10T00:00:00Z")), true);
  assert.equal(canConfirmationGrant({ status: "withdrawn", confirmationExpiresAt: future, withdrawnAt: "2026-09-09T12:00:00Z" }), false);
  assert.equal(canConfirmationGrant({ status: "pending", confirmationExpiresAt: "2026-09-09T09:00:00Z" }, new Date("2026-09-10T00:00:00Z")), false);
});

test("source paths exclude query strings and foreign origins", () => {
  assert.equal(sanitizeMarketingSourcePath("https://letkasni.rs/en/check-flight?pnr=secret#x"), "/en/check-flight");
  assert.equal(sanitizeMarketingSourcePath("https://evil.example/claim?x=1"), "/");
});

test("only the current granular cookie notice can enable optional tracking", () => {
  const current = encodeURIComponent(JSON.stringify({ v: 3, analytics: true, marketing: false, ts: Date.now(), notice: trackingConsentNoticeVersion }));
  assert.deepEqual(parseTrackingConsentValue(current)?.marketing, false);
  assert.equal(parseTrackingConsentValue("granted"), null);
  assert.equal(parseTrackingConsentValue(encodeURIComponent(JSON.stringify({ v: 2, analytics: true, marketing: true, ts: Date.now() }))), null);
});

test("GET never mutates confirmation or unsubscribe state", async () => {
  const files = await Promise.all([
    readFile(new URL("../src/app/api/marketing/confirm/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/app/api/marketing/unsubscribe/route.ts", import.meta.url), "utf8"),
  ]);
  for (const source of files) assert.doesNotMatch(source, /export\s+async\s+function\s+GET/);
});

test("claim submission stays independent from email-offer subscription", async () => {
  const source = await readFile(new URL("../src/app/claim/submit/route.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /requestMarketingSubscription|marketing_email_subscriptions/);
});

test("CAPI source URL is scrubbed and claim contact fields are not sent without an adult-specific proof", async () => {
  const meta = await readFile(new URL("../src/lib/meta-conversions.ts", import.meta.url), "utf8");
  const claim = await readFile(new URL("../src/app/claim/submit/route.ts", import.meta.url), "utf8");
  assert.match(meta, /parsed\.search = ""/);
  assert.match(meta, /parsed\.hash = ""/);
  const call = claim.slice(claim.indexOf("const metaResult = await sendMetaLeadEvent"), claim.indexOf("console.info(\n      \"Meta Lead CAPI delivery"));
  assert.doesNotMatch(call, /email:|firstName:|lastName:|phone:|externalId:/);
});

test("campaign delivery stays disabled until a product is explicitly approved", () => {
  assert.deepEqual(approvedMarketingProducts, []);
  assert.equal(getApprovedMarketingProduct("letkasni"), undefined);
});

test("central marketing delivery rechecks eligibility and carries visible and one-click unsubscribe", async () => {
  const source = await readFile(new URL("../src/lib/marketing-consent-store.ts", import.meta.url), "utf8");
  const delivery = source.slice(source.indexOf("export async function sendEligibleMarketingEmail"), source.indexOf("export async function expireMarketingRecords"));
  assert.match(delivery, /getApprovedMarketingProduct/);
  assert.match(delivery, /isEligibleForMarketing/);
  assert.match(delivery, /\.eq\("status", "granted"\)/);
  assert.match(delivery, /List-Unsubscribe/);
  assert.match(delivery, /List-Unsubscribe-Post/);
  assert.match(delivery, /Odjavi me sa VGA e-mail ponuda/);
});

test("provider one-click unsubscribe is a POST tied to the URL token", async () => {
  const source = await readFile(new URL("../src/app/api/marketing/unsubscribe/route.ts", import.meta.url), "utf8");
  assert.match(source, /export\s+async\s+function\s+POST/);
  assert.match(source, /searchParams\.get\("token"\)/);
  assert.doesNotMatch(source, /export\s+async\s+function\s+GET/);
});

test("retention job expires active consent and removes only aged non-held marketing records", async () => {
  const source = await readFile(new URL("../src/lib/marketing-consent-store.ts", import.meta.url), "utf8");
  const retention = source.slice(source.indexOf("export async function expireMarketingRecords"));
  assert.match(retention, /pendingMarketingRequestRetentionMs/);
  assert.match(retention, /marketingEvidenceRetentionMs/);
  assert.match(retention, /\.eq\("status", "pending"\)/);
  assert.match(retention, /\.eq\("status", "withdrawn"\)/);
  assert.match(retention, /\.eq\("status", "expired"\)/);
  assert.match(retention, /\.is\("legal_hold_until", null\)/);
  assert.match(retention, /suppressionReviewsDue/);
});

test("concurrent subscription requests use the database uniqueness key atomically", async () => {
  const source = await readFile(new URL("../src/lib/marketing-consent-store.ts", import.meta.url), "utf8");
  const requestFlow = source.slice(source.indexOf("export async function requestMarketingSubscription"), source.indexOf("export async function confirmMarketingSubscription"));
  assert.match(requestFlow, /\.upsert\(payload, \{ onConflict: "email_hash,controller_id,purpose_id,channel,scope_id" \}\)/);
  assert.doesNotMatch(requestFlow, /\.maybeSingle\(\)[\s\S]*\.insert\(payload\)/);
});
