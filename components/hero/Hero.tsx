import Image from 'next/image';
import { SealButton } from '@/components/SealButton';
import { Budoux } from '@/components/Budoux';
import { navHref } from '@/content/shared';
import { indexContent, type Lang } from '@/content/index';

const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// index hero「一枚の紙」(#1593 案B採用、2026-07-11 ユーザー決定)。装飾なしの
// 全幅タイポグラフィ + hairline 罫 + CTA。スクリーンショットは直下の独立
// セクションに 2 枚目の紙として全幅で置く。Motion なし（完全静的）。
// 封蝋モチーフは不採用: MID は手紙ではなく tear-off notepad / scratch pad。
export function Hero({ lang }: { lang: Lang }) {
  const copy = indexContent[lang];
  const ja = lang === 'ja';

  return (
    <>
      <section className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <h1
          className={`text-balance text-display-mobile text-ink md:text-display ${ja ? 'font-serif-ja' : 'font-serif'}`}
        >
          {ja ? <Budoux text={copy.h1} /> : copy.h1}
        </h1>
        <hr className="my-6 border-hairline" />
        <p className={`text-ink-2 ${ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body'}`}>
          {ja ? <Budoux text={copy.heroLede} /> : copy.heroLede}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <SealButton
            href={CWS_URL}
            lang={lang}
            variant="primary"
            target="_blank"
            rel="noreferrer noopener"
          >
            {copy.ctaPrimary}
          </SealButton>
          <SealButton href={navHref('features', lang)} lang={lang} variant="secondary">
            {copy.ctaSecondary}
          </SealButton>
        </div>
      </section>

      <section className="mx-auto max-w-section px-4 pb-section-mobile lg:px-8 lg:pb-section">
        <div className="overflow-hidden rounded border border-hairline bg-paper">
          <Image
            src="/hero-mock/hero-screenshot.png"
            alt={
              ja
                ? 'ブラウザタブで開いた Mark It Down エディタでノートを書き直している画面'
                : 'Mark It Down editor open in a browser tab, showing a note being rewritten'
            }
            width={1280}
            height={800}
            className="h-auto w-full"
            priority
          />
        </div>
      </section>
    </>
  );
}
