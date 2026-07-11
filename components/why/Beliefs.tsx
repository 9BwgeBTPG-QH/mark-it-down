import { Budoux } from '@/components/Budoux';
import type { Lang } from '@/content/index';
import { whyBeliefsIcons, type WhyBeliefItem } from '@/content/why';

interface BeliefsProps {
  lang: Lang;
  eyebrow: string;
  items: WhyBeliefItem[];
}

// Part 2 "What we believe" (docs/why.html <section aria-labelledby=
// "why-beliefs-heading">, #1593 Phase 3-3). Same visible-caption + `sr-only`
// heading treatment as components/why/Origin.tsx — direct read of
// docs/why.html / docs/why-ja.html shows the old markup carries BOTH a
// visible `<span class="section-label">` caption AND a separate hidden
// `<h2 class="visually-hidden">` with the same text.
//
// Each item keeps the old page's inline SVG icon above its title, rendered
// from content/why.ts's whyBeliefsIcons (language-independent path data,
// indexed positionally against `items`). `paragraphs` is an array rather
// than a fixed field because item index 2 ("Friction, on purpose." /
// "溜め込みには、あえて摩擦を。") has a different paragraph count per
// language (EN 1 / JA 2) — see content/why.ts's own comment.
export function Beliefs({ lang, eyebrow, items }: BeliefsProps) {
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';

  return (
    <section className="border-t border-hairline bg-paper-shade">
      <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <p className={`text-caption text-ink-muted ${captionFont}`}>{eyebrow}</p>
        <h2 className={`sr-only ${headingFont}`}>{eyebrow}</h2>
        <ul className="mt-6 grid gap-10 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={item.title}>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-8 w-8 text-seal"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={whyBeliefsIcons[i]} />
              </svg>
              <h3 className={`mt-4 text-h3 text-ink ${headingFont}`}>{ja ? <Budoux text={item.title} /> : item.title}</h3>
              <div className="mt-2 space-y-3">
                {item.paragraphs.map((text, j) => (
                  <p key={j} className={`text-ink-2 ${bodyFont}`}>
                    {ja ? <Budoux text={text} /> : text}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
