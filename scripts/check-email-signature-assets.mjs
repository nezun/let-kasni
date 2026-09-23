import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const production = process.argv.includes("--production");
const publicBaseUrl = "https://letkasni.rs";

const assets = [
  {
    path: "/email-signature/v1/facebook.png",
    width: 112,
    height: 112,
    sha256: "e8ec118bb752f0a001c61c82621fcf6951032a2ca993fa94dfd2fd2fbda441a2",
  },
  {
    path: "/email-signature/v1/instagram.png",
    width: 112,
    height: 112,
    sha256: "8228af8e581ac36da64edc853696ac428210ec93d62f04d6366ddfb14cfa6821",
  },
  {
    path: "/email-signature/v1/letkasni-logo.png",
    width: 496,
    height: 144,
    sha256: "07de2bbb22f92a70e707e7d58af339fce22da42c867398cd66e67a34c00a2c13",
  },
  {
    path: "/email-signature/v1/marko-jovanovic-portrait.png",
    width: 400,
    height: 400,
    sha256: "ecf650dfd9af314060386a8444068f52fde2ec46d2e7c264eaa69f0faecd187e",
  },
];

function inspectPng(buffer, assetPath) {
  const signature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== signature) {
    throw new Error(`${assetPath}: file is not a PNG.`);
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    sha256: createHash("sha256").update(buffer).digest("hex"),
  };
}

function assertAsset(actual, expected, location) {
  if (actual.width !== expected.width || actual.height !== expected.height) {
    throw new Error(
      `${location}: expected ${expected.width}x${expected.height}, got ${actual.width}x${actual.height}.`,
    );
  }

  if (actual.sha256 !== expected.sha256) {
    throw new Error(`${location}: SHA-256 does not match the approved asset.`);
  }
}

for (const asset of assets) {
  const localPath = path.join(root, "public", asset.path);
  const localBuffer = await readFile(localPath);
  assertAsset(inspectPng(localBuffer, localPath), asset, localPath);

  if (production) {
    const url = `${publicBaseUrl}${asset.path}`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`${url}: HTTP ${response.status}.`);

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("image/png")) {
      throw new Error(`${url}: expected image/png, got ${contentType || "no content type"}.`);
    }

    const remoteBuffer = Buffer.from(await response.arrayBuffer());
    assertAsset(inspectPng(remoteBuffer, url), asset, url);
  }
}

console.log(
  production
    ? "Email signature assets: local and production checks passed."
    : "Email signature assets: local checks passed.",
);
