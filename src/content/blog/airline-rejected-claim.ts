import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const image = {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=82",
    alt: "Laptop showing customer support work",
    position: "center",
  } satisfies BlogArticleImage;

export const article = {
    "id": "airline-rejected-claim",
    "publishedAt": "2026-04-26",
    "updatedAt": "2026-04-26",
    "sr": {
      "slug": "avio-kompanija-odbila-zahtev",
      "title": "Aviokompanija je odbila zahtev: da li je to kraj",
      "description": "Zašto prvo odbijanje avio-kompanije ne mora biti konačno, koje razloge treba proveriti i kada nema smisla nastavljati postupak.",
      "excerpt": "Generičko odbijanje nije isto što i dobro obrazložen pravni odgovor. Važno je proveriti da li razlog odgovara letu, ruti i dokazima.",
      "category": "Posle odbijanja",
      "readTime": "4 min čitanja",
      "sections": [
        {
          "heading": "Prvo odbijanje često nije cela priča",
          "body": [
            "Aviokompanije ponekad šalju kratke odgovore: vanredne okolnosti, operativni razlozi, tehnički problem, odluka kontrole leta ili nema prava na naknadu. Takav odgovor može biti tačan, ali nije dovoljan sam po sebi.",
            "Dobar odgovor treba da ima vezu sa konkretnim letom: datumom, rutom, razlogom poremećaja i merama koje je aviokompanija preduzela. Ako je poruka generička, slučaj vredi pročitati pažljivije.",
            "Odbijanje nije poziv da se automatski ide dalje po svaku cenu. To je signal da treba proveriti da li je razlog stvaran, relevantan i dovoljno konkretan."
          ]
        },
        {
          "heading": "Koji razlozi traže dodatnu proveru",
          "body": [
            "Posebno treba proveriti odgovore koji samo navode weather, safety, technical issue, operational reasons ili air traffic restrictions bez detalja. Neki od tih razloga zaista mogu isključiti naknadu, ali se često koriste preširoko.",
            "Tehnički problem nije automatski vanredna okolnost. Loše vreme jeste ozbiljan razlog samo ako je stvarno uticalo na taj let. Kašnjenje prethodnog leta mora imati jasnu vezu sa vašim poremećajem.",
            "Ako se odgovor aviokompanije ne poklapa sa porukama koje ste dobijali na aerodromu, fotografijama table leta ili javno dostupnim informacijama, postoji razlog za dodatnu analizu."
          ]
        },
        {
          "heading": "Šta poslati na ručnu proveru",
          "body": [
            "Za proveru odbijanja pošaljite originalni zahtev, odgovor aviokompanije, broj leta, datum, rutu, booking confirmation, boarding pass i sve poruke koje imate. Ako ste preusmereni, dodajte novi itinerary.",
            "Korisno je poslati i kratku hronologiju: kada je let trebalo da krene, kada je stvarno krenuo, kada ste stigli, kada ste poslali reklamaciju i kada je stiglo odbijanje.",
            "Ako imate račune za hotel, hranu ili transfer, priložite ih odvojeno. Čak i kada je fiksna naknada sporna, troškovi brige mogu biti posebno pitanje."
          ]
        },
        {
          "heading": "Kako razlikovati loš odgovor od slabog slučaja",
          "body": [
            "Loš odgovor je kratak, generički i ne objašnjava činjenice. Slab slučaj je nešto drugo: ruta nije pokrivena, kašnjenje na dolasku nije dovoljno, putnik je zakasnio na gate ili su dokazi jasni da je postojala vanredna okolnost.",
            "Zato nije dovoljno reći aviokompanija me odbila. Treba pročitati zašto je odbila i uporediti to sa pravilima i dokazima. Nekad se ispostavi da je odbijanje površno, a nekad da je zahtev zaista slab.",
            "Dobar servis treba da kaže oba ishoda. Nema vrednosti u guranju slučaja koji nema realan osnov."
          ]
        },
        {
          "heading": "Mogući sledeći koraci",
          "body": [
            "Ako odbijanje nije ubedljivo, sledeći korak može biti dopuna zahteva, traženje konkretnijeg obrazloženja, regulatorna prijava ili pravna procena. Redosled zavisi od rute, dokumentacije i lokalne procedure.",
            "Ako je odgovor delimično tačan, možda ima smisla tražiti samo refundaciju troškova, a ne fiksnu naknadu. Ako je odgovor potpuno neosnovan, slučaj može ići dalje agresivnije.",
            "Najgore je reagovati impulsivno i poslati ljutu poruku bez novih činjenica. Bolje je poslati kratak, precizan odgovor koji pokazuje šta je sporno."
          ]
        },
        {
          "heading": "Kada ne treba insistirati",
          "body": [
            "Ako dokumenti jasno pokazuju da je uzrok bio zatvaranje aerodroma, ozbiljno nevreme, bezbednosna odluka ili druga okolnost van kontrole aviokompanije, insistiranje može biti gubljenje vremena.",
            "Isto važi ako je kašnjenje na dolasku bilo ispod praga ili ako ruta ne ulazi u relevantan okvir. Poštena procena je bolja od lažne nade.",
            "Ipak, i tada treba odvojiti fiksnu naknadu od ostalih prava. Možda ne postoji pravo na 250, 400 ili 600 evra, ali i dalje može postojati refundacija karte, refundacija razumnih troškova ili pravo na bolji pisani odgovor.",
            "Zato se ne odustaje samo zato što je stigla reč odbijeno. Odustaje se kada se vidi da činjenice, ruta i dokazi zaista ne nose dalji zahtev."
          ]
        },
        {
          "heading": "Delimična isplata ne rešava uvek sve",
          "body": [
            "Neki putnici dobiju refundaciju troškova, vaučer ili deo karte, pa aviokompanija to predstavi kao rešavanje slučaja. To ne znači automatski da je pitanje fiksne odštete zatvoreno.",
            "Ako je aviokompanija platila hotel, to može značiti da je priznala pravo na brigu, ali ne govori nužno ništa o naknadi od 250, 400 ili 600 evra. Ako je vratila kartu, to opet ne mora rešiti pitanje poremećaja.",
            "Zato kod odbijanja treba proveriti šta je tačno odbijeno, a šta je eventualno priznato. Delimičan odgovor često ostavlja prostor za precizniji nastavak."
          ]
        }
      ]
    },
    "en": {
      "slug": "airline-rejected-compensation-claim",
      "title": "The airline refused the request: is that the end",
      "description": "Why the first refusal of the airline does not have to be final, what reasons should be checked and when it does not make sense to continue the procedure.",
      "excerpt": "A generic refusal is not the same as a well-reasoned legal response. It is important to check that the reason matches the flight, route and evidence.",
      "category": "After rejection",
      "readTime": "5 min read",
      "sections": [
        {
          "heading": "The first rejection is often not the whole story",
          "body": [
            "Airlines sometimes send short replies: extraordinary circumstances, operational reasons, technical problem, flight control decision or no right to compensation. Such an answer may be correct, but it is not sufficient in itself.",
            "A good answer should be related to the specific flight: date, route, reason for disruption and measures taken by the airline. If the message is generic, the case is worth reading more carefully.",
            "Rejection is not an invitation to automatically move on at any cost. It is a signal to check whether the reason is real, relevant and concrete enough."
          ]
        },
        {
          "heading": "What reasons require additional verification",
          "body": [
            "You should especially check answers that only mention weather, safety, technical issue, operational reasons or air traffic restrictions without details. Some of these reasons may indeed exclude compensation, but they are often used too broadly.",
            "A technical problem is not automatically an extraordinary circumstance. Bad weather is a serious reason only if it really affected that flight. The delay in the previous flight must have a clear connection to your disorder.",
            "If the airline's response does not match the messages you received at the airport, photos of the flight board or publicly available information, there is reason for further analysis."
          ]
        },
        {
          "heading": "What to send for manual check",
          "body": [
            "To check the rejection, send the original request, the airline's response, flight number, date, route, booking confirmation, boarding pass and any messages you have. If you are redirected, add a new itinerary.",
            "It is also useful to send a short chronology: when the flight was supposed to leave, when it actually left, when you arrived, when you sent the complaint and when the rejection arrived.",
            "If you have hotel, food or transfer receipts, attach them separately. Even where a fixed fee is in dispute, the cost of care may be a separate issue."
          ]
        },
        {
          "heading": "How to distinguish a bad answer from a weak case",
          "body": [
            "A bad answer is short, generic and doesn't explain the facts. A weak case is something else: the route is not covered, the delay in arrival is not sufficient, the passenger is late for the gate, or the evidence is clear that there was an extraordinary circumstance.",
            "So it's not enough to say the airline rejected me. You should read why she refused and compare it with the rules and the evidence. Sometimes it turns out that the refusal is superficial, and sometimes the request is really weak.",
            "A good serve should tell both outcomes. There is no value in pushing a case that has no real basis."
          ]
        },
        {
          "heading": "Possible next steps",
          "body": [
            "If the refusal is not convincing, the next step may be to supplement the request, request a more specific explanation, a regulatory application or a legal assessment. The sequence depends on the route, documentation and local procedure.",
            "If the answer is partially correct, it may make sense to ask for reimbursement of expenses only, rather than a fixed fee. If the answer is completely baseless, the case can proceed more aggressively.",
            "The worst thing is to react impulsively and send an angry message without new facts. It is better to send a short, precise answer that shows what is in dispute."
          ]
        },
        {
          "heading": "When not to insist",
          "body": [
            "If the documents clearly show that the cause was an airport closure, severe weather, a security decision, or another circumstance beyond the airline's control, insisting may be a waste of time.",
            "The same applies if the arrival delay was below the threshold or if the route does not enter the relevant frame. An honest assessment is better than a false hope.",
            "However, even then the fixed fee should be separated from other rights. There may not be a right to €250, €400 or €600, but there may still be a ticket refund, a refund of reasonable expenses or a right to a better written answer.",
            "That's why you don't give up just because the word rejected arrived. It is given up when it is seen that the facts, the route and the evidence really do not support a further request."
          ]
        },
        {
          "heading": "Partial payment does not always solve everything",
          "body": [
            "Some passengers get a refund, a voucher or part of their fare, and the airline presents it as a settlement of the case. This does not automatically mean that the issue of fixed damages is closed.",
            "If the airline has paid for the hotel, it may mean that they have recognized the right to care, but it does not necessarily say anything about the compensation of 250, 400 or 600 euros. If she returned the ticket, that again doesn't necessarily solve the disruption issue.",
            "That's why in the case of rejection, you should check what exactly was rejected and what was eventually recognized. A partial answer often leaves room for a more precise continuation."
          ]
        }
      ]
    }
  } satisfies BlogArticle;
