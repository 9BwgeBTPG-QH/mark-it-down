import { Budoux } from '@/components/Budoux';
import { FeatureAccordionShell } from '@/components/features/FeatureAccordionShell';
import type { FeaturesListItem } from '@/content/features';
import type { Lang } from '@/content/index';

interface ShortcutGroup {
  heading: string;
  items: FeaturesListItem[];
}

interface ShortcutsSectionProps {
  lang: Lang;
  index: string;
  eyebrow: string;
  heading: string;
  groups: ShortcutGroup[];
  bg: 'paper' | 'paper-shade';
}

// Keyboard Shortcuts category, collapsed by default behind
// FeatureAccordionShell — same #1593 Phase 3-3 structural review that moved
// the other 11 Features categories to FeatureCategoryAccordion. This one
// composes FeatureAccordionShell directly rather than going through
// FeatureCategoryAccordion: docs/features.html nests this category one
// level deeper than the other 11 (5 changelog-group divs, each with its own
// <h3 class="changelog-group-title"> and a flat list of shortcut entries),
// so components/clipper/FeatureSection.tsx's flat items[] prop (and
// FeatureCategoryAccordion, which wraps it) can't represent it without
// flattening the groups and losing the grouping the source page uses. 28
// items made this category one of the two named by the review as most in
// need of collapsing (the other being the 11-category catalog as a whole).
//
// Individual shortcut entries (item.title / item.body) render as plain
// paragraphs, not <h4> — the page's heading hierarchy stays h1 (Hero) -> h2
// (this section's heading, inside FeatureAccordionShell's <summary>) -> h3
// (this section's 5 group headings), per #1593 Phase 3-3's requirement to
// avoid introducing a 4th heading level for individual shortcuts.
export function ShortcutsSection({ lang, index, eyebrow, heading, groups, bg }: ShortcutsSectionProps) {
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <FeatureAccordionShell lang={lang} index={index} eyebrow={eyebrow} heading={heading} bg={bg}>
      <div className="space-y-10">
        {groups.map((group) => (
          <div key={group.heading}>
            <h3 className={`text-h3 text-ink ${headingFont}`}>
              {ja ? <Budoux text={group.heading} /> : group.heading}
            </h3>
            <ul className="mt-4 divide-y divide-hairline border-y border-hairline">
              {group.items.map((item) => (
                <li key={item.title} className="py-4">
                  <p className={`font-medium text-ink ${bodyFont}`}>{ja ? <Budoux text={item.title} /> : item.title}</p>
                  <p className={`mt-1 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={item.body} /> : item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </FeatureAccordionShell>
  );
}
