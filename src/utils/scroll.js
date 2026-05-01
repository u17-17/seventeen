export function scrollToTarget(href) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}
