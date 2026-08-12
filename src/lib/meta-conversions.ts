import { createHash } from "node:crypto";

import {
  getMetaConversionsApiToken,
  getMetaGraphApiVersion,
  getMetaPixelId,
  getMetaTestEventCode,
} from "@/lib/env";

interface MetaLeadEventInput {
  eventId?: string;
  eventSourceUrl?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  externalId?: string;
  locale?: "sr" | "en";
  customData?: Record<string, string | number | boolean>;
}

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function normalizeName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ");
}

function normalizeCountry(value: string) {
  return value.trim().toLowerCase();
}

function normalizePhone(value: string) {
  return value.replace(/[^0-9]/g, "");
}

function getCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(
    new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}=([^;]*)`),
  );

  if (!match?.[1]) {
    return undefined;
  }

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || undefined;
}

function getCountryCode(request: Request, locale?: "sr" | "en") {
  const geoCountry =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry");

  if (geoCountry && /^[a-z]{2}$/i.test(geoCountry.trim())) {
    return normalizeCountry(geoCountry);
  }

  // The Serbian locale is an honest product-level fallback. Do not label
  // English-language visitors as Serbian without a geo signal.
  return locale === "sr" ? "rs" : undefined;
}

function getFbcFromUrl(request: Request, candidate?: string) {
  const requestOrigin = new URL(request.url).origin;

  for (const value of [candidate, request.headers.get("referer"), request.url]) {
    if (!value) {
      continue;
    }

    try {
      const parsed = new URL(value, requestOrigin);
      if (parsed.origin !== requestOrigin) {
        continue;
      }

      const fbclid = parsed.searchParams.get("fbclid")?.trim();
      if (fbclid && fbclid.length <= 500) {
        return `fb.1.${Date.now()}.${fbclid}`;
      }
    } catch {
      // Ignore invalid URLs and continue to the next request signal.
    }
  }

  return undefined;
}

function getEventSourceUrl(request: Request, candidate?: string) {
  const requestOrigin = new URL(request.url).origin;
  const fallback = request.headers.get("referer") ?? request.url;

  for (const value of [candidate, fallback]) {
    if (!value) {
      continue;
    }

    try {
      const parsed = new URL(value, requestOrigin);
      if (parsed.origin === requestOrigin) {
        return parsed.toString();
      }
    } catch {
      // Ignore invalid or cross-origin values and use the next fallback.
    }
  }

  return requestOrigin;
}

function getEventId(value?: string) {
  if (value && /^[a-zA-Z0-9._:-]{8,200}$/.test(value)) {
    return value;
  }

  return `server-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function sendMetaLeadEvent(
  request: Request,
  input: MetaLeadEventInput,
) {
  const pixelId = getMetaPixelId();
  const accessToken = getMetaConversionsApiToken();

  if (!pixelId || !accessToken) {
    return { sent: false, reason: "not_configured" as const };
  }

  const userData: Record<string, string | string[]> = {};
  if (input.email) {
    userData.em = [hash(normalizeEmail(input.email))];
  }
  if (input.firstName) {
    const normalizedFirstName = normalizeName(input.firstName);
    if (normalizedFirstName) {
      userData.fn = [hash(normalizedFirstName)];
    }
  }
  if (input.lastName) {
    const normalizedLastName = normalizeName(input.lastName);
    if (normalizedLastName) {
      userData.ln = [hash(normalizedLastName)];
    }
  }
  if (input.phone) {
    const normalizedPhone = normalizePhone(input.phone);
    if (normalizedPhone) {
      userData.ph = [hash(normalizedPhone)];
    }
  }
  if (input.externalId) {
    const normalizedExternalId = input.externalId.trim().toLowerCase();
    if (normalizedExternalId) {
      userData.external_id = [hash(normalizedExternalId)];
    }
  }

  const clientIp = getClientIp(request);
  const userAgent = request.headers.get("user-agent");
  const fbp = getCookie(request, "_fbp");
  const fbc = getCookie(request, "_fbc") ?? getFbcFromUrl(request, input.eventSourceUrl);
  const country = getCountryCode(request, input.locale);

  if (clientIp) {
    userData.client_ip_address = clientIp;
  }
  if (userAgent) {
    userData.client_user_agent = userAgent;
  }
  if (fbp) {
    userData.fbp = fbp;
  }
  if (fbc) {
    userData.fbc = fbc;
  }
  if (country) {
    userData.country = [hash(normalizeCountry(country))];
  }

  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: getEventId(input.eventId),
    action_source: "website",
    event_source_url: getEventSourceUrl(request, input.eventSourceUrl),
    user_data: userData,
    custom_data: {
      content_name: "flight_compensation_claim",
      content_category: "claim",
      ...input.customData,
    },
  };

  const payload: Record<string, unknown> = {
    data: [event],
    access_token: accessToken,
  };
  const testEventCode = getMetaTestEventCode();
  if (testEventCode) {
    payload.test_event_code = testEventCode;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch(
      `https://graph.facebook.com/${getMetaGraphApiVersion()}/${pixelId}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      console.error("Meta Conversions API request failed.", {
        status: response.status,
        eventName: event.event_name,
      });
      return { sent: false, reason: "api_error" as const };
    }

    return { sent: true as const };
  } catch (error) {
    console.error("Meta Conversions API request failed.", {
      eventName: event.event_name,
      error: error instanceof Error ? error.message : "unknown_error",
    });
    return { sent: false, reason: "request_error" as const };
  } finally {
    clearTimeout(timeout);
  }
}
