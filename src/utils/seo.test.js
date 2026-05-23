import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getSeoForPage, getStructuredData } from "./seo.js";
import { staticPages } from "../data/pageData.js";

describe("seo helpers", () => {
  it("builds home metadata with an absolute canonical url", () => {
    const seo = getSeoForPage(null, "https://example.com");

    assert.equal(seo.title, "YAN TUTOR｜高中数学 / 物理一对一学习诊断");
    assert.equal(seo.canonicalUrl, "https://example.com/");
    assert.equal(seo.ogImage, "https://example.com/og-image.svg");
  });

  it("builds page metadata from static page copy", () => {
    const seo = getSeoForPage(staticPages.story, "https://example.com");

    assert.equal(seo.title, "我的故事｜YAN TUTOR");
    assert.equal(seo.canonicalUrl, "https://example.com/story");
    assert.match(seo.description, /闫老师/);
  });

  it("returns structured data for the tutor business", () => {
    const data = getStructuredData("https://example.com");

    assert.equal(data["@type"], "EducationalOrganization");
    assert.equal(data.url, "https://example.com/");
    assert.ok(data.knowsAbout.includes("高中数学"));
  });
});
