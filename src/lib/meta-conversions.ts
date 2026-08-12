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
  phone?: string;
  customData?: Record<string, string | number | boolean>;
}

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeEmail(value: string) {
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
  if (input.phone) {
    const normalizedPhone = normalizePhone(input.phone);
    if (normalizedPhone) {
      userData.ph = [hash(normalizedPhone)];
    }
  }

  const clientIp = getClientIp(request);
  const userAgent = request.headers.get("user-agent");
  const fbp = getCookie(request, "_fbp");
  const fbc = getCookie(request, "_fbc");

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

  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: getEventId(input.eventId),
    action_source: "website",
    event_source_url: getEventSourceUrl(request, input.eventSourceUrl),
    user_data: userData,
    custom_data: {
      content_name: "flight_compensation_claim",
      content_category: "lead",
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
