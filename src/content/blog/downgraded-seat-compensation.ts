import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const image = {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=82",
    alt: "Passenger aircraft cabin and seats",
    position: "center",
  } satisfies BlogArticleImage;

export const article = {
    id: "downgraded-seat-compensation",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    sr: {
      slug: "downgrade-sedista-biznis-ekonomska-klasa",
      title: "Downgrade sedišta: šta ako vas prebace u nižu klasu",
      description: "Šta putnik može da traži kada plati biznis ili premium klasu, a aviokompanija ga smesti u nižu kabinu.",
      excerpt: "Downgrade nije isto što i loše sedište. Ako ste platili višu klasu, a leteli nižom, proverava se povraćaj dela cene za taj segment.",
      category: "Downgrade",
      readTime: "7 min čitanja",
      sections: [
        {
          heading: "Downgrade znači nižu putnu klasu, ne samo lošije mesto",
          body: [
            "Prvo treba razlikovati stvarni downgrade od neprijatnog sedišta. Ako ste platili biznis klasu, premium ekonomsku ili prvu klasu, a aviokompanija vas prebaci u ekonomsku ili nižu kabinu, to je ozbiljna promena usluge. Ako ste samo izgubili mesto pored prozora ili sedište sa više prostora u istoj klasi, to je druga vrsta reklamacije.",
            "Kod evropskih pravila downgrade obično vodi ka povraćaju dela cene karte za pogođeni segment. To nije ista stvar kao fiksna naknada za kašnjenje od 250, 400 ili 600 evra. Ovde se gleda vrednost usluge koju ste platili i klasa kojom ste stvarno putovali.",
            "Za putnike iz Srbije ovo je bitno na konekcijama preko velikih evropskih aerodroma, gde se dešavaju promene aviona, overbooking premium kabine ili zamene letelica. Ako je samo jedan segment pogođen, zahtev se obično vezuje za taj segment, ne za celo putovanje."
          ]
        },
        {
          heading: "Koliki povraćaj može biti relevantan",
          body: [
            "U tipičnom evropskom okviru povraćaj za downgrade zavisi od dužine leta i može biti procenat cene segmenta. Najčešće se pominju nivoi od 30, 50 ili 75 procenata, u zavisnosti od distance i vrste rute. To nije popust po dobroj volji, već posebna logika za uslugu koja nije isporučena u kupljenoj klasi.",
            "Najveći problem je što karta često nema jasno razdvojenu cenu po segmentima, posebno ako je kupljena kao povratna ili multi-city rezervacija. Zato treba sačuvati fakturu, potvrdu kupovine, fare breakdown ako postoji i boarding pass koji pokazuje klasu kojom ste stvarno leteli.",
            "Ako ste platili upgrade gotovinom, miljama ili bodovima, sačuvajte i tu potvrdu. Povraćaj može zavisiti od načina plaćanja, ali osnovna ideja ostaje ista: ne treba platiti višu kabinu, a dobiti nižu bez odgovarajuće korekcije."
          ]
        },
        {
          heading: "Vaučeri i milje nisu uvek dovoljno rešenje",
          body: [
            "Aviokompanije često nude milje, vaučer za budući let ili mali iznos kao gest dobre volje. To može biti prihvatljivo ako vam odgovara, ali ne morate automatski prihvatiti vaučer umesto novčanog povraćaja kada je pravilo na vašoj strani.",
            "Pre prihvatanja proverite uslove: rok važenja, da li vaučer važi samo za jednu kompaniju, da li se može preneti i da li prihvatanjem zatvarate dalji zahtev. Ako niste sigurni, tražite da vam ponuda bude poslata pisano i da se jasno navede šta pokriva.",
            "Ako prihvatite milje jer želite brzo rešenje, sačuvajte dokaz o ponudi i prihvatanju. Ako ne prihvatate, odgovorite mirno i tražite obračun povraćaja za downgrade u novcu ili na originalni način plaćanja."
          ]
        },
        {
          heading: "Šta ako je downgrade nastao zbog zamene aviona",
          body: [
            "Zamena aviona je čest razlog za downgrade. Kompanija može tvrditi da nova letelica nema dovoljno premium sedišta ili da je raspored kabine promenjen. To objašnjava zašto se problem desio, ali ne znači automatski da putnik nema pravo na povraćaj dela cene.",
            "Ako vam je ponuđeno da putujete nižom klasom istog dana ili da čekate kasniji let u kupljenoj klasi, zapišite šta ste izabrali i zašto. Putnik koji mora da stigne na sastanak možda razumno prihvata nižu klasu, ali i dalje traži korekciju cene.",
            "Ne mešajte downgrade sa uskraćenim ukrcavanjem. Ako vas uopšte ne puste na let zbog overbookinga, to je druga tema. Ako vas puste, ali u nižu kabinu, fokus je na razlici između kupljene i isporučene usluge."
          ]
        },
        {
          heading: "Dokazi za dobar zahtev",
          body: [
            "Sačuvajte potvrdu rezervacije sa klasom putovanja, račun ili fakturu, boarding pass, fotografiju sedišta ako je korisna, poruku aviokompanije i svaku ponudu kompenzacije. Ako boarding pass prikazuje novu klasu, to je često najbrži dokaz da ste leteli drugačije nego što ste platili.",
            "Ako je downgrade saopšten na gejtu, zapišite vreme, ime aerodroma i objašnjenje. Ako ste potpisali formular, tražite kopiju. Ako ste dobili vaučer, fotografišite ga pre nego što ga iskoristite ili izgubite.",
            "Kod porodičnih ili poslovnih rezervacija proverite da li je downgrade pogodio sve putnike ili samo neke. Zahtev se može razlikovati po putniku, naročito ako su karte plaćene različitim tarifama ili je samo jedan putnik imao upgrade."
          ]
        },
        {
          heading: "Kako postaviti zahtev",
          body: [
            "Zahtev treba da bude precizan: kupio sam klasu, na segmentu sam leteo nižom klasom, tražim obračun i povraćaj propisanog dela cene. Dodajte broj leta, datum, rutu i kopije dokaza. Ne morate opisivati svaki detalj neprijatnosti ako je osnov jasan.",
            "Ako aviokompanija odgovori vaučerom, tražite da potvrdi da li je to dodatna ponuda ili zamena za zakonski relevantan povraćaj. Ako odgovor ne sadrži obračun, tražite obračun po segmentu i osnov po kome je iznos određen.",
            "Downgrade zahtevi su često manje poznati od kašnjenja i otkazivanja, pa ih putnici ne podnose. Upravo zato vredi biti uredan: dokumenti, kupljena klasa, stvarna klasa i jasan zahtev za povraćaj."
          ]
        }
      ],
    },
    en: {
      slug: "downgraded-seat-business-to-economy-compensation",
      title: "Seat downgrade: what if you are moved to a lower class",
      description: "What passengers can request when they paid for business or premium class but the airline seated them in a lower cabin.",
      excerpt: "A downgrade is not the same as a bad seat. If you paid for a higher cabin and flew lower, reimbursement for that segment should be checked.",
      category: "Downgrade",
      readTime: "7 min read",
      sections: [
        {
          heading: "Downgrade means a lower travel class, not just a worse seat",
          body: [
            "First, distinguish a real downgrade from an unpleasant seat. If you paid for business class, premium economy or first class and the airline moved you to economy or another lower cabin, that is a serious change in service. If you only lost a window seat or extra-legroom seat within the same class, that is a different complaint.",
            "Under European rules, downgrade usually leads to reimbursement of part of the ticket price for the affected segment. This is not the same as fixed delay compensation of 250, 400 or 600 euros. The question is the value of the service you paid for and the class in which you actually travelled.",
            "For travelers from Serbia this matters on connections through large European airports, where aircraft swaps, premium-cabin overbooking or equipment changes happen. If only one segment is affected, the claim usually relates to that segment, not the whole journey."
          ]
        },
        {
          heading: "How much reimbursement may be relevant",
          body: [
            "In the typical European framework, downgrade reimbursement depends on flight distance and may be a percentage of the segment price. Levels of 30, 50 or 75 percent are commonly used depending on distance and route type. This is not a goodwill discount; it is a specific logic for a service not delivered in the purchased class.",
            "The hardest issue is that tickets often do not show a clear price per segment, especially for return or multi-city bookings. Keep the invoice, purchase confirmation, fare breakdown if available and boarding pass showing the class actually flown.",
            "If you paid for an upgrade with cash, miles or points, keep that confirmation too. Reimbursement may depend on the payment method, but the basic idea remains the same: you should not pay for a higher cabin and receive a lower one without an appropriate correction."
          ]
        },
        {
          heading: "Vouchers and miles are not always enough",
          body: [
            "Airlines often offer miles, a future-flight voucher or a small goodwill amount. That may be acceptable if it suits you, but you do not have to automatically accept a voucher instead of monetary reimbursement when the rule supports your position.",
            "Before accepting, check the conditions: expiry date, whether the voucher is limited to one airline, whether it can be transferred and whether acceptance closes any further claim. If unsure, ask for the offer in writing and for a clear explanation of what it covers.",
            "If you accept miles because you want a quick solution, keep proof of the offer and acceptance. If you do not accept, reply calmly and request downgrade reimbursement in money or to the original payment method."
          ]
        },
        {
          heading: "What if the downgrade was caused by an aircraft change",
          body: [
            "Aircraft change is a common downgrade reason. The airline may say the replacement aircraft did not have enough premium seats or had a different cabin layout. That explains why the problem happened, but it does not automatically mean the passenger has no right to partial reimbursement.",
            "If you were offered travel in a lower class the same day or a later flight in the purchased class, write down what you chose and why. A passenger who must reach a meeting may reasonably accept the lower class while still requesting a price correction.",
            "Do not confuse downgrade with denied boarding. If you are not allowed to board at all because of overbooking, that is a different issue. If you are accepted on the flight but seated in a lower cabin, the focus is the difference between purchased and delivered service."
          ]
        },
        {
          heading: "Evidence for a good claim",
          body: [
            "Keep the booking confirmation showing travel class, receipt or invoice, boarding pass, a photo of the seat if useful, airline message and any compensation offer. If the boarding pass shows the new class, it is often the quickest proof that you flew differently from what you paid for.",
            "If the downgrade was announced at the gate, write down the time, airport and explanation. If you signed a form, ask for a copy. If you received a voucher, photograph it before using or losing it.",
            "For family or business bookings, check whether all passengers were downgraded or only some. The claim may differ by passenger, especially if tickets were bought under different fares or only one passenger had an upgrade."
          ]
        },
        {
          heading: "How to frame the request",
          body: [
            "The request should be precise: I bought this class, I flew this segment in a lower class, and I request calculation and reimbursement of the relevant part of the price. Add flight number, date, route and copies of evidence. You do not need to describe every unpleasant detail if the basis is clear.",
            "If the airline replies with a voucher, ask it to confirm whether that is an additional offer or a replacement for legally relevant reimbursement. If the reply contains no calculation, ask for the segment calculation and the basis for the amount.",
            "Downgrade claims are less familiar than delay and cancellation claims, so passengers often do not submit them. That is exactly why it is worth being orderly: documents, purchased class, actual class and a clear request for reimbursement."
          ]
        }
      ],
    },
  } satisfies BlogArticle;
