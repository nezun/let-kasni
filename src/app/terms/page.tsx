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

function IdentityBlock() {
  const operatorName = getOperatorName();
  const operatorAddress = getOperatorAddress();
  const operatorRegistry = getOperatorRegistry();
  const operatorPib = getOperatorPib();
  const operatorMb = getOperatorMb();
  const supportEmail = getSupportEmail();

  return (
    <dl className="grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-[180px_1fr]">
      <div className="contents">
        <dt className="font-semibold text-[var(--ink)]">Operator</dt>
        <dd>{operatorName}</dd>
      </div>
      <div className="contents">
        <dt className="font-semibold text-[var(--ink)]">Adresa</dt>
        <dd>{operatorAddress}</dd>
      </div>
      <div className="contents">
        <dt className="font-semibold text-[var(--ink)]">Kontakt email</dt>
        <dd>{supportEmail}</dd>
      </div>
      <div className="contents">
        <dt className="font-semibold text-[var(--ink)]">APR / registar</dt>
        <dd>{operatorRegistry ?? "Biće dopunjeno."}</dd>
      </div>
      <div className="contents">
        <dt className="font-semibold text-[var(--ink)]">PIB</dt>
        <dd>{operatorPib ?? "Biće dopunjeno."}</dd>
      </div>
      <div className="contents">
        <dt className="font-semibold text-[var(--ink)]">Matični broj</dt>
        <dd>{operatorMb ?? "Biće dopunjeno."}</dd>
      </div>
    </dl>
  );
}

export default function TermsPage() {
  const supportEmail = getSupportEmail();

  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-16">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-4">
          <p className="eyebrow">Legal</p>
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[var(--ink)]">
            Uslovi korišćenja
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-[var(--muted)]">
            Ovi Uslovi korišćenja uređuju pristup i upotrebu sajta letkasni.rs, kao i
            osnovnog online modela za prijem zahteva za početnu proveru prava na
            avio-odštetu.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]/80">
            Poslednje ažuriranje: {lastUpdated}
          </p>
        </div>

        <Section title="1. Operator sajta">
          <p>
            Sajt letkasni.rs vodi operator naveden ispod, koji je odgovoran za
            organizaciju i pružanje usluge kroz ovaj sajt.
          </p>
          <IdentityBlock />
        </Section>

        <Section title="2. Predmet usluge">
          <p>
            letkasni.rs je informativni i operativni sajt namenjen prijemu zahteva za
            početnu procenu mogućeg prava putnika na avio-odštetu i za dalju komunikaciju
            u vezi sa takvim zahtevom.
          </p>
          <p>
            Korišćenje sajta, popunjavanje forme ili prijem početnog odgovora ne znači samo
            po sebi da je zaključen ugovor o zastupanju, da je prihvaćen konkretan predmet
            niti da je korisniku garantovana isplata odštete.
          </p>
          <p>
            Za punu pravnu ili komercijalnu saradnju može biti potreban poseban ugovor,
            punomoćje, dodatna dokumentacija i zasebna potvrda operatora.
          </p>
        </Section>

        <Section title="3. Ko može da koristi sajt">
          <p>
            Sajt je namenjen punoletnim fizičkim licima, kao i licima koja postupaju u ime
            drugih putnika ili pravnih lica ako za to imaju odgovarajuće ovlašćenje.
          </p>
          <p>
            Slanjem zahteva potvrđujete da imate pravo da dostavite podatke koje unosite i da
            su, prema vašem najboljem znanju, tačni i potpuni.
          </p>
        </Section>

        <Section title="4. Priroda informacija i ograničenje odgovornosti">
          <p>
            Sadržaj sajta i početna procena slučaja služe kao opšta informacija i operativni
            korak u obradi zahteva. Oni ne predstavljaju individualni pravni savet, konačno
            pravno mišljenje niti garanciju uspeha.
          </p>
          <p>
            Operator nastoji da informacije na sajtu budu tačne i ažurne, ali ne garantuje da
            je svaka informacija potpuna, neprekidno dostupna ili primenljiva na svaki konkretan
            slučaj bez dodatne provere.
          </p>
          <p>
            U meri dozvoljenoj važećim pravom, operator ne odgovara za indirektnu ili posrednu
            štetu nastalu oslanjanjem isključivo na opšti sadržaj sajta, tehničke prekide, kašnjenja
            trećih servisa ili podatke koje je uneo sam korisnik.
          </p>
        </Section>

        <Section title="5. Podnošenje zahteva i elektronska komunikacija">
          <p>
            Kroz sajt je moguće elektronski dostaviti podatke potrebne za početnu obradu zahteva.
            Elektronska komunikacija, potvrde prijema i dalja razmena poruka mogu se obavljati putem
            email-a ili drugih kontakt kanala koje korisnik navede.
          </p>
          <p>
            Slanjem zahteva pristajete da vas operator kontaktira radi obrade prijave, traženja
            dopunskih podataka i dostavljanja informacija o sledećim koracima.
          </p>
          <p>
            Ako operator u budućnosti ponudi elektronsko zaključenje posebnog ugovora, takav odnos
            biće uređen dodatnim dokumentima i jasnim predugovornim obaveštenjima.
          </p>
        </Section>

        <Section title="6. Naknada i model saradnje">
          <p>
            Informacije o modelu naplate prikazane na sajtu imaju informativni karakter i odnose se
            na osnovni poslovni model u trenutku objave.
          </p>
          <p>
            Ako operator i korisnik zaključe posebnu saradnju na konkretnom predmetu, iznos naknade,
            provizije, način obračuna, porezi i ostali troškovi biće jasno definisani u posebnom
            ugovoru, punomoćju ili drugom odgovarajućem dokumentu.
          </p>
          <p>
            Dok takav dokument nije zaključen, korisnik ne treba da pretpostavi da je obavezan na
            plaćanje bilo koje naknade, niti da operator preuzima obavezu vođenja predmeta.
          </p>
        </Section>

        <Section title="7. Zabranjena upotreba">
          <p>Korisniku nije dozvoljeno da:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>dostavlja netačne, tuđe ili neovlašćeno pribavljene podatke;</li>
            <li>koristi sajt za protivpravne aktivnosti, uznemiravanje ili zloupotrebu infrastrukture;</li>
            <li>pokuša neovlašćen pristup sistemu, bazi podataka, administratorskom delu ili kodu sajta;</li>
            <li>objavljuje ili prenosi sadržaj koji povređuje prava trećih lica ili važeće propise.</li>
          </ul>
          <p>
            Operator zadržava pravo da ograniči ili odbije obradu zahteva koji su očigledno neosnovani,
            nepotpuni, zlonamerni ili protivni propisima.
          </p>
        </Section>

        <Section title="8. Intelektualna svojina">
          <p>
            Dizajn sajta, tekstovi, logotipi, grafički elementi, baze podataka i druga autorska ili
            srodna prava na sadržaju sajta pripadaju operatoru ili trećim licima koja su operatoru
            odobrila korišćenje.
          </p>
          <p>
            Bez prethodne pisane saglasnosti nije dozvoljeno kopiranje, distribuiranje, menjanje,
            javno prikazivanje ili komercijalno korišćenje sadržaja sajta, osim u meri dopuštenoj
            imperativnim propisima.
          </p>
        </Section>

        <Section title="9. Linkovi ka trećim licima i spoljne usluge">
          <p>
            Sajt može sadržati linkove ka spoljnim servisima ili koristiti infrastrukturu trećih
            provajdera. Operator ne odgovara za sadržaj, pravila privatnosti, dostupnost niti postupanje
            tih trećih lica.
          </p>
          <p>
            Korišćenje takvih servisa može biti predmet posebnih uslova i politika privatnosti trećih lica.
          </p>
        </Section>

        <Section title="10. Privatnost i obrada podataka">
          <p>
            Obrada podataka o ličnosti uređena je posebnom Politikom privatnosti, koja čini sastavni
            deo informacija dostupnih korisniku prilikom korišćenja sajta.
          </p>
          <p>
            Ako postoji neslaganje između ovih Uslova korišćenja i obaveznih propisa o zaštiti podataka
            o ličnosti, primenjuju se odredbe važećeg prava.
          </p>
        </Section>

        <Section title="11. Merodavno pravo i rešavanje sporova">
          <p>
            Na ove Uslove korišćenja primenjuje se pravo Republike Srbije.
          </p>
          <p>
            Strane će eventualne sporove nastojati da reše mirnim putem. Ako to nije moguće, za sporove
            koji proisteknu iz korišćenja sajta ili ovih uslova nadležan je stvarno nadležni sud prema
            sedištu operatora, osim ako imperativni propisi predviđaju drugačiju nadležnost.
          </p>
        </Section>

        <Section title="12. Izmene uslova">
          <p>
            Operator može povremeno menjati ove Uslove korišćenja radi usklađivanja sa promenama poslovnog
            modela, tehnologije ili propisa. Važeća verzija objavljena je na ovoj stranici sa datumom
            poslednjeg ažuriranja.
          </p>
        </Section>

        <Section title="13. Kontakt">
          <p>
            Za pitanja u vezi sa ovim Uslovima korišćenja možete se obratiti na{" "}
            <a className="font-medium text-[var(--ink)]" href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
            .
          </p>
        </Section>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/privacy"
            className="inline-flex rounded-full border border-[var(--line)] px-5 py-2 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Pogledaj politiku privatnosti
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
