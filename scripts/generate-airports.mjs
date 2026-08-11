import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const AIRPORTS_URL =
  "https://davidmegginson.github.io/ourairports-data/airports.csv";
const COUNTRIES_URL =
  "https://davidmegginson.github.io/ourairports-data/countries.csv";

const outputPath = resolve("src/data/airports.generated.ts");

const extendedEuropeCodes = new Set([
  "AD",
  "AL",
  "AM",
  "AT",
  "AX",
  "AZ",
  "BA",
  "BE",
  "BG",
  "BY",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FO",
  "FR",
  "GB",
  "GE",
  "GG",
  "GI",
  "GR",
  "HR",
  "HU",
  "IE",
  "IM",
  "IS",
  "IT",
  "JE",
  "LI",
  "LT",
  "LU",
  "LV",
  "MC",
  "MD",
  "ME",
  "MK",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "RS",
  "RU",
  "SE",
  "SI",
  "SJ",
  "SK",
  "SM",
  "TR",
  "UA",
  "VA",
  "XK",
]);

function parseCsv(source) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];

    if (quoted) {
      if (character === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  const [headers, ...values] = rows;
  return values
    .filter((value) => value.some(Boolean))
    .map((value) => Object.fromEntries(headers.map((header, index) => [header, value[index] ?? ""])));
}

async function downloadCsv(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Airport data download failed (${response.status}) for ${url}`);
  }
  return parseCsv(await response.text());
}

function normalizeSearch(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("sr-Latn");
}

const [airportRows, countryRows] = await Promise.all([
  downloadCsv(AIRPORTS_URL),
  downloadCsv(COUNTRIES_URL),
]);

const countryByCode = new Map(countryRows.map((country) => [country.code, country]));
const displayNames = new Intl.DisplayNames(["sr-Latn-RS"], { type: "region" });
const airportsByIata = new Map();

for (const airport of airportRows) {
  const iata = airport.iata_code?.trim().toUpperCase();
  const country = countryByCode.get(airport.iso_country);
  if (!iata || !country || airport.type === "closed" || airport.type === "heliport") {
    continue;
  }

  const isEurope = country.continent === "EU" || extendedEuropeCodes.has(country.code);
  const isEuropeanPassengerAirport =
    isEurope &&
    (airport.scheduled_service === "yes" ||
      airport.type === "large_airport" ||
      airport.type === "medium_airport");
  const isMajorWorldAirport =
    !isEurope && airport.type === "large_airport" && airport.scheduled_service === "yes";

  if (!isEuropeanPassengerAirport && !isMajorWorldAirport) {
    continue;
  }

  const existing = airportsByIata.get(iata);
  if (existing && existing.type === "large_airport") {
    continue;
  }

  airportsByIata.set(iata, {
    iata,
    name: airport.name.trim(),
    city: airport.municipality.trim(),
    countryCode: country.code,
    countryEnglish: country.name,
    region: isEurope ? "europe" : "world",
    type: airport.type,
    search: normalizeSearch(
      [
        airport.name,
        airport.municipality,
        airport.iata_code,
        airport.gps_code,
        airport.ident,
        airport.keywords,
        country.name,
        country.keywords,
      ]
        .filter(Boolean)
        .join(" "),
    ),
  });
}

const groups = new Map();

for (const airport of airportsByIata.values()) {
  const countryName =
    displayNames.of(airport.countryCode) || airport.countryEnglish || airport.countryCode;
  const group = groups.get(airport.countryCode) ?? {
    code: airport.countryCode,
    country: countryName,
    countryEnglish: airport.countryEnglish,
    region: airport.region,
    airports: [],
  };

  group.airports.push({
    iata: airport.iata,
    name: airport.name,
    city: airport.city,
    search: normalizeSearch(`${countryName} ${airport.search}`),
  });
  groups.set(airport.countryCode, group);
}

const airportCountries = [...groups.values()]
  .map((group) => ({
    ...group,
    airports: group.airports.sort((left, right) =>
      `${left.city} ${left.name}`.localeCompare(`${right.city} ${right.name}`, "sr-Latn"),
    ),
  }))
  .sort((left, right) => {
    if (left.region !== right.region) {
      return left.region === "europe" ? -1 : 1;
    }
    return left.country.localeCompare(right.country, "sr-Latn");
  });

const output = `// Generated by npm run airports:generate from OurAirports open data. Do not edit manually.\n\nexport type AirportOption = {\n  iata: string;\n  name: string;\n  city: string;\n  search: string;\n};\n\nexport type AirportCountryGroup = {\n  code: string;\n  country: string;\n  countryEnglish: string;\n  region: \"europe\" | \"world\";\n  airports: AirportOption[];\n};\n\nexport const airportCountries: AirportCountryGroup[] = ${JSON.stringify(airportCountries, null, 2)};\n`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, output, "utf8");

const europeAirports = airportCountries
  .filter((group) => group.region === "europe")
  .reduce((total, group) => total + group.airports.length, 0);
const worldAirports = airportCountries
  .filter((group) => group.region === "world")
  .reduce((total, group) => total + group.airports.length, 0);

console.log(
  `Generated ${airportCountries.length} countries, ${europeAirports} European airports and ${worldAirports} major world airports.`,
);
