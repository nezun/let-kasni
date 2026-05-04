import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "airport-strike-flight-rights": {
    src: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1600&q=82",
    alt: "Passengers waiting in a busy airport terminal during disruption",
    position: "center",
  },
  "air-traffic-control-slot-delay": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft taxiing near an airport control tower",
    position: "center",
  },
  "missed-flight-security-queue": {
    src: "https://images.unsplash.com/photo-1579689189009-874f5cac2db5?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport security queue before departure",
    position: "center",
  },
  "separate-tickets-missed-connection": {
    src: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1600&q=82",
    alt: "Traveler comparing separate flight tickets and receipts",
    position: "center",
  },
  "cancellation-under-14-days": {
    src: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1600&q=82",
    alt: "Cancelled flights shown on an airport departures board",
    position: "center",
  },
  "voluntary-denied-boarding-voucher": {
    src: "https://images.unsplash.com/photo-1521727857535-28d2047314ac?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger holding travel documents and an airline voucher",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

export const articles = [
  {
    id: "airport-strike-flight-rights",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    sr: {
      slug: "aerodromski-strajk-kasnjenje-leta-prava",
      title: "Aerodromski štrajk: šta putnik može da traži kada let kasni",
      description: "Praktičan vodič za putnike iz Srbije: razlika između štrajka aviokompanije, aerodromskog osoblja i kontrole letenja, i koja prava ostaju i kada nema fiksne odštete.",
      excerpt: "Ako štrajkuju zaposleni aviokompanije, zahtev može biti jak. Ako štrajkuje aerodrom, obezbeđenje ili kontrola letenja, fiksna odšteta je teža, ali pravo na brigu i preusmeravanje ne nestaje.",
      category: "Štrajkovi i aerodrom",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Prvo pitanje je ko štrajkuje",
          body: [
            "Putnici često čuju samo da je let pomeren zbog štrajka. To nije dovoljno za dobru procenu zahteva. Najvažnije je da li štrajkuju zaposleni aviokompanije, zaposleni aerodroma, obezbeđenje, kontrola letenja, osoblje za prtljag ili neka treća služba. Isti dan na aerodromu može izgledati haotično, ali pravno i praktično nije sve isto.",
            "Ako je uzrok štrajk zaposlenih same aviokompanije, argument putnika je obično jači jer se problem nalazi unutar organizacije prevoznika. Ako je uzrok štrajk kontrole letenja, aerodromskog obezbeđenja ili opšte zatvaranje terminala, aviokompanija će se najčešće pozvati na okolnost van svoje kontrole.",
            "Ova razlika se često svede na jednu rečenicu. Za putnike iz Srbije korisnije je odmah napraviti mapu događaja: ko je štrajkovao, na kom aerodromu, koliko dugo, šta je tačno aviokompanija ponudila i kada ste realno stigli na odredište."
          ]
        },
        {
          heading: "Kada je fiksna odšteta realna",
          body: [
            "Fiksna odšteta je realnija kada je kašnjenje ili otkazivanje nastalo zbog štrajka pilota, kabinskog osoblja, tehničara ili drugog osoblja koje radi za aviokompaniju. Tada se ne prihvata automatski argument da je sve bilo vanredno, jer kompanija organizuje sopstveni rad i snosi posledice svojih radnih odnosa.",
            "Ipak, i tu treba proveriti rutu, vreme dolaska i obaveštenje. Za kašnjenje je ključan dolazak na krajnju destinaciju tri sata ili više kasnije. Za otkazivanje je važan rok obaveštenja i ponuđena zamena. Ako je zamenski let doveo putnika skoro u isto vreme, iznos ili osnov mogu biti drugačiji.",
            "Kod putnika iz Srbije dodatno proverite da li let polazi iz EU, dolazi u EU evropskim prevoznikom, ili je deo jedne rezervacije sa evropskim segmentom. Državljanstvo putnika obično nije centralno; ruta i operativni prevoznik jesu."
          ]
        },
        {
          heading: "Kada aviokompanija ima jači izgovor",
          body: [
            "Ako je štrajk na aerodromu, kontroli letenja, graničnoj policiji, obezbeđenju ili službi za prtljag, aviokompanija često ima jači argument da nije odgovorna za fiksnu naknadu. To posebno važi kada je aerodrom ograničio rad, zatvorio pistu, smanjio broj polazaka ili uveo slotove koje prevoznik ne može da zaobiđe.",
            "To ne znači da je svaka reklamacija besmislena. Treba proveriti da li je štrajk zaista direktno pogodio vaš let, da li je kompanija mogla ranije da vas prebaci na drugi let, i da li je posle završetka štrajka nepotrebno produžila kašnjenje lošom organizacijom.",
            "Ako odgovor kompanije glasi samo strike ili airport strike, tražite preciziranje. Pitajte koja služba je štrajkovala, u kom periodu, kako je to uticalo baš na vaš let i koje su alternative proverene."
          ]
        },
        {
          heading: "Pravo na brigu ostaje posebno",
          body: [
            "Čak i kada nema osnova za fiksnu odštetu, putnik ne treba da ostane bez pomoći. Kod dužeg čekanja aviokompanija mora razumno da organizuje obroke, osveženje, komunikaciju, a kod noćenja hotel i transfer. To pravo je posebno važno kada se štrajk pretvori u višesatno čekanje bez jasnih informacija.",
            "Ako pomoć nije ponuđena, kupujte razumno i čuvajte račune. Voda, obrok, prevoz do hotela i osnovni smeštaj mnogo su lakši za pravdanje od luksuznih troškova. Sačuvajte i dokaz da ste bili na aerodromu ili da ste čekali zamenski let.",
            "U zahtevu odvojite dve linije: proveru fiksne naknade ako smatrate da štrajk nije pravi ili jedini razlog, i refundaciju nužnih troškova čekanja. Ta podela daje bolju šansu da bar deo zahteva bude rešen bez nepotrebne rasprave."
          ]
        },
        {
          heading: "Šta odmah zabeležiti",
          body: [
            "Napravite kratku vremensku liniju: kada je let trebalo da poleti, kada ste dobili prvu informaciju, šta je pisalo u poruci, kada je ponuđen novi let i kada ste stigli. Ako je na aerodromu bio opšti haos, slikajte tablu polazaka i sačuvajte objave aerodroma.",
            "Ako osoblje kaže da je problem štrajk kontrole letenja, zapišite tačnu formulaciju. Ako kaže da nema posade zbog štrajka aviokompanije, i to zapišite. Razlika između te dve rečenice može potpuno promeniti procenu.",
            "Za putnike koji presedaju, najvažnije je da li je sve bilo pod jednom rezervacijom. Ako jeste, gledajte dolazak na krajnju destinaciju. Ako nije, svaki segment se procenjuje odvojeno i zaštita može biti slabija.",
            "Ako imate samo jedan dokaz, neka to bude pisano obaveštenje aviokompanije ili aerodroma. Ako ga nema, pošaljite sebi kratak email dok ste još na aerodromu sa vremenima, izjavama osoblja i fotografijama. Takav zapis nije savršen dokaz, ali mnogo pomaže da kasnije ne rekonstruišete događaj iz sećanja."
          ]
        }
      ],
    },
    en: {
      slug: "airport-strike-flight-delay-rights",
      title: "Airport strike: what passengers can claim when a flight is delayed",
      description: "A practical guide for travelers from Serbia: the difference between airline strikes, airport staff strikes and air traffic control strikes, and which rights remain even when fixed compensation is difficult.",
      excerpt: "If airline staff are on strike, the claim may be strong. If the airport, security or air traffic control is on strike, fixed compensation is harder, but care and rerouting rights do not disappear.",
      category: "Strikes and airports",
      readTime: "8 min read",
      sections: [
        {
          heading: "The first question is who is striking",
          body: [
            "Passengers often hear only that the flight was disrupted because of a strike. That is not enough for a proper claim assessment. The key question is whether the strike involves the airline's own staff, airport employees, security, air traffic control, baggage handlers or another external service. The airport may look chaotic, but not every strike is treated the same way.",
            "If the cause is a strike by the airline's own employees, the passenger's argument is usually stronger because the problem sits inside the carrier's organization. If the cause is air traffic control, airport security or a terminal-wide restriction, the airline will usually argue that the event was outside its control.",
            "This distinction is often reduced to one sentence. For travelers from Serbia, it is more useful to map the event: who was striking, at which airport, for how long, what the airline actually offered and when you reached your final destination."
          ]
        },
        {
          heading: "When fixed compensation is realistic",
          body: [
            "Fixed compensation is more realistic when the delay or cancellation was caused by a strike by pilots, cabin crew, technicians or other staff working for the airline. In that situation, the airline cannot automatically say everything was extraordinary, because it organizes its own workforce and carries the consequences of its labor relations.",
            "Even then, the route, arrival time and notice must be checked. For delays, the key threshold is arrival at the final destination three hours or more late. For cancellations, the timing of notice and the replacement flight matter. If the alternative arrived close to the original schedule, the amount or basis may change.",
            "For travelers from Serbia, also check whether the flight departed from the EU, arrived in the EU on a European carrier, or formed part of one booking with a European segment. Passenger nationality is usually not central; route and operating carrier are."
          ]
        },
        {
          heading: "When the airline has a stronger excuse",
          body: [
            "If the strike involves airport staff, air traffic control, border police, security or baggage services, the airline often has a stronger argument against fixed compensation. That is especially true when the airport restricted operations, closed a runway, reduced departures or imposed slots the carrier could not avoid.",
            "That does not make every complaint pointless. You should still check whether the strike directly affected your flight, whether the airline could have moved you earlier to another flight, and whether poor organization after the strike extended the delay unnecessarily.",
            "If the airline response says only strike or airport strike, ask for detail. Which service was on strike, during what period, how did it affect your specific flight, and what alternative transport options were checked?"
          ]
        },
        {
          heading: "The right to care is separate",
          body: [
            "Even when fixed compensation is not available, the passenger should not be left without assistance. During longer waits, the airline must reasonably arrange meals, refreshments, communication and, if an overnight stay is required, hotel accommodation and transfer. This matters when a strike turns into hours of waiting without clear information.",
            "If assistance is not offered, spend reasonably and keep receipts. Water, a meal, transport to a hotel and basic accommodation are much easier to justify than luxury costs. Also keep proof that you were at the airport or waiting for the replacement flight.",
            "In the claim, separate two lines: review of fixed compensation if you believe the strike was not the real or only reason, and reimbursement of necessary waiting costs. That structure gives a better chance that at least part of the request is handled without unnecessary argument."
          ]
        },
        {
          heading: "What to record immediately",
          body: [
            "Create a short timeline: scheduled departure, first message, wording of the explanation, time a new flight was offered and actual arrival. If the airport was generally disrupted, photograph the departures board and save airport announcements.",
            "If staff say the issue is an air traffic control strike, write down the exact wording. If they say there is no crew because of an airline strike, write that down too. The difference between those two sentences can change the assessment entirely.",
            "For connecting passengers, the most important point is whether everything was under one booking. If it was, look at arrival at the final destination. If not, each segment is assessed separately and protection may be weaker."
          ]
        }
      ],
    },
  },
  {
    id: "air-traffic-control-slot-delay",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    sr: {
      slug: "kasnjenje-leta-zbog-slotova-kontrole-letenja",
      title: "Kašnjenje zbog slotova i kontrole letenja: kada ima smisla slati zahtev",
      description: "Šta znače ATC slot, air traffic restrictions i flow control, kako utiču na odštetu i šta putnik iz Srbije treba da pita pre nego što odustane.",
      excerpt: "ATC ograničenje često slabi zahtev za fiksnu odštetu, ali nije dovoljno da aviokompanija napiše samo slot. Važno je da li je ograničenje direktno pogodilo vaš let i kako je kompanija reagovala.",
      category: "Kontrola letenja",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Šta zapravo znači slot",
          body: [
            "Kada aviokompanija kaže da let kasni zbog slota, najčešće misli da kontrola letenja ili aerodromski sistem nije dozvolio polazak u prvobitno planiranom trenutku. Razlog može biti gužva u vazdušnom prostoru, smanjen kapacitet piste, loše vreme, štrajk, bezbednosna situacija ili lančano kašnjenje na opterećenoj ruti.",
            "Za putnika je problem što reč slot zvuči tehnički i konačno. Ipak, ona sama ne objašnjava celu priču. Treba znati ko je izdao ograničenje, kada, koliko je trajalo i da li je baš to ograničenje dovelo do kašnjenja na krajnjoj destinaciji.",
            "Kod letova iz Srbije preko evropskih čvorišta slotovi su česti jer se putovanja oslanjaju na guste mreže presedanja. Jedan pomeren polazak iz Beograda može značiti propušten let u Frankfurtu, Beču, Istanbulu ili Amsterdamu, pa posledica nije samo sat čekanja već ceo izgubljen itinerer."
          ]
        },
        {
          heading: "Zašto je ovo često van kontrole aviokompanije",
          body: [
            "Kontrola letenja nije deo aviokompanije. Ako eksterni organ smanji broj poletanja ili pomeri let zbog bezbednosti i kapaciteta, prevoznik može imati jak argument da fiksna odšteta nije dugovana. Zato se ATC restrictions često stavljaju među vanredne okolnosti.",
            "To je tačno kao početna smernica, ali nije kraj provere. Aviokompanija i dalje treba da pokaže da je ograničenje stvarno uticalo na let i da je preduzela razumne mere. Ako je slot izazvao početno kašnjenje od 40 minuta, a zatim je kompanija izgubila još četiri sata zbog sopstvene organizacije, slučaj više nije jednostavan.",
            "Zato ne prihvatajte odgovor bez vremenske linije. Pitajte kada je slot dodeljen, koliko je trajalo ograničenje i zašto nije ponuđena ranija alternativa ako je postalo jasno da ćete propustiti konekciju."
          ]
        },
        {
          heading: "Konekcije su najosetljivije",
          body: [
            "Kod jedne rezervacije, kašnjenje se često posmatra do krajnje destinacije. Ako je prvi segment kasnio zbog ATC slota i zbog toga ste propustili dalje presedanje, važno je šta je aviokompanija uradila posle toga. Najbrži razuman nastavak puta može biti ključan deo procene.",
            "Ako vas je kompanija prebacila na prvi dostupan let i stigli ste mnogo kasnije samo zato što nije bilo mesta, fiksna naknada može biti teža. Ako je bilo realnih alternativa, ali nisu proverene, ili ste ostavljeni da sami tražite rešenje, zahtev za troškove i dodatnu proveru postaje jači.",
            "Putnici iz Srbije treba posebno da čuvaju kompletan itinerer. Ako je sve kupljeno pod jednim booking reference brojem, to je važan dokaz. Ako su karte odvojene, propuštena konekcija se procenjuje strože i aviokompanija prvog leta obično ne preuzima ceo dalji rizik."
          ]
        },
        {
          heading: "Prava na brigu i informacije",
          body: [
            "ATC slot ne briše obavezu informisanja i brige. Ako čekanje traje duže, putnik treba da dobije obrok, osveženje i jasne informacije. Ako se put pomeri za naredni dan, hotel i transfer mogu biti relevantni čak i kada fiksna odšteta nije očigledna.",
            "Čuvajte račune ako pomoć nije ponuđena. Posebno su važni troškovi koji nastaju zbog propuštene konekcije: obroci, osnovni smeštaj, transfer, komunikacija i, u nekim slučajevima, razumna karta za nastavak puta ako kompanija nije obezbedila rešenje.",
            "U poruci aviokompaniji nemojte pisati samo da tražite 600 evra. Napišite da tražite obrazloženje ATC ograničenja, proveru da li su preduzete razumne mere i refundaciju konkretnih troškova koji su nastali jer pomoć nije bila obezbeđena."
          ]
        },
        {
          heading: "Kada ipak vredi proveriti zahtev",
          body: [
            "Zahtev vredi proveriti ako je objašnjenje generičko, ako je kašnjenje trajalo mnogo duže od samog slota, ako su drugi letovi iste kompanije normalno radili, ako ste propustili konekciju pod jednom rezervacijom ili ako su troškovi čekanja značajni.",
            "Takođe vredi proveriti ako je kompanija promenila razlog. Na primer, prvo je naveden slot, zatim kasna posada, zatim tehnička provera. Kombinovani razlozi nisu retki, ali ih treba razdvojiti jer samo deo kašnjenja može biti van kontrole prevoznika.",
            "Najbolji pristup je miran i precizan: ne tvrdite da ATC nije postojao ako to ne znate, već tražite dokaz direktne veze i objašnjenje mera koje su preduzete. To je mnogo ozbiljnije od opšte žalbe.",
            "Ako šaljete slučaj na proveru, dodajte i podatak da li ste imali čekirani prtljag i koliko je bilo vremena do konekcije. Kod slotova se često odlučuje na osnovu minuta, pa detalji koji deluju sitno mogu pokazati da li je prevoznik imao realnu šansu da vas prebaci na vreme."
          ]
        }
      ],
    },
    en: {
      slug: "air-traffic-control-slot-delay-compensation",
      title: "Delay due to slots and air traffic control: when a claim still makes sense",
      description: "What ATC slot, air traffic restrictions and flow control mean, how they affect compensation and what travelers from Serbia should ask before giving up.",
      excerpt: "An ATC restriction often weakens a fixed compensation claim, but the airline should not simply write slot and stop there. The key is whether the restriction directly affected your flight and how the airline reacted.",
      category: "Air traffic control",
      readTime: "8 min read",
      sections: [
        {
          heading: "What a slot actually means",
          body: [
            "When an airline says the flight was delayed because of a slot, it usually means air traffic control or the airport system did not allow departure at the originally planned time. The reason may be congestion in the airspace, reduced runway capacity, weather, a strike, a security issue or knock-on delay on a busy route.",
            "For passengers, the problem is that the word slot sounds technical and final. But it does not explain the whole story. You need to know who imposed the restriction, when, how long it lasted and whether that restriction caused the late arrival at the final destination.",
            "For flights from Serbia through European hubs, slots are common because journeys depend on dense connection networks. One shifted departure from Belgrade can mean a missed flight in Frankfurt, Vienna, Istanbul or Amsterdam, so the consequence is not just one hour of waiting but a broken itinerary."
          ]
        },
        {
          heading: "Why this is often outside the airline's control",
          body: [
            "Air traffic control is not part of the airline. If an external authority reduces departures or moves a flight for safety and capacity reasons, the carrier may have a strong argument that fixed compensation is not owed. Passenger-rights practice therefore often lists ATC restrictions as extraordinary circumstances.",
            "That is true as a starting point, but it is not the end of the check. The airline should still show that the restriction actually affected the flight and that it took reasonable measures. If the slot caused an initial 40-minute delay and the airline then lost another four hours through its own organization, the case is no longer simple.",
            "Do not accept the answer without a timeline. Ask when the slot was assigned, how long the restriction lasted and why an earlier alternative was not offered once it became clear that you would miss your connection."
          ]
        },
        {
          heading: "Connections are the most sensitive cases",
          body: [
            "Under one booking, delay is often assessed at the final destination. If the first segment was delayed due to an ATC slot and you missed an onward connection, what the airline did next matters. The fastest reasonable continuation of travel can become a key part of the assessment.",
            "If the airline moved you to the first available flight and you arrived much later only because there were no seats, fixed compensation may be harder. If realistic alternatives existed but were not checked, or you were left to solve the trip yourself, a cost claim and further review become stronger.",
            "Travelers from Serbia should keep the full itinerary. If everything was bought under one booking reference, that is important evidence. If tickets were separate, the missed connection is assessed more strictly and the first airline usually does not carry the entire onward risk."
          ]
        },
        {
          heading: "Rights to care and information",
          body: [
            "An ATC slot does not remove the duty to inform and assist. If the wait is long, passengers should receive meals, refreshments and clear information. If travel moves to the next day, hotel accommodation and transfer may matter even when fixed compensation is not obvious.",
            "Keep receipts if assistance is not offered. Costs caused by a missed connection are especially important: meals, basic accommodation, transfer, communication and, in some cases, a reasonable onward ticket if the airline failed to provide a solution.",
            "In your message to the airline, do not write only that you want 600 euros. Write that you request an explanation of the ATC restriction, a review of whether reasonable measures were taken and reimbursement of specific costs caused because assistance was not provided."
          ]
        },
        {
          heading: "When the claim is still worth checking",
          body: [
            "The claim is worth checking if the explanation is generic, if the delay lasted much longer than the slot itself, if other flights by the same airline operated normally, if you missed a connection under one booking or if waiting costs were significant.",
            "It is also worth checking if the airline changed the reason. For example, first it mentioned a slot, then late crew, then a technical inspection. Mixed causes are common, but they need to be separated because only part of the delay may be outside the carrier's control.",
            "The best approach is calm and precise: do not claim the ATC restriction did not exist if you do not know that, but ask for proof of the direct link and an explanation of the measures taken. That is much stronger than a general complaint."
          ]
        }
      ],
    },
  },
  {
    id: "missed-flight-security-queue",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    sr: {
      slug: "propusten-let-zbog-reda-na-kontroli",
      title: "Propustili ste let zbog reda na kontroli: šta možete realno da tražite",
      description: "Vodič za situacije kada putnik stigne na aerodrom, ali propusti let zbog bezbednosne, pasoške ili check-in gužve.",
      excerpt: "Ako ste zakasnili na gate zbog reda na security ili pasoškoj kontroli, fiksna odšteta od aviokompanije obično nije jednostavna. Ali refundacija, nova karta i odgovornost aerodroma zavise od detalja.",
      category: "Aerodromska procedura",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Ovo nije klasično kašnjenje leta",
          body: [
            "Kada putnik propusti let jer je red na security, pasoškoj kontroli ili check-in šalteru bio predug, situacija se razlikuje od kašnjenja koje je izazvala aviokompanija. Let može poleteti na vreme, a putnik ipak ne stiže do gejta. Zato fiksna odšteta za kašnjenje leta obično nije prvi i najjači osnov.",
            "Aviokompanija će najčešće proveriti da li ste se pojavili na vreme, da li ste imali validna dokumenta i da li je boarding zatvoren po pravilima. Ako ste došli kasno, zahtev je slab. Ako ste došli razumno rano, a aerodromska procedura je bila neuobičajeno spora, slučaj postaje praktično složeniji.",
            "Konkurentski sajtovi više pišu o propuštenoj konekciji zbog kasnog prvog leta. Ovde je problem drugačiji: prvi let nije kasnio, nego putnik nije prošao aerodromsku proceduru. Zato treba razdvojiti odgovornost aviokompanije, aerodroma i samog putnika."
          ]
        },
        {
          heading: "Dokaz dolaska na aerodrom je ključan",
          body: [
            "Najvažnije je dokazati kada ste stigli. Sačuvajte parking račun, taksi aplikaciju, račun sa aerodroma, fotografiju table, screenshot lokacije, vreme predaje prtljaga ili bilo koji trag koji pokazuje da niste došli u poslednjem trenutku.",
            "Ako je red bio ekstreman, fotografišite ga bez ometanja procedure. Sačuvajte objave aerodroma, poruke o gužvi i eventualne javne informacije. Ako je bilo više putnika koji su propustili isti let, zapišite to jer pokazuje da problem možda nije bio individualan.",
            "Kod letova iz Beograda, Niša ili evropskih aerodroma sa kojih nastavljate put, bitno je i šta piše u uslovima aviokompanije: kada se zatvara check-in, kada se zatvara boarding, i koliko ranije preporučuju dolazak. Preporuka nije uvek strogo pravilo, ali pomaže u proceni."
          ]
        },
        {
          heading: "Kada je aviokompanija ipak relevantna",
          body: [
            "Ako je red nastao na check-in šalteru aviokompanije ili njenog handling agenta, argument može biti drugačiji. Na primer, ako je radilo premalo šaltera, sistem je pao, prtljag se primao sporo ili su putnici čekali instrukcije osoblja, to više nije samo security problem.",
            "Takođe je relevantno da li je boarding zatvoren dok je aviokompanija znala da veći broj putnika čeka u istoj proceduri. Kompanija ne mora beskonačno držati avion, ali u nekim situacijama njeno postupanje može biti predmet prigovora.",
            "Ako ste već bili čekirani online i imali samo ručni prtljag, a propustili ste let zbog pasoške ili bezbednosne kontrole, zahtev prema aviokompaniji je obično teži. Tada više smisla ima tražiti rebooking opcije, proveriti tarifu i eventualno se obratiti aerodromu."
          ]
        },
        {
          heading: "Šta tražiti umesto fiksne odštete",
          body: [
            "Praktičan cilj često nije fiksna odšteta nego smanjenje štete: prebacivanje na sledeći let, povraćaj taksi, delimičan refund neiskorišćenih segmenata ili dokument koji potvrđuje zašto niste ukrcani. Ako ste kupili novu kartu, čuvajte račun i obrazložite zašto je kupovina bila nužna.",
            "Ako je problem izazvao aerodrom, proverite proceduru za žalbe aerodroma. Aerodromi obično nemaju isti režim fiksne naknade kao aviokompanije, ali mogu obrađivati prigovore zbog organizacije, asistencije, obaveštenja ili posebnih okolnosti.",
            "Ako ste putovali paket aranžmanom, proverite i organizatora putovanja. Ako je transfer zakasnio ili instrukcije nisu bile tačne, odgovornost se može nalaziti izvan aviokompanije."
          ]
        },
        {
          heading: "Kako napisati prigovor",
          body: [
            "Napišite kratku hronologiju: kada ste stigli na aerodrom, kada ste ušli u red, kada ste stigli do kontrole, kada je boarding zatvoren i kome ste se obratili. Dodajte dokaze i tražite konkretan ishod, na primer refundaciju taksi, potvrdu no-show statusa ili razmatranje troška nove karte.",
            "Nemojte tvrditi da imate automatsko pravo na 600 evra ako let nije kasnio i ako niste bili na gejtu. Takav zahtev kompanija lako odbija. Bolje je fokusirati se na realan propust u organizaciji i troškove koji su nastali.",
            "Za buduće letove, najviše automatizacije pomaže u pripremi: online check-in, screenshot boarding pass-a, praćenje airport alerts, dolazak ranije kod sezonskih gužvi i čuvanje digitalnih tragova. Ako do problema dođe, ti tragovi postaju dokazni paket.",
            "Ako je druga karta propala jer niste stigli na prvi let, nemojte sve slati samo prvoj aviokompaniji. Odvojeno proverite tarifu druge karte, putno osiguranje i pravila aerodroma. U ovakvim slučajevima rešenje često dolazi iz kombinacije manjih refundacija, a ne iz jedne velike naknade."
          ]
        }
      ],
    },
    en: {
      slug: "missed-flight-security-queue-rights",
      title: "Missed your flight because of a security queue: what can you realistically claim",
      description: "A guide for situations where a passenger reaches the airport but misses the flight because of security, passport control or check-in queues.",
      excerpt: "If you reached the gate late because of security or passport control queues, fixed airline compensation is usually not straightforward. Refunds, new tickets and airport responsibility depend on the details.",
      category: "Airport procedure",
      readTime: "8 min read",
      sections: [
        {
          heading: "This is not a classic flight delay",
          body: [
            "When a passenger misses a flight because the security, passport control or check-in queue was too long, the situation differs from a delay caused by the airline. The flight may depart on time while the passenger does not reach the gate. Fixed compensation for flight delay is therefore usually not the first or strongest basis.",
            "The airline will usually check whether you appeared on time, had valid documents and whether boarding closed according to the rules. If you arrived late, the claim is weak. If you arrived reasonably early and the airport procedure was unusually slow, the case becomes more practically complex.",
            "Competitor sites write more about missed connections caused by a late first flight. This problem is different: the first flight was not delayed, but the passenger did not clear airport procedure. That is why airline, airport and passenger responsibility must be separated."
          ]
        },
        {
          heading: "Proof of arrival at the airport is key",
          body: [
            "The most important point is proving when you arrived. Keep the parking receipt, taxi app record, airport receipt, photo of the departures board, location screenshot, bag-drop time or any record showing you did not arrive at the last minute.",
            "If the queue was extreme, photograph it without disrupting the process. Save airport announcements, queue alerts and public information. If several passengers missed the same flight, note that because it may show the issue was not individual.",
            "For flights from Belgrade, Nis or European airports where you continue your journey, airline conditions also matter: check-in closing time, boarding closing time and recommended arrival time. A recommendation is not always a strict rule, but it helps assessment."
          ]
        },
        {
          heading: "When the airline is still relevant",
          body: [
            "If the queue was at the airline check-in desk or its handling agent, the argument may be different. For example, too few desks, a system outage, slow bag drop or passengers waiting for staff instructions may no longer be only a security issue.",
            "It also matters whether boarding was closed while the airline knew many passengers were stuck in the same procedure. The airline does not have to hold the aircraft indefinitely, but in some situations its handling can be challenged.",
            "If you were already checked in online and had only hand luggage, but missed the flight because of passport or security control, the airline claim is usually harder. It then makes more sense to request rebooking options, check the fare rules and consider an airport complaint."
          ]
        },
        {
          heading: "What to ask for instead of fixed compensation",
          body: [
            "The practical goal is often not fixed compensation but damage reduction: transfer to the next flight, refund of taxes, partial refund of unused segments or a document confirming why you were not boarded. If you bought a new ticket, keep the receipt and explain why the purchase was necessary.",
            "If the airport caused the problem, check the airport complaints procedure. Airports usually do not operate under the same fixed compensation system as airlines, but they may handle complaints about organization, assistance, information or special circumstances.",
            "If you travelled as part of a package, check the travel organizer as well. If a transfer was late or instructions were inaccurate, responsibility may sit outside the airline."
          ]
        },
        {
          heading: "How to write the complaint",
          body: [
            "Write a short chronology: when you arrived at the airport, when you joined the queue, when you reached control, when boarding closed and whom you contacted. Add evidence and ask for a concrete outcome, such as tax refund, confirmation of no-show status or review of the new ticket cost.",
            "Do not claim an automatic right to 600 euros if the flight was not delayed and you were not at the gate. That claim is easy for the airline to reject. It is better to focus on a real organizational failure and the costs caused by it.",
            "For future flights, automation helps most in preparation: online check-in, screenshot of the boarding pass, monitoring airport alerts, earlier arrival during seasonal congestion and keeping digital traces. If trouble happens, those traces become the evidence pack."
          ]
        }
      ],
    },
  },
  {
    id: "separate-tickets-missed-connection",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    sr: {
      slug: "odvojene-karte-propustena-konekcija",
      title: "Odvojene karte i propuštena konekcija: najveći rizik koji putnici potcene",
      description: "Zašto put Beograd-Beč-Njujork nije uvek jedna pravna celina ako su karte kupljene odvojeno, i šta putnik može da uradi kada prvi let zakasni.",
      excerpt: "Ako su segmenti pod jednom rezervacijom, kašnjenje se često meri do krajnje destinacije. Ako su karte odvojene, drugi let može biti vaš sopstveni rizik.",
      category: "Konekcije",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Jedno putovanje nije uvek jedna rezervacija",
          body: [
            "Putnik može u glavi imati jedno putovanje: Beograd-Beč-Njujork, Niš-Istanbul-Dubai ili Beograd-Rim-Madrid. Ali ako su segmenti kupljeni odvojeno, aviokompanije ih često tretiraju kao posebne ugovore. To je najveća razlika kod propuštenih konekcija.",
            "Kod jedne rezervacije, ako prvi let kasni i zato propustite drugi, procena se obično pomera na dolazak na krajnju destinaciju. Kod odvojenih karata, prva aviokompanija može reći da je njen ugovor završen dolaskom na prvi aerodrom, čak i ako ste zbog toga izgubili skuplji drugi let.",
            "Uobičajeni vodiči često naglase single booking uslov, ali putnici iz Srbije često kupuju kombinacije low-cost i long-haul karata jer su jeftinije. Zato je ova tema praktično važna pre kupovine, ne tek kada nastane problem."
          ]
        },
        {
          heading: "Kako proveriti šta imate",
          body: [
            "Pogledajte booking reference. Ako svi segmenti imaju isti kod rezervacije, istu kartu ili su prikazani kao jedan itinerer kod jednog prodavca, moguće je da imate jedinstvenu rezervaciju. Ako imate dva potpuno odvojena koda, dve naplate i dva check-in procesa, rizik je verovatno odvojen.",
            "Neki online posrednici prave kombinovana putovanja koja izgledaju kao jedna kupovina, ali u pozadini izdaju odvojene karte. Tada njihova garancija ili uslovi posrednika mogu biti važniji od standardnih prava prema aviokompaniji.",
            "Sačuvajte potvrdu kupovine i uslove. Ako piše self-transfer, separate tickets ili protected by agency guarantee, to su bitni signali. Self-transfer obično znači da sami preuzimate prtljag, ponovo se čekirate i snosite veći rizik ako prvi let zakasni."
          ]
        },
        {
          heading: "Šta ako prvi let kasni",
          body: [
            "Ako prvi let kasni tri sata ili više na svom odredištu, možda možete tražiti naknadu za taj segment ako je pokriven evropskim pravilima i ako uzrok nije vanredan. Ali to ne znači automatski da će aviokompanija platiti novi transatlantski let koji ste odvojeno kupili.",
            "Ako kašnjenje prvog leta nije dostiglo prag, ali je bilo dovoljno da propustite drugu kartu, situacija je još teža. Iz ugla prve aviokompanije, ona je možda isporučila segment sa manjim kašnjenjem, dok je za vas posledica ogromna zbog kratkog self-transfer vremena.",
            "Zato kod odvojenih karata dokazi treba da budu precizni: vreme dolaska, vreme izlaska iz aviona, vreme preuzimanja prtljaga, zatvaranje check-in-a za drugi let i svaka pomoć koju ste tražili."
          ]
        },
        {
          heading: "Kada posrednik ili osiguranje mogu pomoći",
          body: [
            "Ako ste karte kupili preko posrednika koji nudi zaštitu konekcije, odmah proverite uslove. Neki posrednici pokrivaju novi let, hotel ili refundaciju samo ako ih kontaktirate pre samostalne kupovine. Ako prvo kupite novu kartu, a tek onda prijavite problem, mogu odbiti deo troška.",
            "Putno osiguranje ponekad pokriva missed departure ili missed connection, ali uslovi su strogi. Traži se minimalno vreme za presedanje, dokaz o kašnjenju javnog prevoza ili leta, i računi za dodatne troškove.",
            "Ako nemate takvu zaštitu, cilj je smanjenje štete: proverite tarifu druge karte, tražite promenu uz doplatu, čuvajte dokaz da ste pokušali da stignete i dokumentujte zašto nova kupovina nije mogla da čeka."
          ]
        },
        {
          heading: "Kako ubuduće smanjiti rizik",
          body: [
            "Najbolja automatizacija je u planiranju. Za self-transfer ostavite mnogo duži razmak, posebno ako menjate terminal, prelazite pasošku kontrolu, preuzimate prtljag ili putujete u sezoni. Sat i po na papiru često nije dovoljno ako prvi let kasni samo 40 minuta.",
            "Koristite jednu rezervaciju kad je drugi segment skup ili poslovno važan. Ako birate odvojene karte zbog cene, uračunajte cenu rizika: dodatni hotel, nova karta, izgubljen dan i stres. Jeftinija kombinacija nije uvek jeftinija ako nema zaštitu.",
            "Za postojeći problem, pošaljite zahtev strukturisano: odvojeno naknada za prvi segment, odvojeno troškovi zbog propuštenog drugog leta, odvojeno zahtev posredniku ili osiguranju. Mešanje svega u jedan zahtev najčešće usporava odgovor.",
            "Ako tek kupujete karte, napravite jednostavno pravilo: što je dalje odredište skuplje, to manje ima smisla štedeti na rizično kratkoj odvojenoj konekciji. Ta odluka nije pravna, nego finansijska; cilj je da potencijalni gubitak ne bude veći od uštede.",
            "Ako ste već u problemu, ne čekajte da svi rokovi prođu. Isti dan prikupite potvrdu o kašnjenju prvog leta, cenu nove karte i odgovor posrednika. Kasnije je mnogo teže dokazati da je kupovina bila razumna i da niste imali bolju opciju."
          ]
        }
      ],
    },
    en: {
      slug: "separate-tickets-missed-connection-rights",
      title: "Separate tickets and a missed connection: the risk passengers underestimate",
      description: "Why Belgrade-Vienna-New York is not always one legal journey if tickets were bought separately, and what a passenger can do when the first flight is delayed.",
      excerpt: "If segments are under one booking, delay is often measured to the final destination. If tickets are separate, the second flight may be your own risk.",
      category: "Connections",
      readTime: "8 min read",
      sections: [
        {
          heading: "One trip is not always one booking",
          body: [
            "A passenger may think of one journey: Belgrade-Vienna-New York, Nis-Istanbul-Dubai or Belgrade-Rome-Madrid. But if the segments were bought separately, airlines often treat them as separate contracts. That is the biggest difference in missed connection cases.",
            "Under one booking, if the first flight is delayed and you miss the second, the assessment usually moves to arrival at the final destination. With separate tickets, the first airline may say its contract ended at the first airport, even if you lost a more expensive second flight as a result.",
            "Passenger-rights guides often mention the single booking condition, but travelers from Serbia frequently combine low-cost and long-haul tickets because it is cheaper. This topic is therefore important before purchase, not only after a problem happens."
          ]
        },
        {
          heading: "How to check what you have",
          body: [
            "Look at the booking reference. If all segments have the same reservation code, the same ticket or appear as one itinerary with one seller, you may have a single booking. If you have two completely separate codes, two payments and two check-in processes, the risk is probably separate.",
            "Some online agencies create combined trips that look like one purchase but issue separate tickets in the background. In that case, the agency guarantee or its terms may matter more than standard airline rights.",
            "Save the purchase confirmation and terms. If it says self-transfer, separate tickets or protected by agency guarantee, those are important signals. Self-transfer usually means you collect baggage yourself, check in again and carry a higher risk if the first flight is delayed."
          ]
        },
        {
          heading: "What if the first flight is delayed",
          body: [
            "If the first flight arrives three hours or more late at its own destination, you may be able to claim compensation for that segment if it is covered by European rules and the cause was not extraordinary. But that does not automatically mean the airline will pay for the separate transatlantic flight you lost.",
            "If the first delay did not reach the threshold but was enough for you to miss the second ticket, the situation is even harder. From the first airline's perspective, it may have delivered its segment with a smaller delay, while the consequence for you was huge because of short self-transfer time.",
            "That is why evidence for separate-ticket cases must be precise: arrival time, time leaving the aircraft, baggage collection time, check-in closing time for the second flight and every request for help you made."
          ]
        },
        {
          heading: "When an agency or insurance can help",
          body: [
            "If you bought tickets through an agency that offers connection protection, check the terms immediately. Some agencies cover a new flight, hotel or refund only if you contact them before buying anything yourself. If you buy a new ticket first and report later, they may reject part of the cost.",
            "Travel insurance sometimes covers missed departure or missed connection, but conditions are strict. It may require a minimum connection time, proof of delay by public transport or flight, and receipts for additional costs.",
            "If you have no such protection, the goal is damage reduction: check the fare rules of the second ticket, request a change with fee, keep proof that you tried to arrive and document why buying a new ticket could not wait."
          ]
        },
        {
          heading: "How to reduce the risk next time",
          body: [
            "The best automation is in planning. For self-transfer, leave a much longer gap, especially if you change terminal, pass passport control, collect baggage or travel in peak season. Ninety minutes on paper is often not enough if the first flight is only 40 minutes late.",
            "Use one booking when the second segment is expensive or business-critical. If you choose separate tickets because of price, include the cost of risk: extra hotel, new ticket, lost day and stress. The cheaper combination is not always cheaper if there is no protection.",
            "For an existing problem, structure the claim: compensation for the first segment separately, costs caused by the missed second flight separately, and agency or insurance claim separately. Mixing everything into one request usually slows the answer."
          ]
        }
      ],
    },
  },
  {
    id: "cancellation-under-14-days",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    sr: {
      slug: "otkazan-let-manje-od-14-dana-prava",
      title: "Let otkazan manje od 14 dana ranije: kako proveriti odštetu i zamenski let",
      description: "Šta znači rok od 14 dana, kada zamenski let smanjuje ili uklanja odštetu, i kako putnik iz Srbije treba da dokumentuje otkazivanje.",
      excerpt: "Kod otkazivanja nije dovoljno znati da je let otkazan. Bitno je kada ste obavešteni, kakav je zamenski let ponuđen i koliko se novo vreme razlikuje od prvobitnog plana.",
      category: "Otkazivanje",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Rok obaveštenja je prvi filter",
          body: [
            "Ako je let otkazan manje od 14 dana pre polaska, slučaj vredi proveriti. Evropska pravila ne gledaju samo činjenicu otkazivanja, već i kada je putnik obavešten i kakva alternativa je ponuđena. Zato email, SMS ili notifikacija iz aplikacije postaju ključni dokaz.",
            "Ako ste obavešteni više od 14 dana ranije, fiksna odšteta je obično teža, ali i dalje možete imati pravo na refundaciju karte ili preusmeravanje. Ako ste obavešteni u poslednjoj nedelji, posebno na dan leta, provera odštete je mnogo važnija.",
            "U praksi se često navodi pravilo 14 dana, ali putnici iz Srbije treba da dodaju još dva pitanja: da li ruta spada u evropsku zaštitu i da li je zamenski let realno omogućio putovanje bez velikog gubitka vremena."
          ]
        },
        {
          heading: "Zamenski let može promeniti iznos",
          body: [
            "Aviokompanija može ponuditi zamenski let koji polazi ili stiže blizu prvobitnog plana. U nekim situacijama to smanjuje ili uklanja fiksnu naknadu. Zato nije dovoljno napisati moj let je otkazan; treba uporediti stari i novi raspored.",
            "Zabeležite planirano vreme polaska i dolaska otkazanog leta, vreme obaveštenja, ponuđenu alternativu, stvarni dolazak i da li ste alternativu prihvatili. Ako je ponuđena opcija bila nepraktična, na primer sa noćenjem ili mnogo kasnijim dolaskom, napišite zašto.",
            "Ako kompanija nije ponudila razuman zamenski let, a vi ste morali sami da kupite kartu, čuvajte račun. Refundacija samostalno kupljene karte nije automatska u svakom iznosu, ali je mnogo jača ako se vidi da ste prvo tražili rešenje od aviokompanije."
          ]
        },
        {
          heading: "Refundacija i odšteta nisu isto",
          body: [
            "Putnici često pomešaju povraćaj cene karte i fiksnu odštetu. Refundacija znači vraćanje novca za uslugu koju niste koristili ili deo putovanja koji više nema smisla. Fiksna odšteta je dodatni iznos kada su ispunjeni uslovi odgovornosti prevoznika.",
            "Možete imati pravo na refundaciju čak i kada nema fiksne odštete, na primer ako je otkazivanje izazvano vanrednim okolnostima. Obrnuto, možete prihvatiti preusmeravanje i i dalje proveriti da li postoji osnov za fiksnu naknadu zbog kasnog obaveštenja i velikog pomeranja.",
            "U zahtevu zato razdvojite: tražim refundaciju neiskorišćene karte ili troškova, i tražim proveru fiksne naknade zbog otkazivanja manje od 14 dana ranije. Jasna struktura smanjuje šansu da korisnička podrška odgovori samo na pola problema."
          ]
        },
        {
          heading: "Vanredne okolnosti i dalje mogu biti sporne",
          body: [
            "Ako je otkazivanje posledica lošeg vremena, zatvaranja aerodroma, ATC ograničenja, bezbednosnog rizika ili štrajka aerodromskog osoblja, aviokompanija može odbiti fiksnu odštetu. Ali treba da objasni šta se desilo i zašto nije bilo razumnog načina da se posledice smanje.",
            "Ako je razlog tehnički kvar, nedostatak posade, organizacioni problem ili štrajk zaposlenih aviokompanije, zahtev može biti jači. Ne prihvatajte generički operational reasons bez dodatnog objašnjenja.",
            "Putnik ne mora dokazivati sve iznutra. Dovoljno je da traži precizan razlog, priloži dokumente i pokaže posledicu. Teret objašnjenja za vanredne okolnosti ne treba potpuno da se prebaci na putnika."
          ]
        },
        {
          heading: "Minimalni paket dokaza",
          body: [
            "Sačuvajte originalnu kartu, obaveštenje o otkazivanju, ponuđenu alternativu, boarding pass za zamenski let, račune za hotel, hranu, transfer i novu kartu ako ste je sami kupili. Ako ste razgovarali telefonom, zapišite vreme poziva i sažetak odgovora.",
            "Ako je put bio pod jednom rezervacijom sa konekcijom, sačuvajte ceo itinerer. Otkazivanje prvog segmenta može uticati na krajnju destinaciju i iznos. Ako su karte odvojene, to odmah navedite jer menja procenu.",
            "Najbolji zahtev je kratak, ali potpun: broj leta, datum, ruta, vreme obaveštenja, ponuđeni zamenski let, stvarni dolazak, traženi ishod i prilozi. To je format koji se lako automatizuje i kasnije koristi u admin obradi.",
            "Ako niste sigurni da li je obaveštenje stiglo na vreme, proverite inbox, spam, aplikaciju i SMS log. Vreme kada je kompanija poslala poruku može biti drugačije od vremena kada ste je vi videli, pa je korisno sačuvati ceo header emaila ili screenshot notifikacije.",
            "Ako je otkazivanje pokvarilo hotel, transfer ili događaj, te troškove navedite odvojeno i priložite račune. Nisu svi posledični troškovi automatski naplativi od aviokompanije, ali uredan spisak pomaže da se vidi šta je direktno nastalo zbog otkazivanja."
          ]
        }
      ],
    },
    en: {
      slug: "flight-cancelled-less-than-14-days-rights",
      title: "Flight cancelled less than 14 days before departure: how to check compensation and replacement flights",
      description: "What the 14-day notice period means, when a replacement flight reduces or removes compensation, and how travelers from Serbia should document cancellation.",
      excerpt: "For cancellations, it is not enough to know that the flight was cancelled. The key is when you were notified, what replacement flight was offered and how much the new timing differed from the original plan.",
      category: "Cancellation",
      readTime: "8 min read",
      sections: [
        {
          heading: "Notice timing is the first filter",
          body: [
            "If the flight was cancelled less than 14 days before departure, the case is worth checking. European rules look not only at the cancellation itself, but also at when the passenger was informed and what alternative was offered. That makes the email, SMS or app notification key evidence.",
            "If you were informed more than 14 days earlier, fixed compensation is usually harder, but you may still have the right to ticket refund or rerouting. If you were informed in the final week, especially on the day of travel, a compensation check becomes much more important.",
            "Passenger-rights guides often state the 14-day rule, but travelers from Serbia should add two more questions: whether the route falls under European protection and whether the replacement flight allowed travel without a major loss of time."
          ]
        },
        {
          heading: "A replacement flight can change the amount",
          body: [
            "The airline may offer a replacement flight that departs or arrives close to the original plan. In some situations, that reduces or removes fixed compensation. It is therefore not enough to write my flight was cancelled; you need to compare the old and new schedules.",
            "Record the scheduled departure and arrival of the cancelled flight, notification time, proposed alternative, actual arrival and whether you accepted the alternative. If the proposed option was impractical, for example requiring an overnight stay or arriving much later, explain why.",
            "If the airline did not offer a reasonable replacement and you had to buy a ticket yourself, keep the receipt. Reimbursement of a self-purchased ticket is not automatic in every amount, but it is much stronger if it is clear you first asked the airline for a solution."
          ]
        },
        {
          heading: "Refund and compensation are not the same",
          body: [
            "Passengers often mix ticket refund and fixed compensation. Refund means returning money for a service you did not use or a part of the journey that no longer makes sense. Fixed compensation is an additional amount when the conditions for carrier responsibility are met.",
            "You may have a right to refund even when there is no fixed compensation, for example if cancellation was caused by extraordinary circumstances. Conversely, you may accept rerouting and still check whether fixed compensation is due because of late notice and a major time change.",
            "Separate the request: I ask for refund of the unused ticket or costs, and I ask for review of fixed compensation because cancellation was notified less than 14 days before departure. Clear structure reduces the chance customer support answers only half the problem."
          ]
        },
        {
          heading: "Extraordinary circumstances can still be disputed",
          body: [
            "If cancellation was caused by bad weather, airport closure, ATC restrictions, security risk or an airport staff strike, the airline may reject fixed compensation. But it should explain what happened and why there was no reasonable way to reduce the impact.",
            "If the reason was a technical fault, lack of crew, organizational issue or strike by airline employees, the claim may be stronger. Do not accept generic operational reasons without further explanation.",
            "The passenger does not need to prove everything from inside the airline. It is enough to ask for the precise reason, attach documents and show the consequence. The burden of explaining extraordinary circumstances should not be pushed entirely onto the passenger."
          ]
        },
        {
          heading: "Minimum evidence pack",
          body: [
            "Keep the original ticket, cancellation notice, proposed alternative, boarding pass for the replacement flight, receipts for hotel, food, transfer and any new ticket you bought yourself. If you spoke by phone, write down the call time and a short summary of the answer.",
            "If the trip was under one booking with a connection, keep the full itinerary. Cancellation of the first segment can affect the final destination and amount. If tickets were separate, state that immediately because it changes the assessment.",
            "The best claim is short but complete: flight number, date, route, notification time, replacement flight offered, actual arrival, requested outcome and attachments. That format is easy to automate and later use in admin review."
          ]
        }
      ],
    },
  },
  {
    id: "voluntary-denied-boarding-voucher",
    publishedAt: "2026-05-03",
    updatedAt: "2026-05-03",
    sr: {
      slug: "dobrovoljno-odustajanje-od-leta-vaucer",
      title: "Dobrovoljno odustajanje od sedišta: pre nego što prihvatite vaučer",
      description: "Šta znači kada aviokompanija traži volontere zbog overbookinga, koja prava se razlikuju od prisilnog uskraćivanja ukrcavanja i šta treba tražiti napismeno.",
      excerpt: "Ako dobrovoljno prihvatite vaučer i kasniji let, možda se odričete dela prava koja biste imali da ste prisilno odbijeni na ukrcavanju. Uslovi moraju biti jasni pre nego što kažete da.",
      category: "Overbooking",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Volonter i odbijeni putnik nisu isto",
          body: [
            "Kada je let overbooked, aviokompanija najpre može tražiti volontere koji će odustati od mesta u zamenu za novac, vaučer, milje, hotel ili kasniji let. Ako se dobrovoljno javite i prihvatite dogovor, vaša situacija nije ista kao kod putnika kome je ukrcavanje prisilno uskraćeno.",
            "Kod prisilnog uskraćivanja ukrcavanja, evropska pravila mogu dati pravo na fiksnu naknadu, izbor između refundacije i preusmeravanja, kao i brigu. Kod dobrovoljnog odustajanja, centralno je šta ste dogovorili sa aviokompanijom. Zato uslovi moraju biti jasni pre nego što prihvatite.",
            "Uobičajeni vodiči često objašnjavaju overbooking kroz iznos od 250, 400 ili 600 evra. Za realan aerodromski trenutak korisnije je znati šta pitati dok ste još na gejtu, pre nego što vaučer izgleda kao brza pobeda."
          ]
        },
        {
          heading: "Šta mora biti jasno pre pristanka",
          body: [
            "Tražite napismeno: vrednost vaučera ili novca, rok važenja, ograničenja korišćenja, novi let, vreme dolaska, hotel ako postoji noćenje, obroke, transfer, prtljag i da li prihvatanjem odustajete od dodatnih zahteva. Usmeni dogovor na gejtu kasnije je teško dokazati.",
            "Vaučer nije isto što i novac. Može imati rok, zabranu prenosa, minimalnu cenu, ograničene rute ili nemogućnost korišćenja za takse i doplate. Ako ne letite često tom kompanijom, gotovina ili refundabilna forma mogu biti vredniji od većeg nominalnog vaučera.",
            "Ako putujete iz Srbije ili preko EU čvorišta, proverite i posledice za konekciju, hotel i obaveze na odredištu. Vaučer od 300 evra nije dobar ako zbog njega gubite skuplji drugi segment ili poslovni događaj."
          ]
        },
        {
          heading: "Kada ne treba žuriti",
          body: [
            "Ne žurite ako ne znate kada tačno stižete, da li je novi let potvrđen i šta se dešava sa prtljagom. Ako imate konekciju pod jednom rezervacijom, pitajte da li će ceo itinerer biti zaštićen. Ako imate odvojene karte, rizik je veći i treba ga uračunati u dogovor.",
            "Ako aviokompanija ne nađe dovoljno volontera i zatim vas prisilno odbije, tada se otvara drugačiji skup prava. Zato je važno ne potpisati ili kliknuti pristanak ako zapravo ne razumete šta prihvatate.",
            "Posebno pazite na formulacije final settlement, full and final compensation ili waiver. One mogu značiti da kompanija smatra da ste se odrekli dodatnih zahteva. Ako niste sigurni, tražite objašnjenje pre prihvatanja."
          ]
        },
        {
          heading: "Briga tokom čekanja i dalje je deo dogovora",
          body: [
            "Ako prihvatite kasniji let, dogovor treba da pokrije čekanje. Obrok, osveženje, hotel i transfer nisu samo ljubaznost ako vas kompanija pomera za mnogo kasnije ili za sutradan. Ako to nije jasno navedeno, pitajte odmah.",
            "Sačuvajte boarding pass starog i novog leta, vaučer, email potvrdu, račune i ime ili šalter gde je dogovor napravljen. Ako se kasnije ispostavi da vaučer ne radi ili novi let nije potvrđen, ti dokazi su jedini način da se problem brzo objasni.",
            "Ako ste pristali pod pritiskom ili bez jasnih informacija, i dalje možete poslati prigovor, ali dokazivanje je teže. Najbolja zaštita je da u trenutku odluke tražite pisani sažetak uslova."
          ]
        },
        {
          heading: "Kako odlučiti da li je ponuda dobra",
          body: [
            "Uporedite vrednost ponude sa realnim gubitkom vremena, obavezama, dodatnim troškovima i alternativama. Za fleksibilnog putnika koji nema konekciju, vaučer plus hotel može biti dobar. Za putnika koji gubi važan sastanak ili skupu odvojenu kartu, ista ponuda može biti loša.",
            "Ako ponuda nije dovoljna, možete pitati za bolju. Aviokompanije ponekad povećavaju iznos ako nema dovoljno volontera. Budite konkretni: prihvatiću ako je novi let potvrđen, hotel uključen i kompenzacija isplaćena u novcu.",
            "Za automatizovanu obradu zahteva najvažnije je da postoji dokaz pristanka i uslova. Bez toga se kasniji slučaj pretvara u raspravu o tome šta je rečeno na gejtu, a to je najsporiji mogući format.",
            "Ako putujete sa porodicom, računajte vrednost po putniku, ne po rezervaciji. Ponuda koja izgleda solidno za jednu osobu može biti slaba ako četvoro ljudi gubi dan, plaća dodatne obroke i menja dalji plan puta.",
            "Ako ponudu prihvata samo deo grupe, proverite šta se dešava sa zajedničkim prtljagom i daljim segmentima. Nekad jedan putnik ostaje na prvobitnom letu, drugi ide kasnije, a cela rezervacija postaje operativno komplikovana."
          ]
        }
      ],
    },
    en: {
      slug: "voluntary-denied-boarding-voucher-rights",
      title: "Volunteering to give up your seat: before you accept the voucher",
      description: "What it means when an airline asks for volunteers because of overbooking, how rights differ from involuntary denied boarding and what to get in writing.",
      excerpt: "If you voluntarily accept a voucher and a later flight, you may give up some rights you would have had if boarding was denied involuntarily. Terms must be clear before you say yes.",
      category: "Overbooking",
      readTime: "8 min read",
      sections: [
        {
          heading: "A volunteer and a denied passenger are not the same",
          body: [
            "When a flight is overbooked, the airline may first ask for volunteers to give up their seat in exchange for money, a voucher, miles, hotel or a later flight. If you volunteer and accept the deal, your situation is not the same as a passenger who is involuntarily denied boarding.",
            "For involuntary denied boarding, European rules may provide fixed compensation, a choice between refund and rerouting, and care. For voluntary surrender, the central question is what you agreed with the airline. The terms must therefore be clear before you accept.",
            "Passenger-rights guides often explain overbooking through the 250, 400 or 600 euro amounts. In the real airport moment, it is more useful to know what to ask at the gate before the voucher starts looking like an easy win."
          ]
        },
        {
          heading: "What must be clear before consent",
          body: [
            "Ask for written terms: voucher or cash value, expiry date, use restrictions, new flight, arrival time, hotel if overnight, meals, transfer, baggage and whether accepting means waiving further claims. A verbal gate agreement is hard to prove later.",
            "A voucher is not the same as cash. It may expire, be non-transferable, require a minimum fare, apply only to limited routes or not cover taxes and surcharges. If you do not fly that airline often, cash or a refundable form may be worth more than a higher nominal voucher.",
            "If you travel from Serbia or through an EU hub, check the impact on connections, hotel and obligations at destination. A 300 euro voucher is not good if it causes you to lose a more expensive separate segment or business event."
          ]
        },
        {
          heading: "When not to rush",
          body: [
            "Do not rush if you do not know exactly when you will arrive, whether the new flight is confirmed and what happens to baggage. If you have a connection under one booking, ask whether the entire itinerary will be protected. If you have separate tickets, the risk is higher and should be priced into the deal.",
            "If the airline does not find enough volunteers and then denies you boarding involuntarily, a different set of rights opens. That is why you should not sign or click consent if you do not actually understand what you are accepting.",
            "Pay special attention to wording such as final settlement, full and final compensation or waiver. It may mean the airline considers that you gave up additional claims. If you are unsure, ask for an explanation before accepting."
          ]
        },
        {
          heading: "Care while waiting is still part of the deal",
          body: [
            "If you accept a later flight, the agreement should cover the waiting time. Meals, refreshments, hotel and transfer are not just courtesy if the airline moves you much later or to the next day. If that is not clearly stated, ask immediately.",
            "Keep the boarding pass for the old and new flight, voucher, email confirmation, receipts and the name or desk where the agreement was made. If the voucher later does not work or the new flight is not confirmed, those records are the only way to explain the problem quickly.",
            "If you accepted under pressure or without clear information, you can still complain, but proof is harder. The best protection is to ask for a written summary of the terms at the moment of decision."
          ]
        },
        {
          heading: "How to decide whether the offer is good",
          body: [
            "Compare the value of the offer with real time loss, obligations, extra costs and alternatives. For a flexible passenger without a connection, a voucher plus hotel may be good. For a passenger losing an important meeting or expensive separate ticket, the same offer may be poor.",
            "If the offer is not enough, you can ask for better terms. Airlines sometimes increase the amount if there are not enough volunteers. Be specific: I will accept if the new flight is confirmed, hotel is included and compensation is paid in cash.",
            "For automated claim handling, the most important thing is proof of consent and terms. Without that, the later case becomes a dispute about what was said at the gate, which is the slowest possible format."
          ]
        }
      ],
    },
  },
] satisfies BlogArticle[];
