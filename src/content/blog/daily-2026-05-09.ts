import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "belgrade-eu-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft parked at a European airport gate",
    position: "center",
  },
  "eu-serbia-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft taxiing near airport runway lights",
    position: "center",
  },
  "serbia-eu-non-eu-airline-delay": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Passengers walking through an airport terminal",
    position: "center",
  },
  "connecting-flight-delay-one-booking": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger waiting in an airport terminal during a connection delay",
    position: "center",
  },
  "long-haul-flight-delay-300-600": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Wide-body aircraft flying above clouds",
    position: "center",
  },
  "tarmac-delay-door-open-time": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport departure board during a long delay",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

export const articles = [
  {
    id: "belgrade-eu-flight-delay-compensation",
    publishedAt: "2026-05-09",
    updatedAt: "2026-05-09",
    sr: {
      slug: "beograd-eu-kasnjenje-leta-naknada",
      title: "Kašnjenje leta Beograd-EU: kada postoji pravo na naknadu",
      description: "Kako se proverava kašnjenje leta iz Beograda ka EU: ruta, operativni prevoznik, dolazak, dokazi i najčešće greške u zahtevu.",
      excerpt: "Let iz Beograda ka EU može imati različit osnov u zavisnosti od aviokompanije, krajnje destinacije i toga da li je put kupljen kao jedna rezervacija.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Zašto ruta Beograd-EU nije uvek ista",
          body: [
            "Kod leta iz Beograda ka EU prvo se proverava ko je stvarno obavljao let. Ako je operativni prevoznik evropska aviokompanija, slučaj obično ima jači osnov za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Ako let obavlja prevoznik van EU, mora se pažljivije proveriti da li zaštita dolazi iz drugog segmenta, jedne rezervacije ili pravila koja važe za krajnju destinaciju.",
            "Putnik ne treba da krene od državljanstva ili mesta kupovine karte. Važniji su aerodrom polaska, krajnja destinacija, operativni prevoznik i stvarno vreme dolaska. Beograd kao polazni aerodrom traži tu preciznu proveru jer nije isto kao let koji polazi iz države članice EU.",
          ],
          bullets: [
            "Sačuvajte booking potvrdu i naziv operativnog prevoznika, ne samo prodajnu aviokompaniju.",
            "Merite dolazak na krajnju destinaciju, posebno ako postoji konekcija.",
            "Razdvojite fiksnu naknadu od refundacije hrane, hotela ili transfera.",
          ],
        },
        {
          heading: "Kada je evropski prevoznik presudan",
          body: [
            "Ako iz Beograda letite ka EU evropskom aviokompanijom, na primer preko Beča, Frankfurta, Pariza, Amsterdama ili Ciriha, operativni prevoznik može biti ključan. U praksi se posebno gleda da li je problem nastao na tom letu, koliko je kasnio dolazak i da li je cela ruta bila pod jednom rezervacijom.",
            "Kod codeshare karata obavezno proverite ko je upravljao avionom. Logo na karti ili aplikaciji nije dovoljan. Zahtev treba da ide prema operativnom prevozniku kada se traži naknada, jer on objašnjava razlog kašnjenja i mere koje su preduzete.",
          ],
        },
        {
          heading: "Konekcija preko EU čvorišta",
          body: [
            "Ako putujete Beograd-EU-dalje i sve je u jednoj rezervaciji, najvažnije je kada ste stigli na krajnju destinaciju. Kašnjenje prvog segmenta od dva sata može postati slučaj za naknadu ako zbog toga izgubite nastavak puta i završite više od tri sata kasnije.",
            "Kod odvojenih karata analiza je slabija. Tada aviokompanija prvog leta često ne odgovara za sledeći segment koji ste sami kupili. Ipak, računi za brigu, novi itinerer i poruke kompanije i dalje treba da se sačuvaju jer mogu pomoći u proceni refundacije troškova.",
          ],
        },
        {
          heading: "Razlog kašnjenja i dokazi",
          body: [
            "Tehnički kvar, kasna rotacija aviona, nedostatak posade, slot kontrole letenja i loše vreme ne vode istom ishodu. Zato tražite konkretan razlog, po mogućnosti u pisanoj poruci. Ako dobijete samo opštu rečenicu, zapišite ko ju je rekao, gde i u koliko sati.",
            "Dobar fajl za proveru ima pet delova: karta, boarding pass, vremenska linija, poruke aviokompanije i troškovi. Ako je bilo konekcije, dodajte dokaz da su segmenti kupljeni zajedno. Bez tog dokaza se često izgubi najvažnija tačka slučaja.",
          ],
        },
        {
          heading: "Kako formulisati zahtev",
          body: [
            "U zahtevu navedite Beograd kao polazak, krajnju destinaciju, operativnog prevoznika, planirano i stvarno vreme dolaska, razlog koji je saopšten i šta tražite. Nemojte slati samo opštu žalbu. Kratak strukturisan zahtev je bolji jer se kasnije lakše dopunjava.",
            "Ako aviokompanija odbije zahtev uz vanredne okolnosti, tražite da objasni kako je događaj direktno pogodio baš vaš let i koje realne mere su preduzete da se kašnjenje smanji. To je često mesto gde generičan odgovor postaje proverljiv.",
          ],
        },
      ],
    },
    en: {
      slug: "belgrade-eu-flight-delay-compensation",
      title: "Belgrade-EU flight delay: when compensation may apply",
      description: "How to check a delayed flight from Belgrade to the EU: route, operating carrier, arrival time, evidence and common claim mistakes.",
      excerpt: "A flight from Belgrade to the EU can have a different basis depending on the airline, final destination and whether the trip was bought as one booking.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "Why Belgrade-EU routes are not all the same",
          body: [
            "For a flight from Belgrade to the EU, first check who actually operated the flight. If the operating carrier is a European airline, the case usually has a stronger basis for [flight delay compensation](/en/flight-delay-compensation). If the flight is operated by a non-EU carrier, you need a closer review of whether protection comes from another segment, one booking or rules linked to the final destination.",
            "Do not start with nationality or where the ticket was bought. Departure airport, final destination, operating carrier and actual arrival time matter more. Belgrade as departure airport requires that precise check because it is not the same as a flight departing from an EU Member State.",
          ],
          bullets: [
            "Keep the booking confirmation and the operating carrier name, not only the marketing airline.",
            "Measure arrival at the final destination, especially where there is a connection.",
            "Separate fixed compensation from reimbursement for meals, hotel or transfer.",
          ],
        },
        {
          heading: "When the European carrier is decisive",
          body: [
            "If you fly from Belgrade to the EU on a European airline, for example through Vienna, Frankfurt, Paris, Amsterdam or Zurich, the operating carrier may be decisive. In practice, the review looks at whether the problem happened on that flight, how late you arrived and whether the whole route was under one booking.",
            "On codeshare tickets, always check who operated the aircraft. The logo on the ticket or app is not enough. A compensation claim should usually be addressed to the operating carrier because that carrier explains the delay reason and the measures taken.",
          ],
        },
        {
          heading: "Connection through an EU hub",
          body: [
            "If you travel Belgrade-EU-onward and everything is under one booking, the most important fact is when you reached the final destination. A two-hour delay on the first segment can become a compensation case if it makes you miss the onward flight and arrive more than three hours late.",
            "With separate tickets, the analysis is weaker. The airline on the first flight often does not answer for the next segment you bought yourself. Still, care receipts, the new itinerary and airline messages should be saved because they may help with expense reimbursement review.",
          ],
        },
        {
          heading: "Delay reason and evidence",
          body: [
            "Technical fault, late aircraft rotation, crew shortage, air traffic control slot and bad weather do not lead to the same outcome. Ask for a concrete reason, preferably in writing. If you only get a broad sentence, record who said it, where and at what time.",
            "A good review file has five parts: ticket, boarding pass, timeline, airline messages and costs. If there was a connection, add proof that the segments were bought together. Without that proof, the most important point of the case is often lost.",
          ],
        },
        {
          heading: "How to frame the claim",
          body: [
            "In the claim, state Belgrade as departure, final destination, operating carrier, scheduled and actual arrival, stated reason and what you request. Do not send only a broad complaint. A short structured claim is better because it is easier to update later.",
            "If the airline rejects the claim citing extraordinary circumstances, ask it to explain how the event directly affected your flight and what real measures were taken to reduce the delay. That is often where a generic answer becomes checkable.",
          ],
        },
      ],
    },
  },
  {
    id: "eu-serbia-flight-delay-compensation",
    publishedAt: "2026-05-09",
    updatedAt: "2026-05-09",
    sr: {
      slug: "eu-srbija-kasnjenje-leta-naknada",
      title: "Kašnjenje leta iz EU za Srbiju: prava putnika",
      description: "Kada let iz EU ka Srbiji može doneti naknadu za kašnjenje, kako se meri dolazak i šta sačuvati ako je let preko čvorišta.",
      excerpt: "Let koji polazi iz EU često ima jasniji osnov za zaštitu, ali se i dalje proveravaju dolazak, razlog kašnjenja i jedna rezervacija.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Polazak iz EU je jaka početna tačka",
          body: [
            "Kada let polazi sa aerodroma u EU ka Srbiji, zaštita je često šira bez obzira na državljanstvo putnika. To ne znači da je svako kašnjenje automatski za isplatu, ali znači da slučaj treba proveriti kroz pravila za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta), posebno ako ste stigli tri sata ili više kasnije.",
            "Najvažnije je stvarno vreme dolaska u Beograd, Niš, Kraljevo ili drugu krajnju destinaciju. Kašnjenje u poletanju je koristan dokaz, ali prag za fiksnu naknadu se obično meri završetkom putovanja, ne trenutkom kada avion napusti gejt.",
          ],
          bullets: [
            "Upišite planirano i stvarno vreme dolaska u Srbiju.",
            "Sačuvajte sve poruke iz aplikacije, emaila i sa gejta.",
            "Ako je postojala konekcija, čuvajte dokaz da je ruta bila jedna rezervacija.",
          ],
        },
        {
          heading: "Direktan let i let preko čvorišta",
          body: [
            "Kod direktnog leta EU-Srbija analiza je jednostavnija: gleda se taj let, njegov operativni prevoznik, stvarni dolazak i razlog kašnjenja. Kod puta preko čvorišta može biti važnije kada ste stigli na poslednju tačku putovanja i da li je prekid nastao u segmentu koji ulazi u zaštitu.",
            "Ako ste, na primer, krenuli iz EU, presedali van EU i stigli u Srbiju kasno, ne treba zaključivati napamet. Jedna rezervacija i polazak iz EU mogu promeniti ishod. Odvojene karte, međutim, često prekidaju odgovornost između segmenata.",
          ],
        },
        {
          heading: "Šta aviokompanija mora da objasni",
          body: [
            "Ako kompanija tvrdi da je kašnjenje nastalo zbog vanrednih okolnosti, objašnjenje treba da bude konkretno. Nije dovoljno da napiše samo vreme, operativne razloge ili odluku kontrole letenja. Potrebno je videti kako je taj događaj pogodio vaš let i zašto ga nije bilo moguće ublažiti.",
            "Kod letova iz EU posebno je korisno pitati za vremensku liniju: kada je problem nastao, kada je posada ili avion bio dostupan, kada je doneta odluka o novom polasku i kada su putnici obavešteni. Takva pitanja smanjuju prostor za generičku odbijenicu.",
          ],
        },
        {
          heading: "Troškovi čekanja pre povratka",
          body: [
            "Ako ste dugo čekali na aerodromu u EU, pravo na brigu može obuhvatiti obroke, osveženje, komunikaciju, a kod noćnog čekanja hotel i transfer. To pravo je odvojeno od fiksne naknade i može postojati čak i ako se kasnije pokaže da za odštetu nema osnova.",
            "Računi treba da budu razumni i povezani sa čekanjem. Sačuvajte račun, vreme kupovine i kratak razlog zašto je trošak nastao. Ako kompanija nije ponudila pomoć, zabeležite kada ste pitali i šta vam je odgovoreno.",
          ],
        },
        {
          heading: "Zahtev posle povratka u Srbiju",
          body: [
            "Najbolje je poslati zahtev dok su podaci sveži. Navedite broj leta, datum, aerodrom polaska u EU, krajnji dolazak u Srbiju, razliku u vremenu i razlog koji je saopšten. Ako ste putovali poslovno ili porodično sa više putnika, svaki putnik može imati zaseban osnov.",
            "Ako odgovor ne pokrije sve tačke, dopuna treba da bude kratka: priložite vremensku liniju, račune i pitanje koji dokaz podržava razlog odbijanja. Tako se slučaj vodi uredno i kasnije se lakše prosleđuje na stručnu proveru.",
          ],
        },
      ],
    },
    en: {
      slug: "eu-serbia-flight-delay-compensation",
      title: "EU to Serbia flight delay: passenger rights",
      description: "When a flight from the EU to Serbia may trigger delay compensation, how arrival is measured and what to save on hub journeys.",
      excerpt: "A flight departing from the EU often has a clearer protection basis, but arrival time, delay reason and one booking still need to be checked.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "Departure from the EU is a strong starting point",
          body: [
            "When a flight departs from an EU airport to Serbia, protection is often broader regardless of passenger nationality. That does not mean every delay leads to payment automatically, but it means the case should be checked under [flight delay compensation](/en/flight-delay-compensation), especially if you arrived three hours or more late.",
            "The most important fact is actual arrival time in Belgrade, Nis, Kraljevo or another final destination. Departure delay is useful evidence, but the fixed compensation threshold is usually measured at the end of the journey, not when the aircraft leaves the gate.",
          ],
          bullets: [
            "Record scheduled and actual arrival time in Serbia.",
            "Save every app, email and gate message.",
            "If there was a connection, keep proof that the route was one booking.",
          ],
        },
        {
          heading: "Direct flight and hub journey",
          body: [
            "For a direct EU-Serbia flight, the review is simpler: that flight, its operating carrier, actual arrival and delay reason. On a journey through a hub, the more important question may be when you reached the final point of travel and whether the disruption happened on a protected segment.",
            "For example, if you departed from the EU, connected outside the EU and reached Serbia late, do not assume the answer. One booking and EU departure can change the result. Separate tickets, however, often break responsibility between segments.",
          ],
        },
        {
          heading: "What the airline must explain",
          body: [
            "If the airline says the delay was caused by extraordinary circumstances, the explanation should be specific. It is not enough to write only weather, operational reasons or air traffic control decision. The question is how that event affected your flight and why it could not be mitigated.",
            "For EU departures, it is especially useful to ask for the timeline: when the problem started, when crew or aircraft became available, when the new departure decision was made and when passengers were informed. Those questions reduce room for a generic refusal.",
          ],
        },
        {
          heading: "Waiting costs before returning",
          body: [
            "If you waited a long time at an EU airport, care rights may include meals, refreshments, communication and, for overnight waits, hotel and transfer. This right is separate from fixed compensation and may exist even if the fixed payment is later not available.",
            "Receipts should be reasonable and linked to the wait. Keep the receipt, purchase time and a short reason why the cost was incurred. If the airline did not offer assistance, record when you asked and what answer you received.",
          ],
        },
        {
          heading: "Claim after returning to Serbia",
          body: [
            "It is best to send the claim while the details are fresh. State flight number, date, EU departure airport, final arrival in Serbia, time difference and the stated reason. If several passengers travelled together, each passenger may have a separate basis.",
            "If the reply does not cover every point, keep the follow-up short: attach the timeline, receipts and a question asking which evidence supports the refusal reason. That keeps the file orderly and easier to send for professional review later.",
          ],
        },
      ],
    },
  },
  {
    id: "serbia-eu-non-eu-airline-delay",
    publishedAt: "2026-05-09",
    updatedAt: "2026-05-09",
    sr: {
      slug: "srbija-eu-non-eu-aviokompanija-kasnjenje",
      title: "Let iz Srbije ka EU neevropskom aviokompanijom: kašnjenje i prava",
      description: "Kako proveriti kašnjenje iz Srbije ka EU kada let obavlja aviokompanija van EU: šta je slabije, šta ipak vredi proveriti i koji dokazi su presudni.",
      excerpt: "Neevropski prevoznik na letu iz Srbije ka EU često znači uži osnov za EC261 naknadu, ali konekcije, refundacija i briga i dalje mogu biti važni.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Zašto je operativni prevoznik važan",
          body: [
            "Kod leta iz Srbije ka EU koji obavlja aviokompanija van EU, osnov za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta) može biti slabiji nego kada let obavlja evropski prevoznik. To ne znači da slučaj treba odmah odbaciti, već da se mora proveriti cela ruta, jedna rezervacija i posledica po krajnji dolazak.",
            "Najčešća greška je zaključak da destinacija u EU sama rešava sve. U praksi se gleda kombinacija polaska, dolaska i prevoznika. Zato je važno razlikovati aviokompaniju koja je prodala kartu od aviokompanije koja je zaista obavila let.",
          ],
          bullets: [
            "Proverite operativnog prevoznika na boarding passu i u rezervaciji.",
            "Sačuvajte ceo itinerer, posebno ako postoji nastavak putovanja iz EU.",
            "Ne mešajte fiksnu naknadu sa pravom na refundaciju troškova čekanja.",
          ],
        },
        {
          heading: "Kada konekcija može promeniti procenu",
          body: [
            "Ako je let iz Srbije samo prvi segment dužeg puta kupljenog kao jedna rezervacija, treba proveriti gde je nastao problem i kada ste stigli na krajnju destinaciju. Ponekad dalji segment iz EU ili ka EU evropskim prevoznikom menja način na koji se slučaj posmatra.",
            "Kod zasebno kupljenih karata mogućnosti su znatno uže. Ako prvi let kasni i zbog toga propustite drugi let koji ste sami kupili, aviokompanija prvog leta često neće odgovarati za celu štetu. Ipak, to ne isključuje svaku refundaciju razumnih troškova ili pravo na bolju informaciju.",
          ],
        },
        {
          heading: "Briga tokom čekanja i refundacija",
          body: [
            "Čak i kada fiksna naknada nije jasna, dugi zastoj može otvoriti pitanja hrane, vode, komunikacije, hotela ili preusmeravanja. Ako pomoć nije ponuđena, sačuvajte račune i dokaz da ste pokušali da dobijete rešenje od aviokompanije.",
            "Kod čekanja od pet sati ili više dodatno se proverava mogućnost odustanka i refundacije karte. To je drugo pravo od fiksne naknade. U zahtevu ga treba navesti posebno, sa jasnim objašnjenjem da li ste nastavili put, uzeli zamenu ili odustali.",
          ],
        },
        {
          heading: "Kako ne napraviti slab zahtev",
          body: [
            "Slab zahtev obično kaže samo da je let kasnio i da putnik traži odštetu. Jači zahtev navodi tačan osnov: ruta, operativni prevoznik, jedna rezervacija, stvarni dolazak, razlog kašnjenja i troškovi. Ako je osnov za EC261 sporan, to je još važnije.",
            "Ne treba preuveličavati pravo ako ruta nije pokrivena. Bolje je tražiti stručnu proveru i jasno odvojiti ono što je sigurno od onoga što zavisi od rute. Takav pristup štedi vreme i smanjuje rizik od generičkog odbijanja.",
          ],
        },
        {
          heading: "Dokazi koje treba poslati",
          body: [
            "Pošaljite booking potvrdu, boarding pass, screenshot statusa leta, poruke aviokompanije, račune i novu kartu ako ste sami kupili zamenu. Ako je postojala konekcija, priložite dokaz da su svi segmenti bili u jednoj rezervaciji.",
            "Ako aviokompanija odgovori da pravila ne važe, ne završavajte slučaj bez provere. Tražite da navede tačno po kom osnovu odbija odgovornost i na koji segment se odgovor odnosi. To je često dovoljno da se vidi da li je odbijenica precizna ili preširoka.",
          ],
        },
      ],
    },
    en: {
      slug: "serbia-eu-non-eu-airline-delay",
      title: "Serbia to EU on a non-EU airline: delay rights",
      description: "How to check a delay from Serbia to the EU when the flight is operated by a non-EU airline: weaker points, useful checks and key evidence.",
      excerpt: "A non-EU operating carrier from Serbia to the EU often narrows the EC261 basis, but connections, refund and care rights can still matter.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "Why the operating carrier matters",
          body: [
            "For a flight from Serbia to the EU operated by a non-EU airline, the basis for [flight delay compensation](/en/flight-delay-compensation) may be weaker than when the flight is operated by a European carrier. That does not mean the case should be dismissed immediately; it means the whole route, one booking and final arrival consequence need to be checked.",
            "The common mistake is assuming that an EU destination solves everything. In practice, the review looks at departure, arrival and carrier together. That is why it matters to separate the airline that sold the ticket from the airline that actually operated the flight.",
          ],
          bullets: [
            "Check the operating carrier on the boarding pass and booking.",
            "Keep the full itinerary, especially if there is onward travel from the EU.",
            "Do not mix fixed compensation with reimbursement of waiting costs.",
          ],
        },
        {
          heading: "When a connection can change the review",
          body: [
            "If the Serbia-EU flight is only the first segment of a longer trip bought as one booking, check where the problem started and when you reached the final destination. Sometimes an onward segment from or to the EU on a European carrier changes how the case is assessed.",
            "With separately bought tickets, options are much narrower. If the first flight is delayed and you miss another flight you bought yourself, the airline on the first flight often will not answer for the whole loss. Still, that does not exclude every reasonable expense claim or the right to better information.",
          ],
        },
        {
          heading: "Care during the wait and refund",
          body: [
            "Even when fixed compensation is unclear, a long disruption can raise questions about food, water, communication, hotel or rerouting. If assistance was not offered, keep receipts and proof that you tried to get a solution from the airline.",
            "For waits of five hours or more, also check whether abandoning the trip and requesting a refund was available. That is a separate right from fixed compensation. State it separately in the claim, with a clear explanation of whether you continued travel, accepted a replacement or abandoned the trip.",
          ],
        },
        {
          heading: "How to avoid a weak claim",
          body: [
            "A weak claim usually says only that the flight was delayed and the passenger wants compensation. A stronger claim states the precise basis: route, operating carrier, one booking, actual arrival, delay reason and costs. If the EC261 basis is disputed, that structure matters even more.",
            "Do not overstate the right if the route is not covered. It is better to ask for a professional review and separate what is certain from what depends on route coverage. That saves time and reduces the risk of a generic rejection.",
          ],
        },
        {
          heading: "Evidence to send",
          body: [
            "Send the booking confirmation, boarding pass, flight-status screenshot, airline messages, receipts and a new ticket if you bought a replacement yourself. If there was a connection, attach proof that all segments were under one booking.",
            "If the airline replies that the rules do not apply, do not close the file without checking. Ask it to state the exact basis for refusing responsibility and which segment the answer concerns. That is often enough to see whether the refusal is precise or too broad.",
          ],
        },
      ],
    },
  },
  {
    id: "connecting-flight-delay-one-booking",
    publishedAt: "2026-05-09",
    updatedAt: "2026-05-09",
    sr: {
      slug: "kasnjenje-konekcije-jedna-rezervacija",
      title: "Kašnjenje leta sa konekcijom u jednoj rezervaciji",
      description: "Kako se proverava kašnjenje na putovanju sa konekcijom kada su letovi kupljeni zajedno: krajnji dolazak, dokaz rezervacije i odgovornost aviokompanije.",
      excerpt: "Kod jedne rezervacije često se ne gleda samo problematičan segment, već kašnjenje na krajnjoj destinaciji i veza između segmenata.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Jedna rezervacija menja ceo slučaj",
          body: [
            "Ako su letovi kupljeni zajedno, kašnjenje prvog segmenta se često procenjuje kroz dolazak na krajnju destinaciju. Zato putnik koji je na prvom letu kasnio dva sata ipak može proveriti [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta) ako je zbog toga propustio nastavak i stigao tri sata ili više kasnije.",
            "Ključni dokaz je da su segmenti deo jedne rezervacije. Booking reference, e-ticket, aplikacija i potvrda kupovine treba da pokažu celu rutu. Ako toga nema, aviokompanija može tvrditi da je odgovorna samo za jedan segment.",
          ],
          bullets: [
            "Merite dolazak na poslednju destinaciju iz jedne rezervacije.",
            "Sačuvajte dokaz propuštene konekcije i novi itinerer.",
            "Zapišite razlog kašnjenja prvog segmenta.",
          ],
        },
        {
          heading: "Prvi segment, drugi segment i krajnji dolazak",
          body: [
            "Najvažnije je povezati uzrok i posledicu. Ako je prvi let kasnio, treba pokazati da je upravo to dovelo do propuštanja drugog leta. Ako je drugi let odložen iz posebnog razloga, analiza može biti drugačija. Zato vremenska linija mora biti precizna.",
            "U njoj navedite planirano sletanje prvog leta, vreme otvaranja vrata, planirano vreme gejta za nastavak, novi let koji ste dobili i stvarni dolazak. Bez ovih tačaka ostaje samo opšti utisak da je put bio naporan, a to nije dovoljno za ozbiljnu proveru.",
          ],
        },
        {
          heading: "Ko obezbeđuje zamenu i brigu",
          body: [
            "Kod jedne rezervacije aviokompanija obično mora da ponudi rešenje za nastavak puta kada propuštena konekcija nastane zbog kašnjenja. To može biti kasniji let, druga ruta ili privremeni hotel ako se čeka preko noći.",
            "Ako pomoć nije ponuđena, zabeležite gde ste se obratili i šta je odgovoreno. Troškovi hrane, hotela, lokalnog transfera i razumne komunikacije mogu biti poseban zahtev. Oni se ne brišu samo zato što se paralelno proverava fiksna naknada.",
          ],
        },
        {
          heading: "Kada odvojene karte slabe slučaj",
          body: [
            "Ako ste sami sastavili put od dve odvojene karte, prva aviokompanija često ne odgovara za propušteni drugi let. U tom slučaju je mnogo teže tražiti fiksnu naknadu na osnovu krajnje destinacije koja nije deo iste rezervacije.",
            "Ipak, i tada vredi sačuvati dokaze. Možda postoji refundacija neiskorišćenog segmenta, pomoć iz uslova karte, putno osiguranje ili osnov za povrat razumnog troška ako je aviokompanija dala pogrešnu informaciju.",
          ],
        },
        {
          heading: "Kako poslati uredan zahtev",
          body: [
            "U zahtevu počnite od jedne rezervacije: navedite booking referencu, sve segmente, planirana vremena, stvarna vremena i novi itinerer. Posebno napišite koliko kasno ste stigli na poslednju destinaciju, jer je to obično centralna činjenica.",
            "Ako aviokompanija odgovori samo za prvi segment, tražite da se odgovor dopuni krajnjim dolaskom iz iste rezervacije. To često menja razgovor sa kratkog odbijanja na stvarnu analizu posledice po celo putovanje.",
          ],
        },
      ],
    },
    en: {
      slug: "connecting-flight-delay-one-booking",
      title: "Connecting flight delay under one booking",
      description: "How to check a connecting journey delay when flights were bought together: final arrival, booking proof and airline responsibility.",
      excerpt: "Under one booking, the review often looks beyond the disrupted segment and checks final arrival delay and the link between segments.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "One booking changes the whole case",
          body: [
            "If the flights were bought together, delay on the first segment is often assessed through arrival at the final destination. A passenger delayed two hours on the first flight may still check [flight delay compensation](/en/flight-delay-compensation) if that caused a missed onward flight and final arrival three hours or more late.",
            "The key evidence is that the segments are part of one booking. Booking reference, e-ticket, app and purchase confirmation should show the whole route. Without that, the airline may argue that it is responsible only for one segment.",
          ],
          bullets: [
            "Measure arrival at the last destination in the one booking.",
            "Save proof of the missed connection and the new itinerary.",
            "Record the reason for the first segment delay.",
          ],
        },
        {
          heading: "First segment, second segment and final arrival",
          body: [
            "The most important point is to connect cause and consequence. If the first flight was delayed, show that this caused the missed onward flight. If the second flight was delayed for a separate reason, the analysis may be different. That is why the timeline must be precise.",
            "Include scheduled landing of the first flight, door-opening time, planned gate time for the onward flight, replacement flight received and actual final arrival. Without those points, the file is only a general impression that the trip was difficult, which is not enough for serious review.",
          ],
        },
        {
          heading: "Who provides replacement travel and care",
          body: [
            "Under one booking, the airline usually has to offer a solution for continuing the journey when the missed connection was caused by a delay. That may be a later flight, another route or temporary hotel accommodation if the wait is overnight.",
            "If assistance was not offered, record where you asked and what answer was given. Food, hotel, local transfer and reasonable communication costs can be a separate claim. They are not erased only because fixed compensation is being checked at the same time.",
          ],
        },
        {
          heading: "When separate tickets weaken the case",
          body: [
            "If you built the trip yourself from two separate tickets, the first airline often does not answer for the missed second flight. In that situation it is much harder to claim fixed compensation based on a final destination that was not part of the same booking.",
            "Still, evidence is worth saving. There may be a refund for an unused segment, help under ticket conditions, travel insurance or a basis for recovering a reasonable cost if the airline gave incorrect information.",
          ],
        },
        {
          heading: "How to send an orderly claim",
          body: [
            "Start the claim with the one booking: state the booking reference, all segments, scheduled times, actual times and new itinerary. Write separately how late you reached the final destination because that is usually the central fact.",
            "If the airline answers only about the first segment, ask for the response to be supplemented with final arrival under the same booking. That often changes the conversation from a short refusal to a real review of the whole journey consequence.",
          ],
        },
      ],
    },
  },
  {
    id: "long-haul-flight-delay-300-600",
    publishedAt: "2026-05-09",
    updatedAt: "2026-05-09",
    sr: {
      slug: "dugi-let-kasnjenje-300-600-evra",
      title: "Dugi let kasni: kada je naknada 300, a kada 600 evra",
      description: "Kako se kod dugih letova preko 3.500 km razlikuje naknada za kašnjenje od 3-4 sata i kašnjenje duže od 4 sata.",
      excerpt: "Kod dugih ruta prag od tri sata nije kraj analize: kašnjenje između 3 i 4 sata može značiti umanjenu naknadu, a preko 4 sata pun iznos.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Zašto dugi letovi imaju dodatnu razliku",
          body: [
            "Kod većine ruta putnici pamte pravilo od tri sata, ali kod dugih letova preko 3.500 km postoji važna razlika. Ako je dolazak kasnio između tri i četiri sata, naknada može biti umanjena. Ako je kašnjenje preko četiri sata, proverava se puni iznos kroz [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta).",
            "Zato je kod dugih letova posebno bitan precizan dokaz vremena dolaska. Deset ili petnaest minuta može promeniti iznos. Nije dovoljno osloniti se na vreme sletanja ako su vrata otvorena kasnije i putnici su tek tada mogli da izađu.",
          ],
          bullets: [
            "Proverite da li ruta prelazi 3.500 km.",
            "Odvojite kašnjenje 3-4 sata od kašnjenja preko 4 sata.",
            "Dokumentujte vreme otvaranja vrata na krajnjoj destinaciji.",
          ],
        },
        {
          heading: "Kako se meri dužina rute",
          body: [
            "Dužina rute se ne meri prema ceni karte ili broju sati leta u rasporedu, već prema udaljenosti između relevantnih aerodroma. Kod putovanja sa konekcijom pod jednom rezervacijom može biti važno kako se računa krajnja destinacija i koji segment je izazvao kašnjenje.",
            "Ako niste sigurni u distancu, ne pogađajte iznos u zahtevu. Bolje je navesti rutu i tražiti obračun prema pravilima. Letovi iz Evrope ka Bliskom istoku, Severnoj Americi ili Aziji često traže ovu dodatnu proveru.",
          ],
        },
        {
          heading: "Tri do četiri sata kasnije",
          body: [
            "Kada dug let stigne tri sata ili više, ali manje od četiri sata kasnije, slučaj može biti podoban za umanjenu naknadu ako su ostali uslovi ispunjeni. Razlog kašnjenja i dalje ostaje presudan: tehnički ili operativni razlog nije isto što i bezbednosna zabrana, ozbiljno nevreme ili odluka kontrole letenja.",
            "U ovom rasponu je posebno važno dokazati vreme. Ako aplikacija prikazuje sletanje, a ne otvaranje vrata, može nastati spor oko nekoliko minuta. Sačuvajte screenshotove različitih izvora i svaku poruku aviokompanije.",
          ],
        },
        {
          heading: "Preko četiri sata kasnije",
          body: [
            "Kada je dolazak na dugoj ruti kasnio preko četiri sata, iznos može biti pun ako je ruta pokrivena i razlog je u odgovornosti aviokompanije. I dalje nema automatske isplate, jer aviokompanija može tvrditi vanredne okolnosti.",
            "Ako dobijete odbijenicu, proverite da li se odnosi na ceo vremenski period kašnjenja. Ponekad je početni događaj bio vanredan, ali se kasnije pojavio dodatni operativni zastoj koji kompanija mora posebno da objasni.",
          ],
        },
        {
          heading: "Šta poslati u zahtevu",
          body: [
            "Pošaljite rutu, distancu ako je imate, planirano i stvarno vreme dolaska, dokaz otvaranja vrata, razlog kašnjenja i sve troškove čekanja. Ako je let deo konekcije, priložite celu rezervaciju i novi itinerer.",
            "U zahtevu ne morate insistirati na tačnom iznosu ako niste sigurni. Važnije je da podaci omogućavaju obračun. Dobar zahtev jasno odvaja pitanje iznosa od pitanja odgovornosti aviokompanije.",
          ],
        },
      ],
    },
    en: {
      slug: "long-haul-flight-delay-300-600-eur",
      title: "Long-haul delay: when compensation is 300 or 600 euros",
      description: "How long-haul flights over 3,500 km differ between 3-4 hour arrival delay and delay over 4 hours.",
      excerpt: "On long routes, the three-hour threshold is not the end of the analysis: 3-4 hours may mean reduced compensation, while over 4 hours may mean the full amount.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "Why long-haul flights have an extra distinction",
          body: [
            "Most passengers remember the three-hour rule, but long-haul flights over 3,500 km have an important extra distinction. If arrival was between three and four hours late, compensation may be reduced. If the delay was over four hours, the full amount is checked under [flight delay compensation](/en/flight-delay-compensation).",
            "That is why precise arrival evidence matters especially on long flights. Ten or fifteen minutes can change the amount. It is not enough to rely on landing time if the doors opened later and passengers could leave only then.",
          ],
          bullets: [
            "Check whether the route is over 3,500 km.",
            "Separate 3-4 hours of delay from delay over 4 hours.",
            "Document door-opening time at the final destination.",
          ],
        },
        {
          heading: "How route distance is measured",
          body: [
            "Route distance is not measured by ticket price or scheduled flight duration, but by the distance between the relevant airports. On connecting journeys under one booking, the final destination and the segment that caused the delay may become important.",
            "If you are not sure about distance, do not guess the amount in the claim. It is better to state the route and request calculation under the rules. Flights from Europe toward the Middle East, North America or Asia often need this extra check.",
          ],
        },
        {
          heading: "Three to four hours late",
          body: [
            "When a long-haul flight arrives three hours or more late but less than four hours late, the case may qualify for reduced compensation if all other conditions are met. The delay reason still matters: a technical or operational reason is not the same as a safety restriction, severe weather or air traffic control decision.",
            "In this range, timing evidence is especially important. If an app shows landing, not door opening, a dispute over a few minutes can arise. Save screenshots from different sources and every airline message.",
          ],
        },
        {
          heading: "More than four hours late",
          body: [
            "When arrival on a long route was more than four hours late, the amount may be full if the route is covered and the reason is within the airline's responsibility. Payment is still not automatic because the airline may cite extraordinary circumstances.",
            "If you receive a rejection, check whether it covers the whole delay period. Sometimes the initial event was extraordinary, but an additional operational delay later appeared and the airline has to explain that separately.",
          ],
        },
        {
          heading: "What to send in the claim",
          body: [
            "Send the route, distance if you have it, scheduled and actual arrival, door-opening evidence, delay reason and any waiting costs. If the flight was part of a connection, attach the full booking and new itinerary.",
            "You do not have to insist on the exact amount if you are unsure. It is more important that the facts allow calculation. A good claim separates the amount question from the airline responsibility question.",
          ],
        },
      ],
    },
  },
  {
    id: "tarmac-delay-door-open-time",
    publishedAt: "2026-05-09",
    updatedAt: "2026-05-09",
    sr: {
      slug: "kasnjenje-na-pisti-vreme-otvaranja-vrata",
      title: "Kašnjenje na pisti: zašto je važno vreme otvaranja vrata",
      description: "Kako se kod kašnjenja na pisti meri dolazak, zašto sletanje nije uvek dovoljno i koje dokaze treba sačuvati za zahtev.",
      excerpt: "Kod leta koji je sleteo, ali putnici dugo čekaju u avionu, razlika između sletanja i otvaranja vrata može odlučiti prag za naknadu.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Sletanje nije uvek kraj kašnjenja",
          body: [
            "Za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta) najvažnije je kada putnici stvarno mogu da napuste avion na krajnjoj destinaciji. Ako avion sleti sa dva sata i pedeset minuta zakašnjenja, ali se vrata otvore petnaest minuta kasnije, slučaj može preći prag od tri sata.",
            "Zato kašnjenje na pisti, čekanje gejta, udaljena pozicija i sporo iskrcavanje nisu samo neprijatni detalji. Oni mogu promeniti pravni i praktični ishod. Putnik treba da zabeleži oba vremena: sletanje i otvaranje vrata.",
          ],
          bullets: [
            "Sačuvajte screenshot sletanja i zapišite vreme otvaranja vrata.",
            "Ako je čekanje bilo dugo, zabeležite da li je najavljen razlog.",
            "Kod konekcije sačuvajte dokaz da ste zbog toga propustili nastavak.",
          ],
        },
        {
          heading: "Kako dokazati vreme otvaranja vrata",
          body: [
            "Najbolji dokaz je pisana informacija iz aplikacije, poruka aviokompanije, fotografija ekrana u avionu ili beleška napravljena odmah kada su vrata otvorena. Ako putujete sa nekim, korisno je da oba putnika sačuvaju isto vreme u porukama ili beleškama.",
            "Nije svaki izvor jednako precizan. Neki sajtovi prikazuju vreme sletanja, neki vreme dolaska na gejt, a neki vreme završetka leta. Zato je dobro imati više izvora i u zahtevu napisati šta svaki izvor predstavlja.",
          ],
        },
        {
          heading: "Kada čekanje na pisti utiče na konekciju",
          body: [
            "Ako ste imali nastavak puta, čekanje u avionu može biti presudno. Na papiru možda izgleda da ste sleteli na vreme za transfer, ali ako niste mogli da izađete, prođete terminal i stignete do gejta, stvarna konekcija je izgubljena.",
            "Kod jedne rezervacije priložite novi boarding pass, poruku o propuštenoj konekciji i novi itinerer. Kod odvojenih karata slučaj je slabiji, ali vreme otvaranja vrata i dalje može objasniti zašto je trošak nastao.",
          ],
        },
        {
          heading: "Briga tokom čekanja u avionu",
          body: [
            "Dugo čekanje u avionu može otvoriti pitanja vode, hrane, toaleta, medicinske potrebe i informacija. Pravila se razlikuju po situaciji, ali je važno zabeležiti koliko je čekanje trajalo i da li je posada davala jasna obaveštenja.",
            "Ako je posle iskrcavanja usledilo dodatno čekanje, pravo na brigu se nastavlja posmatrati prema ukupnom kašnjenju i okolnostima. Računi za osnovne potrebe posle izlaska iz aviona treba da se čuvaju odvojeno od fiksne naknade.",
          ],
        },
        {
          heading: "Kako odgovoriti na pogrešan obračun",
          body: [
            "Ako aviokompanija računa samo vreme sletanja i zbog toga odbija zahtev, dopuna treba da bude vrlo precizna. Navedite planirani dolazak, vreme sletanja, vreme otvaranja vrata, izvor za svako vreme i konačno kašnjenje.",
            "Ne šaljite dugačko objašnjenje bez dokaza. Kratka tabela ili hronologija obično radi bolje: planirano, sletelo, vrata otvorena, putnici izašli, konekcija propuštena ili krajnji dolazak. Tako se spor svodi na proverljive činjenice.",
          ],
        },
      ],
    },
    en: {
      slug: "tarmac-delay-door-open-time",
      title: "Tarmac delay: why door-opening time matters",
      description: "How arrival is measured during tarmac delay, why landing time is not always enough and which evidence to save for a claim.",
      excerpt: "When a flight lands but passengers wait inside the aircraft, the gap between landing and door opening can decide the compensation threshold.",
      category: "Flight delays",
      readTime: "8 min read",
      sections: [
        {
          heading: "Landing is not always the end of the delay",
          body: [
            "For [flight delay compensation](/en/flight-delay-compensation), the key time is when passengers can actually leave the aircraft at the final destination. If the aircraft lands two hours and fifty minutes late but the doors open fifteen minutes later, the case may cross the three-hour threshold.",
            "That is why tarmac delay, waiting for a gate, remote stand arrival and slow disembarkation are not only uncomfortable details. They can change the legal and practical result. Passengers should record both times: landing and door opening.",
          ],
          bullets: [
            "Save a landing screenshot and record door-opening time.",
            "If the wait was long, note whether a reason was announced.",
            "For connections, save proof that this caused the missed onward flight.",
          ],
        },
        {
          heading: "How to prove door-opening time",
          body: [
            "The best evidence is written information from an app, an airline message, a photo of an onboard screen or a note made immediately when the doors opened. If you travel with someone, it helps if both passengers save the same time in messages or notes.",
            "Not every source is equally precise. Some sites show landing time, some gate arrival time and some flight completion time. It is useful to have several sources and to explain in the claim what each source represents.",
          ],
        },
        {
          heading: "When tarmac waiting affects a connection",
          body: [
            "If you had onward travel, waiting inside the aircraft can be decisive. On paper it may look as if you landed in time for the transfer, but if you could not leave, cross the terminal and reach the gate, the real connection was lost.",
            "Under one booking, attach the new boarding pass, missed-connection message and new itinerary. With separate tickets the case is weaker, but door-opening time can still explain why a cost was incurred.",
          ],
        },
        {
          heading: "Care during the wait in the aircraft",
          body: [
            "A long wait inside the aircraft can raise questions about water, food, toilets, medical needs and information. Rules vary by situation, but it is important to record how long the wait lasted and whether crew gave clear updates.",
            "If further waiting followed after disembarkation, care rights are still assessed by the total delay and circumstances. Receipts for basic needs after leaving the aircraft should be kept separately from fixed compensation.",
          ],
        },
        {
          heading: "How to answer a wrong calculation",
          body: [
            "If the airline counts only landing time and rejects the claim for that reason, the follow-up should be very precise. State scheduled arrival, landing time, door-opening time, source for each time and final delay.",
            "Do not send a long explanation without proof. A short table or timeline usually works better: scheduled, landed, doors opened, passengers left, connection missed or final arrival. That turns the dispute into checkable facts.",
          ],
        },
      ],
    },
  },
] satisfies BlogArticle[];
