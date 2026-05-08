import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const checkpointPath = join(process.cwd(), "CHECKPOINT.md");
const packagePath = join(process.cwd(), "package.json");

const START = "<!-- BEGIN:generated-status -->";
const END = "<!-- END:generated-status -->";

function git(args) {
  try {
    return execFileSync("git", args, {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function listPackageScripts() {
  if (!existsSync(packagePath)) return "- No package.json found.";
  const pkg = JSON.parse(readFileSync(packagePath, "utf8"));
  const scripts = pkg.scripts || {};
  const preferred = ["dev", "lint", "build", "verify", "content:qa", "content:links", "content:benchmark", "checkpoint"];
  const names = preferred.filter((name) => scripts[name]);
  return names.length
    ? names.map((name) => `- \`npm run ${name}\`: \`${scripts[name]}\``).join("\n")
    : "- No package scripts found.";
}

function generatedStatus() {
  const branch = git(["branch", "--show-current"]) || "unknown";
  const commit = git(["log", "-1", "--oneline"]) || "unknown";
  const remote = git(["remote", "get-url", "origin"]) || "none";
  const status = git(["status", "--short"]) || "clean";
  const generatedAt = new Date().toISOString();

  return `${START}
Generated at: \`${generatedAt}\`

Branch: \`${branch}\`

Remote: \`${remote}\`

Latest local commit: \`${commit}\`

Worktree status:

\`\`\`text
${status}
\`\`\`

Useful commands:

${listPackageScripts()}
${END}`;
}

function updateCheckpoint() {
  if (!existsSync(checkpointPath)) {
    throw new Error("CHECKPOINT.md does not exist. Create it before running this script.");
  }

  const current = readFileSync(checkpointPath, "utf8");
  const nextBlock = generatedStatus();

  if (!current.includes(START) || !current.includes(END)) {
    throw new Error(`CHECKPOINT.md must contain ${START} and ${END} markers.`);
  }

  const pattern = new RegExp(`${START}[\\s\\S]*?${END}`);
  const next = current.replace(pattern, nextBlock);
  writeFileSync(checkpointPath, next);
}

updateCheckpoint();
console.log("Updated CHECKPOINT.md generated status block.");
