"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  ChevronRight,
  Clock,
  Menu,
  Plane,
  Scale,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";

import { ClaimModal } from "@/components/claim-modal";
import { getSupportEmail } from "@/lib/env";

type Locale = "sr" | "en";

const copy = {
  sr: {
    brand: "letkasni.rs",
    navHow: "Kako radi",
    navBenefits: "Prednosti",
    navFaq: "Česta pitanja",
    navCta: "Proveri let",
    badge: "Prvi srpski servis za zaštitu putnika",
    heroTitle1: "Vaš let je",
    heroTitle2: "kasnio?",
    heroTitle3: "Naplatite do 600€",
    heroTitle4: "odštete.",
    heroBody:
      "Kao prvi domaći servis, pomažemo putnicima u Srbiji da naplate ono što im zakonski pripada. Bez stresa, bez stranih sajtova i bez troškova unapred.",
    proofA: "Zakon je na vašoj strani",
    proofB: "Bez troškova unapred",
    cardTitle: "Proveri odštetu odmah",
    flightNumber: "Broj leta",
    flightNumberPlaceholder: "npr. JU101 ili W6 4001",
    flightDate: "Datum leta",
    heroButton: "Proveri besplatno",
    heroNote: "Provera traje manje od 60 sekundi i ne obavezuje vas ni na šta.",
    airlinesTitle: "Radimo sa zahtevima protiv svih većih avio-kompanija",
    howTitle: "Tri koraka do vaše odštete",
    howBody: "Zaboravite na birokratiju. Mi smo proces doveli do jasnog i brzog toka.",
    how: [
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
    benefitsEyebrow: "Prednosti saradnje",
    benefitsTitle1: "Zašto putnici biraju",
    benefitsTitle2: "letkasni.rs?",
    localTitle: "Prvi i jedini srpski provajder",
    localBody:
      '"Naš lokalni pravni tim vodi slučaj efikasno i razumljivo, tako da vi ne jurite avio-kompaniju po stranim formularima."',
    featureRiskTitle: "Bez ikakvih troškova",
    featureRiskBody:
      "Proviziju uzimamo samo ako naplatimo. Mi preuzimamo operativni i pravni teret.",
    featureTimeTitle: "Ušteda vremena",
    featureTimeBody:
      "Naš lokalni tim koristi ekspertizu i automatizaciju radi brže naplate potraživanja.",
    featureFeeTitle: "Samo 10% provizija",
    featureFeeBody:
      "Najdirektniji model na tržištu: jasna provizija, bez skrivenih troškova i bez naplate unapred.",
    faqTitle: "Česta pitanja",
    faqBody: "Sve što treba da znate o procesu naplate.",
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
        a: "Zavisi od avio-kompanije i toga da li slučaj ide na brzu isplatu ili dodatnu pravnu obradu. Jednostavniji predmeti mogu biti zatvoreni relativno brzo, dok sporiji zahtevi traže više vremena.",
      },
      {
        q: "Da li mogu da tražim odštetu i ako je let bio pre nekoliko godina?",
        a: "U mnogim slučajevima da. Rokovi zastarelosti zavise od države i vrste leta, pa ima smisla proveriti i starije letove umesto da unapred pretpostavite da je prekasno.",
      },
    ],
    ctaTitle: "Ne dozvolite da vaš novac ostane avio-kompaniji.",
    ctaBody:
      "Započnite proveru odmah. Za prvi prolaz su vam potrebna samo dva minuta.",
    ctaButton: "Proveri moj let besplatno",
    footerBody:
      "Specijalizovani servis za zaštitu prava putnika u avio-saobraćaju i naplatu zakonom propisane odštete.",
    footerLinks: "Linkovi",
    footerLegal: "Pravne informacije",
    about: "O nama",
    pricing: "Cenovnik usluga",
    rights: "Prava prema EU 261",
    terms: "Uslovi korišćenja",
    privacy: "Politika privatnosti",
    support: "Kontakt",
    routeHint: "Kompletnu rutu i kontakt tražimo u sledećem koraku.",
  },
  en: {
    brand: "letkasni.rs",
    navHow: "How it works",
    navBenefits: "Benefits",
    navFaq: "FAQ",
    navCta: "Check flight",
    badge: "Serbia-first passenger rights service",
    heroTitle1: "Was your flight",
    heroTitle2: "delayed?",
    heroTitle3: "Claim up to €600",
    heroTitle4: "in compensation.",
    heroBody:
      "We help passengers connected to Serbia recover compensation they may be legally owed. No foreign claim maze, no upfront cost, and a clear next step.",
    proofA: "Passenger law is on your side",
    proofB: "No upfront fee",
    cardTitle: "Check compensation now",
    flightNumber: "Flight number",
    flightNumberPlaceholder: "e.g. JU101 or W6 4001",
    flightDate: "Flight date",
    heroButton: "Check for free",
    heroNote: "The first check takes less than 60 seconds and does not commit you to anything.",
    airlinesTitle: "We handle claims against all major airlines",
    howTitle: "Three steps to compensation",
    howBody: "No paperwork maze. Just a clear and fast path.",
    how: [
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
        body: "If the case is good, we drive it forward until collection.",
      },
    ],
    benefitsEyebrow: "Why people choose us",
    benefitsTitle1: "Why passengers choose",
    benefitsTitle2: "letkasni.rs?",
    localTitle: "The first Serbian provider",
    localBody:
      '"Our local legal team handles the case efficiently and clearly, so you are not stuck chasing airlines through generic foreign forms."',
    featureRiskTitle: "No upfront costs",
    featureRiskBody:
      "We only earn if we collect. We take on the operational and legal burden.",
    featureTimeTitle: "Time saved",
    featureTimeBody:
      "Our local team combines expertise and automation for faster claim recovery.",
    featureFeeTitle: "Only 10% fee",
    featureFeeBody:
      "A simpler fee model with no hidden charges and no upfront payment.",
    faqTitle: "Frequently asked questions",
    faqBody: "What you should know before starting.",
    faqs: [
      {
        q: "How much could I recover?",
        a: "Typical EU 261 cases most often fall in the €250 to €600 range per passenger depending on distance and disruption details.",
      },
      {
        q: "Which documents do I need?",
        a: "For the first step, flight number, date and a short description are enough. We ask for extra documents only if the case is worth pushing.",
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
        a: "That depends on the airline and whether the case can be resolved quickly or needs additional legal follow-up. Straightforward claims can move faster, while contested ones take longer.",
      },
      {
        q: "Can I still claim for an older flight?",
        a: "Often yes. Limitation periods depend on the country and route, so older flights are still worth checking before assuming the window has closed.",
      },
    ],
    ctaTitle: "Do not leave your money with the airline.",
    ctaBody: "Start the check now. The first pass takes only two minutes.",
    ctaButton: "Check my flight for free",
    footerBody:
      "A focused service for passenger-rights claims and compensation support connected to Serbia.",
    footerLinks: "Links",
    footerLegal: "Legal",
    about: "About",
    pricing: "Pricing",
    rights: "EU 261 rights",
    terms: "Terms of use",
    privacy: "Privacy policy",
    support: "Contact",
    routeHint: "We collect the full route and contact details in the next step.",
  },
} as const;

const airlines = [
  "AIRSERBIA",
  "WIZZAIR",
  "RYANAIR",
  "LUFTHANSA",
  "TURKISH",
];

export function LandingPage({ locale = "sr" }: { locale?: Locale }) {
  const t = copy[locale];
  const supportEmail = getSupportEmail();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroFlight, setHeroFlight] = useState("");
  const [heroDate, setHeroDate] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600/10 selection:text-blue-600">
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-200 bg-white/90 py-3 shadow-sm backdrop-blur-md"
            : "border-transparent bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-8">
          <Link
            href={locale === "en" ? "/en" : "/"}
            className="flex items-center gap-2"
          >
            <div className="rounded-lg bg-blue-600 p-1.5 text-white">
              <Plane className="h-6 w-6 -rotate-12" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-blue-900">
              letkasni<span className="text-orange-500">.rs</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#kako-radi" className="text-sm font-medium transition-colors hover:text-blue-600">
              {t.navHow}
            </a>
            <a href="#prednosti" className="text-sm font-medium transition-colors hover:text-blue-600">
              {t.navBenefits}
            </a>
            <a href="#faq" className="text-sm font-medium transition-colors hover:text-blue-600">
              {t.navFaq}
            </a>
            <button
              onClick={() => setIsClaimModalOpen(true)}
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700"
            >
              {t.navCta}
            </button>
          </div>

          <button
            className="rounded-xl p-2 transition hover:bg-slate-100 md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-40 bg-white px-6 pt-24 md:hidden">
          <div className="flex flex-col gap-6 text-lg font-medium">
            <a href="#kako-radi" onClick={() => setIsMenuOpen(false)}>
              {t.navHow}
            </a>
            <a href="#prednosti" onClick={() => setIsMenuOpen(false)}>
              {t.navBenefits}
            </a>
            <a href="#faq" onClick={() => setIsMenuOpen(false)}>
              {t.navFaq}
            </a>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsClaimModalOpen(true);
              }}
              className="rounded-2xl bg-blue-600 py-4 font-bold text-white"
            >
              {t.navCta}
            </button>
          </div>
        </div>
      ) : null}

      <section className="relative overflow-hidden bg-slate-50 pb-20 pt-32 md:pb-40 md:pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_30%)]" />
        <div className="container relative z-10 mx-auto grid max-w-[1440px] gap-14 px-6 md:px-8 xl:grid-cols-[minmax(0,0.98fr)_minmax(440px,1.02fr)] xl:items-center">
          <div className="max-w-[42rem] xl:max-w-[38rem]">
            <h1 className="mb-7 max-w-[11ch] text-[4.1rem] font-black leading-[0.94] tracking-tighter text-slate-900 md:text-[4.95rem] lg:text-[5.55rem]">
              {t.heroTitle1} <br />
              {t.heroTitle2} <br />
              <span className="text-blue-600">{t.heroTitle3}</span> {t.heroTitle4}
            </h1>
            <p className="mb-8 max-w-xl text-[1.28rem] leading-relaxed text-slate-600">
              {t.heroBody}
            </p>

            <div className="flex flex-col gap-4 text-[0.95rem] font-medium text-slate-600 sm:flex-row sm:items-center sm:gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                {t.proofA}
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                {t.proofB}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-blue-100/60 blur-3xl" />
            <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-2xl shadow-blue-900/5 md:p-10">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">{t.cardTitle}</h2>
              <div className="space-y-4">
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-slate-700">{t.flightNumber}</span>
                  <input
                    type="text"
                    value={heroFlight}
                    onChange={(event) => setHeroFlight(event.target.value)}
                    placeholder={t.flightNumberPlaceholder}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-slate-700">{t.flightDate}</span>
                  <input
                    type="date"
                    value={heroDate}
                    onChange={(event) => setHeroDate(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 outline-none transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
                  />
                </label>

                <button
                  onClick={() => setIsClaimModalOpen(true)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-5 text-lg font-bold text-white shadow-xl shadow-blue-600/20 transition-all hover:bg-blue-700"
                >
                  {t.heroButton}
                  <ArrowRight className="h-5 w-5 text-orange-500" />
                </button>
                <p className="text-center text-xs text-slate-500">{t.heroNote}</p>
                <p className="text-center text-xs text-slate-400">{t.routeHint}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-12">
        <div className="container mx-auto max-w-[1440px] px-6 md:px-8">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            {t.airlinesTitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 xl:flex-nowrap xl:gap-14">
            {airlines.map((airline) => (
              <span
                key={airline}
                className="whitespace-nowrap text-[1.55rem] font-black italic tracking-tighter text-slate-800"
              >
                {airline}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="kako-radi" className="relative overflow-hidden bg-slate-50 py-24">
        <div className="container relative z-10 mx-auto max-w-[1440px] px-6 md:px-8">
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <h2 className="mb-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              {t.howTitle}
            </h2>
            <p className="text-lg text-slate-600">{t.howBody}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            {[Zap, Scale, Banknote].map((Icon, index) => (
              <div
                key={t.how[index].title}
                className="group rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50">
                  <Icon className={`h-8 w-8 ${index === 0 ? "text-orange-500" : index === 1 ? "text-blue-600" : "text-green-500"}`} />
                </div>
                <h3 className="mb-3 flex items-center gap-3 text-xl font-bold text-slate-900">
                  <span className="text-3xl font-black text-blue-100">{`0${index + 1}`}</span>
                  {t.how[index].title}
                </h3>
                <p className="leading-relaxed text-slate-600">{t.how[index].body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prednosti" className="relative overflow-hidden bg-white py-24">
        <div className="absolute right-0 top-0 -z-10 h-[800px] w-[800px] translate-x-1/4 -translate-y-1/2 rounded-full bg-blue-50/60 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] -translate-x-1/4 translate-y-1/2 rounded-full bg-orange-50/70 blur-3xl" />
        <div className="container mx-auto max-w-[1440px] px-6 md:px-8">
          <div className="mx-auto mb-16 max-w-[56rem] text-center">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Zašto nas biraju putnici?
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-12">
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-700 via-blue-700 to-blue-800 p-8 text-white shadow-2xl shadow-blue-900/15 md:col-span-12 md:grid md:grid-cols-[1.35fr_0.65fr] md:gap-8 md:p-12">
              <div className="absolute right-0 top-0 h-full w-[700px] -mr-28 rounded-full bg-white/6 blur-3xl transition-all duration-700 group-hover:bg-white/10" />
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/20">
                  Lokalna ekspertiza
                </div>
                <h3 className="max-w-none border-b-2 border-orange-400 pb-4 text-[2.7rem] font-black leading-[1.02] tracking-tight text-white md:inline-block md:text-[3.35rem]">
                  {t.localTitle}
                </h3>
                <p className="mt-8 max-w-[820px] text-lg font-medium leading-relaxed text-blue-50 md:text-[1.15rem]">
                  {t.localBody}
                </p>
              </div>
              <div className="hidden md:block" />
            </div>

            {[
              {
                title: t.featureRiskTitle,
                body: t.featureRiskBody,
                icon: ShieldCheck,
                className: "bg-blue-600 shadow-blue-600/20",
              },
              {
                title: t.featureTimeTitle,
                body: t.featureTimeBody,
                icon: Clock,
                className: "bg-blue-600 shadow-blue-600/20",
              },
              {
                title: t.featureFeeTitle,
                body: t.featureFeeBody,
                icon: Banknote,
                className: "bg-orange-500 shadow-orange-500/20",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`group relative flex min-h-[220px] flex-col justify-center overflow-hidden rounded-[2.5rem] p-10 text-white shadow-xl md:col-span-4 ${item.className}`}
              >
                <item.icon className="absolute -right-10 -top-10 h-40 w-40 opacity-10 transition-transform duration-500 group-hover:scale-110" />
                <div className="relative z-10">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="mb-2 text-xl font-bold leading-tight">{item.title}</h4>
                  <p className="text-sm font-medium leading-relaxed text-white/78">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-slate-200 bg-slate-50 py-24">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-black text-slate-900 md:text-4xl">
              {t.faqTitle}
            </h2>
            <p className="text-slate-600">{t.faqBody}</p>
          </div>

          <div className="space-y-4">
            {t.faqs.map((faq) => (
              <details
                key={faq.q}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-blue-200"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 text-lg font-bold text-slate-800">
                  {faq.q}
                  <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="mt-2 border-t border-slate-100 px-6 pb-6 pt-4 leading-relaxed text-slate-600">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto max-w-[1440px] px-6 md:px-8">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-center text-white shadow-2xl shadow-blue-900/20 md:p-20">
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="mb-6 text-4xl font-black leading-tight md:text-5xl">
                {t.ctaTitle}
              </h2>
              <p className="mb-10 text-xl font-medium text-blue-100/90">
                {t.ctaBody}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setIsClaimModalOpen(true)}
                  className="group flex items-center justify-center gap-3 rounded-2xl bg-white px-10 py-5 text-xl font-bold text-blue-600 shadow-xl shadow-black/10 transition-all hover:bg-blue-50"
                >
                  {t.ctaButton}
                  <ArrowRight className="h-6 w-6 text-orange-500 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50 py-20 text-slate-600">
        <div className="container mx-auto max-w-[1440px] px-6 md:px-8">
          <div className="mb-16 grid gap-12 md:grid-cols-4">
            <div className="col-span-2">
              <Link
                href={locale === "en" ? "/en" : "/"}
                className="mb-6 flex items-center gap-2"
              >
                <div className="rounded-lg bg-blue-600 p-1.5 text-white">
                  <Plane className="h-5 w-5 -rotate-12" />
                </div>
                <span className="text-2xl font-black tracking-tight text-blue-900">
                  letkasni<span className="text-orange-500">.rs</span>
                </span>
              </Link>
              <p className="max-w-sm leading-relaxed">{t.footerBody}</p>
            </div>

            <div>
              <h4 className="mb-6 font-bold text-slate-900">{t.footerLinks}</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#kako-radi" className="transition-colors hover:text-blue-600">
                    {t.navHow}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${supportEmail}`} className="transition-colors hover:text-blue-600">
                    {t.support}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-bold text-slate-900">{t.footerLegal}</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/terms" className="transition-colors hover:text-blue-600">
                    {t.terms}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-blue-600">
                    {t.privacy}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 md:flex-row">
            <p>© 2026 letkasni.rs. Sva prava zadržana.</p>
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
          }}
        />
      ) : null}
    </main>
  );
}
