import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Plane,
  Scale,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { ClaimIntakeForm } from "@/components/claim-intake-form";
import { getSupportEmail } from "@/lib/env";

type Locale = "sr" | "en";

const copy = {
  sr: {
    navHow: "Kako radi",
    navBenefits: "Prednosti",
    navFaq: "FAQ",
    navBlog: "Blog",
    badge: "Prvi srpski servis za naplatu avio-odštete",
    heroTitleA: "Vaš let je",
    heroTitleB: "kasnio?",
    heroAccent: "Naplatite do 600€",
    heroTitleC: "odštete.",
    heroBody:
      "Proverite da li vaš let ispunjava uslove prema EU 261 pravilima za putnike iz Srbije. Unosite osnovne podatke, a odgovor dobijate bez komplikacije.",
    heroChecks: ["EU 261 regulativa", "Bez troškova unapred"],
    heroStats: [
      { value: "do 600€", label: "po putniku" },
      { value: "< 60s", label: "za prvu proveru" },
      { value: "24h", label: "za sledeći odgovor" },
    ],
    floatCardA: "Osnova za proveru slučaja",
    floatCardBTitle: "Prvi pregled bez papirologije",
    floatCardBBody: "Jasan sledeći korak ako slučaj deluje održivo.",
    howTitle: "Tri koraka do vaše odštete",
    howBody:
      "Zaboravite na birokratiju. Prvi prolaz kroz slučaj mora da bude brz, čitljiv i bez pravljenja lažne sigurnosti.",
    steps: [
      {
        title: "Unesete podatke",
        body: "Broj leta i datum su dovoljni za prvi pregled. Ne krećete kroz formular koji deluje kao pravna prijava.",
      },
      {
        title: "Proveravamo osnov",
        body: "Gledamo rutu, vrstu poremećaja i regulatorni okvir da bismo procenili da li slučaj uopšte deluje vredno daljih koraka.",
      },
      {
        title: "Dobijate sledeći korak",
        body: "Ako slučaj deluje obećavajuće, dobijate jasan odgovor šta dalje treba pripremiti i da li ima smisla nastaviti proceduru.",
      },
    ],
    valueTitleA: "Zašto putnici koriste",
    valueTitleB: "letkasni.rs",
    valueBody:
      "Zato što prvi korak mora da bude brz i jasan. Ne obećavamo previše. Prvo proveravamo da li slučaj zaista ima osnova.",
    valueHeroTitle: "Jasan pregled slučaja pre daljih koraka",
    valueHeroBody:
      "Ne krećete naslepo. Prvo dobijate procenu da li let, kašnjenje i okolnosti uopšte daju smislen osnov za naknadu i šta je sledeći korak.",
    valueChecks: ["Konzervativan preliminarni signal", "Jasan sledeći korak"],
    valueCards: [
      {
        title: "Ne gubite vreme na nagađanje",
        eyebrow: "Brza prva procena",
        body: "Prvi odgovor treba da vam kaže da li slučaj deluje ozbiljno, a ne da vas zatrpa pravnim frazama.",
      },
      {
        title: "Jasan signal pre daljih koraka",
        eyebrow: "Manje magle",
        body: "Pre nego što skupljate dokumentaciju i pišete airline-u, dobijate realniji osećaj da li slučaj uopšte ima osnov.",
      },
    ],
    faqTitle: "Česta pitanja",
    faqBody: "Sve što treba da znate pre nego što pošaljete slučaj.",
    faq: [
      {
        q: "Koliko mogu da dobijem?",
        a: "Iznos obično zavisi od dužine leta i regulatornog okvira, najčešće između 250€ i 600€ po putniku.",
      },
      {
        q: "Da li ovo važi za Srbiju?",
        a: "Može da važi kroz ECAA okvir i zavisi od rute, prevoznika i konkretnih okolnosti poremećaja leta.",
      },
      {
        q: "Da li garantujete odštetu?",
        a: "Ne. Prvi korak je procena da li slučaj deluje održivo. Garancije unapred nisu ozbiljan signal.",
      },
      {
        q: "Šta ako je razlog bio vreme ili ATC štrajk?",
        a: "Takve okolnosti često menjaju osnov za naknadu. Zato je prvi odgovor procena, ne automatsko obećanje.",
      },
    ],
    ctaTitle: "Ne dozvolite da vaš novac ostane kod njih.",
    ctaBody:
      "Provera traje manje od minuta. Ništa ne gubite, a možete dobiti jasan odgovor da li slučaj ima smisla.",
    ctaButton: "Započni proveru sada",
    footerBody:
      "Prvi srpski servis fokusiran na početnu proveru prava putnika u avio-saobraćaju i smislen sledeći korak.",
    footerLinks: "Linkovi",
    footerLegal: "Pravne informacije",
    footerTerms: "Uslovi korišćenja",
    footerPrivacy: "Politika privatnosti",
  },
  en: {
    navHow: "How it works",
    navBenefits: "Benefits",
    navFaq: "FAQ",
    navBlog: "Blog",
    badge: "Serbia-focused flight compensation service",
    heroTitleA: "Was your flight",
    heroTitleB: "delayed?",
    heroAccent: "Claim up to €600",
    heroTitleC: "in compensation.",
    heroBody:
      "Check whether your flight qualifies under EU 261 rules for passengers flying to or from Serbia. Enter the basics and get a clear next step without the usual friction.",
    heroChecks: ["EU 261 coverage", "No upfront cost"],
    heroStats: [
      { value: "up to €600", label: "per passenger" },
      { value: "< 60s", label: "for the first check" },
      { value: "24h", label: "for the next reply" },
    ],
    floatCardA: "Ground for first review",
    floatCardBTitle: "No paperwork in step one",
    floatCardBBody: "A clear next step if the case looks viable.",
    howTitle: "Three steps to your compensation",
    howBody:
      "Forget the bureaucracy. The first pass through the case should be fast, readable and honest about uncertainty.",
    steps: [
      {
        title: "Enter the basics",
        body: "Flight number and date are enough for a first review. You are not thrown into a legal-looking intake on step one.",
      },
      {
        title: "We check the basis",
        body: "We look at route, disruption type and regulatory scope to judge whether the case is even worth taking further.",
      },
      {
        title: "You get a next step",
        body: "If the case looks promising, you get a clear answer on what should be prepared next and whether it makes sense to continue.",
      },
    ],
    valueTitleA: "Why travelers use",
    valueTitleB: "letkasni.rs",
    valueBody:
      "Because the first step should be fast and clear. We do not overpromise. We first check whether the case actually has merit.",
    valueHeroTitle: "A clear case review before anything else",
    valueHeroBody:
      "You do not move blindly. First you get a view on whether the flight, delay and surrounding facts create a meaningful basis for compensation and what the next step should be.",
    valueChecks: ["Conservative initial signal", "Clear next step"],
    valueCards: [
      {
        title: "Do not waste time guessing",
        eyebrow: "Fast first review",
        body: "The first answer should tell you whether the case looks serious, not bury you in legal phrases.",
      },
      {
        title: "A clearer signal before more work",
        eyebrow: "Less fog",
        body: "Before you collect documents and write to the airline, you get a better sense of whether the case has a real basis at all.",
      },
    ],
    faqTitle: "Frequently asked questions",
    faqBody: "What you should know before you send the case.",
    faq: [
      {
        q: "How much could I recover?",
        a: "The amount usually depends on flight distance and the regulatory framework, most often between €250 and €600 per passenger.",
      },
      {
        q: "Does this apply to Serbia?",
        a: "It can, through the ECAA framework, depending on the route, the carrier and the specific facts of the disruption.",
      },
      {
        q: "Do you guarantee compensation?",
        a: "No. The first step is an assessment of whether the case looks viable. Guarantees upfront are not a serious signal.",
      },
      {
        q: "What if the disruption was weather or an ATC strike?",
        a: "Those circumstances often change eligibility. That is why the first response is an assessment, not an automatic promise.",
      },
    ],
    ctaTitle: "Do not leave your money with the airline.",
    ctaBody:
      "The first check takes less than a minute. You lose nothing, and you may get a clear answer on whether the case is worth pursuing.",
    ctaButton: "Start the check now",
    footerBody:
      "A Serbia-focused service built to give passengers a clear first review and a sensible next step.",
    footerLinks: "Links",
    footerLegal: "Legal",
    footerTerms: "Terms of use",
    footerPrivacy: "Privacy policy",
  },
} as const;

function StepIcon({ index }: { index: number }) {
  if (index === 0) {
    return <Zap className="h-7 w-7 text-brand-accent" />;
  }
  if (index === 1) {
    return <Scale className="h-7 w-7 text-brand-primary" />;
  }
  return <Banknote className="h-7 w-7 text-[var(--accent-success)]" />;
}

export function LandingPage({ locale = "sr" }: { locale?: Locale }) {
  const t = copy[locale];
  const supportEmail = getSupportEmail();
  const blogHref = "/blog";

  return (
    <main className="min-h-screen bg-brand-canvas font-sans text-brand-text selection:bg-brand-primary/10 selection:text-brand-primary">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-brand-primary/6 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] h-[30%] w-[30%] rounded-full bg-brand-accent/6 blur-[100px]" />
      </div>

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-brand-border/60 bg-brand-surface/85 py-4 shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
          <Link href={locale === "en" ? "/en" : "/"} className="flex items-center gap-2">
            <div className="rounded-lg bg-brand-primary p-1.5 shadow-lg shadow-brand-primary/15">
              <Plane className="h-6 w-6 -rotate-12 text-white" />
            </div>
            <span className="font-display text-2xl font-extrabold tracking-tight text-brand-primary">
              letkasni<span className="text-brand-accent">.rs</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#kako-radi" className="text-sm font-medium text-brand-text transition-colors hover:text-brand-primary">
              {t.navHow}
            </a>
            <a href="#prednosti" className="text-sm font-medium text-brand-text transition-colors hover:text-brand-primary">
              {t.navBenefits}
            </a>
            <a href="#faq" className="text-sm font-medium text-brand-text transition-colors hover:text-brand-primary">
              {t.navFaq}
            </a>
            <Link href={blogHref} className="text-sm font-medium text-brand-text transition-colors hover:text-brand-primary">
              {t.navBlog}
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface-alt px-2 py-1">
              <Link
                href="/"
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
                  locale === "sr"
                    ? "bg-brand-primary text-white"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                SR
              </Link>
              <Link
                href="/en"
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
                  locale === "en"
                    ? "bg-brand-primary text-white"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                EN
              </Link>
            </div>
            <a
              href="#claim-form"
              className="rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-primary/20 transition-all hover:bg-brand-secondary"
            >
              {locale === "en" ? "Check flight" : "Proveri let"}
            </a>
          </div>
        </div>
      </nav>

      <section className="bg-mesh relative overflow-hidden pb-20 pt-32 md:pb-40 md:pt-48">
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-brand-accent/25 bg-gradient-to-r from-brand-accent/18 to-brand-accent/6 px-4 py-2 shadow-sm shadow-brand-accent/10">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-accent shadow-[0_0_18px_rgba(245,130,42,0.65)]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
                  {t.badge}
                </span>
              </div>

              <h1 className="font-display mb-6 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-brand-text md:text-7xl">
                {t.heroTitleA}
                <br />
                {t.heroTitleB}
                <br />
                <span className="text-brand-primary">{t.heroAccent}</span>{" "}
                {t.heroTitleC}
              </h1>

              <p className="mb-5 max-w-xl text-xl leading-relaxed text-brand-muted">
                {t.heroBody}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-medium text-brand-muted">
                {t.heroChecks.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[var(--accent-success)]" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {t.heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.75rem] border border-brand-border/80 bg-white/78 px-5 py-4 shadow-[0_16px_40px_rgba(45,78,207,0.08)] backdrop-blur-sm"
                  >
                    <div className="font-mono-ui text-[11px] uppercase tracking-[0.2em] text-brand-primary/65">
                      {stat.label}
                    </div>
                    <div className="font-display mt-2 text-2xl font-extrabold text-brand-text">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-brand-primary/10 blur-3xl" />
              <div className="absolute -left-6 top-8 hidden w-40 rounded-[1.75rem] border border-white/60 bg-white/88 p-4 shadow-[0_20px_40px_rgba(31,41,55,0.12)] backdrop-blur-md lg:block">
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-brand-primary/70">
                  EU 261
                </div>
                <div className="mt-2 text-sm font-semibold leading-snug text-brand-text">
                  {t.floatCardA}
                </div>
              </div>

              <div className="absolute -bottom-6 right-6 hidden w-52 rounded-[1.75rem] border border-brand-border/80 bg-brand-surface px-5 py-4 shadow-[0_24px_50px_rgba(45,78,207,0.12)] lg:block">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-text">
                  <ShieldCheck className="h-4 w-4 text-brand-primary" />
                  {t.floatCardBTitle}
                </div>
                <p className="text-sm leading-relaxed text-brand-muted">
                  {t.floatCardBBody}
                </p>
              </div>

              <ClaimIntakeForm locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <section id="kako-radi" className="section-dark relative overflow-hidden py-32 text-white">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-20">
          <div className="absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-brand-primary/20 blur-[120px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <h2 className="font-display mb-6 text-4xl font-black tracking-tight md:text-5xl">
              {t.howTitle}
            </h2>
            <p className="text-lg text-white/68">{t.howBody}</p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {t.steps.map((step, index) => (
              <div key={step.title} className="relative group">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/18 bg-white shadow-[0_14px_32px_rgba(15,23,42,0.22)] transition-colors">
                  <StepIcon index={index} />
                </div>
                <h3 className="font-display mb-4 flex items-center gap-4 text-2xl font-bold">
                  <span className="text-brand-accent drop-shadow-[0_4px_18px_rgba(245,130,42,0.25)] text-4xl font-black">
                    0{index + 1}
                  </span>
                  {step.title}
                </h3>
                <p className="text-lg leading-relaxed text-white/78">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prednosti" className="bg-brand-surface relative overflow-hidden py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <h2 className="font-display mb-6 text-4xl font-black tracking-tight text-brand-text md:text-5xl">
              {t.valueTitleA}{" "}
              <span className="text-brand-primary underline decoration-brand-accent/30 underline-offset-8">
                {t.valueTitleB}
              </span>
            </h2>
            <p className="text-lg text-brand-muted">{t.valueBody}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div
              className="group relative overflow-hidden rounded-[2.5rem] p-10 text-white shadow-2xl shadow-brand-primary/20 lg:col-span-2 md:p-12"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
              }}
            >
              <div className="absolute -mr-20 -mt-20 right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-colors group-hover:bg-white/20" />
              <div className="relative z-10 h-full">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-display mb-4 text-3xl font-bold">
                  {t.valueHeroTitle}
                </h3>
                <p className="max-w-xl text-lg leading-relaxed text-white/80">
                  {t.valueHeroBody}
                </p>
                <div className="mt-12 flex flex-wrap items-center gap-6 text-sm font-medium text-white/75">
                  {t.valueChecks.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-brand-accent" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {t.valueCards.map((card, index) => (
                <div
                  key={card.title}
                  className="group relative overflow-hidden rounded-[2.5rem] p-10 surface-card"
                >
                  <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-brand-accent/10 transition-transform group-hover:scale-110" />
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/14 transition-transform group-hover:rotate-12">
                      {index === 0 ? (
                        <Clock3 className="h-7 w-7 text-brand-accent" />
                      ) : (
                        <Scale className="h-7 w-7 text-[var(--accent-success)]" />
                      )}
                    </div>
                    <div className="font-mono-ui mb-3 text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                      {card.eyebrow}
                    </div>
                    <h4 className="font-display mb-3 text-xl font-bold text-brand-text">
                      {card.title}
                    </h4>
                    <p className="leading-relaxed text-brand-muted">
                      {card.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-brand-border bg-brand-canvas py-32">
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold text-brand-text md:text-4xl">
              {t.faqTitle}
            </h2>
            <p className="text-brand-muted">{t.faqBody}</p>
          </div>

          <div className="space-y-4">
            {t.faq.map((item) => (
              <details
                key={item.q}
                className="group overflow-hidden rounded-2xl surface-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 text-lg font-bold text-brand-text">
                  {item.q}
                  <ChevronRight className="h-5 w-5 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-6 pb-6 leading-relaxed text-brand-muted">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div
            className="relative overflow-hidden rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-brand-primary/20 md:p-20"
            style={{
              background:
                "linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)",
            }}
          >
            <div className="absolute right-0 top-0 h-36 w-36 rounded-bl-[3rem] bg-brand-accent opacity-35" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="font-display mb-8 text-4xl font-extrabold md:text-6xl">
                {t.ctaTitle}
              </h2>
              <p className="mb-12 text-xl text-white/80">{t.ctaBody}</p>
              <a
                href="#claim-form"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-10 py-5 text-xl font-bold text-brand-primary shadow-xl shadow-black/10 transition-all hover:bg-white/92"
              >
                {t.ctaButton}
                <ArrowRight className="h-5 w-5 text-brand-accent" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="section-dark py-20 text-[#b9c2ca]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 grid gap-12 md:grid-cols-4">
            <div className="col-span-2">
              <div className="mb-6 flex items-center gap-2">
                <div className="rounded-lg bg-brand-primary p-1.5">
                  <Plane className="h-5 w-5 -rotate-12 text-white" />
                </div>
                <span className="font-display text-2xl font-extrabold tracking-tight text-white">
                  letkasni<span className="text-brand-accent">.rs</span>
                </span>
              </div>
              <p className="mb-8 max-w-sm">{t.footerBody}</p>
            </div>

            <div>
              <h4 className="mb-6 font-bold text-white">{t.footerLinks}</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#kako-radi" className="transition-colors hover:text-white">
                    {t.navHow}
                  </a>
                </li>
                <li>
                  <a href="#prednosti" className="transition-colors hover:text-white">
                    {t.navBenefits}
                  </a>
                </li>
                <li>
                  <Link href={blogHref} className="transition-colors hover:text-white">
                    {t.navBlog}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-bold text-white">{t.footerLegal}</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/terms" className="transition-colors hover:text-white">
                    {t.footerTerms}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-white">
                    {t.footerPrivacy}
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${supportEmail}`}
                    className="transition-colors hover:text-white"
                  >
                    {supportEmail}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
