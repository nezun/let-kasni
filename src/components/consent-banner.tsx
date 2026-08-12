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
        className="w-full max-w-[1920px] rounded-[24px] bg-white px-6 py-7 shadow-2xl sm:px-10 sm:py-9 lg:px-12 lg:py-10"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(390px,0.85fr)] lg:gap-12">
          <div className="min-w-0">
            <p
              id={descriptionId}
              className="max-w-[1120px] text-xl leading-[1.4] text-[#123575] sm:text-2xl lg:text-[29px] lg:leading-[1.45]"
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
              <fieldset id={settingsId} className="mt-6 max-w-[700px] space-y-3 rounded-2xl bg-slate-50 p-4">
                <legend className="px-1 text-sm font-bold text-slate-900">
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
                  <span className="text-sm leading-5 text-slate-700">
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
                  <span className="text-sm leading-5 text-slate-700">
                    <span className="block font-semibold text-slate-900">{t.marketing}</span>
                    {t.marketingBody}
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() => saveChoice(selection)}
                  className="min-h-11 w-full rounded-xl bg-[#1478F2] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {t.save}
                </button>
              </fieldset>
            ) : null}
          </div>

          <div className="flex flex-col gap-5 lg:gap-6">
            <button
              ref={firstActionRef}
              type="button"
              onClick={() => saveChoice({ analytics: true, marketing: true })}
              className="min-h-20 rounded-2xl bg-[#1478F2] px-6 py-4 text-xl font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 sm:text-2xl lg:text-[29px]"
            >
              {t.accept}
            </button>
            <button
              type="button"
              aria-expanded={customizing}
              aria-controls={settingsId}
              onClick={() => setCustomizing((current) => !current)}
              className="min-h-20 rounded-2xl border-4 border-[#1478F2] bg-white px-6 py-4 text-xl font-bold text-[#1478F2] transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-500/30 sm:text-2xl lg:text-[29px]"
            >
              {customizing ? t.settingsClose : t.settings}
            </button>
          </div>
        </div>
    </aside>
    </div>
  );
}
