import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "british-airways-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?auto=format&fit=crop&w=1600&q=82",
    alt: "Passengers waiting near a London airport departure board",
    position: "center",
  },
  "emirates-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&w=1600&q=82",
    alt: "Long-haul aircraft at an airport gate before departure",
    position: "center",
  },
  "el-al-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=82",
    alt: "International terminal windows during a delayed flight",
    position: "center",
  },
  "transavia-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft flying above clouds on a European leisure route",
    position: "center",
  },
  "sunexpress-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Departure board in an airport terminal during a holiday flight delay",
    position: "center",
  },
  "kuwait-airways-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Traveler waiting in an airport terminal before a long international route",
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
    "Tražite pisani razlog kašnjenja ako je usmeno objašnjenje nejasno ili se menja.",
  ],
  en: [
    "Keep the boarding pass, e-ticket and booking reference for every segment.",
    "Compare scheduled and actual arrival at the last destination in the booking.",
    "Separate fixed compensation from meal, hotel, transfer or new-ticket receipts.",
    "Ask for the delay reason in writing if the spoken explanation is vague or changes.",
  ],
};

function srSections(topic: AirlineTopic) {
  return [
    {
      heading: `${topic.airline}: kada kašnjenje treba proveriti`,
      body: [
        `Kod ${topic.airline} leta prva provera nije samo koliko je avion kasnio u polasku, već kada ste stvarno stigli na krajnju destinaciju iz rezervacije. Ako je dolazak bio tri sata ili više kasnije, slučaj treba proveriti kroz pravila za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). ${topic.srRouteNote}`,
        `${topic.srCoverageNote} Zato se zahtev ne postavlja samo na osnovu imena aviokompanije. Potrebno je utvrditi operativnog prevoznika, aerodrom polaska, aerodrom dolaska, jednu rezervaciju, dužinu rute i razlog kašnjenja. Tek tada se razdvaja da li postoji osnov za 250, 400 ili 600 evra, da li ostaje pravo na brigu i da li su dodatni troškovi razumni.`,
      ],
      bullets: sharedBullets.sr,
    },
    {
      heading: "Smer putovanja, presedanje i jedna rezervacija",
      body: [
        `${topic.srConnectionNote} Ako je putovanje bilo kupljeno kao jedna celina, ne gledajte samo prvi segment. Kratko kašnjenje na početku može značiti propušten nastavak, novu rutu, noćno čekanje ili dolazak na poslednji aerodrom mnogo kasnije od plana.`,
        "Ako su karte bile odvojene, dokumenta postaju još važnija. Prvi prevoznik obično ne odgovara automatski za nastavak koji ste sami kupili. Zato itinerary i e-ticket pokazuju šta je bilo obećano u okviru iste rezervacije, a šta je bio vaš zaseban plan. Ta razlika često odlučuje da li se računa ceo put ili samo jedan let.",
      ],
    },
    {
      heading: "Razlog kašnjenja koji mora biti konkretan",
      body: [
        "Aviokompanija može navesti tehnički kvar, kasnu rotaciju aviona, posadu, slot kontrole letenja, loše vreme, zatvaranje aerodroma, bezbednosni razlog ili kasni dolazak prethodnog leta. Neki razlozi mogu biti van kontrole prevoznika, ali opšta rečenica nije dovoljna za ozbiljnu procenu.",
        `${topic.srEvidenceNote} Dobar dosije zato ima vremensku liniju: kada je kašnjenje objavljeno, koji razlog je naveden, da li se razlog menjao, kada je avion stigao, kada su vrata otvorena i šta je prevoznik ponudio tokom čekanja. Let Kasni iz te građe izdvaja deo za fiksnu naknadu, deo za brigu i deo za troškove.`,
      ],
    },
    {
      heading: "Obrok, hotel, transfer i nova karta",
      body: [
        "Kod dužeg čekanja putnik treba da traži obrok, osveženje, jasnu informaciju o novom polasku i, kada čekanje prelazi u noć, hotel i transfer između aerodroma i smeštaja. Ako prevoznik ništa ne organizuje, trošak treba da bude razuman, vezan za čekanje i dokaziv računom.",
        "Ova prava se ne mešaju sa fiksnom naknadom. Moguće je da prevoznik kasnije dokaže vanrednu okolnost za odštetu, ali da račun za hotel ili obrok i dalje ostane relevantan. U zahtevu ih treba navesti posebno, jer aviokompanija često pokušava da jednim odgovorom zatvori sve delove slučaja.",
      ],
    },
    {
      heading: "Kako pripremiti zahtev pre slanja",
      body: [
        `Za ${topic.airline} let napravite kratak pregled: broj leta, datum, ruta, operativni prevoznik, booking reference, planirani dolazak, stvarni dolazak, razlog koji je naveden, ponuđena pomoć i troškovi koje ste platili. Takva struktura je jasnija od duge žalbe bez redosleda.`,
        "Ako aviokompanija odbije zahtev, proverite da li odgovor sadrži tačan let, vreme događaja, dokaz razloga i objašnjenje šta je prevoznik uradio da smanji posledice. Ako toga nema, sledeći korak je dopuna sa dokazima i vremenskom linijom, a ne slanje iste poruke još jednom.",
      ],
    },
  ];
}

function enSections(topic: AirlineTopic) {
  return [
    {
      heading: `${topic.airline}: when a delay should be checked`,
      body: [
        `For a ${topic.airline} flight, the first question is not only how late the aircraft departed, but when you actually reached the final destination in the booking. If arrival was three hours or more late, review the case under [flight delay compensation](/en/flight-delay-compensation). ${topic.enRouteNote}`,
        `${topic.enCoverageNote} The claim should therefore not be based only on the airline name. Establish the operating carrier, departure airport, arrival airport, one booking, route distance and delay reason first. Only then separate whether 250, 400 or 600 euros may apply, whether care rights remain and whether extra costs were reasonable.`,
      ],
      bullets: sharedBullets.en,
    },
    {
      heading: "Travel direction, connection and one booking",
      body: [
        `${topic.enConnectionNote} If the journey was bought as one itinerary, do not stop at the first segment. A short delay at the start can mean a missed onward flight, a new route, overnight waiting or final arrival much later than planned.`,
        "If tickets were separate, documents become even more important. The first carrier is usually not automatically responsible for a continuation you bought yourself. The itinerary and e-ticket show what was promised within one booking and what was your separate plan. That distinction often decides whether the whole journey or only one flight is assessed.",
      ],
    },
    {
      heading: "A delay reason must be specific",
      body: [
        "The airline may cite technical fault, late aircraft rotation, crew, air traffic control slot, bad weather, airport closure, security reason or late arrival of the previous flight. Some reasons may be outside the carrier's control, but broad wording is not enough for a serious assessment.",
        `${topic.enEvidenceNote} A strong file therefore has a timeline: when the delay was announced, which reason was given, whether the reason changed, when the aircraft arrived, when doors opened and what assistance the carrier offered during the wait. Let Kasni separates fixed compensation, care rights and cost evidence from that material.`,
      ],
    },
    {
      heading: "Meals, hotel, transfer and a new ticket",
      body: [
        "During a longer wait, passengers should ask for meals, refreshments, clear information about the new departure time and, when the wait moves overnight, hotel accommodation and transfer between airport and hotel. If the carrier organizes nothing, the cost should be reasonable, linked to the wait and proven by receipt.",
        "These rights should not be merged with fixed compensation. The carrier may later prove an extraordinary circumstance for compensation while a hotel or meal receipt remains relevant. List these items separately in the claim because airlines often try to close every part of the case with one reply.",
      ],
    },
    {
      heading: "How to prepare the claim before sending",
      body: [
        `For a ${topic.airline} flight, prepare a short table: flight number, date, route, operating carrier, booking reference, scheduled arrival, actual arrival, stated reason, assistance offered and costs you paid. This structure is clearer than a long complaint without sequence.`,
        "If the airline rejects the claim, check whether the reply gives the exact flight, event period, proof of the reason and an explanation of what the carrier did to reduce the consequences. If those facts are missing, the next step is an evidence-based timeline follow-up, not sending the same message again.",
      ],
    },
  ];
}

function airlineArticle(topic: AirlineTopic): BlogArticle {
  return {
    id: topic.id,
    publishedAt: "2026-05-19",
    updatedAt: "2026-05-19",
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
    id: "british-airways-flight-delay-compensation",
    srSlug: "british-airways-kasnjenje-leta-naknada",
    enSlug: "british-airways-flight-delay-compensation",
    srTitle: "British Airways kašnjenje leta: London, konekcije i naknada",
    enTitle: "British Airways flight delay: London, connections and compensation",
    srDescription: "Kako proveriti British Airways kašnjenje leta: London ruta, jedna rezervacija, krajnji dolazak, care prava i dokazi.",
    enDescription: "How to check a British Airways delay: London route, one booking, final arrival, care rights and evidence.",
    srExcerpt: "British Airways slučajevi traže pažljivu proveru smera putovanja, operativnog prevoznika i poslednjeg dolaska.",
    enExcerpt: "British Airways cases need careful review of travel direction, operating carrier and final arrival.",
    airline: "British Airways",
    srRouteNote: "Kod Londona dodatno proverite da li je putovanje bilo samo direktan segment ili veza ka daljoj destinaciji, jer propuštena konekcija može promeniti ceo dosije.",
    enRouteNote: "For London, check whether the journey was only a direct sector or a connection to a further destination, because a missed connection can change the whole file.",
    srCoverageNote: "British Airways je britanski prevoznik, pa se pravni okvir proverava kroz smer, aerodrom polaska, eventualni evropski segment i primenljiva pravila, a ne kroz pretpostavku da je svaka ruta ista.",
    enCoverageNote: "British Airways is a UK carrier, so the legal framework is checked through direction, departure airport, any European segment and applicable rules, not through an assumption that every route is the same.",
    srConnectionNote: "London može biti krajnja destinacija ili čvorište za nastavak ka Americi, Irskoj, Španiji ili drugom gradu.",
    enConnectionNote: "London can be the final destination or a hub for onward travel to the United States, Ireland, Spain or another city.",
    srEvidenceNote: "Kod londonskih veza posebno sačuvajte boarding pass za nastavak puta, novu satnicu, dokaz propuštene konekcije i vreme kada ste stvarno stigli na poslednji aerodrom.",
    enEvidenceNote: "For London connections, keep the boarding pass for the onward leg, revised timing, proof of missed connection and the time you actually reached the last airport.",
  },
  {
    id: "emirates-flight-delay-compensation",
    srSlug: "emirates-kasnjenje-leta-naknada",
    enSlug: "emirates-flight-delay-compensation",
    srTitle: "Emirates kašnjenje leta: Dubai, duga ruta i prava putnika",
    enTitle: "Emirates flight delay: Dubai, long route and passenger rights",
    srDescription: "Vodič za Emirates kašnjenja: Dubai konekcije, duga ruta, evropska pokrivenost, troškovi čekanja i dokazi.",
    enDescription: "A guide to Emirates delays: Dubai connections, long route, European coverage, waiting costs and evidence.",
    srExcerpt: "Emirates kašnjenje treba proveriti kroz smer putovanja, vezane segmente i dokaz konačnog dolaska.",
    enExcerpt: "An Emirates delay should be checked by travel direction, connected segments and proof of final arrival.",
    airline: "Emirates",
    srRouteNote: "Duga ruta preko Dubaija može otvoriti pitanje većeg iznosa, ali samo ako je smer pokriven i ako je krajnji dolazak kasnio dovoljno dugo.",
    enRouteNote: "A long route through Dubai can raise the question of a higher amount, but only if the direction is covered and final arrival was late enough.",
    srCoverageNote: "Pošto Emirates nije evropski prevoznik, ne sme se pretpostaviti da svaka ruta ka Srbiji ili iz Srbije automatski ulazi u evropsku fiksnu naknadu.",
    enCoverageNote: "Because Emirates is not a European carrier, do not assume that every route to or from Serbia automatically falls under European fixed compensation.",
    srConnectionNote: "Dubai je često presedanje ka Aziji, Australiji, Africi ili Bliskom istoku, pa jedna rezervacija i operativni prevoznik po segmentima postaju ključni.",
    enConnectionNote: "Dubai is often a connection toward Asia, Australia, Africa or the Middle East, so one booking and the operating carrier on each segment become key.",
    srEvidenceNote: "Kod vrlo dugih kašnjenja posebno odvojite novu rutu, hotel, transfer, vaučere, vreme presedanja i poruke koje pokazuju koji segment je pokrenuo problem.",
    enEvidenceNote: "For very long delays, separate the new route, hotel, transfer, vouchers, connection time and messages showing which segment triggered the problem.",
  },
  {
    id: "el-al-flight-delay-compensation",
    srSlug: "el-al-kasnjenje-leta-naknada",
    enSlug: "el-al-flight-delay-compensation",
    srTitle: "EL AL kašnjenje leta: Tel Aviv, bezbednost i dokazi",
    enTitle: "EL AL flight delay: Tel Aviv, security and evidence",
    srDescription: "Kako proveriti EL AL kašnjenje: Tel Aviv ruta, bezbednosni razlozi, vanredne okolnosti, briga i dokumenta.",
    enDescription: "How to check an EL AL delay: Tel Aviv route, security reasons, extraordinary circumstances, care and documents.",
    srExcerpt: "EL AL kašnjenja često zahtevaju razdvajanje bezbednosnog objašnjenja od operativnog kašnjenja koje je nastalo kasnije.",
    enExcerpt: "EL AL delays often require separating a security explanation from later operational delay.",
    airline: "EL AL",
    srRouteNote: "Kod Tel Aviv ruta razlog kašnjenja može biti bezbednosan, aerodromski, vremenski ili operativan, pa je precizna vremenska linija posebno važna.",
    enRouteNote: "On Tel Aviv routes, the delay reason may be security-related, airport-related, weather-related or operational, so a precise timeline matters especially.",
    srCoverageNote: "EL AL nije evropski prevoznik, pa se pokrivenost proverava kroz aerodrom polaska, smer, eventualni EU segment i stvarnog operativnog prevoznika.",
    enCoverageNote: "EL AL is not a European carrier, so coverage is checked through departure airport, direction, any EU segment and the actual operating carrier.",
    srConnectionNote: "Tel Aviv može biti kraj puta ili deo duže rezervacije, naročito ako putnik nastavlja prema drugom gradu preko partnerskog leta.",
    enConnectionNote: "Tel Aviv can be the end of the trip or part of a longer booking, especially if the passenger continues to another city on a partner flight.",
    srEvidenceNote: "Ako se pominje bezbednost, tražite period događaja i direktan uticaj na vaš let; ako se kasnije pominje posada, avion ili slot, sačuvajte obe verzije.",
    enEvidenceNote: "If security is mentioned, ask for the event period and direct effect on your flight; if crew, aircraft or slot is mentioned later, keep both versions.",
  },
  {
    id: "transavia-flight-delay-compensation",
    srSlug: "transavia-kasnjenje-leta-naknada",
    enSlug: "transavia-flight-delay-compensation",
    srTitle: "Transavia kašnjenje leta: Holandija, Francuska i naknada",
    enTitle: "Transavia flight delay: Netherlands, France and compensation",
    srDescription: "Vodič za Transavia kašnjenja: evropski prevoznik, letovi ka turističkim rutama, care prava, troškovi i dokazi.",
    enDescription: "A guide to Transavia delays: European carrier, leisure routes, care rights, costs and evidence.",
    srExcerpt: "Transavia letovi često su sezonski ili turistički, pa paket, vaučer i dokaz nove satnice mogu biti presudni.",
    enExcerpt: "Transavia flights are often seasonal or leisure routes, so package documents, vouchers and revised timing can matter.",
    airline: "Transavia",
    srRouteNote: "Kod holandskih i francuskih operativnih letova posebno proverite polazak iz EU, dolazak u EU i da li je kašnjenje pomerilo nastavak putovanja.",
    enRouteNote: "For Dutch and French operated flights, check EU departure, EU arrival and whether the delay moved onward travel.",
    srCoverageNote: "Kao evropski prevoznik, Transavia često otvara jasniji okvir na rutama ka EU ili iz EU, ali se i dalje proveravaju razlog kašnjenja i krajnji dolazak.",
    enCoverageNote: "As a European carrier, Transavia often creates a clearer framework on routes to or from the EU, but the delay reason and final arrival still need review.",
    srConnectionNote: "Ako je let deo odmora ili paket aranžmana, dokumenta organizatora puta mogu pokazati da je promena uticala na hotel, transfer ili sledeću uslugu.",
    enConnectionNote: "If the flight is part of a holiday or package, organizer documents can show that the change affected hotel, transfer or the next service.",
    srEvidenceNote: "Kod turističkih ruta sačuvajte ugovor ili vaučer, poruke agencije, novu satnicu, dokaz čekanja na aerodromu i račune koje ste platili jer pomoć nije data.",
    enEvidenceNote: "On leisure routes, keep the contract or voucher, agency messages, revised timing, proof of airport waiting and receipts you paid because assistance was not provided.",
  },
  {
    id: "sunexpress-flight-delay-compensation",
    srSlug: "sunexpress-kasnjenje-leta-naknada",
    enSlug: "sunexpress-flight-delay-compensation",
    srTitle: "SunExpress kašnjenje leta: Turska, odmor i prava putnika",
    enTitle: "SunExpress flight delay: Turkey, holidays and passenger rights",
    srDescription: "Kako proveriti SunExpress kašnjenje: Turska ruta, evropski i neevropski smer, paket aranžman, briga i dokazi.",
    enDescription: "How to check a SunExpress delay: Turkey route, European and non-European direction, package travel, care and evidence.",
    srExcerpt: "SunExpress slučaj zavisi od smera, operativnog prevoznika i toga da li je kašnjenje poremetilo odmor ili nastavak puta.",
    enExcerpt: "A SunExpress case depends on direction, operating carrier and whether the delay disrupted a holiday or onward trip.",
    airline: "SunExpress",
    srRouteNote: "Kod Turske je važno razlikovati evropski polazak, let ka EU, let koji počinje u Srbiji i situaciju u kojoj je prevoznik deo šireg paket aranžmana.",
    enRouteNote: "For Turkey, separate an EU departure, a flight into the EU, a flight starting in Serbia and a situation where the carrier is part of a wider package holiday.",
    srCoverageNote: "SunExpress okvir nije isti u svakom smeru, pa se pre zaključka proverava da li je konkretna ruta pokrivena i koji je prevoznik operativno obavljao let.",
    enCoverageNote: "The SunExpress framework is not the same in every direction, so the covered route and actual operating carrier must be checked before any conclusion.",
    srConnectionNote: "Kod odmora u Antaliji, Izmiru ili drugoj destinaciji problem može biti izgubljen dan smeštaja, propušten transfer ili kasniji povratak na posao.",
    enConnectionNote: "For holidays in Antalya, Izmir or another destination, the issue may be a lost hotel day, missed transfer or later return to work.",
    srEvidenceNote: "Uz avionska dokumenta čuvajte potvrdu hotela, transfera, paket aranžmana i poruku o promeni leta, jer ti dokazi pokazuju stvarnu posledicu kašnjenja.",
    enEvidenceNote: "Alongside flight documents, keep hotel, transfer and package confirmations and the flight-change message because they show the real consequence of the delay.",
  },
  {
    id: "kuwait-airways-flight-delay-compensation",
    srSlug: "kuwait-airways-kasnjenje-leta-naknada",
    enSlug: "kuwait-airways-flight-delay-compensation",
    srTitle: "Kuwait Airways kašnjenje leta: duga ruta i dokaz dolaska",
    enTitle: "Kuwait Airways flight delay: long route and arrival evidence",
    srDescription: "Vodič za Kuwait Airways kašnjenja: neevropski prevoznik, duga ruta, krajnji dolazak, troškovi čekanja i odbijenice.",
    enDescription: "A guide to Kuwait Airways delays: non-European carrier, long route, final arrival, waiting costs and rejection replies.",
    srExcerpt: "Kuwait Airways kašnjenje treba proveriti kroz pokrivenu rutu, vezane segmente i dokaz da je poslednja destinacija kasnila.",
    enExcerpt: "A Kuwait Airways delay should be checked by covered route, connected segments and proof that final destination was late.",
    airline: "Kuwait Airways",
    srRouteNote: "Dužina puta sama po sebi nije dovoljna za evropsku fiksnu naknadu; prvo se proverava smer, operativni prevoznik i da li je putovanje imalo pokriven evropski deo.",
    enRouteNote: "Distance alone is not enough for European fixed compensation; first check direction, operating carrier and whether the journey had a covered European part.",
    srCoverageNote: "Pošto Kuwait Airways nije evropski prevoznik, evropska pravila se ne primenjuju jednako na svaki dolazak ili polazak povezan sa Srbijom.",
    enCoverageNote: "Because Kuwait Airways is not a European carrier, European rules do not apply equally to every arrival or departure connected with Serbia.",
    srConnectionNote: "Kuvajt može biti presedanje za Aziju, Bliski istok ili Afriku, pa dokaz jedne rezervacije i vremena dolaska na poslednji aerodrom ima veliku težinu.",
    enConnectionNote: "Kuwait can be a connection toward Asia, the Middle East or Africa, so proof of one booking and final-airport arrival time carries significant weight.",
    srEvidenceNote: "Kod dugih ruta posebno čuvajte celu elektronsku kartu, sve boarding passove, hotel, transfer, novu rutu i odgovor aviokompanije ako odbija zahtev opštim razlogom.",
    enEvidenceNote: "On long routes, keep the full e-ticket, all boarding passes, hotel, transfer, new route and the airline reply if it rejects the claim with a broad reason.",
  },
];

export const articles = topics.map(airlineArticle);
