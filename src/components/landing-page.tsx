import {
  Banknote,
  CheckCircle2,
  ChevronRight,
  MessageSquareQuote,
  Plane,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Image from "next/image";

import {
  ClaimCtaButton,
  HeaderWithClaimCta,
  HeroClaimCard,
} from "@/components/claim-entry";
import { SiteFooter } from "@/components/site-footer";
import type { FooterContactVariant } from "@/components/site-footer";
import { getSupportEmail } from "@/lib/env";
import type { IssueType } from "@/lib/types";

type Locale = "sr" | "en";
type LandingVariant = "default" | "hero-compact";
type LogoBalance = "default" | "optical" | "compact" | "badge";
type TestimonialsVariant = "none" | "a" | "b" | "c";
type FormFieldTone = "default" | "soft" | "muted" | "quiet";
type VerticalSpacing = "default" | "compact";
type HeroFlightPathVariant = "with-visual" | "plane-only" | "visual-low";
export type HeroTextColorVariant = "default" | "body-and-proof-white";

function HeroPayoutVisual({ locale, low = false }: { locale: Locale; low?: boolean }) {
  return (
    <>
      <div
        className={`absolute -rotate-[8deg] rounded-[11px] border border-white/14 bg-[#172444] shadow-[0_14px_36px_rgba(0,0,0,0.25)] ${
          low
            ? "left-[340px] top-[690px] w-[125px] px-4 py-4"
            : locale === "en"
              ? "left-[299px] top-[78px] w-[100px] px-3 py-3"
              : "left-[303px] top-[127px] w-[100px] px-3 py-3"
        }`}
      >
        <span
          className={`block font-bold uppercase tracking-[0.1em] text-white/42 ${
            low ? "text-[8px]" : "text-[7px]"
          }`}
        >
          {locale === "en" ? "flight disruption" : "poremećaj leta"}
        </span>
        <div className={low ? "mt-4 space-y-2" : "mt-3 space-y-1.5"}>
          <span className={`block rounded-full bg-white/75 ${low ? "h-[5px] w-[60px]" : "h-1 w-[48px]"}`} />
          <span className={`block rounded-full bg-white/28 ${low ? "h-[5px] w-[85px]" : "h-1 w-[68px]"}`} />
        </div>
        <span
          className={`inline-flex rounded-full bg-[#A83F52]/28 font-bold uppercase tracking-[0.06em] text-[#FFB3BF] ${
            low ? "mt-4 px-2.5 py-1.5 text-[8px]" : "mt-3 px-2 py-1 text-[7px]"
          }`}
        >
          {locale === "en" ? "delayed 3h+" : "kasni 3h+"}
        </span>
      </div>

      <div
        className={`absolute rotate-[6deg] rounded-[11px] bg-white text-[#0B1326] shadow-[0_18px_42px_rgba(0,0,0,0.3)] ${
          low
            ? "left-[397px] top-[718px] w-[148px] px-4 py-4"
            : locale === "en"
              ? "left-[347px] top-[101px] w-[118px] px-3 py-3"
              : "left-[351px] top-[150px] w-[118px] px-3 py-3"
        }`}
      >
        <span
          className={`block font-bold uppercase tracking-[0.08em] text-[#7A8494] ${
            low ? "text-[8px]" : "text-[7px]"
          }`}
        >
          {locale === "en" ? "You receive" : "Vama"}
        </span>
        <strong
          className={`block font-display leading-none text-[#2470EB] ${
            low ? "mt-3 text-[24px]" : "mt-2.5 text-[20px]"
          }`}
        >
          600 EUR
        </strong>
        <span
          className={`block font-bold uppercase tracking-[0.07em] text-[#7A8494] ${
            low ? "mt-2 text-[8px]" : "mt-1.5 text-[7px]"
          }`}
        >
          {locale === "en" ? "no commission" : "bez provizije"}
        </span>
      </div>
    </>
  );
}

function HeroQuestionFlightPath({
  locale,
  variant = "with-visual",
}: {
  locale: Locale;
  variant?: HeroFlightPathVariant;
}) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-[120px] top-[-122px] hidden h-[255px] w-[685px] xl:block"
    >
      <svg
        className="absolute left-0 top-0 h-[145px] w-[685px] overflow-visible"
        viewBox="0 0 685 145"
      >
        <path
          d="M 0 145 A 1400 1400 0 0 1 685 110"
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeDasharray="3 4"
          strokeLinecap="round"
          strokeWidth="1"
        />
      </svg>

      <span
        className={`absolute flex h-9 w-9 items-center justify-center ${
          locale === "en"
            ? "left-[160px] top-[85px]"
            : "left-[439px] top-[65px]"
        }`}
      >
        <Plane
          className={`h-5 w-5 fill-white text-white ${
            locale === "en" ? "rotate-[36deg]" : "rotate-[47deg]"
          }`}
        />
      </span>

      {variant !== "plane-only" ? (
        <HeroPayoutVisual locale={locale} low={variant === "visual-low"} />
      ) : null}
    </div>
  );
}

function CtaFlightPath({ locale }: { locale: Locale }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1 hidden h-[150px] w-[min(49.25vw,785px)] -translate-x-1/2 xl:block"
    >
      <svg
        className="absolute inset-0 h-[150px] w-full overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 785 150"
      >
        <path
          d="M 0 145 A 972 972 0 0 1 785 103"
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeDasharray="3 4"
          strokeLinecap="round"
          strokeWidth="1"
        />
      </svg>

      <span
        className={`absolute flex h-9 w-9 items-center justify-center ${
          locale === "en"
            ? "top-[50px]"
            : "top-[84px]"
        }`}
        style={{ left: locale === "en" ? "calc(26.4% - 18px)" : "calc(12.6% - 18px)" }}
      >
        <Plane className="h-5 w-5 rotate-[24deg] fill-white text-white" />
      </span>
    </div>
  );
}

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
    heroLine1: "Pomeren ili",
    heroLine2: "otkazan let?",
    heroLine3: "Naplatite do 600€, ",
    heroLine3Emphasis: "zadržite ceo\u00a0iznos.",
    heroLine4: "",
    heroBody:
      "Druge platforme uzimaju 30–50% Vaše odštete. Mi Vam ne uzimamo ništa — koliko avio-kompanija isplati, toliko Vi dobijate.",
    proofA: "DO 600 Eur po putniku",
    proofB: "Bez troškova i provizije",
    proofC: "Lokalna podrška",
    cardEyebrow: "Proveri odštetu odmah",
    cardTitle: "Koliko ti duguje avio-kompanija?",
    flightNumber: "Broj leta",
    flightNumberPlaceholder: "npr. JU 221",
    flightDate: "Datum leta",
    issueType: "Vrsta problema",
    heroButton: "Proveri besplatno",
    heroNote: "Provera traje manje od 2 minuta.",
    routeHint: "",
    airlineStripLabel: "Radimo sa:",
    airlineGridEyebrow: "Naplaćujemo od svih većih avio-prevoznika",
    airlineGridTitle: "Vodeće avio-kompanije na našoj listi",
    airlineMore: "+ 40 drugih kompanija",
    active: "Aktivno",
    howEyebrow: "Kako radi",
    howTitleA: "Tri koraka do",
    howTitleB: "Vaše odštete",
    howBody: "Zaboravite na birokratiju. Proces smo sveli na minimum.",
    steps: [
      {
        title: "Unesite podatke",
        body: "Broj leta, datum i osnovni problem. Sistem proverava da li Vaš let ispunjava uslove.",
      },
      {
        title: "Provera slučaja",
        body: "Advokat preuzima slučaj i utvrđuje da li ima osnova za potraživanje naknade.",
      },
      {
        title: "Postupak i isplata",
        body: "Po završetku postupka kompletan iznos naknade isplaćuje se na Vaš račun.",
      },
    ],
    benefitsEyebrow: "Specijalizovana lokalna usluga",
    benefitsTitle: "Radimo jedno — letove do i iz Srbije",
    benefitsBody:
      "Nismo platforma koja pokriva pola sveta a Srbiju usput. Svaki let koji vodimo polazi iz Srbije ili sleće ovde. To je jedino što radimo — i zato nam ništa u Vašem slučaju nije novo.",
    featureRiskTitle: "Srpsko tržište jedini fokus",
    featureRiskBody:
      "Poznajemo kako se avio-kompanije ponašaju u Srbiji, procedure i način na koji se ovi zahtevi rešavaju u praksi.",
    featureFeeTitle: "Lokalni ljudi, direktna podrška",
    featureFeeBody:
      "Pišete i pričate na srpskom, sa nekim ko razume Vaš slučaj i daje konkretne odgovore.",
    featureLocalTitle: "Efikasnost na terenu",
    featureLocalBody:
      "Kada predmet zahteva dodatni korak, on ide u egzekuciju istog dana — ne u red čekanja u inostranstvu.",
    statPaidOut: "Naknade isplaćeno Vama",
    statUpfront: "Troškovi unapred",
    statFee: "Provizija na uspeh",
    statMax: "Maksimalna naknada",
    statMaxValue: "600 EUR",
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
        a: "To nije konačan odgovor. Avio-kompanije u Srbiji, zbog nedovoljno transparentnih propisa, po pravilu odbijaju zahteve generički. Stoga mi radimo sopstvenu proveru pre konačne odluke.",
      },
      {
        q: "Kako je moguće da ne plaćam baš ništa?!",
        a: "Da, moguće je. Do kraja letnje sezone traje naš promotivni period i usluga je u potpunosti besplatna. Ukoliko slučaj ode pred sud, advokat koji vodi Vaš predmet se naplaćuje isključivo od avio-kompanije.",
      },
      {
        q: "Koliko traje naplata odštete?",
        a: "Zavisi od avio-kompanije i samog slučaja. Jednostavniji predmeti mogu biti zatvoreni za 1-2 meseca, dok kompleksniji zahtevi traže više vremena. U svakom slučaju ovaj proces ne zahteva aktivno učešće sa Vaše strane i redovno ćete biti obaveštavani o statusu Vašeg zahteva.",
      },
      {
        q: "Da li mogu da tražim odštetu i ako je let bio pre nekoliko godina?",
        a: "U mnogim slučajevima da. Ukoliko se slučaj desio u poslednje 3 godine, svakako da treba da proverite da li imate pravo. Naš servis će ovo za Vas uraditi besplatno.",
      },
    ],
    ctaTitleA: "Ne ostavljajte novac",
    ctaTitleB: "avio-kompaniji i posrednicima.",
    ctaBody: "Započnite proveru odmah. Potrebno Vam je samo dva minuta.",
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
    localeSwitchAria: "Serbian version",
    localeHref: "/",
    navHow: "How it works",
    navBenefits: "Benefits",
    navFaq: "FAQ",
    navBlog: "Blog",
    navCta: "Check flight",
    heroLine1: "Delayed or",
    heroLine2: "cancelled flight?",
    heroLine3: "Claim up to €600, ",
    heroLine3Emphasis: "keep it all.",
    heroLine4: "",
    heroBody:
      "Other platforms take 30–50% of your compensation. We take nothing — whatever the airline pays, you receive in full.",
    proofA: "Up to €600 per passenger",
    proofB: "No costs or commission",
    proofC: "Local support",
    cardEyebrow: "Check compensation now",
    cardTitle: "How much compensation could you claim?",
    flightNumber: "Flight number",
    flightNumberPlaceholder: "e.g. JU 221",
    flightDate: "Flight date",
    issueType: "Issue type",
    heroButton: "Check for free",
    heroNote: "The initial check takes less than 2 minutes.",
    routeHint: "",
    airlineStripLabel: "We work with:",
    airlineGridEyebrow: "Claims involving major airlines",
    airlineGridTitle: "Major airlines covered by our checks",
    airlineMore: "+ 40 other airlines",
    active: "Covered",
    howEyebrow: "How it works",
    howTitleA: "Three steps to",
    howTitleB: "your compensation",
    howBody: "Skip the paperwork maze. We keep the process as simple as possible.",
    steps: [
      {
        title: "Enter the details",
        body: "Flight number, date and issue. Our system checks whether your flight qualifies.",
      },
      {
        title: "Case review",
        body: "A lawyer takes over the case and determines whether there are grounds for a compensation claim.",
      },
      {
        title: "Process and payout",
        body: "Once the process is complete, the full compensation amount is paid into your account.",
      },
    ],
    benefitsEyebrow: "Specialized local service",
    benefitsTitle: "We do one thing — flights to and from Serbia",
    benefitsBody:
      "We're not a platform that covers half the world and treats Serbia as a footnote. Every flight we handle departs from Serbia or lands here. It's all we do — which means nothing about your case is new to us.",
    featureRiskTitle: "Serbian market is our sole focus",
    featureRiskBody:
      "We know how airlines operate in Serbia, the procedures they follow, and how these claims are handled in practice.",
    featureFeeTitle: "Local people, direct support",
    featureFeeBody:
      "You write and speak in English with someone who understands your case and gives clear, concrete answers.",
    featureLocalTitle: "Efficiency on the ground",
    featureLocalBody:
      "When a case requires an additional step, it moves forward the same day — not into an overseas queue.",
    statPaidOut: "Compensation is paid to you",
    statUpfront: "Upfront cost",
    statFee: "Success fee",
    statMax: "Maximum compensation",
    statMaxValue: "€600",
    faqEyebrow: "FAQ",
    faqTitle: "Everything you should know",
    faqs: [
      {
        q: "How much could I recover?",
        a: "Under EU Regulation 261/2004, eligible claims typically range from €250 to €600 per passenger, depending on route distance and the circumstances of the disruption.",
      },
      {
        q: "Which documents do I need?",
        a: "For the initial check, your flight number, date and a short description are enough. We request additional documents only if the case appears eligible.",
      },
      {
        q: "What if the airline already rejected me?",
        a: "It is not necessarily a final answer. Airlines operating in Serbia often reject claims generically because the rules are not transparent enough. We run our own review before making a final decision.",
      },
      {
        q: "How can the service be completely free?",
        a: "Yes, it is possible. Our summer promotional period runs through the end of the season, and the service is completely free. If the case goes to court, the lawyer handling your matter is paid by the airline, not by you.",
      },
      {
        q: "How long does a compensation claim take?",
        a: "The timeframe depends on the airline and the case. Simpler claims may be resolved within one or two months, while more complex cases take longer. The process does not require your active involvement, and we keep you updated throughout.",
      },
      {
        q: "Can I still claim for an older flight?",
        a: "In many cases, yes. If the disruption happened within the last three years, it is worth checking whether you may be entitled to compensation. We will run that check for you free of charge.",
      },
    ],
    ctaTitleA: "Do not leave your money",
    ctaTitleB: "with the airline or intermediaries.",
    ctaBody: "Start your free check now. It takes only two minutes.",
    ctaButton: "Check my flight for free",
    footerBody:
      "Local, English-speaking support for passenger compensation claims involving flights to and from Serbia.",
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
  {
    code: "JU",
    name: "Air Serbia",
    symbol: "/airlines/air-serbia-symbol.svg",
  },
  {
    code: "W6",
    name: "Wizz Air",
    logo: "/airlines/wizz-air.svg",
    logoClass: "h-[46px] w-[170px]",
  },
  {
    code: "FR",
    name: "Ryanair",
    symbol: "/airlines/ryanair-symbol.svg",
  },
  {
    code: "LH",
    name: "Lufthansa",
    symbol: "/airlines/lufthansa-symbol.svg",
  },
  {
    code: "TK",
    name: "Turkish Airlines",
    symbol: "/airlines/turkish-airlines-symbol.svg",
  },
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
    titleA: "Utisci naših klijenata",
    titleB: "Kada je slučaj jasan, proces ne mora da bude težak",
    titleC: "Kratko, konkretno i bez praznih obećanja",
    caseExamples: "Primeri slučajeva",
    caseRange: "250-600 EUR",
    items: [
      {
        name: "Miloš Nikolić",
        route: "Niš - Beč",
        amount: "250 EUR",
        quote:
          "Posle otkazanog leta nisam znao kome da pišem ni šta da tražim. Pozvao sam kontakt telefon, Bojana iz podrške mi je sve lepo objasnila, poslao sam dokumentaciju i to je bilo to.",
      },
      {
        name: "Lazar Miučin",
        route: "Beograd - London",
        amount: "400 EUR",
        quote:
          "Dobio sam preporuku da je sve brzo i profi jer stvarno rade naši ljudi. Tako je i bilo i nakon neka 3-4 meseca mi je 400 EUR leglo na račun. :)",
      },
      {
        name: "Nikola Marinić",
        route: "Beograd - Njujork",
        amount: "600 EUR",
        quote:
          "Imali smo propuštenu konekciju zbog kašnjenja - mikro haos u životu i milion pitanja šta dalje. Odmah sam upućen na srpskog advokata koji je vrlo profesionalno odradio svoj posao. Isplaćeno nam je kroz nekoliko meseci 2400 EUR za čitavu porodicu.",
      },
    ],
  },
  en: {
    eyebrow: "Passenger experiences",
    titleA: "What our clients say",
    titleB: "When the case is clear, the process does not have to be difficult",
    titleC: "Clear answers without empty promises",
    caseExamples: "Example outcomes",
    caseRange: "EUR 250-600",
    items: [
      {
        name: "Miloš Nikolić",
        route: "Niš - Vienna",
        amount: "EUR 250",
        quote:
          "After my flight was cancelled, I did not know who to contact or what to ask for. I called the support number, Bojana explained everything clearly, I sent the documents, and that was it.",
      },
      {
        name: "Lazar Miučin",
        route: "Belgrade - London",
        amount: "EUR 400",
        quote:
          "I was told the process would be quick and professional because the team is based in Serbia. That is exactly how it went, and after three or four months, EUR 400 was paid into my account. :)",
      },
      {
        name: "Nikola Marinić",
        route: "Belgrade - New York",
        amount: "EUR 600",
        quote:
          "We missed a connection because of a delay. It caused chaos for us and left us with a million questions about what to do next. I was immediately put in touch with a Serbian lawyer who handled the case very professionally. Our family received EUR 2,400 after a few months.",
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
    <section className="bg-white px-6 pb-[84px] pt-[86px]">
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
  testimonialsVariant = "none",
  formFieldTone = "default",
  verticalSpacing = "default",
  footerContactVariant = "rows-brand-flat",
  heroFlightPath = false,
  heroFlightPathVariant = "with-visual",
  ctaFlightPath = false,
  heroTextColorVariant = "default",
}: {
  locale?: Locale;
  variant?: LandingVariant;
  logoBalance?: LogoBalance;
  testimonialsVariant?: TestimonialsVariant;
  formFieldTone?: FormFieldTone;
  verticalSpacing?: VerticalSpacing;
  footerContactVariant?: FooterContactVariant;
  heroFlightPath?: boolean;
  heroFlightPathVariant?: HeroFlightPathVariant;
  ctaFlightPath?: boolean;
  heroTextColorVariant?: HeroTextColorVariant;
}) {
  const t = copy[locale];
  const proofItems = [t.proofA, t.proofB, t.proofC];
  const fieldClasses = formFieldClasses[formFieldTone];
  const compactSpacing = verticalSpacing === "compact";
  const supportEmail = getSupportEmail();
  const compactHero = variant === "hero-compact";

  return (
    <main
      lang={locale === "en" ? "en" : "sr"}
      className="min-h-screen bg-white text-[#0A0F1E] selection:bg-[#2470EB]/10 selection:text-[#2470EB]"
    >
      <HeaderWithClaimCta
        locale={locale}
        logoBalance={logoBalance}
      />

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
            className={`relative grid w-full items-center gap-8 lg:gap-10 ${
              compactHero ? "xl:grid-cols-[minmax(0,1fr)_420px]" : "xl:grid-cols-[minmax(0,1fr)_440px]"
            }`}
          >
            {heroFlightPath ? (
              <HeroQuestionFlightPath locale={locale} variant={heroFlightPathVariant} />
            ) : null}

            <div className={compactHero ? "max-w-[35.5rem]" : "max-w-[37rem]"}>
              <h1 className="font-display mb-7 text-[48px] font-bold leading-[1.01] text-white sm:text-[54px] lg:text-[61.2px]">
                <span className="block text-[#2470EB]">{t.heroLine1}</span>
                <span className="block text-[#2470EB]">{t.heroLine2}</span>
                <span className="block text-[0.92em]">
                  {t.heroLine3}
                  <span className="underline decoration-white decoration-[3px] underline-offset-[5px] sm:decoration-[5px] sm:underline-offset-[8px]">
                    {t.heroLine3Emphasis}
                  </span>
                </span>
                {t.heroLine4 ? (
                  <span className="block text-[#2470EB]">{t.heroLine4}</span>
                ) : null}
              </h1>

              <p
                className={`mb-9 max-w-[480px] text-[16px] leading-[1.7] ${
                  heroTextColorVariant === "body-and-proof-white"
                    ? "text-white"
                    : "text-white/62"
                }`}
              >
                {t.heroBody}
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {proofItems.map((item) => (
                  <div
                    key={item}
                    className={`flex items-center gap-[7px] text-sm font-medium ${
                      heroTextColorVariant === "body-and-proof-white"
                        ? "text-white"
                        : "text-white/70"
                    }`}
                  >
                    <CheckCircle2 className="h-[14px] w-[14px] text-[#2DB87A]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <HeroClaimCard
              locale={locale}
              eyebrow={t.cardEyebrow}
              title={t.cardTitle}
              flightNumberLabel={t.flightNumber}
              flightNumberPlaceholder={t.flightNumberPlaceholder}
              flightDateLabel={t.flightDate}
              issueTypeLabel={t.issueType}
              buttonLabel={t.heroButton}
              note={t.heroNote}
              routeHint={t.routeHint}
              fieldClasses={fieldClasses}
              issueOptions={heroIssueOptions[locale]}
            />
          </div>
        </div>
      </section>

      {/* Keep the measured 212.5px content-to-content rhythm consistent across the landing flow. */}
      <section id="kako-radi" className="bg-white px-6 pb-[110px] pt-[160px]">
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
            <div className="mb-[14px] text-[11px] font-bold uppercase tracking-[0.12em] text-[#1A52C8]">
              {t.benefitsEyebrow}
            </div>
            <h2 className="font-display mb-[18px] text-[44px] font-bold leading-[1.1] tracking-[-0.03em] text-[#0A0F1E]">
              {t.benefitsTitle}
            </h2>
            <p className="text-[17px] leading-[1.7] text-[#4F5B75]">
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
                icon: Zap,
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
                      item.dark ? "text-white/40" : "text-[#64748B]"
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
              { value: t.statMaxValue, label: t.statMax },
              { value: "€0", label: t.statUpfront },
              { value: "100%", label: t.statPaidOut },
              { value: "0%", label: t.statFee },
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

      <section className="bg-white px-6 pb-[98px] pt-[184px]">
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
                className={`flex min-h-[196px] flex-col items-center justify-center gap-[10px] px-5 py-7 transition hover:bg-[#F4F6FA] ${
                  index < airlines.length - 1 ? "border-b border-[#E2E6EF] md:border-b-0 md:border-r" : ""
                }`}
              >
                <div className="flex h-16 w-[190px] items-center justify-center">
                  {airline.code === "W6" ? (
                    <Image
                      src={airline.logo!}
                      alt={`${airline.name} logo`}
                      width={220}
                      height={64}
                      sizes="190px"
                      className={`${airline.logoClass} object-contain`}
                    />
                  ) : (
                    <Image
                      src={airline.symbol!}
                      alt={`${airline.name} symbol`}
                      width={48}
                      height={48}
                      sizes="48px"
                      className="h-12 w-12 object-contain"
                    />
                  )}
                </div>
                <div className="flex h-6 items-center justify-center whitespace-nowrap text-[15px] font-display font-bold leading-none tracking-[-0.02em] text-[#0A0F1E]">
                  {airline.name}
                </div>
                <div className="inline-flex items-center gap-[5px] text-[10px] font-bold uppercase tracking-[0.08em] text-[#047857]">
                  <span className="h-[5px] w-[5px] rounded-full bg-[#047857]" />
                  {t.active}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 text-center text-[13px] text-[#64748B]">
            {t.airlineMore}
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

          <div className="space-y-3">
            {t.faqs.map((faq) => (
              <details
                key={faq.q}
                name={`landing-faq-${locale}`}
                className="group rounded-[10px] border border-[#DDE4EF] bg-white shadow-[0_10px_32px_rgba(15,23,42,0.05)] transition open:border-[#BFD7FF] open:bg-[#F8FBFF] open:shadow-[0_18px_46px_rgba(15,23,42,0.08)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-left marker:hidden transition hover:bg-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2470EB] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-[17px] font-bold leading-[1.35] text-[#0A0F1E]">
                    {faq.q}
                  </span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#DDE4EF] bg-[#F4F8FF] text-[#2470EB] transition group-open:border-[#2470EB] group-open:bg-[#2470EB] group-open:text-white">
                    <ChevronRight className="h-4 w-4 transition-transform duration-200 group-open:rotate-90" />
                  </span>
                </summary>
                <div className="px-5 pb-5 pt-0">
                  <div className="border-t border-[#E2EAF5] pt-4 text-[15px] leading-[1.75] text-[#4F5B75]">
                    {faq.a}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        id="final-cta"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#0B1326_0%,#121B33_100%)] px-6 pb-24 pt-[112.5px]"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[40px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(46,142,255,0.16) 0%, rgba(46,142,255,0.03) 40%, transparent 70%)",
          }}
        />
        {ctaFlightPath ? <CtaFlightPath locale={locale} /> : null}
        <div className="relative mx-auto max-w-[640px] text-center">
          <h2 className="font-display mb-[18px] text-[42px] font-bold leading-[1.12] tracking-[-0.025em] text-white">
            {t.ctaTitleA}
            <br />
            {t.ctaTitleB}
          </h2>
          <p className="mb-9 text-[17px] leading-[1.65] text-white/55">
            {t.ctaBody}
          </p>
          <ClaimCtaButton locale={locale}>
            {t.ctaButton}
          </ClaimCtaButton>
        </div>
      </section>

      <SiteFooter
        locale={locale}
        supportEmail={supportEmail}
        logoBalance={logoBalance}
        contactVariant={footerContactVariant}
      />
    </main>
  );
}
