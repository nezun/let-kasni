import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "security-screening-flight-delay": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport departures board during a security-related flight delay",
    position: "center",
  },
  "baggage-offload-flight-delay": {
    src: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport baggage area before a delayed departure",
    position: "center",
  },
  "aircraft-fueling-flight-delay": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft being prepared at an airport stand",
    position: "center",
  },
  "ground-handling-flight-delay": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft on the apron during ground handling operations",
    position: "center",
  },
  "runway-congestion-flight-delay": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Passengers waiting near airport windows during runway congestion",
    position: "center",
  },
  "destination-weather-flight-delay": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Traveler checking flight status during destination weather disruption",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

type DelayReasonTopic = {
  id: string;
  srSlug: string;
  enSlug: string;
  srTitle: string;
  enTitle: string;
  srDescription: string;
  enDescription: string;
  srExcerpt: string;
  enExcerpt: string;
  categorySr: string;
  categoryEn: string;
  srReason: string;
  enReason: string;
  srAirlineQuestion: string;
  enAirlineQuestion: string;
  srEvidence: string;
  enEvidence: string;
  srCare: string;
  enCare: string;
};

const srBullets = [
  "Uporedite planirani i stvarni dolazak na krajnju destinaciju.",
  "Tražite pisani razlog kašnjenja, ne samo usmenu informaciju sa gejta.",
  "Sačuvajte boarding pass, poruke, screenshot aplikacije i račune.",
  "Odvojite fiksnu naknadu od obroka, hotela, transfera ili nove karte.",
];

const enBullets = [
  "Compare scheduled and actual arrival at the final destination.",
  "Ask for the delay reason in writing, not only a verbal gate update.",
  "Keep the boarding pass, messages, app screenshots and receipts.",
  "Separate fixed compensation from meals, hotel, transfer or a new ticket.",
];

function srSections(topic: DelayReasonTopic) {
  return [
    {
      heading: "Kada ovaj razlog kašnjenja treba ozbiljno proveriti",
      body: [
        `${topic.srReason} Za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta) zato nije dovoljno da u aplikaciji piše samo jedna kategorija. Prvo se proverava stvarni dolazak na krajnju destinaciju, zatim ruta, operativni prevoznik, jedna rezervacija i konkretan razlog koji je izazvao kašnjenje.`,
        "Ako je dolazak bio tri sata ili više kasnije, slučaj treba složiti kao mali dosije. Navedite broj leta, datum, rutu, planirani dolazak, stvarni dolazak, šta je objavljeno putnicima i šta je aviokompanija ponudila tokom čekanja. Takav redosled štedi vreme jer se zahtev kasnije dopunjuje jednim dokazom, umesto da se cela priča piše iz početka.",
      ],
      bullets: srBullets,
    },
    {
      heading: "Da li je razlog bio pod kontrolom aviokompanije",
      body: [
        topic.srAirlineQuestion,
        "U praksi se ne prihvata slepo ni putnikova pretpostavka ni kratka rečenica prevoznika. Potrebno je videti da li je problem pogodio samo jedan avion, ceo aerodrom, bezbednosni sistem, kontrolu letenja ili operativnu pripremu leta. Ta razlika odlučuje da li se fokus stavlja na fiksnu naknadu, na refundaciju troškova ili na zahtev za preciznije obrazloženje.",
      ],
    },
    {
      heading: "Dokazi koji menjaju procenu slučaja",
      body: [
        topic.srEvidence,
        "Najkorisniji dokaz nije duga poruka o frustraciji, već vremenska linija. Kada je kašnjenje objavljeno, kada je ukrcavanje stvarno počelo, da li su putnici već bili u avionu, kada su vrata otvorena na destinaciji i da li je aviokompanija menjala objašnjenje. Ako su postojale konekcije, dodajte dokaz propuštenog nastavka i novi itinerer.",
      ],
    },
    {
      heading: "Briga tokom čekanja i računi",
      body: [
        topic.srCare,
        "Pravo na brigu je odvojeno od fiksne naknade. Čak i kada se razlog kasnije pokaže kao vanredna okolnost, putnik može imati pravo na obrok, osveženje, komunikaciju, hotel ili transfer ako je čekanje dugo. Zato račune treba čuvati i navesti posebno, sa objašnjenjem zašto su bili neophodni.",
      ],
    },
    {
      heading: "Kako Let Kasni priprema dopunu posle odbijenice",
      body: [
        "Ako aviokompanija odbije zahtev opštom rečenicom, dopuna treba da traži dokaz konkretnog događaja, period trajanja i mere koje je prevoznik preduzeo da smanji posledice. To je jače od ponavljanja iste žalbe, jer pomera slučaj sa opšte kategorije na proverljive činjenice.",
        "Let Kasni ovakve slučajeve obrađuje kroz isti obrazac: dolazak, ruta, razlog, odgovornost, pomoć tokom čekanja, troškovi i status odgovora. Taj format je važan za automatizaciju obrade, jer svaki novi dokaz dobija mesto u dosijeu i ne gubi se u nizu emailova, screenshotova i računa.",
      ],
    },
  ];
}

function enSections(topic: DelayReasonTopic) {
  return [
    {
      heading: "When this delay reason needs a serious review",
      body: [
        `${topic.enReason} For [flight delay compensation](/en/flight-delay-compensation), one category in the airline app is not enough. First check actual arrival at the final destination, then route, operating carrier, one booking and the concrete reason that caused the delay.`,
        "If arrival was three hours or more late, turn the case into a small file. Record the flight number, date, route, scheduled arrival, actual arrival, what passengers were told and what the airline offered during the wait. This order saves time because a later follow-up adds one document instead of rewriting the whole story.",
      ],
      bullets: enBullets,
    },
    {
      heading: "Was the reason within the airline's control",
      body: [
        topic.enAirlineQuestion,
        "In practice, neither the passenger's assumption nor the carrier's short sentence should be accepted blindly. Check whether the problem affected one aircraft, the whole airport, security systems, air traffic control or the operational preparation of the flight. That distinction decides whether the focus is fixed compensation, reimbursement of costs or a request for a more precise explanation.",
      ],
    },
    {
      heading: "Evidence that changes the case assessment",
      body: [
        topic.enEvidence,
        "The most useful evidence is not a long message about frustration, but a timeline. Note when the delay was announced, when boarding actually started, whether passengers were already on board, when doors opened at destination and whether the airline changed its explanation. If connections were involved, add proof of the missed onward flight and the new itinerary.",
      ],
    },
    {
      heading: "Care during the wait and receipts",
      body: [
        topic.enCare,
        "Care rights are separate from fixed compensation. Even when the reason later proves to be an extraordinary circumstance, passengers may still have rights to meals, refreshments, communication, hotel or transfer during a long wait. Keep receipts and list them separately with an explanation of why they were necessary.",
      ],
    },
    {
      heading: "How Let Kasni prepares the follow-up after rejection",
      body: [
        "If the airline rejects the claim with broad wording, the follow-up should ask for proof of the concrete event, the time period and the measures the carrier took to reduce the impact. That is stronger than repeating the same complaint because it moves the case from a general category to checkable facts.",
        "Let Kasni handles these cases through the same structure: arrival, route, reason, responsibility, care during the wait, costs and response status. This format matters for automated handling because every new document has a place in the file and does not get lost across emails, screenshots and receipts.",
      ],
    },
  ];
}

function article(topic: DelayReasonTopic): BlogArticle {
  return {
    id: topic.id,
    publishedAt: "2026-05-25",
    updatedAt: "2026-05-25",
    sr: {
      slug: topic.srSlug,
      title: topic.srTitle,
      description: topic.srDescription,
      excerpt: topic.srExcerpt,
      category: topic.categorySr,
      readTime: "8 min čitanja",
      sections: srSections(topic),
    },
    en: {
      slug: topic.enSlug,
      title: topic.enTitle,
      description: topic.enDescription,
      excerpt: topic.enExcerpt,
      category: topic.categoryEn,
      readTime: "8 min read",
      sections: enSections(topic),
    },
  };
}

const topics: DelayReasonTopic[] = [
  {
    id: "security-screening-flight-delay",
    srSlug: "bezbednosna-provera-kasnjenje-leta-naknada",
    enSlug: "security-screening-flight-delay-compensation",
    srTitle: "Kašnjenje leta zbog bezbednosne provere: kada ima osnova za naknadu",
    enTitle: "Flight delay due to security screening: when compensation may apply",
    srDescription: "Kako proveriti kašnjenje zbog bezbednosne provere: odgovornost, dokaz razloga, krajnji dolazak, briga i računi.",
    enDescription: "How to check a security-screening delay: responsibility, proof of reason, final arrival, care and receipts.",
    srExcerpt: "Bezbednosna provera može biti vanredna okolnost, ali treba proveriti ko je izazvao čekanje i šta je prevoznik uradio.",
    enExcerpt: "Security screening may be extraordinary, but it still matters who caused the wait and what the carrier did.",
    categorySr: "Razlozi kašnjenja",
    categoryEn: "Delay reasons",
    srReason: "Bezbednosna provera može značiti dodatnu kontrolu putnika, prtljaga, aviona, aerodromskog prostora ili dokumentacije posade.",
    enReason: "Security screening can mean extra checks of passengers, baggage, aircraft, airport areas or crew documentation.",
    srAirlineQuestion: "Ako je bezbednosnu proveru naredio aerodrom, policija ili nadležni organ, aviokompanija može imati jači argument da događaj nije bio pod njenom kontrolom. Ako je problem nastao zbog zakašnjele pripreme dokumentacije, ukrcavanja, sortiranja prtljaga ili interne procedure prevoznika, slučaj treba pažljivije proveriti.",
    enAirlineQuestion: "If the security check was ordered by the airport, police or authority, the airline may have a stronger argument that the event was outside its control. If the problem came from late documentation, boarding, baggage sorting or the carrier's internal procedure, the case needs closer review.",
    srEvidence: "Sačuvajte poruke u kojima se pominje security, dodatna provera, pregled aviona, ponovno ukrcavanje ili skidanje prtljaga. Ako osoblje na gejtu navodi drugi razlog od aplikacije, zapišite obe verzije.",
    enEvidence: "Keep messages mentioning security, extra check, aircraft inspection, reboarding or baggage removal. If gate staff give a different reason from the app, write down both versions.",
    srCare: "Kod bezbednosnih razloga putnici često dugo čekaju bez jasne satnice, pa odmah tražite obrok, vodu i informaciju o novom polasku. Ako se čeka preko noći, hotel i transfer treba dokumentovati odvojeno od pitanja naknade.",
    enCare: "With security reasons, passengers often wait a long time without a clear timetable, so ask for meals, water and the new departure information immediately. If the wait moves overnight, hotel and transfer should be documented separately from compensation.",
  },
  {
    id: "baggage-offload-flight-delay",
    srSlug: "skidanje-prtljaga-kasnjenje-leta-naknada",
    enSlug: "baggage-offload-flight-delay-compensation",
    srTitle: "Kašnjenje zbog skidanja prtljaga: prava putnika i dokazi",
    enTitle: "Delay because baggage was offloaded: passenger rights and evidence",
    srDescription: "Šta uraditi kada let kasni zbog skidanja prtljaga: bezbednost, operativna greška, dolazak, računi i zahtev.",
    enDescription: "What to do when a flight is delayed by baggage offload: safety, operational error, arrival, receipts and claim.",
    srExcerpt: "Skidanje prtljaga može biti bezbednosni postupak ili operativni propust; za zahtev je bitan konkretan razlog.",
    enExcerpt: "Baggage offload can be a safety step or an operational failure; the concrete reason matters for a claim.",
    categorySr: "Dokazi",
    categoryEn: "Evidence",
    srReason: "Skidanje prtljaga najčešće se dešava kada putnik ne putuje, kada postoji bezbednosna provera ili kada se utovar mora ponovo uskladiti sa listom putnika.",
    enReason: "Baggage offload usually happens when a passenger does not travel, when a security check is needed or when loading must be reconciled with the passenger list.",
    srAirlineQuestion: "Ako je prtljag skinut zbog bezbednosnog naloga ili ponašanja trećeg lica, aviokompanija može tvrditi da nije odgovorna za fiksnu naknadu. Ako je čekanje nastalo zbog loše organizovanog ukrcavanja, zakašnjelog zatvaranja leta ili pogrešno vođene liste prtljaga, taj deo treba posebno dokazati.",
    enAirlineQuestion: "If baggage was offloaded because of a security order or third-party behaviour, the airline may argue it is not responsible for fixed compensation. If the wait came from poorly organized boarding, late flight closure or an incorrectly managed baggage list, that part should be proven separately.",
    srEvidence: "Fotografišite tablu polazaka, sačuvajte poruke o novom vremenu polaska i zapišite kada je posada prvi put objasnila skidanje prtljaga. Ako se avion vratio sa piste ili je ukrcavanje ponovljeno, to treba ući u vremensku liniju.",
    enEvidence: "Photograph the departures board, keep new-departure messages and note when the crew first explained the baggage offload. If the aircraft returned from taxi or boarding restarted, include that in the timeline.",
    srCare: "Ako skidanje prtljaga pomeri polazak za nekoliko sati, putnici ne treba da čekaju bez pomoći. Obroci i osveženje se traže po trajanju čekanja, a računi pomažu ako pomoć nije ponuđena.",
    enCare: "If baggage offload moves departure by several hours, passengers should not wait without assistance. Meals and refreshments depend on the length of the wait, and receipts help when assistance was not offered.",
  },
  {
    id: "aircraft-fueling-flight-delay",
    srSlug: "kasnjenje-leta-zbog-goriva-naknada",
    enSlug: "aircraft-fueling-flight-delay-compensation",
    srTitle: "Kašnjenje leta zbog goriva: kada je to odgovornost aviokompanije",
    enTitle: "Flight delay due to fueling: when the airline may be responsible",
    srDescription: "Vodič za kašnjenje zbog goriva: dopuna, promena rute, vremenski uslovi, operativna priprema, računi i dokazi.",
    enDescription: "A guide to fueling delays: refuel, route change, weather, operational preparation, receipts and evidence.",
    srExcerpt: "Kašnjenje zbog goriva ne znači automatski vanrednu okolnost; bitno je zašto je dopuna bila potrebna.",
    enExcerpt: "A fueling delay is not automatically extraordinary; the key question is why the refuel was needed.",
    categorySr: "Razlozi kašnjenja",
    categoryEn: "Delay reasons",
    srReason: "Kašnjenje zbog goriva može nastati zbog kasne cisterne, promene plana leta, čekanja na slot, vremenskog zaobilaženja ili odluke da se doda gorivo pre polaska.",
    enReason: "A fueling delay can come from a late fuel truck, changed flight plan, slot waiting, weather diversion planning or a decision to add fuel before departure.",
    srAirlineQuestion: "Ako je razlog kasna priprema leta, loša koordinacija zemaljske službe ili promena koju je prevoznik mogao ranije da planira, zahtev može biti jači. Ako je dopuna goriva posledica iznenadne zabrane rute, zatvaranja vazdušnog prostora ili ozbiljnog vremena, aviokompanija može imati bolji argument.",
    enAirlineQuestion: "If the reason was late flight preparation, poor ground coordination or a change the carrier could have planned earlier, the claim may be stronger. If extra fuel was needed because of a sudden route ban, airspace closure or serious weather, the airline may have a better defence.",
    srEvidence: "Tražite precizno objašnjenje: da li je problem bila cisterna, plan leta, slot, vremensko zaobilaženje ili promena posade. Sačuvajte poruke o pomerenom polasku i dokaz koliko je kašnjenje stvarno uticalo na krajnji dolazak.",
    enEvidence: "Ask for a precise explanation: fuel truck, flight plan, slot, weather routing or crew change. Keep changed-departure messages and proof of how much the delay affected final arrival.",
    srCare: "Dok se čeka dopuna goriva, naročito posle ukrcavanja, putnici treba da imaju jasnu informaciju o vodi, toaletu, mogućnosti izlaska iz aviona i novom vremenu polaska.",
    enCare: "While waiting for fueling, especially after boarding, passengers should have clear information about water, toilets, whether they may leave the aircraft and the new departure time.",
  },
  {
    id: "ground-handling-flight-delay",
    srSlug: "kasnjenje-leta-zbog-zemaljskog-opsluzivanja-naknada",
    enSlug: "ground-handling-flight-delay-compensation",
    srTitle: "Kašnjenje zbog zemaljskog opsluživanja: kada putnik može tražiti naknadu",
    enTitle: "Ground handling flight delay: when passengers can claim compensation",
    srDescription: "Kako proveriti kašnjenje zbog zemaljskog opsluživanja: gejt, stepenice, utovar, posada, odgovornost i dokazi.",
    enDescription: "How to check a ground handling delay: gate, stairs, loading, crew, responsibility and evidence.",
    srExcerpt: "Zemaljsko opsluživanje je često operativni razlog koji treba razdvojiti od aerodromskih ograničenja.",
    enExcerpt: "Ground handling is often an operational reason that should be separated from airport-wide restrictions.",
    categorySr: "Razlozi kašnjenja",
    categoryEn: "Delay reasons",
    srReason: "Zemaljsko opsluživanje pokriva stepenice, autobus do aviona, utovar prtljaga, čišćenje, catering, pushback, dokumentaciju i koordinaciju gejta.",
    enReason: "Ground handling covers stairs, bus transfer to aircraft, baggage loading, cleaning, catering, pushback, documentation and gate coordination.",
    srAirlineQuestion: "Ako je kašnjenje nastalo zbog internog izvođača ili organizacije koju prevoznik koristi za svoj let, putnik ne treba automatski da prihvati da je to van kontrole aviokompanije. Ako je ceo aerodrom bio zatvoren ili je kontrola letenja ograničila polaske, procena je drugačija.",
    enAirlineQuestion: "If the delay came from the carrier's own contractor or operational setup for the flight, passengers should not automatically accept that it was outside airline control. If the whole airport was closed or air traffic control restricted departures, the review is different.",
    srEvidence: "Zapišite da li je problem bio gejt, autobus, stepenice, prtljag, cleaning, catering ili pushback. Ti detalji zvuče sitno, ali mogu pokazati da li je razlog operativan ili spoljašnji.",
    enEvidence: "Note whether the issue was gate, bus, stairs, baggage, cleaning, catering or pushback. These details sound small, but they can show whether the reason was operational or external.",
    srCare: "Kod zemaljskog opsluživanja kašnjenje često raste u koracima od 30 do 60 minuta. Svaku promenu vremena sačuvajte, jer zbir pomeranja može objasniti zašto je krajnji dolazak prešao prag od tri sata.",
    enCare: "With ground handling, delays often grow in 30- to 60-minute steps. Keep every time change because the accumulated delay may explain why final arrival crossed the three-hour threshold.",
  },
  {
    id: "runway-congestion-flight-delay",
    srSlug: "kasnjenje-leta-zbog-guzve-na-pisti-naknada",
    enSlug: "runway-congestion-flight-delay-compensation",
    srTitle: "Kašnjenje zbog gužve na pisti: slot, red za poletanje i naknada",
    enTitle: "Runway congestion delay: slot, departure queue and compensation",
    srDescription: "Šta znači gužva na pisti za naknadu: slot, ATC, kasni pushback, krajnji dolazak, care prava i dokaz.",
    enDescription: "What runway congestion means for compensation: slot, ATC, late pushback, final arrival, care rights and proof.",
    srExcerpt: "Gužva na pisti može biti spoljašnje ograničenje ili posledica kasnog pripremanja leta; razlika je ključna.",
    enExcerpt: "Runway congestion can be an external restriction or the result of late flight preparation; the distinction is key.",
    categorySr: "Razlozi kašnjenja",
    categoryEn: "Delay reasons",
    srReason: "Gužva na pisti može značiti red za poletanje, izgubljen slot, ograničenje kontrole letenja, zatvoren pravac piste ili čekanje posle kasnog pushback-a.",
    enReason: "Runway congestion can mean a departure queue, missed slot, air traffic control restriction, closed runway direction or waiting after a late pushback.",
    srAirlineQuestion: "Ako je let bio spreman na vreme, ali kontrola letenja nije dozvolila polazak zbog opšteg zagušenja, aviokompanija ima jači argument. Ako je avion zakasnio na svoj slot zbog ukrcavanja, posade, dokumentacije ili zemaljske pripreme, treba proveriti da li je gužva samo posledica ranijeg propusta.",
    enAirlineQuestion: "If the flight was ready on time but air traffic control did not allow departure because of general congestion, the airline has a stronger argument. If the aircraft missed its slot because of boarding, crew, documentation or ground preparation, check whether congestion was only the consequence of an earlier failure.",
    srEvidence: "Sačuvajte vreme kada je ukrcavanje završeno, kada je avion napustio gejt, kada je poleteo i šta je posada rekla o slotu. Razlika između kasnog pushback-a i dugog čekanja u redu može promeniti procenu.",
    enEvidence: "Keep the time boarding ended, when the aircraft left the gate, when it took off and what the crew said about the slot. The difference between late pushback and a long runway queue can change the assessment.",
    srCare: "Ako putnici čekaju u avionu, posebno pratite dostupnost vode, toaleta, informacija i mogućnost izlaska ako se čekanje produži. Za kasniji zahtev važan je i trenutak otvaranja vrata na krajnjoj destinaciji.",
    enCare: "If passengers wait on board, track access to water, toilets, information and the possibility to leave if the wait becomes long. For the later claim, the door-opening time at final destination also matters.",
  },
  {
    id: "destination-weather-flight-delay",
    srSlug: "vreme-na-destinaciji-kasnjenje-leta-naknada",
    enSlug: "destination-weather-flight-delay-compensation",
    srTitle: "Kašnjenje zbog vremena na destinaciji: kada zahtev ipak vredi proveriti",
    enTitle: "Destination weather delay: when the claim is still worth checking",
    srDescription: "Vodič za kašnjenje zbog vremena na destinaciji: magla, vetar, zatvaranje aerodroma, rerouting, hotel i dokazi.",
    enDescription: "A guide to destination-weather delays: fog, wind, airport closure, rerouting, hotel and evidence.",
    srExcerpt: "Loše vreme na destinaciji često jeste jak argument, ali zahtev ne treba odbaciti bez provere vremenske linije.",
    enExcerpt: "Bad weather at destination is often a strong defence, but the claim should not be dismissed without timeline review.",
    categorySr: "Vanredne okolnosti",
    categoryEn: "Extraordinary circumstances",
    srReason: "Vreme na destinaciji može uključiti maglu, jak vetar, sneg, oluju, smanjenu vidljivost, zatvorenu pistu ili ograničenje prilaza aerodromu.",
    enReason: "Destination weather can include fog, strong wind, snow, storm, reduced visibility, runway closure or approach restrictions.",
    srAirlineQuestion: "Ako je aerodrom zaista bio ograničen u vreme kada je vaš let trebalo da sleti, aviokompanija može imati jak argument protiv fiksne naknade. Ipak, treba proveriti da li je kašnjenje nastalo isključivo zbog vremena ili se produžilo zbog kasne rotacije, posade, rerutiranja ili loše organizovane pomoći.",
    enAirlineQuestion: "If the airport was genuinely restricted when your flight was due to land, the airline may have a strong defence against fixed compensation. Still, check whether the delay was caused only by weather or extended by late rotation, crew, rerouting or poorly organized assistance.",
    srEvidence: "Sačuvajte poruke o vremenu, promeni aerodroma, preusmeravanju, novom polasku i stvarnom dolasku. Ako su drugi letovi sletali približno u isto vreme, to nije automatski dokaz, ali jeste signal da slučaj treba proveriti preciznije.",
    enEvidence: "Keep messages about weather, airport change, diversion, new departure and actual arrival. If other flights landed around the same time, that is not automatic proof, but it is a signal for a more precise review.",
    srCare: "Kod vremenskih poremećaja najčešće pitanje postaje briga: obrok, hotel, transfer i nova ruta. Ako aviokompanija ne organizuje pomoć, razumni računi i dokaz da ste tražili asistenciju postaju centralni deo dosijea.",
    enCare: "With weather disruption, the main issue often becomes care: meals, hotel, transfer and new route. If the airline does not organize assistance, reasonable receipts and proof that you asked for help become central to the file.",
  },
];

export const articles = topics.map(article) satisfies BlogArticle[];
