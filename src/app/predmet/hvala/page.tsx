import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hvala | letkasni.rs",
  robots: { index: false, follow: false, nocache: true },
};

/** signNow vraća klijenta ovde posle potpisa (redirect_uri iz scripts/potpis/signnow.mjs). */
export default function PotpisHvalaPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-xl rounded-2xl border border-[var(--border)] bg-white p-8">
        <p className="eyebrow mb-2">letkasni.rs</p>
        <h1 className="text-2xl font-bold tracking-[-0.02em] text-[var(--ink)]">Hvala Vam</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Ako ste potpisali ugovor, primili smo ga. Potvrdu i potpisan primerak dobijate mejlom. Od ovog trenutka
          komunikaciju sa avio-kompanijom preuzimamo mi, a o toku postupka ćemo Vas obaveštavati.
        </p>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Ako ste zatvorili potpisivanje pre kraja, vratite se na link iz našeg mejla i nastavite. Za pitanja: kontakt@letkasni.rs
        </p>
      </div>
    </main>
  );
}
