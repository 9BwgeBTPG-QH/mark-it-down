import { Budoux } from '@/components/Budoux';
import type { Lang } from '@/content/index';
import type { TroubleshootingBlock } from '@/content/troubleshooting';

interface ItemBlocksProps {
  lang: Lang;
  blocks: TroubleshootingBlock[];
}

// Renders a single Troubleshooting item's block[] (#1593 Phase 3-4),
// recursive: `group` blocks (e.g. "How to Repair" / "What Gets Detected")
// nest their own blocks one level deeper than the item itself, matching
// docs/troubleshooting.html's `.changelog-group` sub-sections. `termList`
// covers `.changelog-features` bullet lists — a <strong> term followed by a
// plain <span> description with no separator punctuation between them in
// the old markup (confirmed by direct read of docs/troubleshooting.html
// lines 94-97: `<li><strong>Term</strong> <span>description</span></li>`),
// so none is added here. `paragraph`/`list` share the same rendering as
// components/faq/QuestionBlocks.tsx.
export function ItemBlocks({ lang, blocks }: ItemBlocksProps) {
  const ja = lang === 'ja';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        if (block.type === 'list') {
          const items = block.items.map((item, j) => <li key={j}>{ja ? <Budoux text={item} /> : item}</li>);
          return block.ordered ? (
            <ol key={i} className={`list-decimal space-y-1 pl-6 ${bodyFont}`}>
              {items}
            </ol>
          ) : (
            <ul key={i} className={`list-disc space-y-1 pl-6 ${bodyFont}`}>
              {items}
            </ul>
          );
        }
        if (block.type === 'termList') {
          return (
            <ul key={i} className={`space-y-1 ${bodyFont}`}>
              {block.items.map((term, j) => (
                <li key={j}>
                  <span className={`font-semibold text-ink ${headingFont}`}>
                    {ja ? <Budoux text={term.term} /> : term.term}
                  </span>{' '}
                  <span>{ja ? <Budoux text={term.description} /> : term.description}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'group') {
          return (
            <div key={i}>
              <h3 className={`text-h3 text-ink ${headingFont}`}>{ja ? <Budoux text={block.title} /> : block.title}</h3>
              <div className="mt-2">
                <ItemBlocks lang={lang} blocks={block.blocks} />
              </div>
            </div>
          );
        }
        return (
          <p key={i} className={bodyFont}>
            {ja ? <Budoux text={block.text} /> : block.text}
          </p>
        );
      })}
    </div>
  );
}
