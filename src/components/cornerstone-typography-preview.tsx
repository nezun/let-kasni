import { ClaimInlineCtaButton } from "@/components/claim-inline-cta-button";
import { DelayCompensationCalculator } from "@/components/delay-compensation-calculator";
import { InlineRichText, InterlinkingScope } from "@/components/inline-rich-text";
import { copy as lkCopy } from "@/components/lk-v2/copy";
import { LkArrow } from "@/components/lk-v2/lk-icon";
import { LkDelayTop, LkYourEuropeNote } from "@/components/lk-v2/lk-delay";
import { LkSteps, LkTestimonials } from "@/components/lk-v2/lk-home";
import { LkContentCard, LkFaqSection, LkFinalCta, LkInnerHero } from "@/components/lk-v2/lk-inner";
import {
  LkModuleCard,
  LkModuleCheck,
  LkModuleChecks,
  LkModuleSteps,
  LkModuleTable,
  LkModuleTiles,
} from "@/components/lk-v2/lk-modules";
import { LkStickyCheck } from "@/components/lk-v2/lk-motion";
import { LkFrame } from "@/components/lk-v2/lk-page";
import { ScrollProgressToc } from "@/components/scroll-progress-toc";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { type BlogLocale } from "@/lib/blog";
import {
  getArticleCornerstoneHref,
  getAlternateCornerstoneHref,
  getCornerstoneChildren,
  getCornerstoneHref,
  type CornerstonePage,
} from "@/lib/cornerstones";
import { formatDisplayDate } from "@/lib/date-format";

// Šablon svih glavnih vodiča u izgledu nove verzije sajta (v2 iz transport-local, blokovi letkasni-pages: hero sa
// putanjom, dugmad, sadržaj strane, tekst, česta pitanja, detaljni vodiči, završni poziv). Pravila sadržaja ostaju:
// lepljivi sadržaj koji prati čitanje (ScrollProgressToc), brza provera odmah posle prvog H2 i vizuali raspoređeni
// kroz tekst na istim mestima kao ranije.
const copy = {
  sr: {
    tocTitle: "Sadržaj stranice",
    amountTitle: "Iznosi naknade po dužini rute",
    amountIntro:
      "Koristite tabelu kao brzu orijentaciju, a zatim proverite rutu, stvarni dolazak i razlog kašnjenja.",
    detailedGuides: "Detaljni vodiči",
    nextStep: "BESPLATNA PROVERA",
    quickCheckTitle: "Saznajte da li Vam pripada naknada i do 600 €.",
    nextStepBody:
      "Brza provera spaja podatke o letu, dužinu rute i osnovne dokaze radi utvrđivanja Vašeg prava.",
    checkFlight: "Proverite let",
    timelineEyebrow: "VREMENSKA LINIJA",
  },
  en: {
    tocTitle: "On this page",
    amountTitle: "Compensation amounts by route distance",
    amountIntro:
      "Use the table as quick orientation, then check route coverage, actual arrival and the delay reason.",
    detailedGuides: "Detailed guides",
    nextStep: "FREE CHECK",
    quickCheckTitle: "Find out if you are owed up to €600 in compensation.",
    nextStepBody:
      "The quick check combines flight details, route distance and basic evidence to assess your right.",
    checkFlight: "Check your flight",
    timelineEyebrow: "TIMELINE",
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

const cancellationDecision = {
  sr: {
    eyebrow: "Otkazan let",
    title: "Redosled koji menja ishod zahteva",
    intro:
      "Kod otkazivanja se ne kreće od jedne opšte rečenice. Prvo se zatvara rok obaveštenja, zatim alternativa, pa tek onda razlog koji aviokompanija navodi.",
    rows: [
      {
        label: "Rok",
        title: "Kada ste obavešteni",
        body: "14+ dana, 7-14 dana ili manje od 7 dana ne vode ka istoj proceni.",
      },
      {
        label: "Zamena",
        title: "Šta je ponuđeno umesto leta",
        body: "Bitno je vreme polaska, vreme dolaska i da li je promena realno prihvatljiva.",
      },
      {
        label: "Pravo",
        title: "Šta se traži odvojeno",
        body: "Fiksna naknada, refundacija, preusmeravanje, hotel i obroci ne idu u istu stavku.",
      },
      {
        label: "Razlog",
        title: "Šta kompanija mora da objasni",
        body: "Vanredne okolnosti moraju biti vezane za konkretan let, vreme i segment.",
      },
    ],
  },
  en: {
    eyebrow: "Cancelled flight",
    title: "The order that changes the claim outcome",
    intro:
      "Cancellation assessment does not start from one broad sentence. Notice timing comes first, then replacement travel, then the reason the airline gives.",
    rows: [
      {
        label: "Notice",
        title: "When you were informed",
        body: "14+ days, 7-14 days and less than 7 days do not lead to the same assessment.",
      },
      {
        label: "Alternative",
        title: "What replaced the flight",
        body: "Departure time, arrival time and whether the change was realistic all matter.",
      },
      {
        label: "Right",
        title: "What is requested separately",
        body: "Fixed compensation, refund, rerouting, hotel and meals are not one item.",
      },
      {
        label: "Cause",
        title: "What the airline must explain",
        body: "Extraordinary circumstances must be tied to the concrete flight, time and segment.",
      },
    ],
  },
};

const cancellationReplyAudit = {
  sr: {
    eyebrow: "Provera odgovora",
    title: "Odbijenica mora da preživi četiri pitanja",
    checks: [
      "Da li pominje tačan let, datum, rutu i putnike?",
      "Da li navodi kada je obaveštenje poslato i šta je bila alternativa?",
      "Da li razlog ima dokaz ili samo opštu formulaciju?",
      "Da li je odvojeno odgovoreno na refundaciju, brigu i troškove?",
    ],
  },
  en: {
    eyebrow: "Response audit",
    title: "A rejection must survive four questions",
    checks: [
      "Does it identify the exact flight, date, route and passengers?",
      "Does it state when notice was sent and what alternative was offered?",
      "Is the reason supported by evidence or only broad wording?",
      "Does it answer refund, care and expenses separately?",
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

function isCancellationDecisionSection(page: CornerstonePage, heading: string, locale: BlogLocale) {
  return page.id === "flight-cancellation-compensation" && (
    locale === "sr"
      ? heading === "Vanredne okolnosti i zašto opšte objašnjenje nije dovoljno"
      : heading === "Extraordinary circumstances and broad explanations"
  );
}

function isCancellationReplySection(page: CornerstonePage, heading: string, locale: BlogLocale) {
  return page.id === "flight-cancellation-compensation" && (
    locale === "sr"
      ? heading === "Kako proveriti odgovor aviokompanije po tačkama"
      : heading === "How to check the airline response point by point"
  );
}

function ArrivalTimeline({ locale }: { locale: BlogLocale }) {
  const timeline = arrivalTimeline[locale];

  return (
    <LkModuleCard badge={copy[locale].timelineEyebrow} title={timeline.title}>
      <p>{timeline.intro}</p>
      <LkModuleTiles
        four
        items={timeline.steps.map((step, index) => ({
          label: `${index + 1}. ${step.label}`,
          title: step.title,
          body: step.body,
        }))}
      />
    </LkModuleCard>
  );
}

function AmountTable({ locale }: { locale: BlogLocale }) {
  const t = copy[locale];

  return (
    <LkModuleCard title={t.amountTitle}>
      <p>{t.amountIntro}</p>
      <LkModuleTable rows={amountRows[locale]} />
    </LkModuleCard>
  );
}

function ProfessionalHandlingVisual({ locale }: { locale: BlogLocale }) {
  const visual = professionalHandling[locale];

  return (
    <LkModuleCard dark badge={visual.eyebrow.toUpperCase()} title={visual.title}>
      <p>{visual.intro}</p>
      <LkModuleSteps items={visual.steps} />
    </LkModuleCard>
  );
}

function GuideCaseFileVisual({ locale }: { locale: BlogLocale }) {
  const visual = guideCaseFile[locale];

  return (
    <LkModuleCard badge={visual.eyebrow.toUpperCase()} title={visual.title}>
      <LkModuleChecks items={visual.items} />
    </LkModuleCard>
  );
}

function CancellationDecisionVisual({ locale }: { locale: BlogLocale }) {
  const visual = cancellationDecision[locale];

  return (
    <LkModuleCard dark badge={visual.eyebrow.toUpperCase()} title={visual.title}>
      <p>{visual.intro}</p>
      <LkModuleTiles items={visual.rows.map((row) => ({ label: row.label, title: row.title, body: row.body }))} />
    </LkModuleCard>
  );
}

function CancellationReplyAuditVisual({ locale }: { locale: BlogLocale }) {
  const visual = cancellationReplyAudit[locale];

  return (
    <LkModuleCard badge={visual.eyebrow.toUpperCase()} title={visual.title}>
      <LkModuleSteps items={visual.checks} />
    </LkModuleCard>
  );
}

function GuideQuickCheckBanner({ locale }: { locale: BlogLocale }) {
  const t = copy[locale];

  return (
    <LkModuleCheck badge={t.nextStep} title={t.quickCheckTitle} body={t.nextStepBody}>
      <ClaimInlineCtaButton locale={locale} eventLabel="guide_quick_check_cta" className="lk-ui-button">
        {t.checkFlight} <LkArrow />
      </ClaimInlineCtaButton>
    </LkModuleCheck>
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
  const inner = lkCopy[locale].inner;
  const localized = page[locale];
  const childArticles = getCornerstoneChildren(page, locale);
  const tocSections = localized.sections.map((section) => ({
    id: sectionId(section.heading),
    label: section.heading,
  }));
  const currentHref = getCornerstoneHref(page, locale);
  const alternateHref = getAlternateCornerstoneHref(page, locale);
  const isCancellationGuide = page.id === "flight-cancellation-compensation";
  // Vodič za kašnjenje ima poseban početak iz v2 dizajna (hero sa formom, iznosi, dokumenta, pomoć tokom čekanja),
  // a ispod njega isti tekst vodiča kao ostali vodiči.
  const isDelayGuide = page.id === "flight-delay-compensation";
  const delay = lkCopy[locale].delayPage;
  const canUseGenericGuideVisuals =
    page.id !== "flight-delay-compensation" && !isCancellationGuide;

  return (
    <LkFrame locale={locale} kind={isDelayGuide ? "lk-delay-page" : "lk-content-page"}>
      <SiteHeader locale={locale} alternateHref={alternateHref} nav={isDelayGuide ? delay.nav : undefined} />
      <main id="main">
        {isDelayGuide ? (
          <LkDelayTop locale={locale} />
        ) : (
          <>
            <LkInnerHero
              locale={locale}
              crumbs={[{ label: localized.title }]}
              badge={inner.guideBadge}
              title={localized.title}
              lead={localized.excerpt}
            />
            <div className="lk-container lk-guide-cta">
              <ClaimInlineCtaButton locale={locale} eventLabel="guide_hero_cta" className="lk-ui-button">
                {inner.guideButton}
              </ClaimInlineCtaButton>
              <a className="lk-ui-link" href="#sadrzaj">
                {inner.guideMore}
              </a>
            </div>
          </>
        )}
        {/* Klasa sa originala za tekstualne strane (naslovi i pasusi u lk-reading); na vodiču za kašnjenje važi samo za tekst. */}
        <div className="lk-content-page">
          <div className="lk-container lk-reading-layout">
            <ScrollProgressToc label={t.tocTitle} navLabel={inner.tocAria} sections={tocSections}>
              <ClaimInlineCtaButton locale={locale} eventLabel="guide_toc_cta" className="lk-ui-button">
                {inner.tocButton}
              </ClaimInlineCtaButton>
            </ScrollProgressToc>
            <article className="lk-reading" id="sadrzaj">
              {/* Na vodiču za kašnjenje v2 hero nema uvodni tekst vodiča, pa on otvara tekst ispod. */}
              {isDelayGuide ? <p>{localized.excerpt}</p> : null}
              <InterlinkingScope currentHref={currentHref}>
                {localized.sections.map((section, index) => (
                  <section key={section.heading} id={sectionId(section.heading)} className="lk-reading-section">
                    <h2>{section.heading}</h2>
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>
                        <InlineRichText text={paragraph} locale={locale} />
                      </p>
                    ))}
                    {section.bullets ? (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                    {index === 0 ? (
                      <GuideQuickCheckBanner locale={locale} />
                    ) : null}
                    {isAmountSection(section.heading, locale) ? (
                      <AmountTable locale={locale} />
                    ) : null}
                    {isProfessionalHandlingSection(section.heading, locale) ? (
                      <ProfessionalHandlingVisual locale={locale} />
                    ) : null}
                    {canUseGenericGuideVisuals && index === 3 ? (
                      <ProfessionalHandlingVisual locale={locale} />
                    ) : null}
                    {isArrivalSection(section.heading, locale) ? (
                      <ArrivalTimeline locale={locale} />
                    ) : null}
                    {isCancellationDecisionSection(page, section.heading, locale) ? (
                      <CancellationDecisionVisual locale={locale} />
                    ) : null}
                    {canUseGenericGuideVisuals && index === 7 ? (
                      <GuideCaseFileVisual locale={locale} />
                    ) : null}
                    {isCancellationReplySection(page, section.heading, locale) ? (
                      <CancellationReplyAuditVisual locale={locale} />
                    ) : null}
                    {isDocumentsSection(section.heading, locale) ? (
                      <DelayCompensationCalculator locale={locale} />
                    ) : null}
                  </section>
                ))}
              </InterlinkingScope>
            </article>
          </div>
        </div>

        {isDelayGuide ? (
          <>
            <LkSteps locale={locale} />
            <LkTestimonials locale={locale} />
          </>
        ) : null}

        {localized.faqs.length > 0 ? (
          <LkFaqSection
            id={isDelayGuide ? "faq" : undefined}
            title={isDelayGuide ? delay.faqTitle : inner.faqTitle}
            intro={isDelayGuide ? delay.faqIntro : undefined}
            firstOpen={isDelayGuide}
            items={localized.faqs.map((faq) => ({ q: faq.question, a: faq.answer }))}
            note={isDelayGuide ? <LkYourEuropeNote locale={locale} /> : undefined}
          />
        ) : null}

        {childArticles.length > 0 ? (
          <section className="lk-section" id="detaljni-vodici">
            <div className="lk-container">
              <h2>{t.detailedGuides}</h2>
              <div className="lk-article-grid">
                {childArticles.slice(0, 8).map((article) => (
                  <LkContentCard
                    key={article.id}
                    badge={article.localized.category}
                    title={article.localized.title}
                    href={getArticleCornerstoneHref(article, locale)}
                    excerpt={article.localized.excerpt}
                    date={formatDisplayDate(article.updatedAt, locale)}
                    dateTime={article.updatedAt}
                    readTime={article.localized.readTime}
                    readLabel={inner.readArticle}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <LkFinalCta locale={locale} />
      </main>
      <SiteFooter locale={locale} />
      {isDelayGuide ? <LkStickyCheck t={lkCopy[locale].sticky} /> : null}
    </LkFrame>
  );
}
