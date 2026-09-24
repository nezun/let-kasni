// Stranice sa tajnim ključem ili tokenom u adresi (pregled predmeta, portal klijenta, slanje dokumenata) i admin:
// bez ikakvog opcionog merenja, da ključ iz URL-a ne ode spoljnim servisima (grana staging, 18.09.2026).
const BEZ_MERENJA = /^\/(admin|pregled|predmet|dokumenta)(\/|$)/;

export function allowsOptionalTracking(pathname: string | null | undefined) {
  return typeof pathname === "string" && pathname.length > 0 && !BEZ_MERENJA.test(pathname);
}
