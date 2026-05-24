import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "egyptair-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft climbing above clouds on a connecting route",
    position: "center",
  },
  "etihad-airways-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft at the gate before a long-haul connection",
    position: "center",
  },
  "sas-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Passengers waiting by airport windows during a European connection",
    position: "center",
  },
  "smartwings-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Runway and aircraft during an evening departure delay",
    position: "center",
  },
  "corendon-airlines-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport departures board during a leisure flight delay",
    position: "center",
  },
  "tunisair-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Traveler checking flight information during a long airport wait",
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
  srRouteContext: string;
  enRouteContext: string;
  srCarrierRule: string;
  enCarrierRule: string;
  srEvidenceFocus: string;
  enEvidenceFocus: string;
  srCareFocus: string;
  enCareFocus: string;
};

const srBullets = [
  "Proverite planirani i stvarni dolazak na krajnju destinaciju.",
  "Sačuvajte booking potvrdu, boarding pass i svaku poruku aviokompanije.",
  "Razdvojite fiksnu naknadu od računa za hotel, obrok, transfer ili novu kartu.",
  "Ako je razlog kašnjenja generički, tražite precizno pisano objašnjenje.",
];

const enBullets = [
  "Check scheduled and actual arrival at the final destination.",
  "Save the booking confirmation, boarding pass and every airline message.",
  "Separate fixed compensation from hotel, meal, transfer or new-ticket receipts.",
  "If the delay reason is generic, ask for a precise written explanation.",
];

function srSections(topic: AirlineTopic) {
  return [
    {
      heading: "Kada kašnjenje ove aviokompanije treba proveriti",
      body: [
        `Kod ${topic.airline} leta ne odlučuje samo to da li je avion kasno poleteo. Za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta) prvo se proverava krajnji dolazak, zatim ruta, operativni prevoznik i razlog kašnjenja. ${topic.srRouteContext}`,
        "Ako je dolazak kasnio tri sata ili više, slučaj vredi složiti u kratak dosije. Unesite broj leta, datum, rutu, rezervaciju, planirani dolazak, stvarni dolazak, poruke aviokompanije i troškove čekanja. Takav redosled smanjuje ručni rad i pomaže da se zahtev ne pretvori u opštu žalbu bez dokaza.",
      ],
      bullets: srBullets,
    },
    {
      heading: "Ruta, operativni prevoznik i jedna rezervacija",
      body: [
        topic.srCarrierRule,
        "Kod konekcija je posebno važno da li su svi segmenti kupljeni kao jedna rezervacija. Ako jesu, analiza često ide do poslednje destinacije iz karte, a ne samo do prvog aerodroma na kome je kašnjenje nastalo. Ako su karte odvojene, procena je uža i mora se jasno razdvojiti koji prevoznik je izazvao koji trošak.",
      ],
    },
    {
      heading: "Razlog kašnjenja i šta nije dovoljno objašnjenje",
      body: [
        "Aviokompanija može navesti tehnički kvar, prethodnu rotaciju, posadu, slot kontrole letenja, loše vreme, bezbednosnu proveru, zemaljsko opsluživanje ili zatvaranje aerodroma. Neki razlozi mogu biti jači argument protiv fiksne naknade, ali generička formulacija sama po sebi nije dovoljna da se slučaj razume.",
        "Tražite vezu između razloga i baš vašeg leta: kada je problem nastao, koliko je trajao, da li je pogodio jedan avion ili ceo aerodrom, i šta je prevoznik uradio da smanji posledice. Ako odgovor preskače te činjenice, Let Kasni slučaj proverava kroz dokaznu vremensku liniju, a ne kroz etiketu koju je kompanija izabrala.",
      ],
    },
    {
      heading: "Dokazi koji najviše ubrzavaju zahtev",
      body: [
        topic.srEvidenceFocus,
        "Najkorisniji format je isti za svaki let: potvrda rezervacije, boarding pass, obaveštenje o kašnjenju, screenshot aplikacije, fotografija table polazaka, stvarni dolazak i odgovor aviokompanije. Kada su dokazi već sortirani, naredna dopuna se svodi na jedan novi dokument ili pitanje, umesto na prepisivanje cele priče.",
      ],
    },
    {
      heading: "Briga, hotel, transfer i računi tokom čekanja",
      body: [
        topic.srCareFocus,
        "Pravo na brigu je odvojeno od fiksne naknade. Moguće je da aviokompanija ima jači argument protiv 250, 400 ili 600 evra, ali da računi za hranu, vodu, smeštaj ili transfer i dalje ostanu relevantni. Zato ih treba navesti odvojeno, sa kratkim objašnjenjem zašto su nastali.",
      ],
    },
    {
      heading: "Kako Let Kasni priprema nastavak posle odbijenice",
      body: [
        "Ako aviokompanija odbije zahtev jednom kratkom rečenicom, sledeći korak nije slanje istog teksta ponovo. Bolje je tražiti konkretan dokaz razloga kašnjenja, vremenski period poremećaja i mere koje je prevoznik preduzeo. Tako se brzo vidi da li je slučaj zaista slab ili je samo površno odbijen.",
        "Za ponovljive provere Let Kasni koristi isti obrazac: prag dolaska, ruta, operativni prevoznik, razlog, troškovi, dokazi i status odgovora. To omogućava da se više putnika, porodična rezervacija ili grupa kolega obrade bez ručnog kopiranja različitih emailova i screenshotova u svakoj novoj poruci.",
      ],
    },
  ];
}

function enSections(topic: AirlineTopic) {
  return [
    {
      heading: "When this airline delay should be checked",
      body: [
        `For a ${topic.airline} flight, the case is not decided only by late departure. For [flight delay compensation](/en/flight-delay-compensation), first check final arrival, then route, operating carrier and delay reason. ${topic.enRouteContext}`,
        "If final arrival was three hours or more late, turn the case into a short file. Record the flight number, date, route, booking, scheduled arrival, actual arrival, airline messages and waiting costs. This order reduces manual work and keeps the claim from becoming a broad complaint without evidence.",
      ],
      bullets: enBullets,
    },
    {
      heading: "Route, operating carrier and one booking",
      body: [
        topic.enCarrierRule,
        "For connections, it is especially important whether all segments were bought under one booking. If they were, the review often follows the final destination on the ticket, not only the first airport where the delay started. If tickets were separate, the assessment is narrower and must clearly separate which carrier caused which cost.",
      ],
    },
    {
      heading: "Delay reason and what is not enough",
      body: [
        "The airline may cite technical fault, previous rotation, crew, air traffic control slot, bad weather, security screening, ground handling or airport closure. Some reasons can be stronger arguments against fixed compensation, but generic wording alone is not enough to understand the case.",
        "Ask for the link between the reason and your exact flight: when the problem started, how long it lasted, whether it affected one aircraft or the whole airport, and what the carrier did to reduce the impact. If the reply skips those facts, Let Kasni reviews the case through an evidence timeline, not only through the label chosen by the airline.",
      ],
    },
    {
      heading: "Evidence that speeds up the claim",
      body: [
        topic.enEvidenceFocus,
        "The most useful format is the same for every flight: booking confirmation, boarding pass, delay notice, app screenshot, departures-board photo, actual arrival and airline reply. When evidence is already sorted, the next follow-up becomes one new document or question instead of rewriting the whole story.",
      ],
    },
    {
      heading: "Care, hotel, transfer and receipts during the wait",
      body: [
        topic.enCareFocus,
        "Care rights are separate from fixed compensation. The airline may have a stronger argument against 250, 400 or 600 euros while food, water, accommodation or transfer receipts remain relevant. List those costs separately with a short explanation of why they were necessary.",
      ],
    },
    {
      heading: "How Let Kasni prepares the follow-up after rejection",
      body: [
        "If the airline rejects the claim with one short sentence, the next step is not sending the same text again. A stronger follow-up asks for concrete proof of the delay reason, the time period of the disruption and the measures taken by the carrier. That quickly shows whether the case is genuinely weak or only superficially rejected.",
        "For repeatable reviews, Let Kasni uses the same structure: arrival threshold, route, operating carrier, reason, costs, evidence and response status. This allows several passengers, a family booking or a group of colleagues to be handled without manually copying different emails and screenshots into every new message.",
      ],
    },
  ];
}

function article(topic: AirlineTopic): BlogArticle {
  return {
    id: topic.id,
    publishedAt: "2026-05-24",
    updatedAt: "2026-05-24",
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
    id: "egyptair-flight-delay-compensation",
    srSlug: "egyptair-kasnjenje-leta-naknada",
    enSlug: "egyptair-flight-delay-compensation",
    srTitle: "Egyptair kašnjenje leta: kada putnik može tražiti naknadu",
    enTitle: "Egyptair flight delay: when passengers can claim compensation",
    srDescription: "Kako proveriti Egyptair kašnjenje: EU segmenti, Srbija ruta, Kairo konekcija, briga tokom čekanja i dokazi.",
    enDescription: "How to check an Egyptair delay: EU segments, Serbia route, Cairo connection, care during the wait and evidence.",
    srExcerpt: "Kod Egyptair leta ključni su smer rute, EU segment, jedna rezervacija i dokaz krajnjeg dolaska.",
    enExcerpt: "For an Egyptair flight, route direction, EU segment, one booking and final-arrival proof are the key facts.",
    airline: "Egyptair",
    srRouteContext: "Kairo često služi kao veza ka Africi, Bliskom istoku ili Aziji, pa se mora proveriti da li je evropski deo rute dovoljan za zaštitu putnika.",
    enRouteContext: "Cairo is often a connection to Africa, the Middle East or Asia, so the European part of the route must be checked carefully.",
    srCarrierRule: "Ako Egyptair let polazi iz EU, evropska pravila se obično proveravaju šire nego kod polaska iz treće zemlje ka Srbiji. Kod polaska iz Srbije ili Egipta posebno se gleda da li postoji EU segment ili drugi evropski operativni prevoznik u istoj rezervaciji.",
    enCarrierRule: "If the Egyptair flight departs from the EU, European rules are usually reviewed more broadly than for a third-country departure toward Serbia. For departures from Serbia or Egypt, check whether there is an EU segment or another European operating carrier in the same booking.",
    srEvidenceFocus: "Za Egyptair konekciju najviše pomažu itinerary za sve segmente, dokaz novog leta iz Kaira, poruke o promeni reda letenja i dokaz krajnjeg dolaska ako je propušten nastavak puta.",
    enEvidenceFocus: "For an Egyptair connection, the itinerary for every segment, proof of the replacement flight from Cairo, schedule-change messages and final-arrival proof matter most if onward travel was missed.",
    srCareFocus: "Kod dužeg čekanja u tranzitu tražite obrok, osveženje, smeštaj ako čekanje pređe u noć i pisanu potvrdu šta je ponuđeno.",
    enCareFocus: "During a longer transit wait, ask for meals, refreshments, accommodation if the delay moves overnight and written confirmation of what was offered.",
  },
  {
    id: "etihad-airways-flight-delay-compensation",
    srSlug: "etihad-airways-kasnjenje-leta-naknada",
    enSlug: "etihad-airways-flight-delay-compensation",
    srTitle: "Etihad Airways kašnjenje leta: Abu Dabi, konekcije i naknada",
    enTitle: "Etihad Airways flight delay: Abu Dhabi, connections and compensation",
    srDescription: "Vodič za Etihad Airways kašnjenja: duga ruta, Abu Dabi veza, EU segmenti, krajnji dolazak i troškovi.",
    enDescription: "A guide to Etihad Airways delays: long routes, Abu Dhabi connection, EU segments, final arrival and costs.",
    srExcerpt: "Etihad Airways kašnjenje se posebno proverava kada Abu Dabi veza utiče na krajnji dolazak u jednoj rezervaciji.",
    enExcerpt: "Etihad Airways delays need special review when an Abu Dhabi connection affects final arrival under one booking.",
    airline: "Etihad Airways",
    srRouteContext: "Abu Dabi je često čvorište za daleki nastavak puta, pa jedan kasni segment može promeniti ceo itinerer i dolazak mnogo sati kasnije.",
    enRouteContext: "Abu Dhabi is often a hub for long onward journeys, so one late segment can change the whole itinerary and create a much later arrival.",
    srCarrierRule: "Etihad Airways nije evropski prevoznik, pa se ne sme pretpostaviti automatsko pokriće za svaki dolazak u Evropu. Polazak iz EU, EU segment u istoj rezervaciji ili evropski operativni prevoznik mogu promeniti procenu.",
    enCarrierRule: "Etihad Airways is not a European carrier, so coverage should not be assumed for every arrival in Europe. EU departure, an EU segment in the same booking or a European operating carrier can change the review.",
    srEvidenceFocus: "Kod Abu Dabi konekcije posebno čuvajte dokaz propuštenog nastavka, novu kartu, poruke o rerutiranju, hotelski vaučer i stvarno vreme dolaska na poslednju destinaciju.",
    enEvidenceFocus: "For an Abu Dhabi connection, keep proof of the missed onward flight, new ticket, rerouting messages, hotel voucher and actual arrival at the final destination.",
    srCareFocus: "Ako se čekanje produži preko noći, troškovi hotela i transfera treba da budu razumni, dokumentovani i povezani sa kašnjenjem, ne samo sa opštim komforom.",
    enCareFocus: "If the wait extends overnight, hotel and transfer costs should be reasonable, documented and linked to the delay, not only to general comfort.",
  },
  {
    id: "sas-flight-delay-compensation",
    srSlug: "sas-kasnjenje-leta-naknada",
    enSlug: "sas-flight-delay-compensation",
    srTitle: "SAS kašnjenje leta: Skandinavija, EU pravila i naknada",
    enTitle: "SAS flight delay: Scandinavia, EU rules and compensation",
    srDescription: "Kako proveriti SAS kašnjenje: skandinavske konekcije, EU/EEA zaštita, krajnji dolazak, briga i dokazi.",
    enDescription: "How to check an SAS delay: Scandinavian connections, EU/EEA protection, final arrival, care and evidence.",
    srExcerpt: "Kod SAS leta često postoji jači evropski okvir, ali i dalje treba dokazati dolazak, razlog i jednu rezervaciju.",
    enExcerpt: "For an SAS flight, European coverage is often stronger, but arrival, reason and one booking still need proof.",
    airline: "SAS",
    srRouteContext: "Kopenhagen, Stokholm i Oslo mogu biti krajnja destinacija ili veza ka severnoj Evropi, SAD ili Aziji.",
    enRouteContext: "Copenhagen, Stockholm and Oslo can be the final destination or a connection toward Northern Europe, the US or Asia.",
    srCarrierRule: "Kod SAS leta polazak iz EU/EEA i evropski operativni prevoznik često daju jasniji okvir zaštite. Ipak, naknada se ne zasniva na nazivu aviokompanije, već na ruti, krajnjem dolasku i razlogu kašnjenja.",
    enCarrierRule: "For an SAS flight, EU/EEA departure and a European operating carrier often give a clearer protection framework. Still, compensation is based on route, final arrival and delay reason, not only the airline name.",
    srEvidenceFocus: "Za SAS konekciju korisni su boarding pass za svaki segment, dokaz jedne rezervacije, poruke o promeni gejta ili nastavka i potvrda kada ste stvarno stigli.",
    enEvidenceFocus: "For an SAS connection, useful proof includes boarding passes for every segment, evidence of one booking, gate or onward-flight change messages and confirmation of actual arrival.",
    srCareFocus: "Kod skandinavskih čvorišta vremenski poremećaji mogu brzo napraviti noćenje, pa odmah tražite jasnu informaciju o hotelu, transferu i novom polasku.",
    enCareFocus: "At Scandinavian hubs, operational disruption can quickly create an overnight wait, so ask immediately for clear information about hotel, transfer and new departure.",
  },
  {
    id: "smartwings-flight-delay-compensation",
    srSlug: "smartwings-kasnjenje-leta-naknada",
    enSlug: "smartwings-flight-delay-compensation",
    srTitle: "Smartwings kašnjenje leta: čarter, sezonski let i naknada",
    enTitle: "Smartwings flight delay: charter, seasonal flight and compensation",
    srDescription: "Vodič za Smartwings kašnjenja: čarter letovi, turistički aranžmani, EU polazak, jedna rezervacija i računi.",
    enDescription: "A guide to Smartwings delays: charter flights, package trips, EU departure, one booking and receipts.",
    srExcerpt: "Smartwings kašnjenje često se javlja na sezonskim i čarter rutama, gde treba odvojiti aviokompaniju od turističke agencije.",
    enExcerpt: "Smartwings delays often appear on seasonal and charter routes, where airline responsibility must be separated from the tour operator.",
    airline: "Smartwings",
    srRouteContext: "Kod sezonskih letova putnici često imaju vaučer, aranžman ili grupnu rezervaciju, ali to ne znači da se operativni prevoznik ne proverava.",
    enRouteContext: "On seasonal flights, passengers often have a voucher, package trip or group booking, but the operating carrier still needs to be checked.",
    srCarrierRule: "Smartwings je evropski prevoznik, pa su EU polasci i mnoge evropske rute dobar početak procene. Kod čartera se dodatno utvrđuje ko je operativno obavio let i koji dokument pokazuje rezervaciju.",
    enCarrierRule: "Smartwings is a European carrier, so EU departures and many European routes are a strong starting point. For charters, also identify who operated the flight and which document proves the booking.",
    srEvidenceFocus: "Kod čarter leta čuvajte putni vaučer, potvrdu aranžmana, broj leta, obaveštenje agencije, poruku aviokompanije i dokaz dolaska, jer se podaci često nalaze u više sistema.",
    enEvidenceFocus: "For a charter flight, save the travel voucher, package confirmation, flight number, agency notice, airline message and arrival proof because details often sit in several systems.",
    srCareFocus: "Ako turistička agencija daje informacije, ipak tražite i dokaz šta je aviokompanija ponudila tokom čekanja, naročito za obrok, hotel ili transfer.",
    enCareFocus: "If the tour operator gives information, still keep proof of what the airline offered during the wait, especially for meals, hotel or transfer.",
  },
  {
    id: "corendon-airlines-flight-delay-compensation",
    srSlug: "corendon-airlines-kasnjenje-leta-naknada",
    enSlug: "corendon-airlines-flight-delay-compensation",
    srTitle: "Corendon Airlines kašnjenje leta: odmorišne rute i naknada",
    enTitle: "Corendon Airlines flight delay: leisure routes and compensation",
    srDescription: "Kako proveriti Corendon Airlines kašnjenje: sezonske rute, operativni prevoznik, EU polazak, briga i dokazi.",
    enDescription: "How to check a Corendon Airlines delay: seasonal routes, operating carrier, EU departure, care and evidence.",
    srExcerpt: "Kod Corendon Airlines leta najvažnije je potvrditi tačnog operativnog prevoznika i rutu pre računanja naknade.",
    enExcerpt: "For a Corendon Airlines flight, the exact operating carrier and route should be confirmed before calculating compensation.",
    airline: "Corendon Airlines",
    srRouteContext: "Odmorišne rute često kombinuju sezonski red letenja, grupne rezervacije i promene vremena polaska, pa dokaz iz istog dana postaje posebno važan.",
    enRouteContext: "Leisure routes often combine seasonal schedules, group bookings and changed departure times, so same-day evidence becomes especially important.",
    srCarrierRule: "Kod Corendon grupe prvo treba potvrditi koji subjekt je operativno obavio let i odakle je let poleteo. EU polazak je jači osnov, dok se dolazak ka EU proverava po operativnom prevozniku i konkretnoj ruti.",
    enCarrierRule: "For the Corendon group, first confirm which entity operated the flight and where the flight departed. EU departure is the stronger basis, while arrival into the EU is checked by operating carrier and route.",
    srEvidenceFocus: "Najviše pomažu boarding pass, charter ili booking potvrda, poruke o pomerenom polasku, fotografija table i dokaz kada su vrata otvorena na destinaciji.",
    enEvidenceFocus: "The most useful proof is the boarding pass, charter or booking confirmation, changed-departure messages, departures-board photo and evidence of when doors opened at destination.",
    srCareFocus: "Kod odmorišnih ruta čekanje često uključuje porodice i grupe, pa račune i pomoć treba prikupljati po putniku ili po zajedničkoj rezervaciji, bez mešanja iznosa.",
    enCareFocus: "On leisure routes, the wait often involves families and groups, so collect receipts and assistance details per passenger or per shared booking without mixing amounts.",
  },
  {
    id: "tunisair-flight-delay-compensation",
    srSlug: "tunisair-kasnjenje-leta-naknada",
    enSlug: "tunisair-flight-delay-compensation",
    srTitle: "Tunisair kašnjenje leta: Tunis, sezona i pravo na naknadu",
    enTitle: "Tunisair flight delay: Tunis, seasonality and compensation rights",
    srDescription: "Vodič za Tunisair kašnjenja: Tunis konekcija, sezonski letovi, EU segmenti, krajnji dolazak, hotel i računi.",
    enDescription: "A guide to Tunisair delays: Tunis connection, seasonal flights, EU segments, final arrival, hotel and receipts.",
    srExcerpt: "Tunisair kašnjenje treba proveriti kroz smer rute, EU polazak, operativnog prevoznika i dokaz stvarnog dolaska.",
    enExcerpt: "A Tunisair delay should be checked through route direction, EU departure, operating carrier and actual-arrival proof.",
    airline: "Tunisair",
    srRouteContext: "Tunis može biti krajnja destinacija ili veza ka drugom gradu, a sezonski red letenja često otežava brzo poređenje planiranog i stvarnog dolaska.",
    enRouteContext: "Tunis can be the final destination or a connection to another city, and seasonal schedules can make scheduled and actual arrival harder to compare quickly.",
    srCarrierRule: "Tunisair nije evropski prevoznik, pa je polazak iz EU obično mnogo jači osnov od leta koji samo dolazi ka EU iz treće zemlje. Kod Srbije se posebno proverava da li postoji EU segment u istoj rezervaciji.",
    enCarrierRule: "Tunisair is not a European carrier, so departure from the EU is usually a much stronger basis than a flight only arriving into the EU from a third country. For Serbia routes, check whether an EU segment exists in the same booking.",
    srEvidenceFocus: "Za Tunisair slučaj čuvajte poruke o novom polasku, potvrdu da li je let odložen ili zamenjen, račune za čekanje i dokaz poslednjeg dolaska ako je ruta imala nastavak.",
    enEvidenceFocus: "For a Tunisair case, keep messages about the new departure, confirmation whether the flight was delayed or replaced, waiting receipts and proof of final arrival if the route had onward travel.",
    srCareFocus: "Ako čekanje uđe u noć, odmah tražite hotel i transfer, a ako ih platite sami, sačuvajte račun i kratko zapišite zašto pomoć nije obezbeđena.",
    enCareFocus: "If the wait moves overnight, ask for hotel and transfer immediately. If you pay yourself, keep the receipt and briefly note why assistance was not provided.",
  },
];

export const articles = topics.map(article) satisfies BlogArticle[];
