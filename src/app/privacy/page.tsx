import Link from "next/link";

import {
  getOperatorAddress,
  getOperatorMb,
  getOperatorName,
  getOperatorPib,
  getOperatorRegistry,
  getSupportEmail,
} from "@/lib/env";

const lastUpdated = "21. april 2026.";

function DetailList({
  items,
}: {
  items: Array<{ label: string; value?: string }>;
}) {
  return (
    <dl className="grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-[180px_1fr]">
      {items.map((item) => (
        <div key={item.label} className="contents">
          <dt className="font-semibold text-[var(--ink)]">{item.label}</dt>
          <dd>{item.value ?? "Biće dopunjeno."}</dd>
        </div>
      ))}
    </dl>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-3xl border border-[var(--line)] bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-xl font-bold tracking-[-0.02em] text-[var(--ink)]">{title}</h2>
      <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  const supportEmail = getSupportEmail();
  const operatorName = getOperatorName();
  const operatorAddress = getOperatorAddress();
  const operatorRegistry = getOperatorRegistry();
  const operatorPib = getOperatorPib();
  const operatorMb = getOperatorMb();

  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-4">
          <p className="eyebrow">Legal</p>
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">
            Politika privatnosti
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">
            Ova Politika privatnosti objašnjava kako letkasni.rs obrađuje podatke o
            ličnosti u vezi sa korišćenjem sajta, podnošenjem prijave za proveru
            prava na avio-odštetu i daljom komunikacijom sa korisnicima.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]/80">
            Poslednje ažuriranje: {lastUpdated}
          </p>
        </div>

        <Section title="1. Ko je rukovalac podacima">
          <p>
            Rukovalac podacima o ličnosti je lice koje upravlja sajtom letkasni.rs
            i određuje svrhe i sredstva obrade podataka o ličnosti.
          </p>
          <DetailList
            items={[
              { label: "Naziv rukovaoca", value: operatorName },
              { label: "Adresa sedišta", value: operatorAddress },
              { label: "Kontakt email", value: supportEmail },
              { label: "Registar / APR", value: operatorRegistry },
              { label: "PIB", value: operatorPib },
              { label: "Matični broj", value: operatorMb },
            ]}
          />
          <p>
            Za sva pitanja u vezi sa obradom podataka i ostvarivanjem prava u vezi
            sa privatnošću koristi se kontakt email naveden iznad.
          </p>
        </Section>

        <Section title="2. Koje podatke obrađujemo">
          <p>U zavisnosti od načina korišćenja sajta, možemo obrađivati sledeće kategorije podataka:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>identifikacione i kontakt podatke koje sami unesete, kao što su ime, email adresa i telefon;</li>
            <li>podatke o letu i događaju, kao što su broj leta, datum leta, ruta, tip problema i slobodan opis slučaja;</li>
            <li>tehničke podatke o korišćenju sajta, kao što su IP adresa, osnovni logovi, vreme pristupa i podaci o uređaju ili pregledaču;</li>
            <li>dokumentaciju i dodatne informacije koje naknadno dostavite ako se slučaj dalje proverava.</li>
          </ul>
          <p>
            Ne tražimo posebne vrste podataka o ličnosti osim ako su izuzetno potrebne
            za konkretan zahtev i ako za to postoji odgovarajući pravni osnov.
          </p>
        </Section>

        <Section title="3. Svrhe obrade i pravni osnov">
          <p>Podatke obrađujemo samo kada za to postoji odgovarajući pravni osnov i jasna svrha obrade.</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold text-[var(--ink)]">Predugovorne radnje i izvršenje usluge:</span>{" "}
              kada tražite proveru slučaja, podatke obrađujemo da bismo pregledali
              zahtev, odgovorili na upit i po potrebi preduzeli radnje pre eventualnog
              zaključenja posebnog ugovora ili punomoćja.
            </li>
            <li>
              <span className="font-semibold text-[var(--ink)]">Legitimni interes:</span>{" "}
              radi zaštite sistema, sprečavanja zloupotrebe, vođenja evidencija,
              unapređenja procesa i odbrane od pravnih zahteva, u meri u kojoj interesi
              korisnika ne pretežu.
            </li>
            <li>
              <span className="font-semibold text-[var(--ink)]">Pravna obaveza:</span>{" "}
              kada je obrada neophodna radi čuvanja poslovne dokumentacije, postupanja
              po zahtevima nadležnih organa ili ispunjavanja drugih zakonskih obaveza.
            </li>
            <li>
              <span className="font-semibold text-[var(--ink)]">Pristanak:</span>{" "}
              samo za one obrade za koje je pristanak zaista potreban, na primer za
              opcionu marketinšku komunikaciju ili određene analitičke alate ako ih
              kasnije uvedemo.
            </li>
          </ul>
          <p>
            Podaci se ne koriste za donošenje isključivo automatizovanih odluka koje
            proizvode pravne posledice po korisnika. Početna procena slučaja predstavlja
            operativni signal i može biti predmet ručne provere.
          </p>
        </Section>

        <Section title="4. Obaveznost davanja podataka">
          <p>
            Davanje osnovnih podataka o letu i kontakt podataka nije zakonska obaveza,
            ali je praktično neophodno ako želite da obavimo početnu proveru slučaja ili
            da vas kontaktiramo povodom prijave.
          </p>
          <p>
            Ako ne dostavite minimum potrebnih podataka, možda nećemo moći da procenimo
            zahtev ili da vam odgovorimo na upit.
          </p>
        </Section>

        <Section title="5. Primaoci podataka i obrađivači">
          <p>
            Podaci mogu biti dostupni zaposlenima, saradnicima i obrađivačima koji učestvuju
            u tehničkom održavanju sajta i obradi zahteva, ali samo u meri koja je nužna za
            ostvarenje konkretne svrhe.
          </p>
          <p>Tipični primaoci ili obrađivači mogu uključivati:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>provajdere hostinga, CDN-a i infrastrukture;</li>
            <li>provajdere baze podataka i cloud servisa;</li>
            <li>email i komunikacione servise;</li>
            <li>spoljne pravne ili operativne saradnike, ako je to potrebno za obradu konkretnog slučaja;</li>
            <li>nadležne organe kada postoji zakonska obaveza ili valjan pravni zahtev.</li>
          </ul>
          <p>
            Sa obrađivačima se zaključuju ili će se zaključiti odgovarajući ugovori o obradi
            podataka kada je to potrebno prema zakonu.
          </p>
        </Section>

        <Section title="6. Međunarodni prenos podataka">
          <p>
            Deo tehničke infrastrukture može uključivati provajdere koji podatke obrađuju ili
            im pristupaju van Republike Srbije. Kada do takvog prenosa dolazi, preduzimaju se
            odgovarajuće mere zaštite, uključujući ugovorne i organizacione mehanizme, u meri
            u kojoj je to propisano važećim pravom.
          </p>
          <p>
            Ako budu uvedeni dodatni provajderi ili složeniji transferi, ova politika će biti
            ažurirana konkretnijim spiskom servisa i osnovom prenosa.
          </p>
        </Section>

        <Section title="7. Rokovi čuvanja podataka">
          <p>
            Podatke čuvamo onoliko dugo koliko je potrebno za svrhu za koju su prikupljeni, a
            zatim onoliko koliko nalažu legitimni interesi ili zakonske obaveze.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>prijave koje ne pređu u dalju saradnju čuvaju se razumno ograničen period radi evidencije i eventualnog odgovora na upit;</li>
            <li>podaci o aktivnim predmetima čuvaju se tokom trajanja obrade slučaja i nakon toga onoliko koliko je potrebno zbog računovodstvenih, poreskih, obligacionih i drugih zakonskih obaveza;</li>
            <li>tehnički logovi i bezbednosni zapisi čuvaju se ograničeno, u skladu sa svrhom zaštite sistema.</li>
          </ul>
          <p>
            Konkretni rokovi čuvanja mogu se dodatno precizirati kroz interne politike rukovaoca
            po kategorijama podataka.
          </p>
        </Section>

        <Section title="8. Vaša prava">
          <p>
            U skladu sa Zakonom o zaštiti podataka o ličnosti, imate pravo da zatražite pristup,
            ispravku ili dopunu podataka, brisanje, ograničenje obrade, prenosivost podataka kada
            su za to ispunjeni uslovi, kao i da podnesete prigovor na obradu.
          </p>
          <p>
            Takođe imate pravo da u svakom trenutku povučete pristanak za obradu koja se zasniva na
            pristanku, pri čemu povlačenje ne utiče na zakonitost obrade izvršene pre povlačenja.
          </p>
          <p>
            Zahteve možete poslati na{" "}
            <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
            . Ako smatrate da je obrada nezakonita, imate pravo da se obratite Povereniku za informacije
            od javnog značaja i zaštitu podataka o ličnosti.
          </p>
        </Section>

        <Section title="9. Bezbednost podataka">
          <p>
            Primenjujemo razumne tehničke, organizacione i kadrovske mere radi zaštite podataka od
            neovlašćenog pristupa, gubitka, zloupotrebe, izmene ili uništenja. Ipak, nijedan sistem
            nije apsolutno bezbedan, pa nije moguće garantovati potpunu sigurnost svih prenosa ili
            čuvanja podataka.
          </p>
        </Section>

        <Section title="10. Kolačići i analitika">
          <p>
            Sajt može koristiti nužne tehničke kolačiće i slične tehnologije potrebne za rad sajta,
            bezbednost sesije i osnovnu funkcionalnost. Ako uvedemo opcionu analitiku ili marketinške
            alate, korisnici će biti dodatno obavešteni kroz odgovarajući banner ili dopunsko
            obaveštenje, kada to bude potrebno.
          </p>
          <p>
            U trenutnom osnovnom modelu sajta fokus je na nužnoj funkcionalnosti i obradi prijava, a
            ne na oglašavanju ili profilisanju korisnika.
          </p>
        </Section>

        <Section title="11. Izmene politike">
          <p>
            Ova politika može biti povremeno izmenjena radi usklađivanja sa promenama poslovnog modela,
            tehnologije ili propisa. Važeća verzija je objavljena na ovoj stranici uz naznačen datum
            poslednjeg ažuriranja.
          </p>
        </Section>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/terms"
            className="inline-flex rounded-full border border-[var(--line)] px-5 py-2 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Pogledaj uslove korišćenja
          </Link>
          <Link
            href="/"
            className="inline-flex rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Vrati se na početnu
          </Link>
        </div>
      </div>
    </main>
  );
}
