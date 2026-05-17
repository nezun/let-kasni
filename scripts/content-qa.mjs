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
  "interni linkovi",
  "internal links point",
  "struktura sajta",
  "site structure",
  "arhive vodiča",
  "guide archive",
  "detaljan deo šire teme",
  "detailed part of the wider",
  "ne procenjuje izolovano",
  "should not be assessed in isolation",
];

const forbiddenRuntimeHeadingPatterns = [
  {
    pattern: /kako koristiti (?:naš |nas )?(?:kalkulator|ovu strukturu|strukturu)/i,
    message: "main-body H2s must not explain how to use our site structure or calculator",
  },
  {
    pattern: /how to use (?:our )?(?:calculator|structure|this structure)/i,
    message: "main-body H2s must not explain how to use our site structure or calculator",
  },
  {
    pattern: /detaljni vodiči.*(?:otvoriti|konkret|scenar)/i,
    message: "main-body H2s must not be detailed-guide navigation",
  },
  {
    pattern: /(?:kako|kada).*detaljn.*vodič/i,
    message: "main-body H2s must not be detailed-guide navigation",
  },
  {
    pattern: /detailed guides.*(?:open|specific|scenario)/i,
    message: "main-body H2s must not be detailed-guide navigation",
  },
  {
    pattern: /(?:how|when).*detailed guides?/i,
    message: "main-body H2s must not be detailed-guide navigation",
  },
  {
    pattern: /zašto .*stranic.*linkuj/i,
    message: "main-body H2s must not expose internal linking logic",
  },
  {
    pattern: /kako se .*stranic.*povez/i,
    message: "main-body H2s must not expose internal page-structure logic",
  },
  {
    pattern: /kako povezati ovu temu/i,
    message: "main-body H2s must not expose internal content-taxonomy logic",
  },
  {
    pattern: /kako povezati opšti problem/i,
    message: "main-body H2s must not expose content-taxonomy framing",
  },
  {
    pattern: /kako odabrati .*vodič/i,
    message: "main-body H2s must not describe guide navigation",
  },
  {
    pattern: /why .*pages?.*link back/i,
    message: "main-body H2s must not expose internal linking logic",
  },
  {
    pattern: /how this page connects/i,
    message: "main-body H2s must not expose internal page-structure logic",
  },
  {
    pattern: /how this topic connects/i,
    message: "main-body H2s must not expose internal content-taxonomy logic",
  },
  {
    pattern: /how to connect a broad disruption/i,
    message: "main-body H2s must not expose content-taxonomy framing",
  },
  {
    pattern: /how to choose .*guide/i,
    message: "main-body H2s must not describe guide navigation",
  },
  {
    pattern: /how this topic affects/i,
    message: "main-body H2s must name the concrete passenger/legal issue, not refer to this topic",
  },
  {
    pattern: /(?:glavne strane|main pages).*autoritet|authority/i,
    message: "main-body H2s must not expose SEO authority logic",
  },
  {
    pattern: /(?:budućim tekstovima|future articles)/i,
    message: "main-body H2s must not describe future content production",
  },
  {
    pattern: /(?:automatsku procenu|automatic estimate)/i,
    message: "main-body H2s must not be about internal automatic estimates",
  },
  {
    pattern: /kako se odlučuje da li slučaj pripada/i,
    message: "main-body H2s must not expose content-taxonomy logic",
  },
  {
    pattern: /how to decide whether the case belongs/i,
    message: "main-body H2s must not expose content-taxonomy logic",
  },
  {
    pattern: /kako ovaj slučaj uklopiti u širu procenu/i,
    message: "generic reusable H2s must be replaced with topic-specific headings",
  },
  {
    pattern: /dokazi koji menjaju ishod zahteva/i,
    message: "generic reusable H2s must be replaced with topic-specific headings",
  },
  {
    pattern: /kada ne treba stati na prvom odgovoru aviokompanije/i,
    message: "generic reusable H2s must be replaced with topic-specific headings",
  },
  {
    pattern: /how this case fits into the wider assessment/i,
    message: "generic reusable H2s must be replaced with topic-specific headings",
  },
  {
    pattern: /evidence that can change the outcome/i,
    message: "generic reusable H2s must be replaced with topic-specific headings",
  },
  {
    pattern: /when not to stop at the airline's first answer/i,
    message: "generic reusable H2s must be replaced with topic-specific headings",
  },
  {
    pattern: /kako izbeći najčešće greške/i,
    message: "overbroad generic H2s need a concrete passenger-rights or legal-condition angle",
  },
  {
    pattern: /how to avoid common mistakes/i,
    message: "overbroad generic H2s need a concrete passenger-rights or legal-condition angle",
  },
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

const requiredBlogContentSkeleton = {
  sr: [
    "Ruta, vreme i odgovornost aviokompanije",
    "Dokumenti koje treba sačuvati za proveru",
    "Šta ako aviokompanija odbije zahtev",
  ],
  en: [
    "Route, timing and airline responsibility",
    "Documents to save for review",
    "What if the airline rejects the claim",
  ],
};

const wordPattern = /[\p{L}\p{N}]+/gu;
const cyrillicPattern = /[\u0400-\u04FF]/u;
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
    formatDisplayDate: require(path.join(root, "src/lib/date-format.ts")).formatDisplayDate,
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

function checkNoCyrillicPublicCopy() {
  for (const file of publicCopyFiles) {
    const source = read(file);
    for (const literal of extractStringLiterals(source)) {
      if (cyrillicPattern.test(literal.value)) {
        addIssue({
          type: "cyrillic_public_copy",
          file,
          line: literal.line,
          message: "public copy contains Cyrillic characters; Serbian site copy must stay Latin-only",
          suggestedFix:
            "Rewrite the affected Serbian text in Latin script and avoid locale formatters that output Cyrillic.",
        });
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
      const min = page.id === "flight-delay-compensation" ? 3000 : 2500;
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

function checkRuntimeHeadingQuality() {
  const { blogArticles, cornerstonePages } = loadRuntimeContent();

  const blocks = [
    ...blogArticles.flatMap((article) =>
      ["sr", "en"].map((locale) => ({
        file: "src/lib/blog.ts",
        article: article.id,
        locale,
        title: article[locale].title,
        sections: article[locale].sections,
      })),
    ),
    ...cornerstonePages.flatMap((page) =>
      ["sr", "en"].map((locale) => ({
        file: "src/lib/cornerstones.ts",
        article: page.id,
        locale,
        title: page[locale].title,
        sections: page[locale].sections,
      })),
    ),
  ];

  for (const block of blocks) {
    for (const section of block.sections) {
      if (section.heading.startsWith(`${block.title}:`)) {
        addIssue({
          type: "title_prefixed_reusable_heading",
          file: block.file,
          article: block.article,
          locale: block.locale,
          heading: section.heading,
          message: `${block.locale.toUpperCase()} heading "${section.heading}" starts with the full page/article title and reads like a reusable template`,
          suggestedFix:
            "Use a natural reader-task heading without prefixing the full title, for example route/timing, evidence, expenses, or airline response.",
        });
      }

      for (const check of forbiddenRuntimeHeadingPatterns) {
        if (check.pattern.test(section.heading)) {
          addIssue({
            type: "meta_public_heading",
            file: block.file,
            article: block.article,
            locale: block.locale,
            heading: section.heading,
            message: `${block.locale.toUpperCase()} heading "${section.heading}" violates P1 content process: ${check.message}`,
            suggestedFix:
              "Replace the heading with direct search intent, a legal/eligibility condition, or a competitor-supported user step.",
          });
        }
      }
    }
  }
}

function checkRuntimeBlogContentSkeleton() {
  const { blogArticles } = loadRuntimeContent();

  for (const article of blogArticles) {
    for (const locale of ["sr", "en"]) {
      const headings = article[locale].sections.map((section) => section.heading);
      const missingHeadings = requiredBlogContentSkeleton[locale].filter(
        (headingSuffix) => !headings.some((heading) => heading.endsWith(headingSuffix)),
      );

      if (missingHeadings.length > 0) {
        addIssue({
          type: "missing_blog_content_skeleton",
          file: "src/lib/blog-content-enhancements.ts",
          article: article.id,
          locale,
          missingHeadings,
          message: `${locale.toUpperCase()} blog article ${article.id} is missing the required reusable content skeleton`,
          suggestedFix:
            "Keep all blog articles routed through enhanceBlogArticle and preserve the wider-assessment, evidence, and airline-response sections in both languages.",
        });
      }
    }
  }

  const blogSource = read("src/lib/blog.ts");
  if (!/blogArticles\s*=\s*rawBlogArticles\.map\(enhanceBlogArticle\)/.test(blogSource)) {
    addIssue({
      type: "blog_enhancement_pipeline_bypassed",
      file: "src/lib/blog.ts",
      message: "blogArticles must route every source article through enhanceBlogArticle",
      suggestedFix:
        "Export blogArticles as rawBlogArticles.map(enhanceBlogArticle) so the reusable content skeleton applies to every blog.",
    });
  }

  const enhancementSource = read("src/lib/blog-content-enhancements.ts");
  for (const headings of Object.values(requiredBlogContentSkeleton)) {
    for (const headingSuffix of headings) {
      if (!enhancementSource.includes(headingSuffix)) {
        addIssue({
          type: "blog_content_skeleton_source_missing",
          file: "src/lib/blog-content-enhancements.ts",
          message: `required topic-specific blog content skeleton suffix is missing from the enhancement source: ${headingSuffix}`,
          suggestedFix:
            "Restore the approved reusable blog content skeleton in blog-content-enhancements.ts.",
        });
      }
    }
  }

  const articlePageSource = read("src/components/blog-article-page.tsx");
  for (const visualName of [
    "ArticleEvidenceVisual",
    "ArticleProcessVisual",
    "ArticleQuickCheckBanner",
    "ArticleContextImage",
  ]) {
    if (!articlePageSource.includes(visualName)) {
      addIssue({
        type: "blog_visual_skeleton_missing",
        file: "src/components/blog-article-page.tsx",
        message: `blog article page must keep the reusable visual module ${visualName}`,
        suggestedFix:
          "Keep reusable article visuals distributed through BlogArticlePageView so every blog has useful visual support.",
      });
    }
  }

  if (/<aside\b/.test(articlePageSource)) {
    addIssue({
      type: "blog_sidebar_form_present",
      file: "src/components/blog-article-page.tsx",
      message: "blog article pages must not render the old sticky sidebar form",
      suggestedFix:
        "Keep article pages as a wide reading layout and use the in-body quick-check banner after the early H2 sections.",
    });
  }

  if (!/index\s*===\s*0[\s\S]{0,140}<ArticleQuickCheckBanner/.test(articlePageSource)) {
    addIssue({
      type: "blog_quick_check_wrong_position",
      file: "src/components/blog-article-page.tsx",
      message: "standard blog quick-check CTA must render immediately after the first H2 section",
      suggestedFix:
        "Render ArticleQuickCheckBanner when index === 0 and keep other visuals distributed later in the article.",
    });
  }

  if (!articlePageSource.includes("ClaimInlineCtaButton")) {
    addIssue({
      type: "blog_quick_check_uses_landing_anchor",
      file: "src/components/blog-article-page.tsx",
      message: "blog quick-check CTA must open the claim flow directly instead of linking to the landing-page form",
      suggestedFix:
        "Use ClaimInlineCtaButton inside ArticleQuickCheckBanner.",
    });
  }

  const cornerstonePageSource = read("src/components/cornerstone-page.tsx");
  const cornerstoneTypographySource = read("src/components/cornerstone-typography-preview.tsx");

  if (!/cornerstonePages\.some\(\(guide\) => guide\.id === page\.id\)/.test(cornerstonePageSource)) {
    addIssue({
      type: "cornerstone_typography_template_not_global",
      file: "src/components/cornerstone-page.tsx",
      message: "all main guide pages must route through the wide typography template",
      suggestedFix:
        "Render CornerstoneTypographyPreview for every cornerstone page so the sticky moving TOC, wide article body and in-body visuals apply globally.",
    });
  }

  if (!cornerstoneTypographySource.includes("ScrollProgressToc")) {
    addIssue({
      type: "cornerstone_scroll_toc_missing",
      file: "src/components/cornerstone-typography-preview.tsx",
      message: "main guide pages must keep the sticky moving subheading navigation",
      suggestedFix:
        "Keep ScrollProgressToc in the global cornerstone typography template.",
    });
  }

  if (!cornerstoneTypographySource.includes("GuideQuickCheckBanner")) {
    addIssue({
      type: "cornerstone_quick_check_missing",
      file: "src/components/cornerstone-typography-preview.tsx",
      message: "main guide pages must keep the in-body quick-check CTA module",
      suggestedFix:
        "Keep GuideQuickCheckBanner in the global cornerstone typography template after the early H2 sections.",
    });
  }

  if (!/index\s*===\s*0[\s\S]{0,140}<GuideQuickCheckBanner/.test(cornerstoneTypographySource)) {
    addIssue({
      type: "cornerstone_quick_check_wrong_position",
      file: "src/components/cornerstone-typography-preview.tsx",
      message: "main guide quick-check CTA must render immediately after the first H2 section",
      suggestedFix:
        "Render GuideQuickCheckBanner when index === 0 and distribute the remaining visuals later in the guide.",
    });
  }

  if (!cornerstoneTypographySource.includes("ClaimInlineCtaButton")) {
    addIssue({
      type: "cornerstone_quick_check_uses_landing_anchor",
      file: "src/components/cornerstone-typography-preview.tsx",
      message: "main guide quick-check CTA must open the claim flow directly instead of linking to the landing-page form",
      suggestedFix:
        "Use ClaimInlineCtaButton inside GuideQuickCheckBanner.",
    });
  }
}

function runtimeArticleText(article, locale) {
  const localized = article[locale];
  return [
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
  ].join(" ");
}

function runtimeCornerstoneText(page, locale) {
  const localized = page[locale];
  return [
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
  ].join(" ");
}

function normalizeInternalLinkHref(href) {
  return href.trim().replace(/#.*$/, "").replace(/\/$/, "") || "/";
}

function normalizeInternalLinkAnchor(anchor) {
  return anchor.trim().replace(/\s+/g, " ").toLocaleLowerCase();
}

function markdownLinksFromText(text) {
  return [...text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((match) => ({
    anchor: match[1],
    href: match[2],
  }));
}

function checkInternalLinkDensityForBlock({ file, article, locale, paragraphs }) {
  const seenHrefs = new Map();
  const seenAnchors = new Map();

  for (const paragraph of paragraphs) {
    const links = markdownLinksFromText(paragraph);
    const internalLinks = links.filter(
      (link) =>
        link.href.startsWith("/") &&
        !link.href.startsWith("//") &&
        !link.href.startsWith("/#"),
    );

    if (internalLinks.length > 2) {
      addIssue({
        type: "inline_link_cluster",
        file,
        article,
        locale,
        message: `${locale.toUpperCase()} paragraph contains ${internalLinks.length} internal links; public copy must not read like a link dump`,
        suggestedFix:
          "Keep at most two contextual inline links in a paragraph and distribute remaining links into relevant H2 sections or the approved detailed-guides module.",
      });
    }

    if (internalLinks.length > 1 && /\]\([^)]+\)\s*(?:,|;|\bi\b|\band\b)\s*\[/.test(paragraph)) {
      addIssue({
        type: "inline_link_dump",
        file,
        article,
        locale,
        message: `${locale.toUpperCase()} paragraph lists internal markdown links back-to-back`,
        suggestedFix:
          "Rewrite the paragraph so each link is part of a normal explanatory sentence, not a comma-separated title list.",
      });
    }

    for (const link of links) {
      if (
        !link.href.startsWith("/") ||
        link.href.startsWith("//") ||
        link.href.startsWith("/#")
      ) {
        continue;
      }

      const href = normalizeInternalLinkHref(link.href);
      const anchor = normalizeInternalLinkAnchor(link.anchor);

      if (seenHrefs.has(href)) {
        addIssue({
          type: "duplicate_internal_link_target",
          file,
          article,
          locale,
          target: href,
          message: `${locale.toUpperCase()} body links to ${href} more than once`,
          suggestedFix:
            "Keep only the first contextual link to this target in the article/guide body; render later mentions as plain text.",
        });
      } else {
        seenHrefs.set(href, true);
      }

      if (seenAnchors.has(anchor)) {
        addIssue({
          type: "duplicate_internal_link_anchor",
          file,
          article,
          locale,
          anchor: link.anchor,
          message: `${locale.toUpperCase()} body uses linked anchor "${link.anchor}" more than once`,
          suggestedFix:
            "Use each anchor word or phrase as a link only once in the article/guide body; render later mentions as plain text.",
        });
      } else {
        seenAnchors.set(anchor, true);
      }
    }
  }
}

function checkRuntimeInternalLinkDensity() {
  const { blogArticles, cornerstonePages } = loadRuntimeContent();

  for (const article of blogArticles) {
    for (const locale of ["sr", "en"]) {
      checkInternalLinkDensityForBlock({
        file: "src/lib/blog.ts",
        article: article.id,
        locale,
        paragraphs: article[locale].sections.flatMap((section) => section.body),
      });
    }
  }

  for (const page of cornerstonePages) {
    for (const locale of ["sr", "en"]) {
      checkInternalLinkDensityForBlock({
        file: "src/lib/cornerstones.ts",
        article: page.id,
        locale,
        paragraphs: page[locale].sections.flatMap((section) => section.body),
      });
    }
  }
}

function checkInterlinkingGuardrails() {
  const instructionSource = read("AGENTS.md");
  const inlineRichTextSource = read("src/components/inline-rich-text.tsx");
  const blogIndexSource = read("src/components/blog-index-page.tsx");
  const proxySource = read("src/proxy.ts");
  const bodyRenderSources = [
    "src/components/blog-article-page.tsx",
    "src/components/cornerstone-page.tsx",
    "src/components/cornerstone-typography-preview.tsx",
  ];

  if (!/same target URL at most once/.test(instructionSource)) {
    addIssue({
      type: "missing_interlinking_density_instruction",
      file: "AGENTS.md",
      message: "project instructions must include the approved internal-link density rule",
      suggestedFix:
        "Document that each rendered article/guide body may link to a target URL at most once and may use an anchor phrase as a link at most once.",
    });
  }

  for (const instructionCheck of [
    {
      pattern: /at most two inline links/,
      type: "missing_inline_link_cluster_instruction",
      message: "project instructions must forbid link-dump paragraphs",
      suggestedFix:
        "Document that paragraphs may contain at most two inline links and must not list full article titles as comma-separated links.",
    },
    {
      pattern: /same reusable in-body visual module twice/,
      type: "missing_duplicate_visual_instruction",
      message: "project instructions must forbid duplicate reusable visuals on one public page",
      suggestedFix:
        "Document that a reusable visual module must not be rendered twice on the same article or guide page.",
    },
  ]) {
    if (!instructionCheck.pattern.test(instructionSource)) {
      addIssue({
        file: "AGENTS.md",
        ...instructionCheck,
      });
    }
  }

  for (const requiredToken of ["InterlinkingScope", "maxAutoLinks = 0"]) {
    if (!inlineRichTextSource.includes(requiredToken)) {
      addIssue({
        type: "missing_deterministic_interlinking_guard",
        file: "src/components/inline-rich-text.tsx",
        message: `inline rich text renderer is missing ${requiredToken}`,
        suggestedFix:
          "Keep inline rendering deterministic: explicit markdown links only by default; no render-time auto-link mutation.",
      });
    }
  }

  if (/useContext|createContext/.test(inlineRichTextSource)) {
    addIssue({
      type: "mutable_interlinking_render_state",
      file: "src/components/inline-rich-text.tsx",
      message: "inline link rendering must not mutate shared React context during render",
      suggestedFix:
        "Keep duplicate link control in content QA and benchmark scripts, not in hydration-sensitive render state.",
    });
  }

  for (const file of bodyRenderSources) {
    const source = read(file);

    if (!source.includes("InterlinkingScope")) {
      addIssue({
        type: "missing_interlinking_scope",
        file,
        message: "article/guide body must render InlineRichText inside InterlinkingScope",
        suggestedFix:
          "Wrap the body sections that render InlineRichText with InterlinkingScope so link target and anchor usage is tracked across the full text.",
      });
    }
  }

  const typographySource = read("src/components/cornerstone-typography-preview.tsx");
  if (
    /index\s*===\s*\d+[\s\S]{0,60}\|\|[\s\S]{0,60}index\s*===\s*\d+[\s\S]{0,160}<GuideCaseFileVisual/.test(typographySource)
  ) {
    addIssue({
      type: "duplicate_generic_cornerstone_visual",
      file: "src/components/cornerstone-typography-preview.tsx",
      message: "a generic guide visual must not be rendered more than once on a main guide page",
      suggestedFix:
        "Render the generic guide visual at a single point only, or replace repeated instances with section-specific visual modules.",
    });
  }

  if (
    !blogIndexSource.includes("articleMatchesFilter") ||
    !blogIndexSource.includes("?tema=")
  ) {
    addIssue({
      type: "missing_blog_category_filtering",
      file: "src/components/blog-index-page.tsx",
      message: "blog category pills must filter the blog index by topic, not navigate away to a guide",
      suggestedFix:
        "Keep category pills wired to /blog?tema=... and filter the displayed article list by topic.",
    });
  }

  if (
    /categoryList[\s\S]*getCornerstoneHref\(cornerstonePages/.test(blogIndexSource) ||
    /categoryList[\s\S]*href:\s*"#compensation-rights"/.test(blogIndexSource)
  ) {
    addIssue({
      type: "blog_category_links_are_not_filters",
      file: "src/components/blog-index-page.tsx",
      message: "blog category pills must not link to cornerstone pages or page anchors",
      suggestedFix:
        "Use query-string filters for blog index categories and reserve cornerstone URLs for article cards and guide links.",
    });
  }

  if (
    fs.existsSync(path.join(root, "src/app/blog/[slug]/page.tsx")) ||
    fs.existsSync(path.join(root, "src/app/en/blog/[slug]/page.tsx")) ||
    /["']\/(?:en\/)?blog\/[^"']+["']/.test(proxySource)
  ) {
    addIssue({
      type: "legacy_blog_article_url_surface",
      file: "src/app",
      message:
        "legacy /blog/[slug] and /en/blog/[slug] article URLs must not be served as indexable article pages or linked publicly",
      suggestedFix:
        "Keep only /blog and /en/blog as index pages. Legacy article URL handlers may exist only as 301 redirects to canonical cornerstone URLs, and they must stay out of sitemap/internal links.",
    });
  }
}

function checkRuntimeSerbianLatinScript() {
  const { blogArticles, cornerstonePages, formatDisplayDate } = loadRuntimeContent();

  for (const article of blogArticles) {
    const text = [
      runtimeArticleText(article, "sr"),
      formatDisplayDate(article.publishedAt, "sr"),
      formatDisplayDate(article.updatedAt, "sr"),
    ].join(" ");

    if (cyrillicPattern.test(text)) {
      addIssue({
        type: "runtime_serbian_cyrillic",
        file: "src/lib/blog.ts",
        article: article.id,
        locale: "sr",
        message: "Serbian blog article renders Cyrillic characters; blog content must stay Latin-only",
        suggestedFix:
          "Convert Serbian content and formatted date output to Latin script before publishing.",
      });
    }
  }

  for (const page of cornerstonePages) {
    const text = [
      runtimeCornerstoneText(page, "sr"),
      formatDisplayDate(page.updatedAt, "sr"),
    ].join(" ");

    if (cyrillicPattern.test(text)) {
      addIssue({
        type: "runtime_serbian_cyrillic",
        file: "src/lib/cornerstones.ts",
        article: page.id,
        locale: "sr",
        message: "Serbian main guide renders Cyrillic characters; guide content must stay Latin-only",
        suggestedFix:
          "Convert Serbian content and formatted date output to Latin script before publishing.",
      });
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
checkNoCyrillicPublicCopy();
checkDailyArticleShape();
checkDuplicateIdsAndSlugs();
checkInterlinkingAntiPatterns();
checkInterlinkingGuardrails();
checkPublicShell();
checkRuntimeContentDepth();
checkRuntimeHeadingQuality();
checkRuntimeBlogContentSkeleton();
checkRuntimeSerbianLatinScript();
checkRuntimeInternalLinkDensity();

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
