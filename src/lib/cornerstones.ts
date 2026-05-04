import { blogArticles, type BlogArticle, type BlogLocale } from "@/lib/blog";

export type CornerstoneId =
  | "air-passenger-rights"
  | "flight-delay-compensation"
  | "flight-cancellation-compensation"
  | "missed-connection-compensation"
  | "overbooking-compensation"
  | "denied-boarding-compensation"
  | "delayed-baggage-compensation"
  | "airline-strike-compensation";

type CornerstoneSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

type CornerstoneFaq = {
  question: string;
  answer: string;
};

type LocalizedCornerstone = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  excerpt: string;
  ctaLabel: string;
  languageLabel: string;
  sections: CornerstoneSection[];
  faqs: CornerstoneFaq[];
};

export type CornerstonePage = {
  id: CornerstoneId;
  updatedAt: string;
  image: {
    src: string;
    alt: string;
    position?: string;
  };
  childArticleIds: string[];
  supportArticleIds?: string[];
  sr: LocalizedCornerstone;
  en: LocalizedCornerstone;
};

const updatedAt = "2026-05-03";

export const cornerstonePages: CornerstonePage[] = [
  {
    id: "air-passenger-rights",
    updatedAt,
    image: {
      src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1800&q=84",
      alt: "Aircraft at an airport gate during boarding",
      position: "center",
    },
    childArticleIds: [
      "eu261-ecaa-serbia",
      "documents-for-claim",
      "refund-vs-compensation",
      "claim-deadlines",
      "airport-action-plan",
      "children-infant-flight-compensation",
      "downgraded-seat-compensation",
    ],
    sr: {
      slug: "prava-putnika-u-aviosaobracaju",
      title: "Prava putnika u avio-saobraćaju",
      description:
        "Glavni vodič kroz prava putnika kod kašnjenja, otkazivanja, propuštene konekcije, uskraćenog ukrcavanja, prtljaga i štrajka.",
      eyebrow: "Glavni vodič",
      excerpt:
        "Ovo je početna stranica za razumevanje prava putnika iz Srbije. Pokriva kada se traži novčana naknada, kada samo refundacija ili briga, koje rute ulaze u evropsku zaštitu i koje dokaze treba sačuvati pre slanja zahteva.",
      ctaLabel: "Proveri let",
      languageLabel: "English version",
      sections: [
        {
          heading: "Šta ova prava stvarno pokrivaju",
          body: [
            "Prava putnika nisu samo jedno pravilo i nisu samo fiksna odšteta od 250, 400 ili 600 evra. U praksi se uvek razdvajaju tri pitanja: da li imate pravo na novčanu naknadu, da li imate pravo na refundaciju ili preusmeravanje, i da li vam aviokompanija duguje brigu tokom čekanja.",
            "Kod kašnjenja je najvažniji dolazak na krajnju destinaciju. Kod otkazivanja je važan rok obaveštenja i ponuđena zamena. Kod propuštene konekcije presudno je da li su letovi bili u jednoj rezervaciji. Kod prtljaga se ne koristi ista logika kao kod EC261 naknade, već se gledaju prijava, rokovi i stvarni troškovi.",
            "Zato je ova strana zamišljena kao mapa. Ako znate šta vam se dogodilo, odmah idite na odgovarajući glavni vodič. Ako još niste sigurni da li je problem kašnjenje, otkazivanje, konekcija ili prtljag, krenite od ovog pregleda."
          ],
          bullets: [
            "Kašnjenje leta: najčešće se proverava dolazak tri sata ili više kasnije.",
            "Otkazan let: proverava se rok obaveštenja, alternativa i stvarni dolazak.",
            "Propuštena konekcija: najjači slučajevi su pod jednom rezervacijom.",
            "Uskraćeno ukrcavanje i overbooking: posebno se gleda da li ste dobrovoljno pristali na vaučer.",
            "Prtljag: traže se PIR prijava, računi i poštovanje kratkih rokova."
          ],
        },
        {
          heading: "Rute iz Srbije i evropska zaštita",
          body: [
            "Putnici iz Srbije često pogrešno misle da državljanstvo odlučuje o pravu na naknadu. U većini slučajeva važniji su aerodrom polaska, aerodrom dolaska, operativni prevoznik i da li je putovanje kupljeno kao jedna rezervacija.",
            "Let koji polazi iz EU uglavnom ulazi u evropsku zaštitu bez obzira na aviokompaniju. Let iz Srbije ka EU može biti jači kada ga obavlja evropski prevoznik. Let ka Srbiji iz EU takođe često ima dobar osnov. Kod ruta preko evropskih čvorišta, jedna rezervacija može biti presudna jer se gleda dolazak na krajnju destinaciju.",
            "Ako niste sigurni, nemojte odmah odustati. Sačuvajte itinerer, booking reference, boarding pass i poruke aviokompanije. Dobra procena počinje od rute i rezervacije, ne od opšteg utiska da je kompanija kriva ili nije kriva."
          ],
        },
        {
          heading: "Novčana naknada, refundacija i briga nisu isto",
          body: [
            "Novčana naknada je fiksni iznos koji može pripadati putniku kada su ispunjeni uslovi i kada aviokompanija nema uspešan argument vanrednih okolnosti. Refundacija je povrat cene karte kada putovanje nije izvršeno kako treba ili kada birate odustanak u dozvoljenoj situaciji. Briga su obroci, osveženje, komunikacija, hotel i transfer tokom čekanja.",
            "Ova razlika je važna jer možete izgubiti fiksnu naknadu zbog magle ili kontrole letenja, ali i dalje imati pravo na obrok, hotel ili preusmeravanje. Isto tako, možete dobiti povrat karte, ali to ne znači automatski da je pitanje naknade zatvoreno.",
            "U svakom zahtevu pišite odvojeno šta tražite: proveru fiksne naknade, refundaciju karte, refundaciju troškova brige ili kombinaciju. Takav zahtev je jasniji i teže ga je odbiti jednom generičkom rečenicom."
          ],
        },
        {
          heading: "Dokazi koje treba sačuvati odmah",
          body: [
            "Najbolji dokaz je onaj koji sačuvate dok ste još na aerodromu. Boarding pass, potvrda rezervacije, SMS ili email aviokompanije, screenshot aplikacije, fotografija table polazaka, računi za obrok ili hotel i ime aerodroma na kome je problem nastao često vrede više od dugog objašnjenja posle nekoliko nedelja.",
            "Ako osoblje na gejtu kaže razlog, zapišite tačnu formulaciju i vreme. Ako kompanija menja razlog, na primer prvo navodi tehnički kvar, zatim slot, zatim posadu, sačuvajte sve verzije. Promena razloga ne znači automatski da imate pravo na naknadu, ali je dobar signal da slučaj treba pažljivo proveriti."
          ],
        },
        {
          heading: "Kako koristiti ovu strukturu",
          body: [
            "Glavni vodiči na ovoj stranici pokrivaju temu do srednje dubine: dovoljno da shvatite da li slučaj ima smisla i šta je sledeći korak. Detaljni blogovi ispod njih idu dublje u podteme kao što su loše vreme, tehnički kvar, rokovi, dokumenta, vaučer, odbijen zahtev ili posebne rute preko Srbije.",
            "To znači da je najbolji put jednostavan: prvo pročitajte glavni vodič za svoj problem, zatim otvorite povezani detaljni vodič ako imate konkretan izgovor aviokompanije ili posebnu situaciju. Tako ne lutate kroz arhivu bloga, već idete od glavnog pravila ka specifičnom dokazu."
          ],
        },
      ],
      faqs: [
        {
          question: "Da li putnik iz Srbije može tražiti evropsku naknadu?",
          answer:
            "Može u mnogim situacijama, posebno kada ruta polazi iz EU, kada u EU leti evropski prevoznik, ili kada je konekcija deo jedne rezervacije. Svaki slučaj se proverava po ruti i operativnom prevozniku.",
        },
        {
          question: "Da li refundacija karte znači da nema odštete?",
          answer:
            "Ne nužno. Refundacija, preusmeravanje, briga i fiksna naknada su različita prava. Jedno pravo ne zatvara automatski drugo.",
        },
      ],
    },
    en: {
      slug: "air-passenger-rights",
      title: "Air passenger rights",
      description:
        "The main guide to passenger rights for delays, cancellations, missed connections, denied boarding, baggage disruption and airline strikes.",
      eyebrow: "Main guide",
      excerpt:
        "This is the starting page for Serbia-based travelers. It explains when fixed compensation may apply, when refund or care is the real issue, which routes fall under European protection and which evidence should be saved before filing a claim.",
      ctaLabel: "Check flight",
      languageLabel: "Srpska verzija",
      sections: [
        {
          heading: "What these rights actually cover",
          body: [
            "Passenger rights are not one single rule and they are not only fixed compensation of 250, 400 or 600 euros. In practice, every case separates three questions: whether fixed compensation is available, whether refund or rerouting is required, and whether the airline owed care during the wait.",
            "For delays, arrival at the final destination matters most. For cancellations, the timing of notice and the replacement flight matter. For missed connections, one booking is often decisive. For baggage, the same EC261 logic does not apply; reports, deadlines and actual costs become central.",
            "This page is a map. If you know what happened, go straight to the relevant main guide. If you are not yet sure whether the problem is a delay, cancellation, connection or baggage issue, start with this overview."
          ],
          bullets: [
            "Flight delay: the common threshold is arrival three hours or more late.",
            "Cancelled flight: notice timing, alternative transport and actual arrival matter.",
            "Missed connection: the strongest cases are usually under one booking.",
            "Denied boarding and overbooking: voluntary acceptance of a voucher changes the case.",
            "Baggage: PIR report, receipts and short deadlines are critical."
          ],
        },
        {
          heading: "Routes from Serbia and European protection",
          body: [
            "Travelers from Serbia often think nationality decides whether compensation is possible. In most cases, the more important facts are departure airport, arrival airport, operating carrier and whether the journey was bought as one booking.",
            "A flight departing from the EU is usually covered more broadly regardless of airline. A flight from Serbia to the EU can be stronger when operated by a European carrier. Flights from the EU to Serbia often have a good basis too. For journeys through European hubs, one booking can be decisive because arrival at the final destination is assessed.",
            "If you are unsure, do not give up immediately. Keep the itinerary, booking reference, boarding pass and airline messages. A good assessment starts with the route and booking, not with a general feeling that the airline is or is not responsible."
          ],
        },
        {
          heading: "Fixed compensation, refund and care are different",
          body: [
            "Fixed compensation is a set amount that may be owed when conditions are met and the airline does not have a successful extraordinary-circumstances defence. Refund is repayment of the ticket price when travel was not performed properly or when you choose to cancel in an allowed situation. Care means meals, refreshments, communication, hotel and transfer during the wait.",
            "This distinction matters because you can lose fixed compensation because of fog or air traffic control, but still have a right to meals, hotel or rerouting. You can also receive a ticket refund without automatically closing the compensation question.",
            "In every claim, separate what you are asking for: fixed compensation review, ticket refund, reimbursement of care costs or a combination. A structured request is clearer and harder to reject with one generic sentence."
          ],
        },
        {
          heading: "Evidence to save immediately",
          body: [
            "The best evidence is the evidence saved while you are still at the airport. Boarding pass, booking confirmation, airline SMS or email, app screenshot, departures-board photo, receipts for meals or hotel and the airport where the issue happened often matter more than a long explanation weeks later.",
            "If gate staff state the reason, write down the exact wording and time. If the airline changes the reason, for example first technical fault, then slot, then crew, save every version. A changed reason does not automatically prove compensation, but it is a strong signal that the case should be checked carefully."
          ],
        },
        {
          heading: "How to use this structure",
          body: [
            "The main guides on this page cover each topic to medium depth: enough to understand whether the case makes sense and what the next step is. The detailed blog articles below them go deeper into subtopics such as bad weather, technical fault, deadlines, documents, vouchers, rejected claims or Serbia-specific routes.",
            "The best path is simple: read the main guide for your disruption first, then open the linked detailed guide if you have a specific airline excuse or special situation. That avoids wandering through the blog archive and moves you from the main rule to the specific proof."
          ],
        },
      ],
      faqs: [
        {
          question: "Can a traveler from Serbia claim European compensation?",
          answer:
            "Yes, in many situations, especially when the route departs from the EU, when a European carrier flies into the EU, or when a connection is part of one booking. Each case is checked by route and operating carrier.",
        },
        {
          question: "Does a ticket refund mean there is no compensation?",
          answer:
            "Not necessarily. Refund, rerouting, care and fixed compensation are separate rights. One does not automatically close the other.",
        },
      ],
    },
  },
  {
    id: "flight-delay-compensation",
    updatedAt,
    image: {
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=84",
      alt: "Passenger waiting in an airport terminal during a delayed flight",
      position: "center",
    },
    childArticleIds: [
      "flight-delay-compensation",
      "bad-weather-flight-delay",
      "technical-fault-flight-compensation",
      "previous-flight-rotation-delay",
      "overnight-delay-hotel-rights",
      "self-rerouting-new-ticket",
      "air-traffic-control-slot-delay",
      "bird-strike-flight-delay",
      "lightning-strike-aircraft-delay",
      "medical-emergency-flight-delay",
      "crew-shortage-flight-delay",
      "night-flight-ban-curfew",
      "flight-diverted-rights",
    ],
    supportArticleIds: [
      "eu261-ecaa-serbia",
      "documents-for-claim",
      "claim-deadlines",
      "airport-action-plan",
      "how-to-file-airline-claim",
      "airline-rejected-claim",
      "airline-response-no-answer",
    ],
    sr: {
      slug: "naknada-za-kasnjenje-leta",
      title: "Naknada za kašnjenje leta",
      description:
        "Glavni vodič za naknadu zbog kašnjenja leta: uslovi, iznosi, rute iz Srbije, vanredne okolnosti, dokazi i postupak.",
      eyebrow: "Glavni vodič",
      excerpt:
        "Ako ste na krajnju destinaciju stigli tri sata ili više kasnije, možda imate pravo na fiksnu naknadu. Ovaj vodič objašnjava kada kašnjenje vredi proveriti, koliki iznos može pripadati putniku i kako odvojiti pravi zahtev od situacija koje aviokompanija može opravdati.",
      ctaLabel: "Proveri kašnjenje",
      languageLabel: "English version",
      sections: [
        {
          heading: "Kada kašnjenje leta daje pravo na naknadu",
          body: [
            "Osnovno pravilo je jednostavno: ne gleda se samo koliko je let kasnio pri poletanju, već koliko ste kasno stigli na krajnju destinaciju. Ako je dolazak tri sata ili više kasnije od plana, slučaj vredi proveriti. Ako je polazak kasnio tri sata, ali je avion nadoknadio vreme i stigao ranije, zahtev može biti slabiji.",
            "Drugi uslov je ruta. Letovi iz EU, letovi ka EU evropskim prevoznikom i [putovanja pod jednom rezervacijom preko evropskih čvorišta](/naknada-za-propustenu-konekciju/let-iz-srbije-preko-eu-prava-putnika) često su najvažniji za putnike iz Srbije. Državljanstvo putnika obično nije presudno.",
            "Treći uslov je razlog kašnjenja. [Tehnički kvar](/naknada-za-kasnjenje-leta/tehnicki-kvar-aviona-odsteta), kasna rotacija aviona, operativni problemi ili nedostatak posade često mogu biti u sferi aviokompanije. [Loše vreme](/naknada-za-kasnjenje-leta/kasnjenje-leta-zbog-loseg-vremena), zatvaranje aerodroma, kontrola letenja ili bezbednosni događaji mogu biti jači argument protiv fiksne naknade, ali i tada treba proveriti šta je kompanija uradila da smanji posledice."
          ],
          bullets: [
            "Prag za proveru je dolazak tri sata ili više kasnije.",
            "Gleda se krajnja destinacija, posebno kod jedne rezervacije.",
            "Iznos zavisi od dužine rute, ne od cene karte.",
            "Vanredne okolnosti moraju biti konkretno objašnjene, ne samo pomenute."
          ],
        },
        {
          heading: "Koliko može iznositi naknada",
          body: [
            "Evropski model koristi fiksne iznose koji se uobičajeno vezuju za dužinu rute: 250 evra za kraće letove, 400 evra za srednje rute i 600 evra za duge rute. Cena karte nije presudna. Putnik koji je platio jeftinu kartu može imati isto pravo kao putnik koji je platio mnogo više.",
            "Kod veoma dugih ruta i kašnjenja između tri i četiri sata iznos može biti smanjen u nekim situacijama. Kod presedanja je važno posmatrati celu rezervaciju, jer udaljenost i dolazak na krajnju destinaciju mogu promeniti okvir procene.",
            "Za letove iz Beograda, Niša ili Kraljeva prema evropskim čvorištima najčešće su relevantni iznosi 250 ili 400 evra, dok su duge interkontinentalne rute preko EU čvorišta posebna kategorija. Najsigurniji pristup je da se prvo utvrdi ruta, zatim vreme dolaska, zatim razlog kašnjenja."
          ],
        },
        {
          heading: "Vanredne okolnosti i najčešći izgovori",
          body: [
            "Aviokompanije često navode loše vreme, air traffic control, slot, prethodni let, tehnički razlog, operativne razloge ili bezbednost. Neki od tih razloga zaista mogu oboriti zahtev. Problem je što generička formulacija nije dovoljna za dobru procenu.",
            "Ako je razlog loše vreme, pitajte gde je vreme bilo problem i da li je direktno pogodilo vaš let. Ako je razlog slot, pitajte kada je ograničenje trajalo i zašto je kašnjenje na kraju bilo toliko dugo. Ako je razlog tehnički kvar, pitajte da li je reč o redovnom operativnom riziku ili zaista neuobičajenom događaju.",
            "Dobar zahtev ne ignoriše mogućnost vanrednih okolnosti. On traži konkretne činjenice. To je mnogo jače od poruke u kojoj samo piše da ste kasnili i da tražite novac."
          ],
        },
        {
          heading: "Šta putnik treba da uradi na aerodromu",
          body: [
            "Sačuvajte boarding pass, potvrdu rezervacije, poruke aviokompanije, screenshot statusa leta i račune za troškove čekanja. Ako dobijete vaučer za hranu, sačuvajte ga. Ako ne dobijete pomoć, kupujte razumno i sačuvajte račune.",
            "Ako čekanje ulazi u noć, pitajte za hotel i transfer. Pravo na brigu postoji odvojeno od fiksne naknade. Čak i ako se kasnije ispostavi da nema osnova za 250, 400 ili 600 evra, troškovi hrane, smeštaja ili transfera mogu biti posebno pitanje.",
            "Kod konekcija odmah tražite novo rešenje do krajnje destinacije. Ako sami kupujete novu kartu jer kompanija ne pomaže, sačuvajte dokaz da ste tražili pomoć i da je trošak bio razuman."
          ],
        },
        {
          heading: "Kako poslati zahtev",
          body: [
            "Zahtev treba da bude kratak, ali precizan: broj leta, datum, ruta, planirano i stvarno vreme dolaska, booking reference, objašnjenje koje ste dobili i šta tražite. Ako imate troškove, odvojite ih od fiksne naknade.",
            "Napišite da tražite obradu zahteva za naknadu zbog kašnjenja i, ako aviokompanija smatra da postoje vanredne okolnosti, da tražite konkretno objašnjenje događaja, perioda i uticaja na vaš let. To tera odgovor iz generičke zone u proverljive činjenice.",
            "Ako kompanija ne odgovori ili odbije zahtev opštom rečenicom, sledeći korak je dopuna sa dokazima i jasnim pitanjima. Detaljni vodiči ispod ove stranice pokrivaju upravo te scenarije: tehnički kvar, loše vreme, slot, prethodni let, hotel i rokove."
          ],
        },
      ],
      faqs: [
        {
          question: "Da li se računa kašnjenje pri poletanju ili dolasku?",
          answer:
            "Za fiksnu naknadu najvažnije je kašnjenje pri dolasku na krajnju destinaciju. Polazak je koristan dokaz, ali nije glavni prag.",
        },
        {
          question: "Da li loše vreme automatski znači da nema naknade?",
          answer:
            "Ne automatski. Može biti vanredna okolnost, ali treba proveriti gde je nastalo, koliko je trajalo i da li je direktno uticalo baš na vaš let.",
        },
      ],
    },
    en: {
      slug: "flight-delay-compensation",
      title: "Flight delay compensation",
      description:
        "The main guide to flight delay compensation: eligibility, amounts, Serbia routes, extraordinary circumstances, evidence and claim procedure.",
      eyebrow: "Main guide",
      excerpt:
        "If you reached your final destination three hours or more late, you may be entitled to fixed compensation. This guide explains when a delay is worth checking, what amount may apply and how to separate a strong claim from situations the airline can justify.",
      ctaLabel: "Check delay",
      languageLabel: "Srpska verzija",
      sections: [
        {
          heading: "When a flight delay gives a right to compensation",
          body: [
            "The basic rule is simple: do not look only at how late the flight departed, but at how late you arrived at the final destination. If arrival was three hours or more late, the case is worth checking. If departure was three hours late but the aircraft recovered time and arrived earlier, the claim may be weaker.",
            "The second condition is the route. Flights from the EU, flights to the EU on a European carrier and [journeys under one booking through European hubs](/en/missed-connection-compensation/flight-from-serbia-via-eu-passenger-rights) are often the most important for travelers from Serbia. Passenger nationality is usually not decisive.",
            "The third condition is the reason for delay. A [technical fault](/en/flight-delay-compensation/technical-fault-flight-compensation), late aircraft rotation, operational problems or crew shortage may often sit within the airline's responsibility. [Bad weather](/en/flight-delay-compensation/flight-delay-bad-weather-compensation), airport closure, air traffic control or safety events may be stronger arguments against fixed compensation, but even then you should check what the airline did to reduce the consequences."
          ],
          bullets: [
            "The check threshold is arrival three hours or more late.",
            "Final destination matters, especially under one booking.",
            "The amount depends on route distance, not ticket price.",
            "Extraordinary circumstances must be explained specifically, not merely mentioned."
          ],
        },
        {
          heading: "How much compensation can be owed",
          body: [
            "The European model uses fixed amounts usually linked to route distance: 250 euros for shorter flights, 400 euros for medium routes and 600 euros for long routes. Ticket price is not decisive. A passenger who paid a cheap fare may have the same right as a passenger who paid much more.",
            "On very long routes and delays between three and four hours, the amount can be reduced in some situations. For connections, the whole booking matters because distance and arrival at the final destination can change the assessment.",
            "For flights from Belgrade, Nis or Kraljevo to European hubs, 250 or 400 euros are often relevant, while long intercontinental routes through EU hubs are a separate category. The safest approach is to establish the route first, then actual arrival time, then the cause of delay."
          ],
        },
        {
          heading: "Extraordinary circumstances and common excuses",
          body: [
            "Airlines often cite bad weather, air traffic control, slot, previous flight, technical reason, operational reasons or safety. Some of these reasons can genuinely defeat a claim. The problem is that generic wording is not enough for a good assessment.",
            "If the reason is weather, ask where the weather issue occurred and whether it directly affected your flight. If the reason is a slot, ask when the restriction lasted and why the final delay was so long. If the reason is a technical fault, ask whether this was ordinary operational risk or a genuinely unusual event.",
            "A good claim does not ignore extraordinary circumstances. It asks for specific facts. That is much stronger than a message saying only that you were delayed and want money."
          ],
        },
        {
          heading: "What passengers should do at the airport",
          body: [
            "Keep the boarding pass, booking confirmation, airline messages, flight-status screenshot and receipts for waiting costs. If you receive a meal voucher, keep it. If assistance is not provided, spend reasonably and keep receipts.",
            "If the wait goes overnight, ask for hotel accommodation and transfer. The right to care is separate from fixed compensation. Even if it later turns out that 250, 400 or 600 euros are not owed, food, accommodation or transfer costs may still matter separately.",
            "For connections, immediately ask for a new solution to the final destination. If you buy a new ticket yourself because the airline is not helping, keep proof that you asked for assistance and that the cost was reasonable."
          ],
        },
        {
          heading: "How to file the claim",
          body: [
            "The claim should be short but precise: flight number, date, route, scheduled and actual arrival time, booking reference, explanation you were given and what you are requesting. If you have costs, separate them from fixed compensation.",
            "Write that you request processing of a flight-delay compensation claim and, if the airline believes extraordinary circumstances apply, that you request a specific explanation of the event, time period and effect on your flight. This moves the response from generic wording into checkable facts.",
            "If the airline does not respond or rejects the claim with a broad sentence, the next step is a follow-up with evidence and clear questions. The detailed guides below this page cover exactly those scenarios: technical fault, bad weather, slot, previous aircraft, hotel and deadlines."
          ],
        },
      ],
      faqs: [
        {
          question: "Is departure delay or arrival delay counted?",
          answer:
            "For fixed compensation, arrival delay at the final destination matters most. Departure delay is useful evidence, but it is not the main threshold.",
        },
        {
          question: "Does bad weather automatically mean no compensation?",
          answer:
            "Not automatically. It can be an extraordinary circumstance, but you should check where it happened, how long it lasted and whether it directly affected your flight.",
        },
      ],
    },
  },
];

const guideSummaries: Array<Omit<CornerstonePage, "image" | "sr" | "en" | "updatedAt" | "childArticleIds"> & {
  image: CornerstonePage["image"];
  childArticleIds: string[];
  sr: Pick<LocalizedCornerstone, "slug" | "title" | "description" | "eyebrow" | "excerpt" | "ctaLabel" | "languageLabel">;
  en: Pick<LocalizedCornerstone, "slug" | "title" | "description" | "eyebrow" | "excerpt" | "ctaLabel" | "languageLabel">;
}> = [
  {
    id: "flight-cancellation-compensation",
    image: {
      src: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1800&q=84",
      alt: "Cancelled flights displayed on an airport board",
      position: "center",
    },
    childArticleIds: ["cancelled-flight-rights", "cancellation-under-14-days", "flight-moved-earlier-rights", "refund-vs-compensation", "voucher-or-cash-compensation", "airline-response-no-answer", "documents-for-claim"],
    sr: {
      slug: "naknada-za-otkazan-let",
      title: "Naknada za otkazan let",
      description: "Glavni vodič za otkazane letove: kada se traži naknada, kada refundacija, šta znači rok od 14 dana i koje alternative utiču na iznos.",
      eyebrow: "Glavni vodič",
      excerpt: "Otkazan let ne znači uvek isti zahtev. Nekad je najvažnija fiksna naknada, nekad povrat karte, nekad najbrže preusmeravanje. Ovaj vodič razdvaja rok obaveštenja, ponuđenu zamenu, stvarno vreme dolaska i vanredne okolnosti.",
      ctaLabel: "Proveri otkazivanje",
      languageLabel: "English version",
    },
    en: {
      slug: "flight-cancellation-compensation",
      title: "Flight cancellation compensation",
      description: "The main guide to cancelled flights: when compensation applies, when refund matters, what the 14-day rule means and how alternatives affect the amount.",
      eyebrow: "Main guide",
      excerpt: "A cancelled flight is not always the same claim. Sometimes fixed compensation matters most, sometimes ticket refund, sometimes the fastest rerouting. This guide separates notice timing, replacement flight, actual arrival and extraordinary circumstances.",
      ctaLabel: "Check cancellation",
      languageLabel: "Srpska verzija",
    },
  },
  {
    id: "missed-connection-compensation",
    image: {
      src: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1800&q=84",
      alt: "Traveler reviewing connecting flight tickets",
      position: "center",
    },
    childArticleIds: ["missed-connection", "separate-tickets-missed-connection", "serbia-eu-transit-routes", "air-traffic-control-slot-delay", "self-rerouting-new-ticket", "documents-for-claim"],
    sr: {
      slug: "naknada-za-propustenu-konekciju",
      title: "Naknada za propuštenu konekciju",
      description: "Glavni vodič za propuštene konekcije: jedna rezervacija, odvojene karte, dolazak na krajnju destinaciju, preusmeravanje i dokazi.",
      eyebrow: "Glavni vodič",
      excerpt: "Kod propuštene konekcije najvažnije pitanje je da li su letovi bili pod jednom rezervacijom. Ako jesu, često se gleda kašnjenje na krajnjoj destinaciji, a ne samo prvi segment.",
      ctaLabel: "Proveri konekciju",
      languageLabel: "English version",
    },
    en: {
      slug: "missed-connection-compensation",
      title: "Missed connection compensation",
      description: "The main guide to missed connections: one booking, separate tickets, final-destination delay, rerouting and evidence.",
      eyebrow: "Main guide",
      excerpt: "For missed connections, the key question is whether the flights were under one booking. If they were, the delay at the final destination often matters more than the first segment alone.",
      ctaLabel: "Check connection",
      languageLabel: "Srpska verzija",
    },
  },
  {
    id: "overbooking-compensation",
    image: {
      src: "https://images.unsplash.com/photo-1521727857535-28d2047314ac?auto=format&fit=crop&w=1800&q=84",
      alt: "Passenger holding travel documents after an overbooked flight",
      position: "center",
    },
    childArticleIds: ["denied-boarding-overbooking", "voluntary-denied-boarding-voucher", "voucher-or-cash-compensation", "airport-action-plan", "documents-for-claim"],
    sr: {
      slug: "overbooking-naknada",
      title: "Overbooking naknada",
      description: "Glavni vodič za overbooking: kada je ukrcavanje odbijeno zbog previše prodatih karata, šta znači dobrovoljni vaučer i kada se traži novčana naknada.",
      eyebrow: "Glavni vodič",
      excerpt: "Overbooking je situacija u kojoj aviokompanija proda više mesta nego što realno može da preveze. Prava putnika zavise od toga da li ste dobrovoljno prihvatili dogovor ili vam je ukrcavanje uskraćeno protiv vaše volje.",
      ctaLabel: "Proveri overbooking",
      languageLabel: "English version",
    },
    en: {
      slug: "overbooking-compensation",
      title: "Overbooking compensation",
      description: "The main guide to overbooking: when boarding is refused because too many seats were sold, what a voluntary voucher means and when cash compensation applies.",
      eyebrow: "Main guide",
      excerpt: "Overbooking happens when an airline sells more seats than it can actually carry. Passenger rights depend on whether you voluntarily accepted a deal or boarding was denied against your will.",
      ctaLabel: "Check overbooking",
      languageLabel: "Srpska verzija",
    },
  },
  {
    id: "denied-boarding-compensation",
    image: {
      src: "https://images.unsplash.com/photo-1579689189009-874f5cac2db5?auto=format&fit=crop&w=1800&q=84",
      alt: "Airport gate area before boarding",
      position: "center",
    },
    childArticleIds: ["denied-boarding-overbooking", "voluntary-denied-boarding-voucher", "missed-flight-security-queue", "airport-action-plan", "documents-for-claim"],
    sr: {
      slug: "naknada-za-uskraceno-ukrcavanje",
      title: "Naknada za uskraćeno ukrcavanje",
      description: "Glavni vodič za uskraćeno ukrcavanje: overbooking, gate pravila, dobrovoljno odustajanje, opravdani razlozi odbijanja i dokazi.",
      eyebrow: "Glavni vodič",
      excerpt: "Uskraćeno ukrcavanje nije samo overbooking. Nekad je razlog dokument, kasni dolazak na gate ili bezbednosna odluka. Ovaj vodič razdvaja slučajeve u kojima se traži naknada od situacija u kojima kompanija ima opravdan razlog.",
      ctaLabel: "Proveri ukrcavanje",
      languageLabel: "English version",
    },
    en: {
      slug: "denied-boarding-compensation",
      title: "Denied boarding compensation",
      description: "The main guide to denied boarding: overbooking, gate rules, voluntary surrender, justified refusal and evidence.",
      eyebrow: "Main guide",
      excerpt: "Denied boarding is not only overbooking. Sometimes the reason is a document issue, late gate arrival or safety decision. This guide separates compensation cases from situations where the airline has a justified reason.",
      ctaLabel: "Check boarding",
      languageLabel: "Srpska verzija",
    },
  },
  {
    id: "delayed-baggage-compensation",
    image: {
      src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=84",
      alt: "Airport baggage area with luggage",
      position: "center",
    },
    childArticleIds: ["delayed-baggage-after-flight", "documents-for-claim", "airport-action-plan"],
    sr: {
      slug: "naknada-za-kasnjenje-prtljaga",
      title: "Naknada za kašnjenje prtljaga",
      description: "Glavni vodič za prtljag koji kasni: PIR prijava, rokovi, nužni troškovi, izgubljen prtljag i dokazi.",
      eyebrow: "Glavni vodič",
      excerpt: "Kašnjenje prtljaga se ne rešava kao standardna EC261 odšteta za kašnjenje leta. Najvažniji su brza PIR prijava, računi za nužne stvari, rokovi i dokaz da trošak ima vezu sa kašnjenjem torbe.",
      ctaLabel: "Proveri prtljag",
      languageLabel: "English version",
    },
    en: {
      slug: "delayed-baggage-compensation",
      title: "Delayed baggage compensation",
      description: "The main guide to delayed baggage: PIR report, deadlines, necessary expenses, lost baggage and evidence.",
      eyebrow: "Main guide",
      excerpt: "Delayed baggage is not handled like standard EC261 compensation for a delayed flight. The most important things are a quick PIR report, receipts for necessary items, deadlines and proof that the cost is linked to the delayed bag.",
      ctaLabel: "Check baggage",
      languageLabel: "Srpska verzija",
    },
  },
  {
    id: "airline-strike-compensation",
    image: {
      src: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1800&q=84",
      alt: "Passengers waiting during an airport disruption",
      position: "center",
    },
    childArticleIds: ["airline-strike-compensation", "airport-strike-flight-rights", "air-traffic-control-slot-delay", "cancelled-flight-rights", "documents-for-claim"],
    sr: {
      slug: "naknada-za-strajk-aviokompanije",
      title: "Naknada za štrajk aviokompanije",
      description: "Glavni vodič za štrajkove: razlika između štrajka aviokompanije, aerodroma i kontrole letenja, naknada, briga i preusmeravanje.",
      eyebrow: "Glavni vodič",
      excerpt: "Štrajk nije uvek isti pravni problem. Ako štrajkuju zaposleni aviokompanije, zahtev može biti jak. Ako štrajkuje aerodrom, obezbeđenje ili kontrola letenja, fiksna naknada je teža, ali pravo na brigu ostaje.",
      ctaLabel: "Proveri štrajk",
      languageLabel: "English version",
    },
    en: {
      slug: "airline-strike-compensation",
      title: "Airline strike compensation",
      description: "The main guide to strikes: airline staff vs airport and air traffic control strikes, compensation, care and rerouting.",
      eyebrow: "Main guide",
      excerpt: "A strike is not always the same legal problem. If airline employees are striking, the claim may be strong. If the airport, security or air traffic control is striking, fixed compensation is harder, but care rights remain.",
      ctaLabel: "Check strike",
      languageLabel: "Srpska verzija",
    },
  },
];

const generatedGuides: CornerstonePage[] = guideSummaries.map((guide) => {
  const srTopic = guide.sr.title.toLowerCase();
  const enTopic = guide.en.title.toLowerCase();

  return {
    ...guide,
    updatedAt,
    sr: {
      ...guide.sr,
      sections: [
        {
          heading: "Kada ova situacija može dati pravo na novac",
          body: [
            `${guide.sr.title} treba proveriti kada je poremećaj direktno promenio vaše putovanje i kada aviokompanija nema jasan, konkretan razlog koji je van njene kontrole. Prvi korak je uvek isti: utvrditi rutu, rezervaciju, planirano vreme, stvarno vreme i tačan razlog koji je kompanija navela.`,
            "Kod evropskih prava putnika iznos ne zavisi od cene karte, već od vrste događaja, dužine rute i posledice po putnika. Zato skupa karta nije uslov za dobar zahtev, a jeftina karta nije razlog da se zahtev ne pošalje.",
            "Ako je kompanija ponudila zamenski let, vaučer ili refundaciju, to ne zatvara automatski pitanje naknade. Potrebno je videti da li ste stigli znatno kasnije, da li ste dobrovoljno prihvatili ponudu i da li je alternativa bila razumna."
          ],
          bullets: [
            "Sačuvajte booking reference i sve boarding pass dokumente.",
            "Zapišite planirano i stvarno vreme dolaska.",
            "Tražite pisani razlog poremećaja, ne samo usmeno objašnjenje.",
            "Odvojite fiksnu naknadu od refundacije karte i troškova čekanja."
          ],
        },
        {
          heading: "Šta aviokompanija mora da objasni",
          body: [
            `Za ${srTopic} nije dovoljno da aviokompanija pošalje jednu opštu rečenicu. Mora biti jasno šta se dogodilo, kada se dogodilo, na kom aerodromu ili letu, i kako je baš taj događaj uticao na vaše putovanje.`,
            "Ako se kompanija poziva na vanredne okolnosti, tražite konkretno objašnjenje. Loše vreme, slot, štrajk, bezbednost ili operativni razlog imaju potpuno različitu težinu. Neki razlozi mogu biti validni, ali samo ako su direktno povezani sa vašim letom i ako kompanija nije mogla razumno da izbegne posledicu.",
            "Posebno pazite na promenu razloga. Ako se u jednoj poruci pominje tehnički problem, u drugoj kontrola letenja, a u trećoj kasna posada, zahtev treba strukturisati po vremenskoj liniji. Kombinovani razlozi nisu retki, ali ne smeju ostati nejasni."
          ],
        },
        {
          heading: "Pravo na brigu i preusmeravanje",
          body: [
            "Bez obzira na krajnji odgovor o fiksnoj naknadi, putnik tokom dužeg čekanja ne treba da ostane bez pomoći. Obroci, osveženje, komunikacija, hotel i transfer mogu biti relevantni kada čekanje traje dugo ili se putovanje pomera na naredni dan.",
            "Ako pomoć nije organizovana, troškovi moraju biti razumni i povezani sa poremećajem. Sačuvajte račun, vreme kupovine i kratak razlog zašto je trošak bio nužan. Luksuzne troškove je teže opravdati, ali osnovna hrana, voda, prevoz i smeštaj su druga priča.",
            "Ako vam kompanija ponudi alternativu koja nema smisla, zatražite bolju opciju pisanim putem. Ako sami kupujete novo rešenje, zabeležite da ste prvo pokušali da dobijete pomoć od aviokompanije."
          ],
        },
        {
          heading: "Dokazi koji najviše pomažu",
          body: [
            "Najkorisniji dokazi su oni koji pokazuju celu priču bez oslanjanja na sećanje: potvrda rezervacije, boarding pass, poruke aviokompanije, screenshot aplikacije, fotografija table polazaka, računi i svaka pisana informacija sa aerodroma.",
            "Za konekcije čuvajte kompletan itinerer. Za prtljag čuvajte PIR i račune. Za overbooking i uskraćeno ukrcavanje tražite potvrdu sa gejta. Za otkazivanje čuvajte obaveštenje o otkazivanju i ponuđenu zamenu.",
            "Dobar zahtev nije najduži zahtev. Dobar zahtev je onaj u kome su činjenice složene tako da aviokompanija mora da odgovori na konkretna pitanja."
          ],
        },
        {
          heading: "Kako se ova stranica povezuje sa detaljnim vodičima",
          body: [
            "Ovaj glavni vodič pokriva temu dovoljno široko da odlučite da li slučaj ima smisla. Detaljni vodiči ispod ulaze u posebne scenarije: dokumenta, rokove, odbijene zahteve, vaučere, odvojene karte, tehnički kvar, slotove, štrajkove i troškove čekanja.",
            "Najbolji korisnički tok je jednostavan: glavni vodič objašnjava pravilo, a detaljni tekst objašnjava izuzetak ili dokaz. Zato se svaki relevantan tekst vraća na ovaj vodič, a ovaj vodič šalje putnika na dublju temu kada je to stvarno korisno."
          ],
        },
      ],
      faqs: [
        {
          question: `Da li ${srTopic} automatski znači da imam pravo na naknadu?`,
          answer:
            "Ne automatski. Potrebno je proveriti rutu, vreme dolaska ili obaveštenja, razlog poremećaja i da li postoje vanredne okolnosti.",
        },
        {
          question: "Da li da prihvatim vaučer?",
          answer:
            "Ne prihvatajte vaučer dok ne razumete da li se time odričete gotovinske naknade ili drugih prava. Kod dobrovoljnih dogovora uslovi ponude su presudni.",
        },
      ],
    },
    en: {
      ...guide.en,
      sections: [
        {
          heading: "When this situation can lead to money",
          body: [
            `${guide.en.title} is worth checking when the disruption directly changed your journey and the airline does not have a clear, specific reason outside its control. The first step is always the same: establish the route, booking, scheduled time, actual time and exact reason given by the airline.`,
            "Under European passenger-rights rules, the amount does not depend on ticket price, but on the type of event, route distance and consequence for the passenger. An expensive ticket is not required for a good claim, and a cheap ticket is not a reason to avoid filing.",
            "If the airline offered a replacement flight, voucher or refund, that does not automatically close the compensation question. You still need to check whether you arrived much later, whether you voluntarily accepted the offer and whether the alternative was reasonable."
          ],
          bullets: [
            "Keep the booking reference and all boarding passes.",
            "Write down scheduled and actual arrival time.",
            "Ask for the disruption reason in writing, not only at the gate.",
            "Separate fixed compensation from ticket refund and waiting costs."
          ],
        },
        {
          heading: "What the airline must explain",
          body: [
            `For ${enTopic}, one broad sentence from the airline is not enough. It should be clear what happened, when it happened, at which airport or flight, and how that event affected your journey.`,
            "If the airline relies on extraordinary circumstances, ask for a specific explanation. Bad weather, slot, strike, safety and operational reason have very different weight. Some reasons can be valid, but only if they are directly connected to your flight and the airline could not reasonably avoid the consequence.",
            "Pay special attention when the reason changes. If one message says technical issue, another says air traffic control and a third says late crew, structure the claim around a timeline. Mixed reasons are common, but they should not remain vague."
          ],
        },
        {
          heading: "Care and rerouting rights",
          body: [
            "Whatever the final answer on fixed compensation, passengers should not be left without assistance during a long wait. Meals, refreshments, communication, hotel and transfer may matter when the delay is long or travel moves to the next day.",
            "If assistance is not arranged, costs should be reasonable and linked to the disruption. Keep the receipt, purchase time and a short reason why the expense was necessary. Luxury costs are harder to justify, but basic food, water, transport and accommodation are different.",
            "If the airline offers an alternative that does not make sense, ask for a better option in writing. If you buy a new solution yourself, record that you first tried to get help from the airline."
          ],
        },
        {
          heading: "Evidence that helps most",
          body: [
            "The most useful evidence shows the whole story without relying on memory: booking confirmation, boarding pass, airline messages, app screenshot, departures-board photo, receipts and any written airport information.",
            "For connections, keep the full itinerary. For baggage, keep the PIR and receipts. For overbooking and denied boarding, ask for gate confirmation. For cancellation, save the cancellation notice and replacement offer.",
            "A good claim is not the longest claim. A good claim is one where facts are organized so the airline has to answer specific questions."
          ],
        },
        {
          heading: "How this page connects to detailed guides",
          body: [
            "This main guide covers the topic broadly enough to decide whether the case makes sense. The detailed guides below go into specific scenarios: documents, deadlines, rejected claims, vouchers, separate tickets, technical faults, slots, strikes and waiting costs.",
            "The best reader flow is simple: the main guide explains the rule, while a detailed article explains the exception or proof. That is why every relevant article links back to this guide, and this guide sends the passenger deeper only where it is genuinely useful."
          ],
        },
      ],
      faqs: [
        {
          question: `Does ${enTopic} automatically mean I have compensation?`,
          answer:
            "Not automatically. You need to check the route, arrival time or notices, disruption reason and whether extraordinary circumstances apply.",
        },
        {
          question: "Should I accept a voucher?",
          answer:
            "Do not accept a voucher until you understand whether it waives cash compensation or other rights. In voluntary deals, the terms of the offer are decisive.",
        },
      ],
    },
  };
});

cornerstonePages.push(...generatedGuides);

const delayGuide = cornerstonePages.find((page) => page.id === "flight-delay-compensation");

if (delayGuide) {
  delayGuide.updatedAt = "2026-05-04";
  delayGuide.sr.sections = [
    ...delayGuide.sr.sections,
    {
      heading: "Ruta, Srbija, EU i ECAA okvir",
      body: [
        "Za putnika iz Srbije najlakše je pogrešiti na pitanju pokrivenosti. Pravilo se ne primenjuje zato što je putnik državljanin Srbije ili zato što je karta kupljena u Srbiji. Presudni su aerodrom polaska, aerodrom dolaska, operativni prevoznik i to da li se putovanje posmatra kao jedna rezervacija. Let iz EU ka Beogradu je obično najčistiji slučaj. Let iz Beograda ka EU može biti jak kada ga obavlja evropski prevoznik. [Putovanje iz Srbije preko Beča, Frankfurta, Pariza, Rima ili Amsterdama](/naknada-za-propustenu-konekciju/let-iz-srbije-preko-eu-prava-putnika) može se gledati kao celina ako su segmenti u jednoj rezervaciji.",
        "[ECAA okvir](/prava-putnika-u-aviosaobracaju/eu261-ecaa-srbija-prava-putnika) i lokalna praksa su važni jer putnici iz Srbije često lete kombinacijom domaćih, evropskih i vanevropskih prevoznika. Kod takvih ruta nije dovoljno pitati da li je prvi avion kasnio. Treba proveriti ceo itinerer, ko je obavljao problematični segment, gde je nastalo kašnjenje i kada ste stvarno stigli na krajnju destinaciju. Ako imate jednu booking referencu za sve segmente, taj podatak treba staviti odmah na početak zahteva.",
        "Kod codeshare letova gledajte operativnog prevoznika, ne samo logo koji je prodao kartu. Na karti može pisati jedna kompanija, a let može obavljati druga. To menja procenu, posebno kod dolazaka u EU iz trećih zemalja. Ako niste sigurni, sačuvajte e-ticket, boarding pass i detalje leta iz aplikacije, jer se iz tih dokumenata najčešće vidi ko je zaista obavljao let."
      ],
    },
    {
      heading: "Dolazak tri sata kasnije i šta je tačno vreme dolaska",
      body: [
        "Najvažniji prag je kašnjenje pri dolasku na krajnju destinaciju. Putnik često pamti vreme kada je avion poleteo, ali za fiksnu naknadu je presudno koliko je kasno završeno putovanje. Ako je polazak kasnio četiri sata, a dolazak kasnio dva sata i pedeset minuta, zahtev za fiksnu naknadu može pasti. Ako je polazak kasnio manje, ali ste zbog konekcije stigli pet sati kasnije, slučaj može biti znatno jači.",
        "U praksi treba sačuvati više tragova vremena: planirano vreme dolaska iz karte, stvarno vreme sletanja, vreme otvaranja vrata ako ga imate, screenshot aplikacije i poruke aviokompanije. Nije uvek lako dokazati minut po minut, ali se dobar slučaj gradi oko jasnog poređenja: planirani dolazak protiv stvarnog dolaska na destinaciju iz rezervacije.",
        "Ako ste [preusmereni na drugi aerodrom](/naknada-za-kasnjenje-leta/preusmeren-let-drugi-aerodrom-prava-putnika), ne gledajte samo vreme kada ste sleteli na alternativni aerodrom. Bitno je kada ste stigli do aerodroma ili destinacije koja je bila dogovorena u rezervaciji, odnosno ko je snosio transfer i koliko je to produžilo putovanje. To je razlog zašto preusmeren let pripada ovoj temi, jer je za putnika najčešće posledica produženo kašnjenje."
      ],
    },
    {
      heading: "Tabela iznosa i kada se iznos može smanjiti",
      body: [
        "Iznos naknade ne zavisi od cene karte, klase putovanja ili toga koliko ste platili doplatu za prtljag. Osnovna logika je razdaljina i posledica po putovanje. Za rute do 1.500 kilometara najčešći iznos je 250 evra. Za rute između 1.500 i 3.500 kilometara, kao i za duže rute unutar EU, najčešći iznos je 400 evra. Za duže rute preko 3.500 kilometara iznos može biti 600 evra.",
        "Na dugim rutama postoje situacije u kojima se naknada smanjuje ako je kašnjenje pri dolasku između tri i četiri sata. Zato je važno da u zahtevu ne pišete samo da let kasni, već da navedete tačnu rutu, krajnju destinaciju i stvarno vreme dolaska. Kod jedne rezervacije udaljenost se ne posmatra uvek kao izolovani segment na kome je nastao problem, već kao putovanje do krajnje destinacije.",
        "Za većinu letova iz Srbije prema evropskim gradovima najčešće se praktično vrte iznosi od 250 ili 400 evra. Interkontinentalne rute preko evropskih čvorišta su druga kategorija. Tu je naročito važno dokazati da je sve bilo u jednoj rezervaciji, jer od toga zavisi da li se procenjuje samo jedan segment ili ceo put."
      ],
    },
    {
      heading: "Tehnički kvar, rotacija aviona i posada",
      body: [
        "[Tehnički kvar](/naknada-za-kasnjenje-leta/tehnicki-kvar-aviona-odsteta) je jedan od najčešćih razloga zbog kojih putnik ne treba automatski da odustane. Redovni tehnički problemi su deo operativnog rizika aviokompanije. To ne znači da je svaki kvar automatski plaćen slučaj, ali znači da opšta rečenica o tehničkom razlogu nije dovoljna. Tražite šta se dogodilo, kada je kvar otkriven, da li je avion mogao biti zamenjen i zašto je posledica bila baš toliko kašnjenje.",
        "[Kasna rotacija prethodnog leta](/naknada-za-kasnjenje-leta/kasnjenje-prethodnog-leta-rotacija-aviona) je posebno česta kod aviona koji tokom dana rade više segmenata. Ako je vaš avion zakasnio jer je prethodni let kasnio, pitanje je zašto je prethodni let kasnio. Ako je uzrok bio u odgovornosti aviokompanije, zahtev može ostati jak. Ako je prethodni segment pogodilo zatvaranje aerodroma ili ozbiljno vreme, analiza je teža, ali opet treba proveriti da li je kompanija imala razumnu rezervu i alternativu.",
        "[Nedostatak posade](/naknada-za-kasnjenje-leta/nedostatak-posade-kasnjenje-leta-odsteta), prekoračenje radnog vremena posade ili loše planiranje smene često deluju kao interni operativni problem. Ako aviokompanija navodi posadu, tražite pisani razlog. Nije isto kada posada kasni zbog zatvaranja aerodroma i kada kompanija nije imala raspoloživ tim za let koji je već bio planiran."
      ],
    },
    {
      heading: "Loše vreme, slotovi kontrole letenja i bezbednosni događaji",
      body: [
        "[Loše vreme](/naknada-za-kasnjenje-leta/kasnjenje-leta-zbog-loseg-vremena) može biti vanredna okolnost, ali ne svaka kiša, vetar ili magla. Bitno je gde je vreme bilo problem, koliko je trajalo, da li su drugi letovi normalno poletali i da li je vaš let zaista bio direktno pogođen. Ako je avion kasnio iz drugog grada zbog vremena tamo, treba proveriti da li je to direktno objašnjenje ili samo zgodan izgovor za kasnu rotaciju.",
        "[Slotovi kontrole letenja](/naknada-za-kasnjenje-leta/kasnjenje-leta-zbog-slotova-kontrole-letenja) su često jači argument aviokompanije jer prevoznik ne kontroliše raspored letenja u vazdušnom prostoru. Ipak, ni tu ne treba stati na prvoj rečenici. Slot može objasniti deo kašnjenja, ali ne mora objasniti ceo dan čekanja. Dobar zahtev pita kada je ograničenje počelo, kada se završilo i šta je kompanija uradila posle toga.",
        "[Udar ptice](/naknada-za-kasnjenje-leta/udar-ptice-kasnjenje-leta-odsteta), [udar groma](/naknada-za-kasnjenje-leta/udar-groma-u-avion-kasnjenje-prava), zatvaranje piste, [medicinski hitan slučaj](/naknada-za-kasnjenje-leta/medicinski-hitan-slucaj-kasnjenje-leta) i bezbednosne odluke zahtevaju odvojenu procenu. Neki događaji su zaista van kontrole aviokompanije. Drugi samo započnu problem, dok kasnije kašnjenje nastane zato što kompanija nema avion, posadu ili plan oporavka. Zato se u zahtevu uvek traži vremenska linija, ne samo naziv razloga."
      ],
    },
    {
      heading: "Pravo na brigu: hrana, hotel, transfer i refundacija troškova",
      body: [
        "Pravo na brigu postoji odvojeno od fiksne naknade. To je jedna od najvažnijih stvari za putnika koji je zaglavljen na aerodromu. Čak i kada aviokompanija kasnije uspešno dokaže vanredne okolnosti, putnik može imati pravo na obroke, osveženje, komunikaciju, hotel i transfer ako čekanje traje dovoljno dugo i ako je pomoć bila potrebna.",
        "Ako let ide tek sutradan, pitajte za [hotel i prevoz između aerodroma i hotela](/naknada-za-kasnjenje-leta/nocno-kasnjenje-leta-hotel-prava). Ako kompanija ne organizuje ništa, kupujte razumno i čuvajte račune. Razumno znači ono što vam je potrebno da nastavite putovanje, ne luksuz. U zahtevu jasno odvojite fiksnu naknadu od refundacije troškova, jer ta dva pitanja imaju različitu logiku.",
        "Ako ste zbog kašnjenja [sami kupili novu kartu](/naknada-za-kasnjenje-leta/samostalno-kupljen-novi-let-refundacija), slučaj postaje osetljiviji. Potrebno je pokazati da ste prvo tražili pomoć od aviokompanije, da ponuđena alternativa nije bila razumna ili da pomoći nije bilo, i da je nova karta bila realan način da smanjite štetu. Bez tog traga aviokompanija lakše tvrdi da je trošak bio vaš izbor."
      ],
    },
    {
      heading: "Dokumenta, rokovi i slanje zahteva",
      body: [
        "Najbolji zahtev počinje pre nego što napustite aerodrom. Sačuvajte boarding pass, potvrdu rezervacije, broj leta, poruke aviokompanije, fotografiju table polazaka, screenshot statusa leta i račune. Ako ste razgovarali sa osobljem, zapišite vreme i tačnu formulaciju razloga. Ako se razlog menjao tokom dana, sačuvajte sve verzije.",
        "Zahtev ne mora biti dugačak, ali mora biti precizan. U prvoj poruci navedite broj leta, datum, rutu, planirano i stvarno vreme dolaska, booking referencu, krajnju destinaciju i šta tražite. Ako tražite i fiksnu naknadu i refundaciju troškova, razdvojite ta dva dela. Ako aviokompanija tvrdi da su postojale vanredne okolnosti, tražite konkretan opis događaja, vremenski period i vezu sa vašim letom.",
        "Rokovi zavise od pravila koja se primenjuju i od toga gde se zahtev vodi, zato ne treba čekati. Što se ranije pošalje zahtev, lakše je sačuvati dokaze i uhvatiti kontradikcije u objašnjenju. Ako kompanija ne odgovori ili pošalje opšte odbijanje, sledeći korak nije nova emotivna poruka, već dopuna sa dokazima i jasnim pitanjima."
      ],
    },
    {
      heading: "Kada slučaj treba proveriti čak i ako deluje slabije",
      body: [
        "Vredi proveriti slučaj kada ste stigli tri sata kasnije, kada je objašnjenje nejasno, kada se razlog menjao, kada je u pitanju konekcija pod jednom rezervacijom, kada je avion kasnio zbog prethodne rotacije ili kada ste imali značajne troškove hrane, hotela, transfera ili nove karte. Slabiji utisak na aerodromu ne znači da je slučaj pravno slab.",
        "Ne treba forsirati slučaj ako je dolazak bio ispod tri sata, ako ste kasnili na gate, ako ste imali odvojene karte i sami propustili drugi let, ili ako je ceo aerodrom bio zatvoren zbog ozbiljnog bezbednosnog događaja. Ipak, i tada može postojati pitanje brige, refundacije karte ili troškova koji nisu isto što i fiksna naknada.",
        "Najpraktičniji pristup je konzervativna provera: prvo ruta i rezervacija, zatim vreme dolaska, zatim razlog, zatim dokazi, zatim troškovi. Ako tih pet stvari stoje dobro, zahtev se šalje. Ako jedna tačka nedostaje, pokušava se dopuniti dokazima pre nego što se odustane."
      ],
    },
  ];

  delayGuide.en.sections = [
    ...delayGuide.en.sections,
    {
      heading: "Route coverage, Serbia, EU and the ECAA context",
      body: [
        "For travelers from Serbia, coverage is the easiest place to make a wrong assumption. The rule does not apply because the passenger is Serbian or because the ticket was bought in Serbia. The decisive facts are departure airport, arrival airport, operating carrier and whether the journey is treated as one booking. A flight from the EU to Belgrade is usually the cleanest case. A flight from Belgrade to the EU can be strong when operated by a European carrier. [Travel from Serbia through Vienna, Frankfurt, Paris, Rome or Amsterdam](/en/missed-connection-compensation/flight-from-serbia-via-eu-passenger-rights) can be assessed as one journey if the segments are under one booking.",
        "The [ECAA context](/en/air-passenger-rights/eu261-ecaa-serbia-passenger-rights) and local travel patterns matter because Serbia-based passengers often fly with a mix of Serbian, European and non-European airlines. On those routes it is not enough to ask whether the first aircraft was late. You need the whole itinerary, the operating carrier for the disrupted segment, where the delay started and when you actually reached the final destination. If all segments share one booking reference, put that fact at the start of the claim.",
        "For codeshare flights, check the operating carrier, not only the logo that sold the ticket. The ticket may show one airline while another airline operates the aircraft. That can change the assessment, especially for arrivals into the EU from third countries. Keep the e-ticket, boarding pass and app details because those documents usually show who operated the flight."
      ],
    },
    {
      heading: "The three-hour arrival rule and actual arrival time",
      body: [
        "The most important threshold is delay at arrival at the final destination. Passengers often remember when the aircraft departed, but fixed compensation depends on how late the journey ended. If departure was four hours late but arrival was two hours and fifty minutes late, the fixed-compensation claim may fail. If departure was shorter but a missed connection caused a five-hour late arrival, the case can be much stronger.",
        "In practice, save several time records: scheduled arrival from the ticket, actual landing time, door-opening time if available, an app screenshot and airline messages. It is not always possible to prove every minute, but a strong case is built around a clear comparison: scheduled arrival versus actual arrival at the destination in the booking.",
        "If you were [diverted to another airport](/en/flight-delay-compensation/flight-diverted-different-airport-passenger-rights), do not look only at the time you landed at the alternative airport. The important question is when you reached the airport or destination agreed in the booking, who covered the transfer and how much the diversion extended the journey. That is why diverted flights belong under delay: for the passenger, the main consequence is usually a longer arrival delay."
      ],
    },
    {
      heading: "Compensation amounts and when the amount can be reduced",
      body: [
        "The compensation amount does not depend on ticket price, travel class or how much you paid for baggage. The basic logic is distance and the impact on the journey. For routes up to 1,500 kilometres, the usual amount is 250 euros. For routes between 1,500 and 3,500 kilometres, and for longer intra-EU routes, the usual amount is 400 euros. For routes over 3,500 kilometres, the amount can be 600 euros.",
        "On long-haul routes, the amount can be reduced in some situations if arrival delay is between three and four hours. That is why the claim should not merely say that the flight was delayed. It should state the exact route, final destination and actual arrival time. Under one booking, distance is not always assessed only by the disrupted segment, but by the journey to the final destination.",
        "For most Serbia-to-Europe flights, the practical amounts are usually 250 or 400 euros. Intercontinental journeys through European hubs are a different category. For those, proof of one booking is especially important because it can decide whether the assessment covers only one segment or the whole journey."
      ],
    },
    {
      heading: "Technical faults, aircraft rotation and crew",
      body: [
        "A [technical fault](/en/flight-delay-compensation/technical-fault-flight-compensation) is one of the common reasons why passengers should not automatically give up. Ordinary technical issues are part of the airline's operating risk. That does not mean every fault automatically leads to payment, but it does mean that a broad sentence about a technical reason is not enough. Ask what happened, when the fault was found, whether the aircraft could be replaced and why the final delay was so long.",
        "[Late aircraft rotation](/en/flight-delay-compensation/previous-flight-rotation-delay-compensation) is common when the same aircraft flies several sectors during the day. If your aircraft was late because the previous flight was late, the next question is why that previous flight was late. If the cause was within the airline's responsibility, your claim can remain strong. If the previous segment was hit by airport closure or serious weather, the analysis is harder, but it is still worth checking whether the airline had a reasonable buffer or alternative.",
        "[Crew shortage](/en/flight-delay-compensation/crew-shortage-flight-delay-compensation), crew duty-time limits and poor crew planning often look like internal operational problems. If the airline cites crew, ask for the reason in writing. It is not the same if crew was delayed by an airport closure or if the airline simply did not have an available team for a scheduled flight."
      ],
    },
    {
      heading: "Bad weather, air traffic control slots and safety events",
      body: [
        "[Bad weather](/en/flight-delay-compensation/flight-delay-bad-weather-compensation) can be an extraordinary circumstance, but not every rain, wind or fog event is enough. The important questions are where the weather problem occurred, how long it lasted, whether other flights were operating and whether your flight was directly affected. If the aircraft was late from another city because of weather there, check whether that really explains your delay or merely hides a late-rotation problem.",
        "[Air traffic control slots](/en/flight-delay-compensation/air-traffic-control-slot-delay-compensation) are often a stronger airline argument because the carrier does not control airspace flow management. Still, you should not stop at the first sentence. A slot may explain part of the delay without explaining a full day of waiting. A good claim asks when the restriction started, when it ended and what the airline did afterwards.",
        "[Bird strike](/en/flight-delay-compensation/bird-strike-flight-delay-compensation), [lightning strike](/en/flight-delay-compensation/lightning-strike-aircraft-delay-rights), runway closure, [medical emergency](/en/flight-delay-compensation/medical-emergency-flight-delay-rights) and security decisions require separate assessment. Some events are genuinely outside the airline's control. Others only start the problem, while the later delay happens because the airline lacks an aircraft, crew or recovery plan. That is why the claim should always ask for a timeline, not just a label."
      ],
    },
    {
      heading: "Care rights: food, hotel, transfer and reimbursement",
      body: [
        "The right to care is separate from fixed compensation. This is one of the most important points for a passenger stuck at the airport. Even when the airline later proves extraordinary circumstances, passengers may still have a right to meals, refreshments, communication, hotel and transfer if the wait is long enough and assistance is needed.",
        "If the flight leaves the next day, ask for [hotel accommodation and transport between the airport and hotel](/en/flight-delay-compensation/overnight-flight-delay-hotel-rights). If the airline organizes nothing, spend reasonably and keep receipts. Reasonable means what you need to continue the journey, not luxury. In the claim, separate fixed compensation from reimbursement of expenses because those issues follow different logic.",
        "If you [bought a new ticket because of the delay](/en/flight-delay-compensation/bought-new-flight-yourself-reimbursement), the case becomes more sensitive. You need to show that you first asked the airline for help, that the offered alternative was not reasonable or that no help was available, and that the new ticket was a real way to reduce the damage. Without that trail, the airline can more easily say the expense was your choice."
      ],
    },
    {
      heading: "Documents, deadlines and filing the claim",
      body: [
        "The best claim starts before you leave the airport. Keep the boarding pass, booking confirmation, flight number, airline messages, departures-board photo, flight-status screenshot and receipts. If you spoke to staff, write down the time and exact wording of the reason. If the reason changed during the day, save every version.",
        "The claim does not need to be long, but it needs to be precise. In the first message, include flight number, date, route, scheduled and actual arrival time, booking reference, final destination and what you are requesting. If you request both fixed compensation and expense reimbursement, separate those two parts. If the airline says extraordinary circumstances applied, ask for a specific description of the event, time period and connection to your flight.",
        "Deadlines depend on the rules that apply and where the claim is pursued, so do not wait. The earlier the claim is sent, the easier it is to preserve evidence and catch contradictions in the explanation. If the airline does not respond or sends a broad rejection, the next step is not a more emotional message, but a follow-up with evidence and clear questions."
      ],
    },
    {
      heading: "When to check the case even if it looks weaker",
      body: [
        "It is worth checking a case when you arrived three hours late, when the explanation is unclear, when the reason changed, when the journey involved a connection under one booking, when the aircraft was delayed by previous rotation or when you had meaningful food, hotel, transfer or new-ticket costs. A weak airport impression does not necessarily mean a legally weak case.",
        "You should not force a case if arrival delay was under three hours, if you were late to the gate, if you held separate tickets and missed the second flight yourself, or if the entire airport was closed because of a serious safety event. Even then, care, ticket refund or expense reimbursement may still matter separately from fixed compensation.",
        "The practical method is a conservative check: route and booking first, then arrival time, then reason, then evidence, then expenses. If those five points are strong, the claim is sent. If one point is missing, try to support it with evidence before giving up."
      ],
    },
  ];

  delayGuide.sr.faqs = [
    ...delayGuide.sr.faqs,
    {
      question: "Da li imam pravo ako je let kasnio tačno tri sata?",
      answer:
        "Da, slučaj vredi proveriti ako je dolazak na krajnju destinaciju bio tri sata ili više kasnije i ako razlog nije vanredna okolnost koju aviokompanija može konkretno dokazati.",
    },
    {
      question: "Da li vaučer za hranu ukida pravo na naknadu?",
      answer:
        "Ne. Hrana, hotel i transfer su pravo na brigu. Fiksna naknada se proverava odvojeno prema ruti, vremenu dolaska i razlogu kašnjenja.",
    },
    {
      question: "Šta ako je aviokompanija napisala samo operativni razlozi?",
      answer:
        "Tražite konkretno objašnjenje: šta se dogodilo, kada, na kom letu ili aerodromu i kako je to uticalo baš na vaš dolazak. Opšta formulacija nije dovoljna za dobru procenu.",
    },
    {
      question: "Da li preusmeren let spada u kašnjenje?",
      answer:
        "Često da. Ako ste sleteli na drugi aerodrom, gleda se kada ste stvarno stigli do aerodroma ili destinacije iz rezervacije i ko je snosio transfer.",
    },
  ];

  delayGuide.en.faqs = [
    ...delayGuide.en.faqs,
    {
      question: "Do I have a claim if the flight was exactly three hours late?",
      answer:
        "Yes, it is worth checking if arrival at the final destination was three hours or more late and the reason was not an extraordinary circumstance the airline can prove specifically.",
    },
    {
      question: "Does a meal voucher remove compensation rights?",
      answer:
        "No. Food, hotel and transfer are care rights. Fixed compensation is checked separately by route, arrival time and cause of delay.",
    },
    {
      question: "What if the airline only says operational reasons?",
      answer:
        "Ask for specifics: what happened, when, on which flight or airport and how it affected your arrival. Broad wording is not enough for a good assessment.",
    },
    {
      question: "Does a diverted flight belong under delay?",
      answer:
        "Often yes. If you landed at another airport, the key question is when you actually reached the airport or destination in the booking and who covered the transfer.",
    },
  ];
}

export const articleCornerstoneMap: Record<string, CornerstoneId> = {
  "flight-delay-compensation": "flight-delay-compensation",
  "bad-weather-flight-delay": "flight-delay-compensation",
  "technical-fault-flight-compensation": "flight-delay-compensation",
  "previous-flight-rotation-delay": "flight-delay-compensation",
  "overnight-delay-hotel-rights": "flight-delay-compensation",
  "self-rerouting-new-ticket": "flight-delay-compensation",
  "air-traffic-control-slot-delay": "flight-delay-compensation",
  "bird-strike-flight-delay": "flight-delay-compensation",
  "lightning-strike-aircraft-delay": "flight-delay-compensation",
  "medical-emergency-flight-delay": "flight-delay-compensation",
  "crew-shortage-flight-delay": "flight-delay-compensation",
  "night-flight-ban-curfew": "flight-delay-compensation",
  "cancelled-flight-rights": "flight-cancellation-compensation",
  "cancellation-under-14-days": "flight-cancellation-compensation",
  "airline-bankruptcy-passenger-rights": "flight-cancellation-compensation",
  "refund-vs-compensation": "flight-cancellation-compensation",
  "airline-response-no-answer": "flight-cancellation-compensation",
  "missed-connection": "missed-connection-compensation",
  "separate-tickets-missed-connection": "missed-connection-compensation",
  "serbia-eu-transit-routes": "missed-connection-compensation",
  "denied-boarding-overbooking": "overbooking-compensation",
  "voluntary-denied-boarding-voucher": "overbooking-compensation",
  "voucher-or-cash-compensation": "overbooking-compensation",
  "missed-flight-security-queue": "denied-boarding-compensation",
  "delayed-baggage-after-flight": "delayed-baggage-compensation",
  "airline-strike-compensation": "airline-strike-compensation",
  "airport-strike-flight-rights": "airline-strike-compensation",
  "airport-action-plan": "air-passenger-rights",
  "documents-for-claim": "air-passenger-rights",
  "claim-deadlines": "air-passenger-rights",
  "how-to-file-airline-claim": "air-passenger-rights",
  "airline-rejected-claim": "air-passenger-rights",
  "use-claim-service-or-diy": "air-passenger-rights",
  "claim-template-email": "air-passenger-rights",
  "extraordinary-circumstances": "air-passenger-rights",
  "eu261-ecaa-serbia": "air-passenger-rights",
  "children-infant-flight-compensation": "air-passenger-rights",
  "downgraded-seat-compensation": "air-passenger-rights",
  "flight-diverted-rights": "flight-delay-compensation",
  "flight-moved-earlier-rights": "flight-cancellation-compensation",
};

export function getCornerstoneBySlug(locale: BlogLocale, slug: string) {
  return cornerstonePages.find((page) => page[locale].slug === slug) ?? null;
}

export function getCornerstoneHref(page: CornerstonePage, locale: BlogLocale) {
  return locale === "sr" ? `/${page.sr.slug}` : `/en/${page.en.slug}`;
}

export function getAlternateCornerstoneHref(page: CornerstonePage, locale: BlogLocale) {
  return getCornerstoneHref(page, locale === "sr" ? "en" : "sr");
}

export function getCornerstoneForArticle(article: BlogArticle) {
  const cornerstoneId = articleCornerstoneMap[article.id] ?? "air-passenger-rights";
  return cornerstonePages.find((page) => page.id === cornerstoneId) ?? cornerstonePages[0];
}

export function getArticleCornerstoneHref(article: BlogArticle, locale: BlogLocale) {
  const page = getCornerstoneForArticle(article);
  return `${getCornerstoneHref(page, locale)}/${article[locale].slug}`;
}

export function getAlternateArticleCornerstoneHref(article: BlogArticle, locale: BlogLocale) {
  return getArticleCornerstoneHref(article, locale === "sr" ? "en" : "sr");
}

export function getBlogArticleByCornerstoneSlug(
  locale: BlogLocale,
  cornerstoneSlug: string,
  articleSlug: string,
) {
  const article =
    blogArticles.find((candidate) => candidate[locale].slug === articleSlug) ?? null;

  if (!article) {
    return null;
  }

  const page = getCornerstoneForArticle(article);
  return page[locale].slug === cornerstoneSlug ? article : null;
}

export function getCornerstoneChildren(page: CornerstonePage, locale: BlogLocale) {
  const orderedPrimaryIds = page.childArticleIds.filter(
    (id) => articleCornerstoneMap[id] === page.id,
  );
  const appendedPrimaryIds = blogArticles
    .map((article) => article.id)
    .filter(
      (id) => articleCornerstoneMap[id] === page.id && !orderedPrimaryIds.includes(id),
    );

  return [...orderedPrimaryIds, ...appendedPrimaryIds]
    .map((id) => blogArticles.find((article) => article.id === id))
    .filter((article): article is BlogArticle => Boolean(article))
    .map((article) => ({
      ...article,
      localized: article[locale],
    }));
}

export function getCornerstoneSupportArticles(page: CornerstonePage, locale: BlogLocale) {
  return (page.supportArticleIds ?? [])
    .map((id) => blogArticles.find((article) => article.id === id))
    .filter((article): article is BlogArticle => Boolean(article))
    .map((article) => ({
      ...article,
      localized: article[locale],
    }));
}
