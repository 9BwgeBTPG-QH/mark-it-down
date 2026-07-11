import { Budoux } from '@/components/Budoux';
import type { Lang } from '@/content/index';
import type { OkfNarrativeLink } from '@/content/okf';

interface NarrativeLinks {
  first: OkfNarrativeLink;
  joiner: string;
  second: OkfNarrativeLink;
  trailing: string;
}

interface NarrativeProps {
  lang: Lang;
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  links?: NarrativeLinks;
  bg: 'paper' | 'paper-shade';
}

// Prose section shared by the "What is OKF" and "Why it fits" narrative
// blocks in docs/okf.html / docs/okf-ja.html (#1593 Phase 3-3). Plain
// reading layout — no item list — since both old sections are just a
// heading followed by paragraphs (the first also closes with a two-link
// sentence). `links` renders as real <a> elements inline in a trailing
// paragraph, joined by the old page's own joiner text (" or " EN / " / " JA)
// and trailing punctuation, matching the old markup's own external-link
// sentence rather than a separate link list.
export function Narrative({ lang, eyebrow, heading, paragraphs, links, bg }: NarrativeProps) {
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';
  const bgClass = bg === 'paper' ? 'bg-paper' : 'bg-paper-shade';
  const linkClass =
    'text-seal underline decoration-seal/40 underline-offset-2 transition-colors duration-instant ease-out hover:decoration-seal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal';

  return (
    <section className={`border-t border-hairline ${bgClass}`}>
      <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <p className={`text-caption text-ink-muted ${captionFont}`}>{eyebrow}</p>
        <h2 className={`mt-2 text-h2 text-ink ${headingFont}`}>{ja ? <Budoux text={heading} /> : heading}</h2>
        <div className="mt-6 space-y-4">
          {paragraphs.map((text, i) => (
            <p key={i} className={`text-ink-2 ${bodyFont}`}>
              {ja ? <Budoux text={text} /> : text}
            </p>
          ))}
          {links ? (
            <p className={`text-ink-2 ${bodyFont}`}>
              <a href={links.first.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {ja ? <Budoux text={links.first.label} /> : links.first.label}
              </a>
              {links.joiner}
              <a href={links.second.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {ja ? <Budoux text={links.second.label} /> : links.second.label}
              </a>
              {links.trailing}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
