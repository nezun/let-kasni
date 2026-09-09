import { createHash } from "node:crypto";

export const marketingControllerId = "21873446";
export const marketingPurposeId = "direct_marketing_email";
export const marketingChannel = "email";
export const marketingScopeId = "vga_passenger_consumer_rights_v1";
export const marketingConsentVersion = "1.0";
export const marketingPrivacyPolicyVersion = "1.2";
export const marketingConsentLifetimeMs = 2 * 365 * 24 * 60 * 60 * 1000;
export const confirmationTokenLifetimeMs = 24 * 60 * 60 * 1000;

export const marketingConsentText = {
  sr: "Kao punoletno lice, želim da mi VGA EU CONSULTING DOO na moju e-mail adresu šalje novosti i ponude o svojim postojećim i budućim proizvodima i uslugama za ostvarivanje i zaštitu prava putnika i potrošača, uključujući digitalne alate za te namene i druge brendove istog društva.",
  en: "As an adult, I would like VGA EU CONSULTING DOO to send news and offers to my own email address about its current and future products and services for exercising and protecting passenger and consumer rights, including digital tools for those purposes and other brands operated by the same company.",
} as const;

export type MarketingStatus = "pending" | "granted" | "withdrawn" | "expired";

export type MarketingEligibilityInput = {
  controllerId?: string | null;
  purposeId?: string | null;
  channel?: string | null;
  scopeId?: string | null;
  productScopeId?: string | null;
  status?: MarketingStatus | null;
  contactVerifiedAt?: string | null;
  confirmedAt?: string | null;
  expiresAt?: string | null;
  suppressed?: boolean;
};

export function normalizeMarketingEmail(value: string) {
  return value.trim().toLowerCase();
}

export function hashMarketingValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function sanitizeMarketingSourcePath(value: string) {
  try {
    const parsed = new URL(value, "https://letkasni.rs");
    if (parsed.origin !== "https://letkasni.rs") {
      return "/";
    }
    return parsed.pathname.startsWith("/") ? parsed.pathname.slice(0, 240) : "/";
  } catch {
    return value.startsWith("/") ? value.split(/[?#]/, 1)[0].slice(0, 240) : "/";
  }
}

export function getMarketingConsentTextHash(locale: "sr" | "en") {
  return hashMarketingValue(marketingConsentText[locale]);
}

export function getMarketingExpiry(confirmedAt: Date) {
  return new Date(confirmedAt.getTime() + marketingConsentLifetimeMs).toISOString();
}

export function isEligibleForMarketing(
  input: MarketingEligibilityInput,
  now = new Date(),
) {
  return Boolean(
    input.controllerId === marketingControllerId &&
      input.purposeId === marketingPurposeId &&
      input.channel === marketingChannel &&
      input.scopeId === marketingScopeId &&
      input.productScopeId === marketingScopeId &&
      input.status === "granted" &&
      input.contactVerifiedAt &&
      input.confirmedAt &&
      input.expiresAt &&
      new Date(input.expiresAt).getTime() > now.getTime() &&
      input.suppressed !== true,
  );
}

export function canConfirmationGrant(input: {
  status: MarketingStatus;
  confirmationExpiresAt?: string | null;
  withdrawnAt?: string | null;
}, now = new Date()) {
  return Boolean(
    input.status === "pending" &&
      !input.withdrawnAt &&
      input.confirmationExpiresAt &&
      new Date(input.confirmationExpiresAt).getTime() > now.getTime(),
  );
}
