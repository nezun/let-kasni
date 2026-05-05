import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "wizz-air-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Low cost airline aircraft parked at an airport gate",
    position: "center",
  },
  "air-serbia-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1600&q=82",
    alt: "Passengers waiting near a departure gate",
    position: "center",
  },
  "lufthansa-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft taxiing near an airport control tower",
    position: "center",
  },
  "austrian-airlines-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger waiting in an airport terminal",
    position: "center",
  },
  "turkish-airlines-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft flying above clouds on a long route",
    position: "center",
  },
  "ryanair-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport runway and aircraft at dusk",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

export const articles = [
  {
    id: "wizz-air-flight-delay-compensation",
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-05",
    sr: {
      slug: "wizz-air-kasnjenje-leta-odsteta",
      title: "Wizz Air kašnjenje leta: kada putnik može da traži odštetu",
      description: "Praktičan vodič za Wizz Air letove iz Srbije i regiona: tri sata kašnjenja, rute ka EU, troškovi čekanja i dokazi koje treba sačuvati.",
      excerpt: "Kod Wizz Air kašnjenja najvažnije je gde je let poleteo, kada ste stigli na krajnju destinaciju i da li je razlog bio pod kontrolom aviokompanije.",
      category: "Aviokompanije",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Kada Wizz Air kašnjenje ulazi u proveru",
          body: [
            "Wizz Air je čest izbor za putnike iz Srbije i regiona, posebno na evropskim rutama. Ako je dolazak na krajnju destinaciju bio tri sata ili više kasnije, slučaj treba proveriti kroz pravila za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Nije dovoljno gledati samo kašnjenje u polasku, jer avion ponekad nadoknadi deo vremena u letu.",
            "Najčešće su najjače situacije kada let polazi iz EU, kada putujete unutar EU ili kada je operativni prevoznik evropska aviokompanija na ruti ka EU. Kod Wizz Air mreže to često znači da treba pažljivo uporediti aerodrom polaska, krajnju destinaciju i da li je putovanje bilo kupljeno kao jedna rezervacija.",
          ],
        },
        {
          heading: "Razlozi kašnjenja koji prave razliku",
          body: [
            "Ako se pominje tehnički kvar, nedostatak posade, kasna rotacija aviona ili operativni problem, zahtev može biti realniji. Ako se pominju loše vreme, zatvaranje aerodroma, bezbednosni događaj ili ograničenje kontrole letenja, fiksna naknada može biti teža, ali pravo na brigu ne nestaje automatski.",
            "Kod niskotarifnih letova posebno je važno proveriti da li je početni razlog zaista objasnio celo kašnjenje. Jedan problem na prethodnom letu može pokrenuti lanac, ali kompanija i dalje treba da pokaže da je razumno organizovala nastavak operacije i obavestila putnike.",
          ],
        },
        {
          heading: "Troškovi čekanja i aerodromska pomoć",
          body: [
            "Putnik ne treba da meša fiksnu odštetu sa troškovima čekanja. Čak i kada je razlog kašnjenja vanredan, kod dužeg čekanja mogu biti relevantni obroci, osveženje, komunikacija, hotel i transfer. Ako pomoć nije ponuđena, kupujte razumno i čuvajte račune.",
            "U zahtevu jasno razdvojite šta tražite: proveru fiksne naknade, refundaciju nužnih troškova ili oba dela. Takva struktura je posebno korisna kada aviokompanija odbija odštetu zbog vanrednih okolnosti, ali ne odgovara na troškove koji su nastali dok ste čekali.",
          ],
        },
        {
          heading: "Dokazi za Wizz Air slučaj",
          body: [
            "Sačuvajte boarding pass, booking potvrdu, poruke iz aplikacije ili emaila, fotografiju table polazaka i tačno vreme dolaska. Ako je let preusmeren ili ste propustili nastavak puta, čuvajte i dokaz o alternativnom transportu, hotelu i komunikaciji sa podrškom.",
            "Ako osoblje kaže razlog kašnjenja, zapišite tačnu formulaciju. Razlika između tehničkog razloga, vremena i slota nije mala. Upravo taj detalj često odlučuje da li se slučaj šalje kao zahtev za 250, 400 ili 600 evra, ili samo kao zahtev za refundaciju troškova.",
          ],
        },
        {
          heading: "Najbrži sledeći korak",
          body: [
            "Za Wizz Air let prvo napravite kratku tabelu: ruta, broj leta, planirani dolazak, stvarni dolazak, razlog koji je naveden i troškovi koje ste imali. Ako je dolazak kasnio tri sata ili više, a razlog nije jasno van kontrole aviokompanije, slučaj vredi poslati na proveru.",
            "Ako je odgovor kompanije generički, tražite vremensku liniju i dokaz direktne veze između razloga i vašeg leta. Ne morate pisati dugo. Dovoljno je da zahtev bude precizan, dokumentovan i povezan sa pravilima za kašnjenje leta.",
          ],
        },
      ],
    },
    en: {
      slug: "wizz-air-flight-delay-compensation",
      title: "Wizz Air flight delay: when passengers can claim compensation",
      description: "A practical guide for Wizz Air flights from Serbia and the region: three-hour arrival delay, EU routes, waiting costs and evidence to save.",
      excerpt: "For a Wizz Air delay, the key facts are where the flight departed, when you reached the final destination and whether the reason was within the airline's control.",
      category: "Airlines",
      readTime: "8 min read",
      sections: [
        {
          heading: "When a Wizz Air delay should be checked",
          body: [
            "Wizz Air is a common choice for travelers from Serbia and the region, especially on European routes. If arrival at the final destination was three hours or more late, the case should be checked under [flight delay compensation](/en/flight-delay-compensation). Departure delay alone is not enough, because an aircraft can recover part of the time in the air.",
            "The strongest situations are often flights departing from the EU, journeys within the EU or routes into the EU operated by a European airline. With the Wizz Air network, that means comparing the departure airport, final destination and whether the journey was bought as one booking.",
          ],
        },
        {
          heading: "Delay reasons that change the case",
          body: [
            "If the reason is a technical fault, crew shortage, late aircraft rotation or operational issue, compensation may be realistic. If the reason is bad weather, airport closure, a safety event or air traffic control restriction, fixed compensation may be harder, but care rights do not automatically disappear.",
            "For low-cost flights, it is especially important to check whether the initial reason really explains the whole delay. One issue on a previous flight can start a chain, but the airline still needs to show that it organized the later operation reasonably and kept passengers informed.",
          ],
        },
        {
          heading: "Waiting costs and airport assistance",
          body: [
            "Passengers should not confuse fixed compensation with waiting costs. Even when the delay reason is extraordinary, meals, refreshments, communication, hotel accommodation and transfer may still matter during a long wait. If assistance is not offered, spend reasonably and keep receipts.",
            "In the claim, separate what you are asking for: fixed compensation review, reimbursement of necessary costs or both. This structure helps when the airline refuses compensation because of extraordinary circumstances but does not answer the expense part of the case.",
          ],
        },
        {
          heading: "Evidence for a Wizz Air case",
          body: [
            "Keep the boarding pass, booking confirmation, app or email messages, departure-board photo and exact arrival time. If the flight was diverted or you missed onward travel, keep proof of alternative transport, hotel costs and communication with support.",
            "If staff state the reason for delay, write down the exact wording. The difference between a technical reason, weather and a slot is not minor. That detail often decides whether the case is a claim for 250, 400 or 600 euros, or only a request for expense reimbursement.",
          ],
        },
        {
          heading: "The fastest next step",
          body: [
            "For a Wizz Air flight, first create a short table: route, flight number, scheduled arrival, actual arrival, reason given and costs incurred. If arrival was three hours or more late and the reason is not clearly outside the airline's control, the case is worth checking.",
            "If the airline response is generic, ask for a timeline and proof of the direct link between the reason and your flight. The message does not need to be long. It should be precise, documented and tied to the flight-delay rules.",
          ],
        },
      ],
    },
  },
  {
    id: "air-serbia-flight-delay-compensation",
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-05",
    sr: {
      slug: "air-serbia-kasnjenje-leta-odsteta",
      title: "Air Serbia kašnjenje leta: prava putnika i naknada",
      description: "Kako proveriti Air Serbia kašnjenje iz Beograda, Niša, Kraljeva ili EU: ruta, dolazak tri sata kasnije, konekcije i dokazi.",
      excerpt: "Air Serbia slučajevi često zavise od rute i krajnje destinacije. Kod jedne rezervacije preko Beograda ili EU čvorišta, proverava se stvarni dolazak na poslednji aerodrom.",
      category: "Aviokompanije",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Zašto je ruta posebno važna",
          body: [
            "Kod Air Serbia letova ne treba početi od državljanstva putnika, već od rute i operativnog prevoznika. Let iz EU ka Srbiji, let iz Srbije ka EU, ili putovanje sa evropskim segmentom mogu imati različitu pravnu osnovu. Zato je prvi korak uvek mapa puta, ne opšti utisak da je let mnogo kasnio.",
            "Ako ste stigli na krajnju destinaciju tri sata ili više kasnije, otvorite širu proveru kroz [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Kod Air Serbia mreže važne su i konekcije preko Beograda, jer jedan pomeren segment može promeniti celo putovanje.",
          ],
        },
        {
          heading: "Konekcije preko Beograda",
          body: [
            "Ako su svi segmenti bili pod jednom rezervacijom, ne gleda se samo prvi let koji je kasnio. Gleda se kada ste stigli na krajnju destinaciju i da li je aviokompanija ponudila razuman nastavak puta. To je važno za putnike koji preko Beograda nastavljaju ka Evropi, regionu ili dugim rutama.",
            "Ako su karte kupljene odvojeno, zaštita je slabija. Tada se svaki segment posmatra posebno i aviokompanija prvog leta obično ne odgovara za rizik koji ste sami napravili kratkim presedanjem između dve odvojene karte.",
          ],
        },
        {
          heading: "Razlog kašnjenja i odgovornost",
          body: [
            "Tehnički kvar, kasna rotacija aviona, operativni problem ili nedostatak posade mogu pojačati zahtev. Loše vreme, zatvaranje aerodroma, kontrola letenja ili bezbednosni incident mogu biti jači argument protiv fiksne odštete, ali aviokompanija i dalje mora da objasni vezu sa vašim letom.",
            "Ako dobijete samo kratko objašnjenje, tražite preciznije podatke: kada je problem nastao, koji avion ili segment je pogođen, koliko je trajao i koje alternative su proverene. Bez te vremenske linije putnik ne može da zna da li je odbijenica realna.",
          ],
        },
        {
          heading: "Briga tokom čekanja",
          body: [
            "Air Serbia, kao i drugi prevoznici, tokom dužeg čekanja mora da tretira brigu odvojeno od fiksne naknade. Obroci, osveženje, komunikacija, hotel i transfer mogu biti relevantni čak i kada se kasnije ispostavi da fiksna odšteta nije dugovana.",
            "Ako pomoć nije ponuđena, sačuvajte račune i ostanite u razumnim okvirima. U zahtevu napišite šta tražite kao odštetu, a šta kao refundaciju troškova. To povećava šansu da bar deo realnih troškova ne bude izgubljen zbog spora oko glavne naknade.",
          ],
        },
        {
          heading: "Kako pripremiti zahtev",
          body: [
            "Pripremite broj leta, datum, booking referencu, potvrdu rezervacije, boarding pass, planirani i stvarni dolazak, kao i poruke koje ste dobili. Ako ste imali konekciju, dodajte ceo itinerer, ne samo segment koji je prvi kasnio.",
            "Najbolji zahtev je kratak i precizan. Navedite da tražite proveru fiksne naknade, objašnjenje razloga kašnjenja i refundaciju nužnih troškova ako pomoć nije bila obezbeđena. Ako je odgovor nepotpun, nastavak treba da traži konkretne dokaze, ne da ponavlja opštu žalbu.",
          ],
        },
      ],
    },
    en: {
      slug: "air-serbia-flight-delay-compensation",
      title: "Air Serbia flight delay: passenger rights and compensation",
      description: "How to check an Air Serbia delay from Belgrade, Nis, Kraljevo or the EU: route, three-hour arrival delay, connections and evidence.",
      excerpt: "Air Serbia cases often depend on the route and final destination. Under one booking through Belgrade or an EU hub, the real arrival at the last airport matters.",
      category: "Airlines",
      readTime: "8 min read",
      sections: [
        {
          heading: "Why the route matters so much",
          body: [
            "For Air Serbia flights, do not start with passenger nationality. Start with the route and operating carrier. A flight from the EU to Serbia, a flight from Serbia to the EU or a journey with a European segment may have different legal bases. The first step is always a route map, not a general feeling that the delay was long.",
            "If you reached the final destination three hours or more late, run the wider check under [flight delay compensation](/en/flight-delay-compensation). Air Serbia connections through Belgrade also matter because one shifted segment can change the whole journey.",
          ],
        },
        {
          heading: "Connections through Belgrade",
          body: [
            "If all segments were under one reservation, the assessment does not stop at the first delayed flight. The question is when you reached the final destination and whether the airline offered a reasonable onward solution. This matters for travelers continuing through Belgrade to Europe, the region or longer routes.",
            "If tickets were bought separately, protection is weaker. Each segment is usually assessed on its own, and the airline operating the first flight normally does not carry the risk created by a short self-made connection between two separate tickets.",
          ],
        },
        {
          heading: "Delay reason and responsibility",
          body: [
            "A technical fault, late aircraft rotation, operational issue or crew shortage can strengthen a claim. Bad weather, airport closure, air traffic control or a safety incident can be stronger arguments against fixed compensation, but the airline still has to explain the link with your flight.",
            "If you receive only a short explanation, ask for more detail: when the issue arose, which aircraft or segment was affected, how long it lasted and which alternatives were checked. Without that timeline, the passenger cannot know whether the refusal is realistic.",
          ],
        },
        {
          heading: "Care during the wait",
          body: [
            "Air Serbia, like other carriers, must treat care separately from fixed compensation during a long wait. Meals, refreshments, communication, hotel accommodation and transfer may matter even if fixed compensation later turns out not to be owed.",
            "If assistance was not offered, keep receipts and stay within reasonable limits. In the claim, state what you request as compensation and what you request as expense reimbursement. That improves the chance that real costs are not lost because of a dispute about the main compensation claim.",
          ],
        },
        {
          heading: "How to prepare the claim",
          body: [
            "Prepare the flight number, date, booking reference, booking confirmation, boarding pass, scheduled and actual arrival, and airline messages. If you had a connection, add the full itinerary, not only the segment that was delayed first.",
            "The strongest claim is short and precise. State that you request fixed compensation review, an explanation of the delay reason and reimbursement of necessary costs if care was not provided. If the answer is incomplete, the follow-up should ask for concrete proof instead of repeating a general complaint.",
          ],
        },
      ],
    },
  },
  {
    id: "lufthansa-flight-delay-compensation",
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-05",
    sr: {
      slug: "lufthansa-kasnjenje-leta-odsteta",
      title: "Lufthansa kašnjenje leta: naknada za putnike iz Srbije",
      description: "Vodič za Lufthansa kašnjenja preko Frankfurta i Minhena: jedna rezervacija, propuštena konekcija, vanredne okolnosti i dokazi.",
      excerpt: "Kod Lufthansa letova iz Srbije najčešće pitanje je da li je kašnjenje prvog segmenta dovelo do kasnog dolaska na krajnju destinaciju pod jednom rezervacijom.",
      category: "Aviokompanije",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Frankfurt i Minhen kao čvorišta",
          body: [
            "Lufthansa slučajevi za putnike iz Srbije često uključuju presedanje u Frankfurtu ili Minhenu. Ako je prvi segment kasnio, a zbog toga ste propustili nastavak puta, procena se ne završava na kašnjenju prvog leta. Kod jedne rezervacije gleda se dolazak na krajnju destinaciju.",
            "Ako je taj dolazak bio tri sata ili više kasnije, slučaj treba proveriti kroz [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Bitno je da imate dokaz da su segmenti bili zajedno kupljeni, jer odvojene karte obično znače mnogo slabiji položaj putnika.",
          ],
        },
        {
          heading: "Kada zahtev može biti jak",
          body: [
            "Zahtev može biti jak kada je kašnjenje nastalo zbog tehničkog problema, operativne organizacije, nedostatka posade ili kasne rotacije aviona. Ako je putnik stigao na krajnju destinaciju preko tri sata kasnije, a razlog je u sferi aviokompanije, iznos se određuje prema udaljenosti.",
            "Kod konekcija je važno i koliko brzo je ponuđen nastavak puta. Ako je postojala realna ranija alternativa, a putnik je prebačen mnogo kasnije bez dobrog razloga, to može biti važan deo zahteva ili dodatnog pitanja prema aviokompaniji.",
          ],
        },
        {
          heading: "Kada je slučaj slabiji",
          body: [
            "Loše vreme u čvorištu, ograničenje kontrole letenja, bezbednosni događaj ili zatvaranje piste mogu oslabiti fiksnu naknadu. Ipak, kompanija mora da pokaže direktnu vezu između događaja i vašeg kašnjenja, kao i da kašnjenje nije moglo biti izbegnuto razumnim merama.",
            "Ako odgovor samo navodi weather, ATC ili airport restrictions, tražite vremensku liniju. Kod velikih čvorišta ista rečenica može pokrivati hiljade putnika, ali vaš zahtev zavisi od konkretnog leta, konekcije i ponuđenog rešenja.",
          ],
        },
        {
          heading: "Pravo na hotel i obroke",
          body: [
            "Ako ste zbog propuštene konekcije ostali preko noći, hotel, transfer i obroci mogu biti centralni deo slučaja. To važi čak i kada je fiksna naknada sporna. Ako je pomoć ponuđena kroz vaučer ili hotel, sačuvajte dokaz. Ako nije, čuvajte račune.",
            "Razumni troškovi su lakši za povraćaj od luksuznih izbora. U poruci jasno razdvojite troškove čekanja od same odštete. Tako se izbegava situacija da kompanija odbije sve jednim odgovorom o vanrednim okolnostima.",
          ],
        },
        {
          heading: "Šta poslati uz zahtev",
          body: [
            "Pošaljite ceo itinerer, boarding pass za svaki segment, poruke o promeni leta, dokaz stvarnog dolaska i račune. Ako je prtljag ostao u sistemu aviokompanije ili ste dobili novu kartu, sačuvajte i te dokumente.",
            "U zahtevu napišite da je putovanje bilo pod jednom rezervacijom i navedite krajnju destinaciju. To pomaže da se slučaj ne svede pogrešno na prvi segment, nego da se proceni stvarni gubitak vremena na celom putovanju.",
          ],
        },
      ],
    },
    en: {
      slug: "lufthansa-flight-delay-compensation",
      title: "Lufthansa flight delay: compensation for travelers from Serbia",
      description: "A guide to Lufthansa delays via Frankfurt and Munich: one booking, missed connection, extraordinary circumstances and evidence.",
      excerpt: "For Lufthansa flights from Serbia, the key question is often whether the first delayed segment caused late arrival at the final destination under one booking.",
      category: "Airlines",
      readTime: "8 min read",
      sections: [
        {
          heading: "Frankfurt and Munich as hubs",
          body: [
            "Lufthansa cases for travelers from Serbia often involve a connection in Frankfurt or Munich. If the first segment was delayed and you missed onward travel, the assessment does not stop with the first flight. Under one booking, arrival at the final destination matters.",
            "If that arrival was three hours or more late, the case should be checked under [flight delay compensation](/en/flight-delay-compensation). Proof that the segments were bought together is important because separate tickets usually put the passenger in a much weaker position.",
          ],
        },
        {
          heading: "When the claim can be strong",
          body: [
            "A claim can be strong when the delay came from a technical problem, operational organization, crew shortage or late aircraft rotation. If the passenger arrived more than three hours late at the final destination and the reason sits within the airline's sphere, the amount depends on distance.",
            "For connections, the timing of rerouting also matters. If a realistic earlier alternative existed and the passenger was moved much later without a good reason, that can become an important part of the claim or a follow-up question to the airline.",
          ],
        },
        {
          heading: "When the case is weaker",
          body: [
            "Bad weather at the hub, air traffic control restrictions, a safety event or runway closure can weaken fixed compensation. Still, the airline must show a direct link between the event and your delay, and that the delay could not have been avoided with reasonable measures.",
            "If the answer only says weather, ATC or airport restrictions, ask for a timeline. At large hubs, the same phrase can cover thousands of passengers, but your claim depends on the specific flight, connection and solution offered.",
          ],
        },
        {
          heading: "Hotel and meal rights",
          body: [
            "If you stayed overnight because of a missed connection, hotel accommodation, transfer and meals can be central. That remains true even when fixed compensation is disputed. If help was offered through a voucher or hotel, keep proof. If not, keep receipts.",
            "Reasonable costs are easier to recover than luxury choices. In the message, separate waiting costs from compensation. That avoids letting the airline reject everything with one answer about extraordinary circumstances.",
          ],
        },
        {
          heading: "What to send with the claim",
          body: [
            "Send the full itinerary, boarding pass for every segment, messages about flight changes, proof of actual arrival and receipts. If baggage remained in the airline system or you received a new ticket, keep those documents too.",
            "In the claim, state that the journey was under one booking and name the final destination. That helps prevent the case from being reduced incorrectly to the first segment instead of the real time lost across the whole journey.",
          ],
        },
      ],
    },
  },
  {
    id: "austrian-airlines-flight-delay-compensation",
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-05",
    sr: {
      slug: "austrian-airlines-kasnjenje-leta-odsteta",
      title: "Austrian Airlines kašnjenje leta: šta važi za letove preko Beča",
      description: "Kako proveriti Austrian Airlines kašnjenje i propuštenu konekciju preko Beča: jedna rezervacija, briga, hotel i dokaz razloga.",
      excerpt: "Kod Austrian Airlines letova preko Beča presudno je da li je kašnjenje pokvarilo jednu rezervaciju i koliko kasno ste stigli na poslednju destinaciju.",
      category: "Aviokompanije",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Beč kao česta konekcija",
          body: [
            "Za putnike iz Srbije Austrian Airlines često znači kratak evropski segment i presedanje u Beču. Ako prvi let kasni i konekcija propadne, glavno pitanje je da li je sve bilo na jednoj rezervaciji. Ako jeste, procena se pomera na krajnju destinaciju.",
            "Dolazak tri sata ili više kasnije otvara proveru kroz [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Ako ste karte kupili odvojeno, naročito sa kratkim vremenom između letova, zahtev prema prvom prevozniku može biti znatno slabiji.",
          ],
        },
        {
          heading: "Tipični razlozi i kako ih čitati",
          body: [
            "Tehnički kvar, kasna rotacija i nedostatak posade obično traže ozbiljniju proveru. Magla, sneg, oluja, ograničenje kontrole letenja ili zatvaranje piste mogu biti vanredne okolnosti, ali ne treba prihvatiti samo jednu opštu rečenicu bez veze sa konkretnim letom.",
            "Ako aviokompanija navede da je problem bio u Beču, pitajte da li je ograničenje važilo baš u periodu vašeg leta i koliko je trajalo. Ako je problem bio na prethodnoj rotaciji, tražite objašnjenje zašto nije postojala razumna alternativa.",
          ],
        },
        {
          heading: "Kada hotel postaje važan",
          body: [
            "Konekcije preko Beča često se pomeraju na sledeći dan kada kasniji letovi više ne postoje. Tada hotel, transfer i obroci postaju praktično važniji od teorijske rasprave o odšteti. Putnik treba da sačuva vaučere, račune i poruke o novom letu.",
            "Ako pomoć nije ponuđena, razuman hotel blizu aerodroma, osnovni obrok i transfer su troškovi koje treba jasno tražiti nazad. U zahtevu ih navedite po stavkama, sa datumom, iznosom i razlogom zašto su bili neophodni.",
          ],
        },
        {
          heading: "Dokazi kod propuštene konekcije",
          body: [
            "Najvažniji dokument je itinerer koji pokazuje jednu rezervaciju. Zatim boarding pass, poruke o kašnjenju, nova karta, dokaz dolaska i računi. Ako ste na gejtu dobili usmeno objašnjenje, zapišite ga odmah, jer se kasniji email često svede na opštu formulaciju.",
            "Za putnike iz Srbije korisno je dodati i koliko je vremena prvobitno bilo između letova. Ako je konekcija bila razumna po rasporedu, a propala je samo zbog kašnjenja prvog segmenta, slučaj izgleda drugačije nego kod odvojenih i rizično spojenih karata.",
          ],
        },
        {
          heading: "Kako napisati kratak zahtev",
          body: [
            "Napišite rutu, broj leta, planirani i stvarni dolazak na krajnju destinaciju, razlog koji ste dobili i šta je Austrian Airlines ponudio. Zatim jasno tražite proveru fiksne naknade i refundaciju troškova čekanja ako su nastali.",
            "Ako dobijete odgovor da je razlog vanredna okolnost, tražite dokaz direktne veze i mere koje su preduzete da se kašnjenje smanji. To je miran, precizan nastavak koji čuva slučaj bez nepotrebnog širenja priče.",
          ],
        },
      ],
    },
    en: {
      slug: "austrian-airlines-flight-delay-compensation",
      title: "Austrian Airlines flight delay: what applies on Vienna connections",
      description: "How to check an Austrian Airlines delay and missed connection via Vienna: one booking, care, hotel and proof of the reason.",
      excerpt: "For Austrian Airlines flights via Vienna, the decisive facts are whether the delay broke one booking and how late you reached the final destination.",
      category: "Airlines",
      readTime: "8 min read",
      sections: [
        {
          heading: "Vienna as a common connection",
          body: [
            "For travelers from Serbia, Austrian Airlines often means a short European segment and a connection in Vienna. If the first flight is delayed and the connection fails, the main question is whether everything was on one booking. If yes, the assessment moves to the final destination.",
            "Arrival three hours or more late opens the check under [flight delay compensation](/en/flight-delay-compensation). If you bought tickets separately, especially with a short gap between flights, the claim against the first carrier can be much weaker.",
          ],
        },
        {
          heading: "Typical reasons and how to read them",
          body: [
            "A technical fault, late rotation and crew shortage usually need closer review. Fog, snow, storms, air traffic control restriction or runway closure may be extraordinary circumstances, but passengers should not accept one broad sentence without a link to the specific flight.",
            "If the airline says the problem was in Vienna, ask whether the restriction applied exactly during your flight period and how long it lasted. If the problem came from a previous rotation, ask why no reasonable alternative existed.",
          ],
        },
        {
          heading: "When hotel accommodation becomes important",
          body: [
            "Vienna connections often move to the next day when later flights are no longer available. Then hotel accommodation, transfer and meals become practically more important than the theoretical compensation dispute. Keep vouchers, receipts and messages about the new flight.",
            "If help was not offered, a reasonable hotel near the airport, basic meal and transfer are costs to request back clearly. In the claim, list them by item, date, amount and reason they were necessary.",
          ],
        },
        {
          heading: "Evidence for a missed connection",
          body: [
            "The most important document is the itinerary showing one booking. Then boarding pass, delay messages, new ticket, proof of arrival and receipts. If you received a verbal explanation at the gate, write it down immediately because the later email may use only broad wording.",
            "For travelers from Serbia, it also helps to add the original connection time. If the connection was reasonable in the schedule and failed only because of the first delay, the case looks different from separate tickets joined together with a risky gap.",
          ],
        },
        {
          heading: "How to write a short claim",
          body: [
            "State the route, flight number, scheduled and actual arrival at the final destination, reason received and what Austrian Airlines offered. Then clearly request fixed compensation review and reimbursement of waiting costs if they arose.",
            "If the answer says the reason was extraordinary, ask for proof of the direct link and the measures taken to reduce the delay. That is a calm, precise follow-up that keeps the case focused.",
          ],
        },
      ],
    },
  },
  {
    id: "turkish-airlines-flight-delay-compensation",
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-05",
    sr: {
      slug: "turkish-airlines-kasnjenje-leta-odsteta",
      title: "Turkish Airlines kašnjenje leta: prava na rutama preko Istanbula",
      description: "Šta putnici iz Srbije treba da provere kod Turkish Airlines kašnjenja preko Istanbula: EU element, konekcija, briga i dokazi.",
      excerpt: "Turkish Airlines kašnjenje ne ulazi u evropsku zaštitu u svakoj kombinaciji. Prvo proverite polazak, dolazak, operativnog prevoznika i jednu rezervaciju.",
      category: "Aviokompanije",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Prvo proverite EU element",
          body: [
            "Turkish Airlines nije evropski prevoznik, pa kod letova preko Istanbula ne treba automatski pretpostaviti da evropska naknada važi za svaki segment. Jači osnov postoji kada let polazi iz EU, ili kada konkretna kombinacija rute ulazi u evropsku zaštitu po pravilima za polazak, dolazak i operativnog prevoznika.",
            "Za putnike iz Srbije najvažnije je da se ne preskoči analiza rute. Ako je putovanje imalo evropski segment ili ste stigli na krajnju destinaciju tri sata ili više kasnije, proverite ga kroz [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta), ali očekujte da će pokrivenost zavisiti od detalja.",
          ],
        },
        {
          heading: "Istanbul i jedna rezervacija",
          body: [
            "Istanbul je veliko čvorište, a propuštena konekcija može značiti višesatno ili celodnevno čekanje. Ako su svi segmenti bili pod jednom rezervacijom, fokus je na tome kako je aviokompanija preusmerila putnika i kada je stigao na krajnju destinaciju.",
            "Ako su karte bile odvojene, rizik je mnogo veći. Turkish Airlines može biti odgovoran za svoj let, ali ne nužno za kasnije posledice koje su nastale zato što je putnik sam spojio dva odvojena putovanja sa kratkim razmakom.",
          ],
        },
        {
          heading: "Razlozi koji menjaju ishod",
          body: [
            "Tehnički kvar, operativni problem ili nedostatak posade mogu otvoriti ozbiljniju proveru. Loše vreme, ograničenje kontrole letenja, zatvaranje aerodroma ili bezbednosna odluka mogu oslabiti fiksnu naknadu, ali ne moraju zatvoriti pitanje brige i preusmeravanja.",
            "Kod velikih mreža čest je lanac prethodnih kašnjenja. Ako kompanija navodi samo late arrival of aircraft ili operational reasons, tražite objašnjenje šta je bio početni razlog i zašto nije ponuđena ranija alternativa.",
          ],
        },
        {
          heading: "Hotel, obroci i nastavak puta",
          body: [
            "Kod dugog čekanja u Istanbulu praktična prava mogu biti važnija od same odštete. Putnik treba da dobije informacije, obroke i, ako čekanje prelazi u noć, hotel i transfer kada su uslovi ispunjeni. Ako je pomoć ponuđena, sačuvajte vaučere i novu kartu.",
            "Ako sami plaćate hotel ili obroke, trošite razumno i čuvajte račune. U zahtevu odvojite refundaciju tih troškova od pitanja fiksne naknade, jer pravni osnov može biti različit.",
          ],
        },
        {
          heading: "Šta poslati na proveru",
          body: [
            "Pošaljite ceo itinerer, booking referencu, boarding pass za svaki segment, poruke aviokompanije, dokaz stvarnog dolaska i račune. Posebno naglasite da li je putovanje bilo pod jednom rezervacijom i koji segment je prvi kasnio.",
            "Ako je evropska naknada sporna, dobar zahtev ipak može tražiti objašnjenje razloga, dokaze o razumnim merama i refundaciju nužnih troškova. Tako se ne gubi realan deo slučaja samo zato što fiksna odšteta nije sigurna.",
          ],
        },
      ],
    },
    en: {
      slug: "turkish-airlines-flight-delay-compensation",
      title: "Turkish Airlines flight delay: rights on routes via Istanbul",
      description: "What travelers from Serbia should check for Turkish Airlines delays via Istanbul: EU element, connection, care and evidence.",
      excerpt: "A Turkish Airlines delay is not covered by European protection in every combination. Check departure, arrival, operating carrier and one booking first.",
      category: "Airlines",
      readTime: "8 min read",
      sections: [
        {
          heading: "Check the EU element first",
          body: [
            "Turkish Airlines is not a European carrier, so flights via Istanbul should not automatically be treated as covered by European compensation on every segment. The stronger basis is usually when the flight departs from the EU, or when the concrete route combination is covered by departure, arrival and operating-carrier rules.",
            "For travelers from Serbia, the most important point is not to skip the route analysis. If the journey had a European segment or you arrived at the final destination three hours or more late, check it under [flight delay compensation](/en/flight-delay-compensation), but expect coverage to depend on details.",
          ],
        },
        {
          heading: "Istanbul and one booking",
          body: [
            "Istanbul is a large hub, and a missed connection can mean hours or a full day of waiting. If all segments were under one booking, the focus is how the airline rerouted the passenger and when the final destination was reached.",
            "If tickets were separate, the risk is much higher. Turkish Airlines may be responsible for its own flight, but not necessarily for later consequences created because the passenger joined two separate journeys with a short gap.",
          ],
        },
        {
          heading: "Reasons that change the outcome",
          body: [
            "A technical fault, operational problem or crew shortage can open a closer review. Bad weather, air traffic control restriction, airport closure or a security decision can weaken fixed compensation, but they do not necessarily close care and rerouting questions.",
            "Large networks often involve chains of earlier delays. If the airline mentions only late arrival of aircraft or operational reasons, ask what the original reason was and why no earlier alternative was offered.",
          ],
        },
        {
          heading: "Hotel, meals and onward travel",
          body: [
            "During a long wait in Istanbul, practical rights can matter more than compensation itself. The passenger should receive information, meals and, if the wait moves overnight, hotel accommodation and transfer when conditions are met. If help was offered, keep vouchers and the new ticket.",
            "If you pay for hotel or meals yourself, spend reasonably and keep receipts. In the claim, separate reimbursement of those costs from fixed compensation because the legal basis may differ.",
          ],
        },
        {
          heading: "What to submit for review",
          body: [
            "Send the full itinerary, booking reference, boarding pass for every segment, airline messages, proof of actual arrival and receipts. Clearly state whether the journey was under one booking and which segment was delayed first.",
            "If European compensation is uncertain, a good claim can still request an explanation of the reason, proof of reasonable measures and reimbursement of necessary costs. That keeps the real part of the case alive even if fixed compensation is not certain.",
          ],
        },
      ],
    },
  },
  {
    id: "ryanair-flight-delay-compensation",
    publishedAt: "2026-05-05",
    updatedAt: "2026-05-05",
    sr: {
      slug: "ryanair-kasnjenje-leta-odsteta",
      title: "Ryanair kašnjenje leta: kada zahtev ima smisla",
      description: "Vodič za Ryanair kašnjenja na evropskim rutama: tri sata dolaska, direktni letovi, odvojene karte, računi i prvi odgovor aviokompanije.",
      excerpt: "Ryanair slučajevi su često direktni po ruti, ali odvojene karte i kratke konekcije mogu promeniti šta realno možete da tražite.",
      category: "Aviokompanije",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Direktni let je najčistiji slučaj",
          body: [
            "Ryanair najčešće leti kao niskotarifni prevoznik na direktnim evropskim rutama. Ako je direktni let stigao tri sata ili više kasnije, a razlog nije bio van kontrole aviokompanije, slučaj je relativno jasan za proveru kroz [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta).",
            "Iznos zavisi od udaljenosti, ne od cene karte. Jeftina karta ne znači manju fiksnu naknadu ako su uslovi ispunjeni. Zato je važno gledati rutu, vreme dolaska i razlog, a ne cenu koju ste platili.",
          ],
        },
        {
          heading: "Odvojene karte i samostalne konekcije",
          body: [
            "Kod Ryanair putovanja putnici često sami spajaju dva odvojena leta. Ako prvi let kasni i zato propustite drugi let koji nije u istoj rezervaciji, evropska zaštita je obično slabija za posledice tog drugog leta. Prvi let se procenjuje samostalno.",
            "To ne znači da nema nikakvog zahteva. Ako je prvi let stigao tri sata ili više kasnije i razlog je u sferi aviokompanije, fiksna naknada za taj let može biti moguća. Ali trošak propuštene odvojene karte često je teže naplatiti.",
          ],
        },
        {
          heading: "Razlog kašnjenja kod niskotarifnog modela",
          body: [
            "Kasna rotacija aviona, nedostatak posade, operativni problem ili tehnički kvar mogu biti važni razlozi za zahtev. Loše vreme, ograničenje kontrole letenja, zatvaranje aerodroma ili bezbednosni događaj mogu oslabiti fiksnu naknadu.",
            "Ako je razlog samo operational reasons, tražite preciziranje. Kod brzih rotacija jedan mali poremećaj može napraviti veće kašnjenje, ali kompanija i dalje treba da objasni zašto je vaš dolazak kasnio preko tri sata.",
          ],
        },
        {
          heading: "Računi i pravo na brigu",
          body: [
            "Tokom dužeg čekanja imate pravo na razumnu pomoć u skladu sa trajanjem i udaljenošću leta. Ako vam nisu dati obrok, voda ili informacije, čuvajte račune i screenshot poruka. Kod noćenja sačuvajte hotel i transfer ako ste morali sami da ih platite.",
            "U zahtevu nemojte sve staviti pod jednu reč odšteta. Napišite posebno fiksna naknada, posebno refundacija troškova. To pomaže da slučaj ostane uredan čak i ako aviokompanija osporava jedan deo.",
          ],
        },
        {
          heading: "Kako reagovati na odbijenicu",
          body: [
            "Ako Ryanair odbije zahtev kratkom formulacijom, proverite da li odgovor navodi tačan let, datum, razlog i dokaz. Ako toga nema, pošaljite dopunu sa vremenskom linijom, dokazima i pitanjem koje mere su preduzete da se kašnjenje smanji.",
            "Najbolji sledeći korak je jednostavan: sakupite dokumenta, upišite tačan dolazak i odvojite direktni let od odvojenih konekcija. Tako se brzo vidi da li je zahtev za 250, 400 ili 600 evra realan ili treba tražiti samo troškove čekanja, bez gubljenja vremena na deo puta koji pravila možda ne pokrivaju.",
          ],
        },
      ],
    },
    en: {
      slug: "ryanair-flight-delay-compensation",
      title: "Ryanair flight delay: when a claim makes sense",
      description: "A guide to Ryanair delays on European routes: three-hour arrival delay, direct flights, separate tickets, receipts and the airline's first reply.",
      excerpt: "Ryanair cases are often route-simple, but separate tickets and short self-made connections can change what you can realistically claim.",
      category: "Airlines",
      readTime: "8 min read",
      sections: [
        {
          heading: "A direct flight is the cleanest case",
          body: [
            "Ryanair often operates as a low-cost carrier on direct European routes. If a direct flight arrived three hours or more late and the reason was not outside the airline's control, the case is relatively clean to check under [flight delay compensation](/en/flight-delay-compensation).",
            "The amount depends on distance, not on ticket price. A cheap ticket does not mean lower fixed compensation if the conditions are met. Look at route, arrival time and reason, not at how much you paid.",
          ],
        },
        {
          heading: "Separate tickets and self-made connections",
          body: [
            "On Ryanair journeys, passengers often join two separate flights themselves. If the first flight is delayed and you miss a second flight that is not in the same booking, European protection is usually weaker for the consequences of that second flight. The first flight is assessed on its own.",
            "That does not mean there is no claim at all. If the first flight arrived three hours or more late and the reason was within the airline's sphere, fixed compensation for that flight may be possible. But the cost of a missed separate ticket is often harder to recover.",
          ],
        },
        {
          heading: "Delay reasons in the low-cost model",
          body: [
            "Late aircraft rotation, crew shortage, operational problem or technical fault can be important reasons for a claim. Bad weather, air traffic control restriction, airport closure or a safety event can weaken fixed compensation.",
            "If the reason is only operational reasons, ask for detail. In quick rotations one small disruption can create a larger delay, but the airline still needs to explain why your arrival was more than three hours late.",
          ],
        },
        {
          heading: "Receipts and care rights",
          body: [
            "During a longer wait, you have a right to reasonable assistance depending on duration and distance. If you were not given a meal, water or information, keep receipts and screenshots. For an overnight wait, keep hotel and transfer proof if you had to pay yourself.",
            "In the claim, do not put everything under one word, compensation. Write fixed compensation separately and expense reimbursement separately. That keeps the case organized even if the airline disputes one part.",
          ],
        },
        {
          heading: "How to react to a refusal",
          body: [
            "If Ryanair refuses the claim with short wording, check whether the answer names the exact flight, date, reason and proof. If not, send a follow-up with the timeline, evidence and a question about which measures were taken to reduce the delay.",
            "The best next step is simple: collect the documents, record the exact arrival and separate the direct flight from any separate connections. That quickly shows whether a 250, 400 or 600 euro claim is realistic or whether only waiting costs should be requested.",
          ],
        },
      ],
    },
  },
] satisfies BlogArticle[];
