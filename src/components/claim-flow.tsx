"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Ellipsis,
  Mail,
  Plane,
  PlaneTakeoff,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";
import { AirportCombobox } from "@/components/airport-combobox";
import { trackEvent } from "@/lib/analytics";

export type HeroFormVariant = "focused" | "embedded";
export type ClaimFlowLocale = "sr" | "en";

type DirectFlight = "direct" | "connection" | null;
type FlowStep = 1 | 2 | "checking" | 3;
type FormSurface = "focused" | "embedded";
type DisruptionValue = "delay" | "cancelled" | "other";

const disruptionOptions = [
  {
    value: "delay",
    icon: Clock3,
  },
  {
    value: "cancelled",
    icon: Ban,
  },
  {
    value: "other",
    icon: Ellipsis,
  },
] as const;

const flowCopy = {
  sr: {
    progress: ["Šta se dogodilo", "Detalji leta", "Rezultat"],
    disruption: {
      delay: { label: "Let je kasnio 3+ sata", detail: "" },
      cancelled: { label: "Let je otkazan", detail: "" },
      other: { label: "Drugi problem", detail: "Štrajk, odbijen ukrcaj ili izgubljen prtljag" },
    },
    stepOneTitle: "Šta se dogodilo sa Vašim letom?",
    stepOneBody: "Izaberite problem koji je najbliži Vašoj situaciji.",
    disruptionAria: "Vrsta problema sa letom",
    stepOneError: "Izaberite šta se dogodilo sa Vašim letom da biste nastavili.",
    stepOneCta: "Proveri koliko ti duguju",
    stepOneNote: "Provera traje manje od 2 minuta.",
    stepTwoTitle: "Detalji Vašeg leta",
    routeTitle: "Odakle ste leteli?",
    departureAirport: "Polazni aerodrom",
    departurePlaceholder: "npr. Beograd (BEG)",
    destinationAirport: "Krajnja destinacija",
    destinationPlaceholder: "npr. London (LHR)",
    directTitle: "Da li je let bio direktan?",
    directAria: "Direktan let",
    directYes: "Da, bio je direktan",
    directNo: "Ne, imao je najmanje jednu konekciju",
    dateTitle: "Koji je bio datum planiranog polaska?",
    dateLabel: "Datum",
    yesterday: "Juče",
    today: "Danas",
    airlineTitle: "Sa kojom avio-kompanijom ste leteli?",
    airlineLabel: "Avio-kompanija",
    airlinePlaceholder: "Izaberite avio-kompaniju",
    otherAirline: "Druga avio-kompanija",
    checkResult: "Proveri rezultat",
    checkingTitle: "Proveravamo Vaš let...",
    checkingBody: "Pregledamo rutu, datum i osnovne uslove za naknadu. Ovo traje samo nekoliko sekundi.",
    congratulations: "Čestitamo!",
    likelyEligible: "Vaš let verovatno ispunjava uslove za naknadu do 600 EUR!",
    legalParagraphs: [
      "Utvrđeni rezultat sistema i Vaš let biće analizirani od strane advokata u naredna 24 sata.",
      "Ukoliko advokat ustanovi da imate pravo na naknadu, Vama ostaje da, ukoliko želite, pošaljete adekvatnu dokumentaciju radi pokretanja postupka u skladu sa našim smernicama.",
      "Postupak se dalje nastavlja do isplate, za Vas bez troškova, bez rizika, bez aktivnog učešća i bez provizije. Ukoliko postupak ode na sud, sudske troškove i troškove advokata, tj. rizik neuspeha u sporu snosimo mi, Vi ne plaćate ništa. Ako postupak bude uspešan, Vama pripada pun iznos dosuđene naknade koji se uplaćuje na Vaš račun.",
    ],
    contactTitle: "Gde želite da Vam pošaljemo rezultat?",
    firstName: "Ime",
    firstNamePlaceholder: "Vaše ime",
    lastName: "Prezime",
    lastNamePlaceholder: "Vaše prezime",
    email: "Email",
    emailPlaceholder: "ime@domen.rs",
    phone: "Telefon",
    phonePlaceholder: "+381...",
    optional: "opciono",
    submit: "Pošalji",
    submitted: "Podaci su primljeni. Javićemo Vam se sa rezultatom provere.",
    submitting: "Šaljemo...",
    submitError: "Slanje nije uspelo. Proverite podatke i pokušajte ponovo.",
    freeCheck: "Besplatna provera",
  },
  en: {
    progress: ["What happened", "Flight details", "Result"],
    disruption: {
      delay: { label: "Flight delayed 3+ hours", detail: "" },
      cancelled: { label: "Flight cancelled", detail: "" },
      other: { label: "Another issue", detail: "Strike, denied boarding or lost baggage" },
    },
    stepOneTitle: "What happened to your flight?",
    stepOneBody: "Choose the option that best matches your situation.",
    disruptionAria: "Type of flight disruption",
    stepOneError: "Choose what happened to your flight to continue.",
    stepOneCta: "Check how much you could claim",
    stepOneNote: "The check takes less than 2 minutes.",
    stepTwoTitle: "Your flight details",
    routeTitle: "Where did you fly?",
    departureAirport: "Departure airport",
    departurePlaceholder: "e.g. Belgrade (BEG)",
    destinationAirport: "Final destination",
    destinationPlaceholder: "e.g. London (LHR)",
    directTitle: "Was it a direct flight?",
    directAria: "Direct flight",
    directYes: "Yes, it was direct",
    directNo: "No, it had at least one connection",
    dateTitle: "What was the scheduled departure date?",
    dateLabel: "Date",
    yesterday: "Yesterday",
    today: "Today",
    airlineTitle: "Which airline did you fly with?",
    airlineLabel: "Airline",
    airlinePlaceholder: "Choose an airline",
    otherAirline: "Another airline",
    checkResult: "Check result",
    checkingTitle: "We are checking your flight...",
    checkingBody: "We are reviewing the route, date and basic compensation conditions. This takes only a few seconds.",
    congratulations: "Congratulations!",
    likelyEligible: "Your flight is likely eligible for compensation of up to EUR 600!",
    legalParagraphs: [
      "The system result and your flight will be reviewed by a lawyer within the next 24 hours.",
      "If the lawyer confirms that you may be entitled to compensation, all you need to do, if you wish to proceed, is send the appropriate documents in line with our guidance so we can start the claim.",
      "We then handle the process through to payment, with no cost, no risk, no active involvement and no commission for you. If the case goes to court, we cover the court and legal costs, including the risk of an unsuccessful claim — you pay nothing. If the claim succeeds, the full compensation awarded belongs to you and is paid into your account.",
    ],
    contactTitle: "Where should we send your result?",
    firstName: "First name",
    firstNamePlaceholder: "Your first name",
    lastName: "Last name",
    lastNamePlaceholder: "Your last name",
    email: "Email",
    emailPlaceholder: "name@example.com",
    phone: "Phone",
    phonePlaceholder: "+44...",
    optional: "optional",
    submit: "Send result",
    submitted: "Your details have been received. We will contact you with the review result.",
    submitting: "Sending...",
    submitError: "We could not send your details. Check them and try again.",
    freeCheck: "Free check",
  },
} as const;

const airlineOptions = [
  "Air Serbia",
  "Wizz Air",
  "Ryanair",
  "Lufthansa",
  "Turkish Airlines",
  "Austrian Airlines",
  "SWISS",
  "LOT Polish Airlines",
  "Air France",
  "KLM",
  "British Airways",
  "easyJet",
  "Eurowings",
  "Croatia Airlines",
  "Air Montenegro",
  "Aegean Airlines",
  "ITA Airways",
  "Iberia",
  "TAP Air Portugal",
  "SAS",
  "Finnair",
  "Brussels Airlines",
  "Qatar Airways",
  "Emirates",
  "flydubai",
  "Etihad Airways",
  "Pegasus Airlines",
  "Norwegian",
  "Transavia",
  "Vueling",
  "Jet2.com",
  "Condor",
  "TUI Airways",
  "Delta Air Lines",
  "United Airlines",
  "American Airlines",
  "Air Canada",
  "EL AL",
  "EgyptAir",
  "Saudia",
  "Singapore Airlines",
  "Cathay Pacific",
  "Japan Airlines",
  "Korean Air",
  "Air China",
  "China Southern Airlines",
  "IndiGo",
] as const;

const inputClass =
  "w-full rounded-[10px] border border-[#DCE4EF] bg-[#FBFCFE] py-[14px] pr-4 text-[15px] font-medium text-[#243047] outline-none placeholder:font-normal placeholder:text-[#9AA7B8] transition focus:border-[#2470EB] focus:bg-white focus:shadow-[0_0_0_3px_rgba(36,112,235,0.09)]";

function getRelativeDate(daysFromToday: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return date.toISOString().slice(0, 10);
}

function stepNumber(step: FlowStep) {
  return step === "checking" ? 2 : step;
}

function FlowProgress({ step, locale }: { step: FlowStep; locale: ClaimFlowLocale }) {
  const current = stepNumber(step);
  const progressItems = flowCopy[locale].progress;

  return (
    <ol className="mt-8 grid grid-cols-3 gap-2 lg:mt-16 lg:block lg:space-y-0">
      {progressItems.map((item, index) => {
        const itemStep = index + 1;
        const isActive = itemStep === current;
        const isComplete = itemStep < current;

        return (
          <li
            key={item}
            className="relative flex min-w-0 flex-col items-center gap-2 text-center lg:min-h-[76px] lg:flex-row lg:items-start lg:gap-4 lg:text-left"
          >
            {index < progressItems.length - 1 ? (
              <span
                aria-hidden="true"
                className={`absolute left-[calc(50%+16px)] right-[calc(-50%+16px)] top-[13px] h-px lg:bottom-0 lg:left-[13px] lg:right-auto lg:top-[26px] lg:h-auto lg:border-l ${
                  isComplete ? "bg-[#2470EB] lg:border-[#2470EB]" : "bg-[#CAD6E7] lg:border-[#CAD6E7]"
                } lg:bg-transparent`}
              />
            ) : null}
            <span
              className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-black ${
                isActive
                  ? "border-[#2470EB] bg-[#2470EB] text-white shadow-[0_0_0_5px_rgba(36,112,235,0.1)]"
                  : isComplete
                    ? "border-[#2470EB] bg-white text-[#2470EB]"
                    : "border-[#B9C9DE] bg-[#EEF3F9] text-[#94A3B8]"
              }`}
            >
              {isComplete ? <CheckCircle2 className="h-4 w-4" /> : itemStep}
            </span>
            <span
              className={`max-w-[115px] text-[11px] font-bold leading-[1.35] lg:max-w-none lg:pt-1 lg:text-sm ${
                isActive || isComplete ? "text-[#173B7A]" : "text-[#9AAAC0]"
              }`}
            >
              {item}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function FocusedFlowShell({
  step,
  locale,
  children,
}: {
  step: FlowStep;
  locale: ClaimFlowLocale;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white text-[#0A0F1E] lg:grid lg:grid-cols-[360px_minmax(0,1fr)]">
      <aside className="relative overflow-hidden border-b border-[#DDE6F1] bg-[#F1F5FA] px-6 py-5 lg:min-h-screen lg:border-b-0 lg:border-r lg:px-12 lg:py-10">
        <div className="relative z-10 mx-auto max-w-[260px] lg:mx-0">
          <BrandLogo href={locale === "en" ? "/en" : "/"} size="lg" balance="compact" />
          <FlowProgress step={step} locale={locale} />
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[330px] lg:block">
          <div className="absolute -bottom-[185px] -left-[125px] h-[430px] w-[360px] rotate-[16deg] rounded-[46%] bg-[#0D5CC5]" />
          <div className="absolute -bottom-[152px] right-[-155px] h-[330px] w-[300px] -rotate-[19deg] rounded-[48%] bg-[#2470EB]" />

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 360 330"
            preserveAspectRatio="none"
          >
            <path
              d="M 18 188 C 112 102 254 98 340 180"
              fill="none"
              stroke="#9CB0CA"
              strokeDasharray="3 5"
              strokeLinecap="round"
              strokeWidth="1"
              opacity="0.7"
            />
            <g transform="translate(112 133.1) rotate(27)">
              <g transform="translate(-13.8 -13.8) scale(1.15)">
                <path
                  d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
                  fill="#FFFFFF"
                />
              </g>
            </g>
          </svg>
        </div>
      </aside>

      <section className="flex min-h-[calc(100vh-190px)] flex-col px-5 pb-12 pt-6 sm:px-8 lg:min-h-screen lg:px-12 lg:pb-16 lg:pt-8">
        <div
          className={`mx-auto flex w-full max-w-[760px] flex-1 items-center ${
            step === 2 ? "lg:-translate-y-3" : ""
          }`}
        >
          <div className="w-full">{children}</div>
        </div>
      </section>
    </main>
  );
}

function ContactField({
  label,
  type,
  value,
  onChange,
  placeholder,
  optional = false,
  optionalLabel,
  autoComplete,
  icon: Icon,
}: {
  label: string;
  type: "text" | "email" | "tel";
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  optional?: boolean;
  optionalLabel: string;
  autoComplete: string;
  icon: typeof UserRound;
}) {
  return (
    <label className="block">
      <span className="mb-[6px] block text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748B]">
        {label} {optional ? <span className="font-medium normal-case text-[#94A3B8]">({optionalLabel})</span> : null}
      </span>
      <span className="relative block">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#9DB1CE]" />
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${inputClass} pl-12`}
        />
      </span>
    </label>
  );
}

function FlightCheckLoader({ locale }: { locale: ClaimFlowLocale }) {
  const t = flowCopy[locale];
  return (
    <div
      className="flex min-h-[430px] flex-col items-center justify-center px-4 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="relative h-[132px] w-[132px]">
        <div className="absolute inset-3 rounded-full border border-dashed border-[#AFC8EE]" />
        <div className="absolute inset-0 motion-safe:animate-[spin_1.25s_linear_infinite] motion-reduce:animate-none">
          <span className="absolute right-[3px] top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#2470EB] text-white shadow-[0_12px_30px_rgba(36,112,235,0.28)]">
            <Plane className="h-5 w-5 rotate-[16deg] fill-white" />
          </span>
        </div>
        <div className="absolute inset-[39px] flex items-center justify-center rounded-full bg-[#EEF5FF]">
          <PlaneTakeoff className="h-7 w-7 text-[#2470EB]" />
        </div>
      </div>
      <h2 className="font-display mt-7 text-[24px] font-bold text-[#102A56] sm:text-[28px]">
        {t.checkingTitle}
      </h2>
      <p className="mt-3 max-w-[410px] text-sm leading-6 text-[#64748B]">
        {t.checkingBody}
      </p>
    </div>
  );
}

function ClaimFlow({
  surface,
  locale,
  initialStep = 1,
  initialIssue = null,
  onStepOneComplete,
}: {
  surface: FormSurface;
  locale: ClaimFlowLocale;
  initialStep?: 1 | 2 | 3;
  initialIssue?: DisruptionValue | null;
  onStepOneComplete?: (issue: DisruptionValue) => void;
}) {
  const t = flowCopy[locale];
  const disruptionGroup = useId();
  const directFlightGroup = useId();
  const departureDateInputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<DisruptionValue | null>(initialIssue);
  const [stepOneError, setStepOneError] = useState(false);
  const [step, setStep] = useState<FlowStep>(initialStep);
  const [departureAirport, setDepartureAirport] = useState("");
  const [destinationAirport, setDestinationAirport] = useState("");
  const [directFlight, setDirectFlight] = useState<DirectFlight>(null);
  const [departureDate, setDepartureDate] = useState("");
  const [airline, setAirline] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formStartedAt] = useState(() => Date.now());

  const isFocused = surface === "focused";
  const stepTwoReady = Boolean(
    departureAirport.trim() &&
      destinationAirport.trim() &&
      directFlight &&
      departureDate &&
      airline,
  );
  const contactReady = Boolean(
    firstName.trim().length >= 2 &&
      lastName.trim().length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
  );

  useEffect(() => {
    if (step !== "checking") {
      return;
    }

    const timer = window.setTimeout(() => setStep(3), 1600);
    return () => window.clearTimeout(timer);
  }, [step]);

  function openDatePicker() {
    const input = departureDateInputRef.current;
    if (!input) {
      return;
    }

    input.focus();
    try {
      input.showPicker?.();
    } catch {
      // Browsers that already opened the native picker do not need a fallback.
    }
  }

  const frameClass = isFocused
    ? "text-[#0A0F1E]"
    : "rounded-[20px] bg-white p-7 text-[#0A0F1E] shadow-[0_26px_88px_rgba(0,0,0,0.26)] sm:p-8";
  const headingClass = isFocused
    ? "font-display text-[28px] font-bold leading-[1.16] sm:text-[34px]"
    : "font-display text-[21px] font-bold leading-[1.22]";
  const sectionClass = isFocused
    ? "rounded-[16px] bg-[#F1F5FA] p-5 sm:p-6"
    : "rounded-[14px] bg-[#F1F4F9] p-4";

  let content: React.ReactNode;

  if (step === 1) {
    content = (
      <div className={frameClass}>
        <div className="mb-6">
          <h1 className={headingClass}>{t.stepOneTitle}</h1>
          {isFocused ? (
            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              {t.stepOneBody}
            </p>
          ) : null}
        </div>

        <div className="space-y-2.5" role="radiogroup" aria-label={t.disruptionAria}>
          {disruptionOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selected === option.value;
            const optionCopy = t.disruption[option.value];

            return (
              <label
                key={option.value}
                className={`flex min-h-[64px] w-full cursor-pointer items-center gap-3 rounded-[11px] border px-4 py-3 text-left transition has-[>input:checked]:border-[#2470EB] has-[>input:checked]:bg-[#F3F7FF] has-[>input:checked]:shadow-[0_0_0_2px_rgba(36,112,235,0.08)] ${
                  isSelected
                    ? "border-[#2470EB] bg-[#F3F7FF] shadow-[0_0_0_2px_rgba(36,112,235,0.08)]"
                    : "border-[#DDE5F0] bg-[#FAFBFD] hover:border-[#BFD3F5] hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name={disruptionGroup}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => {
                    setSelected(option.value);
                    setStepOneError(false);
                  }}
                  className="peer order-3 h-[18px] w-[18px] shrink-0 accent-[#2470EB]"
                />
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full peer-checked:bg-[#2470EB] peer-checked:text-white ${
                    isSelected ? "bg-[#2470EB] text-white" : "bg-[#EDF3FD] text-[#2470EB]"
                  }`}
                >
                  <Icon className="h-[17px] w-[17px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-bold leading-5">{optionCopy.label}</span>
                  {optionCopy.detail ? (
                    <span className="block text-xs leading-5 text-[#7A8494]">{optionCopy.detail}</span>
                  ) : null}
                </span>
              </label>
            );
          })}
        </div>

        {stepOneError ? (
          <p className="mt-3 text-xs font-semibold text-[#C2415D]" role="alert">
            {t.stepOneError}
          </p>
        ) : null}

        <button
          type="button"
          onClick={() => {
            if (!selected) {
              setStepOneError(true);
              return;
            }
            if (onStepOneComplete) {
              onStepOneComplete(selected);
              return;
            }
            setStep(2);
          }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#2470EB] px-4 py-[15px] text-base font-bold text-white transition hover:bg-[#1D5FD0]"
        >
          {t.stepOneCta}
          <ArrowRight className="h-4 w-4" />
        </button>

        <p className="mt-[13px] text-center text-xs leading-[1.5] text-[#7A8494]">
          {t.stepOneNote}
        </p>
      </div>
    );
  } else if (step === 2) {
    content = (
      <div className={frameClass}>
        <div className="mb-6">
          <h1 className={headingClass}>{t.stepTwoTitle}</h1>
        </div>

        <div className="space-y-3">
          <section className={sectionClass}>
            <h2 className="text-[15px] font-bold text-[#173B7A]">{t.routeTitle}</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <AirportCombobox
                locale={locale}
                label={t.departureAirport}
                placeholder={t.departurePlaceholder}
                value={departureAirport}
                onChange={setDepartureAirport}
              />
              <AirportCombobox
                locale={locale}
                label={t.destinationAirport}
                placeholder={t.destinationPlaceholder}
                destination
                value={destinationAirport}
                onChange={setDestinationAirport}
              />
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className="text-[15px] font-bold text-[#173B7A]">{t.directTitle}</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label={t.directAria}>
              {([
                ["direct", t.directYes],
                ["connection", t.directNo],
              ] as const).map(([value, label]) => {
                const isSelected = directFlight === value;

                return (
                  <label
                    key={value}
                    className={`flex min-h-[54px] cursor-pointer items-center gap-2 rounded-[10px] border bg-white px-3 text-left text-sm font-medium transition ${
                      isSelected
                        ? "border-[#2470EB] text-[#243047] shadow-[0_0_0_2px_rgba(36,112,235,0.08)]"
                        : "border-[#D6E0EF] text-[#53627A] hover:border-[#9EC5FE]"
                    }`}
                  >
                    <input
                      type="radio"
                      name={directFlightGroup}
                      value={value}
                      checked={isSelected}
                      onChange={() => setDirectFlight(value)}
                      className="h-4 w-4 shrink-0 accent-[#2470EB]"
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className="text-[15px] font-bold text-[#173B7A]">{t.dateTitle}</h2>
            <label className="mt-3 block">
              <span className="mb-[6px] block text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748B]">
                {t.dateLabel}
              </span>
              <span className="relative block">
                <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#9DB1CE]" />
                <input
                  ref={departureDateInputRef}
                  type="date"
                  value={departureDate}
                  onChange={(event) => setDepartureDate(event.target.value)}
                  onClick={openDatePicker}
                  className={`${inputClass} cursor-pointer pl-12`}
                />
              </span>
            </label>
            <div className="mt-2 flex gap-2">
              {[
                [t.yesterday, -1],
                [t.today, 0],
              ].map(([label, offset]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setDepartureDate(getRelativeDate(Number(offset)))}
                  className="min-w-[86px] rounded-[8px] border border-[#D6E0EF] bg-white px-3 py-2 text-xs font-bold text-[#2470EB] transition hover:border-[#9EC5FE]"
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className="text-[15px] font-bold text-[#173B7A]">{t.airlineTitle}</h2>
            <label className="mt-3 block">
              <span className="mb-[6px] block text-[10px] font-bold uppercase tracking-[0.08em] text-[#64748B]">
                {t.airlineLabel}
              </span>
              <select
                name="airline"
                value={airline}
                onChange={(event) => setAirline(event.target.value)}
                className={`${inputClass} appearance-none pl-4`}
              >
                <option value="">{t.airlinePlaceholder}</option>
                {airlineOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
                <option>{t.otherAirline}</option>
              </select>
            </label>
          </section>
        </div>

        <button
          type="button"
          disabled={!stepTwoReady}
          onClick={() => setStep("checking")}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#2470EB] px-4 py-[15px] text-base font-bold text-white transition enabled:hover:bg-[#1D5FD0] disabled:cursor-not-allowed disabled:opacity-45"
        >
          {t.checkResult}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  } else if (step === "checking") {
    content = (
      <div className={frameClass} aria-busy="true">
        <FlightCheckLoader locale={locale} />
      </div>
    );
  } else {
    content = (
      <div className={frameClass}>
        <div className="overflow-hidden rounded-[16px] border border-[#BDE6CC] bg-white">
          <div className="bg-[#EFFAF3] p-5 sm:p-7">
            <div className="flex items-center gap-3 text-[#168A4B]">
              <CheckCircle2 className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
              <h1 className="font-display text-[30px] font-bold leading-none sm:text-[36px]">
                {t.congratulations}
              </h1>
            </div>
            <p className="font-display mt-4 max-w-[680px] text-balance text-[24px] font-bold leading-[1.18] text-[#123D28] sm:text-[29px]">
              {t.likelyEligible}
            </p>
          </div>
          <div className="border-t border-[#CBE8D5] bg-white p-5 sm:p-7">
            <div className="max-w-[690px] space-y-3 text-[15px] leading-[1.65] text-[#365646]">
              {t.legalParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-5 mt-7 sm:mt-8">
          <h2 className={isFocused ? "font-display text-balance text-[22px] font-bold leading-[1.2] sm:text-[25px]" : headingClass}>
            {t.contactTitle}
          </h2>
        </div>

        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (!contactReady || submitting) {
              return;
            }

            setSubmitting(true);
            setSubmitError("");
            try {
              const response = await fetch("/claim/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  flightNumber: "UNSPECIFIED",
                  flightDate: departureDate,
                  route: `${departureAirport} → ${destinationAirport}; ${airline}; ${directFlight}`,
                  issueType: selected === "delay" ? "delay_3h_plus" : "other",
                  firstName,
                  lastName,
                  email,
                  phone,
                  website: "",
                  formStartedAt: String(formStartedAt),
                  manualReviewOnly: true,
                  locale,
                }),
              });
              const data = (await response.json()) as { ok?: boolean };
              if (!response.ok || !data.ok) {
                throw new Error("claim_submit_failed");
              }
              setSubmitted(true);
              trackEvent("generate_lead", {
                event_category: "claim",
                event_label: "focused_claim_flow",
                form_locale: locale,
              });
            } catch {
              setSubmitError(t.submitError);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <ContactField
              label={t.firstName}
              type="text"
              value={firstName}
              onChange={setFirstName}
              placeholder={t.firstNamePlaceholder}
              optionalLabel={t.optional}
              autoComplete="given-name"
              icon={UserRound}
            />
            <ContactField
              label={t.lastName}
              type="text"
              value={lastName}
              onChange={setLastName}
              placeholder={t.lastNamePlaceholder}
              optionalLabel={t.optional}
              autoComplete="family-name"
              icon={UserRound}
            />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <ContactField
              label={t.email}
              type="email"
              value={email}
              onChange={setEmail}
              placeholder={t.emailPlaceholder}
              optionalLabel={t.optional}
              autoComplete="email"
              icon={Mail}
            />
            <ContactField
              label={t.phone}
              type="tel"
              value={phone}
              onChange={setPhone}
              placeholder={t.phonePlaceholder}
              optional
              optionalLabel={t.optional}
              autoComplete="tel"
              icon={Phone}
            />
          </div>

          <button
            type="submit"
            disabled={!contactReady || submitting || submitted}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#2470EB] px-4 py-[15px] text-base font-bold text-white transition enabled:hover:bg-[#1D5FD0] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {submitting ? t.submitting : t.submit}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {submitted ? (
          <div className="mt-3 rounded-[10px] border border-[#BFD3F5] bg-[#F3F7FF] px-4 py-3 text-center text-xs font-semibold text-[#2456A6]" role="status">
            {t.submitted}
          </div>
        ) : null}

        {submitError ? (
          <div className="mt-3 rounded-[10px] border border-[#F2C5CC] bg-[#FFF5F6] px-4 py-3 text-center text-xs font-semibold text-[#A83F52]" role="alert">
            {submitError}
          </div>
        ) : null}

      </div>
    );
  }

  return isFocused ? <FocusedFlowShell step={step} locale={locale}>{content}</FocusedFlowShell> : content;
}

function HeroCopy() {
  return (
    <div className="max-w-[35.5rem]">
      <h1 className="font-display mb-7 text-[48px] font-bold leading-[1.01] text-white sm:text-[54px] lg:text-[61.2px]">
        <span className="block text-[#2470EB]">Pomeren ili</span>
        <span className="block text-[#2470EB]">otkazan let?</span>
        <span className="block text-[0.92em]">
          Naplatite do 600€, {" "}
          <span className="underline decoration-white decoration-[3px] underline-offset-[5px] sm:decoration-[5px] sm:underline-offset-[8px]">
            zadržite ceo&nbsp;iznos.
          </span>
        </span>
      </h1>

      <p className="mb-9 max-w-[480px] text-[16px] leading-[1.7] text-white/62">
        Druge platforme uzimaju 35–50% Vaše odštete. Mi Vam ne uzimamo ništa — koliko avio-kompanija isplati, toliko Vi dobijate.
      </p>

      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {["Do 600 EUR po putniku", "Bez troškova", "Letovi do 3 godine unazad"].map((item) => (
          <div key={item} className="flex items-center gap-[7px] text-sm font-medium text-white/70">
            <CheckCircle2 className="h-[14px] w-[14px] text-[#2DB87A]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroFlightVisual() {
  return (
    <div aria-hidden="true" className="relative hidden h-[430px] w-[132px] shrink-0 self-center xl:block">
      <div className="absolute -left-[34px] top-[58px] h-[104px] w-[190px] -rotate-[7deg] rounded-[50%] border-t border-dashed border-white/25" />
      <Plane className="absolute -right-[11px] top-[74px] h-[18px] w-[18px] rotate-[18deg] fill-white/85 text-white/85" />

      <div className="absolute bottom-[86px] left-[-5px] w-[112px] -rotate-[7deg] rounded-[13px] border border-white/18 bg-white/[0.09] px-4 py-4 shadow-[0_18px_42px_rgba(0,0,0,0.24)] backdrop-blur-sm">
        <span className="mb-8 block h-2.5 w-2.5 rotate-45 bg-[#2470EB]" />
        <strong className="block font-display text-[25px] leading-none text-white">100%</strong>
        <span className="mt-2 block text-[9px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-white/52">
          naknade ide Vama
        </span>
      </div>

      <div className="absolute bottom-[28px] left-[27px] flex w-[146px] rotate-[7deg] items-center justify-between rounded-[13px] bg-white px-4 py-3.5 text-[#0B1326] shadow-[0_20px_54px_rgba(0,0,0,0.3)]">
        <span>
          <span className="block text-[9px] font-bold uppercase tracking-[0.08em] text-[#7A8494]">do</span>
          <strong className="mt-0.5 block font-display text-[20px] leading-none text-[#2470EB]">600 EUR</strong>
        </span>
        <PlaneTakeoff className="h-4 w-4 text-[#2470EB]" />
      </div>
    </div>
  );
}

export function HeroFormPreview() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#0B1326] pt-16 text-white">
      <div
        className="pointer-events-none absolute -bottom-[260px] -left-[180px] h-[820px] w-[820px] rounded-full blur-[10px]"
        style={{
          background: "radial-gradient(circle, rgba(36,112,235,0.24) 0%, rgba(36,112,235,0.12) 32%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(5,11,24,0.26) 0%, rgba(5,11,24,0.08) 46%, rgba(5,11,24,0.16) 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-[1240px] flex-1 items-center px-6 py-12 md:py-14">
        <div className="grid w-full items-center gap-8 lg:gap-10 xl:grid-cols-[minmax(0,1fr)_120px_520px] xl:gap-5">
          <HeroCopy />
          <HeroFlightVisual />
          <ClaimFlow surface="embedded" locale="sr" />
        </div>
      </div>
    </section>
  );
}

export function HeroFlowStartCard({ locale }: { locale: ClaimFlowLocale }) {
  return (
    <ClaimFlow
      surface="embedded"
      locale={locale}
      onStepOneComplete={(issue) => {
        trackEvent("begin_checkout", {
          event_category: "claim",
          event_label: "hero_card_cta",
          form_locale: locale,
          issue_type: issue,
        });
        const path = locale === "en" ? "/en/check-flight" : "/proveri-let";
        window.location.assign(`${path}?step=2&issue=${encodeURIComponent(issue)}`);
      }}
    />
  );
}

function ComparisonHeader() {
  return (
    <div className="absolute inset-x-0 top-0 z-20 flex h-16 items-center justify-between bg-white px-8">
      <BrandLogo href="/" balance="compact" />
      <span className="inline-flex items-center gap-2 text-xs font-bold text-[#2470EB]">
        <ShieldCheck className="h-4 w-4" />
        Besplatna provera
      </span>
    </div>
  );
}

function ComparisonPanel({ variant }: { variant: HeroFormVariant }) {
  const isFocused = variant === "focused";

  return (
    <section className="min-w-0 overflow-hidden rounded-[18px] border border-[#DCE4EF] bg-white shadow-[0_20px_55px_rgba(15,35,72,0.08)]">
      <div className="flex items-center justify-between border-b border-[#E4EAF2] px-5 py-4">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.12em] text-[#2470EB]">
            Varijanta {isFocused ? "A" : "B"}
          </div>
          <h2 className="font-display mt-1 text-lg font-bold">
            {isFocused ? "Posebna fokus stranica" : "Forma direktno u heroju"}
          </h2>
        </div>
        <Link
          href={isFocused ? "/design/hero-form-a" : "/design/hero-form-b"}
          className="rounded-lg border border-[#BFD3F5] px-3 py-2 text-xs font-bold text-[#2470EB] transition hover:bg-[#F3F7FF]"
        >
          Otvori pun prikaz
        </Link>
      </div>
      <div className="h-[520px] overflow-hidden bg-white">
        <div className="h-[1040px] w-[200%] origin-top-left scale-50">
          {isFocused ? (
            <ClaimFlow surface="focused" locale="sr" />
          ) : (
            <div className="relative">
              <ComparisonHeader />
              <HeroFormPreview />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function HeroFormVariantPage({
  variant,
  locale = "sr",
  initialStep,
  initialIssue,
}: {
  variant: HeroFormVariant;
  locale?: ClaimFlowLocale;
  initialStep?: 1 | 2 | 3;
  initialIssue?: DisruptionValue | null;
}) {
  if (variant === "focused") {
    return (
      <ClaimFlow
        surface="focused"
        locale={locale}
        initialStep={initialStep}
        initialIssue={initialIssue}
      />
    );
  }

  return (
    <main className="min-h-screen bg-white text-[#0A0F1E]">
      <HeroFormPreview />
    </main>
  );
}

export function HeroFormVariants() {
  return (
    <main className="min-h-screen bg-[#F4F6FA] px-4 py-7 text-[#0A0F1E] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-6 text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#2470EB]">
            Lokalno poređenje · isti claim flow
          </div>
          <h1 className="font-display mt-2 text-[30px] font-bold sm:text-[38px]">Dve varijante, paralelno</h1>
          <p className="mx-auto mt-2 max-w-[760px] text-sm leading-6 text-[#64748B]">
            A uklanja ostatak landing stranice i vodi korisnika kroz fokusirani tok. B zadržava postojeći hero i otvara sledeći korak na istom mestu.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <ComparisonPanel variant="focused" />
          <ComparisonPanel variant="embedded" />
        </div>
      </div>
    </main>
  );
}
