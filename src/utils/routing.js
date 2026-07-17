export const pageRouteSlugs = ["tutor", "story", "faq", "classroom", "cases"];

function getNormalizedSlug(hash = "") {
  if (!hash.startsWith("#/")) return null;
  try {
    return decodeURIComponent(hash.slice(2).split(/[?#]/)[0].replace(/\/+$/, ""));
  } catch {
    return null;
  }
}

function getNormalizedPath(pathname = "") {
  let path;
  try {
    path = decodeURIComponent(pathname.split(/[?#]/)[0].replace(/\/+$/, ""));
  } catch {
    return null;
  }
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

export function isNotFoundPath(pathname = "") {
  let normalizedPath;
  try {
    normalizedPath = decodeURIComponent(String(pathname).split(/[?#]/)[0]);
  } catch {
    return true;
  }

  const normalized = normalizedPath.replace(/\/+$/, "") || "/";
  if (normalized === "/") return false;

  return !pageRouteSlugs.includes(normalized.replace(/^\/+/, ""));
}

export function getLegacyRedirectTarget(hash = "") {
  const slug = getNormalizedSlug(hash);
  return slug === "booking" ? "#contact" : null;
}
