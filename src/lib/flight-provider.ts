import {
  getAeroDataBoxApiHost,
  getAeroDataBoxApiKey,
  getFlightLookupTimeoutMs,
  getFlightProviderMode,
} from "@/lib/env";
import type { ClaimInput } from "@/lib/types";

const defaultTimeoutMs = getFlightLookupTimeoutMs();

export interface FlightLookupResult {
  provider: "aerodatabox";
  status:
    | "live_match"
    | "no_match"
    | "provider_unconfigured"
    | "timeout"
    | "error";
  checkedAt: string;
  timeoutMs: number;
  message?: string;
  normalized?: {
    flightNumber: string;
    flightDate: string;
    route: string;
  };
}

function buildBaseResult(
  status: FlightLookupResult["status"],
  message?: string,
): FlightLookupResult {
  return {
    provider: "aerodatabox",
    status,
    checkedAt: new Date().toISOString(),
    timeoutMs: defaultTimeoutMs,
    message,
  };
}

export async function lookupFlight(
  input: ClaimInput,
): Promise<FlightLookupResult> {
  const mode = getFlightProviderMode();
  const apiKey = getAeroDataBoxApiKey();
  const apiHost = getAeroDataBoxApiHost();

  if (!mode && !apiKey) {
    return buildBaseResult(
      "provider_unconfigured",
      "Flight provider još nije konfigurisan u ovom okruženju.",
    );
  }

  if (!mode && apiKey) {
    return lookupViaRapidApi(input, apiHost, apiKey);
  }

  if (mode === "rapidapi") {
    if (!apiKey) {
      return buildBaseResult(
        "provider_unconfigured",
        "FLIGHT_PROVIDER_MODE=rapidapi je podešen bez AERODATABOX_API_KEY vrednosti.",
      );
    }

    return lookupViaRapidApi(input, apiHost, apiKey);
  }

  if (mode === "mock_match") {
    return {
      ...buildBaseResult("live_match"),
      normalized: {
        flightNumber: input.flightNumber.trim().toUpperCase(),
        flightDate: input.flightDate,
        route: input.route.trim(),
      },
    };
  }

  if (mode === "mock_timeout") {
    return buildBaseResult(
      "timeout",
      "Lookup je prekoračio hard timeout i slučaj ide na ručnu proveru.",
    );
  }

  return buildBaseResult(
    "error",
    "Provider mode je podešen, ali adapter još nema potvrđenu live integraciju.",
  );
}

async function lookupViaRapidApi(
  input: ClaimInput,
  apiHost: string,
  apiKey: string,
): Promise<FlightLookupResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), defaultTimeoutMs);

  try {
    const searchNumber = encodeURIComponent(input.flightNumber.trim().toUpperCase());
    const searchDate = encodeURIComponent(input.flightDate.trim());
    const response = await fetch(
      `https://${apiHost}/flights/number/${searchNumber}/${searchDate}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": apiHost,
          "x-rapidapi-key": apiKey,
        },
        signal: controller.signal,
        cache: "no-store",
      },
    );

    const payload = (await response.json().catch(() => null)) as
      | Record<string, unknown>
      | Array<Record<string, unknown>>
      | null;

    if (!response.ok) {
      return buildBaseResult(
        "error",
        `Provider vratio HTTP ${response.status}.`,
      );
    }

    const candidate = Array.isArray(payload)
      ? payload.find((item) => typeof item === "object" && item !== null) ?? null
      : payload;

    if (!candidate) {
      return buildBaseResult(
        "no_match",
        "Provider nije našao let za uneti broj i datum.",
      );
    }

    const departure = asObject(candidate.departure);
    const arrival = asObject(candidate.arrival);
    const departureAirport = asObject(departure?.airport);
    const arrivalAirport = asObject(arrival?.airport);
    const number = asObject(candidate.number);

    const providerFlightNumber =
      asString(number?.default) ??
      asString(candidate.number) ??
      input.flightNumber.trim().toUpperCase();

    const departureCode =
      asString(departureAirport?.iata) ??
      asString(departureAirport?.icao) ??
      extractRouteSide(input.route, "left");

    const arrivalCode =
      asString(arrivalAirport?.iata) ??
      asString(arrivalAirport?.icao) ??
      extractRouteSide(input.route, "right");

    return {
      ...buildBaseResult("live_match"),
      normalized: {
        flightNumber: providerFlightNumber,
        flightDate: input.flightDate,
        route: [departureCode, arrivalCode].filter(Boolean).join(" -> ") || input.route.trim(),
      },
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return buildBaseResult(
        "timeout",
        "Lookup je prekoračio hard timeout i slučaj ide na ručnu proveru.",
      );
    }

    return buildBaseResult(
      "error",
      error instanceof Error ? error.message : "Nepoznata provider greška.",
    );
  } finally {
    clearTimeout(timeout);
  }
}

function asObject(value: unknown) {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

function extractRouteSide(route: string, side: "left" | "right") {
  const normalizedRoute = route
    .replaceAll("→", "->")
    .replaceAll("—", "-")
    .replaceAll("–", "-");
  const arrowParts = normalizedRoute.split("->").map((part) => part.trim());
  const parts =
    arrowParts.length === 2
      ? arrowParts
      : normalizedRoute.split("-").map((part) => part.trim());

  if (parts.length !== 2) {
    return null;
  }

  return side === "left" ? parts[0] : parts[1];
}
