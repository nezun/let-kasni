/* eslint-disable @typescript-eslint/no-explicit-any -- predmet je JSON zapis (crm_predmeti.podaci), isti oblik kao case.json u pipeline-u */

/**
 * Sve spoljno što serverski prolaz koristi, kao interfejsi. Prave implementacije su u ./pravi.ts
 * (Supabase, Drive, Gmail, signNow), a testovi (./test) daju lažne — koraci ne znaju razliku.
 */
export type Predmet = Record<string, any> & { ref: string; status: string };

export interface RedPredmeta {
  ref: string;
  verzija: number;
  status: string;
  izvor_izmene: string;
  podaci: Predmet;
  pregled: any;
}

export type StanjePosla = "ceka" | "radi" | "gotovo" | "greska";

export interface Posao {
  id: string;
  vrsta: "provera-leta" | "revizija" | "dokumenta";
  ref: string;
  kljuc: string;
  opis: string | null;
  ulaz: Record<string, any>;
  stanje: StanjePosla;
  pokusaja: number;
  radnik: string | null;
  preuzeto: string | null;
  rezultat: any;
  izlaz: any;
  trosak_usd: number | null;
  poslednja_greska: string | null;
  kreirano: string;
  azurirano?: string;
}

export interface Baza {
  predmeti(): Promise<RedPredmeta[]>;
  predmet(ref: string): Promise<RedPredmeta | null>;
  /** Nov red; false ako predmet već postoji. */
  ubaci(red: Record<string, any>): Promise<boolean>;
  /** Uslovna izmena: true samo ako je u bazi i dalje `verzija`. */
  izmeni(ref: string, verzija: number, polja: Record<string, any>): Promise<boolean>;
  dogadjaji(redovi: Array<{ ref: string; vreme: string; poruka: string }>): Promise<void>;
  sistem(kljuc: string): Promise<any>;
  upisiSistem(kljuc: string, vrednost: any): Promise<void>;
  /** Zaključavanje prolaza: false ako drugi prolaz već radi (i nije istekao). */
  zakljucaj(kljuc: string, doIso: string): Promise<boolean>;
  otkljucaj(kljuc: string): Promise<void>;
  letovi(): Promise<Record<string, any>>;
  poslovi(): Promise<Posao[]>;
  /** Ubacuje posao ako ne postoji; vraća postojeći ili nov. */
  dodajPosao(p: Omit<Posao, "stanje" | "pokusaja" | "radnik" | "preuzeto" | "rezultat" | "izlaz" | "trosak_usd" | "poslednja_greska" | "kreirano">): Promise<Posao>;
  izmeniPosao(id: string, polja: Partial<Posao>, akoJeStanje?: StanjePosla): Promise<boolean>;
}

export interface FajlNaDrive {
  id: string;
  name: string;
  mimeType: string;
  md5Checksum?: string;
  size?: string;
  createdTime?: string;
}

export interface Drive {
  /** ID foldera sa imenom ispod roditelja; pravi ga ako ne postoji. */
  folder(ime: string, roditeljId: string): Promise<string>;
  lista(folderId: string): Promise<FajlNaDrive[]>;
  citaj(fileId: string): Promise<Uint8Array>;
  nadji(roditeljId: string, ime: string): Promise<string | null>;
  upisi(roditeljId: string, ime: string, sadrzaj: Uint8Array | string, mime: string): Promise<string>;
  /** Zamenjuje sadržaj postojećeg fajla. */
  zameni(fileId: string, sadrzaj: Uint8Array | string, mime: string): Promise<void>;
  kopiraj(fileId: string, roditeljId: string, ime: string): Promise<string>;
  premesti(fileId: string, odId: string, doId: string): Promise<void>;
}

export interface PorukaGmail {
  id: string;
  threadId: string;
  vreme: string;
  od: string;
  za: string[];
  naslov: string | null;
  prilozi: boolean;
  draft: boolean;
}

export interface Prilog {
  ime: string;
  mime: string;
  bajtovi: Uint8Array;
}

export interface Gmail {
  ima(): boolean;
  aliasi(): Promise<string[]>;
  napraviDraft(d: { from: string | null; to: string[]; cc?: string[]; subject: string; body: string; prilozi?: Prilog[]; threadId?: string | null; replyToMessageId?: string | null }): Promise<{ draftId: string; messageId: string | null; threadId: string | null }>;
  postojiDraft(draftId: string): Promise<boolean>;
  thread(threadId: string): Promise<PorukaGmail[] | null>;
  pretrazi(q: string, max?: number): Promise<string[]>;
}

export interface Potpis {
  podesen(): boolean;
  status(dokumentId: string): Promise<{ stanje: "poslato" | "potpisano" | "odbijeno" | "isteklo"; potpisano: string | null }>;
  preuzmiPotpisan(dokumentId: string): Promise<Uint8Array>;
  preuzmiAudit(dokumentId: string): Promise<Uint8Array>;
  /** PDF iz .docx (signNow renderuje) — za ugovor koji ide mejlom. */
  pdfIzDocx(docx: Uint8Array, naziv: string): Promise<Uint8Array>;
}

export interface Portal {
  /** Isto što sajt radi posle „Sačuvaj podatke“: ugovori + pozivi za potpis → POA_SENT u bazi. */
  pripremi(ref: string): Promise<{ ok: boolean; razlog?: string; poruka?: string }>;
  /** Ugovor + poziv za potpis za svakog putnika, iz podataka predmeta (posle dokumenata); ništa ne upisuje u bazu. */
  pozivi(ref: string, predmet: Predmet): Promise<Array<{ putnik: string; dokument_id: string; zahtev_id: string; drive_id: string | null }>>;
  link(ref: string): string | null;
}

export interface Sabloni {
  /** Tekst šablona mejla (sabloni/<ime>.md sa Drive-a). */
  mejl(ime: string): Promise<string>;
  /** Popunjen .docx ugovora za jednog putnika. */
  ugovor(putnik: any, let_: any): Promise<Uint8Array>;
}

export interface Servisi {
  baza: Baza;
  drive: Drive;
  gmail: Gmail;
  potpis: Potpis;
  portal: Portal;
  sabloni: Sabloni;
  sada(): Date;
}
