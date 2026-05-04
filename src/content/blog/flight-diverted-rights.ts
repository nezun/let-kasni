import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const image = {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1400&q=82",
    alt: "Aircraft wing above clouds after a route change",
    position: "center",
  } satisfies BlogArticleImage;

export const article = {
    id: "flight-diverted-rights",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    sr: {
      slug: "preusmeren-let-drugi-aerodrom-prava-putnika",
      title: "Šta ako avion sleti na drugi aerodrom",
      description: "Praktičan vodič za putnike iz Srbije kada je let preusmeren na drugi aerodrom: kada postoji pravo na prevoz, brigu, troškove i moguću naknadu.",
      excerpt: "Diverzija nije samo neprijatnost. Važno je gde ste stvarno stigli, koliko kasno ste došli do planiranog odredišta i zašto je avion promenio aerodrom.",
      category: "Preusmeren let",
      readTime: "7 min čitanja",
      sections: [
        {
          heading: "Diverzija se proverava kroz krajnju destinaciju",
          body: [
            "Kada avion ne sleti na aerodrom koji je naveden u karti, već bude preusmeren na drugi grad ili drugi aerodrom u istoj regiji, prvo pitanje nije samo da li je let tehnički završen. Za putnika je važno kada je stvarno stigao do odredišta koje je kupio. Ako ste kupili let do Beča, a završili u Bratislavi pa autobusom stigli do Beča mnogo kasnije, računa se cela posledica po putovanje.",
            "Ovo je posebno važno za putnike iz Srbije, jer rute često uključuju konekcije preko EU aerodroma. Ako je preusmerenje dovelo do propuštene veze, noćenja, novog leta ili dolaska tri sata kasnije na krajnju destinaciju iz iste rezervacije, slučaj treba proveriti kao celinu. Nije dovoljno da aviokompanija kaže da je avion bezbedno sleteo negde drugde.",
            "U praksi se često naglašava samo prag od tri sata ili pitanje vanrednih okolnosti. Praktičniji pristup je da odmah napravite vremensku liniju: planirani dolazak, stvarno sletanje na alternativni aerodrom, ponuđeni transfer, polazak transfera i stvarni dolazak do mesta na karti."
          ]
        },
        {
          heading: "Prevoz do planiranog aerodroma je ključan",
          body: [
            "Ako aviokompanija preusmeri let na obližnji aerodrom, obično mora da organizuje razuman prevoz do prvobitnog aerodroma ili do dogovorene bliske destinacije. To može biti autobus, voz, drugi let ili kombinacija prevoza. Putnik ne bi trebalo da ostane sam da rešava problem ako je promena nastala u toku izvršenja leta.",
            "U praksi se dešava da kompanija ponudi nejasnu informaciju, vaučer male vrednosti ili samo usmeno kaže putnicima da se snađu. Tada čuvajte sve dokaze: fotografiju table, poruke u aplikaciji, račun za voz, autobus, taksi ili hotel. Ako ste sami platili prevoz jer nije bilo organizovane pomoći, taj trošak treba tražiti odvojeno od fiksne naknade.",
            "Razlikujte dve stvari: pravo da budete dovedeni do destinacije i pravo na naknadu zbog kašnjenja ili otkazivanja. Trošak transfera može postojati i kada fiksna naknada nije sigurna, na primer kada je preusmerenje izazvalo jako nevreme."
          ]
        },
        {
          heading: "Razlog preusmerenja menja snagu zahteva",
          body: [
            "Ako je avion preusmeren zbog zatvaranja piste, ozbiljnog vremena, hitne medicinske situacije ili bezbednosne odluke, aviokompanija će se verovatno pozvati na okolnosti koje ne kontroliše. Tada fiksna naknada može biti sporna, ali pravo na brigu i razuman nastavak putovanja ne treba automatski otpisati.",
            "Ako je razlog bio planiranje posade, tehnički problem koji je nastao u operaciji, loša organizacija rotacije ili kašnjenje prethodnog leta bez jasnog spoljnog uzroka, zahtev može biti jači. Naročito treba proveriti da li je prevoznik mogao da umanji posledice, ali nije ponudio realnu alternativu.",
            "Ne prihvatajte generičnu formulaciju kao konačan odgovor. Rečenice kao što su operational reasons, airport restrictions ili safety reasons mogu značiti više stvari. Za ozbiljnu proveru treba znati konkretan događaj, vreme kada se desio i kako je uticao baš na vaš let."
          ]
        },
        {
          heading: "Šta sa hotelom, hranom i dodatnim troškovima",
          body: [
            "Kod preusmerenja se troškovi brzo gomilaju: kasni transfer, zatvoren javni prevoz, propuštena konekcija, noćenje, novi parking dan ili dodatni obrok. Ako čekanje traje duže, aviokompanija često ima obavezu da pruži osnovnu brigu, ali u realnosti putnici često prvo plate sami.",
            "Sačuvajte fiskalne račune, potvrde kartičnog plaćanja i objašnjenje zašto je trošak bio razuman. Taksi od 200 evra možda je sporan ako je postojao besplatan autobus za 30 minuta, ali može biti opravdan ako je bio jedini način da stignete na poslednju vezu ili do smeštaja posle ponoći.",
            "U zahtevu jasno odvojite fiksnu naknadu od refundacije troškova. Jedna rečenica treba da objašnjava kašnjenje na krajnjoj destinaciji, a druga da navede troškove koje tražite nazad. Mešanje svega u jedan iznos često otežava obradu."
          ]
        },
        {
          heading: "Dokazi koje treba prikupiti odmah",
          body: [
            "Najvažniji dokazi su originalna rezervacija, boarding pass, broj leta, poruka o preusmerenju, stvarno vreme sletanja i dokaz kada ste stigli do prvobitne destinacije. Ako ste autobusom prebačeni sa alternativnog aerodroma, fotografišite obaveštenje, vozilo, kartu ili poruku osoblja.",
            "Ako ste zbog preusmerenja propustili konekciju, čuvajte i dokumente za sledeći segment. Kod jedne rezervacije posledica može da se meri do krajnje destinacije, a ne do aerodroma na kome je prvi avion završio. To je čest detalj koji putnici previde.",
            "Dobro je zapisati šta je osoblje reklo, ali usmeni odgovor nije dovoljan. Zatražite email, SMS, push notifikaciju ili potvrdu u aplikaciji kad god je moguće. Kasnije je mnogo lakše dokazati slučaj kada postoji pisani trag."
          ]
        },
        {
          heading: "Kako proceniti da li vredi podneti zahtev",
          body: [
            "Slučaj vredi proveriti ako ste na krajnju destinaciju stigli tri sata ili više kasnije, ako je preusmerenje napravilo dodatne troškove, ako nije bilo organizovanog transfera ili ako je objašnjenje aviokompanije nejasno. Čak i kada fiksna naknada nije sigurna, povraćaj razumnih troškova može biti realan.",
            "Za putnike iz Srbije posebno proverite da li ruta polazi iz EU, dolazi u EU evropskim prevoznikom, ili je deo šire evropske mreže zaštite putnika. Državljanstvo obično nije presudno; presudni su aerodromi, prevoznik i struktura rezervacije.",
            "Najbolji zahtev je kratak: šta je kupljeno, gde je avion sleteo, kada ste stigli do planirane destinacije, šta je ponuđeno i šta tražite. Ako imate te podatke, preusmeren let se može proveriti mnogo preciznije od opšte žalbe da je putovanje bilo haotično."
          ]
        }
      ],
    },
    en: {
      slug: "flight-diverted-different-airport-passenger-rights",
      title: "What if your flight lands at a different airport",
      description: "A practical guide for travelers from Serbia when a flight is diverted to another airport: transport, care, expenses and possible compensation.",
      excerpt: "A diversion is not just an inconvenience. The key is when you reached the destination you booked and why the aircraft changed airport.",
      category: "Diverted flight",
      readTime: "7 min read",
      sections: [
        {
          heading: "A diversion is checked through the final destination",
          body: [
            "When an aircraft does not land at the airport shown on your ticket and is diverted to another city or another airport in the same region, the first question is not simply whether the flight technically ended. For the passenger, the practical question is when they actually reached the destination they bought. If you booked Vienna, landed in Bratislava and reached Vienna by bus much later, the whole travel consequence matters.",
            "This is especially important for travelers from Serbia because many routes include connections through EU airports. If the diversion caused a missed connection, an overnight stay, a replacement flight or arrival at the final destination three hours or more late under the same booking, the case should be checked as one timeline. It is not enough for the airline to say that the aircraft landed safely somewhere else.",
            "Many passenger-rights guides focus only on the three-hour threshold or extraordinary circumstances. The more useful approach is to record the full timeline immediately: scheduled arrival, actual landing at the alternate airport, transport offered, transport departure and actual arrival at the airport or city on your booking."
          ]
        },
        {
          heading: "Transport to the planned airport matters",
          body: [
            "If the airline diverts the flight to a nearby airport, it should usually arrange reasonable transport to the original airport or to another nearby destination agreed with passengers. That may be a bus, train, replacement flight or a combination. Passengers should not simply be left to solve the problem alone once the airline has changed where the flight ends.",
            "In practice, airlines sometimes provide vague information, a low-value voucher or only a verbal instruction to manage independently. Keep every piece of evidence: photos of airport notices, app messages, train or bus receipts, taxi invoices and hotel bills. If you paid because no organized help was available, claim those expenses separately from fixed compensation.",
            "Separate two issues: the right to be brought to the destination and the right to compensation for delay or cancellation. Transport expenses may still matter even when fixed compensation is uncertain, for example if the diversion was caused by severe weather."
          ]
        },
        {
          heading: "The reason for the diversion changes the claim",
          body: [
            "If the aircraft was diverted because of runway closure, severe weather, a medical emergency or a safety decision, the airline will probably rely on circumstances outside its control. Fixed compensation may then be disputed, but care and a reasonable continuation of the journey should not be dismissed automatically.",
            "If the reason was crew planning, an operational technical issue, poor aircraft rotation management or a previous delay without a clear external cause, the claim may be stronger. It is also worth checking whether the carrier could have reduced the damage but failed to offer a realistic alternative.",
            "Do not treat generic wording as the final answer. Phrases such as operational reasons, airport restrictions or safety reasons can mean different things. For a serious review you need the specific event, when it happened and how it affected your flight."
          ]
        },
        {
          heading: "Hotels, meals and extra costs",
          body: [
            "Diversions can create costs quickly: a delayed transfer, no public transport, a missed connection, an overnight stay, an extra parking day or additional meals. During longer waits the airline often has a duty to provide basic care, but in real life passengers frequently pay first and claim later.",
            "Keep receipts, card payment confirmations and a short explanation of why the cost was reasonable. A 200 euro taxi may be disputed if a free bus was available 30 minutes later, but it may be justified if it was the only way to catch the last connection or reach accommodation after midnight.",
            "In the claim, separate fixed compensation from reimbursement of expenses. One sentence should explain the delay at the final destination, while another should list the expenses you want refunded. Mixing everything into one amount often makes the claim harder to process."
          ]
        },
        {
          heading: "Evidence to collect immediately",
          body: [
            "The most useful evidence is the original booking, boarding pass, flight number, diversion notice, actual landing time and proof of when you reached the planned destination. If passengers were transferred by bus from the alternate airport, photograph the notice, vehicle, ticket or staff message.",
            "If the diversion caused you to miss a connection, keep documents for the next segment as well. Under one booking, the consequence may be measured to the final destination, not only to the airport where the first aircraft stopped. This is a common detail passengers miss.",
            "It is helpful to write down what staff said, but a verbal answer is not enough. Ask for an email, SMS, push notification or app message whenever possible. A written trace makes the case much easier to review later."
          ]
        },
        {
          heading: "When it is worth submitting a claim",
          body: [
            "The case is worth checking if you reached the final destination three hours or more late, if the diversion created extra costs, if there was no organized transfer or if the airline's explanation is vague. Even when fixed compensation is uncertain, reimbursement of reasonable expenses may still be realistic.",
            "For travelers from Serbia, check whether the route departed from the EU, arrived in the EU on a European carrier, or falls within a related European passenger-rights framework. Nationality is usually not decisive; airports, carrier and booking structure matter more.",
            "The best claim is short: what you bought, where the aircraft landed, when you reached the planned destination, what was offered and what you are requesting. With those facts, a diverted flight can be reviewed much more accurately than a general complaint that the journey was chaotic."
          ]
        }
      ],
    },
  } satisfies BlogArticle;
