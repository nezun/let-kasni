import type { BlogArticle, BlogArticleImage, BlogSection } from "@/lib/blog";

export const images = {
  "serbia-eu-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft parked at an airport gate before a European route",
    position: "center",
  },
  "serbia-germany-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft flying above clouds on a route to a European hub",
    position: "center",
  },
  "serbia-austria-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport terminal with aircraft waiting during a connection delay",
    position: "center",
  },
  "serbia-turkey-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger waiting in an airport terminal during a long route delay",
    position: "center",
  },
  "belgrade-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Runway and terminal lights during a delayed evening departure",
    position: "center",
  },
  "nis-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport departure board during a regional flight delay",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

type RouteTopic = {
  id: string;
  srSlug: string;
  enSlug: string;
  srTitle: string;
  enTitle: string;
  srDescription: string;
  enDescription: string;
  srExcerpt: string;
  enExcerpt: string;
  srRoute: string;
  enRoute: string;
  srFocus: string;
  enFocus: string;
};

function routeSrSections(topic: RouteTopic): BlogSection[] {
  return [
    {
      heading: `${topic.srRoute}: šta prvo proveriti`,
      body: [
        `${topic.srRoute} ne procenjuje se po državljanstvu putnika, već po aerodromu polaska, aerodromu dolaska, operativnom prevozniku i rezervaciji. Ako je dolazak na krajnju destinaciju kasnio tri sata ili više, slučaj treba proveriti kroz [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta).`,
        `${topic.srFocus} Prvi korak je da utvrdite da li je let polazio iz EU, da li je ka EU leteo evropski prevoznik i da li su konekcije bile u jednoj rezervaciji. Tek posle toga ima smisla procenjivati razlog kašnjenja.`,
      ],
      bullets: [
        "Prvo proverite aerodrome polaska i dolaska.",
        "Zatim proverite operativnog prevoznika, ne samo marketing oznaku.",
        "Kod konekcija čuvajte ceo itinerer i novi let ako je izdat.",
      ],
    },
    {
      heading: "Polazak iz EU i polazak iz Srbije nisu isti",
      body: [
        "Let koji polazi iz EU često ulazi u evropsku zaštitu šire nego let koji polazi iz Srbije. Kod polaska iz Srbije posebno je važno ko stvarno obavlja let. Codeshare oznaka na karti može zbuniti putnika, pa uvek proverite operativnog prevoznika u rezervaciji ili aplikaciji.",
        "Ako je put kupljen kao jedna rezervacija, kašnjenje prvog segmenta može se procenjivati kroz krajnji dolazak. Ako su karte odvojene, svaki segment se najčešće gleda zasebno, a posledice kratkog samostalnog presedanja mogu ostati rizik putnika.",
      ],
    },
    {
      heading: "Razlog kašnjenja na međunarodnoj ruti",
      body: [
        "Na međunarodnim rutama često se pominju slot, kontrola letenja, vreme, prethodna rotacija, tehnički razlog ili posada. Neki od tih razloga mogu biti vanredne okolnosti, ali samo ako su konkretno povezani sa vašim letom i ako aviokompanija pokaže da je razumno pokušala da smanji kašnjenje.",
        "Ako je prvi uzrok bio vanredan, ali se kasnije kašnjenje povećalo zbog organizacije aviona, posade ili preusmeravanja, slučaj može ostati otvoren za detaljniju proveru. Zato je vremenska linija važnija od jedne kratke poruke u aplikaciji.",
      ],
    },
    {
      heading: "Troškovi čekanja i dokaz o brizi",
      body: [
        "Obroci, voda, komunikacija, hotel i transfer treba da se vode odvojeno od fiksne naknade. Čak i kada je razlog kašnjenja vanredan, putnik tokom dugog čekanja ne treba da ostane bez osnovne pomoći. Ako pomoć nije ponuđena, troškovi treba da budu razumni i dokumentovani.",
        "Sačuvajte račune i kratku belešku zašto je trošak bio nužan. Kod noćnog čekanja zapišite kome ste se obratili za hotel pre nego što ste sami platili smeštaj. To kasnije pravi razliku između jasnog zahteva i opšte žalbe.",
      ],
    },
    {
      heading: "Ponovljiv obrazac za zahtev",
      body: [
        "Najbrži obrazac ima iste kolone svaki put: ruta, broj leta, operativni prevoznik, jedna rezervacija, planirani dolazak, stvarni dolazak, razlog, ponuđena pomoć i troškovi. Takva struktura smanjuje ručni rad i olakšava agentu ili pravniku da brzo vidi šta nedostaje.",
        "Ako aviokompanija odgovori opštom rečenicom, dopuna treba da traži dokaz direktne veze između razloga i konkretnog leta. Ne treba ponavljati celu priču, već dodati podatak koji nedostaje i zatražiti proverljivo objašnjenje.",
      ],
    },
  ];
}

function routeEnSections(topic: RouteTopic): BlogSection[] {
  return [
    {
      heading: `${topic.enRoute}: what to check first`,
      body: [
        `${topic.enRoute} is not assessed by passenger nationality, but by departure airport, arrival airport, operating carrier and booking. If arrival at the final destination was three hours or more late, check the case under [flight delay compensation](/en/flight-delay-compensation).`,
        `${topic.enFocus} The first step is to establish whether the flight departed from the EU, whether a European carrier operated the flight into the EU and whether connections were under one booking. Only after that does it make sense to assess the delay reason.`,
      ],
      bullets: [
        "First check departure and arrival airports.",
        "Then check the operating carrier, not only the marketing code.",
        "For connections, keep the full itinerary and new flight if issued.",
      ],
    },
    {
      heading: "EU departure and Serbia departure are different",
      body: [
        "A flight departing from the EU is often covered more broadly than a flight departing from Serbia. For departures from Serbia, the operating carrier is especially important. The codeshare label on a ticket can confuse passengers, so check the carrier that actually operated the flight in the booking or app.",
        "If travel was bought as one booking, delay on the first segment may be assessed through final arrival. If tickets were separate, each segment is usually assessed on its own and the consequences of a short self-made connection may remain the passenger's risk.",
      ],
    },
    {
      heading: "Delay reason on an international route",
      body: [
        "International routes often involve slot, air traffic control, weather, previous rotation, technical reason or crew. Some of these can be extraordinary circumstances, but only if they are concretely linked to your flight and the airline shows reasonable efforts to reduce the delay.",
        "If the first cause was extraordinary but the later delay grew because of aircraft, crew or rerouting organization, the case may still need detailed review. That is why a timeline is more useful than one short app message.",
      ],
    },
    {
      heading: "Waiting costs and care evidence",
      body: [
        "Meals, water, communication, hotel and transfer should be handled separately from fixed compensation. Even when the delay reason is extraordinary, passengers should not be left without basic help during a long wait. If help is not offered, costs should be reasonable and documented.",
        "Keep receipts and a short note explaining why the cost was necessary. During overnight waiting, record who you asked for hotel accommodation before paying yourself. That later separates a clear request from a general complaint.",
      ],
    },
    {
      heading: "Repeatable claim structure",
      body: [
        "The fastest structure uses the same columns every time: route, flight number, operating carrier, one booking, scheduled arrival, actual arrival, reason, assistance offered and costs. This reduces manual work and helps an agent or lawyer see quickly what is missing.",
        "If the airline answers with broad wording, the follow-up should ask for evidence of the direct link between the reason and the specific flight. Do not repeat the whole story; add the missing fact and request a checkable explanation.",
      ],
    },
  ];
}

function routeArticle(topic: RouteTopic): BlogArticle {
  return {
    id: topic.id,
    publishedAt: "2026-05-15",
    updatedAt: "2026-05-15",
    sr: {
      slug: topic.srSlug,
      title: topic.srTitle,
      description: topic.srDescription,
      excerpt: topic.srExcerpt,
      category: "Rute iz Srbije",
      readTime: "8 min čitanja",
      sections: routeSrSections(topic),
    },
    en: {
      slug: topic.enSlug,
      title: topic.enTitle,
      description: topic.enDescription,
      excerpt: topic.enExcerpt,
      category: "Serbia routes",
      readTime: "8 min read",
      sections: routeEnSections(topic),
    },
  };
}

const routeTopics: RouteTopic[] = [
  {
    id: "serbia-eu-flight-delay-compensation",
    srSlug: "srbija-eu-kasnjenje-leta-naknada",
    enSlug: "serbia-eu-flight-delay-compensation",
    srTitle: "Kašnjenje leta Srbija-EU: kada važe evropska prava putnika",
    enTitle: "Serbia-EU flight delay: when European passenger rights apply",
    srDescription: "Kako proveriti kašnjenje na rutama između Srbije i EU: polazak, dolazak, evropski prevoznik, jedna rezervacija i dokazi.",
    enDescription: "How to check delays on Serbia-EU routes: departure, arrival, European carrier, one booking and evidence.",
    srExcerpt: "Na rutama Srbija-EU pravo na naknadu ne zavisi od državljanstva putnika, već od rute, operativnog prevoznika, rezervacije i razloga kašnjenja.",
    enExcerpt: "On Serbia-EU routes, compensation does not depend on passenger nationality, but on route, operating carrier, booking and delay reason.",
    srRoute: "Rute Srbija-EU",
    enRoute: "Serbia-EU routes",
    srFocus: "Let iz EU ka Srbiji često je jači kandidat za proveru, dok let iz Srbije ka EU posebno traži proveru operativnog prevoznika.",
    enFocus: "A flight from the EU to Serbia is often a stronger candidate for review, while a flight from Serbia to the EU especially requires checking the operating carrier.",
  },
  {
    id: "serbia-germany-flight-delay-compensation",
    srSlug: "srbija-nemacka-kasnjenje-leta-naknada",
    enSlug: "serbia-germany-flight-delay-compensation",
    srTitle: "Kašnjenje leta Srbija-Nemačka: naknada, konekcije i dokazi",
    enTitle: "Serbia-Germany flight delay: compensation, connections and evidence",
    srDescription: "Praktičan vodič za kašnjenja između Srbije i Nemačke: Frankfurt, Minhen, Berlin, jedna rezervacija, krajnji dolazak i troškovi.",
    enDescription: "A practical guide to delays between Serbia and Germany: Frankfurt, Munich, Berlin, one booking, final arrival and costs.",
    srExcerpt: "Rute između Srbije i Nemačke često ulaze u proveru jer povezuju EU polaske, evropske prevoznike i konekcije preko velikih čvorišta.",
    enExcerpt: "Routes between Serbia and Germany often deserve review because they combine EU departures, European carriers and connections through major hubs.",
    srRoute: "Rute Srbija-Nemačka",
    enRoute: "Serbia-Germany routes",
    srFocus: "Frankfurt, Minhen i Berlin često menjaju procenu jer mali pomak prvog leta može napraviti veliki kasni dolazak na kraju puta.",
    enFocus: "Frankfurt, Munich and Berlin often change the assessment because a small shift on the first flight can create a large late arrival at the end of the journey.",
  },
  {
    id: "serbia-austria-flight-delay-compensation",
    srSlug: "srbija-austrija-kasnjenje-leta-naknada",
    enSlug: "serbia-austria-flight-delay-compensation",
    srTitle: "Kašnjenje leta Srbija-Austrija: Beč, konekcije i naknada",
    enTitle: "Serbia-Austria flight delay: Vienna connections and compensation",
    srDescription: "Kako proveriti kašnjenje između Srbije i Austrije: Beč kao čvorište, jedna rezervacija, krajnji dolazak, briga i dokazi.",
    enDescription: "How to check delays between Serbia and Austria: Vienna as a hub, one booking, final arrival, care and evidence.",
    srExcerpt: "Rute Srbija-Austrija često zavise od toga da li je Beč bio krajnja destinacija ili konekcija ka daljem putu.",
    enExcerpt: "Serbia-Austria routes often depend on whether Vienna was the final destination or a connection to onward travel.",
    srRoute: "Rute Srbija-Austrija",
    enRoute: "Serbia-Austria routes",
    srFocus: "Beč je često i odredište i čvorište, pa se mora jasno odvojiti kašnjenje dolaska u Beč od kašnjenja na krajnjoj destinaciji.",
    enFocus: "Vienna is often both a destination and a hub, so arrival delay in Vienna must be separated from delay at the final destination.",
  },
  {
    id: "serbia-turkey-flight-delay-compensation",
    srSlug: "srbija-turska-kasnjenje-leta-naknada",
    enSlug: "serbia-turkey-flight-delay-compensation",
    srTitle: "Kašnjenje leta Srbija-Turska: Istanbul, konekcije i prava",
    enTitle: "Serbia-Turkey flight delay: Istanbul connections and rights",
    srDescription: "Vodič za kašnjenja između Srbije i Turske: Istanbul kao čvorište, evropski okvir, krajnji dolazak, briga i dokazi.",
    enDescription: "A guide to delays between Serbia and Turkey: Istanbul as a hub, European coverage, final arrival, care and evidence.",
    srExcerpt: "Kod ruta Srbija-Turska najvažnije je da li evropska pravila pokrivaju konkretan let i da li je kašnjenje poremetilo dalji put.",
    enExcerpt: "On Serbia-Turkey routes, the key question is whether European rules cover the flight and whether the delay disrupted onward travel.",
    srRoute: "Rute Srbija-Turska",
    enRoute: "Serbia-Turkey routes",
    srFocus: "Istanbul konekcije mogu biti deo duge rezervacije, ali evropski okvir zavisi od polaska, dolaska i operativnog prevoznika.",
    enFocus: "Istanbul connections can be part of a long booking, but European coverage depends on departure, arrival and operating carrier.",
  },
  {
    id: "belgrade-flight-delay-compensation",
    srSlug: "beograd-kasnjenje-leta-naknada",
    enSlug: "belgrade-flight-delay-compensation",
    srTitle: "Kašnjenje leta iz Beograda: naknada, čvorišta i dokazi",
    enTitle: "Belgrade flight delay: compensation, hubs and evidence",
    srDescription: "Kako putnik sa leta iz Beograda proverava pravo na naknadu: EU rute, evropski prevoznik, konekcije, troškovi i dokumenti.",
    enDescription: "How a passenger on a Belgrade flight checks compensation rights: EU routes, European carrier, connections, costs and documents.",
    srExcerpt: "Kod letova iz Beograda presudni su ruta, operativni prevoznik, jedna rezervacija i stvarni dolazak na poslednji aerodrom.",
    enExcerpt: "For Belgrade flights, the decisive facts are route, operating carrier, one booking and actual arrival at the last airport.",
    srRoute: "Letovi iz Beograda",
    enRoute: "Belgrade flights",
    srFocus: "Beograd je polazna tačka za direktne EU rute i konekcije preko velikih čvorišta, pa jedan isti problem može imati različitu pravnu osnovu.",
    enFocus: "Belgrade is a departure point for direct EU routes and connections through major hubs, so the same disruption can have different legal bases.",
  },
  {
    id: "nis-flight-delay-compensation",
    srSlug: "nis-kasnjenje-leta-naknada",
    enSlug: "nis-flight-delay-compensation",
    srTitle: "Kašnjenje leta iz Niša: kada putnik može da traži naknadu",
    enTitle: "Nis flight delay: when passengers can claim compensation",
    srDescription: "Praktičan vodič za kašnjenja letova iz Niša: EU rute, niskotarifne mreže, troškovi čekanja, konekcije i dokazi.",
    enDescription: "A practical guide to delays from Nis: EU routes, low-cost networks, waiting costs, connections and evidence.",
    srExcerpt: "Kod letova iz Niša posebno treba proveriti evropsku rutu, operativnog prevoznika i da li je kasni dolazak prešao prag od tri sata.",
    enExcerpt: "For flights from Nis, check the European route, operating carrier and whether late arrival crossed the three-hour threshold.",
    srRoute: "Letovi iz Niša",
    enRoute: "Nis flights",
    srFocus: "Niš često ima niskotarifne evropske rute, pa prethodna rotacija, aerodromska ograničenja i stvarni dolazak moraju biti uredno dokumentovani.",
    enFocus: "Nis often has low-cost European routes, so previous rotation, airport restrictions and actual arrival need clear documentation.",
  },
];

export const articles = routeTopics.map(routeArticle) satisfies BlogArticle[];
