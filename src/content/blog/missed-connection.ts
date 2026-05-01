import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const image = {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=82",
    alt: "Passenger looking through an airport window",
    position: "center",
  } satisfies BlogArticleImage;

export const article = {
    "id": "missed-connection",
    "publishedAt": "2026-04-17",
    "updatedAt": "2026-04-17",
    "sr": {
      "slug": "propustena-konekcija-ista-rezervacija",
      "title": "Propuštena konekcija: kada se računa kao jedan slučaj",
      "description": "Zašto je ista rezervacija ključna kod propuštene konekcije, kako se računa kašnjenje na krajnjoj destinaciji i šta aviokompanija mora da obezbedi.",
      "excerpt": "Kod konekcija se ne gleda samo prvi let koji kasni, već cela rezervacija, dolazak na krajnju destinaciju i razlog zbog kog je veza propuštena.",
      "category": "Konekcije",
      "readTime": "5 min čitanja",
      "sections": [
        {
          "heading": "Ista rezervacija je prvo pitanje",
          "body": [
            "Propuštena konekcija najčešće ima smisla za zahtev kada su segmenti puta kupljeni zajedno, pod jednom rezervacijom. Tada se put posmatra kao celina, a ne kao dva nepovezana leta.",
            "Ako ste sami kupili dve odvojene karte, aviokompanija sa prvog leta obično ne odgovara za drugi let na isti način. To je česta razlika između protected connection i self-transfer putovanja.",
            "Zato je booking reference jedan od prvih dokaza. Ako su svi segmenti na istom itineraryju, analiza se radi kroz krajnju destinaciju. Ako su karte odvojene, prava mogu postojati samo za pojedinačni let koji je kasnio ili otkazan, ali propušteni sledeći let obično postaje teži za naplatu."
          ]
        },
        {
          "heading": "Bitno je kašnjenje na finalnoj destinaciji",
          "body": [
            "Kod missed connection slučajeva presudno je koliko ste zakasnili na krajnju destinaciju. Prvi let može kasniti samo 45 minuta, ali ako zbog toga promašite jedini sledeći let i stignete dan kasnije, slučaj vredi proveriti.",
            "U praksi se upoređuje planirani dolazak iz originalne rezervacije sa stvarnim dolaskom nakon preusmeravanja. Ako razlika prelazi tri sata, a uzrok je na strani aviokompanije, postoji realan osnov za zahtev.",
            "Zato uvek beležite realno vreme dolaska na poslednji aerodrom iz rezervacije. Korisni su screenshot aplikacije, fotografija aerodromske table, email o novom letu i boarding pass za zamenski segment."
          ]
        },
        {
          "heading": "Aviokompanija mora da bude uzrok",
          "body": [
            "Ako ste konekciju propustili jer je prethodni let kasnio, otkazan je ili ste bili odbijeni zbog overbookinga, postoji potencijalni osnov. Ako ste zakasnili na gate iz ličnih razloga, zbog pasoške kontrole koju ste mogli realno da završite na vreme ili zbog odvojene samostalne konekcije, osnov je mnogo slabiji.",
            "Mora se proveriti i razlog prvog poremećaja. Tehnički ili operativni razlozi obično su drugačiji od ozbiljnog nevremena, zatvaranja aerodroma ili odluke kontrole leta. Aviokompanija se može braniti vanrednim okolnostima, ali ta odbrana mora imati vezu sa vašim konkretnim kašnjenjem.",
            "U praksi treba proveriti boarding dokumenta, novu kartu, poruke aviokompanije i razlog prvog poremećaja. Što je hronologija jasnija, lakše je odvojiti dobar zahtev od slučaja koji pravno ne stoji."
          ]
        },
        {
          "heading": "Preusmeravanje je obaveza, ne usluga",
          "body": [
            "Ako je konekcija propuštena u okviru iste rezervacije, aviokompanija treba da vas prebaci do krajnje destinacije. To nije gest dobre volje, već praktično rešavanje puta koji ste već kupili.",
            "Novi let treba da bude pod uporedivim uslovima. Ako čekate duže, mogu se otvoriti i prava na obroke, osveženje, komunikaciju, hotel i transfer. Ako vam kažu da sami kupite novu kartu, tražite pisano objašnjenje pre nego što platite.",
            "Ta prava postoje odvojeno od eventualne novčane naknade, pa ih ne treba mešati. Putnik može imati pravo na preusmeravanje i brigu čak i kada je fiksna odšteta sporna."
          ]
        },
        {
          "heading": "Kada put više nema smisla",
          "body": [
            "Nekad propuštena konekcija toliko promeni plan da put više nema svrhu: poslovni sastanak je prošao, događaj je završen ili stižete tek posle planiranog povratka. U takvim situacijama može biti važno proveriti i pravo na refundaciju dela putovanja.",
            "Ako ste već prešli deo puta, pitanje je složenije. Potrebno je pokazati šta je originalni cilj putovanja bio, šta je aviokompanija ponudila i da li je ponuđena alternativa i dalje imala realnu vrednost za vas."
          ]
        },
        {
          "heading": "Dokazi za missed connection zahtev",
          "body": [
            "Sačuvajte kompletnu originalnu rezervaciju, boarding pass za sve segmente, novu kartu, potvrdu o propuštenoj konekciji ako je dobijete i poruke aviokompanije. Ako ste morali da platite hranu, hotel, transfer ili novu kartu, sačuvajte račune.",
            "Najkorisnije je da se vidi veza između prvog poremećaja i finalnog kašnjenja: kada je prvi let stvarno stigao, kada je trebalo da poleti konekcija, koji zamenski let je ponuđen i kada ste na kraju stigli."
          ]
        },
        {
          "heading": "Novi let ne briše automatski prvobitni problem",
          "body": [
            "Ako aviokompanija brzo pronađe zamenski let, to je dobro za putnika, ali ne znači da je zahtev zatvoren. I dalje se poredi originalno planirano vreme dolaska sa stvarnim dolaskom posle preusmeravanja.",
            "Kod jedne rezervacije treba gledati celu rutu kao putovanje, naročito kada je prvi poremećaj doveo do propuštene konekcije. Sačuvajte i boarding pass za let koji ste propustili, ako ga imate, jer pokazuje da je konekcija bila deo originalnog plana.",
            "Ako ste sami kupili novu kartu jer pomoć nije stigla, čuvajte račun i razlog zašto ste to uradili. Taj trošak se ne posmatra isto kao fiksna odšteta, ali može biti važan ako aviokompanija nije obezbedila realno preusmeravanje."
          ]
        }
      ]
    },
    "en": {
      "slug": "missed-connection-same-booking",
      "title": "Missed connection: when counted as one case",
      "description": "Why the same reservation is crucial for a missed connection, how the delay at the final destination is calculated and what the airline must provide.",
      "excerpt": "With connections, it is not just the first flight that is delayed that is looked at, but the entire reservation, the arrival at the final destination and the reason why the connection was missed.",
      "category": "Connections",
      "readTime": "6 min read",
      "sections": [
        {
          "heading": "The same reservation is the first question",
          "body": [
            "A missed connection most often makes sense for a claim when road segments are purchased together under one reservation. Then the road is seen as a whole, and not as two unrelated flights.",
            "If you bought two separate tickets yourself, the airline from the first flight usually does not respond to the second flight in the same way. This is often the difference between protected connection and self-transfer travel.",
            "That is why booking references is one of the first proofs. If all segments are on the same itinerary, the analysis is done through the final destination. If the tickets are separate, rights may only exist for the individual flight that was delayed or cancelled, but a missed next flight usually becomes more difficult to collect."
          ]
        },
        {
          "heading": "The delay at the final destination is important",
          "body": [
            "In missed connection cases, it is crucial how late you are to your final destination. The first flight may be delayed by only 45 minutes, but if it causes you to miss the only subsequent flight and arrive a day later, the case is worth checking.",
            "In practice, the planned arrival from the original reservation is compared with the actual arrival after rerouting. If the difference exceeds three hours, and the cause is on the side of the airline, there is a realistic basis for the claim.",
            "That's why you always record the real time of arrival at the last airport from the reservation. A screenshot of the application, a photo of the airport board, an email about the new flight and a boarding pass for the replacement segment are useful."
          ]
        },
        {
          "heading": "The airline must be the cause",
          "body": [
            "If you missed your connection because your previous flight was delayed, canceled, or you were turned away due to overbooking, there is a potential reason. If you were late for the gate for personal reasons, because of passport control that you could realistically complete on time, or because of a separate independent connection, the basis is much weaker.",
            "The reason for the first disturbance must also be checked. Technical or operational reasons are usually different from severe storms, airport closures, or air traffic control decisions. The airline can defend extraordinary circumstances, but that defense must be related to your specific delay.",
            "In practice, you should check the boarding documents, the new ticket, the airline's messages and the reason for the first disruption. The clearer the chronology, the easier it is to separate a good claim from a case that doesn't stand up legally."
          ]
        },
        {
          "heading": "Redirection is a liability, not a service",
          "body": [
            "If a connection is missed within the same reservation, the airline should transfer you to your final destination. It's not a gesture of good will, but a practical solution to a road you've already bought.",
            "The new flight should be under comparable conditions. If you wait longer, rights to meals, refreshments, communication, hotel and transfer can also be opened. If they tell you to buy a new ticket yourself, ask for a written explanation before paying.",
            "These rights exist separately from any monetary compensation, so they should not be mixed. A passenger may be entitled to diversion and care even when fixed compensation is in dispute."
          ]
        },
        {
          "heading": "When the road no longer makes sense",
          "body": [
            "Sometimes a missed connection changes the plan so much that the trip no longer has a purpose: the business meeting has passed, the event has ended, or you arrive only after the planned return. In such situations, it may be important to check the right to a refund for part of the trip.",
            "If you have already traveled part of the way, the question is more complex. It is necessary to show what the original purpose of the trip was, what the airline offered and whether the alternative offered still had real value for you."
          ]
        },
        {
          "heading": "Evidence for a missed connection claim",
          "body": [
            "Keep the complete original reservation, boarding pass for all segments, new ticket, missed connection confirmation if received and airline messages. If you had to pay for food, hotel, transfer or a new ticket, save the receipts.",
            "It is most useful to see the relationship between the first disruption and the final delay: when the first flight actually arrived, when the connection was supposed to take off, what alternate flight was offered, and when you finally arrived."
          ]
        },
        {
          "heading": "A new flight does not automatically erase the original problem",
          "body": [
            "If the airline quickly finds a replacement flight, that's good for the passenger, but it doesn't mean the request is closed. The original scheduled arrival time is still compared with the actual arrival after the rerouting.",
            "With one reservation, the entire route should be viewed as a trip, especially when the first disruption led to a missed connection. Also keep the boarding pass for the flight you missed, if you have it, as it shows that the connection was part of the original plan.",
            "If you bought a new ticket yourself because help didn't arrive, keep the receipt and the reason you did it. That cost is not considered the same as fixed compensation, but it can be important if the airline has not provided realistic rerouting."
          ]
        }
      ]
    }
  } satisfies BlogArticle;
