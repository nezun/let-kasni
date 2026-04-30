"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  ChevronRight,
  MessageSquareQuote,
  Menu,
  Scale,
  ShieldCheck,
  X,
} from "lucide-react";

import { ClaimModal } from "@/components/claim-modal";
import { BrandLogo } from "@/components/brand-logo";
import { trackEvent } from "@/lib/analytics";
import { getSupportEmail } from "@/lib/env";
import type { IssueType } from "@/lib/types";

type Locale = "sr" | "en";
type LandingVariant = "default" | "hero-compact";
type LogoBalance = "default" | "optical" | "compact" | "badge";
type HeaderLayout = "live-flags" | "split-flags";
type TestimonialsVariant = "none" | "a" | "b" | "c";
type FormFieldTone = "default" | "soft" | "muted" | "quiet";
type VerticalSpacing = "default" | "compact";

const copy = {
  sr: {
    localeSwitchFlag: "🇬🇧",
    localeSwitchLabel: "EN",
    localeSwitchAria: "English version",
    localeHref: "/en",
    navHow: "Kako radi",
    navBenefits: "Prednosti",
    navFaq: "Česta pitanja",
    navBlog: "Blog",
    navCta: "Proveri let",
    heroLine1: "Vaš let je",
    heroLine2: "kasnio?",
    heroLine3: "Naplatite",
    heroLine4: "do 600€.",
    heroBody:
      "Kao prvi domaći servis, pomažemo putnicima u Srbiji da naplate ono što im zakonski pripada — bez stresa i bez troškova unapred.",
    proofA: "Bez troškova unapred",
    proofB: "Samo 10% provizije",
    proofC: "94% uspešnost",
    cardEyebrow: "Proveri odštetu odmah",
    cardTitle: "Koliko ti duguje avio-prevoznik?",
    flightNumber: "Broj leta",
    flightNumberPlaceholder: "npr. JU 221",
    flightDate: "Datum leta",
    issueType: "Vrsta problema",
    heroButton: "Proveri besplatno",
    heroNote: "Provera traje manje od 60 sekundi.",
    routeHint: "Kompletnu rutu tražimo u sledećem koraku.",
    airlineStripLabel: "Radimo sa:",
    airlineGridEyebrow: "Naplaćujemo od svih većih",
    airlineGridTitle: "Vodeće avio-kompanije na našoj listi",
    airlineMore: "+ 40 drugih kompanija iz EU i regiona",
    active: "Aktivno",
    howEyebrow: "Kako radi",
    howTitleA: "Tri koraka do",
    howTitleB: "vaše odštete",
    howBody: "Zaboravite na birokratiju. Proces smo sveli na minimum.",
    steps: [
      {
        title: "Unesite podatke",
        body: "Broj leta, datum i osnovni problem. Dovoljno za prvi signal.",
      },
      {
        title: "Pravna provera",
        body: "Sistem i operativni tim proveravaju da li slučaj deluje naplativo.",
      },
      {
        title: "Isplata novca",
        body: "Ako je slučaj dobar, vodimo proces naplate do isplate na vaš račun.",
      },
    ],
    benefitsEyebrow: "Lokalna ekspertiza",
    benefitsTitle: "Prvi i jedini srpski provajder",
    benefitsBody:
      "Naš lokalni pravni tim vodi slučaj efikasno i razumljivo, tako da vi ne jurite avio-kompaniju po stranim formularima.",
    featureRiskTitle: "Bez troškova unapred",
    featureRiskBody:
      "Proviziju uzimamo samo ako naplatimo. Mi preuzimamo operativni i pravni teret.",
    featureFeeTitle: "Samo 10% provizije",
    featureFeeBody:
      "Najdirektniji model na tržištu: jasna provizija, bez skrivenih troškova.",
    featureLocalTitle: "Lokalni pravni tim",
    featureLocalBody:
      "Srpski pravnici koji poznaju lokalni kontekst i razumeju vaš problem.",
    statSuccess: "Uspešnost slučajeva",
    statUpfront: "Troškovi unapred",
    statFee: "Provizija na uspeh",
    statMax: "Maksimalna naknada",
    faqEyebrow: "Česta pitanja",
    faqTitle: "Sve što treba da znate",
    faqs: [
      {
        q: "Koliko novca mogu da dobijem?",
        a: "Tipični EU 261 slučajevi su najčešće u rasponu od 250€ do 600€ po putniku, u zavisnosti od dužine leta i okolnosti.",
      },
      {
        q: "Šta mi je potrebno od dokumenata?",
        a: "Za prvi korak dovoljno je da unesete broj leta, datum i osnovni opis problema. Dodatna dokumenta tražimo tek kada slučaj ima smisla.",
      },
      {
        q: "Šta ako je avio-kompanija rekla da nema osnova?",
        a: "To nije konačan odgovor. Kompanije često odbijaju zahteve generički, pa radimo sopstvenu proveru pre konačne odluke.",
      },
      {
        q: "Kada plaćam uslugu?",
        a: "Ne plaćate unapred. Naknada se obračunava tek ako slučaj uspe.",
      },
      {
        q: "Koliko traje naplata odštete?",
        a: "Zavisi od avio-kompanije. Jednostavniji predmeti mogu biti zatvoreni relativno brzo, dok sporiji zahtevi traže više vremena.",
      },
      {
        q: "Da li mogu da tražim odštetu i ako je let bio pre nekoliko godina?",
        a: "U mnogim slučajevima da. Rokovi zastarelosti zavise od države i vrste leta.",
      },
    ],
    ctaTitleA: "Ne dozvolite da vaš novac",
    ctaTitleB: "ostane avio-kompaniji.",
    ctaBody:
      "Započnite proveru odmah. Za prvi prolaz su vam potrebna samo dva minuta.",
    ctaButton: "Proveri moj let besplatno",
    footerBody:
      "Specijalizovani servis za zaštitu prava putnika u avio-saobraćaju i naplatu zakonom propisane odštete.",
    footerLinks: "Linkovi",
    footerLegal: "Pravne informacije",
    terms: "Uslovi korišćenja",
    privacy: "Politika privatnosti",
    support: "Kontakt",
    copyright: "© 2026 letkasni.rs. Sva prava zadržana.",
  },
  en: {
    localeSwitchFlag: "🇷🇸",
    localeSwitchLabel: "SR",
    localeSwitchAria: "Srpska verzija",
    localeHref: "/",
    navHow: "How it works",
    navBenefits: "Benefits",
    navFaq: "FAQ",
    navBlog: "Blog",
    navCta: "Check flight",
    heroLine1: "Was your flight",
    heroLine2: "delayed?",
    heroLine3: "Claim up to",
    heroLine4: "€600.",
    heroBody:
      "We help passengers connected to Serbia recover compensation they may be owed — with a clear local process, no maze, and no upfront cost.",
    proofA: "No upfront fee",
    proofB: "Only 10% fee",
    proofC: "94% success rate",
    cardEyebrow: "Check compensation now",
    cardTitle: "How much could your airline owe you?",
    flightNumber: "Flight number",
    flightNumberPlaceholder: "e.g. JU 221",
    flightDate: "Flight date",
    issueType: "Issue type",
    heroButton: "Check for free",
    heroNote: "The first check takes less than 60 seconds.",
    routeHint: "We collect the full route in the next step.",
    airlineStripLabel: "We work with:",
    airlineGridEyebrow: "Claims across major carriers",
    airlineGridTitle: "Leading airlines on our review list",
    airlineMore: "+ 40 other carriers across the EU and the region",
    active: "Active",
    howEyebrow: "How it works",
    howTitleA: "Three steps to",
    howTitleB: "your compensation",
    howBody: "Forget the paperwork maze. We reduced the process to the minimum.",
    steps: [
      {
        title: "Enter the details",
        body: "Flight number, date and issue. Enough for the first signal.",
      },
      {
        title: "Legal review",
        body: "The system and operations team check whether the case looks viable.",
      },
      {
        title: "Payout",
        body: "If the case is good, we drive the recovery through to payout.",
      },
    ],
    benefitsEyebrow: "Local expertise",
    benefitsTitle: "The first Serbian provider",
    benefitsBody:
      "Our local legal team handles the case clearly and efficiently, so you do not have to chase airlines through generic foreign forms.",
    featureRiskTitle: "No upfront costs",
    featureRiskBody:
      "We only take a fee if we recover compensation. We carry the operational and legal burden.",
    featureFeeTitle: "Only 10% fee",
    featureFeeBody:
      "A direct fee model with no hidden costs and no upfront payment.",
    featureLocalTitle: "Local legal team",
    featureLocalBody:
      "Serbian legal operators who understand the local context and your case.",
    statSuccess: "Case success rate",
    statUpfront: "Upfront cost",
    statFee: "Success fee",
    statMax: "Maximum compensation",
    faqEyebrow: "FAQ",
    faqTitle: "Everything you should know",
    faqs: [
      {
        q: "How much could I recover?",
        a: "Typical EU 261 cases most often fall in the €250 to €600 range per passenger depending on route length and disruption details.",
      },
      {
        q: "Which documents do I need?",
        a: "For the first step, flight number, date and a short problem description are enough. We ask for extra documents only when the case is worth pushing.",
      },
      {
        q: "What if the airline already rejected me?",
        a: "That is not final. Airlines often reject with generic answers, so we run our own review before deciding.",
      },
      {
        q: "When do I pay?",
        a: "There is no upfront payment. The fee is charged only if the case succeeds.",
      },
      {
        q: "How long does a compensation claim take?",
        a: "That depends on the airline. Simpler cases can move relatively quickly, while slower ones need more time.",
      },
      {
        q: "Can I still claim for an older flight?",
        a: "Often yes. Limitation periods depend on the country and route, so older flights can still be worth checking.",
      },
    ],
    ctaTitleA: "Do not leave your money",
    ctaTitleB: "with the airline.",
    ctaBody: "Start the check now. The first pass takes only two minutes.",
    ctaButton: "Check my flight for free",
    footerBody:
      "A focused service for passenger-rights claims and compensation recovery support connected to Serbia.",
    footerLinks: "Links",
    footerLegal: "Legal",
    terms: "Terms of use",
    privacy: "Privacy policy",
    support: "Contact",
    copyright: "© 2026 letkasni.rs. All rights reserved.",
  },
} as const;

const heroIssueOptions = {
  sr: [
    { value: "delay_3h_plus", label: "Let je kasnio 3h+" },
    { value: "missed_connection_same_booking", label: "Propuštena konekcija" },
    { value: "denied_boarding", label: "Odbijen ukrcaj" },
    { value: "other", label: "Drugi problem" },
  ],
  en: [
    { value: "delay_3h_plus", label: "Flight delayed 3h+" },
    { value: "missed_connection_same_booking", label: "Missed connection" },
    { value: "denied_boarding", label: "Denied boarding" },
    { value: "other", label: "Other issue" },
  ],
} as const satisfies Record<Locale, Array<{ value: IssueType; label: string }>>;

const airlines = [
  { code: "JU", name: "Air Serbia" },
  { code: "W6", name: "Wizz Air" },
  { code: "FR", name: "Ryanair" },
  { code: "LH", name: "Lufthansa" },
  { code: "TK", name: "Turkish" },
];

const formFieldClasses = {
  default: {
    flight:
      "font-mono-ui w-full rounded-[10px] border border-[#DCE4EF] bg-[#FBFDFF] px-[14px] py-3 text-[17px] tracking-[0.04em] text-[#334155] placeholder:text-[#9CA8BA] outline-none transition focus:border-[#9EC5FE] focus:bg-white focus:shadow-[0_0_0_3px_rgba(36,112,235,0.08)]",
    date:
      "w-full rounded-[10px] border border-[#DCE4EF] bg-[#FBFDFF] px-[14px] py-3 text-base text-[#334155] outline-none transition focus:border-[#9EC5FE] focus:bg-white focus:shadow-[0_0_0_3px_rgba(36,112,235,0.08)]",
  },
  soft: {
    flight:
      "font-mono-ui w-full rounded-[10px] border border-[#E1E7F0] bg-[#FCFDFF] px-[14px] py-[11px] text-[15px] tracking-[0.02em] text-[#667085] placeholder:text-[#B9C2D0] outline-none transition focus:border-[#B8D5FF] focus:bg-white focus:shadow-[0_0_0_3px_rgba(36,112,235,0.06)]",
    date:
      "w-full rounded-[10px] border border-[#E1E7F0] bg-[#FCFDFF] px-[14px] py-[11px] text-[15px] text-[#667085] outline-none transition focus:border-[#B8D5FF] focus:bg-white focus:shadow-[0_0_0_3px_rgba(36,112,235,0.06)]",
  },
  muted: {
    flight:
      "font-mono-ui w-full rounded-[10px] border border-[#E5EAF2] bg-white px-[13px] py-[10px] text-[14px] tracking-[0.01em] text-[#7A8494] placeholder:text-[#C3CAD5] outline-none transition focus:border-[#C9DDFA] focus:bg-white focus:shadow-[0_0_0_3px_rgba(36,112,235,0.05)]",
    date:
      "w-full rounded-[10px] border border-[#E5EAF2] bg-white px-[13px] py-[10px] text-[14px] text-[#7A8494] outline-none transition focus:border-[#C9DDFA] focus:bg-white focus:shadow-[0_0_0_3px_rgba(36,112,235,0.05)]",
  },
  quiet: {
    flight:
      "font-mono-ui w-full rounded-[10px] border border-[#E8EDF4] bg-[#FEFEFF] px-3 py-[9px] text-[13px] tracking-normal text-[#8B94A3] placeholder:text-[#CED4DE] outline-none transition focus:border-[#D3E1F7] focus:bg-white focus:shadow-[0_0_0_2px_rgba(36,112,235,0.045)]",
    date:
      "w-full rounded-[10px] border border-[#E8EDF4] bg-[#FEFEFF] px-3 py-[9px] text-[13px] text-[#8B94A3] outline-none transition focus:border-[#D3E1F7] focus:bg-white focus:shadow-[0_0_0_2px_rgba(36,112,235,0.045)]",
  },
} as const;

const testimonialsCopy = {
  sr: {
    eyebrow: "Iskustva putnika",
    titleA: "Ljudi koji su proverili slučaj na vreme",
    titleB: "Kada je slučaj jasan, proces ne mora da bude težak",
    titleC: "Kratko, konkretno i bez praznih obećanja",
    caseExamples: "Primeri slučajeva",
    caseRange: "250-600 EUR",
    items: [
      {
        name: "Milos Nikolić",
        route: "Niš - Beč",
        amount: "250 EUR",
        quote:
          "Posle otkazanog leta nisam znao kome da pišem ni šta da tražim. Dobio sam jasan smer, predao dokumenta i nisam morao da jurim avio-kompaniju svaki drugi dan.",
      },
      {
        name: "Lazar Miučin",
        route: "Beograd - London",
        amount: "400 EUR",
        quote:
          "Najviše mi je značilo što su prvo realno proverili slučaj. Bez velikih obećanja, samo konkretno šta fali od dokaza i koji je sledeći korak.",
      },
      {
        name: "Nikola Marinković",
        route: "Beograd - Njujork",
        amount: "600 EUR",
        quote:
          "Konekcija mi je propala zbog kašnjenja prvog leta. Sve je bilo mnogo preglednije kada su mi objasnili da se gleda dolazak na krajnju destinaciju.",
      },
    ],
  },
  en: {
    eyebrow: "Passenger stories",
    titleA: "People who checked their case in time",
    titleB: "When the case is clear, the process does not have to be hard",
    titleC: "Short, specific and without empty promises",
    caseExamples: "Case examples",
    caseRange: "EUR 250-600",
    items: [
      {
        name: "Milos Nikolic",
        route: "Nis - Vienna",
        amount: "EUR 250",
        quote:
          "After my flight was cancelled, I did not know who to write to or what to ask for. I got clear direction, submitted the documents, and did not have to chase the airline every other day.",
      },
      {
        name: "Lazar Miucin",
        route: "Belgrade - London",
        amount: "EUR 400",
        quote:
          "What mattered most was that they checked the case realistically first. No big promises, just a concrete list of missing proof and the next step.",
      },
      {
        name: "Nikola Marinkovic",
        route: "Belgrade - New York",
        amount: "EUR 600",
        quote:
          "My connection failed because the first flight was delayed. It became much clearer once they explained that the arrival at the final destination is what matters.",
      },
    ],
  },
} as const;

function TestimonialsSection({
  locale,
  variant,
}: {
  locale: Locale;
  variant: Exclude<TestimonialsVariant, "none">;
}) {
  const testimonials = testimonialsCopy[locale];

  if (variant === "b") {
    return (
      <section className="border-y border-[#E2E6EF] bg-[#F8FAFC] px-6 py-[86px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#2470EB] text-white">
                <MessageSquareQuote className="h-5 w-5" />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2470EB]">
                {testimonials.eyebrow}
              </p>
              <h2 className="font-display mt-3 text-[38px] font-bold leading-[1.08] tracking-[-0.03em] text-[#0A0F1E]">
                {testimonials.titleB}
              </h2>
            </div>
            <div className="space-y-4">
              {testimonials.items.map((testimonial) => (
                <article
                  key={testimonial.name}
                  className="grid gap-5 rounded-2xl border border-[#E2E6EF] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:grid-cols-[190px_minmax(0,1fr)]"
                >
                  <div>
                    <h3 className="font-display text-[20px] font-bold tracking-[-0.02em] text-[#0A0F1E]">
                      {testimonial.name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-[#2470EB]">
                      {testimonial.route}
                    </p>
                    <p className="mt-3 inline-flex rounded-full bg-[#EEF5FF] px-3 py-1 text-xs font-bold text-[#0B2E6F]">
                      {testimonial.amount}
                    </p>
                  </div>
                  <p className="text-[16px] leading-[1.75] text-[#4F5B75]">
                    “{testimonial.quote}”
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "c") {
    return (
      <section className="bg-white px-6 py-[92px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2470EB]">
                {testimonials.eyebrow}
              </p>
              <h2 className="font-display mt-3 max-w-[680px] text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-[#0A0F1E]">
                {testimonials.titleC}
              </h2>
            </div>
            <div className="rounded-2xl bg-[#0B1326] px-5 py-4 text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/45">
                {testimonials.caseExamples}
              </p>
              <p className="font-display mt-1 text-[26px] font-bold leading-none">
                {testimonials.caseRange}
              </p>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {testimonials.items.map((testimonial, index) => (
              <article
                key={testimonial.name}
                className={`rounded-2xl border p-7 ${
                  index === 1
                    ? "border-[#2470EB] bg-[#0B1326] text-white shadow-[0_26px_70px_rgba(15,23,42,0.18)]"
                    : "border-[#E2E6EF] bg-[#F8FAFC] text-[#0A0F1E]"
                }`}
              >
                <p className={`text-[13px] leading-[1.75] ${index === 1 ? "text-white/72" : "text-[#4F5B75]"}`}>
                  “{testimonial.quote}”
                </p>
                <div className="mt-8 border-t border-current/10 pt-5">
                  <h3 className="font-display text-[19px] font-bold tracking-[-0.02em]">
                    {testimonial.name}
                  </h3>
                  <p className={`mt-2 text-sm font-semibold ${index === 1 ? "text-[#8BB8FF]" : "text-[#2470EB]"}`}>
                    {testimonial.route}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-6 pb-[84px] pt-[156px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-11 text-center">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2470EB]">
            {testimonials.eyebrow}
          </p>
          <h2 className="font-display text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-[#0A0F1E]">
            {testimonials.titleA}
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.items.map((testimonial) => (
            <article
              key={testimonial.name}
              className="rounded-2xl border border-[#E2E6EF] bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
            >
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-[20px] font-bold tracking-[-0.02em] text-[#0A0F1E]">
                    {testimonial.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-[#2470EB]">
                    {testimonial.route}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[#EEF5FF] px-3 py-1 text-xs font-bold text-[#0B2E6F]">
                  {testimonial.amount}
                </span>
              </div>
              <p className="text-[15px] leading-[1.75] text-[#4F5B75]">
                “{testimonial.quote}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingPage({
  locale = "sr",
  variant = "default",
  logoBalance = "compact",
  headerLayout = "live-flags",
  testimonialsVariant = "none",
  formFieldTone = "default",
  verticalSpacing = "default",
}: {
  locale?: Locale;
  variant?: LandingVariant;
  logoBalance?: LogoBalance;
  headerLayout?: HeaderLayout;
  testimonialsVariant?: TestimonialsVariant;
  formFieldTone?: FormFieldTone;
  verticalSpacing?: VerticalSpacing;
}) {
  const t = copy[locale];
  const fieldClasses = formFieldClasses[formFieldTone];
  const compactSpacing = verticalSpacing === "compact";
  const supportEmail = getSupportEmail();
  const compactHero = variant === "hero-compact";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroFlight, setHeroFlight] = useState("");
  const [heroDate, setHeroDate] = useState("");
  const [heroIssueType, setHeroIssueType] = useState<IssueType>("delay_3h_plus");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function openClaimModal(source: string) {
    trackEvent("begin_checkout", {
      event_category: "claim",
      event_label: source,
      form_locale: locale,
    });
    setIsClaimModalOpen(true);
  }

  return (
    <main
      lang={locale === "en" ? "en" : "sr"}
      className="min-h-screen bg-white text-[#0A0F1E] selection:bg-[#2470EB]/10 selection:text-[#2470EB]"
    >
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "border-b border-[#E2E6EF] bg-white/95 backdrop-blur-[12px]"
            : "bg-white"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
          <BrandLogo href={locale === "en" ? "/en" : "/"} balance={logoBalance} />

          {headerLayout === "live-flags" ? (
            <div className="hidden items-center gap-[2px] md:flex">
              <a
                href="#kako-radi"
                className="rounded-lg px-[14px] py-2 text-sm font-medium text-[#4F5B75] transition hover:bg-[#EEF5FF] hover:text-[#0B2E6F]"
              >
                {t.navHow}
              </a>
              <a
                href="#prednosti"
                className="rounded-lg px-[14px] py-2 text-sm font-medium text-[#4F5B75] transition hover:bg-[#EEF5FF] hover:text-[#0B2E6F]"
              >
                {t.navBenefits}
              </a>
              <a
                href="#faq"
                className="rounded-lg px-[14px] py-2 text-sm font-medium text-[#4F5B75] transition hover:bg-[#EEF5FF] hover:text-[#0B2E6F]"
              >
                {t.navFaq}
              </a>
              <Link
                href={locale === "en" ? "/en/blog" : "/blog"}
                className="rounded-lg px-[14px] py-2 text-sm font-medium text-[#4F5B75] transition hover:bg-[#EEF5FF] hover:text-[#0B2E6F]"
              >
                {t.navBlog}
              </Link>
              <div className="mx-[6px] h-[18px] w-px bg-[#E2E6EF]" />
              <Link
                href={t.localeHref}
                aria-label={t.localeSwitchAria}
                className="inline-flex items-center gap-1.5 rounded-lg px-[10px] py-2 text-[13px] font-semibold text-[#6B7585] transition hover:bg-[#F4F6FA] hover:text-[#0A0F1E]"
              >
                <span aria-hidden="true" className="text-base leading-none">
                  {t.localeSwitchFlag}
                </span>
                <span>{t.localeSwitchLabel}</span>
              </Link>
              <button
                onClick={() => openClaimModal("nav_cta")}
                className="ml-[6px] rounded-lg bg-[#2470EB] px-5 py-[9px] text-sm font-semibold text-white transition hover:bg-[#1A52C8]"
              >
                {t.navCta}
              </button>
            </div>
          ) : (
            <div className="ml-8 hidden min-w-0 flex-1 items-center justify-between gap-6 md:flex">
              <div className="flex items-center gap-[2px]">
                <a
                  href="#kako-radi"
                  className="rounded-lg px-[14px] py-2 text-sm font-medium text-[#4F5B75] transition hover:bg-[#EEF5FF] hover:text-[#0B2E6F]"
                >
                  {t.navHow}
                </a>
                <a
                  href="#prednosti"
                  className="rounded-lg px-[14px] py-2 text-sm font-medium text-[#4F5B75] transition hover:bg-[#EEF5FF] hover:text-[#0B2E6F]"
                >
                  {t.navBenefits}
                </a>
                <a
                  href="#faq"
                  className="rounded-lg px-[14px] py-2 text-sm font-medium text-[#4F5B75] transition hover:bg-[#EEF5FF] hover:text-[#0B2E6F]"
                >
                  {t.navFaq}
                </a>
                <Link
                  href={locale === "en" ? "/en/blog" : "/blog"}
                  className="rounded-lg px-[14px] py-2 text-sm font-medium text-[#4F5B75] transition hover:bg-[#EEF5FF] hover:text-[#0B2E6F]"
                >
                  {t.navBlog}
                </Link>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => openClaimModal("nav_cta")}
                  className="rounded-lg bg-[#2470EB] px-5 py-[9px] text-sm font-semibold text-white transition hover:bg-[#1A52C8]"
                >
                  {t.navCta}
                </button>
                <Link
                  href={t.localeHref}
                  aria-label={t.localeSwitchAria}
                  className="inline-flex items-center gap-1.5 rounded-lg px-[10px] py-2 text-[13px] font-semibold text-[#6B7585] transition hover:bg-[#F4F6FA] hover:text-[#0A0F1E]"
                >
                  <span aria-hidden="true" className="text-base leading-none">
                    {t.localeSwitchFlag}
                  </span>
                  <span>{t.localeSwitchLabel}</span>
                </Link>
              </div>
            </div>
          )}

          <button
            className="rounded-xl p-2 transition hover:bg-[#F4F6FA] md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-40 bg-white px-6 pb-8 pt-24 md:hidden">
          <div className="flex flex-col gap-3">
            <a
              href="#kako-radi"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-2xl border border-[#E2E6EF] px-5 py-4 text-base font-medium"
            >
              {t.navHow}
            </a>
            <a
              href="#prednosti"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-2xl border border-[#E2E6EF] px-5 py-4 text-base font-medium"
            >
              {t.navBenefits}
            </a>
            <a
              href="#faq"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-2xl border border-[#E2E6EF] px-5 py-4 text-base font-medium"
            >
              {t.navFaq}
            </a>
            <Link
              href={locale === "en" ? "/en/blog" : "/blog"}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-2xl border border-[#E2E6EF] px-5 py-4 text-base font-medium"
            >
              {t.navBlog}
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                openClaimModal("mobile_nav_cta");
              }}
              className="rounded-2xl bg-[#2470EB] px-5 py-4 text-base font-semibold text-white"
            >
              {t.navCta}
            </button>
            <Link
              href={t.localeHref}
              onClick={() => setIsMenuOpen(false)}
              aria-label={t.localeSwitchAria}
              className="inline-flex items-center gap-2 rounded-2xl border border-[#E2E6EF] px-5 py-4 text-base font-medium text-[#6B7585]"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                {t.localeSwitchFlag}
              </span>
              <span>{t.localeSwitchLabel}</span>
            </Link>
          </div>
        </div>
      ) : null}

      <section
        id="proveri-let"
        className="relative flex min-h-screen flex-col overflow-hidden bg-[#0B1326] pt-16 text-white"
      >
        <div
          className="pointer-events-none absolute -bottom-[260px] -left-[180px] h-[820px] w-[820px] rounded-full blur-[10px]"
          style={{
            background:
              "radial-gradient(circle, rgba(36,112,235,0.24) 0%, rgba(36,112,235,0.12) 32%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,11,24,0.26) 0%, rgba(5,11,24,0.08) 46%, rgba(5,11,24,0.16) 100%)",
          }}
        />

        <div className="relative mx-auto flex w-full max-w-[1160px] flex-1 items-center px-6 py-12 md:py-14">
          <div
            className={`grid w-full items-center gap-8 lg:gap-10 ${
              compactHero ? "xl:grid-cols-[minmax(0,1fr)_420px]" : "xl:grid-cols-[minmax(0,1fr)_440px]"
            }`}
          >
            <div className={compactHero ? "max-w-[35.5rem]" : "max-w-[37rem]"}>
              <h1 className="font-display mb-7 text-[3.55rem] font-bold leading-[1.01] text-white sm:text-[4.45rem] xl:text-[64px]">
                <span className="block">{t.heroLine1}</span>
                <span className="block">{t.heroLine2}</span>
                <span className="block text-[#2470EB]">{t.heroLine3}</span>
                <span className="block text-[#2470EB]">{t.heroLine4}</span>
              </h1>

              <p className="mb-9 max-w-[480px] text-[18px] leading-[1.7] text-white/62">
                {t.heroBody}
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {[t.proofA, t.proofB, t.proofC].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-[7px] text-sm font-medium text-white/70"
                  >
                    <CheckCircle2 className="h-[14px] w-[14px] text-[#2DB87A]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[20px] bg-white p-7 text-[#0A0F1E] shadow-[0_26px_88px_rgba(0,0,0,0.26)] sm:p-8">
              <div className="mb-5">
                <div className="mb-[6px] text-[11px] font-bold uppercase tracking-[0.08em] text-[#8E9BB0]">
                  {t.cardEyebrow}
                </div>
                <div className="font-display text-[20px] font-bold leading-[1.2] text-[#0A0F1E] sm:text-[21px]">
                  {t.cardTitle}
                </div>
              </div>

              <div className="mb-4 flex flex-col gap-3">
                <div>
                  <label className="mb-[5px] block text-[10px] font-bold uppercase tracking-[0.08em] text-[#8E9BB0]">
                    {t.flightNumber}
                  </label>
                  <input
                    type="text"
                    value={heroFlight}
                    onChange={(event) => setHeroFlight(event.target.value)}
                    placeholder={t.flightNumberPlaceholder}
                    className={fieldClasses.flight}
                  />
                </div>
                <div>
                  <label className="mb-[5px] block text-[10px] font-bold uppercase tracking-[0.08em] text-[#8E9BB0]">
                    {t.flightDate}
                  </label>
                  <input
                    type="date"
                    value={heroDate}
                    onChange={(event) => setHeroDate(event.target.value)}
                    className={fieldClasses.date}
                  />
                </div>
                <div>
                  <label className="mb-[5px] block text-[10px] font-bold uppercase tracking-[0.08em] text-[#8E9BB0]">
                    {t.issueType}
                  </label>
                  <select
                    value={heroIssueType}
                    onChange={(event) =>
                      setHeroIssueType(event.target.value as IssueType)
                    }
                    className="w-full appearance-none rounded-[10px] border border-[#DCE4EF] bg-[#FBFDFF] bg-[linear-gradient(45deg,transparent_50%,#8E9BB0_50%),linear-gradient(135deg,#8E9BB0_50%,transparent_50%)] bg-[position:calc(100%-18px)_52%,calc(100%-13px)_52%] bg-[size:5px_5px,5px_5px] bg-no-repeat px-[14px] py-3 pr-10 text-base text-[#334155] outline-none transition focus:border-[#9EC5FE] focus:bg-white focus:shadow-[0_0_0_3px_rgba(36,112,235,0.08)]"
                  >
                    {heroIssueOptions[locale].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => openClaimModal("hero_card_cta")}
                className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#2470EB] px-4 py-[15px] text-base font-bold text-white transition hover:brightness-95"
              >
                {t.heroButton}
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="mt-[14px] text-center text-xs leading-[1.5] text-[#B4BECF]">
                <p>{t.heroNote}</p>
                <p>{t.routeHint}</p>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section className="border-b border-[#E2E6EF] bg-white px-6 py-[72px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 text-center">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2470EB]">
              {t.airlineGridEyebrow}
            </div>
            <h2 className="font-display text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-[#0A0F1E]">
              {t.airlineGridTitle}
            </h2>
          </div>

          <div className="grid overflow-hidden rounded-2xl border border-[#E2E6EF] bg-white md:grid-cols-5">
            {airlines.map((airline, index) => (
              <div
                key={airline.code}
                className={`flex flex-col items-center gap-[10px] px-5 py-7 transition hover:bg-[#F4F6FA] ${
                  index < airlines.length - 1 ? "border-b border-[#E2E6EF] md:border-b-0 md:border-r" : ""
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-[#0B1326] font-display text-[17px] font-bold tracking-[0.02em] text-white">
                  {airline.code}
                </div>
                <div className="font-display text-[15px] font-bold tracking-[-0.01em] text-[#0A0F1E]">
                  {airline.name}
                </div>
                <div className="inline-flex items-center gap-[5px] text-[10px] font-bold uppercase tracking-[0.08em] text-[#2DB87A]">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#2DB87A]" />
                  {t.active}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 text-center text-[13px] text-[#8E9BB0]">
            {t.airlineMore}
          </div>
        </div>
      </section>

      <section id="kako-radi" className="bg-white px-6 py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-[60px] text-center">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[#2470EB]">
              {t.howEyebrow}
            </div>
            <h2 className="font-display text-[42px] font-bold leading-[1.1] tracking-[-0.025em] text-[#0A0F1E]">
              {t.howTitleA}
              <br />
              {t.howTitleB}
            </h2>
            <p className="mx-auto mt-4 max-w-[440px] text-[17px] leading-[1.65] text-[#6B7585]">
              {t.howBody}
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[20px] bg-[#F4F6FA] md:grid-cols-3 md:gap-[2px]">
            {t.steps.map((step, index) => (
              <div
                key={step.title}
                className={`bg-white px-7 py-8 ${
                  index < t.steps.length - 1 ? "border-b border-[#F4F6FA] md:border-b-0" : ""
                }`}
              >
                <div className="mb-4 flex items-center gap-2 font-display text-[13px] font-bold tracking-[0.08em] text-[#2470EB]">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2470EB] text-[12px] text-white">
                    {index + 1}
                  </div>
                  {locale === "en" ? `Step ${index + 1}` : `Korak ${index + 1}`}
                </div>
                <h3 className="font-display text-[19px] font-bold leading-[1.2] text-[#0A0F1E]">
                  {step.title}
                </h3>
                <p className="mt-[10px] text-sm leading-[1.65] text-[#6B7585]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="prednosti"
        className={`bg-[#F4F6FA] px-6 ${compactSpacing ? "pt-[76px]" : "pt-[72px]"}`}
      >
        <div className="mx-auto max-w-[1200px]">
          <div className={`mx-auto max-w-[680px] text-center ${compactSpacing ? "mb-10" : "mb-14"}`}>
            <div className="mb-[14px] text-[11px] font-bold uppercase tracking-[0.12em] text-[#2470EB]">
              {t.benefitsEyebrow}
            </div>
            <h2 className="font-display mb-[18px] text-[44px] font-bold leading-[1.1] tracking-[-0.03em] text-[#0A0F1E]">
              {t.benefitsTitle}
            </h2>
            <p className="text-[17px] leading-[1.7] text-[#6B7585]">
              {t.benefitsBody}
            </p>
          </div>

          <div className={`grid gap-5 lg:grid-cols-3 ${compactSpacing ? "mb-12" : "mb-16"}`}>
            {[
              {
                number: "01",
                title: t.featureRiskTitle,
                body: t.featureRiskBody,
                icon: ShieldCheck,
                dark: false,
              },
              {
                number: "02",
                title: t.featureFeeTitle,
                body: t.featureFeeBody,
                icon: Banknote,
                dark: true,
              },
              {
                number: "03",
                title: t.featureLocalTitle,
                body: t.featureLocalBody,
                icon: Scale,
                dark: false,
              },
            ].map((item) => (
              <div
                key={item.number}
                className={`relative overflow-hidden rounded-2xl border px-7 py-8 ${
                  item.dark
                    ? "border-white/8 bg-[linear-gradient(160deg,#0B1326_0%,#1A2547_100%)] shadow-[0_20px_60px_rgba(11,19,38,0.3)]"
                    : "border-[#E2E6EF] bg-white"
                }`}
              >
                {item.dark ? (
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full blur-[20px]"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(46,142,255,0.22) 0%, transparent 65%)",
                    }}
                  />
                ) : null}
                <div className="relative z-10 mb-6 flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-[10px] ${
                      item.dark ? "bg-white/12" : "bg-[#F4F6FA]"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${
                        item.dark ? "text-white" : "text-[#0B1326]"
                      }`}
                    />
                  </div>
                  <div
                    className={`font-display text-[13px] font-bold tracking-[0.08em] ${
                      item.dark ? "text-white/40" : "text-[#B4BECF]"
                    }`}
                  >
                    {item.number}
                  </div>
                </div>
                <h3
                  className={`font-display text-[19px] font-bold leading-[1.25] ${
                    item.dark ? "text-white" : "text-[#0A0F1E]"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-[10px] text-sm leading-[1.65] ${
                    item.dark ? "text-white/65" : "text-[#6B7585]"
                  }`}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden bg-[linear-gradient(180deg,#0B1326_0%,#101930_100%)] px-6 py-10">
          <div
            className="pointer-events-none absolute right-[-100px] top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full blur-[30px]"
            style={{
              background:
                "radial-gradient(circle, rgba(46,142,255,0.12) 0%, transparent 60%)",
            }}
          />

          <div className="relative mx-auto grid max-w-[1200px] gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {[
              { value: "94%", label: t.statSuccess },
              { value: "€0", label: t.statUpfront },
              { value: "10%", label: t.statFee },
              { value: "€600", label: t.statMax },
            ].map((item, index) => (
              <div
                key={item.label}
                className={`px-6 ${
                  index > 0 ? "lg:border-l lg:border-white/12" : ""
                }`}
              >
                <div className="font-display mb-[6px] text-[40px] font-bold leading-[1.1] tracking-[-0.03em] text-white">
                  {item.value}
                </div>
                <div className="text-xs font-medium uppercase tracking-[0.06em] text-white/55">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {testimonialsVariant !== "none" ? (
        <TestimonialsSection locale={locale} variant={testimonialsVariant} />
      ) : null}

      <section
        id="faq"
        className={`bg-white px-6 ${compactSpacing ? "py-[76px]" : "py-[100px]"}`}
      >
        <div className="mx-auto max-w-[720px]">
          <div className={`text-center ${compactSpacing ? "mb-10" : "mb-14"}`}>
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[#2470EB]">
              {t.faqEyebrow}
            </div>
            <h2 className="font-display text-[40px] font-bold tracking-[-0.025em] text-[#0A0F1E]">
              {t.faqTitle}
            </h2>
          </div>

          {t.faqs.map((faq) => (
            <details key={faq.q} className="border-b border-[#E2E6EF]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left">
                <span className="font-display text-base font-semibold text-[#0A0F1E]">
                  {faq.q}
                </span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4F6FA] text-[#6B7585] transition group-open:bg-[#0B1326] group-open:text-white">
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                </span>
              </summary>
              <div className="pb-5 text-[15px] leading-[1.7] text-[#6B7585]">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#0B1326_0%,#121B33_100%)] px-6 py-24">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(46,142,255,0.16) 0%, rgba(46,142,255,0.03) 40%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[640px] text-center">
          <h2 className="font-display mb-[18px] text-[42px] font-bold leading-[1.12] tracking-[-0.025em] text-white">
            {t.ctaTitleA}
            <br />
            {t.ctaTitleB}
          </h2>
          <p className="mb-9 text-[17px] leading-[1.65] text-white/55">
            {t.ctaBody}
          </p>
          <button
            onClick={() => openClaimModal("cta_section")}
            className="rounded-xl bg-[#2470EB] px-11 py-[17px] text-[17px] font-bold text-white transition hover:brightness-95"
          >
            {t.ctaButton}
          </button>
        </div>
      </section>

      <footer className="bg-[#0A0F1E] px-6 pb-8 pt-12 text-white">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
            <div>
              <BrandLogo
                href={locale === "en" ? "/en" : "/"}
                tone="light"
                balance={logoBalance}
              />
              <p className="mt-[14px] max-w-[300px] text-[13px] leading-[1.7] text-white/45">
                {t.footerBody}
              </p>
            </div>

            <div>
              <div className="mb-[14px] text-[11px] font-bold uppercase tracking-[0.08em] text-white/35">
                {t.footerLinks}
              </div>
              <div className="flex flex-col gap-[10px]">
                <a
                  href="#kako-radi"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  {t.navHow}
                </a>
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  {t.support}
                </a>
              </div>
            </div>

            <div>
              <div className="mb-[14px] text-[11px] font-bold uppercase tracking-[0.08em] text-white/35">
                {t.footerLegal}
              </div>
              <div className="flex flex-col gap-[10px]">
                <Link
                  href="/terms"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  {t.terms}
                </Link>
                <Link
                  href="/privacy"
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  {t.privacy}
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-white/8 pt-5 text-xs text-white/30">
            {t.copyright}
          </div>
        </div>
      </footer>

      {isClaimModalOpen ? (
        <ClaimModal
          isOpen={isClaimModalOpen}
          locale={locale}
          onClose={() => setIsClaimModalOpen(false)}
          seed={{
            flightNumber: heroFlight,
            flightDate: heroDate,
            issueType: heroIssueType,
          }}
        />
      ) : null}
    </main>
  );
}
