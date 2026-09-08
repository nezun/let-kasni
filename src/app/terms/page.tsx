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

export default function TermsPage() {
  const supportEmail = siteOperator.email.sr;
  const supportPhone = siteOperator.phone;

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32">
      <SiteHeader locale="sr" />
      <div className="mx-auto max-w-5xl space-y-8 px-6 pb-16">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">
            Opšti uslovi poslovanja
          </h1>
          <p className="max-w-3xl text-sm font-semibold leading-7 text-[var(--ink)]">
            LETKASNI / {siteOperator.name}
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]/80">
            Verzija 1.1 | Važi od 08.09.2026.
          </p>
        </div>

        <Section title="Ukratko">
          <p>0% provizije. Ne umanjujemo vašu naplaćenu naknadu.</p>
          <p>Ustupate konkretno potraživanje LETKASNI-ju, koji ga ostvaruje u svoje ime kao poverilac i snosi redovan troškovni rizik tog postupka.</p>
          <p>Ako je potrebno da vi budete tužilac, to se ne aktivira automatski: prvo vraćamo potraživanje i tražimo novi, poseban dokument.</p>
          <p>Vaučer ili smanjenje vašeg osnovnog novčanog iznosa ne prihvatamo bez vaše saglasnosti.</p>
          <p>Ugovorno imate 14 dana za odustanak bez naknade.</p>
        </Section>

        <Section title="1. Ko smo mi i kada se ovi Uslovi primenjuju">
          <p>
            LETKASNI je usluga društva {siteOperator.name}, {siteOperator.address}, {siteOperator.country.sr}, PIB {siteOperator.pib}, MB {siteOperator.mb} („LETKASNI”, „mi”). Registar: {siteOperator.registry.sr}. Kontakt za korisnike, reklamacije i odustanak:{" "}
            <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>; za komunikaciju na engleskom:{" "}
            <a className="font-medium text-[var(--ink)]" href={`mailto:${siteOperator.email.en}`}>{siteOperator.email.en}</a>; telefon:{" "}
            <a className="font-medium text-[var(--ink)]" href={`tel:${supportPhone}`}>{supportPhone}</a>.
          </p>
          <p>Ovi Opšti uslovi poslovanja („Uslovi”) uređuju odnos između LETKASNI-ja i fizičkog lica koje koristi uslugu („Putnik”) kada Putnik potpisuje Ugovor o ustupanju potraživanja ili drugi izričito ponuđeni dokument. Za svaki konkretan Claim ID važi verzija Uslova prihvaćena u trenutku zaključenja; kasnija izmena sajta ne menja već zaključeni ugovor.</p>
          <LegalOperatorContact supportEmail={supportEmail} supportPhone={supportPhone} />
        </Section>

        <Section title="2. Pojmovi koje koristimo">
          <p>„Potraživanje” je konkretno prenosivo novčano pravo opisano u Ugovoru o ustupanju.</p>
          <p>„Putnička naplata” je novac koji ekonomski pripada Putniku: standardizovana naknada, refundacija, nadoknada njegovih troškova/štete i zatezna kamata, u meri u kojoj su uključeni u konkretan Ugovor.</p>
          <p>„Troškovi postupka” su sudske takse, advokatske nagrade, troškovi izvršenja, prevođenja i drugi troškovi nastali radi ostvarivanja Potraživanja.</p>
          <p>„Pravni postupak” obuhvata postupanje pred sudom, nadležnim organom ili drugim telom, kao i angažovanje advokata kada je to potrebno.</p>
        </Section>

        <Section title="3. Kako počinje naš odnos">
          <p>Možete prvo koristiti besplatnu proveru leta ili dostaviti podatke radi procene. Takva procena nije garancija uspeha i sama po sebi ne znači da je LETKASNI prihvatio Potraživanje.</p>
          <p>Kada za konkretni predmet generišemo Ugovor o ustupanju, taj dokument sadrži Claim ID i opis Potraživanja koje prihvatamo. Ugovor i prenos nastaju kada primimo vaš elektronski potpis, osim ako u dokumentu izričito piše drugačije.</p>
          <p>Pre potpisa omogućavamo vam da pregledate i ispravite podatke, pročitate Ugovor i ovu verziju Uslova i sačuvate dokumente. Nakon potpisa bez odlaganja šaljemo potvrdu i dokumente na trajnom nosaču podataka.</p>
        </Section>

        <Section title="4. Šta LETKASNI radi">
          <p>Kada je Potraživanje ustupljeno, LETKASNI ga ostvaruje u svoje ime i bira razuman način naplate. To može uključivati reklamaciju prevozniku, komunikaciju i pregovore, obraćanje regulatoru ili drugom telu, angažovanje advokata, tužbu, pravni lek, izvršenje i poravnanje.</p>
          <ul className={listClassName}>
            <li>Ne garantujemo da će zahtev biti uspešan ili naplaćen.</li>
            <li>Možemo koristiti pouzdane podatke o letovima i druge izvore za proveru činjenica.</li>
            <li>Ako je potrebno dodatno ovlašćenje, dokaz identiteta ili poseban dokument, tražićemo samo ono što je razumno potrebno konkretnom predmetu.</li>
            <li>Nećemo prihvatiti vaučer ili drugo nenovčano poravnanje bez vaše posebne saglasnosti.</li>
            <li>Nećemo bez vaše posebne saglasnosti prihvatiti novčano poravnanje koje vam daje manje od osnovnog iznosa prikazanog u Ugovoru o ustupanju.</li>
          </ul>
        </Section>

        <Section title="5. Advokat, sud i troškovni rizik">
          <p>Ako je potrebna pravna radnja, LETKASNI može angažovati advokata ili advokatsku kancelariju. U cesionom modelu advokat zastupa LETKASNI kao vlasnika Potraživanja, a ne Putnika. LETKASNI nije advokatska kancelarija.</p>
          <p>LETKASNI snosi redovne Troškove postupka koje je sam odlučio da preduzme kao poverilac, uključujući rizik da određeni troškovi ne budu dosuđeni ili naplaćeni. Putnik ne plaća LETKASNI-ju takve troškove ako zahtev ne uspe.</p>
          <p>Ako konkretna jurisdikcija ili procesna situacija zahteva da Putnik ponovo bude titular ili stranka, LETKASNI neće to tretirati kao automatski „fallback”. Najpre ćemo dokumentovati povrat Potraživanja i Putniku dati jasan novi dokument koji objašnjava ko je stranka, ko je advokatov klijent i ko snosi eventualni troškovni rizik. Bez tog novog dokumenta model se ne menja.</p>
        </Section>

        <Section title="6. Vaše obaveze">
          <p>Da bismo mogli da radimo, potrebno je da nam pružite tačne i potpune informacije i, kada ih imate, relevantne dokumente.</p>
          <ul className={listClassName}>
            <li>Ne ustupajte isto Potraživanje drugom licu i ne zaključujte paralelno poravnanje za isti deo Potraživanja.</li>
            <li>Prosledite nam relevantnu komunikaciju, ponudu ili uplatu prevoznika u roku od 5 radnih dana od saznanja.</li>
            <li>Ne morate prekinuti svaku komunikaciju sa prevoznikom o drugim pitanjima (npr. prtljag, rezervacija, bezbednost, privatnost) koja nisu obuhvaćena ustupljenim Potraživanjem.</li>
            <li>Ako se podaci promene ili saznate da je deo zahteva već isplaćen, obavestite nas bez odlaganja.</li>
            <li>Ne dostavljajte falsifikovane ili namerno obmanjujuće podatke ili dokumente.</li>
          </ul>
        </Section>

        <Section title="7. Direktna uplata, poravnanje i sprečavanje dvostruke naplate">
          <p>Ako prevoznik nakon prenosa Potraživanja uplati novac neposredno vama, o tome nas obavestite i dostavite dokaz. Takva uplata se, do njenog stvarnog obima, računa kao naplata za vas; LETKASNI neće pokušati da naplati istu glavnicu drugi put.</p>
          <p>Ako se uplata ne može pouzdano povezati sa ustupljenim Potraživanjem, predmet ostaje na ručnoj proveri dok se osnov i iznos ne razjasne. Prihvatanje refundacije, vaučera ili poravnanja po drugom osnovu ne znači automatski odricanje od svakog drugog prava.</p>
        </Section>

        <Section title="8. Cena usluge, pripadnost naplaćenih iznosa i isplata">
          <p>Naknada koju Putnik plaća LETKASNI-ju iznosi 0 RSD i 0% od Putničke naplate. Ne odbijamo proviziju od vaše standardizovane naknade, refundacije, nadoknade troškova/štete ili zatezne kamate koja je naplaćena na te iznose.</p>
          <p>Troškovi postupka koje sud ili druga strana dosudi ili plati zbog radnji LETKASNI-ja/angažovanog advokata nisu deo Putničke naplate i mogu pripasti LETKASNI-ju i/ili advokatu. Oni se ne odbijaju od Putničke naplate.</p>
          <p>Kada primimo i pouzdano identifikujemo Putničku naplatu i imamo potpune podatke za isplatu, isplatićemo vam pripadajući iznos najkasnije u roku od 10 radnih dana. Ako su podaci za račun pogrešni ili nepotpuni, kontaktiraćemo vas; vaše pravo na novac ne prestaje samo zato što niste odmah dostavili ispravan račun.</p>
          <p>Bankarske ili konverzione troškove koji nastanu zbog izričitog zahteva Putnika za neuobičajen način isplate možemo odbiti samo ako smo ih unapred jasno prikazali i Putnik ih je prihvatio.</p>
        </Section>

        <Section title="9. Odustanak u prvih 14 dana">
          <p>Bez obzira na to kako se konkretni odnos kvalifikuje po prinudnom potrošačkom pravu, LETKASNI vam ugovorno daje 14 dana od zaključenja Ugovora da odustanete bez navođenja razloga i bez naknade LETKASNI-ju.</p>
          <p>Odustanak možete poslati na <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a> ili kroz korisnički interfejs. Ako omogućimo elektronski obrazac, potvrdićemo prijem bez odlaganja na trajnom nosaču podataka.</p>
          <p>Na vaš poseban, unapred neoznačen zahtev možemo početi vansudske radnje odmah. Sam početak rada ne znači da gubite ugovorno pravo iz ovog člana. Ako je pre isteka 14 dana potrebno podneti tužbu radi očuvanja roka ili drugog ozbiljnog razloga, tražićemo posebno izričito odobrenje za takvu radnju.</p>
          <p>Ako je Potraživanje do trenutka prijema odustanka već neopozivo u celosti naplaćeno ili je zaključeno poravnanje koje više ne može biti opozvano, izvršićemo obračun i isplatu umesto povratnog prenosa već ugašenog Potraživanja.</p>
        </Section>

        <Section title="10. Raskid posle 14 dana i povrat Potraživanja">
          <p>Posle 14 dana možete zatražiti prestanak saradnje. Ako nema aktivnog sudskog postupka, prihvaćenog poravnanja ili druge radnje čiji bi trenutni prekid stvorio nerazuman trošak ili procesnu štetu, LETKASNI će u razumnom roku, ciljano do 10 radnih dana, dokumentovati povrat preostalog Potraživanja.</p>
          <p>Ako je sudski postupak već u toku, LETKASNI će sa angažovanim advokatom odrediti najbezbedniji način prestanka ili povratnog prenosa i obavestiti vas o statusu. Nećemo vam preneti naše redovne troškove samo zato što ste zatražili prestanak.</p>
          <p>LETKASNI može prekinuti predmet ako proceni da zahtev nema razumnu perspektivu, ako je dužnik insolventan ili naplata nije razumno moguća, ako nedostaju ključni podaci uprkos razumnim podsetnicima, ili ako postoje ozbiljni znaci prevare. Ako se prekida nenaplaćeni predmet, preostalo Potraživanje se vraća Putniku i dostavljamo raspoložive dokumente i informaciju o poznatim rokovima.</p>
          <p>Ako je LETKASNI pretrpeo dokazanu direktnu štetu zbog namerne prevare ili namerno netačnih podataka Putnika, može tražiti naknadu te stvarne štete u granicama prinudnog prava. Ne primenjujemo automatsku kaznu ili gubitak cele Putničke naplate.</p>
        </Section>

        <Section title="11. Elektronsko zaključenje i dokazni paket">
          <p>Ugovori sa LETKASNI-jem mogu se zaključiti elektronski. Pre slanja potpisa/poruke omogućavamo pregled i ispravku podataka. Tekst ugovora i Uslova čuvamo u obliku koji omogućava ponovno korišćenje i reprodukciju, a prijem elektronskog prihvata potvrđujemo bez odlaganja.</p>
          <p>Dokazni paket može obuhvatiti originalni finalni PDF, crtež potpisa, datum i vreme, Claim/Agreement ID, način autentikacije, IP adresu, tehničke podatke sesije/uređaja, heš dokumenta, verzije Uslova i evidenciju saglasnosti. Ove informacije koristimo radi dokazivanja zaključenja, bezbednosti i zaštite pravnih zahteva.</p>
          <p>Grafički izgled potpisa nije sam po sebi dokaz određenog zakonskog nivoa elektronskog potpisa. Ako koristimo napredni ili kvalifikovani proizvod, taj nivo ćemo navoditi samo kada je tehnički i pravno proverljiv.</p>
        </Section>

        <Section title="12. Reklamacije na LETKASNI i vansudsko rešavanje potrošačkog spora">
          <p>Ako imate prigovor na našu uslugu, pošaljite reklamaciju na <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>{supportEmail}</a>. Potvrdićemo prijem i odgovoriti u rokovima i na način koje propisuje važeće potrošačko pravo. Reklamacija na LETKASNI nije isto što i reklamacija avio-prevozniku u vezi sa vašim letom.</p>
          <p>Ako reklamaciju odbijemo, obavestićemo vas o mogućnosti vansudskog rešavanja potrošačkog spora i relevantnim telima. LETKASNI učestvuje u postupku vansudskog rešavanja potrošačkih sporova kada je to zakonska obaveza. Informacije i lista tela dostupni su preko nadležnog ministarstva za zaštitu potrošača.</p>
        </Section>

        <Section title="13. Privatnost">
          <p>Podatke o ličnosti obrađujemo u skladu sa Politikom privatnosti važećom za konkretni predmet. Politika privatnosti nije blanket saglasnost: pravni osnov zavisi od svrhe obrade. Marketing i neobavezni kolačići koriste se samo kada postoji odgovarajući pristanak ili drugi dopušten osnov.</p>
        </Section>

        <Section title="14. Ograničenja i odgovornost">
          <p>Ne garantujemo da će prevoznik priznati zahtev, da će sud ili regulator odlučiti u našu korist, niti da će naplata biti moguća u određenom roku. Procene leta, iznosa i pravnog osnova zasnivaju se na dostupnim informacijama i mogu se promeniti kada dobijemo nove dokaze.</p>
          <p>Ne isključujemo odgovornost koju po prinudnom pravu nije dopušteno isključiti ili ograničiti. Za probleme koje izazovu sistemi trećih lica, viša sila ili događaji van naše razumne kontrole odgovaramo samo u meri u kojoj to nalaže važeće pravo.</p>
        </Section>

        <Section title="15. Merodavno pravo, sud i izmene ovih Uslova">
          <p>Na ugovorni odnos između Putnika i LETKASNI-ja primenjuje se pravo Republike Srbije, bez isključivanja prinudne zaštite koja bi se na potrošača primenjivala nezavisno od ove klauzule. Ova klauzula ne određuje sama po sebi merodavno pravo Potraživanja prema avio-prevozniku niti automatski zasniva nadležnost suda za taj spoljašnji spor.</p>
          <p>Za potrošačke sporove sa LETKASNI-jem nadležnost se određuje prema prinudnim pravilima. Ne ograničavamo zakonska prava potrošača izborom suda.</p>
          <p>Možemo menjati Uslove za buduće ugovore. Na već zaključeni Claim ID primenjuje se verzija koja je prihvaćena pri zaključenju, osim ako zakon zahteva drugačije ili vi izričito prihvatite kasniju izmenu koja se odnosi na postojeći odnos.</p>
        </Section>
      </div>
      <SiteFooter locale="sr" supportEmail={supportEmail} />
    </main>
  );
}
