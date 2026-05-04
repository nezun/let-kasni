import type { ClaimInput, FlightProviderSnapshot, VerdictBucket } from "@/lib/types";
import type { FlightLookupResult } from "@/lib/flight-provider";

const threeHoursMinutes = 180;

function hasCancelledStatus(providerSnapshot: FlightProviderSnapshot) {
  const status = String(providerSnapshot.rawSummary?.status ?? "").toLowerCase();
  return status.includes("cancelled") || status.includes("canceled");
}

function parseProviderTime(value?: string) {
  if (!value) {
    return null;
  }

  const normalized = value.replace("t", "T");
  const parsed = Date.parse(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function getArrivalDelayMinutes(providerSnapshot: FlightProviderSnapshot) {
  const explicitDelay = providerSnapshot.arrival?.delayMinutes;

  if (typeof explicitDelay === "number" && Number.isFinite(explicitDelay)) {
    return explicitDelay;
  }

  const scheduledArrival = parseProviderTime(providerSnapshot.arrival?.scheduledTime);
  const actualArrival = parseProviderTime(providerSnapshot.arrival?.actualTime);

  if (scheduledArrival === null || actualArrival === null) {
    return null;
  }

  return Math.round((actualArrival - scheduledArrival) / 60_000);
}

function getConfirmedDisruption(providerSnapshot: FlightProviderSnapshot) {
  if (hasCancelledStatus(providerSnapshot)) {
    return {
      title: "Let je označen kao otkazan",
      body:
        "Aviation Edge je pronašao let i status ukazuje na otkazivanje. Slučaj i dalje ide na proveru razloga otkazivanja, operativnog prevozioca i dokumentacije.",
    };
  }

  const arrivalDelayMinutes = getArrivalDelayMinutes(providerSnapshot);

  if (
    arrivalDelayMinutes !== null &&
    arrivalDelayMinutes >= threeHoursMinutes
  ) {
    return {
      title: `Potvrđeno kašnjenje na dolasku od ${arrivalDelayMinutes} min`,
      body:
        "Aviation Edge je pronašao let i podaci ukazuju na kašnjenje dolaska od najmanje 3 sata. Slučaj i dalje ide na proveru razloga kašnjenja, operativnog prevozioca i dokumentacije.",
    };
  }

  return null;
}

export function getConservativeVerdict(
  input: ClaimInput,
  providerSnapshot: FlightLookupResult,
): {
  bucket: VerdictBucket;
  title: string;
  body: string;
} {
  if (providerSnapshot.status === "no_match") {
    return {
      bucket: "needs_manual_review",
      title: "Let nije automatski pronađen",
      body: "Uneti broj leta i datum nisu dali pouzdan live match kod providera. Prijava je sačuvana i ide na ručnu proveru umesto na automatski zaključak.",
    };
  }

  if (providerSnapshot.status !== "live_match") {
    return {
      bucket: "needs_manual_review",
      title: "Podaci nisu automatski potvrđeni",
      body: "Synchronous live lookup nije uspeo u zadatom roku ili provider još nije podešen. Prijava je sačuvana i ide na ručnu proveru bez gubitka podataka.",
    };
  }

  const confirmedDisruption = getConfirmedDisruption(providerSnapshot);

  if (confirmedDisruption) {
    return {
      bucket: "likely_eligible",
      title: confirmedDisruption.title,
      body: confirmedDisruption.body,
    };
  }

  if (
    input.issueType === "delay_3h_plus" ||
    input.issueType === "missed_connection_same_booking"
  ) {
    return {
      bucket: "needs_manual_review",
      title: "Let je pronađen, ali poremećaj nije potvrđen",
      body: "Aviation Edge je pronašao operativni zapis za uneti let, ali nije potvrdio otkazivanje niti kašnjenje dolaska od najmanje 3 sata. Prijava je sačuvana i ide na ručnu proveru.",
    };
  }

  if (input.issueType === "denied_boarding") {
    return {
      bucket: "needs_manual_review",
      title: "Potrebna je ručna provera slučaja",
      body: "Ovaj tip problema ne zaključujemo automatski u prvoj fazi. Sačuvaćemo prijavu i ručno proveriti da li postoji osnov za nastavak.",
    };
  }

  return {
    bucket: "not_supported_yet",
    title: "Slučaj ide na ručnu procenu",
    body: "Za ovu vrstu problema u prvoj fazi ne dajemo automatsku procenu. Prijava je sačuvana i biće pregledana ručno.",
  };
}
