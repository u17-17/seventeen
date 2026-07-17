import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { notFoundPage, staticPages } from "../src/data/pageData.js";
import {
  about,
  contact,
  experiences,
  hero,
  methods,
  problems,
  testimonials,
} from "../src/data/siteData.js";
import { entityProfile } from "../src/data/entityProfile.js";
import { pageRouteSlugs } from "../src/utils/routing.js";
import { getNotFoundSeo, getSeoForPage, getStructuredData } from "../src/utils/seo.js";

const scriptPath = fileURLToPath(import.meta.url);

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function jsonForHtml(data) {
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}

function stripExistingSeo(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name=["'](description|robots|keywords|twitter:[^"']+)["'][^>]*>\s*/gi, "")
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi, "")
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "")
    .replace(/<script\s+type=["']application\/ld\+json["'][^>]*data-seo=["']structured-data["'][^>]*>[\s\S]*?<\/script>\s*/gi, "");
}

function renderHeadSeo(seo, structuredData) {
  const title = escapeHtml(seo.title);
  const description = escapeHtml(seo.description);
  const keywords = escapeHtml((seo.keywords ?? []).join(","));
  const canonicalUrl = escapeHtml(seo.canonicalUrl);
  const ogImage = escapeHtml(seo.ogImage);
  const imageAlt = escapeHtml(`${entityProfile.canonicalName}分享图`);

  return [
    `    <title>${title}</title>`,
    `    <meta name="description" content="${description}" />`,
    keywords && `    <meta name="keywords" content="${keywords}" />`,
    `    <meta name="robots" content="index,follow" />`,
    `    <link rel="canonical" href="${canonicalUrl}" />`,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:locale" content="zh_CN" />`,
    `    <meta property="og:site_name" content="${escapeHtml(entityProfile.auxiliaryBrand)}" />`,
    `    <meta property="og:title" content="${title}" />`,
    `    <meta property="og:description" content="${description}" />`,
    `    <meta property="og:url" content="${canonicalUrl}" />`,
    `    <meta property="og:image" content="${ogImage}" />`,
    `    <meta property="og:image:alt" content="${imageAlt}" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${title}" />`,
    `    <meta name="twitter:description" content="${description}" />`,
    `    <meta name="twitter:image" content="${ogImage}" />`,
    `    <meta name="twitter:image:alt" content="${imageAlt}" />`,
    `    <script type="application/ld+json" data-seo="structured-data">${jsonForHtml(structuredData)}</script>`,
  ].filter(Boolean).join("\n");
}

function renderNotFoundHead() {
  const seo = getNotFoundSeo();
  return [
    `    <title>${escapeHtml(seo.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(seo.description)}" />`,
    `    <meta name="robots" content="${escapeHtml(seo.robots)}" />`,
  ].join("\n");
}

function renderList(items) {
  if (!items.length) return "";

  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderArticle(title, parts, item = {}) {
  const body = parts.filter(Boolean).map((part) => `<p>${escapeHtml(part)}</p>`).join("");
  const link = item.href
    ? `<p><a href="${escapeHtml(item.href)}">${escapeHtml(item.linkLabel ?? item.href)}</a></p>`
    : "";
  return `<article><h3>${escapeHtml(title)}</h3>${body}${link}</article>`;
}

function renderHomeRoute() {
  const factItems = [
    `规范实体名：${entityProfile.canonicalName}`,
    `本地搜索名：${entityProfile.search.localName}`,
    `教师称呼：${entityProfile.teacher.name}`,
    `学校与专业：${entityProfile.teacher.school} · ${entityProfile.teacher.major}`,
    `服务科目：${entityProfile.services.subjects.join("、")}`,
    `正式服务年级：${entityProfile.services.formalGrades.join("、")}`,
    `线下范围：${entityProfile.services.offlineArea}`,
    `线上范围：${entityProfile.services.onlineArea}`,
    `微信咨询：${contact.wechatId}`,
  ];

  return `
    <section>
      <h1>${escapeHtml(entityProfile.canonicalName)}</h1>
      <p>${escapeHtml(hero.description)}</p>
      ${renderList(factItems)}
    </section>
    <section>
      <h2>${escapeHtml(about.title)}</h2>
      <p>${escapeHtml(about.body)}</p>
      ${renderList(about.highlights)}
    </section>
    <section>
      <h2>${escapeHtml(problems.title)}</h2>
      ${problems.items.map((item) => renderArticle(item.title, [item.content])).join("")}
    </section>
    <section>
      <h2>${escapeHtml(methods.title)}</h2>
      <p>${escapeHtml(methods.subtitle)}</p>
      ${methods.steps.map((step) => renderArticle(step.title, [step.description])).join("")}
    </section>
    <section>
      <h2>${escapeHtml(experiences.title)}</h2>
      ${experiences.items.map((item) => renderArticle(item.title, [item.time, item.content])).join("")}
    </section>
    <section>
      <h2>${escapeHtml(testimonials.title)}</h2>
      ${testimonials.items.map((item) => renderArticle(item.author, [item.quote, item.tag])).join("")}
    </section>`;
}

function itemTextParts(item) {
  return [
    item.content,
    item.answer,
    item.period,
    item.evidenceId && `证据编号：${item.evidenceId}`,
    item.problem,
    item.method,
    item.result,
    item.disclaimer,
    item.focus,
    item.resourceId,
    item.status && `状态：${item.status}`,
    item.audience && `适用对象：${item.audience}`,
    item.author && `作者：${item.author}`,
    item.updatedAt && `更新时间：${item.updatedAt}`,
    item.contentFamilyId && `内容家族：${item.contentFamilyId}`,
    item.sourceIds?.length && `来源：${item.sourceIds.join("、")}`,
    item.authorizationStatus && `授权状态：${item.authorizationStatus}`,
    ...(item.outline ?? []),
    ...(item.highlights ?? []),
    ...(item.images ?? []).flatMap((image) => [image.alt, image.caption]),
  ].filter(Boolean);
}

function renderPageRoute(page) {
  const sections = page.sections
    .map((section) => `
      <section>
        <h2>${escapeHtml(section.title)}</h2>
        ${section.items
          .map((item) => renderArticle(item.title ?? item.question ?? item.label, itemTextParts(item), item))
          .join("")}
      </section>`)
    .join("");

  return `
    <section>
      <h1>${escapeHtml(page.title)}</h1>
      <p>${escapeHtml(page.subtitle)}</p>
      <p>${escapeHtml(page.intro.title)}</p>
      <p>${escapeHtml(page.intro.body)}</p>
      ${renderList([
        entityProfile.canonicalName,
        entityProfile.search.localName,
        entityProfile.teacher.name,
        entityProfile.services.offlineArea,
        entityProfile.services.onlineArea,
        ...page.intro.points,
      ])}
    </section>
    ${sections}`;
}

function renderStaticMain(route) {
  return `
    <main id="static-prerender" data-prerender-path="${escapeHtml(route.path)}">
      ${route.page ? renderPageRoute(route.page) : renderHomeRoute()}
    </main>`;
}

function renderNotFoundMain() {
  return `
    <main id="static-prerender" data-prerender-path="404" class="relative min-h-[72vh] overflow-hidden bg-cream pb-20 pt-36 sm:pb-28 sm:pt-44">
      <section class="section-shell">
        <p class="text-xs font-semibold uppercase tracking-[0.28em] text-brand/70">${escapeHtml(notFoundPage.eyebrow)}</p>
        <div class="mt-5 max-w-3xl border-l-4 border-accent pl-5 sm:pl-8">
          <h1 class="text-4xl font-black leading-tight text-brand-deep sm:text-6xl">${escapeHtml(notFoundPage.title)}</h1>
          <p class="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">${escapeHtml(notFoundPage.description)}</p>
        </div>
        <div class="mt-10 flex flex-col gap-3 sm:flex-row">
          <a class="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-bold text-cream" href="${escapeHtml(notFoundPage.primaryLink.href)}">${escapeHtml(notFoundPage.primaryLink.label)}</a>
          <a class="inline-flex min-h-11 items-center justify-center rounded-full border border-brand/20 bg-white px-5 py-3 text-sm font-bold text-brand-deep" href="${escapeHtml(notFoundPage.secondaryLink.href)}">${escapeHtml(notFoundPage.secondaryLink.label)}</a>
        </div>
      </section>
    </main>`;
}

export function getStaticRoutes() {
  return [
    { path: "/", page: null },
    ...pageRouteSlugs.map((slug) => ({ path: `/${slug}`, page: staticPages[slug] })),
  ];
}

export function getStaticRouteForPath(requestPath = "") {
  let pathname;
  try {
    pathname = decodeURIComponent(String(requestPath).split(/[?#]/)[0]);
  } catch {
    return null;
  }
  const normalized = pathname.replace(/\/+$/, "") || "/";

  return getStaticRoutes().find((route) => route.path === normalized) ?? null;
}

export function getOutputPathForRoute(routePath, distDir = "dist") {
  if (routePath === "/") return path.join(distDir, "index.html");

  return path.join(distDir, routePath.replace(/^\/+/, ""), "index.html");
}

export function getNotFoundOutputPath(distDir = "dist") {
  return path.join(distDir, "404.html");
}

export function renderStaticRouteHtml(template, route, origin = entityProfile.website.origin) {
  const seo = getSeoForPage(route.page, origin);
  const structuredData = getStructuredData(origin);
  const withSeo = stripExistingSeo(template).replace(
    /<\/head>/i,
    `${renderHeadSeo(seo, structuredData)}\n  </head>`,
  );

  return withSeo.replace(
    /<div id="root">[\s\S]*?<\/div>/i,
    `<div id="root">${renderStaticMain(route)}</div>`,
  );
}

export function renderNotFoundHtml(template) {
  const withSeo = stripExistingSeo(template).replace(
    /<\/head>/i,
    `${renderNotFoundHead()}\n  </head>`,
  );

  return withSeo.replace(
    /<div id="root">[\s\S]*?<\/div>/i,
    `<div id="root">${renderNotFoundMain()}</div>`,
  );
}

export function prerenderStaticRoutes(distDir = "dist", origin = entityProfile.website.origin) {
  const templatePath = path.join(distDir, "index.html");
  const template = readFileSync(templatePath, "utf8");

  for (const route of getStaticRoutes()) {
    const outputPath = getOutputPathForRoute(route.path, distDir);
    mkdirSync(path.dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, renderStaticRouteHtml(template, route, origin));
  }

  writeFileSync(getNotFoundOutputPath(distDir), renderNotFoundHtml(template));
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  prerenderStaticRoutes(process.argv[2] ?? "dist", process.env.SITE_URL ?? entityProfile.website.origin);
}
