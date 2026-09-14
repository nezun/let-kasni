"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { UlogaPregleda } from "@/lib/pregled/pristup";
import type { Faza, IndeksV1, NaPotezu, PotpisV1, PredmetV1, StanjePotpisa, ZadatakV1 } from "@/lib/pregled/types";

type BadgeVariant = "default" | "outline" | "muted" | "info" | "warning" | "success" | "danger" | "violet";

const fazaPrikaz: Record<Faza, { label: string; variant: BadgeVariant }> = {
  prijem: { label: "Prijem", variant: "muted" },
  provera: { label: "Provera", variant: "warning" },
  odgovor: { label: "Odgovor", variant: "info" },
  dokumenta: { label: "Dokumenta", variant: "info" },
  potpis: { label: "Potpis", variant: "violet" },
  advokat: { label: "Advokat", variant: "success" },
  zatvoreno: { label: "Zatvoreno", variant: "muted" },
  ostalo: { label: "Ostalo", variant: "outline" },
};

const naPotezuPrikaz: Record<NaPotezu, string> = {
  mi: "Mi",
  klijent: "Klijent",
  advokat: "Advokat",
  niko: "—",
};

const koPrikaz: Record<ZadatakV1["ko"], { label: string; variant: BadgeVariant }> = {
  niko: { label: "Tim", variant: "warning" },
  advokat: { label: "Advokat", variant: "success" },
  sistem: { label: "Sistem", variant: "muted" },
};

const stanjePrikaz: Record<StanjePotpisa, { label: string; variant: BadgeVariant }> = {
  nije_pripremljeno: { label: "Nije pripremljeno", variant: "muted" },
  pripremljeno: { label: "Spremno za slanje", variant: "warning" },
  poslato: { label: "Čeka potpis", variant: "violet" },
  potpisano: { label: "Potpisano", variant: "success" },
};

const fazeFiltera: Array<{ value: "sve" | Faza; label: string }> = [
  { value: "sve", label: "Sve" },
  { value: "provera", label: "Provera" },
  { value: "odgovor", label: "Odgovor" },
  { value: "dokumenta", label: "Dokumenta" },
  { value: "potpis", label: "Potpis" },
  { value: "advokat", label: "Advokat" },
  { value: "zatvoreno", label: "Zatvoreno" },
];

function kratakDatum(value: string | null) {
  const m = value?.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}.${m[2]}.` : "—";
}

function punDatum(value: string | null) {
  const m = value?.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}.${m[2]}.${m[1]}.` : "—";
}

function trajanje(min: number | null) {
  if (min == null) return "—";
  return `${Math.floor(min / 60)}h ${String(min % 60).padStart(2, "0")}`;
}

function eur(value: number | null) {
  return value == null ? "—" : `${value.toLocaleString("en-US").replace(/,/g, ".")} €`;
}

const provajderi: Record<string, string> = {
  signnow: "signNow",
  youtrust: "Youtrust",
  eurosign: "Eurosign",
  skribble: "Skribble",
};

function nazivProvajdera(naziv: string | undefined) {
  return naziv ? (provajderi[naziv] ?? naziv) : "E-potpis";
}

function dokumentNaziv(value: PotpisV1["dokument"]) {
  if (value === "ugovor_o_ustupanju") return "Ugovor o ustupanju";
  if (value === "punomocje") return "Punomoćje";
  return "—";
}

function SummaryCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-2xl font-bold tracking-[-0.02em]">{value}</CardTitle>
      </CardHeader>
      <CardContent className="pt-1 text-xs text-[var(--muted)]">{hint ?? " "}</CardContent>
    </Card>
  );
}

export function PregledPredmeta({
  indeks,
  uloga,
  danas,
  generisano,
  sistemProlaz,
}: {
  indeks: IndeksV1;
  uloga: UlogaPregleda;
  danas: string;
  generisano: string;
  sistemProlaz: string | null;
}) {
  const [upit, setUpit] = useState("");
  const [faza, setFaza] = useState<"sve" | Faza>("sve");
  const [naPotezu, setNaPotezu] = useState<"svi" | NaPotezu>("svi");

  const predmeti = useMemo(() => {
    const q = upit.trim().toLowerCase();
    return indeks.predmeti
      .filter((p) => faza === "sve" || p.faza === faza)
      .filter((p) => naPotezu === "svi" || p.na_potezu === naPotezu)
      .filter((p) => {
        if (!q) return true;
        const tekst = [p.ref, p.let.broj, p.let.od, p.let.do, p.faza_opis, ...p.putnici.map((x) => x.ime)]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return tekst.includes(q);
      })
      .sort((a, b) => (b.poslednji_kontakt ?? "").localeCompare(a.poslednji_kontakt ?? ""));
  }, [indeks.predmeti, upit, faza, naPotezu]);

  const potpisi = useMemo(() => {
    const redosled: Record<StanjePotpisa, number> = { poslato: 0, pripremljeno: 1, potpisano: 2, nije_pripremljeno: 3 };
    return indeks.predmeti
      .flatMap((p: PredmetV1) => p.potpisi.map((x) => ({ ...x, predmet: p })))
      .filter((x) => x.stanje !== "nije_pripremljeno")
      .sort(
        (a, b) =>
          redosled[a.stanje] - redosled[b.stanje] ||
          (b.ceka_dana ?? 0) - (a.ceka_dana ?? 0) ||
          (b.potpisano ?? "").localeCompare(a.potpisano ?? ""),
      );
  }, [indeks.predmeti]);

  const zadaci = useMemo(() => {
    const redosled: Record<ZadatakV1["ko"], number> = { niko: 0, advokat: 1, sistem: 2 };
    return (indeks.zadaci ?? [])
      .filter((z) => uloga === "tim" || z.ko === "advokat")
      .sort((a, b) => redosled[a.ko] - redosled[b.ko] || (a.ref ?? "").localeCompare(b.ref ?? ""));
  }, [indeks.zadaci, uloga]);

  const putniciPoRef = useMemo(
    () => new Map(indeks.predmeti.map((p) => [p.ref, p.putnici.map((x) => x.ime).join(", ")])),
    [indeks.predmeti],
  );

  const { ukupno } = indeks;

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-2">letkasni.rs</p>
            <h1 className="text-3xl font-bold tracking-[-0.03em] text-[var(--ink)]">Pregled predmeta</h1>
          </div>
          <p className="text-xs text-[var(--muted)]">
            Stanje od {generisano} · {uloga === "advokati" ? "pristup za advokate" : "pristup za tim"} · samo za pregled
            {uloga === "tim" && indeks.sistem ? (
              <span className="block sm:text-right">
                Sistem ({indeks.sistem.okruzenje}): poslednji prolaz {sistemProlaz ?? "—"} · agenti čekaju{" "}
                {indeks.sistem.agenti_cekaju} · greške {indeks.sistem.greske}
              </span>
            ) : null}
          </p>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <SummaryCard label="Otvoreni predmeti" value={String(ukupno.otvorenih)} hint={`od ${ukupno.predmeta} ukupno`} />
          <SummaryCard label="Putnika" value={String(ukupno.putnika)} />
          <SummaryCard label="Čeka potpis" value={String(ukupno.ceka_potpis)} hint="poslati dokumenti" />
          <SummaryCard label="Kod advokata" value={String(ukupno.kod_advokata)} />
          <SummaryCard label="Procena, otvoreni" value={eur(ukupno.procena_eur)} hint="pre odobrenja iznosa" />
        </div>

        <Tabs defaultValue="predmeti">
          <TabsList>
            <TabsTrigger value="predmeti">Predmeti</TabsTrigger>
            <TabsTrigger value="potpisivanje">
              Potpisivanje
              {ukupno.ceka_potpis > 0 ? <Badge variant="violet">{ukupno.ceka_potpis}</Badge> : null}
            </TabsTrigger>
            {indeks.zadaci ? (
              <TabsTrigger value="zadaci">
                Zadaci
                {zadaci.length > 0 ? <Badge variant="warning">{zadaci.length}</Badge> : null}
              </TabsTrigger>
            ) : null}
          </TabsList>

          <TabsContent value="predmeti">
            <Card>
              <CardContent className="flex flex-col gap-3 pt-5 lg:flex-row lg:items-center">
                <Input
                  value={upit}
                  onChange={(e) => setUpit(e.target.value)}
                  placeholder="Pretraga: ime, let, predmet…"
                  className="lg:max-w-xs"
                  aria-label="Pretraga predmeta"
                />
                <div className="flex flex-wrap gap-1.5">
                  {fazeFiltera.map((f) => (
                    <button
                      key={f.value}
                      type="button"
                      onClick={() => setFaza(f.value)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                        faza === f.value
                          ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                          : "border-[var(--border)] bg-white text-[var(--ink)] hover:bg-slate-50"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <label className="flex items-center gap-2 text-xs text-[var(--muted)] lg:ml-auto">
                  Na potezu
                  <select
                    value={naPotezu}
                    onChange={(e) => setNaPotezu(e.target.value as "svi" | NaPotezu)}
                    className="h-9 rounded-lg border border-[var(--border)] bg-white px-2 text-sm text-[var(--ink)]"
                  >
                    <option value="svi">Svi</option>
                    <option value="mi">Mi</option>
                    <option value="klijent">Klijent</option>
                    <option value="advokat">Advokat</option>
                  </select>
                </label>
              </CardContent>

              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Predmet</TableHead>
                    <TableHead>Let</TableHead>
                    <TableHead>Faza</TableHead>
                    <TableHead>Na potezu</TableHead>
                    <TableHead className="text-right">Kašnjenje</TableHead>
                    <TableHead className="text-right">Iznos</TableHead>
                    <TableHead>Kontakt</TableHead>
                    <TableHead>Podsetnik</TableHead>
                    <TableHead>Sledeći korak</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {predmeti.map((p) => {
                    const prikaz = fazaPrikaz[p.faza] ?? fazaPrikaz.ostalo;
                    const zakasneo = !!p.podsetnik && p.podsetnik < danas && p.na_potezu !== "niko" && p.faza !== "advokat";
                    return (
                      <TableRow key={p.ref}>
                        <TableCell className="min-w-52">
                          <div className="font-semibold text-[var(--ink)]">
                            {p.putnici.map((x) => x.ime).join(", ")}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[var(--muted)]">
                            {p.ref}
                            {p.putnici.length > 1 ? <span>· {p.putnici.length} putnika</span> : null}
                            {p.putnici.some((x) => x.maloletan) ? <Badge variant="outline">maloletni</Badge> : null}
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="font-medium">{p.let.broj ?? "—"}</div>
                          <div className="text-xs text-[var(--muted)]">
                            {p.let.od ?? "?"} → {p.let.do ?? "?"} · {punDatum(p.let.datum)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={prikaz.variant}>{prikaz.label}</Badge>
                          <div className="mt-1 text-xs text-[var(--muted)]">{p.faza_opis}</div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{naPotezuPrikaz[p.na_potezu]}</TableCell>
                        <TableCell className="whitespace-nowrap text-right tabular-nums">{trajanje(p.kasnjenje_min)}</TableCell>
                        <TableCell className="whitespace-nowrap text-right tabular-nums">
                          {eur(p.procena_ukupno_eur)}
                          {!p.iznos_odobren && p.procena_ukupno_eur ? (
                            <div className="text-xs text-[var(--muted)]">procena</div>
                          ) : null}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{kratakDatum(p.poslednji_kontakt)}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          {p.podsetnik ? (
                            <span className={zakasneo ? "font-semibold text-red-700" : undefined}>{kratakDatum(p.podsetnik)}</span>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell className="min-w-48 text-[var(--ink)]">{p.sledeci_korak ?? "—"}</TableCell>
                      </TableRow>
                    );
                  })}
                  {predmeti.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="py-10 text-center text-[var(--muted)]">
                        Nema predmeta za izabrane filtere.
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="potpisivanje" className="flex flex-col gap-4">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Putnik</TableHead>
                    <TableHead>Predmet</TableHead>
                    <TableHead>Dokument</TableHead>
                    <TableHead>Stanje</TableHead>
                    <TableHead>Kanal</TableHead>
                    <TableHead>Poslato</TableHead>
                    <TableHead className="text-right">Čeka</TableHead>
                    <TableHead>Potpisano</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {potpisi.map((x) => {
                    const prikaz = stanjePrikaz[x.stanje];
                    const dana = x.ceka_dana;
                    const bojaCekanja = dana == null ? "" : dana >= 7 ? "font-semibold text-red-700" : dana >= 3 ? "font-semibold text-amber-700" : "";
                    return (
                      <TableRow key={`${x.predmet.ref}-${x.putnik}`}>
                        <TableCell className="min-w-44 font-medium">
                          {x.putnik}
                          {x.maloletan ? <Badge variant="outline" className="ml-2">maloletan</Badge> : null}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div>{x.predmet.ref}</div>
                          <div className="text-xs text-[var(--muted)]">
                            {x.predmet.let.broj ?? "—"} · {punDatum(x.predmet.let.datum)}
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{dokumentNaziv(x.dokument)}</TableCell>
                        <TableCell>
                          <Badge variant={prikaz.variant}>{prikaz.label}</Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          {x.kanal === "e_potpis" ? nazivProvajdera(x.provajder?.naziv) : "Email"}
                          {x.provajder?.audit_trail ? (
                            <div className="text-xs text-[var(--muted)]">audit trail sačuvan</div>
                          ) : null}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{kratakDatum(x.poslato)}</TableCell>
                        <TableCell className={`whitespace-nowrap text-right tabular-nums ${bojaCekanja}`}>
                          {dana == null ? "—" : `${dana} d`}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{kratakDatum(x.potpisano)}</TableCell>
                      </TableRow>
                    );
                  })}
                  {potpisi.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="py-10 text-center text-[var(--muted)]">
                        Nema dokumenata za potpis.
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </Card>

            {uloga === "tim" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Elektronsko potpisivanje — plan</CardTitle>
                  <CardDescription>Prema Nemanjinom poređenju provajdera (13.09.2026).</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-5 md:grid-cols-3">
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Sada</div>
                    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-[var(--ink)]">
                      <li><strong>signNow Business</strong> (~$8/mes.), bez limita dokumenata.</li>
                      <li>Jednostavan elektronski potpis (SES), bez SMS koda i ličnih dokumenata.</li>
                      <li>Podešavanje „Draw only“: putnik mora da nacrta potpis.</li>
                      <li>Ugovor pravimo mi, šaljemo ručno iz dashboard-a; čuvamo potpisan PDF i audit trail.</li>
                    </ul>
                  </div>
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Paralelno testirati</div>
                    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-[var(--ink)]">
                      <li>Youtrust Plus (~€23) i Eurosign Business Pro (~€19), isti ugovor poslat sebi na telefon.</li>
                      <li>Proveriti: izgled nacrtanog potpisa, finalni PDF, sadržaj audit fajla, koliko je tok lak putniku.</li>
                      <li>Otpadaju: DocuSign (limit dokumenata), Evrotrust (SMS kod), Adobe (nema prednost).</li>
                    </ul>
                  </div>
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Za 2–3 meseca</div>
                    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-[var(--ink)]">
                      <li>API: Skribble Pro (~€36, najjeftiniji), Youtrust API (od €106, najjači EU dokazi) ili signNow API.</li>
                      <li>Adapter sa pet funkcija, da se provajder menja bez diranja ostatka sistema.</li>
                      <li>Pre potpisa polje za saglasnost; potpis direktora postavljen jednom kod provajdera.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </TabsContent>
          <TabsContent value="zadaci">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Za</TableHead>
                    <TableHead>Predmet</TableHead>
                    <TableHead>Zadatak</TableHead>
                    <TableHead>Od</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {zadaci.map((z, i) => (
                    <TableRow key={`${z.ref ?? "sistem"}-${z.vrsta}-${i}`}>
                      <TableCell className="whitespace-nowrap">
                        <Badge variant={koPrikaz[z.ko].variant}>{koPrikaz[z.ko].label}</Badge>
                      </TableCell>
                      <TableCell className="min-w-44">
                        {z.ref ? (
                          <>
                            <div className="font-medium">{putniciPoRef.get(z.ref) ?? z.ref}</div>
                            <div className="text-xs text-[var(--muted)]">{z.ref}</div>
                          </>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell className="min-w-72 text-[var(--ink)]">{z.opis}</TableCell>
                      <TableCell className="whitespace-nowrap">{kratakDatum(z.od)}</TableCell>
                    </TableRow>
                  ))}
                  {zadaci.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="py-10 text-center text-[var(--muted)]">
                        Nema otvorenih zadataka.
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
