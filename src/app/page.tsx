import Link from "next/link";

import { ClaimIntakeForm } from "@/components/claim-intake-form";
import { getSupportEmail } from "@/lib/env";

const steps = [
  {
    title: "Unesete podatke o letu",
    body: "Broj leta, datum, ruta i email su dovoljni da otvorimo slučaj bez nepotrebne papirologije.",
    meta: "30 sekundi",
  },
  {
    title: "Mi proverimo osnov",
    body: "Poređujemo okolnosti leta sa pravilima EU 261 / ECAA i proveravamo da li slučaj deluje održivo za dalje korake.",
    meta: "u roku od 24h",
  },
  {
    title: "Dobijate sledeći korak",
    body: "Ako slučaj deluje obećavajuće, javljamo šta dalje treba pripremiti i da li ima smisla nastaviti proceduru.",
    meta: "250–600 EUR potencijalno",
  },
];

const faq = [
  {
    question: "Da li ovo važi za Srbiju?",
    answer:
      "Da, kroz ECAA okvir prava putnika mogu biti relevantna i za deo letova povezanih sa Srbijom. Konačna procena zavisi od rute, prevoznika i okolnosti konkretnog leta.",
  },
  {
    question: "Da li garantujete odštetu?",
    answer:
      "Ne. U prvoj fazi ne dajemo jaka obećanja. Dajemo konzervativan signal i ručnu proveru kada okolnosti nisu dovoljno jasne.",
  },
  {
    question: "Šta ako je bio loš vremenski uslov ili ATC štrajk?",
    answer:
      "Takve okolnosti često menjaju osnov za naknadu. Zato je naš rezultat inicijalna procena, a ne konačna odluka bez dodatne provere.",
  },
];

export default function HomePage() {
  const supportEmail = getSupportEmail();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "letkasni.rs",
        url: "https://letkasni.rs",
        description:
          "Početna provera moguće avio odštete za putnike iz Srbije.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="bg-[var(--bg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
          <div className="pt-2">
            <p className="eyebrow mb-5">Početna provera prava putnika</p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-[-0.03em] text-[var(--ink)] md:text-6xl">
              Vaš let je kasnio? Možda imate pravo na 250–600 EUR.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              EU Regulativa 261/2004 može biti relevantna i za putnike iz Srbije
              kroz ECAA okvir. Pošaljite osnovne podatke, dobijte početnu
              procenu i jasan sledeći korak pre nego što trošite vreme na
              dopisivanje sa avio-kompanijom.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="surface-panel rounded-3xl p-5">
                <p className="eyebrow mb-2">Potencijalna odšteta</p>
                <p className="text-3xl font-bold tracking-[-0.03em] text-[var(--ink)]">
                  250–600 EUR
                </p>
              </div>
              <div className="surface-panel rounded-3xl p-5">
                <p className="eyebrow mb-2">Prvi odgovor</p>
                <p className="text-3xl font-bold tracking-[-0.03em] text-[var(--ink)]">
                  do 24h
                </p>
              </div>
              <div className="surface-panel rounded-3xl p-5">
                <p className="eyebrow mb-2">Najčešći slučajevi</p>
                <p className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">
                  3h+ kašnjenje i missed connection
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex text-sm font-semibold text-[var(--accent)]"
              >
                Otvori blog i pravni kontekst →
              </Link>
            </div>
          </div>

          <ClaimIntakeForm />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3">Kako radi</p>
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-[var(--ink)] md:text-4xl">
            Kratak put od problema do prve procene
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="surface-card rounded-[28px] p-6">
              <p className="eyebrow mb-4">Korak 0{index + 1}</p>
              <h3 className="text-2xl font-bold tracking-[-0.03em] text-[var(--ink)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {step.body}
              </p>
              <p className="mt-6 text-sm font-semibold text-[var(--accent)]">
                {step.meta}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
          <div className="rounded-[28px] border border-[var(--border)] p-6">
            <p className="eyebrow mb-3">Pravni okvir</p>
            <h3 className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">
              EU 261 / ECAA
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Osnov procene je faktički: ruta, prevoznik, vrsta poremećaja i
              okvir moguće naknade. Bez agresivnih obećanja unapred.
            </p>
          </div>
          <div className="rounded-[28px] border border-[var(--border)] p-6">
            <p className="eyebrow mb-3">Način rada</p>
            <h3 className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">
              Razumna prva procena
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Ako okolnosti nisu dovoljno jasne, ne dajemo lažnu sigurnost.
              Cilj je da brzo razdvojimo obećavajuće slučajeve od onih koji traže
              dodatnu proveru.
            </p>
          </div>
          <div className="rounded-[28px] border border-[var(--border)] p-6">
            <p className="eyebrow mb-3">Šta dobijate</p>
            <h3 className="text-xl font-bold tracking-[-0.03em] text-[var(--ink)]">
              Jasan sledeći korak
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Umesto generičkog kalkulatora, dobijate odgovor da li slučaj deluje
              vredno dalje provere i šta treba pripremiti za nastavak.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="mb-8">
          <p className="eyebrow mb-3">FAQ</p>
          <h2 className="text-3xl font-bold tracking-[-0.03em] text-[var(--ink)] md:text-4xl">
            Najčešća pitanja pre prijave
          </h2>
        </div>

        <div className="space-y-4">
          {faq.map((item) => (
            <details
              key={item.question}
              className="surface-card rounded-[24px] px-6 py-5"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-[var(--ink)]">
                {item.question}
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--muted)]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <footer className="border-t border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>
            letkasni.rs pomaže da brzo proverite da li vaš slučaj deluje vredno
            dalje procedure. Početna procena nije garancija odštete.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="font-medium text-[var(--ink)]">
              Privatnost
            </Link>
            <Link href="/terms" className="font-medium text-[var(--ink)]">
              Uslovi korišćenja
            </Link>
            <a
              href={`mailto:${supportEmail}`}
              className="font-medium text-[var(--ink)]"
            >
              {supportEmail}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
