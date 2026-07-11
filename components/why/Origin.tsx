import { Budoux } from '@/components/Budoux';
import type { Lang } from '@/content/index';
import type { WhyOriginBlock } from '@/content/why';

interface OriginProps {
  lang: Lang;
  eyebrow: string;
  blocks: WhyOriginBlock[];
}

// Part 1 "The starting point" (docs/why.html <section aria-labelledby=
// "why-origin-heading">, #1593 Phase 3-3). Direct read of docs/why.html /
// docs/why-ja.html shows the old markup carries BOTH a visible
// `<span class="section-label">` caption AND a separate hidden
// `<h2 class="visually-hidden">` with the same text — kept here as a
// visible eyebrow caption (same treatment as okf/rss's eyebrow) plus an
// `sr-only` h2 (same Tailwind utility already used by
// components/SiteNav.tsx) so both the visual caption and the heading
// outline/SEO structure match the old page.
//
// `blocks` is an ordered union rather than fixed paragraph fields because
// content/why.ts's whyOrigin has a different block count per language (EN 5
// / JA 7) — see that file's own comment for why. `blockquote` renders as an
// indented, quiet citation (no existing blockquote pattern in this codebase
// to reuse); `emphasis` renders the one whole-paragraph <strong> as a
// standalone bold statement, a block-level rhetorical device distinct from
// the surrounding prose, not a plain paragraph.
export function Origin({ lang, eyebrow, blocks }: OriginProps) {
  const ja = lang === 'ja';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';

  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <p className={`text-caption text-ink-muted ${captionFont}`}>{eyebrow}</p>
        <h2 className={`sr-only ${headingFont}`}>{eyebrow}</h2>
        <div className="mt-6 space-y-6">
          {blocks.map((block, i) => {
            if (block.type === 'blockquote') {
              return (
                <blockquote key={i} className="border-l-2 border-seal py-1 pl-6 text-ink-2 italic">
                  {block.text}
                </blockquote>
              );
            }
            if (block.type === 'emphasis') {
              return (
                <p key={i} className={`text-h3 font-semibold text-ink ${headingFont}`}>
                  {ja ? <Budoux text={block.text} /> : block.text}
                </p>
              );
            }
            return (
              <p key={i} className={`text-ink-2 ${bodyFont}`}>
                {ja ? <Budoux text={block.text} /> : block.text}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
