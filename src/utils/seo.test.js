import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { getNotFoundSeo, getSeoForPage, getStructuredData } from "./seo.js";
import { entityProfile } from "../data/entityProfile.js";
import { staticPages } from "../data/pageData.js";

describe("seo helpers", () => {
  it("builds home metadata with an absolute canonical url", () => {
    const seo = getSeoForPage(null, "https://example.com");

    assert.equal(seo.title, entityProfile.search.title);
    assert.equal(seo.canonicalUrl, "https://example.com/");
    assert.equal(seo.ogImage, "https://example.com/og-image.svg");
    assert.match(seo.description, /邯郸市闫老师/);
    assert.match(seo.description, /涉县线下/);
    assert.match(seo.description, /邯郸市全地区线上/);
    assert.ok(seo.keywords.includes("邯郸市闫老师"));
    assert.equal(seo.title.includes("闫奕龙"), false);
    assert.equal(seo.description.includes("闫奕龙"), false);
  });

  it("uses a local-search tutor title without exposing the private real name", () => {
    const seo = getSeoForPage(staticPages.tutor, "https://example.com");

    assert.equal(seo.title, entityProfile.search.title);
    assert.equal(seo.canonicalUrl, "https://example.com/tutor");
    assert.ok(seo.keywords.includes("涉县闫老师"));
    assert.match(seo.description, /题型拆解/);
    assert.equal(seo.title.includes("闫奕龙"), false);
    assert.equal(seo.description.includes("闫奕龙"), false);
    assert.equal(seo.keywords.some((keyword) => keyword.includes("闫奕龙")), false);
  });

  it("builds page metadata from static page copy", () => {
    const seo = getSeoForPage(staticPages.story, "https://example.com");

    assert.equal(seo.title, "我的故事｜YAN TUTOR");
    assert.equal(seo.canonicalUrl, "https://example.com/story");
    assert.match(seo.description, /闫老师/);
  });

  it("builds noindex metadata without a canonical URL for missing pages", () => {
    const seo = getNotFoundSeo("https://example.com");

    assert.equal(seo.title, "页面未找到｜YAN TUTOR");
    assert.equal(seo.robots, "noindex,follow");
    assert.equal(seo.canonicalUrl, null);
    assert.match(seo.description, /地址/);
  });

  it("returns structured data for the tutor business", () => {
    const data = getStructuredData("https://example.com");

    assert.equal(data["@type"], "EducationalOrganization");
    assert.equal(data.name, entityProfile.canonicalName);
    assert.equal(data.alternateName, entityProfile.auxiliaryBrand);
    assert.equal(data.url, "https://example.com/");
    for (const subject of entityProfile.services.subjects) {
      assert.ok(data.knowsAbout.includes(subject), `${subject} should appear in knowsAbout`);
    }
    assert.deepEqual(data.areaServed, [
      entityProfile.services.offlineArea,
      entityProfile.services.onlineArea,
    ]);
  });

  it("keeps confirmed entity facts in the shared profile instead of page modules", () => {
    const implementationFiles = [
      new URL("../data/siteData.js", import.meta.url),
      new URL("./seo.js", import.meta.url),
      new URL("../components/forms/ConsultationForm.jsx", import.meta.url),
    ];
    const criticalFacts = [
      entityProfile.canonicalName,
      entityProfile.teacher.name,
      entityProfile.search.localName,
      entityProfile.website.origin,
      entityProfile.contact.wechatId,
      entityProfile.services.offlineArea,
      entityProfile.services.onlineArea,
    ];

    for (const file of implementationFiles) {
      const source = readFileSync(file, "utf8");
      for (const fact of criticalFacts) {
        assert.equal(
          source.includes(fact),
          false,
          `${file.pathname} should read ${fact} from entityProfile`,
        );
      }
    }
  });

  it("exposes approved consultation grades without an other option", () => {
    assert.deepEqual(entityProfile.services.consultationGrades, [
      "高一",
      "高二",
      "升高一咨询",
    ]);
    assert.equal(entityProfile.services.consultationGrades.includes("其他"), false);
  });
});
