import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import ts from "typescript";

// Vlasnikova pravila za tekst posetiocima (25.09.2026), automatski proverena na novoj početnoj:
// brend se piše „Letkasni.rs“, bez obećanja rokova isplate i bez „otkazivanja“ u tekstu o kašnjenju.
export const homeCopyFiles = ["src/components/lk-v2/copy.ts"];

const notWord = String.raw`[\p{L}\p{N}]`;
const brand = new RegExp(String.raw`(?<![\p{L}\p{N}@./-])letkasni\.rs(?!${notWord})`, "giu");
const amount = String.raw`(?:\d+|jedan|jedna|jednog|dva|dve|tri|četiri|pet|šest|sedam|osam|devet|deset|nekoliko|par|one|two|three|four|five|six|seven|eight|nine|ten|a few|few|several|a couple of)`;
const unit = String.raw`(?:dana|dan|nedelja|nedelje|nedelju|meseca|mesec|meseci|days?|weeks?|months?)`;
const payoutTimeline = new RegExp(
  String.raw`(?<!${notWord})${amount}\s*(?:[-–]\s*${amount}\s*)?${unit}(?!${notWord})`,
  "iu",
);
const delayWords = /kašnj|kasni|delay/iu;
const cancelWords = /otkaz|cancel/iu;

export function findCopyRuleViolations(entries) {
  const violations = [];

  for (const { locale, path, text } of entries) {
    for (const match of text.matchAll(brand)) {
      if (match[0] !== "Letkasni.rs") {
        violations.push({ locale, path, rule: "brand", detail: `"${match[0]}" must be written as "Letkasni.rs"`, text });
      }
    }

    const timeline = text.match(payoutTimeline);
    if (timeline) {
      violations.push({ locale, path, rule: "payout-timeline", detail: `"${timeline[0]}" promises a timeline`, text });
    }

    // „Letkasni“ sadrži „kasni“, pa se ime brenda ne računa kao tekst o kašnjenju
    const withoutBrand = text.replace(/letkasni/giu, "");
    if (delayWords.test(withoutBrand) && cancelWords.test(withoutBrand)) {
      violations.push({ locale, path, rule: "delay-without-cancellation", detail: "delay copy mentions cancellation", text });
    }
  }

  return violations;
}

function findCopyObject(sourceFile) {
  let copyObject;
  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const declaration of node.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === "copy" && declaration.initializer) {
        let initializer = declaration.initializer;
        while (ts.isAsExpression(initializer) || ts.isSatisfiesExpression(initializer) || ts.isParenthesizedExpression(initializer)) {
          initializer = initializer.expression;
        }
        if (ts.isObjectLiteralExpression(initializer)) copyObject = initializer;
      }
    }
  });
  return copyObject;
}

function collectStrings(node, sourceFile, locale, path, output) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    output.push({ locale, path, text: node.text });
  } else if (ts.isObjectLiteralExpression(node)) {
    for (const property of node.properties) {
      if (ts.isPropertyAssignment(property)) {
        const name = property.name.getText(sourceFile).replaceAll(/["']/g, "");
        collectStrings(property.initializer, sourceFile, locale, `${path}.${name}`, output);
      }
    }
  } else if (ts.isArrayLiteralExpression(node)) {
    node.elements.forEach((element, index) => collectStrings(element, sourceFile, locale, `${path}[${index}]`, output));
  }
  return output;
}

function main() {
  const violations = [];
  let checked = 0;

  for (const file of homeCopyFiles) {
    const sourceFile = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const copyObject = findCopyObject(sourceFile);
    if (!copyObject) throw new Error(`${file}: copy object was not found`);

    const entries = [];
    for (const property of copyObject.properties) {
      if (!ts.isPropertyAssignment(property)) continue;
      const locale = property.name.getText(sourceFile).replaceAll(/["']/g, "");
      collectStrings(property.initializer, sourceFile, locale, locale, entries);
    }
    checked += entries.length;
    violations.push(...findCopyRuleViolations(entries).map((violation) => ({ file, ...violation })));
  }

  if (violations.length) {
    for (const { file, locale, path, rule, detail, text } of violations) {
      console.error(`${file} [${locale}] ${path}: ${rule}: ${detail}\n  ${text}`);
    }
    process.exit(1);
  }

  console.log(`Home copy rules passed: ${checked} strings checked (brand, payout timelines, delay vs cancellation).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
