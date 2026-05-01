import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const image = {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=82",
    alt: "Person reviewing documents beside a laptop",
    position: "center",
  } satisfies BlogArticleImage;

export const article = {
    "id": "how-to-file-airline-claim",
    "publishedAt": "2026-04-25",
    "updatedAt": "2026-04-25",
    "sr": {
      "slug": "kako-podneti-reklamaciju-avio-kompaniji",
      "title": "Kako podneti reklamaciju avio-kompaniji posle kašnjenja ili otkazivanja",
      "description": "Korak po korak vodič: koje podatke pripremiti, kako napisati zahtev, šta priložiti i kako pratiti odgovor avio-kompanije.",
      "excerpt": "Dobar zahtev nije dugačak. Dobar zahtev je precizan: let, datum, ruta, šta se desilo, šta tražite i dokazi koji to podržavaju.",
      "category": "Procedura",
      "readTime": "4 min čitanja",
      "sections": [
        {
          "heading": "Počnite od činjenica, ne od emocija",
          "body": [
            "Reklamacija avio-kompaniji treba da bude jasna i proverljiva. Pre slanja pripremite broj leta, datum, aerodrom polaska, aerodrom dolaska, booking reference i kratak opis poremećaja.",
            "Ako ste imali konekciju, navedite krajnju destinaciju iz cele rezervacije, ne samo segment koji je kasnio. Kod propuštene konekcije često je presudno koliko ste zakasnili na poslednji aerodrom, a ne samo koliko je kasnio prvi let.",
            "Nije potrebno pisati dugačak emotivan opis. Aviokompaniji treba dovoljno informacija da pronađe let, razume osnov zahteva i vidi koje dokaze prilažete."
          ],
          "bullets": [
            "broj leta i datum",
            "ruta i krajnja destinacija",
            "booking reference ili broj karte",
            "planirano i stvarno vreme dolaska"
          ]
        },
        {
          "heading": "Jasno razdvojite šta tražite",
          "body": [
            "Ako tražite fiksnu naknadu zbog kašnjenja, otkazivanja ili uskraćenog ukrcavanja, napišite to direktno. Ako tražite refundaciju karte, nadoknadu troškova hotela ili obroka, stavite to kao posebnu stavku.",
            "Mešanje refundacije, vaučera, brige na aerodromu i fiksne odštete često pravi konfuziju. Podrška tada odgovori samo na najlakši deo, na primer refundaciju karte, a zanemari naknadu.",
            "Bolje je napisati tri kratka zahteva nego jednu dugu poruku u kojoj se sve traži odjednom. Tako kasnije lakše dokazujete šta ste zaista tražili."
          ]
        },
        {
          "heading": "Priložite dokaze u urednom paketu",
          "body": [
            "Uz reklamaciju priložite potvrdu rezervacije, boarding pass ili check-in potvrdu, poruke aviokompanije i dokaze o stvarnom dolasku. Ako tražite troškove, priložite račune.",
            "Ako nemate sve dokumente, pošaljite ono što imate i jasno napišite šta nedostaje. Nedostatak jednog dokumenta ne mora značiti kraj, ali je bolje biti transparentan nego slati nejasan zahtev.",
            "Dokaze nazovite razumljivo: karta, boarding-pass, poruka-o-otkazivanju, racun-hotel. To deluje sitno, ali kod ručne obrade smanjuje greške."
          ]
        },
        {
          "heading": "Koristite zvaničan kanal",
          "body": [
            "Većina aviokompanija ima web formular ili portal za reklamacije. Ako postoji zvaničan kanal, koristite ga prvo. Posle slanja sačuvajte potvrdu, screenshot i referentni broj.",
            "Ako šaljete email, sačuvajte poslatu poruku i automatski odgovor. Bez dokaza o slanju i prijemu kasnije je teže tvrditi da je reklamacija podneta na vreme.",
            "Nemojte slati isti zahtev na deset adresa istog dana. To obično ne ubrzava predmet, već pravi konfuziju. Bolje je jedan jasan zahtev, pa uredan follow-up ako nema odgovora."
          ]
        },
        {
          "heading": "Pratite rokove i odgovor",
          "body": [
            "Posle slanja napravite kratku belešku: datum reklamacije, kanal, referentni broj i šta ste priložili. Ako aviokompanija traži dopunu, zabeležite kada ste je poslali.",
            "Ako odgovor stigne, ne gledajte samo da li piše prihvaćeno ili odbijeno. Proverite razlog. Odbijanje zbog vanrednih okolnosti, vremena, kontrole leta ili tehničkog problema treba da bude dovoljno konkretno da se može proveriti.",
            "Ako nema odgovora u relevantnom roku ili je odgovor generički, sledeći korak može biti dodatna opomena, regulatorna prijava ili pravna procena. Pre eskalacije ipak proverite da li je osnov zahteva realan."
          ]
        },
        {
          "heading": "Kada ima smisla tražiti pomoć",
          "body": [
            "Ako je slučaj čist, možete pokušati sami. Ako postoji konekcija, preusmeravanje, odbijanje, nejasan razlog ili komunikacija na više jezika, pomoć može uštedeti vreme.",
            "Letkasni.rs može pre ili posle reklamacije da pogleda da li slučaj ima smisla, šta nedostaje i kako da se zahtev ne izgubi zbog loše procedure.",
            "Pomoć je naročito korisna kada dobijete delimičan odgovor: na primer refundiran je deo karte, ali nije odgovoreno na fiksnu naknadu, ili su priznati troškovi hotela, ali nije objašnjen razlog kašnjenja. Tada treba znati šta je još otvoreno.",
            "Ako sami šaljete zahtev, sačuvajte sve potvrde. Ako kasnije uključite servis, uredna prethodna komunikacija omogućava bržu procenu i manje ponavljanja istih pitanja.",
            "To je naročito važno kod porodica i grupnih rezervacija, gde jedan propust u dokumentaciji može usporiti sve putnike."
          ]
        },
        {
          "heading": "Računajte da proces može trajati",
          "body": [
            "Ozbiljni servisi otvoreno navode da jednostavni slučajevi mogu biti rešeni brzo, ali sporni predmeti mogu trajati mesecima, naročito ako aviokompanija odbija, traži dopune ili predmet ide ka regulatoru ili sudu.",
            "Zato je važno da od početka vodite uredan folder. Ako posle tri meseca treba dopuniti predmet, ne želite da tražite boarding pass po starim porukama ili da se prisećate ko je šta rekao na gejtu.",
            "Dobar claim nije samo jedna poruka. To je proces: slanje, potvrda prijema, praćenje roka, odgovor, dopuna, eventualna eskalacija i odluka da li se nastavlja."
          ]
        }
      ]
    },
    "en": {
      "slug": "how-to-file-airline-compensation-claim",
      "title": "How to complain to an airline after a delay or cancellation",
      "description": "Step-by-step guide: what information to prepare, how to write a request, what to attach and how to track the airline's response.",
      "excerpt": "A good request is not long. A good request is specific: flight, date, route, what happened, what you are looking for and evidence to support it.",
      "category": "Claim process",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "Start with facts, not emotions",
          "body": [
            "Complaints to the airline should be clear and verifiable. Before sending, prepare the flight number, date, departure airport, arrival airport, booking reference and a short description of the disturbance.",
            "If you had a connection, please provide the final destination from the entire reservation, not just the segment that was delayed. With a missed connection, it is often how late you were at the last airport that matters, not just how late the first flight was.",
            "It is not necessary to write a long emotional description. The airline needs enough information to find the flight, understand the basis of the claim and see what evidence you are providing."
          ],
          "bullets": [
            "flight number and date",
            "route and final destination",
            "booking reference or ticket number",
            "planned and actual arrival time"
          ]
        },
        {
          "heading": "Clearly separate what you are looking for",
          "body": [
            "If you are asking for a fixed fee due to delay, cancellation or denied boarding, write it directly. If you are asking for a ticket refund, hotel or meal reimbursement, put it as a separate line item.",
            "Mixing refunds, vouchers, airport care and fixed compensation often creates confusion. Support then only answers the easiest part, for example the ticket refund, and ignores the fee.",
            "It is better to write three short requests than one long message asking everything at once. This makes it easier to prove later what you were really looking for."
          ]
        },
        {
          "heading": "Attach the evidence in a neat package",
          "body": [
            "Attach the reservation confirmation, boarding pass or check-in confirmation, airline messages and proof of actual arrival with the complaint. If you are asking for expenses, please attach receipts.",
            "If you don't have all the documents, send what you have and clearly write what is missing. Missing one document doesn't have to mean the end, but it's better to be transparent than to send a vague request.",
            "Give the evidence an understandable name: ticket, boarding-pass, cancellation-message, hotel-receipt. It seems small, but it reduces errors in manual processing."
          ]
        },
        {
          "heading": "Use the official channel",
          "body": [
            "Most airlines have a web form or portal for complaints. If there is an official channel, use it first. After sending, save the confirmation, screenshot and reference number.",
            "If you are sending an email, save the sent message and the automatic reply. Without proof of sending and receiving, it is later more difficult to claim that the complaint was filed on time.",
            "Do not send the same request to ten addresses on the same day. This usually does not speed up the subject, it creates confusion. It is better to have a clear request, then a proper follow-up if there is no answer."
          ]
        },
        {
          "heading": "Follow the deadlines and response",
          "body": [
            "After sending, make a short note: date of complaint, channel, reference number and what you have attached. If the airline asks for a refill, note when you sent it.",
            "If a reply arrives, don't just look at whether it says accepted or rejected. Check the reason. Denial due to extraordinary circumstances, weather, air traffic control or technical problem should be specific enough to be verifiable.",
            "If there is no response within the relevant time frame or the response is generic, the next step may be a further warning, regulatory filing or legal assessment. Before escalation, however, check whether the basis of the request is realistic."
          ]
        },
        {
          "heading": "When it makes sense to ask for help",
          "body": [
            "If the case is clean, you can try it yourself. If there is a connection, redirection, rejection, unclear reason or communication in multiple languages, help can save time.",
            "Before or after the complaint, letkasni.rs can check whether the case makes sense, what is missing and how to avoid losing the request due to bad procedures.",
            "Help is especially useful when you receive a partial response: for example, part of the ticket was refunded, but the fixed fee was not answered, or the hotel costs were acknowledged, but the reason for the delay was not explained. Then you need to know what is still open.",
            "If you are submitting the request yourself, please save all receipts. If you turn on the service later, proper prior communication allows for a faster assessment and fewer repetitions of the same questions.",
            "This is especially important with family and group bookings, where one slip in documentation can slow down all passengers."
          ]
        },
        {
          "heading": "Expect the process to take some time",
          "body": [
            "Serious services openly state that simple cases can be resolved quickly, but disputed cases can take months, especially if the airline refuses, asks for amendments or the case goes to a regulator or court.",
            "That's why it's important to keep a neat folder from the start. If after three months you need to refill the item, you don't want to search for the boarding pass through old messages or remember who said what at the gate.",
            "A good claim is not just one message. It is a process: sending, confirming receipt, following the deadline, replying, supplementing, eventual escalation and deciding whether to continue."
          ]
        }
      ]
    }
  } satisfies BlogArticle;
