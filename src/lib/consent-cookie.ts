export type ConsentCookieValue = {
  v: 3;
  analytics: boolean;
  marketing: boolean;
  ts: number;
  notice: typeof trackingConsentNoticeVersion;
};

export const trackingConsentCookieName = "lk_consent";
export const trackingConsentCookieMaxAge = 60 * 60 * 24 * 365;
export const trackingConsentNoticeVersion = "privacy-1.2-2026-09-10";

export function parseTrackingConsentValue(
  value: string | null | undefined,
): ConsentCookieValue | null {
  if (!value) {
    return null;
  }

  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    // Use the raw value when a malformed cookie cannot be decoded.
  }

  try {
    const parsed = JSON.parse(decoded) as Record<string, unknown>;
    if (
      parsed.v !== 3 ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean" ||
      parsed.notice !== trackingConsentNoticeVersion ||
      typeof parsed.ts !== "number" ||
      parsed.ts <= 0
    ) {
      return null;
    }

    return {
      v: 3,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      ts: parsed.ts,
      notice: trackingConsentNoticeVersion,
    };
  } catch {
    return null;
  }
}

export function serializeTrackingConsentCookie(value: ConsentCookieValue) {
  return encodeURIComponent(JSON.stringify(value));
}

export function getCookieHeaderValue(
  cookieHeader: string | null | undefined,
  name: string,
) {
  if (!cookieHeader) {
    return undefined;
  }

  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}=([^;]*)`),
  );

  return match?.[1] || undefined;
}
