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
    "id": "flight-delay-compensation",
    "publishedAt": "2026-04-15",
    "updatedAt": "2026-04-15",
    "sr": {
      "slug": "kasnjenje-leta-odsteta",
      "title": "Kada kašnjenje leta daje pravo na odštetu",
      "description": "Praktičan vodič za putnike iz Srbije: kada kašnjenje leta može da znači pravo na naknadu do 600 evra, koja ruta se proverava i koje dokaze treba sačuvati.",
      "excerpt": "Kašnjenje samo po sebi nije dovoljno. Presudni su dolazak na krajnju destinaciju, pokrivenost rute, razlog poremećaja i dokaz da je aviokompanija odgovorna.",
      "category": "Kašnjenje leta",
      "readTime": "5 min čitanja",
      "sections": [
        {
          "heading": "Tri sata se mere na krajnjoj destinaciji",
          "body": [
            "Kod EU 261 i srodnih evropskih pravila najvažnije pitanje nije koliko dugo ste čekali na polaznom aerodromu. Ključno je koliko ste kasno stigli na krajnju destinaciju iz rezervacije. Ako je dolazak bio tri sata ili više nakon planiranog vremena, slučaj vredi proveriti.",
            "To znači da let koji kasni u polasku ne mora automatski da donese odštetu ako je vreme nadoknađeno u letu. Važi i obrnuto: na početku možete kasniti manje od tri sata, ali ako zbog toga propustite konekciju i stignete mnogo kasnije, računa se kašnjenje na poslednjem aerodromu iz iste rezervacije.",
            "Zato uvek sačuvajte originalni itinerary, novu kartu ako ste preusmereni i dokaz realnog dolaska. Bez tih podataka teško je tačno izračunati da li je prag pređen."
          ]
        },
        {
          "heading": "Ruta i aviokompanija menjaju odgovor",
          "body": [
            "Za putnike iz Srbije posebno je važno da se pogleda cela ruta: odakle je let krenuo, gde je završio, koja aviokompanija je upravljala letom i da li se primenjuje evropski, ECAA ili drugi okvir zaštite putnika.",
            "Najjednostavniji su letovi koji polaze iz EU, EEA ili zemlje obuhvaćene srodnim pravilima. Kod dolaznih letova presudno može biti da li je prevoznik evropski. Kod putovanja sa konekcijama bitno je da li su segmenti kupljeni zajedno, pod jednom rezervacijom.",
            "Državljanstvo putnika obično nije odlučujuće. Mnogo su važniji aerodromi, operating carrier i način na koji je rezervacija sastavljena."
          ]
        },
        {
          "heading": "Aviokompanija mora da bude odgovorna",
          "body": [
            "Ako je uzrok tehnički problem, operativni propust, raspored posade, kasno okretanje aviona ili druga situacija koju aviokompanija kontroliše, osnov za zahtev je obično jači. To ne znači da je zahtev automatski dobijen, ali postoji razlog da se proveri.",
            "Ako je uzrok ozbiljno loše vreme, zatvaranje piste, bezbednosna odluka, ograničenje kontrole leta ili drugi događaj van kontrole prevoznika, aviokompanija se može pozvati na vanredne okolnosti. Tada fiksna naknada može biti odbijena, iako druga prava putnika mogu ostati.",
            "Ne oslanjajte se samo na prvo usmeno objašnjenje na gejtu. Aviokompanije često daju opšte formulacije kao što su operativni razlozi, rotacija aviona ili kasni dolazak prethodnog leta. Za zahtev je važan konkretan uzrok i veza sa vašim letom."
          ]
        },
        {
          "heading": "Koliko može da iznosi naknada",
          "body": [
            "Iznosi se najčešće vezuju za dužinu leta i kašnjenje na dolasku. U tipičnim evropskim slučajevima fiksna naknada je 250, 400 ili 600 evra po putniku, uz posebna pravila za neke duže rute i preusmeravanja.",
            "Cena karte nije presudna za fiksnu naknadu. Putnik sa jeftinom kartom i putnik sa skupljom kartom mogu imati isto pravo ako su okolnosti leta iste. Važno je i da se naknada računa po putniku, ne po rezervaciji.",
            "Ako vam je aviokompanija ponudila alternativni let koji je stigao relativno blizu planiranog vremena, iznos može biti umanjen ili pravo može otpasti. Zato nije dovoljno znati samo da je let kasnio: mora se uporediti planirani i stvarni dolazak."
          ],
          "bullets": [
            "do 1.500 km: tipično do 250 evra",
            "1.500-3.500 km: tipično do 400 evra",
            "duže rute: u određenim slučajevima do 600 evra"
          ]
        },
        {
          "heading": "Briga tokom čekanja je odvojeno pravo",
          "body": [
            "Čak i kada nije jasno da li imate pravo na fiksnu odštetu, tokom dužeg čekanja možete imati pravo na osnovnu brigu: obroke, osveženje, komunikaciju, a kod noćnog čekanja hotel i transfer.",
            "Ta prava ne treba mešati sa naknadom od 250, 400 ili 600 evra. Refundacija troškova, vaučer za hranu i fiksna odšteta su različite stvari. Ako ste sami platili obrok, hotel ili prevoz jer aviokompanija nije obezbedila pomoć, sačuvajte račune."
          ]
        },
        {
          "heading": "Dokazi koji najviše pomažu",
          "body": [
            "Najkorisniji dokazi su boarding pass, booking confirmation, broj leta, datum, poruke od aviokompanije i realno vreme dolaska. Ako ste dobili vaučere, hotel ili alternativni let, sačuvajte i to.",
            "Fotografija ekrana sa aerodroma, screenshot aplikacije aviokompanije i email o promeni leta mogu biti korisni kada se kasnije utvrđuje trajanje kašnjenja. Ako osoblje kaže razlog kašnjenja, zapišite tačnu formulaciju, vreme i šalter.",
            "Ako niste sigurni da li imate pravo, dovoljno je da unesete osnovne podatke. Ručna provera može kasnije tražiti dodatne dokumente, ali je mnogo lakše kada su dokazi sačuvani istog dana."
          ]
        },
        {
          "heading": "Proverite i šta se desilo posle prvog kašnjenja",
          "body": [
            "Kod ozbiljnijih konkurenata se često naglašava da se ne proverava samo prvi trenutak kašnjenja, već cela posledica po putnika. Ako je prvi let kasnio, zatim ste preusmereni, pa je i novi let kasnio, treba napraviti punu vremensku liniju.",
            "Važno je razlikovati kašnjenje u polasku, kašnjenje u dolasku, vreme provedeno u čekanju i eventualne troškove. Fiksna naknada se najčešće vezuje za dolazak, dok se troškovi hrane, hotela ili transfera dokazuju računima.",
            "Ako aviokompanija tvrdi da je jedan deo kašnjenja bio van njene kontrole, i dalje treba proveriti da li je kasniji deo nastao zbog njene organizacije. Nekad prvi poremećaj nije sporan, ali je sporno zašto je putnik stigao mnogo kasnije nego što je bilo neophodno."
          ]
        }
      ]
    },
    "en": {
      "slug": "flight-delay-compensation",
      "title": "When a flight delay entitles you to compensation",
      "description": "A practical guide for travelers from Serbia: when a flight delay can mean the right to compensation of up to 600 euros, which route is checked and which evidence should be preserved.",
      "excerpt": "Delay in itself is not enough. Arrival at the final destination, coverage of the route, the reason for the disruption and proof that the airline is responsible are crucial.",
      "category": "Flight delay",
      "readTime": "6 min read",
      "sections": [
        {
          "heading": "Three hours are measured at the final destination",
          "body": [
            "With EU 261 and related European rules, the most important question is not how long you waited at the departure airport. The key is how late you arrived at the final destination from the reservation. If the arrival was three hours or more after the scheduled time, the case is worth checking.",
            "This means that a flight that is delayed in departure may not automatically result in compensation if the time is made up in the flight. The reverse is also true: initially you can be less than three hours late, but if you miss a connection and arrive much later, the delay at the last airport from the same booking is counted.",
            "Therefore, always save the original itinerary, a new ticket if you are rerouted and proof of actual arrival. Without such data, it is difficult to accurately calculate whether the threshold has been crossed."
          ]
        },
        {
          "heading": "The route and the airline change the answer",
          "body": [
            "For passengers from Serbia, it is especially important to look at the entire route: where the flight started, where it ended, which airline operated the flight and whether the European, ECAA or other passenger protection framework applies.",
            "The easiest are flights departing from the EU, EEA or countries covered by related rules. In the case of incoming flights, it can be decisive whether the carrier is European. When traveling with connections, it is important whether the segments are purchased together, under one reservation.",
            "The nationality of the passenger is usually not decisive. The airports, operating carrier and the way the reservation was made are much more important."
          ]
        },
        {
          "heading": "The airline must be responsible",
          "body": [
            "If the cause is a technical problem, operational failure, crew schedule, late aircraft turnaround or other situation within the airline's control, the basis for a claim is usually stronger. This does not mean that the request is automatically obtained, but there is a reason to check.",
            "If the cause is severe weather, runway closure, safety decision, flight control restriction or other event beyond the carrier's control, the airline may invoke extraordinary circumstances. Then the fixed charge may be refused, although other passenger rights may remain.",
            "Don't just rely on the first verbal explanation at the gate. Airlines often provide general wording such as operational reasons, aircraft rotation or late arrival of a previous flight. The specific cause and connection to your flight is important for the request."
          ]
        },
        {
          "heading": "How much can the fee be?",
          "body": [
            "The amounts are usually related to the length of the flight and the delay in arrival. In typical European cases the fixed fee is 250, 400 or 600 euros per passenger, with special rules for some longer routes and diversions.",
            "The price of the ticket is not decisive for the fixed fee. A passenger with a cheap ticket and a passenger with a more expensive ticket may have the same right if the circumstances of the flight are the same. It is also important that the fee is calculated per passenger, not per reservation.",
            "If the airline has offered you an alternative flight that arrived relatively close to the scheduled time, the amount may be reduced or the right may be waived. Therefore, it is not enough to know only that the flight was delayed: the planned and actual arrival must be compared."
          ],
          "bullets": [
            "up to 1,500 km: typically up to 250 euros",
            "1,500-3,500 km: typically up to 400 euros",
            "longer routes: in certain cases up to 600 euros"
          ]
        },
        {
          "heading": "Care while waiting is a separate right",
          "body": [
            "Even when it is not clear whether you are entitled to fixed compensation, during a long wait you may be entitled to basic care: meals, refreshments, communication, and in the case of a night wait, hotel and transfer.",
            "These rights should not be confused with a fee of 250, 400 or 600 euros. Reimbursement of expenses, food voucher and fixed compensation are different things. If you paid for a meal, hotel, or transportation yourself because the airline didn't provide assistance, save the receipts."
          ]
        },
        {
          "heading": "Evidence that helps the most",
          "body": [
            "The most useful proofs are the boarding pass, booking confirmation, flight number, date, messages from the airline and real time of arrival. If you received vouchers, a hotel or an alternative flight, keep those too.",
            "A screen shot from the airport, a screenshot of the airline's app, and an email about the flight change can be useful when determining the duration of the delay later. If the staff gives a reason for the delay, write down the exact wording, time and counter.",
            "If you are not sure if you are eligible, it is enough to enter the basic information. A manual check may ask for additional documents later, but is much easier when the evidence is saved on the same day."
          ]
        },
        {
          "heading": "Check also what happened after the first delay",
          "body": [
            "With more serious competitors, it is often emphasized that not only the first moment of delay is checked, but the entire consequence for the passenger. If the first flight was delayed, then you were rerouted, and the new flight was also delayed, a full timeline should be made.",
            "It is important to distinguish between departure delay, arrival delay, time spent waiting and possible costs. A fixed fee is usually linked to arrival, while food, hotel or transfer costs are proven by invoices.",
            "If the airline claims that one part of the delay was beyond its control, it should still be checked whether the later part was caused by its organization. Sometimes the first disturbance is not disputed, but it is disputed why the passenger arrived much later than necessary."
          ]
        }
      ]
    }
  },
  {
    "id": "cancelled-flight-rights",
    "publishedAt": "2026-04-16",
    "updatedAt": "2026-04-16",
    "sr": {
      "slug": "otkazan-let-prava-putnika",
      "title": "Otkazan let: kada imate pravo na refundaciju i odštetu",
      "description": "Šta putnik treba da zna kada aviokompanija otkaže let: izbor između refundacije i preusmeravanja, rok od 14 dana, pravo na brigu i moguća odšteta.",
      "excerpt": "Kod otkazanog leta postoje odvojena prava: karta se rešava kroz refundaciju ili novi let, a dodatna odšteta zavisi od roka obaveštenja, razloga i ponuđene alternative.",
      "category": "Otkazan let",
      "readTime": "5 min čitanja",
      "sections": [
        {
          "heading": "Prvo rešite kartu, zatim proverite odštetu",
          "body": [
            "Kada je let otkazan, aviokompanija obično mora da ponudi izbor: refundaciju karte ili alternativni prevoz do destinacije pod uporedivim uslovima. To je pitanje vaše karte i plana putovanja.",
            "Odšteta je odvojeno pravo. Putnik može dobiti povraćaj novca za kartu, a da i dalje ima osnov za dodatnu fiksnu naknadu ako su ispunjeni uslovi. Isto tako, prihvatanje novog leta ne znači automatski da je zahtev za odštetu nestao.",
            "Zato kod otkazivanja ne treba gledati samo da li je novac vraćen. Treba proveriti kada ste obavešteni, zašto je let otkazan, kakva alternativa je ponuđena i koliko je promenjen dolazak na krajnju destinaciju."
          ]
        },
        {
          "heading": "Rok od 14 dana je važan",
          "body": [
            "Ako ste o otkazivanju obavešteni više od 14 dana pre polaska, aviokompanija često ima jaču odbranu od zahteva za fiksnu naknadu. Ako je obaveštenje stiglo u poslednje dve nedelje pred put, slučaj treba proveriti detaljnije.",
            "Ipak, nije dovoljno gledati samo datum poruke. Bitno je i da li je ponuđen alternativni let, koliko ranije polazi, koliko kasnije stiže i da li vas realno dovodi do iste destinacije u razumnom vremenu.",
            "Ako je obaveštenje stiglo blizu polaska, a alternativa značajno menja plan putovanja, slučaj može biti jači. Ako je alternativa veoma blizu originalnom rasporedu, zahtev može biti slabiji ili iznos može biti drugačiji."
          ]
        },
        {
          "heading": "Alternativni let ne briše automatski pravo",
          "body": [
            "Ako prihvatite preusmeravanje, to ne znači da ste se automatski odrekli svih prava. U zavisnosti od vremena polaska i dolaska alternativnog leta, zahtev za naknadu može i dalje postojati.",
            "Važno je da alternativni prevoz bude do iste krajnje destinacije ili do mesta koje ste prihvatili. Ako vas aviokompanija pošalje na drugi aerodrom u istom regionu, treba proveriti i ko pokriva transfer do prvobitno planiranog aerodroma ili dogovorene adrese.",
            "Sačuvajte staru i novu potvrdu leta, email o otkazivanju, boarding pass za novi let i sve poruke u aplikaciji aviokompanije. Poređenje tih podataka često odlučuje ishod."
          ]
        },
        {
          "heading": "Vanredne okolnosti su najčešća odbrana",
          "body": [
            "Zahtev je slabiji ako je otkazivanje nastalo zbog okolnosti van kontrole aviokompanije, kao što su ozbiljni vremenski uslovi, bezbednosne odluke, zatvaranje aerodroma ili određena ograničenja kontrole leta.",
            "Opšta fraza poput operativni razlozi nije dovoljna da se slučaj odbaci bez provere. Treba znati šta se stvarno desilo i da li je aviokompanija mogla da izbegne posledicu razumnim merama.",
            "To ne znači da nemate pravo na brigu, refundaciju ili preusmeravanje. Samo znači da dodatna fiksna naknada može biti sporna."
          ]
        },
        {
          "heading": "Briga dok čekate novi let",
          "body": [
            "Ako čekate preusmeravanje, aviokompanija u mnogim situacijama mora da obezbedi obroke, osveženje i komunikaciju. Ako je neophodno noćenje, u obzir dolaze hotel i transfer između aerodroma i smeštaja.",
            "Ako pomoć nije ponuđena i morali ste sami da platite osnovne troškove, sačuvajte račune. Ti troškovi nisu isto što i fiksna odšteta, ali mogu biti važni u posebnom delu zahteva.",
            "Nemojte prihvatati vaučer ili formulaciju kojom se odričete daljih potraživanja ako ne razumete šta potpisujete. Vaučer za kartu, povraćaj novca i odšteta nisu ista stvar."
          ]
        },
        {
          "heading": "Šta odmah sačuvati",
          "body": [
            "Sačuvajte potvrdu originalne rezervacije, poruku o otkazivanju, ponuđenu alternativu, novu kartu, boarding pass i sve račune za obroke, hotel ili transfer. Ako ste razgovarali sa osobljem na aerodromu, zapišite vreme i šalter.",
            "Najbolje je da imate jasan niz događaja: kada ste saznali za otkazivanje, šta vam je ponuđeno, šta ste prihvatili i kada ste stvarno stigli. Takva hronologija olakšava proveru i smanjuje prostor za nejasan odgovor aviokompanije."
          ]
        },
        {
          "heading": "Tražite pismenu opciju, ne samo usmeno rešenje",
          "body": [
            "Kod otkazanog leta važno je da putnik dobije jasnu informaciju o izboru: refundacija, preusmeravanje što pre ili preusmeravanje na kasniji datum koji putniku odgovara. Ako se sve rešava na šalteru, tražite email, SMS ili potvrdu u aplikaciji.",
            "Pismeni trag je važan jer kasnije pokazuje kada ste obavešteni, šta vam je ponuđeno i da li ste sami odustali ili je aviokompanija ograničila izbor. To direktno utiče na procenu odštete i refundacije.",
            "Ako vam nude samo vaučer, pitajte da li imate pravo na novčanu refundaciju. Vaučer može biti izbor putnika, ali ne bi trebalo da bude jedina opcija ako pravila daju pravo na povraćaj novca."
          ]
        }
      ]
    },
    "en": {
      "slug": "cancelled-flight-rights",
      "title": "Canceled flight: when you are entitled to a refund and compensation",
      "description": "What a passenger needs to know when an airline cancels a flight: the choice between refund and rerouting, the 14-day period, the right to care and possible compensation.",
      "excerpt": "In the case of a canceled flight, there are separate rights: the ticket is resolved through a refund or a new flight, and additional compensation depends on the notice period, the reason and the offered alternative.",
      "category": "Cancelled flight",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "First settle the ticket, then check the compensation",
          "body": [
            "When a flight is cancelled, the airline usually has to offer a choice: a ticket refund or alternative transportation to the destination under comparable conditions. It's a matter of your ticket and travel plan.",
            "Compensation is a separate right. The passenger can get a refund for the ticket while still being entitled to an additional fixed fee if the conditions are met. Likewise, accepting a new flight does not automatically mean that the claim for compensation has disappeared.",
            "Therefore, when canceling, you should not only look at whether the money has been returned. You should check when you were informed, why the flight was cancelled, what alternative was offered and how much the arrival at the final destination was changed."
          ]
        },
        {
          "heading": "The 14-day period is important",
          "body": [
            "If you are notified of the cancellation more than 14 days before departure, the airline often has a stronger defense against a flat fee claim. If the notification was received in the last two weeks before the trip, the case should be checked in more detail.",
            "However, it is not enough to look only at the date of the message. It is also important whether an alternative flight is offered, how early it departs, how late it arrives, and whether it realistically gets you to the same destination in a reasonable time.",
            "If the notification came close to departure and the alternative significantly changes the travel plan, the case may be stronger. If the alternative is very close to the original schedule, the request may be weaker or the amount may be different."
          ]
        },
        {
          "heading": "An alternate flight does not automatically cancel the right",
          "body": [
            "If you accept a redirect, this does not mean that you have automatically waived all rights. Depending on the departure and arrival time of the alternative flight, the claim for compensation may still exist.",
            "It is important that the alternative transport is to the same final destination or to the place you have accepted. If the airline sends you to another airport in the same region, you should also check who covers the transfer to the originally planned airport or the agreed address.",
            "Save the old and new flight confirmation, cancellation email, boarding pass for the new flight and all messages in the airline app. A comparison of these data often decides the outcome."
          ]
        },
        {
          "heading": "Extraordinary circumstances are the most common defense",
          "body": [
            "The claim is weaker if the cancellation is due to circumstances beyond the airline's control, such as severe weather, security decisions, airport closures or certain flight control restrictions.",
            "A general phrase like operational reasons is not enough to dismiss a case without scrutiny. You need to know what really happened and whether the airline could have avoided the consequences with reasonable measures.",
            "This does not mean that you are not entitled to care, a refund or a referral. It just means that the additional fixed fee may be disputed."
          ]
        },
        {
          "heading": "Worry while waiting for a new flight",
          "body": [
            "If you are waiting for a diversion, in many situations the airline must provide meals, refreshments and communication. If an overnight stay is necessary, a hotel and a transfer between the airport and accommodation are considered.",
            "If no help was offered and you had to pay the basic costs yourself, keep the receipts. Those costs are not the same as fixed damages, but they can be important in a particular part of the claim.",
            "Do not accept a voucher or waiver of further claims if you do not understand what you are signing. Ticket voucher, refund and compensation are not the same thing."
          ]
        },
        {
          "heading": "What to save immediately",
          "body": [
            "Keep the original booking confirmation, cancellation message, alternative offered, new ticket, boarding pass and any meal, hotel or transfer receipts. If you spoke to the staff at the airport, write down the time and counter.",
            "It's best to have a clear sequence of events: when you found out about the cancellation, what you were offered, what you accepted, and when you actually arrived. Such a chronology facilitates verification and reduces the scope for a vague response from the airline."
          ]
        },
        {
          "heading": "Look for a written option, not just an oral solution",
          "body": [
            "In the case of a canceled flight, it is important that the passenger receives clear information about the choice: refund, rerouting as soon as possible or rerouting to a later date that suits the passenger. If everything is handled at the counter, ask for an email, SMS or confirmation in the application.",
            "A written trail is important because it shows later when you were notified, what was offered to you and whether you opted out yourself or the airline limited your choice. This directly affects the assessment of damages and refunds.",
            "If they only offer you a voucher, ask if you are entitled to a cash refund. A voucher may be a passenger's choice, but should not be the only option if the rules allow for a refund."
          ]
        }
      ]
    }
  },
  {
    "id": "missed-connection",
    "publishedAt": "2026-04-17",
    "updatedAt": "2026-04-17",
    "sr": {
      "slug": "propustena-konekcija-ista-rezervacija",
      "title": "Propuštena konekcija: kada se računa kao jedan slučaj",
      "description": "Zašto je ista rezervacija ključna kod propuštene konekcije, kako se računa kašnjenje na krajnjoj destinaciji i šta aviokompanija mora da obezbedi.",
      "excerpt": "Kod konekcija se ne gleda samo prvi let koji kasni, već cela rezervacija, dolazak na krajnju destinaciju i razlog zbog kog je veza propuštena.",
      "category": "Konekcije",
      "readTime": "5 min čitanja",
      "sections": [
        {
          "heading": "Ista rezervacija je prvo pitanje",
          "body": [
            "Propuštena konekcija najčešće ima smisla za zahtev kada su segmenti puta kupljeni zajedno, pod jednom rezervacijom. Tada se put posmatra kao celina, a ne kao dva nepovezana leta.",
            "Ako ste sami kupili dve odvojene karte, aviokompanija sa prvog leta obično ne odgovara za drugi let na isti način. To je česta razlika između protected connection i self-transfer putovanja.",
            "Zato je booking reference jedan od prvih dokaza. Ako su svi segmenti na istom itineraryju, analiza se radi kroz krajnju destinaciju. Ako su karte odvojene, prava mogu postojati samo za pojedinačni let koji je kasnio ili otkazan, ali propušteni sledeći let obično postaje teži za naplatu."
          ]
        },
        {
          "heading": "Bitno je kašnjenje na finalnoj destinaciji",
          "body": [
            "Kod missed connection slučajeva presudno je koliko ste zakasnili na krajnju destinaciju. Prvi let može kasniti samo 45 minuta, ali ako zbog toga promašite jedini sledeći let i stignete dan kasnije, slučaj vredi proveriti.",
            "U praksi se upoređuje planirani dolazak iz originalne rezervacije sa stvarnim dolaskom nakon preusmeravanja. Ako razlika prelazi tri sata, a uzrok je na strani aviokompanije, postoji realan osnov za zahtev.",
            "Zato uvek beležite realno vreme dolaska na poslednji aerodrom iz rezervacije. Korisni su screenshot aplikacije, fotografija aerodromske table, email o novom letu i boarding pass za zamenski segment."
          ]
        },
        {
          "heading": "Aviokompanija mora da bude uzrok",
          "body": [
            "Ako ste konekciju propustili jer je prethodni let kasnio, otkazan je ili ste bili odbijeni zbog overbookinga, postoji potencijalni osnov. Ako ste zakasnili na gate iz ličnih razloga, zbog pasoške kontrole koju ste mogli realno da završite na vreme ili zbog odvojene samostalne konekcije, osnov je mnogo slabiji.",
            "Mora se proveriti i razlog prvog poremećaja. Tehnički ili operativni razlozi obično su drugačiji od ozbiljnog nevremena, zatvaranja aerodroma ili odluke kontrole leta. Aviokompanija se može braniti vanrednim okolnostima, ali ta odbrana mora imati vezu sa vašim konkretnim kašnjenjem.",
            "U praksi treba proveriti boarding dokumenta, novu kartu, poruke aviokompanije i razlog prvog poremećaja. Što je hronologija jasnija, lakše je odvojiti dobar zahtev od slučaja koji pravno ne stoji."
          ]
        },
        {
          "heading": "Preusmeravanje je obaveza, ne usluga",
          "body": [
            "Ako je konekcija propuštena u okviru iste rezervacije, aviokompanija treba da vas prebaci do krajnje destinacije. To nije gest dobre volje, već praktično rešavanje puta koji ste već kupili.",
            "Novi let treba da bude pod uporedivim uslovima. Ako čekate duže, mogu se otvoriti i prava na obroke, osveženje, komunikaciju, hotel i transfer. Ako vam kažu da sami kupite novu kartu, tražite pisano objašnjenje pre nego što platite.",
            "Ta prava postoje odvojeno od eventualne novčane naknade, pa ih ne treba mešati. Putnik može imati pravo na preusmeravanje i brigu čak i kada je fiksna odšteta sporna."
          ]
        },
        {
          "heading": "Kada put više nema smisla",
          "body": [
            "Nekad propuštena konekcija toliko promeni plan da put više nema svrhu: poslovni sastanak je prošao, događaj je završen ili stižete tek posle planiranog povratka. U takvim situacijama može biti važno proveriti i pravo na refundaciju dela putovanja.",
            "Ako ste već prešli deo puta, pitanje je složenije. Potrebno je pokazati šta je originalni cilj putovanja bio, šta je aviokompanija ponudila i da li je ponuđena alternativa i dalje imala realnu vrednost za vas."
          ]
        },
        {
          "heading": "Dokazi za missed connection zahtev",
          "body": [
            "Sačuvajte kompletnu originalnu rezervaciju, boarding pass za sve segmente, novu kartu, potvrdu o propuštenoj konekciji ako je dobijete i poruke aviokompanije. Ako ste morali da platite hranu, hotel, transfer ili novu kartu, sačuvajte račune.",
            "Najkorisnije je da se vidi veza između prvog poremećaja i finalnog kašnjenja: kada je prvi let stvarno stigao, kada je trebalo da poleti konekcija, koji zamenski let je ponuđen i kada ste na kraju stigli."
          ]
        },
        {
          "heading": "Novi let ne briše automatski prvobitni problem",
          "body": [
            "Ako aviokompanija brzo pronađe zamenski let, to je dobro za putnika, ali ne znači da je zahtev zatvoren. I dalje se poredi originalno planirano vreme dolaska sa stvarnim dolaskom posle preusmeravanja.",
            "Kod jedne rezervacije treba gledati celu rutu kao putovanje, naročito kada je prvi poremećaj doveo do propuštene konekcije. Sačuvajte i boarding pass za let koji ste propustili, ako ga imate, jer pokazuje da je konekcija bila deo originalnog plana.",
            "Ako ste sami kupili novu kartu jer pomoć nije stigla, čuvajte račun i razlog zašto ste to uradili. Taj trošak se ne posmatra isto kao fiksna odšteta, ali može biti važan ako aviokompanija nije obezbedila realno preusmeravanje."
          ]
        }
      ]
    },
    "en": {
      "slug": "missed-connection-same-booking",
      "title": "Missed connection: when counted as one case",
      "description": "Why the same reservation is crucial for a missed connection, how the delay at the final destination is calculated and what the airline must provide.",
      "excerpt": "With connections, it is not just the first flight that is delayed that is looked at, but the entire reservation, the arrival at the final destination and the reason why the connection was missed.",
      "category": "Connections",
      "readTime": "6 min read",
      "sections": [
        {
          "heading": "The same reservation is the first question",
          "body": [
            "A missed connection most often makes sense for a claim when road segments are purchased together under one reservation. Then the road is seen as a whole, and not as two unrelated flights.",
            "If you bought two separate tickets yourself, the airline from the first flight usually does not respond to the second flight in the same way. This is often the difference between protected connection and self-transfer travel.",
            "That is why booking references is one of the first proofs. If all segments are on the same itinerary, the analysis is done through the final destination. If the tickets are separate, rights may only exist for the individual flight that was delayed or cancelled, but a missed next flight usually becomes more difficult to collect."
          ]
        },
        {
          "heading": "The delay at the final destination is important",
          "body": [
            "In missed connection cases, it is crucial how late you are to your final destination. The first flight may be delayed by only 45 minutes, but if it causes you to miss the only subsequent flight and arrive a day later, the case is worth checking.",
            "In practice, the planned arrival from the original reservation is compared with the actual arrival after rerouting. If the difference exceeds three hours, and the cause is on the side of the airline, there is a realistic basis for the claim.",
            "That's why you always record the real time of arrival at the last airport from the reservation. A screenshot of the application, a photo of the airport board, an email about the new flight and a boarding pass for the replacement segment are useful."
          ]
        },
        {
          "heading": "The airline must be the cause",
          "body": [
            "If you missed your connection because your previous flight was delayed, canceled, or you were turned away due to overbooking, there is a potential reason. If you were late for the gate for personal reasons, because of passport control that you could realistically complete on time, or because of a separate independent connection, the basis is much weaker.",
            "The reason for the first disturbance must also be checked. Technical or operational reasons are usually different from severe storms, airport closures, or air traffic control decisions. The airline can defend extraordinary circumstances, but that defense must be related to your specific delay.",
            "In practice, you should check the boarding documents, the new ticket, the airline's messages and the reason for the first disruption. The clearer the chronology, the easier it is to separate a good claim from a case that doesn't stand up legally."
          ]
        },
        {
          "heading": "Redirection is a liability, not a service",
          "body": [
            "If a connection is missed within the same reservation, the airline should transfer you to your final destination. It's not a gesture of good will, but a practical solution to a road you've already bought.",
            "The new flight should be under comparable conditions. If you wait longer, rights to meals, refreshments, communication, hotel and transfer can also be opened. If they tell you to buy a new ticket yourself, ask for a written explanation before paying.",
            "These rights exist separately from any monetary compensation, so they should not be mixed. A passenger may be entitled to diversion and care even when fixed compensation is in dispute."
          ]
        },
        {
          "heading": "When the road no longer makes sense",
          "body": [
            "Sometimes a missed connection changes the plan so much that the trip no longer has a purpose: the business meeting has passed, the event has ended, or you arrive only after the planned return. In such situations, it may be important to check the right to a refund for part of the trip.",
            "If you have already traveled part of the way, the question is more complex. It is necessary to show what the original purpose of the trip was, what the airline offered and whether the alternative offered still had real value for you."
          ]
        },
        {
          "heading": "Evidence for a missed connection claim",
          "body": [
            "Keep the complete original reservation, boarding pass for all segments, new ticket, missed connection confirmation if received and airline messages. If you had to pay for food, hotel, transfer or a new ticket, save the receipts.",
            "It is most useful to see the relationship between the first disruption and the final delay: when the first flight actually arrived, when the connection was supposed to take off, what alternate flight was offered, and when you finally arrived."
          ]
        },
        {
          "heading": "A new flight does not automatically erase the original problem",
          "body": [
            "If the airline quickly finds a replacement flight, that's good for the passenger, but it doesn't mean the request is closed. The original scheduled arrival time is still compared with the actual arrival after the rerouting.",
            "With one reservation, the entire route should be viewed as a trip, especially when the first disruption led to a missed connection. Also keep the boarding pass for the flight you missed, if you have it, as it shows that the connection was part of the original plan.",
            "If you bought a new ticket yourself because help didn't arrive, keep the receipt and the reason you did it. That cost is not considered the same as fixed compensation, but it can be important if the airline has not provided realistic rerouting."
          ]
        }
      ]
    }
  },
  {
    "id": "denied-boarding-overbooking",
    "publishedAt": "2026-04-18",
    "updatedAt": "2026-04-18",
    "sr": {
      "slug": "uskraceno-ukrcavanje-overbooking",
      "title": "Uskraćeno ukrcavanje i overbooking: šta putnik može da traži",
      "description": "Šta znači denied boarding, kada overbooking daje pravo na naknadu, koja prava imate na aerodromu i zašto ne treba brzopleto potpisivati odricanje od prava.",
      "excerpt": "Ako ste imali kartu, čekirali se na vreme i aviokompanija vas ipak nije pustila u avion zbog overbookinga ili operativnog razloga, pravo na naknadu može biti jače nego kod običnog kašnjenja.",
      "category": "Denied boarding",
      "readTime": "5 min čitanja",
      "sections": [
        {
          "heading": "Denied boarding nije isto što i zakasneli putnik",
          "body": [
            "Uskraćeno ukrcavanje postoji kada putnik ima važeću kartu, čekira se na vreme, pojavi se na gejtu u predviđenom roku i ipak ne bude primljen na let iz razloga koji dolaze od aviokompanije.",
            "Najpoznatiji primer je overbooking, kada je prodato više mesta nego što avion stvarno ima. Mogu postojati i drugi operativni razlozi, ali je važno da putnik nije sam izazvao problem.",
            "Ako ste zakasnili na gate, niste imali potrebna dokumenta, vizu ili pasoš, ili ste odbijeni iz bezbednosnih ili zdravstvenih razloga, situacija se ne tretira isto. U tim slučajevima aviokompanija najčešće ima jaču odbranu."
          ]
        },
        {
          "heading": "Dobrovoljno i prinudno odricanje nisu isto",
          "body": [
            "Kada je let prebukiran, aviokompanija prvo može tražiti dobrovoljce koji prihvataju kasniji let uz vaučer, milje ili drugu pogodnost. Ako dobrovoljno pristanete, uslovi koje potpišete mogu uticati na kasniji zahtev.",
            "Drugačija je situacija kada niste pristali da odustanete od mesta, a osoblje vas ipak ne pusti u avion. To je prinudno uskraćeno ukrcavanje i tada se posebno proverava pravo na fiksnu naknadu, preusmeravanje i brigu tokom čekanja.",
            "Ne potpisujte brzo ako ne razumete šta dobijate. Ako je ponuda dobra i želite da je prihvatite, tražite da jasno piše da li se odričete dodatne naknade ili samo prihvatate alternativni let i pomoć."
          ]
        },
        {
          "heading": "Šta možete tražiti na aerodromu",
          "body": [
            "Putnik koji je prinudno odbijen za ukrcavanje može tražiti alternativni let do destinacije, brigu dok čeka i, u odgovarajućim slučajevima, fiksnu naknadu. Ako put više nema smisla, može se razmatrati i refundacija.",
            "Briga tokom čekanja obično uključuje obroke, osveženje i komunikaciju, a kod dužeg ili noćnog čekanja hotel i transfer. Ako ništa od toga nije obezbeđeno, čuvajte račune za razumne troškove.",
            "Naknada se najčešće računa prema dužini leta, ne prema ceni karte. Zato nije neobično da putnik sa jeftinom kartom ima pravo na značajan iznos ako su uslovi ispunjeni."
          ]
        },
        {
          "heading": "Koji dokazi su ključni",
          "body": [
            "Najvažnije je dokazati da ste imali pravo da letite i da ste ispunili obaveze putnika. Boarding pass, check-in potvrda, fotografija table leta, screenshot aplikacije i potvrda od osoblja mogu biti korisni.",
            "Ako je razlog overbooking, tražite da se to napiše u potvrdi ili komunikaciji aviokompanije. Ako osoblje ne želi da izda potvrdu, zapišite vreme, šalter, broj leta i tačnu formulaciju koju su koristili.",
            "Korisno je imati i dokaz da ste bili na aerodromu na vreme: email o check-inu, vreme prolaska kroz security, fotografiju gejta ili poruku aviokompanije. Kod ovih slučajeva detalji sa aerodroma često odlučuju više nego kasnija opšta prepiska."
          ]
        },
        {
          "heading": "Kada zahtev može da oslabi",
          "body": [
            "Zahtev je slabiji ako aviokompanija može da pokaže da putnik nije imao potrebna dokumenta, nije došao na gate na vreme, nije poštovao bezbednosna pravila ili je sam dobrovoljno prihvatio zamenu uz uslove koji isključuju dodatna potraživanja.",
            "Zahtev može biti sporan i kada razlog nije overbooking, već promena aviona, ograničenje težine, bezbednosna procena ili druga operativna situacija. To ne znači da nema prava, već da treba pažljivo pogledati dokumente."
          ]
        },
        {
          "heading": "Zašto je ručna provera korisna",
          "body": [
            "Denied boarding slučajevi često imaju bolju pravnu osnovu od prosečnog kašnjenja, ali samo ako se jasno vidi da je putnik bio spreman za let i da je odbijen bez svoje krivice.",
            "Zato je važno brzo prikupiti dokaze, ne bacati papire sa aerodroma i ne oslanjati se samo na usmeno obećanje osoblja. Kada se kasnije šalje zahtev, aviokompanija će tražiti detalje, a ne opšti opis događaja."
          ]
        },
        {
          "heading": "Tražite obaveštenje o pravima",
          "body": [
            "Kod uskraćenog ukrcavanja putnik treba da traži pismeno objašnjenje i obaveštenje o pravima. Ozbiljni vodiči za putnike stalno naglašavaju da usmeno obrazloženje na gejtu nije dovoljno kada kasnije treba dokazati šta se desilo.",
            "Ako aviokompanija traži dobrovoljce, uslovi dobrovoljnog odustajanja treba da budu jasni. Ako niste dobrovoljno pristali, već ste odbijeni protiv svoje volje, to treba da piše u potvrdi ili barem u vašoj hronologiji.",
            "Posebno zabeležite da ste imali važeću rezervaciju, da ste se čekirali i da ste se pojavili na vreme. Bez ta tri elementa aviokompanija često pokušava da slučaj prikaže kao problem putnika, a ne overbooking ili operativnu odluku."
          ]
        }
      ]
    },
    "en": {
      "slug": "denied-boarding-overbooking",
      "title": "Denied boarding and overbooking: what a passenger can ask for",
      "description": "What does denied boarding mean, when overbooking entitles you to compensation, what rights you have at the airport and why you should not hastily sign a waiver of rights.",
      "excerpt": "If you had a ticket, checked in on time and the airline still did not let you on the plane due to overbooking or operational reasons, the right to compensation may be stronger than in the case of a simple delay.",
      "category": "Denied boarding",
      "readTime": "6 min read",
      "sections": [
        {
          "heading": "Denied boarding is not the same as a late passenger",
          "body": [
            "Denied boarding exists when a passenger has a valid ticket, checks in on time, shows up at the gate on time and is still not admitted to the flight for reasons that come from the airline.",
            "The most famous example is overbooking, when more seats are sold than the plane actually has. There may be other operational reasons, but it is important that the passenger did not cause the problem himself.",
            "If you were late for the gate, did not have the necessary documents, visa or passport, or were turned away for security or health reasons, the situation is not treated the same. In those cases, the airline usually has a stronger defense."
          ]
        },
        {
          "heading": "Voluntary and forced relinquishment are not the same",
          "body": [
            "When a flight is overbooked, the airline may first seek volunteers who accept a later flight with a voucher, miles or other benefit. If you voluntarily agree, the terms you sign may affect a later claim.",
            "It's a different situation when you didn't agree to give up your seat, but the staff still won't let you on the plane. It is an involuntary denied boarding and then the right to fixed compensation, diversion and care while waiting is checked separately.",
            "Don't sign quickly if you don't understand what you're getting. If the offer is good and you want to accept it, ask for it to clearly state whether you are waiving the additional fee or just accepting the alternative flight and assistance."
          ]
        },
        {
          "heading": "What can you ask for at the airport?",
          "body": [
            "A passenger who is involuntarily denied boarding may request an alternative flight to the destination, care while waiting and, in appropriate cases, a fixed compensation. If the trip no longer makes sense, a refund may also be considered.",
            "Care during the wait usually includes meals, refreshments and communication, and for longer or overnight waits, hotel and transfer. If none of these are provided, keep receipts for reasonable expenses.",
            "The fee is usually calculated according to the length of the flight, not according to the price of the ticket. Therefore, it is not unusual for a passenger with a cheap ticket to be entitled to a significant amount if the conditions are met."
          ]
        },
        {
          "heading": "What evidence is key",
          "body": [
            "The most important thing is to prove that you had the right to fly and that you fulfilled your obligations as a passenger. Boarding pass, check-in confirmation, photo of flight board, application screenshot and confirmation from staff can be useful.",
            "If the reason is overbooking, ask for it to be written in the confirmation or communication from the airline. If the staff does not want to issue a receipt, write down the time, counter, flight number and the exact wording they used.",
            "It is also useful to have proof that you were at the airport on time: an email about check-in, the time you passed through security, a photo of the gate or a message from the airline. In these cases, the details from the airport are often more decisive than the later general correspondence."
          ]
        },
        {
          "heading": "When the request can weaken",
          "body": [
            "The claim is weaker if the airline can show that the passenger did not have the necessary documents, did not arrive at the gate on time, did not follow the safety rules, or voluntarily accepted the exchange under conditions that exclude additional claims.",
            "The request can be disputed even when the reason is not overbooking, but a change of aircraft, weight limit, safety assessment or other operational situation. This does not mean that there are no rights, but that you should look carefully at the documents."
          ]
        },
        {
          "heading": "Why manual checking is useful",
          "body": [
            "Denied boarding cases often have a better legal basis than the average delay, but only if it is clear that the passenger was ready for the flight and was denied through no fault of his own.",
            "That's why it's important to gather evidence quickly, not to throw away papers from the airport and not rely only on the verbal promise of the staff. When a request is sent later, the airline will ask for details rather than a general description of the event."
          ]
        },
        {
          "heading": "Ask for a notice of rights",
          "body": [
            "In case of denied boarding, the passenger should request a written explanation and notice of rights. Serious travel guides always emphasize that a verbal explanation at the gate is not enough when you need to prove what happened later.",
            "If the airline is asking for volunteers, the terms of voluntary withdrawal should be clear. If you did not agree voluntarily, but were rejected against your will, it should be written on the confirmation or at least in your chronology.",
            "Make a special note that you had a valid reservation, that you checked in, and that you showed up on time. Without those three elements, the airline often tries to portray the case as a passenger problem rather than overbooking or an operational decision."
          ]
        }
      ]
    }
  },
  {
    "id": "extraordinary-circumstances",
    "publishedAt": "2026-04-19",
    "updatedAt": "2026-04-19",
    "sr": {
      "slug": "vanredne-okolnosti-let",
      "title": "Vanredne okolnosti: kada aviokompanija ne mora da plati",
      "description": "Loše vreme, kontrola leta, štrajkovi, tehnički kvarovi i obaveza brige: šta zaista može biti vanredna okolnost kod zahteva za odštetu.",
      "excerpt": "Aviokompanije često pominju vanredne okolnosti, ali nije svako objašnjenje dovoljno. Važno je šta se stvarno desilo, da li je uzrok van kontrole i da li su prava na brigu i preusmeravanje i dalje ostala.",
      "category": "Pravna provera",
      "readTime": "5 min čitanja",
      "sections": [
        {
          "heading": "Šta su vanredne okolnosti",
          "body": [
            "Vanredne okolnosti su događaji koje aviokompanija realno nije mogla da izbegne ni uz razumne mere. Tipični primeri su ozbiljno loše vreme, zatvaranje aerodroma, bezbednosni incidenti, politička nestabilnost, određene odluke kontrole leta i neki događaji koji utiču na bezbednost letenja.",
            "Ako je takav događaj stvarno uzrok kašnjenja ili otkazivanja, fiksna naknada može biti odbijena. Ali teret objašnjenja nije na putniku. Aviokompanija treba da pokaže šta se desilo i zašto to nije mogla da izbegne.",
            "Najvažnije je da postoji konkretna veza između događaja i vašeg leta. Nije dovoljno da je negde u sistemu postojao problem ako se ne vidi kako je baš taj problem doveo do vašeg kašnjenja ili otkazivanja."
          ]
        },
        {
          "heading": "Tehnički problem nije uvek izgovor",
          "body": [
            "Putnici često čuju da je problem bio tehničke prirode. Međutim, redovno održavanje, kvar aviona, organizacija posade i operativni tehnički problemi ne znače automatski vanredne okolnosti.",
            "Aviokompanija može imati jaču odbranu ako je reč o neobičnom događaju koji nije deo redovnog poslovnog rizika, na primer udar groma, sudar sa pticom ili bezbednosni problem koji nije mogla da predvidi. I tada se proverava da li je prevoznik preduzeo razumne mere da smanji kašnjenje.",
            "Zato je važno tražiti precizan razlog. Fraza tehnički problem je preširoka. Za dobru procenu treba znati da li je problem bio rutinski kvar, iznenadni bezbednosni događaj ili posledica organizacije aviokompanije."
          ]
        },
        {
          "heading": "Štrajkovi se proveravaju posebno",
          "body": [
            "Nije svaki štrajk isti. Štrajk kontrole leta, aerodromskog osoblja ili eksternih službi može imati drugačiji tretman od štrajka zaposlenih same aviokompanije.",
            "Ako je poremećaj nastao zbog zaposlenih kod prevoznika, zahtev često vredi proveriti pažljivije. Ako je uzrok eksterni štrajk koji pogađa aerodrom ili kontrolu leta, aviokompanija može imati jaču odbranu.",
            "Zbog toga treba proveriti datum, aerodrom, aviokompaniju i javno dostupne informacije o poremećaju. Kod štrajkova je posebno važno ne zaključivati samo na osnovu kratke SMS poruke."
          ]
        },
        {
          "heading": "Vreme i kontrola leta nisu automatski kraj priče",
          "body": [
            "Ozbiljno nevreme, zatvaranje piste, ograničenja vazdušnog prostora i odluke kontrole leta često se navode kao vanredne okolnosti. Ipak, i tu treba proveriti obim i trajanje događaja.",
            "Ako su drugi letovi normalno poletali, ako je problem trajao kratko ili ako je kašnjenje nastalo tek mnogo kasnije zbog rotacije aviona, slučaj može zahtevati dodatnu proveru. Ponekad vanredna okolnost objašnjava početni poremećaj, ali ne i ceo višesatni zastoj.",
            "Važno je pitanje razumnih mera: da li je aviokompanija mogla da obezbedi drugi avion, posadu, preusmeravanje ili bolje informisanje putnika. Odgovor zavisi od konkretnih činjenica."
          ]
        },
        {
          "heading": "Pravo na brigu može ostati",
          "body": [
            "Čak i kada fiksna odšteta nije sigurna zbog vanrednih okolnosti, prava na brigu, informacije, refundaciju ili preusmeravanje mogu i dalje postojati. To je česta tačka koju putnici propuste.",
            "Ako zbog lošeg vremena ili odluke kontrole leta čekate satima, aviokompanija i dalje može imati obavezu da obezbedi obroke, osveženje, komunikaciju, a kod noćnog čekanja hotel i transfer.",
            "Zato ne treba prihvatiti odgovor nema odštete kao odgovor na sva pitanja. Možda nema fiksne naknade, ali mogu postojati drugi zahtevi koje treba odvojeno postaviti."
          ]
        },
        {
          "heading": "Šta putnik može da uradi",
          "body": [
            "Tražite pisano objašnjenje razloga poremećaja. Ako dobijete samo usmeno objašnjenje, zabeležite vreme, šalter i ime službe ako ga imate. Sačuvajte boarding pass, potvrdu rezervacije, poruke aviokompanije i račune.",
            "Korisno je zabeležiti i šta se dešavalo na aerodromu: da li su drugi letovi otkazani, da li je aerodrom radio, da li su putnici preusmeravani i kada je ponuđena alternativa. Ti detalji kasnije pomažu da se proveri da li je odbrana aviokompanije ubedljiva.",
            "Čak i kada fiksna naknada nije sigurna, prava na brigu, informacije i preusmeravanje mogu i dalje postojati. Dobar zahtev jasno razdvaja fiksnu odštetu od refundacije troškova i prava na pomoć tokom čekanja."
          ]
        },
        {
          "heading": "Pitajte koje su mere preduzete",
          "body": [
            "Vanredne okolnosti nisu samo pitanje šta se desilo, već i šta je aviokompanija uradila da smanji posledice. Ako je postojao problem sa vremenom, kontrolom leta ili bezbednošću, i dalje se može pitati da li je prevoznik mogao bolje da organizuje preusmeravanje, posadu ili informisanje.",
            "Zato u odgovoru aviokompanije tražite konkretnu vezu između događaja i vašeg leta, kao i objašnjenje razumnih mera. Opšta rečenica da je let kasnio iz razloga van kontrole često nije dovoljna za ozbiljnu proveru.",
            "Ako su drugi letovi iste kompanije ili iste rute poletali normalno, zabeležite to. Ne znači automatski da imate pravo, ali je koristan signal za dodatnu proveru."
          ]
        }
      ]
    },
    "en": {
      "slug": "extraordinary-circumstances-flight",
      "title": "Extraordinary circumstances: when the airline does not have to pay",
      "description": "Bad weather, flight control, strikes, technical failures and duty of care: what can really be an extraordinary circumstance in a claim for compensation.",
      "excerpt": "Airlines often mention extraordinary circumstances, but not every explanation is sufficient. What is important is what actually happened, whether the cause is out of control and whether the rights to care and diversion still remain.",
      "category": "Legal review",
      "readTime": "6 min read",
      "sections": [
        {
          "heading": "What are extraordinary circumstances",
          "body": [
            "Extraordinary circumstances are events that the airline could not realistically avoid even with reasonable measures. Typical examples are severe weather, airport closures, security incidents, political instability, certain air traffic control decisions and some events affecting flight safety.",
            "If such an event is the actual cause of the delay or cancellation, the fixed fee may be deducted. But the burden of explanation is not on the passenger. The airline should show what happened and why it could not have avoided it.",
            "The most important thing is that there is a concrete connection between the event and your flight. It's not enough that there was a problem somewhere in the system if it can't be seen how that particular problem led to your delay or cancellation."
          ]
        },
        {
          "heading": "A technical problem is not always an excuse",
          "body": [
            "Passengers often hear that the problem was of a technical nature. However, routine maintenance, aircraft breakdown, crew organization and operational technical problems do not automatically mean extraordinary circumstances.",
            "An airline may have a stronger defense if it is an unusual event that is not part of a regular business risk, such as a lightning strike, a bird strike, or a security issue it could not have foreseen. And then it is checked whether the carrier has taken reasonable measures to reduce the delay.",
            "That is why it is important to look for a precise reason. The phrase technical problem is too broad. A good assessment requires knowing whether the problem was a routine malfunction, a sudden security event or a consequence of the airline's organization."
          ]
        },
        {
          "heading": "Strikes are checked separately",
          "body": [
            "Not every strike is the same. A strike by air traffic control, airport staff or external services may be treated differently than a strike by the airline's own employees.",
            "If the disruption is caused by the carrier's employees, the claim is often worth a closer look. If the cause is an external strike affecting the airport or air traffic control, the airline may have stronger defenses.",
            "Therefore, check the date, airport, airline and publicly available information about the disruption. In the case of strikes, it is especially important not to make conclusions based only on a short SMS message."
          ]
        },
        {
          "heading": "Weather and flight control are not automatically the end of the story",
          "body": [
            "Severe storms, runway closures, airspace restrictions and flight control decisions are often cited as extraordinary circumstances. However, the scope and duration of the event should be checked here as well.",
            "If other flights took off normally, if the problem was short-lived or if the delay did not occur until much later due to rotation of the aircraft, the case may require additional verification. Sometimes an extraordinary circumstance explains the initial disruption, but not the entire multi-hour standstill.",
            "The question of reasonableness is important: whether the airline could have provided another aircraft, crew, diversion or better information to passengers. The answer depends on the specific facts."
          ]
        },
        {
          "heading": "The right to care can remain",
          "body": [
            "Even when fixed compensation is not certain due to extraordinary circumstances, rights to care, information, refund or redirection may still exist. This is a common point that travelers miss.",
            "If you wait for hours due to bad weather or a flight control decision, the airline may still be obligated to provide meals, refreshments, communication, and in the case of a night wait, hotel and transfer.",
            "Therefore, no compensation should be accepted as the answer to all questions. There may not be a fixed fee, but there may be other requirements that need to be set separately."
          ]
        },
        {
          "heading": "What can a traveler do?",
          "body": [
            "Ask for a written explanation of the reason for the disruption. If you receive only a verbal explanation, note the time, counter and name of service if you have one. Save your boarding pass, booking confirmation, airline messages and receipts.",
            "It is also useful to note what happened at the airport: whether other flights were cancelled, whether the airport was operating, whether passengers were diverted and when an alternative was offered. Those details later help to check whether the airline's defense is convincing.",
            "Even when a fixed fee is not certain, rights to care, information and diversion may still exist. A good claim clearly separates fixed damages from reimbursement of expenses and the right to assistance while waiting."
          ]
        },
        {
          "heading": "Ask what measures have been taken",
          "body": [
            "Extraordinary circumstances are not only a question of what happened, but also what the airline did to minimize the consequences. If there was a problem with weather, air traffic control or safety, one can still ask whether the carrier could have better organized the diversion, crew or briefing.",
            "Therefore, in the airline's response, you are looking for a specific connection between the event and your flight, as well as an explanation of reasonable measures. A general sentence that the flight was delayed for reasons beyond control is often not enough for a serious check.",
            "If other flights of the same company or the same route took off normally, make a note of it. It doesn't automatically mean you're eligible, but it's a useful signal to do an extra check."
          ]
        }
      ]
    }
  },
  {
    "id": "eu261-ecaa-serbia",
    "publishedAt": "2026-04-20",
    "updatedAt": "2026-04-20",
    "sr": {
      "slug": "eu261-ecaa-srbija-prava-putnika",
      "title": "EU 261, ECAA i Srbija: šta znači za putnike",
      "description": "Praktično objašnjenje kada evropska i regionalna pravila mogu biti važna za putnike iz Srbije, letove iz Srbije i letove ka Srbiji.",
      "excerpt": "Kod prava putnika ne odlučuje pasoš, već ruta, operating carrier, rezervacija i razlog poremećaja. Zato se svaki slučaj proverava kroz konkretan let.",
      "category": "Prava putnika",
      "readTime": "5 min čitanja",
      "sections": [
        {
          "heading": "EU 261 je polazna tačka, ali nije jedino pitanje",
          "body": [
            "EU 261 je najpoznatiji evropski okvir za naknadu putnicima kod kašnjenja, otkazivanja i uskraćenog ukrcavanja. Zato se često koristi kao referenca kada se govori o naknadama od 250, 400 ili 600 evra.",
            "Za putnike iz Srbije važno je da se ne krene od pretpostavke da pravila važe ili ne važe samo zato što putnik ima srpski pasoš. Državljanstvo je uglavnom manje važno od rute, aerodroma polaska, aerodroma dolaska, prevoznika koji je upravljao letom i načina na koji je karta kupljena.",
            "Najbolja provera zato počinje od činjenica: broj leta, datum, odakle se poletelo, gde se trebalo stići, koji prevoznik je izvršavao let i šta je stvarno izazvalo poremećaj."
          ]
        },
        {
          "heading": "Kada su evropska pravila najčešće relevantna",
          "body": [
            "Najjasniji slučajevi su letovi koji polaze iz EU, EEA ili druge povezane evropske zone. Tada se pravila često primenjuju bez obzira na to kojom aviokompanijom putujete.",
            "Kod letova koji dolaze u EU situacija je drugačija. Tada može biti važno da li je operating carrier evropski ili nije. Ako let izvan EU ka EU obavlja prevoznik koji nije evropski, analiza može biti slabija ili mora ići drugim putem.",
            "Kod putovanja sa konekcijama dodatno se proverava da li je cela ruta bila na istoj rezervaciji. Jedna karta Beograd-Pariz-Njujork nije isto što i dve odvojeno kupljene karte, čak i ako putniku u praksi deluju kao jedno putovanje."
          ],
          "bullets": [
            "polazak iz EU ili povezane evropske zone",
            "dolazak u EU sa relevantnim evropskim prevoznikom",
            "konekcije kupljene pod jednom rezervacijom"
          ]
        },
        {
          "heading": "ECAA je važan za lokalni kontekst",
          "body": [
            "Srbija je deo šireg evropskog vazduhoplovnog okvira kroz ECAA aranžmane. To je razlog zašto prava putnika nisu potpuno odvojena od evropske prakse, naročito kod letova koji su povezani sa Srbijom i regionom.",
            "To ipak ne znači da se svaki let automatski tretira kao klasičan EU slučaj. Lokalna procedura, nadležni organ, rokovi za reklamaciju i način komunikacije sa prevoznikom mogu biti drugačiji.",
            "Zato je opasan prekratak odgovor tipa važi EU 261 ili ne važi EU 261. Putniku je korisniji odgovor koji kaže koji okvir ima smisla, šta treba prvo poslati avio-kompaniji i koji rok ne treba propustiti."
          ]
        },
        {
          "heading": "Zašto je operating carrier bitan",
          "body": [
            "Na karti može pisati jedan brend, a let realno može obavljati druga aviokompanija. To se zove operating carrier i često je važniji od marketing carrier-a koji je prodao kartu ili čiji kod vidite u aplikaciji.",
            "Kod codeshare letova putnik lako pogreši kome šalje zahtev. Ako je let prodat pod jednim kodom, a obavljen avionom druge kompanije, treba proveriti ko je stvarno upravljao letom na dan putovanja.",
            "Zato su boarding pass, e-ticket i email potvrda korisni. U njima se često vidi formulacija operated by, a ona kasnije može promeniti adresu zahteva i pravni okvir."
          ]
        },
        {
          "heading": "Šta se proverava pre slanja zahteva",
          "body": [
            "Dobar intake ne obećava naknadu samo zato što je let kasnio. Prvo se proverava da li je kašnjenje na krajnjoj destinaciji dovoljno dugo, da li je ruta pokrivena, da li je aviokompanija odgovorna i da li postoje dokazi.",
            "Ako je razlog loše vreme, odluka kontrole leta ili zatvaranje aerodroma, fiksna odšteta može biti sporna. Ako je razlog tehnički kvar, organizacija posade ili operativni propust, slučaj često vredi proveriti detaljnije.",
            "Za Srbiju je dodatno važno ne odlagati prvi korak. Čak i kada postoje dalji pravni putevi, reklamaciju avio-kompaniji treba slati uredno i brzo, sa jasnim dokazom kada je poslata."
          ]
        },
        {
          "heading": "Zašto lokalni servis pomaže",
          "body": [
            "Veliki međunarodni servisi dobro pokrivaju masovne rute, ali često ne objašnjavaju lokalni kontekst putniku iz Srbije. Problem nije samo jezik, već i procedura: kome se šalje, u kom roku, šta se prilaže i kada ima smisla nastaviti.",
            "Cilj letkasni.rs je da slučaj prvo prođe konzervativnu proveru. Ako osnov postoji, putnik dobija sledeći korak. Ako je slučaj slab, bolje je to znati rano nego gubiti vreme na generičke reklamacije."
          ]
        },
        {
          "heading": "Ne zaboravite da postoje i drugi režimi",
          "body": [
            "AirHelp, AirAdvisor i drugi veći igrači često pokrivaju više režima, ne samo EU 261: UK 261, kanadska pravila, brazilski ANAC, turska pravila i druge lokalne okvire. Za putnika iz Srbije to ne znači da treba sam da nauči sve režime, već da ne treba prerano odbaciti međunarodni let.",
            "Ako putovanje ima više delova, više prevoznika ili polazak izvan Evrope, osnov se proverava šire. Nekad EU okvir nije dobar put, ali postoji drugi osnov za refundaciju troškova, pomoć ili lokalnu žalbu.",
            "Zato intake treba da pita rutu i operating carrier, a ne samo da li je let bio iz EU. Prava putnika su sve više mreža pravila, a ne jedna univerzalna tabela."
          ]
        }
      ]
    },
    "en": {
      "slug": "eu261-ecaa-serbia-passenger-rights",
      "title": "EU 261, ECAA and Serbia: what it means for travelers",
      "description": "A practical explanation of when European and regional rules may be important for travelers from Serbia, flights from Serbia and flights to Serbia.",
      "excerpt": "When it comes to passenger rights, it is not the passport that decides, but the route, operating carrier, reservation and the reason for the disruption. That is why each case is checked through a specific flight.",
      "category": "Passenger rights",
      "readTime": "6 min read",
      "sections": [
        {
          "heading": "EU 261 is the starting point, but it is not the only issue",
          "body": [
            "EU 261 is the best-known European framework for compensating passengers for delays, cancellations and denied boarding. That is why it is often used as a reference when talking about fees of 250, 400 or 600 euros.",
            "For travelers from Serbia, it is important not to start from the assumption that the rules apply or do not apply just because the traveler has a Serbian passport. Nationality is generally less important than the route, departure airport, arrival airport, carrier that operated the flight and how the ticket was purchased.",
            "The best check therefore starts with the facts: the flight number, the date, where it took off from, where it was supposed to arrive, which carrier operated the flight and what actually caused the disruption."
          ]
        },
        {
          "heading": "When European rules are most relevant",
          "body": [
            "The clearest cases are flights departing from the EU, EEA or other connected European zones. Then the rules often apply regardless of which airline you travel with.",
            "The situation is different for flights arriving in the EU. Then it can be important whether the operating carrier is European or not. If the flight from outside the EU to the EU is operated by a non-EU carrier, the analysis may be weaker or have to take a different route.",
            "When traveling with connections, it is additionally checked whether the entire route was on the same reservation. One Belgrade-Paris-New York ticket is not the same as two separately purchased tickets, even if in practice they seem like one trip to the passenger."
          ],
          "bullets": [
            "departure from the EU or the associated European zone",
            "arrival in the EU with the relevant European carrier",
            "connections purchased under one reservation"
          ]
        },
        {
          "heading": "ECAA is important for the local context",
          "body": [
            "Serbia is part of the wider European aviation framework through ECAA arrangements. This is the reason why passenger rights are not completely separated from European practice, especially for flights connected to Serbia and the region.",
            "However, this does not mean that every flight is automatically treated as a classic EU case. The local procedure, the competent authority, the deadlines for complaints and the way of communication with the carrier may be different.",
            "That's why a too short answer like EU 261 is valid or EU 261 is not valid is dangerous. An answer that tells which frame makes sense, what should be sent to the airline first and which deadline should not be missed is more useful for the passenger."
          ]
        },
        {
          "heading": "Why the operating carrier matters",
          "body": [
            "One brand may be written on the ticket, and the flight may realistically be operated by another airline. This is called the operating carrier and is often more important than the marketing carrier that sold the ticket or whose code you see in the app.",
            "With codeshare flights, the passenger easily makes a mistake to whom he sends the request. If the flight was sold under one code and operated by another company's aircraft, you should check who actually operated the flight on the day of travel.",
            "That's why the boarding pass, e-ticket and email confirmation are useful. They often contain the wording operated by, which can later change the address of the request and the legal framework."
          ]
        },
        {
          "heading": "What is checked before submitting a request",
          "body": [
            "A good intake does not promise compensation just because the flight is delayed. First, it is checked whether the delay at the final destination is long enough, whether the route is covered, whether the airline is responsible and whether there is evidence.",
            "If the reason is bad weather, an air traffic control decision or an airport closure, fixed damages may be disputed. If the reason is technical failure, crew organization or operational failure, the case is often worth checking in more detail.",
            "For Serbia, it is additionally important not to delay the first step. Even when there are further legal avenues, the complaint should be sent to the airline properly and quickly, with clear proof of when it was sent."
          ]
        },
        {
          "heading": "Why local service helps",
          "body": [
            "Large international services cover mass routes well, but often do not explain the local context to a passenger from Serbia. The problem is not only the language, but also the procedure: to whom it is sent, within what time frame, what is attached and when it makes sense to continue.",
            "The goal of letkasni.rs is for the case to pass a conservative check first. If the basis exists, the traveler gets the next step. If the case is weak, it is better to know this early than to waste time on generic complaints."
          ]
        },
        {
          "heading": "Do not forget that there are other modes",
          "body": [
            "AirHelp, AirAdvisor and other bigger players often cover multiple regimes, not only EU 261: UK 261, Canadian rules, Brazilian ANAC, Turkish rules and other local frameworks. For a passenger from Serbia, this does not mean that he should learn all the modes by himself, but that he should not reject an international flight too soon.",
            "If the trip has multiple parts, multiple carriers or departures outside of Europe, the basis is checked more broadly. Sometimes the EU framework is not a good way to go, but there is another basis for reimbursement, assistance or a local appeal.",
            "That's why the intake should ask the route and the operating carrier, not just whether the flight was from the EU. Passenger rights are increasingly a network of rules rather than a single universal table."
          ]
        }
      ]
    }
  },
  {
    "id": "documents-for-claim",
    "publishedAt": "2026-04-21",
    "updatedAt": "2026-04-21",
    "sr": {
      "slug": "dokumenti-za-avio-odstetu",
      "title": "Koji dokumenti su potrebni za zahtev za avio-odštetu",
      "description": "Detaljna lista dokumenata, fotografija i dokaza koje treba sačuvati posle kašnjenja, otkazivanja, propuštene konekcije ili overbookinga.",
      "excerpt": "Za prvu proveru često je dovoljno nekoliko podataka, ali jak dokazni trag kasnije odlučuje koliko brzo i ozbiljno slučaj može da se vodi.",
      "category": "Dokumenta",
      "readTime": "4 min čitanja",
      "sections": [
        {
          "heading": "Za prvu proveru ne morate imati sve",
          "body": [
            "Putnici često odustanu jer nemaju boarding pass ili nisu sigurni gde im je potvrda rezervacije. Za početni intake to obično nije razlog da se slučaj odmah odbaci.",
            "Za prvu proveru najčešće su dovoljni broj leta, datum, ruta, tip problema i osnovni opis šta se dogodilo. Ti podaci omogućavaju da se vidi da li slučaj uopšte liči na kašnjenje, otkazivanje, propuštenu konekciju ili uskraćeno ukrcavanje koje vredi dalje proveravati.",
            "Ako slučaj ima smisla, dokumenti postaju važniji u sledećem koraku. Tada se potvrđuje da ste zaista imali rezervaciju, da ste putovali ili pokušali da putujete, i da je poremećaj imao posledice koje navodite."
          ]
        },
        {
          "heading": "Dokumenti koji najviše vrede",
          "body": [
            "Najkorisniji su booking confirmation, e-ticket, boarding pass, check-in potvrda i sve poruke koje ste dobili od aviokompanije ili agencije. Ti dokumenti zajedno pokazuju ko je putovao, kojom rutom, kog datuma i pod kojim uslovima.",
            "Ako ste dobili alternativni let, nova karta je posebno važna. Kod kašnjenja i propuštene konekcije često se poredi planirani dolazak iz originalne rezervacije sa stvarnim dolaskom nakon preusmeravanja.",
            "Ako putuje više osoba na istoj rezervaciji, sačuvajte dokumente za svakog putnika. Pravo na fiksnu naknadu se obično posmatra po putniku, pa nije dovoljno imati samo jedan dokaz ako zahtev obuhvata celu porodicu ili grupu."
          ],
          "bullets": [
            "booking reference ili potvrda rezervacije",
            "e-ticket i boarding pass",
            "check-in potvrda",
            "nova karta ako ste preusmereni",
            "email, SMS ili app poruke od aviokompanije"
          ]
        },
        {
          "heading": "Fotografije sa aerodroma mogu popuniti rupe",
          "body": [
            "Fotografija table odlazaka, gate obaveštenja ili poruke u aplikaciji može biti korisna ako kasnije treba dokazati šta se događalo na aerodromu. To nije uvek formalni dokaz kao potvrda aviokompanije, ali pomaže da se rekonstruiše hronologija.",
            "Ako osoblje kaže razlog kašnjenja ili otkazivanja samo usmeno, zapišite tačnu formulaciju, vreme i mesto. Ako možete, fotografišite ekran ili obaveštenje koje potvrđuje isti razlog.",
            "Kod overbookinga ili uskraćenog ukrcavanja posebno je korisno imati dokaz da ste bili na gejtu na vreme: check-in potvrdu, fotografiju gejta, poruku aviokompanije ili pisanu potvrdu osoblja."
          ]
        },
        {
          "heading": "Računi su posebna kategorija",
          "body": [
            "Računi za obroke, piće, hotel, transfer ili novu kartu nisu isto što i fiksna odšteta. Oni mogu biti osnova za refundaciju troškova ako aviokompanija nije obezbedila brigu koju je trebalo da obezbedi.",
            "Važno je da troškovi budu razumni i povezani sa poremećajem. Luksuzan hotel ili nepotrebno skupa karta mogu biti teži za naplatu, dok osnovni obrok, noćenje i transfer obično imaju jasniju logiku.",
            "Ako plaćate nešto sami jer na aerodromu nema pomoći, sačuvajte fiskalni račun, potvrdu plaćanja i kratku belešku zašto je trošak nastao."
          ]
        },
        {
          "heading": "Šta ako nemate boarding pass",
          "body": [
            "Nedostatak boarding pass-a ne znači automatski kraj. Potvrda rezervacije, email od aviokompanije, račun za kartu, istorija putovanja ili potvrda check-ina mogu pomoći.",
            "Kod otkazanog leta putnik često ni ne dobije boarding pass, jer do ukrcavanja nije došlo. Kod online check-ina dokument može ostati u aplikaciji ili emailu. Vredi proveriti inbox, aplikaciju, wallet na telefonu i nalog kod aviokompanije.",
            "Ako ništa od toga ne postoji, slučaj se i dalje može preliminarno proveriti. Samo treba računati da će kasniji korak možda tražiti dodatnu potvrdu identiteta, rezervacije ili plaćanja."
          ]
        },
        {
          "heading": "Napravite jedan folder za slučaj",
          "body": [
            "Najpraktičnije je da sve dokaze stavite u jedan folder: karta, boarding pass, poruke, fotografije, računi i kratka vremenska linija. To smanjuje rizik da se kasnije izgubi važan detalj.",
            "Dobar dokazni paket ne mora biti savršen. Dovoljno je da jasno pokazuje let, datum, putnika, poremećaj, stvarni dolazak i troškove koje tražite. Sve preko toga samo olakšava ručnu proveru."
          ]
        },
        {
          "heading": "Nekad se traži i potvrda identiteta",
          "body": [
            "Neki servisi i aviokompanije traže dodatnu potvrdu identiteta, naročito kada se zahtev šalje preko zastupnika ili kada se isplata vrši na bankovni račun. To može biti kopija dokumenta, punomoćje ili potpisana izjava.",
            "Ne šaljite osetljive dokumente nasumično kroz neproverene kanale. Ako se dokument traži, proverite ko ga traži, zašto je potreban i da li je moguće zamračiti podatke koji nisu relevantni.",
            "Za porodice i grupe posebno proverite da li je za svakog putnika potreban poseban potpis ili dokument. Mnogi procesi zapnu ne zato što nema osnova, već zato što jedan putnik u grupi nema kompletan dokazni paket."
          ]
        }
      ]
    },
    "en": {
      "slug": "documents-for-flight-compensation-claim",
      "title": "What documents are required for an aviation compensation claim",
      "description": "A detailed list of documents, photos and evidence that should be saved after a delay, cancellation, missed connection or overbooking.",
      "excerpt": "A few pieces of information are often enough for the first check, but a strong evidence trail later decides how quickly and seriously the case can be pursued.",
      "category": "Documents",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "You don't need to have everything for the first check",
          "body": [
            "Passengers often give up because they don't have a boarding pass or aren't sure where their booking confirmation is. For initial intakes, this is usually not a reason to dismiss the case immediately.",
            "For the first check, the flight number, date, route, type of problem and a basic description of what happened are usually sufficient. That data makes it possible to see if the case even resembles a delay, cancellation, missed connection or denied boarding that is worth investigating further.",
            "If the case makes sense, the documents become more important in the next step. It is then confirmed that you actually had a reservation, that you traveled or attempted to travel, and that the disruption had the consequences you state."
          ]
        },
        {
          "heading": "The most valuable documents",
          "body": [
            "The most useful are the booking confirmation, e-ticket, boarding pass, check-in confirmation and all the messages you received from the airline or agency. Together, these documents show who traveled, by which route, on what date and under what conditions.",
            "If you received an alternative flight, a new ticket is especially important. Delays and missed connections often compare the planned arrival from the original booking with the actual arrival after rerouting.",
            "If more than one person is traveling on the same reservation, save the documents for each passenger. The right to a fixed fee is usually considered per passenger, so it is not enough to have only one proof if the claim covers an entire family or group."
          ],
          "bullets": [
            "booking reference or booking confirmation",
            "e-ticket and boarding pass",
            "check-in confirmation",
            "a new ticket if you are redirected",
            "email, SMS or app messages from the airline"
          ]
        },
        {
          "heading": "Airport photos can fill in the gaps",
          "body": [
            "A photo of the departure board, gate notice or message in the app can be useful if you later need to prove what happened at the airport. It's not always as formal proof as airline confirmation, but it helps to reconstruct the chronology.",
            "If the staff gives the reason for the delay or cancellation only verbally, write down the exact wording, time and place. If you can, take a photo of the screen or notification confirming the same reason.",
            "In case of overbooking or denied boarding, it is especially useful to have proof that you were at the gate on time: check-in confirmation, photo of the gate, a message from the airline or a written confirmation from the staff."
          ]
        },
        {
          "heading": "Accounts are a separate category",
          "body": [
            "Bills for meals, drinks, hotel, transfer or new ticket are not the same as fixed compensation. They can be the basis for reimbursement if the airline did not provide the care it should have provided.",
            "It is important that the costs are reasonable and related to the disorder. A luxury hotel or an unnecessarily expensive ticket can be more difficult to charge, while a basic meal, overnight stay and transfer usually have a clearer logic.",
            "If you pay for something yourself because there is no help at the airport, keep the fiscal receipt, the payment receipt and a short note of why the expense was incurred."
          ]
        },
        {
          "heading": "What if you don't have a boarding pass",
          "body": [
            "Lack of boarding pass does not automatically mean the end. A booking confirmation, airline email, ticket receipt, travel history or check-in confirmation can help.",
            "In the case of a canceled flight, the passenger often does not even receive a boarding pass, because boarding did not take place. With online check-in, the document can remain in the application or email. It's worth checking your inbox, app, phone wallet and airline account.",
            "If none of these exist, the case can still be preliminarily verified. Just keep in mind that a later step may ask for additional confirmation of identity, reservation or payment."
          ]
        },
        {
          "heading": "Create one folder just in case",
          "body": [
            "It is most practical to put all the evidence in one folder: ticket, boarding pass, messages, photos, receipts and a short timeline. This reduces the risk of losing an important detail later.",
            "A good evidence package does not have to be perfect. It is enough to clearly show the flight, date, passenger, disruption, actual arrival and costs you are looking for. Anything beyond that just makes manual checking easier."
          ]
        },
        {
          "heading": "Sometimes identity confirmation is also requested",
          "body": [
            "Some services and airlines ask for additional proof of identity, especially when the request is sent through an agent or when the payment is made to a bank account. It can be a copy of a document, a power of attorney or a signed statement.",
            "Do not send sensitive documents randomly through unverified channels. If a document is requested, check who is requesting it, why it is needed, and whether it is possible to black out data that is not relevant.",
            "For families and groups, please check separately whether a separate signature or document is required for each passenger. Many processes get stuck not because there is no basis, but because one passenger in the group does not have the complete evidence package."
          ]
        }
      ]
    }
  },
  {
    "id": "refund-vs-compensation",
    "publishedAt": "2026-04-22",
    "updatedAt": "2026-04-22",
    "sr": {
      "slug": "refundacija-karte-ili-odsteta",
      "title": "Refundacija karte ili odšteta: u čemu je razlika",
      "description": "Zašto povraćaj novca za kartu, preusmeravanje, vaučer, briga na aerodromu i fiksna naknada nisu ista prava.",
      "excerpt": "Refundacija rešava kartu koju niste iskoristili. Odšteta se odnosi na poremećaj putovanja i odgovornost aviokompanije. U nekim slučajevima možete imati pravo na oba.",
      "category": "Prava putnika",
      "readTime": "4 min čitanja",
      "sections": [
        {
          "heading": "Refundacija rešava pitanje karte",
          "body": [
            "Refundacija znači da vam se vraća novac za kartu ili deo karte koji nije iskorišćen. Najčešće se javlja kod otkazivanja leta, velikog kašnjenja, odbijanja ukrcavanja ili situacije kada put više nema svrhu.",
            "To nije kazna za aviokompaniju niti dodatna naknada za neprijatnost. Refundacija vraća vrednost usluge koju niste dobili ili koju više ne možete smisleno koristiti.",
            "Ako prihvatite refundaciju, važno je razumeti šta tačno prihvatate. Nekad refundacija zatvara samo pitanje karte, a nekad uslovi ponude pokušavaju da zatvore i sva druga potraživanja."
          ]
        },
        {
          "heading": "Odšteta je odvojeno pravo",
          "body": [
            "Fiksna odšteta zavisi od pravila o zaštiti putnika, dužine leta, kašnjenja na dolasku i odgovornosti aviokompanije. Ona nije direktno vezana za cenu karte.",
            "Zato putnik sa jeftinom kartom i putnik sa skupom kartom mogu imati isto pravo na naknadu ako su bili na istom letu i pretrpeli isti poremećaj. Obrnuto, skupa karta ne garantuje odštetu ako ruta nije pokrivena ili ako je uzrok vanredna okolnost.",
            "Odgovor korisničke podrške o refundaciji ne znači automatski da nema prava na fiksnu naknadu. To su dva različita pitanja i treba ih postaviti odvojeno."
          ]
        },
        {
          "heading": "Kada mogu postojati oba prava",
          "body": [
            "Kod otkazanog leta moguće je da putnik ima pravo na refundaciju ili preusmeravanje, a zatim i na dodatnu odštetu ako je otkazivanje bilo kasno, ruta pokrivena i razlog na strani aviokompanije.",
            "Kod velikog kašnjenja može se desiti da putnik odustane od puta i traži povraćaj karte, ali se odvojeno proverava da li postoji osnov za naknadu zbog poremećaja.",
            "Kod propuštene konekcije ili overbookinga prava mogu biti još složenija: novi let, briga tokom čekanja, refundacija troškova i fiksna naknada mogu se pojaviti zajedno, ali svako ima svoje uslove."
          ]
        },
        {
          "heading": "Preusmeravanje nije isto što i odšteta",
          "body": [
            "Kada aviokompanija obezbedi novi let, ona najčešće rešava praktičan problem kako da stignete do destinacije. To ne znači da je automatski rešila pitanje naknade.",
            "Ako novi let stiže znatno kasnije od originalnog, i dalje može postojati osnov za zahtev. Ako nova ruta stiže skoro u isto vreme, zahtev može biti slabiji ili iznos može biti drugačiji.",
            "Zato uvek čuvajte originalnu i novu kartu. Bez poređenja ta dva itinerara teško je zaključiti šta je putnik stvarno izgubio."
          ]
        },
        {
          "heading": "Vaučer traži dodatni oprez",
          "body": [
            "Vaučer može biti koristan ako ga zaista želite, ako ima dovoljno dug rok i ako ga možete iskoristiti bez skrivenih ograničenja. Problem nastaje kada vaučer dolazi sa klauzulom da se odričete daljih prava.",
            "Pre prihvatanja proverite da li vaučer zamenjuje refundaciju, fiksnu odštetu ili samo predstavlja privremenu ponudu. Ako formulacija nije jasna, sačuvajte uslove i ne žurite sa klikom."
          ]
        },
        {
          "heading": "Kako jasno napisati zahtev",
          "body": [
            "Dobar zahtev razdvaja kategorije. Jedna rečenica može tražiti fiksnu naknadu, druga refundaciju karte, treća refundaciju troškova sa računima. Tako aviokompanija teže odgovara samo na jedan deo i ignoriše ostatak.",
            "Ako niste sigurni šta tačno tražite, prvo proverite slučaj. Najčešća greška je da putnik prihvati mali vaučer ili refundaciju karte, a tek kasnije sazna da je možda imao i jači zahtev.",
            "U komunikaciji koristite iste izraze kroz ceo predmet. Ako jednom tražite refundaciju, drugi put compensation, a treći put reimbursement bez objašnjenja, podrška može odgovoriti samo na deo koji joj je najlakši. Jasna struktura čuva vaš zahtev.",
            "Korisno je u prilogu razdvojiti dokaze: dokumenti o karti, dokazi o poremećaju i računi za troškove. Tako se vidi šta dokazuje pravo na kartu, a šta pravo na dodatnu naknadu."
          ]
        },
        {
          "heading": "Plaćeni dodaci su treća kategorija",
          "body": [
            "Pored karte i odštete, postoji i pitanje plaćenih dodataka: prtljag, izbor sedišta, prioritetno ukrcavanje, lounge, obrok ili druga usluga koju niste dobili. Kod nekih režima i politika aviokompanije, neiskorišćeni dodaci mogu biti predmet posebne refundacije.",
            "To nije isto što i fiksna naknada za kašnjenje. Ako tražite povraćaj plaćenog sedišta ili prtljaga, priložite račun i objasnite zašto usluga nije pružena.",
            "Dobar zahtev zato ima tri fioke: karta, troškovi/dodaci i fiksna odšteta. Kada su te fioke pomešane, aviokompanija često odgovori samo na jednu."
          ]
        }
      ]
    },
    "en": {
      "slug": "refund-vs-flight-compensation",
      "title": "Ticket refund or compensation: what's the difference",
      "description": "Why ticket refund, rerouting, voucher, airport care and flat fee are not the same rights.",
      "excerpt": "The refund resolves the ticket that you did not use. Compensation refers to travel disruption and airline liability. In some cases you may be entitled to both.",
      "category": "Passenger rights",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "The refund resolves the ticket issue",
          "body": [
            "A refund means that money is returned to you for the ticket or part of the ticket that was not used. It most often occurs in case of flight cancellation, long delay, denied boarding or a situation when the trip no longer has a purpose.",
            "It is not a penalty for the airline or an additional charge for the inconvenience. A refund returns the value of a service that you did not receive or that you can no longer meaningfully use.",
            "If you accept a refund, it's important to understand exactly what you're accepting. Sometimes the refund closes only the issue of the ticket, and sometimes the terms of the offer try to close all other claims as well."
          ]
        },
        {
          "heading": "Compensation is a separate right",
          "body": [
            "Fixed compensation depends on passenger protection rules, flight length, arrival delay and airline liability. It is not directly related to the ticket price.",
            "Therefore, a passenger with a cheap ticket and a passenger with an expensive ticket may have the same right to compensation if they were on the same flight and suffered the same disruption. Conversely, an expensive ticket does not guarantee compensation if the route is not covered or if the cause is an extraordinary circumstance.",
            "A customer support response about a refund does not automatically mean that there is no right to a fixed fee. These are two different questions and should be asked separately."
          ]
        },
        {
          "heading": "When both rights can exist",
          "body": [
            "In the case of a canceled flight, the passenger may be entitled to a refund or rerouting, and then to additional compensation if the cancellation was late, the route covered and the reason on the airline's side.",
            "In the event of a long delay, it may happen that the passenger abandons the trip and requests a refund of the ticket, but it is checked separately whether there is a basis for compensation due to disruption.",
            "In the event of a missed connection or overbooking, the rights can be even more complex: new flight, care while waiting, reimbursement of expenses and fixed fee can appear together, but each has its own conditions."
          ]
        },
        {
          "heading": "Redirection is not the same as compensation",
          "body": [
            "When an airline provides a new flight, it usually solves the practical problem of how to get to the destination. This does not mean that it automatically resolved the compensation issue.",
            "If the new flight arrives significantly later than the original, there may still be grounds for a claim. If a new route arrives almost at the same time, the request may be weaker or the amount may be different.",
            "Therefore, always keep the original and new card. Without comparing the two itineraries, it is difficult to conclude what the traveler really lost."
          ]
        },
        {
          "heading": "Voucher asks for extra caution",
          "body": [
            "A voucher can be useful if you really want it, if it has a long enough term and if you can use it without hidden restrictions. The problem arises when the voucher comes with a clause that you waive further rights.",
            "Before accepting, check whether the voucher replaces a refund, fixed compensation or is just a temporary offer. If the wording is not clear, save the conditions and do not rush to click."
          ]
        },
        {
          "heading": "How to write a request clearly",
          "body": [
            "A good request separates the categories. One sentence may ask for a fixed fee, another for a ticket refund, a third for a refund of expenses with invoices. So the airline has a harder time answering only one part and ignoring the rest.",
            "If you're not sure exactly what you're looking for, check the case first. The most common mistake is that the passenger accepts a small voucher or ticket refund, only to find out later that he may have had a stronger request.",
            "In communication, use the same expressions throughout the subject. If you ask for a refund once, a second time for compensation, and a third time for reimbursement without explanation, support can only answer the part that is easiest for them. A clear structure protects your request.",
            "It is useful to separate the evidence in the attachment: ticket documents, evidence of disruption and expense accounts. This way you can see what proves the right to a ticket and what proves the right to an additional fee."
          ]
        },
        {
          "heading": "Paid plugins are the third category",
          "body": [
            "In addition to the ticket and compensation, there is also the issue of paid extras: baggage, seat selection, priority boarding, lounge, meal or other service that you did not receive. With some airline modes and policies, unused allowances may be subject to a separate refund.",
            "This is not the same as a fixed late fee. If you are requesting a refund of a paid seat or baggage, please include the receipt and explain why the service was not provided.",
            "A good claim therefore has three drawers: ticket, costs/extras and fixed damages. When those drawers are mixed up, the airline often only responds to one."
          ]
        }
      ]
    }
  },
  {
    "id": "claim-deadlines",
    "publishedAt": "2026-04-23",
    "updatedAt": "2026-04-23",
    "sr": {
      "slug": "rokovi-za-avio-odstetu",
      "title": "Koliko dugo posle leta možete tražiti odštetu",
      "description": "Rokovi za avio-odštetu zavise od države, rute i vrste postupka. Zato prvi korak treba uraditi brzo, čak i kada stariji let možda još vredi proveriti.",
      "excerpt": "Stariji let nije automatski izgubljen, ali čekanje pravi problem: dokumenti nestaju, rokovi za reklamaciju mogu proći, a hronologija postaje slabija.",
      "category": "Rokovi",
      "readTime": "4 min čitanja",
      "sections": [
        {
          "heading": "Ne postoji jedan rok koji važi za sve",
          "body": [
            "Putnici često čuju da mogu tražiti odštetu za letove iz poslednje tri godine. To može biti korisno kao orijentacija u nekim državama, ali nije univerzalno pravilo za svaku rutu, svaki postupak i svaki pravni osnov.",
            "Treba razlikovati nekoliko stvari: reklamaciju avio-kompaniji, žalbu nadležnom telu, posredovanje, eventualni sudski postupak i zastarelost potraživanja. Ti koraci ne moraju imati isti rok.",
            "Zato nije dobro oslanjati se na jednu rečenicu sa interneta. Za realnu procenu treba pogledati gde je let poleteo, gde je sleteo, ko je prevoznik i kojim putem želite da nastavite."
          ]
        },
        {
          "heading": "Za Srbiju je brz prvi korak posebno važan",
          "body": [
            "Kod letova koji se vode kroz lokalnu praksu u Srbiji, reklamaciju avio-prevozniku treba poslati što pre. U objašnjenjima prava putnika često se pominje kratak rok za prvi prigovor, pa odlaganje može napraviti problem i kada slučaj deluje jak.",
            "Ako prevoznik ne odgovori ili odbije reklamaciju, sledeći korak može zavisiti od toga kada ste poslali zahtev, da li je dokumentacija bila kompletna i da li imate dokaz o prijemu.",
            "Praktično pravilo je jednostavno: ako sumnjate da imate pravo, nemojte čekati mesecima. Pošaljite osnovne podatke na proveru ili pripremite urednu reklamaciju dok su dokumenti još dostupni."
          ]
        },
        {
          "heading": "Stariji letovi se proveravaju drugačije",
          "body": [
            "Stariji let ne znači automatski da je kasno. U nekim situacijama i dalje može postojati pravni put, naročito ako imate dobru dokumentaciju i ako se primenjuje režim sa dužim rokovima.",
            "Problem je dokazivanje. Što je let stariji, teže je naći boarding pass, email obaveštenja, račune, fotografije i tačno vreme dolaska. Aviokompanija takođe može teže ili sporije izvlačiti podatke.",
            "Ako imate samo sećanje da je let kasnio, slučaj je slabiji. Ako imate broj leta, datum, rutu, rezervaciju i poruke od aviokompanije, vredi proveriti i stariji poremećaj."
          ]
        },
        {
          "heading": "Koji datum je bitan",
          "body": [
            "Najčešće se polazi od datuma kada je let obavljen ili kada je trebalo da bude obavljen. Kod otkazanog leta to je planirani datum leta, ne dan kada ste kupili kartu.",
            "Kod propuštene konekcije i preusmeravanja treba sačuvati i originalni i stvarni dolazak, jer hronologija može pokazati kada je poremećaj zaista nastao i koliko je trajao.",
            "Kod komunikacije sa aviokompanijom posebno je bitan datum slanja reklamacije i datum automatske potvrde prijema. Bez toga je teže dokazati da ste reagovali na vreme."
          ]
        },
        {
          "heading": "Šta ubrzava proveru",
          "body": [
            "Najbrže se proveravaju slučajevi gde postoje broj leta, datum, ruta, booking reference i osnovna dokumentacija. Ako imate i odgovor aviokompanije, provera može biti još preciznija.",
            "Korisno je napraviti kratku vremensku liniju: planirani polazak, stvarni polazak, planirani dolazak, stvarni dolazak, datum reklamacije i odgovor aviokompanije. To ne mora biti savršeno, ali pomaže da se slučaj ne pretvori u nagađanje."
          ]
        },
        {
          "heading": "Ne čekajte odgovor koji nikada ne stiže",
          "body": [
            "Ako ste već poslali reklamaciju i aviokompanija ćuti, nemojte pustiti da meseci prođu bez traga. Pošaljite razuman follow-up, sačuvajte dokaz i proverite koji je sledeći korak.",
            "Najbolji trenutak za proveru je dok slučaj još ima sveže dokaze. Čak i kada dalji postupak ima duži rok, ranija reakcija obično pravi jači i uredniji predmet.",
            "Ako niste sigurni koji rok važi, tretirajte slučaj kao hitniji, ne kao manje hitan. Rani intake ne znači da odmah morate pokretati sve korake, ali vam daje bolju sliku šta sme da čeka, a šta ne.",
            "Posebno ne odlažite slučajeve sa više putnika, konekcijama ili troškovima hotela. Takvi predmeti traže više dokaza, pa je svaki izgubljeni email ili račun veći problem."
          ]
        },
        {
          "heading": "Rok može zavisiti od zemlje postupka",
          "body": [
            "Konkurentski servisi često navode period od nekoliko godina, ali taj podatak zavisi od zemlje u kojoj se potraživanje sprovodi. Neki putnici imaju pravo da traže starije letove, dok kod lokalne reklamacije prvi korak može biti mnogo kraći.",
            "Zato treba razlikovati marketinšku poruku claim flights from last 3 years od preciznog pravnog roka za vaš slučaj. Ruta, prevoznik, mesto polaska i nadležni organ mogu promeniti odgovor.",
            "Ako je let star, prvo pitanje je da li imate dokumente. Drugo pitanje je koji režim se primenjuje. Tek treće pitanje je da li je rok za konkretan korak prošao."
          ]
        }
      ]
    },
    "en": {
      "slug": "flight-compensation-deadlines",
      "title": "How long after the flight can you claim compensation",
      "description": "Deadlines for air compensation depend on the country, route and type of procedure. That's why the first step should be taken quickly, even when an older flight may still be worth checking.",
      "excerpt": "An older flight is not automatically lost, but waiting creates a problem: documents disappear, claim deadlines may pass, and the chronology becomes weaker.",
      "category": "Deadlines",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "There is no one-size-fits-all deadline",
          "body": [
            "Travelers often hear that they can claim compensation for flights from the last three years. It may be useful as a guide in some states, but it is not a universal rule for every route, every procedure and every legal basis.",
            "Several things should be distinguished: complaint to the airline, appeal to the competent body, mediation, possible court proceedings and limitation of claims. Those steps do not have to have the same deadline.",
            "That's why it's not good to rely on one sentence from the internet. For a realistic assessment, you should look at where the flight took off, where it landed, who the carrier is and which way you want to continue."
          ]
        },
        {
          "heading": "For Serbia, a quick first step is particularly important",
          "body": [
            "For flights operated through local practice in Serbia, the complaint should be sent to the airline as soon as possible. Explanations of passenger rights often mention a short deadline for the first complaint, so delay can be a problem even when the case seems strong.",
            "If the carrier does not respond or rejects the claim, the next step may depend on when you sent the claim, whether the documentation was complete and whether you have proof of receipt.",
            "The rule of thumb is simple: if you doubt you're eligible, don't wait months. Send the basic data for verification or prepare a proper complaint while the documents are still available."
          ]
        },
        {
          "heading": "Older flights are checked differently",
          "body": [
            "An older flight does not automatically mean that it is late. In some situations, there may still be legal recourse, especially if you have good documentation and a regime with longer deadlines applies.",
            "The problem is proof. The older the flight, the more difficult it is to find boarding passes, email notifications, receipts, photos and the exact arrival time. The airline may also find it harder or slower to extract data.",
            "If you only have the memory that the flight was delayed, the case is weaker. If you have the flight number, date, route, reservation and messages from the airline, it is worth checking the older disruption as well."
          ]
        },
        {
          "heading": "What date matters",
          "body": [
            "Most often, it starts from the date when the flight was made or when it should have been made. In the case of a canceled flight, it is the planned flight date, not the day you bought the ticket.",
            "In the case of a missed connection and redirection, the original and actual arrival should be saved, because the chronology can show when the disruption actually occurred and how long it lasted.",
            "When communicating with the airline, the date of sending the complaint and the date of automatic confirmation of receipt are particularly important. Without it, it is more difficult to prove that you reacted in time."
          ]
        },
        {
          "heading": "What speeds up the check",
          "body": [
            "Cases where there is a flight number, date, route, booking reference and basic documentation are checked the fastest. If you also have the answer from the airline, the check can be even more accurate.",
            "It is useful to make a short timeline: planned departure, actual departure, planned arrival, actual arrival, date of complaint and airline response. It doesn't have to be perfect, but it helps keep the case from becoming a guesswork."
          ]
        },
        {
          "heading": "Don't wait for an answer that never comes",
          "body": [
            "If you have already submitted a complaint and the airline is silent, don't let months go by without a trace. Send a reasonable follow-up, save the proof and check what the next step is.",
            "The best time to check is while the case still has fresh evidence. Even when the further process has a longer term, the earlier reaction usually makes a stronger and neater object.",
            "If you are not sure which deadline applies, treat the case as more urgent, not less urgent. Early intake does not mean that you have to start all the steps right away, but it gives you a better picture of what can and cannot wait.",
            "In particular, do not delay cases with multiple passengers, connections or hotel costs. Such cases require more evidence, so any lost email or account is a bigger problem."
          ]
        },
        {
          "heading": "The deadline may depend on the country of the procedure",
          "body": [
            "Competing services often state a period of several years, but this information depends on the country in which the claim is made. Some passengers have the right to request older flights, while the first step can be much shorter with a local complaint.",
            "Therefore, the marketing message claim flights from last 3 years should be distinguished from the precise legal term for your case. The route, carrier, place of departure and authority may change the answer.",
            "If the flight is old, the first question is whether you have the documents. Another question is which regime applies. Only the third question is whether the deadline for a specific step has passed."
          ]
        }
      ]
    }
  },
  {
    "id": "airport-action-plan",
    "publishedAt": "2026-04-24",
    "updatedAt": "2026-04-24",
    "sr": {
      "slug": "sta-uraditi-kada-let-kasni",
      "title": "Šta da uradite na aerodromu kada let kasni ili je otkazan",
      "description": "Praktičan plan za putnike: šta prvo rešiti, šta pitati avio-kompaniju, šta slikati i koje dokaze sačuvati dok ste još na aerodromu.",
      "excerpt": "Najbolji dokazni trag nastaje dok ste još na aerodromu. Nekoliko mirnih koraka može kasnije napraviti razliku između nejasne priče i urednog zahteva.",
      "category": "Praktični saveti",
      "readTime": "4 min čitanja",
      "sections": [
        {
          "heading": "Prvo rešite putovanje, pa zahtev",
          "body": [
            "Kada let kasni ili je otkazan, prvi cilj nije odmah pisanje reklamacije. Prvo treba rešiti praktičan problem: kako stići do destinacije, gde čekati, da li treba hotel, hrana, transfer ili nova karta.",
            "Pitajte aviokompaniju koje opcije nudi i tražite da vam ih potvrdi pisano, kroz email, SMS ili aplikaciju. Usmeno obećanje na šalteru može pomoći u trenutku, ali je kasnije teško dokazivo.",
            "Ako putujete sa decom, starijim osobama ili imate važan događaj, zapišite i te okolnosti. One ne stvaraju automatski pravo na fiksnu naknadu, ali mogu biti važne za procenu troškova i hitnosti preusmeravanja."
          ]
        },
        {
          "heading": "Pitajte za konkretan razlog",
          "body": [
            "Pitajte osoblje koji je zvaničan razlog kašnjenja ili otkazivanja. Nije isto ako je razlog tehnički kvar, kasna rotacija aviona, vremenski uslovi, odluka kontrole leta ili nedostatak posade.",
            "Ako dobijete samo usmeno objašnjenje, odmah zapišite tačnu formulaciju, vreme, šalter i ko vam je to rekao. Ako se objašnjenje menja tokom dana, sačuvajte svaku verziju.",
            "Ne morate raspravljati na aerodromu. Cilj je da prikupite trag, ne da na licu mesta dokažete pravo. Kasnije se proverava da li objašnjenje zaista oslobađa aviokompaniju odgovornosti."
          ]
        },
        {
          "heading": "Slikajte sve što menja hronologiju",
          "body": [
            "Fotografišite tablu leta, gate obaveštenje, poruke u aplikaciji, red za šalter, vaučer, novu kartu i svako obaveštenje o promeni vremena. To može izgledati previše, ali kasnije često baš te slike popune rupe.",
            "Kod kašnjenja je važno planirano i stvarno vreme dolaska. Kod otkazivanja je važno kada ste obavešteni i šta vam je ponuđeno. Kod konekcije je važno kada je prvi let stigao i kada je sledeći let otišao.",
            "Ako ste odbijeni za ukrcavanje zbog overbookinga, tražite pisanu potvrdu. Ako je ne dobijete, zapišite detalje i sačuvajte dokaze da ste bili čekirani i na gejtu na vreme."
          ]
        },
        {
          "heading": "Tražite brigu dok čekate",
          "body": [
            "Kod dužeg čekanja aviokompanija u mnogim situacijama mora da obezbedi osnovnu brigu: obroke, osveženje i komunikaciju. Ako čekanje prelazi na sledeći dan, može biti potreban hotel i transfer.",
            "Ako vam niko ne nudi pomoć, pitajte direktno šta je obezbeđeno. Ako morate sami da platite hranu, hotel ili prevoz, sačuvajte račune i zapišite zašto je trošak nastao.",
            "Briga tokom čekanja nije isto što i fiksna odšteta. Možete imati pravo na jedno, drugo, oba ili nijedno, zavisno od okolnosti."
          ]
        },
        {
          "heading": "Ne potpisujte nejasno odricanje",
          "body": [
            "Ako vam nude vaučer, milje, hotelski smeštaj ili zamenski let, pročitajte da li potpisujete da je slučaj u potpunosti zaključen. Neke ponude su korisne, ali neke mogu zatvoriti veći zahtev.",
            "Ako nemate vremena da proučite uslove, fotografišite dokument pre potpisa ili tražite da vam ga pošalju emailom. Posebno pazite na formulacije no further claims, full and final settlement ili slične izraze."
          ]
        },
        {
          "heading": "Kada se vratite, napravite kratak zapis",
          "body": [
            "Dok su detalji sveži, napišite jednostavnu hronologiju: kada je trebalo da poletite, šta se desilo, šta je rečeno, šta ste dobili, šta ste platili i kada ste stigli.",
            "Uz tu hronologiju dodajte dokumente i unesite slučaj na proveru. Dobar zahtev ne zavisi od dugog emotivnog opisa, već od jasnih činjenica i dokaza koji ih prate.",
            "Ako ste putovali sa porodicom ili grupom, zapišite imena svih putnika i ko je imao koje troškove. Kod grupnih rezervacija se lako izgubi podatak da je svaka osoba imala isti poremećaj, ali različite račune ili dokumente.",
            "Najbolje je da sve završite istog ili narednog dana. Posle nekoliko nedelja detalji počinju da se mešaju, a aplikacije aviokompanija često više ne prikazuju sve poruke."
          ]
        },
        {
          "heading": "Ne napuštajte aerodrom bez plana",
          "body": [
            "Ako vam osoblje kaže da se javite kasnije ili da sami kupite kartu, tražite da vam to potvrde pisano. Napuštanje aerodroma bez dokaza može kasnije otežati refundaciju troškova ili dokazivanje da aviokompanija nije ponudila realnu pomoć.",
            "Ako čekate noću, pitajte konkretno za hotel i transfer. Ako dobijete odgovor da ništa nije dostupno, zabeležite ga i sačuvajte račun za razuman smeštaj.",
            "Ako put više nema svrhu, pitajte za refundaciju i povratak na početnu tačku ako je to relevantno. Kod složenih putovanja pravo nije samo doći bilo kada, već dobiti smisleno rešenje za poremećeno putovanje."
          ]
        }
      ]
    },
    "en": {
      "slug": "what-to-do-when-flight-is-delayed-or-cancelled",
      "title": "What to do at the airport when your flight is delayed or cancelled",
      "description": "A practical plan for travelers: what to solve first, what to ask the airline, what to take pictures and what evidence to save while you're still at the airport.",
      "excerpt": "The best evidence is created while you are still at the airport. A few calm steps can make the difference between a vague story and a neat request later.",
      "category": "Practical tips",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "Solve the trip first, then the request",
          "body": [
            "When a flight is delayed or canceled, the first goal is not to immediately write a complaint. First, a practical problem needs to be solved: how to get to the destination, where to wait, whether you need a hotel, food, transfer or a new ticket.",
            "Ask the airline what options it offers and ask them to confirm them in writing, via email, SMS or app. A verbal promise at the counter may help in the moment, but is difficult to prove later.",
            "If you are traveling with children, elderly people or have an important event, write down those circumstances as well. They do not automatically create a right to a fixed fee, but may be important in assessing the costs and urgency of diversion."
          ]
        },
        {
          "heading": "Ask for a specific reason",
          "body": [
            "Ask the staff what the official reason for the delay or cancellation is. It is not the same if the reason is a technical failure, late rotation of the aircraft, weather conditions, flight control decision or lack of crew.",
            "If you receive only a verbal explanation, immediately write down the exact wording, time, counter and who told you. If the explanation changes throughout the day, save each version.",
            "You don't have to argue at the airport. The goal is to collect a clue, not to prove the right on the spot. Later, it is checked whether the explanation actually relieves the airline of liability."
          ]
        },
        {
          "heading": "Take a picture of anything that changes the timeline",
          "body": [
            "Take a photo of the flight board, gate notification, in-app messages, counter queue, voucher, new ticket and any time change notification. That may seem like too much, but later it's often those images that fill in the holes.",
            "In case of delays, the planned and actual time of arrival is important. When you cancel, it is important when you are informed and what you are offered. With the connection, it is important when the first flight arrived and when the next flight left.",
            "If you are denied boarding due to overbooking, ask for written confirmation. If you don't get it, write down the details and save evidence that you were checked in and at the gate on time."
          ]
        },
        {
          "heading": "Ask for care while you wait",
          "body": [
            "During a long wait, the airline in many situations has to provide basic care: meals, refreshments and communication. If the wait extends to the next day, a hotel and transfer may be required.",
            "If no one offers to help you, ask directly what is provided. If you have to pay for food, hotel or transportation yourself, keep the receipts and write down why the expense was incurred.",
            "Care while waiting is not the same as fixed compensation. You may be entitled to one, the other, both or neither, depending on the circumstances."
          ]
        },
        {
          "heading": "Don't sign a vague waiver",
          "body": [
            "If they offer you a voucher, miles, hotel accommodation or a replacement flight, read if you sign that the case is completely closed. Some offers are useful, but some can close a larger claim.",
            "If you don't have time to study the terms, take a photo of the document before signing or ask for it to be emailed to you. Pay particular attention to the wording no further claims, full and final settlement or similar expressions."
          ]
        },
        {
          "heading": "When you return, make a short note",
          "body": [
            "While the details are fresh, write a simple timeline: when you were supposed to take off, what happened, what was said, what you got, what you paid, and when you arrived.",
            "Add documents to that chronology and enter the case for review. A good claim does not depend on a long emotional description, but on clear facts and supporting evidence.",
            "If you traveled with a family or group, write down the names of all passengers and who incurred what expenses. With group reservations, it is easy to lose the information that each person had the same disorder, but different bills or documents.",
            "It is best to finish everything on the same day or the next day. After a few weeks, the details start to get mixed up, and airline apps often don't show all the messages anymore."
          ]
        },
        {
          "heading": "Don't leave the airport without a plan",
          "body": [
            "If the staff tells you to call back later or to buy the ticket yourself, ask for confirmation in writing. Leaving the airport without proof can make it difficult to get a refund later or to prove that the airline did not offer real assistance.",
            "If you are waiting at night, ask specifically about the hotel and transfer. If you get a response that nothing is available, make a note of it and save the bill for reasonable accommodation.",
            "If the trip no longer serves a purpose, ask for a refund and return to the starting point if relevant. With complex trips, the right is not just to arrive at any time, but to get a meaningful solution for a disrupted trip."
          ]
        }
      ]
    }
  },
  {
    "id": "how-to-file-airline-claim",
    "publishedAt": "2026-04-25",
    "updatedAt": "2026-04-25",
    "sr": {
      "slug": "kako-podneti-reklamaciju-avio-kompaniji",
      "title": "Kako podneti reklamaciju avio-kompaniji posle kašnjenja ili otkazivanja",
      "description": "Korak po korak vodič: koje podatke pripremiti, kako napisati zahtev, šta priložiti i kako pratiti odgovor avio-kompanije.",
      "excerpt": "Dobar zahtev nije dugačak. Dobar zahtev je precizan: let, datum, ruta, šta se desilo, šta tražite i dokazi koji to podržavaju.",
      "category": "Procedura",
      "readTime": "4 min čitanja",
      "sections": [
        {
          "heading": "Počnite od činjenica, ne od emocija",
          "body": [
            "Reklamacija avio-kompaniji treba da bude jasna i proverljiva. Pre slanja pripremite broj leta, datum, aerodrom polaska, aerodrom dolaska, booking reference i kratak opis poremećaja.",
            "Ako ste imali konekciju, navedite krajnju destinaciju iz cele rezervacije, ne samo segment koji je kasnio. Kod propuštene konekcije često je presudno koliko ste zakasnili na poslednji aerodrom, a ne samo koliko je kasnio prvi let.",
            "Nije potrebno pisati dugačak emotivan opis. Aviokompaniji treba dovoljno informacija da pronađe let, razume osnov zahteva i vidi koje dokaze prilažete."
          ],
          "bullets": [
            "broj leta i datum",
            "ruta i krajnja destinacija",
            "booking reference ili broj karte",
            "planirano i stvarno vreme dolaska"
          ]
        },
        {
          "heading": "Jasno razdvojite šta tražite",
          "body": [
            "Ako tražite fiksnu naknadu zbog kašnjenja, otkazivanja ili uskraćenog ukrcavanja, napišite to direktno. Ako tražite refundaciju karte, nadoknadu troškova hotela ili obroka, stavite to kao posebnu stavku.",
            "Mešanje refundacije, vaučera, brige na aerodromu i fiksne odštete često pravi konfuziju. Podrška tada odgovori samo na najlakši deo, na primer refundaciju karte, a zanemari naknadu.",
            "Bolje je napisati tri kratka zahteva nego jednu dugu poruku u kojoj se sve traži odjednom. Tako kasnije lakše dokazujete šta ste zaista tražili."
          ]
        },
        {
          "heading": "Priložite dokaze u urednom paketu",
          "body": [
            "Uz reklamaciju priložite potvrdu rezervacije, boarding pass ili check-in potvrdu, poruke aviokompanije i dokaze o stvarnom dolasku. Ako tražite troškove, priložite račune.",
            "Ako nemate sve dokumente, pošaljite ono što imate i jasno napišite šta nedostaje. Nedostatak jednog dokumenta ne mora značiti kraj, ali je bolje biti transparentan nego slati nejasan zahtev.",
            "Dokaze nazovite razumljivo: karta, boarding-pass, poruka-o-otkazivanju, racun-hotel. To deluje sitno, ali kod ručne obrade smanjuje greške."
          ]
        },
        {
          "heading": "Koristite zvaničan kanal",
          "body": [
            "Većina aviokompanija ima web formular ili portal za reklamacije. Ako postoji zvaničan kanal, koristite ga prvo. Posle slanja sačuvajte potvrdu, screenshot i referentni broj.",
            "Ako šaljete email, sačuvajte poslatu poruku i automatski odgovor. Bez dokaza o slanju i prijemu kasnije je teže tvrditi da je reklamacija podneta na vreme.",
            "Nemojte slati isti zahtev na deset adresa istog dana. To obično ne ubrzava predmet, već pravi konfuziju. Bolje je jedan jasan zahtev, pa uredan follow-up ako nema odgovora."
          ]
        },
        {
          "heading": "Pratite rokove i odgovor",
          "body": [
            "Posle slanja napravite kratku belešku: datum reklamacije, kanal, referentni broj i šta ste priložili. Ako aviokompanija traži dopunu, zabeležite kada ste je poslali.",
            "Ako odgovor stigne, ne gledajte samo da li piše prihvaćeno ili odbijeno. Proverite razlog. Odbijanje zbog vanrednih okolnosti, vremena, kontrole leta ili tehničkog problema treba da bude dovoljno konkretno da se može proveriti.",
            "Ako nema odgovora u relevantnom roku ili je odgovor generički, sledeći korak može biti dodatna opomena, regulatorna prijava ili pravna procena. Pre eskalacije ipak proverite da li je osnov zahteva realan."
          ]
        },
        {
          "heading": "Kada ima smisla tražiti pomoć",
          "body": [
            "Ako je slučaj čist, možete pokušati sami. Ako postoji konekcija, preusmeravanje, odbijanje, nejasan razlog ili komunikacija na više jezika, pomoć može uštedeti vreme.",
            "Letkasni.rs može pre ili posle reklamacije da pogleda da li slučaj ima smisla, šta nedostaje i kako da se zahtev ne izgubi zbog loše procedure.",
            "Pomoć je naročito korisna kada dobijete delimičan odgovor: na primer refundiran je deo karte, ali nije odgovoreno na fiksnu naknadu, ili su priznati troškovi hotela, ali nije objašnjen razlog kašnjenja. Tada treba znati šta je još otvoreno.",
            "Ako sami šaljete zahtev, sačuvajte sve potvrde. Ako kasnije uključite servis, uredna prethodna komunikacija omogućava bržu procenu i manje ponavljanja istih pitanja.",
            "To je naročito važno kod porodica i grupnih rezervacija, gde jedan propust u dokumentaciji može usporiti sve putnike."
          ]
        },
        {
          "heading": "Računajte da proces može trajati",
          "body": [
            "Ozbiljni servisi otvoreno navode da jednostavni slučajevi mogu biti rešeni brzo, ali sporni predmeti mogu trajati mesecima, naročito ako aviokompanija odbija, traži dopune ili predmet ide ka regulatoru ili sudu.",
            "Zato je važno da od početka vodite uredan folder. Ako posle tri meseca treba dopuniti predmet, ne želite da tražite boarding pass po starim porukama ili da se prisećate ko je šta rekao na gejtu.",
            "Dobar claim nije samo jedna poruka. To je proces: slanje, potvrda prijema, praćenje roka, odgovor, dopuna, eventualna eskalacija i odluka da li se nastavlja."
          ]
        }
      ]
    },
    "en": {
      "slug": "how-to-file-airline-compensation-claim",
      "title": "How to complain to an airline after a delay or cancellation",
      "description": "Step-by-step guide: what information to prepare, how to write a request, what to attach and how to track the airline's response.",
      "excerpt": "A good request is not long. A good request is specific: flight, date, route, what happened, what you are looking for and evidence to support it.",
      "category": "Claim process",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "Start with facts, not emotions",
          "body": [
            "Complaints to the airline should be clear and verifiable. Before sending, prepare the flight number, date, departure airport, arrival airport, booking reference and a short description of the disturbance.",
            "If you had a connection, please provide the final destination from the entire reservation, not just the segment that was delayed. With a missed connection, it is often how late you were at the last airport that matters, not just how late the first flight was.",
            "It is not necessary to write a long emotional description. The airline needs enough information to find the flight, understand the basis of the claim and see what evidence you are providing."
          ],
          "bullets": [
            "flight number and date",
            "route and final destination",
            "booking reference or ticket number",
            "planned and actual arrival time"
          ]
        },
        {
          "heading": "Clearly separate what you are looking for",
          "body": [
            "If you are asking for a fixed fee due to delay, cancellation or denied boarding, write it directly. If you are asking for a ticket refund, hotel or meal reimbursement, put it as a separate line item.",
            "Mixing refunds, vouchers, airport care and fixed compensation often creates confusion. Support then only answers the easiest part, for example the ticket refund, and ignores the fee.",
            "It is better to write three short requests than one long message asking everything at once. This makes it easier to prove later what you were really looking for."
          ]
        },
        {
          "heading": "Attach the evidence in a neat package",
          "body": [
            "Attach the reservation confirmation, boarding pass or check-in confirmation, airline messages and proof of actual arrival with the complaint. If you are asking for expenses, please attach receipts.",
            "If you don't have all the documents, send what you have and clearly write what is missing. Missing one document doesn't have to mean the end, but it's better to be transparent than to send a vague request.",
            "Give the evidence an understandable name: ticket, boarding-pass, cancellation-message, hotel-receipt. It seems small, but it reduces errors in manual processing."
          ]
        },
        {
          "heading": "Use the official channel",
          "body": [
            "Most airlines have a web form or portal for complaints. If there is an official channel, use it first. After sending, save the confirmation, screenshot and reference number.",
            "If you are sending an email, save the sent message and the automatic reply. Without proof of sending and receiving, it is later more difficult to claim that the complaint was filed on time.",
            "Do not send the same request to ten addresses on the same day. This usually does not speed up the subject, it creates confusion. It is better to have a clear request, then a proper follow-up if there is no answer."
          ]
        },
        {
          "heading": "Follow the deadlines and response",
          "body": [
            "After sending, make a short note: date of complaint, channel, reference number and what you have attached. If the airline asks for a refill, note when you sent it.",
            "If a reply arrives, don't just look at whether it says accepted or rejected. Check the reason. Denial due to extraordinary circumstances, weather, air traffic control or technical problem should be specific enough to be verifiable.",
            "If there is no response within the relevant time frame or the response is generic, the next step may be a further warning, regulatory filing or legal assessment. Before escalation, however, check whether the basis of the request is realistic."
          ]
        },
        {
          "heading": "When it makes sense to ask for help",
          "body": [
            "If the case is clean, you can try it yourself. If there is a connection, redirection, rejection, unclear reason or communication in multiple languages, help can save time.",
            "Before or after the complaint, letkasni.rs can check whether the case makes sense, what is missing and how to avoid losing the request due to bad procedures.",
            "Help is especially useful when you receive a partial response: for example, part of the ticket was refunded, but the fixed fee was not answered, or the hotel costs were acknowledged, but the reason for the delay was not explained. Then you need to know what is still open.",
            "If you are submitting the request yourself, please save all receipts. If you turn on the service later, proper prior communication allows for a faster assessment and fewer repetitions of the same questions.",
            "This is especially important with family and group bookings, where one slip in documentation can slow down all passengers."
          ]
        },
        {
          "heading": "Expect the process to take some time",
          "body": [
            "Serious services openly state that simple cases can be resolved quickly, but disputed cases can take months, especially if the airline refuses, asks for amendments or the case goes to a regulator or court.",
            "That's why it's important to keep a neat folder from the start. If after three months you need to refill the item, you don't want to search for the boarding pass through old messages or remember who said what at the gate.",
            "A good claim is not just one message. It is a process: sending, confirming receipt, following the deadline, replying, supplementing, eventual escalation and deciding whether to continue."
          ]
        }
      ]
    }
  },
  {
    "id": "airline-rejected-claim",
    "publishedAt": "2026-04-26",
    "updatedAt": "2026-04-26",
    "sr": {
      "slug": "avio-kompanija-odbila-zahtev",
      "title": "Aviokompanija je odbila zahtev: da li je to kraj",
      "description": "Zašto prvo odbijanje avio-kompanije ne mora biti konačno, koje razloge treba proveriti i kada nema smisla nastavljati postupak.",
      "excerpt": "Generičko odbijanje nije isto što i dobro obrazložen pravni odgovor. Važno je proveriti da li razlog odgovara letu, ruti i dokazima.",
      "category": "Posle odbijanja",
      "readTime": "4 min čitanja",
      "sections": [
        {
          "heading": "Prvo odbijanje često nije cela priča",
          "body": [
            "Aviokompanije ponekad šalju kratke odgovore: vanredne okolnosti, operativni razlozi, tehnički problem, odluka kontrole leta ili nema prava na naknadu. Takav odgovor može biti tačan, ali nije dovoljan sam po sebi.",
            "Dobar odgovor treba da ima vezu sa konkretnim letom: datumom, rutom, razlogom poremećaja i merama koje je aviokompanija preduzela. Ako je poruka generička, slučaj vredi pročitati pažljivije.",
            "Odbijanje nije poziv da se automatski ide dalje po svaku cenu. To je signal da treba proveriti da li je razlog stvaran, relevantan i dovoljno konkretan."
          ]
        },
        {
          "heading": "Koji razlozi traže dodatnu proveru",
          "body": [
            "Posebno treba proveriti odgovore koji samo navode weather, safety, technical issue, operational reasons ili air traffic restrictions bez detalja. Neki od tih razloga zaista mogu isključiti naknadu, ali se često koriste preširoko.",
            "Tehnički problem nije automatski vanredna okolnost. Loše vreme jeste ozbiljan razlog samo ako je stvarno uticalo na taj let. Kašnjenje prethodnog leta mora imati jasnu vezu sa vašim poremećajem.",
            "Ako se odgovor aviokompanije ne poklapa sa porukama koje ste dobijali na aerodromu, fotografijama table leta ili javno dostupnim informacijama, postoji razlog za dodatnu analizu."
          ]
        },
        {
          "heading": "Šta poslati na ručnu proveru",
          "body": [
            "Za proveru odbijanja pošaljite originalni zahtev, odgovor aviokompanije, broj leta, datum, rutu, booking confirmation, boarding pass i sve poruke koje imate. Ako ste preusmereni, dodajte novi itinerary.",
            "Korisno je poslati i kratku hronologiju: kada je let trebalo da krene, kada je stvarno krenuo, kada ste stigli, kada ste poslali reklamaciju i kada je stiglo odbijanje.",
            "Ako imate račune za hotel, hranu ili transfer, priložite ih odvojeno. Čak i kada je fiksna naknada sporna, troškovi brige mogu biti posebno pitanje."
          ]
        },
        {
          "heading": "Kako razlikovati loš odgovor od slabog slučaja",
          "body": [
            "Loš odgovor je kratak, generički i ne objašnjava činjenice. Slab slučaj je nešto drugo: ruta nije pokrivena, kašnjenje na dolasku nije dovoljno, putnik je zakasnio na gate ili su dokazi jasni da je postojala vanredna okolnost.",
            "Zato nije dovoljno reći aviokompanija me odbila. Treba pročitati zašto je odbila i uporediti to sa pravilima i dokazima. Nekad se ispostavi da je odbijanje površno, a nekad da je zahtev zaista slab.",
            "Dobar servis treba da kaže oba ishoda. Nema vrednosti u guranju slučaja koji nema realan osnov."
          ]
        },
        {
          "heading": "Mogući sledeći koraci",
          "body": [
            "Ako odbijanje nije ubedljivo, sledeći korak može biti dopuna zahteva, traženje konkretnijeg obrazloženja, regulatorna prijava ili pravna procena. Redosled zavisi od rute, dokumentacije i lokalne procedure.",
            "Ako je odgovor delimično tačan, možda ima smisla tražiti samo refundaciju troškova, a ne fiksnu naknadu. Ako je odgovor potpuno neosnovan, slučaj može ići dalje agresivnije.",
            "Najgore je reagovati impulsivno i poslati ljutu poruku bez novih činjenica. Bolje je poslati kratak, precizan odgovor koji pokazuje šta je sporno."
          ]
        },
        {
          "heading": "Kada ne treba insistirati",
          "body": [
            "Ako dokumenti jasno pokazuju da je uzrok bio zatvaranje aerodroma, ozbiljno nevreme, bezbednosna odluka ili druga okolnost van kontrole aviokompanije, insistiranje može biti gubljenje vremena.",
            "Isto važi ako je kašnjenje na dolasku bilo ispod praga ili ako ruta ne ulazi u relevantan okvir. Poštena procena je bolja od lažne nade.",
            "Ipak, i tada treba odvojiti fiksnu naknadu od ostalih prava. Možda ne postoji pravo na 250, 400 ili 600 evra, ali i dalje može postojati refundacija karte, refundacija razumnih troškova ili pravo na bolji pisani odgovor.",
            "Zato se ne odustaje samo zato što je stigla reč odbijeno. Odustaje se kada se vidi da činjenice, ruta i dokazi zaista ne nose dalji zahtev."
          ]
        },
        {
          "heading": "Delimična isplata ne rešava uvek sve",
          "body": [
            "Neki putnici dobiju refundaciju troškova, vaučer ili deo karte, pa aviokompanija to predstavi kao rešavanje slučaja. To ne znači automatski da je pitanje fiksne odštete zatvoreno.",
            "Ako je aviokompanija platila hotel, to može značiti da je priznala pravo na brigu, ali ne govori nužno ništa o naknadi od 250, 400 ili 600 evra. Ako je vratila kartu, to opet ne mora rešiti pitanje poremećaja.",
            "Zato kod odbijanja treba proveriti šta je tačno odbijeno, a šta je eventualno priznato. Delimičan odgovor često ostavlja prostor za precizniji nastavak."
          ]
        }
      ]
    },
    "en": {
      "slug": "airline-rejected-compensation-claim",
      "title": "The airline refused the request: is that the end",
      "description": "Why the first refusal of the airline does not have to be final, what reasons should be checked and when it does not make sense to continue the procedure.",
      "excerpt": "A generic refusal is not the same as a well-reasoned legal response. It is important to check that the reason matches the flight, route and evidence.",
      "category": "After rejection",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "The first rejection is often not the whole story",
          "body": [
            "Airlines sometimes send short replies: extraordinary circumstances, operational reasons, technical problem, flight control decision or no right to compensation. Such an answer may be correct, but it is not sufficient in itself.",
            "A good answer should be related to the specific flight: date, route, reason for disruption and measures taken by the airline. If the message is generic, the case is worth reading more carefully.",
            "Rejection is not an invitation to automatically move on at any cost. It is a signal to check whether the reason is real, relevant and concrete enough."
          ]
        },
        {
          "heading": "What reasons require additional verification",
          "body": [
            "You should especially check answers that only mention weather, safety, technical issue, operational reasons or air traffic restrictions without details. Some of these reasons may indeed exclude compensation, but they are often used too broadly.",
            "A technical problem is not automatically an extraordinary circumstance. Bad weather is a serious reason only if it really affected that flight. The delay in the previous flight must have a clear connection to your disorder.",
            "If the airline's response does not match the messages you received at the airport, photos of the flight board or publicly available information, there is reason for further analysis."
          ]
        },
        {
          "heading": "What to send for manual check",
          "body": [
            "To check the rejection, send the original request, the airline's response, flight number, date, route, booking confirmation, boarding pass and any messages you have. If you are redirected, add a new itinerary.",
            "It is also useful to send a short chronology: when the flight was supposed to leave, when it actually left, when you arrived, when you sent the complaint and when the rejection arrived.",
            "If you have hotel, food or transfer receipts, attach them separately. Even where a fixed fee is in dispute, the cost of care may be a separate issue."
          ]
        },
        {
          "heading": "How to distinguish a bad answer from a weak case",
          "body": [
            "A bad answer is short, generic and doesn't explain the facts. A weak case is something else: the route is not covered, the delay in arrival is not sufficient, the passenger is late for the gate, or the evidence is clear that there was an extraordinary circumstance.",
            "So it's not enough to say the airline rejected me. You should read why she refused and compare it with the rules and the evidence. Sometimes it turns out that the refusal is superficial, and sometimes the request is really weak.",
            "A good serve should tell both outcomes. There is no value in pushing a case that has no real basis."
          ]
        },
        {
          "heading": "Possible next steps",
          "body": [
            "If the refusal is not convincing, the next step may be to supplement the request, request a more specific explanation, a regulatory application or a legal assessment. The sequence depends on the route, documentation and local procedure.",
            "If the answer is partially correct, it may make sense to ask for reimbursement of expenses only, rather than a fixed fee. If the answer is completely baseless, the case can proceed more aggressively.",
            "The worst thing is to react impulsively and send an angry message without new facts. It is better to send a short, precise answer that shows what is in dispute."
          ]
        },
        {
          "heading": "When not to insist",
          "body": [
            "If the documents clearly show that the cause was an airport closure, severe weather, a security decision, or another circumstance beyond the airline's control, insisting may be a waste of time.",
            "The same applies if the arrival delay was below the threshold or if the route does not enter the relevant frame. An honest assessment is better than a false hope.",
            "However, even then the fixed fee should be separated from other rights. There may not be a right to €250, €400 or €600, but there may still be a ticket refund, a refund of reasonable expenses or a right to a better written answer.",
            "That's why you don't give up just because the word rejected arrived. It is given up when it is seen that the facts, the route and the evidence really do not support a further request."
          ]
        },
        {
          "heading": "Partial payment does not always solve everything",
          "body": [
            "Some passengers get a refund, a voucher or part of their fare, and the airline presents it as a settlement of the case. This does not automatically mean that the issue of fixed damages is closed.",
            "If the airline has paid for the hotel, it may mean that they have recognized the right to care, but it does not necessarily say anything about the compensation of 250, 400 or 600 euros. If she returned the ticket, that again doesn't necessarily solve the disruption issue.",
            "That's why in the case of rejection, you should check what exactly was rejected and what was eventually recognized. A partial answer often leaves room for a more precise continuation."
          ]
        }
      ]
    }
  },
  {
    "id": "voucher-or-cash-compensation",
    "publishedAt": "2026-04-27",
    "updatedAt": "2026-04-27",
    "sr": {
      "slug": "vaucer-ili-novac-avio-kompanija",
      "title": "Vaučer ili novac: šta proveriti pre nego što prihvatite ponudu",
      "description": "Aviokompanija može ponuditi vaučer, milje, refundaciju ili preusmeravanje. Evo kako da proverite realnu vrednost ponude i da li se odričete prava.",
      "excerpt": "Vaučer nije automatski loš, ali postaje problem ako prihvatate nejasne uslove i time zatvarate veći novčani zahtev.",
      "category": "Nagodba",
      "readTime": "4 min čitanja",
      "sections": [
        {
          "heading": "Vaučer može biti koristan",
          "body": [
            "Ako vam aviokompanija nudi vaučer koji zaista možete iskoristiti, to može biti praktično rešenje. Nekome ko redovno leti istom kompanijom vaučer od većeg iznosa može vredeti skoro kao novac.",
            "Problem nije vaučer kao takav. Problem su uslovi: rok važenja, ograničene rute, nemogućnost prenosa, doplate, sezonska ograničenja i formulacije da prihvatanjem zatvarate ceo slučaj.",
            "Pre prihvatanja zato treba uporediti realnu vrednost vaučera sa potencijalnom novčanom naknadom, refundacijom karte ili troškovima koje ste imali."
          ]
        },
        {
          "heading": "Novac je čistiji i fleksibilniji",
          "body": [
            "Fiksna naknada, kada postoji, obično se izražava u novcu. Novac ne zavisi od toga da li ćete opet leteti istom aviokompanijom, da li će ista ruta postojati ili da li ćete stići da iskoristite vaučer pre isteka.",
            "Zbog toga je novac često čistije rešenje za putnika. Ako je potencijalna odšteta 250, 400 ili 600 evra, vaučer treba gledati kroz pitanje koliko vam realno vredi, ne koliko nominalno piše na ponudi.",
            "Vaučer od 300 evra koji ističe za šest meseci i važi samo za skupe karte može realno vredeti mnogo manje od 300 evra u gotovini."
          ]
        },
        {
          "heading": "Pazite na odricanje od prava",
          "body": [
            "Neki formulari ili nagodbe sadrže klauzulu da prihvatanjem ponude nemate dalje potraživanje. To može značiti da zatvarate pravo na dodatnu naknadu, čak i ako kasnije shvatite da je slučaj bio jači.",
            "Posebno pazite na formulacije full and final settlement, no further claims, waiver ili bilo kakvu izjavu da je putnik u potpunosti namiren. Ako je tekst na stranom jeziku, ne klikćite automatski accept.",
            "Ako niste sigurni, sačuvajte ponudu i uslove. Bolje je proveriti slučaj pre prihvatanja nego kasnije dokazivati da niste razumeli šta ste potpisali."
          ]
        },
        {
          "heading": "Razlikujte vaučer, refundaciju i brigu",
          "body": [
            "Vaučer za budući let nije isto što i refundacija karte. Refundacija vraća novac za uslugu koju niste iskoristili. Briga na aerodromu pokriva obroke, hotel ili transfer tokom čekanja. Fiksna odšteta je posebna kategorija.",
            "Aviokompanija ponekad ponudi jednu stvar i predstavi je kao rešenje svega. Putnik treba da proveri da li ponuda rešava samo praktičan problem ili zatvara i pravni zahtev.",
            "Ako ste dobili obrok ili hotel, to ne znači da ste automatski izgubili pravo na fiksnu naknadu. Ako ste dobili refundaciju, ne znači da je pitanje odštete nužno rešeno."
          ]
        },
        {
          "heading": "Šta sačuvati pre klika",
          "body": [
            "Sačuvajte screenshot ponude, uslove korišćenja, email potvrdu, rok važenja, iznos i sve što pokazuje da li se odričete daljih prava. Ako se ponuda menja u aplikaciji, slikajte svaki ekran pre potvrde.",
            "Ako vam ponudu daju na šalteru, tražite papir ili email. Ako nema ničega, zapišite vreme, mesto i ime službe ako ga imate.",
            "Ovi detalji kasnije odlučuju da li ima prostora za nastavak ili je prihvatanjem ponude slučaj praktično zatvoren."
          ]
        },
        {
          "heading": "Kada prihvatiti, a kada proveriti",
          "body": [
            "Ako je ponuda jasna, korisna i veća od onoga što realno možete tražiti, prihvatanje može imati smisla. Ako je ponuda mala, nejasna ili traži odricanje od prava, prvo proverite slučaj.",
            "Najvažnije je da odluka bude svesna. Vaučer može biti dobar izbor, ali ne sme biti rezultat pritiska, žurbe ili nejasnih uslova.",
            "Uporedite i praktične detalje: da li vaučer pokriva takse, da li se može koristiti za više putnika, da li mora da se potroši odjednom i šta se dešava ako nova karta košta manje od vrednosti vaučera.",
            "Ako vam aviokompanija daje kratak rok za prihvatanje, to je dodatni razlog da sačuvate uslove i brzo proverite vrednost slučaja. Dobra odluka traži podatke, ne paniku."
          ]
        },
        {
          "heading": "Pazite na milje i travel credit",
          "body": [
            "Ponuda ne mora biti samo vaučer. Aviokompanija može ponuditi milje, travel credit, popust na sledeću kartu ili kombinaciju pogodnosti. Sve to treba prevesti u realnu vrednost za vas.",
            "Milje mogu vredeti mnogo manje ako ih ne koristite često, ako imaju ograničenu dostupnost ili ako uz njih i dalje plaćate visoke takse. Travel credit može biti vezan za ime putnika, rok važenja ili jednu aviokompaniju.",
            "Ako birate između novca i kredita, pitajte da li prihvatanjem kredita odustajete od novčanog zahteva. To je najvažnija tačka."
          ]
        }
      ]
    },
    "en": {
      "slug": "airline-voucher-or-cash-compensation",
      "title": "Voucher or cash: what to check before accepting an offer",
      "description": "The airline may offer a voucher, miles, refund or rerouting. Here's how to check the fair value of the offer and whether you're waiving your rights.",
      "excerpt": "A voucher is not automatically bad, but it becomes a problem if you accept unclear terms and thereby close a larger monetary claim.",
      "category": "Settlement",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "A voucher can be useful",
          "body": [
            "If the airline offers you a voucher that you can actually use, it can be a practical solution. To someone who flies regularly with the same company, a voucher of a larger amount can be worth almost as much as money.",
            "The problem is not the voucher as such. The problem is the conditions: validity period, limited routes, non-transferability, surcharges, seasonal restrictions and wording that acceptance closes the whole case.",
            "Before accepting, therefore, you should compare the real value of the voucher with the potential monetary compensation, ticket refund or expenses you incurred."
          ]
        },
        {
          "heading": "Money is cleaner and more flexible",
          "body": [
            "A fixed fee, when it exists, is usually expressed in money. The money does not depend on whether you will fly again with the same airline, whether the same route will exist or whether you will manage to use the voucher before it expires.",
            "Therefore, money is often a cleaner solution for the traveler. If the potential compensation is 250, 400 or 600 euros, the voucher should be viewed through the question of how much it is really worth to you, not how much is nominally written on the offer.",
            "A €300 voucher that expires in six months and is only valid for expensive tickets can realistically be worth much less than €300 in cash."
          ]
        },
        {
          "heading": "Watch out for disclaimers",
          "body": [
            "Some forms or settlements contain a clause that by accepting the offer you have no further claim. This may mean that you close your right to additional compensation, even if you later realize that the case was stronger.",
            "Pay particular attention to the wording full and final settlement, no further claims, waiver or any statement that the passenger is fully satisfied. If the text is in a foreign language, do not automatically click accept.",
            "If you are not sure, save the offer and terms. It is better to check the case before acceptance than to prove later that you did not understand what you signed."
          ]
        },
        {
          "heading": "Differentiate between voucher, refund and care",
          "body": [
            "A voucher for a future flight is not the same as a ticket refund. A refund returns money for a service you did not use. Airport care covers meals, hotel or transfer during the wait. Fixed compensation is a separate category.",
            "An airline sometimes offers one thing and presents it as the solution to everything. The traveler should check whether the offer only solves a practical problem or closes a legal claim as well.",
            "If you received a meal or a hotel, this does not mean that you automatically lost your right to a fixed allowance. If you have received a refund, it does not mean that the issue of compensation is necessarily resolved."
          ]
        },
        {
          "heading": "What to save before clicking",
          "body": [
            "Save a screenshot of the offer, terms of use, email confirmation, expiration date, amount, and anything that indicates you are waiving any further rights. If the offer changes in the app, take a screenshot of each screen before confirming.",
            "If they give you an offer at the counter, ask for paper or email. If there is nothing, write down the time, place and name of the service if you have one.",
            "These details later decide whether there is room to proceed or whether accepting the offer effectively closes the case."
          ]
        },
        {
          "heading": "When to accept and when to check",
          "body": [
            "If the offer is clear, useful and more than what you can realistically ask for, acceptance may make sense. If the offer is small, vague or requires a disclaimer, check the case first.",
            "The most important thing is that the decision is conscious. A voucher can be a good choice, but it must not be the result of pressure, haste or unclear terms.",
            "Compare the practical details too: does the voucher cover taxes, can it be used for multiple passengers, does it have to be spent at once and what happens if the new ticket costs less than the value of the voucher.",
            "If the airline gives you a short acceptance period, that's an additional reason to save the terms and quickly check the value of the case. A good decision requires data, not panic."
          ]
        },
        {
          "heading": "Watch out for miles and travel credit",
          "body": [
            "The offer does not have to be just a voucher. The airline may offer miles, travel credit, a discount on the next ticket or a combination of benefits. All of that needs to be translated into real value for you.",
            "Miles can be worth much less if you don't use them often, if they have limited availability, or if you still pay high fees with them. Travel credit can be linked to the passenger's name, expiration date or one airline.",
            "If you are choosing between money and a loan, ask if accepting the loan waives the money requirement. That is the most important point."
          ]
        }
      ]
    }
  },
  {
    "id": "airline-response-no-answer",
    "publishedAt": "2026-04-28",
    "updatedAt": "2026-04-28",
    "sr": {
      "slug": "avio-kompanija-ne-odgovara-na-reklamaciju",
      "title": "Aviokompanija ne odgovara na reklamaciju: šta je sledeći korak",
      "description": "Šta uraditi ako avio-kompanija ćuti, traži iste dokumente, šalje automatske odgovore ili ne daje obrazloženu odluku.",
      "excerpt": "Tišina nije odgovor, ali sledeći korak je jači ako imate dokaz kada ste poslali reklamaciju, šta ste poslali i koliko je vremena prošlo.",
      "category": "Procedura",
      "readTime": "4 min čitanja",
      "sections": [
        {
          "heading": "Prvo proverite da li je zahtev kompletan",
          "body": [
            "Ako aviokompanija traži dopunu, proverite da li je zahtev zaista nepotpun ili traži dokumente koje ste već poslali. Nekad je dopuna opravdana, a nekad je samo deo sporog procesa.",
            "Pošaljite ono što razumno nedostaje i sačuvajte dokaz slanja. Ako ste dokument već poslali, odgovorite mirno i priložite ga ponovo, uz napomenu kada je prvobitno dostavljen.",
            "Najčešći problem je nedostatak referentnog broja reklamacije. Bez njega je teže dokazati da predmet postoji i pratiti status kroz korisničku podršku."
          ]
        },
        {
          "heading": "Napravite vremensku liniju",
          "body": [
            "Zapišite datum leta, datum reklamacije, kanal slanja, referentni broj, datum automatske potvrde, svaku dopunu i svaki odgovor. Ta jednostavna hronologija kasnije štedi mnogo vremena.",
            "Ako slučaj ide ka regulatornoj prijavi ili pravnoj proveri, vremenska linija je često prva stvar koja se traži. Ona pokazuje da niste samo čekali, već ste uredno pratili proceduru.",
            "U vremensku liniju dodajte i praktične događaje: kada je ponuđen alternativni let, kada ste stigli, kada ste platili hotel ili kada ste dobili vaučer."
          ]
        },
        {
          "heading": "Razlikujte ćutanje od neobrazloženog odgovora",
          "body": [
            "Ćutanje znači da nema stvarnog odgovora posle slanja kompletne reklamacije. Neobrazložen odgovor je kada aviokompanija pošalje kratku poruku bez konkretnih činjenica, na primer samo vanredne okolnosti.",
            "Oba slučaja mogu zahtevati sledeći korak, ali pristup nije isti. Kod ćutanja je fokus na dokazu da ste zahtev poslali i da je rok prošao. Kod lošeg odgovora fokus je na tome zašto obrazloženje nije dovoljno.",
            "Zato sačuvajte i automatske odgovore. Oni mogu pokazati da je aviokompanija primila predmet, čak i ako kasnije ne odgovara sadržinski."
          ]
        },
        {
          "heading": "Kada poslati follow-up",
          "body": [
            "Ako je prošlo razumno vreme bez odgovora, pošaljite kratak follow-up. Navedite referentni broj, datum prvog zahteva, let i kratko tražite status ili obrazloženu odluku.",
            "Nemojte slati novu emocionalnu reklamaciju od početka. Cilj follow-upa je da pokaže urednost i da ostavi trag da ste pokušali da rešite stvar direktno sa prevoznikom.",
            "Ako aviokompanija stalno traži iste dokumente, odgovorite listom šta je priloženo i kada. Takva komunikacija kasnije pomaže ako se tvrdi da dokumentacija nije bila kompletna."
          ]
        },
        {
          "heading": "Kada eskalirati",
          "body": [
            "Ako avio-prevoznik ne odgovori u relevantnom roku ili odgovor ne sadrži stvarno obrazloženje, sledeći korak može biti regulatorna prijava, dodatna formalna opomena ili procena za sudski put.",
            "Ne treba eskalirati naslepo. Prvo proverite da li je osnov zahteva realan: ruta, razlog poremećaja, kašnjenje na dolasku i dokazi. Slab slučaj neće postati jak samo zato što aviokompanija kasni sa odgovorom.",
            "Ako je osnov dobar, uredna dokumentacija i vremenska linija daju mnogo bolju poziciju nego niz nepovezanih poruka."
          ]
        },
        {
          "heading": "Kako letkasni.rs pomaže",
          "body": [
            "U ovakvom slučaju korisno je da neko pročita celu komunikaciju i kaže šta nedostaje: dokaz, rok, pravni osnov, jasniji zahtev ili sledeći proceduralni korak.",
            "Cilj nije da se svaki slučaj gura po svaku cenu, već da se dobar slučaj ne izgubi zbog loše procedure ili ćutanja avio-kompanije.",
            "Pregled komunikacije često pokaže jednostavne propuste: nema referentnog broja, nije priložen novi itinerary, zahtev meša troškove i odštetu ili odgovor aviokompanije nije sačuvan u celosti.",
            "Kada se to sredi, sledeći korak je mnogo jasniji. Nekad je dovoljan jedan uredan follow-up, a nekad je bolje odmah pripremiti predmet za dalju proveru.",
            "Ako se vidi da je zahtev slab, to je takođe koristan ishod. Tada ne trošite dodatne mesece na dopisivanje koje ne može promeniti osnovne činjenice.",
            "Ako je zahtev dobar, uredan paket dokaza omogućava da se dalji koraci vode mirnije i bez stalnog vraćanja na početak."
          ]
        },
        {
          "heading": "Proverite da li postoji skriven status",
          "body": [
            "Neke aviokompanije ne šalju uvek jasan email, već status promene ostaje u portalu ili aplikaciji. Ako čekate odgovor, proverite i korisnički nalog, spam folder, claim portal i sve adrese koje ste koristili.",
            "Ako vidite status zatvoreno, rejected ili resolved bez obrazloženja, napravite screenshot. To je dokaz da predmet postoji i da je aviokompanija donela neku odluku, čak i ako vam je nije uredno poslala.",
            "U follow-upu tražite da vam odluku i obrazloženje pošalju pisano. Bez toga je teže razumeti da li treba slati dopunu, žalbu ili novi zahtev."
          ]
        }
      ]
    },
    "en": {
      "slug": "airline-not-responding-to-compensation-claim",
      "title": "The airline does not respond to the complaint: what is the next step",
      "description": "What to do if the airline is silent, asks for the same documents, sends automatic responses or does not give a reasoned decision.",
      "excerpt": "Silence is not the answer, but the next step is stronger if you have proof of when you sent the complaint, what you sent and how much time has passed.",
      "category": "Claim process",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "First, check that the request is complete",
          "body": [
            "If the airline asks for a supplement, check if the request is really incomplete or if it is asking for documents you have already sent. Sometimes the supplement is justified, and sometimes it is just part of a slow process.",
            "Send what is reasonably missing and keep proof of sending. If you have already submitted the document, please respond calmly and re-attach it, noting when it was originally submitted.",
            "The most common problem is the lack of a complaint reference number. Without it, it is more difficult to prove that the item exists and track the status through customer support."
          ]
        },
        {
          "heading": "Create a timeline",
          "body": [
            "Write down the flight date, complaint date, shipping channel, reference number, automatic confirmation date, each amendment and each reply. That simple chronology saves a lot of time later.",
            "If a case is headed for a regulatory filing or legal review, a timeline is often the first thing to look for. It shows that you didn't just wait, you followed the procedure properly.",
            "Add practical events to the timeline: when an alternative flight was offered, when you arrived, when you paid for your hotel or when you received a voucher."
          ]
        },
        {
          "heading": "Distinguish silence from an unreasoned response",
          "body": [
            "Silence means that there is no real response after sending a complete complaint. An unreasonable response is when the airline sends a short message without specific facts, for example only extraordinary circumstances.",
            "Both cases may require a next step, but the approach is not the same. With silence, the focus is on proof that you sent the request and that the deadline has passed. With a bad answer, the focus is on why the explanation is not sufficient.",
            "So save the automatic replies as well. They can show that the airline has received the item, even if it doesn't match the content later."
          ]
        },
        {
          "heading": "When to send a follow-up",
          "body": [
            "If a reasonable amount of time has passed without a response, send a short follow-up. Enter the reference number, the date of the first request, the flight and briefly ask for the status or reasoned decision.",
            "Do not send a new emotional complaint from the beginning. The goal of the follow-up is to show regularity and to leave a mark that you tried to resolve the matter directly with the carrier.",
            "If the airline keeps asking for the same documents, respond with a list of what was attached and when. Such communication helps later if it is claimed that the documentation was not complete."
          ]
        },
        {
          "heading": "When to escalate",
          "body": [
            "If the air carrier does not respond within the relevant time frame or the response does not contain a real explanation, the next step may be a regulatory complaint, a further formal warning or an assessment for the court route.",
            "Do not escalate blindly. First, check that the basis of the request is realistic: the route, the reason for the disruption, the delay in arrival and the evidence. A weak case will not become strong just because the airline is late in responding.",
            "If the foundation is good, neat documentation and a timeline give a much better position than a series of unrelated messages."
          ]
        },
        {
          "heading": "How letkasni.rs helps",
          "body": [
            "In such a case, it is useful to have someone read the entire communication and say what is missing: proof, deadline, legal basis, clearer request or next procedural step.",
            "The goal is not to push every case at all costs, but to ensure that a good case is not lost due to poor procedure or the silence of the airline.",
            "A review of the communication often reveals simple omissions: there is no reference number, no new itinerary is attached, the request mixes costs and compensation, or the airline's response is not saved in its entirety.",
            "Once that's taken care of, the next step is much clearer. Sometimes a proper follow-up is enough, and sometimes it is better to immediately prepare the subject for further inspection.",
            "If the demand is seen to be weak, this is also a beneficial outcome. Then you don't spend extra months on correspondence that can't change the basic facts.",
            "If the request is good, an orderly package of evidence allows further steps to be taken more calmly and without constantly returning to the beginning."
          ]
        },
        {
          "heading": "Check if there is a hidden status",
          "body": [
            "Some airlines do not always send a clear email, but the status of the change remains in the portal or application. If you are waiting for a response, please also check the user account, spam folder, claim portal and all the addresses you used.",
            "If you see the status closed, rejected or resolved without an explanation, take a screenshot. It's proof that the item exists and that the airline has made a decision, even if they haven't sent it to you properly.",
            "In the follow-up, you ask that the decision and explanation be sent to you in writing. Without it, it is more difficult to understand whether to send a supplement, a complaint or a new request."
          ]
        }
      ]
    }
  },
  {
    "id": "use-claim-service-or-diy",
    "publishedAt": "2026-04-29",
    "updatedAt": "2026-04-29",
    "sr": {
      "slug": "servis-za-avio-odstetu-ili-samostalno",
      "title": "Da li zahtev slati sami ili preko servisa za avio-odštetu",
      "description": "Kada ima smisla pokušati samostalno, a kada servis štedi vreme, stres, proceduralne greške i komunikaciju sa avio-kompanijom.",
      "excerpt": "Jednostavan slučaj možete probati sami. Sporan slučaj traži disciplinu: dokaze, rokove, komunikaciju, proveru razloga i spremnost na odbijanje.",
      "category": "Izbor puta",
      "readTime": "4 min čitanja",
      "sections": [
        {
          "heading": "Kada samostalni zahtev ima smisla",
          "body": [
            "Ako je let očigledno stigao više od tri sata kasno, ruta je pokrivena, aviokompanija ne pominje vanredne okolnosti i imate sve dokumente, samostalna reklamacija može biti razumna.",
            "U tom slučaju najvažnije je da zahtev bude jasan, kratak i poslat kroz zvaničan kanal. Potrebni su broj leta, datum, ruta, booking reference, opis poremećaja i ono što tražite.",
            "Samostalni put je naročito logičan kada imate vremena da pratite status, odgovorite na dopune i nastavite komunikaciju ako prvi odgovor nije dobar."
          ]
        },
        {
          "heading": "Kada slučaj postaje teži",
          "body": [
            "Servis ima veću vrednost kada slučaj nije čist: propuštena konekcija, više segmenata, delimično preusmeravanje, otkazivanje uz nejasan razlog, overbooking, odbijen zahtev ili komunikacija na više jezika.",
            "Tada problem nije samo popuniti formular. Problem je proceniti da li slučaj vredi gurati, koji pravni okvir ima smisla, šta nedostaje od dokaza i kako odgovoriti na odbranu aviokompanije.",
            "Ako aviokompanija kaže vanredne okolnosti, tehnički problem ili kontrola leta, treba znati kada je to stvarno validno, a kada preširoko objašnjenje."
          ]
        },
        {
          "heading": "Uporedite vreme, stres i proviziju",
          "body": [
            "Ako servis radi uz proviziju samo po uspehu, glavno pitanje je da li vam je vredno da deo naplate zamenite za manje posla, bolju proceduru i manje direktne komunikacije sa aviokompanijom.",
            "Kod jednostavnog slučaja možda vam se više isplati da pokušate sami. Kod spornog slučaja provizija može biti razumna cena za procenu, vođenje, praćenje rokova i odgovor na odbijanje.",
            "Važno je razumeti model pre slanja. Kod letkasni.rs ideja je jednostavna: bez troškova unapred i provizija samo ako se slučaj naplati."
          ]
        },
        {
          "heading": "Dobar servis ne obećava sve",
          "body": [
            "Ako neko garantuje isplatu bez provere rute, razloga, dokumentacije i stvarnog dolaska, to je slab signal. Kod avio-odštete detalji odlučuju.",
            "Dobar servis treba da kaže i kada slučaj nije realan. To je korisno, jer štedi vreme i sprečava da putnik očekuje novac za slučaj koji pravno ne stoji.",
            "Bolji pristup je konzervativna procena, jasno objašnjenje i sledeći korak koji ima smisla: reklamacija, dopuna, čekanje odgovora, eskalacija ili odustajanje."
          ]
        },
        {
          "heading": "Šta i dalje ostaje na putniku",
          "body": [
            "Čak i kada koristite servis, putnik mora obezbediti tačne informacije i dokumente. Servis ne može izmisliti boarding pass, booking reference, račun za hotel ili poruku aviokompanije.",
            "Putnik treba da bude iskren oko činjenica: da li je došao na gate na vreme, da li su karte bile odvojene, da li je prihvatio vaučer, da li je već dobio refundaciju i šta je potpisao.",
            "Što su informacije tačnije, to je procena bolja. Preuveličavanje ili preskakanje detalja kasnije samo slabi slučaj."
          ]
        },
        {
          "heading": "Praktično pravilo za odluku",
          "body": [
            "Ako je slučaj jednostavan, imate dokumente i spremni ste da pratite proceduru, pokušajte sami ili bar prvo pošaljite urednu reklamaciju. Ako je slučaj sporan, odbijen ili vam nije jasno šta je sledeći korak, servis može imati realnu vrednost.",
            "Najvažnije je da ne propustite rokove i ne prihvatite nejasnu ponudu pre nego što razumete vrednost svog slučaja.",
            "Možete kombinovati pristupe: prvo sami pošaljete osnovnu reklamaciju, a servis uključite ako dobijete odbijanje, ako odgovor kasni ili ako aviokompanija traži dopune koje ne razumete.",
            "Tako zadržavate kontrolu nad jednostavnim delom, ali ne ostajete sami kada slučaj postane proceduralno ili pravno komplikovan.",
            "Odluka nije pitanje ponosa, već odnosa između vremena, vrednosti zahteva i složenosti dokaza. Nekada je samostalni put sasvim dovoljan, a nekada je skuplje izgubiti dobar slučaj zbog sitne proceduralne greške.",
            "Ako je potencijalna naknada veća, a dokumentacija sporna, vredi bar uraditi stručnu proveru pre nego što odustanete ili prihvatite prvu ponudu."
          ]
        },
        {
          "heading": "Pogledajte i šta servis radi posle odbijanja",
          "body": [
            "Nije svaki servis isti. Neki samo proslede zahtev, dok drugi vode dopisivanje, proveravaju baze letova, uključuju pravnike i po potrebi idu u dalji postupak. Razlika postaje važna tek kada aviokompanija odbije zahtev.",
            "Pre nego što izaberete servis, proverite model provizije, da li postoje administrativni troškovi, šta se dešava ako aviokompanija plati direktno vama i da li servis pokriva sudske ili druge troškove ako do njih dođe.",
            "Za putnika je najvažnije da nema iznenađenja. No win, no fee zvuči jednostavno, ali uvek treba znati procenat, moguće dodatne naknade i trenutak kada se obavezujete."
          ]
        }
      ]
    },
    "en": {
      "slug": "flight-compensation-service-or-diy-claim",
      "title": "Whether to send the claim yourself or through the airline compensation service",
      "description": "When it makes sense to try on your own, and when a service saves time, stress, procedural errors and communication with the airline.",
      "excerpt": "You can try a simple case yourself. A contested case requires discipline: evidence, deadlines, communication, reason checks and willingness to refuse.",
      "category": "Claim options",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "When a standalone request makes sense",
          "body": [
            "If the flight clearly arrived more than three hours late, the route is covered, the airline does not mention extraordinary circumstances and you have all the documents, a stand-alone claim may be reasonable.",
            "In that case, the most important thing is that the request is clear, short and sent through an official channel. The flight number, date, route, booking reference, description of the disruption and what you are looking for are required.",
            "Going solo is especially logical when you have time to follow up on status, respond to complements, and continue communication if the first response isn't good."
          ]
        },
        {
          "heading": "When the case gets tough",
          "body": [
            "Service has more value when the case is not clean: missed connection, multiple segments, partial rerouting, cancellation with unclear reason, overbooking, denied request or communication in multiple languages.",
            "Then the problem is not just filling out the form. The problem is to assess whether the case is worth pursuing, what legal framework makes sense, what is missing from the evidence and how to respond to the airline's defense.",
            "If the airline says extraordinary circumstances, technical problem or flight control, you need to know when it's really valid and when it's too broad an explanation."
          ]
        },
        {
          "heading": "Compare time, stress and commission",
          "body": [
            "If the service works with a commission only based on success, the main question is whether it is worth it for you to exchange part of the payment for less work, a better procedure and less direct communication with the airline.",
            "In a simple case, it may be more worthwhile for you to try it yourself. In a contested case, a commission may be a reasonable price for evaluation, management, tracking deadlines and responding to rejections.",
            "It is important to understand the model before submitting. At letkasni.rs, the idea is simple: no upfront costs and commissions only if the case is charged."
          ]
        },
        {
          "heading": "Good service does not promise everything",
          "body": [
            "If someone guarantees payment without checking the route, reason, documentation and actual arrival, it's a weak signal. In aviation compensation, the details decide.",
            "A good service should also tell when the case is not realistic. It is useful, because it saves time and prevents the traveler from expecting money for a case that does not stand legally.",
            "A better approach is a conservative estimate, a clear explanation, and a next step that makes sense: claim, supplement, wait for a response, escalate, or give up."
          ]
        },
        {
          "heading": "What still remains up to the traveler",
          "body": [
            "Even when using the service, the passenger must provide accurate information and documents. The service cannot fabricate a boarding pass, booking reference, hotel bill or airline message.",
            "The passenger should be honest about the facts: whether he arrived at the gate on time, whether the tickets were separated, whether he accepted the voucher, whether he already received a refund and what he signed.",
            "The more accurate the information, the better the estimate. Exaggerating or skipping over details later only weakens the case."
          ]
        },
        {
          "heading": "Rule of thumb for decision",
          "body": [
            "If the case is simple, you have the documents and you are ready to follow the procedure, try it yourself or at least submit a proper complaint first. If the case is disputed, denied or you are not clear about the next step, the service can be of real value.",
            "The most important thing is not to miss deadlines or accept a vague offer before you understand the value of your case.",
            "You can combine approaches: first you send a basic complaint yourself, and turn on the service if you get a rejection, if the answer is late or if the airline asks for supplements that you don't understand.",
            "That way, you keep control of the simple part, but you're not left alone when the case becomes procedurally or legally complicated.",
            "The decision is not a matter of pride, but of the relationship between time, the value of the claim and the complexity of the evidence. Sometimes the independent way is quite enough, and sometimes it is more expensive to lose a good case because of a minor procedural error.",
            "If the potential fee is higher and the documentation is questionable, it's worth at least doing a professional check before giving up or accepting the first offer."
          ]
        },
        {
          "heading": "See also what the service does after rejection",
          "body": [
            "Not every service is the same. Some just forward the request, while others keep correspondence, check flight databases, involve lawyers and, if necessary, go to further proceedings. The difference becomes important only when the airline refuses the request.",
            "Before choosing a service, check the commission model, whether there are administrative costs, what happens if the airline pays you directly, and whether the service covers legal or other costs if they arise.",
            "For the passenger, the most important thing is that there are no surprises. No win, no fee sounds simple, but you should always know the percentage, possible additional fees and the moment when you commit."
          ]
        }
      ]
    }
  },
  {
    "id": "claim-template-email",
    "publishedAt": "2026-04-30",
    "updatedAt": "2026-04-30",
    "sr": {
      "slug": "primer-emaila-za-reklamaciju-leta",
      "title": "Primer emaila za reklamaciju zbog kašnjenja ili otkazivanja leta",
      "description": "Praktičan obrazac emaila koji putnik može prilagoditi kada traži odštetu, refundaciju troškova ili obrazložen odgovor avio-kompanije.",
      "excerpt": "Najbolji email za reklamaciju je kratak, formalan i pun konkretnih podataka. Bez pretnji, bez viška emocija i bez mešanja različitih zahteva.",
      "category": "Obrasci",
      "readTime": "4 min čitanja",
      "sections": [
        {
          "heading": "Šta email mora da sadrži",
          "body": [
            "Email treba da sadrži podatke o letu, kratak opis poremećaja, šta tražite i spisak dokaza u prilogu. Ako tražite fiksnu naknadu, navedite da zahtev podnosite zbog kašnjenja, otkazivanja, propuštene konekcije ili uskraćenog ukrcavanja.",
            "Obavezno navedite broj leta, datum, rutu, booking reference, planirano vreme dolaska i stvarno vreme dolaska ako ga znate. Kod konekcije navedite krajnju destinaciju iz cele rezervacije.",
            "Ne morate citirati zakon u deset pasusa. Preciznost je važnija od dužine. Aviokompaniji treba jasna osnova da pronađe let i odgovori na konkretan zahtev."
          ]
        },
        {
          "heading": "Osnovni primer poruke",
          "body": [
            "Poštovani, podnosim reklamaciju za let [broj leta] na relaciji [od-do], planiran za [datum]. Let je [kasnio/otkazan/preusmeren], a na krajnju destinaciju sam stigao/la [koliko kasno] u odnosu na planirano vreme.",
            "Molim vas da proverite osnov za fiksnu naknadu i dostavite obrazložen odgovor. U prilogu šaljem potvrdu rezervacije, boarding pass i dostupnu komunikaciju o poremećaju. Molim potvrdu prijema reklamacije i referentni broj.",
            "Ovaj tekst je namerno kratak. Po potrebi dodajte jednu ili dve rečenice koje objašnjavaju specifičnost slučaja, na primer propuštenu konekciju, alternativni let ili uskraćeno ukrcavanje."
          ]
        },
        {
          "heading": "Ako tražite i troškove",
          "body": [
            "Ako ste sami platili obrok, hotel, transfer ili novu kartu jer aviokompanija nije obezbedila brigu, navedite to odvojeno. Nemojte mešati taj zahtev sa fiksnom naknadom u istoj rečenici.",
            "Možete napisati: Pored zahteva za fiksnu naknadu, tražim i refundaciju razumnih troškova nastalih tokom čekanja, u iznosu od [iznos], prema računima u prilogu.",
            "Priložite račune i kratko objasnite zašto su troškovi nastali. Ako je bilo noćenje, navedite da li aviokompanija nije obezbedila hotel ili nije dala jasnu instrukciju."
          ]
        },
        {
          "heading": "Ako je let otkazan",
          "body": [
            "Kod otkazanog leta dodajte kada ste obavešteni o otkazivanju i šta vam je ponuđeno. To je važno jer rok obaveštenja i alternativni let mogu promeniti pravo na naknadu.",
            "Primer dodatka: O otkazivanju sam obavešten/a dana [datum i vreme]. Ponuđen mi je alternativni let [broj/ruta], kojim sam stigao/la na krajnju destinaciju [koliko kasno].",
            "Ako ste umesto preusmeravanja tražili refundaciju, navedite i to, ali jasno odvojite pitanje karte od pitanja fiksne odštete."
          ]
        },
        {
          "heading": "Ako je zahtev već odbijen",
          "body": [
            "Ako odgovarate na odbijanje, nemojte slati isti email od početka. Pozovite se na referentni broj i tražite konkretnije obrazloženje.",
            "Primer: Hvala na odgovoru. Molim vas da precizirate koje konkretne vanredne okolnosti su uticale na let [broj leta], u kom vremenskom periodu i koje mere su preduzete da se kašnjenje smanji.",
            "Takav odgovor je korisniji od rasprave. Tražite činjenice koje se kasnije mogu proveriti."
          ]
        },
        {
          "heading": "Šta izbegavati",
          "body": [
            "Izbegavajte pretnje, uvrede, velika slova, predugačke opise putovanja i tvrdnje koje ne možete dokazati. Ako slučaj kasnije ide u ručnu proveru, uredna i profesionalna komunikacija pomaže.",
            "Ne šaljite originalne dokumente ako nije neophodno. Pošaljite kopije ili skenove. Sačuvajte poslatu poruku, priloge, automatski odgovor i referentni broj.",
            "Ako niste sigurni da li je slučaj jak, prvo unesite osnovne podatke na letkasni.rs. Bolje je proveriti osnov nego slati zahtev koji meša refundaciju, vaučer, troškove i odštetu bez jasne strukture.",
            "Nemojte izmišljati tačno vreme dolaska ako ga ne znate. Bolje je napisati prema dostupnim podacima ili priložiti screenshot nego navesti netačan podatak koji aviokompanija kasnije lako ospori.",
            "Takođe ne šaljite različite verzije događaja u više poruka. Ako morate nešto ispraviti, napišite jasno da dopunjujete prethodnu reklamaciju i navedite šta se menja.",
            "Na kraju emaila tražite obrazložen odgovor, ne samo status. To je važno ako kasnije treba proveriti da li je odbijanje konkretno ili samo generička poruka."
          ]
        },
        {
          "heading": "Dodajte rok za odgovor i kontakt podatke",
          "body": [
            "Na kraju poruke možete dodati molbu da aviokompanija dostavi obrazložen odgovor u relevantnom roku i da sva komunikacija ide na isti email. To pomaže da se kasnije vidi kada je ćutanje zaista problem.",
            "Navedite puno ime putnika, kontakt email, telefon ako želite i booking reference. Ako zahtev šaljete za više putnika, jasno navedite da li pišete za sve putnike iz rezervacije ili samo za sebe.",
            "Ako šaljete priloge, navedite ih poimence. Na primer: potvrda rezervacije, boarding pass, poruka o otkazivanju, račun za hotel. Tako se smanjuje rizik da aviokompanija kasnije tvrdi da dokument nije poslat."
          ]
        }
      ]
    },
    "en": {
      "slug": "flight-compensation-claim-email-template",
      "title": "Example of an email for a complaint about flight delays or cancellations",
      "description": "A practical email template that a passenger can customize when seeking compensation, reimbursement of expenses or a reasoned response from the airline.",
      "excerpt": "The best complaint email is short, formal and full of specific information. No threats, no excess emotions and no mixing of different demands.",
      "category": "Templates",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "What the email must contain",
          "body": [
            "The email should contain the flight details, a brief description of the disturbance, what you are looking for and a list of attached evidence. If you are claiming a fixed fee, state that you are making the claim due to a delay, cancellation, missed connection or denied boarding.",
            "Be sure to include the flight number, date, route, booking reference, planned arrival time and actual arrival time if you know it. When connecting, specify the final destination from the entire reservation.",
            "You don't have to quote the law in ten paragraphs. Accuracy is more important than length. An airline needs a clear basis to find a flight and respond to a specific request."
          ]
        },
        {
          "heading": "Basic message example",
          "body": [
            "Dear Sir/Madam, I am submitting a claim for flight [flight number] on the route [from-to], scheduled for [date]. The flight was [delayed/cancelled/diverted], and I arrived at my final destination [how late] compared to the planned time.",
            "Please check the basis for the fixed fee and provide a reasoned answer. I am attaching the reservation confirmation, boarding pass and available communication about the disruption. Please confirm the receipt of the complaint and the reference number.",
            "This text is intentionally short. If necessary, add a sentence or two explaining the specifics of the case, such as a missed connection, alternate flight, or denied boarding."
          ]
        },
        {
          "heading": "If you are also looking for costs",
          "body": [
            "If you paid for a meal, hotel, transfer or new ticket yourself because the airline did not provide care, list it separately. Don't confuse that request with a fixed fee in the same sentence.",
            "You can write: In addition to the request for a fixed fee, I also request a refund of reasonable expenses incurred during the waiting period, in the amount of [amount], according to the invoices attached.",
            "Attach invoices and briefly explain why the expenses were incurred. If it was an overnight stay, state whether the airline did not provide a hotel or did not give clear instructions."
          ]
        },
        {
          "heading": "If the flight is cancelled",
          "body": [
            "For the canceled flight, add when you were notified of the cancellation and what was offered to you. This is important because the notice period and an alternative flight can change the right to compensation.",
            "Example of addendum: I was notified of the cancellation on [date and time]. I was offered an alternative flight [number/route], which took me to my final destination [how late].",
            "If you requested a refund instead of rerouting, state that as well, but clearly separate the issue of the ticket from the issue of fixed compensation."
          ]
        },
        {
          "heading": "If the request has already been rejected",
          "body": [
            "If you are responding to a bounce, don't send the same email from the beginning. Refer to the reference number and ask for a more specific explanation.",
            "Example: Thank you for your reply. Please specify which specific extraordinary circumstances affected the flight [flight number], in what period of time and what measures were taken to reduce the delay.",
            "Such an answer is more useful than an argument. You are looking for facts that can be checked later."
          ]
        },
        {
          "heading": "What to avoid",
          "body": [
            "Avoid threats, insults, capital letters, overly long travel descriptions, and claims you can't prove. If the case later goes to manual review, orderly and professional communication helps.",
            "Do not send original documents unless necessary. Send copies or scans. Save the sent message, attachments, auto reply and reference number.",
            "If you are not sure whether the case is strong, first enter the basic data on letkasni.rs. It is better to check the basis than to send a claim that mixes refund, voucher, expenses and compensation without a clear structure.",
            "Do not invent the exact arrival time if you do not know it. It is better to write according to the available data or attach a screenshot than to provide incorrect information that the airline can easily dispute later.",
            "Also don't send different versions of the event in multiple messages. If you have to correct something, write clearly that you are supplementing the previous complaint and state what is being changed.",
            "At the end of the email, you are looking for a reasoned response, not just a status. This is important if you need to check later if the rejection is specific or just a generic message."
          ]
        },
        {
          "heading": "Add a response deadline and contact information",
          "body": [
            "At the end of the message, you can add a request that the airline provide a reasoned response within the relevant time frame and that all communications go to the same email. It helps to see later when silence is really a problem.",
            "Provide the passenger's full name, contact email, phone number if desired and booking reference. If you are sending a request for several passengers, clearly state whether you are writing for all passengers from the reservation or just for yourself.",
            "If you are sending attachments, please list them by name. For example: booking confirmation, boarding pass, cancellation message, hotel bill. This reduces the risk that the airline will later claim that the document was not sent."
          ]
        }
      ]
    }
  }
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
