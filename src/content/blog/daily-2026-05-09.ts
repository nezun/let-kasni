import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
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
