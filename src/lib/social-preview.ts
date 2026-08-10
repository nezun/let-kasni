export const SOCIAL_PREVIEW_VERSION = "2026-08-07-1";

export const socialPreview = {
  sr: {
    title: "Besplatno naplatite do 600 EUR avio-odštete.",
    description: "0% provizije od uspeha - Vi zadržavate ceo iznos.",
    imageAlt:
      "letkasni.rs — pomeren ili otkazan let, naplatite do 600€ i zadržite ceo iznos",
    question: "Pomeren ili otkazan let?",
    amount: "Naplatite do 600€.",
    emphasis: "Zadržite ceo iznos. Da, moguće je.",
    proofA: "0% provizije od uspeha",
    proofB: "Besplatna provera",
  },
  en: {
    title: "Claim up to €600 in flight compensation at no cost.",
    description: "0% success fee — you keep the full amount.",
    imageAlt:
      "letkasni.rs — delayed or cancelled flight, claim up to €600 and keep the full amount",
    question: "Delayed or cancelled flight?",
    amount: "Claim up to €600.",
    emphasis: "Keep the full amount. Yes, you can.",
    proofA: "0% success fee",
    proofB: "Free eligibility check",
  },
} as const;

export type SocialPreviewLocale = keyof typeof socialPreview;

export function getSocialPreviewImageUrl(locale: SocialPreviewLocale) {
  return `/social-preview?locale=${locale}&v=${SOCIAL_PREVIEW_VERSION}`;
}
