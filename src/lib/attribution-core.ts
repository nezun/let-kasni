export const attributionParameterNames = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export const attributionStorageKey = "letkasni-attribution-v1";

export type AttributionParameterName =
  (typeof attributionParameterNames)[number];

export type ClaimAttribution = Partial<
  Record<AttributionParameterName, string>
> & {
  initial_landing_page: string;
  referrer?: string;
  captured_at: string;
};

const clickIdNames = ["gclid", "gbraid", "wbraid"] as const;
const paidMediumPattern = /^(cpc|ppc|paid|paid[-_ ]?search|sem)$/i;
const maximumValueLength = 500;

function cleanValue(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, maximumValueLength) : undefined;
}

function cleanPageUrl(value: string, baseOrigin?: string) {
  try {
    const parsed = new URL(value, baseOrigin);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return undefined;
    }
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString().slice(0, maximumValueLength);
  } catch {
    return undefined;
  }
}

export function hasPaidAttribution(
  attribution: Partial<ClaimAttribution> | null | undefined,
) {
  if (!attribution) return false;

  return (
    clickIdNames.some((name) => Boolean(cleanValue(attribution[name]))) ||
    paidMediumPattern.test(attribution.utm_medium ?? "")
  );
}

export function getAttributionFromPage(
  pageUrl: string,
  referrer: string,
  capturedAt = new Date().toISOString(),
): ClaimAttribution | null {
  let parsed: URL;
  try {
    parsed = new URL(pageUrl);
  } catch {
    return null;
  }

  const attribution: Partial<Record<AttributionParameterName, string>> = {};
  for (const name of attributionParameterNames) {
    const value = cleanValue(parsed.searchParams.get(name));
    if (value) attribution[name] = value;
  }

  const initialLandingPage = cleanPageUrl(parsed.toString());
  if (!initialLandingPage) return null;

  const cleanReferrer = cleanPageUrl(referrer, parsed.origin);
  return {
    ...attribution,
    initial_landing_page: initialLandingPage,
    ...(cleanReferrer ? { referrer: cleanReferrer } : {}),
    captured_at: capturedAt,
  };
}

export function sanitizeClaimAttribution(
  value: unknown,
): ClaimAttribution | undefined {
  if (!value || typeof value !== "object") return undefined;

  const input = value as Record<string, unknown>;
  const initialLandingPage =
    typeof input.initial_landing_page === "string"
      ? cleanPageUrl(input.initial_landing_page)
      : undefined;
  const capturedAt =
    typeof input.captured_at === "string" &&
    Number.isFinite(Date.parse(input.captured_at))
      ? input.captured_at
      : undefined;

  if (!initialLandingPage || !capturedAt) return undefined;

  const attribution: Partial<Record<AttributionParameterName, string>> = {};
  for (const name of attributionParameterNames) {
    if (typeof input[name] !== "string") continue;
    const clean = cleanValue(input[name]);
    if (clean) attribution[name] = clean;
  }

  const referrer =
    typeof input.referrer === "string"
      ? cleanPageUrl(input.referrer, new URL(initialLandingPage).origin)
      : undefined;

  return {
    ...attribution,
    initial_landing_page: initialLandingPage,
    ...(referrer ? { referrer } : {}),
    captured_at: capturedAt,
  };
}

export function mergeAttribution(
  existing: ClaimAttribution | null,
  incoming: ClaimAttribution,
) {
  if (!existing) return incoming;

  if (hasPaidAttribution(existing)) {
    return existing;
  }

  if (hasPaidAttribution(incoming)) {
    return incoming;
  }

  return existing;
}

export function appendAttributionParameters(
  destination: string,
  currentPageUrl: string,
) {
  try {
    const current = new URL(currentPageUrl);
    const target = new URL(destination, current.origin);

    if (target.origin !== current.origin) return destination;

    for (const name of attributionParameterNames) {
      const value = cleanValue(current.searchParams.get(name));
      if (value && !target.searchParams.has(name)) {
        target.searchParams.set(name, value);
      }
    }

    return `${target.pathname}${target.search}${target.hash}`;
  } catch {
    return destination;
  }
}
