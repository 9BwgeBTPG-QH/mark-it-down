import { Budoux } from '@/components/Budoux';
import { BrokenLines } from '@/components/index/BrokenLines';
import { whyNotBuilt, type Lang } from '@/content/why';

// Old docs/why.html "What we don't build" section (<section aria-labelledby=
// "why-notbuilt-heading">), restored verbatim from eed65be (original-design
// rollback, 2026-07-12). Unlike Origin/Beliefs above, the old h2 here IS
// visible (no visually-hidden class) and reuses the hero-subtitle class for
// its intro paragraph (BrokenLines restores the old markup's hard <br>
// breaks, 2 lines EN / 3 lines JA). The list reuses the shared
// coming-soon-list/coming-soon-list--spaced classes but with the old page's
// own literal item markup: `<li><strong>Title</strong> — body</li>`
// (em-dash-joined inline text, no <span>) — a different pattern from
// components/index/RecentlyAdded.tsx's `<li><strong>/<span></li>`, so that
// component is not reused here. Not a reuse of components/clipper/
// FeatureSection.tsx either (still Tailwind-based, out of scope for this
// page).
export function NotBuilt({ lang }: { lang: Lang }) {
  const copy = whyNotBuilt[lang];
  const ja = lang === 'ja';

  return (
    <section className="philosophy" aria-labelledby="why-notbuilt-heading">
      <span className="section-label">{copy.eyebrow}</span>
      <h2 id="why-notbuilt-heading">{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
      <p className="hero-subtitle">
        <BrokenLines lines={copy.subtitleLines} ja={ja} />
      </p>
      <ul className="coming-soon-list coming-soon-list--spaced" role="list">
        {copy.items.map((item) => (
          <li key={item.title}>
            <strong>{ja ? <Budoux text={item.title} /> : item.title}</strong>
            {' — '}
            {ja ? <Budoux text={item.body} /> : item.body}
          </li>
        ))}
      </ul>
    </section>
  );
}
