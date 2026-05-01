import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const image = {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=82",
    alt: "Traveler checking flight time on a phone",
    position: "center",
  } satisfies BlogArticleImage;

export const article = {
    id: "flight-moved-earlier-rights",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    sr: {
      slug: "let-pomeren-ranije-prava-putnika",
      title: "Šta ako je let pomeren ranije",
      description: "Kada promena vremena polaska unapred može da se tretira kao ozbiljan poremećaj i šta putnik treba da proveri pre prihvatanja novog rasporeda.",
      excerpt: "Let ne mora samo da kasni da bi napravio problem. Ako je polazak pomeren ranije, možete izgubiti mogućnost da uopšte stignete na aerodrom.",
      category: "Promena reda letenja",
      readTime: "7 min čitanja",
      sections: [
        {
          heading: "Raniji polazak može biti jednako ozbiljan kao kašnjenje",
          body: [
            "Putnici obično razmišljaju o kašnjenju, ali let koji je pomeren ranije može napraviti još veći problem. Ako vam aviokompanija pomeri polazak za nekoliko sati unapred, možda ne možete da stignete na aerodrom, propuštate prethodni voz ili autobus, morate da uzmete hotel ili gubite konekciju koja je ranije bila realna.",
            "Kod evropskih pravila važno je koliko je promena značajna i kada ste obavešteni. U praksi se ozbiljno posmatra situacija kada je polazak pomeren znatno ranije, naročito ako putnik više nema realnu mogućnost da koristi let pod uslovima koje je kupio.",
            "Za putnike iz Srbije ovo je često kod sezonskih, čarter i konektovanih letova. Promena sa 14:00 na 06:00 nije samo mala korekcija reda letenja; za nekoga ko dolazi iz drugog grada to može značiti dodatno noćenje i potpuno drugačiju organizaciju puta."
          ]
        },
        {
          heading: "Ne prihvatajte automatski novu satnicu",
          body: [
            "Kada dobijete email o promeni vremena, prvo proverite koliko je polazak pomeren, kada je obaveštenje stiglo i da li vam nova satnica realno odgovara. Klik na dugme accept može kasnije otežati argument da vam je promena bila neprihvatljiva, iako ne mora uvek potpuno zatvoriti slučaj.",
            "Ako nova satnica ne odgovara, odmah zatražite alternativu ili povraćaj novca, u zavisnosti od toga šta vam je važnije. Ako morate da putujete, tražite preusmeravanje koje vas dovodi do destinacije pod razumnim uslovima. Ako više ne želite putovanje, jasno tražite refundaciju.",
            "Sačuvajte originalni itinerary i poruku sa novim vremenom. Bez originalnog rasporeda teško je dokazati koliko je promena bila velika. Screenshot iz aplikacije može biti koristan ako se kasnije podaci u rezervaciji prepišu novim vremenom."
          ]
        },
        {
          heading: "Kada može postojati pravo na naknadu",
          body: [
            "Ako je promena ranijeg polaska praktično izjednačena sa otkazivanjem prvobitnog leta, može se otvoriti pitanje fiksne naknade, posebno kada ste obavešteni kasno i alternativa nije razumna. Nije svaka promena reda letenja osnov za naknadu, ali velike promene ne treba tretirati kao nebitne.",
            "Proverava se koliko ranije let polazi, kada ste obavešteni, kada stižete na destinaciju i da li vam je ponuđeno prihvatljivo rešenje. Ako je polazak pomeren ranije, ali dolazak ostaje približno isti i obavešteni ste mnogo unapred, slučaj može biti slabiji.",
            "Ako zbog ranijeg polaska morate da kupite novi let, uzmete hotel ili izgubite konekciju, dokumentujte posledice. Čak i ako fiksna naknada nije jasna, troškovi nastali zbog promene mogu biti važan deo zahteva."
          ]
        },
        {
          heading: "Konekcije i dolazak na aerodrom",
          body: [
            "Raniji polazak posebno pogađa putnike koji nisu iz grada polaska. Ako krećete iz Niša, Novog Sada, Kragujevca ili Banjaluke ka Beogradu, promena jutarnjeg leta može značiti da više nema javnog prevoza koji vas dovodi na vreme. To je praktična posledica koju treba objasniti.",
            "Kod konekcija je važno da li su svi segmenti u jednoj rezervaciji. Ako je aviokompanija pomerila prvi segment ranije i time poremetila ostatak puta, proverava se cela rezervacija. Ako ste sami kombinovali odvojene karte, zaštita može biti slabija, ali i dalje vredi proveriti refundaciju ili promenu karte.",
            "Ne zaboravite troškove koji nisu očigledni: dodatni hotel pre polaska, noćni taksi, parking, izgubljena neiskorišćena karta za voz ili autobus. Sa računima i jasnim objašnjenjem ti troškovi imaju mnogo veću težinu."
          ]
        },
        {
          heading: "Kako odgovoriti aviokompaniji",
          body: [
            "Odgovor treba da bude brz i precizan. Napišite da nova satnica ne odgovara, navedite zašto i zatražite konkretno rešenje: preusmeravanje, drugi let, refundaciju ili nadoknadu razumnih troškova. Izbegavajte duga objašnjenja o celom putovanju ako ključne činjenice mogu stati u nekoliko rečenica.",
            "Ako aviokompanija tvrdi da je promena samo schedule change, tražite da objasni koja prava imate zbog obima promene i vremena obaveštenja. Nije svaka schedule change ista. Promena od 20 minuta i promena od šest sati unapred ne proizvode isti praktičan efekat.",
            "Ako ste već prihvatili novu satnicu jer ste morali da putujete, i dalje sačuvajte dokaze. Prihvatanje može uticati na zahtev, ali ne briše automatski troškove koje ste morali razumno da napravite da biste stigli na pomereni let."
          ]
        },
        {
          heading: "Checklist pre nego što odlučite",
          body: [
            "Pre odluke zapišite četiri stvari: originalno vreme polaska, novo vreme polaska, datum obaveštenja i realne posledice. Zatim proverite da li vam kompanija nudi izbor ili samo nameće novu kartu. To je osnova za svaki dalji zahtev.",
            "Ako je promena mala, najpraktičnije je često samo prilagoditi plan. Ako je promena velika, nemojte je tretirati kao običnu poruku iz aplikacije. Veliki pomeraj može značiti da prvobitni prevoz više nije isporučen onako kako je kupljen.",
            "Za letove iz Srbije ili ka Srbiji, proverite i koji prevoznik operiše let i odakle ruta polazi. Evropski okvir se najčešće gleda kroz aerodrome, prevoznika i rezervaciju, ne kroz državljanstvo putnika."
          ]
        }
      ],
    },
    en: {
      slug: "flight-moved-earlier-passenger-rights",
      title: "What if your flight is moved earlier",
      description: "When an earlier departure can become a serious disruption and what passengers should check before accepting the new schedule.",
      excerpt: "A flight does not only cause problems when it is delayed. If departure is moved earlier, you may no longer be able to reach the airport.",
      category: "Schedule change",
      readTime: "7 min read",
      sections: [
        {
          heading: "An earlier departure can be as serious as a delay",
          body: [
            "Passengers usually think about delays, but a flight moved earlier can create an even bigger problem. If the airline moves departure several hours forward, you may no longer be able to reach the airport, you may miss the train or bus before the flight, need a hotel or lose a connection that was previously realistic.",
            "Under European passenger-rights logic, the size of the change and the timing of the notice matter. A substantial earlier departure is treated seriously, especially when the passenger no longer has a realistic ability to use the flight under the conditions originally bought.",
            "For travelers from Serbia this often appears on seasonal, charter and connecting routes. A change from 14:00 to 06:00 is not just a small timetable correction; for someone traveling from another city it may require an extra overnight stay and a completely different travel plan."
          ]
        },
        {
          heading: "Do not automatically accept the new schedule",
          body: [
            "When you receive an email about a time change, first check how much earlier the departure is, when the notice arrived and whether the new time realistically works for you. Clicking accept can later make it harder to argue that the change was unacceptable, although it does not always fully close the case.",
            "If the new schedule does not work, immediately request an alternative or refund depending on what matters more. If you still need to travel, ask for rerouting that gets you to the destination under reasonable conditions. If the trip no longer makes sense, clearly request reimbursement.",
            "Keep the original itinerary and the message showing the new time. Without the original schedule it is hard to prove the size of the change. A screenshot from the airline app can help if the booking is later overwritten with the new time."
          ]
        },
        {
          heading: "When compensation may be possible",
          body: [
            "If the earlier departure is practically comparable to cancellation of the original flight, fixed compensation may become relevant, especially when you were informed late and the alternative was not reasonable. Not every schedule change creates compensation, but major changes should not be treated as trivial.",
            "The assessment looks at how much earlier the flight departs, when you were notified, when you arrive and whether a reasonable solution was offered. If the departure is moved earlier but arrival remains close to the original plan and notice was given far in advance, the case may be weaker.",
            "If the earlier departure forces you to buy a new flight, take a hotel or lose a connection, document those consequences. Even when fixed compensation is unclear, costs caused by the change may be an important part of the claim."
          ]
        },
        {
          heading: "Connections and reaching the airport",
          body: [
            "Earlier departure particularly affects passengers who do not live in the departure city. If you are traveling from Nis, Novi Sad, Kragujevac or Banja Luka to Belgrade, a morning flight change may mean that public transport can no longer get you there on time. That practical consequence should be explained.",
            "For connections, check whether all segments are under one booking. If the airline moved the first segment earlier and disrupted the rest of the journey, the whole booking should be reviewed. If you combined separate tickets yourself, protection may be weaker, but refund or change options can still matter.",
            "Do not forget less obvious costs: an extra hotel before departure, night taxi, parking, or an unused train or bus ticket. With receipts and a clear explanation, those costs carry much more weight."
          ]
        },
        {
          heading: "How to reply to the airline",
          body: [
            "Reply quickly and precisely. Say that the new schedule does not work, explain why and request a concrete solution: rerouting, another flight, refund or reimbursement of reasonable costs. Avoid a long story about the whole trip if the key facts fit into a few sentences.",
            "If the airline says it is only a schedule change, ask it to explain your rights given the size of the change and the timing of the notice. Not every schedule change is the same. A 20-minute change and a six-hour earlier departure do not have the same practical effect.",
            "If you already accepted the new time because you had to travel, keep the evidence anyway. Acceptance may affect the claim, but it does not automatically erase reasonable costs you had to incur to catch the moved flight."
          ]
        },
        {
          heading: "Checklist before deciding",
          body: [
            "Before deciding, write down four things: the original departure time, the new departure time, the notice date and the practical consequences. Then check whether the airline offers a choice or simply imposes the new ticket. That is the basis for any further request.",
            "If the change is small, adapting your plan may be the most practical answer. If the change is major, do not treat it as a routine app notification. A large move may mean that the original transport was no longer delivered as purchased.",
            "For flights from or to Serbia, also check which carrier operates the flight and where the route starts. The European framework is usually assessed through airports, carrier and booking structure, not through passenger nationality."
          ]
        }
      ],
    },
  } satisfies BlogArticle;
