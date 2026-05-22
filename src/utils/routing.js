export const pageRouteSlugs = ["faq", "classroom", "cases"];

function getNormalizedSlug(hash = "") {
  if (!hash.startsWith("#/")) return null;
  return decodeURIComponent(hash.slice(2).split(/[?#]/)[0].replace(/\/+$/, ""));
}

export function toPageHash(slug) {
  return `#/${slug}`;
}

export function getPageRouteFromHash(hash = "") {
  const slug = getNormalizedSlug(hash);
  return pageRouteSlugs.includes(slug) ? slug : null;
}

export function isPageHash(hash = "") {
  return getPageRouteFromHash(hash) !== null;
}

export function getLegacyRedirectTarget(hash = "") {
  const slug = getNormalizedSlug(hash);
  return slug === "booking" ? "#contact" : null;
}
