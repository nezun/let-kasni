"use client";

import { HeroFlowStartCard } from "@/components/claim-flow";
import { SiteHeader } from "@/components/site-header";
import { trackEvent } from "@/lib/analytics";
import type { IssueType } from "@/lib/types";

type Locale = "sr" | "en";
type LogoBalance = "default" | "optical" | "compact" | "badge";

export function HeaderWithClaimCta({
  locale,
  logoBalance,
}: {
  locale: Locale;
  logoBalance?: LogoBalance;
}) {
  function openClaimFlow(source: "nav_cta" | "mobile_nav_cta") {
    trackEvent("begin_checkout", {
      event_category: "claim",
      event_label: source,
      form_locale: locale,
    });
    window.location.assign(locale === "en" ? "/en/check-flight" : "/proveri-let");
  }

  return (
    <SiteHeader
      locale={locale}
      logoBalance={logoBalance}
      onCtaClick={openClaimFlow}
    />
  );
}

interface HeroClaimCardProps {
  locale: Locale;
  eyebrow: string;
  title: string;
  flightNumberLabel: string;
  flightNumberPlaceholder: string;
  flightDateLabel: string;
  issueTypeLabel: string;
  buttonLabel: string;
  note: string;
  routeHint: string;
  fieldClasses: {
    flight: string;
    date: string;
  };
  issueOptions: Array<{ value: IssueType; label: string }>;
}

export function HeroClaimCard({ locale }: HeroClaimCardProps) {
  return <HeroFlowStartCard locale={locale} />;
}

export function ClaimCtaButton({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  function openClaimFlow() {
    trackEvent("begin_checkout", {
      event_category: "claim",
      event_label: "cta_section",
      form_locale: locale,
    });
    window.location.assign(locale === "en" ? "/en/check-flight" : "/proveri-let");
  }

  return (
    <button
      onClick={openClaimFlow}
      className="rounded-xl bg-[#2470EB] px-11 py-[17px] text-[17px] font-bold text-white transition hover:brightness-95"
    >
      {children}
    </button>
  );
}
