/**
 * Reveal-on-scroll: elements with [data-reveal] fade up once when they enter
 * the viewport. Children of [data-reveal-stagger] get incremental delays.
 * Content is only hidden when JS runs (see `.js [data-reveal]` in global.css).
 */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
  const step = Number(group.dataset.revealStagger) || 80;
  group.querySelectorAll<HTMLElement>(':scope > [data-reveal]').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', `${i * step}ms`);
  });
});

const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (reduceMotion || !('IntersectionObserver' in window)) {
  targets.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  targets.forEach((el) => io.observe(el));
}

/**
 * SMIL animations inside illustrations don't honour CSS media queries,
 * so pause them for reduced-motion users and whenever they are off-screen.
 */
const illustrations = document.querySelectorAll<SVGSVGElement>('svg.ill');
if (reduceMotion) {
  illustrations.forEach((svg) => svg.pauseAnimations?.());
} else if ('IntersectionObserver' in window) {
  const svgObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const svg = entry.target as SVGSVGElement;
      if (entry.isIntersecting) svg.unpauseAnimations?.();
      else svg.pauseAnimations?.();
    }
  });
  illustrations.forEach((svg) => svgObserver.observe(svg));
}
