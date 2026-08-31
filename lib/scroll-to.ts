import { animate } from "framer-motion";

/** Height of the fixed navbar, so a target lands below it rather than under it. */
const navOffset = () => (window.innerWidth >= 1024 ? 64 : 56);

/**
 * Eased scroll to a section. CSS `scroll-behavior: smooth` hands the duration
 * and curve to the browser, which reads as an abrupt snap over long distances;
 * this keeps both under our control.
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const target = Math.max(
    0,
    Math.min(
      el.getBoundingClientRect().top + window.scrollY - navOffset(),
      maxScroll,
    ),
  );

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, target);
    return;
  }

  animate(window.scrollY, target, {
    duration: 1,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: (v) => window.scrollTo(0, v),
  });
}

/**
 * Click handler for an in-page anchor. Falls back to the browser's own
 * behaviour if JavaScript never runs, since the href is left intact.
 */
export function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  scrollToId(href.slice(1));
  history.replaceState(null, "", href);
}
