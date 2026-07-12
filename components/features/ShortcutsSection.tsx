import { Budoux } from '@/components/Budoux';
import { FeatureAccordionShell } from '@/components/features/FeatureAccordionShell';
import { FeatureItemRow } from '@/components/features/FeatureItemRow';
import type { FeaturesListItem } from '@/content/features';
import type { Lang } from '@/content/index';

interface ShortcutGroup {
  heading: string;
  items: FeaturesListItem[];
}

interface ShortcutsSectionProps {
  lang: Lang;
  eyebrow: string;
  heading: string;
  icon: string;
  groups: ShortcutGroup[];
}

// Keyboard Shortcuts category, restored verbatim to eed65be's old
// docs/features.html .accordion-item markup (#1593 Wave R2 Batch 2). This is
// the one category nested one level deeper than the other 11: 5
// <div class="changelog-group"> blocks, each with its own
// <h3 class="changelog-group-title"> and its own <ul class="changelog-features">
// of shortcut entries — so it composes FeatureAccordionShell directly rather
// than going through FeatureCategoryAccordion's single flat <ul>.
export function ShortcutsSection({ lang, eyebrow, heading, icon, groups }: ShortcutsSectionProps) {
  const ja = lang === 'ja';

  return (
    <FeatureAccordionShell lang={lang} eyebrow={eyebrow} heading={heading} icon={icon}>
      {groups.map((group, i) => (
        <div className="changelog-group" key={i}>
          <h3 className="changelog-group-title">{ja ? <Budoux text={group.heading} /> : group.heading}</h3>
          <ul className="changelog-features">
            {group.items.map((item, j) => (
              <FeatureItemRow key={j} item={item} lang={lang} />
            ))}
          </ul>
        </div>
      ))}
    </FeatureAccordionShell>
  );
}
