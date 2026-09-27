// Slike za deljenje su statične (public/lk/og, pravi v2 fontovi); pravi ih npm run lk:og. Posle izmene teksta ili
// dizajna pokrenuti lk:og i povećati verziju, da mreže povuku novu sliku.
export const SOCIAL_PREVIEW_VERSION = "2026-09-27-v2";

export const socialPreview = {
  sr: {
    title: "Besplatno naplatite do 600 EUR avio-odštete.",
    description: "0% provizije od uspeha - Vi zadržavate ceo iznos.",
    imageAlt:
      "Letkasni.rs — pomeren ili otkazan let, naplatite do 600 € i zadržite ceo iznos",
    badge: "BESPLATNA PROVERA",
    questionA: "Pomeren ili ",
    questionB: "otkazan let?",
    promise: "Naplatite do 600 €. Zadržite ceo iznos.",
    proofA: "0% provizije od uspeha",
    proofB: "Lokalna podrška",
  },
  en: {
    title: "Claim up to €600 in flight compensation at no cost.",
    description: "0% success fee — you keep the full amount.",
    imageAlt:
      "Letkasni.rs — delayed or cancelled flight, claim up to €600 and keep the full amount",
    badge: "FREE CHECK",
    questionA: "Delayed or ",
    questionB: "cancelled flight?",
    promise: "Claim up to €600. Keep the full amount.",
    proofA: "0% success fee",
    proofB: "Local support",
  },
} as const;

export type SocialPreviewLocale = keyof typeof socialPreview;

export function getSocialPreviewImageUrl(locale: SocialPreviewLocale) {
  return `/lk/og/social-${locale}.png?v=${SOCIAL_PREVIEW_VERSION}`;
}
