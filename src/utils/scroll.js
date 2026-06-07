export function scrollToTarget(href) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function emitRouteChange() {
  const event =
    typeof PopStateEvent === "function"
      ? new PopStateEvent("popstate")
      : new Event("popstate");
  window.dispatchEvent(event);
}

export function navigateToHref(href) {
  if (href.startsWith("#/")) {
    window.location.hash = href;
    return;
  }

  if (href.startsWith("/")) {
    window.history.pushState({}, "", href);
    emitRouteChange();
    return;
  }

  if (href.startsWith("#") && (window.location.pathname !== "/" || window.location.hash.startsWith("#/"))) {
    window.history.pushState({}, "", `/${href}`);
    emitRouteChange();
    window.setTimeout(() => scrollToTarget(href), 0);
    return;
  }

  scrollToTarget(href);
}
