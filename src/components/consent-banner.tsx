"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

import {
  getTrackingConsent,
  setTrackingConsent,
  trackingConsentEvent,
  type TrackingConsent,
} from "@/lib/consent";

const copy = {
  sr: {
    title: "Vaša privatnost",
    body: "Koristimo opcione analitičke i marketinške alate samo uz Vašu saglasnost. Neophodni rad sajta ne zavisi od ovih alata.",
    privacy: "Politika privatnosti",
    terms: "Uslovi korišćenja",
    accept: "Prihvati analitiku i marketing",
    reject: "Odbij opcione alate",
  },
  en: {
    title: "Your privacy",
    body: "We use optional analytics and marketing tools only with your consent. Essential site functionality does not depend on these tools.",
    privacy: "Privacy policy",
    terms: "Terms of use",
    accept: "Accept analytics and marketing",
    reject: "Reject optional tools",
  },
} as const;

export function ConsentBanner({ locale }: { locale: "sr" | "en" }) {
  const consent = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener(trackingConsentEvent, onStoreChange);
      window.addEventListener("storage", onStoreChange);
      return () => {
        window.removeEventListener(trackingConsentEvent, onStoreChange);
        window.removeEventListener("storage", onStoreChange);
      };
    },
    () =>
      window.location.pathname.startsWith("/admin")
        ? "denied"
        : getTrackingConsent(),
    () => null,
  );
  const t = copy[locale];

  if (consent) {
    return null;
  }

  function choose(value: TrackingConsent) {
    setTrackingConsent(value);
  }

  return (
    <aside
      aria-label={t.title}
      className="fixed inset-x-3 bottom-3 z-[120] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:inset-x-6 sm:p-5"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-sm font-bold text-slate-900">{t.title}</h2>
          <p className="text-xs leading-5 text-slate-600">{t.body}</p>
          <div className="flex gap-4 text-xs font-semibold text-blue-700">
            <Link href={locale === "en" ? "/en/privacy" : "/privacy"}>{t.privacy}</Link>
            <Link href={locale === "en" ? "/en/terms" : "/terms"}>{t.terms}</Link>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:min-w-56">
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
          >
            {t.accept}
          </button>
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
          >
            {t.reject}
          </button>
        </div>
      </div>
    </aside>
  );
}
