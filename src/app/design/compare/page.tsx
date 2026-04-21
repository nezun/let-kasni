import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Design Compare | letkasni.rs",
  robots: {
    index: false,
    follow: false,
  },
};

const groups = [
  {
    badge: "Locked finals",
    items: [
      {
        title: "A1 — Conversion Final",
        body: "Najdirektniji landing sa jačim utility ritmom. Ovo je sada i glavni root smer.",
        links: [
          { href: "/design/top", label: "Open A1 root" },
          { href: "/design-lab/a1-final-conversion.html", label: "Raw HTML" },
        ],
      },
      {
        title: "A2 — Proof Final",
        body: "Više gradi poverenje kroz proces, ograničenja i disciplinovan trust model.",
        links: [
          { href: "/design/top-a", label: "Open A2" },
          { href: "/design-lab/a2-final-proof.html", label: "Raw HTML" },
        ],
      },
      {
        title: "A3 — Guided Final",
        body: "Najmirniji flow. Više vodi zbunjenog korisnika kroz problem nego što ga gura u kalkulator osećaj.",
        links: [
          { href: "/design/top-b", label: "Open A3" },
          { href: "/design-lab/a3-final-guided.html", label: "Raw HTML" },
        ],
      },
      {
        title: "A4 — Compact Hero Review",
        body: "Uži form card i strože zaključan hero na 4 reda za fullscreen i šire desktop rezolucije.",
        links: [{ href: "/design/top-c", label: "Open A4" }],
      },
    ],
  },
  {
    badge: "Broader explorations",
    items: [
      {
        title: "Utility Evidence",
        body: "Polished conversion smer sa jačim evidence strip i claims tool osećajem.",
        links: [
          {
            href: "/design-lab/mockup-a-utility-evidence.html",
            label: "Open utility",
          },
        ],
      },
      {
        title: "Editorial Legal",
        body: "Ozbiljniji, mirniji i više paper/legal ton, ali bez potpune kancelarijske estetike.",
        links: [
          {
            href: "/design-lab/mockup-b-editorial-legal.html",
            label: "Open editorial",
          },
        ],
      },
      {
        title: "Ops First",
        body: "Najbliže claims operating system osećaju. Najrizičniji, ali i najdistinktivniji smer.",
        links: [
          {
            href: "/design-lab/mockup-c-ops-first.html",
            label: "Open ops-first",
          },
        ],
      },
    ],
  },
];

export default function ComparePage() {
  return (
    <main className="lk-page dk-board">
      <div className="dk-board-shell">
        <div className="dk-board-header">
          <div className="lk-eyebrow">Design decision board</div>
          <h1>Zaključani i širi Let Kasni pravci na jednom mestu</h1>
          <p>
            Ovo je board za brzo presecanje kad se vratiš. Gore su 3 final-like A
            varijante koje imaju isti DNK. Ispod su 3 šira pravca koji mogu da
            posluže kao referenca ako poželiš još agresivniji utility, editorial
            ili ops ton.
          </p>
        </div>

        {groups.map((group) => (
          <section key={group.badge} className="dk-board-section">
            <div className="dk-board-badge">{group.badge}</div>
            <div className="dk-board-grid">
              {group.items.map((item) => (
                <article key={item.title} className="dk-board-card">
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                  <div className="dk-board-links">
                    {item.links.map((link) => (
                      <Link key={link.href} href={link.href}>
                        {link.label}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
