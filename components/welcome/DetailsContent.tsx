import { Budoux } from '@/components/Budoux';
import { navHref } from '@/content/shared';
import type { WelcomeDataItem, WelcomeCapabilityItem } from '@/content/welcome';
import type { Lang } from '@/content/index';

// "About your data" list body, rendered inside the `.welcome-details`
// accordion built by WelcomePage.tsx (original-design rollback, #1593 Wave
// R2). Restored verbatim from docs/welcome.html: each item's leading mark
// uses the real `.icon-yes` / `.icon-warn` classes app/original.css defines
// (no `sr-only` label — the old markup has none).
export function DataList({ lang, items }: { lang: Lang; items: WelcomeDataItem[] }) {
  const ja = lang === 'ja';

  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>
          <span className={item.mark === 'yes' ? 'icon-yes' : 'icon-warn'} aria-hidden="true">
            {item.mark === 'yes' ? '✓' : '⚠'}
          </span>
          {ja ? <Budoux text={item.before} /> : item.before}
          {item.link ? (
            <a href={navHref(item.link.slug, lang)}>{ja ? <Budoux text={item.link.label} /> : item.link.label}</a>
          ) : null}
          {item.after ? (ja ? <Budoux text={item.after} /> : item.after) : null}
        </li>
      ))}
    </ul>
  );
}

// "What else you can do" list body — docs/welcome.html's
// `<strong>Term</strong> — description` items, restored verbatim.
export function CapabilityList({ lang, items }: { lang: Lang; items: WelcomeCapabilityItem[] }) {
  const ja = lang === 'ja';

  return (
    <ul>
      {items.map((item) => (
        <li key={item.label}>
          <strong>{ja ? <Budoux text={item.label} /> : item.label}</strong>
          {' — '}
          {ja ? <Budoux text={item.description} /> : item.description}
        </li>
      ))}
    </ul>
  );
}
