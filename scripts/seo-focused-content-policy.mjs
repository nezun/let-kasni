import fs from "node:fs";

export const focusedTargetIds = new Set(JSON.parse(fs.readFileSync(
  new URL("../src/content/seo-focused-targets.json", import.meta.url), "utf8",
)));

// Topic coverage is a regression guard, not a substitute for the recorded editorial review.
const requirements = {
  "crew-shortage-flight-delay": {
    sr: [/odmor/i, /smene|radno vreme/i, /zamensk|zamenu/i, /uzrok/i, /C-156/i],
    en: [/rest/i, /duty/i, /replacement/i, /cause/i, /C-156/i],
  },
  "separate-tickets-missed-connection": {
    sr: [/odvojen/i, /prtljag/i, /self.transfer/i, /agencij|osiguran/i, /PNR/i],
    en: [/separate/i, /baggage/i, /self.transfer/i, /agency|insurance/i, /PNR/i],
  },
  "missed-connection": {
    sr: [/krajnj/i, /rezervacij/i, /prevoznik/i, /vremensk/i, /PNR/i],
    en: [/final destination/i, /booking/i, /carrier/i, /timeline/i, /PNR/i],
  },
  "flight-delay-final-arrival-time": {
    sr: [/sletanje/i, /parking/i, /vrata/i, /dozvol/i, /3 sata i 5/i, /vremensk.*zon/i, /C-452/i],
    en: [/landing/i, /parking/i, /door/i, /permission|permitted/i, /3 hours 5/i, /time zone/i, /C-452/i],
  },
  "overnight-delay-hotel-rights": {
    sr: [/hotel/i, /transfer|prevoz/i, /račun/i, /razumn/i, /pomoć/i, /taksi kući/i],
    en: [/hotel/i, /transfer/i, /receipt/i, /reasonable/i, /assistance/i, /taxi home/i],
  },
};

export function focusedContentIssues(article, locale) {
  if (!focusedTargetIds.has(article.id)) return [];
  const localized = article[locale];
  const text = localized.sections.flatMap(s => [s.heading, ...s.body, ...(s.bullets ?? [])]).join(" ");
  const issues = [];
  for (const pattern of requirements[article.id][locale]) {
    if (!pattern.test(text)) issues.push(`Missing preserved topic: ${pattern}`);
  }
  if (!/ECAA/.test(text)) issues.push("Missing Serbia/ECAA legal-scope distinction");
  if (!/\]\(\/(?:en\/)?(?:naknada|flight-delay|missed-connection)/.test(text)) issues.push("Missing contextual parent guide link");
  if (localized.sections.length < 5) issues.push("Missing complete scenario/evidence/action structure");
  if (article.sr.sections.length !== article.en.sections.length) issues.push("SR/EN section parity differs");
  if (localized.sections.some(s => /^(Ruta, vreme i odgovornost|Route, timing and airline responsibility|Dokumenti koje treba sačuvati za proveru|Documents to save for review)$/.test(s.heading))) {
    issues.push("Generic runtime appendix returned");
  }
  return issues;
}
