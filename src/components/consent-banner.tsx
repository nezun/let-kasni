"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
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
    dialogLabel: "Podešavanja kolačića",
    body: "Koristimo kolačiće kako bi naš sajt ispravno radio, kako bismo personalizovali sadržaj i oglase, omogućili funkcije društvenih mreža i analizirali naš saobraćaj.",
    privacy: "Politika privatnosti",
    terms: "Uslovi korišćenja",
    accept: "Prihvati sve kolačiće",
    settings: "Podešavanja kolačića",
    settingsClose: "Sakrij podešavanja",
    save: "Sačuvaj izbor",
    optionsTitle: "Opciono",
    analytics: "Analitika",
    analyticsBody: "Pomaže nam da razumemo posete i korišćenje sajta.",
    marketing: "Marketing",
    marketingBody: "Pomaže nam da merimo uspeh Meta oglasa.",
  },
  en: {
    dialogLabel: "Cookie consent",
    body: "We use cookies to make our website work properly, to personalise content and advertisements, to provide social media features, and to analyse our traffic.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    accept: "Accept All Cookies",
    settings: "Cookie Settings",
    settingsClose: "Hide cookie settings",
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
  const descriptionId = useId();
  const settingsId = useId();
  const firstActionRef = useRef<HTMLButtonElement>(null);
  const [rightInset, setRightInset] = useState(18);
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
  const termsHref = locale === "en" ? "/en/terms" : "/terms";
  const privacyHref = locale === "en" ? "/en/privacy" : "/privacy";

  useEffect(() => {
    function updateBannerBounds() {
      if (window.innerWidth < 1280) {
        setRightInset(18);
        return;
      }

      const form = document.querySelector<HTMLElement>("[data-claim-form='embedded']");
      if (!form) {
        setRightInset(18);
        return;
      }

      const formLeft = form.getBoundingClientRect().left;
      setRightInset(Math.max(18, window.innerWidth - formLeft + 8));
    }

    updateBannerBounds();
    window.addEventListener("resize", updateBannerBounds);
    return () => window.removeEventListener("resize", updateBannerBounds);
  }, []);

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
    <div
      className="fixed bottom-[18px] left-[18px] z-[120] flex justify-start"
      style={{ right: `${rightInset}px` }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t.dialogLabel}
        aria-describedby={descriptionId}
        className="w-full max-w-[1920px] rounded-[16px] bg-white px-4 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:px-5 sm:py-5"
      >
        <div className="grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_230px] lg:gap-5">
          <div className="min-w-0">
            <p
              id={descriptionId}
              className="max-w-[700px] text-sm leading-[1.45] text-[#123575] sm:text-base sm:leading-[1.5]"
            >
              {t.body}{" "}
              <Link
                href={termsHref}
                className="text-[#1478F2] underline decoration-2 underline-offset-2"
              >
                {t.terms}
              </Link>
              <span className="px-2 text-[#1478F2]">|</span>
              <Link
                href={privacyHref}
                className="text-[#1478F2] underline decoration-2 underline-offset-2"
              >
                {t.privacy}
              </Link>
            </p>

            {customizing ? (
              <fieldset id={settingsId} className="mt-4 max-w-[700px] space-y-2 rounded-xl bg-slate-50 p-3">
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
                  className="min-h-10 w-full rounded-lg bg-[#1478F2] px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {t.save}
                </button>
              </fieldset>
            ) : null}
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              ref={firstActionRef}
              type="button"
              onClick={() => saveChoice({ analytics: true, marketing: true })}
              className="min-h-12 rounded-xl bg-[#1478F2] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 sm:text-base"
            >
              {t.accept}
            </button>
            <button
              type="button"
              aria-expanded={customizing}
              aria-controls={settingsId}
              onClick={() => setCustomizing((current) => !current)}
              className="min-h-12 rounded-xl border-2 border-[#1478F2] bg-white px-4 py-2.5 text-sm font-bold text-[#1478F2] transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 sm:text-base"
            >
              {customizing ? t.settingsClose : t.settings}
            </button>
          </div>
        </div>
    </aside>
    </div>
  );
}
