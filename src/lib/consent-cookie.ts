export type ConsentCookieValue = {
  v: 2;
  analytics: boolean;
  marketing: boolean;
  ts: number;
};

export const trackingConsentCookieName = "lk_consent";
export const trackingConsentCookieMaxAge = 60 * 60 * 24 * 365;

function fromLegacyConsent(value: "granted" | "denied"): ConsentCookieValue {
  const granted = value === "granted";
  return {
    v: 2,
    analytics: granted,
    marketing: granted,
    ts: 0,
  };
}

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

  if (decoded === "granted" || decoded === "denied") {
    return fromLegacyConsent(decoded);
  }

  try {
    const parsed = JSON.parse(decoded) as Record<string, unknown>;
    if (
      parsed.v !== 2 ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean"
    ) {
      return null;
    }

    return {
      v: 2,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      ts: typeof parsed.ts === "number" ? parsed.ts : 0,
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
