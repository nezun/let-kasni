import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
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
            "S druge strane, mnogi tehnički problemi, interna organizacija, posada ili kasna rotacija ne moraju biti dovoljan izgovor. Zato ne gledajte samo dužinu kašnjenja. Tražite tačan razlog, vremensku liniju i dokaz veze između razloga i Vašeg leta.",
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
