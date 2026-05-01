import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const image = {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1400&q=82",
    alt: "Person typing an email on a laptop",
    position: "center",
  } satisfies BlogArticleImage;

export const article = {
    "id": "claim-template-email",
    "publishedAt": "2026-04-30",
    "updatedAt": "2026-04-30",
    "sr": {
      "slug": "primer-emaila-za-reklamaciju-leta",
      "title": "Primer emaila za reklamaciju zbog kašnjenja ili otkazivanja leta",
      "description": "Praktičan obrazac emaila koji putnik može prilagoditi kada traži odštetu, refundaciju troškova ili obrazložen odgovor avio-kompanije.",
      "excerpt": "Najbolji email za reklamaciju je kratak, formalan i pun konkretnih podataka. Bez pretnji, bez viška emocija i bez mešanja različitih zahteva.",
      "category": "Obrasci",
      "readTime": "4 min čitanja",
      "sections": [
        {
          "heading": "Šta email mora da sadrži",
          "body": [
            "Email treba da sadrži podatke o letu, kratak opis poremećaja, šta tražite i spisak dokaza u prilogu. Ako tražite fiksnu naknadu, navedite da zahtev podnosite zbog kašnjenja, otkazivanja, propuštene konekcije ili uskraćenog ukrcavanja.",
            "Obavezno navedite broj leta, datum, rutu, booking reference, planirano vreme dolaska i stvarno vreme dolaska ako ga znate. Kod konekcije navedite krajnju destinaciju iz cele rezervacije.",
            "Ne morate citirati zakon u deset pasusa. Preciznost je važnija od dužine. Aviokompaniji treba jasna osnova da pronađe let i odgovori na konkretan zahtev."
          ]
        },
        {
          "heading": "Osnovni primer poruke",
          "body": [
            "Poštovani, podnosim reklamaciju za let [broj leta] na relaciji [od-do], planiran za [datum]. Let je [kasnio/otkazan/preusmeren], a na krajnju destinaciju sam stigao/la [koliko kasno] u odnosu na planirano vreme.",
            "Molim vas da proverite osnov za fiksnu naknadu i dostavite obrazložen odgovor. U prilogu šaljem potvrdu rezervacije, boarding pass i dostupnu komunikaciju o poremećaju. Molim potvrdu prijema reklamacije i referentni broj.",
            "Ovaj tekst je namerno kratak. Po potrebi dodajte jednu ili dve rečenice koje objašnjavaju specifičnost slučaja, na primer propuštenu konekciju, alternativni let ili uskraćeno ukrcavanje."
          ]
        },
        {
          "heading": "Ako tražite i troškove",
          "body": [
            "Ako ste sami platili obrok, hotel, transfer ili novu kartu jer aviokompanija nije obezbedila brigu, navedite to odvojeno. Nemojte mešati taj zahtev sa fiksnom naknadom u istoj rečenici.",
            "Možete napisati: Pored zahteva za fiksnu naknadu, tražim i refundaciju razumnih troškova nastalih tokom čekanja, u iznosu od [iznos], prema računima u prilogu.",
            "Priložite račune i kratko objasnite zašto su troškovi nastali. Ako je bilo noćenje, navedite da li aviokompanija nije obezbedila hotel ili nije dala jasnu instrukciju."
          ]
        },
        {
          "heading": "Ako je let otkazan",
          "body": [
            "Kod otkazanog leta dodajte kada ste obavešteni o otkazivanju i šta vam je ponuđeno. To je važno jer rok obaveštenja i alternativni let mogu promeniti pravo na naknadu.",
            "Primer dodatka: O otkazivanju sam obavešten/a dana [datum i vreme]. Ponuđen mi je alternativni let [broj/ruta], kojim sam stigao/la na krajnju destinaciju [koliko kasno].",
            "Ako ste umesto preusmeravanja tražili refundaciju, navedite i to, ali jasno odvojite pitanje karte od pitanja fiksne odštete."
          ]
        },
        {
          "heading": "Ako je zahtev već odbijen",
          "body": [
            "Ako odgovarate na odbijanje, nemojte slati isti email od početka. Pozovite se na referentni broj i tražite konkretnije obrazloženje.",
            "Primer: Hvala na odgovoru. Molim vas da precizirate koje konkretne vanredne okolnosti su uticale na let [broj leta], u kom vremenskom periodu i koje mere su preduzete da se kašnjenje smanji.",
            "Takav odgovor je korisniji od rasprave. Tražite činjenice koje se kasnije mogu proveriti."
          ]
        },
        {
          "heading": "Šta izbegavati",
          "body": [
            "Izbegavajte pretnje, uvrede, velika slova, predugačke opise putovanja i tvrdnje koje ne možete dokazati. Ako slučaj kasnije ide u ručnu proveru, uredna i profesionalna komunikacija pomaže.",
            "Ne šaljite originalne dokumente ako nije neophodno. Pošaljite kopije ili skenove. Sačuvajte poslatu poruku, priloge, automatski odgovor i referentni broj.",
            "Ako niste sigurni da li je slučaj jak, prvo unesite osnovne podatke na letkasni.rs. Bolje je proveriti osnov nego slati zahtev koji meša refundaciju, vaučer, troškove i odštetu bez jasne strukture.",
            "Nemojte izmišljati tačno vreme dolaska ako ga ne znate. Bolje je napisati prema dostupnim podacima ili priložiti screenshot nego navesti netačan podatak koji aviokompanija kasnije lako ospori.",
            "Takođe ne šaljite različite verzije događaja u više poruka. Ako morate nešto ispraviti, napišite jasno da dopunjujete prethodnu reklamaciju i navedite šta se menja.",
            "Na kraju emaila tražite obrazložen odgovor, ne samo status. To je važno ako kasnije treba proveriti da li je odbijanje konkretno ili samo generička poruka."
          ]
        },
        {
          "heading": "Dodajte rok za odgovor i kontakt podatke",
          "body": [
            "Na kraju poruke možete dodati molbu da aviokompanija dostavi obrazložen odgovor u relevantnom roku i da sva komunikacija ide na isti email. To pomaže da se kasnije vidi kada je ćutanje zaista problem.",
            "Navedite puno ime putnika, kontakt email, telefon ako želite i booking reference. Ako zahtev šaljete za više putnika, jasno navedite da li pišete za sve putnike iz rezervacije ili samo za sebe.",
            "Ako šaljete priloge, navedite ih poimence. Na primer: potvrda rezervacije, boarding pass, poruka o otkazivanju, račun za hotel. Tako se smanjuje rizik da aviokompanija kasnije tvrdi da dokument nije poslat."
          ]
        }
      ]
    },
    "en": {
      "slug": "flight-compensation-claim-email-template",
      "title": "Example of an email for a complaint about flight delays or cancellations",
      "description": "A practical email template that a passenger can customize when seeking compensation, reimbursement of expenses or a reasoned response from the airline.",
      "excerpt": "The best complaint email is short, formal and full of specific information. No threats, no excess emotions and no mixing of different demands.",
      "category": "Templates",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "What the email must contain",
          "body": [
            "The email should contain the flight details, a brief description of the disturbance, what you are looking for and a list of attached evidence. If you are claiming a fixed fee, state that you are making the claim due to a delay, cancellation, missed connection or denied boarding.",
            "Be sure to include the flight number, date, route, booking reference, planned arrival time and actual arrival time if you know it. When connecting, specify the final destination from the entire reservation.",
            "You don't have to quote the law in ten paragraphs. Accuracy is more important than length. An airline needs a clear basis to find a flight and respond to a specific request."
          ]
        },
        {
          "heading": "Basic message example",
          "body": [
            "Dear Sir/Madam, I am submitting a claim for flight [flight number] on the route [from-to], scheduled for [date]. The flight was [delayed/cancelled/diverted], and I arrived at my final destination [how late] compared to the planned time.",
            "Please check the basis for the fixed fee and provide a reasoned answer. I am attaching the reservation confirmation, boarding pass and available communication about the disruption. Please confirm the receipt of the complaint and the reference number.",
            "This text is intentionally short. If necessary, add a sentence or two explaining the specifics of the case, such as a missed connection, alternate flight, or denied boarding."
          ]
        },
        {
          "heading": "If you are also looking for costs",
          "body": [
            "If you paid for a meal, hotel, transfer or new ticket yourself because the airline did not provide care, list it separately. Don't confuse that request with a fixed fee in the same sentence.",
            "You can write: In addition to the request for a fixed fee, I also request a refund of reasonable expenses incurred during the waiting period, in the amount of [amount], according to the invoices attached.",
            "Attach invoices and briefly explain why the expenses were incurred. If it was an overnight stay, state whether the airline did not provide a hotel or did not give clear instructions."
          ]
        },
        {
          "heading": "If the flight is cancelled",
          "body": [
            "For the canceled flight, add when you were notified of the cancellation and what was offered to you. This is important because the notice period and an alternative flight can change the right to compensation.",
            "Example of addendum: I was notified of the cancellation on [date and time]. I was offered an alternative flight [number/route], which took me to my final destination [how late].",
            "If you requested a refund instead of rerouting, state that as well, but clearly separate the issue of the ticket from the issue of fixed compensation."
          ]
        },
        {
          "heading": "If the request has already been rejected",
          "body": [
            "If you are responding to a bounce, don't send the same email from the beginning. Refer to the reference number and ask for a more specific explanation.",
            "Example: Thank you for your reply. Please specify which specific extraordinary circumstances affected the flight [flight number], in what period of time and what measures were taken to reduce the delay.",
            "Such an answer is more useful than an argument. You are looking for facts that can be checked later."
          ]
        },
        {
          "heading": "What to avoid",
          "body": [
            "Avoid threats, insults, capital letters, overly long travel descriptions, and claims you can't prove. If the case later goes to manual review, orderly and professional communication helps.",
            "Do not send original documents unless necessary. Send copies or scans. Save the sent message, attachments, auto reply and reference number.",
            "If you are not sure whether the case is strong, first enter the basic data on letkasni.rs. It is better to check the basis than to send a claim that mixes refund, voucher, expenses and compensation without a clear structure.",
            "Do not invent the exact arrival time if you do not know it. It is better to write according to the available data or attach a screenshot than to provide incorrect information that the airline can easily dispute later.",
            "Also don't send different versions of the event in multiple messages. If you have to correct something, write clearly that you are supplementing the previous complaint and state what is being changed.",
            "At the end of the email, you are looking for a reasoned response, not just a status. This is important if you need to check later if the rejection is specific or just a generic message."
          ]
        },
        {
          "heading": "Add a response deadline and contact information",
          "body": [
            "At the end of the message, you can add a request that the airline provide a reasoned response within the relevant time frame and that all communications go to the same email. It helps to see later when silence is really a problem.",
            "Provide the passenger's full name, contact email, phone number if desired and booking reference. If you are sending a request for several passengers, clearly state whether you are writing for all passengers from the reservation or just for yourself.",
            "If you are sending attachments, please list them by name. For example: booking confirmation, boarding pass, cancellation message, hotel bill. This reduces the risk that the airline will later claim that the document was not sent."
          ]
        }
      ]
    }
  } satisfies BlogArticle;
