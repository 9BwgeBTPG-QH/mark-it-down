import { Fragment } from 'react';
import { Budoux } from '@/components/Budoux';
import { welcomeContent, type Lang } from '@/content/welcome';

// docs/welcome.html put the page's <h1 class="page-title"> directly under
// <main>, as a sibling before `.welcome-hero` (not nested inside it) — the
// hero section itself only holds its own h2 + subtitle paragraph
// (original-design rollback, #1593 Wave R2). Returned as a Fragment so both
// siblings land directly inside WelcomePage's <main>.
export function Hero({ lang }: { lang: Lang }) {
  const copy = welcomeContent[lang];
  const ja = lang === 'ja';

  return (
    <Fragment>
      <h1 className="page-title">{ja ? <Budoux text={copy.h1} /> : copy.h1}</h1>
      <section className="welcome-hero stagger stagger-1">
        <h2>{ja ? <Budoux text={copy.heroHeading} /> : copy.heroHeading}</h2>
        <p>{ja ? <Budoux text={copy.heroSubtitle} /> : copy.heroSubtitle}</p>
      </section>
    </Fragment>
  );
}
