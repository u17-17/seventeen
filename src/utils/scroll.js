export function scrollToTarget(href) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function navigateToHref(href) {
  if (href.startsWith("#/")) {
    window.location.hash = href;
    return;
  }

  if (window.location.hash.startsWith("#/")) {
    window.location.hash = href;
    window.setTimeout(() => scrollToTarget(href), 0);
    return;
  }

  scrollToTarget(href);
}
