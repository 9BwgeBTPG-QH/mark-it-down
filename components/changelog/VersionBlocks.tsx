import { Budoux } from '@/components/Budoux';
import { Runs } from '@/components/changelog/Runs';
import type { Lang } from '@/content/index';
import type { ChangelogSection } from '@/content/changelog';

interface VersionBlocksProps {
  lang: Lang;
  theme?: string;
  sections: ChangelogSection[];
}

// Renders a single changelog version's optional intro paragraph
// (`.changelog-theme` in the old markup) followed by its sections. A
// section with a `title` renders as `.changelog-group` (`<h3
// class="changelog-group-title">` + `.changelog-features`); a section
// without one (the flat pre-2.0 releases) renders its `.changelog-features`
// list directly, with no wrapping div — matching app/original.css's
// `.accordion-content > .changelog-features` rule for that exact case.
// term/description render via components/changelog/Runs.tsx to restore the
// old markup's inline `<code>` spans instead of flattening them to plain
// text (#1593 Wave R2 Batch 3 fidelity requirement).
export function VersionBlocks({ lang, theme, sections }: VersionBlocksProps) {
  const ja = lang === 'ja';

  return (
    <>
      {theme && <p className="changelog-theme">{ja ? <Budoux text={theme} /> : theme}</p>}
      {sections.map((section, i) => {
        const items = section.items.map((item, j) => (
          <li key={j}>
            <strong>
              <Runs runs={item.term} ja={ja} />
            </strong>{' '}
            <span>
              <Runs runs={item.description} ja={ja} />
            </span>
          </li>
        ));

        if (!section.title) {
          return (
            <ul key={i} className="changelog-features" role="list">
              {items}
            </ul>
          );
        }

        return (
          <div key={i} className="changelog-group">
            <h3 className="changelog-group-title">{ja ? <Budoux text={section.title} /> : section.title}</h3>
            <ul className="changelog-features" role="list">
              {items}
            </ul>
          </div>
        );
      })}
    </>
  );
}
