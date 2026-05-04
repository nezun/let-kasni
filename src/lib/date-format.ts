export type DisplayDateLocale = "sr" | "en";

const srLatinMonths = [
  "januar",
  "februar",
  "mart",
  "april",
  "maj",
  "jun",
  "jul",
  "avgust",
  "septembar",
  "oktobar",
  "novembar",
  "decembar",
];

function parseDateParts(date: string) {
  const isoMatch = date.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (isoMatch) {
    return {
      year: Number(isoMatch[1]),
      monthIndex: Number(isoMatch[2]) - 1,
      day: Number(isoMatch[3]),
    };
  }

  const parsed = new Date(date);

  return {
    year: parsed.getUTCFullYear(),
    monthIndex: parsed.getUTCMonth(),
    day: parsed.getUTCDate(),
  };
}

export function formatDisplayDate(date: string, locale: DisplayDateLocale) {
  const { year, monthIndex, day } = parseDateParts(date);

  if (locale === "sr") {
    return `${String(day).padStart(2, "0")}. ${srLatinMonths[monthIndex]} ${year}`;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, monthIndex, day)));
}
