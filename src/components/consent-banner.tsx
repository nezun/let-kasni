"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import {
  getTrackingConsent,
  setTrackingConsent,
  trackingConsentEvent,
  type TrackingConsent,
} from "@/lib/consent";

const adminConsent: TrackingConsent = {
  v: 2,
  analytics: false,
  marketing: false,
  ts: 0,
};

const copy = {
  sr: {
    title: "Kolačići — Vaš izbor",
    body: "Neophodni kolačići omogućavaju da sajt radi. Opcionu analitiku i marketing koristimo za merenje poseta i uspeha oglasa samo ako ih odobrite. Ništa od toga ne uključujemo pre Vašeg izbora.",
    privacy: "Politika privatnosti",
    terms: "Uslovi korišćenja",
    accept: "Prihvatam",
    essential: "Samo neophodni",
    customize: "Podesi",
    customizeClose: "Sakrij podešavanja",
    save: "Sačuvaj izbor",
    optionsTitle: "Opciono",
    analytics: "Analitika",
    analyticsBody: "Pomaže nam da razumemo posete i korišćenje sajta.",
    marketing: "Marketing",
    marketingBody: "Pomaže nam da merimo uspeh Meta oglasa.",
  },
  en: {
    title: "Cookies — your choice",
    body: "Essential cookies keep the site working. We use optional analytics and marketing tools to measure visits and ad performance only if you allow them. Nothing optional is enabled before you choose.",
    privacy: "Privacy policy",
    terms: "Terms of use",
    accept: "Accept",
    essential: "Essential only",
    customize: "Customize",
    customizeClose: "Hide settings",
    save: "Save choice",
    optionsTitle: "Optional tools",
    analytics: "Analytics",
    analyticsBody: "Helps us understand visits and site usage.",
    marketing: "Marketing",
    marketingBody: "Helps us measure Meta ad performance.",
  },
} as const;

type ConsentSelection = Pick<TrackingConsent, "analytics" | "marketing">;

export function ConsentBanner({ locale }: { locale: "sr" | "en" }) {
  const titleId = useId();
  const descriptionId = useId();
  const settingsId = useId();
  const firstActionRef = useRef<HTMLButtonElement>(null);
  const [customizing, setCustomizing] = useState(false);
  const [selection, setSelection] = useState<ConsentSelection>({
    analytics: false,
    marketing: false,
  });
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
        ? adminConsent
        : getTrackingConsent(),
    () => null,
  );
  const t = copy[locale];

  useEffect(() => {
    if (!consent) {
      firstActionRef.current?.focus();
    }
  }, [consent]);

  if (consent) {
    return null;
  }

  function saveChoice(choice: ConsentSelection) {
    setTrackingConsent({
      v: 2,
      ...choice,
      ts: Date.now(),
    });
  }

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="fixed bottom-4 left-4 right-4 z-[120] max-w-sm rounded-2xl border border-slate-200 bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl sm:right-auto"
    >
      <div className="flex items-start gap-3">
        <LockKeyhole
          className="mt-0.5 h-5 w-5 shrink-0 text-blue-600"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="text-sm font-bold text-slate-900">
            {t.title}
          </h2>
          <p id={descriptionId} className="mt-2 text-sm leading-relaxed text-slate-600">
            {t.body}
          </p>

          <div className="mt-4 flex gap-2">
            <button
              ref={firstActionRef}
              type="button"
              onClick={() =>
                saveChoice({ analytics: true, marketing: true })
              }
              className="min-h-11 flex-1 rounded-xl bg-blue-600 px-3 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {t.accept}
            </button>
            <button
              type="button"
              onClick={() =>
                saveChoice({ analytics: false, marketing: false })
              }
              className="min-h-11 flex-1 rounded-xl border border-slate-300 bg-slate-100 px-3 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {t.essential}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold">
            <button
              type="button"
              aria-expanded={customizing}
              aria-controls={settingsId}
              onClick={() => setCustomizing((current) => !current)}
              className="text-blue-700 underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {customizing ? t.customizeClose : t.customize}
            </button>
            <Link href="/privacy" className="text-slate-500 underline underline-offset-2 hover:text-slate-700">
              {t.privacy}
            </Link>
            <Link href="/terms" className="text-slate-500 underline underline-offset-2 hover:text-slate-700">
              {t.terms}
            </Link>
          </div>

          {customizing ? (
            <fieldset id={settingsId} className="mt-4 space-y-3 rounded-xl bg-slate-50 p-3">
              <legend className="px-1 text-xs font-bold text-slate-900">
                {t.optionsTitle}
              </legend>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={selection.analytics}
                  onChange={(event) =>
                    setSelection((current) => ({
                      ...current,
                      analytics: event.target.checked,
                    }))
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600"
                />
                <span className="text-xs leading-4 text-slate-700">
                  <span className="block font-semibold text-slate-900">{t.analytics}</span>
                  {t.analyticsBody}
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={selection.marketing}
                  onChange={(event) =>
                    setSelection((current) => ({
                      ...current,
                      marketing: event.target.checked,
                    }))
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600"
                />
                <span className="text-xs leading-4 text-slate-700">
                  <span className="block font-semibold text-slate-900">{t.marketing}</span>
                  {t.marketingBody}
                </span>
              </label>
              <button
                type="button"
                onClick={() => saveChoice(selection)}
                className="min-h-11 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {t.save}
              </button>
            </fieldset>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
