import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const image = {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=82",
    alt: "Passenger looking through an airport window",
    position: "center",
  } satisfies BlogArticleImage;

export const article = {
    "id": "missed-connection",
    "publishedAt": "2026-04-17",
    "updatedAt": "2026-09-15",
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
            "Za [naknadu za propuštenu konekciju](/naknada-za-propustenu-konekciju) potrebni su originalne elektronske karte, potvrda rezervacije i uslovi kupovine. Jedan PNR jeste koristan signal, ali ne zamenjuje proveru da li je prodat jedinstven povezan prevoz ili odvojene karte."
          ]
        },
        {
          "heading": "Bitno je kašnjenje na finalnoj destinaciji",
          "body": [
            "Kod missed connection slučajeva presudno je koliko ste zakasnili na krajnju destinaciju. Prvi let može kasniti samo 45 minuta, ali ako zbog toga promašite jedini sledeći let i stignete dan kasnije, slučaj vredi proveriti.",
            "Po pravilima EU poredi se planirani dolazak sa stvarnim dolaskom na krajnju destinaciju iz povezane rezervacije. Najmanje tri sata mogu otvoriti pitanje naknade ako su ispunjeni uslovi obuhvata i odgovornosti; prvi let ne mora sam kasniti tri sata. Za Srbiju/ECAA pravni osnov se proverava zasebno, bez automatskog prenošenja kasnije prakse Suda EU.",
            "Zato uvek beležite realno vreme dolaska na poslednji aerodrom iz rezervacije. Korisni su screenshot aplikacije, fotografija aerodromske table, email o novom letu i boarding pass za zamenski segment."
          ]
        },
        {
          "heading": "Aviokompanija mora da bude uzrok",
          "body": [
            "Ako ste konekciju propustili jer je prethodni let kasnio, otkazan je ili ste bili odbijeni zbog overbookinga, postoji potencijalni osnov. Ako ste zakasnili na gate iz ličnih razloga, zbog pasoške kontrole koju ste mogli realno da završite na vreme ili zbog odvojene samostalne konekcije, osnov je mnogo slabiji.",
            "Mora se proveriti i razlog prvog poremećaja. Tehnički ili operativni razlozi obično su drugačiji od ozbiljnog nevremena, zatvaranja aerodroma ili odluke kontrole leta. Aviokompanija se može braniti vanrednim okolnostima, ali ta odbrana mora imati vezu sa Vašim konkretnim kašnjenjem.",
            "U praksi treba proveriti boarding dokumenta, novu kartu, poruke aviokompanije i razlog prvog poremećaja. Što je hronologija jasnija, lakše je odvojiti dobar zahtev od slučaja koji pravno ne stoji."
          ]
        },
        {
          "heading": "Tražite konkretno rešenje nastavka puta",
          "body": [
            "Ako zbog poremećaja prvog leta propadne zaštićena konekcija, od prevoznika tražite konkretno rešenje nastavka puta do ugovorene destinacije. Koja prava na preusmeravanje ili povraćaj važe zavisi i od toga da li je let otkazan, kasni ili je ukrcavanje uskraćeno; ne smatra se svaka propuštena veza istim događajem.",
            "Novi let treba da bude pod uporedivim uslovima. Ako čekate duže, mogu se otvoriti i prava na obroke, osveženje, komunikaciju, hotel i transfer. Ako Vam kažu da sami kupite novu kartu, tražite pisano objašnjenje pre nego što platite.",
            "Ta prava postoje odvojeno od eventualne novčane naknade, pa ih ne treba mešati. Putnik može imati pravo na preusmeravanje i brigu čak i kada je fiksna odšteta sporna."
          ]
        },
        {
          "heading": "Kada put više nema smisla",
          "body": [
            "Nekad propuštena konekcija toliko promeni plan da put više nema svrhu: poslovni sastanak je prošao, događaj je završen ili stižete tek posle planiranog povratka. U takvim situacijama može biti važno proveriti i pravo na refundaciju dela putovanja.",
            "Ako ste već prešli deo puta, pitanje je složenije. Potrebno je pokazati šta je originalni cilj putovanja bio, šta je aviokompanija ponudila i da li je ponuđena alternativa i dalje imala realnu vrednost za Vas."
          ]
        },
        {
          "heading": "Dokazi za missed connection zahtev",
          "body": [
            "Sačuvajte kompletnu originalnu rezervaciju, boarding pass za sve segmente, novu kartu, potvrdu o propuštenoj konekciji ako je dobijete i poruke aviokompanije. Ako ste morali da platite hranu, hotel, transfer ili novu kartu, sačuvajte račune.",
            "Složite vremensku liniju: planirani dolazak prvog leta, sletanje i otvaranje vrata, zatvaranje gejta konekcije, ponuđeni zamenski let i stvarni konačni dolazak. Zabeležite vremensku zonu. Ako je drugi let kasnio iz nezavisnog razloga, taj događaj odvojite od posledice prvog kašnjenja.",
            "Za svaki segment navedite broj leta i operativnog prevoznika, ne samo brend prodavca karte. Više prevoznika ne znači automatski da put nije povezan, ali ni da svi solidarno odgovaraju. Let Kasni proverava rezervaciju i uzročnu vezu pre određivanja kome se zahtev upućuje. Ako odgovor pokriva samo prvi segment, dopuna treba da traži procenu konačnog dolaska i preostalih stavki."
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
            "A missed-connection claim is assessed differently when flight segments were purchased together under one booking. The connected journey can then be considered as a whole, rather than as unrelated flights.",
            "If you bought two separate tickets yourself, the airline from the first flight usually does not respond to the second flight in the same way. This is often the difference between protected connection and self-transfer travel.",
            "For [missed connection compensation](/en/missed-connection-compensation), keep the original e-tickets, booking confirmation and purchase terms. A single PNR is a useful signal, but does not replace checking whether connected carriage or separate tickets were sold."
          ]
        },
        {
          "heading": "The delay at the final destination is important",
          "body": [
            "In missed connection cases, it is crucial how late you are to your final destination. The first flight may be delayed by only 45 minutes, but if it causes you to miss the only subsequent flight and arrive a day later, the case is worth checking.",
            "Under EU rules, compare scheduled arrival with actual arrival at the final destination of the connected booking. At least three hours may support compensation if coverage and responsibility conditions are met; the first flight need not itself be three hours late. Serbian/ECAA legal grounds require separate assessment, without automatically importing later CJEU case law.",
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
          "heading": "Ask for a concrete onward-travel solution",
          "body": [
            "If disruption to the first flight breaks a protected connection, ask the carrier for a concrete plan to reach the agreed destination. Rerouting or refund rights also depend on whether the flight was cancelled, delayed or boarding was denied; not every missed connection is the same event.",
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
            "Build a timeline: scheduled first-flight arrival, landing and door opening, connecting-gate closure, offered replacement flight and actual final arrival. Record the time zone. If the second flight was delayed for an independent reason, separate that event from the consequence of the first delay.",
            "For each segment identify the flight number and operating carrier, not only the ticket seller's brand. Multiple carriers do not automatically make a journey unconnected, nor make all carriers jointly liable. Let Kasni checks booking and causation before identifying the addressee. If a response covers only the first segment, the follow-up should request assessment of final arrival and the remaining items."
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
