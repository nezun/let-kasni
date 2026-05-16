import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "pegasus-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft parked at an airport gate before an international flight",
    position: "center",
  },
  "lot-polish-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport terminal with aircraft waiting during a hub connection",
    position: "center",
  },
  "aegean-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft flying above clouds on a European route",
    position: "center",
  },
  "ita-airways-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport departures board during a European flight delay",
    position: "center",
  },
  "flydubai-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger waiting in an airport terminal during a long route delay",
    position: "center",
  },
  "qatar-airways-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft and runway lights before a long-haul connection",
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
  category: string;
};

const sharedBullets = {
  sr: [
    "Proverite operativnog prevoznika, rutu i krajnju destinaciju.",
    "Meri se stvarni dolazak, ne samo najavljeno kašnjenje u polasku.",
    "Troškove čekanja odvojite od fiksne naknade od 250, 400 ili 600 evra.",
  ],
  en: [
    "Check the operating carrier, route and final destination.",
    "Measure actual arrival, not only the announced departure delay.",
    "Separate waiting costs from fixed compensation of 250, 400 or 600 euros.",
  ],
};

function srSections(topic: AirlineTopic) {
  return [
    {
      heading: `${topic.airline}: kada kašnjenje treba proveriti`,
      body: [
        `Kod ${topic.airline} kašnjenja prvo se ne pita koliko je putnik bio nervozan na gejtu, već da li je dolazak na krajnju destinaciju kasnio tri sata ili više. Ako jeste, slučaj treba uporediti sa pravilima za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). ${topic.srRouteNote}`,
        "Drugi korak je ruta. Let koji polazi iz EU obično ima širi okvir zaštite. Let iz Srbije ka EU ili preko evropskog čvorišta posebno traži proveru operativnog prevoznika, jedne rezervacije i krajnjeg dolaska. Državljanstvo putnika najčešće nije presudna činjenica.",
      ],
      bullets: sharedBullets.sr,
    },
    {
      heading: "Direktan let, konekcija i jedna rezervacija",
      body: [
        `${topic.srHubNote} Ako je sve kupljeno kao jedna rezervacija, kasni prvi segment može se procenjivati kroz dolazak na poslednji aerodrom iz plana. Ako su karte odvojene, svaki let se uglavnom proverava zasebno, a propušten samostalni nastavak teže ulazi u zahtev.`,
        "Zato sačuvajte kompletan itinerer, ne samo boarding pass za problematičan segment. Kod konekcije su važni originalni plan, novi let ako je izdat, vreme dolaska na krajnju destinaciju i poruke koje pokazuju da je kompanija znala za nastavak puta.",
      ],
    },
    {
      heading: "Razlog kašnjenja i odgovornost prevoznika",
      body: [
        "Tehnički kvar, kasna rotacija aviona, nedostatak posade ili operativna organizacija često traže detaljniju proveru jer mogu biti u sferi aviokompanije. Loše vreme, zatvaranje aerodroma, bezbednosni događaj ili odluka kontrole letenja mogu oslabiti fiksnu naknadu, ali ne zatvaraju automatski pravo na brigu.",
        "Najslabiji odgovor je opšta rečenica da su postojale vanredne okolnosti. Bolji dosije traži vezu između razloga, vremenskog perioda i baš vašeg leta. Ako se razlog menja iz poruke u poruku, sačuvajte sve verzije jer promena često pokazuje da slučaj nije objašnjen dovoljno precizno.",
      ],
    },
    {
      heading: "Obrok, hotel i refundacija troškova",
      body: [
        "Kod dužeg čekanja putnik treba da pita za obrok, osveženje, komunikaciju, a kod noćnog pomeranja i za hotel sa transferom. Ova prava su odvojena od fiksne naknade. Čak i kada aviokompanija ima dobar argument protiv odštete, razumni troškovi čekanja mogu ostati poseban zahtev.",
        "Ako pomoć nije ponuđena ili nije dostupna, troškovi treba da budu razumni i povezani sa čekanjem. Sačuvajte račune, dokaz plaćanja i kratak trag da ste prvo tražili pomoć od aviokompanije. Let Kasni takve stavke slaže u poseban deo dosijea kako se ne bi izgubile u raspravi o razlozima kašnjenja.",
      ],
    },
    {
      heading: "Kako pripremiti zahtev bez gubljenja vremena",
      body: [
        `Za ${topic.airline} let napravite istu tabelu kao za svaki drugi slučaj: broj leta, datum, ruta, operativni prevoznik, jedna rezervacija, planirani dolazak, stvarni dolazak, navedeni razlog, ponuđena pomoć i troškovi. Takav obrazac je brži od duge žalbe i lakše se dopunjava ako stigne odbijenica.`,
        "Ako odgovor aviokompanije ne pominje tačan let, datum, dokaz razloga i mere za smanjenje kašnjenja, sledeći korak je kratka dopuna sa vremenskom linijom. Ne treba prepričavati sve ispočetka; treba tražiti konkretno objašnjenje i priložiti najjače dokaze.",
      ],
    },
  ];
}

function enSections(topic: AirlineTopic) {
  return [
    {
      heading: `${topic.airline}: when to check a delay`,
      body: [
        `For a ${topic.airline} delay, the first question is not how frustrating the gate wait felt, but whether arrival at the final destination was three hours or more late. If it was, compare the case with [flight delay compensation](/en/flight-delay-compensation). ${topic.enRouteNote}`,
        "The second step is route coverage. A flight departing from the EU usually has broader protection. A flight from Serbia into the EU or through a European hub needs a careful check of operating carrier, one booking and final arrival. Passenger nationality is usually not the decisive fact.",
      ],
      bullets: sharedBullets.en,
    },
    {
      heading: "Direct flight, connection and one booking",
      body: [
        `${topic.enHubNote} If everything was bought as one booking, a late first segment may be assessed through arrival at the final airport in the plan. If tickets were separate, each flight is usually checked on its own and a missed self-made onward flight is harder to include.`,
        "Keep the full itinerary, not only the boarding pass for the disrupted segment. For a connection, the original plan, replacement flight, final-arrival time and messages showing that the airline knew about the onward journey can all matter.",
      ],
    },
    {
      heading: "Delay reason and carrier responsibility",
      body: [
        "A technical fault, late aircraft rotation, crew shortage or operational organization often needs detailed review because it may sit within the airline's sphere. Bad weather, airport closure, a security event or air traffic control decision can weaken fixed compensation, but they do not automatically remove care rights.",
        "The weakest answer is a broad sentence saying there were extraordinary circumstances. A stronger case file asks for the link between the reason, the time period and your specific flight. If the reason changes from message to message, keep every version because that often shows the case was not explained precisely.",
      ],
    },
    {
      heading: "Meals, hotel and expense reimbursement",
      body: [
        "During a longer wait, passengers should ask for meals, refreshments, communication and, when the delay moves overnight, hotel accommodation with transfer. These rights are separate from fixed compensation. Even when the airline has a good defence against compensation, reasonable waiting costs may remain a separate claim.",
        "If assistance was not offered or was unavailable, costs should be reasonable and linked to the wait. Keep receipts, proof of payment and a short trail showing that you first asked the airline for help. Let Kasni organizes these items separately so they are not lost in the argument about the delay reason.",
      ],
    },
    {
      heading: "How to prepare the claim without wasting time",
      body: [
        `For a ${topic.airline} flight, use the same table as for any other case: flight number, date, route, operating carrier, one booking, scheduled arrival, actual arrival, stated reason, assistance offered and costs. This format is faster than a long complaint and easier to update if a rejection arrives.`,
        "If the airline's answer does not mention the exact flight, date, proof of the reason and measures taken to reduce the delay, the next step is a short follow-up with a timeline. Do not retell everything from the beginning; request a concrete explanation and attach the strongest evidence.",
      ],
    },
  ];
}

function airlineArticle(topic: AirlineTopic): BlogArticle {
  return {
    id: topic.id,
    publishedAt: "2026-05-16",
    updatedAt: "2026-05-16",
    sr: {
      slug: topic.srSlug,
      title: topic.srTitle,
      description: topic.srDescription,
      excerpt: topic.srExcerpt,
      category: topic.category,
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
    id: "pegasus-flight-delay-compensation",
    srSlug: "pegasus-kasnjenje-leta-naknada",
    enSlug: "pegasus-flight-delay-compensation",
    srTitle: "Pegasus kašnjenje leta: naknada, Istanbul i prava putnika",
    enTitle: "Pegasus flight delay: compensation, Istanbul and passenger rights",
    srDescription: "Kako proveriti Pegasus kašnjenje leta iz Srbije ili preko Istanbula: ruta, krajnji dolazak, razlog, briga i dokazi.",
    enDescription: "How to check a Pegasus flight delay from Serbia or via Istanbul: route, final arrival, reason, care and evidence.",
    srExcerpt: "Pegasus slučajevi često zavise od toga da li je let direktan, da li je konekcija pod jednom rezervacijom i da li je kašnjenje zaista van kontrole prevoznika.",
    enExcerpt: "Pegasus cases often depend on whether the flight was direct, whether the connection was under one booking and whether the delay was truly outside the carrier's control.",
    airline: "Pegasus",
    srRouteNote: "Za rute preko Istanbula posebno je važno odvojiti prvi segment od krajnjeg dolaska.",
    enRouteNote: "For routes via Istanbul, separate the first segment from final arrival.",
    srHubNote: "Istanbul može biti krajnja destinacija ili čvorište za dalji let, pa isti polazak iz Srbije ne znači uvek isti pravni okvir.",
    enHubNote: "Istanbul may be the final destination or a hub for onward travel, so the same departure from Serbia does not always create the same legal frame.",
    category: "Aviokompanije",
  },
  {
    id: "lot-polish-flight-delay-compensation",
    srSlug: "lot-polish-kasnjenje-leta-naknada",
    enSlug: "lot-polish-flight-delay-compensation",
    srTitle: "LOT kašnjenje leta: Varšava, konekcije i naknada",
    enTitle: "LOT Polish flight delay: Warsaw connections and compensation",
    srDescription: "Vodič za LOT kašnjenja preko Varšave: jedna rezervacija, krajnji dolazak, EU ruta, troškovi čekanja i odbijenice.",
    enDescription: "A guide to LOT delays via Warsaw: one booking, final arrival, EU route, waiting costs and rejection replies.",
    srExcerpt: "Kod LOT letova preko Varšave mala promena prvog segmenta može napraviti veliki kasni dolazak na krajnjoj destinaciji.",
    enExcerpt: "On LOT flights via Warsaw, a small delay on the first segment can create a large late arrival at the final destination.",
    airline: "LOT",
    srRouteNote: "Varšava je EU čvorište, pa su polazak iz EU, dolazak u EU i jedna rezervacija često ključni za procenu.",
    enRouteNote: "Warsaw is an EU hub, so EU departure, EU arrival and one booking are often central to the assessment.",
    srHubNote: "Kod Varšave je posebno važno dokazati da je nastavak puta bio u istoj rezervaciji, jer se tada gleda završetak celog putovanja.",
    enHubNote: "For Warsaw, it is especially important to prove that onward travel was in the same booking, because the whole journey is then assessed.",
    category: "Aviokompanije",
  },
  {
    id: "aegean-flight-delay-compensation",
    srSlug: "aegean-kasnjenje-leta-naknada",
    enSlug: "aegean-flight-delay-compensation",
    srTitle: "Aegean kašnjenje leta: Atina, EU pravila i dokazi",
    enTitle: "Aegean flight delay: Athens, EU rules and evidence",
    srDescription: "Kako proveriti Aegean kašnjenje preko Atine: evropski prevoznik, jedna rezervacija, dolazak, briga i refundacija troškova.",
    enDescription: "How to check an Aegean delay via Athens: European carrier, one booking, arrival, care and expense reimbursement.",
    srExcerpt: "Aegean letovi su često dobri kandidati za proveru jer uključuju evropskog prevoznika i rute preko Atine.",
    enExcerpt: "Aegean flights are often worth checking because they involve a European carrier and routes through Athens.",
    airline: "Aegean",
    srRouteNote: "Atina je čest nastavak ka ostrvima i drugim destinacijama, pa krajnji dolazak može biti važniji od dolaska u Atinu.",
    enRouteNote: "Athens is often a connection toward islands and other destinations, so final arrival may matter more than arrival in Athens.",
    srHubNote: "Ako je Atina samo presedanje, dokazujte poslednji aerodrom iz rezervacije, ne samo trenutak sletanja prvog leta.",
    enHubNote: "If Athens was only a connection, prove the last airport in the booking, not only the landing time of the first flight.",
    category: "Aviokompanije",
  },
  {
    id: "ita-airways-flight-delay-compensation",
    srSlug: "ita-airways-kasnjenje-leta-naknada",
    enSlug: "ita-airways-flight-delay-compensation",
    srTitle: "ITA Airways kašnjenje leta: Rim, EU rute i naknada",
    enTitle: "ITA Airways flight delay: Rome, EU routes and compensation",
    srDescription: "Praktičan vodič za ITA Airways kašnjenja: Rim kao čvorište, krajnji dolazak, operativni prevoznik i dokazi.",
    enDescription: "A practical guide to ITA Airways delays: Rome as a hub, final arrival, operating carrier and evidence.",
    srExcerpt: "Kod ITA Airways letova preko Rima treba proveriti da li je kašnjenje pogodilo samo prvi segment ili ceo plan puta.",
    enExcerpt: "For ITA Airways flights via Rome, check whether the delay affected only the first segment or the whole itinerary.",
    airline: "ITA Airways",
    srRouteNote: "Pošto je reč o evropskom prevozniku, rute ka EU i iz EU često zaslužuju pažljivu proveru.",
    enRouteNote: "Because this is a European carrier, routes into and out of the EU often deserve careful review.",
    srHubNote: "Rim može biti završna destinacija ili veza ka drugom gradu, pa je kompletan itinerer ključan dokaz.",
    enHubNote: "Rome can be the final destination or a link to another city, so the full itinerary is key evidence.",
    category: "Aviokompanije",
  },
  {
    id: "flydubai-flight-delay-compensation",
    srSlug: "flydubai-kasnjenje-leta-naknada",
    enSlug: "flydubai-flight-delay-compensation",
    srTitle: "flydubai kašnjenje leta: Dubai konekcije, troškovi i prava",
    enTitle: "flydubai flight delay: Dubai connections, costs and rights",
    srDescription: "Kako proveriti flydubai kašnjenje iz Srbije ili preko Dubaija: evropski okvir, krajnji dolazak, briga i dodatni troškovi.",
    enDescription: "How to check a flydubai delay from Serbia or via Dubai: European coverage, final arrival, care and extra costs.",
    srExcerpt: "flydubai kašnjenja često traže pažljivo razdvajanje evropskog okvira, konekcije u Dubaiju i troškova dugog čekanja.",
    enExcerpt: "flydubai delays often require separating European coverage, the Dubai connection and long-wait expenses.",
    airline: "flydubai",
    srRouteNote: "Kod neevropskog prevoznika posebno je važno odakle let polazi i da li evropska pravila uopšte pokrivaju taj segment.",
    enRouteNote: "With a non-European carrier, the departure point and whether European rules cover the segment are especially important.",
    srHubNote: "Dubai je često veza za daleki nastavak puta, pa treba sačuvati dokaz o krajnjem dolasku i svakoj zameni leta.",
    enHubNote: "Dubai is often a link to a long onward journey, so keep proof of final arrival and every replacement flight.",
    category: "Aviokompanije",
  },
  {
    id: "qatar-airways-flight-delay-compensation",
    srSlug: "qatar-airways-kasnjenje-leta-naknada",
    enSlug: "qatar-airways-flight-delay-compensation",
    srTitle: "Qatar Airways kašnjenje leta: Doha konekcije i naknada",
    enTitle: "Qatar Airways flight delay: Doha connections and compensation",
    srDescription: "Vodič za Qatar Airways kašnjenja iz Srbije i preko Dohe: ruta, jedna rezervacija, krajnji dolazak, hotel i dokazi.",
    enDescription: "A guide to Qatar Airways delays from Serbia and via Doha: route, one booking, final arrival, hotel and evidence.",
    srExcerpt: "Kod Qatar Airways putovanja presudno je da li je kašnjenje pokriveno evropskim pravilima i kada ste stigli na poslednju destinaciju.",
    enExcerpt: "For Qatar Airways travel, the key issues are whether European rules cover the delay and when you reached the final destination.",
    airline: "Qatar Airways",
    srRouteNote: "Kod rute preko Dohe ne treba pretpostaviti pravo na naknadu samo zato što je put počeo ili završio u Srbiji.",
    enRouteNote: "On a route via Doha, do not assume compensation only because the journey started or ended in Serbia.",
    srHubNote: "Doha često znači dugu konekciju i nastavak na drugi kontinent, pa je važan dokaz o jednoj rezervaciji i realnom završetku puta.",
    enHubNote: "Doha often means a long connection and onward travel to another continent, so one-booking proof and actual journey completion matter.",
    category: "Aviokompanije",
  },
];

export const articles = topics.map(airlineArticle) satisfies BlogArticle[];
