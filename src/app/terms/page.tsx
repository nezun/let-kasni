import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-bold tracking-[-0.02em] text-[var(--ink)]">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">{children}</div>
    </section>
  );
}

const listClassName = "list-disc space-y-2 pl-5";
const emailClassName = "font-medium text-[var(--ink)]";

export default function TermsPage() {
  const supportEmail = "kontakt@letkasni.rs";

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32">
      <SiteHeader locale="sr" />
      <div className="mx-auto max-w-5xl space-y-8 px-6 pb-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">Opšti uslovi poslovanja</h1>
          <p className="max-w-3xl text-sm font-semibold leading-7 text-[var(--ink)]">letkasni.rs</p>
          <p className="max-w-3xl text-sm font-semibold leading-7 text-[var(--ink)]">VGA EU CONSULTING DOO</p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]/80">Verzija 1.4 | Važi od 09.09.2026.</p>
        </div>

        <Section title="1. UGOVORNI ODNOS I POJMOVI">
          <p>Ovi Opšti uslovi poslovanja („Uslovi”) uređuju odnos između VGA EU CONSULTING DOO, Bulevar Nemanjića 1, 18000 Niš, Republika Srbija, PIB 113473442, matični broj 21873446 („VGA”, „Primalac”, „mi”) i fizičkog lica čije se potraživanje ostvaruje putem letkasni.rs („Putnik”).</p>
          <p>Kontakt:<br /><a className={emailClassName} href={`mailto:${supportEmail}`}>{supportEmail}</a></p>
          <p>„Potraživanje” označava novčana potraživanja određena Ugovorom koji se odnosi na konkretan predmet.</p>
          <p>„Ugovor” označava, u zavisnosti od modela koji VGA odredi za konkretan predmet:</p>
          <p>(a) Ugovor o ustupanju potraživanja, kojim Putnik ustupa Potraživanje VGA; ili</p>
          <p>(b) odgovarajući mandat odnosno odnos zasnovan na punomoćju, kada Putnik ostaje ili ponovo postaje poverilac, a Potraživanje se ostvaruje u njegovo ime preko odgovarajućeg ovlašćenog lica.</p>
          <p>VGA bira odgovarajući model prema okolnostima konkretnog predmeta, naročito prema merodavnom pravu, jurisdikciji, svojstvu Dužnika i načinu na koji Potraživanje može biti ostvareno.</p>
          <p>Odgovarajući Ugovor smatra se zaključenim u trenutku kada ga Putnik potpiše.</p>
          <p>Potpisivanjem Ugovora Putnik potvrđuje da je upoznat sa ovim Uslovima i Politikom privatnosti koji važe u trenutku zaključenja Ugovora.</p>
          <p>„Dužnik” označava avio-prevoznika, naručioca prevoza, organizatora putovanja ili drugo fizičko ili pravno lice koje može imati novčanu obavezu u vezi sa Potraživanjem.</p>
          <p>„Predmet” označava konkretno Potraživanje odnosno skup Potraživanja koji VGA vodi za Putnika u okviru jednog Claim ID-a.</p>
        </Section>

        <Section title="2. CESIJA I MODEL MANDATA/PUNOMOĆJA">
          <p>Kada se koristi Ugovor o ustupanju potraživanja, Putnik ustupa Potraživanje VGA u obimu određenom Ugovorom, a VGA postaje njegov poverilac i ostvaruje ga u svoje ime.</p>
          <p>Ako VGA proceni da cesija za konkretan predmet nije dopuštena, nije valjana, nije procesno odgovarajuća ili nije optimalan način ostvarivanja Potraživanja, VGA može odrediti da se predmet vodi po modelu mandata odnosno punomoćja.</p>
          <p>U modelu mandata/punomoćja Putnik ostaje, odnosno ponovo postaje poverilac Potraživanja, dok VGA organizuje njegovo ostvarivanje, a radnje zastupanja preduzima advokat ili drugo lice ovlašćeno prema merodavnom pravu i odgovarajućem punomoćju.</p>
          <p>Ako je Potraživanje prethodno bilo ustupljeno VGA, a radi prelaska na model mandata/punomoćja je potrebno da Putnik ponovo bude poverilac, Potraživanje se u potrebnom obimu automatski vraća Putniku u trenutku aktiviranja takvog modela, bez potrebe za zaključenjem posebnog ugovora o povratnom ustupanju.</p>
          <p>Automatski povrat Potraživanja ne utiče sam po sebi na punovažnost već preduzetih radnji u postupku. VGA i angažovani advokat mogu preduzeti potrebne procesne ili druge radnje radi usklađivanja daljeg postupka sa promenom poverioca.</p>
          <p>U modelu punomoćja prava VGA i angažovanog advokata ostvaruju se u obimu odgovarajućeg punomoćja i merodavnog prava.</p>
          <p>Kada se primenjuje cesija, potpisani Ugovor o ustupanju potraživanja može istovremeno služiti i kao obaveštenje Dužniku o izvršenom ustupanju kada mu bude dostavljen.</p>
        </Section>

        <Section title="3. OSTVARIVANJE POTRAŽIVANJA">
          <p>VGA može odmah nakon zaključenja Ugovora započeti sa proverom, ostvarivanjem i naplatom Potraživanja.</p>
          <p>VGA samostalno procenjuje pravni i faktički osnov Potraživanja i odlučuje o načinu njegovog ostvarivanja.</p>
          <p>VGA naročito može:</p>
          <ul className={listClassName}>
            <li>obraćati se Dužniku;</li><li>podnositi zahteve, reklamacije, prigovore i druge podneske;</li><li>pribavljati potrebne informacije i dokumentaciju;</li><li>pregovarati sa Dužnikom;</li><li>obraćati se regulatoru ili drugom nadležnom organu;</li><li>angažovati advokata;</li><li>pokrenuti sudski, izvršni ili drugi odgovarajući postupak;</li><li>koristiti pravne lekove; i</li><li>preduzimati druge potrebne radnje radi ostvarivanja Potraživanja.</li>
          </ul>
          <p>VGA ne garantuje da će Potraživanje biti priznato ili naplaćeno niti da će postupak biti završen u određenom roku.</p>
        </Section>

        <Section title="4. PORAVNANJE I NENOVČANE PONUDE">
          <p>Kada je VGA poverilac Potraživanja, VGA ima isključivo pravo da odluči da li će prihvatiti ili odbiti ponudu za novčano poravnanje.</p>
          <p>U modelu mandata/punomoćja ovlašćenje za prihvatanje ili odbijanje poravnanja ostvaruje se u obimu odgovarajućeg punomoćja i merodavnog prava.</p>
          <p>Pri odlučivanju o poravnanju VGA može uzeti u obzir naročito pravni osnov, kvalitet dokaza, rizik postupka, očekivano trajanje, troškove, mogućnost izvršenja i prethodno iskustvo sa konkretnim Dužnikom.</p>
          <p>VGA ne prihvata vaučere, kredite za buduća putovanja, milje, bodove niti druge nenovčane oblike namirenja umesto novčane isplate Potraživanja.</p>
        </Section>

        <Section title="5. TROŠKOVI I EKONOMSKI RIZIK">
          <p>VGA snosi ekonomski rizik ostvarivanja Potraživanja i finansira troškove postupaka i radnji koje odluči da preduzme.</p>
          <p>To naročito može uključivati troškove komunikacije i naplate, sudske takse, troškove advokata, izvršenja, prevođenja i druge potrebne troškove.</p>
          <p>Putnik ne odgovara za troškove koji nastanu nakon prenosa Potraživanja na VGA i nije dužan da ih naknadi VGA ako Potraživanje ne bude uspešno naplaćeno.</p>
          <p>Putnik može odgovarati samo za stvarne i dokumentovane troškove ili štetu koje je sam neposredno prouzrokovao povredom Ugovora ili ovih Uslova.</p>
          <p>To naročito obuhvata slučajeve namerno netačnih podataka, prikrivanja prethodne cesije ili naplate, falsifikovane dokumentacije, namerne dvostruke naplate ili drugog namernog postupanja kojim je VGA prouzrokovan trošak ili šteta.</p>
          <p>Ako se primenjuje model mandata/punomoćja, eventualni drugačiji troškovni rizik koji prema merodavnom pravu može teretiti Putnika mora mu biti predočen pre aktiviranja takvog modela.</p>
        </Section>

        <Section title="6. PROVIZIJA I PROMOTIVNI PERIOD">
          <p>Visina provizije VGA utvrđuje se prema pravilima koja važe u trenutku zaključenja konkretnog Ugovora.</p>
          <p>Dok traje promotivni period tokom kojeg je na letkasni.rs i u važećim Uslovima navedena provizija od 0%, provizija VGA iznosi:</p>
          <p>0%.</p>
          <p>Ako Putnik zaključi Ugovor za konkretan Predmet tokom tog promotivnog perioda, provizija za taj Predmet ostaje 0% do njegovog završetka, bez obzira na to da li je promotivni period u međuvremenu okončan ili je provizija za nove predmete promenjena.</p>
          <p>Za potrebe ovog člana Predmet se završava:</p>
          <p>(a) konačnom naplatom i završnim obračunom Potraživanja; ili</p>
          <p>(b) prestankom Ugovora odnosno završetkom postupanja VGA na tom Predmetu.</p>
          <p>VGA može u bilo kom trenutku izmeniti ili okončati promotivni period za buduće ugovore.</p>
          <p>Takva promena primenjuje se samo na ugovore zaključene nakon što nova provizija odnosno nova pravila počnu da važe.</p>
          <p>Promena promotivnog perioda ili provizije ne može retroaktivno promeniti proviziju za Predmet za koji je Ugovor već zaključen sa provizijom od 0%.</p>
        </Section>

        <Section title="7. KAMATA I DRUGI PRIHODI VGA">
          <p>Kamata koja se naplati kao sporedno pravo uz glavno Potraživanje pripada VGA.</p>
          <p>Takva kamata predstavlja naknadu odnosno prihod VGA i ne ulazi u iznos glavnog Potraživanja koji se isplaćuje Putniku.</p>
          <p>Troškovi postupka koje Dužnik, sud ili drugo lice posebno dosudi ili plati zbog radnji VGA ili angažovanog advokata pripadaju VGA i/ili angažovanom advokatu prema njihovom međusobnom odnosu.</p>
          <p>Ako se sredstva koja VGA primi po osnovu Potraživanja privremeno nalaze na računu VGA do isplate Putniku, eventualna kamata ili drugi prihod koji banka ili pružalac platnih usluga obračuna na takva sredstva pripada VGA.</p>
          <p>Iznosi iz ovog člana smatraju se naknadom odnosno prihodom VGA nezavisno od eventualne provizije iz člana 6.</p>
        </Section>

        <Section title="8. PRIJEM NOVCA I ISPLATA PUTNIKU">
          <p>Plaćanje po osnovu Potraživanja može biti izvršeno:</p>
          <p>(a) na račun VGA; ili</p>
          <p>(b) na račun advokata ili advokatske kancelarije koja postupa u konkretnom Predmetu, ako VGA smatra da je takav način primereniji.</p>
          <p>VGA bira odgovarajući način prijema sredstava prema okolnostima Predmeta i pravilima koja se primenjuju na angažovanog advokata.</p>
          <p>Nakon prijema i identifikacije sredstava vrši se obračun između VGA i Putnika.</p>
          <p>Ako je za Predmet ugovorena provizija od 0%, Putniku pripada 100% naplaćenog glavnog Potraživanja koje po svojoj prirodi pripada Putniku.</p>
          <p>Kamata i drugi iznosi koji prema članu 7 pripadaju VGA ne ulaze u iznos koji se isplaćuje Putniku.</p>
          <p>VGA će isplatu izvršiti nakon što ima podatke potrebne za urednu isplatu.</p>
        </Section>

        <Section title="9. PODACI ZA ISPLATU, BANKARSKI TROŠKOVI I NEAKTIVNOST PUTNIKA">
          <p>Putnik je odgovoran za dostavljanje tačnih i potpunih podataka potrebnih za isplatu.</p>
          <p>Ako je zbog netačnih ili nepotpunih podataka uplata vraćena VGA ili VGA pretrpi dodatne bankarske ili druge neposredne troškove, VGA ima pravo da takve stvarne dodatne troškove odbije od dela Potraživanja koji pripada Putniku.</p>
          <p>Ako Putnik ne dostavi podatke potrebne za isplatu, VGA će preduzeti razumne napore da sa Putnikom stupi u kontakt preko kontakt podataka koje je Putnik dostavio.</p>
          <p>Ako Putnik, uprkos podsetnicima i razumnim pokušajima VGA da sa njim stupi u kontakt, ne dostavi ili ne ispravi podatke potrebne za isplatu, VGA ima pravo da zadrži deo naplaćenog Potraživanja koji bi inače bio isplaćen Putniku.</p>
          <p>U takvom slučaju, nakon što VGA preduzme razumne pokušaje kontaktiranja Putnika i Putnik i dalje ne obezbedi potrebne podatke za isplatu, VGA ima pravo da taj iznos zadrži za sebe.</p>
          <p>Putnik je odgovoran da kontakt podatke koje je dostavio VGA održava ažurnim.</p>
        </Section>

        <Section title="10. DIREKTNA KOMUNIKACIJA I DIREKTNA UPLATA PUTNIKU">
          <p>Nakon zaključenja Ugovora Putnik neće samostalno raspolagati Potraživanjem niti angažovati drugo lice da isto Potraživanje ostvaruje bez saglasnosti VGA.</p>
          <p>Ako Dužnik neposredno kontaktira Putnika, dostavi mu ponudu ili izvrši uplatu, Putnik je dužan da o tome obavesti VGA odmah.</p>
          <p>Direktna uplata Putniku smatra se naplatom Potraživanja u odgovarajućem iznosu.</p>
          <p>Ako prema Ugovoru postoji provizija VGA, Putnik je dužan da tu proviziju plati VGA u roku od 10 dana od prijema direktne uplate.</p>
          <p>Ako direktna uplata sadrži kamatu ili drugi iznos koji prema članu 7 pripada VGA, Putnik je dužan da taj iznos prenese VGA u roku od 10 dana od prijema.</p>
          <p>Putnik nema pravo na dvostruku naplatu istog Potraživanja.</p>
        </Section>

        <Section title="11. SARADNJA PUTNIKA">
          <p>Putnik potvrđuje da su podaci i dokumentacija koje dostavlja VGA tačni, potpuni i istiniti prema njegovom najboljem saznanju.</p>
          <p>Putnik će bez odlaganja dostaviti dodatne podatke i dokumente koje VGA razumno zatraži radi ostvarivanja Potraživanja.</p>
          <p>Putnik potvrđuje da Potraživanje nije prethodno ustupio drugom licu, osim ako je VGA pre zaključenja Ugovora o tome izričito obavestio.</p>
          <p>Putnik je dužan da VGA odmah obavesti o svakoj direktnoj uplati, refundaciji, poravnanju, vaučeru ili drugom obliku namirenja povezanom sa Potraživanjem.</p>
          <p>Ako VGA zbog namerno netačnih podataka, falsifikovanih dokumenata, prikrivene prethodne cesije ili druge namerne povrede obaveza Putnika pretrpi stvarnu štetu ili trošak, VGA može zahtevati naknadu takve štete ili troška.</p>
        </Section>

        <Section title="12. MALOLETNI PUTNIK">
          <p>Kada je Putnik maloletan, Potraživanje pripada maloletnom Putniku, a Ugovor u njegovo ime potpisuje njegov Zakonski zastupnik.</p>
          <p>Zakonski zastupnik potpisivanjem potvrđuje da je ovlašćen da Ugovor zaključi u ime maloletnog Putnika.</p>
          <p>VGA može, kada je to potrebno prema merodavnom pravu ili kada to zahteva Dužnik, sud ili drugi nadležni organ, zatražiti dokaz svojstva Zakonskog zastupnika ili drugu potrebnu saglasnost.</p>
        </Section>

        <Section title="13. PRAVO NA ODUSTANAK">
          <p>Putnik koji ima svojstvo potrošača može odustati od Ugovora u roku od 14 dana od dana njegovog zaključenja, bez navođenja razloga.</p>
          <p>Izjava o odustanku može se poslati na:</p>
          <p><a className={emailClassName} href={`mailto:${supportEmail}`}>{supportEmail}</a></p>
          <p>ili putem drugog kanala koji VGA učini dostupnim za tu svrhu.</p>
          <p>VGA može, u skladu sa Ugovorom, odmah nakon njegovog zaključenja započeti radnje radi provere, ostvarivanja i naplate Potraživanja.</p>
          <p>Sam početak postupanja ne znači automatski da Putnik gubi pravo na odustanak.</p>
          <p>Ako prinudni propis za konkretan ugovorni odnos propisuje dodatne uslove za početak izvršenja tokom roka za odustanak ili prestanak prava na odustanak, primenjuju se ti uslovi.</p>
          <p>Ako Putnik blagovremeno odustane od Ugovora i Potraživanje u tom trenutku još postoji, Potraživanje odnosno njegov nenaplaćeni deo automatski se vraća Putniku bez potrebe za zaključenjem posebnog ugovora o povratnom ustupanju.</p>
          <p>Ako je Potraživanje već konačno naplaćeno, pravnosnažno rešeno ili na drugi način prestalo, ono se povratom ne može ponovo uspostaviti.</p>
        </Section>

        <Section title="14. PRESTANAK POSTUPANJA I AUTOMATSKI POVRAT POTRAŽIVANJA">
          <p>VGA može prestati sa ostvarivanjem celog ili dela Potraživanja ako, između ostalog:</p>
          <ul className={listClassName}>
            <li>nakon dodatne provere proceni da nema razumnu perspektivu uspeha;</li><li>nedostaju potrebni podaci ili dokumenti;</li><li>utvrdi prethodnu cesiju ili prethodnu naplatu;</li><li>Dužnik je insolventan ili naplata nije razumno moguća;</li><li>postoje ozbiljni znaci prevare ili falsifikovane dokumentacije; ili</li><li>postoje druge pravne, procesne ili ekonomske okolnosti zbog kojih VGA smatra da dalje postupanje nije opravdano.</li>
          </ul>
          <p>Kada VGA obavesti Putnika da prestaje sa ostvarivanjem celog ili dela nenaplaćenog Potraživanja, vlasništvo nad tim Potraživanjem odnosno njegovim nenaplaćenim delom automatski se vraća Putniku.</p>
          <p>Za takav povrat nije potrebno zaključiti poseban ugovor niti izdati poseban akt o povratnom ustupanju.</p>
          <p>Isto pravilo primenjuje se kada je zbog prelaska na model mandata/punomoćja potrebno da Putnik ponovo bude poverilac.</p>
          <p>Automatski povrat ne može ponovo uspostaviti Potraživanje koje je već naplaćeno, pravnosnažno rešeno, ugašeno poravnanjem ili na drugi način prestalo.</p>
        </Section>

        <Section title="15. ZAŠTITA LIČNIH PODATAKA">
          <p>VGA obrađuje podatke o ličnosti u skladu sa važećim propisima i Politikom privatnosti dostupnom na letkasni.rs.</p>
          <p>Politika privatnosti uređuje naročito svrhe i pravne osnove obrade, kategorije podataka, primaoce, rokove čuvanja, međunarodne prenose i prava lica na koja se podaci odnose.</p>
        </Section>

        <Section title="16. PROMENE OVIH USLOVA">
          <p>Po pravilu se na Ugovor i Predmet tokom celog njegovog trajanja primenjuje verzija ovih Uslova koja je važila u trenutku zaključenja Ugovora.</p>
          <p>Sama objava nove verzije Uslova na letkasni.rs ne menja Uslove koji se primenjuju na postojeći Predmet.</p>
          <p>Izuzetno, ako VGA iz opravdanih razloga odluči da je određenu izmenu potrebno primeniti i na postojeće Predmete, VGA će o takvoj izmeni prethodno obavestiti Putnika putem e-maila i/ili korisničkog naloga, kada postoji.</p>
          <p>Takva izmena može početi da se primenjuje na postojeći Predmet najranije 7 kalendarskih dana nakon obaveštavanja Putnika.</p>
          <p>Ako Putnik ne prihvata takvu izmenu, može do dana njenog stupanja na snagu obavestiti VGA da želi prestanak Ugovora, nakon čega se na nenaplaćeni deo Potraživanja primenjuju pravila o automatskom povratu iz člana 14.</p>
          <p>Ako VGA Putnika nije obavestila da će se nova verzija Uslova primenjivati na njegov postojeći Predmet, nastavlja da se primenjuje verzija Uslova koja je važila u trenutku zaključenja Ugovora.</p>
          <p>Izmenom ovih Uslova ne može se retroaktivno povećati provizija za Predmet za koji je Ugovor zaključen sa provizijom od 0% tokom promotivnog perioda.</p>
        </Section>

        <Section title="17. REKLAMACIJE NA USLUGU letkasni.rs">
          <p>Ako Putnik ima prigovor na postupanje VGA ili uslugu letkasni.rs, može poslati reklamaciju na:</p>
          <p><a className={emailClassName} href={`mailto:${supportEmail}`}>{supportEmail}</a></p>
          <p>VGA će postupati po reklamaciji u rokovima i na način koji propisuje važeće potrošačko pravo.</p>
          <p>Reklamacija VGA nije isto što i reklamacija avio-prevozniku ili drugom Dužniku u vezi sa Potraživanjem.</p>
          <p>Kada je primenljivo, Putnik može koristiti i vansudsko rešavanje potrošačkog spora pred nadležnim telom u skladu sa važećim propisima.</p>
        </Section>

        <Section title="18. ODGOVORNOST I VIŠA SILA">
          <p>VGA ne garantuje uspeh ili naplatu Potraživanja.</p>
          <p>VGA ne odgovara za kašnjenje ili nemogućnost izvršenja obaveze koje je posledica okolnosti van njene razumne kontrole, uključujući postupanje suda, organa vlasti, Dužnika, banke ili drugog relevantnog trećeg lica, osim u meri u kojoj važeće pravo propisuje drugačije.</p>
          <p>Nijedna odredba ovih Uslova ne isključuje ili ograničava odgovornost koju prema prinudnom pravu nije dopušteno isključiti ili ograničiti.</p>
        </Section>

        <Section title="19. MERODAVNO PRAVO I NADLEŽNOST">
          <p>Na Ugovor i odnos između Putnika i VGA primenjuje se pravo Republike Srbije.</p>
          <p>Ovim izborom prava ne isključuje se primena prinudnih propisa koji se na konkretan odnos primenjuju nezavisno od ugovornog izbora prava.</p>
          <p>Za sporove između Putnika i VGA nadležan je sud koji je nadležan prema važećim propisima.</p>
          <p>Ova odredba sama po sebi ne određuje merodavno pravo niti nadležnost za Potraživanje koje VGA ostvaruje prema Dužniku.</p>
        </Section>

        <Section title="20. JEZIČKA VERZIJA">
          <p>Srpska jezička verzija ovih Uslova predstavlja originalni i merodavni tekst.</p>
          <p>Engleska verzija predstavlja prevod srpske verzije radi lakšeg razumevanja i praktične upotrebe.</p>
          <p>U slučaju bilo kakvog neslaganja, nejasnoće ili razlike u tumačenju između srpske i engleske verzije, primenjuje se srpska verzija, osim ako prinudni propis nalaže drugačije.</p>
        </Section>
      </div>
      <SiteFooter locale="sr" supportEmail={supportEmail} />
    </main>
  );
}
