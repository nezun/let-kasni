import { siteOperator } from "@/lib/site-operator";

export type LkLocale = "sr" | "en";

// Postojeći URL-ovi sajta (Niko: nova verzija menja brend i UX, a URL struktura ostaje ista), plus strane koje v2
// dizajn dodaje: O nama, Kontakt i Česta pitanja.
export function lkPaths(locale: LkLocale) {
  return locale === "en"
    ? {
        home: "/en",
        blog: "/en/blog",
        terms: "/en/terms",
        privacy: "/en/privacy",
        emailOffers: "/en/email-offers",
        about: "/en/about",
        contact: "/en/contact",
        faq: "/en/faq",
        delayedFlights: "/en/delayed-flights-belgrade",
      }
    : {
        home: "/",
        blog: "/blog",
        terms: "/terms",
        privacy: "/privacy",
        emailOffers: "/email-offers",
        about: "/o-nama",
        contact: "/kontakt",
        faq: "/faq",
        delayedFlights: "/letovi-koji-su-kasnili",
      };
}

export type LkPathKey = keyof ReturnType<typeof lkPaths>;

/** Cilj linka iz copy.ts: „#sidro“ je sidro na početnoj, inače ime strane iz lkPaths. */
export function lkHref(locale: LkLocale, to: string) {
  const paths = lkPaths(locale);
  if (to.startsWith("#")) return `${paths.home}${to}`;
  if (to in paths) return paths[to as LkPathKey];
  throw new Error(`lkHref: nepoznat cilj linka ${to}`);
}

// Kontakt iz podataka o operateru (isti kao u sadašnjem footeru): telefon u čitljivom obliku +381 63 700 3779.
export function lkContact(locale: LkLocale) {
  const phone = siteOperator.phone;
  const digits = phone.replace(/[^0-9]/g, "");
  return {
    phone,
    phoneDisplay: phone.replace(/^\+381(\d{2})(\d{3})(\d+)$/, "+381 $1 $2 $3"),
    email: siteOperator.email[locale],
    messengers: [
      { label: "Viber", href: `viber://chat?number=${encodeURIComponent(phone)}` },
      { label: "WhatsApp", href: `https://wa.me/${digits}` },
      { label: "Telegram", href: `https://t.me/+${digits}` },
    ],
  };
}
