import {
  LandingVariantPage,
  type VariantLandingConfig,
} from "@/components/landing-variant-page";

const config: VariantLandingConfig = {
  eyebrow: "A2 / proof-first",
  title: "Pre nego što poverujete bilo kom claim sajtu,",
  highlight: "pogledajte kako ovaj sistem zapravo odlučuje.",
  description:
    "Ova verzija manje gura hitan submit, a više gradi poverenje kroz jasan proces, eksplicitna ograničenja prvog prolaza i disciplinu u copy-ju.",
  chips: [
    "Jasan supported scope",
    "Bez prenagljenih obećanja",
    "Proces vidljiv korisniku",
  ],
  heroNote:
    "I dalje postoji jak CTA, ali hero više objašnjava zašto proizvod zaslužuje poverenje nego što gura samo submit.",
  formLabel: "Započni preliminarnu proveru",
  metrics: [
    { label: "Trust model", value: "Konzervativan" },
    { label: "User promise", value: "Jasan prvi prolaz" },
    { label: "Product tone", value: "Mirniji i ozbiljniji" },
  ],
  trustCards: [
    {
      title: "Šta proizvod jeste",
      body: "Claims handoff sa stvarnim procesom, a ne lead forma koja zvuči pravno i posle nestane.",
    },
    {
      title: "Šta proizvod nije",
      body: "Nije instant presuda koja svakom korisniku servira istu brojku bez dovoljno podataka.",
    },
    {
      title: "Zašto to povećava trust",
      body: "Korisnik vidi granice sistema i lakše veruje onome što ostane kao obećanje.",
    },
  ],
  stepIntro:
    "Ovde je važnije da korisnik razume logiku nego da ga gurnemo ka submit-u u prvoj sekundi.",
  steps: [
    {
      title: "Početni unos slučaja",
      body: "Korisnik unosi minimum podataka, ali odmah razume šta sistem pokušava da proveri i gde su granice prvog prolaza.",
    },
    {
      title: "Preliminarni verdict ili ručna provera",
      body: "Ako signal nije dovoljno pouzdan, sistem to otvoreno kaže i ne pokušava da imitira sigurnost koju nema.",
    },
    {
      title: "Operativni nastavak slučaja",
      body: "Tek kada postoji smislen osnov, slučaj dobija dalje procesiranje i jasniji sledeći korak.",
    },
  ],
  valueTitle:
    "Najbolji smer ako hoćeš da trust nosi veći deo konverzije",
  valueLead:
    "Umesto da hero obećava samo 600€, ova verzija gradi osećaj da je proizvod ozbiljan, jasan i dovoljno disciplinovan da mu korisnik veruje.",
  valuePrimary: {
    title: "Trust ovde dolazi iz strukture, ne iz hype-a",
    body: "Korisnik vidi da proizvod zna koje slučajeve najbolje podržava, zna kada mora da uključi ručni pregled i ne skriva te važne stvari iza marketinškog copy-ja.",
  },
  valueSecondary: [
    {
      title: "Manje marketinške sumnje",
      body: "Ovaj smer najbolje radi za korisnike koji su već skeptični prema claim industriji.",
    },
    {
      title: "Jači pravni ton bez law-firm estetike",
      body: "Ozbiljniji je, ali ne deluje kao zastarela kancelarijska prezentacija.",
    },
  ],
  faq: [
    {
      title: "Zašto ne kažete odmah imate pravo?",
      body: "Zato što je preliminarni signal korisniji kada ostane kredibilan nego kada je marketinški agresivan.",
    },
    {
      title: "Da li je ovo samo edukativni sajt?",
      body: "Ne. Edukacija je tu samo koliko treba da bi korisnik razumeo šta sistem proverava i zašto.",
    },
    {
      title: "Šta ako moj slučaj ne ulazi u jasan phase 1 scope?",
      body: "Takvi slučajevi ne nestaju. Samo ne dobijaju automatsku sigurnost koju sistem ne može pošteno da opravda.",
    },
    {
      title: "Kome je ova verzija najbliža?",
      body: "Korisniku koji želi brzinu, ali pre svega želi da stekne osećaj da neko zna šta radi.",
    },
  ],
  closingTitle:
    "Ako želite claims proizvod koji prvo deluje verodostojno, pa tek onda prodajno, ovo je taj smer.",
  closingBody:
    "Pošaljite slučaj i dobijte preliminarni odgovor u okviru koji ne glumi sigurnost kada je nema.",
};

export default function Page() {
  return <LandingVariantPage config={config} />;
}
