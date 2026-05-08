import type { BlogArticle, BlogArticleImage } from "@/lib/blog";

export const image = {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=82",
    alt: "Family waiting near an airport window",
    position: "center",
  } satisfies BlogArticleImage;

export const article = {
    id: "children-infant-flight-compensation",
    publishedAt: "2026-05-01",
    updatedAt: "2026-05-01",
    sr: {
      slug: "deca-bebe-odsteta-za-kasnjenje-leta",
      title: "Da li deca i bebe imaju pravo na odštetu za let",
      description: "Porodični vodič za kašnjenja, otkazivanja i uskraćeno ukrcavanje: kada se naknada računa po detetu, a kada zavisi od karte i cene.",
      excerpt: "Naknada se često računa po putniku, ali kod beba i dece treba proveriti da li su imala kartu, mesto i plaćenu tarifu.",
      category: "Porodična putovanja",
      readTime: "7 min čitanja",
      sections: [
        {
          heading: "Naknada se ne računa samo po rezervaciji",
          body: [
            "Kod kašnjenja, otkazivanja i uskraćenog ukrcavanja putnici često pitaju da li se naknada računa jednom po porodici ili za svakog putnika. U tipičnim evropskim slučajevima fiksna naknada se gleda po putniku, ne po rezervaciji. To znači da porodica od četiri člana potencijalno ima četiri odvojena zahteva ako su svi putnici pokriveni pravilima.",
            "Međutim, kod dece i posebno beba treba proveriti detalje karte. Nije isto ako dete ima sopstveno sedište i plaćenu kartu, ako beba putuje u krilu uz malu taksu ili ako je karta izdata bez stvarne cene. U praksi se ovo često objašnjava previše kratko, a upravo tu porodice najčešće greše.",
            "Za putnike iz Srbije najvažnije je da ne pretpostave automatski ni jedno ni drugo. Ne treba odustati zato što je putnik dete, ali ne treba ni računati maksimalan iznos za bebu bez provere kako je karta izdata."
          ]
        },
        {
          heading: "Deca sa svojim sedištem su najjednostavniji slučaj",
          body: [
            "Ako dete ima sopstveno sedište, ime na karti, boarding pass i plaćenu tarifu, slučaj se najčešće proverava slično kao za odraslog putnika. Ako je let stigao tri sata ili više kasnije, otkazan je kasno ili je dete odbijeno na ukrcavanju zbog overbookinga, zahtev treba uključiti i dete.",
            "Cena dečije karte može biti niža od karte odraslog putnika, ali fiksna naknada za kašnjenje se obično ne računa prema ceni karte. Zato dete sa plaćenom kartom ne treba automatski isključiti samo zato što je karta bila povoljnija.",
            "U zahtevu navedite sve putnike po imenu i dodajte dokumente za svakog: boarding pass, potvrdu rezervacije i, ako postoji, dokaz o ceni. Ako podnosite zahtev za celu porodicu, jasno napišite da postupate za sve putnike iz rezervacije."
          ]
        },
        {
          heading: "Bebe u krilu zahtevaju pažljiviju proveru",
          body: [
            "Bebe koje putuju u krilu odraslog putnika često imaju posebnu infant kartu, ali bez sopstvenog sedišta i uz simboličnu cenu ili taksu. Tu pravo na fiksnu naknadu može biti sporno i zavisi od toga da li se konkretna karta smatra plaćenom putničkom kartom u relevantnom smislu.",
            "Ako je za bebu plaćena posebna tarifa, sačuvajte račun i potvrdu. Ako je beba navedena samo kao dodatak na karti odraslog putnika, bez realne cene, zahtev može biti slabiji. U oba slučaja vredi proveriti, jer aviokompanije ne prikazuju uvek infant karte na isti način.",
            "Čak i kada fiksna naknada za bebu nije sigurna, troškovi porodice tokom čekanja mogu biti relevantni. Hrana, osnovne potrepštine, hotel ili transfer zbog dugog čekanja ne nestaju samo zato što je jedan putnik beba."
          ]
        },
        {
          heading: "Pravo na brigu je posebno važno za porodice",
          body: [
            "Kod porodica sa decom pravo na brigu tokom čekanja ima praktično veći značaj nego kod samostalnih putnika. Ako čekanje traje dugo, obroci, voda, pristup komunikaciji, hotel i transfer mogu biti presudni. Aviokompanija ne bi smela da ignoriše činjenicu da su putnici deca ili bebe.",
            "Ako pomoć nije ponuđena, a morali ste da kupite hranu, vodu, pelene, mleko, osnovnu odeću ili platite hotel, čuvajte račune. U zahtevu objasnite da je trošak nastao tokom čekanja koje je izazvao poremećaj leta. Budite razumni: osnovne stvari imaju bolju šansu od velikih i neobjašnjenih kupovina.",
            "Ako je porodica razdvojena pri preusmeravanju ili su ponuđena mesta na različitim letovima, zabeležite to. Za porodice, razumna alternativa ne znači samo bilo koji slobodan let, već rešenje koje realno omogućava zajedničko putovanje dece i odraslih."
          ]
        },
        {
          heading: "Dokazi za porodični zahtev",
          body: [
            "Najkorisniji dokazi su jedna zajednička potvrda rezervacije, boarding pass za svakog putnika, poruke aviokompanije, računi za troškove i dokaz realnog dolaska. Ako dete nema boarding pass u aplikaciji odraslog putnika, pokušajte da preuzmete ili fotografišete individualni dokument na aerodromu.",
            "Ako je problem nastao na konekciji, čuvajte dokumente za sve segmente. Porodice često imaju dodatnu komplikaciju: kolica, dečije sedište, prtljag, posebne obroke ili asistenciju. Ako je nešto od toga pogoršalo posledice kašnjenja, navedite kratko, ali ostanite fokusirani na dokazive činjenice.",
            "Ako zahtev šalje jedan roditelj, proverite da li aviokompanija traži saglasnost drugog roditelja ili punomoć za ostale putnike. To ne menja osnov prava, ali može usporiti isplatu ako dokumentacija nije uredna."
          ]
        },
        {
          heading: "Tip karte, infant taksa i odvojeni troškovi porodice",
          body: [
            "Prva greška je da porodica traži samo jednu naknadu za celu rezervaciju. Druga je da automatski uključi bebu bez provere karte. Treća je da pomeša fiksnu naknadu, refundaciju karte i troškove hrane ili hotela u jedan neobjašnjen iznos.",
            "Bolje je napraviti jednostavnu tabelu: ime putnika, tip karte, da li je imao sedište, planirani dolazak, stvarni dolazak i dokumenti. Zatim odvojeno navedite troškove koje tražite nazad. Takav zahtev je jasan i aviokompaniji i bilo kome ko kasnije ručno proverava slučaj.",
            "Za porodice koje lete iz Srbije ili ka Srbiji važi isto osnovno pravilo kao i za druge putnike: proveravaju se ruta, prevoznik, razlog poremećaja i kašnjenje na krajnjoj destinaciji. Deca ne treba da budu zaboravljena, ali kod beba detalji karte odlučuju koliko je zahtev jak."
          ]
        }
      ],
    },
    en: {
      slug: "children-infants-flight-delay-compensation",
      title: "Do children and babies have a right to flight compensation",
      description: "A family guide to delays, cancellations and denied boarding: when compensation is counted per child and when ticket details matter.",
      excerpt: "Compensation is often calculated per passenger, but for babies and children you must check whether they had a ticket, seat and paid fare.",
      category: "Family travel",
      readTime: "7 min read",
      sections: [
        {
          heading: "Compensation is not counted only per booking",
          body: [
            "For delays, cancellations and denied boarding, passengers often ask whether compensation is paid once per family or for each passenger. In typical European cases, fixed compensation is assessed per passenger, not per booking. That means a family of four may potentially have four separate claims if all passengers are covered.",
            "However, for children and especially babies, ticket details matter. It is not the same if a child has their own seat and paid ticket, if an infant travels on an adult's lap for a small fee, or if a ticket was issued without a real fare. In practice, this is often explained too briefly, and families often make mistakes here.",
            "For travelers from Serbia, the key is not to assume either answer automatically. Do not give up just because the passenger is a child, but do not calculate the maximum amount for an infant without checking how the ticket was issued."
          ]
        },
        {
          heading: "Children with their own seat are the simplest case",
          body: [
            "If a child has their own seat, name on the ticket, boarding pass and paid fare, the case is usually checked much like an adult passenger's case. If the flight arrived three hours or more late, was cancelled at short notice or the child was denied boarding due to overbooking, the claim should include the child.",
            "A child's fare may be lower than an adult fare, but fixed delay compensation is usually not calculated based on ticket price. Therefore, a child with a paid ticket should not be excluded automatically just because the ticket was cheaper.",
            "In the claim, list every passenger by name and add documents for each: boarding pass, booking confirmation and, if available, proof of price. If submitting for the whole family, clearly say that you are acting for all passengers in the booking."
          ]
        },
        {
          heading: "Infants on lap require closer checking",
          body: [
            "Infants traveling on an adult's lap often have a separate infant ticket, but no own seat and only a symbolic price or fee. The right to fixed compensation may be disputed and depends on whether the specific ticket counts as a paid passenger ticket in the relevant sense.",
            "If a separate fare was paid for the infant, keep the receipt and confirmation. If the infant is listed only as an addition to the adult ticket without a real price, the claim may be weaker. In both cases it is worth checking because airlines do not always display infant tickets in the same way.",
            "Even when fixed compensation for the infant is uncertain, family expenses during the wait may matter. Food, basic supplies, hotel or transfer costs caused by a long wait do not disappear simply because one passenger is a baby."
          ]
        },
        {
          heading: "Care is especially important for families",
          body: [
            "For families with children, the right to care during waiting has greater practical importance than for many solo travelers. During a long wait, meals, water, communication, hotel accommodation and transfer can be essential. The airline should not ignore that some passengers are children or babies.",
            "If help was not offered and you had to buy food, water, diapers, milk, basic clothes or pay for a hotel, keep receipts. In the claim, explain that the cost arose during the waiting time caused by the flight disruption. Be reasonable: basic items have a better chance than large unexplained purchases.",
            "If the family was split during rerouting or offered seats on different flights, record it. For families, a reasonable alternative is not just any free seat, but a solution that realistically allows children and adults to travel together."
          ]
        },
        {
          heading: "Evidence for a family claim",
          body: [
            "The most useful evidence is one shared booking confirmation, boarding pass for every passenger, airline messages, receipts for expenses and proof of actual arrival. If a child's boarding pass is not visible in the adult's app, try to download or photograph the individual document at the airport.",
            "If the problem happened on a connection, keep documents for all segments. Families often have extra complications: stroller, child seat, baggage, special meals or assistance. If any of that worsened the consequences of the delay, mention it briefly but stay focused on provable facts.",
            "If one parent submits the claim, check whether the airline requires consent from the other parent or authorization for other passengers. That does not change the underlying right, but it can slow payment if the paperwork is incomplete."
          ]
        },
        {
          heading: "Ticket type, infant fee and separate family expenses",
          body: [
            "The first mistake is requesting only one compensation payment for the whole booking. The second is automatically including an infant without checking the ticket. The third is mixing fixed compensation, ticket refund and food or hotel costs into one unexplained amount.",
            "It is better to make a simple table: passenger name, ticket type, whether they had a seat, scheduled arrival, actual arrival and documents. Then list reimbursable expenses separately. Such a claim is clear both to the airline and to anyone later reviewing the case manually.",
            "For families flying from or to Serbia, the same basic rule applies as for other passengers: route, carrier, disruption reason and delay at the final destination must be checked. Children should not be forgotten, but for infants the ticket details decide how strong the claim is."
          ]
        }
      ],
    },
  } satisfies BlogArticle;
