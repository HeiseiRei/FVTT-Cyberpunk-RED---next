import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repository = "https://github.com/HeiseiRei/FVTT-Cyberpunk-RED---next";
const excludedDirectories = new Set([".git", ".github", "dist", "node_modules"]);
const errors = [];
let jsonFileCount = 0;

function report(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

async function findJsonFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) {
      continue;
    }

    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findJsonFiles(path)));
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(path);
    }
  }

  return files;
}

async function validateJsonFiles() {
  const files = await findJsonFiles(root);

  for (const file of files) {
    try {
      JSON.parse(await readFile(file, "utf8"));
      jsonFileCount += 1;
    } catch (error) {
      errors.push(`${relative(root, file)}: invalid JSON: ${error.message}`);
    }
  }
}

async function validateReference(reference, label, expectedType = "file") {
  report(typeof reference === "string" && reference.length > 0, `${label} must be a non-empty path`);
  if (typeof reference !== "string" || reference.length === 0) {
    return;
  }

  const normalized = reference.replaceAll("\\", "/");
  const absolutePath = resolve(root, normalized);
  const relativePath = relative(root, absolutePath);
  report(
    !isAbsolute(relativePath) && relativePath !== ".." && !relativePath.startsWith(`..${sep}`),
    `${label} escapes the system directory: ${reference}`,
  );
  if (isAbsolute(relativePath) || relativePath === ".." || relativePath.startsWith(`..${sep}`)) {
    return;
  }

  try {
    const metadata = await stat(absolutePath);
    report(
      expectedType === "directory" ? metadata.isDirectory() : metadata.isFile(),
      `${label} is not a ${expectedType}: ${reference}`,
    );
  } catch {
    errors.push(`${label} does not exist: ${reference}`);
  }
}

function localSystemPath(reference, label) {
  const prefix = `systems/${manifest.id}/`;
  if (typeof reference !== "string") {
    errors.push(`${label} must be a system asset path`);
    return "";
  }
  report(reference.startsWith(prefix), `${label} must start with ${prefix}`);
  return reference.slice(prefix.length);
}

const manifestPath = join(root, "system.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

report(/^[a-z0-9][a-z0-9-]*$/.test(manifest.id), "system.json must declare a valid package id");
report(typeof manifest.version === "string" && manifest.version.length > 0, "system.json must declare a version");
report(typeof manifest.title === "string" && manifest.title.length > 0, "system.json must declare a title");
report(
  manifest.compatibility && Number.isInteger(manifest.compatibility.minimum),
  "system.json must declare a minimum Foundry compatibility version",
);
report(
  typeof manifest.compatibility?.verified === "string" && manifest.compatibility.verified.length > 0,
  "system.json must declare a verified Foundry compatibility version",
);
report(
  manifest.compatibility?.maximum == null || Number.isInteger(manifest.compatibility.maximum),
  "system.json maximum compatibility version must be an integer when provided",
);

for (const field of ["esmodules", "styles", "languages", "packs", "packFolders"]) {
  report(Array.isArray(manifest[field]), `system.json ${field} must be an array`);
}
report(
  manifest.scripts == null || Array.isArray(manifest.scripts),
  "system.json scripts must be an array when provided",
);

for (const field of ["url", "manifest", "download"]) {
  try {
    const url = new URL(manifest[field]);
    report(url.protocol === "https:", `system.json ${field} must use HTTPS`);
  } catch {
    errors.push(`system.json must declare a valid HTTPS ${field} URL`);
  }
}

report(manifest.url === repository, `system.json url must point to ${repository}`);
report(
  manifest.manifest === `${repository}/releases/latest/download/system.json`,
  "system.json manifest must use the stable latest-release manifest URL",
);
const normalizedVersion =
  typeof manifest.version === "string" ? manifest.version.replace(/^v/, "") : "";
const releaseTag = `v${normalizedVersion}`;
report(
  normalizedVersion.length > 0 &&
    manifest.download === `${repository}/releases/download/${releaseTag}/cyberpunk-red-core-${releaseTag}.zip`,
  "system.json download must point to the versioned archive matching its version",
);

for (const field of ["esmodules", "scripts", "styles"]) {
  const paths = Array.isArray(manifest[field]) ? manifest[field] : [];
  for (const [index, path] of paths.entries()) {
    await validateReference(path, `system.json ${field}[${index}]`);
  }
}

const languages = Array.isArray(manifest.languages) ? manifest.languages : [];
for (const [index, language] of languages.entries()) {
  report(language && typeof language === "object", `system.json languages[${index}] must be an object`);
  if (!language || typeof language !== "object") {
    continue;
  }
  await validateReference(language.path, `system.json languages[${index}].path`);
}

const packs = Array.isArray(manifest.packs) ? manifest.packs : [];
for (const [index, pack] of packs.entries()) {
  report(pack && typeof pack === "object", `system.json packs[${index}] must be an object`);
  if (!pack || typeof pack !== "object") {
    continue;
  }
  report(typeof pack.name === "string" && pack.name.length > 0, `system.json packs[${index}] must declare a name`);
  await validateReference(pack.path, `system.json packs[${index}].path`, "directory");
  if (pack.banner) {
    await validateReference(
      localSystemPath(pack.banner, `system.json packs[${index}].banner`),
      `system.json packs[${index}].banner`,
    );
  }
}

if (manifest.background) {
  await validateReference(
    localSystemPath(manifest.background, "system.json background"),
    "system.json background",
  );
}

const packNames = new Set(packs.map((pack) => pack?.name).filter((name) => typeof name === "string"));
report(packNames.size === packs.length, "system.json declares duplicate or invalid compendium pack names");

const packFolders = Array.isArray(manifest.packFolders) ? manifest.packFolders : [];
for (const [folderIndex, folder] of packFolders.entries()) {
  report(folder && typeof folder === "object", `system.json packFolders[${folderIndex}] must be an object`);
  if (!folder || typeof folder !== "object") {
    continue;
  }
  report(Array.isArray(folder.packs), `system.json packFolders[${folderIndex}].packs must be an array`);
  for (const name of Array.isArray(folder.packs) ? folder.packs : []) {
    report(
      packNames.has(name),
      `system.json packFolders[${folderIndex}] references unknown pack ${name}`,
    );
  }
}

await validateJsonFiles();

if (errors.length > 0) {
  console.error(`Foundry system validation failed with ${errors.length} error(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Validated system.json and ${jsonFileCount} JSON files.`);
}
