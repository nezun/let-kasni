import { createHmac, randomBytes } from "node:crypto";

import { getMarketingConsentSecret, getSiteUrl, isMarketingSubscriptionsEnabled } from "@/lib/env";
import {
  canConfirmationGrant,
  confirmationTokenLifetimeMs,
  getMarketingConsentTextHash,
  getMarketingExpiry,
  hashMarketingValue,
  isEligibleForMarketing,
  marketingChannel,
  marketingConsentText,
  marketingConsentVersion,
  marketingControllerId,
  marketingEvidenceRetentionMs,
  marketingPrivacyPolicyVersion,
  marketingPurposeId,
  marketingScopeId,
  normalizeMarketingEmail,
  pendingMarketingRequestRetentionMs,
  sanitizeMarketingSourcePath,
} from "@/lib/marketing-consent-core";
import { sendMarketingConfirmation, sendMarketingManagementLink } from "@/lib/marketing-emails";
import { getApprovedMarketingProduct } from "@/lib/marketing-products";
import { sendMarketingDeliveryEmail } from "@/lib/notifications";
import { createSupabaseAdminClient } from "@/lib/supabase";

type Locale = "sr" | "en";

export class MarketingUnavailableError extends Error {
  constructor() {
    super("Marketing subscriptions are not fully configured.");
  }
}

function requireEnabled() {
  if (!isMarketingSubscriptionsEnabled()) {
    throw new MarketingUnavailableError();
  }
}

function tokenHash(token: string) {
  const secret = getMarketingConsentSecret();
  if (!secret) throw new MarketingUnavailableError();
  return createHmac("sha256", secret).update(token).digest("hex");
}

function newToken() {
  return randomBytes(32).toString("base64url");
}

const identityFilter = {
  controller_id: marketingControllerId,
  purpose_id: marketingPurposeId,
  channel: marketingChannel,
  scope_id: marketingScopeId,
};

async function addEvent(input: {
  subscriptionId: string;
  eventType: "requested" | "confirmation_sent" | "confirmed" | "withdrawn" | "expired" | "management_link_sent";
  locale: Locale;
  sourcePath: string;
  actor: "subscriber" | "system" | "operator";
  evidence?: Record<string, string | boolean>;
}) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("marketing_consent_events").insert({
    subscription_id: input.subscriptionId,
    event_type: input.eventType,
    locale: input.locale,
    source_path: sanitizeMarketingSourcePath(input.sourcePath),
    actor: input.actor,
    evidence: input.evidence ?? {},
  });
  if (error) throw error;
}

export async function requestMarketingSubscription(input: {
  email: string;
  locale: Locale;
  sourcePath: string;
}) {
  requireEnabled();
  const supabase = createSupabaseAdminClient();
  const email = normalizeMarketingEmail(input.email);
  const emailHash = hashMarketingValue(email);
  const confirmationToken = newToken();
  const unsubscribeToken = newToken();
  const now = new Date();
  const requestedAt = now.toISOString();
  const confirmationExpiresAt = new Date(now.getTime() + confirmationTokenLifetimeMs).toISOString();
  const sourcePath = sanitizeMarketingSourcePath(input.sourcePath);

  const payload = {
    email,
    email_hash: emailHash,
    ...identityFilter,
    locale: input.locale,
    consent_text: marketingConsentText[input.locale],
    consent_version: marketingConsentVersion,
    consent_text_hash: getMarketingConsentTextHash(input.locale),
    privacy_policy_version: marketingPrivacyPolicyVersion,
    source_path: sourcePath,
    status: "pending",
    requested_at: requestedAt,
    contact_verified_at: null,
    confirmed_at: null,
    withdrawn_at: null,
    expires_at: null,
    confirmation_token_hash: tokenHash(confirmationToken),
    confirmation_expires_at: confirmationExpiresAt,
    unsubscribe_token_hash: tokenHash(unsubscribeToken),
    last_explicit_confirmation_at: null,
    updated_at: requestedAt,
  };

  const { data: saved, error: saveError } = await supabase
    .from("marketing_email_subscriptions")
    .upsert(payload, { onConflict: "email_hash,controller_id,purpose_id,channel,scope_id" })
    .select("id")
    .single();
  if (saveError || !saved) throw saveError ?? new Error("Consent request was not stored.");

  await addEvent({
    subscriptionId: saved.id,
    eventType: "requested",
    locale: input.locale,
    sourcePath,
    actor: "subscriber",
    evidence: { interaction: "explicit_checkbox_and_button", contact_state: "pending" },
  });

  const delivery = await sendMarketingConfirmation({
    email,
    locale: input.locale,
    token: confirmationToken,
    subscriptionId: saved.id,
    requestVersion: requestedAt,
  });
  if (delivery.skipped) throw new MarketingUnavailableError();

  await addEvent({
    subscriptionId: saved.id,
    eventType: "confirmation_sent",
    locale: input.locale,
    sourcePath,
    actor: "system",
    evidence: { message_type: "neutral_double_opt_in" },
  });
  return { status: "pending" as const };
}

export async function confirmMarketingSubscription(token: string) {
  requireEnabled();
  const supabase = createSupabaseAdminClient();
  const hash = tokenHash(token);
  const { data: record, error } = await supabase
    .from("marketing_email_subscriptions")
    .select("*")
    .eq("confirmation_token_hash", hash)
    .maybeSingle();
  if (error) throw error;
  if (!record) return { status: "invalid" as const };
  if (record.status === "granted") return { status: "granted" as const, locale: record.locale as Locale };
  if (!canConfirmationGrant({ status: record.status, confirmationExpiresAt: record.confirmation_expires_at, withdrawnAt: record.withdrawn_at })) {
    return { status: "invalid" as const };
  }

  const now = new Date();
  const confirmedAt = now.toISOString();
  const { data: updated, error: updateError } = await supabase
    .from("marketing_email_subscriptions")
    .update({
      status: "granted",
      contact_verified_at: confirmedAt,
      confirmed_at: confirmedAt,
      last_explicit_confirmation_at: confirmedAt,
      expires_at: getMarketingExpiry(now),
      updated_at: confirmedAt,
    })
    .eq("id", record.id)
    .eq("status", "pending")
    .select("id")
    .maybeSingle();
  if (updateError) throw updateError;
  if (!updated) return { status: "invalid" as const };

  const { error: suppressionError } = await supabase
    .from("marketing_email_suppressions")
    .delete()
    .eq("email_hash", record.email_hash)
    .eq("controller_id", marketingControllerId)
    .eq("purpose_id", marketingPurposeId)
    .eq("channel", marketingChannel)
    .eq("scope_id", marketingScopeId);
  if (suppressionError) throw suppressionError;

  await addEvent({ subscriptionId: record.id, eventType: "confirmed", locale: record.locale, sourcePath: "/marketing/confirm", actor: "subscriber", evidence: { interaction: "confirmed_post" } });
  return { status: "granted" as const, locale: record.locale as Locale };
}

export async function unsubscribeMarketing(token: string, actor: "subscriber" | "operator" = "subscriber") {
  requireEnabled();
  const supabase = createSupabaseAdminClient();
  const { data: record, error } = await supabase
    .from("marketing_email_subscriptions")
    .select("*")
    .eq("unsubscribe_token_hash", tokenHash(token))
    .maybeSingle();
  if (error) throw error;
  if (!record) return { status: "invalid" as const };
  if (record.status === "withdrawn") return { status: "withdrawn" as const, locale: record.locale as Locale };

  const now = new Date();
  const withdrawnAt = now.toISOString();
  const { error: updateError } = await supabase
    .from("marketing_email_subscriptions")
    .update({ status: "withdrawn", withdrawn_at: withdrawnAt, updated_at: withdrawnAt })
    .eq("id", record.id);
  if (updateError) throw updateError;

  const { error: suppressionError } = await supabase.from("marketing_email_suppressions").upsert({
    email_hash: record.email_hash,
    ...identityFilter,
    suppressed_at: withdrawnAt,
    reason: "unsubscribe",
    review_due_at: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: withdrawnAt,
  });
  if (suppressionError) throw suppressionError;

  await addEvent({ subscriptionId: record.id, eventType: "withdrawn", locale: record.locale, sourcePath: "/email-offers", actor, evidence: { interaction: actor === "subscriber" ? "unsubscribe_post" : "operator_mailbox_request" } });
  return { status: "withdrawn" as const, locale: record.locale as Locale };
}

export async function requestMarketingManagementLink(input: { email: string; locale: Locale; sourcePath: string }) {
  requireEnabled();
  const supabase = createSupabaseAdminClient();
  const emailHash = hashMarketingValue(normalizeMarketingEmail(input.email));
  const { data: record, error } = await supabase
    .from("marketing_email_subscriptions")
    .select("id,email,locale,unsubscribe_token_hash")
    .eq("email_hash", emailHash)
    .eq("controller_id", marketingControllerId)
    .eq("purpose_id", marketingPurposeId)
    .eq("channel", marketingChannel)
    .eq("scope_id", marketingScopeId)
    .maybeSingle();
  if (error) throw error;
  if (!record) return { status: "accepted" as const };

  // Rotate the long-lived management token so a leaked older link stops working.
  const rawToken = newToken();
  const { error: updateError } = await supabase
    .from("marketing_email_subscriptions")
    .update({ unsubscribe_token_hash: tokenHash(rawToken), updated_at: new Date().toISOString() })
    .eq("id", record.id);
  if (updateError) throw updateError;

  const delivery = await sendMarketingManagementLink({ email: record.email, locale: input.locale, token: rawToken, subscriptionId: record.id });
  if (!delivery.skipped) {
    await addEvent({ subscriptionId: record.id, eventType: "management_link_sent", locale: input.locale, sourcePath: input.sourcePath, actor: "subscriber" });
  }
  return { status: "accepted" as const };
}

export async function withdrawMarketingByEmail(input: { email: string; locale: Locale }) {
  requireEnabled();
  const supabase = createSupabaseAdminClient();
  const emailHash = hashMarketingValue(normalizeMarketingEmail(input.email));
  const { data: record, error } = await supabase
    .from("marketing_email_subscriptions")
    .select("*")
    .eq("email_hash", emailHash)
    .eq("controller_id", marketingControllerId)
    .eq("purpose_id", marketingPurposeId)
    .eq("channel", marketingChannel)
    .eq("scope_id", marketingScopeId)
    .maybeSingle();
  if (error) throw error;
  if (!record || record.status === "withdrawn") return { status: "withdrawn" as const };
  const now = new Date();
  const withdrawnAt = now.toISOString();
  const { error: updateError } = await supabase
    .from("marketing_email_subscriptions")
    .update({ status: "withdrawn", withdrawn_at: withdrawnAt, updated_at: withdrawnAt })
    .eq("id", record.id);
  if (updateError) throw updateError;
  const { error: suppressionError } = await supabase.from("marketing_email_suppressions").upsert({
    email_hash: emailHash,
    ...identityFilter,
    suppressed_at: withdrawnAt,
    reason: "operator_mailbox_request",
    review_due_at: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: withdrawnAt,
  });
  if (suppressionError) throw suppressionError;
  await addEvent({ subscriptionId: record.id, eventType: "withdrawn", locale: input.locale, sourcePath: "/admin/marketing", actor: "operator", evidence: { interaction: "operator_mailbox_request" } });
  return { status: "withdrawn" as const };
}

export async function listEligibleMarketingRecipients(productId: string) {
  requireEnabled();
  const approvedProduct = getApprovedMarketingProduct(productId);
  if (!approvedProduct) return [];
  const supabase = createSupabaseAdminClient();
  const now = new Date();
  const { data: subscriptions, error } = await supabase
    .from("marketing_email_subscriptions")
    .select("*")
    .eq("controller_id", marketingControllerId)
    .eq("purpose_id", marketingPurposeId)
    .eq("channel", marketingChannel)
    .eq("scope_id", marketingScopeId)
    .eq("status", "granted")
    .gt("expires_at", now.toISOString());
  if (error) throw error;
  const { data: suppressions, error: suppressionError } = await supabase
    .from("marketing_email_suppressions")
    .select("email_hash")
    .eq("controller_id", marketingControllerId)
    .eq("purpose_id", marketingPurposeId)
    .eq("channel", marketingChannel)
    .eq("scope_id", marketingScopeId);
  if (suppressionError) throw suppressionError;
  const blocked = new Set((suppressions ?? []).map((item) => item.email_hash));

  return (subscriptions ?? [])
    .filter((record) => isEligibleForMarketing({
      controllerId: record.controller_id,
      purposeId: record.purpose_id,
      channel: record.channel,
      scopeId: record.scope_id,
      productScopeId: approvedProduct.scopeId,
      status: record.status,
      contactVerifiedAt: record.contact_verified_at,
      confirmedAt: record.confirmed_at,
      expiresAt: record.expires_at,
      suppressed: blocked.has(record.email_hash),
    }, now))
    .map((record) => ({ email: record.email as string, locale: record.locale as Locale, scopeId: record.scope_id as string }));
}

export async function sendEligibleMarketingEmail(input: {
  subscriptionId: string;
  productId: string;
  messageId: string;
  subject: string;
  html: string;
  text: string;
}) {
  requireEnabled();
  const approvedProduct = getApprovedMarketingProduct(input.productId);
  if (!approvedProduct) return { sent: false as const, reason: "product_not_approved" as const };
  const supabase = createSupabaseAdminClient();
  const { data: record, error } = await supabase
    .from("marketing_email_subscriptions")
    .select("*")
    .eq("id", input.subscriptionId)
    .maybeSingle();
  if (error) throw error;
  if (!record) return { sent: false as const, reason: "not_eligible" as const };
  const { data: suppression, error: suppressionError } = await supabase
    .from("marketing_email_suppressions")
    .select("email_hash")
    .eq("email_hash", record.email_hash)
    .eq("controller_id", marketingControllerId)
    .eq("purpose_id", marketingPurposeId)
    .eq("channel", marketingChannel)
    .eq("scope_id", marketingScopeId)
    .maybeSingle();
  if (suppressionError) throw suppressionError;
  if (!isEligibleForMarketing({
    controllerId: record.controller_id,
    purposeId: record.purpose_id,
    channel: record.channel,
    scopeId: record.scope_id,
    productScopeId: approvedProduct.scopeId,
    status: record.status,
    contactVerifiedAt: record.contact_verified_at,
    confirmedAt: record.confirmed_at,
    expiresAt: record.expires_at,
    suppressed: Boolean(suppression),
  })) return { sent: false as const, reason: "not_eligible" as const };

  const rawToken = newToken();
  const { data: gatedRecord, error: tokenError } = await supabase
    .from("marketing_email_subscriptions")
    .update({ unsubscribe_token_hash: tokenHash(rawToken), updated_at: new Date().toISOString() })
    .eq("id", record.id)
    .eq("status", "granted")
    .gt("expires_at", new Date().toISOString())
    .select("id")
    .maybeSingle();
  if (tokenError) throw tokenError;
  if (!gatedRecord) return { sent: false as const, reason: "not_eligible" as const };
  const localizedPath = record.locale === "en" ? "/en/email-offers" : "/email-offers";
  const manageUrl = `${getSiteUrl()}${localizedPath}?token=${encodeURIComponent(rawToken)}`;
  const oneClickUrl = `${getSiteUrl()}/api/marketing/unsubscribe?token=${encodeURIComponent(rawToken)}`;
  const label = record.locale === "en" ? "Unsubscribe from VGA email offers" : "Odjavi me sa VGA e-mail ponuda";
  const html = `${input.html}<p style="margin-top:24px"><a href="${manageUrl}">${label}</a></p>`;
  const text = `${input.text}\n\n${label}: ${manageUrl}`;
  const delivery = await sendMarketingDeliveryEmail({
    to: record.email,
    subject: input.subject,
    html,
    text,
    headers: { "List-Unsubscribe": `<${oneClickUrl}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
    idempotencyKey: `marketing/${input.messageId}/${record.id}`,
    reference: record.id,
    locale: record.locale,
  });
  return delivery.skipped ? { sent: false as const, reason: "provider_unavailable" as const } : { sent: true as const, id: delivery.id };
}

export async function expireMarketingRecords() {
  requireEnabled();
  const supabase = createSupabaseAdminClient();
  const currentTime = new Date();
  const now = currentTime.toISOString();
  const { data: expired, error } = await supabase
    .from("marketing_email_subscriptions")
    .update({ status: "expired", updated_at: now })
    .eq("status", "granted")
    .lte("expires_at", now)
    .is("legal_hold_until", null)
    .select("id,locale");
  if (error) throw error;
  for (const record of expired ?? []) {
    await addEvent({ subscriptionId: record.id, eventType: "expired", locale: record.locale, sourcePath: "/internal/retention", actor: "system" });
  }
  const { error: tokenCleanupError } = await supabase
    .from("marketing_email_subscriptions")
    .update({ confirmation_token_hash: null, confirmation_expires_at: null, updated_at: now })
    .eq("status", "pending")
    .lte("confirmation_expires_at", now)
    .is("legal_hold_until", null);
  if (tokenCleanupError) throw tokenCleanupError;

  const pendingCutoff = new Date(currentTime.getTime() - pendingMarketingRequestRetentionMs).toISOString();
  const { data: deletedPending, error: pendingDeleteError } = await supabase
    .from("marketing_email_subscriptions")
    .delete()
    .eq("status", "pending")
    .lt("requested_at", pendingCutoff)
    .is("legal_hold_until", null)
    .select("id");
  if (pendingDeleteError) throw pendingDeleteError;

  const evidenceCutoff = new Date(currentTime.getTime() - marketingEvidenceRetentionMs).toISOString();
  const { data: deletedWithdrawn, error: withdrawnDeleteError } = await supabase
    .from("marketing_email_subscriptions")
    .delete()
    .eq("status", "withdrawn")
    .lt("withdrawn_at", evidenceCutoff)
    .is("legal_hold_until", null)
    .select("id");
  if (withdrawnDeleteError) throw withdrawnDeleteError;

  const { data: deletedExpired, error: expiredDeleteError } = await supabase
    .from("marketing_email_subscriptions")
    .delete()
    .eq("status", "expired")
    .lt("expires_at", evidenceCutoff)
    .is("legal_hold_until", null)
    .select("id");
  if (expiredDeleteError) throw expiredDeleteError;

  const { count: suppressionReviewsDue, error: suppressionReviewError } = await supabase
    .from("marketing_email_suppressions")
    .select("email_hash", { count: "exact", head: true })
    .lte("review_due_at", now)
    .is("legal_hold_until", null);
  if (suppressionReviewError) throw suppressionReviewError;

  return {
    expired: expired?.length ?? 0,
    deletedPending: deletedPending?.length ?? 0,
    deletedEvidence: (deletedWithdrawn?.length ?? 0) + (deletedExpired?.length ?? 0),
    suppressionReviewsDue: suppressionReviewsDue ?? 0,
  };
}
