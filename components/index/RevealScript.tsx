'use client';

import { useEffect } from 'react';

// Old docs/index.html end-of-body inline script, ported as a client
// component (eed65be, original-design rollback 2026-07-12). Scroll-triggered
// reveal for below-fold sections — progressive enhancement only: the
// sections are visible by default in CSS (app/original.css .reveal-pending
// opts them into the hidden state), so no-JS users and crawlers see full
// content, and prefers-reduced-motion never enters the pending state.
export function RevealScript() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll(
      '.workflow-section, .coming-soon-section, .faq-preview-section, .cta-section',
    );
    if (!targets.length) return;
    targets.forEach((t) => t.classList.add('reveal-pending'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return null;
}
