import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  getLegacyRedirectTarget,
  getPageRouteFromHash,
  isPageHash,
  toPageHash,
} from "./routing.js";

describe("hash page routing", () => {
  it("recognizes static page hashes without treating home anchors as pages", () => {
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

  it("flags only page hashes as page routes", () => {
    assert.equal(isPageHash("#/booking"), false);
    assert.equal(isPageHash("#method"), false);
  });

  it("redirects the old booking link to the homepage contact section", () => {
    assert.equal(getLegacyRedirectTarget("#/booking"), "#contact");
    assert.equal(getLegacyRedirectTarget("#/booking/"), "#contact");
    assert.equal(getLegacyRedirectTarget("#/feedback"), null);
  });
});
