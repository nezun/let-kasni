import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const images = {
  "eurowings-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1600&q=82",
    alt: "Passengers waiting near airport windows before a European flight",
    position: "center",
  },
  "croatia-airlines-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft above clouds on a regional European route",
    position: "center",
  },
  "vueling-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1600&q=82",
    alt: "Airport departure board during a delayed European connection",
    position: "center",
  },
  "bulgaria-air-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=82",
    alt: "Aircraft at a gate before a short European flight",
    position: "center",
  },
  "tarom-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=82",
    alt: "Runway lights before a hub connection flight",
    position: "center",
  },
  "norwegian-flight-delay-compensation": {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=82",
    alt: "Traveler waiting in an airport terminal during a long delay",
    position: "center",
  },
} satisfies Record<string, BlogArticleImage>;

type AirlineTopic = {
  id: string;
  srSlug: string;
  enSlug: string;
  srTitle: string;
  enTitle: string;
  srDescription: string;
  enDescription: string;
  srExcerpt: string;
  enExcerpt: string;
  airline: string;
  srRouteNote: string;
  enRouteNote: string;
  srHubNote: string;
  enHubNote: string;
  srCoverageNote: string;
  enCoverageNote: string;
};

const sharedBullets = {
  sr: [
    "Uvek proverite ko je operativni prevoznik, ne samo čiji je kod na karti.",
    "Računa se dolazak na krajnju destinaciju, posebno kada su letovi u jednoj rezervaciji.",
    "Briga tokom čekanja i fiksna naknada od 250, 400 ili 600 evra proveravaju se odvojeno.",
  ],
  en: [
    "Always check the operating carrier, not only the code printed on the ticket.",
    "Final-destination arrival matters, especially when flights are under one booking.",
    "Care during the wait and fixed compensation of 250, 400 or 600 euros are reviewed separately.",
  ],
};

function srSections(topic: AirlineTopic) {
  return [
    {
      heading: `${topic.airline}: kada kašnjenje ima smisla proveriti`,
      body: [
        `Kod ${topic.airline} kašnjenja prvi prag nije polazak, već dolazak na krajnju destinaciju. Ako ste stigli tri sata ili više kasnije, slučaj treba proveriti kroz pravila za [naknadu za kašnjenje leta](/naknada-za-kasnjenje-leta). ${topic.srRouteNote}`,
        `${topic.srCoverageNote} To ne znači da je svaki zahtev automatski osnovan. Potrebno je povezati rutu, operativnog prevoznika, jednu rezervaciju, stvarno vreme dolaska i razlog koji je aviokompanija navela.`,
      ],
      bullets: sharedBullets.sr,
    },
    {
      heading: "Konekcija, čvorište i krajnji dolazak",
      body: [
        `${topic.srHubNote} Ako je prvi segment kasnio manje od tri sata, ali ste zbog toga izgubili nastavak puta i stigli mnogo kasnije, ne treba stati na prvom letu. Kod jedne rezervacije procenjuje se poslednji aerodrom iz plana putovanja.`,
        "Ako su karte bile odvojene, zahtev je obično teži jer aviokompanija za prvi let ne mora znati za samostalno kupljen nastavak. Zato je itinerer važan dokaz: on pokazuje da li je kompanija prodala celo putovanje ili samo jedan segment.",
      ],
    },
    {
      heading: "Razlog kašnjenja koji aviokompanija navodi",
      body: [
        "Najčešći razlozi su tehnički kvar, kasna rotacija aviona, nedostatak posade, slot kontrole letenja, loše vreme, zatvaranje aerodroma ili bezbednosni događaj. Neki od tih razloga mogu biti vanredne okolnosti, ali generička rečenica nije dovoljna za ozbiljnu procenu.",
        "Tražite vezu između razloga i baš vašeg leta: gde je problem nastao, koliko je trajao, koji segment je pogodio i šta je prevoznik uradio da smanji kašnjenje. Ako se razlog menja od obaveštenja na aerodromu do email odbijenice, sačuvajte sve verzije.",
      ],
    },
    {
      heading: "Obrok, hotel, transfer i dodatni troškovi",
      body: [
        "Kod dužeg čekanja putnik treba da traži obrok, osveženje i jasnu informaciju o novom vremenu polaska. Ako čekanje prelazi u noć, traže se hotel i transfer. Ta prava postoje odvojeno od fiksne naknade i mogu ostati relevantna čak i kada prevoznik ima argument protiv odštete.",
        "Ako pomoć nije ponuđena, kupujte razumno i sačuvajte račune. U zahtevu odvojite troškove od fiksne naknade: hrana, voda, hotel, transfer, nova karta i komunikacija ne treba da budu jedna nejasna cifra. Let Kasni ih slaže u poseban deo dosijea kako se ne bi izgubili u raspravi o uzroku kašnjenja.",
      ],
    },
    {
      heading: "Kako pripremiti zahtev za proveru",
      body: [
        `Za ${topic.airline} let napravite kratku tabelu: broj leta, datum, ruta, operativni prevoznik, booking reference, planirani dolazak, stvarni dolazak, objašnjenje aviokompanije, ponuđena pomoć i troškovi. Takav format je lakši za proveru nego duga žalba bez redosleda.`,
        "Ako aviokompanija odbije zahtev, proverite da li odgovor pominje tačan let, datum, vremenski period, dokaz razloga i mere koje je preduzela. Ako toga nema, sledeći korak je dopuna sa vremenskom linijom i najjačim dokazima, a ne ponovno prepričavanje celog putovanja.",
      ],
    },
  ];
}

function enSections(topic: AirlineTopic) {
  return [
    {
      heading: `${topic.airline}: when a delay is worth checking`,
      body: [
        `For a ${topic.airline} delay, the first threshold is not departure but arrival at the final destination. If you arrived three hours or more late, review the case under [flight delay compensation](/en/flight-delay-compensation). ${topic.enRouteNote}`,
        `${topic.enCoverageNote} This does not mean every claim is automatically strong. You still need to connect route, operating carrier, one booking, actual arrival time and the reason the airline gave.`,
      ],
      bullets: sharedBullets.en,
    },
    {
      heading: "Connection, hub and final arrival",
      body: [
        `${topic.enHubNote} If the first segment was less than three hours late but made you miss the onward leg and arrive much later, do not stop at the first flight. Under one booking, the last airport in the travel plan is assessed.`,
        "If tickets were separate, the claim is usually harder because the airline operating the first flight may not know about the self-booked continuation. The itinerary is therefore important evidence: it shows whether the airline sold the whole journey or only one segment.",
      ],
    },
    {
      heading: "Delay reason given by the airline",
      body: [
        "Common reasons include technical fault, late aircraft rotation, crew shortage, air traffic control slot, bad weather, airport closure or a security event. Some of these can be extraordinary circumstances, but a generic sentence is not enough for a serious review.",
        "Ask for the link between the reason and your specific flight: where the problem happened, how long it lasted, which segment it affected and what the carrier did to reduce the delay. If the reason changes from airport notice to email rejection, keep every version.",
      ],
    },
    {
      heading: "Meals, hotel, transfer and extra costs",
      body: [
        "During a longer wait, passengers should ask for meals, refreshments and clear information about the new departure time. If the wait moves overnight, hotel and transfer become relevant. These rights are separate from fixed compensation and can remain important even when the carrier has an argument against compensation.",
        "If assistance was not offered, spend reasonably and keep receipts. In the claim, separate costs from fixed compensation: food, water, hotel, transfer, new ticket and communication should not become one unclear amount. Let Kasni organizes them as a separate part of the case file so they are not lost in the argument about the delay cause.",
      ],
    },
    {
      heading: "How to prepare the claim for review",
      body: [
        `For a ${topic.airline} flight, prepare a short table: flight number, date, route, operating carrier, booking reference, scheduled arrival, actual arrival, airline explanation, assistance offered and costs. This format is easier to review than a long complaint without sequence.`,
        "If the airline rejects the claim, check whether the answer mentions the exact flight, date, time period, proof of the reason and measures taken. If it does not, the next step is a timeline follow-up with the strongest evidence, not a full retelling of the journey.",
      ],
    },
  ];
}

function airlineArticle(topic: AirlineTopic): BlogArticle {
  return {
    id: topic.id,
    publishedAt: "2026-05-17",
    updatedAt: "2026-05-17",
    sr: {
      slug: topic.srSlug,
      title: topic.srTitle,
      description: topic.srDescription,
      excerpt: topic.srExcerpt,
      category: "Aviokompanije",
      readTime: "8 min čitanja",
      sections: srSections(topic),
    },
    en: {
      slug: topic.enSlug,
      title: topic.enTitle,
      description: topic.enDescription,
      excerpt: topic.enExcerpt,
      category: "Airlines",
      readTime: "8 min read",
      sections: enSections(topic),
    },
  };
}

const topics: AirlineTopic[] = [
  {
    id: "eurowings-flight-delay-compensation",
    srSlug: "eurowings-kasnjenje-leta-naknada",
    enSlug: "eurowings-flight-delay-compensation",
    srTitle: "Eurowings kašnjenje leta: naknada, Nemačka i konekcije",
    enTitle: "Eurowings flight delay: compensation, Germany and connections",
    srDescription: "Kako proveriti Eurowings kašnjenje leta: EU prevoznik, nemačka čvorišta, krajnji dolazak, briga i dokazi.",
    enDescription: "How to check a Eurowings flight delay: EU carrier, German hubs, final arrival, care and evidence.",
    srExcerpt: "Eurowings slučajevi često zavise od toga da li je ruta iz EU, ka EU ili preko Nemačke bila deo jedne rezervacije.",
    enExcerpt: "Eurowings cases often depend on whether the EU route or German connection was part of one booking.",
    airline: "Eurowings",
    srRouteNote: "Kod ruta preko Nemačke posebno proverite da li je kašnjenje prvog segmenta promenilo dolazak na krajnju destinaciju.",
    enRouteNote: "On routes through Germany, check especially whether the first delayed segment changed arrival at the final destination.",
    srHubNote: "Nemački aerodrom može biti krajnja destinacija ili presedanje ka drugom gradu, pa dokaz ne sme stati samo na vremenu sletanja prvog leta.",
    enHubNote: "A German airport may be the final destination or a connection to another city, so the evidence should not stop at the landing time of the first flight.",
    srCoverageNote: "Pošto je Eurowings evropski prevoznik, rute iz EU i mnoge rute ka EU zaslužuju pažljivu proveru.",
    enCoverageNote: "Because Eurowings is a European carrier, EU departures and many flights into the EU deserve careful review.",
  },
  {
    id: "croatia-airlines-flight-delay-compensation",
    srSlug: "croatia-airlines-kasnjenje-leta-naknada",
    enSlug: "croatia-airlines-flight-delay-compensation",
    srTitle: "Croatia Airlines kašnjenje leta: Zagreb, EU ruta i naknada",
    enTitle: "Croatia Airlines flight delay: Zagreb, EU route and compensation",
    srDescription: "Vodič za Croatia Airlines kašnjenja preko Zagreba: jedna rezervacija, krajnji dolazak, troškovi čekanja i odbijenice.",
    enDescription: "A guide to Croatia Airlines delays via Zagreb: one booking, final arrival, waiting costs and rejection replies.",
    srExcerpt: "Kod Croatia Airlines letova preko Zagreba mala promena prvog segmenta može napraviti veliki kasni dolazak na nastavku puta.",
    enExcerpt: "On Croatia Airlines flights through Zagreb, a small first-segment delay can create a much later onward arrival.",
    airline: "Croatia Airlines",
    srRouteNote: "Zagreb je EU čvorište, pa su polazak iz EU, dolazak u EU i operativni prevoznik često ključni za procenu.",
    enRouteNote: "Zagreb is an EU hub, so EU departure, EU arrival and operating carrier are often central to the assessment.",
    srHubNote: "Ako je Zagreb samo presedanje, najvažnije je dokazati poslednji aerodrom iz iste rezervacije.",
    enHubNote: "If Zagreb was only a connection, the most important point is to prove the last airport in the same booking.",
    srCoverageNote: "Kao evropski prevoznik, Croatia Airlines se često procenjuje kroz evropski okvir zaštite putnika.",
    enCoverageNote: "As a European carrier, Croatia Airlines is often assessed under the European passenger-rights framework.",
  },
  {
    id: "vueling-flight-delay-compensation",
    srSlug: "vueling-kasnjenje-leta-naknada",
    enSlug: "vueling-flight-delay-compensation",
    srTitle: "Vueling kašnjenje leta: Barselona, EU pravila i dokazi",
    enTitle: "Vueling flight delay: Barcelona, EU rules and evidence",
    srDescription: "Kako proveriti Vueling kašnjenje leta preko Barselone ili drugih EU aerodroma: dolazak, razlog, briga i troškovi.",
    enDescription: "How to check a Vueling delay via Barcelona or other EU airports: arrival, reason, care and costs.",
    srExcerpt: "Vueling kašnjenja treba proveriti po krajnjem dolasku, a ne samo po tome koliko je let kasnio pri poletanju.",
    enExcerpt: "Vueling delays should be checked by final arrival, not only by how late the flight departed.",
    airline: "Vueling",
    srRouteNote: "Kod ruta preko Barselone ili drugih španskih aerodroma bitno je da li je nastavak puta bio u istoj rezervaciji.",
    enRouteNote: "On routes through Barcelona or other Spanish airports, it matters whether onward travel was in the same booking.",
    srHubNote: "Barselona može biti krajnja destinacija ili veza ka Španiji, Portugalu, Francuskoj ili drugim rutama, pa se posmatra celo putovanje.",
    enHubNote: "Barcelona may be the final destination or a link to Spain, Portugal, France or other routes, so the whole journey should be reviewed.",
    srCoverageNote: "Vueling je evropski prevoznik, što rute iz EU i ka EU čini posebno relevantnim za proveru.",
    enCoverageNote: "Vueling is a European carrier, making EU departures and flights into the EU especially relevant to review.",
  },
  {
    id: "bulgaria-air-flight-delay-compensation",
    srSlug: "bulgaria-air-kasnjenje-leta-naknada",
    enSlug: "bulgaria-air-flight-delay-compensation",
    srTitle: "Bulgaria Air kašnjenje leta: Sofija, regionalne rute i naknada",
    enTitle: "Bulgaria Air flight delay: Sofia, regional routes and compensation",
    srDescription: "Praktičan vodič za Bulgaria Air kašnjenja: Sofija kao veza, EU prevoznik, krajnji dolazak, briga i dokazi.",
    enDescription: "A practical guide to Bulgaria Air delays: Sofia as a connection, EU carrier, final arrival, care and evidence.",
    srExcerpt: "Kod Bulgaria Air letova preko Sofije posebno je važno razlikovati kratko kašnjenje segmenta od kasnog dolaska na celu destinaciju.",
    enExcerpt: "For Bulgaria Air flights via Sofia, separate a short segment delay from late arrival at the whole destination.",
    airline: "Bulgaria Air",
    srRouteNote: "Ako je Sofija presedanje, proverava se da li je prvi problem pomerio dolazak na poslednji aerodrom iz rezervacije.",
    enRouteNote: "If Sofia is a connection, check whether the first problem moved arrival at the last airport in the booking.",
    srHubNote: "Sofija često funkcioniše kao regionalna veza, pa jedan boarding pass nije dovoljan za procenu celog slučaja.",
    enHubNote: "Sofia often works as a regional link, so one boarding pass is not enough to assess the whole case.",
    srCoverageNote: "Bulgaria Air je evropski prevoznik, pa se posebno proveravaju EU rute i dolasci koji kasne tri sata ili više.",
    enCoverageNote: "Bulgaria Air is a European carrier, so EU routes and arrivals delayed three hours or more deserve a detailed check.",
  },
  {
    id: "tarom-flight-delay-compensation",
    srSlug: "tarom-kasnjenje-leta-naknada",
    enSlug: "tarom-flight-delay-compensation",
    srTitle: "TAROM kašnjenje leta: Bukurešt, konekcije i prava putnika",
    enTitle: "TAROM flight delay: Bucharest, connections and passenger rights",
    srDescription: "Kako proveriti TAROM kašnjenje preko Bukurešta: jedna rezervacija, krajnji dolazak, razlog kašnjenja i troškovi čekanja.",
    enDescription: "How to check a TAROM delay via Bucharest: one booking, final arrival, delay reason and waiting costs.",
    srExcerpt: "TAROM kašnjenja često zavise od toga da li je Bukurešt bio kraj putovanja ili samo segment u jednoj rezervaciji.",
    enExcerpt: "TAROM delays often depend on whether Bucharest was the end of the journey or only one segment in a single booking.",
    airline: "TAROM",
    srRouteNote: "Kod Bukurešta je važno odvojiti dolazak u Rumuniju od dolaska na krajnju destinaciju ako postoji nastavak puta.",
    enRouteNote: "For Bucharest, separate arrival in Romania from arrival at the final destination if there was onward travel.",
    srHubNote: "Ako je nastavak iz Bukurešta izgubljen zbog prvog kašnjenja, čuvajte dokaz da su oba leta bila kupljena zajedno.",
    enHubNote: "If the onward flight from Bucharest was missed because of the first delay, keep proof that both flights were bought together.",
    srCoverageNote: "TAROM je evropski prevoznik, pa rute povezane sa EU okvirom obično imaju dobar osnov za detaljnu proveru.",
    enCoverageNote: "TAROM is a European carrier, so routes connected to the EU framework usually have a good basis for detailed review.",
  },
  {
    id: "norwegian-flight-delay-compensation",
    srSlug: "norwegian-kasnjenje-leta-naknada",
    enSlug: "norwegian-flight-delay-compensation",
    srTitle: "Norwegian kašnjenje leta: Skandinavija, EEA rute i naknada",
    enTitle: "Norwegian flight delay: Scandinavia, EEA routes and compensation",
    srDescription: "Vodič za Norwegian kašnjenja: skandinavske rute, EEA zaštita, krajnji dolazak, briga i dokazi.",
    enDescription: "A guide to Norwegian delays: Scandinavian routes, EEA protection, final arrival, care and evidence.",
    srExcerpt: "Kod Norwegian letova treba proveriti EEA okvir, krajnji dolazak i da li je razlog zaista bio van kontrole prevoznika.",
    enExcerpt: "For Norwegian flights, check the EEA framework, final arrival and whether the reason was truly outside the carrier's control.",
    airline: "Norwegian",
    srRouteNote: "Skandinavske rute mogu uključiti posebnu vezu sa EEA pravilima, pa se ruta i operativni prevoznik proveravaju pažljivo.",
    enRouteNote: "Scandinavian routes may involve the EEA framework, so route and operating carrier need careful review.",
    srHubNote: "Ako se putovanje nastavlja preko Osla, Kopenhagena ili drugog skandinavskog aerodroma, krajnji dolazak je važniji od samog prvog sletanja.",
    enHubNote: "If the journey continues through Oslo, Copenhagen or another Scandinavian airport, final arrival matters more than the first landing alone.",
    srCoverageNote: "Norwegian slučajevi ne treba da se odbace samo zato što ruta nije klasična EU ruta; proverava se širi evropski okvir i konkretan prevoznik.",
    enCoverageNote: "Norwegian cases should not be dismissed only because the route is not a classic EU route; the broader European framework and carrier facts need review.",
  },
];

export const articles = topics.map(airlineArticle);
