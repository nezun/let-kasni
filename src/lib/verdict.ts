import type { ClaimInput, VerdictBucket } from "@/lib/types";
import type { FlightLookupResult } from "@/lib/flight-provider";

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

  if (
    input.issueType === "delay_3h_plus" ||
    input.issueType === "missed_connection_same_booking"
  ) {
    return {
      bucket: "likely_eligible",
      title: "Verovatno imate osnov za dalju proveru",
      body: "Na osnovu unetih i potvrđenih podataka, slučaj deluje kao kandidat za konzervativnu proveru. Konačna potvrda i iznos zavise od okolnosti leta i dodatne dokumentacije.",
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
