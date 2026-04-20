import {
  LandingVariantPage,
  type VariantLandingConfig,
} from "@/components/landing-variant-page";

const config: VariantLandingConfig = {
  eyebrow: "A3 / guided-first",
  title: "Ne morate prvo da znate pravila.",
  highlight: "Dovoljno je da pošaljete šta vam se desilo sa letom.",
  description:
    "Najmirnija varijanta. Umesto da deluje kao kalkulator ili agresivan conversion page, vodi korisnika kroz problem i smanjuje osećaj haosa koji je već doživeo na putovanju.",
  chips: [
    "Vođeniji flow",
    "Manje marketinškog pritiska",
    "Najbolje za zbunjenog korisnika",
  ],
  heroNote:
    "Ova verzija je najviše guided service, a najmanje claim calculator. I dalje konvertuje, ali preko osećaja vođenja.",
  formLabel: "Pošalji slučaj na proveru",
  metrics: [
    { label: "Hero ton", value: "Mirniji" },
    { label: "User feeling", value: "Vođenje" },
    { label: "Best fit", value: "Zbunjen korisnik" },
  ],
  trustCards: [
    {
      title: "Za koga je ovo",
      body: "Za korisnika koji zna da je pretrpeo haos, ali ne zna šta mu tačno po zakonu pripada niti šta prvo treba da uradi.",
    },
    {
      title: "Zašto radi",
      body: "Smanjuje kognitivni teret. Ne traži od korisnika da razume claim industriju pre nego što pošalje slučaj.",
    },
    {
      title: "Šta zadržava",
      body: "I dalje ostaje product-first i utility-first, samo sa više vođenja kroz problem.",
    },
  ],
  stepIntro:
    "Ovaj smer najviše liči na servis koji uzima haos korisniku iz glave i prevodi ga u jasan prvi korak.",
  steps: [
    {
      title: "Korisnik opisuje problem jednostavno",
      body: "Ne mora da razmišlja u pravnim terminima. Dovoljno je da zna broj leta, datum i šta je krenulo po zlu.",
    },
    {
      title: "Sistem pokušava da vrati smisao",
      body: "Prvi prolaz ne pita koliko možemo da naplatimo, nego da li ovaj slučaj vredi dalje pratiti i kojim putem.",
    },
    {
      title: "Dalji korak je pošteno objašnjen",
      body: "Ako postoji jasan osnov, korisnik to vidi. Ako ne postoji, dobija ručnu proveru bez osećaja da je odbačen.",
    },
  ],
  valueTitle:
    "Najbolji smer ako hoćeš da sajt deluje kao vođeni servis, ne kao claim mašina",
  valueLead:
    "Ovaj pravac je najbliži susretu sa stvarnim korisnikom koji nije ni pravnik ni seasoned traveler, nego neko ko je upravo imao loše iskustvo i želi da mu neko smanji nered.",
  valuePrimary: {
    title: "Najmanje zvuči kao industrijski template",
    body: "Copy i struktura su podređeni osećaju da korisnik dobija vođenje kroz problem. To može biti ključno na tržištu gde ljudi često ni ne znaju da pravo uopšte postoji.",
  },
  valueSecondary: [
    {
      title: "Najviše empatije u tonu",
      body: "Smanjuje otpor kod ljudi koji su već umorni od putovanja, novih karata, izgubljenog vremena i podrške koja ih je izneverila.",
    },
    {
      title: "I dalje dovoljno disciplinovano",
      body: "Vođenje ne znači razvodnjenost. Supported scope, ručna provera i claim tok i dalje su jasno prisutni.",
    },
  ],
  faq: [
    {
      title: "Da li moram da znam tačno koja pravila važe za moj let?",
      body: "Ne. Prva svrha sajta je da tu konfuziju prebaci sa korisnika na sistem i dalji pregled.",
    },
    {
      title: "Da li je ovo sporiji landing od drugih?",
      body: "Deluje mirnije, ali ne mora biti sporiji. Samo deo posla nosi copy koji vodi korisnika umesto agresivnog CTA pritiska.",
    },
    {
      title: "Ko će najviše voleti ovu verziju?",
      body: "Ljudi kojima je let napravio konkretan problem i kojima je važnije da ih neko vodi kroz naredni korak nego da vide veliku brojku u hero delu.",
    },
    {
      title: "Da li je i dalje komercijalno dovoljno jaka?",
      body: "Jeste, ako glavni problem tržišta nije samo awareness nego i poverenje i osećaj da je sve oko claim-ova sumnjivo ili komplikovano.",
    },
  ],
  closingTitle:
    "Ako hoćeš sajt koji korisnika prvo smiri, a tek onda usmeri ka claim-u, ovo je najbolji pravac.",
  closingBody:
    "Pošalji osnovne podatke i pusti sistem da odradi prvi prolaz bez toga da prvo sam moraš da postaneš ekspert za avio-prava.",
};

export default function Page() {
  return <LandingVariantPage config={config} />;
}
