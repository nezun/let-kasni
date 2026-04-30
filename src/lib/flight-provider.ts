import {
  getAeroDataBoxApiHost,
  getAeroDataBoxApiKey,
  getAviationEdgeApiKey,
  getFlightLookupTimeoutMs,
  getFlightProviderDailyLimit,
  getFlightProviderMode,
} from "@/lib/env";
import type { ClaimInput, FlightProviderSnapshot } from "@/lib/types";

const defaultTimeoutMs = getFlightLookupTimeoutMs();
const aviationEdgeBaseUrl = "https://aviation-edge.com/v2/public/flightsHistory";
const oneDayMs = 24 * 60 * 60 * 1000;
const providerCache = new Map<string, FlightProviderSnapshot>();

let budgetWindow = currentUtcDateKey();
let aviationEdgeCallsInWindow = 0;

export type FlightLookupResult = FlightProviderSnapshot;

export interface FlightLookupOptions {
  skipProvider?: boolean;
  skipReason?: string;
}

function buildBaseResult(
  provider: FlightLookupResult["provider"],
  status: FlightLookupResult["status"],
  message?: string,
): FlightLookupResult {
  return {
    provider,
    status,
    checkedAt: new Date().toISOString(),
    timeoutMs: defaultTimeoutMs,
    message,
  };
}

export async function lookupFlight(
  input: ClaimInput,
  options?: FlightLookupOptions,
): Promise<FlightLookupResult> {
  const mode = getFlightProviderMode();

  if (options?.skipProvider) {
    return buildBaseResult(
      mode === "aviation_edge" ? "aviation_edge" : "aerodatabox",
      "provider_skipped_budget",
      options.skipReason ?? "Provider lookup je preskočen zbog zaštite forme.",
    );
  }

  if (mode === "aviation_edge") {
    const apiKey = getAviationEdgeApiKey();

    if (!apiKey) {
      return buildBaseResult(
        "aviation_edge",
        "provider_unconfigured",
        "FLIGHT_PROVIDER_MODE=aviation_edge je podešen bez AVIATION_EDGE_API_KEY vrednosti.",
      );
    }

    return lookupViaAviationEdge(input, apiKey);
  }

  const apiKey = getAeroDataBoxApiKey();
  const apiHost = getAeroDataBoxApiHost();

  if (!mode && !apiKey) {
    return buildBaseResult(
      "aerodatabox",
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
        "aerodatabox",
        "provider_unconfigured",
        "FLIGHT_PROVIDER_MODE=rapidapi je podešen bez AERODATABOX_API_KEY vrednosti.",
      );
    }

    return lookupViaRapidApi(input, apiHost, apiKey);
  }

  if (mode === "mock_match") {
    return {
      ...buildBaseResult("aerodatabox", "live_match"),
      matchConfidence: "high",
      normalized: {
        flightNumber: input.flightNumber.trim().toUpperCase(),
        flightDate: input.flightDate,
        route: input.route.trim(),
      },
    };
  }

  if (mode === "mock_timeout") {
    return buildBaseResult(
      "aerodatabox",
      "timeout",
      "Lookup je prekoračio hard timeout i slučaj ide na ručnu proveru.",
    );
  }

  return buildBaseResult(
    "aerodatabox",
    "error",
    "Provider mode je podešen, ali adapter još nema potvrđenu live integraciju.",
  );
}

async function lookupViaAviationEdge(
  input: ClaimInput,
  apiKey: string,
): Promise<FlightLookupResult> {
  const normalizedInput = normalizeInput(input);
  const cacheKey = buildCacheKey(normalizedInput);
  const cached = providerCache.get(cacheKey);

  if (cached) {
    return {
      ...cached,
      checkedAt: new Date().toISOString(),
      rawSummary: {
        ...(cached.rawSummary ?? {}),
        cacheHit: true,
      },
    };
  }

  const dateStatus = validateHistoricalDate(normalizedInput.flightDate);

  if (dateStatus) {
    const result = {
      ...buildBaseResult("aviation_edge", "outside_provider_window", dateStatus),
      normalized: normalizedInput,
    };
    providerCache.set(cacheKey, result);
    return result;
  }

  if (!normalizedInput.departureCode && !normalizedInput.arrivalCode) {
    return {
      ...buildBaseResult(
        "aviation_edge",
        "no_match",
        "Ruta nema prepoznatljive IATA kodove za provider lookup.",
      ),
      normalized: normalizedInput,
      matchConfidence: "low",
    };
  }

  const estimatedRequestCount =
    (normalizedInput.departureCode ? 1 : 0) +
    (normalizedInput.arrivalCode &&
    normalizedInput.arrivalCode !== normalizedInput.departureCode
      ? 1
      : 0);

  if (!reserveAviationEdgeCalls(estimatedRequestCount)) {
    return {
      ...buildBaseResult(
        "aviation_edge",
        "provider_skipped_budget",
        "Dnevni provider limit je dostignut; prijava ide na ručnu proveru.",
      ),
      normalized: normalizedInput,
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), defaultTimeoutMs);

  try {
    const candidates = await fetchAviationEdgeCandidates(
      normalizedInput,
      apiKey,
      controller.signal,
    );
    const match = pickBestAviationEdgeMatch(candidates, normalizedInput);

    if (!match) {
      const result = {
        ...buildBaseResult(
          "aviation_edge",
          "no_match",
          "Aviation Edge nije našao pouzdan match za uneti let.",
        ),
        normalized: normalizedInput,
        matchConfidence: "low" as const,
        rawSummary: {
          checkedCandidates: candidates.length,
        },
      };
      providerCache.set(cacheKey, result);
      return result;
    }

    const snapshot = mapAviationEdgeMatch(match.item, normalizedInput, match.score);
    providerCache.set(cacheKey, snapshot);
    return snapshot;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return {
        ...buildBaseResult(
          "aviation_edge",
          "timeout",
          "Aviation Edge lookup je prekoračio hard timeout i slučaj ide na ručnu proveru.",
        ),
        normalized: normalizedInput,
      };
    }

    return {
      ...buildBaseResult(
        "aviation_edge",
        "error",
        error instanceof Error ? error.message : "Nepoznata Aviation Edge greška.",
      ),
      normalized: normalizedInput,
    };
  } finally {
    clearTimeout(timeout);
  }
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
        "aerodatabox",
        "error",
        `Provider vratio HTTP ${response.status}.`,
      );
    }

    const candidate = Array.isArray(payload)
      ? payload.find((item) => typeof item === "object" && item !== null) ?? null
      : payload;

    if (!candidate) {
      return buildBaseResult(
        "aerodatabox",
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
      ...buildBaseResult("aerodatabox", "live_match"),
      matchConfidence: "medium",
      normalized: {
        flightNumber: providerFlightNumber,
        flightDate: input.flightDate,
        route: [departureCode, arrivalCode].filter(Boolean).join(" -> ") || input.route.trim(),
      },
    };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return buildBaseResult(
        "aerodatabox",
        "timeout",
        "Lookup je prekoračio hard timeout i slučaj ide na ručnu proveru.",
      );
    }

    return buildBaseResult(
      "aerodatabox",
      "error",
      error instanceof Error ? error.message : "Nepoznata provider greška.",
    );
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchAviationEdgeCandidates(
  input: NormalizedProviderInput,
  apiKey: string,
  signal: AbortSignal,
) {
  const requests: Array<{ code: string; type: "departure" | "arrival" }> = [];

  if (input.departureCode) {
    requests.push({ code: input.departureCode, type: "departure" });
  }

  if (input.arrivalCode && input.arrivalCode !== input.departureCode) {
    requests.push({ code: input.arrivalCode, type: "arrival" });
  }

  const results = await Promise.allSettled(
    requests.map(async (request) => {
      const url = new URL(aviationEdgeBaseUrl);
      url.searchParams.set("key", apiKey);
      url.searchParams.set("code", request.code);
      url.searchParams.set("type", request.type);
      url.searchParams.set("date_from", input.flightDate);
      url.searchParams.set("date_to", input.flightDate);

      if (input.flightDigits) {
        url.searchParams.set("flight_number", input.flightDigits);
      }

      const response = await fetch(url, {
        method: "GET",
        signal,
        cache: "no-store",
      });
      const payload = (await response.json().catch(() => null)) as unknown;

      if (!response.ok) {
        throw new Error(`Aviation Edge vratio HTTP ${response.status}.`);
      }

      if (isAviationEdgeError(payload)) {
        throw new Error("Aviation Edge je vratio error payload.");
      }

      const rows = Array.isArray(payload)
        ? payload.filter((item): item is Record<string, unknown> => Boolean(asObject(item)))
        : [];

      return rows;
    }),
  );

  const batches = results
    .filter(
      (result): result is PromiseFulfilledResult<Array<Record<string, unknown>>> =>
        result.status === "fulfilled",
    )
    .map((result) => result.value);
  const rows = batches.flat();

  if (rows.length > 0) {
    return rows;
  }

  const firstFailure = results.find(
    (result): result is PromiseRejectedResult => result.status === "rejected",
  );

  if (firstFailure) {
    throw firstFailure.reason instanceof Error
      ? firstFailure.reason
      : new Error("Aviation Edge lookup nije uspeo.");
  }

  return rows;
}

function pickBestAviationEdgeMatch(
  candidates: Array<Record<string, unknown>>,
  input: NormalizedProviderInput,
) {
  let best: { item: Record<string, unknown>; score: number } | null = null;

  for (const item of candidates) {
    const score = scoreAviationEdgeCandidate(item, input);

    if (score >= 4 && (!best || score > best.score)) {
      best = { item, score };
    }
  }

  return best;
}

function scoreAviationEdgeCandidate(
  item: Record<string, unknown>,
  input: NormalizedProviderInput,
) {
  const flight = asObject(item.flight);
  const departure = asObject(item.departure);
  const arrival = asObject(item.arrival);
  const providerIata = asString(flight?.iataNumber)?.toUpperCase();
  const providerDigits = asString(flight?.number);
  const depCode = asString(departure?.iataCode)?.toUpperCase();
  const arrCode = asString(arrival?.iataCode)?.toUpperCase();
  const scheduledDeparture = asString(departure?.scheduledTime);
  const scheduledArrival = asString(arrival?.scheduledTime);

  let score = 0;

  if (providerIata && providerIata === input.flightNumber) {
    score += 4;
  } else if (providerDigits && input.flightDigits && providerDigits === input.flightDigits) {
    score += 2;
  }

  if (depCode && input.departureCode && depCode === input.departureCode) {
    score += 2;
  }

  if (arrCode && input.arrivalCode && arrCode === input.arrivalCode) {
    score += 2;
  }

  if (
    (scheduledDeparture && scheduledDeparture.startsWith(input.flightDate)) ||
    (scheduledArrival && scheduledArrival.startsWith(input.flightDate))
  ) {
    score += 1;
  }

  return score;
}

function mapAviationEdgeMatch(
  item: Record<string, unknown>,
  input: NormalizedProviderInput,
  score: number,
): FlightLookupResult {
  const flight = asObject(item.flight);
  const airline = asObject(item.airline);
  const departure = asObject(item.departure);
  const arrival = asObject(item.arrival);
  const depCode = asString(departure?.iataCode)?.toUpperCase();
  const arrCode = asString(arrival?.iataCode)?.toUpperCase();
  const providerFlightNumber =
    asString(flight?.iataNumber)?.toUpperCase() ?? input.flightNumber;

  return {
    ...buildBaseResult("aviation_edge", "live_match"),
    matchConfidence: score >= 8 ? "high" : score >= 6 ? "medium" : "low",
    normalized: {
      flightNumber: providerFlightNumber,
      flightDate: input.flightDate,
      route: [depCode, arrCode].filter(Boolean).join(" -> ") || input.route,
    },
    flight: {
      iataNumber: asString(flight?.iataNumber)?.toUpperCase() ?? undefined,
      number: asString(flight?.number) ?? undefined,
    },
    airline: {
      iataCode: asString(airline?.iataCode)?.toUpperCase() ?? undefined,
      name: asString(airline?.name) ?? undefined,
    },
    departure: {
      iataCode: depCode,
      scheduledTime: asString(departure?.scheduledTime) ?? undefined,
      actualTime: asString(departure?.actualTime) ?? undefined,
      estimatedTime: asString(departure?.estimatedTime) ?? undefined,
      delayMinutes: asNumber(departure?.delay),
    },
    arrival: {
      iataCode: arrCode,
      scheduledTime: asString(arrival?.scheduledTime) ?? undefined,
      actualTime: asString(arrival?.actualTime) ?? undefined,
      estimatedTime: asString(arrival?.estimatedTime) ?? undefined,
      delayMinutes: asNumber(arrival?.delay),
    },
    rawSummary: {
      status: asString(item.status),
      type: asString(item.type),
      score,
      hasCodeshare: Boolean(asObject(item.codeshared)),
    },
  };
}

interface NormalizedProviderInput {
  flightNumber: string;
  flightDigits: string | null;
  flightDate: string;
  route: string;
  departureCode: string | null;
  arrivalCode: string | null;
}

function normalizeInput(input: ClaimInput): NormalizedProviderInput {
  const flightNumber = input.flightNumber.trim().toUpperCase().replace(/\s+/g, "");
  const flightDigits = flightNumber.match(/\d+/)?.[0] ?? null;
  const departureCode = normalizeAirportCode(extractRouteSide(input.route, "left"));
  const arrivalCode = normalizeAirportCode(extractRouteSide(input.route, "right"));

  return {
    flightNumber,
    flightDigits,
    flightDate: input.flightDate.trim(),
    route: input.route.trim(),
    departureCode,
    arrivalCode,
  };
}

function normalizeAirportCode(value: string | null) {
  const match = value?.toUpperCase().match(/\b[A-Z]{3}\b/);
  return match?.[0] ?? null;
}

function validateHistoricalDate(flightDate: string) {
  const parsed = new Date(`${flightDate}T00:00:00.000Z`);

  if (Number.isNaN(parsed.getTime())) {
    return "Datum leta nije u validnom formatu za provider lookup.";
  }

  const today = new Date();
  const todayUtc = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );
  const flightUtc = Date.UTC(
    parsed.getUTCFullYear(),
    parsed.getUTCMonth(),
    parsed.getUTCDate(),
  );

  if (flightUtc >= todayUtc) {
    return "Aviation Edge historical lookup je namenjen završenim letovima; ovaj let ide na ručnu proveru.";
  }

  if (todayUtc - flightUtc > 365 * oneDayMs) {
    return "Datum je van konzervativnog provider lookback prozora od godinu dana.";
  }

  return null;
}

function reserveAviationEdgeCalls(callCount: number) {
  const currentWindow = currentUtcDateKey();

  if (budgetWindow !== currentWindow) {
    budgetWindow = currentWindow;
    aviationEdgeCallsInWindow = 0;
  }

  const dailyLimit = getFlightProviderDailyLimit();

  if (
    dailyLimit <= 0 ||
    callCount <= 0 ||
    aviationEdgeCallsInWindow + callCount > dailyLimit
  ) {
    return false;
  }

  aviationEdgeCallsInWindow += callCount;
  return true;
}

function buildCacheKey(input: NormalizedProviderInput) {
  return [
    "aviation_edge",
    input.flightNumber,
    input.flightDate,
    input.departureCode ?? "",
    input.arrivalCode ?? "",
  ].join("|");
}

function currentUtcDateKey() {
  return new Date().toISOString().slice(0, 10);
}

function isAviationEdgeError(payload: unknown) {
  const object = asObject(payload);
  return Boolean(object && typeof object.error === "string");
}

function asObject(value: unknown) {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown) {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return null;
}

function asNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
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
