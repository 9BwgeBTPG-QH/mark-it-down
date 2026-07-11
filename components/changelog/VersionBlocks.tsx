import { Budoux } from '@/components/Budoux';
import type { Lang } from '@/content/index';
import type { ChangelogSection } from '@/content/changelog';

interface VersionBlocksProps {
  lang: Lang;
  theme?: string;
  sections: ChangelogSection[];
}

// Renders a single changelog version's optional intro paragraph
// (`.changelog-theme` in the old markup) followed by its sections
// (`.changelog-group`, each an optional <h3> title + a `.changelog-features`
// term list). Styling mirrors components/troubleshooting/ItemBlocks.tsx's
// `group` + `termList` block rendering, flattened to this page's simpler
// non-recursive shape (changelog never nests a section inside a section).
export function VersionBlocks({ lang, theme, sections }: VersionBlocksProps) {
  const ja = lang === 'ja';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';

  return (
    <div className="space-y-3">
      {theme && <p className={bodyFont}>{ja ? <Budoux text={theme} /> : theme}</p>}
      {sections.map((section, i) => (
        <div key={i}>
          {section.title && (
            <h3 className={`text-h3 text-ink ${headingFont}`}>{ja ? <Budoux text={section.title} /> : section.title}</h3>
          )}
          <ul className={`mt-2 space-y-1 ${bodyFont}`}>
            {section.items.map((item, j) => (
              <li key={j}>
                <span className={`font-semibold text-ink ${headingFont}`}>
                  {ja ? <Budoux text={item.term} /> : item.term}
                </span>{' '}
                <span>{ja ? <Budoux text={item.description} /> : item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
