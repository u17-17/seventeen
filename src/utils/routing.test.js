import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getLegacyRedirectTarget,
  getPageRouteFromHash,
  getPageRouteFromPath,
  getPageRouteFromUrl,
  isPageHash,
  isPagePath,
  toPageHash,
  toPagePath,
} from "./routing.js";

describe("hash page routing", () => {
  it("recognizes static page hashes without treating home anchors as pages", () => {
    assert.equal(getPageRouteFromHash("#/story"), "story");
    assert.equal(getPageRouteFromHash("#/faq"), "faq");
    assert.equal(getPageRouteFromHash("#/classroom"), "classroom");
    assert.equal(getPageRouteFromHash("#/cases"), "cases");
    assert.equal(getPageRouteFromHash("#/booking"), null);
    assert.equal(getPageRouteFromHash("#/feedback"), null);
    assert.equal(getPageRouteFromHash("#about"), null);
    assert.equal(getPageRouteFromHash("#contact"), null);
    assert.equal(getPageRouteFromHash(""), null);
  });

  it("creates stable hash links for static pages", () => {
    assert.equal(toPageHash("faq"), "#/faq");
    assert.equal(toPageHash("cases"), "#/cases");
  });

  it("recognizes real paths for crawlable static pages", () => {
    assert.equal(getPageRouteFromPath("/story"), "story");
    assert.equal(getPageRouteFromPath("/story/"), "story");
    assert.equal(getPageRouteFromPath("/faq"), "faq");
    assert.equal(getPageRouteFromPath("/classroom"), "classroom");
    assert.equal(getPageRouteFromPath("/cases"), "cases");
    assert.equal(getPageRouteFromPath("/booking"), null);
    assert.equal(getPageRouteFromPath("/"), null);
  });

  it("prefers real paths while preserving legacy hash routes", () => {
    assert.equal(getPageRouteFromUrl("/story", ""), "story");
    assert.equal(getPageRouteFromUrl("/", "#/faq"), "faq");
    assert.equal(getPageRouteFromUrl("/cases", "#contact"), "cases");
    assert.equal(getPageRouteFromUrl("/", "#contact"), null);
  });

  it("creates crawlable path links for static pages", () => {
    assert.equal(toPagePath("story"), "/story");
    assert.equal(toPagePath("cases"), "/cases");
  });

  it("flags only page hashes as page routes", () => {
    assert.equal(isPageHash("#/booking"), false);
    assert.equal(isPageHash("#method"), false);
  });

  it("flags only page paths as page routes", () => {
    assert.equal(isPagePath("/story"), true);
    assert.equal(isPagePath("/booking"), false);
    assert.equal(isPagePath("/"), false);
  });

  it("redirects the old booking link to the homepage contact section", () => {
    assert.equal(getLegacyRedirectTarget("#/booking"), "#contact");
    assert.equal(getLegacyRedirectTarget("#/booking/"), "#contact");
    assert.equal(getLegacyRedirectTarget("#/feedback"), null);
  });
});
