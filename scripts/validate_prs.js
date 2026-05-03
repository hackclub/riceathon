const fs = require("fs");
const { execSync } = require("child_process");

function validateShape(entry, index) {
  const errors = [];
  const name = entry.name || "(unnamed)";
  const label = "Entry " + index + ' ("' + name + '")';

  if (!entry.name || typeof entry.name !== "string")
    errors.push(label + ': "name" must be a non-empty string');
  if (!entry.distro || typeof entry.distro !== "string")
    errors.push(`${label}: "distro" must be a non-empty string`);
  if (entry.git !== undefined && (typeof entry.git !== "string" || !entry.git.startsWith("https://")))
    errors.push(`${label}: "git" must be an https:// URL`);
  if (!Array.isArray(entry.images) || entry.images.length === 0) {
    errors.push(`${label}: "images" must be a non-empty array`);
  } else {
    for (const img of entry.images) {
      if (typeof img !== "string" || !img.startsWith("https://"))
        errors.push(`${label}: image "${img}" must be an https:// URL`);
    }
  }
  if (entry.version !== undefined && typeof entry.version !== "number")
    errors.push(`${label}: "version" must be a number`);

  return errors;
}

async function checkUrl(url) {
  try {
    // Try HEAD first, fall back to GET (some CDNs reject HEAD)
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) return null;
    res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    if (res.ok) return null;
    return `${url} returned ${res.status}`;
  } catch (e) {
    return `${url} failed: ${e.message}`;
  }
}

function getBaseMembers() {
  try {
    const base = execSync("git show origin/main:members.json", { encoding: "utf-8" });
    return JSON.parse(base);
  } catch {
    return [];
  }
}

function findNewEntries(current, base) {
  const baseNames = new Set(base.map((e) => JSON.stringify(e)));
  return current.filter((e) => !baseNames.has(JSON.stringify(e)));
}

async function main() {
  const raw = fs.readFileSync("members.json", "utf-8");
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.error("Broken JSON:", e.message);
    process.exit(1);
  }

  if (!Array.isArray(parsed)) {
    console.error("members.json is not an array");
    process.exit(1);
  }

  // Validate shape of every entry
  const shapeErrors = parsed.flatMap((entry, i) => validateShape(entry, i));
  for (const err of shapeErrors) console.error(err);

  // URL-check only new/changed entries
  const base = getBaseMembers();
  const newEntries = findNewEntries(parsed, base);
  console.log(`Found ${newEntries.length} new/changed entries to URL-check`);

  const urlErrors = [];
  for (const entry of newEntries) {
    const label = `"${entry.name}"`;

    if (entry.git) {
      const err = await checkUrl(entry.git);
      if (err) urlErrors.push(`${label} git: ${err}`);
    }

    for (const img of entry.images || []) {
      const err = await checkUrl(img);
      if (err) urlErrors.push(`${label} image: ${err}`);
    }
  }

  for (const err of urlErrors) console.error(err);

  const totalErrors = shapeErrors.length + urlErrors.length;
  if (totalErrors > 0) {
    console.error(`\n${totalErrors} error(s) found`);
    process.exit(1);
  }

  console.log("members.json is valid");
}

main();
