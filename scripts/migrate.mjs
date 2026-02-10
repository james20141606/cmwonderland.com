#!/usr/bin/env node

/**
 * Migration script: Hexo blog posts → Astro (AstroPaper) format
 *
 * Handles:
 * - Front matter conversion (date→pubDatetime, mathjax→math, categories/tags arrays)
 * - Description extraction from <!-- more --> text
 * - Code block fixes (```{r} → ```r)
 * - Internal link updates (cmwonderland.com/blog/ → cmwonderland.com/)
 * - File renaming (strip numeric prefix, normalize)
 * - Year-based directory organization (src/data/blog/_2018/, _2019/ etc.)
 * - Removes duplicate file
 * - Removes <!-- more --> markers
 */

import fs from "fs";
import path from "path";

const SRC = path.resolve(
  "/Users/james/Desktop/website/jamesblog/james20141606.github.io/source/_posts"
);
const DEST = path.resolve(
  "/Users/james/Desktop/website/jamesblog/cmwonderland.com/src/data/blog"
);

// Files to skip
const SKIP_FILES = new Set(["108_25birthday_mengmeng copy.md"]);

// Read all markdown files
const files = fs
  .readdirSync(SRC)
  .filter(f => f.endsWith(".md") && !SKIP_FILES.has(f));

console.log(`Found ${files.length} markdown files to migrate`);

function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    console.warn("  No front matter found");
    return { frontMatter: {}, body: content };
  }
  const fmRaw = match[1];
  const body = match[2];

  const fm = {};
  let currentKey = null;
  let currentArrayItems = [];
  let inArray = false;

  for (const line of fmRaw.split("\n")) {
    // Array item: "- value"
    if (inArray && /^\s*-\s+(.+)$/.test(line)) {
      currentArrayItems.push(line.match(/^\s*-\s+(.+)$/)[1].trim());
      continue;
    }

    // If we were in array mode and hit a non-array line, save
    if (inArray) {
      fm[currentKey] = currentArrayItems;
      inArray = false;
      currentKey = null;
      currentArrayItems = [];
    }

    // Key: value
    const kvMatch = line.match(/^([a-zA-Z_#][a-zA-Z0-9_#]*)\s*:\s*(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1];
      const value = kvMatch[2].trim();
      if (value === "" || value === undefined) {
        // Could be start of array
        currentKey = key;
        inArray = true;
        currentArrayItems = [];
      } else {
        fm[key] = value;
      }
    }
  }

  if (inArray && currentKey) {
    fm[currentKey] = currentArrayItems;
  }

  return { frontMatter: fm, body };
}

function extractDescription(body) {
  const moreIdx = body.indexOf("<!-- more -->");
  const moreIdx2 = body.indexOf("<!--more-->");
  const idx =
    moreIdx !== -1 ? moreIdx : moreIdx2 !== -1 ? moreIdx2 : -1;

  if (idx === -1) {
    // Take first non-empty paragraph
    const paragraphs = body
      .split("\n\n")
      .map(p => p.trim())
      .filter(p => p && !p.startsWith("#") && !p.startsWith("![") && !p.startsWith("<"));
    if (paragraphs.length > 0) {
      let desc = paragraphs[0].replace(/\[([^\]]*)\]\([^)]*\)/g, "$1"); // strip links
      desc = desc.replace(/[*_`]/g, ""); // strip bold/italic/code markers
      desc = desc.replace(/\n/g, " ");
      return desc.slice(0, 200).trim();
    }
    return "";
  }

  const before = body.slice(0, idx).trim();
  // Get last paragraph before <!-- more -->
  const paragraphs = before
    .split("\n\n")
    .map(p => p.trim())
    .filter(p => p && !p.startsWith("#") && !p.startsWith("![") && !p.startsWith("<"));
  if (paragraphs.length > 0) {
    let desc = paragraphs[paragraphs.length - 1]
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .replace(/\n/g, " ");
    return desc.slice(0, 300).trim();
  }
  return "";
}

function convertDate(dateStr) {
  // "2018-04-11 10:09:40" or "2018-9-29 19:47:15" → "2018-09-29T19:47:15Z"
  if (!dateStr) return new Date().toISOString();
  dateStr = dateStr.trim();
  if (dateStr.includes("T")) return dateStr;

  // Parse and reformat to handle single-digit months/days
  const parts = dateStr.split(" ");
  const dateParts = parts[0].split("-");
  const year = dateParts[0];
  const month = dateParts[1].padStart(2, "0");
  const day = dateParts[2].padStart(2, "0");
  const time = parts[1] || "00:00:00";

  return `${year}-${month}-${day}T${time}Z`;
}

function getYear(dateStr) {
  const isoDate = convertDate(dateStr);
  return new Date(isoDate).getFullYear();
}

function normalizeFileName(filename) {
  // Remove .md extension
  let name = filename.replace(/\.md$/, "");

  // Strip leading number prefix (e.g., "25_", "101-")
  name = name.replace(/^\d+[-_]/, "");

  // Replace spaces and special chars with hyphens
  name = name.replace(/[&]/g, "-and-");
  name = name.replace(/\s+/g, "-");
  name = name.replace(/[^a-zA-Z0-9\u4e00-\u9fff_-]/g, "-");

  // Collapse multiple hyphens
  name = name.replace(/-+/g, "-");
  name = name.replace(/^-|-$/g, "");

  // Lowercase
  name = name.toLowerCase();

  return name + ".md";
}

function cleanBody(body) {
  // Remove <!-- more --> markers
  body = body.replace(/<!--\s*more\s*-->/g, "");

  // Convert ```{r} to ```r (and similar patterns)
  body = body.replace(/```\{r\}/g, "```r");
  body = body.replace(/```\{r,/g, "```r\n");
  body = body.replace(/```\{python\}/g, "```python");

  // Update internal links: cmwonderland.com/blog/ → cmwonderland.com/
  body = body.replace(
    /https?:\/\/(www\.)?cmwonderland\.com\/blog\//g,
    "https://www.cmwonderland.com/"
  );

  return body;
}

function formatArrayYaml(arr) {
  if (!arr || arr.length === 0) return "[]";
  return (
    "[" +
    arr.map(item => `"${item.replace(/"/g, '\\"')}"`).join(", ") +
    "]"
  );
}

// Clean destination directory (remove example posts)
const existingBlogFiles = fs.readdirSync(DEST, { recursive: true });
for (const f of existingBlogFiles) {
  const fStr = String(f);
  if (fStr.endsWith(".md")) {
    const fullPath = path.join(DEST, fStr);
    fs.rmSync(fullPath);
    console.log(`Removed example: ${fStr}`);
  }
}
// Also remove _releases directory if it exists
const releasesDir = path.join(DEST, "_releases");
if (fs.existsSync(releasesDir)) {
  fs.rmSync(releasesDir, { recursive: true });
  console.log("Removed _releases directory");
}

// Track slug conflicts
const slugMap = new Map();
let migratedCount = 0;

for (const file of files) {
  console.log(`\nProcessing: ${file}`);
  const content = fs.readFileSync(path.join(SRC, file), "utf-8");
  const { frontMatter: fm, body: rawBody } = parseFrontMatter(content);

  if (!fm.title) {
    console.warn(`  WARNING: No title in ${file}, using filename`);
    fm.title = file.replace(/\.md$/, "").replace(/^\d+[-_]/, "");
  }

  if (!fm.date) {
    console.warn(`  WARNING: No date in ${file}, using 2020-01-01`);
    fm.date = "2020-01-01 00:00:00";
  }

  const description = extractDescription(rawBody);
  const body = cleanBody(rawBody);

  const pubDatetime = convertDate(fm.date);
  const year = getYear(fm.date);
  const hasMath = fm.mathjax === "true" || fm.mathjax === true;

  // Normalize categories and tags to arrays
  let categories = [];
  if (fm.categories) {
    categories = Array.isArray(fm.categories)
      ? fm.categories
      : [fm.categories];
  }

  let tags = [];
  if (fm.tags) {
    tags = Array.isArray(fm.tags) ? fm.tags : [fm.tags];
  }

  // Escape title for YAML
  const escapedTitle = fm.title.includes(":") || fm.title.includes('"') || fm.title.includes("'")
    ? `"${fm.title.replace(/"/g, '\\"')}"`
    : fm.title;

  // Build new front matter
  const newFm = [
    "---",
    `title: ${escapedTitle}`,
    `pubDatetime: ${pubDatetime}`,
    `description: "${description.replace(/"/g, '\\"')}"`,
    `author: "James Chen"`,
    `tags: ${formatArrayYaml(tags)}`,
    `categories: ${formatArrayYaml(categories)}`,
    hasMath ? `math: true` : null,
    `draft: false`,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  const newContent = newFm + "\n" + body;

  // Determine file name and destination
  const newFileName = normalizeFileName(file);
  const yearDir = path.join(DEST, `_${year}`);

  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir, { recursive: true });
  }

  // Handle slug conflicts
  const destPath = path.join(yearDir, newFileName);
  if (slugMap.has(newFileName)) {
    console.warn(
      `  CONFLICT: ${newFileName} already exists (from ${slugMap.get(newFileName)})`
    );
    // Add year suffix
    const deduped = newFileName.replace(".md", `-${year}.md`);
    const dedupedPath = path.join(yearDir, deduped);
    fs.writeFileSync(dedupedPath, newContent, "utf-8");
    slugMap.set(deduped, file);
    console.log(`  → ${path.relative(DEST, dedupedPath)}`);
  } else {
    fs.writeFileSync(destPath, newContent, "utf-8");
    slugMap.set(newFileName, file);
    console.log(`  → ${path.relative(DEST, destPath)}`);
  }

  migratedCount++;
}

console.log(`\n✅ Migrated ${migratedCount} posts successfully`);
console.log(`Total unique slugs: ${slugMap.size}`);
