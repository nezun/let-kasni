"use client";

import { useId, useState } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { trackEvent } from "@/lib/analytics";
import type { IssueType } from "@/lib/types";

type Locale = "sr" | "en";
type LogoBalance = "default" | "optical" | "compact" | "badge";

const ClaimModal = dynamic(
  () => import("@/components/claim-modal").then((mod) => mod.ClaimModal),
  { ssr: false },
);

export function HeaderWithClaimCta({
  locale,
  logoBalance,
}: {
  locale: Locale;
  logoBalance?: LogoBalance;
}) {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  function openClaimModal(source: "nav_cta" | "mobile_nav_cta") {
    trackEvent("begin_checkout", {
      event_category: "claim",
      event_label: source,
      form_locale: locale,
    });
    setIsClaimModalOpen(true);
  }

  return (
    <>
      <SiteHeader
        locale={locale}
        logoBalance={logoBalance}
        onCtaClick={openClaimModal}
      />

      {isClaimModalOpen ? (
        <ClaimModal
          isOpen={isClaimModalOpen}
          locale={locale}
          onClose={() => setIsClaimModalOpen(false)}
        />
      ) : null}
    </>
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

export function HeroClaimCard({
  locale,
  eyebrow,
  title,
  flightNumberLabel,
  flightNumberPlaceholder,
  flightDateLabel,
  issueTypeLabel,
  buttonLabel,
  note,
  routeHint,
  fieldClasses,
  issueOptions,
}: HeroClaimCardProps) {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [heroFlight, setHeroFlight] = useState("");
  const [heroDate, setHeroDate] = useState("");
  const [heroIssueType, setHeroIssueType] =
    useState<IssueType>("delay_3h_plus");
  const flightInputId = useId();
  const dateInputId = useId();
  const issueSelectId = useId();

  function openClaimModal() {
    trackEvent("begin_checkout", {
      event_category: "claim",
      event_label: "hero_card_cta",
      form_locale: locale,
    });
    setIsClaimModalOpen(true);
  }

  return (
    <>
      <div className="rounded-[20px] bg-white p-7 text-[#0A0F1E] shadow-[0_26px_88px_rgba(0,0,0,0.26)] sm:p-8">
        <div className="mb-5">
          <div className="mb-[6px] text-[11px] font-bold uppercase tracking-[0.08em] text-[#64748B]">
            {eyebrow}
          </div>
          <div className="font-display text-[20px] font-bold leading-[1.2] text-[#0A0F1E] sm:text-[21px]">
            {title}
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3">
          <div>
            <label
              htmlFor={flightInputId}
              className="mb-[5px] block text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748B]"
            >
              {flightNumberLabel}
            </label>
            <input
              id={flightInputId}
              type="text"
              value={heroFlight}
              onChange={(event) => setHeroFlight(event.target.value)}
              placeholder={flightNumberPlaceholder}
              className={fieldClasses.flight}
            />
          </div>
          <div>
            <label
              htmlFor={dateInputId}
              className="mb-[5px] block text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748B]"
            >
              {flightDateLabel}
            </label>
            <input
              id={dateInputId}
              type="date"
              value={heroDate}
              onChange={(event) => setHeroDate(event.target.value)}
              className={fieldClasses.date}
            />
          </div>
          <div>
            <label
              htmlFor={issueSelectId}
              className="mb-[5px] block text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748B]"
            >
              {issueTypeLabel}
            </label>
            <select
              id={issueSelectId}
              value={heroIssueType}
              onChange={(event) => setHeroIssueType(event.target.value as IssueType)}
              className="w-full appearance-none rounded-[10px] border border-[#DCE4EF] bg-[#FBFDFF] bg-[linear-gradient(45deg,transparent_50%,#64748B_50%),linear-gradient(135deg,#64748B_50%,transparent_50%)] bg-[position:calc(100%-18px)_52%,calc(100%-13px)_52%] bg-[size:5px_5px,5px_5px] bg-no-repeat px-[14px] py-3 pr-10 text-base text-[#334155] outline-none transition focus:border-[#9EC5FE] focus:bg-white focus:shadow-[0_0_0_3px_rgba(36,112,235,0.08)]"
            >
              {issueOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={openClaimModal}
          className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#2470EB] px-4 py-[15px] text-base font-bold text-white transition hover:brightness-95"
        >
          {buttonLabel}
          <ArrowRight className="h-4 w-4" />
        </button>

        <div className="mt-[14px] text-center text-xs leading-[1.5] text-[#64748B]">
          <p>{note}</p>
          <p>{routeHint}</p>
        </div>
      </div>

      {isClaimModalOpen ? (
        <ClaimModal
          isOpen={isClaimModalOpen}
          locale={locale}
          onClose={() => setIsClaimModalOpen(false)}
          seed={{
            flightNumber: heroFlight,
            flightDate: heroDate,
            issueType: heroIssueType,
          }}
        />
      ) : null}
    </>
  );
}

export function ClaimCtaButton({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  function openClaimModal() {
    trackEvent("begin_checkout", {
      event_category: "claim",
      event_label: "cta_section",
      form_locale: locale,
    });
    setIsClaimModalOpen(true);
  }

  return (
    <>
      <button
        onClick={openClaimModal}
        className="rounded-xl bg-[#2470EB] px-11 py-[17px] text-[17px] font-bold text-white transition hover:brightness-95"
      >
        {children}
      </button>

      {isClaimModalOpen ? (
        <ClaimModal
          isOpen={isClaimModalOpen}
          locale={locale}
          onClose={() => setIsClaimModalOpen(false)}
        />
      ) : null}
    </>
  );
}
