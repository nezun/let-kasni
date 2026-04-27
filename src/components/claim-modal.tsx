"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  Plane,
  User,
  X,
} from "lucide-react";

import { trackEvent } from "@/lib/analytics";
import { BrandLogo } from "@/components/brand-logo";
import type { IssueType } from "@/lib/types";

interface ClaimModalProps {
  isOpen: boolean;
  locale?: "sr" | "en";
  seed?: {
    flightNumber?: string;
    flightDate?: string;
    issueType?: IssueType;
  };
  onClose: () => void;
}

type Step = "details" | "contact" | "success";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | {
      status: "success";
      reused: boolean;
      title: string;
      body: string;
      reference: string;
    }
  | { status: "error"; message: string };

const issueOptions = {
  sr: [
    { value: "delay_3h_plus", label: "Kašnjenje više od 3h" },
    {
      value: "missed_connection_same_booking",
      label: "Propuštena konekcija",
    },
    { value: "denied_boarding", label: "Odbijen ukrcaj" },
    { value: "other", label: "Drugi problem / ručna procena" },
  ],
  en: [
    { value: "delay_3h_plus", label: "Delay over 3h" },
    {
      value: "missed_connection_same_booking",
      label: "Missed connection",
    },
    { value: "denied_boarding", label: "Denied boarding" },
    { value: "other", label: "Other issue / manual review" },
  ],
} as const satisfies Record<"sr" | "en", Array<{ value: IssueType; label: string }>>;

const copy = {
  sr: {
    title: "Podnesite zahtev",
    detailsTitle: "Detalji o letu",
    detailsBody: "Unesite osnovne informacije o letu i problemu.",
    contactTitle: "Gde da pošaljemo rezultate?",
    contactBody:
      "Ostavite kontakt kako bismo vam poslali preliminarnu procenu i sledeći korak.",
    flightNumber: "Broj leta",
    flightDate: "Datum leta",
    route: "Ruta ili destinacija",
    routePlaceholder: "npr. BEG - FRA ili Beograd - Frankfurt",
    issueType: "Šta se desilo?",
    firstName: "Ime",
    lastName: "Prezime",
    email: "Email adresa",
    phone: "Telefon (opciono)",
    back: "Nazad",
    next: "Nastavi",
    submit: "Pošalji zahtev",
    submitting: "Šaljemo zahtev...",
    close: "Zatvori",
    successTitle: "Zahtev uspešno primljen",
    successBody:
      "Naš tim će proveriti podatke i poslati vam odgovor sa sledećim korakom.",
    note: "Bez troškova unapred. Plaćate samo ako slučaj uspe.",
    invalid:
      "Popunite obavezna polja pre nastavka. Broj leta, datum i ruta su obavezni.",
    tooMany:
      "Previše pokušaja u kratkom roku. Sačekajte nekoliko minuta pa pokušajte ponovo.",
    genericError:
      "Nešto nije prošlo kako treba. Pokušajte ponovo ili pošaljite podatke malo kasnije.",
    fallbackError:
      "Trenutno ne možemo da završimo proveru. Sačuvajte podatke i pokušajte ponovo za nekoliko minuta.",
    claimLabel: "Broj predmeta",
  },
  en: {
    title: "Submit a claim",
    detailsTitle: "Flight details",
    detailsBody: "Enter the basic information about the flight and disruption.",
    contactTitle: "Where should we send the results?",
    contactBody:
      "Leave your contact details so we can send the preliminary assessment and next step.",
    flightNumber: "Flight number",
    flightDate: "Flight date",
    route: "Route or destination",
    routePlaceholder: "e.g. BEG - FRA or Belgrade - Frankfurt",
    issueType: "What happened?",
    firstName: "First name",
    lastName: "Last name",
    email: "Email address",
    phone: "Phone (optional)",
    back: "Back",
    next: "Continue",
    submit: "Submit claim",
    submitting: "Submitting...",
    close: "Close",
    successTitle: "Claim received",
    successBody:
      "Our team will review the data and send you the next step shortly.",
    note: "No upfront fee. You only pay if the claim succeeds.",
    invalid:
      "Fill the required fields before continuing. Flight number, date and route are required.",
    tooMany:
      "Too many attempts in a short period. Wait a few minutes and try again.",
    genericError:
      "Something went wrong. Please try again or send the details later.",
    fallbackError:
      "We cannot complete the check right now. Save the details and try again in a few minutes.",
    claimLabel: "Reference",
  },
} as const;

const initialState = {
  flightNumber: "",
  flightDate: "",
  route: "",
  issueType: "delay_3h_plus" as IssueType,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  website: "",
};

export function ClaimModal({
  isOpen,
  locale = "sr",
  seed,
  onClose,
}: ClaimModalProps) {
  const t = copy[locale];
  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState(() => ({
    ...initialState,
    flightNumber: seed?.flightNumber?.trim() || "",
    flightDate: seed?.flightDate?.trim() || "",
    issueType: seed?.issueType ?? initialState.issueType,
  }));
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleClose() {
    setStep("details");
    setSubmitState({ status: "idle" });
    setForm({
      ...initialState,
      flightNumber: seed?.flightNumber?.trim() || "",
      flightDate: seed?.flightDate?.trim() || "",
      issueType: seed?.issueType ?? initialState.issueType,
    });
    onClose();
  }

  function updateField(name: keyof typeof initialState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function canAdvance() {
    return (
      form.flightNumber.trim().length > 0 &&
      form.flightDate.trim().length > 0 &&
      form.route.trim().length > 0
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step === "details") {
      if (!canAdvance()) {
        setSubmitState({ status: "error", message: t.invalid });
        return;
      }

      setSubmitState({ status: "idle" });
      setStep("contact");
      return;
    }

    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch("/claim/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flightNumber: form.flightNumber,
          flightDate: form.flightDate,
          route: form.route,
          issueType: form.issueType,
          email: form.email,
          phone: form.phone,
          website: form.website,
        }),
      });

      const data = (await response.json()) as
        | {
            ok: true;
            reused: boolean;
            claim: {
              id: string;
              verdictTitle: string;
              verdictBody: string;
              providerStatus: string;
            };
          }
        | { ok: false; error: string };

      if (!response.ok || !data.ok) {
        setSubmitState({
          status: "error",
          message: response.status === 429 ? t.tooMany : t.genericError,
        });
        return;
      }

      setSubmitState({
        status: "success",
        reused: data.reused,
        title: data.claim.verdictTitle,
        body: data.claim.verdictBody,
        reference: data.claim.id.slice(0, 8).toUpperCase(),
      });
      trackEvent("generate_lead", {
        event_category: "claim",
        event_label: "modal_form",
        form_locale: locale,
        reused: data.reused,
        provider_status: data.claim.providerStatus,
      });
      setStep("success");
    } catch {
      setSubmitState({
        status: "error",
        message: t.fallbackError,
      });
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <button
        aria-label={t.close}
        className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative z-[101] w-full max-w-xl overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div>
              <BrandLogo size="sm" />
              <div className="mt-1 text-sm font-bold text-slate-900">{t.title}</div>
              <div className="text-xs text-slate-500">{t.note}</div>
            </div>
          </div>

          <button
            className="rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step !== "success" ? (
          <div className="h-1 w-full bg-slate-100">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: step === "details" ? "50%" : "100%" }}
            />
          </div>
        ) : null}

        <div className="p-6 sm:p-8">
          {step === "success" ? (
            <div className="space-y-6 py-6 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <div className="space-y-3">
                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  {submitState.status === "success" ? submitState.reused ? t.successTitle : t.successTitle : t.successTitle}
                </h2>
                <p className="text-slate-600">
                  {submitState.status === "success" ? submitState.title : t.successBody}
                </p>
                <p className="text-sm leading-6 text-slate-500">
                  {submitState.status === "success" ? submitState.body : t.successBody}
                </p>
                <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
                  {t.claimLabel}: {submitState.status === "success" ? submitState.reference : "----"}
                </div>
              </div>
              <button
                className="w-full rounded-2xl bg-slate-900 px-6 py-4 font-bold text-white transition hover:bg-slate-800"
                onClick={handleClose}
              >
                {t.close}
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-black tracking-tight text-slate-900">
                  {step === "details" ? t.detailsTitle : t.contactTitle}
                </h2>
                <p className="text-sm text-slate-500">
                  {step === "details" ? t.detailsBody : t.contactBody}
                </p>
              </div>

              {step === "details" ? (
                <div className="space-y-4">
                  <label className="block space-y-2">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Plane className="h-4 w-4" /> {t.flightNumber}
                    </span>
                    <input
                      required
                      value={form.flightNumber}
                      onChange={(event) =>
                        updateField("flightNumber", event.target.value)
                      }
                      placeholder="JU101"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Calendar className="h-4 w-4" /> {t.flightDate}
                    </span>
                    <input
                      required
                      type="date"
                      value={form.flightDate}
                      onChange={(event) =>
                        updateField("flightDate", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Plane className="h-4 w-4" /> {t.route}
                    </span>
                    <input
                      required
                      value={form.route}
                      onChange={(event) => updateField("route", event.target.value)}
                      placeholder={t.routePlaceholder}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <AlertCircle className="h-4 w-4" /> {t.issueType}
                    </span>
                    <select
                      value={form.issueType}
                      onChange={(event) =>
                        updateField("issueType", event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                    >
                      {issueOptions[locale].map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block space-y-2">
                      <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <User className="h-4 w-4" /> {t.firstName}
                      </span>
                      <input
                        required
                        value={form.firstName}
                        onChange={(event) =>
                          updateField("firstName", event.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                      />
                    </label>

                    <label className="block space-y-2">
                      <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <User className="h-4 w-4" /> {t.lastName}
                      </span>
                      <input
                        required
                        value={form.lastName}
                        onChange={(event) =>
                          updateField("lastName", event.target.value)
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                      />
                    </label>
                  </div>

                  <label className="block space-y-2">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Mail className="h-4 w-4" /> {t.email}
                    </span>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <Phone className="h-4 w-4" /> {t.phone}
                    </span>
                    <input
                      value={form.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
                    />
                  </label>
                </div>
              )}

              <input
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                value={form.website}
                onChange={(event) => updateField("website", event.target.value)}
                name="website"
              />

              {submitState.status === "error" ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitState.message}
                </div>
              ) : null}

              <div className="flex gap-3 pt-2">
                {step === "contact" ? (
                  <button
                    type="button"
                    onClick={() => {
                      setStep("details");
                      setSubmitState({ status: "idle" });
                    }}
                    className="flex-1 rounded-2xl border border-slate-200 px-5 py-4 font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    {t.back}
                  </button>
                ) : null}

                <button
                  type="submit"
                  disabled={submitState.status === "submitting"}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitState.status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.submitting}
                    </>
                  ) : step === "details" ? (
                    t.next
                  ) : (
                    t.submit
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
