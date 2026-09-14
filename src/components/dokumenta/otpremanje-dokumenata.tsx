"use client";

import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type StanjeStavke = "ceka" | "salje" | "poslato" | "greska";
type Stavka = { id: string; ime: string; stanje: StanjeStavke; poruka?: string };

const maxBajtova = 4 * 1024 * 1024;

const poruke: Record<string, string> = {
  prevelik: "Fajl je veći od 4 MB. Pošaljite ga mejlom na kontakt@letkasni.rs.",
  tip: "Podržane su samo slike (JPG, PNG, HEIC, WEBP) i PDF.",
  previse_zahteva: "Previše pokušaja. Pokušajte ponovo za nekoliko minuta.",
  link_nevazeci: "Link je istekao. Pišite nam na kontakt@letkasni.rs.",
  nije_podeseno: "Slanje trenutno nije dostupno. Pošaljite dokumenta mejlom na kontakt@letkasni.rs.",
  drive: "Slanje nije uspelo. Pokušajte ponovo.",
};

const prikaz: Record<StanjeStavke, { label: string; variant: "muted" | "info" | "success" | "danger" }> = {
  ceka: { label: "Čeka", variant: "muted" },
  salje: { label: "Šalje se…", variant: "info" },
  poslato: { label: "Primljeno", variant: "success" },
  greska: { label: "Nije poslato", variant: "danger" },
};

/** Velike fotografije sa telefona smanjuje na najviše 2400 px pre slanja (HEIC i PDF šalje kakvi jesu). */
async function smanji(fajl: File): Promise<File> {
  if (fajl.size <= maxBajtova || !/^image\/(jpeg|png|webp)$/.test(fajl.type)) {
    return fajl;
  }

  const slika = await createImageBitmap(fajl);
  const razmera = Math.min(1, 2400 / Math.max(slika.width, slika.height));
  const platno = document.createElement("canvas");
  platno.width = Math.round(slika.width * razmera);
  platno.height = Math.round(slika.height * razmera);
  platno.getContext("2d")?.drawImage(slika, 0, 0, platno.width, platno.height);
  const blob = await new Promise<Blob | null>((resolve) => platno.toBlob(resolve, "image/jpeg", 0.85));
  return blob ? new File([blob], fajl.name.replace(/\.\w+$/, ".jpg"), { type: "image/jpeg" }) : fajl;
}

function fajlova(n: number) {
  if (n % 10 === 1 && n % 100 !== 11) return "fajl";
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return "fajla";
  return "fajlova";
}

export function OtpremanjeDokumenata({ token }: { token: string }) {
  const [stavke, setStavke] = useState<Stavka[]>([]);
  const [radi, setRadi] = useState(false);
  const ulaz = useRef<HTMLInputElement>(null);

  const azuriraj = (id: string, izmena: Partial<Stavka>) =>
    setStavke((sve) => sve.map((x) => (x.id === id ? { ...x, ...izmena } : x)));

  async function posalji(lista: FileList | null) {
    if (!lista?.length) return;
    const nove = Array.from(lista).map((fajl, i) => ({
      fajl,
      stavka: { id: `${Date.now()}-${i}`, ime: fajl.name, stanje: "ceka" as StanjeStavke },
    }));
    setStavke((sve) => [...sve, ...nove.map((n) => n.stavka)]);
    setRadi(true);

    for (const { fajl, stavka } of nove) {
      azuriraj(stavka.id, { stanje: "salje" });
      try {
        const spreman = await smanji(fajl);
        if (spreman.size > maxBajtova) {
          azuriraj(stavka.id, { stanje: "greska", poruka: poruke.prevelik });
          continue;
        }
        const forma = new FormData();
        forma.append("fajl", spreman);
        const odgovor = await fetch(`/api/dokumenta/${encodeURIComponent(token)}`, { method: "POST", body: forma });
        const telo = (await odgovor.json().catch(() => ({}))) as { error?: string };
        azuriraj(
          stavka.id,
          odgovor.ok ? { stanje: "poslato" } : { stanje: "greska", poruka: poruke[telo.error ?? ""] ?? poruke.drive },
        );
      } catch {
        azuriraj(stavka.id, { stanje: "greska", poruka: poruke.drive });
      }
    }

    setRadi(false);
    if (ulaz.current) ulaz.current.value = "";
  }

  const primljeno = stavke.filter((s) => s.stanje === "poslato").length;

  return (
    <main className="min-h-screen bg-[var(--bg)] px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow mb-2">letkasni.rs</p>
        <h1 className="text-3xl font-bold tracking-[-0.03em] text-[var(--ink)]">Slanje dokumenata</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Ovde nam možete poslati dokumenta za Vaš predmet. Dokumenta vidi samo naš tim i advokat koji vodi postupak.
        </p>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Šta nam je potrebno</CardTitle>
            <CardDescription>Fotografija telefonom je sasvim dovoljna, samo da se vidi ceo dokument.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-[var(--ink)]">
              <li>pasoš ili lična karta svakog putnika</li>
              <li>boarding karta ili e-karta (potvrda o kupovini karte)</li>
              <li>potpisan ugovor o ustupanju, kada Vam ga pošaljemo</li>
            </ul>

            <label
              className={`mt-5 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-white px-4 py-8 text-center ${
                radi ? "opacity-70" : "cursor-pointer hover:bg-slate-50"
              }`}
            >
              <span className="text-sm font-semibold text-[var(--ink)]">{radi ? "Slanje je u toku…" : "Izaberite fajlove"}</span>
              <span className="mt-1 text-xs text-[var(--muted)]">JPG, PNG, HEIC ili PDF, do 4 MB po fajlu</span>
              <input
                ref={ulaz}
                type="file"
                multiple
                accept="image/*,application/pdf"
                className="sr-only"
                disabled={radi}
                onChange={(e) => posalji(e.target.files)}
              />
            </label>

            {stavke.length > 0 ? (
              <ul className="mt-4 divide-y divide-[var(--border)] text-sm">
                {stavke.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-3 py-2">
                    <span className="min-w-0">
                      <span className="block truncate text-[var(--ink)]">{s.ime}</span>
                      {s.poruka ? <span className="block text-xs text-red-700">{s.poruka}</span> : null}
                    </span>
                    <Badge variant={prikaz[s.stanje].variant}>{prikaz[s.stanje].label}</Badge>
                  </li>
                ))}
              </ul>
            ) : null}

            {primljeno > 0 && !radi ? (
              <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
                Hvala! Primili smo {primljeno} {fajlova(primljeno)}. Javićemo Vam se kada pregledamo dokumentaciju.
              </p>
            ) : null}
          </CardContent>
        </Card>

        <p className="mt-6 text-xs leading-5 text-[var(--muted)]">
          Imate pitanje ili ne možete da pošaljete fajl? Pišite nam na kontakt@letkasni.rs.
        </p>
      </div>
    </main>
  );
}
