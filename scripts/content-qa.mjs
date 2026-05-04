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
    ? "reports/content-qa-report.json"
    : args[reportFlagIndex + 1] || "reports/content-qa-report.json";
const publicCopyFiles = [
  "src/components/blog-index-page.tsx",
  "src/components/blog-article-page.tsx",
  "src/components/cornerstone-page.tsx",
  "src/lib/cornerstones.ts",
  ...fs
    .readdirSync(path.join(root, "src/content/blog"))
    .filter((file) => file.endsWith(".ts"))
    .map((file) => `src/content/blog/${file}`),
];

const forbiddenPublicPhrases = [
  "cornerstone",
  "child guides",
  "child vodiči",
  "link authority",
  "konkurentski vodiči",
  "competitor guides",
  "reference point",
  "copy inspiration",
  "kao airhelp",
  "kao flightright",
  "seo tekst",
  "keyword",
  "review agent",
  "sf.com",
];

const interlinkingAntiPatterns = [
  {
    file: "src/components/blog-article-page.tsx",
    patterns: [
      {
        pattern: /getRelatedBlogArticles|relatedArticles\.map|relatedTitle/,
        message: "blog articles must not render automatic related-link cards or endcap lists",
      },
    ],
  },
  {
    file: "src/components/cornerstone-page.tsx",
    patterns: [
      {
        pattern:
          /section\.links|supportArticles\.map|supportTitle|getCornerstoneSupportArticles/,
        message:
          "cornerstone pages must use body copy plus the approved detailed-guides module, not ad hoc support link dumps",
      },
    ],
  },
  {
    file: "src/lib/cornerstones.ts",
    patterns: [
      {
        pattern: /\blinks:\s*\[/,
        message: "cornerstone content must use inline markdown links in paragraphs, not section link/tag arrays",
      },
    ],
  },
];

const publicShellChecks = [
  {
    file: "src/components/landing-page.tsx",
    headerPattern: /HeaderWithClaimCta/,
    footerPattern: /SiteFooter/,
  },
  {
    file: "src/components/blog-index-page.tsx",
    headerPattern: /SiteHeader/,
    footerPattern: /SiteFooter/,
  },
  {
    file: "src/components/blog-article-page.tsx",
    headerPattern: /SiteHeader/,
    footerPattern: /SiteFooter/,
  },
  {
    file: "src/components/cornerstone-page.tsx",
    headerPattern: /SiteHeader/,
    footerPattern: /SiteFooter/,
  },
  {
    file: "src/app/terms/page.tsx",
    headerPattern: /SiteHeader/,
    footerPattern: /SiteFooter/,
  },
  {
    file: "src/app/privacy/page.tsx",
    headerPattern: /SiteHeader/,
    footerPattern: /SiteFooter/,
  },
];

const wordPattern = /[\p{L}\p{N}]+/gu;
const failures = [];
const issues = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function addIssue(issue) {
  const normalizedIssue = {
    severity: "error",
    ...issue,
  };

  issues.push(normalizedIssue);
  failures.push(formatIssue(normalizedIssue));
}

function formatIssue(issue) {
  const location = [issue.file, issue.line].filter(Boolean).join(":");
  const subject = issue.article ? `${location}:${issue.article}` : location;
  return `${subject || issue.file} ${issue.message}`;
}

function suggestionForForbiddenPhrase(phrase) {
  const suggestions = {
    cornerstone: "Use reader-facing wording such as glavni vodič, glavna strana, or main guide.",
    "child guides": "Use detailed guides or related guides.",
    "child vodiči": "Use detaljni vodiči or povezani vodiči.",
    "link authority": "Describe the user value instead of internal SEO mechanics.",
    "konkurentski vodiči": "Use neutral phrasing such as u praksi or drugi izvori.",
    "competitor guides": "Use neutral phrasing such as in practice or passenger-rights guides.",
    "copy inspiration": "Remove internal drafting-process language.",
    "reference point": "Remove internal research-process language.",
    keyword: "Use natural public copy instead of SEO scaffolding.",
    "seo tekst": "Use natural public copy instead of SEO scaffolding.",
    "review agent": "Remove internal production-process language.",
    "sf.com": "Remove internal comparison-process language.",
  };

  return suggestions[phrase] ?? "Replace with natural reader-facing copy.";
}

function wordCount(text) {
  return (text.match(wordPattern) ?? []).length;
}

function installTsRuntime() {
  const originalResolve = Module._resolveFilename;

  if (!Module._extensions[".ts"]?.__letkasniContentQa) {
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
    Module._extensions[".ts"].__letkasniContentQa = true;
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

  return {
    blogArticles: require(path.join(root, "src/lib/blog.ts")).blogArticles,
    cornerstonePages: require(path.join(root, "src/lib/cornerstones.ts")).cornerstonePages,
  };
}

function extractStringLiterals(source) {
  const literals = [];
  const pattern = /(["'`])((?:\\.|(?!\1)[\s\S])*?)\1/g;
  let match;

  while ((match = pattern.exec(source))) {
    const before = source.slice(0, match.index);
    const lineStart = before.lastIndexOf("\n") + 1;
    const lineEnd = source.indexOf("\n", match.index);
    const line = source.slice(lineStart, lineEnd === -1 ? source.length : lineEnd);

    if (/^\s*import\s/.test(line) || /\sfrom\s*$/.test(line.slice(0, match.index - lineStart))) {
      continue;
    }

    if (match[1] === "`" && match[2].includes("${")) {
      continue;
    }

    literals.push({
      value: match[2].replace(/\\n/g, " "),
      line: before.split("\n").length,
    });
  }

  return literals;
}

function checkForbiddenPublicCopy() {
  for (const file of publicCopyFiles) {
    const source = read(file);
    for (const literal of extractStringLiterals(source)) {
      const normalized = literal.value.toLowerCase();
      for (const phrase of forbiddenPublicPhrases) {
        if (normalized.includes(phrase)) {
          addIssue({
            type: "forbidden_public_phrase",
            file,
            line: literal.line,
            phrase,
            message: `public copy contains forbidden phrase "${phrase}"`,
            suggestedFix: suggestionForForbiddenPhrase(phrase),
          });
        }
      }
    }
  }
}

function splitArticleBlocks(source) {
  return source
    .split(/\n  \{\n    id: /)
    .slice(1)
    .map((block) => `  {\n    id: ${block}`);
}

function getLocalizedBlock(articleBlock, locale) {
  const ownStart = articleBlock.indexOf(`    ${locale}: {`);
  const otherLocale = locale === "sr" ? "en" : "sr";
  const otherStart = articleBlock.indexOf(`    ${otherLocale}: {`);

  if (ownStart === -1) {
    return "";
  }

  if (locale === "sr") {
    return articleBlock.slice(ownStart, otherStart);
  }

  return articleBlock.slice(ownStart);
}

function checkDailyArticleShape() {
  const contentDir = path.join(root, "src/content/blog");
  const dailyFiles = fs
    .readdirSync(contentDir)
    .filter((file) => /^daily-\d{4}-\d{2}-\d{2}\.ts$/.test(file))
    .map((file) => `src/content/blog/${file}`);

  for (const file of dailyFiles) {
    const source = read(file);
    const articleBlocks = splitArticleBlocks(source);

    if (articleBlocks.length !== 6) {
      addIssue({
        type: "daily_article_count",
        file,
        expected: 6,
        actual: articleBlocks.length,
        message: `should contain exactly 6 daily articles, found ${articleBlocks.length}`,
        suggestedFix: "Add or remove daily articles so the file contains exactly six bilingual articles.",
      });
    }

    for (const block of articleBlocks) {
      const id = block.match(/id: "([^"]+)"/)?.[1] ?? "unknown";
      const sr = getLocalizedBlock(block, "sr");
      const en = getLocalizedBlock(block, "en");
      const srSections = (sr.match(/heading:/g) ?? []).length;
      const enSections = (en.match(/heading:/g) ?? []).length;

      if (srSections !== enSections) {
        addIssue({
          type: "section_count_mismatch",
          file,
          article: id,
          expected: srSections,
          actual: enSections,
          message: `SR/EN section count mismatch ${srSections}/${enSections}`,
          suggestedFix: "Align Serbian and English section counts before publishing.",
        });
      }
    }
  }
}

function localizedArticleWords(article, locale) {
  const localized = article[locale];
  return wordCount(
    [
      localized.title,
      localized.description,
      localized.excerpt,
      ...localized.sections.flatMap((section) => [
        section.heading,
        ...section.body,
        ...(section.bullets ?? []),
      ]),
    ].join(" "),
  );
}

function localizedCornerstoneWords(page, locale) {
  const localized = page[locale];
  return wordCount(
    [
      localized.title,
      localized.description,
      localized.excerpt,
      ...localized.sections.flatMap((section) => [
        section.heading,
        ...section.body,
        ...(section.bullets ?? []),
      ]),
      ...localized.faqs.flatMap((faq) => [faq.question, faq.answer]),
    ].join(" "),
  );
}

function checkRuntimeContentDepth() {
  const { blogArticles, cornerstonePages } = loadRuntimeContent();

  for (const article of blogArticles) {
    for (const locale of ["sr", "en"]) {
      const words = localizedArticleWords(article, locale);

      if (words < 1000 || words > 1800) {
        addIssue({
          type: "runtime_article_word_count",
          file: "src/lib/blog.ts",
          article: article.id,
          locale,
          min: 1000,
          max: 1800,
          actual: words,
          message: `${locale.toUpperCase()} article word count ${words} is outside 1000-1800 after runtime enhancements`,
          suggestedFix:
            "Adjust source or runtime enhancement sections so detailed articles stay within the target range.",
        });
      }
    }
  }

  for (const page of cornerstonePages) {
    for (const locale of ["sr", "en"]) {
      const words = localizedCornerstoneWords(page, locale);
      const min = page.id === "flight-delay-compensation" ? 3500 : 2500;
      const max = page.id === "flight-delay-compensation" ? 4500 : 3800;

      if (words < min || words > max) {
        addIssue({
          type: "runtime_cornerstone_word_count",
          file: "src/lib/cornerstones.ts",
          article: page.id,
          locale,
          min,
          max,
          actual: words,
          message: `${locale.toUpperCase()} main guide word count ${words} is outside ${min}-${max}`,
          suggestedFix:
            "Expand the main guide to medium depth or tighten it so it stays inside the approved SEO content depth.",
        });
      }
    }
  }
}

function checkDuplicateIdsAndSlugs() {
  const contentDir = path.join(root, "src/content/blog");
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".ts"))
    .map((file) => `src/content/blog/${file}`);
  const seen = new Map();

  for (const file of files) {
    const source = read(file);
    const matches = source.matchAll(/\b(?:id|slug): "([^"]+)"/g);

    for (const match of matches) {
      const value = match[1];
      const key = `${match[0].startsWith("id") ? "id" : "slug"}:${value}`;
      const line = source.slice(0, match.index).split("\n").length;

      if (seen.has(key)) {
        addIssue({
          type: "duplicate_content_key",
          file,
          line,
          key,
          firstSeenAt: seen.get(key),
          message: `duplicates ${key} first seen at ${seen.get(key)}`,
          suggestedFix: "Use a unique blog id or localized slug.",
        });
      } else {
        seen.set(key, `${file}:${line}`);
      }
    }
  }
}

function checkInterlinkingAntiPatterns() {
  for (const fileCheck of interlinkingAntiPatterns) {
    const source = read(fileCheck.file);

    for (const check of fileCheck.patterns) {
      const match = check.pattern.exec(source);

      if (match) {
        addIssue({
          type: "interlinking_antipattern",
          file: fileCheck.file,
          line: source.slice(0, match.index).split("\n").length,
          message: check.message,
          suggestedFix:
            "Put internal links on natural words or phrases inside section paragraphs using [anchor text](/target-url).",
        });
      }
    }
  }
}

function checkPublicShell() {
  for (const shellCheck of publicShellChecks) {
    const source = read(shellCheck.file);

    if (!shellCheck.headerPattern.test(source)) {
      addIssue({
        type: "public_shell_missing_header",
        file: shellCheck.file,
        message: "public page/component must render the shared site header",
        suggestedFix: "Use SiteHeader or the approved HeaderWithClaimCta wrapper for public pages.",
      });
    }

    if (!shellCheck.footerPattern.test(source)) {
      addIssue({
        type: "public_shell_missing_footer",
        file: shellCheck.file,
        message: "public page/component must render the shared site footer",
        suggestedFix: "Add SiteFooter with the correct locale and support email before closing the public page shell.",
      });
    }
  }
}

checkForbiddenPublicCopy();
checkDailyArticleShape();
checkDuplicateIdsAndSlugs();
checkInterlinkingAntiPatterns();
checkPublicShell();
checkRuntimeContentDepth();

const report = {
  generatedAt: new Date().toISOString(),
  status: issues.length > 0 ? "fail" : "pass",
  root,
  summary: {
    issueCount: issues.length,
    checkedPublicCopyFiles: publicCopyFiles.length,
  },
  issues,
};

if (reportPath) {
  const absoluteReportPath = path.join(root, reportPath);
  fs.mkdirSync(path.dirname(absoluteReportPath), { recursive: true });
  fs.writeFileSync(absoluteReportPath, `${JSON.stringify(report, null, 2)}\n`);
}

if (failures.length > 0) {
  console.error("Content QA failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  console.error(`Report written to ${reportPath}`);
  process.exit(1);
}

console.log("Content QA passed.");
console.log(`Report written to ${reportPath}`);
