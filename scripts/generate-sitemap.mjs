import { writeFile } from "node:fs/promises";

const pages = ["/", "/story", "/faq", "/classroom", "/cases"];
const rawSiteUrl = process.env.SITE_URL;

if (!rawSiteUrl) {
  console.error("Please set SITE_URL before generating sitemap.xml, for example: SITE_URL=https://your-domain.com npm run sitemap");
  process.exit(1);
}

const siteUrl = rawSiteUrl.replace(/\/+$/, "");
const today = new Date().toISOString().slice(0, 10);

const urls = pages
  .map(
    (path) => `  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${path === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${path === "/" ? "1.0" : "0.8"}</priority>
  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await writeFile("public/sitemap.xml", sitemap, "utf8");
console.log(`Generated public/sitemap.xml for ${siteUrl}`);
