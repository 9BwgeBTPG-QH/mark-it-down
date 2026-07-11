import { Budoux } from '@/components/Budoux';
import { navHref } from '@/content/shared';
import type { PrivacyBlock } from '@/content/privacy';
import type { Lang } from '@/content/index';

interface SectionBlocksProps {
  lang: Lang;
  blocks: PrivacyBlock[];
}

// Renders a single Privacy Policy section's block[] (#1593 Phase 3-5, final
// group). `list` items reuse the whole-item-bold-label shape already used by
// components/welcome/DetailsContent.tsx and components/troubleshooting/
// ItemBlocks.tsx's `termList` ("**Term**: description" / "**Term** —
// description"): a plain-text `label` rendered as a bold lead phrase,
// followed by `text`, which keeps whatever punctuation (colon, em dash,
// none) the old markup used between the two, since that punctuation is not
// uniform across docs/privacy-policy.html's lists (unlike troubleshooting's
// termList, where every item used a bare space).
//
// `table` has no prior component precedent anywhere in the codebase — this
// is the first `<table>` rendered by this site. Kept intentionally plain
// (border-hairline rules, no zebra striping/shadow) per pitfall #5's "legal
// document: prioritize verbatim text over layout, keep layout minimal."
export function SectionBlocks({ lang, blocks }: SectionBlocksProps) {
  const ja = lang === 'ja';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        if (block.type === 'subheading') {
          return (
            <h3 key={i} className={`text-h3 text-ink ${headingFont}`}>
              {ja ? <Budoux text={block.text} /> : block.text}
            </h3>
          );
        }

        if (block.type === 'note') {
          return (
            <p key={i} className={`text-caption text-ink-muted ${bodyFont}`}>
              {ja ? <Budoux text={block.text} /> : block.text}
            </p>
          );
        }

        if (block.type === 'list') {
          return (
            <ul key={i} className={`list-disc space-y-1 pl-6 ${bodyFont}`}>
              {block.items.map((item, j) => (
                <li key={j}>
                  {item.label && <span className={`font-semibold text-ink ${headingFont}`}>{ja ? <Budoux text={item.label} /> : item.label}</span>}
                  {ja ? <Budoux text={item.text} /> : item.text}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === 'table') {
          return (
            <div key={i} className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-hairline">
                    {block.columns.map((col, c) => (
                      <th key={c} className={`px-3 py-2 text-caption text-ink-muted ${headingFont}`}>
                        {ja ? <Budoux text={col} /> : col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, r) => (
                    <tr key={r} className="border-b border-hairline">
                      {row.map((cell, c) => (
                        <td key={c} className={`px-3 py-2 align-top text-ink-2 ${bodyFont}`}>
                          {ja ? <Budoux text={cell} /> : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === 'linkParagraph') {
          return (
            <p key={i} className={`${bodyFont} text-ink-2`}>
              {ja ? <Budoux text={block.before} /> : block.before}
              <a
                href={navHref(block.linkSlug, lang)}
                className="text-seal underline decoration-seal/40 underline-offset-2 transition-colors duration-instant ease-out hover:decoration-seal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal"
              >
                {ja ? <Budoux text={block.linkLabel} /> : block.linkLabel}
              </a>
              {ja ? <Budoux text={block.after} /> : block.after}
            </p>
          );
        }

        return (
          <p key={i} className={`${bodyFont} text-ink-2`}>
            {ja ? <Budoux text={block.text} /> : block.text}
          </p>
        );
      })}
    </div>
  );
}
