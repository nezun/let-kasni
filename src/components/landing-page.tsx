import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

import { ClaimIntakeForm } from "@/components/claim-intake-form";
import { getSupportEmail } from "@/lib/env";

type Locale = "sr" | "en";

const copy = {
  sr: {
    navHow: "Kako radi",
    navCases: "Koji slučajevi",
    navFaq: "FAQ",
    navCompare: "Varijante",
    navCta: "Pošalji slučaj",
    badge: "Lokalni claims handoff za putnike iz Srbije",
    title:
      "Vaš let je kasnio ili ste propustili konekciju? Proverite slučaj za manje od minut.",
    body:
      "Unosite minimum podataka, dobijate konzervativan preliminarni signal, a slučaj ide dalje u pravi operativni tok. Bez generičnog stranog claim sajta i bez praznog “javićemo vam se”.",
    chips: [
      "Podržano: kašnjenje 3h+",
      "Podržano: propuštena konekcija na istoj rezervaciji",
      "Ako signal nije čist: ručna provera",
    ],
    evidence: [
      { label: "Live lookup", value: "Flight podaci" },
      { label: "Fallback", value: "Ručna provera" },
      { label: "Ops", value: "Claim queue" },
      { label: "Trošak", value: "Bez unapred" },
    ],
    primaryCta: "Proverite pravo na naknadu",
    secondaryCta: "Pogledajte kako radi",
    timelineTitle: "Kako ovo radi",
    timeline: [
      {
        title: "Unesete minimum",
        body: "Broj leta, datum, tip problema i kontakt. Bez papirologije u prvom koraku.",
      },
      {
        title: "Sistem proverava signal",
        body: "Pokušavamo da vratimo dovoljno podataka za konzervativan preliminarni odgovor.",
      },
      {
        title: "Slučaj ulazi u queue",
        body: "Interni pregled odvaja jasno pozitivne, ručne i slabe slučajeve bez gubljenja kroz inbox.",
      },
    ],
    questionsTitle: "Pitanja koja stvarno odlučuju konverziju",
    questions: [
      {
        title: "Šta ako ne može odmah da potvrdi?",
        body: "Tada dobijaš ručnu proveru, ne lažnu sigurnost.",
      },
      {
        title: "Da li odmah tražite dokumenta?",
        body: "Ne u prvom koraku. Prvo proveravamo da li ima smisla ići dalje.",
      },
      {
        title: "Zašto ovo deluje drugačije od AirHelp-a?",
        body: "Zato što je više utility alat sa lokalnim handoff modelom, a manje marketinški claim template.",
      },
    ],
    casesTitle: "Koji slučajevi su najčistiji za prvu verziju",
    cases: [
      {
        label: "Podržano sada",
        title: "Kašnjenje preko 3 sata",
        body: "Najjači phase 1 slučaj za preliminarnu proveru i dalju obradu.",
      },
      {
        label: "Podržano sada",
        title: "Propuštena konekcija",
        body: "Posebno kada je ceo put bio na istoj rezervaciji i prvi segment poremetio ostatak puta.",
      },
      {
        label: "Ručna provera",
        title: "Ostali edge slučajevi",
        body: "Denied boarding, baggage i slični scenariji nisu fokus prve verzije toka.",
      },
    ],
    faqTitle: "Česta pitanja",
    faq: [
      {
        title: "Da li odmah znate da imam pravo?",
        body: "Ne. Ako signal nije dovoljno čist, slučaj ide u ručnu proveru.",
      },
      {
        title: "Zašto tražite samo minimum?",
        body: "Zato što je cilj da se slučaj brzo preda, a ne da korisnik odmah upadne u papirologiju.",
      },
      {
        title: "Šta se dešava posle?",
        body: "Claim ulazi u interni queue i dobija sledeći korak, umesto da nestane u inboxu.",
      },
      {
        title: "Koliko ovo može da vredi?",
        body: "U tipičnim EU 261 slučajevima signal je najčešće u opsegu 250–600 EUR po putniku, ali prvi korak nije konačno obećanje.",
      },
    ],
    compareTitle: "Uporedite zaključane i šire dizajn pravce",
    compareBody:
      "Ako želiš da presečeš finalni smer brzo kad se vratiš, otvoren je poseban board sa A1/A2/A3 final varijantama i dodatnim širim eksploracijama.",
    compareButton: "Otvori design board",
    footerBody:
      "Prvi srpski servis fokusiran na početnu proveru prava putnika u avio-saobraćaju i smislen sledeći korak.",
    footerTerms: "Uslovi korišćenja",
    footerPrivacy: "Politika privatnosti",
    footerSupport: "Kontakt",
  },
  en: {
    navHow: "How it works",
    navCases: "Supported cases",
    navFaq: "FAQ",
    navCompare: "Variants",
    navCta: "Send the case",
    badge: "Local claims handoff for passengers flying to or from Serbia",
    title:
      "Was your flight delayed or did you miss a connection? Check the case in under a minute.",
    body:
      "You enter the minimum, get a conservative preliminary signal, and the case moves into a real operating flow. No generic foreign claim template and no empty “we will get back to you.”",
    chips: [
      "Supported: delay 3h+",
      "Supported: missed connection on the same booking",
      "If the signal is unclear: manual review",
    ],
    evidence: [
      { label: "Live lookup", value: "Flight data" },
      { label: "Fallback", value: "Manual review" },
      { label: "Ops", value: "Claim queue" },
      { label: "Cost", value: "No upfront fee" },
    ],
    primaryCta: "Check compensation eligibility",
    secondaryCta: "See how it works",
    timelineTitle: "How this works",
    timeline: [
      {
        title: "You enter the minimum",
        body: "Flight number, date, disruption type and contact details. No paperwork on step one.",
      },
      {
        title: "The system checks the signal",
        body: "We try to return enough data for a conservative preliminary answer.",
      },
      {
        title: "The case enters a real queue",
        body: "Internal review separates clearer cases, manual-review cases and weak cases without losing them in email.",
      },
    ],
    questionsTitle: "Questions that actually decide conversion",
    questions: [
      {
        title: "What if the system cannot confirm it immediately?",
        body: "Then you get manual review, not fake certainty.",
      },
      {
        title: "Do you ask for documents right away?",
        body: "Not on the first pass. We first check whether the case is worth taking further.",
      },
      {
        title: "Why does this feel different from typical claim sites?",
        body: "Because it behaves more like a utility with a local handoff model than a generic marketing template.",
      },
    ],
    casesTitle: "Which cases are cleanest for phase one",
    cases: [
      {
        label: "Supported now",
        title: "Delay over 3 hours",
        body: "The clearest phase one case for a preliminary check and further handling.",
      },
      {
        label: "Supported now",
        title: "Missed connection",
        body: "Especially when the full trip was on the same booking and the first segment broke the rest of the trip.",
      },
      {
        label: "Manual review",
        title: "Other edge cases",
        body: "Denied boarding, baggage issues and similar cases are not the focus of the first flow.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faq: [
      {
        title: "Do you know immediately that I am eligible?",
        body: "No. If the signal is not clear enough, the case goes to manual review.",
      },
      {
        title: "Why do you only ask for the minimum?",
        body: "Because the goal is to move the case quickly, not to push the passenger into paperwork immediately.",
      },
      {
        title: "What happens after I submit?",
        body: "The claim enters an internal queue and receives a next step instead of disappearing into an inbox.",
      },
      {
        title: "How much could it be worth?",
        body: "In typical EU 261 scenarios the signal is most often in the €250–€600 range per passenger, but the first pass is not a final promise.",
      },
    ],
    compareTitle: "Compare the locked and broader design directions",
    compareBody:
      "If you want to decide on the final direction quickly later, there is a dedicated board with the A1/A2/A3 final variants and the wider explorations.",
    compareButton: "Open the design board",
    footerBody:
      "A Serbia-focused service for a clear first passenger-rights review and a sensible next step.",
    footerTerms: "Terms of use",
    footerPrivacy: "Privacy policy",
    footerSupport: "Contact",
  },
} as const;

export function LandingPage({ locale = "sr" }: { locale?: Locale }) {
  const t = copy[locale];
  const supportEmail = getSupportEmail();
  const blogHref = locale === "en" ? "/blog" : "/blog";

  return (
    <main className="lk-page">
      <div className="lk-shell">
        <nav className="lk-nav">
          <Link href={locale === "en" ? "/en" : "/"} className="lk-brand">
            LET<span>KASNI</span>
          </Link>

          <div className="lk-nav-links">
            <a href="#kako-radi">{t.navHow}</a>
            <a href="#slucajevi">{t.navCases}</a>
            <a href="#faq">{t.navFaq}</a>
            <Link href="/design/compare">{t.navCompare}</Link>
            <Link href={blogHref}>{locale === "en" ? "Blog" : "Blog"}</Link>
          </div>

          <a href="#provera" className="lk-nav-cta">
            {t.navCta}
          </a>
        </nav>

        <section className="lk-hero">
          <div className="lk-panel lk-hero-copy">
            <div className="lk-eyebrow">{t.badge}</div>
            <h1 className="lk-title">{t.title}</h1>
            <p className="lk-lead">{t.body}</p>

            <div className="lk-proof-row">
              {t.chips.map((chip) => (
                <div key={chip} className="lk-chip">
                  {chip}
                </div>
              ))}
            </div>

            <div className="lk-evidence-strip">
              {t.evidence.map((item) => (
                <div key={item.label} className="lk-evidence-box">
                  <div className="lk-evidence-label">{item.label}</div>
                  <div className="lk-evidence-value">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="lk-hero-actions">
              <a className="lk-primary" href="#provera">
                {t.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a className="lk-secondary" href="#kako-radi">
                {t.secondaryCta}
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lk-panel lk-form-panel" id="provera">
            <ClaimIntakeForm locale={locale} />
          </div>
        </section>

        <div className="lk-sections">
          <section className="lk-section-grid" id="kako-radi">
            <div className="lk-card">
              <h2 className="lk-card-title">{t.timelineTitle}</h2>
              <div className="lk-timeline">
                {t.timeline.map((step, index) => (
                  <div key={step.title} className="lk-timeline-item">
                    <div className="lk-num">{index + 1}</div>
                    <div>
                      <strong>{step.title}</strong>
                      <span>{step.body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lk-card">
              <h2 className="lk-card-title">{t.questionsTitle}</h2>
              <div className="lk-faq">
                {t.questions.map((item) => (
                  <div key={item.title} className="lk-faq-item">
                    <strong>{item.title}</strong>
                    <span>{item.body}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="lk-cases" id="slucajevi">
            <div className="lk-cases-head">
              <h2 className="lk-card-title">{t.casesTitle}</h2>
            </div>
            <div className="lk-supported-grid">
              {t.cases.map((item) => (
                <div key={item.title} className="lk-support-card">
                  <div className="lk-support-tag">{item.label}</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="lk-section-grid">
            <div className="lk-card">
              <h2 className="lk-card-title">{t.faqTitle}</h2>
              <div className="lk-faq" id="faq">
                {t.faq.map((item) => (
                  <div key={item.title} className="lk-faq-item">
                    <strong>{item.title}</strong>
                    <span>{item.body}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lk-card lk-compare-card">
              <h2 className="lk-card-title">{t.compareTitle}</h2>
              <p className="lk-muted-copy">{t.compareBody}</p>
              <div className="lk-compare-points">
                <div className="lk-compare-point">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary" />
                  <span>A1 conversion final</span>
                </div>
                <div className="lk-compare-point">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary" />
                  <span>A2 proof-first final</span>
                </div>
                <div className="lk-compare-point">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary" />
                  <span>A3 guided-first final</span>
                </div>
                <div className="lk-compare-point">
                  <CheckCircle2 className="h-5 w-5 text-brand-primary" />
                  <span>Utility, editorial i ops-first explorations</span>
                </div>
              </div>
              <Link href="/design/compare" className="lk-primary lk-primary-inline">
                {t.compareButton}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          <section className="lk-cta-band">
            <div>
              <h2>{t.primaryCta}</h2>
              <p>
                {locale === "en"
                  ? "The first pass is fast, conservative and built to move the case into a real next step."
                  : "Prvi prolaz je brz, konzervativan i napravljen da slučaj prebaci u pravi sledeći korak."}
              </p>
            </div>
            <a href="#provera">
              {locale === "en" ? "Start now" : "Pošalji sada"}
            </a>
          </section>
        </div>

        <footer className="lk-footer">
          <div>
            <div className="lk-brand lk-brand-footer">
              LET<span>KASNI</span>
            </div>
            <p>{t.footerBody}</p>
          </div>
          <div className="lk-footer-links">
            <Link href="/terms">{t.footerTerms}</Link>
            <Link href="/privacy">{t.footerPrivacy}</Link>
            <a href={`mailto:${supportEmail}`}>{t.footerSupport}: {supportEmail}</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
