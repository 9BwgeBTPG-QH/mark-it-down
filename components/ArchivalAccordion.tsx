import type { ReactNode } from 'react';
import type { Lang } from '@/content/index';

export interface ArchivalAccordionItem {
  id: string;
  index?: string;
  date?: string;
  title: ReactNode;
  content: ReactNode;
  /** Renders the native `<details open>` attribute (e.g. troubleshooting's first item). */
  defaultOpen?: boolean;
}

interface ArchivalAccordionProps {
  items: ArchivalAccordionItem[];
  lang?: Lang;
  className?: string;
}

// DESIGN.md §6 "アコーディオン（faq / troubleshooting / changelog）: <details>
// CSS-only を維持しつつ Quartz 的 archival index（番号・日付の注釈付きリスト）
// へ". CSS-only: no client JS — <details>/<summary> drives open/close
// natively, and the disclosure arrow rotates via Tailwind's `group`/
// `group-open:` variant, which targets the parent <details>[open] state.
export function ArchivalAccordion({ items, lang = 'en', className = '' }: ArchivalAccordionProps) {
  const titleFontClass = lang === 'ja' ? 'font-sans-ja' : 'font-serif';

  return (
    <div className={`divide-y divide-hairline border-y border-hairline ${className}`}>
      {items.map((item) => (
        <details key={item.id} className="group py-4" open={item.defaultOpen}>
          <summary className="flex cursor-pointer list-none items-baseline gap-4 [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal">
            {item.index && <span className="text-caption text-ink-muted">{item.index}</span>}
            {item.date && <span className="text-caption text-ink-muted">{item.date}</span>}
            <span className={`flex-1 text-h3 text-ink ${titleFontClass}`}>{item.title}</span>
            <span
              aria-hidden="true"
              className="text-ink-muted transition-transform duration-fast ease-out group-open:rotate-180 motion-reduce:transition-none"
            >
              &#8595;
            </span>
          </summary>
          <div className="mt-3 max-w-content text-body text-ink-2">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
