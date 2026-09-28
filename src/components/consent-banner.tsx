"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getTrackingConsent,
  setTrackingConsent,
  trackingConsentEvent,
  type TrackingConsent,
} from "@/lib/consent";
import { trackingConsentNoticeVersion } from "@/lib/consent-cookie";

const adminConsent: TrackingConsent = {
  v: 3,
  analytics: false,
  marketing: false,
  ts: 0,
  notice: trackingConsentNoticeVersion,
};

const copy = {
  sr: {
    dialogLabel: "Podešavanja kolačića",
    lead: "Kolačići za analitiku i oglase, samo uz Vaš pristanak.",
    privacy: "Politika privatnosti",
    terms: "Uslovi korišćenja",
    accept: "Prihvati",
    reject: "Odbij",
    settings: "Podešavanja",
    settingsClose: "Sakrij podešavanja",
    save: "Sačuvaj izbor",
    optionsTitle: "Opciono",
    analytics: "Analitika",
    analyticsBody: "Pomaže nam da razumemo posete i korišćenje sajta.",
    marketing: "Oglašavanje",
    marketingBody: "Pomaže nam da merimo uspeh Meta i Google oglasa.",
  },
  en: {
    dialogLabel: "Cookie consent",
    lead: "Cookies for analytics and ads, only with your consent.",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    accept: "Accept",
    reject: "Reject",
    settings: "Settings",
    settingsClose: "Hide settings",
    save: "Save choice",
    optionsTitle: "Optional tools",
    analytics: "Analytics",
    analyticsBody: "Helps us understand visits and site usage.",
    marketing: "Advertising",
    marketingBody: "Helps us measure Meta and Google ad performance.",
  },
} as const;

type ConsentSelection = Pick<TrackingConsent, "analytics" | "marketing">;

export function ConsentBanner({
  locale,
}: { locale: "sr" | "en" }) {
  const pathname = usePathname();
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
      (window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/pregled") || window.location.pathname.startsWith("/dokumenta") || window.location.pathname.startsWith("/predmet"))
        ? adminConsent
        : getTrackingConsent(),
    () => null,
  );
  const t = copy[locale];
  const termsHref = locale === "en" ? "/en/terms" : "/terms";
  const privacyHref = locale === "en" ? "/en/privacy" : "/privacy";
  const isLocalFocusedFlow =
    process.env.NODE_ENV !== "production" &&
    (pathname === "/proveri-let" || pathname === "/en/check-flight");

  useEffect(() => {
    if (!consent) {
      firstActionRef.current?.focus();
    }
  }, [consent]);

  if (consent || isLocalFocusedFlow) {
    return null;
  }

  function saveChoice(choice: ConsentSelection) {
    setTrackingConsent({
      v: 3,
      ...choice,
      ts: Date.now(),
      notice: trackingConsentNoticeVersion,
    });
  }

  // Sažet baner (Niko 28.09: „najmanje moguće condensed, pogotovu na telefonu“): jedan tanak red — kratka
  // rečenica sa „Podešavanja“ na kraju istog reda, i dva dugmeta iste veličine. Podešavanja (analitika/oglašavanje
  // + linkovi na Politiku privatnosti/Uslove) se otvaraju tek na klik, unutar istog banera.
  return (
    <div data-consent-banner className="consent-banner lk-cookies lk-ui-scope">
      <aside role="dialog" aria-modal="true" aria-label={t.dialogLabel} aria-describedby={descriptionId} className="lk-cookies-card">
        <div className="lk-cookies-row">
          <p id={descriptionId} className="lk-cookies-text">
            {t.lead}{" "}
            <button
              type="button"
              aria-expanded={customizing}
              aria-controls={settingsId}
              onClick={() => setCustomizing((current) => !current)}
              className="lk-cookies-settings"
            >
              {customizing ? t.settingsClose : t.settings}
            </button>
          </p>

          <div className="lk-cookies-actions">
            <button
              ref={firstActionRef}
              type="button"
              onClick={() => saveChoice({ analytics: true, marketing: true })}
              className="lk-ui-button"
            >
              {t.accept}
            </button>
            <button
              type="button"
              onClick={() => saveChoice({ analytics: false, marketing: false })}
              className="lk-ui-button lk-ui-button--secondary"
            >
              {t.reject}
            </button>
          </div>
        </div>

        {customizing ? (
          <fieldset id={settingsId} className="lk-cookies-options">
            <legend>{t.optionsTitle}</legend>
            <label>
              <input
                type="checkbox"
                checked={selection.analytics}
                onChange={(event) =>
                  setSelection((current) => ({
                    ...current,
                    analytics: event.target.checked,
                  }))
                }
              />
              <span>
                <strong>{t.analytics}</strong> {t.analyticsBody}
              </span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={selection.marketing}
                onChange={(event) =>
                  setSelection((current) => ({
                    ...current,
                    marketing: event.target.checked,
                  }))
                }
              />
              <span>
                <strong>{t.marketing}</strong> {t.marketingBody}
              </span>
            </label>
            <p className="lk-cookies-links">
              <Link href={termsHref}>{t.terms}</Link>
              <span aria-hidden="true"> · </span>
              <Link href={privacyHref}>{t.privacy}</Link>
            </p>
            <button type="button" onClick={() => saveChoice(selection)} className="lk-ui-button">
              {t.save}
            </button>
          </fieldset>
        ) : null}
      </aside>
    </div>
  );
}
