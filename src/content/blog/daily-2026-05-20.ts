import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "separate-tickets-after-delay": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Passengers checking a departure board before a connecting journey",
    position: "center",
  },
  "baggage-loading-flight-delay": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport ramp and aircraft during ground handling",
    position: "center",
  },
  "aircraft-cleaning-flight-delay": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft prepared at the gate before departure",
    position: "center",
  },
  "crew-duty-time-flight-delay": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport terminal during an operational flight delay",
    position: "center",
  },
  "no-meal-voucher-flight-delay-receipts": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger waiting in an airport terminal during a long delay",
    position: "center",
  },
  "family-with-children-flight-delay-care": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Travelers waiting near an airport gate before boarding",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

type DelayScenarioTopic = {
  id: string;
  srSlug: string;
  enSlug: string;
  srTitle: string;
  enTitle: string;
  srDescription: string;
  enDescription: string;
  srExcerpt: string;
  enExcerpt: string;
  srCategory: string;
  enCategory: string;
  srOpening: string;
  enOpening: string;
  srCoverage: string;
  enCoverage: string;
  srReason: string;
  enReason: string;
  srEvidence: string;
  enEvidence: string;
  srCare: string;
  enCare: string;
  srClaim: string;
  enClaim: string;
};

const sharedBullets = {
  sr: [
    "Zapišite planirani i stvarni dolazak na krajnju destinaciju.",
    "Odvojite dokaz razloga kašnjenja od računa za čekanje.",
    "Proverite da li je cela ruta bila u jednoj rezervaciji.",
    "Tražite pisano objašnjenje ako je odgovor aviokompanije generički.",
  ],
  en: [
    "Record scheduled and actual arrival at the final destination.",
    "Separate proof of the delay reason from waiting-cost receipts.",
    "Check whether the whole route was under one booking.",
    "Ask for a written explanation if the airline response is generic.",
  ],
};

function srSections(topic: DelayScenarioTopic) {
  return [
    {
      heading: "Kada ovaj scenario menja procenu kašnjenja",
      body: [
        `${topic.srOpening} Osnovno pravilo ostaje isto: prvo se proverava da li je krajnji dolazak kasnio tri sata ili više i da li ruta ulazi u [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Tek zatim se gleda zašto je baš ovaj scenario važan za dokazivanje odgovornosti, troškova i daljeg puta.`,
        `${topic.srCoverage} Zbog toga se slučaj ne sme svesti na jednu rečenicu o kašnjenju u polasku. Potrebno je razdvojiti rutu, operativnog prevoznika, jednu rezervaciju, vreme dolaska, razlog kašnjenja, ponuđenu pomoć i račune. Kada su te činjenice odvojene, lakše se vidi da li zahtev ide na 250, 400 ili 600 evra, na refundaciju troškova, ili na oba dela.`,
      ],
      bullets: sharedBullets.sr,
    },
    {
      heading: "Ruta, rezervacija i krajnji dolazak",
      body: [
        "Kod letova iz Srbije, ka EU, iz EU ili preko evropskog čvorišta, ruta često odlučuje da li se primenjuje evropski okvir. Državljanstvo putnika obično nije ključno. Ključni su aerodrom polaska, aerodrom dolaska, operativni prevoznik i činjenica da li je nastavak puta kupljen kao ista rezervacija.",
        "Ako postoji konekcija, procena ne staje uvek na prvom segmentu. Jedan sat kašnjenja u polasku može napraviti četiri sata zakašnjenja na kraju puta ako je propušten nastavak. Ako su karte odvojene, taj deo je slabiji, ali i dalje može postojati pitanje brige, troškova ili pogrešne informacije koju je dala aviokompanija.",
      ],
    },
    {
      heading: "Razlog koji aviokompanija navodi",
      body: [
        `${topic.srReason} Neki razlozi mogu biti vanredne okolnosti, ali operativna organizacija, posada, tehnička priprema, dokumentacija leta, ukrcavanje, čišćenje ili utovar često traže precizniju proveru. Generička rečenica ne pokazuje sama po sebi da je prevoznik uradio sve razumno da smanji kašnjenje.`,
        "Zato je korisno tražiti vezu između razloga i vašeg leta: kada je problem nastao, koliko je trajao, da li je pogodio samo vaš avion ili ceo aerodrom, da li je postojao rezervni avion, druga posada ili razumno preusmeravanje. Bez tih detalja odbijenica može biti nepotpuna.",
      ],
    },
    {
      heading: "Dokazi, računi i vremenska linija",
      body: [
        `${topic.srEvidence} Najbolji dosije ima isti redosled svaki put: booking potvrda, boarding pass, poruke aviokompanije, screenshot aplikacije, fotografija table polazaka, stvarno vreme dolaska, računi i odgovor prevoznika. Takav redosled smanjuje ručni rad i pomaže da se brzo vidi šta nedostaje.`,
        "Ako osoblje na gejtu usmeno objasni razlog, zapišite tačnu formulaciju i vreme. Ako se razlog menja, sačuvajte sve verzije. Promena objašnjenja nije automatski dokaz prava na naknadu, ali jeste signal da slučaj treba proveriti pažljivije i ne prihvatiti prvu kratku rečenicu bez pokrića.",
      ],
    },
    {
      heading: "Briga tokom čekanja i razuman trošak",
      body: [
        `${topic.srCare} Pravo na brigu je odvojeno od fiksne naknade. Putnik može imati slabiji slučaj za odštetu zbog vanrednih okolnosti, ali i dalje tražiti obrok, osveženje, hotel, transfer ili refundaciju razumnog troška ako pomoć nije obezbeđena.`,
        "Troškovi treba da budu proporcionalni situaciji. Obrok tokom višesatnog čekanja, osnovni transfer do hotela ili razumna hotelska noć mnogo se lakše objašnjavaju od luksuznih kupovina. U zahtevu ih treba navesti po stavkama, uz račun i kratak razlog zašto je trošak nastao.",
      ],
    },
    {
      heading: "Kako Let Kasni slaže zahtev",
      body: [
        `${topic.srClaim} Let Kasni ovakve slučajeve ne tretira kao jednu opštu žalbu, već kao dosije sa odvojenim delovima: pravni prag, ruta, razlog kašnjenja, troškovi i odgovor aviokompanije. To je naročito važno kada kompanija odgovori samo na naknadu, a prećuti račune ili brigu tokom čekanja.`,
        "Ako odgovor bude odbijen, sledeći korak nije pisanje iste poruke iznova. Bolje je poslati kratku dopunu koja traži konkretan dokaz razloga, vremenski period i mere koje je prevoznik preduzeo. Takav nastavak je brži, uredniji i lakši za proveru nego duga prepiska bez strukture.",
      ],
    },
  ];
}

function enSections(topic: DelayScenarioTopic) {
  return [
    {
      heading: "When this scenario changes a delay review",
      body: [
        `${topic.enOpening} The baseline rule stays the same: first check whether final arrival was three hours or more late and whether the route falls under [flight delay compensation](/en/flight-delay-compensation). Only then should this specific scenario be used to test responsibility, costs and onward travel.`,
        `${topic.enCoverage} That is why the case should not be reduced to one sentence about departure delay. Separate the route, operating carrier, one booking, arrival time, delay reason, assistance offered and receipts. Once those facts are separated, it is easier to see whether the claim is about 250, 400 or 600 euros, expense reimbursement, or both.`,
      ],
      bullets: sharedBullets.en,
    },
    {
      heading: "Route, booking and final arrival",
      body: [
        "For flights from Serbia, into the EU, from the EU or through a European hub, route coverage often decides whether the European framework applies. Passenger nationality is usually not the key fact. Departure airport, arrival airport, operating carrier and whether onward travel was bought as one booking matter more.",
        "If there is a connection, the assessment does not always stop at the first segment. One hour late at departure can become four hours late at the end of the journey if the onward flight is missed. If tickets were separate, that part is weaker, but care rights, costs or incorrect airline information may still matter.",
      ],
    },
    {
      heading: "The reason the airline gives",
      body: [
        `${topic.enReason} Some reasons may be extraordinary circumstances, but operational organization, crew, technical preparation, flight paperwork, boarding, cleaning or loading often need a more precise review. Generic wording does not by itself show that the carrier took all reasonable measures to reduce the delay.`,
        "Ask for the link between the reason and your flight: when the problem started, how long it lasted, whether it affected only your aircraft or the whole airport, and whether a reserve aircraft, other crew or reasonable rerouting was available. Without those details, a rejection may be incomplete.",
      ],
    },
    {
      heading: "Evidence, receipts and timeline",
      body: [
        `${topic.enEvidence} A strong file follows the same order each time: booking confirmation, boarding pass, airline messages, app screenshot, departures-board photo, actual arrival time, receipts and carrier response. This reduces manual work and makes missing evidence visible quickly.`,
        "If gate staff explain the reason verbally, write down the exact wording and time. If the reason changes, keep every version. A changed explanation does not automatically prove compensation, but it is a signal that the case should be checked carefully rather than accepted on the first short sentence.",
      ],
    },
    {
      heading: "Care during the wait and reasonable costs",
      body: [
        `${topic.enCare} Care rights are separate from fixed compensation. A passenger may have a weaker compensation case because of extraordinary circumstances but still request meals, refreshments, hotel, transfer or reimbursement of reasonable costs when assistance was not provided.`,
        "Costs should be proportionate to the situation. A meal during a long wait, basic transfer to a hotel or a reasonable hotel night is much easier to explain than luxury spending. List costs separately in the claim, with the receipt and a short reason why each cost was necessary.",
      ],
    },
    {
      heading: "How Let Kasni structures the claim",
      body: [
        `${topic.enClaim} Let Kasni treats these cases as a file with separate parts, not as one broad complaint: legal threshold, route, delay reason, costs and airline response. That matters when the airline answers only the compensation part but ignores receipts or care during the wait.`,
        "If the claim is rejected, the next step is not rewriting the same message. A stronger follow-up asks for concrete proof of the reason, the time period and the measures the carrier took. This is faster, cleaner and easier to review than a long exchange without structure.",
      ],
    },
  ];
}

function scenarioArticle(topic: DelayScenarioTopic): BlogArticle {
  return {
    id: topic.id,
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
    sr: {
      slug: topic.srSlug,
      title: topic.srTitle,
      description: topic.srDescription,
      excerpt: topic.srExcerpt,
      category: topic.srCategory,
      readTime: "8 min čitanja",
      sections: srSections(topic),
    },
    en: {
      slug: topic.enSlug,
      title: topic.enTitle,
      description: topic.enDescription,
      excerpt: topic.enExcerpt,
      category: topic.enCategory,
      readTime: "8 min read",
      sections: enSections(topic),
    },
  };
}

const topics: DelayScenarioTopic[] = [
  {
    id: "separate-tickets-after-delay",
    srSlug: "odvojene-karte-kasnjenje-leta-propustena-konekcija",
    enSlug: "separate-tickets-flight-delay-missed-connection",
    srTitle: "Odvojene karte posle kašnjenja leta: šta se može tražiti",
    enTitle: "Separate tickets after a flight delay: what can be claimed",
    srDescription: "Kako proveriti kašnjenje kada su nastavci puta kupljeni odvojeno: jedna rezervacija, troškovi, briga i dokaz odgovornosti.",
    enDescription: "How to check a delay when onward flights were bought separately: one booking, costs, care and responsibility evidence.",
    srExcerpt: "Odvojene karte obično slabe zahtev za propuštenu konekciju, ali ne gase uvek pravo na brigu, troškove ili proveru prvog leta.",
    enExcerpt: "Separate tickets usually weaken a missed-connection claim, but they do not always remove care rights, costs or review of the first flight.",
    srCategory: "Kašnjenje leta",
    enCategory: "Flight delay",
    srOpening: "Odvojene karte su jedan od najčešćih razloga za zabunu posle kašnjenja.",
    enOpening: "Separate tickets are one of the most common sources of confusion after a delay.",
    srCoverage: "Ako je prvi let kasnio, ali nastavak nije bio u istoj rezervaciji, aviokompanija često ne odgovara za ceo samostalno složen put.",
    enCoverage: "If the first flight was delayed but the onward leg was not in the same booking, the airline often is not responsible for the whole self-made journey.",
    srReason: "Kod odvojenih karata razlog kašnjenja prvog leta i dalje ostaje važan.",
    enReason: "With separate tickets, the reason for the first delay still matters.",
    srEvidence: "Najvažniji dokaz je razlika između jedne rezervacije i dve odvojene kupovine.",
    enEvidence: "The most important evidence is the difference between one booking and two separate purchases.",
    srCare: "Ako čekate dugo zbog prvog kašnjenja, dokumentujte svaku pomoć koju ste tražili i svaku stvarnu posledicu po nastavak puta.",
    enCare: "If you wait for a long time because of the first delay, document every request for assistance and every real consequence for onward travel.",
    srClaim: "Kod odvojenih karata zahtev mora biti realan: prvo se proverava prvi let, zatim troškovi i tek onda posledice po samostalni nastavak.",
    enClaim: "With separate tickets, the claim must be realistic: first review the first flight, then costs, then consequences for the self-booked onward trip.",
  },
  {
    id: "baggage-loading-flight-delay",
    srSlug: "kasnjenje-leta-zbog-utovara-prtljaga",
    enSlug: "baggage-loading-flight-delay-compensation",
    srTitle: "Kašnjenje leta zbog utovara prtljaga: naknada i dokazi",
    enTitle: "Flight delay due to baggage loading: compensation and evidence",
    srDescription: "Kada kašnjenje zbog utovara prtljaga može biti odgovornost aviokompanije, koje dokaze čuvati i kako odvojiti troškove čekanja.",
    enDescription: "When baggage-loading delay may be airline responsibility, which evidence to save and how to separate waiting costs.",
    srExcerpt: "Utovar prtljaga zvuči kao sitan operativni problem, ali može biti važan ako napravi kasni dolazak od tri sata ili više.",
    enExcerpt: "Baggage loading sounds like a small operational issue, but it can matter if it creates a final arrival delay of three hours or more.",
    srCategory: "Razlozi kašnjenja",
    enCategory: "Delay reasons",
    srOpening: "Kašnjenje zbog utovara prtljaga obično je operativni scenario, a ne automatski izgovor.",
    enOpening: "A delay caused by baggage loading is usually an operational scenario, not an automatic excuse.",
    srCoverage: "Ako je problem nastao u organizaciji zemaljskog opsluživanja ili koordinaciji prevoznika, treba proveriti koliko je zaista bio van kontrole aviokompanije.",
    enCoverage: "If the problem came from ground-handling organization or carrier coordination, check how far it was really outside the airline's control.",
    srReason: "Kod utovara prtljaga posebno tražite da li je razlog bio kasan dolazak aviona, manjak opreme, greška u sortiranju, bezbednosna provera ili odluka aerodroma.",
    enReason: "For baggage loading, ask whether the reason was late aircraft arrival, lack of equipment, sorting error, security screening or an airport decision.",
    srEvidence: "Korisni su screenshot aplikacije, obaveštenje sa gejta, fotografija table i svaka poruka koja izričito pominje prtljag ili zemaljsko opsluživanje.",
    enEvidence: "Useful proof includes app screenshots, gate notices, departures-board photos and any message that specifically mentions baggage or ground handling.",
    srCare: "Ako čekanje postane višesatno, obrok i osveženje ne treba čekati pasivno; tražite ih i sačuvajte trag ako nisu obezbeđeni.",
    enCare: "If the wait becomes long, do not wait passively for meals and refreshments; ask for them and keep a trail if they were not provided.",
    srClaim: "U zahtevu razdvojite operativni razlog od posledice: prtljag je razlog, ali kasni dolazak i računi su ono što se traži.",
    enClaim: "In the claim, separate the operational reason from the consequence: baggage is the reason, but late arrival and receipts are what you claim.",
  },
  {
    id: "aircraft-cleaning-flight-delay",
    srSlug: "kasnjenje-leta-zbog-ciscenja-aviona",
    enSlug: "aircraft-cleaning-flight-delay-compensation",
    srTitle: "Kašnjenje leta zbog čišćenja aviona: kada postoji naknada",
    enTitle: "Aircraft cleaning flight delay: when compensation may apply",
    srDescription: "Kako proveriti kašnjenje zbog čišćenja kabine ili pripreme aviona: odgovornost, krajnji dolazak, briga i računi.",
    enDescription: "How to check a cabin-cleaning or aircraft-preparation delay: responsibility, final arrival, care and receipts.",
    srExcerpt: "Čišćenje aviona je često deo redovne pripreme leta, pa generičko objašnjenje ne mora biti dovoljno za odbijanje zahteva.",
    enExcerpt: "Aircraft cleaning is often part of ordinary flight preparation, so generic wording may not be enough to reject a claim.",
    srCategory: "Razlozi kašnjenja",
    enCategory: "Delay reasons",
    srOpening: "Kašnjenje zbog čišćenja aviona treba gledati kroz pitanje organizacije leta.",
    enOpening: "A delay due to aircraft cleaning should be reviewed as a flight-organization issue.",
    srCoverage: "Ako čišćenje traje neuobičajeno dugo ili se čeka spremnost kabine, važno je proveriti da li je to posledica redovne rotacije, prethodnog kašnjenja ili posebnog bezbednosnog događaja.",
    enCoverage: "If cleaning takes unusually long or the cabin is not ready, check whether this came from ordinary rotation, a previous delay or a specific safety event.",
    srReason: "Razlika je velika između redovne pripreme kabine, posledica bolesti putnika, bezbednosnog incidenta ili kasnog dolaska prethodnog aviona.",
    enReason: "There is a major difference between ordinary cabin preparation, illness on board, a security incident or late arrival of the previous aircraft.",
    srEvidence: "Tražite poruke koje pominju čišćenje, promenu gejta, kasno iskrcavanje prethodnih putnika ili čekanje posade za ukrcavanje.",
    enEvidence: "Look for messages mentioning cleaning, gate change, late disembarkation of previous passengers or crew waiting to board.",
    srCare: "Ako zbog čišćenja čekate duže, pravo na brigu zavisi od trajanja i okolnosti čekanja, ne od toga što razlog zvuči administrativno.",
    enCare: "If cleaning creates a long wait, care rights depend on duration and circumstances, not on the reason sounding administrative.",
    srClaim: "Let Kasni ovde posebno proverava da li je čišćenje bilo zaista nepredvidivo ili deo normalne operacije koju prevoznik mora organizovati.",
    enClaim: "Let Kasni checks whether the cleaning was truly unexpected or part of normal operations the carrier has to organize.",
  },
  {
    id: "crew-duty-time-flight-delay",
    srSlug: "kasnjenje-leta-zbog-radnog-vremena-posade",
    enSlug: "crew-duty-time-flight-delay-compensation",
    srTitle: "Kašnjenje leta zbog radnog vremena posade: naknada i provera",
    enTitle: "Flight delay due to crew duty time: compensation and review",
    srDescription: "Kada ograničenje radnog vremena posade slabi ili jača zahtev za kašnjenje leta, šta dokazati i kako čuvati troškove.",
    enDescription: "When crew duty-time limits weaken or strengthen a flight-delay claim, what to prove and how to save costs.",
    srExcerpt: "Radno vreme posade može biti bezbednosno pravilo, ali pitanje je zašto je posada istekla i da li je prevoznik mogao razumno da reaguje.",
    enExcerpt: "Crew duty time can be a safety rule, but the question is why the crew timed out and whether the carrier could respond reasonably.",
    srCategory: "Razlozi kašnjenja",
    enCategory: "Delay reasons",
    srOpening: "Kada aviokompanija kaže da je posada istekla po radnom vremenu, slučaj nije završen.",
    enOpening: "When an airline says the crew timed out under duty-time rules, the case is not over.",
    srCoverage: "Bezbednosna pravila se poštuju, ali se zatim proverava šta je izazvalo istek posade i da li je prevoznik mogao obezbediti zamenu ili drugačije preusmeravanje.",
    enCoverage: "Safety rules must be respected, but the next question is what caused the crew timeout and whether the carrier could provide replacement crew or rerouting.",
    srReason: "Ako je posada istekla zbog ranijeg tehničkog problema, kasne rotacije ili lošeg planiranja, odgovornost se ne procenjuje isto kao kod zatvaranja aerodroma ili ozbiljnog vremenskog događaja.",
    enReason: "If crew timed out because of an earlier technical issue, late rotation or poor planning, responsibility is not assessed the same as with airport closure or severe weather.",
    srEvidence: "Važni su redosled obaveštenja, novo vreme polaska, da li je tražena zamenska posada i da li je ponuđen hotel kada je let pomeren za sutradan.",
    enEvidence: "The order of notices, new departure time, whether replacement crew was sought and whether a hotel was offered for next-day travel all matter.",
    srCare: "Kod posade koja ističe, čekanje često prelazi u noć, pa hotel, transfer, obroci i jasna informacija postaju centralni deo dosijea.",
    enCare: "Crew timeout often turns the wait into an overnight delay, so hotel, transfer, meals and clear information become central parts of the file.",
    srClaim: "Zahtev treba da pita za uzrok isteka posade, mere koje su preduzete i odvojenu refundaciju troškova čekanja.",
    enClaim: "The claim should ask what caused the crew timeout, which measures were taken and separately request reimbursement of waiting costs.",
  },
  {
    id: "no-meal-voucher-flight-delay-receipts",
    srSlug: "kasnjenje-leta-bez-vaucera-za-obrok-racuni",
    enSlug: "flight-delay-no-meal-voucher-receipts",
    srTitle: "Kašnjenje leta bez vaučera za obrok: računi i refundacija",
    enTitle: "Flight delay with no meal voucher: receipts and reimbursement",
    srDescription: "Šta uraditi kada tokom dužeg kašnjenja nema vaučera za obrok, kako čuvati račune i kako odvojiti troškove od naknade.",
    enDescription: "What to do when there is no meal voucher during a long delay, how to save receipts and separate costs from compensation.",
    srExcerpt: "Ako aviokompanija ne obezbedi obrok tokom dugog čekanja, računi mogu biti poseban zahtev, odvojen od fiksne naknade.",
    enExcerpt: "If the airline does not provide meals during a long wait, receipts can become a separate claim from fixed compensation.",
    srCategory: "Pravo na brigu",
    enCategory: "Care rights",
    srOpening: "Izostanak vaučera za obrok ne znači da putnik mora sam snositi svaki razuman trošak čekanja.",
    enOpening: "The absence of a meal voucher does not mean the passenger must absorb every reasonable waiting cost.",
    srCoverage: "Pravo na brigu zavisi od dužine čekanja, distance i okolnosti, dok fiksna naknada zavisi od dolaska i odgovornosti za kašnjenje.",
    enCoverage: "Care rights depend on waiting time, distance and circumstances, while fixed compensation depends on arrival delay and responsibility.",
    srReason: "Razlog kašnjenja je važan za odštetu, ali kod brige se posebno proverava da li je pomoć tokom čekanja morala biti ponuđena.",
    enReason: "The delay reason matters for compensation, but care rights separately test whether assistance during the wait should have been offered.",
    srEvidence: "Najvažniji dokazi su vreme čekanja, dokaz da ste tražili pomoć, račun, kartična potvrda i kratak opis zašto je kupovina bila nužna.",
    enEvidence: "The key proof is waiting time, evidence that you asked for help, receipt, card proof and a short note explaining why the purchase was necessary.",
    srCare: "Kupujte razumno: voda, osnovni obrok i potrebna komunikacija su mnogo lakši za refundaciju od skupih restorana ili nepovezanih kupovina.",
    enCare: "Spend reasonably: water, a basic meal and necessary communication are much easier to reimburse than expensive restaurants or unrelated purchases.",
    srClaim: "Let Kasni u ovakvom zahtevu pravi posebnu stavku za račune, da ih aviokompanija ne izgubi u raspravi o vanrednim okolnostima.",
    enClaim: "Let Kasni creates a separate receipt section so the airline does not bury care costs inside an extraordinary-circumstances dispute.",
  },
  {
    id: "family-with-children-flight-delay-care",
    srSlug: "kasnjenje-leta-sa-decom-pravo-na-brigu",
    enSlug: "flight-delay-with-children-family-care",
    srTitle: "Kašnjenje leta sa decom: briga, hotel i dokazi",
    enTitle: "Flight delay with children: care, hotel and evidence",
    srDescription: "Kako porodice sa decom da dokumentuju dugo kašnjenje leta, obroke, hotel, transfer, troškove i zahtev za naknadu.",
    enDescription: "How families with children should document a long flight delay, meals, hotel, transfer, costs and compensation claim.",
    srExcerpt: "Porodice tokom kašnjenja često imaju dodatne realne troškove, ali ih treba razumno dokumentovati i odvojiti od fiksne naknade.",
    enExcerpt: "Families often have extra real costs during a delay, but they should be documented reasonably and separated from fixed compensation.",
    srCategory: "Pravo na brigu",
    enCategory: "Care rights",
    srOpening: "Kašnjenje sa decom nije posebno pravilo za automatsku veću odštetu, ali jeste scenario u kome briga i dokazi postaju važniji.",
    enOpening: "A delay with children does not create an automatic higher compensation amount, but care and evidence become more important.",
    srCoverage: "Fiksna naknada se i dalje računa po putniku koji ispunjava uslove, ruti i dolasku, dok se porodični troškovi proveravaju kao odvojene stavke.",
    enCoverage: "Fixed compensation is still assessed per eligible passenger, route and arrival delay, while family costs are reviewed as separate items.",
    srReason: "Razlog kašnjenja se proverava isto kao kod drugih putnika, ali duže čekanje sa decom često pojačava potrebu za jasnom informacijom, obrokom i smeštajem.",
    enReason: "The delay reason is checked like in any other case, but a long wait with children often makes clear information, meals and accommodation more important.",
    srEvidence: "Sačuvajte boarding pass za svako dete koje ima kartu, porodičnu rezervaciju, račune za obroke, pelene, osnovne potrepštine, hotel i transfer.",
    enEvidence: "Keep the boarding pass for every ticketed child, family booking, receipts for meals, diapers, basic necessities, hotel and transfer.",
    srCare: "Kod noćnog čekanja tražite hotel i transfer odmah, a ako pomoć izostane, birajte razuman smeštaj i dokumentujte zašto porodica nije mogla ostati na aerodromu.",
    enCare: "During an overnight wait, ask for hotel and transfer immediately. If help is missing, choose reasonable accommodation and document why the family could not stay at the airport.",
    srClaim: "Let Kasni razdvaja putnike, karte i troškove, jer porodica može imati više pojedinačnih prava i jedan zajednički set računa.",
    enClaim: "Let Kasni separates passengers, tickets and costs because a family can have several individual rights and one shared set of receipts.",
  },
];

export const articles: BlogArticle[] = topics.map(scenarioArticle);
