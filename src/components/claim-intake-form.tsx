"use client";

import { useMemo, useState } from "react";

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

const issueOptions: Array<{ value: IssueType; label: string }> = [
  { value: "delay_3h_plus", label: "Kašnjenje 3h+" },
  {
    value: "missed_connection_same_booking",
    label: "Propuštena konekcija na istoj rezervaciji",
  },
  { value: "denied_boarding", label: "Odbijen ukrcaj" },
  { value: "other", label: "Drugi problem / ručna procena" },
];

const initialForm = {
  flightNumber: "",
  flightDate: "",
  route: "",
  issueType: "delay_3h_plus" as IssueType,
  email: "",
  phone: "",
  website: "",
};

export function ClaimIntakeForm() {
  const [form, setForm] = useState(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });

  const helperCopy = useMemo(
    () => [
      "Bez rizika. Plaćate samo ako uspemo.",
      "Ako nemate broj leta, unesite rutu ili destinaciju u polje ispod.",
    ],
    [],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState({ status: "submitting" });

    try {
      const response = await fetch("/claim/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
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
              ? "Previše pokušaja u kratkom roku. Sačekajte nekoliko minuta pa pokušajte ponovo."
              : "Nešto nije prošlo kako treba. Pokušajte ponovo ili pošaljite podatke malo kasnije.",
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
    } catch {
      setSubmitState({
        status: "error",
        message:
          "Trenutno ne možemo da završimo proveru. Sačuvajte podatke i pokušajte ponovo za nekoliko minuta.",
      });
    }
  }

  return (
    <div
      id="claim-form"
      className="surface-card rounded-[2.5rem] p-8 md:p-10"
    >
      <div className="mb-6">
        <p className="font-mono-ui mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-brand-muted">
          Claim form
        </p>
        <h2 className="font-display text-2xl font-bold text-brand-text">
          Proveri odštetu odmah
        </h2>
        <p className="mt-2 text-sm leading-6 text-brand-muted">
          Unesite osnovne podatke o letu. Prva provera traje manje od 60 sekundi
          i služi da odmah razdvojimo slučajeve koji deluju obećavajuće.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="field">
            <span>Broj leta</span>
            <input
              required
              value={form.flightNumber}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  flightNumber: event.target.value,
                }))
              }
              placeholder="npr. JU101"
              name="flightNumber"
            />
          </label>

          <label className="field">
            <span>Datum leta</span>
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
            />
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

        <label className="field">
          <span>Ruta ili destinacija</span>
          <input
            required
            value={form.route}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                route: event.target.value,
              }))
            }
            placeholder="npr. BEG → FRA ili Beograd - Frankfurt"
            name="route"
          />
        </label>

        <label className="field">
          <span>Šta se desilo?</span>
          <select
            value={form.issueType}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                issueType: event.target.value as IssueType,
              }))
            }
            name="issueType"
          >
            {issueOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="field">
            <span>Email</span>
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
              placeholder="ime@domen.rs"
              name="email"
            />
          </label>

          <label className="field">
            <span>Telefon (opciono)</span>
            <input
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  phone: event.target.value,
                }))
              }
              placeholder="+381..."
              name="phone"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary py-5 text-lg font-bold text-white shadow-xl shadow-brand-primary/20 transition-all hover:bg-brand-secondary disabled:cursor-not-allowed disabled:opacity-70"
          disabled={submitState.status === "submitting"}
        >
          {submitState.status === "submitting"
            ? "Proveravamo podatke..."
            : "Proveri besplatno"}
          <span className="text-brand-accent">→</span>
        </button>

        <p className="mt-4 text-center text-xs text-brand-muted">
          Provera traje manje od 60 sekundi i potpuno je besplatna.
        </p>

        <div className="grid gap-3 pt-3 sm:grid-cols-2">
          {helperCopy.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-brand-border bg-brand-surface-alt/80 px-4 py-3 text-sm font-medium text-brand-text"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="text-sm leading-6 text-brand-muted">
          <p>
            Slanjem prijave prihvatate osnovnu obradu podataka radi provere
            slučaja. Detalji su na stranicama privatnosti i uslova korišćenja.
          </p>
        </div>
      </form>

      {submitState.status === "error" ? (
        <div className="mt-5 rounded-2xl border border-[var(--error-border)] bg-[var(--error-bg)] px-4 py-3 text-sm text-[var(--error-text)]">
          {submitState.message}
        </div>
      ) : null}

      {submitState.status === "success" ? (
        <div className="mt-5 rounded-3xl border border-[var(--success-border)] bg-[var(--success-bg)] p-5">
          <p className="eyebrow text-[var(--success-text)]">
            {submitState.reused ? "Prijava je već primljena" : "Prijava uspešno primljena"}
          </p>
          <h3 className="font-display mt-2 text-xl font-bold text-[var(--ink)]">
            {submitState.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            {submitState.body}
          </p>
          <p className="mt-4 text-sm font-medium text-[var(--ink)]">
            Referenca: <span className="font-mono">{submitState.reference}</span>
          </p>
        </div>
      ) : null}
    </div>
  );
}
