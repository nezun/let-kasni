import Link from "next/link";

import { ClaimIntakeForm } from "@/components/claim-intake-form";
import { getSupportEmail } from "@/lib/env";

const steps = [
  {
    index: "01",
    title: "Unesete podatke",
    body: "Broj leta i datum su dovoljni za prvi pregled. Ne krećete kroz formular koji deluje kao pravna prijava.",
  },
  {
    index: "02",
    title: "Proveravamo osnov",
    body: "Gledamo rutu, vrstu poremećaja i regulatorni okvir da bismo procenili da li slučaj uopšte deluje vredno daljih koraka.",
  },
  {
    index: "03",
    title: "Dobijate sledeći korak",
    body: "Ako slučaj deluje obećavajuće, dobijate jasan odgovor šta dalje treba pripremiti i da li ima smisla nastaviti proceduru.",
  },
];

const valueCards = [
  {
    eyebrow: "Brza prva procena",
    title: "Ne gubite vreme na nagađanje",
    body: "Prvi odgovor treba da vam kaže da li slučaj deluje ozbiljno, a ne da vas zatrpa pravnim frazama.",
  },
  {
    eyebrow: "Manje magle",
    title: "Jasan signal pre daljih koraka",
    body: "Pre nego što skupljate dokumentaciju i pišete airline-u, dobijate realniji osećaj da li slučaj uopšte ima osnov.",
  },
];

const faq = [
  {
    question: "Koliko mogu da dobijem?",
    answer:
      "Iznos obično zavisi od dužine leta i regulatornog okvira, najčešće između 250€ i 600€ po putniku.",
  },
  {
    question: "Da li ovo važi za Srbiju?",
    answer:
      "Može da važi kroz ECAA okvir i zavisi od rute, prevoznika i konkretnih okolnosti poremećaja leta.",
  },
  {
    question: "Da li garantujete odštetu?",
    answer:
      "Ne. Prvi korak je procena da li slučaj deluje održivo. Garancije unapred nisu ozbiljan signal.",
  },
  {
    question: "Šta ako je razlog bio vreme ili ATC štrajk?",
    answer:
      "Takve okolnosti često menjaju osnov za naknadu. Zato je prvi odgovor procena, ne automatsko obećanje.",
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
    <main className="bg-brand-canvas text-brand-text">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-mesh relative overflow-hidden pb-20 pt-28 md:pb-36 md:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-12%] top-[-8%] h-[34rem] w-[34rem] rounded-full bg-brand-primary/8 blur-[120px]" />
          <div className="absolute right-[-8%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-brand-accent/8 blur-[110px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-primary text-lg font-black text-white shadow-lg shadow-brand-primary/15">
                ✈
              </div>
              <div className="font-display text-2xl font-extrabold tracking-tight text-brand-primary">
                letkasni<span className="text-brand-accent">.rs</span>
              </div>
            </div>
            <div className="hidden items-center gap-8 text-sm font-medium text-brand-text md:flex">
              <a href="#kako-radi" className="transition-colors hover:text-brand-primary">
                Kako radi
              </a>
              <a href="#prednosti" className="transition-colors hover:text-brand-primary">
                Prednosti
              </a>
              <a href="#faq" className="transition-colors hover:text-brand-primary">
                FAQ
              </a>
              <Link href="/blog" className="transition-colors hover:text-brand-primary">
                Blog
              </Link>
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-brand-accent/25 bg-gradient-to-r from-brand-accent/18 to-brand-accent/5 px-4 py-2 shadow-sm shadow-brand-accent/10">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-accent shadow-[0_0_18px_rgba(245,130,42,0.65)]" />
                <span className="font-mono-ui text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
                  Prvi srpski servis za naplatu avio-odštete
                </span>
              </div>

              <h1 className="font-display mb-6 text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-brand-text md:text-7xl">
                Vaš let je kasnio?
                <br />
                <span className="text-brand-primary">Naplatite do 600€</span>
                <br />
                odštete.
              </h1>

              <p className="mb-6 max-w-xl text-xl leading-relaxed text-brand-muted">
                Proverite da li vaš let ispunjava uslove prema EU 261 pravilima
                za putnike iz Srbije. Unosite osnovne podatke, a odgovor dobijate
                bez komplikacije.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm font-medium text-brand-muted">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--accent-success)]">✓</span>
                  EU 261 regulativa
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--accent-success)]">✓</span>
                  Bez troškova unapred
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.75rem] border border-brand-border/80 bg-white/78 px-5 py-4 shadow-[0_16px_40px_rgba(45,78,207,0.08)] backdrop-blur-sm">
                  <div className="font-mono-ui text-[11px] uppercase tracking-[0.2em] text-brand-primary/65">
                    po putniku
                  </div>
                  <div className="font-display mt-2 text-2xl font-extrabold text-brand-text">
                    do 600€
                  </div>
                </div>
                <div className="rounded-[1.75rem] border border-brand-border/80 bg-white/78 px-5 py-4 shadow-[0_16px_40px_rgba(45,78,207,0.08)] backdrop-blur-sm">
                  <div className="font-mono-ui text-[11px] uppercase tracking-[0.2em] text-brand-primary/65">
                    za prvu proveru
                  </div>
                  <div className="font-display mt-2 text-2xl font-extrabold text-brand-text">
                    &lt; 60s
                  </div>
                </div>
                <div className="rounded-[1.75rem] border border-brand-border/80 bg-white/78 px-5 py-4 shadow-[0_16px_40px_rgba(45,78,207,0.08)] backdrop-blur-sm">
                  <div className="font-mono-ui text-[11px] uppercase tracking-[0.2em] text-brand-primary/65">
                    za sledeći odgovor
                  </div>
                  <div className="font-display mt-2 text-2xl font-extrabold text-brand-text">
                    24h
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-brand-primary/10 blur-3xl" />
              <div className="absolute -left-6 top-8 hidden w-40 rounded-[1.75rem] border border-white/60 bg-white/88 p-4 shadow-[0_20px_40px_rgba(31,41,55,0.12)] backdrop-blur-md lg:block">
                <div className="font-mono-ui text-[10px] uppercase tracking-[0.18em] text-brand-primary/70">
                  EU 261
                </div>
                <div className="mt-2 text-sm font-semibold leading-snug text-brand-text">
                  Osnova za proveru slučaja
                </div>
              </div>
              <div className="absolute -bottom-6 right-6 hidden w-52 rounded-[1.75rem] border border-brand-border/80 bg-brand-surface px-5 py-4 shadow-[0_24px_50px_rgba(45,78,207,0.12)] lg:block">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-text">
                  <span className="text-brand-primary">→</span>
                  Prvi pregled bez papirologije
                </div>
                <p className="text-sm leading-relaxed text-brand-muted">
                  Jasan sledeći korak ako slučaj deluje održivo.
                </p>
              </div>

              <ClaimIntakeForm />
            </div>
          </div>
        </div>
      </section>

      <section
        id="kako-radi"
        className="section-dark relative overflow-hidden py-28 text-white"
      >
        <div className="pointer-events-none absolute right-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-brand-primary/20 blur-[120px]" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mx-auto mb-20 max-w-2xl text-center">
            <h2 className="font-display mb-6 text-4xl font-black tracking-tight md:text-5xl">
              Tri koraka do vaše odštete
            </h2>
            <p className="text-lg text-white/70">
              Zaboravite na birokratiju. Prvi prolaz kroz slučaj mora da bude
              brz, čitljiv i bez pravljenja lažne sigurnosti.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.title} className="relative">
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/18 bg-white text-3xl shadow-[0_14px_32px_rgba(15,23,42,0.22)]">
                  <span className="text-brand-accent">↗</span>
                </div>
                <h3 className="font-display mb-4 flex items-center gap-4 text-2xl font-bold">
                  <span className="text-brand-accent text-4xl font-black drop-shadow-[0_4px_18px_rgba(245,130,42,0.25)]">
                    {step.index}
                  </span>
                  {step.title}
                </h3>
                <p className="text-lg leading-relaxed text-white/78">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="prednosti"
        className="bg-brand-surface relative overflow-hidden py-28"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <h2 className="font-display mb-6 text-4xl font-black tracking-tight text-brand-text md:text-5xl">
              Zašto putnici koriste{" "}
              <span className="text-brand-primary underline decoration-brand-accent/30 underline-offset-8">
                letkasni.rs
              </span>
              ?
            </h2>
            <p className="text-lg text-brand-muted">
              Zato što prvi korak mora da bude brz i jasan. Ne obećavamo previše.
              Prvo proveravamo da li slučaj zaista ima osnova.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div
              className="group relative overflow-hidden rounded-[2.5rem] p-10 text-white shadow-2xl shadow-brand-primary/20 lg:col-span-2 md:p-12"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
              }}
            >
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-colors group-hover:bg-white/20" />
              <div className="relative z-10">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-2xl backdrop-blur-md">
                  ✓
                </div>
                <h3 className="font-display mb-4 text-3xl font-bold">
                  Jasan pregled slučaja pre daljih koraka
                </h3>
                <p className="max-w-xl text-lg leading-relaxed text-white/80">
                  Ne krećete naslepo. Prvo dobijate procenu da li let, kašnjenje
                  i okolnosti uopšte daju smislen osnov za naknadu i šta je
                  sledeći korak.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {valueCards.map((card) => (
                <div
                  key={card.title}
                  className="group relative overflow-hidden rounded-[2.5rem] p-10 surface-card"
                >
                  <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-brand-accent/10 transition-transform group-hover:scale-110" />
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-accent/14 text-2xl transition-transform group-hover:rotate-12">
                      →
                    </div>
                    <div className="font-mono-ui mb-3 text-[11px] uppercase tracking-[0.18em] text-brand-muted">
                      {card.eyebrow}
                    </div>
                    <h4 className="font-display mb-3 text-xl font-bold text-brand-text">
                      {card.title}
                    </h4>
                    <p className="leading-relaxed text-brand-muted">
                      {card.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="border-t border-brand-border bg-brand-canvas py-28"
      >
        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold text-brand-text md:text-4xl">
              Česta pitanja
            </h2>
            <p className="text-brand-muted">
              Sve što treba da znate pre nego što pošaljete slučaj.
            </p>
          </div>

          <div className="space-y-4">
            {faq.map((item) => (
              <details
                key={item.question}
                className="surface-card group overflow-hidden rounded-2xl"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 text-lg font-bold text-brand-text">
                  {item.question}
                  <span className="text-brand-accent transition-transform group-open:rotate-90">
                    ›
                  </span>
                </summary>
                <div className="px-6 pb-6 leading-relaxed text-brand-muted">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div
            className="relative overflow-hidden rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-brand-primary/20 md:p-20"
            style={{
              background:
                "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
            }}
          >
            <div className="absolute right-0 top-0 h-36 w-36 rounded-bl-[3rem] bg-brand-accent opacity-35" />
            <div className="relative z-10 mx-auto max-w-3xl">
              <h2 className="font-display mb-8 text-4xl font-extrabold md:text-6xl">
                Ne dozvolite da vaš novac ostane kod njih.
              </h2>
              <p className="mb-12 text-xl text-white/80">
                Provera traje manje od minuta. Ništa ne gubite, a možete dobiti
                jasan odgovor da li slučaj ima smisla.
              </p>
              <a
                href="#claim-form"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-10 py-5 text-xl font-bold text-brand-primary shadow-xl shadow-black/10 transition-all hover:bg-white/92"
              >
                Započni proveru sada
                <span className="text-brand-accent">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="section-dark py-20 text-[#b9c2ca]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-primary text-lg font-black text-white">
                  ✈
                </div>
                <span className="font-display text-2xl font-extrabold tracking-tight text-white">
                  letkasni<span className="text-brand-accent">.rs</span>
                </span>
              </div>
              <p className="max-w-sm">
                Prvi srpski servis fokusiran na početnu proveru prava putnika u
                avio-saobraćaju i smislen sledeći korak.
              </p>
            </div>

            <div>
              <h4 className="mb-6 font-bold text-white">Linkovi</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#kako-radi" className="transition-colors hover:text-white">
                    Kako radi
                  </a>
                </li>
                <li>
                  <a href="#prednosti" className="transition-colors hover:text-white">
                    Prednosti
                  </a>
                </li>
                <li>
                  <Link href="/blog" className="transition-colors hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 font-bold text-white">Pravne informacije</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/terms" className="transition-colors hover:text-white">
                    Uslovi korišćenja
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition-colors hover:text-white">
                    Politika privatnosti
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${supportEmail}`}
                    className="transition-colors hover:text-white"
                  >
                    {supportEmail}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
