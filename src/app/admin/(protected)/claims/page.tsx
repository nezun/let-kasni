import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

import { getAdminSession } from "@/lib/auth";
import { listClaims } from "@/lib/claims";
import type { ClaimRecord } from "@/lib/types";

const statusLabel = {
  new: "Nova prijava",
  manual_review: "Ručna provera",
  awaiting_customer: "Čeka putnika",
  ready_for_review: "Spremno za pregled",
  closed: "Zatvoreno",
} as const;

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

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  status?: ClaimRecord["operatorStatus"];
  provider?: ClaimRecord["providerSnapshot"]["status"];
  verdict?: ClaimRecord["verdict"];
  q?: string;
}>;

export default async function AdminClaimsPage(props: { searchParams: SearchParams }) {
  noStore();
  const claims = await listClaims();
  const searchParams = await props.searchParams;
  const session = await getAdminSession();
  const selectedStatus = searchParams.status;
  const selectedProvider = searchParams.provider;
  const selectedVerdict = searchParams.verdict;
  const query = typeof searchParams.q === "string" ? searchParams.q.trim().toLowerCase() : "";
  const filteredClaims = claims.filter((claim) => {
    if (selectedStatus && claim.operatorStatus !== selectedStatus) {
      return false;
    }

    if (selectedProvider && claim.providerSnapshot.status !== selectedProvider) {
      return false;
    }

    if (selectedVerdict && claim.verdict !== selectedVerdict) {
      return false;
    }

    if (query) {
      const haystack = [
        claim.flightNumber,
        claim.route,
        claim.email,
        claim.phone ?? "",
        claim.verdictTitle,
        claim.nextAction ?? "",
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) {
        return false;
      }
    }

    return true;
  });

  const summary = {
    total: claims.length,
    manualReview: claims.filter((claim) => claim.operatorStatus === "manual_review").length,
    awaitingCustomer: claims.filter((claim) => claim.operatorStatus === "awaiting_customer").length,
    liveMatches: claims.filter((claim) => claim.providerSnapshot.status === "live_match").length,
  };

  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Phase 1 internal queue</p>
            <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">
              Admin claims queue
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">
              Queue je sada zaštićen minimalnim auth slojem i spreman da pređe na
              Supabase persistence bez promene URL strukture.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="surface-panel rounded-2xl px-4 py-3 text-sm text-[var(--muted)]">
              Prijavljen:{" "}
              <span className="font-semibold text-[var(--ink)]">
                {session?.email ?? "unknown"}
              </span>
            </div>
            <form action="/admin/logout" method="post">
              <button className="rounded-2xl border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--panel)]">
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <SummaryCard label="Ukupno prijava" value={String(summary.total)} />
          <SummaryCard label="Ručna provera" value={String(summary.manualReview)} />
          <SummaryCard label="Čeka putnika" value={String(summary.awaitingCustomer)} />
          <SummaryCard label="Live match" value={String(summary.liveMatches)} />
        </div>

        <div className="mb-6 surface-panel rounded-[28px] p-4">
          <form className="grid gap-4 md:grid-cols-5" method="get">
            <label className="field">
              <span>Pretraga</span>
              <input
                name="q"
                defaultValue={query}
                placeholder="JU505, FRA, email..."
              />
            </label>
            <label className="field">
              <span>Status</span>
              <select name="status" defaultValue={selectedStatus ?? ""}>
                <option value="">Svi statusi</option>
                {Object.entries(statusLabel).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Provider</span>
              <select name="provider" defaultValue={selectedProvider ?? ""}>
                <option value="">Svi provider ishodi</option>
                {Object.entries(providerLabel).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Verdict</span>
              <select name="verdict" defaultValue={selectedVerdict ?? ""}>
                <option value="">Svi verdict-i</option>
                <option value="likely_eligible">Verovatno održiv</option>
                <option value="needs_manual_review">Ručna provera</option>
                <option value="not_supported_yet">Nije podržano još</option>
              </select>
            </label>

            <div className="flex items-end gap-3 md:col-span-2">
              <button className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)]">
                Primeni filtere
              </button>
              <Link
                href="/admin/claims"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--panel)]"
              >
                Reset
              </Link>
            </div>
          </form>
        </div>

        {filteredClaims.length === 0 ? (
          <div className="surface-card rounded-[28px] p-8 text-sm leading-6 text-[var(--muted)]">
            Nema prijava za izabrane filtere. Kada public intake pošalje claim,
            ovde će biti prikazan queue sa operator statusom, snapshot podacima i
            sledećom akcijom.
          </div>
        ) : (
          <div className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-white">
            <table className="min-w-full divide-y divide-[var(--border)] text-left text-sm">
              <thead className="bg-[var(--panel)] text-[var(--muted)]">
                <tr>
                  <th className="px-5 py-4 font-medium">Flight</th>
                  <th className="px-5 py-4 font-medium">Route</th>
                  <th className="px-5 py-4 font-medium">Issue</th>
                  <th className="px-5 py-4 font-medium">Provider</th>
                  <th className="px-5 py-4 font-medium">Verdict</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredClaims.map((claim) => (
                  <tr key={claim.id}>
                    <td className="px-5 py-4 font-semibold text-[var(--ink)]">
                      <Link
                        href={`/admin/claims/${claim.id}`}
                        className="transition hover:text-[var(--accent)]"
                      >
                        {claim.flightNumber}
                      </Link>
                      <div className="mt-1 text-xs font-normal text-[var(--muted)]">
                        {claim.email}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[var(--muted)]">{claim.route}</td>
                    <td className="px-5 py-4 text-[var(--muted)]">
                      {issueLabel[claim.issueType]}
                    </td>
                    <td className="px-5 py-4 text-[var(--muted)]">
                      {providerLabel[claim.providerSnapshot.status]}
                    </td>
                    <td className="px-5 py-4 text-[var(--ink)]">
                      <div className="font-medium">{claim.verdictTitle}</div>
                      <div className="mt-1 text-xs text-[var(--muted)]">
                        {claim.nextAction}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeClass(
                          claim.operatorStatus,
                        )}`}
                      >
                        {statusLabel[claim.operatorStatus]}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[var(--muted)]">
                      {new Date(claim.createdAt).toLocaleString("sr-RS")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="surface-panel rounded-2xl px-4 py-4">
      <p className="eyebrow mb-2">{label}</p>
      <p className="text-3xl font-bold tracking-[-0.03em] text-[var(--ink)]">
        {value}
      </p>
    </div>
  );
}

function getStatusBadgeClass(status: ClaimRecord["operatorStatus"]) {
  switch (status) {
    case "new":
      return "bg-[var(--panel)] text-[var(--ink)]";
    case "manual_review":
      return "bg-amber-100 text-amber-800";
    case "awaiting_customer":
      return "bg-sky-100 text-sky-800";
    case "ready_for_review":
      return "bg-emerald-100 text-emerald-800";
    case "closed":
      return "bg-stone-200 text-stone-700";
  }
}
