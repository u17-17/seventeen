import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { entityProfile } from "../src/data/entityProfile.js";
import { getSeoForPage } from "../src/utils/seo.js";
import { getStaticRoutes } from "./prerender-static.mjs";

const scriptPath = fileURLToPath(import.meta.url);

function normalizeOrigin(value) {
  const url = new URL(String(value || entityProfile.website.origin));
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("SITE_URL must use http or https");
  }
  return url.origin;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function generateSitemapXml(origin = entityProfile.website.origin) {
  const normalizedOrigin = normalizeOrigin(origin);
  const urls = getStaticRoutes()
    .map((route) => getSeoForPage(route.page, normalizedOrigin).canonicalUrl)
    .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function generateRobotsTxt(origin = entityProfile.website.origin) {
  const normalizedOrigin = normalizeOrigin(origin);
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${normalizedOrigin}/sitemap.xml`,
    "",
  ].join("\n");
}

export async function writeSiteArtifacts(
  outputDir = "dist",
  origin = entityProfile.website.origin,
) {
  await mkdir(outputDir, { recursive: true });
  const sitemapPath = path.join(outputDir, "sitemap.xml");
  const robotsPath = path.join(outputDir, "robots.txt");

  await Promise.all([
    writeFile(sitemapPath, generateSitemapXml(origin), "utf8"),
    writeFile(robotsPath, generateRobotsTxt(origin), "utf8"),
  ]);

  return { sitemapPath, robotsPath };
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  const outputDir = process.argv[2] ?? "dist";
  const origin = process.env.SITE_URL ?? entityProfile.website.origin;
  const outputs = await writeSiteArtifacts(outputDir, origin);
  console.log(`Generated ${outputs.sitemapPath} and ${outputs.robotsPath}`);
}
