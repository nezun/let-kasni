import { LegalOperatorContact } from "@/components/legal-operator-contact";
import Link from "next/link";
import { PrivacyServiceOverview } from "@/components/privacy-service-overview";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteOperator } from "@/lib/site-operator";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-bold tracking-[-0.02em] text-[var(--ink)]">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">{children}</div>
    </section>
  );
}

const listClassName = "list-disc space-y-2 pl-5";
const controllerName = "VGA EU CONSULTING DOO";

export default function PrivacyPage() {
  const supportEmail = siteOperator.email.sr;
  const supportPhone = siteOperator.phone;

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32">
      <SiteHeader locale="sr" />
      <div className="mx-auto max-w-5xl space-y-8 px-6 pb-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">Politika privatnosti</h1>
          <p className="max-w-3xl text-sm font-semibold leading-7 text-[var(--ink)]">letkasni.rs / {controllerName}</p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]/80">PP 1.2 | Važi od 09.09.2026.</p>
        </div>

        <Section title="Ukratko">
          <p>Rukovalac je {controllerName}. Ne prodajemo vaše podatke.</p>
          <p>Podatke koristimo da proverimo, preuzmemo, naplatimo i isplatimo vaše konkretno potraživanje, vodimo evidenciju i zaštitimo prava u postupku.</p>
          <p>Relevantne podatke možemo deliti sa avio-prevoznikom, advokatom, sudom ili regulatorom, bankom i potrebnim IT i potpisnim servisima.</p>
          <p>Ponude naših postojećih i budućih proizvoda iz oblasti prava putnika i potrošača šaljemo samo uz vaš poseban pristanak. Pristanak nije uslov za obradu predmeta i možete ga opozvati u svakom trenutku.</p>
          <p>Za sva pitanja, podršku, reklamacije i ostvarivanje prava u vezi sa privatnošću pišite na <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. Za komunikaciju na engleskom koristite <a className="font-medium text-[var(--ink)]" href={`mailto:${siteOperator.email.en}`}>{siteOperator.email.en}</a>.</p>
        </Section>

        <Section title="1. Ko je rukovalac">
          <p>Rukovalac podacima o ličnosti je {controllerName}, Bulevar Nemanjića 1, 18000 Niš, Republika Srbija, PIB {siteOperator.pib}, MB {siteOperator.mb}, koje pruža uslugu letkasni.rs. Registar: APR / Registar privrednih subjekata. Kontakt za privatnost i opšta pitanja: <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>; za komunikaciju na engleskom: <a className="font-medium text-[var(--ink)]" href={`mailto:${siteOperator.email.en}`}>{siteOperator.email.en}</a>. Telefon: <a className="font-medium text-[var(--ink)]" href={`tel:${supportPhone}`}>{supportPhone}</a>.</p>
          <p>Primarno postupamo u skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije. Kada se na konkretnu obradu primenjuju i druga obavezna pravila, uključujući GDPR, poštujemo i ta pravila u njihovom dometu.</p>
          <LegalOperatorContact supportEmail={supportEmail} supportPhone={supportPhone} />
        </Section>

        <Section title="2. Koje podatke obrađujemo">
          <p>Ne prikupljamo sve podatke u svakom predmetu. Prikupljamo ono što je potrebno za konkretnu svrhu.</p>
          <ul className={listClassName}>
            <li>Identitet i kontakt: ime, prezime, datum rođenja kada je potreban za razlikovanje putnika, adresa, e-mail, telefon.</li>
            <li>Putovanje i zahtev: PNR, broj/datum leta, ruta, prevoznik, podaci o poremećaju, booking/boarding dokumentacija, komunikacija sa prevoznikom.</li>
            <li>Dokazi i troškovi: računi, potvrde, fotografije i drugi dokumenti koje dostavite.</li>
            <li>Isplata: ime vlasnika računa, IBAN/broj računa, valuta i evidencija transakcije.</li>
            <li>Elektronsko zaključenje: crtež potpisa, vreme i identifikatori događaja, autentikacioni podaci, IP, osnovni tehnički podaci sesije/uređaja, heš i verzije dokumenata.</li>
            <li>Komunikacija sa nama i reklamacije.</li>
            <li>Tehnički/cookie podaci u meri opisanoj u Podešavanjima privatnosti.</li>
            <li>Posebne vrste podataka (npr. zdravstveno stanje ili invaliditet) samo kada su za konkretan zahtev zaista potrebni i kada postoji odgovarajući pravni osnov.</li>
            <li>Marketinške postavke i dokaz pristanka: kontakt koji ste prijavili, izabrani kanal i obuhvat ponuda, tekst i verzija date saglasnosti, vreme i način prijave i potvrde kontakta, kao i opoziv ili odjava. Marketinšku evidenciju odvajamo od dokumentacije vašeg predmeta.</li>
          </ul>
        </Section>

        <Section title="3. Odakle dobijamo podatke">
          <p>Većinu podataka dobijamo direktno od vas. Kada je potrebno za zahtev, podatke možemo dobiti i od roditelja/staratelja ili drugog uredno ovlašćenog lica, avio-prevoznika, turističke agencije/organizatora, aerodroma, advokata, suda, regulatora, pouzdanog flight-data providera ili javno dostupnog izvora.</p>
        </Section>

        <Section title="4. Zašto ih obrađujemo i na kom osnovu">
          <p>Pravni osnov zavisi od svrhe. Ne tražimo „saglasnost za sve”.</p>
          <ul className={listClassName}>
            <li>Zaključenje i izvršenje ugovora: provera predmeta, generisanje i dokazivanje Assignment Agreement-a, komunikacija, naplata i isplata.</li>
            <li>Zakonska obaveza: računovodstvo, porezi, postupanje po obavezujućim nalozima suda ili organa i druge obaveze koje se na nas odnose.</li>
            <li>Legitimni interes: bezbednost platforme, sprečavanje prevare i dvostruke naplate, unapređenje procesa bez zadiranja u prava korisnika, kao i uspostavljanje, ostvarivanje i odbrana pravnih zahteva.</li>
            <li>Pristanak: slanje promotivnih poruka o proizvodima i uslugama VGA iz obuhvata koji ste prihvatili, kao i zasebno izabrana neobavezna analitika i oglašavanje. Direktni marketing šaljemo samo uz prethodni pristanak za odgovarajući kanal i svrhu. Pristanak možete opozvati u svakom trenutku.</li>
            <li>Posebni podaci: samo kada je obrada dopuštena posebnim pravilom, npr. kada je neophodna za uspostavljanje, ostvarivanje ili odbranu pravnog zahteva, ili uz izričit pristanak kada je to odgovarajući osnov.</li>
          </ul>
          <p>Podaci potrebni za proveru, zaključenje i izvršenje ugovora ili isplatu koriste se na odgovarajućem ugovornom ili drugom zakonskom osnovu, a ne na osnovu marketinškog pristanka. Ako ne dostavite podatke neophodne za konkretnu radnju, možda nećemo moći da proverimo ili ostvarimo zahtev, zaključimo ugovor ili izvršimo isplatu; objasnićemo koji podatak nedostaje i zašto je potreban. Odbijanje marketinga nema takve posledice. Ograničenu evidenciju pristanka i odjave čuvamo radi dokazivanja zakonitosti obrade, zaštite pravnih zahteva i poštovanja vašeg izbora da više ne primate ponude.</p>
        </Section>

        <Section title="5. Sa kim delimo podatke">
          <p>Podatke ne prodajemo niti iznajmljujemo. Delimo samo ono što je potrebno.</p>
          <ul className={listClassName}>
            <li>Avio-prevoznici, organizatori putovanja i druga lica protiv kojih se ostvaruje označeno Potraživanje.</li>
            <li>Advokati i advokatske kancelarije angažovani za predmet; njihov privacy status može biti obrađivač ili samostalni rukovalac, zavisno od uloge i važećeg prava.</li>
            <li>Sudovi, Direktorat civilnog vazduhoplovstva, drugi regulatori, izvršitelji i nadležni organi kada je to potrebno ili obavezno.</li>
            <li>Banke i platni servisi radi isplate.</li>
            <li>Hosting/cloud, e-mail, e-signature/authentication, flight-data, sigurnosni i drugi IT provideri koji rade po našim uputstvima kada su obrađivači.</li>
            <li>Računovođe, revizori i drugi profesionalni savetnici kada je to razumno potrebno.</li>
            <li>Analytics/advertising partneri samo prema Podešavanjima privatnosti i vašem izboru kada je pristanak potreban.</li>
          </ul>
          <p>Pružalac usluge slanja poruka može obrađivati kontakt i postavke prijave po našim uputstvima. Pristanak na ponude VGA ne daje drugim privrednim društvima, povezanim licima ili partnerima pravo da koriste vaš kontakt za sopstveni direktni marketing. Takva nova obrada zahtevala bi posebno obaveštenje i prethodni pristanak kada je potreban, uz jasno navođenje drugog rukovaoca. Sama činjenica da dva brenda imaju istog vlasnika ne znači da je pristanak prenosiv između njihovih operatora.</p>
        </Section>

        <Section title="6. Prenos podataka u druge države">
          <p>Radi ostvarivanja potraživanja i korišćenja potrebnih tehničkih usluga, relevantni podaci mogu biti dostupni prevoznicima, advokatima ili pružaocima usluga u drugim državama. Međunarodni prenos može obuhvatati i udaljeni pristup podacima, ne samo lokaciju servera.</p>
          <p>Za konkretan prenos proveravamo postojanje primerenog nivoa zaštite prema merodavnom pravu. Ako takav osnov ne postoji, prenos se sprovodi uz odgovarajuće pravno važeće mere zaštite, kao što su primenljive ugovorne klauzule i potrebne dopunske mere, ili na osnovu zakonom dopuštenog izuzetka čiji su uslovi ispunjeni u konkretnom slučaju. Izuzetke ne koristimo kao opštu zamenu za zaštitu pri redovnom korišćenju cloud ili marketinških servisa.</p>
          <p>Kada se primenjuje GDPR, njegove uslove međunarodnog prenosa proveravamo odvojeno od uslova srpskog ZZPL-a. Marketinški ili cookie pristanak sam po sebi nije opšta dozvola za svaki međunarodni prenos.</p>
          <p>Informacije o stvarnim primaocima ili kategorijama primalaca, državama, konkretnom osnovu prenosa i načinu pribavljanja kopije primenjenih zaštitnih mera možete dobiti na <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. Kopiju dostavljamo uz potrebnu zaštitu poverljivih podataka i prava drugih lica.</p>
          <PrivacyServiceOverview locale="sr" />
        </Section>

        <Section title="7. Koliko dugo čuvamo podatke">
          <p>Rokovi su vezani za svrhu, zakonske obaveze i potrebu da možemo dokazati ugovor i pravni postupak. Ako je predmet aktivan ili postoji spor, podatke čuvamo duže samo koliko je potrebno za taj spor.</p>
          <ul className={listClassName}>
            <li>Claim, ugovor, dokazni paket i ključna komunikacija: tokom predmeta i do 5 godina nakon zatvaranja, osim ako duži/kraći rok nalaže zakon ili konkretan spor.</li>
            <li>Finansijska/računovodstvena dokumentacija: do 10 godina kada je takav rok potreban prema propisima o računovodstvu/porezima.</li>
            <li>Nepotpun intake bez zaključenog ugovora: najduže 12 meseci od poslednje aktivnosti, osim ako tražite ranije brisanje i nema drugog pravnog osnova.</li>
            <li>Bezbednosni i tehnički logovi: tipično do 12 meseci, osim ako su potrebni za istragu incidenta ili pravni zahtev.</li>
            <li>Kolačići: prema periodu navedenom u Podešavanjima privatnosti.</li>
          </ul>
          <p>Marketinški kontakt koristimo do opoziva pristanka, a najduže dve godine od prijave ili poslednje izričite potvrde da želite da nastavite prijem ponuda. Samo slanje, isporuka ili automatski evidentirano otvaranje poruke ne produžavaju taj period. Po isteku prestajemo sa marketinškim slanjem, osim ako ste u međuvremenu ponovo potvrdili odgovarajući pristanak.</p>
          <p>Ograničen dokaz prethodnog pristanka i njegovog opoziva, izdvojen iz aktivne marketinške baze, čuvamo samo koliko je potrebno za dokazivanje zakonitosti obrade i pravne zahteve, najduže pet godina od prestanka slanja, osim dok traje konkretan spor ili postoji druga zakonska obaveza. Minimalan zapis zabrane slanja možemo čuvati dok je potreban da vaš kontakt ne bude ponovo uključen u ponude, uz najmanje godišnju proveru neophodnosti. Ovi zapisi se ne koriste za oglašavanje.</p>
          <p>Odjava sa marketinga ne zahteva automatsko brisanje dokumentacije predmeta koju po drugom osnovu moramo ili smemo da čuvamo. Isto tako, čuvanje predmeta nije dozvola za dalje slanje ponuda.</p>
        </Section>

        <Section title="8. Bezbednost">
          <p>Koristimo odgovarajuće tehničke i organizacione mere, uključujući kontrolu pristupa po potrebi-posla, enkripciju u prenosu, zaštitu naloga, logovanje relevantnih bezbednosnih događaja, rezervne kopije i ugovorne obaveze poverljivosti za pružaoce usluga. Nijedan sistem nije apsolutno bezbedan, ali mere prilagođavamo riziku i vrsti podataka.</p>
        </Section>

        <Section title="9. Vaša prava">
          <p>U skladu sa primenljivim pravom možete tražiti pristup i kopiju podataka, ispravku, brisanje, ograničenje obrade i prenosivost kada su ispunjeni zakonski uslovi. Možete uložiti prigovor na obradu zasnovanu na legitimnom interesu, iz razloga koji se odnose na vašu posebnu situaciju.</p>
          <p>U svakom trenutku, bez obrazloženja, možete zahtevati prestanak direktnog marketinga, uključujući sa njim povezano profilisanje. Nakon opoziva pristanka ili takvog prigovora vaše podatke više ne koristimo za tu svrhu. Opoziv ne utiče na zakonitost ranije obrade.</p>
          <p>Odjava je dostupna u marketinškoj poruci, a zahtev za ostvarivanje prava možete poslati na <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. Za odjavu ne tražimo otvaranje naloga niti dodatne lične dokumente. Dodatnu srazmernu proveru identiteta možemo tražiti kada je potrebna radi zaštite podataka, naročito pre njihovog otkrivanja ili brisanja.</p>
          <p>Po ZZPL-u postupamo bez nepotrebnog odlaganja, najkasnije u roku od 30 dana od prijema zahteva. Ako su ispunjeni zakonski uslovi, rok može biti produžen za još 60 dana, o čemu vas, uz razloge, obaveštavamo u prvih 30 dana. Kada se primenjuje GDPR, odgovarajući rok je jedan mesec, uz moguće produženje za još dva meseca pod njegovim uslovima. Ovi rokovi ne odlažu prestanak marketinškog slanja nakon odjave. Postupanje je, po pravilu, besplatno.</p>
          <p>Ako zahtevu ne možemo udovoljiti, objasnićemo razloge i obavestiti vas o raspoloživim pravnim sredstvima.</p>
        </Section>

        <Section title="10. Automatizacija i procena zahteva">
          <p>Automatizovane alate koristimo kao pomoć pri obradi podataka o letu, izračunavanju vremena, udaljenosti, mogućih iznosa i rokova i pripremi preliminarne procene. Ne donosimo isključivo automatizovane konačne odluke koje proizvode pravno dejstvo ili na sličan način značajno utiču na vas. Takvu odluku prethodno stvarno razmatra ovlašćeno lice, koje može preispitati podatke i promeniti predloženi ishod. Sporan ili negativan rezultat možete osporiti i zatražiti ljudsku proveru preko našeg kontakta.</p>
          <p>Za izbor marketinških primalaca koristimo prijavljene preference, jezik i obuhvat pristanka, a ne zdravstvene podatke, dokumentaciju deteta, sadržinu spora ili podatke o isplati.</p>
        </Section>

        <Section title="11. Deca i zastupanje drugog lica">
          <p>Maloletno lice ne zaključuje samostalno Ugovor o ustupanju preko letkasni.rs. Za claim maloletnika podatke dostavlja i ugovorne radnje preduzima roditelj, staratelj ili drugo lice koje ima odgovarajuće ovlašćenje. Po potrebi možemo tražiti dokaz ovlašćenja. Podatke deteta ograničavamo na ono što je potrebno za predmet.</p>
          <p>Podatke maloletnih putnika ne uključujemo u direktni marketing. Roditelj ili drugi punoletni zakonski zastupnik može se posebno prijaviti za ponude u svoje ime i sa svojim kontaktom. Potpisivanje ugovora za dete, dostavljanje detetovih podataka ili zastupanje drugog putnika ne predstavljaju marketinški pristanak tog lica.</p>
        </Section>

        <Section title="12. Ponude drugih proizvoda, marketing, kolačići i slične tehnologije">
          <h3 id="article-12" className="scroll-mt-28 font-bold text-[var(--ink)]">12.1. Ponude VGA i budući proizvodi</h3>
          <p>Uz vaš poseban pristanak možemo vam slati novosti i ponude o postojećim i budućim proizvodima i uslugama VGA EU CONSULTING DOO u oblasti ostvarivanja i zaštite prava putnika i potrošača, uključujući digitalne alate za te namene i usluge pod drugim brendovima istog društva. Pri prijavi jasno navodimo rukovaoca, obuhvat ponuda i kanal komunikacije.</p>
          <p>Pristanak na taj obuhvat ne daje dozvolu za ponude iz nepovezanih oblasti niti za samostalan marketing druge firme. Pre takvog proširenja tražićemo novi odgovarajući pristanak. Novi proizvod u već prihvaćenom obuhvatu ne znači sam po sebi promenu svrhe. U poruci jasno označavamo VGA kao pošiljaoca ili društvo u čije ime se ponuda šalje.</p>
          <h3 className="font-bold text-[var(--ink)]">12.2. Vaš izbor i odjava</h3>
          <p>Prijava je dobrovoljna i unapred neoznačena. Trenutno nudimo prijavu za e-mail ponude. Eventualni SMS, WhatsApp ili promotivni pozivi zahtevali bi zaseban izbor odgovarajućeg kanala pre takvog slanja ili pozivanja. Dostavljanje telefona radi predmeta nije takav izbor.</p>
          <p>Saglasnost ne proizlazi iz prihvatanja TOS-a, ove Politike, potpisivanja ugovora, ranijeg korišćenja usluge ili ćutanja. Odbijanje ili opoziv ne utiču na obradu i isplatu predmeta. Ne morate primati ponude da biste koristili uslugu.</p>
          <p>U svakom marketinškom e-mailu omogućavamo jednostavnu besplatnu odjavu bez logovanja. Odjava za e-mail ponude VGA obuhvata sve njene brendove u toj prijavi. Možete nam pisati i na <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. Servisne poruke koje su potrebne za vaš predmet nastavljaju se na odgovarajućem osnovu i posle odjave; ne koristimo ih da prikrijemo reklamne ponude.</p>
          <p><Link className="font-semibold text-[var(--ink)] underline" href="/email-offers">Upravljanje e-mail ponudama</Link></p>
          <h3 className="font-bold text-[var(--ink)]">12.3. Kolačići i merenje oglašavanja</h3>
          <p>Neophodne tehnologije koristimo za rad sajta, bezbednost i pamćenje vašeg izbora. Neobaveznu analitiku i oglašavanje birate odvojeno u Podešavanjima privatnosti; odbijanje ne sprečava slanje zahteva.</p>
          <p>Kada su ove funkcije uključene i pristanete na odgovarajuću kategoriju, Google Analytics može se koristiti za analitiku, a Meta Pixel za merenje oglašavanja. Ne aktiviraju se pre tog izbora. Uz izbor oglašavanja, Meta Conversions API može serverski primiti dozvoljene tehničke podatke o događaju, kao i hešovane vrednosti kontakta kada je takva obrada obuhvaćena vašim izborom. Hešovanje ne čini te podatke anonimnim: mogu služiti povezivanju događaja sa korisnikom platforme. Bankovni podaci, identifikacioni dokumenti, zdravstveni podaci, sadržina podnesaka i podaci maloletnih putnika ne šalju se tim alatima.</p>
          <p>Izbor oglašavanja ne predstavlja pristanak na e-mail ponude, niti prijava za ponude aktivira analitiku ili oglašavanje. Izbor menjate ili povlačite preko Podešavanja privatnosti u podnožju. Posle povlačenja zaustavljamo novo odgovarajuće slanje i uklanjamo ili onemogućavamo neobavezne kolačiće koje tehnički kontrolišemo. Podatke koje je treća strana već zakonito primila ne možemo samim klikom retroaktivno izbrisati; možete ostvariti prava opisana u članu 9.</p>
          <h3 className="font-bold text-[var(--ink)]">12.4. Dokaz izbora</h3>
          <p>Čuvamo odvojenu evidenciju prijave i odjave za direktni marketing i evidenciju izbora neobaveznih tehnologija. Promena ove Politike ne uključuje prethodne korisnike automatski u novu marketinšku svrhu.</p>
        </Section>

        <Section title="13. Pritužba Povereniku">
          <p>Ako smatrate da je obrada nezakonita, možete nam se prvo obratiti na <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>, a imate i pravo da podnesete pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti: Bulevar kralja Aleksandra 15, 11120 Beograd, <a className="font-medium text-[var(--ink)]" href="mailto:office@poverenik.rs">office@poverenik.rs</a>, <a className="font-medium text-[var(--ink)]" href="tel:+381113408900">+381 11 3408 900</a>, <a className="font-medium text-[var(--ink)]" href="https://www.poverenik.rs">poverenik.rs</a>.</p>
          <p>Niste dužni da se prvo obratite nama da biste podneli pritužbu nadležnom organu.</p>
        </Section>

        <Section title="14. Izmene ove Politike">
          <p>Politiku možemo ažurirati zbog promene zakona, tehnologije ili načina obrade. Na sajtu objavljujemo datum verzije. Ako promena bitno utiče na vaše pravo ili uvodi novu obradu za koju je potreban pristanak, obavestićemo vas i pribaviti novi pristanak kada je to obavezno.</p>
          <p>Objavljivanje nove verzije ne zamenjuje pristanak na novu svrhu, kanal ili drugog rukovaoca. Ranije date saglasnosti ne proširujemo retroaktivno. O materijalnim promenama obaveštavamo lica na koja se odnose, pre nove obrade kada je to potrebno.</p>
        </Section>
      </div>
      <SiteFooter locale="sr" supportEmail={supportEmail} />
    </main>
  );
}
