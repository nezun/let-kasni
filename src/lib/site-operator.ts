// Canonical public identity; keep footer and legal pages in sync.
export const siteOperator = {
  name: "VGA EU CONSULTING DOO NIŠ",
  address: "Bulevar Nemanjića 1, Niš (Medijana), 18000 Niš",
  country: { sr: "Srbija", en: "Serbia" },
  registry: { sr: "APR / Registar privrednih subjekata", en: "APR / Register of Business Entities" },
  pib: "113473442",
  mb: "21873446",
  phone: "+381637003779",
  email: { sr: "kontakt@letkasni.rs", en: "office@letkasni.rs" },
  // Facebook stranica još nema korisničko ime, pa ide adresa po ID-u (ostaje ispravna i kad ga dobije).
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61592592661385",
    instagram: "https://www.instagram.com/letkasni.rs/",
  },
} as const;
