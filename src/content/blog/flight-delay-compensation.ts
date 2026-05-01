import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const image = {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger aircraft parked at an airport gate",
    position: "center",
  } satisfies BlogArticleImage;

export const article = {
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
  } satisfies BlogArticle;
