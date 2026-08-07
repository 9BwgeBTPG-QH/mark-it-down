import { Budoux } from '@/components/Budoux';
import { navHref } from '@/content/shared';
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
// Screenshots are plain <img> (next/image is unusable under images.unoptimized
// + static export). Intrinsic width/height come from the capture itself so the
// aspect-ratio box is reserved before decode; CSS then scales them to the column.
export function FlowSection({ lang }: { lang: Lang }) {
  const copy = featuresFlow[lang];
  const ja = lang === 'ja';

  return (
    <section className="flow-stages" aria-label={copy.sectionAriaLabel}>
      <style>{`
        .flow-stages {
          max-width: 900px;
          margin: 0 auto var(--spacing-2xl);
          padding: 0 var(--spacing-sm);
        }
        .flow-stage + .flow-stage {
          margin-top: var(--spacing-xl);
          padding-top: var(--spacing-xl);
          border-top: 1px solid var(--border-subtle);
        }
        .flow-stage-title {
          font-family: var(--font-serif);
          font-size: var(--font-size-2xl);
          line-height: var(--line-height-tight);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--text-primary);
          margin: 0 0 var(--spacing-xs);
        }
        .flow-stage-label {
          font-family: var(--font-mono);
          font-size: var(--font-size-lg);
          letter-spacing: var(--letter-spacing-wide);
          color: var(--accent-primary);
        }
        .flow-stage-body {
          font-size: var(--font-size-base);
          line-height: var(--line-height-normal);
          color: var(--text-secondary);
          margin: 0 0 var(--spacing-md);
        }
        .flow-stage-shot {
          display: block;
          width: 100%;
          height: auto;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-media);
          box-shadow: var(--shadow-media);
        }
        .flow-stage-links {
          margin: var(--spacing-md) 0 0;
          font-size: var(--font-size-sm);
          color: var(--text-muted);
        }
        .flow-stage-links a {
          color: var(--accent-primary);
        }
        .flow-stage-links a + a {
          margin-left: var(--spacing-sm);
        }
        @media (max-width: 640px) {
          .flow-stage + .flow-stage {
            margin-top: var(--spacing-lg);
            padding-top: var(--spacing-lg);
          }
          .flow-stage-title {
            font-size: var(--font-size-xl);
          }
        }
      `}</style>
      {copy.stages.map((stage) => (
        <div className="flow-stage" key={stage.id}>
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
            loading="lazy"
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
    </section>
  );
}
