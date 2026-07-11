import { Budoux } from '@/components/Budoux';
import { Card } from '@/components/Card';
import { indexSections, type Lang } from '@/content/index';

// Old docs/index.html "Philosophy" section, ported verbatim (#1593 Phase
// 3-1). Section sits on a paper-shade band (DESIGN.md §2 "paper-shade:
// セクション交互背景"), so cards use Card's `outline` variant to avoid two
// adjacent same-shade surfaces (components/Card.tsx).
export function Philosophy({ lang }: { lang: Lang }) {
  const copy = indexSections[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <section className="border-t border-hairline bg-paper-shade">
      <div className="mx-auto max-w-section px-4 py-section-mobile lg:px-8 lg:py-section">
        <h2 className={`text-h2 text-ink ${headingFont}`}>
          {ja ? <Budoux text={copy.philosophyHeading} /> : copy.philosophyHeading}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {copy.philosophyItems.map((item) => (
            <Card key={item.title} variant="outline">
              <h3 className={`text-h3 text-ink ${headingFont}`}>
                {ja ? <Budoux text={item.title} /> : item.title}
              </h3>
              <p className={`mt-2 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={item.body} /> : item.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
