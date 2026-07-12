import { Budoux } from '@/components/Budoux';
import { Runs } from '@/components/troubleshooting/Runs';
import type { Lang } from '@/content/index';
import type { TroubleshootingBlock } from '@/content/troubleshooting';

interface ItemBlocksProps {
  lang: Lang;
  blocks: TroubleshootingBlock[];
}

// Renders a single Troubleshooting item's block[], restored to
// docs/troubleshooting.html's/-ja.html's original plain markup (#1593 Wave
// R2 fidelity requirement — no Tailwind/M&I classes, no flattened inline
// tags). Recursive: `group` blocks (e.g. "How to Repair" / "What Gets
// Detected") nest their own blocks one level deeper than the item itself,
// matching the old markup's bare `<div class="changelog-group"><h3
// class="changelog-group-title">...</h3>...</div>`. `termList` covers
// `<ul class="changelog-features">` bullet lists — a `<strong>` term
// followed by a plain `<span>` description with no separator punctuation
// between them in the old markup. `list`/`paragraph` render their `Run[]`
// via components/troubleshooting/Runs.tsx to restore the old markup's
// inline `<strong>`/`<em>`/`<code>` spans.
export function ItemBlocks({ lang, blocks }: ItemBlocksProps) {
  const ja = lang === 'ja';

  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'list') {
          const items = block.items.map((item, j) => (
            <li key={j}>
              <Runs runs={item} ja={ja} />
            </li>
          ));
          return block.ordered ? <ol key={i}>{items}</ol> : <ul key={i}>{items}</ul>;
        }
        if (block.type === 'termList') {
          return (
            <ul key={i} className="changelog-features">
              {block.items.map((term, j) => (
                <li key={j}>
                  <strong>{ja ? <Budoux text={term.term} /> : term.term}</strong>{' '}
                  <span>{ja ? <Budoux text={term.description} /> : term.description}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'group') {
          return (
            <div key={i} className="changelog-group">
              <h3 className="changelog-group-title">{ja ? <Budoux text={block.title} /> : block.title}</h3>
              <ItemBlocks lang={lang} blocks={block.blocks} />
            </div>
          );
        }
        return (
          <p key={i}>
            <Runs runs={block.runs} ja={ja} />
          </p>
        );
      })}
    </>
  );
}
