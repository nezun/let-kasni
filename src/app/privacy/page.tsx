import { LegalOperatorContact } from "@/components/legal-operator-contact";
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

export default function PrivacyPage() {
  const supportEmail = siteOperator.email.sr;
  const supportPhone = siteOperator.phone;

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32">
      <SiteHeader locale="sr" />
      <div className="mx-auto max-w-5xl space-y-8 px-6 pb-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">Politika privatnosti</h1>
          <p className="max-w-3xl text-sm font-semibold leading-7 text-[var(--ink)]">LETKASNI / {siteOperator.name}</p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]/80">Verzija 1.1 | Važi od 08.09.2026.</p>
        </div>

        <Section title="Ukratko">
          <p>Rukovalac je {siteOperator.name}. Ne prodajemo vaše podatke.</p>
          <p>Podatke koristimo da proverimo, preuzmemo, naplatimo i isplatimo vaše konkretno potraživanje, vodimo evidenciju i zaštitimo prava u postupku.</p>
          <p>Relevantne podatke možemo deliti sa avio-prevoznikom, advokatom, sudom ili regulatorom, bankom i potrebnim IT i potpisnim servisima.</p>
          <p>Marketing i neobavezna analitika i oglašavanje nisu uslov za obradu zahteva.</p>
          <p>Za sva pitanja, podršku, reklamacije i ostvarivanje prava u vezi sa privatnošću pišite na <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. Za komunikaciju na engleskom koristite <a className="font-medium text-[var(--ink)]" href={`mailto:${siteOperator.email.en}`}>{siteOperator.email.en}</a>.</p>
        </Section>

        <Section title="1. Ko je rukovalac">
          <p>Rukovalac podacima o ličnosti je {siteOperator.name}, {siteOperator.address}, {siteOperator.country.sr}, PIB {siteOperator.pib}, MB {siteOperator.mb}, koje pruža uslugu LETKASNI na letkasni.rs. Registar: {siteOperator.registry.sr}. Kontakt za privatnost i opšta pitanja: <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>; za komunikaciju na engleskom: <a className="font-medium text-[var(--ink)]" href={`mailto:${siteOperator.email.en}`}>{siteOperator.email.en}</a>. Telefon: <a className="font-medium text-[var(--ink)]" href={`tel:${supportPhone}`}>{supportPhone}</a>.</p>
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
            <li>Pristanak: direktni marketing i neobavezni analytics/advertising kolačići kada je pristanak potreban; pristanak možete povući u svakom trenutku.</li>
            <li>Posebni podaci: samo kada je obrada dopuštena posebnim pravilom, npr. kada je neophodna za uspostavljanje, ostvarivanje ili odbranu pravnog zahteva, ili uz izričit pristanak kada je to odgovarajući osnov.</li>
          </ul>
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
        </Section>

        <Section title="6. Prenos podataka u druge države">
          <p>Claim može zahtevati komunikaciju sa stranim avio-prevoznikom, advokatom ili servisom, pa podaci mogu biti preneti van Srbije. Takav prenos sprovodimo samo kada postoji dopušten pravni mehanizam i odgovarajuće mere zaštite prema srpskom ZZPL, a kada je primenljiv GDPR i prema njegovim pravilima. Prenos ograničavamo na podatke koji su potrebni konkretnoj svrsi.</p>
        </Section>

        <Section title="7. Koliko dugo čuvamo podatke">
          <p>Rokovi su vezani za svrhu, zakonske obaveze i potrebu da možemo dokazati ugovor i pravni postupak. Ako je predmet aktivan ili postoji spor, podatke čuvamo duže samo koliko je potrebno za taj spor.</p>
          <ul className={listClassName}>
            <li>Claim, ugovor, dokazni paket i ključna komunikacija: tokom predmeta i do 5 godina nakon zatvaranja, osim ako duži/kraći rok nalaže zakon ili konkretan spor.</li>
            <li>Finansijska/računovodstvena dokumentacija: do 10 godina kada je takav rok potreban prema propisima o računovodstvu/porezima.</li>
            <li>Nepotpun intake bez zaključenog ugovora: najduže 12 meseci od poslednje aktivnosti, osim ako tražite ranije brisanje i nema drugog pravnog osnova.</li>
            <li>Marketing: do povlačenja pristanka, a najduže 2 godine od poslednje relevantne interakcije ako pre toga ne obnovite odnos.</li>
            <li>Bezbednosni i tehnički logovi: tipično do 12 meseci, osim ako su potrebni za istragu incidenta ili pravni zahtev.</li>
            <li>Kolačići: prema periodu navedenom u Podešavanjima privatnosti.</li>
          </ul>
        </Section>

        <Section title="8. Bezbednost">
          <p>Koristimo odgovarajuće tehničke i organizacione mere, uključujući kontrolu pristupa po potrebi-posla, enkripciju u prenosu, zaštitu naloga, logovanje relevantnih bezbednosnih događaja, rezervne kopije i ugovorne obaveze poverljivosti za pružaoce usluga. Nijedan sistem nije apsolutno bezbedan, ali mere prilagođavamo riziku i vrsti podataka.</p>
        </Section>

        <Section title="9. Vaša prava">
          <p>U skladu sa primenljivim pravom možete tražiti pristup podacima, ispravku, brisanje, ograničenje obrade, prenosivost kada su uslovi ispunjeni, kao i uložiti prigovor na obradu zasnovanu na legitimnom interesu. Kada se obrada zasniva na pristanku, možete ga povući u svakom trenutku bez uticaja na raniju zakonitu obradu.</p>
          <p>Zahtev pošaljite na <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. Možemo tražiti razumnu proveru identiteta da podatke ne bismo otkrili pogrešnom licu. Odgovaramo u rokovima propisanim važećim pravom.</p>
        </Section>

        <Section title="10. Automatizacija i procena zahteva">
          <p>Koristimo automatizovane alate za izračunavanje vremena, udaljenosti, iznosa, rokova i preliminarnu procenu mogućih pravnih grana. U verziji usluge na koju se ova Politika odnosi ne donosimo isključivo automatizovanu odluku koja sama proizvodi pravno dejstvo ili slično značajno utiče na vas bez mogućnosti odgovarajuće ljudske provere. Sporan ili negativan rezultat možete tražiti da pregleda osoba.</p>
        </Section>

        <Section title="11. Deca i zastupanje drugog lica">
          <p>Maloletno lice ne zaključuje samostalno Ugovor o ustupanju preko LETKASNI-ja. Za claim maloletnika podatke dostavlja i ugovorne radnje preduzima roditelj, staratelj ili drugo lice koje ima odgovarajuće ovlašćenje. Po potrebi možemo tražiti dokaz ovlašćenja. Podatke deteta ograničavamo na ono što je potrebno za predmet.</p>
        </Section>

        <Section title="12. Marketing, cookies i slične tehnologije">
          <p>Statusne poruke o vašem predmetu, zahtev za dokumente i servisna obaveštenja nisu marketing. Direktni marketing šaljemo samo kada postoji odgovarajući pravni osnov i uvek omogućavamo jednostavno odjavljivanje.</p>
          <p>Neophodni kolačići i slične tehnologije koriste se za rad sajta, bezbednost sesije i osnovnu funkcionalnost. Neobavezna analitika i oglašavanje aktiviraju se prema vašem izboru u Podešavanjima privatnosti.</p>
          <p>Kada su odgovarajuće funkcije uključene i izaberete odgovarajuću kategoriju, sajt može koristiti Google Analytics za analitiku i Meta Pixel za merenje uspeha oglasa. Ovi alati se ne učitavaju pre vašeg izbora.</p>
          <p>Ako izaberete marketing kategoriju, Meta Conversions API može primiti tehničke podatke o uspešno primljenom zahtevu, kao i jednosmerno hešovane vrednosti e-mail adrese i telefona kada ih unesete. Token za pristup ovom servisu ne izlaže se pregledaču.</p>
          <p>Analitiku i marketing birate odvojeno. Izbor možete promeniti ili povući preko opcije „Podešavanja privatnosti” u podnožju sajta. Zaustavljanje novih događaja nakon povlačenja izbora ne znači automatsko brisanje svih ranije postavljenih kolačića iz pregledača.</p>
        </Section>

        <Section title="13. Pritužba Povereniku">
          <p>Ako smatrate da je obrada nezakonita, možete nam se prvo obratiti na <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>, a imate i pravo da podnesete pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti: Bulevar kralja Aleksandra 15, 11120 Beograd, <a className="font-medium text-[var(--ink)]" href="mailto:office@poverenik.rs">office@poverenik.rs</a>, <a className="font-medium text-[var(--ink)]" href="tel:+381113408900">+381 11 3408 900</a>, <a className="font-medium text-[var(--ink)]" href="https://www.poverenik.rs">poverenik.rs</a>.</p>
        </Section>

        <Section title="14. Izmene ove Politike">
          <p>Politiku možemo ažurirati zbog promene zakona, tehnologije ili načina obrade. Na sajtu objavljujemo datum verzije. Ako promena bitno utiče na vaše pravo ili uvodi novu obradu za koju je potreban pristanak, obavestićemo vas i pribaviti novi pristanak kada je to obavezno.</p>
        </Section>
      </div>
      <SiteFooter locale="sr" supportEmail={supportEmail} />
    </main>
  );
}
