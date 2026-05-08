import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";

import { DelayCompensationCalculator } from "@/components/delay-compensation-calculator";
import { InlineRichText, InterlinkingScope } from "@/components/inline-rich-text";
import { ScrollProgressToc } from "@/components/scroll-progress-toc";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getBlogArticleImage, type BlogLocale } from "@/lib/blog";
import {
  getArticleCornerstoneHref,
  getAlternateCornerstoneHref,
  getCornerstoneChildren,
  getCornerstoneHref,
  type CornerstonePage,
} from "@/lib/cornerstones";
import { formatDisplayDate } from "@/lib/date-format";
import { getSupportEmail } from "@/lib/env";

const copy = {
  sr: {
    breadcrumb: "Prava putnika",
    updated: "Ažurirano",
    tocTitle: "U ovom vodiču",
    amountTitle: "Iznosi naknade po dužini rute",
    amountIntro:
      "Koristite tabelu kao brzu orijentaciju, a zatim proverite rutu, stvarni dolazak i razlog kašnjenja.",
    detailedGuides: "Detaljni vodiči",
    detailedIntro:
      "Kada znate konkretan razlog kašnjenja, otvorite vodič koji ulazi dublje u taj scenario.",
    readMore: "Pročitaj vodič",
    nextStep: "Proverite let",
    nextStepBody:
      "Ako imate broj leta i datum, možete odmah uraditi konzervativnu proveru pre slanja zahteva aviokompaniji.",
    checkFlight: "Proveri let",
  },
  en: {
    breadcrumb: "Passenger rights",
    updated: "Updated",
    tocTitle: "In this guide",
    amountTitle: "Compensation amounts by route distance",
    amountIntro:
      "Use the table as quick orientation, then check route coverage, actual arrival and the delay reason.",
    detailedGuides: "Detailed guides",
    detailedIntro:
      "Once you know the concrete delay reason, open the guide that goes deeper into that scenario.",
    readMore: "Read guide",
    nextStep: "Check your flight",
    nextStepBody:
      "If you have the flight number and date, you can run a conservative first check before filing with the airline.",
    checkFlight: "Check flight",
  },
};

const amountRows = {
  sr: [
    ["do 1.500 km", "3+ sata na dolasku", "250 EUR"],
    ["1.500-3.500 km", "3+ sata na dolasku", "400 EUR"],
    ["preko 3.500 km", "3-4 sata na dolasku", "300-600 EUR"],
    ["preko 3.500 km", "4+ sata na dolasku", "600 EUR"],
  ],
  en: [
    ["up to 1,500 km", "3+ hours at arrival", "250 EUR"],
    ["1,500-3,500 km", "3+ hours at arrival", "400 EUR"],
    ["over 3,500 km", "3-4 hours at arrival", "300-600 EUR"],
    ["over 3,500 km", "4+ hours at arrival", "600 EUR"],
  ],
};

const arrivalTimeline = {
  sr: {
    title: "Kako se meri prag od 3 sata",
    intro:
      "Ovo je najčešća tačka greške: ne računa se samo čekanje na polasku, već završetak putovanja na destinaciji iz rezervacije.",
    steps: [
      {
        label: "Plan",
        title: "Planirani dolazak",
        body: "Polazi se od vremena dolaska koje stoji u karti ili potvrdi rezervacije.",
      },
      {
        label: "Stvarno",
        title: "Stvarni dolazak",
        body: "Proverava se kada je putnik stvarno stigao na krajnju destinaciju.",
      },
      {
        label: "Prag",
        title: "3+ sata",
        body: "Ako je razlika tri sata ili više, slučaj vredi stručno proveriti.",
      },
      {
        label: "Razlog",
        title: "Odgovornost",
        body: "Tek onda se proverava da li razlog može osloboditi aviokompaniju.",
      },
    ],
  },
  en: {
    title: "How the 3-hour threshold is measured",
    intro:
      "This is the most common mistake: the relevant point is not only departure waiting, but completion of the journey at the destination in the booking.",
    steps: [
      {
        label: "Plan",
        title: "Scheduled arrival",
        body: "Start from the arrival time shown on the ticket or booking confirmation.",
      },
      {
        label: "Actual",
        title: "Actual arrival",
        body: "Check when the passenger actually reached the final destination.",
      },
      {
        label: "Threshold",
        title: "3+ hours",
        body: "If the difference is three hours or more, the case is worth professional review.",
      },
      {
        label: "Cause",
        title: "Responsibility",
        body: "Only then check whether the reason can release the airline from payment.",
      },
    ],
  },
};

const professionalHandling = {
  sr: {
    eyebrow: "Profesionalna obrada",
    title: "Zašto se zahtev ne završava jednim formularom",
    intro:
      "Aviokompanije često prvo šalju opštu odbijenicu fizičkom licu. Razlika nastaje kada se slučaj vodi kroz činjenice, dokaz i proceduru.",
    steps: [
      "Provera rute, rezervacije, dolaska i razloga kašnjenja",
      "Slaganje dokaza tako da odbijenica ne ostane opšta tvrdnja",
      "Komunikacija sa aviokompanijom kroz pravila i rokove",
      "Odgovor na generičko odbijanje bez gubljenja jakih delova zahteva",
    ],
  },
  en: {
    eyebrow: "Professional handling",
    title: "Why the claim is not finished by one form",
    intro:
      "Airlines often send individuals a generic first rejection. The difference comes when the case is handled through facts, evidence and procedure.",
    steps: [
      "Review route, booking, arrival time and delay reason",
      "Organize evidence so a rejection cannot stay generic",
      "Communicate with the airline through rules and deadlines",
      "Answer broad rejections without losing the strongest parts of the claim",
    ],
  },
};

const guideCaseFile = {
  sr: {
    eyebrow: "Dokazni okvir",
    title: "Šta se slaže pre kontakta sa aviokompanijom",
    items: [
      "ruta, rezervacija i operativni prevoznik",
      "tačna vremenska linija poremećaja",
      "dokaz razloga koji aviokompanija navodi",
      "troškovi koji se vode odvojeno od fiksne naknade",
    ],
  },
  en: {
    eyebrow: "Evidence frame",
    title: "What is organized before contacting the airline",
    items: [
      "route, booking and operating carrier",
      "exact disruption timeline",
      "proof behind the airline's stated reason",
      "expenses handled separately from fixed compensation",
    ],
  },
};

function slugifyHeading(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/đ/g, "dj")
    .replace(/[čć]/g, "c")
    .replace(/š/g, "s")
    .replace(/ž/g, "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sectionId(heading: string) {
  return slugifyHeading(heading);
}

function isAmountSection(heading: string, locale: BlogLocale) {
  return locale === "sr"
    ? heading === "Koliko može iznositi naknada"
    : heading === "How much compensation can be owed";
}

function isProfessionalHandlingSection(heading: string, locale: BlogLocale) {
  return locale === "sr"
    ? heading === "Zašto zahtev nije samo formular aviokompaniji"
    : heading === "Why the claim is not just an airline form";
}

function isArrivalSection(heading: string, locale: BlogLocale) {
  return locale === "sr"
    ? heading === "Dolazak tri sata kasnije i stvarno vreme dolaska"
    : heading === "The three-hour arrival rule and actual arrival time";
}

function isDocumentsSection(heading: string, locale: BlogLocale) {
  return locale === "sr"
    ? heading === "Dokumenta, rokovi i profesionalna obrada zahteva"
    : heading === "Documents, deadlines and professional claim handling";
}

function ArrivalTimeline({
  locale,
}: {
  locale: BlogLocale;
}) {
  const timeline = arrivalTimeline[locale];

  return (
    <div className="mt-8 rounded-[18px] border border-[#CFE0FF] bg-[#F3F7FF] p-5 md:p-6">
      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#2470EB]">
        {locale === "sr" ? "Vremenska linija" : "Timeline"}
      </p>
      <h3 className="mt-2 font-display text-[24px] font-black leading-[1.18] tracking-[-0.02em] text-[#101828] md:text-[28px]">
        {timeline.title}
      </h3>
      <p className="mt-3 max-w-[760px] text-[16px] leading-[1.7] text-[#475467]">
        {timeline.intro}
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        {timeline.steps.map((step, index) => (
          <div key={step.title} className="relative rounded-[14px] border border-white bg-white p-4 shadow-[0_12px_32px_rgba(16,24,40,0.05)]">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2470EB] text-[13px] font-black text-white">
                {index + 1}
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#667085]">
                {step.label}
              </span>
            </div>
            <h4 className="mt-4 text-[17px] font-black leading-[1.25] text-[#101828]">
              {step.title}
            </h4>
            <p className="mt-2 text-[14px] leading-[1.6] text-[#5D6B82]">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AmountTable({
  locale,
}: {
  locale: BlogLocale;
}) {
  const t = copy[locale];

  return (
    <div className="mt-8 rounded-[18px] border border-[#E4E7EC] bg-white p-5 shadow-[0_16px_42px_rgba(16,24,40,0.05)] md:p-6">
      <h3 className="font-display text-[24px] font-black leading-[1.18] tracking-[-0.02em] text-[#101828] md:text-[28px]">
        {t.amountTitle}
      </h3>
      <p className="mt-3 max-w-[680px] text-[16px] leading-[1.7] text-[#475467]">
        {t.amountIntro}
      </p>
      <div className="mt-6 overflow-x-auto rounded-[14px] border border-[#E4E7EC]">
        <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
          <tbody>
            {amountRows[locale].map((row) => (
              <tr key={row.join("-")} className="border-b border-[#EAECF0] last:border-b-0">
                <th className="bg-[#F9FAFB] px-5 py-4 font-black text-[#101828]">
                  {row[0]}
                </th>
                <td className="px-5 py-4 font-bold text-[#475467]">{row[1]}</td>
                <td className="px-5 py-4 font-black text-[#1F5FD2]">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProfessionalHandlingVisual({
  locale,
}: {
  locale: BlogLocale;
}) {
  const visual = professionalHandling[locale];

  return (
    <div className="mt-8 overflow-hidden rounded-[18px] border border-[#D8E4FF] bg-[#0B1220] shadow-[0_22px_58px_rgba(16,24,40,0.14)]">
      <div className="grid gap-0 md:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-[#2470EB] p-6 text-white md:p-8">
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/75">
            {visual.eyebrow}
          </p>
          <h3 className="mt-3 font-display text-[25px] font-black leading-[1.15] tracking-[-0.02em] md:text-[31px]">
            {visual.title}
          </h3>
          <p className="mt-4 text-[16px] leading-[1.7] text-white/86">
            {visual.intro}
          </p>
        </div>
        <div className="p-6 md:p-8">
          <ol className="space-y-4">
            {visual.steps.map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[13px] font-black text-[#1F5FD2]">
                  {index + 1}
                </span>
                <span className="pt-1 text-[16px] font-bold leading-[1.55] text-white/86">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function GuideCaseFileVisual({
  locale,
}: {
  locale: BlogLocale;
}) {
  const visual = guideCaseFile[locale];

  return (
    <div className="mt-8 rounded-[18px] border border-[#D6E4FF] bg-[#F3F7FF] p-5 md:p-6">
      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#2470EB]">
        {visual.eyebrow}
      </p>
      <h3 className="mt-2 font-display text-[24px] font-black leading-[1.18] tracking-[-0.02em] text-[#101828] md:text-[28px]">
        {visual.title}
      </h3>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {visual.items.map((item) => (
          <div key={item} className="rounded-[14px] border border-white bg-white p-4 text-[15px] font-bold leading-[1.55] text-[#344054] shadow-[0_10px_28px_rgba(16,24,40,0.04)]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function GuideQuickCheckBanner({
  locale,
  ctaLabel,
}: {
  locale: BlogLocale;
  ctaLabel: string;
}) {
  const t = copy[locale];
  const checkHref = locale === "sr" ? "/#proveri-let" : "/en#proveri-let";

  return (
    <div className="mt-8 relative overflow-hidden rounded-[18px] bg-[radial-gradient(circle_at_72%_20%,#61A5FF_0,#226CF0_30%,#14378E_56%,#B53771_100%)] p-6 text-white shadow-[0_22px_60px_rgba(36,112,235,0.22)] md:p-8">
      <div className="relative z-10 grid gap-7 md:grid-cols-[minmax(0,0.95fr)_1.05fr] md:items-center">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/72">
            {t.nextStep}
          </p>
          <h3 className="mt-3 max-w-[430px] font-display text-[27px] font-black leading-[1.14] md:text-[32px]">
            {locale === "sr"
              ? "Saznajte da li vam pripada naknada za poremećen let"
              : "Find out if you are owed compensation for a disrupted flight"}
          </h3>
          <p className="mt-4 max-w-[440px] text-[15px] font-semibold leading-[1.65] text-white/78">
            {t.nextStepBody}
          </p>
          <Link
            href={checkHref}
            className="mt-6 inline-flex rounded-[10px] border-2 border-white bg-white px-5 py-3 text-[14px] font-black text-[#0F5BEA] shadow-[0_10px_28px_rgba(0,0,0,0.18)] transition hover:bg-[#F3F7FF]"
          >
            {ctaLabel}
          </Link>
        </div>
        <div className="relative min-h-[190px] md:min-h-[230px]" aria-hidden="true">
          <div className="absolute right-[5%] top-0 w-[58%] rotate-[5deg] rounded-[18px] bg-white p-4 text-[#172033] shadow-[0_24px_56px_rgba(2,8,23,0.28)]">
            <div className="flex items-center justify-between border-b border-[#E3E8F4] pb-3">
              <span className="rounded-full bg-[#EAF2FF] px-3 py-1 text-[10px] font-black text-[#2470EB]">
                LK 261
              </span>
              <span className="text-[10px] font-black uppercase text-[#98A2B3]">
                {locale === "sr" ? "ZA STRUČNU PROVERU" : "FOR EXPERT REVIEW"}
              </span>
            </div>
            <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div>
                <p className="text-[11px] font-black uppercase text-[#98A2B3]">
                  {locale === "sr" ? "Ruta" : "Route"}
                </p>
                <p className="mt-1 text-[24px] font-black text-[#111827]">BEG</p>
              </div>
              <div className="h-[2px] w-12 bg-[#D7E2F2]" />
              <div className="text-right">
                <p className="text-[11px] font-black uppercase text-[#98A2B3]">
                  EU
                </p>
                <p className="mt-1 text-[24px] font-black text-[#111827]">€600</p>
              </div>
            </div>
            <p className="mt-5 rounded-[12px] bg-[#FFF4E5] px-4 py-3 text-[14px] font-black text-[#C45700]">
              {locale === "sr" ? "provera uslova" : "eligibility check"}
            </p>
          </div>
          <div className="absolute bottom-2 left-[4%] w-[50%] -rotate-[8deg] rounded-[16px] bg-[#FF5B72] p-4 text-white shadow-[0_20px_48px_rgba(2,8,23,0.24)]">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white/72">
              {locale === "sr" ? "Poremećaj leta" : "Flight disruption"}
            </p>
            <div className="mt-7 h-2 w-24 rounded-full bg-white/80" />
            <div className="mt-3 h-2 w-32 rounded-full bg-white/45" />
            <div className="mt-6 inline-flex rounded-full bg-white/18 px-3 py-1 text-[12px] font-black">
              Let Kasni
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CornerstoneTypographyPreview({
  page,
  locale,
}: {
  page: CornerstonePage;
  locale: BlogLocale;
}) {
  const t = copy[locale];
  const localized = page[locale];
  const supportEmail = getSupportEmail();
  const childArticles = getCornerstoneChildren(page, locale);
  const tocSections = localized.sections.map((section) => ({
    id: sectionId(section.heading),
    label: section.heading,
  })).concat(
    childArticles.length > 0
      ? [{ id: "detaljni-vodici", label: t.detailedGuides }]
      : [],
  );
  const currentHref = getCornerstoneHref(page, locale);
  const alternateHref = getAlternateCornerstoneHref(page, locale);

  return (
    <main className="min-h-screen bg-[#F7F8FB] text-[#172033]">
      <SiteHeader locale={locale} alternateHref={alternateHref} />

      <article className="pt-16">
        <header className="bg-white">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-6 pb-10 pt-10 lg:grid-cols-[minmax(0,680px)_420px] lg:pb-14 lg:pt-14">
            <div className="self-center">
              <nav className="flex items-center gap-2 text-[13px] font-bold text-[#667085]">
                <Link href={locale === "sr" ? "/blog" : "/en/blog"} className="hover:text-[#1F5FD2]">
                  Blog
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span>{t.breadcrumb}</span>
              </nav>

              <p className="mt-8 text-[12px] font-black uppercase tracking-[0.16em] text-[#2470EB]">
                {localized.eyebrow}
              </p>
              <h1 className="mt-4 max-w-[720px] font-display text-[44px] font-black leading-[1.05] tracking-[-0.035em] text-[#101828] md:text-[60px]">
                {localized.title}
              </h1>
              <p className="mt-6 max-w-[680px] text-[20px] leading-[1.65] text-[#475467]">
                {localized.excerpt}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] font-bold text-[#667085]">
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#2470EB]" />
                  {t.updated}: {formatDisplayDate(page.updatedAt, locale)}
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-[18px] bg-[#E7EEF8] shadow-[0_24px_70px_rgba(16,24,40,0.12)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={page.image.src}
                alt={page.image.alt}
                className="h-full min-h-[300px] w-full object-cover"
                style={{ objectPosition: page.image.position ?? "center" }}
              />
            </div>
          </div>
        </header>

        <ScrollProgressToc label={t.tocTitle} sections={tocSections} />

        <section className="px-6 py-12 lg:py-16">
          <div className="mx-auto max-w-[1040px]">
            <div className="mx-auto max-w-[980px]">
              <InterlinkingScope currentHref={currentHref}>
                <div className="space-y-14">
                  {localized.sections.map((section, index) => (
                    <section key={section.heading} id={sectionId(section.heading)} className="scroll-mt-36">
                      <h2 className="font-display text-[34px] font-black leading-[1.16] tracking-[-0.025em] text-[#101828] md:text-[42px]">
                        {section.heading}
                      </h2>
                      <div className="mt-6 space-y-6 text-[19px] leading-[1.78] text-[#344054]">
                        {section.body.map((paragraph) => (
                          <p key={paragraph}>
                            <InlineRichText text={paragraph} locale={locale} />
                          </p>
                        ))}
                      </div>
                      {section.bullets ? (
                        <ul className="mt-7 space-y-3 border-l-4 border-[#2470EB] bg-white py-2 pl-5 text-[17px] leading-[1.68] text-[#344054]">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-3">
                              <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2470EB]" />
                              <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      ) : null}
                      {index === 2 ? (
                        <GuideQuickCheckBanner locale={locale} ctaLabel={localized.ctaLabel} />
                      ) : null}
                      {isAmountSection(section.heading, locale) ? (
                        <AmountTable locale={locale} />
                      ) : null}
                      {isProfessionalHandlingSection(section.heading, locale) ? (
                        <ProfessionalHandlingVisual locale={locale} />
                      ) : null}
                      {page.id !== "flight-delay-compensation" && (index === 3 || index === 11) ? (
                        <ProfessionalHandlingVisual locale={locale} />
                      ) : null}
                      {isArrivalSection(section.heading, locale) ? (
                        <ArrivalTimeline locale={locale} />
                      ) : null}
                      {page.id !== "flight-delay-compensation" && (index === 7 || index === 15) ? (
                        <GuideCaseFileVisual locale={locale} />
                      ) : null}
                      {isDocumentsSection(section.heading, locale) ? (
                        <div className="mt-8 scroll-mt-36">
                          <DelayCompensationCalculator locale={locale} />
                        </div>
                      ) : null}
                    </section>
                  ))}
                </div>
              </InterlinkingScope>

              {childArticles.length > 0 ? (
                <section id="detaljni-vodici" className="mt-16 scroll-mt-36">
                  <h2 className="font-display text-[34px] font-black leading-[1.16] tracking-[-0.025em] text-[#101828] md:text-[42px]">
                    {t.detailedGuides}
                  </h2>
                  <p className="mt-4 max-w-[680px] text-[18px] leading-[1.7] text-[#475467]">
                    {t.detailedIntro}
                  </p>
                  <div className="mt-8 grid gap-6 md:grid-cols-2">
                    {childArticles.slice(0, 8).map((article) => {
                      const image = getBlogArticleImage(article.id);

                      return (
                        <Link
                          key={article.id}
                          href={getArticleCornerstoneHref(article, locale)}
                          className="group overflow-hidden rounded-[16px] border border-[#E4E7EC] bg-white shadow-[0_16px_42px_rgba(16,24,40,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_58px_rgba(16,24,40,0.12)]"
                        >
                          <div className="aspect-[16/9] overflow-hidden bg-[#E7EEF8]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                              style={{ objectPosition: image.position ?? "center" }}
                            />
                          </div>
                          <div className="p-5">
                            <p className="text-[12px] font-black uppercase tracking-[0.12em] text-[#2470EB]">
                              {article.localized.category}
                            </p>
                            <h3 className="mt-3 text-[21px] font-black leading-[1.22] tracking-[-0.018em] text-[#101828]">
                              {article.localized.title}
                            </h3>
                            <p className="mt-3 text-[15px] leading-[1.65] text-[#667085]">
                              {article.localized.excerpt}
                            </p>
                            <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-black text-[#1F5FD2]">
                              {t.readMore}
                              <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </section>
      </article>

      <SiteFooter locale={locale} supportEmail={supportEmail} />
    </main>
  );
}
