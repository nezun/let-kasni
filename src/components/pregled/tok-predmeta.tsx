"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DogadjajV1, KorakV1, PredmetV1, ZadatakV1 } from "@/lib/pregled/types";

type Traka = "ti" | "server" | "mac";

/** Tok predmeta — isti koraci kao dijagram u STAGING.md i `korakPredmeta` (src/lib/sistem/pregled.ts). */
export const KORACI_TOKA: Array<{ broj: number; naziv: string; opis: string; traka: Traka }> = [
  { broj: 1, naziv: "Klijent popuni formu", opis: "predmet odmah u bazi", traka: "ti" },
  { broj: 2, naziv: "Prijem", opis: "server dopuni predmet", traka: "server" },
  { broj: 3, naziv: "Provera leta", opis: "agent traži stvarna vremena", traka: "mac" },
  { broj: 4, naziv: "Pravila EU261", opis: "kod računa nalaz i iznos", traka: "server" },
  { broj: 5, naziv: "Revizor", opis: "drugi agent proverava izvore", traka: "mac" },
  { broj: 6, naziv: "Mejl: traži dokumenta", opis: "draft za pasoš i kartu", traka: "server" },
  { broj: 7, naziv: "Ti pošalješ mejl", opis: "prvi ručni korak", traka: "ti" },
  { broj: 8, naziv: "Klijent pošalje dokumenta", opis: "odgovor stiže u tvoj inbox", traka: "ti" },
  { broj: 9, naziv: "Prilozi na Drive", opis: "iz inboxa u predmet i folder", traka: "server" },
  { broj: 10, naziv: "Agent čita dokumenta", opis: "ime, datum rođenja, adresa", traka: "mac" },
  { broj: 11, naziv: "Ugovor i link za potpis", opis: "iz dokumenata, signNow poziv", traka: "server" },
  { broj: 12, naziv: "Ti pošalješ link", opis: "drugi ručni korak", traka: "ti" },
  { broj: 13, naziv: "Klijent potpiše", opis: "bez unosa podataka", traka: "ti" },
  { broj: 14, naziv: "Dnevni mejl advokatima", opis: "pregled i link do foldera", traka: "server" },
];

const TRAKE: Array<{ id: Traka; naziv: string }> = [
  { id: "ti", naziv: "Klijent i ti" },
  { id: "server", naziv: "Server, na sat" },
  { id: "mac", naziv: "Tvoj Mac, agenti" },
];

const KO: Record<KorakV1["ko"], string> = {
  ti: "na tebi",
  klijent: "čeka klijenta",
  sistem: "radi sistem",
  agent: "radi agent na Macu",
  advokat: "kod advokata",
  niko: "",
};

type Stanje = "gotovo" | "sada" | "kasnije" | "neutralno";

const izgled: Record<Stanje, string> = {
  gotovo: "border-emerald-200 bg-emerald-50 text-emerald-900",
  sada: "border-[var(--accent)] bg-white text-[var(--ink)] ring-2 ring-[var(--accent)]",
  kasnije: "border-[var(--border)] bg-white text-[var(--muted)]",
  neutralno: "border-[var(--border)] bg-white text-[var(--ink)]",
};

const krug: Record<Stanje, string> = {
  gotovo: "bg-emerald-600 text-white",
  sada: "bg-[var(--accent)] text-white",
  kasnije: "bg-slate-200 text-slate-600",
  neutralno: "bg-slate-200 text-slate-700",
};

function KarticaKoraka({ korak, stanje, detalj }: { korak: (typeof KORACI_TOKA)[number]; stanje: Stanje; detalj?: string | null }) {
  return (
    <div className={`flex items-start gap-2 rounded-lg border px-3 py-2 ${izgled[stanje]}`}>
      <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${krug[stanje]}`}>
        {stanje === "gotovo" ? "✓" : korak.broj}
      </span>
      <div className="min-w-0">
        <div className="text-sm font-semibold leading-5">{korak.naziv}</div>
        <div className="text-xs leading-5 opacity-80">{stanje === "sada" && detalj ? detalj : korak.opis}</div>
        {stanje === "sada" ? <div className="mt-0.5 text-xs font-semibold text-[var(--accent)]">sada ovde</div> : null}
      </div>
    </div>
  );
}

export function TokPredmeta({
  predmet,
  dogadjaji,
  zadaci,
  onZatvori,
}: {
  predmet: PredmetV1 | null;
  dogadjaji: DogadjajV1[];
  zadaci: ZadatakV1[];
  onZatvori: () => void;
}) {
  const korak = predmet?.korak ?? null;
  const zavrsen = predmet && ["LAWYER", "CLOSED"].includes(predmet.status);
  const trenutni = !predmet || korak?.broj == null ? null : zavrsen ? KORACI_TOKA.length + 1 : korak.broj;
  const stanje = (broj: number): Stanje => (trenutni == null ? "neutralno" : broj < trenutni ? "gotovo" : broj === trenutni ? "sada" : "kasnije");

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>{predmet ? predmet.putnici.map((p) => p.ime).join(", ") : "Tok predmeta"}</CardTitle>
          <CardDescription>
            {predmet
              ? `${predmet.ref} · let ${predmet.let.broj ?? "—"} ${predmet.let.od ?? "?"} → ${predmet.let.do ?? "?"} · status ${predmet.status}`
              : "Klikni na ime klijenta u tabeli da vidiš gde je njegov predmet."}
          </CardDescription>
          {korak ? (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant={korak.broj == null ? "warning" : "violet"}>
                {korak.broj == null ? "van redovnog toka" : zavrsen ? "tok završen" : `korak ${korak.broj} od ${korak.ukupno}`}
              </Badge>
              <span className="text-sm text-[var(--ink)]">{korak.naziv}</span>
              {KO[korak.ko] ? <span className="text-xs text-[var(--muted)]">· {KO[korak.ko]}</span> : null}
            </div>
          ) : null}
        </div>
        <button type="button" onClick={onZatvori} className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-sm">
          Zatvori
        </button>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          <div className="hidden grid-cols-3 gap-x-3 gap-y-2 md:grid">
            {TRAKE.map((t, i) => (
              <div key={t.id} className="rounded-xl bg-slate-50" style={{ gridColumn: i + 1, gridRow: `1 / span ${KORACI_TOKA.length + 1}` }} aria-hidden />
            ))}
            {TRAKE.map((t, i) => (
              <div key={`${t.id}-naslov`} className="px-3 pt-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]" style={{ gridColumn: i + 1, gridRow: 1 }}>
                {t.naziv}
              </div>
            ))}
            {KORACI_TOKA.map((k) => (
              <div key={k.broj} className="px-2" style={{ gridColumn: TRAKE.findIndex((t) => t.id === k.traka) + 1, gridRow: k.broj + 1 }}>
                <KarticaKoraka korak={k} stanje={stanje(k.broj)} detalj={korak?.naziv} />
              </div>
            ))}
          </div>
          <ol className="flex flex-col gap-2 md:hidden">
            {KORACI_TOKA.map((k) => (
              <li key={k.broj}>
                <KarticaKoraka korak={k} stanje={stanje(k.broj)} detalj={korak?.naziv} />
              </li>
            ))}
          </ol>
        </div>

        {predmet ? (
          <div className="flex flex-col gap-5">
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Otvoreni zadaci</div>
              {zadaci.length ? (
                <ul className="flex flex-col gap-1.5 text-sm text-[var(--ink)]">
                  {zadaci.map((z, i) => (
                    <li key={`${z.vrsta}-${i}`} className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                      {z.opis}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--muted)]">Nema.</p>
              )}
            </div>
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Poslednja dešavanja</div>
              {dogadjaji.length ? (
                <ul className="flex flex-col gap-2 text-sm">
                  {dogadjaji.slice(0, 12).map((d, i) => (
                    <li key={`${d.vreme}-${i}`} className="border-l-2 border-[var(--border)] pl-3">
                      <div className="text-xs tabular-nums text-[var(--muted)]">{d.vreme_prikaz ?? d.vreme}</div>
                      <div className="text-[var(--ink)]">{d.poruka}</div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[var(--muted)]">Još nema dešavanja.</p>
              )}
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
