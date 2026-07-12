import { Budoux } from '@/components/Budoux';
import { OkfInline } from '@/components/okf/InlineText';
import type { Lang } from '@/content/index';
import type { OkfInlineRun, OkfNarrativeLink } from '@/content/okf';

interface NarrativeLinks {
  first: OkfNarrativeLink;
  joiner: string;
  second: OkfNarrativeLink;
  trailing: string;
}

interface NarrativeProps {
  lang: Lang;
  id: string;
  eyebrow: string;
  heading: string;
  paragraphs: OkfInlineRun[][];
  links?: NarrativeLinks;
}

// Prose section shared by the "What is OKF" and "Why it fits" narrative
// blocks in docs/okf.html / docs/okf-ja.html, restored verbatim as a
// `.philosophy` section wrapping a `.why-narrative` div (original-design
// rollback, #1593 Wave R2). No item list — both old sections are just a
// heading followed by paragraphs (the first also closes with a two-link
// sentence). `links` renders as real <a> elements inline in a trailing
// paragraph, joined by the old page's own joiner text (" or " EN / " / " JA)
// and trailing punctuation, matching the old markup's own external-link
// sentence rather than a separate link list. The old markup keeps
// `target="_blank" rel="noopener"` on these two links (no `noreferrer`).
export function Narrative({ lang, id, eyebrow, heading, paragraphs, links }: NarrativeProps) {
  const ja = lang === 'ja';

  return (
    <section className="philosophy" aria-labelledby={id}>
      <span className="section-label">{eyebrow}</span>
      <h2 id={id}>{ja ? <Budoux text={heading} /> : heading}</h2>
      <div className="why-narrative">
        {paragraphs.map((runs, i) => (
          <p key={i}>
            <OkfInline runs={runs} ja={ja} />
          </p>
        ))}
        {links ? (
          <p>
            <a href={links.first.href} target="_blank" rel="noopener">
              {ja ? <Budoux text={links.first.label} /> : links.first.label}
            </a>
            {links.joiner}
            <a href={links.second.href} target="_blank" rel="noopener">
              {ja ? <Budoux text={links.second.label} /> : links.second.label}
            </a>
            {links.trailing}
          </p>
        ) : null}
      </div>
    </section>
  );
}
