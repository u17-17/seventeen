const siteName = "YAN TUTOR";
const defaultTitle = "YAN TUTOR｜高中数学 / 物理一对一学习诊断";
const defaultDescription =
  "闫老师高中数学 / 高中物理一对一辅导，专注学习问题诊断、题型识别、过程拆解和错因复盘。";
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
  const title = page ? `${page.title}｜${siteName}` : defaultTitle;
  const description = page?.subtitle || defaultDescription;

  return {
    title,
    description,
    canonicalUrl: absoluteUrl(path, origin),
    ogImage: absoluteUrl(defaultImage, origin),
  };
}

export function getStructuredData(origin = globalThis.location?.origin) {
  const url = absoluteUrl("/", origin);

  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteName,
    url,
    description: defaultDescription,
    areaServed: "河北邯郸及线上",
    knowsAbout: ["高中数学", "高中物理", "学习诊断", "错因复盘", "一对一辅导"],
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

export function applySeo(page) {
  const seo = getSeoForPage(page, window.location.origin);

  document.title = seo.title;
  setMeta('meta[name="description"]', { name: "description", content: seo.description });
  setMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
  setMeta('meta[property="og:description"]', {
    property: "og:description",
    content: seo.description,
  });
  setMeta('meta[property="og:url"]', { property: "og:url", content: seo.canonicalUrl });
  setMeta('meta[property="og:image"]', { property: "og:image", content: seo.ogImage });
  setMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
  setMeta('meta[name="twitter:description"]', {
    name: "twitter:description",
    content: seo.description,
  });
  setMeta('meta[name="twitter:image"]', { name: "twitter:image", content: seo.ogImage });
  setCanonical(seo.canonicalUrl);
  setStructuredData(getStructuredData(window.location.origin));
}
