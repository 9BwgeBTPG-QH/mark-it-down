import type { ReactNode } from 'react';
import { Budoux } from '@/components/Budoux';
import type { Lang } from '@/content/index';

interface FeatureAccordionShellProps {
  lang: Lang;
  index: string;
  eyebrow: string;
  heading: string;
  bg: 'paper' | 'paper-shade';
  children: ReactNode;
}

// Shared <details>/<summary> shell for the Features page's category-level
// disclosures (#1593 Phase 3-3 structural review: the old docs/features.html
// kept each of its 11 categories collapsed behind an accordion — a
// deliberate old-design information structure for catalog content — which
// the earlier flat port had lost).
//
// components/ArchivalAccordion.tsx doesn't fit here: its <summary> title
// renders as a plain <span> (text-h3), not a heading element — fine for its
// existing callers (index page FAQ Q&A leaf items) where nothing below the
// section's own <h2> needs its own heading level, but Features categories
// ARE h2-level themselves (h1 Hero -> h2 category -> h3 item), so reusing
// ArchivalAccordion verbatim would delete every category's <h2> from the
// page outline. This shell keeps the same DESIGN.md §6 visual language
// (archival index number, hairline border, group-open rotate arrow,
// CSS-only details/summary — no client JS) while keeping a real <h2> inside
// <summary>.
//
// Shared by components/features/FeatureCategoryAccordion.tsx (11 flat
// categories) and components/features/ShortcutsSection.tsx (Keyboard
// Shortcuts, whose body content is grouped rather than a flat item list, so
// it composes this shell directly instead of going through
// FeatureCategoryAccordion).
export function FeatureAccordionShell({ lang, index, eyebrow, heading, bg, children }: FeatureAccordionShellProps) {
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';
  const bgClass = bg === 'paper' ? 'bg-paper' : 'bg-paper-shade';

  return (
    <section className={`border-t border-hairline ${bgClass}`}>
      <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-baseline gap-4 [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal">
            <span className={`text-caption text-ink-muted ${captionFont}`}>{index}</span>
            <span className="flex-1">
              <p className={`text-caption text-ink-muted ${captionFont}`}>{eyebrow}</p>
              <h2 className={`mt-2 text-h2 text-ink ${headingFont}`}>{ja ? <Budoux text={heading} /> : heading}</h2>
            </span>
            <span
              aria-hidden="true"
              className="text-ink-muted transition-transform duration-fast ease-out group-open:rotate-180 motion-reduce:transition-none"
            >
              &#8595;
            </span>
          </summary>
          <div className="mt-6">{children}</div>
        </details>
      </div>
    </section>
  );
}
