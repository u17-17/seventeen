import assert from "node:assert/strict";
import path from "node:path";
import { describe, it } from "node:test";
import { entityProfile } from "../data/entityProfile.js";
import { getSeoForPage } from "./seo.js";
import {
  getOutputPathForRoute,
  getNotFoundOutputPath,
  getStaticRouteForPath,
  getStaticRoutes,
  renderNotFoundHtml,
  renderStaticRouteHtml,
} from "../../scripts/prerender-static.mjs";

const template = String.raw`<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>Old title</title>
    <meta name="description" content="Old description" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" crossorigin src="/assets/index-test.js"></script>
  </body>
</html>`;

function countMatches(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

describe("static route prerendering", () => {
  it("defines crawlable output routes for the home page and current static pages", () => {
    assert.deepEqual(
      getStaticRoutes().map((route) => route.path),
      ["/", "/tutor", "/story", "/faq", "/classroom", "/cases"],
    );
    assert.equal(
      getOutputPathForRoute("/", "dist").endsWith(path.join("dist", "index.html")),
      true,
    );
    assert.equal(
      getOutputPathForRoute("/story", "dist").endsWith(path.join("dist", "story", "index.html")),
      true,
    );
    assert.equal(
      getOutputPathForRoute("/tutor", "dist").endsWith(path.join("dist", "tutor", "index.html")),
      true,
    );
  });

  it("matches no-slash and slash request paths to the same static route", () => {
    assert.equal(getStaticRouteForPath("/tutor")?.path, "/tutor");
    assert.equal(getStaticRouteForPath("/tutor/")?.path, "/tutor");
    assert.equal(getStaticRouteForPath("/story?utm=test")?.path, "/story");
    assert.equal(getStaticRouteForPath("/unknown"), null);
    assert.equal(getStaticRouteForPath("/%E0%A4%A"), null);
  });

  it("renders home HTML with one h1, canonical metadata and structured data", () => {
    const html = renderStaticRouteHtml(template, getStaticRoutes()[0], entityProfile.website.origin);

    assert.equal(countMatches(html, /<h1\b/gi), 1);
    assert.match(html, /<title>邯郸市闫老师高中数学物理家教｜涉县线下\/邯郸线上一对一辅导<\/title>/);
    assert.match(html, /<meta name="description" content="邯郸市闫老师提供高一高二高中数学、物理一对一学习诊断与辅导，涉县线下沟通，邯郸市全地区线上辅导，重点做题型拆解、过程梳理和错因复盘。" \/>/);
    assert.match(html, /<meta name="keywords" content="邯郸市闫老师,涉县闫老师,邯郸高中数学家教,涉县高中物理家教,高中数学物理一对一" \/>/);
    assert.match(html, /<link rel="canonical" href="https:\/\/seventeen-yan\.cn\/" \/>/);
    assert.match(html, /<script type="application\/ld\+json" data-seo="structured-data">/);
    assert.match(html, /邯郸闫老师高中数学物理家教/);
    assert.match(html, /教师称呼：闫老师/);
    assert.doesNotMatch(html, /闫奕龙/);
    assert.match(html, /河北师范大学/);
    assert.match(html, /教育学/);
    assert.match(html, /河北省邯郸市涉县/);
    assert.match(html, /邯郸市全地区/);
  });

  it("renders static page HTML with route-specific h1 and canonical metadata", () => {
    const storyRoute = getStaticRoutes().find((route) => route.path === "/story");
    const html = renderStaticRouteHtml(template, storyRoute, entityProfile.website.origin);

    assert.equal(countMatches(html, /<h1\b/gi), 1);
    assert.match(html, /<h1>我的故事<\/h1>/);
    assert.match(html, /<title>我的故事｜YAN TUTOR<\/title>/);
    assert.match(html, /<link rel="canonical" href="https:\/\/seventeen-yan\.cn\/story" \/>/);
    assert.match(html, /从一道题看见一个学生的学习方式/);
    assert.match(html, /邯郸闫老师高中数学物理家教/);
  });

  it("renders complete unique Open Graph metadata for every public route", () => {
    for (const route of getStaticRoutes()) {
      const seo = getSeoForPage(route.page, entityProfile.website.origin);
      const html = renderStaticRouteHtml(template, route, entityProfile.website.origin);

      assert.equal(countMatches(html, /<link rel="canonical"/gi), 1);
      assert.equal(countMatches(html, /<meta property="og:url"/gi), 1);
      assert.match(html, /<meta name="robots" content="index,follow" \/>/);
      assert.match(html, /<meta property="og:type" content="website" \/>/);
      assert.match(html, /<meta property="og:locale" content="zh_CN" \/>/);
      assert.match(html, /<meta property="og:site_name" content="YAN TUTOR" \/>/);
      assert.match(html, /<meta name="twitter:card" content="summary_large_image" \/>/);
      assert.ok(html.includes(`content="${seo.title}"`));
      assert.ok(html.includes(`content="${seo.description}"`));
      assert.ok(html.includes(`content="${seo.canonicalUrl}"`));
      assert.ok(html.includes(`content="${seo.ogImage}"`));
      assert.match(seo.ogImage, /^https:\/\//);
    }
  });

  it("renders the canonical tutor page with entity facts and internal links", () => {
    const tutorRoute = getStaticRoutes().find((route) => route.path === "/tutor");
    const html = renderStaticRouteHtml(template, tutorRoute, entityProfile.website.origin);

    assert.equal(countMatches(html, /<h1\b/gi), 1);
    assert.match(html, /<h1>邯郸闫老师高中数学物理家教<\/h1>/);
    assert.match(html, /<title>邯郸市闫老师高中数学物理家教｜涉县线下\/邯郸线上一对一辅导<\/title>/);
    assert.match(html, /<link rel="canonical" href="https:\/\/seventeen-yan\.cn\/tutor" \/>/);
    assert.match(html, /邯郸市闫老师/);
    assert.match(html, /<meta name="keywords" content="邯郸市闫老师,涉县闫老师,邯郸高中数学家教,涉县高中物理家教,高中数学物理一对一" \/>/);
    assert.match(html, /闫老师/);
    assert.doesNotMatch(html, /闫奕龙/);
    assert.match(html, /河北师范大学/);
    assert.match(html, /教育学/);
    assert.match(html, /河北省邯郸市涉县/);
    assert.match(html, /邯郸市全地区/);
    assert.match(html, /href="\/faq"/);
    assert.match(html, /href="\/cases"/);
    assert.match(html, /href="\/#contact"/);
  });

  it("renders approved case evidence and removes unregistered case material", () => {
    const casesRoute = getStaticRoutes().find((route) => route.path === "/cases");
    const html = renderStaticRouteHtml(template, casesRoute, entityProfile.website.origin);

    assert.match(html, /CASE-EVID-001/);
    assert.match(html, /CASE-EVID-002/);
    assert.match(html, /个体结果不代表普遍承诺/);
    assert.match(html, /当前公开的三条学生或家长反馈均已获得公开授权/);
    assert.doesNotMatch(html, /formula-derivation/);
    assert.doesNotMatch(html, /solid-geometry/);
  });

  it("renders learning resource metadata in the classroom route HTML", () => {
    const classroomRoute = getStaticRoutes().find(
      (route) => route.path === "/classroom",
    );
    const html = renderStaticRouteHtml(
      template,
      classroomRoute,
      entityProfile.website.origin,
    );

    assert.match(html, /<h1>学习内容<\/h1>/);
    assert.match(html, /LEARN-001/);
    assert.match(html, /FAM-H1-MATH-DIAGNOSIS/);
    assert.match(html, /作者：闫老师/);
    assert.doesNotMatch(html, /闫奕龙/);
    assert.match(html, /更新时间：2026-07-15/);
    assert.match(html, /来源：ENTITY-PROFILE、CASE-EVID-001/);
    assert.doesNotMatch(html, /板书占位/);
  });

  it("does not expose the private real name in any prerendered public route", () => {
    for (const route of getStaticRoutes()) {
      const html = renderStaticRouteHtml(template, route, entityProfile.website.origin);

      assert.doesNotMatch(html, /闫奕龙/, `${route.path} should use public teacher naming`);
    }
  });

  it("renders an index-safe static 404 page outside the sitemap routes", () => {
    const html = renderNotFoundHtml(template, entityProfile.website.origin);

    assert.equal(
      getNotFoundOutputPath("dist").endsWith(path.join("dist", "404.html")),
      true,
    );
    assert.equal(countMatches(html, /<h1\b/gi), 1);
    assert.match(html, /<title>页面未找到｜YAN TUTOR<\/title>/);
    assert.match(html, /<meta name="robots" content="noindex,follow" \/>/);
    assert.match(html, /<a\b[^>]*href="\/"[^>]*>返回首页<\/a>/);
    assert.match(html, /<a\b[^>]*href="\/tutor"[^>]*>查看家教服务<\/a>/);
    assert.doesNotMatch(html, /rel="canonical"/);
    assert.doesNotMatch(html, /application\/ld\+json/);
    assert.doesNotMatch(html, /style=/);
  });
});
