import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const image = {
    src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=1400&q=82",
    alt: "Airport departure board with delayed flights",
    position: "center",
  } satisfies BlogArticleImage;

export const article = {
    id: "airline-strike-compensation",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    sr: {
      slug: "strajk-aviokompanije-pravo-na-odstetu",
      title: "Štrajk i odšteta za let: kada aviokompanija ipak odgovara",
      description: "Kako razlikovati štrajk osoblja aviokompanije od aerodromskog ili kontrolorskog štrajka i šta putnici iz Srbije treba da sačuvaju.",
      excerpt: "Nije svaki štrajk isti. Za zahtev je presudno ko štrajkuje, da li aviokompanija kontroliše uzrok i kako je reagovala posle poremećaja.",
      category: "Štrajk",
      readTime: "7 min čitanja",
      sections: [
        {
          heading: "Najvažnije pitanje je ko štrajkuje",
          body: [
            "Kada se let otkaže ili kasni zbog štrajka, putnici često čuju samo jednu reč i zaključe da nema prava na naknadu. To je previše grubo. U evropskoj praksi nije isto ako štrajkuje osoblje aviokompanije, aerodromsko osoblje, kontrola leta, obezbeđenje ili zaposleni drugog dobavljača.",
            "Ako štrajkuju piloti, kabinsko osoblje ili drugi zaposleni prevoznika, slučaj može biti jači nego što aviokompanija želi da prikaže. Razlog je jednostavan: organizacija rada i odnos sa sopstvenim zaposlenima često su bliži zoni kontrole aviokompanije nego štrajk na aerodromu ili odluka državnog tela.",
            "Ako štrajkuje kontrola leta ili aerodromska služba koja utiče na sve prevoznike, aviokompanija ima bolji argument da se radi o okolnosti van njene kontrole. I tada, međutim, treba proveriti šta vam je ponuđeno i da li su umanjene posledice."
          ]
        },
        {
          heading: "Fiksna naknada i briga nisu ista stvar",
          body: [
            "Čak i ako je fiksna naknada od 250, 400 ili 600 evra sporna zbog štrajka van kontrole prevoznika, putnik često zadržava pravo na brigu. To znači obroke, osveženje, komunikaciju, hotel i transfer kada čekanje to zahteva. Ta prava se ne brišu samo zato što je u pitanju štrajk.",
            "U praksi je ovo najkorisnije za putnike koji ostanu preko noći u Beču, Frankfurtu, Parizu ili Istanbulu čekajući alternativni let za Srbiju ili iz Srbije. Ako aviokompanija ne organizuje pomoć, a vi platite hotel ili hranu, čuvajte račune i tražite refundaciju posebno.",
            "U zahtevu zato ne treba pisati samo da tražite odštetu zbog štrajka. Navedite i troškove čekanja, šta je aviokompanija ponudila i šta nije. Tako slučaj ostaje koristan čak i ako se kasnije zaključi da fiksna naknada nije sigurna."
          ]
        },
        {
          heading: "Obaveštenje unapred menja situaciju",
          body: [
            "Kod otkazivanja zbog najavljenog štrajka važno je kada ste obavešteni i kakva alternativa je ponuđena. Ako ste obavešteni dovoljno rano i ponuđen je razuman let koji stiže blizu planiranog vremena, pravo na fiksnu naknadu može biti slabije.",
            "Ako ste obavešteni u poslednjem trenutku, ako alternativa stiže znatno kasnije ili ako vas je kompanija ostavila bez jasnog rešenja, slučaj je vredan provere. Putnik ne mora da zna sve pravne detalje; dovoljno je da sačuva email, SMS, novu kartu i realno vreme dolaska.",
            "Posebno proverite da li ste sami prihvatili povraćaj novca umesto preusmeravanja. Povraćaj karte rešava cenu neiskorišćenog leta, ali ne mora automatski da zatvori pitanje dodatnih troškova ili moguće naknade."
          ]
        },
        {
          heading: "Šta aviokompanija mora da pokaže",
          body: [
            "Nije dovoljno da prevoznik napiše samo strike ili extraordinary circumstances. Ozbiljan odgovor treba da objasni koji štrajk je uticao na let, kada je počeo, koje operacije je pogodio i koje mere su preduzete da se putnici preusmere.",
            "Ako je štrajk bio poznat danima unapred, pitanje je zašto nije ranije ponuđen alternativni raspored. Ako su neki putnici prebačeni, a drugi nisu, korisno je znati po kom kriterijumu. Ako je let polazio sa aerodroma koji nije bio direktno pogođen, treba proveriti vezu sa konkretnom rotacijom aviona.",
            "Kada dobijete generičko odbijanje, nemojte odmah slati ljutit odgovor. Zatražite precizno obrazloženje i dokumentujte štetu: kašnjenje, propuštene veze, hotel, hranu i druge razumne troškove."
          ]
        },
        {
          heading: "Dokazi koji najviše pomažu",
          body: [
            "Sačuvajte originalnu rezervaciju, poruku o otkazivanju ili kašnjenju, obaveštenje o štrajku, novu kartu, boarding pass i račune. Ako je štrajk objavljen na sajtu aerodroma ili kompanije, screenshot sa datumom može pomoći da se kasnije utvrdi hronologija.",
            "Ako vam je osoblje reklo da je uzrok štrajk posade, zapišite tačnu formulaciju. Razlika između airline crew strike i airport strike može promeniti celu procenu. Nije isto ni kada štrajkuje osoblje matične aviokompanije i kada problem nastaje kod zemaljskog opsluživača.",
            "Za putovanja sa konekcijama, čuvajte dokumente za sve segmente iz iste rezervacije. Štrajk na prvom letu može izazvati mnogo veće kašnjenje na krajnjoj destinaciji, a upravo taj krajnji efekat često odlučuje da li slučaj ima vrednost."
          ]
        },
        {
          heading: "Kako napisati zahtev bez pravničkog tona",
          body: [
            "Najbolje je pisati konkretno: let, datum, ruta, kada ste obavešteni, kada ste stvarno stigli i šta tražite. Ne morate dokazivati sudsku praksu u prvom emailu. Dovoljno je da zatražite naknadu ako je štrajk bio u kontroli aviokompanije i refundaciju troškova koji su nastali tokom čekanja.",
            "Ako odgovor bude odbijanje, tražite da aviokompanija navede tačan tip štrajka i mere koje je preduzela. To je korisnije od rasprave da li je svaki štrajk automatski vanredna okolnost. Nije automatski, ali nije ni svaki štrajk osnov za naknadu.",
            "Za putnike iz Srbije najveća greška je odustajanje čim čuju reč štrajk. Pravi odgovor je mirna provera: ko je štrajkovao, kako je ruta pokrivena pravilima, koliko ste kasnili na kraju i koje troškove možete dokazati."
          ]
        }
      ],
    },
    en: {
      slug: "airline-strike-flight-compensation",
      title: "Strike and flight compensation: when the airline may still be responsible",
      description: "How to distinguish an airline staff strike from an airport or air traffic control strike, and what travelers from Serbia should keep.",
      excerpt: "Not every strike is the same. The key is who is striking, whether the airline controls the cause and how it handled the disruption.",
      category: "Strike",
      readTime: "7 min read",
      sections: [
        {
          heading: "The key question is who is striking",
          body: [
            "When a flight is cancelled or delayed because of a strike, passengers often hear one word and assume there is no right to compensation. That is too broad. Under European passenger-rights practice, it is not the same if the strike involves airline staff, airport workers, air traffic control, security staff or another supplier.",
            "If pilots, cabin crew or other employees of the operating carrier are striking, the case may be stronger than the airline suggests. The reason is simple: workforce organization and relations with the airline's own staff are often closer to the airline's sphere of control than an airport strike or a state authority decision.",
            "If air traffic control or airport staff are striking in a way that affects all carriers, the airline has a stronger argument that the situation was outside its control. Even then, you should still check what was offered and whether the consequences were reduced."
          ]
        },
        {
          heading: "Fixed compensation and care are separate",
          body: [
            "Even if fixed compensation of 250, 400 or 600 euros is disputed because the strike was outside the carrier's control, passengers often keep the right to care. That means meals, refreshments, communication, hotel accommodation and transfers when the waiting time requires it. These rights do not disappear simply because a strike is involved.",
            "This is often the most useful point for passengers stuck overnight in Vienna, Frankfurt, Paris or Istanbul while waiting for an alternative flight to or from Serbia. If the airline does not arrange assistance and you pay for a hotel or food yourself, keep receipts and request reimbursement separately.",
            "So the claim should not only say that you want compensation because of a strike. List waiting costs, what the airline offered and what it failed to provide. That keeps the case useful even if fixed compensation later turns out to be uncertain."
          ]
        },
        {
          heading: "Advance notice changes the situation",
          body: [
            "For cancellations caused by a planned strike, the timing of the notice and the quality of the alternative flight matter. If you were informed early enough and offered a reasonable replacement arriving close to the scheduled time, the fixed compensation claim may be weaker.",
            "If you were informed at the last minute, if the alternative arrived much later or if the airline left you without a clear solution, the case is worth checking. Passengers do not need to know every legal detail; they need to keep the email, SMS, new ticket and actual arrival time.",
            "Also check whether you accepted a refund instead of rerouting. A ticket refund deals with the price of the unused flight, but it does not automatically close the question of extra expenses or possible compensation."
          ]
        },
        {
          heading: "What the airline should explain",
          body: [
            "It is not enough for the carrier to write only strike or extraordinary circumstances. A serious reply should explain which strike affected the flight, when it started, which operations it affected and what measures were taken to reroute passengers.",
            "If the strike was known days in advance, ask why an alternative schedule was not offered earlier. If some passengers were moved and others were not, it is useful to know the criteria. If the flight departed from an airport not directly affected, the link with the specific aircraft rotation should be checked.",
            "When you receive a generic rejection, do not immediately send an angry response. Ask for a precise explanation and document the loss: delay, missed connections, hotel, food and other reasonable costs."
          ]
        },
        {
          heading: "Evidence that helps most",
          body: [
            "Keep the original booking, cancellation or delay message, strike notice, new ticket, boarding pass and receipts. If the strike was announced on an airport or airline website, a dated screenshot can help establish the timeline later.",
            "If staff told you the cause was a crew strike, write down the exact wording. The difference between an airline crew strike and an airport strike can change the assessment. It also matters whether the strike involved the operating airline's own staff or a ground-handling provider.",
            "For connecting journeys, keep documents for every segment under the same booking. A strike affecting the first flight can create a much larger delay at the final destination, and that final consequence is often what makes the case valuable."
          ]
        },
        {
          heading: "How to write the claim without sounding legalistic",
          body: [
            "Write concretely: flight, date, route, when you were informed, when you actually arrived and what you are requesting. You do not need to argue case law in the first email. It is enough to request compensation if the strike was within the airline's control and reimbursement of costs incurred during the wait.",
            "If the reply is a rejection, ask the airline to specify the exact type of strike and the measures it took. That is more useful than debating whether every strike is automatically an extraordinary circumstance. It is not automatic, but not every strike creates compensation either.",
            "For travelers from Serbia, the biggest mistake is giving up as soon as they hear the word strike. The right response is a calm check: who was striking, whether the route is covered, how late you arrived and which expenses you can prove."
          ]
        }
      ],
    },
  } satisfies BlogArticle;
