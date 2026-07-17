import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import {
  generateRobotsTxt,
  generateSitemapXml,
} from "../../scripts/generate-sitemap.mjs";
import { getStaticRoutes } from "../../scripts/prerender-static.mjs";
import { entityProfile } from "../data/entityProfile.js";
import { getSeoForPage } from "./seo.js";

describe("crawl discovery artifacts", () => {
  it("generates one canonical sitemap URL for every public static route", () => {
    const xml = generateSitemapXml(entityProfile.website.origin);
    const sitemapUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => match[1],
    );
    const expectedUrls = getStaticRoutes().map(
      (route) => getSeoForPage(route.page, entityProfile.website.origin).canonicalUrl,
    );

    assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
    assert.match(xml, /xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
    assert.deepEqual(sitemapUrls, expectedUrls);
    assert.equal(new Set(sitemapUrls).size, sitemapUrls.length);
    assert.match(xml, /https:\/\/seventeen-yan\.cn\/tutor/);
    for (const url of sitemapUrls) {
      assert.doesNotMatch(url, /404|#|\?/);
    }
  });

  it("allows crawling and declares the absolute sitemap URL", () => {
    const robots = generateRobotsTxt(entityProfile.website.origin);

    assert.equal(
      robots,
      [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${entityProfile.website.origin}/sitemap.xml`,
        "",
      ].join("\n"),
    );
  });

  it("generates sitemap and robots during the production build", () => {
    const packageJson = JSON.parse(
      readFileSync(new URL("../../package.json", import.meta.url), "utf8"),
    );

    assert.match(packageJson.scripts.build, /generate-sitemap\.mjs/);
  });

  it("lets the static filesystem and generated 404 page control Vercel routing", () => {
    const config = JSON.parse(
      readFileSync(new URL("../../vercel.json", import.meta.url), "utf8"),
    );

    assert.equal(config.$schema, "https://openapi.vercel.sh/vercel.json");
    assert.equal(config.rewrites, undefined);
    assert.equal(config.routes, undefined);
  });
});
