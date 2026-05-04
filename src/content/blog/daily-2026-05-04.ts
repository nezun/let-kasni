import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "bird-strike-flight-delay": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft in flight above clouds",
    position: "center",
  },
  "lightning-strike-aircraft-delay": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Storm clouds near an airport runway",
    position: "center",
  },
  "medical-emergency-flight-delay": {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport medical assistance area",
    position: "center",
  },
  "crew-shortage-flight-delay": {
    src: "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?auto=format&fit=crop&w=1600&q=82",
    alt: "Airline crew walking through an airport terminal",
    position: "center",
  },
  "night-flight-ban-curfew": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport runway at night",
    position: "center",
  },
  "airline-bankruptcy-passenger-rights": {
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=82",
    alt: "Passenger checking travel documents and payment card",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

export const articles = [
  {
    id: "bird-strike-flight-delay",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    sr: {
      slug: "udar-ptice-kasnjenje-leta-odsteta",
      title: "Udar ptice i kašnjenje leta: kada zahtev ipak vredi proveriti",
      description: "Praktičan vodič za putnike iz Srbije: zašto je bird strike često vanredna okolnost, šta ostaje od prava na brigu i kada objašnjenje aviokompanije nije dovoljno.",
      excerpt: "Udar ptice najčešće slabi zahtev za fiksnu odštetu, ali ne zatvara automatski ceo slučaj. Ključno je da li je udar zaista pogodio vaš avion, koliko je trajala provera i šta je aviokompanija uradila posle toga.",
      category: "Vanredne okolnosti",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Šta bird strike znači u praksi",
          body: [
            "Udar ptice je kontakt ptice ili jata ptica sa avionom, najčešće pri poletanju ili sletanju. Za putnika to obično zvuči kao čista tehnička stvar: avion ne može da nastavi, mora se pregledati, let kasni ili se otkazuje. Pravno je bitno to što takav događaj uglavnom dolazi spolja i nije deo redovnog planiranja aviokompanije.",
            "Zato se u praksi bird strike često stavlja u grupu vanrednih okolnosti. To je dobra početna pretpostavka, ali nije cela analiza. Putnik treba da zna da se ne proverava samo reč bird strike, već i da li postoji direktna veza sa konkretnim letom, koliko je poremećaj trajao i da li je kasnije kašnjenje nastalo zbog organizacije prevoznika."
          ],
        },
        {
          heading: "Kada fiksna odšteta obično nije realna",
          body: [
            "Ako je avion koji je trebalo da obavi vaš let stvarno pretrpeo udar ptice neposredno pre polaska ili na prethodnom letu, aviokompanija ima snažan argument da nije dužna da plati 250, 400 ili 600 evra. Bezbednosni pregled posle takvog događaja nije stvar komfora, već obavezna mera.",
            "To ne znači da putnik treba da prihvati generičku odbijenicu bez pitanja. Ako kompanija samo napiše bird strike, tražite vremensku liniju: koji avion, kada se incident dogodio, da li je avion bio predviđen za vaš let, koliko je trajao pregled i kada je postalo jasno da će kašnjenje preći tri sata."
          ],
        },
        {
          heading: "Kada slučaj ipak treba proveriti",
          body: [
            "Provera ima smisla ako je udar ptice naveden za prethodni avion, ali se kasnije pojavljuju drugi razlozi: nema posade, nema rezervnog aviona, kasni dokumentacija, čeka se slot ili se putnici prebacuju tek mnogo kasnije iako postoje druge opcije. Vanredna okolnost može objasniti početak problema, ali ne nužno svaki sat posle toga.",
            "Posebno obratite pažnju na konekcije. Ako ste imali jednu rezervaciju i zbog bird strike kašnjenja propustili dalji let, pravo na preusmeravanje i brigu ostaje važno. Fiksna odšteta može biti sporna, ali aviokompanija i dalje mora razumno da vas dovede do krajnje destinacije."
          ],
        },
        {
          heading: "Pravo na brigu ne nestaje",
          body: [
            "Čak i kada nema fiksne naknade, putnik ne treba da sedi satima bez vode, hrane ili informacije. Kod dužeg čekanja aviokompanija mora da obezbedi obroke, osveženje i komunikaciju, a ako čekanje prelazi u noć, hotel i transfer mogu biti relevantni.",
            "Ako pomoć nije ponuđena, kupujte razumno i čuvajte račune. U zahtevu odvojite refundaciju troškova od fiksne odštete. To je praktično važno jer kompanija može imati jak argument protiv odštete, ali slab argument protiv vraćanja nužnih troškova čekanja."
          ],
        },
        {
          heading: "Šta sačuvati kao dokaz",
          body: [
            "Sačuvajte boarding pass, booking potvrdu, poruke aviokompanije, fotografije table polazaka i svaki račun za hranu, vodu, hotel ili transfer. Ako osoblje kaže da je problem udar ptice, zapišite tačnu formulaciju i vreme. Ako kasnije dobijete drugačiji razlog u emailu, sačuvajte obe verzije.",
            "Najbolja poruka aviokompaniji nije agresivna. Napišite da razumete da bird strike može biti vanredna okolnost, ali tražite potvrdu direktne veze sa vašim letom, dokaz razumnih mera i refundaciju nužnih troškova. Takav zahtev zvuči ozbiljnije i ostavlja prostor da se slučaj proceni po činjenicama."
          ],
        },
        {
          heading: "Najbrži sledeći korak",
          body: [
            "Ako ste putovali iz Srbije, odmah uporedite tri podatka: da li je ruta imala EU element, da li je kašnjenje na krajnjoj destinaciji bilo tri sata ili više, i da li je aviokompanija dala samo generičko objašnjenje. Ako su sva tri odgovora relevantna, slučaj ne treba odbaciti samo zato što je pomenuta ptica.",
            "Praktično, najviše šanse ima zahtev koji ne negira bezbednosni događaj, već traži dokaz veze i razumnog postupanja posle događaja. To je razlika između slabe žalbe i korisnog claim fajla koji agent ili pravnik može brzo da proveri."
          ],
        },
        {
          heading: "Kako ovo uklopiti u širu proveru",
          body: [
            "Bird strike je dobar primer zašto automatizovana provera ne sme samo da izbaci 'da' ili 'ne'. Sistem prvo treba da označi potencijalnu vanrednu okolnost, zatim da traži dokaze za trajanje i posledice. Tek onda se odlučuje da li se slučaj šalje kao zahtev za naknadu, zahtev za troškove ili samo kao evidencija.",
            "Za putnika je to korisno jer ne mora da poznaje pravne nijanse. Dovoljno je da unese let, datum, razlog koji je čuo i troškove koje je imao. Dalji pregled može automatski da izdvoji šta je slabo, šta je proverljivo i šta treba dopuniti."
          ],
        },
      ],
    },
    en: {
      slug: "bird-strike-flight-delay-compensation",
      title: "Bird strike and flight delay: when a claim is still worth checking",
      description: "A practical guide for travelers from Serbia: why a bird strike is often an extraordinary circumstance, which care rights remain and when the airline explanation is not enough.",
      excerpt: "A bird strike usually weakens a fixed compensation claim, but it does not automatically close the whole case. The key is whether it really affected your aircraft, how long checks took and what the airline did afterwards.",
      category: "Extraordinary circumstances",
      readTime: "8 min read",
      sections: [
        {
          heading: "What a bird strike means in practice",
          body: [
            "A bird strike is contact between a bird or flock of birds and an aircraft, usually during takeoff or landing. For passengers it sounds like a technical issue: the aircraft cannot continue, it must be inspected, and the flight is delayed or cancelled. The legal point is that the event usually comes from outside the airline's normal planning.",
            "That is why passenger-rights practice often places bird strikes among extraordinary circumstances. This is a useful starting point, but not the whole analysis. The question is not only whether the words bird strike were used, but whether the event directly affected your flight, how long the disruption lasted and whether later delay came from the carrier's own organization."
          ],
        },
        {
          heading: "When fixed compensation is usually unlikely",
          body: [
            "If the aircraft scheduled for your flight actually suffered a bird strike just before departure or on the previous rotation, the airline has a strong argument against paying 250, 400 or 600 euros. A safety inspection after such an event is not optional; it is a necessary operational measure.",
            "That does not mean passengers should accept a generic refusal without questions. If the airline only writes bird strike, ask for a timeline: which aircraft, when the incident happened, whether that aircraft was assigned to your flight, how long the inspection lasted and when it became clear that delay would exceed three hours."
          ],
        },
        {
          heading: "When the case should still be checked",
          body: [
            "A review makes sense if the bird strike affected a previous aircraft but other reasons later appear: no crew, no spare aircraft, late documents, a slot restriction or rerouting offered much later despite realistic alternatives. An extraordinary circumstance may explain the start of the problem, but not necessarily every later hour.",
            "Connections deserve special attention. If you had one booking and missed an onward flight because of the bird-strike delay, rerouting and care rights remain important. Fixed compensation may be disputed, but the airline still has to make reasonable efforts to get you to your final destination."
          ],
        },
        {
          heading: "The right to care does not disappear",
          body: [
            "Even when fixed compensation is unavailable, passengers should not wait for hours without water, food or information. During longer waits, the airline must provide meals, refreshments and communication, and if the wait moves overnight, hotel accommodation and transfer may matter.",
            "If assistance is not offered, spend reasonably and keep receipts. In the claim, separate reimbursement of expenses from fixed compensation. This matters because the airline may have a strong defence against compensation, but a weaker defence against reimbursing necessary waiting costs."
          ],
        },
        {
          heading: "What evidence to save",
          body: [
            "Keep the boarding pass, booking confirmation, airline messages, departure-board photos and every receipt for food, water, hotel or transfer. If staff say the issue is a bird strike, write down the exact wording and time. If a later email gives a different reason, save both versions.",
            "The strongest message to the airline is not aggressive. Write that you understand a bird strike may be extraordinary, but ask for confirmation of the direct link to your flight, proof of reasonable measures and reimbursement of necessary costs. That keeps the claim factual and harder to dismiss."
          ],
        },
        {
          heading: "The fastest next step",
          body: [
            "If you travelled from Serbia, compare three facts immediately: whether the route had an EU element, whether arrival at the final destination was three hours or more late, and whether the airline gave only a generic explanation. If all three matter, the case should not be dismissed only because a bird was mentioned.",
            "In practice, the strongest request does not deny the safety event. It asks for proof of the link and for evidence that the airline acted reasonably afterwards. That is the difference between a weak complaint and a useful claim file an agent or lawyer can review quickly."
          ],
        },
        {
          heading: "How this fits into a broader review",
          body: [
            "A bird strike is a good example of why automated review should not return only yes or no. The system should first flag a possible extraordinary circumstance, then ask for evidence of duration and consequences. Only then should the case become a compensation request, an expense request or simply a record.",
            "For passengers, this is useful because they do not need to know the legal nuance. They only need to enter the flight, date, reason heard and costs incurred. The next review can automatically separate what is weak, what is checkable and what needs more evidence."
          ],
        },
      ],
    },
  },
  {
    id: "lightning-strike-aircraft-delay",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    sr: {
      slug: "udar-groma-u-avion-kasnjenje-prava",
      title: "Udar groma u avion: šta putnik može da traži posle kašnjenja",
      description: "Kada je udar groma vanredna okolnost, šta znači obavezna provera aviona i koja prava putniku ostaju kod dugog čekanja ili propuštene konekcije.",
      excerpt: "Udar groma je ozbiljan bezbednosni događaj i često oslobađa aviokompaniju fiksne odštete. Ali putnik i dalje treba da proveri rutu, trajanje čekanja, brigu i preusmeravanje.",
      category: "Vreme i bezbednost",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Zašto je udar groma poseban slučaj",
          body: [
            "Avioni su projektovani da izdrže udar groma, ali posle takvog događaja često mora da se uradi tehnička i bezbednosna provera. Za putnika je rezultat isti kao kod kvara: let kasni, konekcija puca, a informacije stižu sporo. Ipak, uzrok nije klasičan tehnički kvar iz redovnog rizika aviokompanije.",
            "Novija praksa Suda EU dodatno potvrđuje da udar groma može biti tretiran kao vanredna okolnost. To znači da zahtev za fiksnu naknadu nije automatski jak čak ni kada ste stigli tri, pet ili deset sati kasnije. Ali to ne znači da je svako postupanje aviokompanije posle udara groma neupitno."
          ],
        },
        {
          heading: "Šta aviokompanija mora da objasni",
          body: [
            "Ako se kompanija poziva na lightning strike, treba da objasni kada se dogodio, koji avion je pogođen, da li je to bio avion za vaš let ili prethodna rotacija, koliko je trajala obavezna provera i kada je odlučeno da avion ne može da leti. Bez toga putnik nema način da razume da li je razlog stvaran ili samo opšti izgovor.",
            "Posebno je važno odvojiti proveru od kasnije organizacije. Ako je pregled trajao dva sata, a zatim ste čekali još sedam sati zato što nije bilo posade ili jasnog plana, slučaj više nije samo pitanje groma. Tada vredi tražiti objašnjenje razumnih mera."
          ],
        },
        {
          heading: "Konekcija i krajnja destinacija",
          body: [
            "Kod jedne rezervacije ne završava se sve na prvom segmentu. Ako vas je udar groma na letu Beograd-Beč, Beograd-Frankfurt ili neki drugi evropski segment doveo do propuštene konekcije, procenjuje se šta se dogodilo do krajnje destinacije i koliko brzo je aviokompanija pokušala da vas preusmeri.",
            "Ako je ponuđen prvi razuman nastavak puta, fiksna naknada može ostati slaba. Ako ste ostavljeni bez pomoći, ako je postojala očigledna alternativa ili ste morali sami da kupite novu kartu, tada se fokus pomera na refundaciju troškova i kvalitet postupanja posle početnog događaja."
          ],
        },
        {
          heading: "Briga, hotel i računi",
          body: [
            "Udar groma ne briše pravo na brigu. Ako čekate dovoljno dugo, aviokompanija treba da obezbedi hranu, osveženje i komunikaciju. Ako se polazak pomera za naredni dan, hotel i transfer ne bi trebalo da budu prepušteni putniku bez ikakvog odgovora.",
            "Ako sami plaćate, držite se razumnog nivoa. Osnovan obrok, voda, lokalni transfer i normalan hotel mnogo su lakši za povraćaj od luksuznih troškova. U zahtevu jasno navedite da ne tražite samo odštetu, već i povraćaj konkretnih troškova nastalih zbog čekanja."
          ],
        },
        {
          heading: "Kako napisati dobar zahtev",
          body: [
            "Najbolja struktura je kratka vremenska linija: planirani polazak, stvarna informacija, razlog koji je naveden, ponuđeno rešenje i dolazak na krajnju destinaciju. Dodajte da tražite dokaz direktne veze između udara groma i vašeg leta, kao i opis mera koje su preduzete da se kašnjenje smanji.",
            "Za putnike iz Srbije posebno je korisno dodati da li je let polazio iz EU, dolazio u EU evropskom kompanijom ili bio deo jedne rezervacije preko EU čvorišta. Tako se odmah vidi da li se primenjuje evropska logika, bez potrebe da putnik piše pravni esej."
          ],
        },
        {
          heading: "Kada ne treba odustati",
          body: [
            "Ne treba odustati ako kompanija menja razloge, ako ne navodi koji avion je pogođen, ako se kašnjenje produžilo zbog posade ili ako ste izgubili konekciju pod jednom rezervacijom. U tim slučajevima grom može biti početak priče, ali nije nužno jedini uzrok celog gubitka vremena.",
            "Najbolje je poslati uredan zahtev sa dokazima i ostaviti prostor za podelu ishoda: možda nema fiksne naknade, ali ima troškova hotela, obroka, transfera ili nove karte koje treba vratiti. Za putnika je korisnije naplatiti realan deo nego izgubiti sve zbog pogrešno postavljenog zahteva."
          ],
        },
        {
          heading: "Kako procena treba da izgleda",
          body: [
            "Dobra procena prvo označi udar groma kao moguću vanrednu okolnost, ali zatim proverava tri nastavka: da li je pregled trajao razumno, da li je ponuđen nastavak puta i da li su troškovi čekanja pokriveni. Time se izbegava greška da se ceo slučaj odbaci zbog jedne reči u obrazloženju.",
            "Ako se proces vodi kroz intake formu, korisno je odmah tražiti fotografiju poruke aviokompanije i vreme dolaska. Ta dva podatka često daju više vrednosti od dugog opisa frustracije, jer pokazuju razlog i stvarnu posledicu."
          ],
        },
      ],
    },
    en: {
      slug: "lightning-strike-aircraft-delay-rights",
      title: "Lightning strike on an aircraft: what passengers can claim after a delay",
      description: "When a lightning strike is an extraordinary circumstance, what mandatory aircraft checks mean and which rights remain during long waits or missed connections.",
      excerpt: "A lightning strike is a serious safety event and often defeats fixed compensation. But passengers should still check the route, waiting time, care and rerouting.",
      category: "Weather and safety",
      readTime: "8 min read",
      sections: [
        {
          heading: "Why a lightning strike is a special case",
          body: [
            "Aircraft are designed to withstand lightning strikes, but after such an event a technical and safety inspection is often required. For passengers, the result looks like a technical fault: the flight is delayed, connections fail and information arrives slowly. The cause, however, is not the same as a normal technical issue within the airline's routine risk.",
            "Recent EU court practice confirms that a lightning strike can be treated as an extraordinary circumstance. That means a fixed compensation claim is not automatically strong even if you arrived three, five or ten hours late. But it does not make every later airline decision unquestionable."
          ],
        },
        {
          heading: "What the airline should explain",
          body: [
            "If the airline relies on a lightning strike, it should explain when it happened, which aircraft was affected, whether that was your aircraft or the previous rotation, how long the required inspection lasted and when it decided the aircraft could not operate. Without this, passengers cannot tell whether the reason is specific or just generic.",
            "It is especially important to separate the inspection from later organization. If the inspection lasted two hours and you then waited another seven because there was no crew or clear plan, the case is no longer only about lightning. It is reasonable to ask what measures were taken."
          ],
        },
        {
          heading: "Connections and final destination",
          body: [
            "Under one booking, the first segment is not the whole story. If a lightning strike on a Belgrade-Vienna, Belgrade-Frankfurt or another European segment caused you to miss an onward connection, the assessment looks at the final destination and how quickly the airline tried to reroute you.",
            "If the first reasonable onward journey was offered, fixed compensation may remain weak. If you were left without assistance, if an obvious alternative existed or if you had to buy a new ticket yourself, the focus moves to reimbursement of costs and the quality of the airline's response after the initial event."
          ],
        },
        {
          heading: "Care, hotel and receipts",
          body: [
            "A lightning strike does not remove the right to care. If the wait is long enough, the airline should provide food, refreshments and communication. If departure moves to the next day, hotel accommodation and transfer should not simply be left to the passenger without support.",
            "If you pay yourself, keep costs reasonable. A basic meal, water, local transfer and normal hotel are much easier to recover than luxury expenses. In the claim, state clearly that you are not only asking for compensation, but also reimbursement of specific waiting costs."
          ],
        },
        {
          heading: "How to write a strong request",
          body: [
            "The best structure is a short timeline: scheduled departure, actual information, reason given, solution offered and arrival at the final destination. Add that you request proof of the direct link between the lightning strike and your flight, plus a description of the measures taken to reduce delay.",
            "For travelers from Serbia, it is useful to add whether the flight departed from the EU, arrived in the EU on a European carrier, or formed part of one booking through an EU hub. That shows why the European passenger-rights framework may matter without turning the request into a legal essay."
          ],
        },
        {
          heading: "When you should not give up",
          body: [
            "Do not give up if the airline changes reasons, does not say which aircraft was struck, the delay later grew because of crew issues, or you missed a connection under one booking. In those cases, lightning may be the start of the story but not necessarily the only cause of the whole time loss.",
            "The better approach is to send a structured request with evidence and allow for a split outcome: fixed compensation may be unavailable, but hotel, meals, transfer or replacement-ticket costs may still be reimbursable. For passengers, recovering the realistic part is better than losing everything because the request was framed too narrowly."
          ],
        },
        {
          heading: "What the assessment should look like",
          body: [
            "A good assessment first flags lightning as a possible extraordinary circumstance, but then checks three follow-ups: whether the inspection time was reasonable, whether onward travel was offered and whether waiting costs were covered. That avoids rejecting the whole case because of one word in the explanation.",
            "If the process runs through an intake form, it is useful to ask immediately for the airline message and actual arrival time. Those two facts often matter more than a long description of frustration because they show both the reason and the real consequence."
          ],
        },
      ],
    },
  },
  {
    id: "medical-emergency-flight-delay",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    sr: {
      slug: "medicinski-hitan-slucaj-kasnjenje-leta",
      title: "Medicinski hitan slučaj na letu: prava putnika koji kasne",
      description: "Šta se dešava kada let kasni zbog bolesnog putnika, prinudnog sletanja ili medicinske intervencije, i šta drugi putnici mogu realno da traže.",
      excerpt: "Medicinski hitan slučaj obično nije krivica aviokompanije, ali putnici koji zbog toga dugo čekaju i dalje imaju pravo na informacije, brigu i razumno preusmeravanje.",
      category: "Vanredne okolnosti",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Zašto medicinski razlog menja procenu",
          body: [
            "Kada se putnik razboli pre poletanja, tokom leta ili neposredno pre ukrcavanja, posada i aerodromske službe moraju da reaguju. Let može čekati lekarski pregled, vratiti se na gate, sleteti na drugi aerodrom ili izgubiti slot. Za ostale putnike posledica može biti veliko kašnjenje, ali uzrok nije tipičan operativni propust prevoznika.",
            "Zbog toga se medicinski hitni slučajevi često tretiraju kao vanredne okolnosti. Aviokompanija ne može planirati da putnik doživi krizu u avionu. Ipak, procena se ne završava prvom rečenicom. Posle početnog događaja gledaju se informacije, briga, preusmeravanje i razumna organizacija."
          ],
        },
        {
          heading: "Kada fiksna odšteta nije očekivana",
          body: [
            "Ako je kašnjenje direktno nastalo zbog hitnog medicinskog slučaja, fiksna naknada od 250 do 600 evra najčešće nije realna. To naročito važi kada avion mora da sleti radi hitne pomoći ili kada posada ne sme da poleti dok lekar ili aerodromska služba ne završi procenu.",
            "Putnik ipak može tražiti precizno objašnjenje. Nije dovoljno da kompanija posle nekoliko nedelja napiše medical reason bez detalja. Treba proveriti kada je događaj nastao, koliko je trajao i da li je baš on izazvao dolazak tri sata ili više kasnije."
          ],
        },
        {
          heading: "Šta ako posle toga nema plana",
          body: [
            "Najveći problem nastaje kada medicinski događaj prođe, a aviokompanija zatim satima nema jasan plan. Posada izlazi iz dozvoljenog radnog vremena, avion ostaje na pogrešnom aerodromu, putnici čekaju bez hrane ili se konekcije ne preusmeravaju. Tada se početni razlog i kasnija organizacija moraju razdvojiti.",
            "Ako je postojao razuman alternativni let, ali nije ponuđen, ili ako ste morali sami da kupite nastavak puta jer kompanija nije reagovala, zahtev za refundaciju troškova može biti ozbiljan. Fiksna naknada je teža, ali troškovi i briga su posebna linija."
          ],
        },
        {
          heading: "Prava tokom čekanja",
          body: [
            "Putnici koji čekaju zbog medicinskog slučaja i dalje imaju pravo na informacije, obroke, osveženje i komunikaciju kada čekanje pređe relevantne pragove. Ako se put pomera za sutra, hotel i transfer treba tražiti odmah, ne tek posle povratka kući.",
            "Ako let završava na drugom aerodromu, pitajte da li aviokompanija organizuje prevoz do prvobitnog odredišta ili do novog leta. Sačuvajte sve račune, ali i dokaze da ste tražili pomoć. To može biti screenshot chata, email, fotografija reda na transfer desku ili beleška sa vremenom."
          ],
        },
        {
          heading: "Kako dokumentovati slučaj",
          body: [
            "Zapišite planirani polazak, stvarno vreme polaska ili otkazivanja, navedeni razlog, vreme dolaska i svaku ponudu kompanije. Ako je bilo prinudno sletanje, zabeležite aerodrom i vreme kada ste napustili avion. Ako ste propustili konekciju, sačuvajte celu rezervaciju.",
            "U zahtevu koristite miran ton: prihvatate da medicinski hitan slučaj može biti vanredan, ali tražite objašnjenje direktne veze, dokaz razumnih mera i refundaciju nužnih troškova. To je najpraktičniji okvir za putnike iz Srbije koji ne žele da ulaze u pravnički jezik, ali žele ozbiljnu proveru."
          ],
        },
        {
          heading: "Šta je realan cilj zahteva",
          body: [
            "Kod medicinskog razloga realan cilj često nije samo fiksna naknada. Mnogo češće je cilj da dobijete dokaz zašto je let kasnio, da vratite troškove čekanja i da proverite da li je kompanija razumno organizovala nastavak puta posle hitne intervencije.",
            "Ako šaljete slučaj servisu za proveru, nemojte sakriti medicinski razlog jer mislite da slabi zahtev. Dobar pregled mora da ga vidi odmah. Tada se brže razdvaja deo koji verovatno ne prolazi od dela koji i dalje može imati finansijski smisao."
          ],
        },
        {
          heading: "Kada slučaj ide u ručnu proveru",
          body: [
            "Medicinski hitni slučajevi su tip situacije gde automatika treba da bude konzervativna. Ako forma prepozna medicinski razlog, prinudno sletanje ili asistenciju hitne pomoći, najbolje je da slučaj ne obećava odštetu odmah, već da ga označi za dodatni pregled.",
            "To ne usporava putnika bez potrebe. Naprotiv, sprečava pogrešno obećanje i odmah prikuplja ono što će reviewer tražiti: rutu, booking, vreme dolaska, troškove, poruku aviokompanije i dokaz da je tražena pomoć tokom čekanja. Takav pristup je pošteniji i za korisnika i za servis."
          ],
        },
      ],
    },
    en: {
      slug: "medical-emergency-flight-delay-rights",
      title: "Medical emergency on a flight: rights of delayed passengers",
      description: "What happens when a flight is delayed because of an ill passenger, diversion or medical intervention, and what other passengers can realistically claim.",
      excerpt: "A medical emergency is usually not the airline's fault, but passengers who wait for hours still have rights to information, care and reasonable rerouting.",
      category: "Extraordinary circumstances",
      readTime: "8 min read",
      sections: [
        {
          heading: "Why a medical reason changes the assessment",
          body: [
            "When a passenger becomes ill before departure, during the flight or just before boarding, crew and airport services must react. The flight may wait for medical clearance, return to the gate, divert to another airport or lose its slot. Other passengers may face a long delay, but the cause is not a typical airline operational failure.",
            "That is why medical emergencies are often treated as extraordinary circumstances. An airline cannot plan for a passenger crisis on board. Still, the assessment does not end with the first sentence. After the initial event, information, care, rerouting and reasonable organization still matter."
          ],
        },
        {
          heading: "When fixed compensation is not expected",
          body: [
            "If the delay was directly caused by a medical emergency, fixed compensation of 250 to 600 euros is usually unlikely. This is especially true when the aircraft has to divert for emergency care or when the crew cannot depart until a doctor or airport service finishes assessment.",
            "Passengers can still ask for a precise explanation. It is not enough for the airline to write medical reason weeks later with no detail. You should check when the event happened, how long it lasted and whether it directly caused arrival three hours or more late."
          ],
        },
        {
          heading: "What if there is no plan afterwards",
          body: [
            "The bigger issue appears when the medical event ends but the airline has no clear plan for hours. Crew may run out of duty time, the aircraft may remain at the wrong airport, passengers may wait without food, or connections may not be rerouted. The initial cause and later organization must be separated.",
            "If a reasonable alternative flight existed but was not offered, or if you had to buy onward travel yourself because the airline did not react, a reimbursement claim can be serious. Fixed compensation is harder, but expenses and care are a separate line."
          ],
        },
        {
          heading: "Rights during the wait",
          body: [
            "Passengers waiting because of a medical emergency still have rights to information, meals, refreshments and communication once waiting thresholds are reached. If travel moves to the next day, ask for hotel and transfer immediately, not only after returning home.",
            "If the aircraft lands at another airport, ask whether the airline will arrange transport to the original destination or to a new flight. Keep every receipt, but also proof that you asked for help. This may be a chat screenshot, email, photo of the transfer desk queue or a note with the time."
          ],
        },
        {
          heading: "How to document the case",
          body: [
            "Write down scheduled departure, actual departure or cancellation time, reason given, arrival time and every airline offer. If there was a diversion, record the airport and when you left the aircraft. If you missed a connection, keep the full booking.",
            "Use a calm tone in the claim: you accept that a medical emergency may be extraordinary, but request an explanation of the direct link, proof of reasonable measures and reimbursement of necessary expenses. That is the most practical structure for travelers from Serbia who want a serious review without legal jargon."
          ],
        },
        {
          heading: "What the realistic goal is",
          body: [
            "With a medical reason, the realistic goal is often not only fixed compensation. More often, the goal is to obtain proof of why the flight was delayed, recover waiting costs and check whether the airline organized onward travel reasonably after the emergency intervention.",
            "If you send the case for review, do not hide the medical reason because you think it weakens the claim. A good review needs to see it immediately. That makes it faster to separate the part that probably fails from the part that may still have financial value."
          ],
        },
        {
          heading: "When the case should go to manual review",
          body: [
            "Medical emergencies are situations where automation should be conservative. If the form detects a medical reason, diversion or emergency assistance, it should avoid promising compensation immediately and instead mark the case for additional review.",
            "That does not slow passengers unnecessarily. It prevents a wrong promise and collects what the reviewer will need: route, booking, arrival time, costs, airline message and proof that assistance was requested during the wait."
          ],
        },
      ],
    },
  },
  {
    id: "crew-shortage-flight-delay",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    sr: {
      slug: "nedostatak-posade-kasnjenje-leta-odsteta",
      title: "Nedostatak posade i crew time limit: da li aviokompanija odgovara",
      description: "Kako proceniti kašnjenje zbog bolesne posade, isteka radnog vremena, crew rest pravila ili lošeg rasporeda, posebno kod letova preko EU iz Srbije.",
      excerpt: "Kada let kasni jer nema posade ili je posada izašla iz dozvoljenog radnog vremena, zahtev često vredi proveriti. To je drugačije od oluje, štrajka aerodroma ili kontrole letenja.",
      category: "Operativni razlozi",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Zašto posada nije običan izgovor",
          body: [
            "Aviokompanije često koriste izraze crew shortage, crew sickness, crew rest, flight time limitation ili operational reasons. Putniku sve to zvuči kao unutrašnji problem kompanije, i često jeste. Za razliku od kontrole letenja ili zatvaranja aerodroma, raspored posade je deo organizacije prevoznika.",
            "To ne znači da je svaki slučaj automatski dobitan. Ako je posada istekla zbog prethodne vanredne okolnosti, na primer jakog nevremena ili zatvaranja aerodroma, kompanija će pokušati da veže ceo lanac za taj prvi razlog. Zato treba razdvojiti početni uzrok od toga kako je posada planirana i zamenjena."
          ],
        },
        {
          heading: "Kada zahtev može biti jak",
          body: [
            "Zahtev je često jači kada kompanija navede da nema pilota, kabinskog osoblja, rezervne posade ili da je posada prešla dozvoljeno radno vreme bez spoljnog razloga koji direktno objašnjava kašnjenje. U takvim slučajevima putnik može tvrditi da je problem u organizaciji prevoznika.",
            "Posebno obratite pažnju ako su drugi letovi iste kompanije normalno radili, ako je aerodrom funkcionisao, ako nije bilo ozbiljnog vremena ili ATC ograničenja, a vaš let je čekao samo zamensku posadu. Tada generički operational reasons nije dovoljno dobar odgovor."
          ],
        },
        {
          heading: "Kada je odbrana aviokompanije bolja",
          body: [
            "Odbrana može biti jača ako je posada izašla iz radnog vremena zato što je prethodni segment objektivno zaustavljen van kontrole kompanije. Na primer, kontrola letenja zatvori prostor, aerodrom ograniči poletanja, avion se preusmeri zbog medicinskog događaja, a posada zbog toga više ne sme da leti.",
            "I tada pitanje nije završeno. Kompanija treba da pokaže da je preduzela razumne mere: proverila rezervnu posadu, ponudila preusmeravanje, organizovala hotel i obroke, i nije ostavila putnike da sami rešavaju nastavak puta."
          ],
        },
        {
          heading: "Šta tražiti u odgovoru",
          body: [
            "Ako dobijete odbijenicu, tražite preciziranje. Da li je problem bio bolest posade, nedostatak rezervne posade, istečeno radno vreme, kasni dolazak posade sa drugog leta ili kombinacija razloga? Kada je kompanija znala da posada ne može da leti i koje alternative su proverene?",
            "Kod putnika iz Srbije preko evropskih čvorišta dodajte da li je sve bilo na jednoj rezervaciji. Ako ste zbog posade propustili dalju konekciju, ne procenjuje se samo prvi let, već i dolazak na krajnju destinaciju i ponuđeno preusmeravanje."
          ],
        },
        {
          heading: "Dokazi i praktičan zahtev",
          body: [
            "Sačuvajte poruke, screenshot aplikacije, fotografiju table polazaka, boarding pass i račune. Ako osoblje na gejtu kaže da posada nije dostupna, zapišite vreme i formulaciju. Ako pilot ili kabinsko osoblje objasni da su prešli duty time, to je važan detalj.",
            "U zahtevu tražite fiksnu naknadu ako je dolazak bio tri sata ili više kasnije, ali i odvojeno tražite refundaciju troškova čekanja. Ne oslanjajte se samo na rečenicu 'nema posade'. Najbolji zahtev pokazuje vremensku liniju i pita šta je kompanija uradila da problem smanji."
          ],
        },
        {
          heading: "Zašto je ova tema važna za letove iz Srbije",
          body: [
            "Putnici iz Srbije često lete preko velikih čvorišta gde jedan problem sa posadom lako ruši ceo itinerer. Ako se prvi let pomeri i zbog toga propadne konekcija, najvažnije je da li je rezervacija bila jedinstvena i kada ste stigli na krajnju destinaciju.",
            "Zato u proveri nemojte gledati samo prvi segment. Dodajte ceo put, booking reference, vreme dolaska i sve ponude za alternativu. Crew problem koji na papiru izgleda kao dva sata kašnjenja može praktično značiti dan izgubljenog putovanja."
          ],
        },
        {
          heading: "Kako automatizovati prvi filter",
          body: [
            "U intake procesu crew shortage treba tretirati kao signal za detaljniju proveru, ne kao automatsko odbijanje. Forma može odmah pitati da li je pomenuta posada, duty time, crew rest ili bolest posade, i zatim tražiti dolazak na krajnju destinaciju.",
            "Ako su ruta i kašnjenje relevantni, sistem može pripremiti nacrt zahteva sa vremenskom linijom i pitanjima za kompaniju. Ljudski pregled tada ne kreće od praznog papira, već od strukturisanog fajla koji već odvaja interni razlog od mogućih vanrednih okolnosti. To skraćuje obradu bez agresivnog obećanja i smanjuje naknadno dopisivanje."
          ],
        },
      ],
    },
    en: {
      slug: "crew-shortage-flight-delay-compensation",
      title: "Crew shortage and crew time limits: when the airline may be responsible",
      description: "How to assess delays caused by sick crew, duty-time limits, crew-rest rules or poor rostering, especially on EU-connected flights from Serbia.",
      excerpt: "When a flight is delayed because crew is unavailable or runs out of duty time, the claim is often worth checking. This is different from storms, airport strikes or air traffic control.",
      category: "Operational reasons",
      readTime: "8 min read",
      sections: [
        {
          heading: "Why crew is not just another excuse",
          body: [
            "Airlines often use phrases such as crew shortage, crew sickness, crew rest, flight time limitation or operational reasons. To passengers, this sounds like an internal airline problem, and often it is. Unlike air traffic control or airport closure, crew planning is part of the carrier's organization.",
            "That does not mean every case automatically wins. If crew timed out because of an earlier extraordinary circumstance, such as severe weather or airport closure, the airline will try to connect the whole chain to that first event. The initial cause and the later crew planning need to be separated."
          ],
        },
        {
          heading: "When the claim may be strong",
          body: [
            "The claim is often stronger when the airline says there were no pilots, no cabin crew, no reserve crew or that the crew exceeded permitted duty time without an external reason directly explaining the delay. In those cases, passengers can argue that the problem sits in the carrier's organization.",
            "Pay attention if other flights by the same airline operated normally, the airport was open, there was no serious weather or ATC restriction, and your flight waited only for replacement crew. A generic operational reasons response is not enough."
          ],
        },
        {
          heading: "When the airline defence is better",
          body: [
            "The defence may be stronger if the crew ran out of duty time because a previous segment was objectively stopped outside the airline's control. For example, air traffic control closes airspace, an airport restricts departures, an aircraft diverts because of a medical event, and the crew then can no longer legally operate.",
            "Even then, the question is not finished. The airline should show it took reasonable measures: checked reserve crew, offered rerouting, arranged hotel and meals, and did not leave passengers to solve onward travel alone."
          ],
        },
        {
          heading: "What to ask in the response",
          body: [
            "If you receive a refusal, ask for detail. Was the issue crew illness, lack of reserve crew, expired duty time, late crew arrival from another flight or mixed causes? When did the airline know the crew could not operate and what alternatives were checked?",
            "For travelers from Serbia through European hubs, add whether everything was under one booking. If you missed an onward connection because of crew delay, the assessment should look at the final destination and the rerouting offered."
          ],
        },
        {
          heading: "Evidence and practical claim wording",
          body: [
            "Keep messages, app screenshots, departure-board photos, boarding pass and receipts. If gate staff say crew is unavailable, write down the time and wording. If the pilot or cabin crew explains that duty time has expired, that is an important detail.",
            "In the claim, request fixed compensation if arrival was three hours or more late, but separately request reimbursement of waiting costs. Do not rely only on the phrase no crew. The strongest request shows the timeline and asks what the airline did to reduce the disruption."
          ],
        },
        {
          heading: "Why this matters for flights from Serbia",
          body: [
            "Travelers from Serbia often fly through large hubs where one crew problem can break the whole itinerary. If the first flight shifts and the connection fails, the key facts are whether the booking was single and when you reached the final destination.",
            "Do not assess only the first segment. Add the full journey, booking reference, arrival time and every alternative offered. A crew problem that looks like a two-hour delay on paper can in practice become a full day of lost travel."
          ],
        },
        {
          heading: "How to automate the first filter",
          body: [
            "In the intake process, crew shortage should be treated as a signal for deeper review, not an automatic rejection. The form can immediately ask whether crew, duty time, crew rest or crew illness was mentioned, and then request arrival at the final destination.",
            "If the route and delay are relevant, the system can prepare a draft claim with a timeline and questions for the airline. Human review then starts from a structured file that already separates an internal reason from possible extraordinary circumstances."
          ],
        },
      ],
    },
  },
  {
    id: "night-flight-ban-curfew",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    sr: {
      slug: "nocna-zabrana-letova-curfew-prava-putnika",
      title: "Noćna zabrana letova i curfew: šta ako avion više ne sme da poleti",
      description: "Prava putnika kada let zakasni toliko da aerodromska noćna zabrana spreči poletanje ili avion sleti na drugi aerodrom.",
      excerpt: "Night curfew često dolazi kao posledica ranijeg kašnjenja. Zato je važno otkriti šta je zakasnilo pre zabrane: vreme, slot, posada, tehnički problem ili organizacija aviokompanije.",
      category: "Aerodromska pravila",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Šta je aerodromski curfew",
          body: [
            "Neki aerodromi imaju ograničenja noćnog letenja zbog buke, lokalnih pravila ili bezbednosnih procedura. Ako avion zakasni dovoljno dugo, može izgubiti pravo da poleti ili sleti pre narednog jutra. Putniku to izgleda kao novo otkazivanje, ali pravno je važno šta je dovelo do curfew problema.",
            "Ako je let već kasnio zbog razloga za koji aviokompanija odgovara, noćna zabrana ne mora automatski spasiti kompaniju. Ako je raniji uzrok bio van kontrole, kao jaka oluja ili zatvaranje aerodroma, odbrana je jača. Zato se uvek gleda ceo lanac, ne samo poslednja rečenica."
          ],
        },
        {
          heading: "Kada curfew slabi zahtev",
          body: [
            "Ako je aerodrom objektivno zabranio noćno poletanje ili sletanje, a aviokompanija nije mogla legalno da nastavi let, fiksna odšteta može biti teža. Posebno ako je prvobitno kašnjenje nastalo zbog kontrole letenja, lošeg vremena ili aerodromskog ograničenja.",
            "Ipak, kompanija treba da pokaže zašto je zabrana direktno uticala baš na vaš let i zašto nije postojala razumna alternativa. U nekim situacijama moguće je preusmeravanje na drugi aerodrom, raniji zamenski let ili nastavak puta kopnenim prevozom."
          ],
        },
        {
          heading: "Kada zahtev ostaje jak",
          body: [
            "Ako je avion propustio noćni rok zato što je kompanija kasnila sa posadom, tehničkom proverom, ukrcavanjem, dokumentacijom ili drugim internim procesom, curfew je posledica, ne pravi uzrok. Tada zahtev za naknadu može ostati ozbiljan.",
            "Primer: let kasni četiri sata zbog nedostatka posade i zatim aerodrom više ne dozvoljava poletanje. Aviokompanija ne bi trebalo da sakrije prvi razlog iza noćne zabrane. Putnik treba da traži vremensku liniju od prvog kašnjenja do konačnog otkazivanja."
          ],
        },
        {
          heading: "Hotel, transfer i sledeći let",
          body: [
            "Curfew gotovo uvek znači dugo čekanje ili noćenje. Tada pravo na brigu postaje centralno: hotel, transfer do hotela, obroci, osveženje i jasne informacije. Ako avion sleti na drugi aerodrom, kompanija treba da objasni kako putnici stižu do originalnog odredišta.",
            "Ako sami plaćate hotel ili prevoz, čuvajte račune i dokaz da pomoć nije ponuđena. Ako kompanija nudi autobus do udaljenog grada ili let sledećeg dana, zabeležite vreme ponude i realno vreme dolaska. Kod jedne rezervacije, krajnja destinacija ostaje ključna."
          ],
        },
        {
          heading: "Pitanja koja treba poslati kompaniji",
          body: [
            "Pitajte kada je prvi put nastalo kašnjenje, koji je bio prvi razlog, kada je postalo jasno da curfew važi, da li su provereni drugi aerodromi ili ranije alternative, i zašto putnicima nije ponuđen brži nastavak puta ako je postojao.",
            "Za putnike iz Srbije važni su evropski hubovi sa noćnim pravilima, jer jedan kasan polazak iz Beograda može dovesti do izgubljenog noćnog prozora u nastavku puta. Ne odustajte samo zato što odgovor sadrži reč curfew; proverite šta je stajalo pre toga."
          ],
        },
        {
          heading: "Kako razdvojiti uzrok i posledicu",
          body: [
            "Najkorisnije pitanje je jednostavno: da li je curfew bio prvi problem ili posledica ranijeg problema? Ako je prvi problem bio spoljašnji, zahtev za odštetu je slabiji. Ako je prvi problem bio interni, kao posada ili tehnička priprema, noćna zabrana ne briše automatski odgovornost.",
            "U praksi to znači da treba tražiti logiku minuta. Kada je avion realno mogao da poleti, kada je aerodrom zatvorio noćni prozor i šta je kompanija radila između ta dva trenutka. Ta vremenska razlika često odlučuje da li slučaj vredi goniti."
          ],
        },
        {
          heading: "Šta sistem treba da pita putnika",
          body: [
            "Kod curfew slučajeva forma treba da traži više od osnovnog razloga. Korisno je pitati kada je prvo objavljeno kašnjenje, kada je let konačno otkazan ili pomeren, da li je ponuđen hotel i da li je putnik završio na drugom aerodromu.",
            "Takva pitanja odmah prave razliku između aerodromskog pravila i prethodnog propusta aviokompanije. Putnik ne mora da zna zašto je to pravno važno; sistem može da pretvori odgovore u vremensku liniju koju je mnogo lakše proveriti. Bez toga se slučaj često pogrešno zatvori kao obična aerodromska zabrana, iako je pravi uzrok nastao ranije, unutar same operacije leta i rasporeda posade tog dana na aerodromu."
          ],
        },
      ],
    },
    en: {
      slug: "night-flight-ban-curfew-passenger-rights",
      title: "Night flight ban and curfew: what if the aircraft can no longer depart",
      description: "Passenger rights when a flight is delayed so long that an airport night ban prevents departure or the aircraft lands at another airport.",
      excerpt: "A night curfew often appears as the consequence of an earlier delay. The key is what caused the delay before the ban: weather, slot, crew, technical issue or airline organization.",
      category: "Airport rules",
      readTime: "8 min read",
      sections: [
        {
          heading: "What an airport curfew is",
          body: [
            "Some airports restrict night flights because of noise, local rules or safety procedures. If an aircraft is delayed long enough, it may lose the right to depart or land until the next morning. To passengers this looks like a new cancellation, but the important question is what caused the curfew problem.",
            "If the flight was already delayed for a reason within the airline's responsibility, the night ban does not automatically save the airline. If the earlier cause was outside control, such as severe storm or airport closure, the defence is stronger. The whole chain matters, not only the last sentence."
          ],
        },
        {
          heading: "When curfew weakens the claim",
          body: [
            "If the airport objectively banned night departure or landing and the airline could not legally operate, fixed compensation may be harder. This is especially true if the original delay was caused by air traffic control, bad weather or an airport restriction.",
            "Still, the airline should show why the ban directly affected your flight and why no reasonable alternative existed. In some situations rerouting to another airport, an earlier replacement flight or ground transport may be relevant."
          ],
        },
        {
          heading: "When the claim remains strong",
          body: [
            "If the aircraft missed the night window because the airline was late with crew, technical inspection, boarding, documents or another internal process, curfew is the consequence, not the real cause. The compensation claim may remain serious.",
            "Example: a flight is delayed four hours because replacement crew is unavailable and then the airport no longer permits departure. The airline should not hide the first reason behind the night ban. Passengers should ask for a timeline from the first delay to the final cancellation."
          ],
        },
        {
          heading: "Hotel, transfer and next flight",
          body: [
            "Curfew almost always means a long wait or overnight stay. The right to care becomes central: hotel, transfer to the hotel, meals, refreshments and clear information. If the aircraft lands at another airport, the airline should explain how passengers will reach the original destination.",
            "If you pay for hotel or transport yourself, keep receipts and proof that assistance was not offered. If the airline offers a bus to a distant city or a flight the next day, record the offer time and real arrival time. Under one booking, the final destination remains key."
          ],
        },
        {
          heading: "Questions to send to the airline",
          body: [
            "Ask when the delay first began, what the first reason was, when it became clear that curfew applied, whether other airports or earlier alternatives were checked, and why a faster continuation was not offered if one existed.",
            "For travelers from Serbia, European hubs with night rules matter because one late departure from Belgrade can cause a missed night window later in the trip. Do not give up just because the response says curfew; check what happened before it."
          ],
        },
        {
          heading: "How to separate cause and consequence",
          body: [
            "The most useful question is simple: was curfew the first problem or the consequence of an earlier problem? If the first problem was external, the compensation claim is weaker. If the first problem was internal, such as crew or technical preparation, the night ban does not automatically remove responsibility.",
            "In practice, ask for the minute-by-minute logic. When could the aircraft realistically have departed, when did the airport close the night window, and what did the airline do between those two moments? That time gap often decides whether the case is worth pursuing."
          ],
        },
        {
          heading: "What the system should ask passengers",
          body: [
            "For curfew cases, the form should ask for more than the basic reason. Useful questions include when the first delay was announced, when the flight was finally cancelled or moved, whether hotel was offered and whether the passenger ended up at another airport.",
            "Those questions quickly separate an airport rule from an earlier airline failure. The passenger does not need to know why that matters legally; the system can turn the answers into a timeline that is much easier to review."
          ],
        },
      ],
    },
  },
  {
    id: "airline-bankruptcy-passenger-rights",
    publishedAt: "2026-05-04",
    updatedAt: "2026-05-04",
    sr: {
      slug: "bankrot-aviokompanije-otkazan-let-prava",
      title: "Bankrot aviokompanije: šta ako je let otkazan i nema ko da odgovori",
      description: "Šta putnik iz Srbije može da uradi kada aviokompanija prestane da leti, kako razlikovati refundaciju, chargeback, osiguranje i naknadu.",
      excerpt: "Kada aviokompanija bankrotira, klasičan zahtev za odštetu često postaje težak. Najpraktičniji put su refundacija kroz karticu, osiguranje, agenciju ili stečajni postupak, uz brzo čuvanje dokaza.",
      category: "Refundacija i rizik",
      readTime: "8 min čitanja",
      sections: [
        {
          heading: "Zašto je bankrot drugačiji od običnog otkazivanja",
          body: [
            "Kod običnog otkazivanja postoji aviokompanija koja i dalje posluje, prima zahteve i može da ponudi preusmeravanje ili refundaciju. Kod bankrota ili prestanka rada, najveći problem je što putnik često nema operativnog sagovornika. Let je otkazan, novac je plaćen, a korisnička podrška prestaje da funkcioniše.",
            "Zbog toga se kod bankrota obično prvo gleda praktična naplata, a ne samo teorijsko pravo. Čak i ako bi pravo postojalo u teoriji, potraživanje može završiti u stečajnoj masi gde putnik nije prioritetni poverilac."
          ],
        },
        {
          heading: "Prvo razdvojite refundaciju i odštetu",
          body: [
            "Refundacija znači povraćaj cene karte za let koji nije izvršen. Fiksna odšteta je dodatni iznos zbog poremećaja, kada su ispunjeni uslovi i kada aviokompanija nema uspešnu odbranu. Kod bankrota, refundacija je često praktično važnija od rasprave o dodatnoj naknadi.",
            "Ako ste kartu platili karticom, odmah proverite chargeback pravila banke. Ako ste kupili preko agencije ili OTA platforme, proverite da li novac još stoji kod posrednika ili je već prosleđen kompaniji. Ako imate putno osiguranje, proverite pokriće za insolvency ili supplier failure."
          ],
        },
        {
          heading: "Šta uraditi u prvih 48 sati",
          body: [
            "Sačuvajte kartu, potvrdu plaćanja, email o otkazivanju, objavu aviokompanije, screenshot aplikacije i sve pokušaje kontakta. Ako morate da kupite novi let, sačuvajte dokaz zašto je kupovina bila nužna i zašto je cena razumna u tom trenutku.",
            "Kontaktirajte banku, agenciju, osiguranje i aerodromske informacije. Ne čekajte da se situacija sama razjasni. Kod bankrota se prozori za chargeback, osiguranje i alternativni prevoz mogu brzo pomerati, a dokazi nestaju sa sajtova."
          ],
        },
        {
          heading: "Da li EU prava ipak pomažu",
          body: [
            "Evropska pravila mogu objasniti šta bi putniku pripadalo kod otkazivanja, ali problem je izvršenje. Ako aviokompanija više nema likvidnost ili ulazi u formalni stečaj, zahtev za 250, 400 ili 600 evra može biti mnogo sporiji i neizvesniji od refundacije kroz platni kanal.",
            "To ne znači da ne treba evidentirati zahtev. Ako postoji administrator, stečajni upravnik ili zvaničan portal za potraživanja, prijavite potraživanje u roku. Ali praktično, prioritet za putnika iz Srbije obično je da smanji štetu: novi prevoz, povraćaj plaćene karte i dokumentovanje dodatnih troškova."
          ],
        },
        {
          heading: "Kako smanjiti rizik ubuduće",
          body: [
            "Kupovina karticom često daje bolju zaštitu od uplate transferom. Putno osiguranje ima smisla samo ako zaista pokriva insolventnost prevoznika ili propast dobavljača; mnoge polise to ne pokrivaju automatski. Kod sumnjivih ili malih aviokompanija proverite vesti pre kupovine dužeg putovanja.",
            "Ako putujete iz Srbije preko više karata, nemojte računati da će druga aviokompanija preuzeti rizik bankrota prve. Jedna rezervacija kod stabilnog prevoznika često je skuplja, ali smanjuje operativni rizik. Kod odvojenih karata, ostavite više vremena i budžet za neplanirani novi let."
          ],
        },
        {
          heading: "Redosled poteza kada se desi kolaps",
          body: [
            "Najbolji redosled je praktičan. Prvo obezbedite nastavak puta ako ste već na putovanju. Zatim istog dana otvorite trag kod banke, agencije i osiguranja. Tek posle toga pripremite formalno potraživanje prema aviokompaniji ili stečajnom portalu, jer taj kanal često ide najsporije.",
            "Ako je let bio deo paket aranžmana, proverite i obaveze organizatora putovanja. Ako je karta kupljena preko posrednika, insistirajte da jasno napišu da li su sredstva prosleđena aviokompaniji. Taj jedan podatak može odlučiti da li je brži put chargeback, zahtev posredniku ili prijava u stečaju."
          ],
        },
        {
          heading: "Kako ovo pretvoriti u checklistu",
          body: [
            "Bankrot je tema gde automatizovana lista zadataka vredi više od opšteg teksta o pravima. Putnik treba redom da dobije: kontakt banke, rok za chargeback, proveru osiguranja, proveru agencije, folder za dokaze i podsetnik da prijavi potraživanje ako se otvori zvaničan portal.",
            "Takva checklist logika sprečava najčešću grešku: čekanje da aviokompanija odgovori dok rokovi kod banke ili osiguranja prolaze. Kod insolventnosti brzina i dokumenti često vrede više od savršeno napisanog pravnog zahteva. Zato je važno reagovati istog dana i čuvati svaki trag komunikacije, uključujući odbijene pozive, autoreply poruke, screenshote i potvrde posrednika o uplati karte odmah."
          ],
        },
      ],
    },
    en: {
      slug: "airline-bankruptcy-cancelled-flight-rights",
      title: "Airline bankruptcy: what if the flight is cancelled and nobody responds",
      description: "What travelers from Serbia can do when an airline stops operating, and how to separate refund, chargeback, insurance and compensation.",
      excerpt: "When an airline goes bankrupt, a classic compensation claim often becomes difficult. The practical route is refund through card payment, insurance, agency or insolvency process, with evidence saved quickly.",
      category: "Refunds and risk",
      readTime: "8 min read",
      sections: [
        {
          heading: "Why bankruptcy is different from ordinary cancellation",
          body: [
            "With an ordinary cancellation, there is still an airline operating, receiving claims and able to offer rerouting or refund. With bankruptcy or shutdown, the main problem is that passengers often have no functioning counterpart. The flight is cancelled, the money was paid and customer support stops working.",
            "That is why bankruptcy cases usually start with practical recovery, not only the theoretical right. Even if a right exists in theory, the claim may end up in insolvency proceedings where passengers are not priority creditors."
          ],
        },
        {
          heading: "First separate refund and compensation",
          body: [
            "Refund means repayment of the ticket price for travel that was not performed. Fixed compensation is an additional amount for disruption, when conditions are met and the airline has no successful defence. In bankruptcy, refund is often more practical than arguing about extra compensation.",
            "If you paid by card, check chargeback rules with your bank immediately. If you bought through an agency or OTA platform, check whether the money is still with the intermediary or already passed to the airline. If you have travel insurance, check cover for insolvency or supplier failure."
          ],
        },
        {
          heading: "What to do in the first 48 hours",
          body: [
            "Save the ticket, payment confirmation, cancellation email, airline announcement, app screenshot and every contact attempt. If you must buy a new flight, keep proof of why the purchase was necessary and why the price was reasonable at that moment.",
            "Contact the bank, agency, insurer and airport information desks. Do not wait for the situation to clarify on its own. In bankruptcy cases, chargeback windows, insurance deadlines and alternative transport options can move quickly, while evidence disappears from websites."
          ],
        },
        {
          heading: "Do EU rights still help",
          body: [
            "European rules can explain what passengers would normally be owed after a cancellation, but enforcement is the problem. If the airline no longer has liquidity or enters formal insolvency, a claim for 250, 400 or 600 euros can be much slower and more uncertain than refund through the payment channel.",
            "That does not mean the claim should not be recorded. If there is an administrator, insolvency practitioner or official claims portal, file within the deadline. Practically, however, the priority for travelers from Serbia is usually damage control: new transport, repayment of the ticket and documentation of additional costs."
          ],
        },
        {
          heading: "How to reduce the risk next time",
          body: [
            "Card payment often gives better protection than bank transfer. Travel insurance helps only if it actually covers carrier insolvency or supplier failure; many policies do not include this automatically. With smaller or risky airlines, check recent news before buying a long trip.",
            "If you travel from Serbia on separate tickets, do not assume the second airline will absorb the bankruptcy risk of the first. One booking with a stable carrier may cost more, but reduces operational risk. With separate tickets, leave more time and budget for an unplanned replacement flight."
          ],
        },
        {
          heading: "Order of action when an airline collapses",
          body: [
            "The best order is practical. First secure onward travel if you are already mid-trip. Then open a same-day trail with the bank, agency and insurer. Only after that prepare the formal claim to the airline or insolvency portal, because that channel is often the slowest.",
            "If the flight was part of a package, also check the organizer's obligations. If the ticket was bought through an intermediary, insist that they state clearly whether funds were passed to the airline. That single fact may decide whether the faster path is chargeback, a claim against the intermediary or filing in insolvency."
          ],
        },
        {
          heading: "How to turn this into a checklist",
          body: [
            "Bankruptcy is a topic where an automated task list is more valuable than general text about rights. The passenger should receive, in order: bank contact, chargeback deadline, insurance check, agency check, evidence folder and a reminder to file a claim if an official portal opens.",
            "That checklist logic prevents the most common mistake: waiting for the airline to respond while bank or insurance deadlines pass. In insolvency cases, speed and documents often matter more than a perfectly written legal request."
          ],
        },
      ],
    },
  },
] satisfies BlogArticle[];
