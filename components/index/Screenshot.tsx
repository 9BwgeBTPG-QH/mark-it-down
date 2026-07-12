import { Budoux } from '@/components/Budoux';
import { indexSections, type Lang } from '@/content/index';

// Old docs/index.html screenshot-section, restored verbatim from eed65be
// (original-design rollback, 2026-07-12 — reviving the Marp slide iframe is
// an explicit user decision, see DESIGN.md). The slide decks themselves are
// the untouched pre-Next.js static files, copied from docs/ into public/ so
// dev and build previews resolve the iframe src.
export function Screenshot({ lang }: { lang: Lang }) {
  const copy = indexSections[lang];
  const ja = lang === 'ja';

  return (
    <section className="screenshot-section" aria-labelledby="screenshot-heading">
      <h2 id="screenshot-heading" className="visually-hidden">
        {copy.screenshotHeading}
      </h2>
      <div className="video-container">
        <p className="video-context">{ja ? <Budoux text={copy.screenshotContext} /> : copy.screenshotContext}</p>
        <iframe
          src={ja ? '/slides-ja.html' : '/slides-en.html'}
          title={copy.screenshotIframeTitle}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}
