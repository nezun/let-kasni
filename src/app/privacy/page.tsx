import Link from "next/link";

import { getSupportEmail } from "@/lib/env";

export default function PrivacyPage() {
  const supportEmail = getSupportEmail();

  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">
          Politika privatnosti
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-[var(--muted)]">
          <p>
            letkasni.rs prikuplja samo podatke potrebne za inicijalnu proveru
            potencijalnog claim-a: broj leta, datum leta, ruta, tip problema i
            kontakt podatke.
          </p>
          <p>
            Podaci se koriste isključivo radi procene da li slučaj ima osnov za
            dalji postupak i za eventualni kontakt sa putnikom oko sledećih koraka.
          </p>
          <p>
            U ovoj fazi ne tražimo nepotrebnu dokumentaciju. Ako slučaj deluje
            održivo, dodatni podaci mogu biti traženi naknadno kroz ručni follow-up.
          </p>
          <p>
            Ako ne želiš da tvoji podaci ostanu u sistemu, zahtev za brisanje može
            biti poslat na <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>.
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
