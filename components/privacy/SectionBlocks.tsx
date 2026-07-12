import { Budoux } from '@/components/Budoux';
import { Runs } from '@/components/privacy/Runs';
import { navHref } from '@/content/shared';
import type { PrivacyBlock } from '@/content/privacy';
import type { Lang } from '@/content/index';

interface SectionBlocksProps {
  lang: Lang;
  blocks: PrivacyBlock[];
}

// Renders a single Privacy Policy section's block[], restored to
// docs/privacy-policy.html's/-ja.html's original plain markup (#1593 Wave
// R2 fidelity requirement — no Tailwind/M&I classes, no flattened inline
// tags). `list` items render a bold `label` (when present) followed by
// `runs`, matching the old markup's `<li><strong>Label</strong>: rest</li>`
// shape; `note` restores the old `<p><small>...</small></p>` wrap that the
// M&I version had dropped.
export function SectionBlocks({ lang, blocks }: SectionBlocksProps) {
  const ja = lang === 'ja';

  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'subheading') {
          return <h3 key={i}>{ja ? <Budoux text={block.text} /> : block.text}</h3>;
        }

        if (block.type === 'note') {
          return (
            <p key={i}>
              <small>{ja ? <Budoux text={block.text} /> : block.text}</small>
            </p>
          );
        }

        if (block.type === 'list') {
          return (
            <ul key={i}>
              {block.items.map((item, j) => (
                <li key={j}>
                  {item.label && <strong>{ja ? <Budoux text={item.label} /> : item.label}</strong>}
                  <Runs runs={item.runs} ja={ja} />
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'table') {
          return (
            <table key={i}>
              <thead>
                <tr>
                  {block.columns.map((col, c) => (
                    <th key={c} scope="col">
                      {ja ? <Budoux text={col} /> : col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c}>{ja ? <Budoux text={cell} /> : cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        }

        if (block.type === 'linkParagraph') {
          return (
            <p key={i}>
              {ja ? <Budoux text={block.before} /> : block.before}
              <a href={navHref(block.linkSlug, lang)}>{ja ? <Budoux text={block.linkLabel} /> : block.linkLabel}</a>
              {ja ? <Budoux text={block.after} /> : block.after}
            </p>
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
