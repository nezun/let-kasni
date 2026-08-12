"use client";

import { clearTrackingConsent } from "@/lib/consent";

export function PrivacySettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={clearTrackingConsent}
      className="w-fit text-left text-sm leading-[1.45] text-[#8E9BB0] transition hover:text-[#C7D0DE]"
    >
      {label}
    </button>
  );
}
