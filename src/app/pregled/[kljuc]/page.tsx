import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

import { PregledPredmeta } from "@/components/pregled/pregled-predmeta";
import { ucitajIndeks } from "@/lib/pregled/izvor";
import { proveriKljucPregleda } from "@/lib/pregled/pristup";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pregled predmeta | letkasni.rs",
  robots: { index: false, follow: false, nocache: true },
};

type Params = Promise<{ kljuc: string }>;

function beogradskiDelovi(date: Date) {
  const delovi = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Belgrade",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const deo = (tip: Intl.DateTimeFormatPartTypes) => delovi.find((d) => d.type === tip)?.value ?? "";
  return { godina: deo("year"), mesec: deo("month"), dan: deo("day"), sat: deo("hour"), minut: deo("minute") };
}

export default async function PregledPredmetaPage(props: { params: Params }) {
  noStore();
  const { kljuc } = await props.params;
  const pristup = proveriKljucPregleda(kljuc);

  if (!pristup) {
    notFound();
  }

  const rezultat = await ucitajIndeks();
  const sada = beogradskiDelovi(new Date());
  const danas = `${sada.godina}-${sada.mesec}-${sada.dan}`;

  if (!rezultat.ok) {
    return (
      <main className="min-h-screen bg-[var(--bg)] px-6 py-16">
        <div className="mx-auto max-w-xl rounded-2xl border border-[var(--border)] bg-white p-8">
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-[var(--ink)]">Pregled predmeta</h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{rezultat.razlog}</p>
        </div>
      </main>
    );
  }

  const g = beogradskiDelovi(new Date(rezultat.indeks.generisano));
  const generisano = `${g.dan}.${g.mesec}.${g.godina}. u ${g.sat}:${g.minut}`;
  const s = rezultat.indeks.sistem ? beogradskiDelovi(new Date(rezultat.indeks.sistem.poslednji_prolaz)) : null;
  const sistemProlaz = s ? `${s.dan}.${s.mesec}. u ${s.sat}:${s.minut}` : null;

  return (
    <PregledPredmeta
      indeks={rezultat.indeks}
      uloga={pristup.uloga}
      danas={danas}
      generisano={generisano}
      sistemProlaz={sistemProlaz}
    />
  );
}
