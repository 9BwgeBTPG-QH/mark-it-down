import { Budoux } from '@/components/Budoux';
import { navHref } from '@/content/shared';
import { FlowCarouselScript } from '@/components/features/FlowCarouselScript';
import { featuresFlow, type Lang } from '@/content/features';

// Entry -> Edit -> Move -> Exit, shown once at the top of the Features page so
// the twelve accordion categories below it read as stages of one flow rather
// than as a flat inventory. Copy and screenshot geometry live in
// content/features.ts (featuresFlow).
//
// This block is added, not ported: eed65be's docs/features.html had nothing
// between the hero and the accordion, so app/original.css has no styles for it
// and there is nothing to restore. Styling is a literal <style> element in the
// component, following components/FeedbackPage.tsx — the same choice made there
// for markup the shared stylesheet does not cover. Every value is an existing
// token, so the block follows the page into dark mode without its own override.
//
// Headings are h2: the page's only other headings are the hero's h1 and
// Keyboard Shortcuts' five h3 group titles, so four h2s here sit between them
// rather than deepening the outline.
//
// The class is `flow-stages`, not `flow-section`: app/original.css:898 already
// owns `.flow-section` for the index page's four-card flow band (centered text,
// bg-secondary panel, 2px border, fadeUp entry animation) and `.flow-section h2`
// out-specifies a single class, so reusing the name silently repainted this
// block and overrode its heading size.
//
// The stages sit in one horizontally snapping track rather than stacking:
// stacked, the four screenshots made the reader scroll past the whole flow
// before reaching the accordion, which buried the thing the accordion is
// supposed to be read against. Layout notes:
//
// - The track bleeds to the container's edge with a negative margin equal to
//   .container's padding, the pattern app/original.css:3111 already uses for
//   .coming-soon-section — not `100vw`, which counts the scrollbar and puts a
//   horizontal scrollbar on the page itself.
// - --flow-gutter is that same padding, reused four ways: the bleed, the
//   track's inner padding, the snap offset, and the width of the edge fade. The
//   fade therefore covers exactly the bled gutter where the neighbouring card's
//   tail shows, and stops where the snapped card begins.
// - A scroll container with focusable children is not focusable on its own in
//   Chrome or Firefox, so the track carries tabindex/role/aria-label to stay
//   reachable by keyboard (WCAG 2.1.1). Arrow keys then scroll it natively.
//
// Screenshots are plain <img> (next/image is unusable under images.unoptimized
// + static export). Intrinsic width/height come from the capture itself so the
// aspect-ratio box is reserved before decode; CSS then scales them to the
// column. The first one is eager and high priority because the horizontal
// layout puts it above the fold on every viewport, where lazy loading would
// delay the page's LCP element.
export function FlowSection({ lang }: { lang: Lang }) {
  const copy = featuresFlow[lang];
  const ja = lang === 'ja';

  return (
    <section className="flow-stages" aria-label={copy.sectionAriaLabel}>
      <style>{`
        .flow-stages {
          --flow-gutter: var(--spacing-lg);
          max-width: 900px;
          margin: 0 auto var(--spacing-2xl);
        }
        .flow-track {
          display: flex;
          gap: var(--spacing-lg);
          overflow-x: auto;
          overscroll-behavior-x: contain;
          scroll-snap-type: x mandatory;
          scroll-padding-inline: var(--flow-gutter);
          padding-inline: var(--flow-gutter);
          margin-inline: calc(-1 * var(--flow-gutter));
          padding-bottom: var(--spacing-xs);
          scrollbar-width: none;
          /* currentColor, not #000: a mask reads only the alpha channel, so the
             opaque stops carry no colour at all — and a hex literal here reads
             to scripts/audit-phase3-colors.mjs as an untokenized theme colour
             that would have to be classified as an exception. Both themes set
             --text-primary fully opaque, so alpha is 1 either way. */
          -webkit-mask-image: linear-gradient(to right, transparent 0, currentColor var(--flow-gutter), currentColor calc(100% - var(--flow-gutter)), transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, currentColor var(--flow-gutter), currentColor calc(100% - var(--flow-gutter)), transparent 100%);
        }
        .flow-track::-webkit-scrollbar { display: none; }
        .flow-track:focus-visible { outline: 2px solid var(--accent-primary); outline-offset: 4px; }
        .flow-stage {
          flex: 0 0 82%;
          min-width: 0;
          scroll-snap-align: start;
          display: flex;
          flex-direction: column;
        }
        .flow-stage-title { font-family: var(--font-serif); font-size: var(--font-size-2xl); line-height: var(--line-height-tight); letter-spacing: var(--letter-spacing-tight); color: var(--text-primary); margin: 0 0 var(--spacing-xs); }
        .flow-stage-label { font-family: var(--font-mono); font-size: var(--font-size-lg); letter-spacing: var(--letter-spacing-wide); color: var(--accent-primary); }
        .flow-stage-body { font-size: var(--font-size-base); line-height: var(--line-height-normal); color: var(--text-secondary); margin: 0 0 var(--spacing-md); }
        /* margin-top: auto pins the screenshot to the bottom of its card. The four
           captures differ in height (332 to 852px at the same width), so top-aligned
           cards end at four different heights inside a track as tall as the tallest
           one, leaving dead space under the short stages. Pushing the media down
           makes every card end flush and moves the slack above the screenshot,
           where it reads as spacing rather than as a gap. */
        .flow-stage-shot { display: block; width: 100%; height: auto; margin-top: auto; border: 1px solid var(--border-card); border-radius: var(--radius-media); box-shadow: var(--shadow-media); }
        .flow-stage-links { margin: var(--spacing-md) 0 0; font-size: var(--font-size-sm); color: var(--text-muted); }
        .flow-stage-links a { color: var(--accent-primary); }
        .flow-stage-links a + a { margin-left: var(--spacing-sm); }
        .flow-dots { display: none; justify-content: center; gap: var(--spacing-xs); margin-top: var(--spacing-sm); }
        .flow-has-dots .flow-dots { display: flex; }
        /* The button is a 24x24 hit target, the visible mark is the 10px circle
           drawn by ::before. Sizing the button itself to the dot fails WCAG 2.2
           target-size (Lighthouse a11y drops to 96 on this page); the 8px gap
           then keeps 32px between centres. margin-top steps down from md to sm
           because the taller button already adds 7px above the visible dot. */
        .flow-dot {
          display: grid;
          place-items: center;
          width: 24px;
          height: 24px;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
        }
        .flow-dot::before {
          content: '';
          width: 10px;
          height: 10px;
          border: 1px solid var(--text-muted);
          border-radius: 50%;
          transition: background-color 160ms ease-out, border-color 160ms ease-out;
        }
        .flow-dot[aria-current='true']::before { background: var(--accent-primary); border-color: var(--accent-primary); }
        .flow-dot:focus-visible { outline: 2px solid var(--accent-primary); outline-offset: 3px; }
        @media (max-width: 768px) {
          .flow-stages { --flow-gutter: var(--spacing-md); }
          .flow-track { gap: var(--spacing-md); }
        }
        @media (max-width: 640px) {
          .flow-stage { flex-basis: 100%; }
          .flow-stage-title { font-size: var(--font-size-xl); }
        }
        @media (max-width: 480px) {
          .flow-stages { --flow-gutter: var(--spacing-sm); }
        }
      `}</style>
      <div className="flow-track" tabIndex={0} role="region" aria-label={copy.trackAriaLabel}>
        {copy.stages.map((stage, index) => (
          <div className="flow-stage" key={stage.id} data-flow-stage={stage.id}>
            <h2 className="flow-stage-title" id={`flow-${stage.id}`}>
              <span className="flow-stage-label">{stage.label}</span> — {ja ? <Budoux text={stage.verb} /> : stage.verb}
            </h2>
            <p className="flow-stage-body">{ja ? <Budoux text={stage.body} /> : stage.body}</p>
            <img
              className="flow-stage-shot"
              src={`/screenshots/toolbar-${stage.id}-${lang}.webp`}
              alt={stage.imageAlt}
              width={stage.imageWidth}
              height={stage.imageHeight}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : undefined}
              decoding="async"
            />
            {stage.links ? (
              <p className="flow-stage-links">
                {stage.links.map((link) => (
                  <a key={link.slug} href={navHref(link.slug, lang)}>
                    {link.label}
                  </a>
                ))}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flow-dots">
        {copy.stages.map((stage, index) => (
          <button
            key={stage.id}
            type="button"
            className="flow-dot"
            data-flow-dot={stage.id}
            aria-label={stage.label}
            aria-current={index === 0 ? 'true' : undefined}
          />
        ))}
      </div>
      <FlowCarouselScript />
    </section>
  );
}
