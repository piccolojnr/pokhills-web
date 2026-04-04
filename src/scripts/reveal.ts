/**
 * reveal.ts — Scroll-triggered reveal animations via IntersectionObserver.
 *
 * Usage:
 *   <div class="reveal" data-reveal="fade">...</div>
 *   <div class="reveal" data-reveal="left" data-reveal-delay="200">...</div>
 *
 * data-reveal values: "fade" (default) | "left" | "right"
 * data-reveal-delay:  number in ms, applied as transition-delay
 */

export function initReveal(): void {
  // Respect user preference — no animation if reduced motion is requested
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // Immediately reveal all elements without animation
    document.querySelectorAll<HTMLElement>('.reveal').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const delay = el.dataset.revealDelay;
        if (delay) {
          el.style.transitionDelay = `${delay}ms`;
        }
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll<HTMLElement>('.reveal').forEach(el => observer.observe(el));
}

// Auto-init when used as a module script in Astro
initReveal();
