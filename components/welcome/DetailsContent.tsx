import { Budoux } from '@/components/Budoux';
import { navHref } from '@/content/shared';
import type { WelcomeDataItem, WelcomeCapabilityItem } from '@/content/welcome';
import type { Lang } from '@/content/index';

const linkClass =
  'text-seal underline decoration-seal/40 underline-offset-2 transition-colors duration-instant ease-out hover:decoration-seal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal';

// "About your data" list body, rendered inside the ArchivalAccordion item
// built by WelcomePage.tsx. Each item's leading yes/warn mark is meaningful
// (old markup: `<span class="icon-yes">✓</span>` / `<span
// class="icon-warn">⚠</span>`), so it stays a rendered glyph rather than
// being flattened away; a `sr-only` label carries the same cue to screen
// readers. Colored only by the glyph choice, not by hue, per DESIGN.md's
// seal-only-accent rule (see components/welcome/icons.tsx's WarningTriangleIcon
// comment for the same constraint).
export function DataList({ lang, items }: { lang: Lang; items: WelcomeDataItem[] }) {
  const ja = lang === 'ja';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className={`flex items-start gap-2 ${bodyFont}`}>
          <span aria-hidden="true" className="text-ink-2">
            {item.mark === 'yes' ? '✓' : '⚠'}
          </span>
          <span>
            <span className="sr-only">{item.mark === 'yes' ? (ja ? '確認: ' : 'Confirmed: ') : ja ? '注意: ' : 'Warning: '}</span>
            {ja ? <Budoux text={item.before} /> : item.before}
            {item.link ? (
              <a href={navHref(item.link.slug, lang)} className={linkClass}>
                {ja ? <Budoux text={item.link.label} /> : item.link.label}
              </a>
            ) : null}
            {item.after ? (ja ? <Budoux text={item.after} /> : item.after) : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

// "What else you can do" list body — old markup's `<strong>Term</strong> —
// description` items, rendered as a label+description list (same pattern as
// components/clipper/FeatureSection.tsx's FeatureItemsList, without the
// hairline dividers since this renders inside an already-bordered accordion
// item).
export function CapabilityList({ lang, items }: { lang: Lang; items: WelcomeCapabilityItem[] }) {
  const ja = lang === 'ja';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label} className={bodyFont}>
          <span className="font-medium text-ink">{ja ? <Budoux text={item.label} /> : item.label}</span>
          {' — '}
          <span className="text-ink-2">{ja ? <Budoux text={item.description} /> : item.description}</span>
        </li>
      ))}
    </ul>
  );
}
