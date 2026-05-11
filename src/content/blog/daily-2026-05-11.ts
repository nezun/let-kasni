import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "codeshare-operating-carrier-flight-delay": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft parked at a gate before a codeshare flight",
    position: "center",
  },
  "package-holiday-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport board during a holiday flight delay",
    position: "center",
  },
  "group-booking-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Passengers waiting together near an airport runway",
    position: "center",
  },
  "flight-delay-after-boarding": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft waiting before departure after boarding",
    position: "center",
  },
  "airline-changed-delay-reason": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Passengers checking flight status messages at the airport",
    position: "center",
  },
  "connecting-delay-minimum-connection-time": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger waiting during a tight airport connection",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

export const articles = [
  {
    id: "codeshare-operating-carrier-flight-delay",
    publishedAt: "2026-05-11",
    updatedAt: "2026-05-11",
    sr:     {
      slug: "codeshare-let-kasnjenje-operativni-prevoznik",
      title: "Codeshare kašnjenje leta: ko je odgovoran operativni prevoznik",
      description: "Kako proveriti codeshare kašnjenje leta: marketing aviokompanija, operativni prevoznik, krajnji dolazak, dokaz i zahtev.",
      excerpt: "Kod codeshare leta ime na karti nije uvek dovoljno. Za naknadu je presudno ko je stvarno obavljao let i kako je kašnjenje pogodilo krajnju destinaciju.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Kada ovaj scenario treba proveriti",
          body: [
            "Za codeshare letove kod kojih karta i avion nose različite aviokompanije prvo se ne proverava samo kašnjenje u polasku, već posledica po ceo put. Ako ste na krajnju destinaciju stigli tri sata ili više kasnije, slučaj treba uporediti sa pravilima za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Isti let može imati drugačiji ishod ako je putnik stigao kasno zbog jedne rezervacije, ako je kupio nepovezan nastavak ili ako je aviokompanija brzo obezbedila razumno preusmeravanje.",
            "Važno je odvojiti tri pitanja: da li postoji osnov za fiksnu naknadu, da li imate pravo na brigu tokom čekanja i da li treba tražiti refundaciju dodatnih troškova. Let Kasni zato ovakav slučaj ne tretira kao jednu kratku žalbu, već kao dosije sa rutom, vremenima, razlogom i dokazima.",
          ],
          bullets: [
            "Meri se dolazak na krajnju destinaciju, ne samo kasniji polazak.",
            "Pokrivenost zavisi od rute, operativnog prevoznika i rezervacije.",
            "Razlog kašnjenja mora biti konkretan, ne samo opšta poruka.",
          ],
        },
        {
          heading: "Ruta i pokrivenost pravila",
          body: [
            "Kod codeshare putovanja prvo se odvaja marketing aviokompanija od operativnog prevoznika. Zahtev se najčešće usmerava prema kompaniji koja je stvarno obavljala let, jer ona kontroliše posadu, avion i operativni tok.",
            "Ovo je često kod ruta preko evropskih čvorišta, kada je karta kupljena kod jedne kompanije, a segment obavlja partner iz iste alijanse ili regionalni prevoznik. Kod svake takve situacije treba zabeležiti aerodrom polaska, aerodrom dolaska, operativnog prevoznika i da li su svi segmenti kupljeni zajedno. Ta četiri podatka često odlučuju da li se slučaj vodi kao običan poremećaj ili kao zahtev za naknadu.",
            "Državljanstvo putnika obično nije glavna činjenica. Mnogo važnije je da li pravila pokrivaju aerodrom i prevoznika, kao i da li je dolazak na poslednju destinaciju bio dovoljno kasan. Zato zahtev ne treba slati pre nego što je ruta zapisana uredno i bez pretpostavki.",
          ],
        },
        {
          heading: "Tabela za proveru iznosa i dolaska",
          body: [
            "Najjednostavnija provera je mala tabela sa kolonama: broj leta, ruta, prevoznik, planirani dolazak, stvarni dolazak, dužina rute, navedeni razlog i ponuđena pomoć. Ta tabela sprečava da se pomešaju polazak, sletanje i otvaranje vrata aviona, što je česta greška kod dužih čekanja.",
            "Ako je ruta kraća, iznos može biti 250 evra. Za srednje evropske rute često se proverava 400 evra, dok duge rute mogu otvoriti pitanje 600 evra, uz posebna pravila kada je kašnjenje između tri i četiri sata. Iznos ne zavisi od cene karte, već od razdaljine i uslova primene.",
            "Ako je aviokompanija navela loše vreme, slot, zatvaranje piste ili bezbednost, to ne znači automatski kraj. Treba proveriti gde je problem nastao, koliko je trajao i da li direktno objašnjava baš vaš kasni dolazak. Kod tehničkog kvara, posade ili kasne rotacije obično se traži precizniji odgovor.",
          ],
        },
        {
          heading: "Briga, troškovi i preusmeravanje",
          body: [
            "Pravo na brigu postoji odvojeno od fiksne naknade. Tokom dužeg čekanja treba tražiti obrok, osveženje, komunikaciju, a ako se polazak pomera za naredni dan i hotel sa transferom. Ako pomoć ne dobijete, troškovi treba da budu razumni i povezani sa čekanjem.",
            "Kod preusmeravanja je važno šta je ponuđeno i kada. Ako alternativa stiže mnogo kasnije, ako propuštate nastavak puta ili ako morate prihvatiti drugi aerodrom dolaska, sve to treba ući u vremensku liniju. Bez toga aviokompanija može odgovoriti samo na prvi segment, iako je stvarna šteta nastala na kraju putovanja.",
          ],
        },
        {
          heading: "Kontrolna lista za dokazni dosije",
          body: [
            "Za codeshare slučaj sačuvajte kartu sa oba koda leta, boarding pass, ime operativnog prevoznika, poruke svake uključene aviokompanije i dokaz kada ste stigli na poslednju destinaciju.",
            "Najbolji dosije ima kratak redosled događaja: kada ste saznali za kašnjenje, šta je navedeno kao razlog, šta vam je ponuđeno, kada ste stvarno krenuli i kada ste stigli. Ako se razlog menjao kroz aplikaciju, email i usmeno obaveštenje, sačuvajte sve verzije.",
            "Profesionalna obrada zahteva je korisna baš zato što se ne oslanja na utisak putnika, već na proverljive činjenice. Uredan dosije skraćuje komunikaciju sa aviokompanijom, smanjuje rizik od generičkog odbijanja i olakšava sledeći korak ako odgovor ne pokrije sve podatke.",
          ],
          bullets: [
            "Boarding pass i potvrda rezervacije za svaki segment.",
            "Poruke aviokompanije, screenshot statusa i fotografija table.",
            "Računi za hranu, hotel, transfer ili novu kartu ako su nastali.",
            "Jasan dokaz stvarnog dolaska na poslednju destinaciju.",
          ],
        }
      ],
    },
    en:     {
      slug: "codeshare-flight-delay-operating-carrier",
      title: "Codeshare flight delay: when the operating carrier is responsible",
      description: "How to check a codeshare flight delay: marketing airline, operating carrier, final arrival, evidence and the claim.",
      excerpt: "On a codeshare flight, the name on the ticket is not always enough. Compensation usually turns on who actually operated the flight and how the delay affected final arrival.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "When this scenario should be checked",
          body: [
            "For codeshare flights where the ticket and aircraft show different airlines, the first check is not departure delay alone, but the consequence for the whole journey. If you arrived at the final destination three hours or more late, compare the case with [flight delay compensation](/en/flight-delay-compensation). The same flight can have a different outcome if the passenger arrived late under one booking, bought an unrelated onward leg or received reasonable rerouting quickly.",
            "It is important to separate three questions: whether fixed compensation may apply, whether care was owed during the wait and whether extra costs should be reimbursed. Let Kasni therefore treats this kind of case as a file with route, times, reason and evidence, not as one short complaint.",
          ],
          bullets: [
            "Final arrival is measured, not only late departure.",
            "Coverage depends on route, operating carrier and booking.",
            "The delay reason must be concrete, not only a broad message.",
          ],
        },
        {
          heading: "Route and rule coverage",
          body: [
            "For codeshare journeys, separate the marketing airline from the operating carrier first. The claim is usually directed at the airline that actually operated the flight because it controls the crew, aircraft and operation.",
            "This is common on routes through European hubs, where the ticket is sold by one airline but a partner or regional carrier operates one segment. For every such situation, record the departure airport, arrival airport, operating carrier and whether all segments were bought together. Those four facts often decide whether the case is only a travel disruption or a compensation claim.",
            "Passenger nationality is usually not the central fact. What matters more is whether the airport and carrier are covered and whether arrival at the last destination was late enough. That is why a claim should not be sent before the route is written down clearly and without assumptions.",
          ],
        },
        {
          heading: "Table for amount and arrival review",
          body: [
            "The simplest review is a small table with these columns: flight number, route, carrier, scheduled arrival, actual arrival, route distance, stated reason and assistance offered. This prevents confusion between departure, landing and aircraft-door opening, which is common during long waits.",
            "For shorter routes, the amount may be 250 euros. For medium European routes, 400 euros is often checked, while longer routes may raise the 600-euro level, with special rules when the delay is between three and four hours. The amount depends on distance and eligibility, not ticket price.",
            "If the airline cites bad weather, a slot, runway closure or security, that is not automatically the end. Check where the issue happened, how long it lasted and whether it directly explains your late arrival. For technical faults, crew issues or late aircraft rotation, a more precise explanation is usually needed.",
          ],
        },
        {
          heading: "Care, costs and rerouting",
          body: [
            "Care rights are separate from fixed compensation. During a longer wait, ask for meals, refreshments, communication and, if departure moves to the next day, hotel accommodation with transfer. If assistance is not provided, costs should be reasonable and connected to the wait.",
            "For rerouting, what was offered and when matters. If the alternative arrives much later, if you miss an onward leg or if you have to accept another arrival airport, include that in the timeline. Otherwise the airline may answer only about the first segment, even though the real consequence happened at the end of the journey.",
          ],
        },
        {
          heading: "Checklist for the evidence file",
          body: [
            "For a codeshare case, keep the ticket with both flight codes, boarding pass, operating-carrier name, messages from each airline involved and proof of arrival at the final destination.",
            "The best case file has a short sequence of events: when you learned about the delay, what reason was given, what was offered, when you actually departed and when you arrived. If the reason changed across the app, email and verbal announcements, keep every version.",
            "Professional claim handling helps because it relies on checkable facts instead of passenger impressions. A clean file shortens communication with the airline, reduces the risk of a generic rejection and makes the next step easier if the reply does not address all facts.",
          ],
          bullets: [
            "Boarding pass and booking confirmation for every segment.",
            "Airline messages, status screenshots and a departures-board photo.",
            "Receipts for food, hotel, transfer or a new ticket if costs arose.",
            "Clear proof of actual arrival at the final destination.",
          ],
        }
      ],
    },
  },
  {
    id: "package-holiday-flight-delay-compensation",
    publishedAt: "2026-05-11",
    updatedAt: "2026-05-11",
    sr:     {
      slug: "paket-aranzman-kasnjenje-leta-naknada",
      title: "Kašnjenje leta u paket aranžmanu: naknada i prava putnika",
      description: "Šta proveriti kada kasni let iz paket aranžmana: aviokompanija, agencija, krajnji dolazak, briga i dokazi.",
      excerpt: "Paket aranžman ne ukida prava iz kašnjenja leta. Treba odvojiti zahtev prema aviokompaniji od pitanja šta duguje organizator putovanja.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Kada ovaj scenario treba proveriti",
          body: [
            "Za letove u paket aranžmanu, čarteru ili turističkom putovanju prvo se ne proverava samo kašnjenje u polasku, već posledica po ceo put. Ako ste na krajnju destinaciju stigli tri sata ili više kasnije, slučaj treba uporediti sa pravilima za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Isti let može imati drugačiji ishod ako je putnik stigao kasno zbog jedne rezervacije, ako je kupio nepovezan nastavak ili ako je aviokompanija brzo obezbedila razumno preusmeravanje.",
            "Važno je odvojiti tri pitanja: da li postoji osnov za fiksnu naknadu, da li imate pravo na brigu tokom čekanja i da li treba tražiti refundaciju dodatnih troškova. Let Kasni zato ovakav slučaj ne tretira kao jednu kratku žalbu, već kao dosije sa rutom, vremenima, razlogom i dokazima.",
          ],
          bullets: [
            "Meri se dolazak na krajnju destinaciju, ne samo kasniji polazak.",
            "Pokrivenost zavisi od rute, operativnog prevoznika i rezervacije.",
            "Razlog kašnjenja mora biti konkretan, ne samo opšta poruka.",
          ],
        },
        {
          heading: "Ruta i pokrivenost pravila",
          body: [
            "Kod paket aranžmana putnik često komunicira sa agencijom, ali se fiksna naknada za kašnjenje proverava prema operativnoj aviokompaniji i ruti. Organizator putovanja može biti važan za informacije, transfere i dodatne usluge.",
            "Najčešći problem je što putnik dobije usmeno obaveštenje od vodiča ili agencije, a nema pisani razlog aviokompanije. Bez toga je teže razlikovati tehnički kvar, slot, vreme ili reorganizaciju rotacije. Kod svake takve situacije treba zabeležiti aerodrom polaska, aerodrom dolaska, operativnog prevoznika i da li su svi segmenti kupljeni zajedno. Ta četiri podatka često odlučuju da li se slučaj vodi kao običan poremećaj ili kao zahtev za naknadu.",
            "Državljanstvo putnika obično nije glavna činjenica. Mnogo važnije je da li pravila pokrivaju aerodrom i prevoznika, kao i da li je dolazak na poslednju destinaciju bio dovoljno kasan. Zato zahtev ne treba slati pre nego što je ruta zapisana uredno i bez pretpostavki.",
          ],
        },
        {
          heading: "Tabela za proveru iznosa i dolaska",
          body: [
            "Najjednostavnija provera je mala tabela sa kolonama: broj leta, ruta, prevoznik, planirani dolazak, stvarni dolazak, dužina rute, navedeni razlog i ponuđena pomoć. Ta tabela sprečava da se pomešaju polazak, sletanje i otvaranje vrata aviona, što je česta greška kod dužih čekanja.",
            "Ako je ruta kraća, iznos može biti 250 evra. Za srednje evropske rute često se proverava 400 evra, dok duge rute mogu otvoriti pitanje 600 evra, uz posebna pravila kada je kašnjenje između tri i četiri sata. Iznos ne zavisi od cene karte, već od razdaljine i uslova primene.",
            "Ako je aviokompanija navela loše vreme, slot, zatvaranje piste ili bezbednost, to ne znači automatski kraj. Treba proveriti gde je problem nastao, koliko je trajao i da li direktno objašnjava baš vaš kasni dolazak. Kod tehničkog kvara, posade ili kasne rotacije obično se traži precizniji odgovor.",
          ],
        },
        {
          heading: "Briga, troškovi i preusmeravanje",
          body: [
            "Pravo na brigu postoji odvojeno od fiksne naknade. Tokom dužeg čekanja treba tražiti obrok, osveženje, komunikaciju, a ako se polazak pomera za naredni dan i hotel sa transferom. Ako pomoć ne dobijete, troškovi treba da budu razumni i povezani sa čekanjem.",
            "Kod preusmeravanja je važno šta je ponuđeno i kada. Ako alternativa stiže mnogo kasnije, ako propuštate nastavak puta ili ako morate prihvatiti drugi aerodrom dolaska, sve to treba ući u vremensku liniju. Bez toga aviokompanija može odgovoriti samo na prvi segment, iako je stvarna šteta nastala na kraju putovanja.",
          ],
        },
        {
          heading: "Kontrolna lista za dokazni dosije",
          body: [
            "Za paket aranžman sačuvajte ugovor ili potvrdu aranžmana, avionsku kartu, boarding pass, poruke agencije i aviokompanije, vaučere, račune i stvarno vreme dolaska.",
            "Najbolji dosije ima kratak redosled događaja: kada ste saznali za kašnjenje, šta je navedeno kao razlog, šta vam je ponuđeno, kada ste stvarno krenuli i kada ste stigli. Ako se razlog menjao kroz aplikaciju, email i usmeno obaveštenje, sačuvajte sve verzije.",
            "Profesionalna obrada zahteva je korisna baš zato što se ne oslanja na utisak putnika, već na proverljive činjenice. Uredan dosije skraćuje komunikaciju sa aviokompanijom, smanjuje rizik od generičkog odbijanja i olakšava sledeći korak ako odgovor ne pokrije sve podatke.",
          ],
          bullets: [
            "Boarding pass i potvrda rezervacije za svaki segment.",
            "Poruke aviokompanije, screenshot statusa i fotografija table.",
            "Računi za hranu, hotel, transfer ili novu kartu ako su nastali.",
            "Jasan dokaz stvarnog dolaska na poslednju destinaciju.",
          ],
        }
      ],
    },
    en:     {
      slug: "package-holiday-flight-delay-compensation",
      title: "Package holiday flight delay: compensation and passenger rights",
      description: "What to check when a package-holiday flight is delayed: airline, travel organizer, final arrival, care and evidence.",
      excerpt: "A package holiday does not remove flight-delay rights. Separate the airline claim from any issue involving the travel organizer.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "When this scenario should be checked",
          body: [
            "For package-holiday, charter or tour flights, the first check is not departure delay alone, but the consequence for the whole journey. If you arrived at the final destination three hours or more late, compare the case with [flight delay compensation](/en/flight-delay-compensation). The same flight can have a different outcome if the passenger arrived late under one booking, bought an unrelated onward leg or received reasonable rerouting quickly.",
            "It is important to separate three questions: whether fixed compensation may apply, whether care was owed during the wait and whether extra costs should be reimbursed. Let Kasni therefore treats this kind of case as a file with route, times, reason and evidence, not as one short complaint.",
          ],
          bullets: [
            "Final arrival is measured, not only late departure.",
            "Coverage depends on route, operating carrier and booking.",
            "The delay reason must be concrete, not only a broad message.",
          ],
        },
        {
          heading: "Route and rule coverage",
          body: [
            "In a package holiday, the passenger often communicates with the travel organizer, but fixed delay compensation is assessed against the operating airline and route. The organizer may still matter for information, transfers and additional travel services.",
            "A common problem is that the passenger receives a verbal explanation from a representative but no written airline reason. That makes it harder to separate technical fault, slot, weather or aircraft-rotation issues. For every such situation, record the departure airport, arrival airport, operating carrier and whether all segments were bought together. Those four facts often decide whether the case is only a travel disruption or a compensation claim.",
            "Passenger nationality is usually not the central fact. What matters more is whether the airport and carrier are covered and whether arrival at the last destination was late enough. That is why a claim should not be sent before the route is written down clearly and without assumptions.",
          ],
        },
        {
          heading: "Table for amount and arrival review",
          body: [
            "The simplest review is a small table with these columns: flight number, route, carrier, scheduled arrival, actual arrival, route distance, stated reason and assistance offered. This prevents confusion between departure, landing and aircraft-door opening, which is common during long waits.",
            "For shorter routes, the amount may be 250 euros. For medium European routes, 400 euros is often checked, while longer routes may raise the 600-euro level, with special rules when the delay is between three and four hours. The amount depends on distance and eligibility, not ticket price.",
            "If the airline cites bad weather, a slot, runway closure or security, that is not automatically the end. Check where the issue happened, how long it lasted and whether it directly explains your late arrival. For technical faults, crew issues or late aircraft rotation, a more precise explanation is usually needed.",
          ],
        },
        {
          heading: "Care, costs and rerouting",
          body: [
            "Care rights are separate from fixed compensation. During a longer wait, ask for meals, refreshments, communication and, if departure moves to the next day, hotel accommodation with transfer. If assistance is not provided, costs should be reasonable and connected to the wait.",
            "For rerouting, what was offered and when matters. If the alternative arrives much later, if you miss an onward leg or if you have to accept another arrival airport, include that in the timeline. Otherwise the airline may answer only about the first segment, even though the real consequence happened at the end of the journey.",
          ],
        },
        {
          heading: "Checklist for the evidence file",
          body: [
            "For a package-holiday case, keep the travel contract or confirmation, flight ticket, boarding pass, organizer and airline messages, vouchers, receipts and actual arrival time.",
            "The best case file has a short sequence of events: when you learned about the delay, what reason was given, what was offered, when you actually departed and when you arrived. If the reason changed across the app, email and verbal announcements, keep every version.",
            "Professional claim handling helps because it relies on checkable facts instead of passenger impressions. A clean file shortens communication with the airline, reduces the risk of a generic rejection and makes the next step easier if the reply does not address all facts.",
          ],
          bullets: [
            "Boarding pass and booking confirmation for every segment.",
            "Airline messages, status screenshots and a departures-board photo.",
            "Receipts for food, hotel, transfer or a new ticket if costs arose.",
            "Clear proof of actual arrival at the final destination.",
          ],
        }
      ],
    },
  },
  {
    id: "group-booking-flight-delay-compensation",
    publishedAt: "2026-05-11",
    updatedAt: "2026-05-11",
    sr:     {
      slug: "grupna-rezervacija-kasnjenje-leta-naknada",
      title: "Grupna rezervacija i kašnjenje leta: kako se proverava naknada",
      description: "Kako se vodi zahtev kada više putnika ima isto kašnjenje: grupa, porodica, deca, odvojeni troškovi i dokazni dosije.",
      excerpt: "Kod grupne rezervacije svaki putnik može imati svoje pravo, ali dokazi, troškovi i punomoćja moraju biti uredno razdvojeni.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Kada ovaj scenario treba proveriti",
          body: [
            "Za grupne, porodične i poslovne rezervacije sa istim kašnjenjem prvo se ne proverava samo kašnjenje u polasku, već posledica po ceo put. Ako ste na krajnju destinaciju stigli tri sata ili više kasnije, slučaj treba uporediti sa pravilima za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Isti let može imati drugačiji ishod ako je putnik stigao kasno zbog jedne rezervacije, ako je kupio nepovezan nastavak ili ako je aviokompanija brzo obezbedila razumno preusmeravanje.",
            "Važno je odvojiti tri pitanja: da li postoji osnov za fiksnu naknadu, da li imate pravo na brigu tokom čekanja i da li treba tražiti refundaciju dodatnih troškova. Let Kasni zato ovakav slučaj ne tretira kao jednu kratku žalbu, već kao dosije sa rutom, vremenima, razlogom i dokazima.",
          ],
          bullets: [
            "Meri se dolazak na krajnju destinaciju, ne samo kasniji polazak.",
            "Pokrivenost zavisi od rute, operativnog prevoznika i rezervacije.",
            "Razlog kašnjenja mora biti konkretan, ne samo opšta poruka.",
          ],
        },
        {
          heading: "Ruta i pokrivenost pravila",
          body: [
            "Fiksna naknada se obično proverava po putniku, ne po rezervaciji. Ipak, troškovi hrane, hotela, transfera ili nove karte mogu biti zajednički ili podeljeni, pa ih treba prikazati jasno.",
            "Grupni slučajevi su jaki kada svi imaju isti let i isti kasni dolazak, ali postaju složeniji ako deo grupe putuje dalje, ako su deca na rezervaciji ili ako jedna osoba plaća troškove za sve. Kod svake takve situacije treba zabeležiti aerodrom polaska, aerodrom dolaska, operativnog prevoznika i da li su svi segmenti kupljeni zajedno. Ta četiri podatka često odlučuju da li se slučaj vodi kao običan poremećaj ili kao zahtev za naknadu.",
            "Državljanstvo putnika obično nije glavna činjenica. Mnogo važnije je da li pravila pokrivaju aerodrom i prevoznika, kao i da li je dolazak na poslednju destinaciju bio dovoljno kasan. Zato zahtev ne treba slati pre nego što je ruta zapisana uredno i bez pretpostavki.",
          ],
        },
        {
          heading: "Tabela za proveru iznosa i dolaska",
          body: [
            "Najjednostavnija provera je mala tabela sa kolonama: broj leta, ruta, prevoznik, planirani dolazak, stvarni dolazak, dužina rute, navedeni razlog i ponuđena pomoć. Ta tabela sprečava da se pomešaju polazak, sletanje i otvaranje vrata aviona, što je česta greška kod dužih čekanja.",
            "Ako je ruta kraća, iznos može biti 250 evra. Za srednje evropske rute često se proverava 400 evra, dok duge rute mogu otvoriti pitanje 600 evra, uz posebna pravila kada je kašnjenje između tri i četiri sata. Iznos ne zavisi od cene karte, već od razdaljine i uslova primene.",
            "Ako je aviokompanija navela loše vreme, slot, zatvaranje piste ili bezbednost, to ne znači automatski kraj. Treba proveriti gde je problem nastao, koliko je trajao i da li direktno objašnjava baš vaš kasni dolazak. Kod tehničkog kvara, posade ili kasne rotacije obično se traži precizniji odgovor.",
          ],
        },
        {
          heading: "Briga, troškovi i preusmeravanje",
          body: [
            "Pravo na brigu postoji odvojeno od fiksne naknade. Tokom dužeg čekanja treba tražiti obrok, osveženje, komunikaciju, a ako se polazak pomera za naredni dan i hotel sa transferom. Ako pomoć ne dobijete, troškovi treba da budu razumni i povezani sa čekanjem.",
            "Kod preusmeravanja je važno šta je ponuđeno i kada. Ako alternativa stiže mnogo kasnije, ako propuštate nastavak puta ili ako morate prihvatiti drugi aerodrom dolaska, sve to treba ući u vremensku liniju. Bez toga aviokompanija može odgovoriti samo na prvi segment, iako je stvarna šteta nastala na kraju putovanja.",
          ],
        },
        {
          heading: "Kontrolna lista za dokazni dosije",
          body: [
            "Za grupu sačuvajte spisak putnika, booking referencu, boarding pass za svaku osobu, račune sa objašnjenjem za koga su plaćeni i dokaz ko može da komunicira u ime grupe.",
            "Najbolji dosije ima kratak redosled događaja: kada ste saznali za kašnjenje, šta je navedeno kao razlog, šta vam je ponuđeno, kada ste stvarno krenuli i kada ste stigli. Ako se razlog menjao kroz aplikaciju, email i usmeno obaveštenje, sačuvajte sve verzije.",
            "Profesionalna obrada zahteva je korisna baš zato što se ne oslanja na utisak putnika, već na proverljive činjenice. Uredan dosije skraćuje komunikaciju sa aviokompanijom, smanjuje rizik od generičkog odbijanja i olakšava sledeći korak ako odgovor ne pokrije sve podatke.",
          ],
          bullets: [
            "Boarding pass i potvrda rezervacije za svaki segment.",
            "Poruke aviokompanije, screenshot statusa i fotografija table.",
            "Računi za hranu, hotel, transfer ili novu kartu ako su nastali.",
            "Jasan dokaz stvarnog dolaska na poslednju destinaciju.",
          ],
        }
      ],
    },
    en:     {
      slug: "group-booking-flight-delay-compensation",
      title: "Group booking flight delay: how compensation is checked",
      description: "How to handle a claim when several passengers share the same delay: group, family, children, separate costs and evidence file.",
      excerpt: "In a group booking, each passenger may have a separate right, but evidence, costs and authorizations must be kept clear.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "When this scenario should be checked",
          body: [
            "For group, family and business bookings affected by the same delay, the first check is not departure delay alone, but the consequence for the whole journey. If you arrived at the final destination three hours or more late, compare the case with [flight delay compensation](/en/flight-delay-compensation). The same flight can have a different outcome if the passenger arrived late under one booking, bought an unrelated onward leg or received reasonable rerouting quickly.",
            "It is important to separate three questions: whether fixed compensation may apply, whether care was owed during the wait and whether extra costs should be reimbursed. Let Kasni therefore treats this kind of case as a file with route, times, reason and evidence, not as one short complaint.",
          ],
          bullets: [
            "Final arrival is measured, not only late departure.",
            "Coverage depends on route, operating carrier and booking.",
            "The delay reason must be concrete, not only a broad message.",
          ],
        },
        {
          heading: "Route and rule coverage",
          body: [
            "Fixed compensation is usually checked per passenger, not per booking. However, food, hotel, transfer or new-ticket costs may be shared or paid by one person, so they should be presented clearly.",
            "Group cases are straightforward when everyone has the same flight and late arrival, but become more sensitive if part of the group travels onward, children are included or one person pays costs for everyone. For every such situation, record the departure airport, arrival airport, operating carrier and whether all segments were bought together. Those four facts often decide whether the case is only a travel disruption or a compensation claim.",
            "Passenger nationality is usually not the central fact. What matters more is whether the airport and carrier are covered and whether arrival at the last destination was late enough. That is why a claim should not be sent before the route is written down clearly and without assumptions.",
          ],
        },
        {
          heading: "Table for amount and arrival review",
          body: [
            "The simplest review is a small table with these columns: flight number, route, carrier, scheduled arrival, actual arrival, route distance, stated reason and assistance offered. This prevents confusion between departure, landing and aircraft-door opening, which is common during long waits.",
            "For shorter routes, the amount may be 250 euros. For medium European routes, 400 euros is often checked, while longer routes may raise the 600-euro level, with special rules when the delay is between three and four hours. The amount depends on distance and eligibility, not ticket price.",
            "If the airline cites bad weather, a slot, runway closure or security, that is not automatically the end. Check where the issue happened, how long it lasted and whether it directly explains your late arrival. For technical faults, crew issues or late aircraft rotation, a more precise explanation is usually needed.",
          ],
        },
        {
          heading: "Care, costs and rerouting",
          body: [
            "Care rights are separate from fixed compensation. During a longer wait, ask for meals, refreshments, communication and, if departure moves to the next day, hotel accommodation with transfer. If assistance is not provided, costs should be reasonable and connected to the wait.",
            "For rerouting, what was offered and when matters. If the alternative arrives much later, if you miss an onward leg or if you have to accept another arrival airport, include that in the timeline. Otherwise the airline may answer only about the first segment, even though the real consequence happened at the end of the journey.",
          ],
        },
        {
          heading: "Checklist for the evidence file",
          body: [
            "For a group, keep the passenger list, booking reference, boarding pass for each person, receipts with an explanation of who they covered and proof of who may communicate for the group.",
            "The best case file has a short sequence of events: when you learned about the delay, what reason was given, what was offered, when you actually departed and when you arrived. If the reason changed across the app, email and verbal announcements, keep every version.",
            "Professional claim handling helps because it relies on checkable facts instead of passenger impressions. A clean file shortens communication with the airline, reduces the risk of a generic rejection and makes the next step easier if the reply does not address all facts.",
          ],
          bullets: [
            "Boarding pass and booking confirmation for every segment.",
            "Airline messages, status screenshots and a departures-board photo.",
            "Receipts for food, hotel, transfer or a new ticket if costs arose.",
            "Clear proof of actual arrival at the final destination.",
          ],
        }
      ],
    },
  },
  {
    id: "flight-delay-after-boarding",
    publishedAt: "2026-05-11",
    updatedAt: "2026-05-11",
    sr:     {
      slug: "kasnjenje-leta-posle-ukrcavanja",
      title: "Kašnjenje leta posle ukrcavanja: šta se računa i šta dokazati",
      description: "Šta putnik treba da zna kada avion kasni posle ukrcavanja: vrata aviona, tarmac čekanje, briga, krajnji dolazak i dokaz.",
      excerpt: "Ako ste već u avionu, slučaj se ne završava time što je boarding obavljen. I dalje se meri stvarni dolazak i razlog kašnjenja.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Kada ovaj scenario treba proveriti",
          body: [
            "Za kašnjenja koja počnu posle ukrcavanja ili dok avion čeka na platformi prvo se ne proverava samo kašnjenje u polasku, već posledica po ceo put. Ako ste na krajnju destinaciju stigli tri sata ili više kasnije, slučaj treba uporediti sa pravilima za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Isti let može imati drugačiji ishod ako je putnik stigao kasno zbog jedne rezervacije, ako je kupio nepovezan nastavak ili ako je aviokompanija brzo obezbedila razumno preusmeravanje.",
            "Važno je odvojiti tri pitanja: da li postoji osnov za fiksnu naknadu, da li imate pravo na brigu tokom čekanja i da li treba tražiti refundaciju dodatnih troškova. Let Kasni zato ovakav slučaj ne tretira kao jednu kratku žalbu, već kao dosije sa rutom, vremenima, razlogom i dokazima.",
          ],
          bullets: [
            "Meri se dolazak na krajnju destinaciju, ne samo kasniji polazak.",
            "Pokrivenost zavisi od rute, operativnog prevoznika i rezervacije.",
            "Razlog kašnjenja mora biti konkretan, ne samo opšta poruka.",
          ],
        },
        {
          heading: "Ruta i pokrivenost pravila",
          body: [
            "Kašnjenje posle ukrcavanja može nastati zbog slota, tehničke provere, čekanja posade, prtljaga, goriva ili aerodromskog ograničenja. Za fiksnu naknadu i dalje je ključan dolazak na krajnju destinaciju.",
            "Putnici često nemaju fotografiju table jer su već u avionu, pa su važni poruke iz aplikacije, vreme zatvaranja i otvaranja vrata, izjava posade i kasniji zapis o stvarnom dolasku. Kod svake takve situacije treba zabeležiti aerodrom polaska, aerodrom dolaska, operativnog prevoznika i da li su svi segmenti kupljeni zajedno. Ta četiri podatka često odlučuju da li se slučaj vodi kao običan poremećaj ili kao zahtev za naknadu.",
            "Državljanstvo putnika obično nije glavna činjenica. Mnogo važnije je da li pravila pokrivaju aerodrom i prevoznika, kao i da li je dolazak na poslednju destinaciju bio dovoljno kasan. Zato zahtev ne treba slati pre nego što je ruta zapisana uredno i bez pretpostavki.",
          ],
        },
        {
          heading: "Tabela za proveru iznosa i dolaska",
          body: [
            "Najjednostavnija provera je mala tabela sa kolonama: broj leta, ruta, prevoznik, planirani dolazak, stvarni dolazak, dužina rute, navedeni razlog i ponuđena pomoć. Ta tabela sprečava da se pomešaju polazak, sletanje i otvaranje vrata aviona, što je česta greška kod dužih čekanja.",
            "Ako je ruta kraća, iznos može biti 250 evra. Za srednje evropske rute često se proverava 400 evra, dok duge rute mogu otvoriti pitanje 600 evra, uz posebna pravila kada je kašnjenje između tri i četiri sata. Iznos ne zavisi od cene karte, već od razdaljine i uslova primene.",
            "Ako je aviokompanija navela loše vreme, slot, zatvaranje piste ili bezbednost, to ne znači automatski kraj. Treba proveriti gde je problem nastao, koliko je trajao i da li direktno objašnjava baš vaš kasni dolazak. Kod tehničkog kvara, posade ili kasne rotacije obično se traži precizniji odgovor.",
          ],
        },
        {
          heading: "Briga, troškovi i preusmeravanje",
          body: [
            "Pravo na brigu postoji odvojeno od fiksne naknade. Tokom dužeg čekanja treba tražiti obrok, osveženje, komunikaciju, a ako se polazak pomera za naredni dan i hotel sa transferom. Ako pomoć ne dobijete, troškovi treba da budu razumni i povezani sa čekanjem.",
            "Kod preusmeravanja je važno šta je ponuđeno i kada. Ako alternativa stiže mnogo kasnije, ako propuštate nastavak puta ili ako morate prihvatiti drugi aerodrom dolaska, sve to treba ući u vremensku liniju. Bez toga aviokompanija može odgovoriti samo na prvi segment, iako je stvarna šteta nastala na kraju putovanja.",
          ],
        },
        {
          heading: "Kontrolna lista za dokazni dosije",
          body: [
            "Za kašnjenje posle ukrcavanja zabeležite kada ste ušli u avion, kada su vrata zatvorena, kada je navedeni razlog saopšten, kada su vrata otvorena na dolasku i da li je ponuđena voda ili druga pomoć.",
            "Najbolji dosije ima kratak redosled događaja: kada ste saznali za kašnjenje, šta je navedeno kao razlog, šta vam je ponuđeno, kada ste stvarno krenuli i kada ste stigli. Ako se razlog menjao kroz aplikaciju, email i usmeno obaveštenje, sačuvajte sve verzije.",
            "Profesionalna obrada zahteva je korisna baš zato što se ne oslanja na utisak putnika, već na proverljive činjenice. Uredan dosije skraćuje komunikaciju sa aviokompanijom, smanjuje rizik od generičkog odbijanja i olakšava sledeći korak ako odgovor ne pokrije sve podatke.",
          ],
          bullets: [
            "Boarding pass i potvrda rezervacije za svaki segment.",
            "Poruke aviokompanije, screenshot statusa i fotografija table.",
            "Računi za hranu, hotel, transfer ili novu kartu ako su nastali.",
            "Jasan dokaz stvarnog dolaska na poslednju destinaciju.",
          ],
        }
      ],
    },
    en:     {
      slug: "flight-delay-after-boarding",
      title: "Flight delay after boarding: what counts and what to prove",
      description: "What passengers should know when the aircraft is delayed after boarding: doors, tarmac wait, care, final arrival and evidence.",
      excerpt: "If you are already on board, the case is not over just because boarding happened. Actual arrival and the reason for delay still matter.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "When this scenario should be checked",
          body: [
            "For delays that begin after boarding or while the aircraft waits on the apron, the first check is not departure delay alone, but the consequence for the whole journey. If you arrived at the final destination three hours or more late, compare the case with [flight delay compensation](/en/flight-delay-compensation). The same flight can have a different outcome if the passenger arrived late under one booking, bought an unrelated onward leg or received reasonable rerouting quickly.",
            "It is important to separate three questions: whether fixed compensation may apply, whether care was owed during the wait and whether extra costs should be reimbursed. Let Kasni therefore treats this kind of case as a file with route, times, reason and evidence, not as one short complaint.",
          ],
          bullets: [
            "Final arrival is measured, not only late departure.",
            "Coverage depends on route, operating carrier and booking.",
            "The delay reason must be concrete, not only a broad message.",
          ],
        },
        {
          heading: "Route and rule coverage",
          body: [
            "A delay after boarding may be caused by a slot, technical check, crew wait, baggage, fuel or airport restriction. For fixed compensation, final arrival remains the key fact.",
            "Passengers often cannot photograph the departure board because they are already on board, so app messages, door closing and opening times, crew announcements and actual arrival records become important. For every such situation, record the departure airport, arrival airport, operating carrier and whether all segments were bought together. Those four facts often decide whether the case is only a travel disruption or a compensation claim.",
            "Passenger nationality is usually not the central fact. What matters more is whether the airport and carrier are covered and whether arrival at the last destination was late enough. That is why a claim should not be sent before the route is written down clearly and without assumptions.",
          ],
        },
        {
          heading: "Table for amount and arrival review",
          body: [
            "The simplest review is a small table with these columns: flight number, route, carrier, scheduled arrival, actual arrival, route distance, stated reason and assistance offered. This prevents confusion between departure, landing and aircraft-door opening, which is common during long waits.",
            "For shorter routes, the amount may be 250 euros. For medium European routes, 400 euros is often checked, while longer routes may raise the 600-euro level, with special rules when the delay is between three and four hours. The amount depends on distance and eligibility, not ticket price.",
            "If the airline cites bad weather, a slot, runway closure or security, that is not automatically the end. Check where the issue happened, how long it lasted and whether it directly explains your late arrival. For technical faults, crew issues or late aircraft rotation, a more precise explanation is usually needed.",
          ],
        },
        {
          heading: "Care, costs and rerouting",
          body: [
            "Care rights are separate from fixed compensation. During a longer wait, ask for meals, refreshments, communication and, if departure moves to the next day, hotel accommodation with transfer. If assistance is not provided, costs should be reasonable and connected to the wait.",
            "For rerouting, what was offered and when matters. If the alternative arrives much later, if you miss an onward leg or if you have to accept another arrival airport, include that in the timeline. Otherwise the airline may answer only about the first segment, even though the real consequence happened at the end of the journey.",
          ],
        },
        {
          heading: "Checklist for the evidence file",
          body: [
            "For a delay after boarding, record when you boarded, when doors closed, when the reason was announced, when doors opened on arrival and whether water or other assistance was offered.",
            "The best case file has a short sequence of events: when you learned about the delay, what reason was given, what was offered, when you actually departed and when you arrived. If the reason changed across the app, email and verbal announcements, keep every version.",
            "Professional claim handling helps because it relies on checkable facts instead of passenger impressions. A clean file shortens communication with the airline, reduces the risk of a generic rejection and makes the next step easier if the reply does not address all facts.",
          ],
          bullets: [
            "Boarding pass and booking confirmation for every segment.",
            "Airline messages, status screenshots and a departures-board photo.",
            "Receipts for food, hotel, transfer or a new ticket if costs arose.",
            "Clear proof of actual arrival at the final destination.",
          ],
        }
      ],
    },
  },
  {
    id: "airline-changed-delay-reason",
    publishedAt: "2026-05-11",
    updatedAt: "2026-05-11",
    sr:     {
      slug: "aviokompanija-menja-razlog-kasnjenja-leta",
      title: "Aviokompanija menja razlog kašnjenja: kako to utiče na zahtev",
      description: "Šta znači kada aviokompanija prvo navede tehnički kvar, zatim vreme, slot ili operativni razlog, i kako sačuvati dokaz.",
      excerpt: "Promena razloga ne dokazuje automatski naknadu, ali je jak signal da slučaj treba proveriti kroz vremensku liniju i dokaze.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Kada ovaj scenario treba proveriti",
          body: [
            "Za situacije u kojima se razlog kašnjenja menja kroz dan ili posle zahteva prvo se ne proverava samo kašnjenje u polasku, već posledica po ceo put. Ako ste na krajnju destinaciju stigli tri sata ili više kasnije, slučaj treba uporediti sa pravilima za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Isti let može imati drugačiji ishod ako je putnik stigao kasno zbog jedne rezervacije, ako je kupio nepovezan nastavak ili ako je aviokompanija brzo obezbedila razumno preusmeravanje.",
            "Važno je odvojiti tri pitanja: da li postoji osnov za fiksnu naknadu, da li imate pravo na brigu tokom čekanja i da li treba tražiti refundaciju dodatnih troškova. Let Kasni zato ovakav slučaj ne tretira kao jednu kratku žalbu, već kao dosije sa rutom, vremenima, razlogom i dokazima.",
          ],
          bullets: [
            "Meri se dolazak na krajnju destinaciju, ne samo kasniji polazak.",
            "Pokrivenost zavisi od rute, operativnog prevoznika i rezervacije.",
            "Razlog kašnjenja mora biti konkretan, ne samo opšta poruka.",
          ],
        },
        {
          heading: "Ruta i pokrivenost pravila",
          body: [
            "Aviokompanija može imati više stvarnih razloga za jedno kašnjenje, ali svaki razlog mora objasniti konkretan period i vezu sa vašim letom. Opšta promena formulacije ne bi trebalo da zameni dokaz.",
            "Tipično je da aplikacija prvo pokaže tehnički razlog, osoblje na gejtu kaže slot, a pisani odgovor kasnije navede vanredne okolnosti. Tada se proverava šta je zaista izazvalo kašnjenje na dolasku. Kod svake takve situacije treba zabeležiti aerodrom polaska, aerodrom dolaska, operativnog prevoznika i da li su svi segmenti kupljeni zajedno. Ta četiri podatka često odlučuju da li se slučaj vodi kao običan poremećaj ili kao zahtev za naknadu.",
            "Državljanstvo putnika obično nije glavna činjenica. Mnogo važnije je da li pravila pokrivaju aerodrom i prevoznika, kao i da li je dolazak na poslednju destinaciju bio dovoljno kasan. Zato zahtev ne treba slati pre nego što je ruta zapisana uredno i bez pretpostavki.",
          ],
        },
        {
          heading: "Tabela za proveru iznosa i dolaska",
          body: [
            "Najjednostavnija provera je mala tabela sa kolonama: broj leta, ruta, prevoznik, planirani dolazak, stvarni dolazak, dužina rute, navedeni razlog i ponuđena pomoć. Ta tabela sprečava da se pomešaju polazak, sletanje i otvaranje vrata aviona, što je česta greška kod dužih čekanja.",
            "Ako je ruta kraća, iznos može biti 250 evra. Za srednje evropske rute često se proverava 400 evra, dok duge rute mogu otvoriti pitanje 600 evra, uz posebna pravila kada je kašnjenje između tri i četiri sata. Iznos ne zavisi od cene karte, već od razdaljine i uslova primene.",
            "Ako je aviokompanija navela loše vreme, slot, zatvaranje piste ili bezbednost, to ne znači automatski kraj. Treba proveriti gde je problem nastao, koliko je trajao i da li direktno objašnjava baš vaš kasni dolazak. Kod tehničkog kvara, posade ili kasne rotacije obično se traži precizniji odgovor.",
          ],
        },
        {
          heading: "Briga, troškovi i preusmeravanje",
          body: [
            "Pravo na brigu postoji odvojeno od fiksne naknade. Tokom dužeg čekanja treba tražiti obrok, osveženje, komunikaciju, a ako se polazak pomera za naredni dan i hotel sa transferom. Ako pomoć ne dobijete, troškovi treba da budu razumni i povezani sa čekanjem.",
            "Kod preusmeravanja je važno šta je ponuđeno i kada. Ako alternativa stiže mnogo kasnije, ako propuštate nastavak puta ili ako morate prihvatiti drugi aerodrom dolaska, sve to treba ući u vremensku liniju. Bez toga aviokompanija može odgovoriti samo na prvi segment, iako je stvarna šteta nastala na kraju putovanja.",
          ],
        },
        {
          heading: "Kontrolna lista za dokazni dosije",
          body: [
            "Sačuvajte svaki screenshot, email, SMS, gate obaveštenje i odgovor aviokompanije. Pored svakog razloga zapišite vreme kada je saopšten i ko ga je saopštio.",
            "Najbolji dosije ima kratak redosled događaja: kada ste saznali za kašnjenje, šta je navedeno kao razlog, šta vam je ponuđeno, kada ste stvarno krenuli i kada ste stigli. Ako se razlog menjao kroz aplikaciju, email i usmeno obaveštenje, sačuvajte sve verzije.",
            "Profesionalna obrada zahteva je korisna baš zato što se ne oslanja na utisak putnika, već na proverljive činjenice. Uredan dosije skraćuje komunikaciju sa aviokompanijom, smanjuje rizik od generičkog odbijanja i olakšava sledeći korak ako odgovor ne pokrije sve podatke.",
          ],
          bullets: [
            "Boarding pass i potvrda rezervacije za svaki segment.",
            "Poruke aviokompanije, screenshot statusa i fotografija table.",
            "Računi za hranu, hotel, transfer ili novu kartu ako su nastali.",
            "Jasan dokaz stvarnog dolaska na poslednju destinaciju.",
          ],
        }
      ],
    },
    en:     {
      slug: "airline-changed-flight-delay-reason",
      title: "Airline changed the delay reason: how it affects the claim",
      description: "What it means when the airline first cites a technical fault, then weather, slot or operational reason, and how to save evidence.",
      excerpt: "A changed reason does not automatically prove compensation, but it is a strong signal that the case needs a timeline and evidence review.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "When this scenario should be checked",
          body: [
            "For situations where the delay reason changes during the day or after the claim, the first check is not departure delay alone, but the consequence for the whole journey. If you arrived at the final destination three hours or more late, compare the case with [flight delay compensation](/en/flight-delay-compensation). The same flight can have a different outcome if the passenger arrived late under one booking, bought an unrelated onward leg or received reasonable rerouting quickly.",
            "It is important to separate three questions: whether fixed compensation may apply, whether care was owed during the wait and whether extra costs should be reimbursed. Let Kasni therefore treats this kind of case as a file with route, times, reason and evidence, not as one short complaint.",
          ],
          bullets: [
            "Final arrival is measured, not only late departure.",
            "Coverage depends on route, operating carrier and booking.",
            "The delay reason must be concrete, not only a broad message.",
          ],
        },
        {
          heading: "Route and rule coverage",
          body: [
            "An airline may have several real reasons for one delay, but each reason should explain a specific period and connection to your flight. A broad change in wording should not replace proof.",
            "A typical pattern is that the app first shows a technical reason, gate staff mention a slot and the later written reply cites extraordinary circumstances. The question is what actually caused the arrival delay. For every such situation, record the departure airport, arrival airport, operating carrier and whether all segments were bought together. Those four facts often decide whether the case is only a travel disruption or a compensation claim.",
            "Passenger nationality is usually not the central fact. What matters more is whether the airport and carrier are covered and whether arrival at the last destination was late enough. That is why a claim should not be sent before the route is written down clearly and without assumptions.",
          ],
        },
        {
          heading: "Table for amount and arrival review",
          body: [
            "The simplest review is a small table with these columns: flight number, route, carrier, scheduled arrival, actual arrival, route distance, stated reason and assistance offered. This prevents confusion between departure, landing and aircraft-door opening, which is common during long waits.",
            "For shorter routes, the amount may be 250 euros. For medium European routes, 400 euros is often checked, while longer routes may raise the 600-euro level, with special rules when the delay is between three and four hours. The amount depends on distance and eligibility, not ticket price.",
            "If the airline cites bad weather, a slot, runway closure or security, that is not automatically the end. Check where the issue happened, how long it lasted and whether it directly explains your late arrival. For technical faults, crew issues or late aircraft rotation, a more precise explanation is usually needed.",
          ],
        },
        {
          heading: "Care, costs and rerouting",
          body: [
            "Care rights are separate from fixed compensation. During a longer wait, ask for meals, refreshments, communication and, if departure moves to the next day, hotel accommodation with transfer. If assistance is not provided, costs should be reasonable and connected to the wait.",
            "For rerouting, what was offered and when matters. If the alternative arrives much later, if you miss an onward leg or if you have to accept another arrival airport, include that in the timeline. Otherwise the airline may answer only about the first segment, even though the real consequence happened at the end of the journey.",
          ],
        },
        {
          heading: "Checklist for the evidence file",
          body: [
            "Keep every screenshot, email, SMS, gate notice and airline reply. Next to each reason, record when it was given and who gave it.",
            "The best case file has a short sequence of events: when you learned about the delay, what reason was given, what was offered, when you actually departed and when you arrived. If the reason changed across the app, email and verbal announcements, keep every version.",
            "Professional claim handling helps because it relies on checkable facts instead of passenger impressions. A clean file shortens communication with the airline, reduces the risk of a generic rejection and makes the next step easier if the reply does not address all facts.",
          ],
          bullets: [
            "Boarding pass and booking confirmation for every segment.",
            "Airline messages, status screenshots and a departures-board photo.",
            "Receipts for food, hotel, transfer or a new ticket if costs arose.",
            "Clear proof of actual arrival at the final destination.",
          ],
        }
      ],
    },
  },
  {
    id: "connecting-delay-minimum-connection-time",
    publishedAt: "2026-05-11",
    updatedAt: "2026-05-11",
    sr:     {
      slug: "minimalno-vreme-presedanja-kasnjenje-konekcije",
      title: "Minimalno vreme presedanja i kašnjenje: kada konekcija ulazi u zahtev",
      description: "Kako minimalno vreme presedanja utiče na kašnjenje leta, propuštenu konekciju, jednu rezervaciju i dokaz dolaska.",
      excerpt: "Kratka konekcija nije automatski greška putnika ako je prodata u jednoj rezervaciji. Važno je šta je aviokompanija garantovala i kada ste stigli.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Kada ovaj scenario treba proveriti",
          body: [
            "Za kratke konekcije i minimalno vreme presedanja u jednoj rezervaciji prvo se ne proverava samo kašnjenje u polasku, već posledica po ceo put. Ako ste na krajnju destinaciju stigli tri sata ili više kasnije, slučaj treba uporediti sa pravilima za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Isti let može imati drugačiji ishod ako je putnik stigao kasno zbog jedne rezervacije, ako je kupio nepovezan nastavak ili ako je aviokompanija brzo obezbedila razumno preusmeravanje.",
            "Važno je odvojiti tri pitanja: da li postoji osnov za fiksnu naknadu, da li imate pravo na brigu tokom čekanja i da li treba tražiti refundaciju dodatnih troškova. Let Kasni zato ovakav slučaj ne tretira kao jednu kratku žalbu, već kao dosije sa rutom, vremenima, razlogom i dokazima.",
          ],
          bullets: [
            "Meri se dolazak na krajnju destinaciju, ne samo kasniji polazak.",
            "Pokrivenost zavisi od rute, operativnog prevoznika i rezervacije.",
            "Razlog kašnjenja mora biti konkretan, ne samo opšta poruka.",
          ],
        },
        {
          heading: "Ruta i pokrivenost pravila",
          body: [
            "Ako je konekcija prodata u jednoj rezervaciji, putnik obično nije sam preuzeo rizik kratkog presedanja. Proverava se da li je prvi let kasnio, da li je konekcija bila realno ostvariva i kada ste stigli na krajnju destinaciju.",
            "Ovaj scenario je čest na velikim čvorištima gde 45 ili 60 minuta izgleda dovoljno na karti, ali mala promena kapije, pasoška kontrola ili kasno parkiranje aviona menja ceo put. Kod svake takve situacije treba zabeležiti aerodrom polaska, aerodrom dolaska, operativnog prevoznika i da li su svi segmenti kupljeni zajedno. Ta četiri podatka često odlučuju da li se slučaj vodi kao običan poremećaj ili kao zahtev za naknadu.",
            "Državljanstvo putnika obično nije glavna činjenica. Mnogo važnije je da li pravila pokrivaju aerodrom i prevoznika, kao i da li je dolazak na poslednju destinaciju bio dovoljno kasan. Zato zahtev ne treba slati pre nego što je ruta zapisana uredno i bez pretpostavki.",
          ],
        },
        {
          heading: "Tabela za proveru iznosa i dolaska",
          body: [
            "Najjednostavnija provera je mala tabela sa kolonama: broj leta, ruta, prevoznik, planirani dolazak, stvarni dolazak, dužina rute, navedeni razlog i ponuđena pomoć. Ta tabela sprečava da se pomešaju polazak, sletanje i otvaranje vrata aviona, što je česta greška kod dužih čekanja.",
            "Ako je ruta kraća, iznos može biti 250 evra. Za srednje evropske rute često se proverava 400 evra, dok duge rute mogu otvoriti pitanje 600 evra, uz posebna pravila kada je kašnjenje između tri i četiri sata. Iznos ne zavisi od cene karte, već od razdaljine i uslova primene.",
            "Ako je aviokompanija navela loše vreme, slot, zatvaranje piste ili bezbednost, to ne znači automatski kraj. Treba proveriti gde je problem nastao, koliko je trajao i da li direktno objašnjava baš vaš kasni dolazak. Kod tehničkog kvara, posade ili kasne rotacije obično se traži precizniji odgovor.",
          ],
        },
        {
          heading: "Briga, troškovi i preusmeravanje",
          body: [
            "Pravo na brigu postoji odvojeno od fiksne naknade. Tokom dužeg čekanja treba tražiti obrok, osveženje, komunikaciju, a ako se polazak pomera za naredni dan i hotel sa transferom. Ako pomoć ne dobijete, troškovi treba da budu razumni i povezani sa čekanjem.",
            "Kod preusmeravanja je važno šta je ponuđeno i kada. Ako alternativa stiže mnogo kasnije, ako propuštate nastavak puta ili ako morate prihvatiti drugi aerodrom dolaska, sve to treba ući u vremensku liniju. Bez toga aviokompanija može odgovoriti samo na prvi segment, iako je stvarna šteta nastala na kraju putovanja.",
          ],
        },
        {
          heading: "Kontrolna lista za dokazni dosije",
          body: [
            "Sačuvajte originalni itinerer sa vremenom presedanja, boarding pass za oba segmenta, dokaz gejta, vreme dolaska prvog aviona i novi itinerer ako ste preusmereni.",
            "Najbolji dosije ima kratak redosled događaja: kada ste saznali za kašnjenje, šta je navedeno kao razlog, šta vam je ponuđeno, kada ste stvarno krenuli i kada ste stigli. Ako se razlog menjao kroz aplikaciju, email i usmeno obaveštenje, sačuvajte sve verzije.",
            "Profesionalna obrada zahteva je korisna baš zato što se ne oslanja na utisak putnika, već na proverljive činjenice. Uredan dosije skraćuje komunikaciju sa aviokompanijom, smanjuje rizik od generičkog odbijanja i olakšava sledeći korak ako odgovor ne pokrije sve podatke.",
          ],
          bullets: [
            "Boarding pass i potvrda rezervacije za svaki segment.",
            "Poruke aviokompanije, screenshot statusa i fotografija table.",
            "Računi za hranu, hotel, transfer ili novu kartu ako su nastali.",
            "Jasan dokaz stvarnog dolaska na poslednju destinaciju.",
          ],
        }
      ],
    },
    en:     {
      slug: "minimum-connection-time-flight-delay",
      title: "Minimum connection time and delay: when the connection enters the claim",
      description: "How minimum connection time affects flight delay, missed connection, one booking and proof of arrival.",
      excerpt: "A short connection is not automatically the passenger’s fault if it was sold under one booking. The key facts are what the airline sold and when you arrived.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "When this scenario should be checked",
          body: [
            "For short connections and minimum connection time under one booking, the first check is not departure delay alone, but the consequence for the whole journey. If you arrived at the final destination three hours or more late, compare the case with [flight delay compensation](/en/flight-delay-compensation). The same flight can have a different outcome if the passenger arrived late under one booking, bought an unrelated onward leg or received reasonable rerouting quickly.",
            "It is important to separate three questions: whether fixed compensation may apply, whether care was owed during the wait and whether extra costs should be reimbursed. Let Kasni therefore treats this kind of case as a file with route, times, reason and evidence, not as one short complaint.",
          ],
          bullets: [
            "Final arrival is measured, not only late departure.",
            "Coverage depends on route, operating carrier and booking.",
            "The delay reason must be concrete, not only a broad message.",
          ],
        },
        {
          heading: "Route and rule coverage",
          body: [
            "If the connection was sold under one booking, the passenger usually did not personally assume the risk of a tight transfer. Check whether the first flight was late, whether the connection was realistically possible and when you reached the final destination.",
            "This scenario is common at large hubs where 45 or 60 minutes look sufficient on the ticket, but a gate change, passport control or late parking position changes the whole journey. For every such situation, record the departure airport, arrival airport, operating carrier and whether all segments were bought together. Those four facts often decide whether the case is only a travel disruption or a compensation claim.",
            "Passenger nationality is usually not the central fact. What matters more is whether the airport and carrier are covered and whether arrival at the last destination was late enough. That is why a claim should not be sent before the route is written down clearly and without assumptions.",
          ],
        },
        {
          heading: "Table for amount and arrival review",
          body: [
            "The simplest review is a small table with these columns: flight number, route, carrier, scheduled arrival, actual arrival, route distance, stated reason and assistance offered. This prevents confusion between departure, landing and aircraft-door opening, which is common during long waits.",
            "For shorter routes, the amount may be 250 euros. For medium European routes, 400 euros is often checked, while longer routes may raise the 600-euro level, with special rules when the delay is between three and four hours. The amount depends on distance and eligibility, not ticket price.",
            "If the airline cites bad weather, a slot, runway closure or security, that is not automatically the end. Check where the issue happened, how long it lasted and whether it directly explains your late arrival. For technical faults, crew issues or late aircraft rotation, a more precise explanation is usually needed.",
          ],
        },
        {
          heading: "Care, costs and rerouting",
          body: [
            "Care rights are separate from fixed compensation. During a longer wait, ask for meals, refreshments, communication and, if departure moves to the next day, hotel accommodation with transfer. If assistance is not provided, costs should be reasonable and connected to the wait.",
            "For rerouting, what was offered and when matters. If the alternative arrives much later, if you miss an onward leg or if you have to accept another arrival airport, include that in the timeline. Otherwise the airline may answer only about the first segment, even though the real consequence happened at the end of the journey.",
          ],
        },
        {
          heading: "Checklist for the evidence file",
          body: [
            "Keep the original itinerary showing connection time, boarding passes for both segments, gate proof, arrival time of the first aircraft and the new itinerary if rerouted.",
            "The best case file has a short sequence of events: when you learned about the delay, what reason was given, what was offered, when you actually departed and when you arrived. If the reason changed across the app, email and verbal announcements, keep every version.",
            "Professional claim handling helps because it relies on checkable facts instead of passenger impressions. A clean file shortens communication with the airline, reduces the risk of a generic rejection and makes the next step easier if the reply does not address all facts.",
          ],
          bullets: [
            "Boarding pass and booking confirmation for every segment.",
            "Airline messages, status screenshots and a departures-board photo.",
            "Receipts for food, hotel, transfer or a new ticket if costs arose.",
            "Clear proof of actual arrival at the final destination.",
          ],
        }
      ],
    },
  }
] satisfies BlogArticle[];
