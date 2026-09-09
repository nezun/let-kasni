export type PrivacyServiceRecord = {
  id: string;
  recipient: { sr: string; en: string };
  purpose: { sr: string; en: string };
  accessLocation: { sr: string; en: string };
  safeguards: { sr: string; en: string };
  href: string;
  verifiedAt: string;
};

// Public, versioned inventory. A service belongs here only after its use is
// confirmed in this repository and its provider terms have been checked.
export const privacyServiceRegistryVersion = "2026-09-09";

export const privacyServiceRegistry: PrivacyServiceRecord[] = [
  {
    id: "vercel-hosting",
    recipient: { sr: "Vercel Inc. (hosting i isporuka sajta)", en: "Vercel Inc. (hosting and website delivery)" },
    purpose: {
      sr: "Hostovanje aplikacije, bezbednost i isporuka sadržaja.",
      en: "Application hosting, security and content delivery.",
    },
    accessLocation: {
      sr: "SAD i lokacije podobrađivača; moguć udaljeni pristup.",
      en: "United States and subprocessor locations; remote access may occur.",
    },
    safeguards: {
      sr: "Objavljeni DPA pružaoca predviđa ugovorne klauzule i dopunske tehničke i organizacione mere kada su primenljive; primena na VGA nalog čeka potvrdu.",
      en: "The provider's published DPA provides contractual clauses and supplementary technical and organisational measures where applicable; applicability to VGA's account awaits confirmation.",
    },
    href: "https://vercel.com/legal/dpa",
    verifiedAt: "2026-09-09",
  },
  {
    id: "resend-email",
    recipient: { sr: "Plus Five Five, Inc. / Resend (e-mail dostava)", en: "Plus Five Five, Inc. / Resend (email delivery)" },
    purpose: {
      sr: "Dostava servisnih poruka i, samo posle posebne potvrde, poruka za upravljanje ponudama.",
      en: "Delivery of service messages and, only after separate confirmation, offer-management messages.",
    },
    accessLocation: {
      sr: "Primarne operacije u SAD i lokacije podobrađivača.",
      en: "Primary operations in the United States and subprocessor locations.",
    },
    safeguards: {
      sr: "Objavljeni DPA pružaoca sadrži EU standardne ugovorne klauzule i bezbednosne mere; primena na VGA nalog čeka potvrdu.",
      en: "The provider's published DPA includes EU Standard Contractual Clauses and security measures; applicability to VGA's account awaits confirmation.",
    },
    href: "https://resend.com/legal/dpa",
    verifiedAt: "2026-09-09",
  },
  {
    id: "google-analytics",
    recipient: { sr: "Google Analytics (odgovarajuće Google ugovorno lice)", en: "Google Analytics (the applicable Google contracting entity)" },
    purpose: {
      sr: "Merenje korišćenja sajta samo kada je analitika izabrana.",
      en: "Website usage measurement only when analytics is selected.",
    },
    accessLocation: {
      sr: "Države u kojima Google i njegovi podobrađivači obrađuju podatke.",
      en: "Countries in which Google and its subprocessors process data.",
    },
    safeguards: {
      sr: "Objavljeni Google uslovi sadrže mere bezbednosti i ugovorne klauzule za međunarodni prenos; primena na VGA nalog čeka potvrdu.",
      en: "Published Google terms include security measures and contractual clauses for international transfers; applicability to VGA's account awaits confirmation.",
    },
    href: "https://business.safety.google/adsprocessorterms/",
    verifiedAt: "2026-09-09",
  },
];
