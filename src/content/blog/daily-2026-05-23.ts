import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "airbaltic-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft taxiing at dusk before a northern Europe route",
    position: "center",
  },
  "iberia-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger aircraft above clouds on a southern Europe connection",
    position: "center",
  },
  "luxair-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport departures board during a short European delay",
    position: "center",
  },
  "condor-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Travelers waiting near airport windows before a leisure flight",
    position: "center",
  },
  "freebird-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&w=1600&q=82",
    alt: "Holiday flight aircraft parked at an airport gate",
    position: "center",
  },
  "brussels-airlines-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Traveler checking flight status in a European airport terminal",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

type AirlineTopic = {
  id: string;
  srSlug: string;
  enSlug: string;
  srTitle: string;
  enTitle: string;
  srDescription: string;
  enDescription: string;
  srExcerpt: string;
  enExcerpt: string;
  airline: string;
  srRouteNote: string;
  enRouteNote: string;
  srCoverageNote: string;
  enCoverageNote: string;
  srConnectionNote: string;
  enConnectionNote: string;
  srEvidenceNote: string;
  enEvidenceNote: string;
};

const sharedBullets = {
  sr: [
    "Sačuvajte boarding pass, e-ticket i booking reference za svaki segment.",
    "Uporedite planirani i stvarni dolazak na poslednju destinaciju iz rezervacije.",
    "Odvojite fiksnu naknadu od računa za obrok, hotel, transfer ili novu kartu.",
    "Tražite pisani razlog kašnjenja ako je odgovor opšti ili se menja.",
  ],
  en: [
    "Keep the boarding pass, e-ticket and booking reference for every segment.",
    "Compare scheduled and actual arrival at the last destination in the booking.",
    "Separate fixed compensation from meal, hotel, transfer or new-ticket receipts.",
    "Ask for the delay reason in writing if the reply is broad or changes.",
  ],
};

function srSections(topic: AirlineTopic) {
  return [
    {
      heading: `${topic.airline}: kada kašnjenje vredi proveriti`,
      body: [
        `Kod ${topic.airline} leta prva provera nije samo koliko je avion kasnio pri poletanju, već kada ste stvarno stigli na krajnju destinaciju iz rezervacije. Ako je dolazak bio tri sata ili više kasnije, slučaj treba proveriti kroz pravila za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). ${topic.srRouteNote}`,
        `${topic.srCoverageNote} Zato zahtev ne treba zasnivati samo na imenu aviokompanije. Potrebno je utvrditi operativnog prevoznika, aerodrom polaska, aerodrom dolaska, jednu rezervaciju, dužinu rute i razlog kašnjenja. Tek tada se razdvaja da li postoji osnov za 250, 400 ili 600 evra, da li ostaje pravo na brigu i da li su dodatni troškovi dokazivi.`,
      ],
      bullets: sharedBullets.sr,
    },
    {
      heading: "Smer putovanja, presedanje i operativni prevoznik",
      body: [
        `${topic.srConnectionNote} Ako je putovanje kupljeno kao jedna celina, ne zaustavljajte proveru na prvom segmentu. Kraće kašnjenje na početku može napraviti propušten nastavak, novu rutu, noćno čekanje ili dolazak na poslednji aerodrom mnogo kasnije od plana.`,
        "Ako su karte bile odvojene, dokumenta postaju još važnija. Prvi prevoznik obično ne odgovara automatski za nastavak koji ste sami kupili. Itinerary i e-ticket pokazuju šta je obećano u okviru iste rezervacije, a šta je bio zaseban plan putnika. Ta razlika često odlučuje da li se računa ceo put ili samo jedan let.",
      ],
    },
    {
      heading: "Razlog kašnjenja mora biti konkretan",
      body: [
        "Aviokompanija može navesti tehnički kvar, kasnu rotaciju aviona, posadu, slot kontrole letenja, loše vreme, zatvaranje aerodroma, bezbednosni razlog ili kasni dolazak prethodnog leta. Neki razlozi mogu biti van kontrole prevoznika, ali opšta rečenica nije dovoljna za ozbiljnu procenu.",
        `${topic.srEvidenceNote} Dobar dosije zato ima vremensku liniju: kada je kašnjenje objavljeno, koji razlog je naveden, da li se razlog menjao, kada je avion stigao, kada su vrata otvorena i šta je prevoznik ponudio tokom čekanja. Let Kasni iz te građe izdvaja deo za fiksnu naknadu, deo za brigu i deo za troškove.`,
      ],
    },
    {
      heading: "Obrok, hotel, transfer i razuman trošak",
      body: [
        "Kod dužeg čekanja putnik treba da traži obrok, osveženje, jasnu informaciju o novom polasku i, kada čekanje prelazi u noć, hotel i transfer između aerodroma i smeštaja. Ako prevoznik ništa ne organizuje, trošak treba da bude razuman, vezan za čekanje i dokaziv računom.",
        "Ova prava ne treba mešati sa fiksnom naknadom. Moguće je da prevoznik kasnije dokaže vanrednu okolnost za odštetu, ali da račun za hotel, obrok ili transfer i dalje ostane relevantan. U zahtevu ih treba navesti posebno, jer aviokompanija često pokušava da jednim odgovorom zatvori sve delove slučaja.",
      ],
    },
    {
      heading: "Kako pripremiti zahtev bez ponovnog pisanja",
      body: [
        `Za ${topic.airline} let napravite kratak pregled: broj leta, datum, ruta, operativni prevoznik, booking reference, planirani dolazak, stvarni dolazak, razlog koji je naveden, ponuđena pomoć i troškovi koje ste platili. Takva struktura je jasnija od duge žalbe bez redosleda.`,
        "Ako aviokompanija odbije zahtev, proverite da li odgovor sadrži tačan let, vreme događaja, dokaz razloga i objašnjenje šta je prevoznik uradio da smanji posledice. Ako toga nema, sledeći korak je dopuna sa dokazima i vremenskom linijom, a ne slanje iste poruke još jednom. Ovakav obrazac je posebno koristan kada više putnika iz iste rezervacije šalje dokumenta.",
      ],
    },
  ];
}

function enSections(topic: AirlineTopic) {
  return [
    {
      heading: `${topic.airline}: when a delay is worth checking`,
      body: [
        `For a ${topic.airline} flight, the first question is not only how late the aircraft departed, but when you actually reached the final destination in the booking. If arrival was three hours or more late, review the case under [flight delay compensation](/en/flight-delay-compensation). ${topic.enRouteNote}`,
        `${topic.enCoverageNote} The claim should therefore not be based only on the airline name. Establish the operating carrier, departure airport, arrival airport, one booking, route distance and delay reason first. Only then separate whether 250, 400 or 600 euros may apply, whether care rights remain and whether extra costs can be proven.`,
      ],
      bullets: sharedBullets.en,
    },
    {
      heading: "Travel direction, connection and operating carrier",
      body: [
        `${topic.enConnectionNote} If the journey was bought as one itinerary, do not stop the review at the first segment. A shorter initial delay can cause a missed onward flight, a new route, overnight waiting or final arrival much later than planned.`,
        "If tickets were separate, documents become even more important. The first carrier is usually not automatically responsible for a continuation you bought yourself. The itinerary and e-ticket show what was promised within one booking and what was the passenger's separate plan. That distinction often decides whether the whole journey or only one flight is assessed.",
      ],
    },
    {
      heading: "The delay reason must be specific",
      body: [
        "The airline may cite technical fault, late aircraft rotation, crew, air traffic control slot, bad weather, airport closure, security reason or late arrival of the previous flight. Some reasons may be outside the carrier's control, but broad wording is not enough for a serious assessment.",
        `${topic.enEvidenceNote} A strong file therefore has a timeline: when the delay was announced, which reason was given, whether the reason changed, when the aircraft arrived, when doors opened and what assistance the carrier offered during the wait. Let Kasni separates fixed compensation, care rights and cost evidence from that material.`,
      ],
    },
    {
      heading: "Meals, hotel, transfer and reasonable cost",
      body: [
        "During a longer wait, passengers should ask for meals, refreshments, clear information about the new departure time and, when the wait moves overnight, hotel accommodation and transfer between airport and hotel. If the carrier organizes nothing, the cost should be reasonable, linked to the wait and proven by receipt.",
        "These rights should not be merged with fixed compensation. The carrier may later prove an extraordinary circumstance for compensation while a hotel, meal or transfer receipt remains relevant. List these items separately in the claim because airlines often try to close every part of the case with one reply.",
      ],
    },
    {
      heading: "How to prepare the claim without rewriting it",
      body: [
        `For a ${topic.airline} flight, prepare a short table: flight number, date, route, operating carrier, booking reference, scheduled arrival, actual arrival, stated reason, assistance offered and costs you paid. This structure is clearer than a long complaint without sequence.`,
        "If the airline rejects the claim, check whether the reply gives the exact flight, event period, proof of the reason and an explanation of what the carrier did to reduce the consequences. If those facts are missing, the next step is an evidence-based timeline follow-up, not sending the same message again. This format is especially useful when several passengers from the same booking submit documents.",
      ],
    },
  ];
}

function airlineArticle(topic: AirlineTopic): BlogArticle {
  return {
    id: topic.id,
    publishedAt: "2026-05-23",
    updatedAt: "2026-05-23",
    sr: {
      slug: topic.srSlug,
      title: topic.srTitle,
      description: topic.srDescription,
      excerpt: topic.srExcerpt,
      category: "Aviokompanije",
      readTime: "8 min čitanja",
      sections: srSections(topic),
    },
    en: {
      slug: topic.enSlug,
      title: topic.enTitle,
      description: topic.enDescription,
      excerpt: topic.enExcerpt,
      category: "Airlines",
      readTime: "8 min read",
      sections: enSections(topic),
    },
  };
}

const topics: AirlineTopic[] = [
  {
    id: "airbaltic-flight-delay-compensation",
    srSlug: "airbaltic-kasnjenje-leta-naknada",
    enSlug: "airbaltic-flight-delay-compensation",
    srTitle: "airBaltic kašnjenje leta: Riga, konekcije i naknada",
    enTitle: "airBaltic flight delay: Riga, connections and compensation",
    srDescription: "Kako proveriti airBaltic kašnjenje leta: Riga konekcije, EU prevoznik, krajnji dolazak, troškovi čekanja i dokazi.",
    enDescription: "How to check an airBaltic delay: Riga connections, EU carrier, final arrival, waiting costs and evidence.",
    srExcerpt: "airBaltic slučajevi često zavise od toga da li je Riga bila kraj puta ili čvorište za nastavak u istoj rezervaciji.",
    enExcerpt: "airBaltic cases often depend on whether Riga was the final stop or a hub for onward travel under one booking.",
    airline: "airBaltic",
    srRouteNote: "Riga može biti krajnja destinacija ili čvorište za severnu Evropu, Baltik i Skandinaviju, pa dokaz poslednjeg dolaska često vredi više od samog kašnjenja prvog leta.",
    enRouteNote: "Riga can be the final destination or a hub for northern Europe, the Baltics and Scandinavia, so proof of final arrival often matters more than the first flight delay alone.",
    srCoverageNote: "Pošto je airBaltic evropski prevoznik, rute ka EU, iz EU i preko EU čvorišta obično imaju jasniji okvir za proveru, ali razlog kašnjenja i dalje ostaje presudan.",
    enCoverageNote: "Because airBaltic is a European carrier, routes to the EU, from the EU and through EU hubs usually have a clearer review framework, but the delay reason remains decisive.",
    srConnectionNote: "Kod presedanja preko Rige posebno proverite da li je naredni segment bio na istoj karti i koliko ste kasno stigli na poslednji aerodrom.",
    enConnectionNote: "For Riga connections, check especially whether the onward segment was on the same ticket and how late you reached the last airport.",
    srEvidenceNote: "Za airBaltic sačuvajte poruke o promeni konekcije, boarding pass za svaki segment, novu satnicu iz aplikacije i dokaz da je kašnjenje prvog leta izazvalo kasniji dolazak.",
    enEvidenceNote: "For airBaltic, keep connection-change messages, boarding passes for each segment, revised app timing and proof that the first flight delay caused later arrival.",
  },
  {
    id: "iberia-flight-delay-compensation",
    srSlug: "iberia-kasnjenje-leta-naknada",
    enSlug: "iberia-flight-delay-compensation",
    srTitle: "Iberia kašnjenje leta: Madrid, veze i prava putnika",
    enTitle: "Iberia flight delay: Madrid, connections and passenger rights",
    srDescription: "Vodič za Iberia kašnjenja: Madrid čvorište, evropska zaštita, jedna rezervacija, care prava i dokaz dolaska.",
    enDescription: "A guide to Iberia delays: Madrid hub, European protection, one booking, care rights and arrival proof.",
    srExcerpt: "Iberia letovi se najčešće proveravaju kroz Madrid, jednu rezervaciju i stvarno vreme dolaska na poslednju destinaciju.",
    enExcerpt: "Iberia flights are most often checked through Madrid, one booking and actual arrival at the last destination.",
    airline: "Iberia",
    srRouteNote: "Madrid je često čvorište za Španiju, Portugal, Latinsku Ameriku i ostrvske rute, pa je važno dokazati ceo itinerer, a ne samo prvi segment.",
    enRouteNote: "Madrid is often a hub for Spain, Portugal, Latin America and island routes, so it is important to prove the whole itinerary, not only the first segment.",
    srCoverageNote: "Iberia je evropski prevoznik, ali to ne znači da se svaki zahtev automatski isplaćuje; i dalje se proveravaju dolazak od tri sata, ruta, razlog i mere koje je prevoznik preduzeo.",
    enCoverageNote: "Iberia is a European carrier, but that does not mean every claim is automatically payable; the three-hour arrival delay, route, reason and carrier mitigation still need review.",
    srConnectionNote: "Ako je Madrid bio veza ka daljoj destinaciji, propušten nastavak i nova ruta mogu biti važniji od kašnjenja pri poletanju iz prvog aerodroma.",
    enConnectionNote: "If Madrid was a connection to a further destination, a missed onward flight and replacement route can matter more than departure delay from the first airport.",
    srEvidenceNote: "Za Iberia dosije posebno čuvajte dokaz dolaska u Madrid, dokaz nastavka puta, novu boarding kartu, poruke o rerutiranju i račune za čekanje ako pomoć nije data.",
    enEvidenceNote: "For an Iberia file, keep proof of arrival in Madrid, onward-travel proof, new boarding card, rerouting messages and waiting receipts if assistance was not provided.",
  },
  {
    id: "luxair-flight-delay-compensation",
    srSlug: "luxair-kasnjenje-leta-naknada",
    enSlug: "luxair-flight-delay-compensation",
    srTitle: "Luxair kašnjenje leta: Luksemburg, kratke rute i naknada",
    enTitle: "Luxair flight delay: Luxembourg, short routes and compensation",
    srDescription: "Kako proveriti Luxair kašnjenje: kratka evropska ruta, konekcije, prag od tri sata, troškovi i dokumenta.",
    enDescription: "How to check a Luxair delay: short European route, connections, three-hour threshold, costs and documents.",
    srExcerpt: "Luxair kašnjenje na kratkoj ruti ne treba odbaciti ako je krajnji dolazak prešao prag ili je nastao trošak čekanja.",
    enExcerpt: "A Luxair delay on a short route should not be dismissed if final arrival crossed the threshold or waiting costs arose.",
    airline: "Luxair",
    srRouteNote: "Kod kraćih evropskih ruta prag od tri sata pri dolasku ostaje ključan, čak i kada je udaljenost manja i potencijalni iznos najčešće spada u nižu kategoriju.",
    enRouteNote: "On shorter European routes, the three-hour arrival threshold remains central even when the distance is lower and the potential amount usually falls into the lower band.",
    srCoverageNote: "Luxair je evropski prevoznik, pa se slučaj najpre posmatra kroz evropska pravila, ali kompanija i dalje može navesti vreme, slot, aerodromsku odluku ili drugi razlog koji treba proveriti.",
    enCoverageNote: "Luxair is a European carrier, so the case is first viewed through European rules, but the airline may still cite weather, slot, airport decision or another reason that needs checking.",
    srConnectionNote: "Luksemburg može biti kraj puta, poslovna destinacija ili veza ka drugom evropskom aerodromu, pa se mora videti da li je cela ruta bila na jednoj rezervaciji.",
    enConnectionNote: "Luxembourg may be the final stop, a business destination or a connection to another European airport, so it must be clear whether the full route was under one booking.",
    srEvidenceNote: "Za Luxair su korisni dokaz stvarnog dolaska, poruka o razlogu kašnjenja, račun za prevoz ako ste zakasnili na planirani transfer i dokaz da je kompanija nudila ili odbila pomoć.",
    enEvidenceNote: "For Luxair, useful evidence includes actual-arrival proof, the delay-reason message, transport receipt if you missed a planned transfer and proof of assistance offered or refused.",
  },
  {
    id: "condor-flight-delay-compensation",
    srSlug: "condor-kasnjenje-leta-naknada",
    enSlug: "condor-flight-delay-compensation",
    srTitle: "Condor kašnjenje leta: turističke rute, hotel i naknada",
    enTitle: "Condor flight delay: leisure routes, hotel and compensation",
    srDescription: "Vodič za Condor kašnjenja: sezonske i turističke rute, EU zaštita, paket aranžmani, hotel, transfer i dokazi.",
    enDescription: "A guide to Condor delays: seasonal and leisure routes, EU protection, package trips, hotel, transfer and evidence.",
    srExcerpt: "Condor slučajevi često spajaju avio-kašnjenje, hotel, transfer i paket dokumenta, pa ih treba odvojiti po dokazima.",
    enExcerpt: "Condor cases often combine flight delay, hotel, transfer and package documents, so evidence should be separated clearly.",
    airline: "Condor",
    srRouteNote: "Turistička ili sezonska ruta često pravi dodatne troškove jer putnik gubi transfer, noćenje ili deo aranžmana, pa treba odvojiti fiksnu naknadu od stvarnih računa.",
    enRouteNote: "A leisure or seasonal route often creates extra costs because the passenger loses a transfer, night stay or part of a package, so fixed compensation should be separated from actual receipts.",
    srCoverageNote: "Condor je evropski prevoznik, ali kod sezonskih ruta i paket aranžmana treba proveriti ko je operativni prevoznik i šta je tačno kupljeno kroz istu rezervaciju.",
    enCoverageNote: "Condor is a European carrier, but for seasonal routes and package trips you still need to check the operating carrier and what exactly was bought in the same booking.",
    srConnectionNote: "Ako je let bio deo odmora, čuvajte i dokumenta turističke agencije, jer ona mogu pokazati zašto je kašnjenje napravilo trošak hotela, transfera ili izgubljene usluge.",
    enConnectionNote: "If the flight was part of a holiday, keep travel-agency documents too because they can show why the delay caused hotel, transfer or lost-service costs.",
    srEvidenceNote: "Za Condor posebno odvojite avio-dokumenta od aranžmana: boarding pass i poruke prevoznika na jednu stranu, vaučere, hotelske račune i transfer potvrde na drugu.",
    enEvidenceNote: "For Condor, separate flight documents from package documents: boarding pass and carrier messages on one side, vouchers, hotel receipts and transfer confirmations on the other.",
  },
  {
    id: "freebird-flight-delay-compensation",
    srSlug: "freebird-kasnjenje-leta-naknada",
    enSlug: "freebird-flight-delay-compensation",
    srTitle: "Freebird kašnjenje leta: čarter, letovanje i dokazi",
    enTitle: "Freebird flight delay: charter, holiday travel and evidence",
    srDescription: "Kako proveriti Freebird kašnjenje: čarter let, paket aranžman, care prava, hotel, razumni troškovi i vremenska linija.",
    enDescription: "How to check a Freebird delay: charter flight, package holiday, care rights, hotel, reasonable costs and timeline.",
    srExcerpt: "Kod Freebird čartera najvažnije je dokazati operativni let, tačnu satnicu i da li je putovanje bilo deo šireg aranžmana.",
    enExcerpt: "For a Freebird charter, it is critical to prove the operating flight, exact timing and whether the trip was part of a wider package.",
    airline: "Freebird",
    srRouteNote: "Čarter letovi često imaju drugačiji tok komunikacije jer putnik dobija informacije preko agencije, predstavnika ili aerodromskog osoblja, ali dokaz kašnjenja i dalje mora biti precizan.",
    enRouteNote: "Charter flights often have a different communication path because the passenger receives information through an agency, representative or airport staff, but delay evidence still needs to be precise.",
    srCoverageNote: "Freebird nije uvek jednostavan samo po nazivu kompanije; proveravaju se operativni prevoznik, aerodrom polaska, smer putovanja i da li postoje evropska pravila za konkretan segment.",
    enCoverageNote: "Freebird is not assessed by name alone; the operating carrier, departure airport, travel direction and European-rule coverage for the specific segment must be checked.",
    srConnectionNote: "Kod letovanja najčešće nije problem samo dolazak na aerodrom, već hotel, transfer, izgubljena noć ili povratak kući kasnije od plana.",
    enConnectionNote: "On holiday travel, the issue is often not only arrival at the airport, but hotel, transfer, lost night or returning home later than planned.",
    srEvidenceNote: "Za Freebird čuvajte ugovor o putovanju, avionski vaučer, poruke agencije, tablu polazaka, novu satnicu, račune i ime osobe koja je dala objašnjenje na aerodromu.",
    enEvidenceNote: "For Freebird, keep the travel contract, flight voucher, agency messages, departures board, revised timing, receipts and the name of the person who gave the airport explanation.",
  },
  {
    id: "brussels-airlines-flight-delay-compensation",
    srSlug: "brussels-airlines-kasnjenje-leta-naknada",
    enSlug: "brussels-airlines-flight-delay-compensation",
    srTitle: "Brussels Airlines kašnjenje leta: Brisel, EU veze i naknada",
    enTitle: "Brussels Airlines flight delay: Brussels, EU links and compensation",
    srDescription: "Vodič za Brussels Airlines kašnjenja: Brisel kao čvorište, evropska zaštita, jedna rezervacija, care prava i odbijen zahtev.",
    enDescription: "A guide to Brussels Airlines delays: Brussels as a hub, European protection, one booking, care rights and rejected claims.",
    srExcerpt: "Brussels Airlines kašnjenje treba proveriti kroz krajnji dolazak, EU prevoznika, konekcije preko Brisela i konkretan razlog.",
    enExcerpt: "A Brussels Airlines delay should be checked through final arrival, EU carrier status, Brussels connections and the specific reason.",
    airline: "Brussels Airlines",
    srRouteNote: "Brisel može biti kraj puta ili veza ka Zapadnoj Evropi, Africi i drugim destinacijama, pa je dokaz poslednjeg dolaska bitan kod jedne rezervacije.",
    enRouteNote: "Brussels can be the end of the journey or a connection toward Western Europe, Africa and other destinations, so final-arrival proof matters under one booking.",
    srCoverageNote: "Brussels Airlines je evropski prevoznik, ali i dalje treba proveriti da li je kašnjenje nastalo zbog razloga pod kontrolom kompanije ili zbog događaja koji može biti vanredna okolnost.",
    enCoverageNote: "Brussels Airlines is a European carrier, but it is still necessary to check whether the delay arose from a carrier-controlled reason or from an event that may be extraordinary.",
    srConnectionNote: "Ako je Brisel bio čvorište, sačuvajte dokaz propuštenog nastavka i novu rutu koju je kompanija ponudila ili koju ste morali sami da tražite.",
    enConnectionNote: "If Brussels was a hub, keep proof of the missed onward flight and the replacement route the airline offered or that you had to seek yourself.",
    srEvidenceNote: "Za Brussels Airlines korisni su screenshot statusa leta, poruke o konekciji, dokaz vremena otvaranja vrata, hotel ili obrok računi i odgovor ako kompanija tvrdi da je razlog bio slot ili vreme.",
    enEvidenceNote: "For Brussels Airlines, useful evidence includes flight-status screenshots, connection messages, door-opening time proof, hotel or meal receipts and the reply if the airline claims slot or weather.",
  },
];

export const articles = topics.map(airlineArticle) satisfies BlogArticle[];
