import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "bad-weather-flight-delay": {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=82",
    alt: "Storm clouds above an airport runway",
    position: "center",
  },
  "technical-fault-flight-compensation": {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft maintenance detail before departure",
    position: "center",
  },
  "previous-flight-rotation-delay": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft waiting at an airport gate",
    position: "center",
  },
  "overnight-delay-hotel-rights": {
    src: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?auto=format&fit=crop&w=1600&q=82",
    alt: "Hotel room prepared for an overnight airport disruption",
    position: "center",
  },
  "self-rerouting-new-ticket": {
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger reviewing receipts and a replacement itinerary",
    position: "center",
  },
  "serbia-eu-transit-routes": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger aircraft flying over a European route map",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

export const articles = [
  {
    id: "bad-weather-flight-delay",
    publishedAt: "2026-05-02",
    updatedAt: "2026-05-02",
    sr: {
      slug: "kasnjenje-leta-zbog-loseg-vremena",
      title: "Kašnjenje leta zbog lošeg vremena: kada to zaista ruši zahtev",
      description: "Vodič za putnike iz Srbije: kada loše vreme oslobađa aviokompaniju od fiksne odštete, a kada je samo preširoko objašnjenje koje treba proveriti.",
      excerpt: "Loše vreme ne znači automatski kraj zahteva. Bitno je gde je problem nastao, da li je stvarno uticao na vaš let i šta je aviokompanija uradila da smanji posledice.",
      category: "Vanredne okolnosti",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Loše vreme nije čarobna reč",
          body: [
            "Aviokompanije često navode weather, bad weather ili meteorological conditions kao razlog za kašnjenje ili otkazivanje. To može biti potpuno opravdano: gusta magla, oluja, sneg, zaleđena pista ili opasni vetrovi mogu učiniti let nebezbednim. Ali sama reč vreme nije dovoljna da se zahtev automatski odbije.",
            "Kod evropskih pravila, uključujući okvire koji su važni za putnike iz Srbije kada ruta ulazi u evropsku zaštitu, proverava se da li je okolnost bila van kontrole aviokompanije i da li se nije mogla izbeći razumnim merama. Zato je važna konkretna slika, ne samo opšta formulacija iz aplikacije.",
            "Konkurentski vodiči uglavnom navode loše vreme kao primer vanredne okolnosti. Korisniji pristup je da se odmah pita: na kom aerodromu je vreme bilo problem, u kom periodu, da li su drugi letovi poleteli, i zašto je baš vaš put završen mnogo kasnije."
          ]
        },
        {
          heading: "Gde je vreme stvarno uticalo na let",
          body: [
            "Nije isto ako je nevreme bilo na polaznom aerodromu, odredištu, aerodromu prethodnog leta ili negde u mreži aviokompanije. Ako je Beograd bio otvoren, odredište radilo normalno, a problem je bio na ranijoj rotaciji aviona, treba proveriti da li je kašnjenje zaista posledica vremena ili organizacije.",
            "Putnici često čuju da prethodni avion kasni zbog vremena. To može biti tačno, ali ne rešava celu priču. Ako je prevoznik imao dovoljno vremena da zameni avion, posadu ili ponudi ranije preusmeravanje, deo odgovornosti može i dalje biti sporan.",
            "Zato napravite vremensku liniju. Zapišite planirano poletanje, stvarno poletanje, planirani dolazak, stvarni dolazak i svaku poruku o razlogu kašnjenja. Ako postoji više razloga, na primer prvo vreme pa zatim posada, u zahtevu treba razdvojiti te faze."
          ]
        },
        {
          heading: "Drugi letovi su važan trag",
          body: [
            "Ako su drugi letovi iz istog aerodroma i u isto vreme normalno poletali, tvrdnja o vremenu zaslužuje dodatnu proveru. To ne znači da aviokompanija sigurno nije u pravu, jer različiti avioni, posade, slotovi i destinacije mogu imati različita ograničenja. Ipak, to je signal da odgovor ne treba prihvatiti bez detalja.",
            "Ako je veliki broj letova kasnio ili je aerodrom bio zatvoren, argument aviokompanije obično je jači. Tada fiksna naknada može biti slabija, ali prava na brigu, obroke, hotel i razuman nastavak putovanja ostaju odvojeno pitanje.",
            "Dobro je sačuvati screenshot ekrana sa aerodroma, aplikacije za letove ili obaveštenja aerodroma. Ne morate dokazivati meteorologiju kao ekspert, ali korisno je imati osnovni trag da kasnije možete pokazati šta se dešavalo oko vašeg leta."
          ]
        },
        {
          heading: "Briga tokom čekanja ne nestaje",
          body: [
            "Čak i kada je loše vreme stvarna vanredna okolnost, aviokompanija ne može samo da kaže da nema odgovornosti i ostavi putnike bez pomoći. Kod dužih čekanja putnici mogu imati pravo na obroke, osveženje, komunikaciju, a kod noćnog čekanja i hotel sa transferom.",
            "Ovo je mesto gde putnici često izgube novac. Usredsrede se na fiksnih 250, 400 ili 600 evra, a zaborave troškove koje su realno platili jer pomoć nije organizovana. Ako ste kupili obrok, vodu, taksi do hotela ili sobu, sačuvajte račun i dokaz da je trošak bio nužan.",
            "U zahtevu jasno odvojite dve linije: tražite proveru fiksne naknade ako smatrate da vreme nije pravi ili jedini razlog, i posebno tražite refundaciju razumnih troškova čekanja. Ta struktura je mnogo jača od jedne opšte žalbe."
          ]
        },
        {
          heading: "Šta tražiti od aviokompanije",
          body: [
            "Od aviokompanije tražite konkretan razlog: koji vremenski uslov, koji aerodrom, koji period i kako je uticao na vaš let. Ako odgovor ostane generičan, zatražite dodatno objašnjenje. Profesionalan zahtev ne mora biti agresivan, ali mora biti precizan.",
            "Ako je odgovor da su postojala ograničenja kontrole letenja zbog vremena, pitajte da li je ograničenje direktno pogodilo vaš let ili samo raniju rotaciju. Ako je problem bio prethodni avion, pitajte zašto nije ponuđena razumna alternativa kada je postalo jasno da će dolazak kasniti.",
            "Ne oslanjajte se samo na razgovor na gejtu. Osoblje često nema punu operativnu sliku i daje najkraću formulaciju koju ima. Za kasniji zahtev mnogo je bolji email, SMS ili pisani odgovor korisničke podrške."
          ]
        },
        {
          heading: "Kada slučaj ipak vredi proveriti",
          body: [
            "Slučaj vredi proveriti ako ste stigli tri sata ili više kasnije, ako je objašnjenje široko, ako su drugi letovi radili normalno, ako je kašnjenje nastavljeno i posle prestanka nevremena ili ako su troškovi čekanja bili značajni.",
            "Za putnike iz Srbije posebno proverite rutu. Let iz EU prema Srbiji, let iz Srbije ka EU evropskim prevoznikom, ili konekcija pod jednom rezervacijom mogu imati različit odgovor. Državljanstvo putnika obično nije presudno; presudni su aerodromi, operativni prevoznik i rezervacija.",
            "Najbolji pristup je konzervativan: ne obećavati sebi odštetu samo zato što ste kasnili, ali ni ne odustati samo zato što je negde pomenuto vreme. U pravom zahtevu tražite činjenice, priložite dokaze i odvojite fiksnu naknadu od troškova brige."
          ]
        }
      ],
    },
    en: {
      slug: "flight-delay-bad-weather-compensation",
      title: "Flight delay due to bad weather: when it really defeats a claim",
      description: "A guide for travelers from Serbia: when bad weather can release the airline from fixed compensation, and when it is too broad an explanation to accept without checking.",
      excerpt: "Bad weather does not automatically end a claim. The key is where the weather problem happened, whether it directly affected your flight and what the airline did to reduce the impact.",
      category: "Extraordinary circumstances",
      readTime: "8 min read",
      sections: [
        {
          heading: "Bad weather is not a magic phrase",
          body: [
            "Airlines often cite weather, bad weather or meteorological conditions as the reason for a delay or cancellation. Sometimes that is entirely justified: dense fog, storms, snow, an icy runway or dangerous winds can make a flight unsafe. But the word weather alone is not enough to automatically reject a claim.",
            "Under European passenger-rights rules, including frameworks that matter for travelers from Serbia when a route falls within European protection, the question is whether the event was outside the airline's control and could not have been avoided with reasonable measures. The specific facts matter more than a broad app notification.",
            "Competitor guides usually list bad weather as an example of extraordinary circumstances. A more useful approach is to ask immediately: which airport had the weather issue, during which period, whether other flights operated, and why your journey ended much later."
          ]
        },
        {
          heading: "Where the weather actually affected the flight",
          body: [
            "It is not the same if the weather problem was at the departure airport, destination, previous aircraft airport or somewhere else in the airline's network. If Belgrade was open, the destination operated normally, and the issue was on an earlier aircraft rotation, you should check whether the delay was really weather or organization.",
            "Passengers often hear that the previous aircraft was delayed because of weather. That may be true, but it does not answer the whole question. If the carrier had enough time to replace the aircraft, crew or offer earlier rerouting, part of the responsibility may still be disputed.",
            "Build a timeline. Write down scheduled departure, actual departure, scheduled arrival, actual arrival and every message about the reason for delay. If there were several causes, for example weather first and then crew availability, separate those phases in the claim."
          ]
        },
        {
          heading: "Other flights are a useful clue",
          body: [
            "If other flights from the same airport at the same time departed normally, the weather explanation deserves a closer look. This does not prove the airline is wrong because different aircraft, crews, slots and destinations can have different restrictions. Still, it is a signal not to accept a vague answer without detail.",
            "If many flights were delayed or the airport was closed, the airline's argument is usually stronger. Fixed compensation may then be less likely, but the rights to care, meals, hotel and reasonable continuation of travel remain a separate issue.",
            "Save screenshots from airport screens, flight-tracking apps or airport notices. You do not need to prove meteorology like an expert, but it helps to have a basic record showing what was happening around your flight."
          ]
        },
        {
          heading: "Care while waiting does not disappear",
          body: [
            "Even when bad weather is a real extraordinary circumstance, the airline cannot simply say it is not responsible and leave passengers without help. During longer waits, passengers may be entitled to meals, refreshments, communication and, if the wait runs overnight, hotel accommodation and transfer.",
            "This is where passengers often lose money. They focus on the fixed 250, 400 or 600 euros and forget the expenses they actually paid because assistance was not organized. If you bought food, water, taxi transport to a hotel or a room, keep the receipt and proof that the cost was necessary.",
            "In the claim, separate two lines: request a fixed-compensation review if you believe weather was not the real or only reason, and separately request reimbursement of reasonable waiting expenses. That structure is stronger than one general complaint."
          ]
        },
        {
          heading: "What to ask the airline",
          body: [
            "Ask the airline for a specific reason: which weather condition, which airport, which time period and how it affected your flight. If the answer remains generic, request a further explanation. A professional claim does not need to be aggressive, but it does need to be precise.",
            "If the answer refers to air traffic control restrictions caused by weather, ask whether the restriction directly affected your flight or only an earlier rotation. If the issue was the previous aircraft, ask why a reasonable alternative was not offered once it became clear arrival would be heavily delayed.",
            "Do not rely only on a conversation at the gate. Staff often do not have the full operational picture and give the shortest wording available. For a later claim, an email, SMS or written customer support response is much more useful."
          ]
        },
        {
          heading: "When the case is still worth checking",
          body: [
            "The case is worth checking if you arrived three hours or more late, if the explanation is broad, if other flights operated normally, if the delay continued after weather improved or if waiting costs were significant.",
            "For travelers from Serbia, check the route carefully. A flight from the EU to Serbia, a flight from Serbia to the EU on a European carrier, or a connection under one booking can lead to different answers. Passenger nationality is usually not decisive; airports, operating carrier and booking structure are.",
            "The best approach is conservative: do not assume compensation only because you were late, but do not give up only because weather was mentioned. A proper claim asks for facts, attaches evidence and separates fixed compensation from care expenses."
          ]
        }
      ],
    },
  },
  {
    id: "technical-fault-flight-compensation",
    publishedAt: "2026-05-02",
    updatedAt: "2026-05-02",
    sr: {
      slug: "tehnicki-kvar-aviona-odsteta",
      title: "Tehnički kvar aviona: kada putnik može da traži odštetu",
      description: "Praktično objašnjenje za putnike iz Srbije: zašto tehnički kvar često nije vanredna okolnost i koji dokazi pomažu kada aviokompanija kaže da je problem bio bezbednosni.",
      excerpt: "Tehnički problem ne znači automatski da aviokompanija ne plaća. Važno je da li je kvar deo redovnog poslovnog rizika ili retka okolnost van kontrole prevoznika.",
      category: "Tehnički kvar",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Tehnički kvar je čest, ali ne uvek vanredan",
          body: [
            "Kada let kasni zbog pregleda motora, zamene dela, problema sa vratima, hidraulikom, računarom ili drugim sistemom, aviokompanija često kaže da je morala da postupi iz bezbednosnih razloga. To je možda tačno, ali bezbednosna provera sama po sebi ne znači da je odgovornost nestala.",
            "Evropska praksa uglavnom razlikuje redovne tehničke probleme, koji su deo normalnog poslovanja aviokompanije, od zaista neuobičajenih događaja. Avion je složena mašina, kvarovi se dešavaju, ali održavanje i operativna spremnost su uobičajeni rizik prevoznika.",
            "Zato je tehnički kvar jedna od tema gde putnik ne treba brzo da odustane. Konkurenti često pojednostave poruku na technical problems may qualify. Za putnike iz Srbije korisnije je razumeti šta tačno pitati i kako odvojiti običan kvar od događaja koji je zaista van kontrole."
          ]
        },
        {
          heading: "Šta je jači osnov za zahtev",
          body: [
            "Zahtev je obično jači kada aviokompanija navede tehnički problem bez dodatnog objašnjenja, kada avion dugo stoji na gejtu, kada se čeka rezervni deo, kada se menja avion ili kada posada više ne može da leti zbog produženog čekanja. Sve to može ukazivati na operativni rizik prevoznika.",
            "Još jači trag postoji ako isti avion ima istoriju kašnjenja tog dana ili ako se problem pojavio tokom redovne pripreme za let. Putnik ne mora znati tehničke detalje, ali može pokazati da je kašnjenje nastalo u procesu koji aviokompanija organizuje i kontroliše.",
            "Ako ste stigli na krajnju destinaciju tri sata ili više kasnije, tehnički kvar svakako vredi proveriti. Fiksni iznos se zatim vezuje za dužinu rute, ali prvi prag je da se utvrdi da li je kašnjenje dovoljno dugo i da li je uzrok u sferi aviokompanije."
          ]
        },
        {
          heading: "Kada aviokompanija može imati jači argument",
          body: [
            "Nisu svi tehnički događaji isti. Ako je štetu izazvao sudar sa pticom, skriveni proizvodni defekt koji je hitno objavio proizvođač, sabotaža, oštećenje na pisti od trećeg lica ili potpuno neočekivana bezbednosna zabrana, aviokompanija može imati ozbiljniji argument da je događaj vanredan.",
            "I tada treba proveriti šta je prevoznik uradio posle događaja. Vanredan početni uzrok ne daje automatsko pravo da se putnik ostavi bez razumnog preusmeravanja, obroka ili hotela. Razlika između uzroka i kasnije organizacije je važna.",
            "Ako odgovor aviokompanije glasi samo technical reasons, to nije dovoljno precizno. Pitajte da li je problem bio u redovnom održavanju, iznenadnom oštećenju, nalogu proizvođača, bezbednosnoj odluci ili nečemu trećem. Što je odgovor konkretniji, lakše je proceniti slučaj."
          ]
        },
        {
          heading: "Dokazi koje putnik može realno da prikupi",
          body: [
            "Putnik najčešće nema pristup tehničkom dnevniku aviona, ali ima pristup dokazima o posledicama. Sačuvajte boarding pass, emailove, SMS poruke, screenshot aplikacije, fotografiju table, vaučere, račune i svaku poruku u kojoj se pominje razlog kašnjenja.",
            "Ako osoblje kaže da se čeka mehaničar, deo, zamena aviona ili završetak pregleda, zapišite tačnu formulaciju, vreme i mesto. Usmena izjava nije presudna, ali pomaže da se kasnije postavi preciznije pitanje aviokompaniji.",
            "Kod konekcija čuvajte i dokumente za propušteni segment. Ako je sve kupljeno u jednoj rezervaciji, relevantno može biti kašnjenje na poslednjoj destinaciji, ne samo kašnjenje prvog leta. To često menja iznos i osnov zahteva."
          ]
        },
        {
          heading: "Briga i troškovi su posebno pitanje",
          body: [
            "Tehnički kvar često znači dugo čekanje bez jasne satnice. U takvim situacijama aviokompanija treba da obezbedi obroke i osveženje u odnosu na dužinu čekanja, a ako se čekanje prebaci na naredni dan, hotel i transfer.",
            "Ako pomoć nije ponuđena ili je bila nedovoljna, platite razumno i čuvajte račune. Ne treba praviti luksuzne troškove, ali putnik ne mora ostati bez hrane, vode ili smeštaja celu noć. Račun plus kratko objašnjenje zašto je trošak nastao često je dovoljno za početnu reklamaciju.",
            "U zahtevu razdvojite fiksnu naknadu od troškova. Napišite: zbog tehničkog kvara stigao sam četiri sata kasnije i tražim proveru naknade; dodatno tražim refundaciju ovih računa jer pomoć nije obezbeđena. Takav zahtev je pregledan."
          ]
        },
        {
          heading: "Kako napisati kratak zahtev",
          body: [
            "Dobar zahtev ne mora biti dugačak. Navedite broj leta, datum, rutu, planirano i stvarno vreme dolaska, objašnjenje koje ste dobili i dokumente koje prilažete. Ako je rečeno da je razlog tehnički kvar, tražite da aviokompanija potvrdi tačan uzrok i osnov za eventualno odbijanje.",
            "Ne ulazite u tvrdnju da ste sigurni da je kompanija kriva ako nemate detalje. Bolje je napisati da, prema dostupnim informacijama, tehnički kvar deluje kao operativni rizik prevoznika, pa tražite obradu zahteva za naknadu i troškove.",
            "Za putnike iz Srbije posebno proverite da li ruta spada u evropsku zaštitu. Let koji polazi iz EU pokriven je šire nego dolazni let neevropske kompanije iz treće zemlje. Ta razlika je često važnija od državljanstva putnika."
          ]
        }
      ],
    },
    en: {
      slug: "technical-fault-flight-compensation",
      title: "Aircraft technical fault: when a passenger can claim compensation",
      description: "A practical explanation for travelers from Serbia: why a technical fault is often not extraordinary and which evidence helps when an airline says the issue was safety-related.",
      excerpt: "A technical problem does not automatically mean the airline avoids payment. The key is whether the fault was part of ordinary operational risk or a rare event outside the carrier's control.",
      category: "Technical fault",
      readTime: "8 min read",
      sections: [
        {
          heading: "A technical fault is common, but not always extraordinary",
          body: [
            "When a flight is delayed because of an engine inspection, replacement part, door issue, hydraulics, computer fault or another aircraft system, the airline often says it had to act for safety reasons. That may be true, but a safety inspection by itself does not mean responsibility disappears.",
            "European practice generally separates ordinary technical problems, which are part of normal airline operations, from truly unusual events. An aircraft is a complex machine and faults happen, but maintenance and operational readiness are normal carrier risks.",
            "That is why technical faults are a topic where passengers should not give up too quickly. Competitors often simplify the message to technical problems may qualify. For travelers from Serbia, it is more useful to know what to ask and how to separate an ordinary fault from a genuinely external event."
          ]
        },
        {
          heading: "What makes the claim stronger",
          body: [
            "The claim is usually stronger when the airline cites a technical issue without further detail, when the aircraft sits at the gate for a long time, when passengers wait for a spare part, when the aircraft is changed or when the crew times out because of the delay. These facts may point to the carrier's operational risk.",
            "There is an even stronger clue if the same aircraft had delay history that day or if the issue appeared during normal preparation for the flight. The passenger does not need to know technical details, but can show that the delay arose in a process organized and controlled by the airline.",
            "If you arrived at your final destination three hours or more late, a technical fault is worth checking. The fixed amount then depends on route distance, but the first threshold is whether the arrival delay is long enough and whether the cause sits within the airline's sphere."
          ]
        },
        {
          heading: "When the airline may have a stronger argument",
          body: [
            "Not all technical events are the same. If damage was caused by a bird strike, a hidden manufacturing defect urgently announced by the manufacturer, sabotage, runway damage caused by a third party or a completely unexpected safety ban, the airline may have a stronger argument that the event was extraordinary.",
            "Even then, check what the carrier did after the event. An extraordinary initial cause does not automatically allow passengers to be left without reasonable rerouting, meals or hotel accommodation. The difference between the cause and later organization matters.",
            "If the airline's answer says only technical reasons, that is not specific enough. Ask whether the issue was normal maintenance, sudden damage, a manufacturer instruction, a safety decision or something else. The more precise the answer, the easier it is to assess the case."
          ]
        },
        {
          heading: "Evidence passengers can realistically collect",
          body: [
            "Passengers rarely have access to the aircraft technical log, but they can collect evidence about the consequences. Keep the boarding pass, emails, SMS messages, app screenshots, airport-board photos, vouchers, receipts and every message mentioning the reason for delay.",
            "If staff say passengers are waiting for a mechanic, spare part, aircraft replacement or inspection completion, write down the exact wording, time and place. A verbal statement is not decisive, but it helps you ask a more precise question later.",
            "For connections, keep documents for the missed segment too. If everything was bought under one booking, the relevant delay may be the delay at the final destination, not just the first flight. This often changes both the amount and the basis of the claim."
          ]
        },
        {
          heading: "Care and expenses are separate",
          body: [
            "A technical fault often means a long wait without a clear timetable. In such situations, the airline should provide meals and refreshments in proportion to the wait, and if the delay moves to the next day, hotel accommodation and transfer.",
            "If assistance was not offered or was inadequate, pay reasonably and keep receipts. You should not create luxury expenses, but a passenger does not have to go without food, water or accommodation all night. A receipt plus a short explanation of why the cost arose is often enough for the initial complaint.",
            "Separate fixed compensation from expenses in the claim. Write: because of the technical fault I arrived four hours late and request compensation review; separately I request reimbursement of these receipts because assistance was not provided. That structure is easy to process."
          ]
        },
        {
          heading: "How to write a short claim",
          body: [
            "A good claim does not need to be long. State the flight number, date, route, scheduled and actual arrival time, the explanation you received and the documents attached. If you were told the reason was a technical fault, ask the airline to confirm the exact cause and the basis for any refusal.",
            "Avoid saying you are certain the airline is at fault if you do not have details. It is better to write that, based on available information, the technical fault appears to be an operational carrier risk, so you request processing of compensation and expense reimbursement.",
            "For travelers from Serbia, check whether the route falls within European protection. A flight departing from the EU is covered more broadly than an incoming flight operated by a non-European carrier from a third country. That distinction often matters more than passenger nationality."
          ]
        }
      ],
    },
  },
  {
    id: "previous-flight-rotation-delay",
    publishedAt: "2026-05-02",
    updatedAt: "2026-05-02",
    sr: {
      slug: "kasnjenje-prethodnog-leta-rotacija-aviona",
      title: "Kasni prethodni let: da li je rotacija aviona opravdanje",
      description: "Šta znači kada aviokompanija kaže da vaš let kasni zbog kasnog dolaska aviona i kako putnik iz Srbije treba da proveri da li i dalje postoji osnov za naknadu.",
      excerpt: "Kasni dolazak prethodnog aviona nije automatski vanredna okolnost. Treba proveriti zašto je prethodni let kasnio i da li je aviokompanija mogla da smanji posledice.",
      category: "Kašnjenje leta",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Rotacija aviona je normalan deo posla",
          body: [
            "Aviokompanije koriste isti avion za više letova tokom dana. Ako raniji segment kasni, posledice se mogu preliti na vaš polazak. Putnik tada često dobije objašnjenje late arrival of incoming aircraft, aircraft rotation ili operational reasons.",
            "To objašnjenje nije samo po sebi dovoljno da se zahtev odbije. Rotacija aviona je način na koji aviokompanija organizuje posao, pa se mora proveriti zašto je prethodni let zakasnio i da li je prevoznik mogao da reaguje razumnim merama.",
            "Konkurentski sadržaji često navode dolazak tri sata kasnije kao prag, ali ne objašnjavaju dovoljno šta uraditi kada kompanija prebaci priču na prethodni let. Za putnike iz Srbije to je čest scenario na rutama sa bazama u EU i gustim dnevnim rasporedom."
          ]
        },
        {
          heading: "Prvo pitanje je zašto je prethodni let kasnio",
          body: [
            "Ako je prethodni let kasnio zbog ozbiljnog nevremena, zatvaranja piste, restrikcija kontrole letenja ili bezbednosne situacije, aviokompanija može imati jači argument. Ali ako je prethodno kašnjenje nastalo zbog tehničkog problema, rasporeda posade, čekanja putnika ili lošeg planiranja, zahtev može ostati jak.",
            "Zato ne prihvatajte odgovor late incoming aircraft kao kraj priče. To je posledica, ne uzrok. U zahtevu tražite konkretan razlog kašnjenja prethodnog leta i objašnjenje zašto nije bilo moguće zameniti avion, promeniti rotaciju ili ponuditi ranije preusmeravanje.",
            "Ako je avion stigao kasno, pa se još čekala posada ili slot, zapišite svaku fazu. Kombinovani razlozi su česti, a zahtev je jači kada se vidi da deo kašnjenja nije bio neizbežan."
          ]
        },
        {
          heading: "Mere za smanjenje posledica",
          body: [
            "Čak i kada prvi problem nije bio pod kontrolom aviokompanije, prevoznik mora razumno da upravlja posledicama. Ako je već rano bilo jasno da avion neće stići, pitanje je da li je postojao rezervni avion, druga posada, preusmeravanje preko partnera ili ranije obaveštenje putnicima.",
            "To ne znači da aviokompanija mora uvek imati rezervni avion za svaki let. Ali ako je kašnjenje naraslo jer se satima čekalo bez plana, bez informacija i bez realne alternative, deo slučaja može biti sporan.",
            "Za putnika je važno da dokumentuje kada je dobio obaveštenje. Ako ste već mogli da budete preusmereni ranije, ali ste informaciju dobili tek kada su sve alternative prošle, to je relevantno za procenu da li su preduzete razumne mere."
          ]
        },
        {
          heading: "Kako se računa kašnjenje",
          body: [
            "Kod fiksne naknade presudno je kašnjenje na krajnjoj destinaciji, ne samo polazak. Ako je avion krenuo tri sata kasnije, ali je stigao dva sata i pedeset minuta kasnije, prag možda nije pređen. Ako ste zbog toga propustili konekciju iz iste rezervacije, računa se dolazak na poslednju destinaciju.",
            "Kod odvojenih karata situacija je slabija jer svaki let najčešće stoji zasebno. Ako ste sami spojili dva prevoznika, kašnjenje prvog leta može biti problem za drugi, ali drugi prevoznik obično nije odgovoran za vašu samostalnu kombinaciju.",
            "Zato sačuvajte pun itinerary. Jedan PNR, jedna rezervacija i jedna cena često daju drugačiji odgovor od dva odvojena emaila i dva odvojena broja rezervacije. To je naročito važno na letovima iz Srbije preko Beča, Frankfurta, Istanbula, Varšave ili Rima."
          ]
        },
        {
          heading: "Dokazi i pitanja za korisničku podršku",
          body: [
            "Sačuvajte poruke koje pominju kasni dolazak aviona, promene gejta, novo vreme poletanja i novu konekciju. Ako aplikacija pokazuje prethodni segment ili registraciju aviona, screenshot može pomoći, iako nije neophodan.",
            "Korisničkoj podršci postavite tri pitanja: koji je bio uzrok kašnjenja prethodnog leta, kada je aviokompanija saznala da će vaš let kasniti i koje alternative su razmatrane. Ta pitanja teraju odgovor iz opšte fraze u konkretnu operativnu priču.",
            "Ako dobijete samo šablonsko odbijanje, slučaj nije nužno završen. Generičan odgovor često znači da zahtev nije stvarno analiziran. Tada vredi poslati kraći follow-up sa preciznim pitanjima i priloženom vremenskom linijom."
          ]
        },
        {
          heading: "Kada je zahtev posebno vredan provere",
          body: [
            "Zahtev posebno vredi proveriti kada je razlog nejasan, kada je dolazak na destinaciju kasnio tri sata ili više, kada su propuštene konekcije bile u istoj rezervaciji ili kada je kompanija nekoliko puta pomerala vreme bez stvarnog plana.",
            "Ako je prethodni let kasnio zbog događaja koji je zaista van kontrole, fiksna naknada može biti teža. Ali i tada proverite obroke, hotel, transfer, komunikaciju i refundaciju razumnih troškova. Ta prava nisu isto što i fiksna odšteta.",
            "Najbolji zahtev ne napada aviokompaniju, već traži objašnjenje. Napišite da late incoming aircraft nije dovoljan uzrok, navedite stvarno kašnjenje i zatražite potvrdu prvog uzroka i mera koje su preduzete da se posledice smanje."
          ]
        }
      ],
    },
    en: {
      slug: "previous-flight-rotation-delay-compensation",
      title: "Previous flight delayed: is aircraft rotation an excuse",
      description: "What it means when an airline says your flight was delayed by late arrival of the aircraft, and how travelers from Serbia should check whether compensation is still possible.",
      excerpt: "Late arrival of the previous aircraft is not automatically an extraordinary circumstance. You need to check why the previous flight was late and whether the airline could reduce the impact.",
      category: "Flight delay",
      readTime: "8 min read",
      sections: [
        {
          heading: "Aircraft rotation is normal airline business",
          body: [
            "Airlines use the same aircraft for several flights during the day. If an earlier segment is delayed, the consequences can spill into your departure. Passengers often receive explanations such as late arrival of incoming aircraft, aircraft rotation or operational reasons.",
            "That explanation is not enough by itself to reject a claim. Aircraft rotation is part of how the airline organizes its business, so the real question is why the previous flight was delayed and whether the carrier could have reacted with reasonable measures.",
            "Competitor content often mentions the three-hour arrival threshold, but does not explain enough what to do when the airline shifts the story to the previous flight. For travelers from Serbia this is common on routes connected to EU bases and tight daily schedules."
          ]
        },
        {
          heading: "First ask why the previous flight was delayed",
          body: [
            "If the previous flight was delayed by severe weather, runway closure, air traffic restrictions or a security event, the airline may have a stronger argument. But if the earlier delay came from a technical problem, crew planning, waiting for passengers or poor scheduling, the claim may remain strong.",
            "Do not accept late incoming aircraft as the end of the story. It is a consequence, not a cause. In the claim, ask for the specific reason for the previous flight's delay and why the airline could not replace the aircraft, change the rotation or offer earlier rerouting.",
            "If the aircraft arrived late and then passengers also waited for crew or a slot, write down each phase. Mixed reasons are common, and a claim is stronger when it shows that part of the delay was not unavoidable."
          ]
        },
        {
          heading: "Measures to reduce the impact",
          body: [
            "Even when the first problem was outside the airline's control, the carrier must reasonably manage the consequences. If it was clear early that the aircraft would not arrive on time, the question is whether there was a spare aircraft, another crew, partner rerouting or earlier passenger notice.",
            "This does not mean an airline must always have a spare aircraft for every flight. But if the delay grew because passengers waited for hours without a plan, information or a realistic alternative, part of the case may be disputed.",
            "For the passenger, it is important to document when notice was received. If you could have been rerouted earlier but were informed only after all alternatives had passed, that matters when assessing whether reasonable measures were taken."
          ]
        },
        {
          heading: "How the delay is calculated",
          body: [
            "For fixed compensation, arrival delay at the final destination is decisive, not departure delay alone. If the aircraft left three hours late but arrived two hours and fifty minutes late, the threshold may not be met. If you missed a same-booking connection, arrival at the last destination matters.",
            "With separate tickets, the situation is weaker because each flight is usually assessed separately. If you combined two carriers yourself, the first delay may create a practical problem for the second flight, but the second carrier is usually not responsible for your self-made connection.",
            "Keep the full itinerary. One PNR, one booking and one price often lead to a different answer than two separate emails and two booking references. This matters especially on routes from Serbia via Vienna, Frankfurt, Istanbul, Warsaw or Rome."
          ]
        },
        {
          heading: "Evidence and questions for customer support",
          body: [
            "Keep messages mentioning late aircraft arrival, gate changes, new departure times and new connections. If the app shows the previous segment or aircraft registration, a screenshot can help, although it is not essential.",
            "Ask customer support three questions: what caused the previous flight delay, when the airline learned your flight would be delayed, and which alternatives were considered. These questions move the answer from a generic phrase to a concrete operational explanation.",
            "If you receive only a template refusal, the case is not necessarily over. A generic answer often means the claim was not really analyzed. It is worth sending a shorter follow-up with precise questions and your timeline attached."
          ]
        },
        {
          heading: "When the claim is especially worth checking",
          body: [
            "The claim is especially worth checking when the reason is unclear, arrival at the destination was three hours or more late, missed connections were under the same booking or the airline repeatedly changed the estimated time without a real plan.",
            "If the previous flight was delayed by an event genuinely outside the airline's control, fixed compensation may be harder. But still check meals, hotel, transfer, communication and reimbursement of reasonable expenses. These rights are not the same as fixed compensation.",
            "The best claim does not attack the airline; it asks for an explanation. Write that late incoming aircraft is not a sufficient cause, state the actual arrival delay and request confirmation of the first cause and the measures taken to reduce the consequences."
          ]
        }
      ],
    },
  },
  {
    id: "overnight-delay-hotel-rights",
    publishedAt: "2026-05-02",
    updatedAt: "2026-05-02",
    sr: {
      slug: "nocno-kasnjenje-leta-hotel-prava",
      title: "Noćno kašnjenje leta: hotel, transfer i računi koje treba sačuvati",
      description: "Šta putnik iz Srbije može da traži kada se kašnjenje ili otkazivanje pretvori u noćenje na aerodromu, i kako razlikovati brigu od fiksne odštete.",
      excerpt: "Hotel i obroci nisu isto što i odšteta od 250, 400 ili 600 evra. Kod noćnog čekanja važno je odmah tražiti pomoć i čuvati razumne račune.",
      category: "Pravo na brigu",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Noćno čekanje otvara posebna prava",
          body: [
            "Kada se kašnjenje ili otkazivanje protegne preko noći, problem više nije samo dolazak kasnije. Putnik mora negde da spava, jede, stigne do smeštaja i vrati se na aerodrom. Evropska pravila zato razlikuju fiksnu naknadu od prava na brigu.",
            "Pravo na brigu može postojati i kada fiksna naknada nije sigurna. Na primer, ako je let otkazan zbog ozbiljnog nevremena, aviokompanija može osporavati 250, 400 ili 600 evra, ali i dalje mora razumno brinuti o putnicima dok čekaju nastavak puta.",
            "Konkurentski vodiči često pomenu meals and hotel accommodation, ali putnicima nedostaje praktičan deo: šta uraditi kada šalter ne radi, vaučera nema, a poslednji autobus do grada je već otišao."
          ]
        },
        {
          heading: "Prvo tražite pomoć od aviokompanije",
          body: [
            "Ako je jasno da čekate do sledećeg dana, prvo tražite hotel, transfer i obroke od aviokompanije. Pitajte na gejtu, šalteru, u aplikaciji i preko korisničke podrške. Sačuvajte screenshotove i imena kanala preko kojih ste pokušali.",
            "Ako aviokompanija organizuje hotel, proverite i transfer. Soba bez prevoza nije potpuna pomoć ako je hotel daleko, javni prevoz više ne radi ili putujete sa decom, starijim osobama ili puno prtljaga.",
            "Ako dobijete vaučer koji realno ne pokriva osnovni obrok ili je restoran zatvoren, fotografišite situaciju. Kasnije će biti lakše objasniti zašto ste morali sami da platite razuman obrok ili vodu."
          ]
        },
        {
          heading: "Kada sami plaćate, plaćajte razumno",
          body: [
            "Ako pomoći nema, putnik može platiti nužne troškove i tražiti refundaciju. Ključna reč je razumno. Standardan hotel, normalan obrok, transfer do smeštaja i nazad, osnovna higijena ili komunikacija mnogo se lakše brane nego luksuzni troškovi.",
            "Nije uvek realno pronaći najjeftiniji hotel u ponoć sa decom ili posle otkazivanja više letova. Ali treba moći objasniti zašto je trošak bio nužan u datim okolnostima. Račun bez objašnjenja je slabiji od računa uz kratku vremensku liniju.",
            "Sačuvajte fiskalne račune, potvrde kartičnog plaćanja, booking potvrdu hotela i poruke aviokompanije. Ako račun nije na vaše ime, zapišite ko je putovao i zašto je plaćeno jednom karticom."
          ]
        },
        {
          heading: "Hotel nije zamena za fiksnu odštetu",
          body: [
            "Ako aviokompanija obezbedi hotel, to ne znači da ste se odrekli prava na fiksnu naknadu. Hotel je pomoć tokom čekanja; naknada je odvojeno pitanje koje zavisi od kašnjenja na dolasku, rute i razloga poremećaja.",
            "Obrnuto važi isto: ako nema osnova za fiksnu naknadu zbog vanrednih okolnosti, i dalje možete tražiti refundaciju razumnih troškova brige ako pomoć nije pružena. Mnogi putnici pogrešno misle da je sve izgubljeno čim kompanija kaže extraordinary circumstances.",
            "U komunikaciji ne mešajte ove osnove. Jedan deo zahteva neka bude compensation for delay or cancellation, drugi reimbursement of expenses. To pomaže da osoba koja obrađuje zahtev ne odbije sve zajedno zbog jedne sporne tačke."
          ]
        },
        {
          heading: "Posebne situacije: deca, stariji i smanjena pokretljivost",
          body: [
            "Porodice sa decom, putnici smanjene pokretljivosti, stariji putnici i osobe sa posebnim potrebama ne treba da čekaju satima bez jasne pomoći. U praksi je važno odmah naglasiti posebne potrebe i tražiti prioritetno rešenje.",
            "Ako aviokompanija ne reaguje, dokumentujte pokušaje. Pošaljite poruku korisničkoj podršci, fotografišite red, zapišite vreme i ime šaltera ako postoji. Ovo nije dramatizacija, već način da se kasnije pokaže da ste pomoć tražili pre nego što ste sami platili.",
            "Kod putovanja iz Srbije preko velikih evropskih aerodroma noćna kašnjenja mogu biti posebno teška jer putnik ne poznaje grad, jezik ili lokalni prevoz. To je dodatni razlog da dokumentacija bude uredna."
          ]
        },
        {
          heading: "Kako kasnije podneti zahtev",
          body: [
            "U zahtevu navedite let, datum, planirano i stvarno vreme, kada je postalo jasno da ostajete preko noći, šta je aviokompanija ponudila i šta ste morali sami da platite. Priložite račune po redosledu.",
            "Ako tražite i fiksnu naknadu, jasno napišite koliko ste kasno stigli na krajnju destinaciju. Ako tražite samo troškove brige, recite to direktno. Kratak zahtev sa tabelom troškova često prolazi bolje od dugačkog opisa frustracije.",
            "Letkasni.rs ovakve slučajeve proverava konzervativno: prvo se odvaja da li postoji osnov za fiksnu naknadu, zatim da li postoje računi za nužnu brigu. Ta dva puta zajedno daju putniku jasniju sliku šta realno može da traži."
          ]
        }
      ],
    },
    en: {
      slug: "overnight-flight-delay-hotel-rights",
      title: "Overnight flight delay: hotel, transfer and receipts to keep",
      description: "What travelers from Serbia can request when a delay or cancellation turns into an overnight airport wait, and how to separate care from fixed compensation.",
      excerpt: "Hotel and meals are not the same as compensation of 250, 400 or 600 euros. During an overnight wait, ask for help early and keep reasonable receipts.",
      category: "Right to care",
      readTime: "8 min read",
      sections: [
        {
          heading: "An overnight wait creates separate rights",
          body: [
            "When a delay or cancellation stretches overnight, the problem is no longer only arriving late. The passenger needs somewhere to sleep, food, transport to accommodation and a return to the airport. European rules therefore separate fixed compensation from the right to care.",
            "The right to care may exist even when fixed compensation is uncertain. For example, if a flight is cancelled because of severe weather, the airline may dispute 250, 400 or 600 euros, but it still has to reasonably care for passengers while they wait for onward travel.",
            "Competitor guides often mention meals and hotel accommodation, but passengers need the practical part: what to do when the desk is closed, no voucher is offered and the last bus to the city has already left."
          ]
        },
        {
          heading: "First ask the airline for help",
          body: [
            "If it is clear that you are waiting until the next day, first ask the airline for hotel accommodation, transfer and meals. Ask at the gate, service desk, in the app and through customer support. Keep screenshots and the channels you used.",
            "If the airline arranges a hotel, check the transfer too. A room without transport is incomplete help if the hotel is far away, public transport has stopped or you are traveling with children, older passengers or heavy luggage.",
            "If you receive a voucher that does not realistically cover a basic meal or the restaurant is closed, photograph the situation. Later it will be easier to explain why you had to pay yourself for a reasonable meal or water."
          ]
        },
        {
          heading: "If you pay yourself, pay reasonably",
          body: [
            "If help is not provided, the passenger may pay necessary costs and request reimbursement. The key word is reasonable. A standard hotel, normal meal, transfer to and from accommodation, basic hygiene or communication are much easier to justify than luxury expenses.",
            "It is not always realistic to find the cheapest hotel at midnight with children or after multiple flight cancellations. But you should be able to explain why the cost was necessary in the circumstances. A receipt without explanation is weaker than a receipt with a short timeline.",
            "Keep fiscal receipts, card payment confirmations, hotel booking confirmation and airline messages. If the receipt is not in your name, write down who traveled and why one card paid for several people."
          ]
        },
        {
          heading: "A hotel is not a replacement for fixed compensation",
          body: [
            "If the airline provides a hotel, that does not mean you gave up fixed compensation. Hotel accommodation is assistance during the wait; compensation is separate and depends on arrival delay, route and the reason for disruption.",
            "The reverse is also true: if fixed compensation is not available because of extraordinary circumstances, you may still request reimbursement of reasonable care expenses if assistance was not provided. Many passengers wrongly think everything is lost once the airline says extraordinary circumstances.",
            "Do not mix these bases in communication. One part of the request should be compensation for delay or cancellation, the other reimbursement of expenses. This helps the person processing the claim avoid rejecting everything because one point is disputed."
          ]
        },
        {
          heading: "Special situations: children, older passengers and reduced mobility",
          body: [
            "Families with children, passengers with reduced mobility, older travelers and people with special needs should not wait for hours without clear help. In practice, it is important to state special needs immediately and request priority assistance.",
            "If the airline does not respond, document your attempts. Send a message to customer support, photograph the queue, write down the time and the desk name if there is one. This is not exaggeration; it shows later that you asked for help before paying yourself.",
            "For travel from Serbia through large European airports, overnight disruption can be especially difficult because the passenger may not know the city, language or local transport. That is another reason to keep documentation orderly."
          ]
        },
        {
          heading: "How to submit the claim later",
          body: [
            "In the claim, state the flight, date, scheduled and actual time, when it became clear you would stay overnight, what the airline offered and what you had to pay yourself. Attach receipts in order.",
            "If you also request fixed compensation, clearly state how late you arrived at the final destination. If you request only care expenses, say so directly. A short claim with a cost table often works better than a long description of frustration.",
            "Letkasni.rs reviews these cases conservatively: first whether fixed compensation may exist, then whether there are receipts for necessary care. Those two tracks together give the passenger a clearer view of what can realistically be requested."
          ]
        }
      ],
    },
  },
  {
    id: "self-rerouting-new-ticket",
    publishedAt: "2026-05-02",
    updatedAt: "2026-05-02",
    sr: {
      slug: "samostalno-kupljen-novi-let-refundacija",
      title: "Sami ste kupili novi let: kada možete tražiti povraćaj troška",
      description: "Kada ima smisla kupiti zamenski let posle otkazivanja ili velikog kašnjenja, koje rizike putnik preuzima i kako dokumentovati zahtev za refundaciju.",
      excerpt: "Novi let kupljen na svoju ruku može biti nužan, ali nije uvek automatski refundabilan. Ključni su razlog, hitnost, ponuđena alternativa i razumnost cene.",
      category: "Refundacija troškova",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Samostalna kupovina je poslednji korak, ne prvi",
          body: [
            "Kada se let otkaže ili ozbiljno kasni, putnik često poželi da odmah kupi drugi let i kasnije pošalje račun aviokompaniji. To ponekad ima smisla, ali nosi rizik. Aviokompanija može tvrditi da je nudila svoju alternativu ili da je kupljena karta bila nerazumno skupa.",
            "Prvo tražite rešenje od aviokompanije: preusmeravanje najranijom prilikom, let preko druge tačke, kasniji let ili refundaciju ako putovanje više nema svrhu. Tek ako realna pomoć izostane, samostalna kupovina postaje jači argument.",
            "Konkurenti često ističu pravo na rerouting i refund, ali putnicima nedostaje granica između opravdane samopomoći i preskupog samostalnog plana. Za putnike iz Srbije ta granica je važna jer zamenske karte istog dana mogu biti vrlo skupe."
          ]
        },
        {
          heading: "Dokumentujte da ste prvo tražili alternativu",
          body: [
            "Pre kupovine novog leta pošaljite poruku aviokompaniji ili priđite šalteru i tražite alternativu. Ako nema odgovora, zapišite vreme, kanal i osobu ili šalter. Screenshot čekanja u chatu ili email bez odgovora može biti koristan.",
            "Ako je alternativa ponuđena, uporedite je sa vašom realnom potrebom. Let za tri dana možda nije razuman ako putujete na poslovni događaj sutra, ali može biti razuman ako je putovanje fleksibilno. Kontekst je bitan.",
            "Ako kupujete novu kartu, sačuvajte pretragu koja pokazuje dostupne opcije i cene u tom trenutku. To pomaže da pokažete da niste birali luksuz ili nepotrebno skup let, već realnu dostupnu alternativu."
          ]
        },
        {
          heading: "Razumna cena je ključna",
          body: [
            "Aviokompanija će lakše prihvatiti refundaciju ako je novi let bio razuman po ceni, vremenu i ruti. Direktan let nije uvek obavezan ako postoji mnogo jeftinija i razumno brza konekcija, ali putnik nije dužan da prihvati nerealno dugo putovanje sa više noćenja.",
            "Business karta kupljena jer nije bilo economy mesta može biti sporna, ali nije automatski izgubljena ako je to bila jedina dostupna opcija za nužan dolazak. Tada treba posebno objasniti zašto je hitnost postojala i zašto je cena bila neizbežna.",
            "Ako je nova karta kupljena za celu porodicu, napravite pregled po putniku. Kod refundacije je mnogo jasnije kada se vidi broj putnika, cena po putniku, takse i ukupni iznos."
          ]
        },
        {
          heading: "Refundacija karte nije isto što i fiksna naknada",
          body: [
            "Trošak novog leta je refundacija štete ili troška nastavka puta. Fiksna naknada od 250, 400 ili 600 evra je drugo pitanje. Moguće je da tražite oba, ali pod različitim osnovima.",
            "Na primer, ako je let otkazan manje od 14 dana pre polaska, razlog je u odgovornosti aviokompanije, a vi ste stigli mnogo kasnije, fiksna naknada može biti relevantna. Ako ste dodatno morali kupiti novi let jer alternativa nije ponuđena, račun se traži posebno.",
            "Ako je poremećaj nastao zbog vanrednih okolnosti, fiksna naknada može biti slabija, ali pitanje razumnog preusmeravanja i nužnih troškova ne nestaje automatski. Zato zahtev mora biti strukturisan."
          ]
        },
        {
          heading: "Odvojene karte i samostalne konekcije",
          body: [
            "Ako ste sami spojili dve odvojene karte, morate biti oprezni. Aviokompanija prvog leta obično nije odgovorna za to što ste propustili drugi odvojeni let, osim ako je postojao poseban osnov. To ne znači da nema prava zbog prvog kašnjenja, ali novi let za spasavanje druge karte može biti sporan.",
            "Ako je sve bilo u jednoj rezervaciji, pozicija je jača. Tada aviokompanija obično mora da vas dovede do krajnje destinacije iz rezervacije, a ne samo do prvog aerodroma. To je jedna od najvažnijih razlika.",
            "Putnici iz Srbije često kombinuju low-cost karte sa velikim hubovima. Takva putovanja mogu biti jeftina, ali kod poremećaja nose veći rizik. U zahtevu budite iskreni oko strukture rezervacije, jer se to lako proverava."
          ]
        },
        {
          heading: "Kako poslati zahtev za povraćaj",
          body: [
            "Zahtev treba da sadrži originalni let, poremećaj, šta ste tražili od aviokompanije, šta je ponuđeno ili nije ponuđeno, zašto ste morali kupiti novi let i koliki je trošak. Priložite račun, boarding pass za novi let i dokaz plaćanja.",
            "Ako je putovanje bilo hitno, objasnite to kratko: poslovni događaj, medicinski termin, povratak detetu, propuštena konekcija iz iste rezervacije. Ne morate preterivati; dovoljan je realan razlog zbog kog čekanje nije bilo prihvatljivo.",
            "Najveća greška je kupiti najskuplju kartu bez pokušaja kontakta i kasnije poslati samo račun. Mnogo jači zahtev pokazuje da ste prvo dali aviokompaniji šansu da ispuni obavezu, a zatim izabrali razumnu alternativu jer pomoći nije bilo."
          ]
        }
      ],
    },
    en: {
      slug: "bought-new-flight-yourself-reimbursement",
      title: "You bought a new flight yourself: when can you claim the cost",
      description: "When buying a replacement flight after cancellation or a major delay makes sense, what risks passengers take and how to document a reimbursement request.",
      excerpt: "A new flight bought on your own may be necessary, but it is not always automatically reimbursed. The key points are reason, urgency, offered alternative and reasonable price.",
      category: "Expense reimbursement",
      readTime: "8 min read",
      sections: [
        {
          heading: "Buying yourself is the last step, not the first",
          body: [
            "When a flight is cancelled or seriously delayed, passengers often want to buy another flight immediately and send the bill later. Sometimes this makes sense, but it carries risk. The airline may say it offered its own alternative or that the ticket bought was unreasonably expensive.",
            "First ask the airline for a solution: rerouting at the earliest opportunity, a flight through another point, a later flight or refund if the journey no longer has a purpose. Only if real assistance is missing does self-rerouting become a stronger argument.",
            "Competitors often emphasize the right to rerouting and refund, but passengers need the line between justified self-help and an expensive self-made plan. For travelers from Serbia that line matters because same-day replacement tickets can be very costly."
          ]
        },
        {
          heading: "Document that you first asked for an alternative",
          body: [
            "Before buying a new flight, message the airline or go to the desk and ask for an alternative. If there is no answer, write down the time, channel and person or desk. A screenshot of waiting in chat or an unanswered email can help.",
            "If an alternative is offered, compare it with your real need. A flight in three days may be unreasonable if you travel to a business event tomorrow, but it may be reasonable if the trip is flexible. Context matters.",
            "If you buy a new ticket, keep the search showing available options and prices at that time. It helps show that you did not choose luxury or an unnecessarily expensive flight, but a realistic available alternative."
          ]
        },
        {
          heading: "A reasonable price is key",
          body: [
            "The airline is more likely to accept reimbursement if the new flight was reasonable in price, timing and route. A direct flight is not always required if a much cheaper and reasonably fast connection exists, but the passenger does not have to accept an unrealistic journey with several overnight stops.",
            "A business-class ticket bought because no economy seats were available may be disputed, but it is not automatically lost if it was the only available option for necessary arrival. Then you should explain why urgency existed and why the price was unavoidable.",
            "If the new ticket was bought for a whole family, make a breakdown per passenger. Reimbursement is much clearer when the number of passengers, price per passenger, taxes and total amount are visible."
          ]
        },
        {
          heading: "Ticket reimbursement is not fixed compensation",
          body: [
            "The cost of a new flight is reimbursement of damage or onward-travel cost. Fixed compensation of 250, 400 or 600 euros is a different issue. You may request both, but under different bases.",
            "For example, if the flight was cancelled less than 14 days before departure, the cause was within the airline's responsibility and you arrived much later, fixed compensation may be relevant. If you also had to buy a new flight because no alternative was offered, that receipt is requested separately.",
            "If the disruption was caused by extraordinary circumstances, fixed compensation may be weaker, but reasonable rerouting and necessary expenses do not automatically disappear. That is why the request must be structured."
          ]
        },
        {
          heading: "Separate tickets and self-made connections",
          body: [
            "If you combined two separate tickets yourself, be careful. The airline operating the first flight is usually not responsible for you missing the second separate flight unless another basis exists. That does not mean there are no rights for the first delay, but a new flight bought to save the second ticket may be disputed.",
            "If everything was under one booking, your position is stronger. Then the airline usually has to get you to the final destination in the booking, not only to the first airport. This is one of the most important differences.",
            "Travelers from Serbia often combine low-cost tickets with large hubs. These trips can be cheap, but disruptions carry more risk. Be honest in the claim about booking structure because it is easy to verify."
          ]
        },
        {
          heading: "How to send the reimbursement request",
          body: [
            "The request should include the original flight, disruption, what you asked from the airline, what was or was not offered, why you had to buy a new flight and the amount. Attach the invoice, boarding pass for the new flight and proof of payment.",
            "If travel was urgent, explain briefly: business event, medical appointment, returning to a child, missed same-booking connection. You do not need to exaggerate; a real reason why waiting was unacceptable is enough.",
            "The biggest mistake is buying the most expensive ticket without trying to contact the airline and later sending only the receipt. A stronger request shows that you first gave the airline a chance to perform, then chose a reasonable alternative because no help was provided."
          ]
        }
      ],
    },
  },
  {
    id: "serbia-eu-transit-routes",
    publishedAt: "2026-05-02",
    updatedAt: "2026-05-02",
    sr: {
      slug: "let-iz-srbije-preko-eu-prava-putnika",
      title: "Let iz Srbije preko EU: kada se primenjuju evropska prava putnika",
      description: "Kako putnici iz Srbije da provere rute preko EU, ECAA i evropskih prevoznika kada kasni ili se otkaže let ka trećoj zemlji.",
      excerpt: "Nije presudno da li ste državljanin Srbije ili EU. Za prava putnika najvažniji su polazni aerodrom, odredište, operativni prevoznik i da li su letovi u jednoj rezervaciji.",
      category: "EU 261 i Srbija",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Državljanstvo uglavnom nije glavno pitanje",
          body: [
            "Putnici iz Srbije često misle da evropska prava važe samo za državljane EU. U praksi je mnogo važnije gde let polazi, gde dolazi, koja aviokompanija upravlja letom i kako je putovanje kupljeno. Putnik može biti iz Srbije, ali ruta može biti u evropskom režimu zaštite.",
            "Zato se svaki slučaj proverava kroz mapu puta. Let iz Beograda ka Parizu evropskim prevoznikom, let iz Beča ka Beogradu, ili putovanje Beograd-Frankfurt-New York u jednoj rezervaciji ne daju isti odgovor kao odvojene karte ili dolazni let neevropske kompanije.",
            "Konkurentski vodiči često daju jednostavne tabele EU to EU, EU to non-EU i non-EU to EU. To je dobar početak, ali putniku iz Srbije treba objašnjenje šta se dešava kada je Srbija deo šire konekcije, a ne samo početna ili završna tačka."
          ]
        },
        {
          heading: "Polazak iz EU je najjednostavniji scenario",
          body: [
            "Ako let polazi iz aerodroma u EU, EEA ili drugom relevantnom evropskom okviru, zaštita je obično šira bez obzira na to koja aviokompanija leti. Zato let iz Beča, Budimpešte, Zagreba, Frankfurta ili Rima ka Srbiji ili trećoj zemlji treba proveriti odmah.",
            "U tom scenariju nije presudno da li je prevoznik evropski ili neevropski. Važan je polazni aerodrom. Ako let iz EU kasni tri sata ili više na dolasku, otkazan je kasno ili je putniku uskraćeno ukrcavanje, može postojati osnov za zahtev.",
            "Naravno, i dalje se proverava razlog poremećaja. Vanredne okolnosti, kao što su ozbiljno vreme ili bezbednosna ograničenja, mogu oslabiti fiksnu naknadu, ali ne brišu automatski brigu, informacije i razumne alternative."
          ]
        },
        {
          heading: "Dolazak u EU zavisi od prevoznika",
          body: [
            "Ako let polazi iz Srbije ili druge zemlje van EU i dolazi u EU, često je važno da li let operiše evropski prevoznik. Let Beograd-Pariz koji operiše evropska aviokompanija može se drugačije tretirati od leta koji operiše neevropski prevoznik.",
            "Kod codeshare letova gledajte operating carrier, ne samo logo na karti. Možete kupiti kartu preko jedne kompanije, ali let stvarno obavlja druga. Za prava putnika najčešće je važna kompanija koja upravlja avionom na tom segmentu.",
            "Sačuvajte boarding pass i potvrdu rezervacije jer često pokazuju i marketing carrier i operating carrier. Ako piše operated by, ta linija može biti presudna za proveru."
          ]
        },
        {
          heading: "Konekcije u jednoj rezervaciji menjaju računicu",
          body: [
            "Ako putujete iz Srbije preko EU ka trećoj zemlji, najvažnije pitanje je da li su svi segmenti u jednoj rezervaciji. Jedna rezervacija može značiti da se kašnjenje meri do krajnje destinacije, a ne samo do prvog evropskog aerodroma.",
            "Primer: Beograd-Frankfurt-Toronto u jednoj rezervaciji i kašnjenje prvog segmenta koje dovede do dolaska u Toronto pet sati kasnije. Takav slučaj se ne posmatra isto kao dve odvojene karte Beograd-Frankfurt i Frankfurt-Toronto.",
            "Odvojene karte su operativno rizične. Ako prvi let kasni i propustite drugi, zaštita može biti mnogo slabija, čak i ako ste putnički gledano imali jedan plan. Zato je kod zahteva važno iskreno navesti strukturu karata."
          ]
        },
        {
          heading: "Srbija, ECAA i praktična provera",
          body: [
            "Srbija je povezana sa evropskim avio-tržištem kroz širi ECAA kontekst, ali putniku ne pomaže mnogo opšta pravna skraćenica ako ne zna šta da proveri. Praktično, uvek krenite od rute, prevoznika, rezervacije i stvarnog kašnjenja.",
            "Ako let uključuje EU aerodrom, evropskog prevoznika ili konekciju u jednoj rezervaciji, nemojte automatski odustati jer polazite iz Srbije. Isto tako, nemojte automatski računati na odštetu samo zato što je EU negde u ruti.",
            "Najbolje je napraviti kratku tabelu: segment, polazak, dolazak, operativni prevoznik, planirano vreme, stvarno vreme i broj rezervacije. Ta tabela brzo otkriva koji deo puta je pravno i praktično najvažniji."
          ]
        },
        {
          heading: "Šta poslati na proveru",
          body: [
            "Za proveru pošaljite pun itinerary, boarding pass za sve segmente, poruke o kašnjenju ili otkazivanju, dokaz stvarnog dolaska i informaciju da li su karte kupljene zajedno. Bez tih podataka, odgovor može biti samo okviran.",
            "Ako je aviokompanija već odbila zahtev, pošaljite i odbijenicu. Posebno je važno videti da li se poziva na rutu, prevoznika, vanredne okolnosti ili propušten rok. Svaki razlog se proverava drugačije.",
            "Za putnike iz Srbije najkorisniji savet je jednostavan: ne prevodite slučaj odmah u pravne pojmove. Prvo složite činjenice putovanja. Kada su činjenice jasne, mnogo je lakše utvrditi da li EU 261, ECAA ili drugi okvir stvarno pomaže."
          ]
        }
      ],
    },
    en: {
      slug: "flight-from-serbia-via-eu-passenger-rights",
      title: "Flight from Serbia via the EU: when European passenger rights apply",
      description: "How travelers from Serbia can check routes via the EU, ECAA and European carriers when a flight to a third country is delayed or cancelled.",
      excerpt: "It is usually not decisive whether you are Serbian or EU citizen. Passenger rights depend mainly on departure airport, destination, operating carrier and whether flights are under one booking.",
      category: "EU 261 and Serbia",
      readTime: "8 min read",
      sections: [
        {
          heading: "Nationality is usually not the main question",
          body: [
            "Travelers from Serbia often think European rights apply only to EU citizens. In practice, it matters much more where the flight departs, where it arrives, which airline operates it and how the trip was purchased. The passenger may be Serbian while the route falls within a European protection framework.",
            "That is why each case is checked through the route map. A flight from Belgrade to Paris on a European carrier, a flight from Vienna to Belgrade, or Belgrade-Frankfurt-New York under one booking do not produce the same answer as separate tickets or an inbound flight operated by a non-European airline.",
            "Competitor guides often show simple tables: EU to EU, EU to non-EU and non-EU to EU. That is a useful start, but travelers from Serbia need to understand what happens when Serbia is part of a wider connection, not only the start or end point."
          ]
        },
        {
          heading: "Departure from the EU is the simplest scenario",
          body: [
            "If the flight departs from an airport in the EU, EEA or another relevant European framework, protection is usually broader regardless of which airline operates it. A flight from Vienna, Budapest, Zagreb, Frankfurt or Rome to Serbia or a third country should therefore be checked immediately.",
            "In that scenario, it is not decisive whether the carrier is European or non-European. The departure airport matters. If a flight from the EU arrives three hours or more late, is cancelled at short notice or boarding is denied, there may be a basis for a claim.",
            "Of course, the reason for disruption is still checked. Extraordinary circumstances such as severe weather or safety restrictions may weaken fixed compensation, but they do not automatically remove care, information and reasonable alternatives."
          ]
        },
        {
          heading: "Arrival in the EU depends on the carrier",
          body: [
            "If the flight departs from Serbia or another non-EU country and arrives in the EU, it often matters whether the flight is operated by a European carrier. Belgrade-Paris operated by a European airline may be treated differently from a flight operated by a non-European carrier.",
            "For codeshare flights, look at the operating carrier, not only the logo on the ticket. You may buy the ticket through one company while another actually operates the aircraft. Passenger rights usually focus on the company operating that segment.",
            "Keep the boarding pass and booking confirmation because they often show both marketing carrier and operating carrier. If the ticket says operated by, that line can be decisive."
          ]
        },
        {
          heading: "Single-booking connections change the calculation",
          body: [
            "If you travel from Serbia via the EU to a third country, the most important question is whether all segments are under one booking. One booking may mean the delay is measured to the final destination, not only to the first European airport.",
            "Example: Belgrade-Frankfurt-Toronto under one booking, where the first segment delay causes arrival in Toronto five hours late. That case is not assessed the same way as two separate tickets, Belgrade-Frankfurt and Frankfurt-Toronto.",
            "Separate tickets are operationally risky. If the first flight is delayed and you miss the second, protection may be much weaker even if, from your perspective, it was one trip. That is why the claim must honestly state the ticket structure."
          ]
        },
        {
          heading: "Serbia, ECAA and practical checking",
          body: [
            "Serbia is connected to the European aviation market through the wider ECAA context, but a legal abbreviation does not help the passenger much unless they know what to check. Practically, always start with route, carrier, booking and actual delay.",
            "If the trip includes an EU airport, a European carrier or a single-booking connection, do not automatically give up because you departed from Serbia. At the same time, do not automatically expect compensation only because the EU appears somewhere in the route.",
            "The best first step is a short table: segment, departure, arrival, operating carrier, scheduled time, actual time and booking reference. That table quickly shows which part of the journey is legally and practically important."
          ]
        },
        {
          heading: "What to send for review",
          body: [
            "For review, send the full itinerary, boarding passes for all segments, messages about delay or cancellation, proof of actual arrival and information on whether tickets were bought together. Without those details, the answer can only be general.",
            "If the airline already rejected the claim, send the refusal too. It is especially important to see whether it relies on route, carrier, extraordinary circumstances or deadline. Each reason is checked differently.",
            "For travelers from Serbia, the most useful advice is simple: do not translate the case into legal terms immediately. First organize the travel facts. Once the facts are clear, it is much easier to determine whether EU 261, ECAA or another framework actually helps."
          ]
        }
      ],
    },
  },
] satisfies BlogArticle[];
