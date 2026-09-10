"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { isValidEmail } from "@/lib/email-validation";
import { marketingConsentText } from "@/lib/marketing-consent-core";

const copy = {
  sr: {
    heading: "Novosti i ponude — opciono",
    email: "E-mail adresa koju prijavljujete",
    helper: "Prijavljujete se u svoje ime, ne u ime deteta ili drugog putnika. Pristanak nije uslov za obradu predmeta i možete ga opozvati u svakom trenutku.",
    privacy: "Više u Politici privatnosti, član 12.",
    button: "Prijavi me za e-mail ponude",
    sending: "Šaljemo potvrdu...",
    pending: "Proverite e-mail i potvrdite prijavu. Prijava ostaje na čekanju dok ne otvorite stranicu za potvrdu i pritisnete njen taster.",
    granted: "Ova adresa već ima važeću prijavu za ponude.",
    error: "Prijava za ponude trenutno nije dostupna. Vaš predmet je već uredno primljen i nije pogođen ovim kvarom.",
  },
  en: {
    heading: "News and offers — optional",
    email: "Email address you are subscribing",
    helper: "You subscribe in your own name, not for a child or another passenger. Consent is not required for handling your case and you may withdraw it at any time.",
    privacy: "See Article 12 of the Privacy Policy.",
    button: "Subscribe to email offers",
    sending: "Sending confirmation...",
    pending: "Check your email and confirm the subscription. It remains pending until you open the confirmation page and press its button.",
    granted: "This address already has a valid subscription to offers.",
    error: "Offer subscription is temporarily unavailable. Your case has already been received and is not affected.",
  },
} as const;

export function MarketingSubscriptionCard({ locale, initialEmail }: { locale: "sr" | "en"; initialEmail: string }) {
  const [email, setEmail] = useState(initialEmail);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "pending" | "granted" | "error">("idle");
  const [enabled, setEnabled] = useState(false);
  const t = copy[locale];

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MARKETING_SUBSCRIPTIONS_ENABLED !== "1") return;
    fetch("/api/health", { cache: "no-store" })
      .then((response) => response.json())
      .then((body) => setEnabled(body?.checks?.marketingSubscriptionsEnabled === true))
      .catch(() => setEnabled(false));
  }, []);

  if (!enabled) return null;

  async function subscribe() {
    if (!consent || !isValidEmail(email) || status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api/marketing/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, consent: true, adult: true, locale, sourcePath: window.location.pathname }),
      });
      const result = await response.json().catch(() => null) as { status?: string } | null;
      if (!response.ok) throw new Error("subscription_failed");
      setStatus(result?.status === "already_granted" ? "granted" : "pending");
    } catch {
      setStatus("error");
    }
  }

  const privacyHref = locale === "en" ? "/en/privacy#article-12" : "/privacy#article-12";
  return (
    <section className="mt-5 space-y-4 rounded-2xl border border-blue-200 bg-blue-50/60 p-5 text-left">
      <h3 className="font-bold text-slate-900">{t.heading}</h3>
      <label className="block space-y-2 text-sm font-semibold text-slate-700">
        <span>{t.email}</span>
        <input className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-900 outline-none focus:border-blue-500" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setStatus("idle"); }} autoComplete="email" />
      </label>
      <label className="flex items-start gap-3 text-xs leading-5 text-slate-600">
        <input className="mt-1 h-4 w-4 shrink-0 accent-blue-600" type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
        <span>{marketingConsentText[locale]}</span>
      </label>
      <p className="text-xs leading-5 text-slate-600">{t.helper} <Link className="font-semibold text-blue-700 underline" href={privacyHref}>{t.privacy}</Link></p>
      <button type="button" onClick={subscribe} disabled={!consent || !isValidEmail(email) || status === "sending" || status === "pending" || status === "granted"} className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
        {status === "sending" ? t.sending : t.button}
      </button>
      {status === "pending" || status === "granted" || status === "error" ? (
        <p role="status" className={`text-xs font-semibold ${status === "error" ? "text-red-700" : "text-green-700"}`}>{status === "pending" ? t.pending : status === "granted" ? t.granted : t.error}</p>
      ) : null}
    </section>
  );
}
