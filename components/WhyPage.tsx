import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/why/Hero';
import { Origin } from '@/components/why/Origin';
import { Beliefs } from '@/components/why/Beliefs';
import { NotBuilt } from '@/components/why/NotBuilt';
import { Cta } from '@/components/why/Cta';
import { whyJsonLd, type Lang } from '@/content/why';

// Shared skeleton for the EN/JA Philosophy page pair, restored verbatim from
// eed65be (original-design rollback, 2026-07-12). Information order follows
// docs/why.html / docs/why-ja.html: hero -> "The starting point" (narrative
// + blockquote) -> "What we believe" (4-item icon list) -> "What we don't
// build" (visible heading + 3-item list) -> closing CTA. The old page has no
// screenshot/image section, so none is added here. PageShell owns
// SiteNav/SiteFooter (see components/IndexPage.tsx for the same pattern).
export function WhyPage({ lang }: { lang: Lang }) {
  return (
    <PageShell lang={lang} slug="why">
      <JsonLd data={whyJsonLd[lang]} />
      <Hero lang={lang} />
      <Origin lang={lang} />
      <Beliefs lang={lang} />
      <NotBuilt lang={lang} />
      <Cta lang={lang} />
    </PageShell>
  );
}
