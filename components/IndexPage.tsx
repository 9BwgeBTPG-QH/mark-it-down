import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/hero/Hero';
import { Philosophy } from '@/components/index/Philosophy';
import { Flow } from '@/components/index/Flow';
import { Screenshot } from '@/components/index/Screenshot';
import { Workflow } from '@/components/index/Workflow';
import { RecentlyAdded } from '@/components/index/RecentlyAdded';
import { FaqPreview } from '@/components/index/FaqPreview';
import { Cta } from '@/components/index/Cta';
import { RevealScript } from '@/components/index/RevealScript';
import { indexJsonLd, type Lang } from '@/content/index';

// Shared skeleton for the EN/JA index page pair. Copy lives in
// content/index.ts so app/(en)/page.tsx and app/(ja)/index-ja/page.tsx stay
// one-line wrappers. Section order restores eed65be docs/index.html verbatim
// (original-design rollback, 2026-07-12): hero → philosophy → flow →
// screenshot (Marp slide iframe) → workflow → coming-soon → FAQ preview →
// CTA, followed by the scroll-reveal script the old page ran at the end of
// <body>. PageShell owns SiteNav/SiteFooter (see app/(en)/layout.tsx).
export function IndexPage({ lang }: { lang: Lang }) {
  return (
    <PageShell lang={lang} slug="index">
      <JsonLd data={indexJsonLd[lang]} />
      <Hero lang={lang} />
      <Philosophy lang={lang} />
      <Flow lang={lang} />
      <Screenshot lang={lang} />
      <Workflow lang={lang} />
      <RecentlyAdded lang={lang} />
      <FaqPreview lang={lang} />
      <Cta lang={lang} />
      <RevealScript />
    </PageShell>
  );
}
