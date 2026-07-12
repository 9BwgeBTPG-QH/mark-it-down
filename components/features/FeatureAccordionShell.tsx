import type { ReactNode } from 'react';
import { Budoux } from '@/components/Budoux';
import type { Lang } from '@/content/index';

interface FeatureAccordionShellProps {
  lang: Lang;
  eyebrow: string;
  heading: string;
  // Plain glyph string for every category except Git Sync, which passes its
  // <GitSyncIcon /> brand SVG instead (see components/features/GitSyncIcon.tsx).
  icon: ReactNode;
  // Git Sync's .accordion-version carries an extra "accordion-icon-svg"
  // class in the old markup (sizes/aligns the inline SVG); every other
  // category's .accordion-version holds a plain glyph and omits it.
  iconIsSvg?: boolean;
  // Old docs/features.html only ever has the first accordion item (Web
  // Clipper) pre-expanded via a bare `open` attribute; every other category
  // starts collapsed.
  open?: boolean;
  children: ReactNode;
}

// Shared <details>/<summary> shell for the Features page's 12 category-level
// disclosures, restored verbatim to eed65be's old docs/features.html
// .accordion-item markup (design-regression project #1593 Wave R2 Batch 2).
// The old markup has no per-category heading element and no archival index
// number or chevron affordance — .accordion-highlight is a single text node
// joining the eyebrow and heading with an em dash, and the open/close state
// is communicated purely by app/original.css's ::marker / rotate styling on
// .accordion-header. FeaturesPage.tsx's own h1 (Hero) is the only heading in
// the page outline until Keyboard Shortcuts' <h3 class="changelog-group-title">
// group headings — categories themselves are not headings in the old design.
export function FeatureAccordionShell({ lang, eyebrow, heading, icon, iconIsSvg, open, children }: FeatureAccordionShellProps) {
  const ja = lang === 'ja';
  const versionClass = iconIsSvg ? 'accordion-version accordion-icon-svg' : 'accordion-version';

  return (
    <details className="accordion-item" open={open}>
      <summary className="accordion-header">
        <div className="accordion-title">
          <span className="accordion-icon"></span>
          <span className={versionClass}>{icon}</span>
          <span className="accordion-highlight">
            {eyebrow} — {ja ? <Budoux text={heading} /> : heading}
          </span>
        </div>
      </summary>
      <div className="accordion-content">{children}</div>
    </details>
  );
}
