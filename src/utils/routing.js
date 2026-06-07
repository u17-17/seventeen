export const pageRouteSlugs = ["story", "faq", "classroom", "cases"];

function getNormalizedSlug(hash = "") {
  if (!hash.startsWith("#/")) return null;
  return decodeURIComponent(hash.slice(2).split(/[?#]/)[0].replace(/\/+$/, ""));
}

function getNormalizedPath(pathname = "") {
  const path = decodeURIComponent(pathname.split(/[?#]/)[0].replace(/\/+$/, ""));
  if (!path || path === "/") return null;
  return path.replace(/^\/+/, "");
}

export function toPageHash(slug) {
  return `#/${slug}`;
}

export function toPagePath(slug) {
  return `/${slug}`;
}

export function getPageRouteFromHash(hash = "") {
  const slug = getNormalizedSlug(hash);
  return pageRouteSlugs.includes(slug) ? slug : null;
}

export function getPageRouteFromPath(pathname = "") {
  const slug = getNormalizedPath(pathname);
  return pageRouteSlugs.includes(slug) ? slug : null;
}

export function getPageRouteFromUrl(pathname = "", hash = "") {
  return getPageRouteFromPath(pathname) ?? getPageRouteFromHash(hash);
}

export function isPageHash(hash = "") {
  return getPageRouteFromHash(hash) !== null;
}

export function isPagePath(pathname = "") {
  return getPageRouteFromPath(pathname) !== null;
}

export function getLegacyRedirectTarget(hash = "") {
  const slug = getNormalizedSlug(hash);
  return slug === "booking" ? "#contact" : null;
}
