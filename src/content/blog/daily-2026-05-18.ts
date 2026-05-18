import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "air-cairo-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft at an airport gate before a leisure route departure",
    position: "center",
  },
  "air-montenegro-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Runway lights before a short regional flight",
    position: "center",
  },
  "ajet-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft crossing clouds on a connection route",
    position: "center",
  },
  "arkia-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport departure board during an international delay",
    position: "center",
  },
  "china-southern-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger waiting in an airport terminal before a long-haul flight",
    position: "center",
  },
  "hainan-airlines-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Travelers waiting near large airport windows before a long-haul route",
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
  srHubNote: string;
  enHubNote: string;
  srCoverageNote: string;
  enCoverageNote: string;
  srEvidenceNote: string;
  enEvidenceNote: string;
};

const sharedBullets = {
  sr: [
    "Prvo proverite operativnog prevoznika i aerodrom polaska.",
    "Zatim uporedite planirani i stvarni dolazak na krajnju destinaciju.",
    "Posebno izdvojite račune za obrok, hotel, transfer ili novu kartu.",
    "Sačuvajte svaku verziju objašnjenja koje je aviokompanija dala.",
  ],
  en: [
    "First check the operating carrier and departure airport.",
    "Then compare scheduled and actual arrival at the final destination.",
    "Separate receipts for meals, hotel, transfer or a new ticket.",
    "Keep every version of the explanation the airline gave.",
  ],
};

function srSections(topic: AirlineTopic) {
  return [
    {
      heading: `${topic.airline}: kada kašnjenje vredi proveriti`,
      body: [
        `Kod ${topic.airline} leta najvažnije je da se ne procenjuje samo polazak iz Beograda ili drugog aerodroma, već dolazak na poslednju destinaciju iz rezervacije. Ako je dolazak bio tri sata ili više kasnije, slučaj treba proveriti kroz pravila za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). ${topic.srRouteNote}`,
        `${topic.srCoverageNote} Zato članak ne polazi od pretpostavke da svako kašnjenje automatski nosi 250, 400 ili 600 evra. Prvo se utvrđuju ruta, operativni prevoznik, jedna rezervacija, stvarno vreme dolaska i razlog koji je prevoznik naveo. Tek posle toga ima smisla razdvojiti fiksnu naknadu, brigu tokom čekanja, refundaciju i razumne dodatne troškove.`,
      ],
      bullets: sharedBullets.sr,
    },
    {
      heading: "Ruta, presedanje i operativni prevoznik",
      body: [
        `${topic.srHubNote} Ako je putovanje bilo u jednoj rezervaciji, procena se ne zaustavlja na prvom segmentu. Kratak problem na početku može napraviti mnogo veći kasni dolazak ako izgubite nastavak puta ili ako prevoznik promeni celu rutu.`,
        "Ako su karte bile odvojene, zahtev je obično teži jer prvi prevoznik ne mora odgovarati za samostalno kupljen nastavak. Zato su itinerary, booking reference i e-ticket važniji od opšte priče o putovanju. Oni pokazuju šta je prevoznik zaista prodao, do koje destinacije je trebalo da vas dovede i gde je nastao prekid plana.",
      ],
    },
    {
      heading: "Razlog kašnjenja i dokaz veze sa vašim letom",
      body: [
        "Aviokompanija može navesti tehnički kvar, kasnu rotaciju aviona, posadu, slot kontrole letenja, loše vreme, zatvaranje aerodroma, bezbednosni događaj ili kasniji dolazak aviona iz drugog grada. Neki razlozi mogu biti vanredne okolnosti, ali generička formulacija ne rešava slučaj.",
        `${topic.srEvidenceNote} Dobar dosije zato ima kratku vremensku liniju: kada je kašnjenje objavljeno, koji razlog je naveden, da li se razlog menjao, kada je avion stvarno stigao i koju pomoć je prevoznik ponudio. Let Kasni iz te građe odvaja deo za fiksnu naknadu od dela za troškove čekanja.`,
      ],
    },
    {
      heading: "Briga tokom čekanja i troškovi",
      body: [
        "Kod dužeg čekanja putnik treba da traži obrok, osveženje i jasnu informaciju o novom vremenu polaska. Ako čekanje prelazi u noć ili vas prevoznik pomera na kasniji let, hotel, transfer i razuman trošak komunikacije treba posebno sačuvati, uz vreme kupovine i razlog troška.",
        "Ova prava se proveravaju odvojeno od fiksne naknade. Moguće je da prevoznik ima jak argument protiv odštete, ali da i dalje ostanu računi za brigu ili preusmeravanje. U zahtevu ih ne treba mešati u jednu cifru: hrana, voda, hotel, transfer, nova karta i osnov za 250, 400 ili 600 evra imaju različitu logiku.",
      ],
    },
    {
      heading: "Tabela za pripremu zahteva",
      body: [
        `Za ${topic.airline} let pripremite jednostavnu tabelu: broj leta, datum, ruta, operativni prevoznik, booking reference, planirani dolazak, stvarni dolazak, objašnjenje kašnjenja, ponuđena pomoć i troškovi. Takav format je mnogo jači od duge žalbe bez redosleda.`,
        "Ako aviokompanija odbije zahtev, proverite da li odgovor navodi tačan let, datum, vremenski period, dokaz razloga i mere koje je prevoznik preduzeo da smanji posledice. Ako tih podataka nema, sledeći korak je dopuna sa vremenskom linijom i dokazima, a ne ponavljanje iste poruke.",
      ],
    },
  ];
}

function enSections(topic: AirlineTopic) {
  return [
    {
      heading: `${topic.airline}: when a delay is worth checking`,
      body: [
        `For a ${topic.airline} flight, do not assess only departure from Belgrade or another airport. The key question is arrival at the last destination in the booking. If arrival was three hours or more late, review the case under [flight delay compensation](/en/flight-delay-compensation). ${topic.enRouteNote}`,
        `${topic.enCoverageNote} This article therefore does not assume that every delay automatically means 250, 400 or 600 euros. First establish the route, operating carrier, one booking, actual arrival time and the reason the carrier gave.`,
      ],
      bullets: sharedBullets.en,
    },
    {
      heading: "Route, connection and operating carrier",
      body: [
        `${topic.enHubNote} If the journey was under one booking, the assessment does not stop at the first segment. A short problem at the start can create a much later final arrival if you miss the onward leg or if the carrier changes the whole route.`,
        "If tickets were separate, the claim is usually harder because the first carrier may not be responsible for a self-booked continuation. The itinerary, booking reference and e-ticket matter more than a general travel story. They show what the carrier actually sold and which destination it was supposed to get you to.",
      ],
    },
    {
      heading: "Delay reason and proof that it affected your flight",
      body: [
        "The airline may cite technical fault, late aircraft rotation, crew, air traffic control slot, bad weather, airport closure, security event or late arrival of an aircraft from another city. Some reasons can be extraordinary circumstances, but generic wording does not resolve the case.",
        `${topic.enEvidenceNote} A strong file therefore has a short timeline: when the delay was announced, which reason was given, whether the reason changed, when the aircraft actually arrived and what assistance the carrier offered. Let Kasni separates the fixed-compensation part from waiting-cost evidence.`,
      ],
    },
    {
      heading: "Care during the wait and costs",
      body: [
        "During a longer wait, passengers should ask for meals, refreshments and clear information about the new departure time. If the wait moves overnight or the carrier moves you to a later flight, hotel, transfer and reasonable communication costs should be saved separately.",
        "These rights are checked separately from fixed compensation. The carrier may have a strong argument against compensation while meal, hotel or rerouting receipts still matter. Do not merge them into one figure in the claim: food, water, hotel, transfer, new ticket and the basis for 250, 400 or 600 euros follow different logic.",
      ],
    },
    {
      heading: "Claim preparation table",
      body: [
        `For a ${topic.airline} flight, prepare a simple table: flight number, date, route, operating carrier, booking reference, scheduled arrival, actual arrival, delay explanation, assistance offered and costs. This is much stronger than a long complaint without sequence.`,
        "If the airline rejects the claim, check whether the response gives the exact flight, date, time period, proof of the reason and measures the carrier took to reduce the consequences. If those facts are missing, the next step is a timeline follow-up with evidence, not repeating the same message.",
      ],
    },
  ];
}

function airlineArticle(topic: AirlineTopic): BlogArticle {
  return {
    id: topic.id,
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
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
    id: "air-cairo-flight-delay-compensation",
    srSlug: "air-cairo-kasnjenje-leta-naknada",
    enSlug: "air-cairo-flight-delay-compensation",
    srTitle: "Air Cairo kašnjenje leta: Egipat, Beograd i prava putnika",
    enTitle: "Air Cairo flight delay: Egypt, Belgrade and passenger rights",
    srDescription: "Kako proveriti Air Cairo kašnjenje leta: ruta iz Srbije, dolazak u EU, care prava, troškovi čekanja i dokazi.",
    enDescription: "How to check an Air Cairo delay: Serbia route, EU arrival, care rights, waiting costs and evidence.",
    srExcerpt: "Air Cairo slučajevi traže pažljivu proveru rute jer neevropski prevoznik ne ulazi u isti okvir na svakom smeru.",
    enExcerpt: "Air Cairo cases need careful route review because a non-EU carrier is not treated the same in every direction.",
    airline: "Air Cairo",
    srRouteNote: "Kod letova Srbija-Egipat fiksna evropska naknada nije ista kao kod polaska iz EU, ali troškovi čekanja i preusmeravanja i dalje mogu biti važan deo dosijea.",
    enRouteNote: "On Serbia-Egypt flights, fixed European compensation is not the same as on EU departures, but waiting and rerouting costs can still be an important part of the file.",
    srHubNote: "Ako je Egipat deo šireg puta preko evropskog aerodroma, posebno proverite da li je postojao jedan booking i ko je operativno obavljao svaki segment.",
    enHubNote: "If Egypt was part of a wider trip through a European airport, check especially whether there was one booking and who operated each segment.",
    srCoverageNote: "Pošto Air Cairo nije evropski prevoznik, polazak, dolazak i eventualni EU segment moraju se proveriti pre bilo kakvog zaključka o fiksnoj naknadi.",
    enCoverageNote: "Because Air Cairo is not a European carrier, departure, arrival and any EU segment must be checked before any conclusion on fixed compensation.",
    srEvidenceNote: "Kod turističkih i sezonskih ruta posebno su korisni paket aranžman, vaučer, ugovor sa agencijom, nova satnica i dokaz da je prevoznik ili organizator znao za promenu.",
    enEvidenceNote: "On leisure and seasonal routes, the package contract, voucher, agency agreement, revised timing and proof that the carrier or organizer knew about the change are especially useful.",
  },
  {
    id: "air-montenegro-flight-delay-compensation",
    srSlug: "air-montenegro-kasnjenje-leta-naknada",
    enSlug: "air-montenegro-flight-delay-compensation",
    srTitle: "Air Montenegro kašnjenje leta: Podgorica, Tivat i naknada",
    enTitle: "Air Montenegro flight delay: Podgorica, Tivat and compensation",
    srDescription: "Vodič za Air Montenegro kašnjenja na regionalnim rutama: krajnji dolazak, ECAA okvir, troškovi i dokaz razloga.",
    enDescription: "A guide to Air Montenegro delays on regional routes: final arrival, ECAA context, costs and reason evidence.",
    srExcerpt: "Air Montenegro letovi iz Beograda često su kratki, ali izgubljena konekcija ili noćno čekanje mogu promeniti težinu slučaja.",
    enExcerpt: "Air Montenegro flights from Belgrade are often short, but a missed connection or overnight wait can change the case.",
    airline: "Air Montenegro",
    srRouteNote: "Kod Podgorice i Tivta posebno proverite da li je kašnjenje bilo samo neprijatnost na kratkom letu ili je pomerilo dolazak na dalju destinaciju.",
    enRouteNote: "For Podgorica and Tivat, check whether the delay was only an inconvenience on a short flight or whether it moved arrival at a further destination.",
    srHubNote: "Crnogorski aerodrom može biti kraj putovanja ili veza ka drugom letu, pa se u jednoj rezervaciji gleda poslednja destinacija, a ne samo prvi regionalni segment.",
    enHubNote: "A Montenegrin airport may be the end of the trip or a link to another flight, so under one booking the last destination matters, not only the first regional segment.",
    srCoverageNote: "Regionalni ECAA kontekst traži opreznu proveru, naročito kada se putovanje nadovezuje na EU let ili kada je problem nastao na evropskom aerodromu.",
    enCoverageNote: "The regional ECAA context needs careful review, especially when the journey connects to an EU flight or the disruption happened at a European airport.",
    srEvidenceNote: "Kod kratkih regionalnih letova važni su tačni minuti dolaska, vreme otvaranja vrata, poruke o novom polasku i dokaz da ste zbog kašnjenja izgubili sledeći segment.",
    enEvidenceNote: "On short regional flights, exact arrival minutes, door-opening time, messages about the new departure and proof that the delay made you miss the onward segment matter.",
  },
  {
    id: "ajet-flight-delay-compensation",
    srSlug: "ajet-kasnjenje-leta-naknada",
    enSlug: "ajet-flight-delay-compensation",
    srTitle: "AJet kašnjenje leta: Turska, konekcije i prava putnika",
    enTitle: "AJet flight delay: Turkey, connections and passenger rights",
    srDescription: "Kako proveriti AJet kašnjenje leta preko Turske: neevropski prevoznik, jedna rezervacija, krajnji dolazak i troškovi.",
    enDescription: "How to check an AJet delay via Turkey: non-EU carrier, one booking, final arrival and costs.",
    srExcerpt: "AJet kašnjenje treba proveriti kroz smer putovanja, operativnog prevoznika i da li je turska veza pomerila krajnji dolazak.",
    enExcerpt: "An AJet delay should be checked by travel direction, operating carrier and whether the Turkish connection moved final arrival.",
    airline: "AJet",
    srRouteNote: "Kod ruta preko Istanbula ili Ankare važno je razlikovati let iz EU, let ka EU i putovanje koje počinje u Srbiji sa neevropskim operativnim prevoznikom.",
    enRouteNote: "On routes through Istanbul or Ankara, separate an EU departure, an EU arrival and a journey starting in Serbia with a non-EU operating carrier.",
    srHubNote: "Turski aerodrom često funkcioniše kao presedanje, pa jedan kasni segment može promeniti ceo itinerer ako su letovi kupljeni zajedno.",
    enHubNote: "A Turkish airport often works as a connection, so one delayed segment can change the whole itinerary if the flights were bought together.",
    srCoverageNote: "Pošto AJet nije evropski prevoznik, evropska fiksna naknada zavisi od smera i pokrivene rute, a ne samo od dužine čekanja.",
    enCoverageNote: "Because AJet is not a European carrier, European fixed compensation depends on direction and covered route, not only on waiting time.",
    srEvidenceNote: "Kod turskih konekcija posebno sačuvajte boarding pass za svaki segment, novu kartu, poruku o propuštenoj vezi i vreme kada ste stvarno stigli na poslednji aerodrom.",
    enEvidenceNote: "For Turkish connections, keep the boarding pass for every segment, new ticket, missed-connection message and the time you actually reached the last airport.",
  },
  {
    id: "arkia-flight-delay-compensation",
    srSlug: "arkia-kasnjenje-leta-naknada",
    enSlug: "arkia-flight-delay-compensation",
    srTitle: "Arkia kašnjenje leta: Tel Aviv, bezbednost i dokazi",
    enTitle: "Arkia flight delay: Tel Aviv, security and evidence",
    srDescription: "Vodič za Arkia kašnjenja: Tel Aviv ruta, bezbednosni razlozi, vanredne okolnosti, briga i dokumenta.",
    enDescription: "A guide to Arkia delays: Tel Aviv route, security reasons, extraordinary circumstances, care and documents.",
    srExcerpt: "Arkia kašnjenja često zahtevaju posebno pažljivu proveru jer se bezbednosni i operativni razlozi moraju razdvojiti.",
    enExcerpt: "Arkia delays often need careful review because security and operational reasons must be separated.",
    airline: "Arkia",
    srRouteNote: "Kod Tel Aviv ruta razlog kašnjenja može biti operativan, bezbednosan, vremenski ili vezan za aerodrom, pa je precizno objašnjenje posebno važno.",
    enRouteNote: "On Tel Aviv routes, the delay reason may be operational, security-related, weather-related or airport-related, so a precise explanation matters especially.",
    srHubNote: "Ako je Tel Aviv samo jedan deo šireg puta, proverite da li je ostatak putovanja bio u istoj rezervaciji i da li je propuštena veza promenila krajnji dolazak.",
    enHubNote: "If Tel Aviv was only one part of a wider trip, check whether the rest of the journey was in the same booking and whether a missed connection changed final arrival.",
    srCoverageNote: "Arkia nije evropski prevoznik, pa se evropska pokrivenost proverava kroz aerodrom polaska, dolazak, eventualni EU segment i operativnog prevoznika.",
    enCoverageNote: "Arkia is not a European carrier, so European coverage is checked through departure airport, arrival, any EU segment and operating carrier.",
    srEvidenceNote: "Ako se pominje bezbednost, tražite konkretan vremenski period i uticaj na vaš let; ako se kasnije pominje operativni razlog, sačuvajte obe verzije.",
    enEvidenceNote: "If security is mentioned, ask for the specific time period and effect on your flight; if an operational reason is later mentioned, keep both versions.",
  },
  {
    id: "china-southern-flight-delay-compensation",
    srSlug: "china-southern-kasnjenje-leta-naknada",
    enSlug: "china-southern-flight-delay-compensation",
    srTitle: "China Southern kašnjenje leta: duga ruta, EU segment i naknada",
    enTitle: "China Southern flight delay: long route, EU segment and compensation",
    srDescription: "Kako proveriti China Southern kašnjenje: duga ruta, Beograd, EU pokrivenost, konekcije, troškovi i dokaz razloga.",
    enDescription: "How to check a China Southern delay: long route, Belgrade, EU coverage, connections, costs and reason evidence.",
    srExcerpt: "Kod China Southern dugih ruta najvažnije je odvojiti samu dužinu putovanja od pitanja da li evropska pravila pokrivaju smer.",
    enExcerpt: "For China Southern long routes, separate trip distance from whether European rules cover the travel direction.",
    airline: "China Southern",
    srRouteNote: "Duga ruta može otvoriti pitanje većeg iznosa, ali samo ako je pravni okvir za taj smer pokriven i ako je krajnji dolazak kasnio dovoljno dugo.",
    enRouteNote: "A long route can raise the question of a higher amount, but only if the legal framework covers that direction and final arrival was late enough.",
    srHubNote: "Ako se putovanje nastavlja preko kineskog ili evropskog čvorišta, jedna rezervacija i operativni prevoznik po segmentima postaju ključni dokaz.",
    enHubNote: "If the journey continues through a Chinese or European hub, one booking and the operating carrier on each segment become key evidence.",
    srCoverageNote: "Pošto China Southern nije evropski prevoznik, ne sme se pretpostaviti da svaka ruta ka Srbiji ili iz Srbije automatski nosi evropsku fiksnu naknadu.",
    enCoverageNote: "Because China Southern is not a European carrier, do not assume that every route to or from Serbia automatically carries European fixed compensation.",
    srEvidenceNote: "Kod dugih ruta posebno čuvajte celu elektronsku kartu, sva vremena presedanja, dokaz nove rute, hotel, transfer i poruke o tome koji segment je pokrenuo kašnjenje.",
    enEvidenceNote: "On long routes, keep the whole e-ticket, all connection times, proof of the new route, hotel, transfer and messages showing which segment triggered the delay.",
  },
  {
    id: "hainan-airlines-flight-delay-compensation",
    srSlug: "hainan-airlines-kasnjenje-leta-naknada",
    enSlug: "hainan-airlines-flight-delay-compensation",
    srTitle: "Hainan Airlines kašnjenje leta: Kina, Beograd i krajnji dolazak",
    enTitle: "Hainan Airlines flight delay: China, Belgrade and final arrival",
    srDescription: "Vodič za Hainan Airlines kašnjenja: duga ruta, neevropski prevoznik, finalni dolazak, troškovi i odbijenice.",
    enDescription: "A guide to Hainan Airlines delays: long route, non-EU carrier, final arrival, costs and rejection replies.",
    srExcerpt: "Hainan Airlines slučaj treba proveriti kroz smer putovanja, vezane segmente i dokaz da je kašnjenje pogodilo krajnju destinaciju.",
    enExcerpt: "A Hainan Airlines case should be checked by travel direction, connected segments and proof that delay affected final destination.",
    airline: "Hainan Airlines",
    srRouteNote: "Kod letova između Srbije i Kine dužina puta sama po sebi nije dovoljna; prvo se proverava da li je smer pokriven evropskim pravilima i ko je obavljao let.",
    enRouteNote: "On flights between Serbia and China, distance alone is not enough; first check whether the direction is covered by European rules and who operated the flight.",
    srHubNote: "Ako je Hainan Airlines segment deo dužeg itinerera sa evropskim presedanjem, važno je dokazati jednu rezervaciju i stvarni dolazak na poslednju destinaciju.",
    enHubNote: "If the Hainan Airlines segment is part of a wider itinerary with a European connection, prove one booking and actual arrival at the last destination.",
    srCoverageNote: "Kao neevropski prevoznik, Hainan Airlines zahteva opreznu proveru pokrivene rute pre bilo kakvog obećanja o fiksnoj naknadi.",
    enCoverageNote: "As a non-EU carrier, Hainan Airlines requires careful covered-route review before any promise of fixed compensation.",
    srEvidenceNote: "Kod vrlo dugih kašnjenja posebno odvojite odštetu, refundaciju, preusmeravanje i razumno nastale troškove, jer aviokompanija može odgovoriti različito za svaki deo zahteva.",
    enEvidenceNote: "For very long delays, separate compensation, refund, rerouting and reasonable expenses because the airline may respond differently to each part of the claim.",
  },
];

export const articles = topics.map(airlineArticle);
