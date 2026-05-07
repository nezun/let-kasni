import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "easyjet-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft waiting near an airport runway",
    position: "center",
  },
  "klm-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft taxiing near airport gates",
    position: "center",
  },
  "air-france-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft flying above clouds",
    position: "center",
  },
  "swiss-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger waiting inside an airport terminal",
    position: "center",
  },
  "two-hour-flight-delay-rights": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Departure board inside an airport terminal",
    position: "center",
  },
  "three-hour-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Passengers boarding an aircraft at the gate",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

export const articles = [
  {
    id: "easyjet-flight-delay-compensation",
    publishedAt: "2026-05-07",
    updatedAt: "2026-05-07",
    sr: {
      slug: "easyjet-kasnjenje-leta-odsteta",
      title: "easyJet kašnjenje leta: kada imate pravo na naknadu",
      description: "Kako proveriti easyJet kašnjenje na rutama iz Evrope i regiona: tri sata na dolasku, razlog kašnjenja, troškovi čekanja i dokazi.",
      excerpt: "Kod easyJet kašnjenja nije presudno koliko je avion kasnio u polasku, već kada ste stigli na krajnju destinaciju i zašto je do kašnjenja došlo.",
      category: "Aviokompanije",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Kada easyJet kašnjenje treba proveriti",
          body: [
            "easyJet je evropska aviokompanija, pa se za mnoge rute prvo proverava da li putovanje ulazi u pravila za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Najvažniji prag je dolazak na krajnju destinaciju tri sata ili više kasnije. Kašnjenje u polasku pomaže kao dokaz, ali samo po sebi ne rešava pitanje naknade.",
            "Ako let polazi iz EU, leti unutar EU ili ide ka EU pod odgovarajućim uslovima, slučaj vredi proveriti pažljivo. Kod putnika iz Srbije često su relevantne kombinacije preko evropskih aerodroma, jer jedna rezervacija može povezati više segmenata u jednu procenu dolaska.",
          ],
        },
        {
          heading: "Razlog kašnjenja kod niskotarifnog leta",
          body: [
            "Kod easyJet slučajeva često se pojavljuju operativni razlozi: kasna rotacija aviona, posada, tehnički kvar ili ograničenja aerodroma. Tehnički kvar i organizacioni problem mogu biti jači za zahtev, dok loše vreme, bezbednost ili odluka kontrole letenja mogu biti slabiji osnov za fiksnu naknadu.",
            "Ipak, naziv razloga nije dovoljan. Ako kompanija navede samo opštu formulaciju, tražite kada je problem nastao, na koji let ili avion se odnosio i zašto nije moglo da se organizuje brže rešenje. Posebno proverite da li je prvi razlog zaista objasnio celo kašnjenje do krajnje destinacije.",
          ],
        },
        {
          heading: "Troškovi čekanja i briga na aerodromu",
          body: [
            "Čak i kada fiksna odšteta nije sigurna, pravo na pomoć tokom čekanja ostaje važno. Kod dužeg čekanja tražite obrok, osveženje, komunikaciju, a ako se putovanje pomera za sledeći dan i hotel sa transferom. Ako pomoć ne dobijete, kupujte razumno i čuvajte račune.",
            "U zahtevu odvojite fiksnu naknadu od refundacije troškova. To je praktično zato što aviokompanija može osporavati odštetu zbog vanrednih okolnosti, ali i dalje mora da odgovori na pitanje nužnih troškova koje ste imali dok ste čekali.",
          ],
        },
        {
          heading: "Dokazi koje treba spremiti",
          body: [
            "Sačuvajte boarding pass, potvrdu rezervacije, poruke aviokompanije, screenshot aplikacije, fotografiju table polazaka i tačno vreme otvaranja vrata na dolasku ako ga možete utvrditi. Ako imate konekciju, dodajte ceo itinerer i dokaz da su segmenti bili kupljeni zajedno.",
            "Ako osoblje na gejtu kaže razlog, zapišite tačnu formulaciju. Razlika između vremena, slota, tehničkog kvara i nedostatka posade često menja ishod. Ako se razlog menja kroz aplikaciju, email i usmeno obaveštenje, sačuvajte sve verzije.",
          ],
        },
        {
          heading: "Najbolji sledeći korak",
          body: [
            "Napravite kratku tabelu: broj leta, datum, ruta, planirano vreme dolaska, stvarno vreme dolaska, naveden razlog, šta je ponuđeno i koji troškovi postoje. Ako je dolazak kasnio tri sata ili više, a razlog nije jasno van kontrole aviokompanije, zahtev ima smisla poslati na proveru.",
            "Ako odgovor bude generički, ne šaljite novu dugu žalbu. Tražite preciznu vremensku liniju i dokaz veze između razloga i vašeg leta. Takav odgovor je bolja osnova za dalji postupak od ponavljanja iste priče bez novih činjenica.",
          ],
        },
      ],
    },
    en: {
      slug: "easyjet-flight-delay-compensation",
      title: "easyJet flight delay: when compensation may be available",
      description: "How to check an easyJet delay on European and regional routes: three-hour arrival delay, delay reason, waiting costs and evidence.",
      excerpt: "For an easyJet delay, departure delay is not decisive by itself. The key facts are final arrival time and why the delay happened.",
      category: "Airlines",
      readTime: "8 min read",
      sections: [
        {
          heading: "When an easyJet delay should be checked",
          body: [
            "easyJet is a European airline, so for many routes the first step is to check whether the journey falls under [flight delay compensation](/en/flight-delay-compensation). The key threshold is arrival at the final destination three hours or more late. Departure delay helps as evidence, but it does not decide compensation by itself.",
            "If the flight departs from the EU, operates within the EU or arrives into the EU under the relevant conditions, the case is worth checking carefully. For travelers from Serbia, journeys through European airports are often important because one booking can connect several segments into one final-arrival assessment.",
          ],
        },
        {
          heading: "The delay reason on a low-cost flight",
          body: [
            "easyJet cases often involve operational reasons: late aircraft rotation, crew, technical fault or airport restrictions. A technical fault or organizational issue may support a claim, while bad weather, security or an air traffic control decision may make fixed compensation harder.",
            "Still, the label alone is not enough. If the airline gives only broad wording, ask when the issue started, which flight or aircraft it affected and why a faster solution could not be organized. Check especially whether the first reason really explains the whole delay to the final destination.",
          ],
        },
        {
          heading: "Waiting costs and airport care",
          body: [
            "Even when fixed compensation is uncertain, assistance during the wait remains important. During a long delay, ask for meals, refreshments, communication and, if travel moves to the next day, hotel accommodation with transfer. If care is not provided, spend reasonably and keep receipts.",
            "Separate fixed compensation from reimbursement of costs in the claim. This matters because the airline may dispute compensation because of extraordinary circumstances, but still needs to answer the necessary expenses you incurred while waiting.",
          ],
        },
        {
          heading: "Evidence to prepare",
          body: [
            "Keep the boarding pass, booking confirmation, airline messages, app screenshot, departures-board photo and exact arrival time if you can establish it. If there is a connection, add the full itinerary and proof that the segments were bought together.",
            "If gate staff state the reason, write down the exact wording. The difference between weather, a slot, a technical fault and crew shortage often changes the outcome. If the reason changes across the app, email and verbal announcements, save every version.",
          ],
        },
        {
          heading: "The best next step",
          body: [
            "Create a short table: flight number, date, route, scheduled arrival, actual arrival, stated reason, what was offered and which costs exist. If arrival was three hours or more late and the reason is not clearly outside the airline's control, the claim is worth checking.",
            "If the reply is generic, do not send another long complaint. Ask for the precise timeline and proof linking the reason to your flight. That answer is a better basis for the next step than repeating the same story without new facts.",
          ],
        },
      ],
    },
  },
  {
    id: "klm-flight-delay-compensation",
    publishedAt: "2026-05-07",
    updatedAt: "2026-05-07",
    sr: {
      slug: "klm-kasnjenje-leta-odsteta",
      title: "KLM kašnjenje leta: prava putnika i naknada",
      description: "Vodič za KLM kašnjenja preko Amsterdama i evropskih ruta: jedna rezervacija, krajnja destinacija, razlozi kašnjenja i dokazi.",
      excerpt: "Kod KLM kašnjenja često je presudno da li je putovanje preko Amsterdama bilo jedna rezervacija i kada ste stigli na poslednji aerodrom.",
      category: "Aviokompanije",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Zašto je krajnja destinacija presudna",
          body: [
            "Kod KLM letova mnogo putnika iz regiona putuje preko Amsterdama. Ako su segmenti u jednoj rezervaciji, ne proverava se samo prvi let koji je kasnio, već dolazak na krajnju destinaciju. To je osnova za širu proveru kroz [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta).",
            "Ako ste zbog kašnjenja prvog segmenta propustili nastavak puta i stigli tri sata ili više kasnije, slučaj može biti ozbiljan. Ako su karte kupljene odvojeno, situacija je slabija jer aviokompanija obično ne preuzima rizik samostalno sastavljene konekcije.",
          ],
        },
        {
          heading: "Rute preko Amsterdama",
          body: [
            "Amsterdam je veliko čvorište i kašnjenje jednog segmenta može brzo promeniti ceo itinerer. Zato treba sačuvati originalni plan, novu kartu ako je izdata, vreme dolaska na krajnju destinaciju i sve poruke o propuštenoj konekciji.",
            "Kod jedne rezervacije važno je proveriti da li je aviokompanija ponudila razuman nastavak puta. Ako ste ostali preko noći, relevantni su hotel, transfer, obroci i komunikacija. Ti troškovi se ne smeju izgubiti samo zato što se paralelno proverava fiksna naknada.",
          ],
        },
        {
          heading: "Razlozi kašnjenja koji menjaju slučaj",
          body: [
            "Tehnički kvar, posada, kasna rotacija aviona ili interni operativni problem mogu pojačati zahtev. Loše vreme, zatvaranje piste, odluka kontrole letenja ili bezbednosni događaj mogu biti jači argument protiv fiksne odštete, ali aviokompanija mora da objasni vezu sa konkretnim letom.",
            "Ako je navedeno više razloga, ne prihvatajte automatski prvi ili najkraći. Tražite vremensku liniju: šta se desilo, kada, na kom segmentu, koliko je trajalo i zbog čega nije bilo moguće preusmeravanje koje bi vas ranije dovelo do cilja.",
          ],
        },
        {
          heading: "Dokazi za KLM zahtev",
          body: [
            "Pripremite booking referencu, boarding pass za sve segmente, originalni i novi itinerer, poruke iz aplikacije ili emaila, račune i vreme dolaska na poslednji aerodrom. Ako ste prespavali zbog preusmeravanja, račun hotela i transfera čuvajte odvojeno.",
            "Ako je problem nastao na konekciji, posebno naglasite da je putovanje bilo jedna rezervacija. Bez tog podatka zahtev može izgledati kao običan zahtev za jedan segment, iako je stvarna šteta nastala tek na kraju celog puta.",
          ],
        },
        {
          heading: "Kako poslati precizan zahtev",
          body: [
            "U prvoj poruci navedite celu rutu, ne samo let koji je kasnio. Napišite planirani dolazak, stvarni dolazak, razlog koji je naveden, ponuđeno preusmeravanje i troškove koje tražite. Ako je dolazak bio tri sata ili više kasnije, jasno tražite proveru fiksne naknade.",
            "Ako KLM odgovori opštom formulacijom, sledeća poruka treba da traži dokaz i objašnjenje direktne veze između razloga i kašnjenja na krajnjoj destinaciji. To je korisnije od rasprave oko toga da li je čekanje bilo neprijatno, jer se postupak dobija na proverljivim činjenicama.",
          ],
        },
      ],
    },
    en: {
      slug: "klm-flight-delay-compensation",
      title: "KLM flight delay: passenger rights and compensation",
      description: "A guide to KLM delays through Amsterdam and European routes: one booking, final destination, delay reasons and evidence.",
      excerpt: "For a KLM delay, the key issue is often whether the journey through Amsterdam was one booking and when you reached the last airport.",
      category: "Airlines",
      readTime: "8 min read",
      sections: [
        {
          heading: "Why the final destination matters",
          body: [
            "Many regional travelers use KLM flights through Amsterdam. If the segments are under one booking, the assessment does not stop at the first delayed flight; it looks at arrival at the final destination. That is the basis for checking [flight delay compensation](/en/flight-delay-compensation).",
            "If a delayed first segment made you miss onward travel and you arrived three hours or more late, the case may be serious. If tickets were bought separately, the situation is weaker because the airline normally does not carry the risk of a self-made connection.",
          ],
        },
        {
          heading: "Routes through Amsterdam",
          body: [
            "Amsterdam is a major hub and a delay on one segment can quickly change the whole itinerary. Keep the original plan, the new ticket if issued, final arrival time and all messages about the missed connection.",
            "Under one booking, it is important to check whether the airline offered a reasonable onward route. If you stayed overnight, hotel, transfer, meals and communication matter. Those costs should not be lost just because fixed compensation is being checked separately.",
          ],
        },
        {
          heading: "Delay reasons that change the case",
          body: [
            "A technical fault, crew issue, late aircraft rotation or internal operational problem can strengthen a claim. Bad weather, runway closure, air traffic control decision or security event can be stronger arguments against fixed compensation, but the airline must explain the link with the specific flight.",
            "If several reasons are mentioned, do not automatically accept the first or shortest one. Ask for a timeline: what happened, when, on which segment, how long it lasted and why rerouting that would have brought you to the destination earlier was not possible.",
          ],
        },
        {
          heading: "Evidence for a KLM claim",
          body: [
            "Prepare the booking reference, boarding passes for all segments, original and new itinerary, app or email messages, receipts and arrival time at the last airport. If you stayed overnight because of rerouting, keep hotel and transfer receipts separately.",
            "If the issue arose at a connection, state clearly that the journey was one booking. Without that fact, the claim may look like a simple one-segment claim even though the real loss happened at the end of the whole journey.",
          ],
        },
        {
          heading: "How to send a precise claim",
          body: [
            "In the first message, include the whole route, not only the delayed flight. State scheduled arrival, actual arrival, reason given, offered rerouting and costs claimed. If arrival was three hours or more late, clearly ask for fixed compensation review.",
            "If KLM replies with broad wording, the next message should ask for evidence and an explanation of the direct link between the reason and the delay at the final destination. That is more useful than arguing that the wait was unpleasant, because the case turns on verifiable facts.",
          ],
        },
      ],
    },
  },
  {
    id: "air-france-flight-delay-compensation",
    publishedAt: "2026-05-07",
    updatedAt: "2026-05-07",
    sr: {
      slug: "air-france-kasnjenje-leta-odsteta",
      title: "Air France kašnjenje leta: naknada i prava putnika",
      description: "Kako proveriti Air France kašnjenje preko Pariza ili drugih evropskih ruta: krajnji dolazak, konekcije, briga i dokumenta.",
      excerpt: "Air France zahtev je najjači kada postoji jedna rezervacija, dolazak tri sata ili više kasnije i razlog koji nije jasno van kontrole aviokompanije.",
      category: "Aviokompanije",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Kada Air France kašnjenje može doneti odštetu",
          body: [
            "Air France je evropski prevoznik, pa se kod mnogih ruta proverava evropska zaštita. Ako ste na krajnju destinaciju stigli tri sata ili više kasnije, slučaj treba povezati sa pravilima za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Gleda se stvarni dolazak, ne samo vreme polaska.",
            "Kod putovanja preko Pariza naročito je važno da li su segmenti bili u jednoj rezervaciji. Ako jesu, propušten nastavak puta može biti deo istog slučaja. Ako nisu, svaki segment se obično posmatra odvojeno, što često slabi zahtev.",
          ],
        },
        {
          heading: "Konekcije preko Pariza",
          body: [
            "Velika čvorišta znače da se mala promena na prvom letu može pretvoriti u veliki problem na kraju puta. Sačuvajte originalni itinerer, novu kartu, poruke o preusmeravanju i vreme kada ste stvarno stigli na poslednji aerodrom.",
            "Ako vam je ponuđen kasniji let, proverite da li je postojao razumniji raniji let. Putnik ne mora sam dokazivati svaku alternativu, ali je korisno sačuvati screenshot dostupnih opcija ako je aviokompanija tvrdila da boljeg rešenja nije bilo.",
          ],
        },
        {
          heading: "Odgovornost i vanredne okolnosti",
          body: [
            "Tehnički kvar, organizacija posade, kasna rotacija ili interni operativni problem mogu podržati zahtev. Loše vreme, bezbednosna odluka, ograničenje aerodroma ili kontrola letenja mogu biti vanredne okolnosti, ali kompanija mora pokazati kako su baš one napravile kašnjenje vašeg leta.",
            "Ako se razlog menja, to ne znači automatski da imate pravo na novac, ali znači da treba tražiti jasnije objašnjenje. Dobar zahtev traži vremensku liniju i dokaz, umesto da se oslanja na opšti utisak da je aviokompanija odgovorna.",
          ],
        },
        {
          heading: "Briga, hotel i troškovi",
          body: [
            "Kod dužeg čekanja odvojeno proverite pravo na brigu. Obroci, osveženje, komunikacija, hotel i transfer mogu biti relevantni čak i kada je fiksna naknada sporna. Ako pomoć nije ponuđena, troškovi treba da budu nužni, razumni i dokumentovani računima.",
            "Ako ste zbog kašnjenja ostali preko noći, ne šaljite samo zahtev za 250, 400 ili 600 evra. Dodajte poseban deo za hotel, transfer i obroke. Tako se ne dešava da spor oko odštete proguta očigledne troškove čekanja.",
          ],
        },
        {
          heading: "Kako pripremiti zahtev",
          body: [
            "Pripremite broj leta, datum, booking referencu, sve boarding pass dokumente, originalni i novi itinerer, poruke i račune. Ako je kašnjenje dovelo do propuštene konekcije, jasno navedite da procenjujete dolazak na krajnju destinaciju.",
            "Prva poruka treba da bude kratka i proverljiva: ruta, planirani dolazak, stvarni dolazak, navedeni razlog, ponuđeno rešenje i šta tražite. Ako odgovor ne pokrije sve stavke, sledeća poruka treba da traži dokaze i konkretnu vremensku liniju.",
          ],
        },
      ],
    },
    en: {
      slug: "air-france-flight-delay-compensation",
      title: "Air France flight delay: compensation and passenger rights",
      description: "How to check an Air France delay through Paris or other European routes: final arrival, connections, care and documents.",
      excerpt: "An Air France claim is strongest when there is one booking, arrival three hours or more late and a reason not clearly outside the airline's control.",
      category: "Airlines",
      readTime: "8 min read",
      sections: [
        {
          heading: "When an Air France delay may lead to compensation",
          body: [
            "Air France is a European carrier, so European protection is checked on many routes. If you reached the final destination three hours or more late, connect the case to [flight delay compensation](/en/flight-delay-compensation). Actual arrival matters, not only departure time.",
            "For journeys through Paris, it is especially important whether the segments were under one booking. If they were, a missed onward flight can be part of the same case. If not, each segment is usually assessed separately, which often weakens the claim.",
          ],
        },
        {
          heading: "Connections through Paris",
          body: [
            "Large hubs mean a small change on the first flight can become a major problem at the end of the journey. Save the original itinerary, new ticket, rerouting messages and the time when you actually reached the last airport.",
            "If you were offered a later flight, check whether a more reasonable earlier flight existed. A passenger does not have to prove every alternative, but it helps to keep screenshots of available options if the airline says no better solution existed.",
          ],
        },
        {
          heading: "Responsibility and extraordinary circumstances",
          body: [
            "A technical fault, crew organization, late aircraft rotation or internal operational problem can support a claim. Bad weather, a security decision, airport restriction or air traffic control may be extraordinary circumstances, but the airline must show how they caused the delay on your flight.",
            "If the reason changes, that does not automatically prove compensation, but it does mean you should ask for a clearer explanation. A good claim asks for timeline and evidence instead of relying on a general feeling that the airline was responsible.",
          ],
        },
        {
          heading: "Care, hotel and costs",
          body: [
            "During a long wait, check care rights separately. Meals, refreshments, communication, hotel and transfer may matter even when fixed compensation is disputed. If assistance was not offered, costs should be necessary, reasonable and documented with receipts.",
            "If you stayed overnight because of the delay, do not send only a request for 250, 400 or 600 euros. Add a separate section for hotel, transfer and meals. That prevents the dispute about compensation from swallowing obvious waiting costs.",
          ],
        },
        {
          heading: "How to prepare the claim",
          body: [
            "Prepare flight number, date, booking reference, all boarding passes, original and new itinerary, messages and receipts. If the delay caused a missed connection, state clearly that you are assessing arrival at the final destination.",
            "The first message should be short and verifiable: route, scheduled arrival, actual arrival, reason given, offered solution and what you request. If the reply does not cover all points, the next message should ask for evidence and a concrete timeline.",
          ],
        },
      ],
    },
  },
  {
    id: "swiss-flight-delay-compensation",
    publishedAt: "2026-05-07",
    updatedAt: "2026-05-07",
    sr: {
      slug: "swiss-kasnjenje-leta-odsteta",
      title: "Swiss kašnjenje leta: kada putnik može tražiti odštetu",
      description: "Praktičan vodič za Swiss kašnjenja preko Ciriha i evropskih ruta: pravila, konekcije, briga, troškovi i dokazi.",
      excerpt: "Kod Swiss kašnjenja proveravaju se ruta, operativni prevoznik, jedna rezervacija i dolazak na krajnju destinaciju tri sata ili više kasnije.",
      category: "Aviokompanije",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Zašto Swiss rute treba proveriti pažljivo",
          body: [
            "Swiss je prevoznik povezan sa evropskim pravilima putničke zaštite, pa su mnoge rute relevantne za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). Prvi uslov nije osećaj da je čekanje bilo dugo, već dolazak na krajnju destinaciju tri sata ili više kasnije.",
            "Kod putnika koji lete preko Ciriha posebno je važno da li je sve bilo u jednoj rezervaciji. Ako jeste, propuštena konekcija ili kasniji nastavak puta mogu se posmatrati kroz isti slučaj. Ako su karte odvojene, zaštita je obično slabija.",
          ],
        },
        {
          heading: "Konekcije preko Ciriha",
          body: [
            "Čvorišni aerodromi dobro funkcionišu kada je raspored stabilan, ali kratak poremećaj može napraviti veliki lanac posledica. Zato sačuvajte ceo itinerer, novu kartu, informacije o gejtu, poruke o preusmeravanju i vreme stvarnog dolaska.",
            "Ako ste preusmereni na drugi let ili ostali preko noći, proverite i troškove brige. Hotel, transfer, obroci i komunikacija su odvojeni od fiksne naknade. To znači da mogu biti relevantni čak i ako kompanija kasnije tvrdi da fiksna odšteta nije dugovana.",
          ],
        },
        {
          heading: "Razlozi koji jačaju ili slabe zahtev",
          body: [
            "Tehnički kvar, kasna rotacija, organizacija posade ili interni operativni problem mogu biti dobar signal za zahtev. Vreme, bezbednosni rizik, odluka aerodroma ili kontrola letenja mogu biti vanredne okolnosti, ali samo ako su konkretno povezane sa vašim kašnjenjem.",
            "Ako dobijete kratak odgovor, tražite preciznije: koji događaj, kada je počeo, koliko je trajao, koji segment je pogodio i koje mere su preduzete. Bez toga putnik ne može znati da li je odbijanje realno ili samo generičko.",
            "Kod povezanih letova obratite pažnju i na to da li je prvi razlog bio samo početak problema. Nekad je početni poremećaj van kontrole aviokompanije, ali se kasnije kašnjenje produži zbog organizacije posade, aviona ili preusmeravanja. Zato je vremenska linija važnija od jedne oznake razloga.",
          ],
        },
        {
          heading: "Dokazi i redosled pripreme",
          body: [
            "Pre slanja zahteva skupite booking referencu, boarding pass za svaki segment, potvrdu rezervacije, poruke, fotografiju table polazaka, račune i novu kartu ako je izdata. Ako je problem nastao na konekciji, dodajte dokaz da je putovanje bilo kupljeno zajedno.",
            "Vreme dolaska treba zapisati što preciznije. Ako ne znate tačno vreme otvaranja vrata, sačuvajte bar screenshot aplikacije, poruke o dolasku i svaku zvaničnu informaciju iz sistema aerodroma ili aviokompanije.",
          ],
        },
        {
          heading: "Kako formulisati zahtev",
          body: [
            "Zahtev treba da bude kratak: cela ruta, broj leta, datum, planirani i stvarni dolazak, razlog koji je naveden i šta tražite. Ako tražite i troškove, napišite ih u posebnoj listi sa računima, da se ne pomešaju sa fiksnom naknadom.",
            "Ako Swiss navede vanredne okolnosti, sledeća poruka treba da traži dokaz direktne veze sa letom. Nije dovoljno da je negde u mreži postojao problem; važno je da taj problem objašnjava kašnjenje vašeg konkretnog puta.",
          ],
        },
      ],
    },
    en: {
      slug: "swiss-flight-delay-compensation",
      title: "Swiss flight delay: when passengers can claim compensation",
      description: "A practical guide to Swiss delays through Zurich and European routes: rules, connections, care, costs and evidence.",
      excerpt: "For a Swiss delay, check the route, operating carrier, one-booking status and whether final arrival was three hours or more late.",
      category: "Airlines",
      readTime: "8 min read",
      sections: [
        {
          heading: "Why Swiss routes should be checked carefully",
          body: [
            "Swiss is connected to European passenger-rights rules, so many routes are relevant for [flight delay compensation](/en/flight-delay-compensation). The first condition is not the feeling that the wait was long, but arrival at the final destination three hours or more late.",
            "For travelers flying through Zurich, it is especially important whether everything was under one booking. If yes, a missed connection or later onward flight may be assessed as one case. If the tickets were separate, protection is usually weaker.",
          ],
        },
        {
          heading: "Connections through Zurich",
          body: [
            "Hub airports work well when the schedule is stable, but a short disruption can create a long chain of consequences. Keep the full itinerary, new ticket, gate information, rerouting messages and actual arrival time.",
            "If you were rerouted to another flight or stayed overnight, check care costs too. Hotel, transfer, meals and communication are separate from fixed compensation. They may matter even if the airline later says fixed compensation is not owed.",
          ],
        },
        {
          heading: "Reasons that strengthen or weaken the claim",
          body: [
            "A technical fault, late rotation, crew organization or internal operational issue can be a good signal for a claim. Weather, security risk, airport decision or air traffic control may be extraordinary circumstances, but only if they are specifically connected to your delay.",
            "If you receive a short reply, ask for precision: which event, when it started, how long it lasted, which segment it affected and which measures were taken. Without that, the passenger cannot know whether the refusal is realistic or generic.",
          ],
        },
        {
          heading: "Evidence and preparation order",
          body: [
            "Before sending the claim, gather booking reference, boarding pass for each segment, booking confirmation, messages, departures-board photo, receipts and the new ticket if issued. If the issue arose at a connection, add proof that the journey was bought together.",
            "Record arrival time as precisely as possible. If you do not know the exact door-opening time, at least keep the app screenshot, arrival messages and any official information from the airport or airline system.",
          ],
        },
        {
          heading: "How to phrase the claim",
          body: [
            "The claim should be short: full route, flight number, date, scheduled and actual arrival, reason given and what you request. If you also claim costs, put them in a separate list with receipts so they are not mixed with fixed compensation.",
            "If Swiss cites extraordinary circumstances, the next message should ask for proof of the direct link with the flight. It is not enough that a problem existed somewhere in the network; that problem must explain the delay on your specific journey.",
          ],
        },
      ],
    },
  },
  {
    id: "two-hour-flight-delay-rights",
    publishedAt: "2026-05-07",
    updatedAt: "2026-05-07",
    sr: {
      slug: "kasnjenje-leta-2-sata-prava-putnika",
      title: "Kašnjenje leta 2 sata: šta putnik može da traži",
      description: "Dva sata kašnjenja obično ne znače fiksnu odštetu, ali mogu otvoriti pravo na pomoć, obrok, osveženje i bolje informacije.",
      excerpt: "Ako let kasni 2 sata, najčešće ne tražite 250, 400 ili 600 evra, već pomoć tokom čekanja i dokaze ako kašnjenje kasnije pređe tri sata.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Dva sata nisu isto što i tri sata",
          body: [
            "Kod evropskih pravila za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta), fiksna odšteta se obično proverava tek kada dolazak na krajnju destinaciju kasni tri sata ili više. Zato samo kašnjenje od 2 sata najčešće nije dovoljno za zahtev od 250, 400 ili 600 evra.",
            "Ipak, dva sata nisu beznačajna. Na kraćim letovima to može pokrenuti pravo na pomoć na aerodromu: obrok, osveženje i komunikaciju u razumnom odnosu na čekanje. Zato je važno razlikovati novčanu naknadu od prava na brigu.",
          ],
        },
        {
          heading: "Šta tražiti dok čekate",
          body: [
            "Ako aviokompanija najavi da će kašnjenje trajati duže, javite se osoblju i tražite jasne informacije. Pitajte za vaučer za hranu ili piće, vreme sledećeg obaveštenja i razlog kašnjenja. Ako putujete sa decom, starijim osobama ili imate zdravstveni razlog, recite to odmah.",
            "Ako pomoć nije ponuđena, nemojte praviti nerazumne troškove, ali sačuvajte račune za osnovnu hranu i vodu. Kasnije je lakše tražiti refundaciju kada račun pokazuje vreme kupovine, aerodrom i iznos koji odgovara dužini čekanja.",
            "Uvek tražite i sledeće vreme ažuriranja. Kada postoji pisani trag da je putnicima obećano novo obaveštenje, lakše je pokazati da ste čekali instrukcije aviokompanije, a ne samostalno donosili odluke bez kontakta sa prevoznikom.",
          ],
        },
        {
          heading: "Zašto odmah skupljati dokaze",
          body: [
            "Kašnjenje od 2 sata može se pretvoriti u kašnjenje od 3 ili 4 sata. Zato već na početku sačuvajte boarding pass, screenshot aplikacije, fotografiju table polazaka i poruke aviokompanije. Ne čekajte kraj dana da krenete da rekonstruišete šta se desilo.",
            "Posebno zapišite razlog koji se navodi. Ako je prvo rečeno tehnički problem, zatim slot ili vreme, sačuvajte sve verzije. Promena razloga ne znači automatski da imate pravo na odštetu, ali pomaže da se kasnije proveri da li je odbijanje bilo osnovano.",
          ],
        },
        {
          heading: "Kada dva sata postaju veći slučaj",
          body: [
            "Ako zbog 2 sata propuštate konekciju pod jednom rezervacijom, nemojte gledati samo prvi segment. Važno je kada stižete na poslednju destinaciju. Ako kasnije pređete prag od tri sata na kraju puta, slučaj može postati zahtev za fiksnu naknadu.",
            "Ako let na kraju krene sa oko 2 sata kašnjenja, ali stigne manje od tri sata kasnije, fokus je uglavnom na brizi i troškovima. Ako se kašnjenje produži, ista dokumentacija koju ste skupili od početka postaje osnov za ozbiljniju proveru.",
            "Zato je korisno da već posle prvog dužeg obaveštenja napravite mini hronologiju. Upisujte najavljeno vreme polaska, svaku promenu statusa i šta je osoblje reklo. Kada se prag približi trećem satu, više ne zavisite od sećanja već imate redosled događaja.",
          ],
        },
        {
          heading: "Praktična kontrolna lista",
          body: [
            "Dok čekate, zapišite broj leta, vreme prvog obaveštenja, najavljeni razlog, vreme novog polaska i sve što ste dobili od aviokompanije. Ako kupujete hranu ili vodu, čuvajte račun. Ako se pominje novi let, hotel ili autobus, tražite potvrdu u pisanom obliku.",
            "Posle puta uporedite planirani i stvarni dolazak. Ako je krajnji dolazak bio ispod tri sata, zahtev najčešće usmerite na troškove brige. Ako je bio tri sata ili više, proverite i fiksnu naknadu, posebno ako razlog nije jasno van kontrole aviokompanije.",
            "Ako aviokompanija ne odgovori na deo o troškovima, pošaljite kratku dopunu sa računima i pitanjem da li priznaje pravo na pomoć. Ne morate odmah širiti spor na sve pravne detalje; prvo zatvorite činjenicu da je pomoć bila potrebna i da nije bila ponuđena.",
            "Ovakav pristup je posebno koristan za porodice i putnike sa kratkim presedanjem. Dva sata možda još nisu prag za fiksnu odštetu, ali jesu signal da organizujete dokaze, proverite alternativu i smanjite rizik da kasnije nemate osnovne podatke.",
          ],
        },
      ],
    },
    en: {
      slug: "2-hour-flight-delay-passenger-rights",
      title: "2-hour flight delay: what passengers can ask for",
      description: "A two-hour delay usually does not mean fixed compensation, but it can trigger care, meals, refreshments and better information.",
      excerpt: "If a flight is delayed by 2 hours, you usually are not claiming 250, 400 or 600 euros yet; focus on care and evidence if the delay grows.",
      category: "Flight delay",
      readTime: "8 min read",
      sections: [
        {
          heading: "Two hours is not the same as three hours",
          body: [
            "Under European [flight delay compensation](/en/flight-delay-compensation) rules, fixed compensation is usually checked only when arrival at the final destination is three hours or more late. A 2-hour delay by itself is therefore usually not enough for a 250, 400 or 600 euro claim.",
            "Still, two hours are not irrelevant. On shorter flights, this can trigger airport assistance: meals, refreshments and communication in reasonable relation to the wait. That is why it is important to separate fixed compensation from care rights.",
          ],
        },
        {
          heading: "What to ask for while waiting",
          body: [
            "If the airline announces that the delay will last longer, approach staff and ask for clear information. Ask for a food or drink voucher, the time of the next update and the delay reason. If you travel with children, older passengers or have a medical reason, say so immediately.",
            "If assistance is not offered, do not create unreasonable costs, but keep receipts for basic food and water. Later it is easier to request reimbursement when the receipt shows purchase time, airport and an amount that matches the length of the wait.",
          ],
        },
        {
          heading: "Why evidence should start immediately",
          body: [
            "A 2-hour delay can become a 3-hour or 4-hour delay. From the beginning, keep the boarding pass, app screenshot, departures-board photo and airline messages. Do not wait until the end of the day to reconstruct what happened.",
            "Write down the reason given. If the first reason is a technical problem, then a slot or weather, keep every version. A changed reason does not automatically prove compensation, but it helps later when checking whether a refusal was justified.",
          ],
        },
        {
          heading: "When two hours become a bigger case",
          body: [
            "If a 2-hour delay makes you miss a connection under one booking, do not look only at the first segment. The important fact is when you reach the last destination. If the final journey later crosses the three-hour threshold, the case may become a fixed compensation claim.",
            "If the flight eventually departs around 2 hours late but arrives less than three hours late, the focus is usually care and costs. If the delay grows, the same documentation collected from the start becomes the basis for a more serious assessment.",
            "That is why it helps to build a small timeline after the first long update. Record the announced departure time, every status change and what staff said. When the delay gets close to the third hour, you no longer depend on memory because the sequence is already written down.",
          ],
        },
        {
          heading: "Practical checklist",
          body: [
            "While waiting, record the flight number, first update time, stated reason, new departure time and everything provided by the airline. If you buy food or water, keep the receipt. If a new flight, hotel or bus is mentioned, ask for written confirmation.",
            "After the trip, compare scheduled and actual arrival. If final arrival was under three hours late, usually aim the request at care costs. If it was three hours or more, check fixed compensation too, especially if the reason is not clearly outside the airline's control.",
            "If the airline does not answer the expense part, send a short follow-up with receipts and ask whether it accepts that assistance should have been provided. You do not need to expand the dispute immediately; first establish that support was needed and was not offered.",
          ],
        },
      ],
    },
  },
  {
    id: "three-hour-flight-delay-compensation",
    publishedAt: "2026-05-07",
    updatedAt: "2026-05-07",
    sr: {
      slug: "kasnjenje-leta-3-sata-odsteta",
      title: "Kašnjenje leta 3 sata: kada počinje pravo na odštetu",
      description: "Tri sata kašnjenja na dolasku je ključni prag za proveru fiksne naknade, ali ruta, razlog i krajnja destinacija i dalje odlučuju ishod.",
      excerpt: "Ako ste stigli tri sata ili više kasnije, slučaj vredi proveriti, ali pravo na odštetu zavisi od rute, operativnog prevoznika i razloga kašnjenja.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Tri sata se mere na dolasku",
          body: [
            "Najčešća greška je računanje kašnjenja samo prema polasku. Za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta) presudan je dolazak na krajnju destinaciju. Ako avion poleti tri sata kasnije, ali u letu nadoknadi vreme i stigne ispod praga, fiksna naknada može izostati.",
            "Suprotno tome, ako polazak kasni manje, ali zbog konekcije ili preusmeravanja na kraju stižete tri sata ili više kasnije, slučaj treba proveriti. Kod jedne rezervacije gleda se završetak celog putovanja, ne izolovano prvi segment.",
          ],
        },
        {
          heading: "Ruta i operativni prevoznik",
          body: [
            "Pravila ne zavise od državljanstva putnika. Važni su aerodrom polaska, aerodrom dolaska, operativni prevoznik i da li je putovanje bilo jedna rezervacija. Let iz EU je obično jači osnov, a let ka EU može zavisiti od toga da li ga obavlja evropska aviokompanija.",
            "Za putnike iz Srbije često su važne rute preko evropskih čvorišta. Ako je sve kupljeno zajedno, kašnjenje prvog segmenta može biti relevantno zbog dolaska na poslednji aerodrom. Ako su karte odvojene, rizik propuštene konekcije je često na putniku.",
          ],
        },
        {
          heading: "Razlog kašnjenja odlučuje da li se plaća",
          body: [
            "Tri sata ne znače automatski novac. Aviokompanija može odbiti fiksnu naknadu ako dokaže vanredne okolnosti koje nije mogla da izbegne razumnim merama. Tipični primeri su ozbiljno loše vreme, bezbednosni rizik, odluka kontrole letenja ili zatvaranje aerodroma.",
            "S druge strane, mnogi tehnički problemi, interna organizacija, posada ili kasna rotacija ne moraju biti dovoljan izgovor. Zato ne gledajte samo dužinu kašnjenja. Tražite tačan razlog, vremensku liniju i dokaz veze između razloga i vašeg leta.",
            "Ako je kašnjenje nastalo u lancu, proverite svaki deo lanca. Prvi događaj može biti vanredan, ali kasnije čekanje može zavisiti od toga kako je aviokompanija rasporedila avion, posadu ili alternativu. U tom delu se često krije razlika između slabog i ozbiljnog zahteva.",
            "Ne morate dokazivati unutrašnju organizaciju aviokompanije, ali možete tražiti da ona objasni svoje mere. Uredan zahtev zato ne tvrdi napamet da je kompanija kriva, već traži proverljiv odgovor na pitanje šta je moglo biti urađeno da se dolazak skrati u praksi.",
          ],
        },
        {
          heading: "Iznosi i troškovi čekanja",
          body: [
            "Ako su uslovi ispunjeni, iznos zavisi od udaljenosti: najčešće 250, 400 ili 600 evra. Na dugim rutama postoje posebna pravila kada je kašnjenje između tri i četiri sata, pa se slučaj mora proveriti prema udaljenosti i stvarnom dolasku.",
            "Pored fiksne naknade, ne zaboravite troškove čekanja. Obroci, osveženje, komunikacija, hotel i transfer mogu biti relevantni odvojeno. Ako pomoć nije ponuđena, čuvajte razumne račune i tražite refundaciju u posebnom delu zahteva.",
          ],
        },
        {
          heading: "Kako poslati zahtev posle tri sata",
          body: [
            "Zahtev treba da sadrži broj leta, datum, rutu, booking referencu, planirano i stvarno vreme dolaska, navedeni razlog, dokaze i jasno traženje fiksne naknade. Ako postoje troškovi, dodajte ih odvojeno sa računima.",
            "Ako aviokompanija odbije zahtev, proverite da li je odgovor stvarno dokazao vanredne okolnosti. Kratka rečenica nije dovoljna analiza. Sledeća poruka treba da traži konkretan dokaz, vremensku liniju i objašnjenje zašto kašnjenje nije moglo biti izbegnuto razumnim merama.",
            "Za ponovljive provere čuvajte isti redosled podataka za svaki slučaj: ruta, vremena, razlog, dokazi, troškovi i status odgovora. Tako se kasnije brzo vidi da li nedostaje samo račun, tačno vreme dolaska ili objašnjenje aviokompanije.",
            "Ako imate više putnika u istoj rezervaciji, za svakog proverite ime na karti i dokumente, ali činjenice o letu držite zajedno. Jedna uredna hronologija za ceo itinerer smanjuje ručni rad i sprečava da se isti dokaz šalje više puta u različitim verzijama.",
          ],
        },
      ],
    },
    en: {
      slug: "3-hour-flight-delay-compensation",
      title: "3-hour flight delay: when compensation starts",
      description: "A three-hour arrival delay is the key threshold for fixed compensation checks, but route, reason and final destination still decide the outcome.",
      excerpt: "If you arrived three hours or more late, the case is worth checking, but compensation depends on route, operating carrier and delay reason.",
      category: "Flight delay",
      readTime: "8 min read",
      sections: [
        {
          heading: "Three hours are measured at arrival",
          body: [
            "The most common mistake is counting delay only by departure. For [flight delay compensation](/en/flight-delay-compensation), arrival at the final destination is decisive. If the aircraft departs three hours late but makes up time and arrives below the threshold, fixed compensation may not apply.",
            "On the other hand, if departure delay is shorter but a connection or rerouting means you finally arrive three hours or more late, the case should be checked. Under one booking, the end of the whole journey matters, not only the first segment.",
          ],
        },
        {
          heading: "Route and operating carrier",
          body: [
            "The rules do not depend on passenger nationality. Departure airport, arrival airport, operating carrier and whether the journey was one booking matter. A flight from the EU is usually a stronger basis, while a flight into the EU may depend on whether it is operated by a European airline.",
            "For travelers from Serbia, routes through European hubs are often important. If everything was bought together, delay on the first segment can matter because of arrival at the last airport. If tickets were separate, the missed-connection risk is often on the passenger.",
          ],
        },
        {
          heading: "The delay reason decides whether money is paid",
          body: [
            "Three hours do not automatically mean money. The airline can refuse fixed compensation if it proves extraordinary circumstances that could not have been avoided with reasonable measures. Typical examples include serious bad weather, security risk, air traffic control decision or airport closure.",
            "On the other hand, many technical problems, internal organization, crew or late rotation may not be enough as an excuse. Do not look only at delay length. Ask for the exact reason, timeline and proof linking the reason to your flight.",
            "If the delay developed in a chain, check every part of that chain. The first event may be extraordinary, but later waiting may depend on how the airline arranged the aircraft, crew or alternative route. That is often where a weak case and a serious claim separate.",
          ],
        },
        {
          heading: "Amounts and waiting costs",
          body: [
            "If the conditions are met, the amount depends on distance: usually 250, 400 or 600 euros. Long routes have special rules when the delay is between three and four hours, so the case must be checked by distance and actual arrival.",
            "Alongside fixed compensation, do not forget waiting costs. Meals, refreshments, communication, hotel and transfer may matter separately. If care was not provided, keep reasonable receipts and request reimbursement in a separate part of the claim.",
          ],
        },
        {
          heading: "How to send the claim after three hours",
          body: [
            "The claim should include flight number, date, route, booking reference, scheduled and actual arrival time, stated reason, evidence and a clear request for fixed compensation. If there are costs, add them separately with receipts.",
            "If the airline refuses the claim, check whether the reply actually proved extraordinary circumstances. One short sentence is not a full assessment. The next message should ask for concrete evidence, a timeline and an explanation of why the delay could not have been avoided with reasonable measures.",
            "For repeatable checks, keep the same data order for every case: route, times, reason, evidence, costs and response status. Later it becomes easy to see whether only a receipt, exact arrival time or airline explanation is missing.",
          ],
        },
      ],
    },
  },
] satisfies BlogArticle[];
