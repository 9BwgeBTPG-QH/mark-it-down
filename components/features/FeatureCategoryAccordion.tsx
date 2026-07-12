import type { ReactNode } from 'react';
import { FeatureAccordionShell } from '@/components/features/FeatureAccordionShell';
import { FeatureItemRow } from '@/components/features/FeatureItemRow';
import type { FeaturesListItem } from '@/content/features';
import type { Lang } from '@/content/index';

interface FeatureCategoryAccordionProps {
  lang: Lang;
  eyebrow: string;
  heading: string;
  icon: ReactNode;
  iconIsSvg?: boolean;
  open?: boolean;
  items: FeaturesListItem[];
}

// One of the Features page's 11 flat catalog categories, restored verbatim
// to eed65be's old docs/features.html .accordion-item markup (design-
// regression project #1593 Wave R2 Batch 2). Renders a single
// <ul class="changelog-features"> of <li><strong>Title</strong>
// <span>Body</span></li> rows inside FeatureAccordionShell — no longer goes
// through components/clipper/FeatureSection.tsx (that shared component's
// hairline-card layout doesn't match this old markup, and it belongs to a
// different task).
export function FeatureCategoryAccordion({
  lang,
  eyebrow,
  heading,
  icon,
  iconIsSvg,
  open,
  items,
}: FeatureCategoryAccordionProps) {
  return (
    <FeatureAccordionShell lang={lang} eyebrow={eyebrow} heading={heading} icon={icon} iconIsSvg={iconIsSvg} open={open}>
      <ul className="changelog-features">
        {items.map((item, i) => (
          <FeatureItemRow key={i} item={item} lang={lang} />
        ))}
      </ul>
    </FeatureAccordionShell>
  );
}
