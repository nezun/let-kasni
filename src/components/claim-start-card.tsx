"use client";

import { useId, useState } from "react";
import { ArrowRight, Ban, Clock3, Ellipsis } from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { getMetaEventId, trackMetaEvent } from "@/lib/meta";

type Locale = "sr" | "en";
type Problem = "delay" | "cancelled" | "other";

const opcije = [
  { value: "delay", icon: Clock3 },
  { value: "cancelled", icon: Ban },
  { value: "other", icon: Ellipsis },
] as const;

const tekst = {
  sr: {
    problemi: {
      delay: { label: "Let je kasnio 3+ sata", detail: "" },
      cancelled: { label: "Let je otkazan", detail: "" },
      other: { label: "Drugi problem", detail: "Štrajk, odbijen ukrcaj ili izgubljen prtljag" },
    },
    naslov: "Šta se dogodilo sa Vašim letom?",
    aria: "Vrsta problema sa letom",
    greska: "Izaberite šta se dogodilo sa Vašim letom da biste nastavili.",
    dugme: "Proveri koliko ti duguju",
    napomena: "Provera traje manje od 2 minuta.",
  },
  en: {
    problemi: {
      delay: { label: "Flight delayed 3+ hours", detail: "" },
      cancelled: { label: "Flight cancelled", detail: "" },
      other: { label: "Another issue", detail: "Strike, denied boarding or lost baggage" },
    },
    naslov: "What happened to your flight?",
    aria: "Type of flight disruption",
    greska: "Choose what happened to your flight to continue.",
    dugme: "Check how much you're owed",
    napomena: "The check takes less than 2 minutes.",
  },
} as const;

/** Adresa forme. Formu služi aplikacija za klijente na istom domenu (multi-zone), pa se ide punim učitavanjem strane. */
export function adresaForme(locale: Locale, problem?: Problem) {
  const putanja = locale === "en" ? "/en/check-flight" : "/proveri-let";
  return problem ? `${putanja}?step=2&issue=${encodeURIComponent(problem)}` : putanja;
}

export function idiNaFormu(locale: Locale, problem?: Problem) {
  window.location.href = adresaForme(locale, problem);
}

/**
 * Prvi korak forme na početnoj strani: izbor problema, pa prelazak na formu u aplikaciji za klijente.
 * Ovde se ništa ne šalje — cela forma i slanje žive u aplikaciji.
 */
export function ClaimStartCard({ locale }: { locale: Locale }) {
  const t = tekst[locale];
  const grupa = useId();
  const [izabrano, setIzabrano] = useState<Problem | null>(null);
  const [greska, setGreska] = useState(false);

  function nastavi() {
    if (!izabrano) {
      setGreska(true);
      return;
    }
    trackEvent("begin_checkout", {
      event_category: "claim",
      event_label: "hero_card_cta",
      form_locale: locale,
      issue_type: izabrano,
    });
    trackMetaEvent(
      "InitiateCheckout",
      {
        content_name: "flight_compensation_claim",
        content_category: "claim",
        form_locale: locale,
        issue_type: izabrano,
      },
      getMetaEventId(),
    );
    idiNaFormu(locale, izabrano);
  }

  return (
    <div className="rounded-[20px] bg-white p-7 text-[#0A0F1E] shadow-[0_26px_88px_rgba(0,0,0,0.26)] sm:p-8" data-claim-form="embedded">
      <div className="mb-6">
        <h1 className="font-display text-[21px] font-bold leading-[1.22]">{t.naslov}</h1>
      </div>

      <div className="space-y-2.5" role="radiogroup" aria-label={t.aria}>
        {opcije.map((opcija) => {
          const Icon = opcija.icon;
          const jeIzabrano = izabrano === opcija.value;
          const opis = t.problemi[opcija.value];

          return (
            <label
              key={opcija.value}
              className={`flex min-h-[64px] w-full cursor-pointer items-center gap-3 rounded-[11px] border px-4 py-3 text-left transition has-[>input:checked]:border-[#2470EB] has-[>input:checked]:bg-[#F3F7FF] has-[>input:checked]:shadow-[0_0_0_2px_rgba(36,112,235,0.08)] ${
                jeIzabrano
                  ? "border-[#2470EB] bg-[#F3F7FF] shadow-[0_0_0_2px_rgba(36,112,235,0.08)]"
                  : "border-[#DDE5F0] bg-[#FAFBFD] hover:border-[#BFD3F5] hover:bg-white"
              }`}
            >
              <input
                type="radio"
                name={grupa}
                value={opcija.value}
                checked={jeIzabrano}
                onChange={() => {
                  setIzabrano(opcija.value);
                  setGreska(false);
                }}
                className="peer order-3 h-[18px] w-[18px] shrink-0 accent-[#2470EB]"
              />
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full peer-checked:bg-[#2470EB] peer-checked:text-white ${
                  jeIzabrano ? "bg-[#2470EB] text-white" : "bg-[#EDF3FD] text-[#2470EB]"
                }`}
              >
                <Icon className="h-[17px] w-[17px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-bold leading-5">{opis.label}</span>
                {opis.detail ? <span className="block text-xs leading-5 text-[#7A8494]">{opis.detail}</span> : null}
              </span>
            </label>
          );
        })}
      </div>

      {greska ? (
        <p className="mt-3 text-xs font-semibold text-[#C2415D]" role="alert">
          {t.greska}
        </p>
      ) : null}

      <button
        type="button"
        onClick={nastavi}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#2470EB] px-4 py-[15px] text-base font-bold text-white transition hover:bg-[#1D5FD0]"
      >
        {t.dugme}
        <ArrowRight className="h-4 w-4" />
      </button>

      <p className="mt-[13px] text-center text-xs leading-[1.5] text-[#7A8494]">{t.napomena}</p>
    </div>
  );
}
