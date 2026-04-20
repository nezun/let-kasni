import type { Metadata } from "next";

import { getAdminAuthMode } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Login | letkasni.rs",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function getMessage(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function AdminLoginPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const error = getMessage(searchParams.error);
  const mode = getAdminAuthMode();

  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-16">
      <div className="mx-auto max-w-md">
        <div className="surface-card rounded-[28px] p-8">
          <p className="eyebrow mb-3">Minimal admin auth</p>
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-[var(--ink)]">
            Prijava u admin queue
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            {mode === "supabase"
              ? "Supabase Auth je aktivan. Koristi admin korisnika koji postoji u projektu."
              : mode === "local"
                ? "Lokalni fallback auth je aktivan dok ne povežemo Supabase Auth."
                : "Auth još nije konfigurisan. Dodaj env vrednosti iz .env.example da bi login radio."}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Preporučeni policy: Supabase Auth za produkciju, lokalni fallback samo za development i emergency pristup.
          </p>

          <form className="mt-6 space-y-4" action="/admin/session" method="post">
            <label className="field">
              <span>Email</span>
              <input name="email" type="email" required placeholder="admin@letkasni.rs" />
            </label>
            <label className="field">
              <span>Password</span>
              <input name="password" type="password" required placeholder="••••••••" />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[var(--accent)] px-5 py-4 text-base font-semibold text-white transition hover:bg-[var(--accent-hover)]"
            >
              Uđi u admin
            </button>
          </form>

          {mode === "supabase" ? (
            <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
              Ako email recovery link ne radi, proveri Supabase `Authentication → URL Configuration`
              i potvrdi da koristi `http://127.0.0.1:3000` lokalno ili produkcioni domen kada bude deploy.
            </p>
          ) : null}

          {error ? (
            <div className="mt-5 rounded-2xl border border-[var(--error-border)] bg-[var(--error-bg)] px-4 py-3 text-sm text-[var(--error-text)]">
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
