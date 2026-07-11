import { indexContent, type Lang } from '@/content/index';
import { Budoux } from '@/components/Budoux';

// Shared skeleton for the EN/JA index page pair. Pulls its own copy from
// content/index.ts so app/(en)/page.tsx and app/(ja)/index-ja/page.tsx stay
// one-line wrappers. Visual design lands in Phase 3.
export function IndexPage({ lang }: { lang: Lang }) {
  const copy = indexContent[lang];

  return (
    <main className="mx-auto max-w-content px-4 py-24">
      <h1 className={`text-h1-mobile md:text-h1 text-ink ${lang === 'ja' ? 'font-sans-ja' : 'font-serif'}`}>
        {lang === 'ja' ? <Budoux text={copy.h1} /> : copy.h1}
      </h1>
      <p className={`mt-4 text-ink-2 ${lang === 'ja' ? 'font-sans-ja text-body-ja' : 'font-sans text-body'}`}>
        {lang === 'ja' ? <Budoux text={copy.description} /> : copy.description}
      </p>
    </main>
  );
}
