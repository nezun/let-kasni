"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import type { PotpisPortala, PutnikPortala } from "@/lib/crm/portal";
import { SAGLASNOST_POTPISA } from "@/lib/ugovor/saglasnost";

/**
 * Naš elektronski potpis na portalu — prvo za telefon: prst na ekranu, bez zumiranja i pomeranja strane dok se crta.
 * Klijent vidi podatke iz ugovora, otvara ceo ugovor (PDF), potvrđuje saglasnost i crta potpis.
 */
const MIN_DUZINA_PX = 60;

function datum(iso: string | null) {
  const m = iso?.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}.${m[2]}.${m[1]}.` : "—";
}

function PoljeZaPotpis({ onPromena, obrisi }: { onPromena: (png: string | null) => void; obrisi: number }) {
  const platno = useRef<HTMLCanvasElement | null>(null);
  const crta = useRef(false);
  const poslednja = useRef<{ x: number; y: number } | null>(null);
  const duzina = useRef(0);
  const okvir = useRef({ minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });

  const pripremi = useCallback(() => {
    const c = platno.current;
    if (!c) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const { width, height } = c.getBoundingClientRect();
    c.width = Math.round(width * dpr);
    c.height = Math.round(height * dpr);
    const g = c.getContext("2d")!;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.lineCap = "round";
    g.lineJoin = "round";
    g.strokeStyle = "#0b1f44";
    g.lineWidth = 2.4;
    duzina.current = 0;
    okvir.current = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    onPromena(null);
  }, [onPromena]);

  useEffect(() => {
    pripremi();
    let sirina = platno.current?.getBoundingClientRect().width ?? 0;
    const naPromenu = () => {
      const nova = platno.current?.getBoundingClientRect().width ?? 0;
      // rotacija telefona menja širinu: potpis se crta iznova (skaliranje bi ga izobličilo)
      if (Math.abs(nova - sirina) > 8) {
        sirina = nova;
        pripremi();
      }
    };
    window.addEventListener("resize", naPromenu);
    return () => window.removeEventListener("resize", naPromenu);
  }, [pripremi, obrisi]);

  const tacka = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const izvezi = () => {
    const c = platno.current!;
    if (duzina.current < MIN_DUZINA_PX) return onPromena(null);
    const dpr = c.width / c.getBoundingClientRect().width;
    const o = okvir.current;
    const pad = 8;
    const x = Math.max(0, Math.floor((o.minX - pad) * dpr));
    const y = Math.max(0, Math.floor((o.minY - pad) * dpr));
    const w = Math.min(c.width - x, Math.ceil((o.maxX - o.minX + 2 * pad) * dpr));
    const h = Math.min(c.height - y, Math.ceil((o.maxY - o.minY + 2 * pad) * dpr));
    const isecak = document.createElement("canvas");
    isecak.width = w;
    isecak.height = h;
    isecak.getContext("2d")!.drawImage(c, x, y, w, h, 0, 0, w, h);
    onPromena(isecak.toDataURL("image/png"));
  };

  return (
    <canvas
      ref={platno}
      aria-label="Polje za potpis — potpišite se prstom ili mišem"
      className="h-44 w-full cursor-crosshair rounded-xl border-2 border-dashed border-[var(--border)] bg-white sm:h-52"
      style={{ touchAction: "none" }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        crta.current = true;
        poslednja.current = tacka(e);
      }}
      onPointerMove={(e) => {
        if (!crta.current || !poslednja.current) return;
        const g = e.currentTarget.getContext("2d")!;
        const t = tacka(e);
        const p = poslednja.current;
        g.beginPath();
        g.moveTo(p.x, p.y);
        g.quadraticCurveTo(p.x, p.y, (p.x + t.x) / 2, (p.y + t.y) / 2);
        g.lineTo(t.x, t.y);
        g.stroke();
        duzina.current += Math.hypot(t.x - p.x, t.y - p.y);
        const o = okvir.current;
        o.minX = Math.min(o.minX, p.x, t.x);
        o.minY = Math.min(o.minY, p.y, t.y);
        o.maxX = Math.max(o.maxX, p.x, t.x);
        o.maxY = Math.max(o.maxY, p.y, t.y);
        poslednja.current = t;
      }}
      onPointerUp={() => {
        crta.current = false;
        poslednja.current = null;
        izvezi();
      }}
      onPointerCancel={() => {
        crta.current = false;
        poslednja.current = null;
      }}
    />
  );
}

function KarticaPutnika({ token, potpis, putnik, letOpis }: { token: string; potpis: PotpisPortala; putnik: PutnikPortala | undefined; letOpis: string }) {
  const router = useRouter();
  const [saglasan, setSaglasan] = useState(false);
  const [png, setPng] = useState<string | null>(null);
  const [obrisi, setObrisi] = useState(0);
  const [radi, setRadi] = useState(false);
  const [greska, setGreska] = useState<string | null>(null);
  const pdf = `/api/predmet/${encodeURIComponent(token)}/ugovor?putnik=${encodeURIComponent(potpis.putnik)}`;
  const potpisano = potpis.stanje === "potpisano";

  async function potpisi() {
    if (!saglasan || !png) return;
    setGreska(null);
    setRadi(true);
    try {
      const r = await fetch(`/api/predmet/${encodeURIComponent(token)}/potpisi`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ putnik: potpis.putnik, potpis: png, saglasnost: true }),
      });
      const j = (await r.json().catch(() => ({}))) as { error?: string };
      if (!r.ok) {
        setGreska(
          j.error === "vec_potpisano" ? "Ovaj ugovor je već potpisan."
          : j.error === "podaci_promenjeni" ? "Podaci u ugovoru su u međuvremenu izmenjeni. Pišite nam na kontakt@letkasni.rs."
          : j.error === "potpis" ? "Potpis je prekratak — potpišite se ponovo, malo krupnije."
          : "Potpisivanje nije uspelo. Pokušajte ponovo za minut.",
        );
        return;
      }
      router.refresh();
    } catch {
      setGreska("Potpisivanje nije uspelo. Proverite internet vezu i pokušajte ponovo.");
    } finally {
      setRadi(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[var(--border)] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-base font-semibold text-[var(--ink)]">{potpis.putnik}</div>
        {potpisano ? <Badge variant="success">Potpisano {datum(potpis.potpisano)}</Badge> : <Badge variant="muted">Čeka potpis</Badge>}
      </div>

      <dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs text-[var(--muted)]">Datum rođenja</dt>
          <dd className="text-[var(--ink)]">{datum(putnik?.rodjena ?? null)}</dd>
        </div>
        <div>
          <dt className="text-xs text-[var(--muted)]">Let</dt>
          <dd className="text-[var(--ink)]">{letOpis || "—"}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs text-[var(--muted)]">Adresa</dt>
          <dd className="text-[var(--ink)]">{putnik?.adresa ?? "—"}</dd>
        </div>
        {putnik?.maloletan ? (
          <div className="sm:col-span-2">
            <dt className="text-xs text-[var(--muted)]">Potpisuje (roditelj ili staratelj)</dt>
            <dd className="text-[var(--ink)]">{potpis.potpisnik ?? putnik.zakonski_zastupnik ?? "—"}</dd>
          </div>
        ) : null}
      </dl>

      <a href={pdf} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--border)] px-4 text-sm font-semibold text-[var(--ink)] sm:self-start">
        {potpisano ? "Preuzmi potpisan ugovor (PDF)" : "Pročitaj ceo ugovor (PDF)"}
      </a>

      {potpisano ? null : potpis.mozePotpis ? (
        <>
          <label className="flex items-start gap-3 text-sm leading-6 text-[var(--ink)]">
            <input type="checkbox" checked={saglasan} onChange={(e) => setSaglasan(e.target.checked)} className="mt-1 size-5 shrink-0" />
            <span>{SAGLASNOST_POTPISA}</span>
          </label>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-[var(--ink)]">{putnik?.maloletan ? "Potpis roditelja ili staratelja" : "Vaš potpis"}</span>
              <button type="button" onClick={() => setObrisi((n) => n + 1)} className="min-h-11 px-2 text-sm text-[var(--muted)] underline">
                Obriši
              </button>
            </div>
            <PoljeZaPotpis key={obrisi} obrisi={obrisi} onPromena={setPng} />
            <p className="text-xs text-[var(--muted)]">Potpišite se prstom (telefon) ili mišem (računar) unutar okvira.</p>
          </div>

          {greska ? <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{greska}</p> : null}

          <button
            type="button"
            onClick={potpisi}
            disabled={!saglasan || !png || radi}
            className="min-h-12 w-full rounded-lg bg-[var(--accent)] px-5 text-base font-semibold text-white disabled:opacity-50 sm:w-auto sm:self-start"
          >
            {radi ? "Potpisujem…" : "Potpiši ugovor"}
          </button>
          {!saglasan || !png ? <p className="-mt-2 text-xs text-[var(--muted)]">Dugme se uključuje kad potvrdite saglasnost i potpišete se.</p> : null}
        </>
      ) : (
        <p className="text-sm text-[var(--muted)]">Ugovor još nije spreman za potpis.</p>
      )}
    </div>
  );
}

export function PotpisUgovora({ token, potpisi, putnici, letOpis }: { token: string; potpisi: PotpisPortala[]; putnici: PutnikPortala[]; letOpis: string }) {
  return (
    <div className="flex flex-col gap-4">
      {potpisi.map((z) => (
        <KarticaPutnika key={z.putnik} token={token} potpis={z} putnik={putnici.find((p) => p.ime_prezime === z.putnik)} letOpis={letOpis} />
      ))}
    </div>
  );
}
