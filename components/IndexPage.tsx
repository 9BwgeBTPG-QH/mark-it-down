import { Hero } from '@/components/hero/Hero';
import type { Lang } from '@/content/index';

// Shared skeleton for the EN/JA index page pair. Copy lives in
// content/index.ts so app/(en)/page.tsx and app/(ja)/index-ja/page.tsx stay
// one-line wrappers. Hero is the approved「一枚の紙」layout (#1593 案B);
// remaining index sections land in Phase 3.
export function IndexPage({ lang }: { lang: Lang }) {
  return (
    <main>
      <Hero lang={lang} />
    </main>
  );
}
