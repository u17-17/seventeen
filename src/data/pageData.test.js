import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { pageNavItems, staticPages } from "./pageData.js";

const requiredPages = ["story", "faq", "classroom", "cases"];

describe("static page data", () => {
  it("exposes crawlable trust-building pages in navigation order", () => {
    assert.deepEqual(
      pageNavItems.map((item) => item.href),
      requiredPages.map((slug) => `/${slug}`),
    );
  });

  it("provides usable page metadata and content sections", () => {
    for (const slug of requiredPages) {
      const page = staticPages[slug];

      assert.ok(page, `${slug} page should exist`);
      assert.equal(page.slug, slug);
      assert.ok(page.title.length > 0, `${slug} title should be present`);
      assert.ok(page.subtitle.length > 0, `${slug} subtitle should be present`);
      assert.ok(page.sections.length > 0, `${slug} should have content sections`);
    }
  });

  it("does not expose duplicate booking or post-sale feedback pages", () => {
    assert.equal(staticPages.booking, undefined);
    assert.equal(staticPages.feedback, undefined);
    assert.equal(pageNavItems.some((item) => item.href.includes("booking")), false);
    assert.equal(pageNavItems.some((item) => item.href.includes("feedback")), false);
  });
});
