import fs from "node:fs";
import Module from "node:module";
import { createRequire } from "node:module";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const reportFlagIndex = args.findIndex((arg) => arg === "--report");
const reportPath =
  reportFlagIndex === -1
    ? "reports/content-benchmark-review.json"
    : args[reportFlagIndex + 1] || "reports/content-benchmark-review.json";
const threshold = Number(process.env.CONTENT_BENCHMARK_THRESHOLD ?? "90");
const locales = ["sr", "en"];
const p1EffectiveDate = "2026-05-08";
const wordPattern = /[\p{L}\p{N}]+/gu;
const cyrillicPattern = /[\u0400-\u04FF]/u;
const internalOrCompetitorLeakPatterns = [
  /cornerstone/i,
  /child guides?/i,
  /child vodič/i,
  /link authority/i,
  /seo tekst/i,
  /review agent/i,
  /copy inspiration/i,
  /reference point/i,
  /keyword/i,
  /sf\.com/i,
  /airhelp/i,
  /flightright/i,
  /skycop/i,
  /airadvisor/i,
  /claimcompass/i,
  /skyrefund/i,
  /compensair/i,
  /fairplane/i,
  /euclaim/i,
  /claimflights/i,
  /konkurentsk/i,
  /competitor/i,
  /let kasni (?:u ovoj fazi )?treba da preuzme/i,
  /let kasni should take over/i,
];
const forbiddenHeadingPatterns = [
  /kako koristiti (?:naš |nas )?(?:kalkulator|ovu strukturu|strukturu)/i,
  /how to use (?:our )?(?:calculator|structure|this structure)/i,
  /detaljni vodiči.*(?:otvoriti|konkret|scenar)/i,
  /detailed guides.*(?:open|specific|scenario)/i,
  /zašto .*stranic.*linkuj/i,
  /why .*pages?.*link back/i,
  /(?:glavne strane|main pages).*autoritet|authority/i,
  /(?:budućim tekstovima|future articles)/i,
  /(?:automatsku procenu|automatic estimate)/i,
];
const professionalSignals = {
  sr: [
    /let kasni/i,
    /profesional/i,
    /stručn/i,
    /obrada zahtev/i,
    /pravni/i,
    /dosije/i,
    /komunikacij[au] sa aviokompanijom/i,
    /preuzima/i,
    /procedur/i,
    /brzin/i,
    /ishod/i,
    /odbijenic/i,
    /provera/i,
  ],
  en: [
    /let kasni/i,
    /professional/i,
    /expert/i,
    /claim handling/i,
    /legal/i,
    /case file/i,
    /communication with the airline/i,
    /takes over/i,
    /procedure/i,
    /speed/i,
    /outcome/i,
    /rejection/i,
    /review/i,
  ],
};
const overlyDiyPatterns = {
  sr: [
    /uradite sami/i,
    /sami podnes/i,
    /sami se izbor/i,
    /samo pošaljite/i,
    /dovoljno je da sami/i,
  ],
  en: [
    /do it yourself/i,
    /file it yourself/i,
    /fight the airline yourself/i,
    /just submit/i,
    /all you need to do/i,
  ],
};
const knownGuideVisuals = {
  "air-passenger-rights": [
    { label: "guide checklist module", sectionIndex: 1 },
    { label: "professional handling process visual", sectionIndex: 4 },
    { label: "case evidence visual", sectionIndex: 8 },
    { label: "professional handling process visual", sectionIndex: 12 },
    { label: "case evidence visual", sectionIndex: 16 },
  ],
  "flight-delay-compensation": [
    { label: "amount-by-distance table", sectionIndex: 2 },
    { label: "professional handling process visual", sectionIndex: 5 },
    { label: "three-hour arrival timeline", sectionIndex: 7 },
    { label: "delay compensation calculator", sectionIndex: 12 },
  ],
};

function installTsRuntime() {
  const originalResolve = Module._resolveFilename;

  if (!Module._extensions[".ts"]?.__letkasniBenchmarkReview) {
    Module._extensions[".ts"] = (module, filename) => {
      const source = fs.readFileSync(filename, "utf8");
      const output = ts.transpileModule(source, {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          jsx: ts.JsxEmit.React,
          esModuleInterop: true,
        },
      }).outputText;

      module._compile(output, filename);
    };
    Module._extensions[".ts"].__letkasniBenchmarkReview = true;
  }

  Module._resolveFilename = function resolveAlias(request, parent, isMain, options) {
    if (request.startsWith("@/")) {
      let resolved = path.join(root, "src", request.slice(2));

      if (fs.existsSync(`${resolved}.ts`)) {
        resolved = `${resolved}.ts`;
      } else if (fs.existsSync(`${resolved}.tsx`)) {
        resolved = `${resolved}.tsx`;
      } else if (fs.existsSync(path.join(resolved, "index.ts"))) {
        resolved = path.join(resolved, "index.ts");
      }

      return resolved;
    }

    return originalResolve.call(this, request, parent, isMain, options);
  };
}

function loadRuntimeContent() {
  installTsRuntime();

  const blog = require(path.join(root, "src/lib/blog.ts"));
  const cornerstones = require(path.join(root, "src/lib/cornerstones.ts"));

  return {
    blogArticles: blog.blogArticles,
    articleImages: blog.articleImages,
    cornerstonePages: cornerstones.cornerstonePages,
    getArticleCornerstoneHref: cornerstones.getArticleCornerstoneHref,
    getCornerstoneHref: cornerstones.getCornerstoneHref,
    getCornerstoneChildren: cornerstones.getCornerstoneChildren,
  };
}

function wordCount(text) {
  return (text.match(wordPattern) ?? []).length;
}

function normalizedText(parts) {
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

function articleText(article, locale) {
  const localized = article[locale];

  return normalizedText([
    localized.title,
    localized.description,
    localized.excerpt,
    localized.category,
    localized.readTime,
    ...localized.sections.flatMap((section) => [
      section.heading,
      ...section.body,
      ...(section.bullets ?? []),
    ]),
  ]);
}

function cornerstoneText(page, locale) {
  const localized = page[locale];

  return normalizedText([
    localized.title,
    localized.description,
    localized.excerpt,
    localized.eyebrow,
    localized.ctaLabel,
    localized.languageLabel,
    ...localized.sections.flatMap((section) => [
      section.heading,
      ...section.body,
      ...(section.bullets ?? []),
    ]),
    ...localized.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ]);
}

function markdownLinksFromParagraphs(paragraphs) {
  const links = [];

  for (const paragraph of paragraphs) {
    for (const match of paragraph.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
      const href = normalizeInternalHref(match[2]);
      if (href) {
        links.push({
          anchor: normalizeAnchor(match[1]),
          rawAnchor: match[1],
          href,
        });
      }
    }
  }

  return links;
}

function normalizeInternalHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return null;
  }

  let parsed;

  try {
    parsed = href.startsWith("http")
      ? new URL(href)
      : new URL(href, "https://letkasni.rs");
  } catch {
    return null;
  }

  if (parsed.hostname !== "letkasni.rs") {
    return null;
  }

  return parsed.pathname.replace(/\/+$/, "") || "/";
}

function normalizeAnchor(anchor) {
  return anchor.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicate = new Set();

  for (const value of values) {
    if (seen.has(value)) {
      duplicate.add(value);
    }
    seen.add(value);
  }

  return [...duplicate];
}

function hasResearchNote(itemId, title) {
  const researchDir = path.join(root, "docs/content-research");

  if (!fs.existsSync(researchDir)) {
    return false;
  }

  const needles = [itemId, title].filter(Boolean).map((value) => value.toLowerCase());
  const files = fs.readdirSync(researchDir).filter((file) => file.endsWith(".md"));

  return files.some((file) => {
    const text = `${file}\n${fs.readFileSync(path.join(researchDir, file), "utf8")}`.toLowerCase();
    return needles.some((needle) => text.includes(needle));
  });
}

function isLegacyContent(updatedAt, researchBacked) {
  return !researchBacked && String(updatedAt) < p1EffectiveDate;
}

function countVisualSignals(item, kind) {
  if (kind === "guide" && knownGuideVisuals[item.id]) {
    const visuals = knownGuideVisuals[item.id];
    const positions = visuals.map((visual) => visual.sectionIndex).sort((a, b) => a - b);
    const lastSection = item.sr.sections.length;
    const gaps = positions.slice(1).map((position, index) => position - positions[index]);
    const distributed =
      positions.length >= 3 &&
      positions[0] <= 3 &&
      positions[positions.length - 1] >= Math.floor(lastSection * 0.7) &&
      gaps.every((gap) => gap >= 2 && gap <= 5);

    return {
      count: visuals.length,
      evidence: visuals.map((visual) => `${visual.label} after H2 ${visual.sectionIndex}`),
      distributed,
    };
  }

  const sections = [...item.sr.sections, ...item.en.sections];
  const bulletModules = sections.filter((section) => (section.bullets?.length ?? 0) >= 3).length;
  const tableMentions = sections.filter((section) =>
    normalizedText(section.body).includes("|") || /tabela|table/i.test(section.heading),
  ).length;
  const processMentions = sections.filter((section) =>
    /checklista|kontrolna lista|timeline|vremenska linija|proces|process|korak|step/i.test(section.heading),
  ).length;
  const signals = [];

  if (bulletModules > 0) {
    signals.push(`${bulletModules} checklist/list module(s)`);
  }
  if (tableMentions > 0) {
    signals.push(`${tableMentions} table/table-intent section(s)`);
  }
  if (processMentions > 0) {
    signals.push(`${processMentions} process/timeline section(s)`);
  }

  return {
    count:
      kind === "article"
        ? Math.min(5, bulletModules + tableMentions + processMentions + 2)
        : Math.min(5, bulletModules + tableMentions + processMentions),
    evidence:
      kind === "article"
        ? [...signals, "global case-file visual after early context", "global professional-review visual after mid-article context"]
        : signals,
    distributed: true,
  };
}

function criterion(name, max, score, status, evidence, suggestion) {
  return {
    name,
    max,
    score: Math.max(0, Math.min(max, score)),
    status,
    evidence,
    suggestion,
  };
}

function scoreRecord(record) {
  const {
    item,
    kind,
    locale,
    text,
    sections,
    paragraphs,
    words,
    href,
    researchBacked,
    legacy,
    siblingSectionCount,
    visualSignals,
    childCount,
  } = record;
  const criteria = [];
  const guide = kind === "guide";
  const minWords = guide ? (item.id === "flight-delay-compensation" ? 3000 : 2500) : 1000;
  const maxWords = guide ? (item.id === "flight-delay-compensation" ? 4500 : 3800) : 1800;

  if (words >= minWords && words <= maxWords) {
    criteria.push(criterion("benchmark_depth", 15, 15, "pass", `${words} words within ${minWords}-${maxWords}`));
  } else if (words >= Math.floor(minWords * 0.9) && words <= Math.ceil(maxWords * 1.15)) {
    criteria.push(
      criterion(
        "benchmark_depth",
        15,
        10,
        "warning",
        `${words} words near ${minWords}-${maxWords}`,
        "Tighten or expand against the closest AirHelp benchmark before deploy.",
      ),
    );
  } else {
    criteria.push(
      criterion(
        "benchmark_depth",
        15,
        0,
        "fail",
        `${words} words outside ${minWords}-${maxWords}`,
        "Rewrite to the approved benchmark-led depth range.",
      ),
    );
  }

  const ownSectionCount = sections.length;
  if (ownSectionCount === siblingSectionCount && ownSectionCount >= (guide ? 8 : 4)) {
    criteria.push(criterion("bilingual_structure", 10, 10, "pass", `${ownSectionCount}/${siblingSectionCount} sections`));
  } else if (ownSectionCount === siblingSectionCount) {
    criteria.push(
      criterion(
        "bilingual_structure",
        10,
        7,
        "warning",
        `${ownSectionCount}/${siblingSectionCount} sections`,
        "Keep SR/EN parity and add enough sections for the topic depth.",
      ),
    );
  } else {
    criteria.push(
      criterion(
        "bilingual_structure",
        10,
        0,
        "fail",
        `${ownSectionCount}/${siblingSectionCount} sections`,
        "Align Serbian and English section structure before publishing.",
      ),
    );
  }

  const badHeadings = sections
    .map((section) => section.heading)
    .filter((heading) => forbiddenHeadingPatterns.some((pattern) => pattern.test(heading)));

  if (badHeadings.length === 0) {
    criteria.push(criterion("approved_outline_heading_quality", 15, 15, "pass", "No meta/process H2 headings detected"));
  } else {
    criteria.push(
      criterion(
        "approved_outline_heading_quality",
        15,
        0,
        "fail",
        badHeadings,
        "Replace every meta/process H2 with direct search intent, a legal condition, or a competitor-supported user step.",
      ),
    );
  }

  const leaks = internalOrCompetitorLeakPatterns
    .filter((pattern) => pattern.test(text))
    .map((pattern) => pattern.source);
  const publicCleanFailures = [];

  if (locale === "sr" && cyrillicPattern.test(text)) {
    publicCleanFailures.push("Serbian Cyrillic detected");
  }
  if (leaks.length > 0) {
    publicCleanFailures.push(`internal/competitor terms: ${leaks.slice(0, 5).join(", ")}`);
  }

  if (publicCleanFailures.length === 0) {
    criteria.push(criterion("public_cleanliness", 15, 15, "pass", "No Cyrillic, competitor names, or production-process terms"));
  } else {
    criteria.push(
      criterion(
        "public_cleanliness",
        15,
        0,
        "fail",
        publicCleanFailures,
        "Remove internal production language, competitor names, and Cyrillic from rendered public copy.",
      ),
    );
  }

  const links = markdownLinksFromParagraphs(paragraphs);
  const duplicateTargets = duplicateValues(links.map((link) => link.href));
  const duplicateAnchors = duplicateValues(links.map((link) => link.anchor));
  const minimumLinks = guide ? Math.min(8, Math.max(1, childCount)) : 1;

  if (duplicateTargets.length || duplicateAnchors.length) {
    criteria.push(
      criterion(
        "internal_linking_discipline",
        15,
        0,
        "fail",
        {
          linkCount: links.length,
          duplicateTargets,
          duplicateAnchors,
        },
        "Keep at most one link to each target URL and one linked use of each anchor phrase per text.",
      ),
    );
  } else if (links.length >= minimumLinks) {
    criteria.push(
      criterion(
        "internal_linking_discipline",
        15,
        15,
        "pass",
        `${links.length} editorial inline links, no duplicate target or anchor`,
      ),
    );
  } else {
    criteria.push(
      criterion(
        "internal_linking_discipline",
        15,
        5,
        "fail",
        `${links.length}/${minimumLinks} editorial inline links`,
        "Add contextual inline links to the primary guide and relevant detailed pages without duplicate targets or anchors.",
      ),
    );
  }

  const professionalSignalFound = professionalSignals[locale].some((pattern) => pattern.test(text));
  const diySignals = overlyDiyPatterns[locale].filter((pattern) => pattern.test(text)).map((pattern) => pattern.source);

  if (professionalSignalFound && diySignals.length === 0) {
    criteria.push(criterion("conversion_framing", 15, 15, "pass", "Professional claim-handling framing present"));
  } else {
    criteria.push(
      criterion(
        "conversion_framing",
        15,
        professionalSignalFound ? 8 : 4,
        "fail",
        {
          professionalSignalFound,
          diySignals,
        },
        "Reframe from DIY instructions toward professional claim handling and evidence-sensitive case assembly.",
      ),
    );
  }

  const minVisuals = guide ? 3 : 2;
  if (visualSignals.count >= minVisuals && visualSignals.distributed !== false) {
    criteria.push(criterion("visual_usefulness", 10, 10, "pass", visualSignals.evidence));
  } else if (visualSignals.count >= minVisuals) {
    criteria.push(
      criterion(
        "visual_usefulness",
        10,
        0,
        "fail",
        visualSignals.evidence,
        "Distribute visuals through the article roughly every 3-4 H2s; do not cluster them near the beginning.",
      ),
    );
  } else {
    criteria.push(
      criterion(
        "visual_usefulness",
        10,
        0,
        "fail",
        `${visualSignals.count}/${minVisuals} visual signals`,
        "Add useful in-body visuals/interactives. Hero images and detailed-guide cards do not count.",
      ),
    );
  }

  if (researchBacked) {
    criteria.push(criterion("research_evidence", 5, 5, "pass", "Internal research note found"));
  } else {
    criteria.push(
      criterion(
        "research_evidence",
        5,
        0,
        "fail",
        "No internal research note found",
        "Document competitor and official-source benchmark evidence before writing or refreshing this content.",
      ),
    );
  }

  const score = criteria.reduce((total, item) => total + item.score, 0);

  const hasFailedCriterion = criteria.some((item) => item.status === "fail");

  return {
    id: item.id,
    kind,
    locale,
    href,
    score,
    threshold,
    status: score >= threshold && !hasFailedCriterion ? "pass" : "fail",
    words,
    legacy,
    criteria,
  };
}

const {
  blogArticles,
  articleImages,
  cornerstonePages,
  getArticleCornerstoneHref,
  getCornerstoneHref,
  getCornerstoneChildren,
} = loadRuntimeContent();

const records = [];

for (const page of cornerstonePages) {
  const researchBacked = hasResearchNote(page.id, page.sr.title);
  const legacy = isLegacyContent(page.updatedAt, researchBacked);
  const visualSignals = countVisualSignals(page, "guide");

  for (const locale of locales) {
    const localized = page[locale];
    const text = cornerstoneText(page, locale);

    records.push(
      scoreRecord({
        item: page,
        kind: "guide",
        locale,
        text,
        sections: localized.sections,
        paragraphs: localized.sections.flatMap((section) => section.body),
        words: wordCount(text),
        href: getCornerstoneHref(page, locale),
        researchBacked,
        legacy,
        siblingSectionCount: page[locale === "sr" ? "en" : "sr"].sections.length,
        visualSignals,
        childCount: getCornerstoneChildren(page, locale).length,
      }),
    );
  }
}

for (const article of blogArticles) {
  const researchBacked = hasResearchNote(article.id, article.sr.title);
  const legacy = isLegacyContent(article.updatedAt, researchBacked);
  const visualSignals = countVisualSignals(article, "article");
  const hasHeroImage = Boolean(articleImages[article.id]);

  for (const locale of locales) {
    const localized = article[locale];
    const text = articleText(article, locale);

    records.push(
      scoreRecord({
        item: article,
        kind: "article",
        locale,
        text,
        sections: localized.sections,
        paragraphs: localized.sections.flatMap((section) => section.body),
        words: wordCount(text),
        href: getArticleCornerstoneHref(article, locale),
        researchBacked,
        legacy,
        siblingSectionCount: article[locale === "sr" ? "en" : "sr"].sections.length,
        visualSignals: hasHeroImage
          ? {
              ...visualSignals,
              evidence: [...visualSignals.evidence, "hero image present but not counted toward in-body minimum"],
            }
          : visualSignals,
        childCount: 0,
      }),
    );
  }
}

const failingRecords = records.filter((record) => record.status === "fail");
const report = {
  generatedAt: new Date().toISOString(),
  status: failingRecords.length ? "fail" : "pass",
  threshold,
  summary: {
    checkedRecords: records.length,
    failingRecords: failingRecords.length,
    averageScore: Number(
      (records.reduce((total, record) => total + record.score, 0) / records.length).toFixed(2),
    ),
  },
  records,
};

const absoluteReportPath = path.join(root, reportPath);
fs.mkdirSync(path.dirname(absoluteReportPath), { recursive: true });
fs.writeFileSync(absoluteReportPath, `${JSON.stringify(report, null, 2)}\n`);

if (failingRecords.length > 0) {
  console.error(`Content benchmark review failed: ${failingRecords.length} record(s) below ${threshold}%.`);
  for (const record of failingRecords.slice(0, 20)) {
    const failedCriteria = record.criteria
      .filter((item) => item.status === "fail")
      .map((item) => item.name)
      .join(", ");
    console.error(`- ${record.kind}:${record.id}:${record.locale} score=${record.score} href=${record.href} failed=${failedCriteria}`);
  }
  console.error(`Report written to ${path.relative(root, absoluteReportPath)}`);
  process.exit(1);
}

console.log(`Content benchmark review passed: all records >= ${threshold}%.`);
console.log(`Report written to ${path.relative(root, absoluteReportPath)}`);
