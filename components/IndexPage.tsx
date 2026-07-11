import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/hero/Hero';
import { indexJsonLd, type Lang } from '@/content/index';

// Shared skeleton for the EN/JA index page pair. Copy lives in
// content/index.ts so app/(en)/page.tsx and app/(ja)/index-ja/page.tsx stay
// one-line wrappers. Hero is the approved「一枚の紙」layout (#1593 案B);
// remaining index sections land in Phase 3. PageShell (Phase 3) now owns
// SiteNav/SiteFooter — see app/(en)/layout.tsx for why layout.tsx no longer
// renders them directly.
export function IndexPage({ lang }: { lang: Lang }) {
  return (
    <PageShell lang={lang} slug="index">
      <JsonLd data={indexJsonLd[lang]} />
      <Hero lang={lang} />
    </PageShell>
  );
}
