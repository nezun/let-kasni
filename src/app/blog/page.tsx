import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | letkasni.rs",
  robots: {
    index: false,
    follow: false,
  },
};

const articles = [
  {
    title: "Kada kašnjenje leta može da znači pravo na odštetu",
    summary:
      "Kratko objašnjenje gde prestaje frustracija, a počinje slučaj koji vredi proveriti kroz EU 261 / ECAA okvir.",
  },
  {
    title: "Šta je missed connection na istoj rezervaciji",
    summary:
      "Zašto propuštena konekcija nije isto što i običan loš transfer plan i kada ima smisla otvoriti claim.",
  },
  {
    title: "Kada vanredne okolnosti obaraju claim",
    summary:
      "Loše vreme, ATC i drugi tipični razlozi zbog kojih konzervativni verdict mora da ostane oprezan.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow mb-3">Editorial shell</p>
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)] md:text-5xl">
            Blog i prava putnika
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--muted)]">
            Ovo je minimalni editorial foundation iz plana. Nije fokus Phase 1
            distribucije, ali postoji da podrži kredibilitet i kasniji SEO sloj bez
            nove migracije.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title} className="surface-card rounded-[28px] p-6">
              <p className="eyebrow mb-4">Draft topic</p>
              <h2 className="text-2xl font-bold tracking-[-0.03em] text-[var(--ink)]">
                {article.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {article.summary}
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex text-sm font-semibold text-[var(--accent)]"
              >
                Vrati se na claim intake →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 flex gap-4 text-sm font-semibold text-[var(--accent)]">
          <Link href="/privacy">Privatnost</Link>
          <Link href="/terms">Uslovi korišćenja</Link>
        </div>
      </div>
    </main>
  );
}
