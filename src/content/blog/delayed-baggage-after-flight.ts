import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const image = {
    src: "https://images.unsplash.com/photo-1553531889-e6cf4d692b1b?auto=format&fit=crop&w=1400&q=82",
    alt: "Suitcases on an airport baggage belt",
    position: "center",
  } satisfies BlogArticleImage;

export const article = {
    id: "delayed-baggage-after-flight",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    sr: {
      slug: "kasni-prtljag-posle-leta-sta-raditi",
      title: "Kasni prtljag posle leta: šta uraditi odmah",
      description: "Vodič za putnike kada kofer ne stigne na traku: PIR zapisnik, rokovi, razumni troškovi i razlika između prtljaga i EU naknade za let.",
      excerpt: "Kašnjenje prtljaga se rešava drugačije od kašnjenja leta. Najvažnije je da odmah prijavite problem na aerodromu i čuvate račune.",
      category: "Prtljag",
      readTime: "7 min čitanja",
      sections: [
        {
          heading: "Prtljag nije isto što i EU naknada za kašnjenje leta",
          body: [
            "Kada kofer ne stigne, putnici često misle da se primenjuju ista pravila kao za kašnjenje leta. U većini slučajeva prtljag se rešava kroz posebna pravila o avio-prevozu i odgovornosti za izgubljen, oštećen ili zakasneo prtljag. To nije fiksna naknada od 250, 400 ili 600 evra.",
            "To ne znači da nemate pravo. Ako prtljag kasni, možete tražiti naknadu razumnih i neophodnih troškova dok čekate kofer. Ako je prtljag izgubljen ili oštećen, postoje posebni rokovi i limiti odgovornosti. Ali dokazivanje je mnogo konkretnije: prijava, računi i sadržaj prtljaga.",
            "Za putnike iz Srbije ovo je često posle konekcija preko velikih aerodroma. Let može stići na vreme, ali prtljag ostane u tranzitu. U tom slučaju slučaj ne treba mešati sa odštetom za kašnjenje leta, već ga treba voditi kao poseban prtljag zahtev."
          ]
        },
        {
          heading: "PIR zapisnik napravite pre izlaska sa aerodroma",
          body: [
            "Najvažniji korak je prijava na šalteru za izgubljeni prtljag pre nego što napustite aerodrom. Tražite PIR zapisnik ili drugi pisani dokaz da je kofer prijavljen kao zakasneo. Bez toga aviokompanija kasnije može tvrditi da problem nije prijavljen na vreme.",
            "U prijavi proverite broj prtljazne nalepnice, opis kofera, adresu za dostavu i kontakt telefon. Ako putujete dalje iz Beograda u drugi grad, navedite realnu adresu na kojoj možete primiti kofer. Greška u adresi često produži čekanje.",
            "Fotografišite prtljaznu nalepnicu, PIR broj i svaki ekran ili papir koji dobijete. Ako vam osoblje kaže da će kofer stići sutra, tražite da se to unese ili potvrdi pisano. Usmeno obećanje je slabo ako se ispostavi da kofer kasni tri dana."
          ]
        },
        {
          heading: "Koji troškovi su razumni",
          body: [
            "Dok čekate prtljag, možete imati troškove za osnovne stvari: higijenu, donji veš, osnovnu odeću, punjač ili druge predmete bez kojih ne možete razumno nastaviti put. Ako ste na poslovnom putu ili venčanju, kontekst može objasniti zašto je neki trošak bio potreban.",
            "Ne treba kupovati luksuzne stvari i očekivati pun povraćaj. Aviokompanije najčešće gledaju da li je trošak bio razuman, neophodan i vezan za period dok prtljag nije bio dostupan. Račun od nekoliko osnovnih artikala je mnogo jači od velike kupovine bez objašnjenja.",
            "Ako ste na povratku kući, naknada može biti slabija jer se pretpostavlja da kod kuće imate osnovne stvari. Ako ste tek stigli na putovanje i nemate ništa, argument je jači. Zato u zahtevu napišite gde ste bili i zašto ste morali da kupite navedene stvari."
          ]
        },
        {
          heading: "Rokovi su kratki i treba ih poštovati",
          body: [
            "Kod oštećenog prtljaga rokovi su obično vrlo kratki, a kod zakasnelog prtljaga zahtev treba poslati brzo nakon preuzimanja kofera i prikupljanja računa. Nemojte čekati nedeljama da vidite da li će se problem sam rešiti.",
            "Ako prtljag kasni, vodite evidenciju kada je prijavljen, kada je pronađen, kada je dostavljen i šta ste kupili u međuvremenu. Ako kofer ne stigne duže vreme, pitajte aviokompaniju kada ga tretira kao izgubljen i koji obrazac treba poslati.",
            "Uvek proverite uslove konkretne aviokompanije, ali nemojte se oslanjati samo na aplikaciju. Pošaljite pisani zahtev sa PIR brojem, računima i bankovnim podacima ako se traže. Sačuvajte potvrdu slanja."
          ]
        },
        {
          heading: "Šta ako je prtljag oštećen ili nešto nedostaje",
          body: [
            "Ako kofer stigne oštećen, fotografišite ga odmah na aerodromu, prijavite štetu i tražite zapisnik. Ako štetu primetite tek kod kuće, slikajte ambalažu, nalepnice i oštećenje što pre. Kod oštećenja je kašnjenje u prijavi često veliki problem.",
            "Ako iz prtljaga nešto nedostaje, slučaj je teži jer treba dokazati šta je bilo unutra. Pomognu fotografije pakovanja, računi za vrednije stvari i jasno objašnjenje. Vredne predmete, dokumenta, lekove i elektroniku uvek je bolje nositi u ručnom prtljagu.",
            "Ako je kofer potpuno izgubljen, aviokompanija može tražiti listu sadržaja i procenu vrednosti. Nemojte preuveličavati vrednost. Realan, dokumentovan zahtev je u praksi jači od maksimalnog iznosa bez dokaza."
          ]
        },
        {
          heading: "Kako spojiti prtljag i problem sa letom",
          body: [
            "Ponekad isti put ima dva problema: let je kasnio, a prtljag je stigao kasnije. Tada zahteve treba razdvojiti. Kašnjenje leta proverava se kroz dolazak, razlog i pokrivenost rute, dok se prtljag dokazuje PIR zapisnikom, računima i rokom čekanja.",
            "U jednom emailu možete navesti oba problema, ali ih strukturirajte u dva odeljka. Prvi: zahtev za let. Drugi: zahtev za prtljag i troškove. Tako smanjujete rizik da aviokompanija odgovori samo na jedan deo.",
            "Najbolji rezultat dolazi iz uredne dokumentacije. Prijavite prtljag odmah, kupujte samo razumno, čuvajte račune i ne čekajte rokove. To je mnogo važnije od dugog objašnjenja koliko vam je put bio neprijatan."
          ]
        }
      ],
    },
    en: {
      slug: "delayed-baggage-after-flight-what-to-do",
      title: "Delayed baggage after a flight: what to do immediately",
      description: "A guide for passengers when a suitcase does not arrive: PIR report, deadlines, reasonable expenses and the difference from EU flight compensation.",
      excerpt: "Delayed baggage is handled differently from flight delay. The most important step is to report it at the airport and keep receipts.",
      category: "Baggage",
      readTime: "7 min read",
      sections: [
        {
          heading: "Baggage is not the same as EU flight delay compensation",
          body: [
            "When a suitcase does not arrive, passengers often assume the same rules apply as for a delayed flight. In most cases, baggage is handled under separate rules on air carriage liability for lost, damaged or delayed baggage. It is not fixed compensation of 250, 400 or 600 euros.",
            "That does not mean you have no rights. If baggage is delayed, you may request reimbursement of reasonable and necessary expenses while waiting for the suitcase. If baggage is lost or damaged, there are specific deadlines and liability limits. But the evidence is more concrete: report, receipts and baggage contents.",
            "For travelers from Serbia this often happens after connections through large airports. The flight may arrive on time while the bag remains in transit. In that case, do not mix the case with flight delay compensation; handle it as a separate baggage claim."
          ]
        },
        {
          heading: "Make a PIR report before leaving the airport",
          body: [
            "The most important step is to report the missing bag at the lost baggage desk before you leave the airport. Ask for a PIR report or another written confirmation that the suitcase was reported as delayed. Without it, the airline may later argue that the problem was not reported in time.",
            "In the report, check the baggage tag number, suitcase description, delivery address and contact phone. If you are traveling onward from Belgrade to another city, give a realistic address where you can receive the suitcase. Address errors often prolong the wait.",
            "Photograph the baggage tag, PIR number and every screen or paper you receive. If staff say the bag will arrive tomorrow, ask for that to be entered or confirmed in writing. A verbal promise is weak if the suitcase is actually delayed for three days."
          ]
        },
        {
          heading: "Which expenses are reasonable",
          body: [
            "While waiting for baggage, you may have costs for essentials: hygiene items, underwear, basic clothing, a charger or other items without which you cannot reasonably continue the trip. If you are on a business trip or attending a wedding, that context can explain why a cost was necessary.",
            "Do not buy luxury items and expect full reimbursement. Airlines usually check whether the expense was reasonable, necessary and connected to the period when the baggage was unavailable. A receipt for several basic items is much stronger than a large purchase without explanation.",
            "If you are returning home, reimbursement may be weaker because it is assumed you have essentials at home. If you have just arrived at your destination with nothing, the argument is stronger. In the claim, explain where you were and why you had to buy the listed items."
          ]
        },
        {
          heading: "Deadlines are short",
          body: [
            "For damaged baggage, deadlines are usually very short, and for delayed baggage the claim should be sent soon after receiving the suitcase and collecting receipts. Do not wait for weeks to see whether the issue will somehow resolve itself.",
            "If baggage is delayed, record when it was reported, when it was found, when it was delivered and what you bought in the meantime. If the suitcase does not arrive for a long time, ask the airline when it treats the bag as lost and which form must be submitted.",
            "Always check the conditions of the specific airline, but do not rely only on the app. Send a written request with the PIR number, receipts and bank details if required. Keep proof that the request was sent."
          ]
        },
        {
          heading: "If baggage is damaged or items are missing",
          body: [
            "If the suitcase arrives damaged, photograph it immediately at the airport, report the damage and ask for a written record. If you notice the damage only at home, photograph the packaging, tags and damage as soon as possible. With damage, late reporting is often a major problem.",
            "If something is missing from the baggage, the case is harder because you must prove what was inside. Packing photos, receipts for valuable items and a clear explanation help. Valuables, documents, medicines and electronics are always better kept in hand luggage.",
            "If the suitcase is completely lost, the airline may request a list of contents and estimated value. Do not exaggerate the value. A realistic, documented claim is stronger in practice than a maximum amount without evidence."
          ]
        },
        {
          heading: "How to combine baggage and flight issues",
          body: [
            "Sometimes the same trip has two problems: the flight was delayed and the baggage arrived later. Separate the claims. Flight delay is checked through arrival time, reason and route coverage, while baggage is proven through the PIR report, receipts and waiting period.",
            "You can mention both issues in one email, but structure them in two sections. First: flight claim. Second: baggage claim and expenses. This reduces the risk that the airline responds to only one part.",
            "The best result comes from orderly documentation. Report the bag immediately, buy only reasonably, keep receipts and respect deadlines. That matters much more than a long explanation of how unpleasant the trip was."
          ]
        }
      ],
    },
  } satisfies BlogArticle;
