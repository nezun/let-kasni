"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { OtpremanjeDokumenataKartica } from "@/components/dokumenta/otpremanje-dokumenata";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { PredmetPortala, PutnikPortala } from "@/lib/crm/portal";

type Unos = { ime_prezime: string; rodjena: string; adresa: string; zakonski_zastupnik: string };

const prazan: Unos = { ime_prezime: "", rodjena: "", adresa: "", zakonski_zastupnik: "" };

const greske: Record<string, string> = {
  saglasnost: "Potrebna je Vaša saglasnost.",
  prvi_maloletan: "Prvi putnik mora biti punoletan (podnosilac zahteva).",
  zakljucano: "Ugovor je već pripremljen. Za izmenu podataka pišite nam na kontakt@letkasni.rs.",
  konflikt: "Upis nije uspeo, pokušajte ponovo.",
  previse_zahteva: "Previše pokušaja. Pokušajte ponovo za nekoliko minuta.",
  link_nevazeci: "Link je istekao. Pišite nam na kontakt@letkasni.rs.",
};

function porukaGreske(kod: string) {
  const [polje, i] = kod.split("_");
  const redni = Number(i) + 1;
  if (polje === "ime") return `Putnik ${redni}: upišite ime i prezime.`;
  if (polje === "rodjena") return `Putnik ${redni}: upišite ispravan datum rođenja.`;
  if (polje === "adresa") return `Putnik ${redni}: upišite adresu prebivališta.`;
  if (polje === "zastupnik") return `Putnik ${redni} je maloletan: upišite ime i prezime roditelja ili staratelja.`;
  return greske[kod] ?? "Čuvanje nije uspelo. Pokušajte ponovo.";
}

function maloletan(rodjena: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(rodjena)) return false;
  const d = new Date(`${rodjena}T00:00:00`);
  const granica = new Date();
  granica.setFullYear(granica.getFullYear() - 18);
  return d > granica;
}

const unosIz = (p: PutnikPortala): Unos => ({
  ime_prezime: p.ime_prezime,
  rodjena: p.rodjena ?? "",
  adresa: p.adresa ?? "",
  zakonski_zastupnik: p.zakonski_zastupnik ?? "",
});

function datum(iso: string | null) {
  const m = iso?.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}.${m[2]}.${m[1]}.` : "";
}

function Korak({ broj, naslov, stanje }: { broj: number; naslov: string; stanje: "gotovo" | "sada" | "kasnije" }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
          stanje === "gotovo" ? "bg-emerald-600 text-white" : stanje === "sada" ? "bg-[var(--accent)] text-white" : "bg-slate-200 text-slate-600"
        }`}
      >
        {stanje === "gotovo" ? "✓" : broj}
      </span>
      <span className={`text-sm ${stanje === "kasnije" ? "text-[var(--muted)]" : "font-medium text-[var(--ink)]"}`}>{naslov}</span>
    </div>
  );
}

export function PortalPredmeta({ token, predmet }: { token: string; predmet: PredmetPortala }) {
  const router = useRouter();
  const [putnici, setPutnici] = useState<Unos[]>(predmet.putnici.length ? predmet.putnici.map(unosIz) : [prazan]);
  const [saglasnost, setSaglasnost] = useState(false);
  const [greska, setGreska] = useState<string | null>(null);
  const [radi, setRadi] = useState(false);
  const [potpisuje, setPotpisuje] = useState<string | null>(null);

  const mozePodaci = predmet.faza === "podaci" || (predmet.faza === "ceka_ugovor" && !predmet.podaciPoslati);

  useEffect(() => {
    if (predmet.faza !== "ceka_ugovor") return;
    const id = setInterval(() => router.refresh(), 20_000);
    return () => clearInterval(id);
  }, [predmet.faza, router]);

  const promeni = (i: number, polje: keyof Unos, vrednost: string) =>
    setPutnici((sve) => sve.map((p, j) => (j === i ? { ...p, [polje]: vrednost } : p)));

  async function sacuvaj(e: React.FormEvent) {
    e.preventDefault();
    setGreska(null);
    if (!saglasnost) {
      setGreska(greske.saglasnost);
      return;
    }
    setRadi(true);
    try {
      const odgovor = await fetch(`/api/predmet/${encodeURIComponent(token)}/podaci`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ putnici, saglasnost }),
      });
      const telo = (await odgovor.json().catch(() => ({}))) as { error?: string };
      if (!odgovor.ok) {
        setGreska(porukaGreske(telo.error ?? ""));
        return;
      }
      router.refresh();
    } catch {
      setGreska("Čuvanje nije uspelo. Proverite internet vezu i pokušajte ponovo.");
    } finally {
      setRadi(false);
    }
  }

  async function potpisi(putnik: string) {
    setGreska(null);
    setPotpisuje(putnik);
    try {
      const odgovor = await fetch(`/api/predmet/${encodeURIComponent(token)}/potpis`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ putnik }),
      });
      const telo = (await odgovor.json().catch(() => ({}))) as { url?: string; error?: string };
      if (odgovor.ok && telo.url) {
        window.location.assign(telo.url);
        return;
      }
      setGreska(telo.error === "nije_podeseno" ? "Elektronski potpis trenutno nije dostupan — ugovor ćemo Vam poslati mejlom." : "Otvaranje potpisa nije uspelo. Pokušajte ponovo.");
    } catch {
      setGreska("Otvaranje potpisa nije uspelo. Pokušajte ponovo.");
    } finally {
      setPotpisuje(null);
    }
  }

  const stanjePodataka = predmet.podaciPoslati ? "gotovo" : mozePodaci ? "sada" : "kasnije";
  const stanjePotpisa = predmet.faza === "potpisano" ? "gotovo" : predmet.faza === "potpis" ? "sada" : "kasnije";
  const letOpis = [predmet.let.broj, predmet.let.od && predmet.let.do ? `${predmet.let.od} → ${predmet.let.do}` : null, datum(predmet.let.datum)].filter(Boolean).join(" · ");

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        <div>
          <p className="eyebrow mb-2">letkasni.rs</p>
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-[var(--ink)]">Vaš predmet</h1>
          {letOpis ? <p className="mt-2 text-sm text-[var(--muted)]">Let {letOpis}</p> : null}
          <div className="mt-4 flex flex-wrap gap-4">
            <Korak broj={1} naslov="Podaci putnika" stanje={stanjePodataka} />
            <Korak broj={2} naslov="Dokumenta" stanje={predmet.podaciPoslati ? "sada" : "kasnije"} />
            <Korak broj={3} naslov="Potpis ugovora" stanje={stanjePotpisa} />
          </div>
        </div>

        {greska ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{greska}</p> : null}

        {predmet.faza === "kod_tima" ? (
          <Card>
            <CardContent className="pt-5 text-sm leading-6 text-[var(--ink)]">
              Vaš predmet je trenutno kod našeg tima. Javićemo Vam se mejlom. Za pitanja: kontakt@letkasni.rs
            </CardContent>
          </Card>
        ) : null}

        {mozePodaci ? (
          <Card>
            <CardHeader>
              <CardTitle>1. Podaci putnika</CardTitle>
              <CardDescription>
                Podaci ulaze u ugovor o ustupanju potraživanja, pa ih upišite tačno kao u pasošu ili ličnoj karti. Za maloletnog putnika
                ugovor potpisuje roditelj ili staratelj.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={sacuvaj} className="flex flex-col gap-5">
                {putnici.map((p, i) => (
                  <fieldset key={i} className="rounded-xl border border-[var(--border)] p-4">
                    <legend className="px-1 text-sm font-semibold text-[var(--ink)]">{i === 0 ? "Putnik 1 (podnosilac)" : `Putnik ${i + 1}`}</legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <label className="flex flex-col gap-1 text-xs text-[var(--muted)] sm:col-span-2">
                        Ime i prezime
                        <Input value={p.ime_prezime} onChange={(e) => promeni(i, "ime_prezime", e.target.value)} autoComplete={i === 0 ? "name" : "off"} required />
                      </label>
                      <label className="flex flex-col gap-1 text-xs text-[var(--muted)]">
                        Datum rođenja
                        <Input type="date" value={p.rodjena} onChange={(e) => promeni(i, "rodjena", e.target.value)} required />
                      </label>
                      <label className="flex flex-col gap-1 text-xs text-[var(--muted)]">
                        Adresa prebivališta
                        <Input value={p.adresa} onChange={(e) => promeni(i, "adresa", e.target.value)} placeholder="Ulica i broj, mesto" required />
                      </label>
                      {maloletan(p.rodjena) ? (
                        <label className="flex flex-col gap-1 text-xs text-[var(--muted)] sm:col-span-2">
                          Roditelj ili staratelj (ime i prezime)
                          <Input value={p.zakonski_zastupnik} onChange={(e) => promeni(i, "zakonski_zastupnik", e.target.value)} required />
                        </label>
                      ) : null}
                    </div>
                    {i > 0 ? (
                      <button type="button" onClick={() => setPutnici((sve) => sve.filter((_, j) => j !== i))} className="mt-3 text-xs text-red-700 underline">
                        Ukloni putnika
                      </button>
                    ) : null}
                  </fieldset>
                ))}
                {putnici.length < 9 ? (
                  <button type="button" onClick={() => setPutnici((sve) => [...sve, prazan])} className="self-start rounded-lg border border-[var(--border)] px-3 py-2 text-sm">
                    + Dodaj saputnika sa istog leta
                  </button>
                ) : null}
                <label className="flex items-start gap-2 text-sm leading-6 text-[var(--ink)]">
                  <input type="checkbox" checked={saglasnost} onChange={(e) => setSaglasnost(e.target.checked)} className="mt-1.5" />
                  <span>Potvrđujem da su podaci tačni i saglasan/saglasna sam da letkasni.rs i VGA EU CONSULTING DOO obrađuju ove podatke radi ostvarivanja naknade za navedeni let.</span>
                </label>
                <button type="submit" disabled={radi} className="self-start rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                  {radi ? "Čuvam…" : "Sačuvaj podatke"}
                </button>
              </form>
            </CardContent>
          </Card>
        ) : null}

        {predmet.podaciPoslati && predmet.faza !== "kod_tima" ? (
          <Card>
            <CardHeader>
              <CardTitle>1. Podaci putnika</CardTitle>
              <CardDescription>Primili smo podatke. Za izmenu nam pišite na kontakt@letkasni.rs.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {predmet.putnici.map((p) => (
                <Badge key={p.ime_prezime} variant="success">{p.ime_prezime}</Badge>
              ))}
            </CardContent>
          </Card>
        ) : null}

        {predmet.faza !== "kod_tima" ? <OtpremanjeDokumenataKartica token={token} naslov="2. Dokumenta" /> : null}

        {predmet.faza !== "kod_tima" ? (
          <Card>
            <CardHeader>
              <CardTitle>3. Potpis ugovora</CardTitle>
              <CardDescription>Ugovorom o ustupanju potraživanja postupak prema avio-kompaniji preuzimamo mi, bez troška i rizika za Vas.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-[var(--ink)]">
              {predmet.faza === "podaci" ? <p className="text-[var(--muted)]">Ugovor pripremamo čim sačuvate podatke putnika.</p> : null}
              {predmet.faza === "ceka_ugovor" ? <p>Pripremamo ugovor za potpis. To obično traje nekoliko minuta — stranica se sama osvežava.</p> : null}
              {predmet.faza === "potpis_mejlom" ? <p>Ugovor ćemo Vam poslati mejlom.</p> : null}
              {predmet.faza === "potpisano" ? <p className="font-medium text-emerald-800">Ugovor je potpisan. Hvala! Dalje vodimo postupak mi i javljamo Vam se mejlom.</p> : null}
              {predmet.faza === "potpis" ? (
                <ul className="flex flex-col gap-2">
                  {predmet.potpisi.map((z) => (
                    <li key={z.putnik} className="flex items-center justify-between gap-3 rounded-lg border border-[var(--border)] px-3 py-2">
                      <span>{z.putnik}</span>
                      {z.stanje === "potpisano" ? (
                        <Badge variant="success">Potpisano</Badge>
                      ) : z.mozePotpis ? (
                        <button
                          type="button"
                          onClick={() => potpisi(z.putnik)}
                          disabled={potpisuje !== null}
                          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                        >
                          {potpisuje === z.putnik ? "Otvaram…" : "Pregledaj i potpiši"}
                        </button>
                      ) : (
                        <Badge variant="muted">U pripremi</Badge>
                      )}
                    </li>
                  ))}
                  <li className="text-xs text-[var(--muted)]">Ako ste upravo potpisali, potvrda se ovde vidi u roku od nekoliko minuta.</li>
                </ul>
              ) : null}
            </CardContent>
          </Card>
        ) : null}

        <p className="text-xs leading-5 text-[var(--muted)]">Ovaj link je lični. Za pitanja: kontakt@letkasni.rs</p>
      </div>
    </main>
  );
}
