import fs from "node:fs";
import path from "node:path";

function manifestFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) return manifestFiles(filename);
    return entry.name.endsWith("client-reference-manifest.js") ? [filename] : [];
  });
}

const appDirectory = path.resolve(".next/server/app");
const manifests = fs.existsSync(appDirectory) ? manifestFiles(appDirectory) : [];
if (!manifests.length) {
  throw new Error("No client-reference manifests found. Run npm run build before this check.");
}

const references = manifests.filter((filename) => fs.readFileSync(filename, "utf8")
  .replace(/\\+/g, "/").includes("src/components/inline-rich-text.tsx"));
if (references.length) {
  throw new Error(`InlineRichText returned to the browser client graph:\n${references.join("\n")}`);
}

console.log(`InlineRichText is absent from all ${manifests.length} built client-reference manifests.`);
