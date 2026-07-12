import { Budoux } from '@/components/Budoux';
import { TemplateInline } from '@/components/templates/InlineText';
import { templatesGuide } from '@/content/templates';
import type { Lang } from '@/content/index';

// docs/templates.html / docs/templates-ja.html's "Make it your own" guide
// section, restored verbatim (original-design rollback, #1593 Wave R2 Batch
// 2): section.guide-section > h2 + p.guide-intro + div.guide-cards >
// article.guide-card (x2, each h3 + p). Card bodies keep their old
// <strong>/<code> inline emphasis via TemplateInline.
export function Guide({ lang }: { lang: Lang }) {
  const copy = templatesGuide[lang];
  const ja = lang === 'ja';

  return (
    <section className="guide-section" aria-labelledby="guide-heading">
      <h2 id="guide-heading">{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
      <p className="guide-intro">
        <TemplateInline runs={copy.intro} ja={ja} />
      </p>
      <div className="guide-cards">
        {copy.cards.map((card, i) => (
          <article className="guide-card" key={i}>
            <h3>{ja ? <Budoux text={card.title} /> : card.title}</h3>
            <p>
              <TemplateInline runs={card.body} ja={ja} />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
