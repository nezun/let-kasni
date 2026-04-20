import Link from "next/link";

import { getSupportEmail } from "@/lib/env";

export default function TermsPage() {
  const supportEmail = getSupportEmail();

  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">
          Uslovi korišćenja
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-[var(--muted)]">
          <p>
            letkasni.rs u Phase 1 režimu pruža inicijalnu procenu i handoff servis,
            ne automatsku pravnu odluku niti garantovanu isplatu odštete.
          </p>
          <p>
            Rezultat prikazan nakon prijave je konzervativan signal zasnovan na
            dostupnim podacima i internim guardrail pravilima. Konačna procena zavisi
            od okolnosti konkretnog leta i eventualne dodatne dokumentacije.
          </p>
          <p>
            Slanjem prijave potvrđuješ da su uneti podaci tačni koliko ti je poznato
            i da smeju biti korišćeni za proveru slučaja i dalji operativni kontakt.
          </p>
          <p>
            Servis zadržava pravo da slučaj prebaci na ručnu proveru kada provider
            podaci nisu dovoljni, kada postoje vanredne okolnosti ili kada problem ne
            ulazi u automatski podržan scope prve faze.
          </p>
          <p>
            Za operativna pitanja i kontakt u vezi sa prijavom koristi se adresa{" "}
            <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>.
          </p>
        </div>
        <Link
          href="/"
          className="mt-10 inline-flex text-sm font-semibold text-[var(--accent)]"
        >
          Vrati se na početnu →
        </Link>
      </div>
    </main>
  );
}
