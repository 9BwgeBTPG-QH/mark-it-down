import { Budoux } from '@/components/Budoux';
import type { ClipperListItem } from '@/content/clipper';
import type { Lang } from '@/content/index';

interface FeatureSectionProps {
  lang: Lang;
  eyebrow: string;
  heading: string;
  intro: string;
  items: ClipperListItem[];
  bg: 'paper' | 'paper-shade';
}

// Shared layout for the Flow and Fidelity sections (old docs/clipper.html
// <section class="philosophy">, reused for both). Content ported verbatim;
// the old page's plain <ul><li><strong>...</strong> — desc</li></ul> list is
// rendered here as a hairline-divided title+body list (components/index/
// Workflow.tsx's pattern) rather than a Card grid, matching the old page's
// intent of a simple sequential list rather than a comparison grid.
export function FeatureSection({ lang, eyebrow, heading, intro, items, bg }: FeatureSectionProps) {
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';
  const bgClass = bg === 'paper' ? 'bg-paper' : 'bg-paper-shade';

  return (
    <section className={`border-t border-hairline ${bgClass}`}>
      <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <p className={`text-caption text-ink-muted ${captionFont}`}>{eyebrow}</p>
        <h2 className={`mt-2 text-h2 text-ink ${headingFont}`}>{ja ? <Budoux text={heading} /> : heading}</h2>
        <p className={`mt-4 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={intro} /> : intro}</p>
        <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
          {items.map((item) => (
            <li key={item.title} className="py-6">
              <h3 className={`text-h3 text-ink ${headingFont}`}>{ja ? <Budoux text={item.title} /> : item.title}</h3>
              <p className={`mt-1 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={item.body} /> : item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
