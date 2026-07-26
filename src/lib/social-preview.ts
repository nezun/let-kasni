export const SOCIAL_PREVIEW_VERSION = "2026-07-26-7";

export const socialPreview = {
  sr: {
    title:
      "Pomeren ili otkazan let? Naplatite do 600€ bez ikakvih troškova ili provizije | letkasni.rs",
    description:
      "Besplatno proverite pravo na avio-odštetu. 0% provizije od uspeha — zadržavate ceo iznos.",
    imageAlt:
      "letkasni.rs — pomeren ili otkazan let, naplatite do 600€ i zadržite ceo iznos",
    question: "Pomeren ili otkazan let?",
    amount: "Naplatite do 600€.",
    emphasis: "Zadržite ceo iznos. Da, moguće je.",
    proofA: "0% provizije od uspeha",
    proofB: "Besplatna provera",
  },
  en: {
    title:
      "Delayed or cancelled flight? Claim up to €600 with no costs or commission | letkasni.rs",
    description:
      "Check your flight-compensation eligibility free of charge. 0% success commission — you keep the full amount.",
    imageAlt:
      "letkasni.rs — delayed or cancelled flight, claim up to €600 and keep the full amount",
    question: "Delayed or cancelled flight?",
    amount: "Claim up to €600.",
    emphasis: "Keep the full amount. Yes, you can.",
    proofA: "0% success commission",
    proofB: "Free eligibility check",
  },
} as const;

export type SocialPreviewLocale = keyof typeof socialPreview;

export function getSocialPreviewImageUrl(locale: SocialPreviewLocale) {
  return `/social-preview?locale=${locale}&v=${SOCIAL_PREVIEW_VERSION}`;
}
