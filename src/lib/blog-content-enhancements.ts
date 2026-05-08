import type { BlogArticle, BlogLocale, BlogSection } from "@/lib/blog";

const parentGuideByArticle: Record<
  string,
  {
    sr: { title: string; href: string };
    en: { title: string; href: string };
  }
> = {
  "flight-delay-compensation": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "bad-weather-flight-delay": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "technical-fault-flight-compensation": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "previous-flight-rotation-delay": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "overnight-delay-hotel-rights": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "self-rerouting-new-ticket": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "air-traffic-control-slot-delay": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "bird-strike-flight-delay": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "lightning-strike-aircraft-delay": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "medical-emergency-flight-delay": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "crew-shortage-flight-delay": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "night-flight-ban-curfew": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "flight-diverted-rights": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "wizz-air-flight-delay-compensation": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "air-serbia-flight-delay-compensation": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "lufthansa-flight-delay-compensation": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "austrian-airlines-flight-delay-compensation": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "turkish-airlines-flight-delay-compensation": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "ryanair-flight-delay-compensation": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "easyjet-flight-delay-compensation": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "klm-flight-delay-compensation": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "air-france-flight-delay-compensation": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "swiss-flight-delay-compensation": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "two-hour-flight-delay-rights": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "three-hour-flight-delay-compensation": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "four-hour-flight-delay-rights": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "five-hour-flight-delay-refund": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "delayed-flight-airport-action-plan": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "flight-delay-reason-evidence": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "meal-voucher-flight-delay": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "flight-delay-final-arrival-time": {
    sr: { title: "Naknada za kašnjenje leta", href: "/naknada-za-kasnjenje-leta" },
    en: { title: "Flight delay compensation", href: "/en/flight-delay-compensation" },
  },
  "cancelled-flight-rights": {
    sr: { title: "Naknada za otkazan let", href: "/naknada-za-otkazan-let" },
    en: { title: "Flight cancellation compensation", href: "/en/flight-cancellation-compensation" },
  },
  "cancellation-under-14-days": {
    sr: { title: "Naknada za otkazan let", href: "/naknada-za-otkazan-let" },
    en: { title: "Flight cancellation compensation", href: "/en/flight-cancellation-compensation" },
  },
  "airline-bankruptcy-passenger-rights": {
    sr: { title: "Naknada za otkazan let", href: "/naknada-za-otkazan-let" },
    en: { title: "Flight cancellation compensation", href: "/en/flight-cancellation-compensation" },
  },
  "flight-moved-earlier-rights": {
    sr: { title: "Naknada za otkazan let", href: "/naknada-za-otkazan-let" },
    en: { title: "Flight cancellation compensation", href: "/en/flight-cancellation-compensation" },
  },
  "missed-connection": {
    sr: { title: "Naknada za propuštenu konekciju", href: "/naknada-za-propustenu-konekciju" },
    en: { title: "Missed connection compensation", href: "/en/missed-connection-compensation" },
  },
  "separate-tickets-missed-connection": {
    sr: { title: "Naknada za propuštenu konekciju", href: "/naknada-za-propustenu-konekciju" },
    en: { title: "Missed connection compensation", href: "/en/missed-connection-compensation" },
  },
  "serbia-eu-transit-routes": {
    sr: { title: "Naknada za propuštenu konekciju", href: "/naknada-za-propustenu-konekciju" },
    en: { title: "Missed connection compensation", href: "/en/missed-connection-compensation" },
  },
  "denied-boarding-overbooking": {
    sr: { title: "Overbooking naknada", href: "/overbooking-naknada" },
    en: { title: "Overbooking compensation", href: "/en/overbooking-compensation" },
  },
  "voluntary-denied-boarding-voucher": {
    sr: { title: "Overbooking naknada", href: "/overbooking-naknada" },
    en: { title: "Overbooking compensation", href: "/en/overbooking-compensation" },
  },
  "voucher-or-cash-compensation": {
    sr: { title: "Overbooking naknada", href: "/overbooking-naknada" },
    en: { title: "Overbooking compensation", href: "/en/overbooking-compensation" },
  },
  "missed-flight-security-queue": {
    sr: { title: "Naknada za uskraćeno ukrcavanje", href: "/naknada-za-uskraceno-ukrcavanje" },
    en: { title: "Denied boarding compensation", href: "/en/denied-boarding-compensation" },
  },
  "delayed-baggage-after-flight": {
    sr: { title: "Naknada za kašnjenje prtljaga", href: "/naknada-za-kasnjenje-prtljaga" },
    en: { title: "Delayed baggage compensation", href: "/en/delayed-baggage-compensation" },
  },
  "airline-strike-compensation": {
    sr: { title: "Naknada za štrajk aviokompanije", href: "/naknada-za-strajk-aviokompanije" },
    en: { title: "Airline strike compensation", href: "/en/airline-strike-compensation" },
  },
  "airport-strike-flight-rights": {
    sr: { title: "Naknada za štrajk aviokompanije", href: "/naknada-za-strajk-aviokompanije" },
    en: { title: "Airline strike compensation", href: "/en/airline-strike-compensation" },
  },
};

const defaultParentGuide = {
  sr: { title: "Prava putnika u avio-saobraćaju", href: "/prava-putnika-u-aviosaobracaju" },
  en: { title: "Air passenger rights", href: "/en/air-passenger-rights" },
};

const airlineDelayArticleIds = new Set([
  "wizz-air-flight-delay-compensation",
  "air-serbia-flight-delay-compensation",
  "lufthansa-flight-delay-compensation",
  "austrian-airlines-flight-delay-compensation",
  "turkish-airlines-flight-delay-compensation",
  "ryanair-flight-delay-compensation",
  "easyjet-flight-delay-compensation",
  "klm-flight-delay-compensation",
  "air-france-flight-delay-compensation",
  "swiss-flight-delay-compensation",
]);

const delayScenarioArticleIds = new Set([
  "four-hour-flight-delay-rights",
  "five-hour-flight-delay-refund",
  "delayed-flight-airport-action-plan",
  "flight-delay-reason-evidence",
  "meal-voucher-flight-delay",
  "flight-delay-final-arrival-time",
]);

function parentFor(articleId: string, locale: BlogLocale) {
  return (parentGuideByArticle[articleId] ?? defaultParentGuide)[locale];
}

function srAirlineDelaySections(article: BlogArticle): BlogSection[] {
  if (!airlineDelayArticleIds.has(article.id)) {
    return [];
  }

  return [
    {
      heading: "Kako brzo sortirati slučaj pre slanja",
      body: [
        `Za ${article.sr.title.toLowerCase()} najkorisnije je da slučaj odmah pretvorite u mali skup podataka, a ne u dugu žalbu. Unesite broj leta, datum, aerodrom polaska, krajnju destinaciju, planirano vreme dolaska, stvarno vreme dolaska, razlog koji je aviokompanija navela i troškove koje ste imali. Kada su ti podaci na jednom mestu, mnogo je lakše videti da li je slučaj za fiksnu naknadu, refundaciju troškova ili samo za dodatno objašnjenje.`,
        "Ovakav redosled smanjuje ručni rad i greške. Ako se kasnije šalje dopuna, ne piše se sve iz početka: dodaje se samo novi dokaz, odgovor aviokompanije ili račun. To je posebno važno kod aviokompanija koje koriste kratke generičke odgovore, jer uredan fajl odmah pokazuje šta nije odgovoreno.",
        "Za ponovljive provere najbolje je čuvati isti format za svaki let: osnovni podaci, razlog kašnjenja, vremenska linija, troškovi i status odgovora. Tako se više putnika ili više letova mogu uporediti bez kopiranja haotičnih beleški iz emaila, aplikacije i fotografija, bez naknadnog nagađanja.",
      ],
    },
  ];
}

function enAirlineDelaySections(article: BlogArticle): BlogSection[] {
  if (!airlineDelayArticleIds.has(article.id)) {
    return [];
  }

  return [
    {
      heading: "How to sort the case before sending it",
      body: [
        `For ${article.en.title.toLowerCase()}, the most useful step is to turn the case into a small data set instead of a long complaint. Record the flight number, date, departure airport, final destination, scheduled arrival, actual arrival, reason given by the airline and costs incurred. Once those facts are in one place, it is much easier to see whether the case is about fixed compensation, expense reimbursement or only a request for a better explanation.`,
        "This order reduces manual work and mistakes. If a follow-up is needed later, you do not write everything again: you add only the new proof, airline reply or receipt. That matters with airlines that use short generic answers, because a structured file shows immediately what was not answered.",
        "For repeatable checks, keep the same format for every flight: core details, delay reason, timeline, costs and response status. That allows several passengers or several flights to be compared without copying scattered notes from email, apps and photos.",
      ],
    },
  ];
}

function srDelayScenarioSections(article: BlogArticle): BlogSection[] {
  if (!delayScenarioArticleIds.has(article.id)) {
    return [];
  }

  return [
    {
      heading: "Mini-checklist za ponovljivu proveru",
      body: [
        "Najbrži način da se ovakav slučaj proveri bez haotičnog prepisivanja jeste da ga odmah svedete na isti obrazac: ruta, jedna ili više rezervacija, planirano vreme dolaska, stvarno vreme dolaska, razlog koji je saopšten, ponuđena pomoć i troškovi. Kada svaka prijava ima isti redosled, lakše je uporediti slučajeve i uočiti šta nedostaje.",
        "Za putnike koji često lete iz Beograda, Niša, Kraljeva ili preko evropskih čvorišta, ovaj obrazac posebno smanjuje greške. Ne morate svaki put iznova razmišljati šta se čuva: boarding pass, booking potvrda, poruke aviokompanije, screenshot aplikacije, fotografija table i računi ulaze u isti folder ili istu belešku.",
        `Kod teme ${article.sr.title.toLowerCase()} cilj nije samo poslati zahtev, već poslati zahtev koji se može brzo proveriti. Ako aviokompanija odgovori delimično, obrazac odmah pokazuje koji podatak nedostaje i koju dopunu treba tražiti, umesto da se cela priča piše ponovo od početka.`,
        "Praktično pravilo je da svaka stavka ima izvor: vreme iz aplikacije, razlog iz poruke, trošak iz računa, konekciju iz itinerera. Kada jedna stavka nema izvor, odmah znate šta još treba pribaviti pre slanja, naročito ako je slučaj blizu vremenskog praga.",
      ],
    },
  ];
}

function enDelayScenarioSections(article: BlogArticle): BlogSection[] {
  if (!delayScenarioArticleIds.has(article.id)) {
    return [];
  }

  return [
    {
      heading: "Mini-checklist for repeatable review",
      body: [
        "The fastest way to review this type of case without messy rewriting is to put it into the same structure every time: route, one or several bookings, scheduled arrival, actual arrival, stated reason, assistance offered and costs. When every claim follows the same order, it is easier to compare cases and see what is missing.",
        "For travelers who often fly from Belgrade, Nis, Kraljevo or through European hubs, this structure reduces mistakes. You do not need to decide again what to save: boarding pass, booking confirmation, airline messages, app screenshot, departures-board photo and receipts go into the same folder or note.",
        `For ${article.en.title.toLowerCase()}, the goal is not only to send a claim, but to send one that can be checked quickly. If the airline answers only partly, the structure shows which fact is missing and which follow-up should be requested instead of rewriting the whole story from the beginning.`,
        "A useful rule is that every item should have a source: time from the app, reason from a message, cost from a receipt and connection from the itinerary. If one item has no source, you know what to collect before sending.",
      ],
    },
  ];
}

function srEnhancementSections(article: BlogArticle): BlogSection[] {
  const parent = parentFor(article.id, "sr");
  const topic = article.sr.title.toLowerCase();

  return [
    {
      heading: "Kako ovaj slučaj uklopiti u širu procenu",
      body: [
        `Ovaj tekst je detaljan deo šire teme ${parent.title}. To je važno zato što se ${topic} ne procenjuje izolovano: prvo se proverava da li ruta ulazi u zaštitu, zatim šta se stvarno dogodilo, pa tek onda koji zahtev ima smisla. Ako preskočite taj redosled, lako možete tražiti pogrešno pravo ili poslati zahtev koji aviokompanija odbije jednom generičkom rečenicom.`,
        "Najbolji pristup je da napravite kratku hronologiju. Zapišite planirano vreme, stvarno vreme, gde ste bili kada je problem nastao, šta je aviokompanija ponudila, šta ste prihvatili i šta ste sami platili. Ta hronologija kasnije odlučuje da li je reč o fiksnoj naknadi, refundaciji karte, refundaciji troškova ili samo pravu na brigu.",
        "Ako se u slučaju pojavljuje kašnjenje dolaska, propuštena konekcija, preusmeravanje ili čekanje preko noći, uvek dodatno proverite i naknadu za kašnjenje leta. Većina praktičnih pitanja putnika na kraju zavisi od toga koliko je kasno završeno celo putovanje i da li je razlog bio u kontroli aviokompanije."
      ],
    },
    {
      heading: "Dokazi koji menjaju ishod zahteva",
      body: [
        "Kod ovakvih slučajeva najviše pomažu dokazi koji pokazuju činjenice iz istog dana: boarding pass, potvrda rezervacije, poruke aviokompanije, screenshot aplikacije, fotografija table polazaka, računi za hranu, hotel ili transfer i svaka pisana informacija koju ste dobili na aerodromu.",
        "Ako je razlog objašnjen usmeno, zapišite tačnu formulaciju, vreme i mesto. Ako se razlog promenio, sačuvajte sve verzije. Razlika između tehničkog kvara, kontrole letenja, lošeg vremena, štrajka i nedostatka posade nije formalnost; to je često granica između jakog i slabog zahteva.",
        "U zahtevu nemojte samo napisati da tražite odštetu. Navedite broj leta, datum, rutu, booking referencu, planirano i stvarno vreme dolaska, kratku hronologiju i jasno odvojite fiksnu naknadu od troškova koje želite da vam se refundiraju."
      ],
    },
    {
      heading: "Kada ne treba stati na prvom odgovoru aviokompanije",
      body: [
        "Prvi odgovor aviokompanije često nije puna analiza slučaja. Može sadržati samo opštu formulaciju, automatski izabranu kategoriju ili odgovor koji pokriva samo jedan deo zahteva. Zato ga treba čitati pažljivo: da li odgovara na tačan let, tačan datum, krajnju destinaciju i konkretan razlog koji je doveo do poremećaja.",
        "Ako odgovor ne pominje dokaze, vremensku liniju ili mere koje je kompanija preduzela, pošaljite kratku dopunu. Ne morate ponavljati celu priču. Dovoljno je da tražite precizno objašnjenje i da ponovo priložite najvažnije dokaze. Takva dopuna često razdvoji slučajeve koji su zaista slabi od slučajeva koji su samo površno odbijeni.",
      ],
    },
  ];
}

function enEnhancementSections(article: BlogArticle): BlogSection[] {
  const parent = parentFor(article.id, "en");
  const topic = article.en.title.toLowerCase();

  return [
    {
      heading: "How this case fits into the wider assessment",
      body: [
        `This article is a detailed part of the wider ${parent.title} topic. That matters because ${topic} should not be assessed in isolation: first check whether the route is protected, then what actually happened, and only then which claim makes sense. If you skip that order, it is easy to ask for the wrong right or send a claim the airline can reject with one broad sentence.`,
        "The best approach is to build a short timeline. Write down the scheduled time, actual time, where you were when the problem happened, what the airline offered, what you accepted and what you paid yourself. That timeline later decides whether the case is about fixed compensation, ticket refund, expense reimbursement or only care rights.",
        "If the case involves arrival delay, a missed connection, rerouting or an overnight wait, also check flight delay compensation. Most practical passenger questions eventually depend on how late the whole journey ended and whether the reason was within the airline's control."
      ],
    },
    {
      heading: "Evidence that can change the outcome",
      body: [
        "The strongest evidence is evidence from the same day: boarding pass, booking confirmation, airline messages, app screenshot, departures-board photo, receipts for food, hotel or transfer and any written information received at the airport.",
        "If the reason was explained verbally, write down the exact wording, time and place. If the reason changed, keep every version. The difference between a technical fault, air traffic control, bad weather, strike and crew shortage is not a formality; it is often the line between a strong and weak claim.",
        "In the claim, do not only say that you want compensation. Include flight number, date, route, booking reference, scheduled and actual arrival time, a short timeline and a clear separation between fixed compensation and expenses you want reimbursed."
      ],
    },
    {
      heading: "When not to stop at the airline's first answer",
      body: [
        "The airline's first reply is often not a full assessment. It may contain broad wording, an automatically selected category or an answer that covers only one part of the claim. Read it carefully: does it address the exact flight, date, final destination and concrete reason that caused the disruption?",
        "If the answer does not mention evidence, timeline or the measures the airline took, send a short follow-up. You do not need to repeat the whole story. Ask for a precise explanation and attach the most important proof again. That follow-up often separates genuinely weak cases from cases that were only rejected superficially.",
      ],
    },
  ];
}

export function enhanceBlogArticle(article: BlogArticle): BlogArticle {
  return {
    ...article,
    sr: {
      ...article.sr,
      sections: [
        ...article.sr.sections,
        ...srAirlineDelaySections(article),
        ...srDelayScenarioSections(article),
        ...srEnhancementSections(article),
      ],
      readTime: "8 min čitanja",
    },
    en: {
      ...article.en,
      sections: [
        ...article.en.sections,
        ...enAirlineDelaySections(article),
        ...enDelayScenarioSections(article),
        ...enEnhancementSections(article),
      ],
      readTime: "8 min read",
    },
  };
}
