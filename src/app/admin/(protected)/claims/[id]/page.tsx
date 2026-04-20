import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

import { getClaimById } from "@/lib/claims";
import type { ClaimRecord } from "@/lib/types";

const statusOptions: Array<{
  value: ClaimRecord["operatorStatus"];
  label: string;
}> = [
  { value: "new", label: "Nova prijava" },
  { value: "manual_review", label: "Ručna provera" },
  { value: "awaiting_customer", label: "Čeka putnika" },
  { value: "ready_for_review", label: "Spremno za pregled" },
  { value: "closed", label: "Zatvoreno" },
];

const issueLabel: Record<ClaimRecord["issueType"], string> = {
  delay_3h_plus: "Kašnjenje 3h+",
  missed_connection_same_booking: "Propuštena konekcija",
  denied_boarding: "Odbijen ukrcaj",
  other: "Drugi problem",
};

const providerLabel: Record<ClaimRecord["providerSnapshot"]["status"], string> = {
  live_match: "Live match",
  no_match: "Nema podudaranja",
  provider_unconfigured: "Provider nije podešen",
  timeout: "Timeout",
  error: "Provider greška",
};

type Params = Promise<{ id: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getMessage(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function AdminClaimDetailPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  noStore();
  const params = await props.params;
  const searchParams = await props.searchParams;
  const claim = await getClaimById(params.id);
  const updated = getMessage(searchParams.updated);
  const error = getMessage(searchParams.error);

  if (!claim) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">Claim detail</p>
            <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">
              {claim.flightNumber}
            </h1>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Referenca {claim.id.slice(0, 8).toUpperCase()} • {claim.route}
            </p>
          </div>
          <Link
            href="/admin/claims"
            className="rounded-2xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--panel)]"
          >
            Nazad na queue
          </Link>
        </div>

        {updated === "1" ? (
          <div className="mb-6 rounded-2xl border border-[var(--success-border)] bg-[var(--success-bg)] px-4 py-3 text-sm text-[var(--success-text)]">
            Operator update je sačuvan.
          </div>
        ) : null}

        {error === "invalid_status" ? (
          <div className="mb-6 rounded-2xl border border-[var(--error-border)] bg-[var(--error-bg)] px-4 py-3 text-sm text-[var(--error-text)]">
            Status nije validan i promena nije sačuvana.
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <div className="surface-card rounded-[28px] p-6">
              <h2 className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">
                Sažetak slučaja
              </h2>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <SummaryItem label="Issue" value={issueLabel[claim.issueType]} />
                <SummaryItem label="Provider" value={providerLabel[claim.providerSnapshot.status]} />
                <SummaryItem label="Verdict" value={claim.verdictTitle} />
                <SummaryItem
                  label="Kreirano"
                  value={new Date(claim.createdAt).toLocaleString("sr-RS")}
                />
                <SummaryItem label="Email" value={claim.email} />
                <SummaryItem label="Telefon" value={claim.phone || "Nije ostavljen"} />
              </dl>
              <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--panel)] px-4 py-4 text-sm leading-7 text-[var(--muted)]">
                {claim.verdictBody}
              </div>
            </div>

            <div className="surface-card rounded-[28px] p-6">
              <h2 className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">
                Provider snapshot
              </h2>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <SummaryItem
                  label="Status"
                  value={providerLabel[claim.providerSnapshot.status]}
                />
                <SummaryItem
                  label="Checked at"
                  value={new Date(claim.providerSnapshot.checkedAt).toLocaleString("sr-RS")}
                />
                <SummaryItem
                  label="Timeout"
                  value={`${claim.providerSnapshot.timeoutMs} ms`}
                />
                <SummaryItem
                  label="Normalizovan let"
                  value={claim.providerSnapshot.normalized?.flightNumber ?? "Nema live match-a"}
                />
              </dl>
              {claim.providerSnapshot.message ? (
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {claim.providerSnapshot.message}
                </p>
              ) : null}
            </div>

            <div className="surface-card rounded-[28px] p-6">
              <h2 className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">
                Input snapshot
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <SummaryItem
                  label="Original flight"
                  value={String(claim.originalInputSnapshot?.flightNumber ?? claim.flightNumber)}
                />
                <SummaryItem
                  label="Original route"
                  value={String(claim.originalInputSnapshot?.route ?? claim.route)}
                />
                <SummaryItem
                  label="Normalized flight"
                  value={String(claim.normalizedInputSnapshot?.flightNumber ?? claim.flightNumber)}
                />
                <SummaryItem
                  label="Normalized route"
                  value={String(claim.normalizedInputSnapshot?.route ?? claim.route)}
                />
              </div>
            </div>
          </section>

          <section className="surface-card rounded-[28px] p-6">
            <h2 className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">
              Operator update
            </h2>
            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
              Minimalni workflow za Phase 1: status, sledeći korak i interne beleške.
            </p>

            <form className="mt-6 space-y-4" action={`/admin/claims/${claim.id}/status`} method="post">
              <label className="field">
                <span>Status</span>
                <select name="operatorStatus" defaultValue={claim.operatorStatus}>
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Sledeći korak</span>
                <textarea
                  name="nextAction"
                  defaultValue={claim.nextAction ?? ""}
                  rows={4}
                  className="min-h-28 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_14%,transparent)]"
                />
              </label>

              <label className="field">
                <span>Interne beleške</span>
                <textarea
                  name="operatorNotes"
                  defaultValue={claim.operatorNotes ?? ""}
                  rows={6}
                  className="min-h-40 w-full rounded-2xl border border-[var(--border)] bg-white px-4 py-3 outline-none transition focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_14%,transparent)]"
                />
              </label>

              <button className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[var(--accent)] px-5 py-4 text-base font-semibold text-white transition hover:bg-[var(--accent-hover)]">
                Sačuvaj operator update
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white px-4 py-4">
      <dt className="eyebrow mb-2">{label}</dt>
      <dd className="text-sm font-medium leading-6 text-[var(--ink)]">{value}</dd>
    </div>
  );
}
