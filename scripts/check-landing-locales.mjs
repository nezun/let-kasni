import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import ts from "typescript";

const file = "src/components/landing-page.tsx";

function unwrapExpression(node) {
  if (
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node) ||
    ts.isParenthesizedExpression(node)
  ) {
    return unwrapExpression(node.expression);
  }
  return node;
}

function parseLandingCopy(source, label) {
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  let landingCopy;
  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    for (const declaration of node.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === "copy" &&
        declaration.initializer
      ) {
        const initializer = unwrapExpression(declaration.initializer);
        if (ts.isObjectLiteralExpression(initializer)) {
          landingCopy = initializer;
        }
      }
    }
  });

  if (!landingCopy) {
    throw new Error(`${label}: landing-page copy object was not found in ${file}`);
  }

  const locales = {};
  for (const property of landingCopy.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const name = property.name.getText(sourceFile).replaceAll(/["']/g, "");
    if (name === "sr" || name === "en") {
      locales[name] = property.initializer;
    }
  }

  if (!locales.sr || !locales.en) {
    throw new Error(`${label}: landing-page copy must contain both sr and en locales`);
  }

  return { sourceFile, locales };
}

function propertyName(property, sourceFile) {
  if (!property.name) return "<unknown>";
  return property.name.getText(sourceFile).replaceAll(/["']/g, "");
}

function collectShape(node, sourceFile, path = "root", output = []) {
  if (ts.isObjectLiteralExpression(node)) {
    output.push(`${path}:object`);
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) {
        output.push(`${path}.<unsupported>:${property.kind}`);
        continue;
      }
      collectShape(
        property.initializer,
        sourceFile,
        `${path}.${propertyName(property, sourceFile)}`,
        output,
      );
    }
    return output;
  }

  if (ts.isArrayLiteralExpression(node)) {
    output.push(`${path}:array:${node.elements.length}`);
    node.elements.forEach((element, index) => {
      collectShape(element, sourceFile, `${path}[${index}]`, output);
    });
    return output;
  }

  output.push(`${path}:value`);
  return output;
}

function localeText(parsed, locale) {
  return parsed.locales[locale].getText(parsed.sourceFile);
}

function assertPairedChange(beforeSource, afterSource, label) {
  const before = parseLandingCopy(beforeSource, `${label} before`);
  const after = parseLandingCopy(afterSource, `${label} after`);
  const srChanged = localeText(before, "sr") !== localeText(after, "sr");
  const enChanged = localeText(before, "en") !== localeText(after, "en");

  if (srChanged !== enChanged) {
    throw new Error(
      `${label}: landing copy changed only in ${srChanged ? "Serbian" : "English"}. Update both locales in the same change.`,
    );
  }
}

function gitFile(revision) {
  try {
    return execFileSync("git", ["show", `${revision}:${file}`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null;
  }
}

const currentSource = readFileSync(file, "utf8");
const current = parseLandingCopy(currentSource, "working tree");
const srShape = collectShape(current.locales.sr, current.sourceFile);
const enShape = collectShape(current.locales.en, current.sourceFile);

if (JSON.stringify(srShape) !== JSON.stringify(enShape)) {
  throw new Error("Serbian and English landing-copy structures do not match");
}

const headSource = gitFile("HEAD");
if (headSource) {
  assertPairedChange(headSource, currentSource, "Working tree vs HEAD");
}

const parentSource = gitFile("HEAD^");
if (headSource && parentSource) {
  assertPairedChange(parentSource, headSource, "HEAD commit");
}

console.log("Landing locale check passed: SR and EN are structurally aligned and changed together.");
