export type BlogLocale = "sr" | "en";

type BlogSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

type LocalizedArticle = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  readTime: string;
  sections: BlogSection[];
};

export type BlogArticle = {
  id: string;
  publishedAt: string;
  updatedAt: string;
  sr: LocalizedArticle;
  en: LocalizedArticle;
};

export type BlogArticleImage = {
  src: string;
  alt: string;
  position?: string;
};

export const articleImages: Record<string, BlogArticleImage> = {
  "flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger aircraft parked at an airport gate",
    position: "center",
  },
  "cancelled-flight-rights": {
    src: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1400&q=82",
    alt: "Airport terminal with travellers and departure boards",
    position: "center",
  },
  "missed-connection": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=82",
    alt: "Passenger looking through an airport window",
    position: "center",
  },
  "denied-boarding-overbooking": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1400&q=82",
    alt: "Aircraft taking off at sunset",
    position: "center",
  },
  "extraordinary-circumstances": {
    src: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=1400&q=82",
    alt: "Aircraft wing over cloudy sky",
    position: "center",
  },
  "eu261-ecaa-serbia": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1400&q=82",
    alt: "European city and airport travel context",
    position: "center",
  },
  "documents-for-claim": {
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=82",
    alt: "Travel documents and paperwork on a desk",
    position: "center",
  },
  "refund-vs-compensation": {
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=82",
    alt: "Payment card and documents on a desk",
    position: "center",
  },
  "claim-deadlines": {
    src: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1400&q=82",
    alt: "Calendar and planning notes on a desk",
    position: "center",
  },
  "airport-action-plan": {
    src: "https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=1400&q=82",
    alt: "Airport concourse with passengers walking",
    position: "center",
  },
  "how-to-file-airline-claim": {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=82",
    alt: "Person reviewing documents beside a laptop",
    position: "center",
  },
  "airline-rejected-claim": {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=82",
    alt: "Laptop showing customer support work",
    position: "center",
  },
  "voucher-or-cash-compensation": {
    src: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?auto=format&fit=crop&w=1400&q=82",
    alt: "Cash and receipts on a table",
    position: "center",
  },
  "airline-response-no-answer": {
    src: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=1400&q=82",
    alt: "Email inbox and office workspace",
    position: "center",
  },
  "use-claim-service-or-diy": {
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=82",
    alt: "People discussing paperwork at a meeting table",
    position: "center",
  },
  "claim-template-email": {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1400&q=82",
    alt: "Person typing an email on a laptop",
    position: "center",
  },
};

export const blogArticles: BlogArticle[] = [
  {
    id: "flight-delay-compensation",
    publishedAt: "2026-04-15",
    updatedAt: "2026-04-15",
    sr: {
      slug: "kasnjenje-leta-odsteta",
      title: "Kada kašnjenje leta daje pravo na odštetu",
      description:
        "Praktičan vodič za putnike iz Srbije: kada kašnjenje leta može da znači pravo na naknadu do 600 evra i šta treba proveriti pre slanja zahteva.",
      excerpt:
        "Kašnjenje samo po sebi nije uvek dovoljno. Ključni su trajanje kašnjenja na krajnjoj destinaciji, razlog poremećaja i ruta leta.",
      category: "Kašnjenje leta",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Prag od tri sata je početna tačka",
          body: [
            "Kod EU 261 i srodnih evropskih pravila najvažnije pitanje nije koliko dugo ste čekali na polaznom aerodromu, već koliko ste kasno stigli na krajnju destinaciju. Ako je dolazak bio tri sata ili više nakon planiranog vremena, slučaj vredi proveriti.",
            "Za putnike iz Srbije dodatno je važno da se pogleda cela ruta: odakle je let krenuo, gde je završio, koja aviokompanija je upravljala letom i da li se primenjuje evropski ili lokalni okvir zaštite putnika.",
          ],
        },
        {
          heading: "Nije svako kašnjenje odgovornost aviokompanije",
          body: [
            "Ako je uzrok tehnički problem, operativni propust, kašnjenje posade ili organizacija aviokompanije, postoji realniji osnov za zahtev. Ako je uzrok loše vreme, zatvaranje aerodroma ili odluka kontrole leta, aviokompanija često može da se pozove na vanredne okolnosti.",
            "Zbog toga je dobra praksa da ne zaključujete sami na aerodromu. Sačuvajte informacije koje imate, a zatim proverite slučaj kroz strukturisan intake.",
          ],
        },
        {
          heading: "Koliko može da iznosi naknada",
          body: [
            "Iznosi se najčešće vezuju za dužinu leta i kašnjenje na dolasku. U tipičnim evropskim slučajevima iznosi su 250, 400 ili 600 evra po putniku.",
            "Cena karte nije presudna za fiksnu naknadu. Putnik sa jeftinom kartom i putnik sa skupljom kartom mogu imati isto pravo ako su okolnosti leta iste.",
          ],
          bullets: [
            "do 1.500 km: tipično do 250 evra",
            "1.500-3.500 km: tipično do 400 evra",
            "duže rute: u određenim slučajevima do 600 evra",
          ],
        },
        {
          heading: "Šta odmah sačuvati",
          body: [
            "Najkorisniji dokazi su boarding pass, booking confirmation, broj leta, datum, poruke od aviokompanije i realno vreme dolaska. Ako ste dobili vaučere, hotel ili alternativni let, sačuvajte i to.",
            "Ako niste sigurni da li imate pravo, dovoljno je da unesete osnovne podatke. Ručna provera može kasnije tražiti dodatne dokumente.",
          ],
        },
      ],
    },
    en: {
      slug: "flight-delay-compensation",
      title: "When a delayed flight can lead to compensation",
      description:
        "A practical guide to flight delay compensation: when the three-hour rule matters, what airlines can defend, and what evidence passengers should keep.",
      excerpt:
        "A delay is not enough by itself. The real questions are arrival delay, route coverage, airline responsibility, and evidence.",
      category: "Flight delay",
      readTime: "2 min read",
      sections: [
        {
          heading: "The three-hour threshold matters",
          body: [
            "For European passenger-rights claims, the key timing point is usually your arrival at the final destination. A delay of three hours or more at arrival is the point where a compensation check becomes worthwhile.",
            "The departure airport, arrival airport, operating airline, and booking structure can all change the legal analysis. That is why the route should be reviewed before assuming a case is eligible.",
          ],
        },
        {
          heading: "The airline must usually be responsible",
          body: [
            "Operational failures, technical issues, crew scheduling problems, and airline-controlled disruption can support a claim. Severe weather, airport closures, and air traffic control restrictions are often treated differently.",
            "Passengers should avoid relying only on the first explanation they hear at the gate. Airline messages, delay notices, and final arrival time all help with a cleaner review.",
          ],
        },
        {
          heading: "Typical compensation amounts",
          body: [
            "European fixed compensation is usually linked to flight distance, not the ticket price. In many standard cases, amounts fall into the 250, 400, or 600 euro bands.",
            "The amount is not guaranteed before the facts are checked, but the fixed-band structure makes delay claims easier to assess than many passengers expect.",
          ],
          bullets: [
            "short flights: often up to EUR 250",
            "medium routes: often up to EUR 400",
            "longer qualifying routes: in some cases up to EUR 600",
          ],
        },
        {
          heading: "What to keep after a delay",
          body: [
            "Keep the boarding pass, booking confirmation, flight number, travel date, airline messages, and proof of actual arrival time. If the airline provided meals, hotel accommodation, or rerouting, keep those records too.",
            "A first check can start with basic flight details. More evidence can be added later if the case appears worth pursuing.",
          ],
        },
      ],
    },
  },
  {
    id: "cancelled-flight-rights",
    publishedAt: "2026-04-16",
    updatedAt: "2026-04-16",
    sr: {
      slug: "otkazan-let-prava-putnika",
      title: "Otkazan let: kada imate pravo na refundaciju i odštetu",
      description:
        "Šta putnik treba da zna kada aviokompanija otkaže let: refundacija, preusmeravanje, rok od 14 dana i moguća naknada.",
      excerpt:
        "Kod otkazanog leta postoje dva odvojena pitanja: šta se dešava sa kartom i da li postoji dodatna novčana odšteta.",
      category: "Otkazan let",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Refundacija nije isto što i odšteta",
          body: [
            "Kada je let otkazan, aviokompanija obično mora da ponudi refundaciju ili alternativni prevoz. To je pitanje vaše karte. Odšteta je dodatno pravo koje zavisi od razloga otkazivanja i vremena kada ste obavešteni.",
            "Zato putnici često dobiju povraćaj novca za kartu, ali ne znaju da još uvek mogu imati osnov za dodatnu naknadu.",
          ],
        },
        {
          heading: "Rok od 14 dana je važan",
          body: [
            "Ako ste o otkazivanju obavešteni dovoljno rano, aviokompanija često ima jaču odbranu od zahteva za naknadu. Ako je obaveštenje stiglo kasno, posebno u poslednje dve nedelje pred put, slučaj treba proveriti detaljnije.",
            "Ipak, nije dovoljno gledati samo datum poruke. Bitno je i da li je ponuđen alternativni let i koliko je taj let pomerio vaš planirani dolazak.",
          ],
        },
        {
          heading: "Alternativni let ne briše automatski pravo",
          body: [
            "Ako prihvatite preusmeravanje, to ne znači da ste se automatski odrekli svih prava. U zavisnosti od vremena polaska i dolaska alternativnog leta, zahtev za naknadu može i dalje postojati.",
            "Sačuvajte staru i novu potvrdu leta, jer poređenje tih podataka često odlučuje ishod.",
          ],
        },
        {
          heading: "Kada zahtev obično slabi",
          body: [
            "Zahtev je slabiji ako je otkazivanje nastalo zbog okolnosti van kontrole aviokompanije, kao što su ozbiljni vremenski uslovi, bezbednosne odluke ili zatvaranje aerodroma.",
            "To ne znači da nemate pravo na brigu, refundaciju ili preusmeravanje. Samo znači da dodatna fiksna naknada može biti sporna.",
          ],
        },
      ],
    },
    en: {
      slug: "cancelled-flight-rights",
      title: "Cancelled flight: refund, rerouting, and compensation",
      description:
        "Understand the difference between ticket refunds and flight cancellation compensation, including timing, rerouting, and airline responsibility.",
      excerpt:
        "A cancelled flight creates two separate questions: what happens to your ticket, and whether you may also claim fixed compensation.",
      category: "Cancelled flight",
      readTime: "2 min read",
      sections: [
        {
          heading: "Refund and compensation are different rights",
          body: [
            "When a flight is cancelled, the airline will often need to offer reimbursement or rerouting. That solves the ticket problem. Compensation is a separate question and depends on timing, cause, and the alternative journey offered.",
            "Many passengers stop after receiving a refund, even though the cancellation may still deserve a separate compensation review.",
          ],
        },
        {
          heading: "The 14-day window matters",
          body: [
            "If the airline informed passengers well in advance, the compensation case is usually weaker. Late cancellation notices, especially inside the final two weeks before departure, should be checked more carefully.",
            "The alternative flight also matters. A rerouting option that keeps your schedule close to the original plan is different from one that causes a major disruption.",
          ],
        },
        {
          heading: "Rerouting does not automatically end the claim",
          body: [
            "Accepting a replacement flight does not always remove the right to compensation. The timing of the new departure and arrival can still leave room for a claim.",
            "Keep both the original booking and the replacement itinerary, because the comparison is often central to the assessment.",
          ],
        },
        {
          heading: "When cancellation claims become harder",
          body: [
            "Claims are usually harder when the airline can prove extraordinary circumstances, such as severe weather, security restrictions, or airport closure.",
            "Even then, passengers may still have rights to care, rerouting, or ticket reimbursement. Those rights should not be confused with fixed compensation.",
          ],
        },
      ],
    },
  },
  {
    id: "missed-connection",
    publishedAt: "2026-04-17",
    updatedAt: "2026-04-17",
    sr: {
      slug: "propustena-konekcija-ista-rezervacija",
      title: "Propuštena konekcija: kada se računa kao jedan slučaj",
      description:
        "Zašto je ista rezervacija ključna kod propuštene konekcije i kada kašnjenje na krajnjoj destinaciji može da donese naknadu.",
      excerpt:
        "Kod konekcija se ne gleda samo let koji kasni, već ceo put i dolazak na krajnju destinaciju.",
      category: "Konekcije",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Ista rezervacija je prvo pitanje",
          body: [
            "Propuštena konekcija najčešće ima smisla za zahtev kada su segmenti puta kupljeni zajedno, pod jednom rezervacijom. Tada se put posmatra kao celina, a ne kao dva nepovezana leta.",
            "Ako ste sami kupili dve odvojene karte, aviokompanija sa prvog leta obično ne odgovara za drugi let na isti način.",
          ],
        },
        {
          heading: "Bitno je kašnjenje na finalnoj destinaciji",
          body: [
            "Kod missed connection slučajeva presudno je koliko ste zakasnili na krajnju destinaciju. Prvi let može kasniti samo 45 minuta, ali ako zbog toga promašite jedini sledeći let i stignete dan kasnije, slučaj vredi proveriti.",
            "Zato uvek beležite realno vreme dolaska na poslednji aerodrom iz rezervacije.",
          ],
        },
        {
          heading: "Aviokompanija mora da bude uzrok",
          body: [
            "Ako ste konekciju propustili jer je prethodni let kasnio, otkazan je ili ste bili odbijeni zbog overbookinga, postoji potencijalni osnov. Ako ste zakasnili na gate iz ličnih razloga, osnov je mnogo slabiji.",
            "U praksi treba proveriti boarding dokumenta, novu kartu, poruke aviokompanije i razlog prvog poremećaja.",
          ],
        },
        {
          heading: "Šta tražiti od aviokompanije",
          body: [
            "Aviokompanija treba da vas prebaci do krajnje destinacije i, kada čekanje traje, obezbedi osnovnu brigu: obroke, komunikaciju, a ponekad hotel i transfer.",
            "Ta prava postoje odvojeno od eventualne novčane naknade, pa ih ne treba mešati.",
          ],
        },
      ],
    },
    en: {
      slug: "missed-connection-same-booking",
      title: "Missed connection: when the whole journey matters",
      description:
        "A guide to missed connection compensation, same-booking rules, arrival delay, rerouting, and evidence.",
      excerpt:
        "Missed connection claims are usually about the full itinerary, not just the delayed first leg.",
      category: "Connections",
      readTime: "2 min read",
      sections: [
        {
          heading: "The same booking is the starting point",
          body: [
            "A missed connection is usually stronger when all flight segments were bought together under one booking reference. In that case, the journey can be reviewed as one connected trip.",
            "If the passenger bought separate tickets independently, the first airline may not be responsible for the missed second flight in the same way.",
          ],
        },
        {
          heading: "Final arrival delay is central",
          body: [
            "The delayed flight that causes the missed connection may not be three hours late by itself. What matters is often the delay at the final destination on the original itinerary.",
            "A short delay on the first leg can become a serious claim if it causes a much later arrival at the final destination.",
          ],
        },
        {
          heading: "The disruption must be linked to the airline",
          body: [
            "Potential claims usually involve delay, cancellation, or denied boarding caused by the airline. A missed gate because of personal delay, passport issues, or separate self-transfer is a different situation.",
            "The booking confirmation, boarding pass, new itinerary, and airline messages are all useful evidence.",
          ],
        },
        {
          heading: "Rerouting and care still matter",
          body: [
            "The airline should reroute passengers to their final destination when the connection is missed for airline-controlled reasons. Depending on waiting time, meals, communication, hotel, and transport may also be required.",
            "These practical rights are separate from fixed compensation and should be considered together.",
          ],
        },
      ],
    },
  },
  {
    id: "denied-boarding-overbooking",
    publishedAt: "2026-04-18",
    updatedAt: "2026-04-18",
    sr: {
      slug: "uskraceno-ukrcavanje-overbooking",
      title: "Uskraćeno ukrcavanje i overbooking: šta putnik može da traži",
      description:
        "Šta znači denied boarding, kada overbooking daje pravo na naknadu i zašto ne treba brzopleto potpisivati odricanje od prava.",
      excerpt:
        "Ako ste imali kartu, stigli na vreme i aviokompanija vas ipak nije pustila u avion, slučaj treba proveriti odmah.",
      category: "Denied boarding",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Denied boarding nije isto što i zakasneli putnik",
          body: [
            "Uskraćeno ukrcavanje postoji kada putnik ima važeću kartu, uredno se pojavi na vreme i ipak ne bude primljen na let iz razloga koji dolaze od aviokompanije.",
            "Najpoznatiji primer je overbooking, kada je prodato više mesta nego što avion stvarno ima. Ali mogu postojati i drugi operativni razlozi.",
          ],
        },
        {
          heading: "Ne potpisujte brzo ako ne razumete šta dobijate",
          body: [
            "Aviokompanije ponekad nude vaučer, preusmeravanje ili drugu pogodnost. To može biti korisno, ali putnik treba da razume da li time prihvata nagodbu ili se odriče dela prava.",
            "Sačuvajte sve papire koje dobijete na aerodromu i slikajte uslove ako se nude samo na ekranu ili šalteru.",
          ],
        },
        {
          heading: "Koji dokazi su ključni",
          body: [
            "Najvažnije je dokazati da ste imali pravo da letite i da ste bili na aerodromu na vreme. Boarding pass, check-in potvrda, fotografija table leta i potvrda od osoblja mogu biti korisni.",
            "Ako je razlog overbooking, tražite da se to napiše u potvrdi ili komunikaciji aviokompanije.",
          ],
        },
        {
          heading: "Šta možete tražiti",
          body: [
            "U zavisnosti od rute i okolnosti, putnik može imati pravo na alternativni let, brigu tokom čekanja, refundaciju u određenim situacijama i fiksnu naknadu.",
            "Ovaj tip slučaja često zaslužuje ručnu proveru jer detalji sa aerodroma odlučuju mnogo više nego kod običnog kašnjenja.",
          ],
        },
      ],
    },
    en: {
      slug: "denied-boarding-overbooking",
      title: "Denied boarding and overbooking: what passengers can claim",
      description:
        "What denied boarding means, how overbooking claims work, and why passengers should be careful before accepting vouchers or waivers.",
      excerpt:
        "If you had a ticket, arrived on time, and were still refused boarding, the case should be reviewed carefully.",
      category: "Denied boarding",
      readTime: "2 min read",
      sections: [
        {
          heading: "Denied boarding is not the same as arriving late",
          body: [
            "Denied boarding usually means the passenger had a valid ticket, complied with timing and documentation requirements, and was still not accepted on the flight for an airline-side reason.",
            "Overbooking is the classic example: the airline sold more seats than the aircraft can carry. Other operational reasons can also require review.",
          ],
        },
        {
          heading: "Be careful with vouchers and waivers",
          body: [
            "An airline may offer a voucher, rerouting, or another benefit at the airport. This can be useful, but passengers should understand whether they are accepting a settlement or giving up additional rights.",
            "Keep all documents, receipts, and written explanations. If the information is only shown at the counter, take a photo.",
          ],
        },
        {
          heading: "Evidence matters",
          body: [
            "The key is proving that you were entitled to fly and presented yourself correctly. Boarding documents, check-in confirmation, airport photos, and written confirmation from staff can help.",
            "If overbooking was the reason, ask the airline to confirm that reason in writing.",
          ],
        },
        {
          heading: "What rights may apply",
          body: [
            "Depending on the route and facts, passengers may be entitled to rerouting, care while waiting, reimbursement in some situations, and fixed compensation.",
            "Denied boarding cases often deserve manual review because the details at the airport can decide the outcome.",
          ],
        },
      ],
    },
  },
  {
    id: "extraordinary-circumstances",
    publishedAt: "2026-04-19",
    updatedAt: "2026-04-19",
    sr: {
      slug: "vanredne-okolnosti-let",
      title: "Vanredne okolnosti: kada aviokompanija ne mora da plati",
      description:
        "Loše vreme, kontrola leta, štrajkovi i tehnički kvarovi: šta zaista može biti vanredna okolnost kod zahteva za odštetu.",
      excerpt:
        "Aviokompanije često pominju vanredne okolnosti, ali nije svako objašnjenje automatski dovoljno.",
      category: "Pravna provera",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Šta su vanredne okolnosti",
          body: [
            "Vanredne okolnosti su događaji koje aviokompanija realno nije mogla da izbegne ni uz razumne mere. Tipični primeri su ozbiljno loše vreme, zatvaranje aerodroma, bezbednosni incidenti i određene odluke kontrole leta.",
            "Ako je takav događaj stvarno uzrok kašnjenja ili otkazivanja, fiksna naknada može biti odbijena.",
          ],
        },
        {
          heading: "Tehnički problem nije uvek izgovor",
          body: [
            "Putnici često čuju da je problem bio tehničke prirode. Međutim, redovno održavanje i operativni tehnički kvarovi ne znače automatski vanredne okolnosti.",
            "Važno je šta se tačno desilo i da li aviokompanija može da pokaže da problem nije bio deo normalnog poslovnog rizika.",
          ],
        },
        {
          heading: "Štrajkovi se proveravaju posebno",
          body: [
            "Nije svaki štrajk isti. Štrajk kontrole leta, aerodromskog osoblja ili eksternih službi može imati drugačiji tretman od štrajka zaposlenih same aviokompanije.",
            "Zbog toga treba proveriti datum, aerodrom, aviokompaniju i javno dostupne informacije o poremećaju.",
          ],
        },
        {
          heading: "Šta putnik može da uradi",
          body: [
            "Tražite pisano objašnjenje razloga poremećaja. Ako dobijete samo usmeno objašnjenje, zabeležite vreme, šalter i ime službe ako ga imate.",
            "Čak i kada fiksna naknada nije sigurna, prava na brigu, informacije i preusmeravanje mogu i dalje postojati.",
          ],
        },
      ],
    },
    en: {
      slug: "extraordinary-circumstances-flight",
      title: "Extraordinary circumstances: when airlines may avoid compensation",
      description:
        "A practical explanation of extraordinary circumstances, including weather, air traffic control, strikes, and technical issues.",
      excerpt:
        "Airlines often mention extraordinary circumstances, but the explanation should still be checked against the facts.",
      category: "Legal review",
      readTime: "2 min read",
      sections: [
        {
          heading: "What extraordinary circumstances mean",
          body: [
            "Extraordinary circumstances are events the airline could not reasonably avoid even with appropriate measures. Severe weather, airport closure, security incidents, and some air traffic control restrictions are common examples.",
            "If such an event genuinely caused the disruption, fixed compensation can become difficult.",
          ],
        },
        {
          heading: "Technical issues are not always enough",
          body: [
            "Passengers often hear that a flight was delayed for technical reasons. Routine technical failures and maintenance-related operational issues are not automatically extraordinary.",
            "The details matter: what happened, whether it was part of normal airline operations, and what the airline did to limit the disruption.",
          ],
        },
        {
          heading: "Strikes need separate analysis",
          body: [
            "Not every strike has the same effect on compensation. Air traffic control strikes, airport staff action, and airline employee strikes may be treated differently.",
            "The date, airport, operating airline, and public disruption information can all matter.",
          ],
        },
        {
          heading: "What passengers should do",
          body: [
            "Ask for a written explanation of the disruption. If the explanation is only given verbally, note the time, desk, and staff team if possible.",
            "Even when fixed compensation is uncertain, rights to care, information, and rerouting may still apply.",
          ],
        },
      ],
    },
  },
  {
    id: "eu261-ecaa-serbia",
    publishedAt: "2026-04-20",
    updatedAt: "2026-04-20",
    sr: {
      slug: "eu261-ecaa-srbija-prava-putnika",
      title: "EU 261, ECAA i Srbija: šta znači za putnike",
      description:
        "Jednostavno objašnjenje evropskih pravila o pravima putnika i zašto su važna za letove iz Srbije i ka Srbiji.",
      excerpt:
        "Putnici iz Srbije često nisu sigurni da li evropska pravila važe za njih. Odgovor zavisi od rute, aviokompanije i konkretnog leta.",
      category: "Prava putnika",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Zašto se stalno pominje EU 261",
          body: [
            "EU 261 je najpoznatiji evropski okvir za naknadu putnicima kod kašnjenja, otkazivanja i uskraćenog ukrcavanja. U praksi je postao standard prema kom se proveravaju mnogi međunarodni slučajevi.",
            "Za putnike iz Srbije posebno je važno razumeti da se ne gleda samo državljanstvo putnika, već ruta i aviokompanija.",
          ],
        },
        {
          heading: "ECAA je važan za region",
          body: [
            "Srbija je deo šireg evropskog vazduhoplovnog okvira kroz ECAA aranžmane, što čini prava putnika relevantnim i za lokalni kontekst.",
            "To ne znači da je svaki let automatski pokriven na isti način kao čisti EU let. Zato je intake zasnovan na ruti i operateru, ne na pretpostavci.",
          ],
        },
        {
          heading: "Tipična pitanja za proveru",
          body: [
            "Kod svakog slučaja treba proveriti gde je let poleteo, gde je sleteo, koja aviokompanija je upravljala letom, koliki je bio dolazak u kašnjenju i koji je razlog poremećaja.",
            "Tek kombinacija tih elemenata daje smislen preliminarni zaključak.",
          ],
          bullets: [
            "polazak iz EU ili povezane evropske zone",
            "dolazak u EU sa evropskim prevoznikom",
            "let iz Srbije ili ka Srbiji sa relevantnim regionalnim pravilima",
          ],
        },
        {
          heading: "Zašto lokalni servis pomaže",
          body: [
            "Strani claim servisi često rade široko, ali ne objašnjavaju lokalni kontekst. Putniku iz Srbije je važno da dobije razumljiv sledeći korak i komunikaciju na jeziku koji koristi.",
            "Zato je cilj letkasni.rs da prvo primi podatke, konzervativno proveri osnov i po potrebi prebaci slučaj na ručni pregled.",
          ],
        },
      ],
    },
    en: {
      slug: "eu261-ecaa-serbia-passenger-rights",
      title: "EU 261, ECAA, and Serbia: what passengers should know",
      description:
        "How European passenger-rights rules relate to flights connected with Serbia, and why route and airline details matter.",
      excerpt:
        "Passengers connected with Serbia often need a route-based review, not a simple yes-or-no answer.",
      category: "Passenger rights",
      readTime: "2 min read",
      sections: [
        {
          heading: "Why EU 261 is the reference point",
          body: [
            "EU 261 is the best-known European framework for passenger compensation after delays, cancellations, and denied boarding. It shapes how many cross-border flight disruption cases are assessed.",
            "For passengers connected with Serbia, nationality is usually not the main issue. Route, operating airline, and disruption details matter more.",
          ],
        },
        {
          heading: "Why ECAA matters in the region",
          body: [
            "Serbia is connected to the wider European aviation framework through ECAA arrangements, which makes passenger-rights analysis relevant in the local context.",
            "That does not mean every flight is covered in exactly the same way. A reliable review should look at the specific route and operator.",
          ],
        },
        {
          heading: "Questions to check first",
          body: [
            "A useful first review asks where the flight departed, where it arrived, which airline operated it, how late the passenger arrived, and what caused the disruption.",
            "Only the combination of those facts can produce a responsible initial assessment.",
          ],
          bullets: [
            "departure from the EU or related European area",
            "arrival into the EU with a qualifying carrier",
            "Serbia-related flights that may require regional analysis",
          ],
        },
        {
          heading: "Why local handling helps",
          body: [
            "Large international claim companies cover many markets, but local context and language still matter. Passengers need clear next steps, not only a generic eligibility message.",
            "The goal of letkasni.rs is to collect the key facts, avoid overpromising, and route unclear cases to manual review.",
          ],
        },
      ],
    },
  },
  {
    id: "documents-for-claim",
    publishedAt: "2026-04-21",
    updatedAt: "2026-04-21",
    sr: {
      slug: "dokumenti-za-avio-odstetu",
      title: "Koji dokumenti su potrebni za zahtev za avio-odštetu",
      description:
        "Lista dokumenata i dokaza koje treba sačuvati posle kašnjenja, otkazivanja, propuštene konekcije ili overbookinga.",
      excerpt:
        "Za prvi korak često je dovoljno nekoliko osnovnih podataka, ali dobar dokazni trag kasnije ubrzava slučaj.",
      category: "Dokumenta",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Osnovni podaci su dovoljni za prvu proveru",
          body: [
            "Za početni intake najčešće su dovoljni broj leta, datum, ruta, tip problema i kontakt podaci. To omogućava da se slučaj preliminarno klasifikuje.",
            "Ako slučaj ima smisla, kasnije se traže dokumenti koji potvrđuju rezervaciju i sam poremećaj.",
          ],
        },
        {
          heading: "Najvažniji dokumenti",
          body: [
            "Najkorisniji su booking confirmation, boarding pass, elektronska karta i sve poruke koje ste dobili od aviokompanije ili agencije.",
            "Ako ste dobili alternativni let, čuvajte i novu kartu, jer se često poredi originalno i stvarno vreme dolaska.",
          ],
          bullets: [
            "booking reference ili potvrda rezervacije",
            "boarding pass ili check-in potvrda",
            "email/SMS obaveštenja od aviokompanije",
            "računi za obroke, hotel ili transport ako nisu obezbeđeni",
          ],
        },
        {
          heading: "Fotografije mogu pomoći",
          body: [
            "Fotografija table odlazaka, gate obaveštenja ili poruke u aplikaciji može biti korisna ako kasnije treba dokazati šta se događalo na aerodromu.",
            "Ne morate sve imati savršeno. Važno je da imate dovoljno tačaka koje potvrđuju let, datum i posledice poremećaja.",
          ],
        },
        {
          heading: "Šta ako nemate boarding pass",
          body: [
            "Nedostatak boarding pass-a ne znači automatski kraj. Potvrda rezervacije, email od aviokompanije, račun za kartu ili istorija putovanja mogu pomoći.",
            "U takvom slučaju je bolje poslati slučaj na proveru nego ga unapred odbaciti.",
          ],
        },
      ],
    },
    en: {
      slug: "documents-for-flight-compensation-claim",
      title: "Documents needed for a flight compensation claim",
      description:
        "What passengers should keep after a delayed, cancelled, overbooked, or missed-connection flight.",
      excerpt:
        "A first check can start with basic details, but strong evidence makes the later claim process easier.",
      category: "Documents",
      readTime: "2 min read",
      sections: [
        {
          heading: "Basic details are enough to start",
          body: [
            "A first review usually needs flight number, date, route, issue type, and contact details. That is enough to classify the case initially.",
            "If the case looks viable, supporting documents can be requested later.",
          ],
        },
        {
          heading: "The most useful records",
          body: [
            "Booking confirmation, boarding pass, e-ticket, and messages from the airline or travel agency are the most helpful records.",
            "If the airline rerouted you, keep the new itinerary as well because original and actual arrival times often need to be compared.",
          ],
          bullets: [
            "booking reference or reservation confirmation",
            "boarding pass or check-in confirmation",
            "email or SMS notices from the airline",
            "receipts for meals, hotel, or transport if not provided",
          ],
        },
        {
          heading: "Photos can help",
          body: [
            "A photo of the departure board, gate notice, or airline app message can help show what happened at the airport.",
            "The evidence does not have to be perfect. It should confirm the flight, date, disruption, and practical consequences.",
          ],
        },
        {
          heading: "If the boarding pass is missing",
          body: [
            "A missing boarding pass does not automatically end the case. Booking confirmation, airline emails, payment records, or travel history may still help.",
            "In that situation, it is usually better to submit the case for review than to reject it too early.",
          ],
        },
      ],
    },
  },
  {
    id: "refund-vs-compensation",
    publishedAt: "2026-04-22",
    updatedAt: "2026-04-22",
    sr: {
      slug: "refundacija-karte-ili-odsteta",
      title: "Refundacija karte ili odšteta: u čemu je razlika",
      description:
        "Zašto povraćaj novca za kartu i fiksna naknada nisu isto, i kada putnik može imati pravo na oba.",
      excerpt:
        "Refundacija vraća vrednost karte. Odšteta nadoknađuje poremećaj putovanja kada su ispunjeni uslovi.",
      category: "Prava putnika",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Refundacija rešava kartu",
          body: [
            "Refundacija znači da vam se vraća novac za kartu ili deo karte koji nije iskorišćen. To je najčešće relevantno kod otkazivanja, velikog kašnjenja ili situacije kada put više nema svrhu.",
            "Refundacija nije nagrada niti kazna za aviokompaniju. Ona vraća plaćenu uslugu koju niste dobili ili više ne možete smisleno koristiti.",
          ],
        },
        {
          heading: "Odšteta je odvojena stvar",
          body: [
            "Fiksna odšteta zavisi od pravila o zaštiti putnika, dužine leta, kašnjenja na dolasku i odgovornosti aviokompanije. Ona može postojati čak i kada ste preusmereni ili kada je karta rešena.",
            "Zato odgovor korisničke podrške o refundaciji ne znači automatski da nema prava na naknadu.",
          ],
        },
        {
          heading: "Kada mogu postojati oba prava",
          body: [
            "Kod otkazanog leta ili velikog poremećaja moguće je da putnik ima pravo na određenu obradu karte i dodatnu naknadu. Detalji zavise od vremena obaveštenja, ponuđene alternative i razloga poremećaja.",
            "To je razlog zašto se slučaj ne zaključuje samo na osnovu toga da li je karta vraćena.",
          ],
        },
        {
          heading: "Šta ne treba mešati",
          body: [
            "Vaučer, refundacija, preusmeravanje, briga na aerodromu i fiksna naknada su različite kategorije. Mogu se preklapati, ali imaju različite uslove.",
            "Dobar zahtev jasno razdvaja šta traži i na osnovu čega.",
          ],
        },
      ],
    },
    en: {
      slug: "refund-vs-flight-compensation",
      title: "Refund vs compensation: what is the difference?",
      description:
        "Understand why ticket refunds and fixed flight compensation are different, and when passengers may be entitled to both.",
      excerpt:
        "A refund concerns the ticket. Compensation concerns the disruption and airline responsibility.",
      category: "Passenger rights",
      readTime: "2 min read",
      sections: [
        {
          heading: "Refunds deal with the ticket",
          body: [
            "A refund returns the price of the ticket or the unused part of the journey. It is often relevant after cancellation, long delay, or when the trip no longer serves its original purpose.",
            "A refund is not the same as compensation. It addresses the service that was not used or no longer useful.",
          ],
        },
        {
          heading: "Compensation is separate",
          body: [
            "Fixed compensation depends on passenger-rights rules, flight distance, arrival delay, and airline responsibility. It can still be relevant even when the ticket issue has been handled.",
            "An airline response about refund processing does not automatically answer the compensation question.",
          ],
        },
        {
          heading: "When both may apply",
          body: [
            "After a cancellation or serious disruption, a passenger may have ticket-related rights and a separate compensation claim. The outcome depends on notice timing, alternative travel, and disruption cause.",
            "That is why a case should not be closed simply because a refund was paid.",
          ],
        },
        {
          heading: "Do not mix categories",
          body: [
            "Voucher, refund, rerouting, airport care, and fixed compensation are different categories. They can overlap, but they do not have the same conditions.",
            "A strong claim separates what is being requested and why.",
          ],
        },
      ],
    },
  },
  {
    id: "claim-deadlines",
    publishedAt: "2026-04-23",
    updatedAt: "2026-04-23",
    sr: {
      slug: "rokovi-za-avio-odstetu",
      title: "Koliko dugo posle leta možete tražiti odštetu",
      description:
        "Rokovi za avio-odštetu nisu isti u svakoj državi. Evo zašto reklamaciju treba poslati brzo, čak i kada stariji let možda još vredi proveriti.",
      excerpt:
        "Stariji let ne znači automatski da je kasno, ali prvi korak ne treba odlagati: kod reklamacije avio-kompaniji lokalni rok može biti znatno kraći.",
      category: "Rokovi",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Ne postoji jedan univerzalni rok",
          body: [
            "Putnici često čuju da mogu tražiti odštetu za letove iz poslednje tri godine. To je korisno pravilo za orijentaciju kod mnogih međunarodnih servisa, ali nije univerzalno za svaku državu, svaku rutu i svaki tip postupka.",
            "Treba razlikovati reklamaciju avio-kompaniji, žalbu nadležnom telu i eventualni sudski postupak. Ti koraci ne moraju imati isti rok.",
          ],
        },
        {
          heading: "Za Srbiju je bitan brz prvi korak",
          body: [
            "Za letove koji se vode kroz pravila i praksu u Srbiji, reklamaciju avio-prevozniku treba poslati što pre. U lokalnim objašnjenjima prava putnika često se navodi rok od 90 dana od dana kada je let obavljen ili kada je trebalo da bude obavljen.",
            "Ako prevoznik ne odgovori ili odbije reklamaciju, često se pominje rok od 60 dana za odgovor pre daljeg obraćanja Direktoratu. Zbog toga je loše čekati samo zato što ste negde pročitali duži rok zastarelosti.",
          ],
        },
        {
          heading: "Šta ubrzava proveru",
          body: [
            "Najbrže se proveravaju slučajevi gde postoje broj leta, datum, ruta i osnovna dokumentacija. Što je let stariji, to je važnije da imate dokaz o rezervaciji i poremećaju.",
            "Ako nemate sve dokumente, i dalje možete poslati osnovne podatke za preliminarnu procenu.",
          ],
        },
        {
          heading: "Ne čekajte nepotrebno",
          body: [
            "Iako neki dalji postupci mogu imati duže rokove, najbolje je reagovati ranije. Poruke, evidencije, boarding pass i sećanja na detalje lakše je prikupiti ubrzo nakon leta.",
            "Ako slučaj deluje dobar, raniji intake smanjuje rizik da nešto važno nestane.",
          ],
        },
      ],
    },
    en: {
      slug: "flight-compensation-deadlines",
      title: "How long after a flight can you claim compensation?",
      description:
        "Claim deadlines vary by jurisdiction. Learn why passengers should act quickly even when an older flight may still be worth checking.",
      excerpt:
        "An older flight is not automatically too late, but the first airline complaint step can be much shorter than broad limitation-period summaries suggest.",
      category: "Deadlines",
      readTime: "2 min read",
      sections: [
        {
          heading: "There is no single global deadline",
          body: [
            "Passengers often hear that claims can be made for flights from the last three years. That is a useful rule of thumb in many contexts, but it is not universal.",
            "Airline complaints, regulator complaints, and court limitation periods can be different steps with different timelines. Applicable law, route, airline, and jurisdiction all matter.",
          ],
        },
        {
          heading: "For Serbia-related handling, act early",
          body: [
            "For claims handled under Serbian passenger-rights practice, the first complaint to the airline is commonly described as a 90-day step from the date of the flight or the date it should have operated.",
            "The airline response window is commonly described as 60 days. That makes early intake important even if a later legal route may still need separate review.",
          ],
        },
        {
          heading: "What makes review easier",
          body: [
            "Flight number, date, route, and booking evidence make older cases easier to review. The older the flight, the more useful written proof becomes.",
            "If not every document is available, a preliminary check can still begin with the core flight details.",
          ],
        },
        {
          heading: "Do not wait unnecessarily",
          body: [
            "Even if a deadline may be longer, early action is better. Messages, boarding documents, receipts, and details are easier to collect soon after the disruption.",
            "A timely intake reduces the risk of losing useful evidence.",
          ],
        },
      ],
    },
  },
  {
    id: "airport-action-plan",
    publishedAt: "2026-04-24",
    updatedAt: "2026-04-24",
    sr: {
      slug: "sta-uraditi-kada-let-kasni",
      title: "Šta da uradite na aerodromu kada let kasni ili je otkazan",
      description:
        "Kratka praktična lista koraka za putnike: šta pitati, šta slikati i šta sačuvati dok ste još na aerodromu.",
      excerpt:
        "Najbolji dokazni trag nastaje dok ste još na aerodromu. Nekoliko minuta organizacije može kasnije mnogo pomoći.",
      category: "Praktični saveti",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Prvo obezbedite putovanje",
          body: [
            "Ako je let otkazan ili ozbiljno kasni, prvo rešavajte praktičan problem: alternativni let, hotel, hranu, transport i komunikaciju. To je važnije od popunjavanja bilo kakvog zahteva na licu mesta.",
            "Pitajte aviokompaniju koje opcije nudi i tražite da vam sve potvrdi pisano ili kroz aplikaciju.",
          ],
        },
        {
          heading: "Zabeležite razlog poremećaja",
          body: [
            "Pitajte za zvaničan razlog kašnjenja ili otkazivanja. Ako dobijete samo usmeno objašnjenje, zapišite ga odmah zajedno sa vremenom i mestom gde ste ga dobili.",
            "Ako objašnjenja nisu dosledna, sačuvajte svaku poruku. Razlike kasnije mogu biti važne.",
          ],
        },
        {
          heading: "Slikajte i čuvajte račune",
          body: [
            "Slikajte tablu leta, gate obaveštenje i sve poruke u aplikaciji. Sačuvajte račune za hranu, piće, hotel ili prevoz ako ste morali sami da platite.",
            "Ne znači da će svaki račun biti refundiran, ali bez računa je refundacija mnogo teža.",
          ],
        },
        {
          heading: "Ne pristajte na nejasne formulare",
          body: [
            "Ako vam nude vaučer ili formular, pročitajte da li se odričete dodatnih prava. Ako nije jasno, fotografišite i sačuvajte pre potpisivanja.",
            "Kada se vratite kući, unesite osnovne podatke o letu i proverite da li postoji osnov za zahtev.",
          ],
        },
      ],
    },
    en: {
      slug: "what-to-do-when-flight-is-delayed-or-cancelled",
      title: "What to do at the airport when your flight is delayed or cancelled",
      description:
        "A practical airport checklist: what to ask, what to photograph, and what to keep after a flight disruption.",
      excerpt:
        "The strongest evidence is often collected while you are still at the airport.",
      category: "Practical tips",
      readTime: "2 min read",
      sections: [
        {
          heading: "Solve the travel problem first",
          body: [
            "If the flight is cancelled or seriously delayed, first deal with the practical issue: rerouting, hotel, meals, transport, and communication.",
            "Ask the airline what it can provide and request confirmation in writing or through the airline app.",
          ],
        },
        {
          heading: "Record the reason for disruption",
          body: [
            "Ask for the official reason for the delay or cancellation. If the explanation is verbal, write it down immediately with the time and place.",
            "If the airline gives inconsistent explanations, keep every message. Differences can matter later.",
          ],
        },
        {
          heading: "Photograph notices and keep receipts",
          body: [
            "Take photos of the departure board, gate notice, and airline app messages. Keep receipts for meals, drinks, hotel, or transport if you paid yourself.",
            "Not every receipt will necessarily be reimbursed, but reimbursement becomes harder without records.",
          ],
        },
        {
          heading: "Be careful with unclear waivers",
          body: [
            "If the airline offers a voucher or form, check whether you are giving up additional rights. If the language is unclear, take a photo before signing.",
            "After the trip, submit the basic flight details for a structured eligibility review.",
          ],
        },
      ],
    },
  },
  {
    id: "how-to-file-airline-claim",
    publishedAt: "2026-04-25",
    updatedAt: "2026-04-25",
    sr: {
      slug: "kako-podneti-reklamaciju-avio-kompaniji",
      title: "Kako podneti reklamaciju avio-kompaniji posle kašnjenja ili otkazivanja",
      description:
        "Korak po korak: koje podatke uneti, šta poslati avio-kompaniji i kako pratiti odgovor na reklamaciju.",
      excerpt:
        "Dobar zahtev nije dugačak. Dobar zahtev je precizan: let, datum, ruta, šta se desilo, šta tražite i dokaz koji to podržava.",
      category: "Procedura",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Prvo skupite osnovne podatke",
          body: [
            "Pre slanja reklamacije pripremite broj leta, datum, aerodrom polaska, aerodrom dolaska, booking reference i kratak opis problema. Ako ste imali konekciju, navedite krajnju destinaciju iz cele rezervacije.",
            "Nije potrebno da pišete roman. Aviokompaniji treba dovoljno informacija da pronađe let i razume osnov zahteva.",
          ],
          bullets: [
            "broj leta i datum",
            "ruta i krajnja destinacija",
            "booking reference ili broj karte",
            "stvarno vreme dolaska ili alternativni itinerary",
          ],
        },
        {
          heading: "Jasno napišite šta tražite",
          body: [
            "Ako tražite fiksnu naknadu zbog kašnjenja, otkazivanja ili uskraćenog ukrcavanja, recite to direktno. Ako tražite refundaciju karte ili nadoknadu troškova, odvojite to kao posebnu stavku.",
            "Mešanje refundacije, vaučera, hotela i fiksne odštete često pravi konfuziju. Bolje je imati tri jasne rečenice nego jednu dugu poruku koja traži sve odjednom.",
          ],
        },
        {
          heading: "Pošaljite preko zvaničnog kanala",
          body: [
            "Većina aviokompanija ima web formular ili portal za reklamacije. Kada pošaljete zahtev, sačuvajte potvrdu i referentni broj. Bez referentnog broja kasnije je teže dokazati da je reklamacija zaista podneta.",
            "Ako šaljete email, sačuvajte poslatu poruku i svaki automatski odgovor koji potvrđuje prijem.",
          ],
        },
        {
          heading: "Pratite rok za odgovor",
          body: [
            "U praksi za Srbiju se često navodi da aviokompanija ima 60 dana da odgovori na kompletnu reklamaciju. Ako nema odgovora ili odgovor nije obrazložen, sledeći korak može biti prijava povrede prava nadležnom telu ili dodatna pravna provera.",
            "Letkasni.rs može pomoći tako što pre slanja ili posle odbijanja pregleda slučaj i razdvoji realne od slabih zahteva.",
          ],
        },
      ],
    },
    en: {
      slug: "how-to-file-airline-compensation-claim",
      title: "How to file an airline compensation claim after a delay or cancellation",
      description:
        "A practical step-by-step guide to preparing, submitting, and tracking an airline compensation claim.",
      excerpt:
        "A strong claim is not long. It is precise: flight, date, route, what happened, what you request, and the evidence.",
      category: "Claim process",
      readTime: "2 min read",
      sections: [
        {
          heading: "Start with the core flight facts",
          body: [
            "Before submitting a claim, prepare the flight number, travel date, departure airport, arrival airport, booking reference, and a short description of the disruption. For connecting journeys, include the final destination on the booking.",
            "The airline needs enough detail to identify the flight and understand the claim. Long emotional explanations rarely help more than precise facts.",
          ],
          bullets: [
            "flight number and date",
            "route and final destination",
            "booking reference or ticket number",
            "actual arrival time or replacement itinerary",
          ],
        },
        {
          heading: "State what you are asking for",
          body: [
            "If you are requesting fixed compensation for delay, cancellation, or denied boarding, say so clearly. If you are also asking for ticket reimbursement or expense reimbursement, separate those requests.",
            "Refunds, vouchers, hotel costs, and fixed compensation are different categories. A clean claim keeps them separate.",
          ],
        },
        {
          heading: "Use the official airline channel",
          body: [
            "Most airlines provide a complaint form or claim portal. After submitting, save the confirmation and reference number. Without a reference number, it is harder to prove the complaint was properly filed.",
            "If you use email, save the sent message and any automatic confirmation.",
          ],
        },
        {
          heading: "Track the response window",
          body: [
            "For Serbia-related handling, airline complaint practice is commonly described around a 60-day response window once complete documentation is submitted. If there is no answer or the rejection is poorly explained, a regulator complaint or legal review may be the next step.",
            "letkasni.rs can help by checking whether the claim is realistic before or after the airline response.",
          ],
        },
      ],
    },
  },
  {
    id: "airline-rejected-claim",
    publishedAt: "2026-04-26",
    updatedAt: "2026-04-26",
    sr: {
      slug: "avio-kompanija-odbila-zahtev",
      title: "Aviokompanija je odbila zahtev: da li je to kraj",
      description:
        "Zašto prvo odbijanje aviokompanije ne mora biti konačno i koje razloge odbijanja treba posebno proveriti.",
      excerpt:
        "Generičko odbijanje nije isto što i pravno utemeljen odgovor. Vredi proveriti šta je stvarno navedeno.",
      category: "Posle odbijanja",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Prvi odgovor često nije kraj",
          body: [
            "Aviokompanije ponekad šalju kratke ili generičke odgovore: vanredne okolnosti, operativni razlozi, bez prava na naknadu. Takav odgovor može biti tačan, ali mora da odgovara činjenicama konkretnog leta.",
            "Vredi proveriti da li je razlog konkretan, da li odgovara datumu i ruti i da li se poklapa sa drugim informacijama o poremećaju.",
          ],
        },
        {
          heading: "Koji odgovori traže dodatnu proveru",
          body: [
            "Posebno treba proveriti odgovore koji samo kažu weather, safety, technical issue ili air traffic restrictions bez detalja. Neki razlozi su validni, ali neki se koriste preširoko.",
            "Ako je poruka štura, sačuvajte je i unesite slučaj za ručni pregled.",
          ],
        },
        {
          heading: "Šta poslati na proveru",
          body: [
            "Pošaljite originalni zahtev, odgovor aviokompanije, broj leta, datum, rutu i dokaze koje imate. Ako ste već dobili alternativni let, dodajte i taj itinerary.",
            "Što je odbijanje konkretnije, lakše je proceniti da li ima smisla nastavljati.",
          ],
        },
        {
          heading: "Kada ne treba insistirati",
          body: [
            "Ako dokumenti jasno pokazuju vanredne okolnosti ili ako ruta nije pokrivena relevantnim pravilima, insistiranje može biti gubljenje vremena.",
            "Dobar servis treba da kaže i kada slučaj nije realan, ne samo kada postoji šansa.",
          ],
        },
      ],
    },
    en: {
      slug: "airline-rejected-compensation-claim",
      title: "The airline rejected your claim: is it over?",
      description:
        "Why an airline's first rejection may not be the final answer, and which explanations deserve a closer look.",
      excerpt:
        "A generic rejection is not the same as a well-supported legal answer.",
      category: "After rejection",
      readTime: "2 min read",
      sections: [
        {
          heading: "The first answer is not always final",
          body: [
            "Airlines sometimes send short or generic responses: extraordinary circumstances, operational reasons, or no right to compensation. That response may be correct, but it should still match the facts of the flight.",
            "A useful review checks whether the reason is specific, whether it fits the flight date and route, and whether other information supports it.",
          ],
        },
        {
          heading: "Which explanations need a closer look",
          body: [
            "Responses that simply say weather, safety, technical issue, or air traffic restrictions without detail should be reviewed carefully. Some reasons are valid; others are used too broadly.",
            "If the message is vague, keep it and submit the case for manual review.",
          ],
        },
        {
          heading: "What to provide",
          body: [
            "Send the original claim, airline response, flight number, date, route, and available evidence. If the airline rerouted you, include that itinerary too.",
            "The more specific the rejection, the easier it is to decide whether further action makes sense.",
          ],
        },
        {
          heading: "When not to push",
          body: [
            "If records clearly show extraordinary circumstances or the route is not covered by relevant rules, continuing may waste time.",
            "A responsible review should also say when a case is weak, not only when there is a possible claim.",
          ],
        },
      ],
    },
  },
  {
    id: "voucher-or-cash-compensation",
    publishedAt: "2026-04-27",
    updatedAt: "2026-04-27",
    sr: {
      slug: "vaucer-ili-novac-avio-kompanija",
      title: "Vaučer ili novac: šta proveriti pre nego što prihvatite ponudu",
      description:
        "Aviokompanija može ponuditi vaučer, milje ili preusmeravanje. Evo kada to ima smisla i kada treba proveriti da li se odričete prava.",
      excerpt:
        "Vaučer može biti koristan, ali problem nastaje ako prihvatate nešto nejasno i time zatvarate veći zahtev.",
      category: "Nagodba",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Vaučer nije automatski loš",
          body: [
            "Ako vam aviokompanija nudi vaučer koji vam stvarno odgovara, to može biti praktično rešenje. Problem nije vaučer kao takav, već uslovi koji ga prate.",
            "Pre prihvatanja proverite iznos, rok važenja, da li je prenosiv, za koje rute važi i da li prihvatanjem potvrđujete da je slučaj zaključen.",
          ],
        },
        {
          heading: "Pazite na odricanje od prava",
          body: [
            "Neki formulari ili nagodbe mogu sadržati klauzulu da prihvatanjem ponude nemate dalje potraživanje. To je važan signal da prvo treba razumeti vrednost svog slučaja.",
            "Ako niste sigurni, sačuvajte ponudu i uslove, pa proverite slučaj pre klika na accept.",
          ],
        },
        {
          heading: "Novac je često čistiji",
          body: [
            "Fiksna naknada, kada postoji, obično se izražava u novcu. Novac ne zavisi od toga da li ćete opet leteti istom kompanijom ili da li ćete stići da iskoristite vaučer.",
            "Zato putnik treba da uporedi realnu vrednost vaučera sa potencijalnom novčanom naknadom.",
          ],
        },
        {
          heading: "Šta sačuvati",
          body: [
            "Sačuvajte screenshot ponude, uslove korišćenja, email potvrdu i sve što pokazuje da li se odričete daljih prava. Ti detalji kasnije odlučuju da li ima prostora za nastavak.",
            "Ako ponuda deluje manja od onoga što biste mogli da tražite, slučaj vredi proveriti pre prihvatanja.",
          ],
        },
      ],
    },
    en: {
      slug: "airline-voucher-or-cash-compensation",
      title: "Voucher or cash: what to check before accepting an airline offer",
      description:
        "Airlines may offer vouchers, miles, or rerouting. Learn when that can work and when it may close a stronger claim.",
      excerpt:
        "A voucher can be useful. The risk is accepting unclear terms that close a better cash claim.",
      category: "Settlement",
      readTime: "2 min read",
      sections: [
        {
          heading: "A voucher is not automatically bad",
          body: [
            "If the airline offers a voucher that you genuinely want, it can be a practical solution. The issue is not the voucher itself, but the terms attached to it.",
            "Before accepting, check the amount, expiry date, transferability, eligible routes, and whether acceptance closes the case.",
          ],
        },
        {
          heading: "Watch for waivers",
          body: [
            "Some forms or settlement offers may state that the passenger has no further claim after accepting. That is a sign to understand the value of the case first.",
            "If you are unsure, save the offer and terms, then review the case before clicking accept.",
          ],
        },
        {
          heading: "Cash is often cleaner",
          body: [
            "Fixed compensation, when due, is usually monetary. Cash does not depend on flying with the same airline again or using a voucher before it expires.",
            "Passengers should compare the practical value of the voucher with the possible cash claim.",
          ],
        },
        {
          heading: "What to keep",
          body: [
            "Save screenshots of the offer, terms, confirmation emails, and anything showing whether you waived further rights. Those details can decide whether there is room to continue.",
            "If the offer seems lower than the potential claim, the case is worth checking before acceptance.",
          ],
        },
      ],
    },
  },
  {
    id: "airline-response-no-answer",
    publishedAt: "2026-04-28",
    updatedAt: "2026-04-28",
    sr: {
      slug: "avio-kompanija-ne-odgovara-na-reklamaciju",
      title: "Aviokompanija ne odgovara na reklamaciju: šta je sledeći korak",
      description:
        "Šta uraditi ako avio-kompanija ćuti, traži iste dokumente ili ne daje obrazložen odgovor na zahtev.",
      excerpt:
        "Tišina nije odgovor. Ali sledeći korak je lakši ako imate dokaz kada ste poslali reklamaciju i šta ste tačno poslali.",
      category: "Procedura",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Prvo proverite da li je zahtev kompletan",
          body: [
            "Ako aviokompanija traži dopunu, proverite da li je zahtev zaista nepotpun ili se traže dokumenti koje već ima. Pošaljite ono što razumno nedostaje i sačuvajte potvrdu slanja.",
            "Najčešći problem je što putnik nema referentni broj reklamacije. Bez njega je teže pratiti status.",
          ],
        },
        {
          heading: "Zabeležite vremensku liniju",
          body: [
            "Napravite jednostavnu hronologiju: datum leta, datum reklamacije, datum automatske potvrde, svaka dopuna i svaki odgovor. To kasnije štedi mnogo vremena.",
            "Ako dođe do prijave nadležnom telu ili pravne provere, ta vremenska linija je često prva stvar koja se traži.",
          ],
        },
        {
          heading: "Kada eskalirati",
          body: [
            "Ako avio-prevoznik ne odgovori u roku koji je relevantan za vaš slučaj ili odgovor ne sadrži stvarno obrazloženje, sledeći korak može biti regulatorna prijava, dodatna opomena ili procena za sudski put.",
            "Ne treba eskalirati naslepo. Prvo proverite da li je osnov zahteva realan, jer slanje slabog slučaja dalje troši vreme.",
          ],
        },
        {
          heading: "Kako letkasni.rs pomaže",
          body: [
            "U ovakvom slučaju korisno je da neko pročita celu komunikaciju i kaže šta nedostaje: dokaz, rok, pravni osnov ili samo jasnije formulisan zahtev.",
            "Cilj nije da se svaki slučaj gura po svaku cenu, već da se dobar slučaj ne izgubi zbog loše procedure.",
          ],
        },
      ],
    },
    en: {
      slug: "airline-not-responding-to-compensation-claim",
      title: "The airline is not responding to your claim: what comes next",
      description:
        "What to do if the airline stays silent, keeps asking for the same documents, or gives no clear answer.",
      excerpt:
        "Silence is not an answer. The next step is easier when you can prove what you submitted and when.",
      category: "Claim process",
      readTime: "2 min read",
      sections: [
        {
          heading: "Check whether the claim is complete",
          body: [
            "If the airline asks for more documents, check whether the request is reasonable or whether it is asking for information already provided. Send what is genuinely missing and save proof of submission.",
            "The most common tracking problem is missing the claim reference number.",
          ],
        },
        {
          heading: "Create a timeline",
          body: [
            "Write a simple timeline: flight date, claim date, automatic confirmation, every document update, and every airline response. This saves time later.",
            "If the case moves to a regulator complaint or legal review, the timeline is often the first thing needed.",
          ],
        },
        {
          heading: "When to escalate",
          body: [
            "If the airline does not answer within the relevant response window or gives no real reasoning, the next step may be a regulator complaint, a formal follow-up, or legal assessment.",
            "Escalation should not be automatic. First check whether the claim is strong enough to justify the next step.",
          ],
        },
        {
          heading: "How letkasni.rs helps",
          body: [
            "In this situation, it helps to have someone read the whole communication and identify what is missing: evidence, deadline, legal basis, or simply a clearer claim.",
            "The goal is not to push every case. It is to avoid losing a good case through poor procedure.",
          ],
        },
      ],
    },
  },
  {
    id: "use-claim-service-or-diy",
    publishedAt: "2026-04-29",
    updatedAt: "2026-04-29",
    sr: {
      slug: "servis-za-avio-odstetu-ili-samostalno",
      title: "Da li zahtev slati sami ili preko servisa za avio-odštetu",
      description:
        "Kada ima smisla pokušati samostalno, a kada servis štedi vreme, stres i greške u postupku.",
      excerpt:
        "Jednostavan slučaj možete probati sami. Sporan slučaj traži više discipline: dokaze, rokove, komunikaciju i spremnost na odbijanje.",
      category: "Izbor puta",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Kada ima smisla probati samostalno",
          body: [
            "Ako je let očigledno kasnio više od tri sata, ruta je pokrivena, aviokompanija ne pominje vanredne okolnosti i imate sve dokumente, samostalna reklamacija može biti razumna.",
            "U tom slučaju najvažnije je da zahtev bude jasan i poslat kroz zvaničan kanal.",
          ],
        },
        {
          heading: "Kada servis ima veću vrednost",
          body: [
            "Servis postaje koristan kada je slučaj nejasan: propuštena konekcija, delimično preusmeravanje, sporan razlog otkazivanja, odbijen zahtev ili komunikacija na više jezika.",
            "Vrednost nije samo u slanju formulara. Vrednost je u proceni da li slučaj vredi gurati i šta je sledeći najbolji korak.",
          ],
        },
        {
          heading: "Uporedite cenu i vreme",
          body: [
            "Ako servis radi uz proviziju samo po uspehu, glavno pitanje je da li vam je vredno da deo naplate zamenite za manje posla i bolju proceduru.",
            "Kod letkasni.rs model je postavljen jednostavno: bez troškova unapred i provizija samo ako se slučaj naplati.",
          ],
        },
        {
          heading: "Dobar servis ne obećava sve",
          body: [
            "Ako neko odmah garantuje isplatu bez provere rute, razloga i dokumentacije, to je slab signal. Kod avio-odštete mnogo zavisi od detalja.",
            "Bolji pristup je konzervativna procena, jasno objašnjenje i sledeći korak koji ima smisla.",
          ],
        },
      ],
    },
    en: {
      slug: "flight-compensation-service-or-diy-claim",
      title: "Should you claim yourself or use a flight compensation service?",
      description:
        "When a DIY claim can work and when a claim service can save time, stress, and procedural mistakes.",
      excerpt:
        "A simple case can be handled yourself. A disputed case needs more discipline: evidence, deadlines, communication, and persistence.",
      category: "Claim options",
      readTime: "2 min read",
      sections: [
        {
          heading: "When DIY can make sense",
          body: [
            "If the flight clearly arrived more than three hours late, the route is covered, the airline does not cite extraordinary circumstances, and you have the documents, a DIY claim can be reasonable.",
            "The key is to submit a clear claim through the official airline channel.",
          ],
        },
        {
          heading: "When a service adds value",
          body: [
            "A service becomes more useful when the case is unclear: missed connection, partial rerouting, disputed cancellation reason, rejected claim, or multilingual communication.",
            "The value is not only form submission. The value is assessing whether the case is worth pursuing and what the next best step is.",
          ],
        },
        {
          heading: "Compare cost and time",
          body: [
            "If a service charges only on success, the main question is whether trading part of the recovered amount for less work and better process is worth it.",
            "The letkasni.rs model is simple: no upfront cost and a fee only if the case is recovered.",
          ],
        },
        {
          heading: "A good service does not promise everything",
          body: [
            "If someone guarantees payment before checking route, cause, and documents, that is a weak signal. Flight compensation depends on details.",
            "A better approach is conservative assessment, clear explanation, and a next step that makes sense.",
          ],
        },
      ],
    },
  },
  {
    id: "claim-template-email",
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    sr: {
      slug: "primer-emaila-za-reklamaciju-leta",
      title: "Primer emaila za reklamaciju zbog kašnjenja ili otkazivanja leta",
      description:
        "Jednostavan obrazac poruke koji putnik može prilagoditi kada se obraća avio-kompaniji.",
      excerpt:
        "Najbolji email za reklamaciju je kratak, formalan i pun konkretnih podataka. Bez pretnji, bez viška emocija.",
      category: "Obrasci",
      readTime: "2 min čitanja",
      sections: [
        {
          heading: "Šta email mora da sadrži",
          body: [
            "Email treba da sadrži podatke o letu, kratak opis poremećaja, šta tražite i spisak dokaza u prilogu. Ako tražite fiksnu naknadu, navedite da zahtev podnosite zbog kašnjenja, otkazivanja ili uskraćenog ukrcavanja.",
            "Ne morate citirati zakon u deset pasusa. Preciznost je važnija od dužine.",
          ],
        },
        {
          heading: "Primer poruke",
          body: [
            "Poštovani, podnosim reklamaciju za let [broj leta] na relaciji [od-do], planiran za [datum]. Let je [kasnio/otkazan/preusmeren], a na krajnju destinaciju sam stigao/la [koliko kasno] u odnosu na planirano vreme.",
            "Molim vas da proverite osnov za fiksnu naknadu i dostavite obrazložen odgovor. U prilogu šaljem potvrdu rezervacije, boarding pass i dostupnu komunikaciju o poremećaju. Molim potvrdu prijema reklamacije i referentni broj.",
          ],
        },
        {
          heading: "Šta dodati ako tražite troškove",
          body: [
            "Ako ste sami platili obrok, hotel ili transport jer aviokompanija nije obezbedila brigu, navedite to odvojeno i priložite račune.",
            "Jasno razdvojite fiksnu naknadu od refundacije troškova. To smanjuje rizik da podrška odgovori samo na jedan deo zahteva.",
          ],
        },
        {
          heading: "Šta izbegavati",
          body: [
            "Izbegavajte pretnje, uvrede i duge opise putovanja. Ako slučaj kasnije ide u ručnu proveru, bolje je da komunikacija izgleda uredno i profesionalno.",
            "Ako niste sigurni da li je slučaj jak, prvo unesite osnovne podatke na letkasni.rs i dobijte smer.",
          ],
        },
      ],
    },
    en: {
      slug: "flight-compensation-claim-email-template",
      title: "Flight delay or cancellation claim email template",
      description:
        "A simple email structure passengers can adapt when contacting an airline after a disruption.",
      excerpt:
        "The best claim email is short, formal, and specific. No threats, no extra drama.",
      category: "Templates",
      readTime: "2 min read",
      sections: [
        {
          heading: "What the email should include",
          body: [
            "The email should include flight details, a short description of the disruption, what you request, and a list of attached evidence. If you request fixed compensation, state whether the issue was delay, cancellation, or denied boarding.",
            "You do not need to quote pages of law. Precision is more useful than length.",
          ],
        },
        {
          heading: "Sample message",
          body: [
            "Dear Sir or Madam, I am submitting a claim for flight [flight number] from [from-to], scheduled on [date]. The flight was [delayed/cancelled/rerouted], and I arrived at my final destination [delay length] later than scheduled.",
            "Please review my eligibility for fixed compensation and provide a reasoned response. I attach my booking confirmation, boarding pass, and available disruption messages. Please confirm receipt and provide a claim reference number.",
          ],
        },
        {
          heading: "If you also claim expenses",
          body: [
            "If you paid for meals, hotel, or transport because the airline did not provide care, mention that separately and attach receipts.",
            "Separate fixed compensation from expense reimbursement. This reduces the risk that support answers only one part of the claim.",
          ],
        },
        {
          heading: "What to avoid",
          body: [
            "Avoid threats, insults, and long emotional explanations. If the case later needs manual review, clean professional communication helps.",
            "If you are unsure whether the case is strong, submit the basic details through letkasni.rs first.",
          ],
        },
      ],
    },
  },
];

export function getBlogArticles(locale: BlogLocale) {
  return blogArticles.map((article) => ({
    ...article,
    localized: article[locale],
  }));
}

export function getBlogArticleBySlug(locale: BlogLocale, slug: string) {
  return blogArticles.find((article) => article[locale].slug === slug) ?? null;
}

export function getAlternateArticleHref(article: BlogArticle, locale: BlogLocale) {
  return locale === "sr"
    ? `/en/blog/${article.en.slug}`
    : `/blog/${article.sr.slug}`;
}

export function getBlogArticleImage(articleId: string) {
  return articleImages[articleId] ?? articleImages["flight-delay-compensation"];
}

export function getRelatedBlogArticles(article: BlogArticle, locale: BlogLocale, limit = 3) {
  return blogArticles
    .filter((candidate) => candidate.id !== article.id)
    .map((candidate) => ({
      ...candidate,
      localized: candidate[locale],
      score: candidate[locale].category === article[locale].category ? 1 : 0,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
