import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/repository/Hero';
import { PhilosophySection } from '@/components/repository/PhilosophySection';
import { Cta } from '@/components/repository/Cta';
import { repositoryJsonLd, repositorySections, type Lang } from '@/content/repository';

// Shared skeleton for the EN/JA Repository Reader page pair, built on the
// same shape as components/RssPage.tsx: hero -> three list sections -> closing
// CTA, with copy in content/repository.ts so app/(en)/repository/page.tsx and
// app/(ja)/repository-ja/page.tsx stay one-line wrappers. PageShell owns
// SiteNav/SiteFooter.
//
// Hero / PhilosophySection / Cta live under components/repository/ rather
// than being shared with components/rss/, following this codebase's
// per-page-family duplication convention (see the comment in RssPage.tsx).
export function RepositoryPage({ lang }: { lang: Lang }) {
  const copy = repositorySections[lang];

  return (
    <PageShell lang={lang} slug="repository">
      <JsonLd data={repositoryJsonLd[lang]} />
      <Hero lang={lang} />
      <PhilosophySection
        lang={lang}
        headingId="repository-open-heading"
        eyebrow={copy.open.eyebrow}
        heading={copy.open.heading}
        intro={copy.open.intro}
        items={copy.open.items}
      />
      <PhilosophySection
        lang={lang}
        headingId="repository-navigate-heading"
        eyebrow={copy.navigate.eyebrow}
        heading={copy.navigate.heading}
        intro={copy.navigate.intro}
        items={copy.navigate.items}
      />
      <PhilosophySection
        lang={lang}
        headingId="repository-keep-heading"
        eyebrow={copy.keep.eyebrow}
        heading={copy.keep.heading}
        intro={copy.keep.intro}
        items={copy.keep.items}
      />
      <Cta lang={lang} />
    </PageShell>
  );
}
