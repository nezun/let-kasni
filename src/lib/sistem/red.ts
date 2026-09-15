import type { Baza, Posao } from "./servisi.ts";

/**
 * Red poslova za agente (tabela crm_poslovi). Server posao samo upiše i ide dalje; Nikov Mac
 * (scripts/sistem/radnik.mjs) ga preuzme kad je upaljen. Isti (vrsta, ref, ključ) je uvek isti posao.
 */
export const idPosla = (vrsta: string, ref: string, kljuc: string) => `${vrsta}--${ref}--${kljuc}`.replace(/[^A-Za-z0-9_.-]/g, "_");

export function napraviRed(baza: Baza, poslovi: Posao[], suvo: boolean) {
  const mapa = new Map(poslovi.map((p) => [p.id, p]));
  return {
    svi: () => [...mapa.values()],
    cekaju: () => [...mapa.values()].filter((p) => p.stanje === "ceka"),
    nadji: (vrsta: Posao["vrsta"], ref: string, kljuc: string) => mapa.get(idPosla(vrsta, ref, kljuc)),
    async dodaj({ vrsta, ref, kljuc, ulaz, opis }: { vrsta: Posao["vrsta"]; ref: string; kljuc: string; ulaz: Posao["ulaz"]; opis: string }) {
      const id = idPosla(vrsta, ref, kljuc);
      const postoji = mapa.get(id);
      if (postoji) return postoji;
      const nov: Posao = suvo
        ? { id, vrsta, ref, kljuc, opis, ulaz, stanje: "ceka", pokusaja: 0, radnik: null, preuzeto: null, rezultat: null, izlaz: null, trosak_usd: null, poslednja_greska: null, kreirano: new Date().toISOString() }
        : await baza.dodajPosao({ id, vrsta, ref, kljuc, opis, ulaz });
      mapa.set(id, nov);
      return nov;
    },
  };
}

export type Red = ReturnType<typeof napraviRed>;

/** Posao „radi“ duže od roka: Mac se ugasio usred rada — vraća se u red za sledeći prolaz. */
export async function vratiZaglavljene(baza: Baza, poslovi: Posao[], rokMin: number, sada: Date) {
  let n = 0;
  for (const p of poslovi) {
    if (p.stanje !== "radi" || !p.preuzeto) continue;
    if (sada.getTime() - new Date(p.preuzeto).getTime() < rokMin * 60_000) continue;
    const pokusaja = Math.max(0, p.pokusaja - 1);
    if (await baza.izmeniPosao(p.id, { stanje: "ceka", pokusaja, poslednja_greska: "prekinuto (radnik nije završio u roku)" }, "radi")) {
      Object.assign(p, { stanje: "ceka", pokusaja });
      n++;
    }
  }
  return n;
}
