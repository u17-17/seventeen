import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { shouldLoadVercelAnalytics } from "./analytics.js";

describe("analytics runtime loading", () => {
  it("does not load Vercel Analytics on local preview hosts", () => {
    assert.equal(shouldLoadVercelAnalytics("localhost"), false);
    assert.equal(shouldLoadVercelAnalytics("127.0.0.1"), false);
    assert.equal(shouldLoadVercelAnalytics("192.168.1.46"), false);
    assert.equal(shouldLoadVercelAnalytics("198.18.0.1"), false);
  });

  it("loads Vercel Analytics on deployed hostnames", () => {
    assert.equal(shouldLoadVercelAnalytics("seventeen-yan.cn"), true);
    assert.equal(shouldLoadVercelAnalytics("seventeen-o2recfl5h-u17-17s-projects.vercel.app"), true);
  });
});
