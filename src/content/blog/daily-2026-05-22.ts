import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "serbia-united-kingdom-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Passengers waiting near large airport windows before a hub connection",
    position: "center",
  },
  "serbia-united-arab-emirates-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Wide-body aircraft crossing clouds on a long-haul route",
    position: "center",
  },
  "serbia-israel-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft parked at a gate before a seasonal leisure route",
    position: "center",
  },
  "serbia-france-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Traveler checking a delayed flight in an airport terminal",
    position: "center",
  },
  "serbia-italy-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Runway lights during a short European route delay",
    position: "center",
  },
  "serbia-netherlands-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport departures board during a connection delay",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

type Topic = {
  id: string;
  srSlug: string;
  enSlug: string;
  srTitle: string;
  enTitle: string;
  srDescription: string;
  enDescription: string;
  srExcerpt: string;
  enExcerpt: string;
  kind: "airline" | "route";
  label: string;
  srContext: string;
  enContext: string;
  srRouteRule: string;
  enRouteRule: string;
  srEvidence: string;
  enEvidence: string;
};

const srBullets = [
  "Utvrditi operativnog prevoznika, a ne samo brend na karti.",
  "Uporediti planirani i stvarni dolazak na krajnju destinaciju.",
  "Odvojiti fiksnu naknadu od računa za brigu, hotel ili novu kartu.",
  "Tražiti konkretan razlog kašnjenja ako je odgovor generički.",
];

const enBullets = [
  "Identify the operating carrier, not only the brand shown on the ticket.",
  "Compare scheduled and actual arrival at the final destination.",
  "Separate fixed compensation from care, hotel or new-ticket receipts.",
  "Ask for the concrete delay reason if the reply is generic.",
];

function srSections(topic: Topic) {
  const intro =
    topic.kind === "airline"
      ? `Kod ${topic.label} leta ne treba zaključivati samo po tome koliko je avion kasnio u polasku. Za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta) prvo se gleda dolazak na krajnju destinaciju, zatim ruta, operativni prevoznik i razlog kašnjenja. ${topic.srContext}`
      : `Kod rute ${topic.label} najvažnije je da se utvrdi da li je putovanje zaštićeno evropskim pravilima i da li je dolazak na krajnju destinaciju kasnio tri sata ili više. Osnovna pravila za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta) ostaju ista, ali smer rute i prevoznik često menjaju procenu. ${topic.srContext}`;

  return [
    {
      heading: topic.kind === "airline" ? "Kada kašnjenje ove aviokompanije vredi proveriti" : "Kada kašnjenje na ovoj ruti vredi proveriti",
      body: [
        intro,
        "Dobar zahtev počinje od činjenica, ne od utiska da je čekanje bilo nepravedno. Zapišite broj leta, datum, rezervaciju, planirani dolazak, stvarni dolazak, poruke aviokompanije i pomoć koju ste dobili. Ako su letovi bili u jednoj rezervaciji, posebno sačuvajte dokaz o krajnjoj destinaciji, jer se kod konekcija ne završava analiza na prvom segmentu.",
      ],
      bullets: srBullets,
    },
    {
      heading: "Ruta, smer putovanja i jedna rezervacija",
      body: [
        topic.srRouteRule,
        "Ako je karta kupljena kao jedna rezervacija, kašnjenje na prvom segmentu može biti važno i kada je naredni let obavila druga aviokompanija. Ako su karte kupljene odvojeno, slučaj je uži: tada se obično proverava samo segment koji je kasnio i troškovi koje je prevoznik direktno izazvao.",
      ],
    },
    {
      heading: "Razlog kašnjenja i granica odgovornosti",
      body: [
        "Aviokompanija može navesti tehnički kvar, prethodnu rotaciju, posadu, slot kontrole letenja, loše vreme, zatvaranje aerodroma ili bezbednosni događaj. Nije svaki razlog isti. Tehnički i operativni problemi često se proveravaju strože, dok vreme, bezbednost i kontrola letenja mogu biti jači argument protiv fiksne naknade.",
        "Ipak, generička rečenica nije dovoljna da putnik razume slučaj. Ako se navodi vanredna okolnost, tražite kada je nastala, koliko je trajala, zašto je pogodila baš vaš let i šta je prevoznik uradio da smanji posledice. Bez tih podataka odgovor je teško proverljiv.",
      ],
    },
    {
      heading: "Briga, hotel, transfer i dodatni troškovi",
      body: [
        "Kod dužeg čekanja tražite obrok, osveženje i jasnu informaciju o novom polasku. Ako čekanje pređe u noć, hotel i transfer treba tražiti odmah, a ako ih sami plaćate, troškovi treba da budu razumni i potkrepljeni računima.",
        "Pravo na brigu je odvojeno od fiksne naknade. Moguće je da aviokompanija ima jači argument protiv 250, 400 ili 600 evra, ali da računi za hranu, vodu, smeštaj ili prevoz i dalje ostanu relevantni. Zato ih u zahtevu treba navesti odvojeno.",
      ],
    },
    {
      heading: "Dokazi koje Let Kasni proverava pre slanja zahteva",
      body: [
        topic.srEvidence,
        "Najbolji format je kratka vremenska linija: kada ste dobili prvo obaveštenje, kada je promenjen polazak, kada je avion stigao, kada su otvorena vrata i koji odgovor ste dobili. Takav dosije smanjuje ručni rad i omogućava da se kasnije dopuni samo podatak koji nedostaje.",
      ],
    },
  ];
}

function enSections(topic: Topic) {
  const intro =
    topic.kind === "airline"
      ? `For a ${topic.label} flight, do not decide the case only by departure delay. For [flight delay compensation](/en/flight-delay-compensation), first check arrival at the final destination, then the route, operating carrier and delay reason. ${topic.enContext}`
      : `On the ${topic.label} route, the first question is whether European passenger-rights rules protect the journey and whether final arrival was three hours or more late. The baseline [flight delay compensation](/en/flight-delay-compensation) rules stay the same, but direction of travel and carrier often change the assessment. ${topic.enContext}`;

  return [
    {
      heading: topic.kind === "airline" ? "When this airline delay is worth checking" : "When this route delay is worth checking",
      body: [
        intro,
        "A strong claim starts with facts, not with the feeling that the wait was unfair. Record the flight number, date, booking, scheduled arrival, actual arrival, airline messages and assistance offered. If the flights were under one booking, keep proof of the final destination because connection cases do not stop at the first segment.",
      ],
      bullets: enBullets,
    },
    {
      heading: "Route, travel direction and one booking",
      body: [
        topic.enRouteRule,
        "If the ticket was sold as one booking, a delay on the first segment can matter even when another airline operated the onward flight. If tickets were bought separately, the case is narrower: usually only the delayed segment and costs directly caused by that carrier are reviewed.",
      ],
    },
    {
      heading: "Delay reason and responsibility boundary",
      body: [
        "The airline may cite technical fault, previous aircraft rotation, crew, air traffic control slot, bad weather, airport closure or a security event. These reasons are not equal. Technical and operational problems are often checked more strictly, while weather, security and air traffic control may be stronger arguments against fixed compensation.",
        "Still, broad wording is not enough for a passenger to understand the case. If extraordinary circumstances are cited, ask when they happened, how long they lasted, why they affected your flight and what the carrier did to reduce the disruption. Without those facts, the reply is hard to verify.",
      ],
    },
    {
      heading: "Care, hotel, transfer and extra costs",
      body: [
        "During a longer wait, ask for meals, refreshments and clear information about the new departure time. If the wait moves overnight, ask for hotel and transfer immediately. If you pay yourself, costs should be reasonable and supported by receipts.",
        "Care rights are separate from fixed compensation. The airline may have a stronger argument against 250, 400 or 600 euros while food, water, accommodation or transfer receipts remain relevant. List them separately in the claim.",
      ],
    },
    {
      heading: "Evidence Let Kasni checks before filing",
      body: [
        topic.enEvidence,
        "The best format is a short timeline: first notice, changed departure, actual arrival, door-opening time and the reply received. That file reduces manual work and makes later follow-up a matter of adding the missing fact instead of rewriting the whole story.",
      ],
    },
  ];
}

function article(topic: Topic): BlogArticle {
  return {
    id: topic.id,
    publishedAt: "2026-05-22",
    updatedAt: "2026-05-22",
    sr: {
      slug: topic.srSlug,
      title: topic.srTitle,
      description: topic.srDescription,
      excerpt: topic.srExcerpt,
      category: topic.kind === "airline" ? "Aviokompanije" : "Rute",
      readTime: "8 min čitanja",
      sections: srSections(topic),
    },
    en: {
      slug: topic.enSlug,
      title: topic.enTitle,
      description: topic.enDescription,
      excerpt: topic.enExcerpt,
      category: topic.kind === "airline" ? "Airlines" : "Routes",
      readTime: "8 min read",
      sections: enSections(topic),
    },
  };
}

const topics: Topic[] = [
  {
    id: "serbia-united-kingdom-flight-delay-compensation",
    srSlug: "srbija-ujedinjeno-kraljevstvo-kasnjenje-leta-naknada",
    enSlug: "serbia-united-kingdom-flight-delay-compensation",
    srTitle: "Srbija - Ujedinjeno Kraljevstvo kašnjenje leta: London i naknada",
    enTitle: "Serbia - United Kingdom flight delay: London and compensation",
    srDescription: "Kako proveriti kašnjenja između Srbije i Ujedinjenog Kraljevstva: London, konekcije, smer puta, troškovi i dokazi.",
    enDescription: "How to check delays between Serbia and the United Kingdom: London, connections, direction of travel, costs and evidence.",
    srExcerpt: "Na rutama Srbija - Ujedinjeno Kraljevstvo posle Brexita posebno se proveravaju smer leta, jedna rezervacija i operativni prevoznik.",
    enExcerpt: "On Serbia - United Kingdom routes after Brexit, travel direction, one booking and operating carrier need careful review.",
    kind: "route",
    label: "Srbija - Ujedinjeno Kraljevstvo",
    srContext: "London može biti kraj putovanja ili presedanje ka daljoj destinaciji, pa se kod jedne rezervacije gleda poslednji dolazak iz karte.",
    enContext: "London can be the end of the trip or a connection to another destination, so under one booking the last arrival on the ticket matters.",
    srRouteRule: "Posle Brexita ne treba automatski pretpostaviti isti okvir kao za EU rute. Ako je u putovanju postojao EU polazak, EU segment ili evropski operativni prevoznik, slučaj treba proveriti precizno po segmentima.",
    enRouteRule: "After Brexit, do not automatically assume the same framework as for EU routes. If the journey included an EU departure, EU segment or European operating carrier, the case should be checked precisely by segment.",
    srEvidence: "Za rutu preko Londona korisni su itinerary, dokaz propuštene konekcije, poruke o promeni leta, potvrda novog polaska i računi za hotel ili transfer ako je čekanje prešlo u noć.",
    enEvidence: "For a London route, the itinerary, proof of a missed connection, flight-change messages, replacement-departure confirmation and hotel or transfer receipts are useful if the wait moved overnight.",
  },
  {
    id: "serbia-united-arab-emirates-flight-delay-compensation",
    srSlug: "srbija-ujedinjeni-arapski-emirati-kasnjenje-leta-naknada",
    enSlug: "serbia-united-arab-emirates-flight-delay-compensation",
    srTitle: "Srbija - UAE kašnjenje leta: Dubai, Abu Dabi i duga ruta",
    enTitle: "Serbia - UAE flight delay: Dubai, Abu Dhabi and long routes",
    srDescription: "Vodič za kašnjenja između Srbije i UAE: dugi letovi, EU segmenti, Dubai veza, briga tokom čekanja i dokaz dolaska.",
    enDescription: "A guide to delays between Serbia and the UAE: long routes, EU segments, Dubai connection, care during the wait and arrival proof.",
    srExcerpt: "Kod UAE ruta cena karte i dužina puta nisu dovoljni; presudni su polazak, prevoznik, jedna rezervacija i dokaz krajnjeg dolaska.",
    enExcerpt: "For UAE routes, ticket price and trip length are not enough; departure, carrier, one booking and final-arrival proof are decisive.",
    kind: "route",
    label: "Srbija - UAE",
    srContext: "Dubai i Abu Dabi često su veza ka Aziji, Australiji ili Africi, pa je važno dokazati gde je trebalo da se završi celo putovanje.",
    enContext: "Dubai and Abu Dhabi are often connections to Asia, Australia or Africa, so it is important to prove where the whole journey was supposed to end.",
    srRouteRule: "Let ka UAE ne ulazi automatski u isti okvir kao polazak iz EU. Ako je postojao EU segment ili evropski operativni prevoznik, proverava se cela rezervacija i svaki segment posebno.",
    enRouteRule: "A flight to the UAE does not automatically follow the same framework as an EU departure. If there was an EU segment or European operating carrier, the whole booking and each segment should be checked separately.",
    srEvidence: "Za UAE rute najvažniji su dokaz krajnjeg dolaska, boarding pass za svaki segment, poruke o novom letu, hotelski vaučeri i računi ako je duga konekcija napravila dodatne troškove.",
    enEvidence: "For UAE routes, final-arrival proof, boarding passes for each segment, replacement-flight messages, hotel vouchers and receipts matter most if a long connection created extra costs.",
  },
  {
    id: "serbia-israel-flight-delay-compensation",
    srSlug: "srbija-izrael-kasnjenje-leta-naknada",
    enSlug: "serbia-israel-flight-delay-compensation",
    srTitle: "Srbija - Izrael kašnjenje leta: Tel Aviv, bezbednost i dokazi",
    enTitle: "Serbia - Israel flight delay: Tel Aviv, security and evidence",
    srDescription: "Kako proveriti kašnjenje između Srbije i Izraela: Tel Aviv, bezbednosni razlozi, EU segmenti, troškovi i dokaz veze sa letom.",
    enDescription: "How to check a delay between Serbia and Israel: Tel Aviv, security reasons, EU segments, costs and proof of link to the flight.",
    srExcerpt: "Kod rute Srbija - Izrael razlog kašnjenja često traži pažljivu proveru, naročito ako se navode bezbednost ili ograničenja aerodroma.",
    enExcerpt: "On the Serbia - Israel route, the delay reason often needs careful review, especially when security or airport restrictions are cited.",
    kind: "route",
    label: "Srbija - Izrael",
    srContext: "Tel Aviv može uključiti bezbednosne provere, promene reda letenja i duža objašnjenja, pa generički odgovor ne treba uzeti kao kraj procene.",
    enContext: "Tel Aviv may involve security checks, schedule changes and longer explanations, so a generic reply should not be treated as the end of the assessment.",
    srRouteRule: "Pošto Izrael nije EU ruta u užem smislu, proveravaju se smer putovanja, operativni prevoznik i eventualni EU segment. Ako je put nastavljen preko evropskog čvorišta, jedna rezervacija postaje posebno važna.",
    enRouteRule: "Because Israel is not an EU route in the narrow sense, direction of travel, operating carrier and any EU segment are checked. If the trip continued through a European hub, one booking becomes especially important.",
    srEvidence: "Za Izrael rutu korisni su obaveštenje o razlogu kašnjenja, dokaz da je ograničenje pogodilo baš vaš let, nova satnica, računi za čekanje i dokaz krajnjeg dolaska ako je postojao nastavak puta.",
    enEvidence: "For the Israel route, useful evidence includes the delay-reason notice, proof that the restriction affected your flight, revised timing, waiting receipts and final-arrival proof if there was onward travel.",
  },
  {
    id: "serbia-france-flight-delay-compensation",
    srSlug: "srbija-francuska-kasnjenje-leta-naknada",
    enSlug: "serbia-france-flight-delay-compensation",
    srTitle: "Srbija - Francuska kašnjenje leta: Pariz, Nica i naknada",
    enTitle: "Serbia - France flight delay: Paris, Nice and compensation",
    srDescription: "Vodič za kašnjenja između Srbije i Francuske: smer leta, EU zaštita, konekcije, briga i dokazi.",
    enDescription: "A guide to delays between Serbia and France: direction of travel, EU protection, connections, care and evidence.",
    srExcerpt: "Na rutama Srbija - Francuska smer leta i operativni prevoznik često odlučuju kako se proverava zahtev.",
    enExcerpt: "On Serbia - France routes, direction of travel and operating carrier often decide how the claim is reviewed.",
    kind: "route",
    label: "Srbija - Francuska",
    srContext: "Pariz može biti krajnja destinacija, ali i veliko čvorište za nastavak putovanja, pa se kod jedne rezervacije gleda stvarni dolazak na poslednju destinaciju.",
    enContext: "Paris can be the final destination or a large onward hub, so under one booking the actual arrival at the last destination matters.",
    srRouteRule: "Polazak iz Francuske kao EU države obično daje jasniji okvir zaštite. Kod polaska iz Srbije ka Francuskoj posebno proverite ko je operativni prevoznik i da li je ruta deo jedne rezervacije.",
    enRouteRule: "Departure from France as an EU state usually gives a clearer protection framework. On departures from Serbia to France, check especially who operated the flight and whether the route was part of one booking.",
    srEvidence: "Za Francusku rutu sačuvajte boarding pass, booking potvrdu, poruke prevoznika, dokaz dolaska u Pariz ili Nicu i svaki dokaz da ste zbog kašnjenja izgubili dalji let ili plaćeni transfer.",
    enEvidence: "For the France route, keep the boarding pass, booking confirmation, carrier messages, proof of arrival in Paris or Nice and any proof that the delay caused a missed onward flight or paid transfer.",
  },
  {
    id: "serbia-italy-flight-delay-compensation",
    srSlug: "srbija-italija-kasnjenje-leta-naknada",
    enSlug: "serbia-italy-flight-delay-compensation",
    srTitle: "Srbija - Italija kašnjenje leta: Rim, Milano i prava putnika",
    enTitle: "Serbia - Italy flight delay: Rome, Milan and passenger rights",
    srDescription: "Kako proveriti kašnjenje leta između Srbije i Italije, prag od tri sata, care prava, konekcije i dokaze.",
    enDescription: "How to check a delay between Serbia and Italy, the three-hour threshold, care rights, connections and evidence.",
    srExcerpt: "Italijanske rute su često kratke, ali propuštena konekcija, noćno čekanje ili promena aerodroma mogu promeniti slučaj.",
    enExcerpt: "Italy routes are often short, but a missed connection, overnight wait or airport change can change the case.",
    kind: "route",
    label: "Srbija - Italija",
    srContext: "Rim, Milano i sezonske italijanske rute treba proveriti kroz stvarni dolazak, a ne samo kroz kašnjenje polaska iz Beograda ili Niša.",
    enContext: "Rome, Milan and seasonal Italy routes should be checked by actual arrival, not only departure delay from Belgrade or Nis.",
    srRouteRule: "Ako polazite iz Italije, EU zaštita je obično početna tačka. Ako polazite iz Srbije, proverite operativnog prevoznika i da li je let samo jedan segment duže rezervacije preko Italije.",
    enRouteRule: "If you depart from Italy, EU protection is usually the starting point. If you depart from Serbia, check the operating carrier and whether the flight is only one segment of a longer booking through Italy.",
    srEvidence: "Za Italiju posebno čuvajte dokaze o promeni gejta, kasnoj rotaciji, propuštenom nastavku puta i računima za obrok ili hotel ako se kratka ruta pretvorila u višesatno čekanje.",
    enEvidence: "For Italy, keep proof of gate changes, late aircraft rotation, missed onward travel and meal or hotel receipts if a short route turned into a multi-hour wait.",
  },
  {
    id: "serbia-netherlands-flight-delay-compensation",
    srSlug: "srbija-holandija-kasnjenje-leta-naknada",
    enSlug: "serbia-netherlands-flight-delay-compensation",
    srTitle: "Srbija - Holandija kašnjenje leta: Amsterdam i konekcije",
    enTitle: "Serbia - Netherlands flight delay: Amsterdam and connections",
    srDescription: "Vodič za kašnjenja na ruti Srbija - Holandija: Amsterdam čvorište, jedna rezervacija, krajnji dolazak i troškovi.",
    enDescription: "A guide to Serbia - Netherlands delays: Amsterdam hub, one booking, final arrival and costs.",
    srExcerpt: "Amsterdam je često presedanje, pa se kod jedne rezervacije proverava poslednja destinacija, ne samo dolazak u Holandiju.",
    enExcerpt: "Amsterdam is often a connection, so under one booking the last destination is checked, not only arrival in the Netherlands.",
    kind: "route",
    label: "Srbija - Holandija",
    srContext: "Ako je Amsterdam bio samo čvorište, dokaz propuštene konekcije može biti važniji od samog kašnjenja prvog leta.",
    enContext: "If Amsterdam was only a hub, proof of the missed connection may matter more than the first flight delay itself.",
    srRouteRule: "Polazak iz Holandije daje EU okvir, dok polazak iz Srbije traži proveru operativnog prevoznika i jedne rezervacije. Kod presedanja u Amsterdamu posebno se gleda kada ste stigli na poslednju destinaciju iz karte.",
    enRouteRule: "Departure from the Netherlands gives the EU framework, while departure from Serbia requires checking operating carrier and one booking. For Amsterdam connections, arrival at the last destination on the ticket is especially important.",
    srEvidence: "Za Holandiju sačuvajte itinerary, dokaz planirane i stvarne konekcije u Amsterdamu, poruke o novom letu, boarding pass za svaki segment i račune ako ste čekanje morali sami da pokrivate.",
    enEvidence: "For the Netherlands, keep the itinerary, proof of scheduled and actual Amsterdam connection, replacement-flight messages, boarding passes for every segment and receipts if you had to cover waiting costs yourself.",
  },
];

export const articles = topics.map(article);
