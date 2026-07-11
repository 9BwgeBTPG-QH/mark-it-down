import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/hero/Hero';
import { Philosophy } from '@/components/index/Philosophy';
import { Flow } from '@/components/index/Flow';
import { Workflow } from '@/components/index/Workflow';
import { RecentlyAdded } from '@/components/index/RecentlyAdded';
import { FaqPreview } from '@/components/index/FaqPreview';
import { Cta } from '@/components/index/Cta';
import { indexJsonLd, type Lang } from '@/content/index';

// Shared skeleton for the EN/JA index page pair. Copy lives in
// content/index.ts so app/(en)/page.tsx and app/(ja)/index-ja/page.tsx stay
// one-line wrappers. Hero is the approved「一枚の紙」layout (#1593 案B).
// Below-fold sections (#1593 Phase 3-1) follow the old docs/index.html
// information order: philosophy → flow → workflow (+ explore links) →
// recently added → FAQ preview → CTA. The old page's screenshot section
// (a Marp slide-deck iframe) is intentionally not ported — Hero already
// renders the one screenshot this page needs, and no slide deck exists in
// this rebuild. PageShell (Phase 3) now owns SiteNav/SiteFooter — see
// app/(en)/layout.tsx for why layout.tsx no longer renders them directly.
export function IndexPage({ lang }: { lang: Lang }) {
  return (
    <PageShell lang={lang} slug="index">
      <JsonLd data={indexJsonLd[lang]} />
      <Hero lang={lang} />
      <Philosophy lang={lang} />
      <Flow lang={lang} />
      <Workflow lang={lang} />
      <RecentlyAdded lang={lang} />
      <FaqPreview lang={lang} />
      <Cta lang={lang} />
    </PageShell>
  );
}
