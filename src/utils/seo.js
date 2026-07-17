import { entityProfile, getCompactSubjectLabel } from "../data/entityProfile.js";

const siteName = entityProfile.auxiliaryBrand;
const defaultTitle = entityProfile.search.title;
const defaultDescription = entityProfile.search.description;
const defaultKeywords = entityProfile.search.keywords;
const defaultImage = "/og-image.svg";

function normalizeOrigin(origin) {
  return String(origin || "https://example.com").replace(/\/+$/, "");
}

function absoluteUrl(path, origin) {
  const normalizedOrigin = normalizeOrigin(origin);
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedOrigin}${normalizedPath}`;
}

export function getSeoForPage(page, origin = globalThis.location?.origin) {
  const path = page?.slug ? `/${page.slug}` : "/";
  const title = page?.seoTitle || (page ? `${page.title}｜${siteName}` : defaultTitle);
  const description = page?.seoDescription || page?.subtitle || defaultDescription;
  const keywords = page?.seoKeywords || defaultKeywords;

  return {
    title,
    description,
    keywords,
    canonicalUrl: absoluteUrl(path, origin),
    ogImage: absoluteUrl(defaultImage, origin),
  };
}

export function getNotFoundSeo() {
  return {
    title: `页面未找到｜${siteName}`,
    description: "这个地址可能已更改或不存在，请返回首页或查看家教服务说明。",
    robots: "noindex,follow",
    canonicalUrl: null,
  };
}

export function getStructuredData(origin = globalThis.location?.origin) {
  const url = absoluteUrl("/", origin);

  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: entityProfile.canonicalName,
    alternateName: entityProfile.auxiliaryBrand,
    url,
    description: defaultDescription,
    areaServed: [
      entityProfile.services.offlineArea,
      entityProfile.services.onlineArea,
    ],
    founder: {
      "@type": "Person",
      name: entityProfile.teacher.name,
    },
    knowsAbout: [
      ...entityProfile.services.subjects,
      "学习诊断",
      "错因复盘",
      "一对一辅导",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "学习诊断预约",
      availableLanguage: ["zh-CN"],
    },
  };
}

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function removeFromHead(selector) {
  document.head.querySelector(selector)?.remove();
}

function setStructuredData(data) {
  let script = document.head.querySelector('script[data-seo="structured-data"]');
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seo = "structured-data";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function applySeo(page, notFound = false) {
  const seo = notFound ? getNotFoundSeo() : getSeoForPage(page, window.location.origin);

  document.title = seo.title;
  setMeta('meta[name="description"]', { name: "description", content: seo.description });
  if (seo.keywords?.length) {
    setMeta('meta[name="keywords"]', {
      name: "keywords",
      content: seo.keywords.join(","),
    });
  }
  setMeta('meta[name="robots"]', {
    name: "robots",
    content: seo.robots ?? "index,follow",
  });

  if (notFound) {
    removeFromHead('link[rel="canonical"]');
    removeFromHead('meta[name="keywords"]');
    document.head.querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]').forEach(
      (element) => element.remove(),
    );
    removeFromHead('script[data-seo="structured-data"]');
    return;
  }

  setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
  setMeta('meta[property="og:locale"]', { property: "og:locale", content: "zh_CN" });
  setMeta('meta[property="og:site_name"]', {
    property: "og:site_name",
    content: entityProfile.auxiliaryBrand,
  });
  setMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
  setMeta('meta[property="og:description"]', {
    property: "og:description",
    content: seo.description,
  });
  setMeta('meta[property="og:url"]', { property: "og:url", content: seo.canonicalUrl });
  setMeta('meta[property="og:image"]', { property: "og:image", content: seo.ogImage });
  setMeta('meta[property="og:image:alt"]', {
    property: "og:image:alt",
    content: `${entityProfile.canonicalName}分享图`,
  });
  setMeta('meta[name="twitter:card"]', {
    name: "twitter:card",
    content: "summary_large_image",
  });
  setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
  setMeta('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: seo.description,
  });
  setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: seo.ogImage });
  setMeta('meta[name="twitter:image:alt"]', {
    name: "twitter:image:alt",
    content: `${entityProfile.canonicalName}分享图`,
  });
  setCanonical(seo.canonicalUrl);
  setStructuredData(getStructuredData(window.location.origin));
}
