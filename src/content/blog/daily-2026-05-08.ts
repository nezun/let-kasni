import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "four-hour-flight-delay-rights": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport departure board during a long delay",
    position: "center",
  },
  "five-hour-flight-delay-refund": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger waiting in an airport terminal",
    position: "center",
  },
  "delayed-flight-airport-action-plan": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport gates with aircraft outside",
    position: "center",
  },
  "flight-delay-reason-evidence": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft parked near the terminal",
    position: "center",
  },
  "meal-voucher-flight-delay": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft above clouds after departure",
    position: "center",
  },
  "flight-delay-final-arrival-time": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft on runway near airport lights",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

export const articles = [
  {
    id: "four-hour-flight-delay-rights",
    publishedAt: "2026-05-08",
    updatedAt: "2026-05-08",
    sr: {
      slug: "kasnjenje-leta-4-sata-prava-putnika",
      title: "Kašnjenje leta 4 sata: prava putnika i naknada",
      description: "Šta putnik može da traži kada let kasni 4 sata: naknada, obroci, hotel, dokazi i razlika između polaska i dolaska.",
      excerpt: "Kašnjenje od 4 sata često prelazi prag za naknadu, ali ishod i dalje zavisi od dolaska na krajnju destinaciju, rute i razloga kašnjenja.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Zašto je kašnjenje od 4 sata važno",
          body: [
            "Kada let kasni 4 sata, slučaj više nije samo neprijatno čekanje na gejtu. Ako je dolazak na krajnju destinaciju bio tri sata ili više kasnije, treba proveriti [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Ipak, ne odlučuje sama najava na aerodromu, već stvarno vreme dolaska.",
            "Kod putnika iz Srbije važno je proveriti i rutu. Let iz EU, let ka EU evropskim prevoznikom ili putovanje preko EU čvorišta pod jednom rezervacijom može imati drugačiji osnov od zasebno kupljenih karata. Zato 4 sata nisu automatska presuda, već signal da treba složiti činjenice.",
          ],
          bullets: [
            "Prvo se meri dolazak na krajnju destinaciju, ne samo kašnjenje u polasku.",
            "Zatim se proverava ruta, prevoznik i da li su segmenti u jednoj rezervaciji.",
            "Na kraju se traži konkretan razlog kašnjenja i dokaz aviokompanije.",
          ],
        },
        {
          heading: "Naknada i pravo na brigu nisu isto",
          body: [
            "Fiksna naknada zavisi od rute, dužine leta, kašnjenja na dolasku i razloga. Pravo na brigu zavisi od čekanja u polasku i udaljenosti leta. Na kraćim rutama pomoć može početi ranije, dok kod dužih ruta prag za obroke i osveženje može biti veći.",
            "To znači da možete imati pravo na hranu, piće ili komunikaciju čak i kada fiksna naknada još nije jasna. Ako se polazak pomeri za sledeći dan, pitajte za hotel i transfer. Ako pomoć ne dobijete, čuvajte račune i zabeležite kome ste se obratili.",
          ],
        },
        {
          heading: "Razlog kašnjenja menja ishod",
          body: [
            "Četiri sata zbog tehničkog kvara, kasne rotacije aviona ili nedostatka posade ne znače isto što i četiri sata zbog zatvaranja piste, jakog nevremena ili odluke kontrole letenja. Zato tražite konkretan razlog, ne samo opštu poruku da je let odložen.",
            "Ako aviokompanija kasnije navede vanredne okolnosti, pitajte kako je taj događaj direktno uticao baš na vaš let i koje mere su preduzete da se kašnjenje smanji. Bez takvog objašnjenja teško je proceniti da li je odbijanje osnovano.",
          ],
        },
        {
          heading: "Dokazi koje treba prikupiti tokom čekanja",
          body: [
            "Sačuvajte boarding pass, potvrdu rezervacije, screenshot aplikacije, fotografiju table polazaka, poruke aviokompanije i račune za hranu, vodu, hotel ili transfer. Ako imate konekciju, posebno čuvajte ceo itinerer i dokaz da su letovi kupljeni zajedno.",
            "Korisno je zapisati planirano vreme dolaska, stvarno vreme otvaranja vrata aviona i trenutak kada je putnicima saopšten razlog. Ako se razlog menja kroz dan, sve verzije treba sačuvati jer kasnije mogu pokazati da odgovor nije bio precizan.",
          ],
        },
        {
          heading: "Kako poslati zahtev posle 4 sata kašnjenja",
          body: [
            "U zahtevu navedite broj leta, datum, rutu, planirani i stvarni dolazak, razlog koji je kompanija saopštila i šta ste morali sami da platite. Odvojite fiksnu naknadu od refundacije troškova, jer aviokompanija može različito odgovoriti na ta dva dela.",
            "Ako odgovor bude kratak ili generički, ne šaljite potpuno novu žalbu. Pošaljite dopunu sa jasnom vremenskom linijom i pitanjem koji dokaz potvrđuje razlog odbijanja. To pravi uredan trag za dalju proveru ili eskalaciju.",
          ],
        },
      ],
    },
    en: {
      slug: "4-hour-flight-delay-passenger-rights",
      title: "4-hour flight delay: passenger rights and compensation",
      description: "What passengers can claim after a 4-hour flight delay: compensation, meals, hotel, evidence and the difference between departure and arrival delay.",
      excerpt: "A 4-hour delay often crosses the compensation threshold, but the result still depends on final arrival time, route and delay reason.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "Why a 4-hour delay matters",
          body: [
            "When a flight is delayed by 4 hours, the case is no longer only an uncomfortable wait at the gate. If arrival at the final destination was three hours or more late, you should check [flight delay compensation](/en/flight-delay-compensation). Still, the airport announcement does not decide the case; actual arrival time does.",
            "For travelers from Serbia, the route matters too. A flight from the EU, a flight into the EU operated by a European carrier or a journey through an EU hub under one booking may have a different basis from separately bought tickets. Four hours are therefore not an automatic result, but a signal to organize the facts.",
          ],
          bullets: [
            "First measure arrival at the final destination, not only departure delay.",
            "Then check route coverage, operating carrier and whether the segments were under one booking.",
            "Finally request the concrete delay reason and the airline's supporting evidence.",
          ],
        },
        {
          heading: "Compensation and care rights are different",
          body: [
            "Fixed compensation depends on route, flight distance, arrival delay and reason. Care rights depend on waiting time at departure and flight distance. On shorter routes assistance may start earlier, while on longer routes the threshold for meals and refreshments can be higher.",
            "This means you may have a right to food, drinks or communication even when fixed compensation is not yet clear. If departure moves to the next day, ask for hotel accommodation and transfer. If help is not provided, keep receipts and record who you asked.",
          ],
        },
        {
          heading: "The delay reason changes the outcome",
          body: [
            "Four hours caused by a technical fault, late aircraft rotation or crew shortage are not the same as four hours caused by runway closure, severe weather or an air traffic control decision. Ask for a concrete reason, not only a broad message that the flight is delayed.",
            "If the airline later cites extraordinary circumstances, ask how that event directly affected your flight and what measures were taken to reduce the delay. Without that explanation it is difficult to assess whether the refusal is properly supported.",
          ],
        },
        {
          heading: "Evidence to collect while waiting",
          body: [
            "Keep the boarding pass, booking confirmation, app screenshot, departures-board photo, airline messages and receipts for food, water, hotel or transfer. If you have a connection, keep the full itinerary and proof that the flights were bought together.",
            "It is useful to record scheduled arrival, actual aircraft-door opening time and when passengers were told the reason. If the reason changes during the day, save every version because it may later show that the answer was not precise.",
          ],
        },
        {
          heading: "How to send a claim after a 4-hour delay",
          body: [
            "In the claim, state the flight number, date, route, scheduled and actual arrival, reason given by the airline and what you had to pay yourself. Separate fixed compensation from expense reimbursement because the airline may answer those parts differently.",
            "If the reply is short or generic, do not send a completely new complaint. Send a follow-up with a clear timeline and ask which evidence supports the refusal reason. That creates a clean record for further review or escalation.",
          ],
        },
      ],
    },
  },
  {
    id: "five-hour-flight-delay-refund",
    publishedAt: "2026-05-08",
    updatedAt: "2026-05-08",
    sr: {
      slug: "kasnjenje-leta-5-sati-refundacija",
      title: "Kašnjenje leta 5 sati: refundacija, preusmeravanje i naknada",
      description: "Kada kašnjenje od 5 sati daje izbor refundacije ili nastavka puta, kako to utiče na naknadu i koje dokaze treba sačuvati.",
      excerpt: "Kod kašnjenja od 5 sati putnik često može birati između odustanka uz refundaciju i nastavka puta, ali taj izbor treba pažljivo dokumentovati.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Šta se menja posle 5 sati čekanja",
          body: [
            "Kada je polazak odložen najmanje 5 sati, putnik često dobija pravo da odustane od putovanja i traži refundaciju karte. To pravo treba razlikovati od [naknade za kašnjenje leta](/naknada-za-kasnjenje-leta), koja se proverava prema dolasku na krajnju destinaciju i razlogu poremećaja.",
            "Ako odlučite da ipak putujete, najčešće se nastavlja pitanje preusmeravanja, obroka, komunikacije i eventualnog hotela. Ako odustanete i uzmete refundaciju, kompanija obično više ne mora da vas preveze tom rezervacijom. Zato izbor treba napraviti svesno, ne samo pod pritiskom reda na šalteru.",
          ],
          bullets: [
            "Refundacija karte i fiksna naknada su različita pitanja.",
            "Preusmeravanje treba tražiti pod uporedivim uslovima i sa pisanim tragom.",
            "Troškovi čekanja se vode odvojeno od odluke da nastavite ili odustanete.",
          ],
        },
        {
          heading: "Refundacija ne rešava uvek sve",
          body: [
            "Refundacija vraća cenu karte ili deo putovanja koji više nema smisla koristiti. Ako ste već na konekciji i kašnjenje prekida put, može biti važno i pitanje povratka na početni aerodrom. Kod jedne rezervacije posledice mogu biti šire nego kod zasebnih karata.",
            "Fiksna naknada se ne gasi automatski samo zato što je karta refundirana. Ipak, ako niste putovali, treba jasno objasniti kada ste odustali, šta je kompanija ponudila i da li je kašnjenje već dostiglo prag koji vam je omogućio taj izbor.",
          ],
        },
        {
          heading: "Preusmeravanje i alternativni transport",
          body: [
            "Ako ne želite refundaciju, tražite preusmeravanje pod uporedivim uslovima. To može biti kasniji let iste kompanije, drugi prevoznik ili, u nekim situacijama, drugi vid prevoza. Najvažnije je da dogovor bude napisan ili vidljiv u aplikaciji.",
            "Ne kupujte odmah najskuplju zamenu bez pokušaja da dobijete rešenje od aviokompanije. Ako ipak morate sami da reagujete, sačuvajte dokaz da pomoći nije bilo, uporedite razumne opcije i napišite zašto je izabrana opcija bila nužna.",
          ],
        },
        {
          heading: "Troškovi tokom dugog čekanja",
          body: [
            "Pet sati na aerodromu obično znači da treba tražiti obroke, osveženje i komunikaciju. Ako se novi polazak očekuje narednog dana, tražite hotel i transfer. Ti troškovi su odvojeni od fiksne naknade i mogu biti relevantni čak i kada je razlog kašnjenja vanredna okolnost.",
            "Računi treba da budu razumni i povezani sa čekanjem. Osnovni obrok, voda, lokalni transfer i hotel blizu aerodroma lakše se brane od luksuznih troškova. U zahtevu uvek dodajte kratko objašnjenje zašto je trošak nastao.",
          ],
        },
        {
          heading: "Kako dokumentovati odluku",
          body: [
            "Zapišite vreme kada je kašnjenje dostiglo 5 sati, šta vam je ponuđeno, da li ste izabrali refundaciju ili nastavak puta i ko je to potvrdio. Sačuvajte email, SMS, boarding pass i novi itinerer ako je izdat.",
            "Ako je odgovor aviokompanije nejasan, pošaljite kratak zahtev sa dve odvojene tačke: prvo refundacija ili preusmeravanje, zatim provera fiksne naknade ako je dolazak ili izgubljeno putovanje za to relevantno. Takav zahtev smanjuje prostor za pogrešno tumačenje.",
          ],
        },
      ],
    },
    en: {
      slug: "5-hour-flight-delay-refund",
      title: "5-hour flight delay: refund, rerouting and compensation",
      description: "When a 5-hour flight delay gives a refund or rerouting choice, how it affects compensation and which evidence to save.",
      excerpt: "After a 5-hour delay, passengers can often choose between abandoning the trip with a refund and continuing travel, but that choice should be documented carefully.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "What changes after 5 hours of waiting",
          body: [
            "When departure is delayed by at least 5 hours, passengers often gain the right to abandon the trip and request a ticket refund. That right should be separated from [flight delay compensation](/en/flight-delay-compensation), which is assessed by final arrival time and disruption reason.",
            "If you decide to travel anyway, the practical questions are rerouting, meals, communication and possibly hotel accommodation. If you abandon the trip and take a refund, the airline usually no longer has to transport you under that booking. Make the choice deliberately, not only under pressure at the counter.",
          ],
          bullets: [
            "Ticket refund and fixed compensation are separate questions.",
            "Rerouting should be requested under comparable conditions with a written trail.",
            "Waiting expenses are handled separately from the decision to travel or abandon the trip.",
          ],
        },
        {
          heading: "A refund does not always solve everything",
          body: [
            "A refund returns the ticket price or the part of the journey that no longer makes sense to use. If you are already on a connection and the delay interrupts the trip, return transport to the first departure airport may also matter. Under one booking, the consequences can be wider than under separate tickets.",
            "Fixed compensation does not disappear automatically only because the ticket was refunded. Still, if you did not travel, explain clearly when you abandoned the trip, what the airline offered and whether the delay had already reached the threshold that gave you that choice.",
          ],
        },
        {
          heading: "Rerouting and alternative transport",
          body: [
            "If you do not want a refund, ask for rerouting under comparable conditions. That may mean a later flight on the same airline, another carrier or, in some cases, another form of transport. The key point is to get the arrangement in writing or visible in the app.",
            "Do not immediately buy the most expensive replacement without trying to get a solution from the airline. If you must act yourself, keep proof that help was unavailable, compare reasonable options and write down why the chosen option was necessary.",
          ],
        },
        {
          heading: "Costs during a long wait",
          body: [
            "Five hours at the airport usually means you should ask for meals, refreshments and communication. If the new departure is expected the next day, ask for hotel accommodation and transfer. These costs are separate from fixed compensation and may matter even when the delay reason is extraordinary.",
            "Receipts should be reasonable and linked to the wait. A basic meal, water, local transfer and hotel near the airport are easier to justify than luxury spending. In the claim, always add a short explanation of why the cost was incurred.",
          ],
        },
        {
          heading: "How to document the decision",
          body: [
            "Record when the delay reached 5 hours, what was offered, whether you chose refund or continued travel and who confirmed it. Keep email, SMS, boarding pass and any new itinerary that was issued.",
            "If the airline's answer is unclear, send a short request with two separate points: first refund or rerouting, then review of fixed compensation if arrival or the abandoned journey makes that relevant. This structure reduces room for misunderstanding.",
          ],
        },
      ],
    },
  },
  {
    id: "delayed-flight-airport-action-plan",
    publishedAt: "2026-05-08",
    updatedAt: "2026-05-08",
    sr: {
      slug: "kasnjenje-leta-sta-raditi-na-aerodromu",
      title: "Kašnjenje leta: šta uraditi na aerodromu korak po korak",
      description: "Praktičan plan za putnika dok let kasni: informacije, obroci, hotel, dokazi, konekcije i zahtev posle putovanja.",
      excerpt: "Najbolji zahtev za kašnjenje počinje dok ste još na aerodromu, jer tada možete sačuvati dokaze koje je kasnije teško rekonstruisati.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Prvih 15 minuta posle objave kašnjenja",
          body: [
            "Prvo sačuvajte osnovne podatke: broj leta, rutu, planirano vreme polaska i dolaska, trenutnu najavu kašnjenja i boarding pass. Ako je ruta potencijalno pokrivena pravilima za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta), ovi podaci će biti osnova zahteva.",
            "Napravite screenshot aplikacije i fotografiju table polazaka. Pitajte osoblje za razlog, ali nemojte se oslanjati samo na usmeni odgovor. Zapišite vreme, mesto i tačnu formulaciju, jer se razlog često menja kroz dan.",
          ],
          bullets: [
            "Sačuvajte boarding pass, booking referencu i screenshot statusa leta.",
            "Zabeležite tačan razlog koji je osoblje navelo i vreme kada je naveden.",
            "Odvojeno čuvajte račune za hranu, vodu, hotel ili transfer.",
          ],
        },
        {
          heading: "Kada tražiti obrok, vodu i komunikaciju",
          body: [
            "Ako kašnjenje prelazi prag za vašu udaljenost leta, tražite obroke, osveženje i mogućnost komunikacije. Ne morate čekati da se osoblje samo seti. Najbolje je pitati kratko i konkretno: gde se preuzimaju vaučeri i šta putnici treba da urade dok čekaju.",
            "Ako pomoć nije ponuđena, kupujte razumno. Sačuvajte fiskalni račun, kartičnu potvrdu i kratku belešku zašto ste trošak imali. Kasnije je mnogo lakše tražiti refundaciju kada postoji račun i vremenska linija.",
          ],
        },
        {
          heading: "Ako kašnjenje ugrožava konekciju",
          body: [
            "Odmah proverite da li su letovi u jednoj rezervaciji. Ako jesu, aviokompanija obično mora da gleda put do krajnje destinacije, ne samo prvi segment. Pitajte za novo rešenje i tražite da se novi itinerer pošalje emailom ili prikaže u aplikaciji.",
            "Ako su karte kupljene odvojeno, situacija je slabija za posledice drugog leta. Ipak, i dalje dokumentujte prvi let, jer on može imati svoj zahtev ako dolazak tog leta prelazi relevantan prag ili ako ste imali troškove čekanja.",
          ],
        },
        {
          heading: "Noćno čekanje i hotel",
          body: [
            "Ako se novi polazak pomera za sledeći dan, pitajte za hotel i transfer između aerodroma i smeštaja. Ako aviokompanija kaže da hotela nema ili ne daje odgovor, zabeležite to pre nego što sami platite smeštaj.",
            "Birajte razuman hotel, ne najskuplju opciju. Ako putujete sa decom, starijom osobom ili imate zdravstveni razlog, zapišite zašto je izbor bio nužan. Takva beleška može objasniti trošak koji bi inače izgledao visok.",
          ],
        },
        {
          heading: "Posle dolaska ili odustanka od puta",
          body: [
            "Kada se put završi, složite hronologiju u pet redova: plan, prva najava, razlog, stvarni dolazak ili odustanak i troškovi. Nemojte slati zahtev bez ovih osnovnih činjenica, jer će odgovor aviokompanije često biti generički.",
            "Ako je dolazak kasnio tri sata ili više, otvorite pitanje fiksne naknade. Ako ste čekali dugo, otvorite i pitanje brige. Ako ste odustali posle 5 sati, odvojeno navedite refundaciju. Jedan uredan zahtev je jači od tri nepovezane poruke.",
          ],
        },
      ],
    },
    en: {
      slug: "delayed-flight-airport-action-plan",
      title: "Delayed flight: what to do at the airport step by step",
      description: "A practical airport plan during a flight delay: information, meals, hotel, evidence, connections and the claim after travel.",
      excerpt: "The best delay claim starts while you are still at the airport, because that is when you can save evidence that is hard to reconstruct later.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "The first 15 minutes after the delay notice",
          body: [
            "First save the core details: flight number, route, scheduled departure and arrival, current delay notice and boarding pass. If the route may be covered by [flight delay compensation](/en/flight-delay-compensation), these facts will become the basis of the claim.",
            "Take an app screenshot and a photo of the departures board. Ask staff for the reason, but do not rely only on a verbal answer. Write down the time, place and exact wording, because the reason often changes during the day.",
          ],
          bullets: [
            "Save boarding pass, booking reference and a flight-status screenshot.",
            "Record the exact reason stated by staff and the time it was given.",
            "Keep receipts for meals, water, hotel or transfer separately.",
          ],
        },
        {
          heading: "When to ask for meals, water and communication",
          body: [
            "If the delay passes the assistance threshold for your flight distance, ask for meals, refreshments and communication. You do not need to wait for staff to offer it. Ask briefly and specifically: where vouchers are collected and what passengers should do while waiting.",
            "If assistance is not offered, spend reasonably. Keep the receipt, card confirmation and a short note explaining why the cost was necessary. Reimbursement is much easier later when there is a receipt and a timeline.",
          ],
        },
        {
          heading: "If the delay threatens a connection",
          body: [
            "Check immediately whether the flights are under one booking. If they are, the airline usually has to consider the journey to the final destination, not only the first segment. Ask for a new solution and request the new itinerary by email or in the app.",
            "If the tickets were bought separately, the position is weaker for the consequences of the second flight. Still, document the first flight because it may have its own claim if its arrival passes the relevant threshold or if you had waiting costs.",
          ],
        },
        {
          heading: "Overnight waiting and hotel",
          body: [
            "If the new departure moves to the next day, ask for hotel accommodation and transfer between airport and hotel. If the airline says no hotel is available or gives no answer, record that before paying for accommodation yourself.",
            "Choose a reasonable hotel, not the most expensive option. If you travel with children, an older passenger or have a health reason, write down why the choice was necessary. That note can explain a cost that might otherwise look high.",
          ],
        },
        {
          heading: "After arrival or abandoning the trip",
          body: [
            "When the journey ends, organize the timeline in five lines: schedule, first notice, reason, actual arrival or abandonment and costs. Do not send a claim without these basic facts because the airline's answer will often be generic.",
            "If arrival was three hours or more late, raise fixed compensation. If you waited for a long time, raise care rights too. If you abandoned the trip after 5 hours, state refund separately. One structured claim is stronger than three disconnected messages.",
          ],
        },
      ],
    },
  },
  {
    id: "flight-delay-reason-evidence",
    publishedAt: "2026-05-08",
    updatedAt: "2026-05-08",
    sr: {
      slug: "razlog-kasnjenja-leta-dokazi",
      title: "Razlog kašnjenja leta: koji dokazi stvarno pomažu",
      description: "Kako razlikovati tehnički kvar, vreme, slot, posadu i kasnu rotaciju, i koje dokaze tražiti kada aviokompanija odbije zahtev.",
      excerpt: "Naziv razloga kašnjenja nije dovoljan. Važno je da aviokompanija pokaže vezu između događaja, konkretnog leta i kasnog dolaska.",
      category: "Dokazi",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Zašto je razlog kašnjenja centralno pitanje",
          body: [
            "Kod [naknade za kašnjenje leta](/naknada-za-kasnjenje-leta), vreme dolaska otvara pitanje prava, ali razlog kašnjenja često odlučuje ishod. Isti broj sati može značiti jak zahtev ako je problem bio u organizaciji kompanije ili slabiji zahtev ako je uzrok bila okolnost van njene kontrole.",
            "Zato nije dovoljno da u aplikaciji piše samo delayed ili operational reasons. Potreban je konkretan opis: šta se dogodilo, kada, na kom aerodromu ili avionu, koliko je trajalo i zašto nije moglo da se izbegne kraće kašnjenje.",
          ],
          bullets: [
            "Naziv razloga nije dovoljan bez veze sa konkretnim letom.",
            "Vremenska linija mora objasniti početak, trajanje i posledicu događaja.",
            "Generička odbijenica treba da se proveri kroz dokaz, ne kroz pretpostavku.",
          ],
        },
        {
          heading: "Tehnički kvar, posada i rotacija aviona",
          body: [
            "Tehnički kvar često traži pažljivu proveru jer nije svaka tehnička situacija vanredna okolnost. Ako je avion kasnio zbog održavanja, zamene dela ili kašnjenja prethodne rotacije, pitajte da li je problem bio iznenadan i koje rezerve su postojale.",
            "Kod posade i rotacije važno je utvrditi da li se problem razvio istog dana ili je bio posledica planiranja. Kasna rotacija može objasniti kašnjenje, ali ne mora automatski osloboditi aviokompaniju ako nije pokazala da je preduzela razumne mere.",
          ],
        },
        {
          heading: "Vreme, slot i kontrola letenja",
          body: [
            "Loše vreme, sigurnosni rizik, zatvaranje piste ili odluka kontrole letenja mogu biti jači argument za aviokompaniju. Ipak, i tada treba proveriti direktnu vezu. Nije dovoljno da je negde u mreži bilo nevreme ako vaš konkretan let nije bio pogođen.",
            "Kod slotova tražite vreme kada je slot dodeljen, koliko je odložio polazak i da li je postojalo dodatno kašnjenje posle toga. Ako je prvi uzrok bio vanredan, ali je ostatak kašnjenja nastao zbog organizacije kompanije, slučaj može ostati otvoren.",
          ],
        },
        {
          heading: "Šta putnik može sam da sačuva",
          body: [
            "Putnik ne može dobiti sve interne operativne zapise, ali može sačuvati mnogo korisnih tragova: screenshot obaveštenja, fotografiju table, poruke iz aplikacije, ime aerodroma, vreme ukrcavanja, vreme izlaska iz aviona i račune za troškove čekanja.",
            "Ako osoblje kaže razlog, zapišite tačnu formulaciju. Ako drugi putnici dobiju drugačiju poruku, nemojte širiti glasine, ali sačuvajte svoju verziju i zvanične poruke. Najjači zahtev se oslanja na proverljive podatke, ne na komentar sa gejta.",
          ],
        },
        {
          heading: "Kako tražiti objašnjenje od aviokompanije",
          body: [
            "U dopuni zahteva tražite da aviokompanija navede konkretan razlog, vremensku liniju, dokaz veze sa vašim letom i mere koje je preduzela da smanji kašnjenje. Kratak i precizan zahtev je bolji od emotivne žalbe.",
            "Ako kompanija ponovi istu opštu rečenicu, to ne znači automatski da ćete dobiti slučaj, ali pokazuje šta nedostaje. Sledeći korak je proveriti da li su vaši dokazi, ruta i kašnjenje dovoljno jaki za dalju eskalaciju.",
          ],
        },
      ],
    },
    en: {
      slug: "flight-delay-reason-evidence",
      title: "Flight delay reason: which evidence actually helps",
      description: "How to separate technical fault, weather, slot, crew and late rotation, and which evidence to request when an airline rejects a claim.",
      excerpt: "The label of the delay reason is not enough. The airline should show the link between the event, the specific flight and the late arrival.",
      category: "Evidence",
      readTime: "8 min read",
      sections: [
        {
          heading: "Why the delay reason is central",
          body: [
            "For [flight delay compensation](/en/flight-delay-compensation), arrival time opens the rights question, but the delay reason often decides the outcome. The same number of hours may support a strong claim if the problem was within airline organization, or a weaker claim if the cause was outside its control.",
            "That is why it is not enough for the app to say only delayed or operational reasons. You need a concrete description: what happened, when, at which airport or aircraft, how long it lasted and why a shorter delay could not be avoided.",
          ],
          bullets: [
            "The reason label is not enough without a link to the specific flight.",
            "The timeline should explain the event start, duration and consequence.",
            "A generic rejection should be tested through evidence, not assumptions.",
          ],
        },
        {
          heading: "Technical fault, crew and aircraft rotation",
          body: [
            "A technical fault often needs careful checking because not every technical situation is an extraordinary circumstance. If the aircraft was delayed because of maintenance, part replacement or previous rotation, ask whether the problem was sudden and what backup options existed.",
            "For crew and rotation issues, it matters whether the problem developed that day or resulted from planning. Late rotation can explain a delay, but it does not automatically protect the airline if it does not show reasonable measures.",
          ],
        },
        {
          heading: "Weather, slot and air traffic control",
          body: [
            "Bad weather, security risk, runway closure or an air traffic control decision may be stronger arguments for the airline. Still, the direct link should be checked. It is not enough that weather affected the network somewhere if your specific flight was not affected.",
            "For slots, ask when the slot was assigned, how much it delayed departure and whether there was additional delay afterwards. If the first cause was extraordinary but the rest came from airline organization, the case may remain open.",
          ],
        },
        {
          heading: "What passengers can save themselves",
          body: [
            "Passengers cannot obtain every internal operational record, but they can save many useful traces: notification screenshots, departures-board photo, app messages, airport name, boarding time, aircraft exit time and receipts for waiting costs.",
            "If staff state a reason, write down the exact wording. If other passengers receive a different message, do not rely on rumors, but keep your version and official messages. The strongest claim relies on verifiable data, not a gate comment.",
          ],
        },
        {
          heading: "How to request an explanation from the airline",
          body: [
            "In a follow-up, ask the airline to state the specific reason, timeline, proof linking it to your flight and measures taken to reduce the delay. A short precise request is better than an emotional complaint.",
            "If the airline repeats the same broad sentence, that does not automatically mean you will win the case, but it shows what is missing. The next step is to check whether your evidence, route and delay are strong enough for further escalation.",
          ],
        },
      ],
    },
  },
  {
    id: "meal-voucher-flight-delay",
    publishedAt: "2026-05-08",
    updatedAt: "2026-05-08",
    sr: {
      slug: "vaucer-za-hranu-kasnjenje-leta",
      title: "Vaučer za hranu kod kašnjenja leta: da li utiče na naknadu",
      description: "Kada aviokompanija mora da obezbedi obrok, osveženje i komunikaciju, šta ako vaučer nije dovoljan i da li se time gubi naknada.",
      excerpt: "Vaučer za hranu je deo prava na brigu. On ne znači automatski da ste odustali od fiksne naknade za kasno stizanje.",
      category: "Pravo na brigu",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Šta vaučer za hranu zapravo predstavlja",
          body: [
            "Vaučer za hranu nije poklon aviokompanije i nije zamena za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). To je najčešće način da se ispuni pravo na brigu tokom čekanja. Fiksna naknada se proverava odvojeno, prema dolasku, ruti i razlogu kašnjenja.",
            "Zato prihvatanje obroka ili vode uglavnom ne znači da ste se odrekli drugih prava. Drugačije može biti ako potpišete dokument koji kaže da prihvatate poravnanje ili se odričete dodatnih zahteva. Takav dokument ne treba potpisivati na brzinu.",
          ],
          bullets: [
            "Vaučer je deo prava na brigu, ne zamena za fiksnu naknadu.",
            "Računi za dodatne razumne troškove ostaju važni ako vaučer nije dovoljan.",
            "Potpisivanje poravnanja treba odvojiti od prihvatanja obroka ili vode.",
          ],
        },
        {
          heading: "Kada treba tražiti obrok i osveženje",
          body: [
            "Pravo na pomoć zavisi od dužine čekanja i udaljenosti leta. Kod kraćih letova prag je niži, kod srednjih i dužih letova viši. U praksi, čim kašnjenje postane ozbiljno, pitajte gde se preuzimaju vaučeri i šta je plan za putnike.",
            "Ako dobijete samo mali vaučer koji očigledno nije dovoljan za višesatno čekanje, sačuvajte ga, ali zabeležite i dodatne razumne troškove. Važno je da računi pokažu osnovnu potrebu, ne luksuznu potrošnju.",
          ],
        },
        {
          heading: "Šta ako aerodrom nema otvorene restorane",
          body: [
            "Noćna kašnjenja često stvaraju problem jer su restorani zatvoreni, a vaučer se ne može iskoristiti. U toj situaciji pitajte osoblje šta je alternativa i zabeležite odgovor. Ako kupujete hranu ili vodu gde je moguće, čuvajte račun.",
            "Ako nemate realnu opciju da iskoristite vaučer, to treba objasniti u zahtevu. Nije dovoljno reći da je vaučer bio loš; napišite kada je izdat, gde je mogao da se koristi i zašto to nije bilo praktično tokom čekanja.",
          ],
        },
        {
          heading: "Odnos vaučera, hotela i transfera",
          body: [
            "Kod čekanja do sledećeg dana pitanje više nije samo obrok. Putniku može trebati hotel i transfer između aerodroma i smeštaja. Ako kompanija obezbedi samo vaučer za hranu, pitajte posebno za smeštaj i prevoz.",
            "Ako sami plaćate hotel, ne mešajte taj zahtev sa vaučerom. U reklamaciji napravite odvojene stavke: obroci, transfer, hotel i fiksna naknada ako je relevantna. Takva struktura sprečava da kompanija odgovori samo na jednu tačku.",
          ],
        },
        {
          heading: "Kako pisati zahtev za refundaciju troškova",
          body: [
            "Navedite vreme čekanja, šta je aviokompanija ponudila, vrednost vaučera, zašto nije bilo dovoljno i koje ste dodatne troškove imali. Priložite račune po redosledu i objasnite zašto su bili razumni.",
            "Ako istovremeno tražite fiksnu naknadu, stavite je u poseban pasus. Vaučer za hranu ne dokazuje sam po sebi da naknada postoji, ali ne zatvara ni pitanje kašnjenja dolaska i odgovornosti aviokompanije.",
          ],
        },
      ],
    },
    en: {
      slug: "meal-voucher-flight-delay",
      title: "Meal voucher during flight delay: does it affect compensation",
      description: "When the airline must provide meals, refreshments and communication, what if the voucher is not enough and whether compensation is lost.",
      excerpt: "A meal voucher is part of care rights. It does not automatically mean you gave up fixed compensation for late arrival.",
      category: "Care rights",
      readTime: "8 min read",
      sections: [
        {
          heading: "What a meal voucher actually represents",
          body: [
            "A meal voucher is not a gift from the airline and it is not a replacement for [flight delay compensation](/en/flight-delay-compensation). It is usually a way to provide care during the wait. Fixed compensation is checked separately by arrival, route and delay reason.",
            "Accepting food or water therefore usually does not mean that you gave up other rights. It may be different if you sign a document saying that you accept a settlement or waive further claims. Do not sign that kind of document in a hurry.",
          ],
          bullets: [
            "A voucher is part of care rights, not a substitute for fixed compensation.",
            "Receipts for additional reasonable costs still matter if the voucher is not enough.",
            "Signing a settlement should be separated from accepting food or water.",
          ],
        },
        {
          heading: "When to ask for meals and refreshments",
          body: [
            "The right to assistance depends on waiting time and flight distance. For shorter flights the threshold is lower, for medium and longer flights it is higher. In practice, once the delay becomes serious, ask where vouchers are collected and what the plan is for passengers.",
            "If you receive only a small voucher that is clearly not enough for several hours of waiting, keep it, but also record additional reasonable costs. Receipts should show a basic need, not luxury spending.",
          ],
        },
        {
          heading: "What if airport restaurants are closed",
          body: [
            "Night delays often create a problem because restaurants are closed and the voucher cannot be used. In that situation, ask staff what the alternative is and record the answer. If you buy food or water where possible, keep the receipt.",
            "If there was no realistic way to use the voucher, explain that in the claim. It is not enough to say that the voucher was poor; write when it was issued, where it could be used and why that was not practical during the wait.",
          ],
        },
        {
          heading: "Voucher, hotel and transfer",
          body: [
            "When waiting continues to the next day, the issue is no longer only a meal. The passenger may need hotel accommodation and transfer between airport and hotel. If the airline provides only a meal voucher, ask separately for accommodation and transport.",
            "If you pay for the hotel yourself, do not mix that request with the voucher. In the complaint, use separate items: meals, transfer, hotel and fixed compensation if relevant. That structure prevents the airline from answering only one point.",
          ],
        },
        {
          heading: "How to request reimbursement of costs",
          body: [
            "State the waiting time, what the airline offered, voucher value, why it was not enough and which additional costs you had. Attach receipts in order and explain why they were reasonable.",
            "If you also request fixed compensation, put it in a separate paragraph. A meal voucher does not prove by itself that compensation is owed, but it also does not close the question of late arrival and airline responsibility.",
          ],
        },
      ],
    },
  },
  {
    id: "flight-delay-final-arrival-time",
    publishedAt: "2026-05-08",
    updatedAt: "2026-05-08",
    sr: {
      slug: "kasnjenje-leta-vreme-dolaska",
      title: "Kašnjenje leta i vreme dolaska: šta se stvarno računa",
      description: "Zašto se kod kašnjenja gleda dolazak na krajnju destinaciju, kako dokazati stvarno vreme i šta ako je bilo presedanja.",
      excerpt: "Kod kašnjenja leta najvažnije nije samo vreme poletanja. Presudan dokaz je kada ste stvarno stigli na krajnju destinaciju.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Polazak nije isto što i dolazak",
          body: [
            "Putnici često misle da je dovoljno da let poleti tri sata kasnije. Za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta) mnogo je važnije kada ste stigli na krajnju destinaciju. Avion može kasniti u polasku, ali nadoknaditi deo vremena u letu.",
            "Suprotno tome, polazak može kasniti manje od tri sata, ali zbog propuštene konekcije ceo put može završiti mnogo kasnije. Zato treba gledati ukupno putovanje pod istom rezervacijom, a ne samo prvi segment koji je bio problematičan.",
          ],
          bullets: [
            "Prag se najčešće meri dolaskom na krajnju destinaciju.",
            "Kod jedne rezervacije bitan je ceo put, ne samo prvi segment.",
            "Vreme blizu granice od tri sata traži precizne dokaze, ne zaokruživanje.",
          ],
        },
        {
          heading: "Šta je krajnja destinacija",
          body: [
            "Krajnja destinacija je aerodrom iz rezervacije do kog je aviokompanija trebalo da vas doveze. Ako imate jednu rezervaciju Beograd - Frankfurt - Lisabon, ne završava se procena u Frankfurtu. Gleda se kada ste stigli u Lisabon.",
            "Ako su karte kupljene odvojeno, svaka karta se obično procenjuje zasebno. To može oslabiti zahtev za posledice drugog leta, ali ne briše prava koja imate na prvom letu ako je i on stigao dovoljno kasno ili je izazvao troškove čekanja.",
          ],
        },
        {
          heading: "Kako dokazati stvarno vreme dolaska",
          body: [
            "Korisni dokazi su aplikacija aviokompanije, email sa novim vremenom, fotografija table dolazaka, podaci aerodroma, poruke o prtljagu i sopstvena beleška kada su vrata aviona otvorena. Ne oslanjajte se samo na planirani red letenja.",
            "Ako aviokompanija tvrdi da je dolazak bio ispod tri sata, tražite precizno vreme i osnov za tu tvrdnju. Razlika od nekoliko minuta može odlučiti slučaj, posebno kada je dolazak bio na samoj granici.",
          ],
        },
        {
          heading: "Konekcije i preusmeravanje",
          body: [
            "Kod propuštene konekcije pod jednom rezervacijom, najvažnije je kada ste stigli na poslednji aerodrom iz plana ili na razumnu zamenu koju je aviokompanija organizovala. Sačuvajte originalni i novi itinerer, jer bez njih nije jasno šta se poredi.",
            "Ako ste preusmereni na drugi aerodrom, pitajte ko organizuje transfer do prvobitne destinacije. Vreme dolaska može uključivati i praktičan završetak puta, naročito ako je aviokompanija sama promenila aerodrom dolaska.",
          ],
        },
        {
          heading: "Kako složiti zahtev oko vremena dolaska",
          body: [
            "U zahtevu napišite planirano vreme dolaska, stvarno vreme dolaska, izvor dokaza i da li je put bio jedna rezervacija. Ako postoji konekcija, navedite sve segmente i objasnite koji segment je izazvao zakašnjenje.",
            "Ako je slučaj blizu tri sata, budite posebno precizni. Nemojte zaokruživati vreme na svoju štetu ili korist. Precizna vremenska linija je jača od opšte tvrdnje da je čekanje trajalo veoma dugo.",
          ],
        },
      ],
    },
    en: {
      slug: "flight-delay-final-arrival-time",
      title: "Flight delay and arrival time: what actually counts",
      description: "Why final destination arrival matters for delays, how to prove actual time and what changes when there was a connection.",
      excerpt: "For a flight delay, departure time is not the only key fact. The decisive evidence is when you actually reached the final destination.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "Departure is not the same as arrival",
          body: [
            "Passengers often think it is enough that the flight departed three hours late. For [flight delay compensation](/en/flight-delay-compensation), it is much more important when you reached the final destination. An aircraft may depart late but recover part of the time in flight.",
            "The opposite can also happen: departure may be under three hours late, but because of a missed connection the whole journey may end much later. Look at the total journey under the same booking, not only the first segment that caused trouble.",
          ],
          bullets: [
            "The threshold is usually measured at final-destination arrival.",
            "Under one booking, the whole journey matters, not only the first segment.",
            "Arrival close to the three-hour line needs precise evidence, not rounding.",
          ],
        },
        {
          heading: "What final destination means",
          body: [
            "The final destination is the airport in the booking to which the airline was supposed to bring you. If you have one booking Belgrade - Frankfurt - Lisbon, the assessment does not stop in Frankfurt. It looks at when you reached Lisbon.",
            "If the tickets were bought separately, each ticket is usually assessed separately. That may weaken a claim for the consequences of the second flight, but it does not remove rights on the first flight if that flight also arrived late enough or created waiting costs.",
          ],
        },
        {
          heading: "How to prove actual arrival time",
          body: [
            "Useful evidence includes the airline app, email with new timing, arrivals-board photo, airport data, baggage messages and your own note of when the aircraft doors opened. Do not rely only on the scheduled timetable.",
            "If the airline claims arrival was under three hours late, ask for the exact time and basis for that claim. A difference of a few minutes can decide the case, especially when arrival was right on the threshold.",
          ],
        },
        {
          heading: "Connections and rerouting",
          body: [
            "For a missed connection under one booking, the key question is when you reached the last airport in the plan or the reasonable replacement arranged by the airline. Keep the original and new itinerary because without them it is unclear what is being compared.",
            "If you were rerouted to another airport, ask who organizes transfer to the original destination. Arrival time may include the practical completion of the journey, especially if the airline itself changed the arrival airport.",
          ],
        },
        {
          heading: "How to build the claim around arrival time",
          body: [
            "In the claim, state scheduled arrival time, actual arrival time, evidence source and whether the journey was one booking. If there is a connection, list all segments and explain which segment caused the late arrival.",
            "If the case is close to three hours, be especially precise. Do not round the time for or against yourself. A precise timeline is stronger than a broad statement that the wait was very long.",
          ],
        },
      ],
    },
  },
] satisfies BlogArticle[];
