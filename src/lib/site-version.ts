// Dve paralelne verzije sajta za probu (Niko, preko CTO-a, 28.09.2026): A je sadašnji sajt, B ima nov logo/ikonice i
// dugmad koja vode u kratku formu. Verziju bira ?verzija=a|b (proxy.ts je pretvara u kolačić); bez kolačića je A.
// Ovaj fajl je jedino mesto koje zna ime kolačića i podrazumevanu vrednost — proxy.ts, Server i Client komponente
// ga koriste na svoj način (cookies() na serveru, document.cookie na klijentu).
export const KOLACIC_VERZIJA = "lk_verzija";

export type SiteVerzija = "a" | "b";

export function jeValidnaVerzija(value: string | null | undefined): value is SiteVerzija {
  return value === "a" || value === "b";
}

/** Server Components/Route Handlers: čita kolačić preko next/headers cookies(). */
export async function getSiteVerzija(): Promise<SiteVerzija> {
  const { cookies } = await import("next/headers");
  const vrednost = (await cookies()).get(KOLACIC_VERZIJA)?.value;
  return jeValidnaVerzija(vrednost) ? vrednost : "a";
}

/** Client komponente: čita isti kolačić iz document.cookie (kolačić namerno nije httpOnly). */
export function getSiteVerzijaClient(): SiteVerzija {
  // Testovi i neki alati simuliraju delimičan DOM (document postoji, cookie ne mora biti string).
  if (typeof document === "undefined" || typeof document.cookie !== "string") return "a";
  const match = document.cookie.match(/(?:^|;\s*)lk_verzija=(a|b)(?:;|$)/);
  return jeValidnaVerzija(match?.[1]) ? match[1] : "a";
}
