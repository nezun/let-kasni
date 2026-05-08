"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

type Locale = "sr" | "en";

const ClaimModal = dynamic(
  () => import("@/components/claim-modal").then((mod) => mod.ClaimModal),
  { ssr: false },
);

export function ClaimInlineCtaButton({
  children,
  className,
  eventLabel,
  locale,
}: {
  children: ReactNode;
  className: string;
  eventLabel: string;
  locale: Locale;
}) {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  function openClaimModal() {
    trackEvent("begin_checkout", {
      event_category: "claim",
      event_label: eventLabel,
      form_locale: locale,
    });
    setIsClaimModalOpen(true);
  }

  return (
    <>
      <button type="button" onClick={openClaimModal} className={className}>
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
