"use client";

import { useMemo, useState } from "react";

import { trackEvent } from "@/lib/analytics";
import type { IssueType } from "@/lib/types";

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
    { value: "delay_3h_plus", label: "Kašnjenje 3h+" },
    {
      value: "missed_connection_same_booking",
      label: "Propuštena konekcija na istoj rezervaciji",
    },
    { value: "denied_boarding", label: "Odbijen ukrcaj" },
    { value: "other", label: "Drugi problem / ručna procena" },
  ],
  en: [
    { value: "delay_3h_plus", label: "Delay 3h+" },
    {
      value: "missed_connection_same_booking",
      label: "Missed connection on the same booking",
    },
    { value: "denied_boarding", label: "Denied boarding" },
    { value: "other", label: "Other problem / manual review" },
  ],
} as const satisfies Record<"sr" | "en", Array<{ value: IssueType; label: string }>>;

const initialForm = {
  flightNumber: "",
  flightDate: "",
  route: "",
  issueType: "delay_3h_plus" as IssueType,
  email: "",
  phone: "",
  website: "",
};

const formCopy = {
  sr: {
    eyebrow: "Claim form",
    title: "Proveri odštetu odmah",
    body: "Unesite osnovne podatke o letu. Prva provera traje manje od 60 sekundi i služi da odmah razdvojimo slučajeve koji deluju obećavajuće.",
    flightNumber: "Broj leta",
    flightPlaceholder: "npr. JU101",
    flightDate: "Datum leta",
    route: "Ruta ili destinacija",
    routePlaceholder: "npr. BEG → FRA ili Beograd - Frankfurt",
    issueType: "Šta se desilo?",
    email: "Email",
    emailPlaceholder: "ime@domen.rs",
    phone: "Telefon (opciono)",
    phonePlaceholder: "+381...",
    buttonIdle: "Proveri besplatno",
    buttonBusy: "Proveravamo podatke...",
    note: "Provera traje manje od 60 sekundi i potpuno je besplatna.",
    helper: [
      "Bez rizika. Plaćate samo ako uspemo.",
      "Ako nemate broj leta, unesite rutu ili destinaciju u polje ispod.",
    ],
    legal:
      "Slanjem prijave prihvatate osnovnu obradu podataka radi provere slučaja. Detalji su na stranicama privatnosti i uslova korišćenja.",
    tooMany:
      "Previše pokušaja u kratkom roku. Sačekajte nekoliko minuta pa pokušajte ponovo.",
    genericError:
      "Nešto nije prošlo kako treba. Pokušajte ponovo ili pošaljite podatke malo kasnije.",
    fallbackError:
      "Trenutno ne možemo da završimo proveru. Sačuvajte podatke i pokušajte ponovo za nekoliko minuta.",
    reused: "Prijava je već primljena",
    success: "Prijava uspešno primljena",
  },
  en: {
    eyebrow: "Claim form",
    title: "Check compensation now",
    body: "Enter the basic flight details. The first pass takes less than 60 seconds and helps separate promising cases quickly.",
    flightNumber: "Flight number",
    flightPlaceholder: "e.g. JU101",
    flightDate: "Flight date",
    route: "Route or destination",
    routePlaceholder: "e.g. BEG → FRA or Belgrade - Frankfurt",
    issueType: "What happened?",
    email: "Email",
    emailPlaceholder: "name@domain.com",
    phone: "Phone (optional)",
    phonePlaceholder: "+381...",
    buttonIdle: "Check for free",
    buttonBusy: "Checking your data...",
    note: "The first check takes less than 60 seconds and is completely free.",
    helper: [
      "No upfront risk. You only pay if the case succeeds.",
      "If you do not have the flight number, enter the route or destination below.",
    ],
    legal:
      "By sending the case, you accept basic data processing for case review. Details are on the privacy and terms pages.",
    tooMany:
      "Too many attempts in a short period. Wait a few minutes and try again.",
    genericError:
      "Something went wrong. Please try again or send the details a bit later.",
    fallbackError:
      "We cannot complete the check right now. Save the details and try again in a few minutes.",
    reused: "This case was already received",
    success: "Case received successfully",
  },
} as const;

export function ClaimIntakeForm({ locale = "sr" }: { locale?: "sr" | "en" }) {
  const [form, setForm] = useState(initialForm);
  const [formStartedAt] = useState(() => Date.now());
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });
  const t = formCopy[locale];
  const helperCopy = useMemo(() => t.helper, [t]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch("/claim/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          formStartedAt: String(formStartedAt),
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
          message:
            response.status === 429
              ? t.tooMany
              : t.genericError,
        });
        return;
      }

      setSubmitState({
        status: "success",
        reused: data.reused,
        title: data.claim.verdictTitle,
        body:
          data.claim.providerStatus === "live_match"
            ? data.claim.verdictBody
            : `${data.claim.verdictBody} Ako okolnosti nisu dovoljno jasne, javljamo vam sledeći korak nakon dodatne provere.`,
        reference: data.claim.id.slice(0, 8).toUpperCase(),
      });

      trackEvent("generate_lead", {
        event_category: "claim",
        event_label: "inline_form",
        form_locale: locale,
        reused: data.reused,
        provider_status: data.claim.providerStatus,
      });
    } catch {
      setSubmitState({
        status: "error",
        message: t.fallbackError,
      });
    }
  }

  return (
    <div id="claim-form" className="lk-form-shell">
      <div className="lk-form-top">
        <div className="lk-form-eyebrow">{t.eyebrow}</div>
        <h2>{t.title}</h2>
        <p>{t.body}</p>
      </div>

      <form className="lk-form-grid" onSubmit={handleSubmit}>
        <label className="lk-form-label">
          <span>{t.flightNumber}</span>
          <input
            required
            value={form.flightNumber}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                flightNumber: event.target.value,
              }))
            }
            placeholder={t.flightPlaceholder}
            name="flightNumber"
            className="lk-control"
          />
        </label>

        <div className="lk-two">
          <label className="lk-form-label">
            <span>{t.flightDate}</span>
            <input
              required
              type="date"
              value={form.flightDate}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  flightDate: event.target.value,
                }))
              }
              name="flightDate"
              className="lk-control"
            />
          </label>

          <label className="lk-form-label">
            <span>{t.issueType}</span>
            <select
              value={form.issueType}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  issueType: event.target.value as IssueType,
                }))
              }
              name="issueType"
              className="lk-control"
            >
              {issueOptions[locale].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <input
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          value={form.website}
          onChange={(event) =>
            setForm((current) => ({
              ...current,
              website: event.target.value,
            }))
          }
          name="website"
        />

        <label className="lk-form-label">
          <span>{t.route}</span>
          <input
            required
            value={form.route}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                route: event.target.value,
              }))
            }
            placeholder={t.routePlaceholder}
            name="route"
            className="lk-control"
          />
        </label>

        <div className="lk-two">
          <label className="lk-form-label">
            <span>{t.email}</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder={t.emailPlaceholder}
              name="email"
              className="lk-control"
            />
          </label>

          <label className="lk-form-label">
            <span>{t.phone}</span>
            <input
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  phone: event.target.value,
                }))
              }
              placeholder={t.phonePlaceholder}
              name="phone"
              className="lk-control"
            />
          </label>
        </div>

        <button
          type="submit"
          className="lk-submit"
          disabled={submitState.status === "submitting"}
        >
          {submitState.status === "submitting" ? t.buttonBusy : t.buttonIdle}
          <span>→</span>
        </button>
      </form>

      <p className="lk-form-note">{t.note}</p>

      <div className="lk-helper-grid">
        {helperCopy.map((item) => (
          <div key={item} className="lk-helper">
            {item}
          </div>
        ))}
      </div>

      <div className="lk-legal">
        <p>{t.legal}</p>
      </div>

      {submitState.status === "error" ? (
        <div className="lk-status-error">{submitState.message}</div>
      ) : null}

      {submitState.status === "success" ? (
        <div className="lk-status-success">
          <p className="lk-status-eyebrow">
            {submitState.reused ? t.reused : t.success}
          </p>
          <h3>{submitState.title}</h3>
          <p>{submitState.body}</p>
          <p className="lk-status-reference">
            Referenca: <span>{submitState.reference}</span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
