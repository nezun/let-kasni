import type { Metadata } from "next";

const copy = {
  privacy: {
    sr: { title: "Politika privatnosti", description: "Informacije o obradi podataka o ličnosti, kolačićima i Vašim pravima na letkasni.rs." },
    en: { title: "Privacy Policy", description: "Information about personal data processing, cookies and your rights on letkasni.rs." },
  },
  terms: {
    sr: { title: "Opšti uslovi poslovanja", description: "Uslovi korišćenja usluga letkasni.rs i informacije o ugovornom odnosu sa putnicima." },
    en: { title: "Terms and Conditions", description: "Terms for using letkasni.rs services and information about the contractual relationship with passengers." },
  },
};

export function legalMetadata(page: keyof typeof copy, locale: "sr" | "en"): Metadata {
  const text = copy[page][locale];
  const canonical = `${locale === "en" ? "/en" : ""}/${page}`;
  return {
    title: `${text.title} | letkasni.rs`,
    description: text.description,
    alternates: {
      canonical,
      languages: { sr: `/${page}`, en: `/en/${page}`, "x-default": `/${page}` },
    },
    openGraph: { title: text.title, description: text.description, url: canonical, siteName: "letkasni.rs", type: "website" },
    twitter: { title: text.title, description: text.description },
  };
}
