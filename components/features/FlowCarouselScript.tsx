'use client';

import { useEffect } from 'react';

// Progressive enhancement for the Features page's horizontal flow track,
// attached to the DOM the same way components/index/RevealScript.tsx attaches
// the reveal observer: a client component that renders nothing and only wires
// behaviour onto markup the server already produced.
//
// Without JS the track still scrolls and snaps — that is native CSS — so the
// only thing this adds is the dot row, which is why the dots stay hidden until
// the effect marks the section with `flow-has-dots`. A dot row that cannot
// follow a swipe is worse than none: CSS alone can style :target or :has(:focus)
// but neither reacts to a finger moving the scrollport, so the active dot would
// silently lie after every swipe. IntersectionObserver reacts to the scroll
// itself and is therefore correct in both interaction modes.
export function FlowCarouselScript() {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>('.flow-stages');
    const track = section?.querySelector<HTMLElement>('.flow-track');
    if (!section || !track) return;

    const stages = Array.from(track.querySelectorAll<HTMLElement>('[data-flow-stage]'));
    const dots = Array.from(section.querySelectorAll<HTMLButtonElement>('[data-flow-dot]'));
    if (stages.length < 2 || dots.length !== stages.length) return;

    section.classList.add('flow-has-dots');

    const setActive = (id: string) => {
      dots.forEach((dot) => {
        const active = dot.dataset.flowDot === id;
        // aria-current is set rather than toggled off with `false`, which
        // assistive tech still announces as present.
        if (active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    };

    // The stage nearest the track's start wins, so a half-scrolled position
    // still names one stage instead of flickering between two.
    const observer = new IntersectionObserver(
      () => {
        const trackLeft = track.getBoundingClientRect().left;
        let nearest = stages[0];
        let nearestDistance = Infinity;
        stages.forEach((stage) => {
          const distance = Math.abs(stage.getBoundingClientRect().left - trackLeft);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = stage;
          }
        });
        const id = nearest.dataset.flowStage;
        if (id) setActive(id);
      },
      { root: track, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    stages.forEach((stage) => observer.observe(stage));

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onDotClick = (event: Event) => {
      const dot = event.currentTarget as HTMLButtonElement;
      const stage = stages.find((s) => s.dataset.flowStage === dot.dataset.flowDot);
      // inline/block rather than an #id link: the stages are inside a
      // scrollport, and jumping to their anchor would also drag the page
      // vertically to bring the whole card into view.
      stage?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'start' });
    };
    dots.forEach((dot) => dot.addEventListener('click', onDotClick));

    return () => {
      observer.disconnect();
      dots.forEach((dot) => dot.removeEventListener('click', onDotClick));
      section.classList.remove('flow-has-dots');
    };
  }, []);

  return null;
}
