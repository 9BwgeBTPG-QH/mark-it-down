import type { Lang } from '@/content/index';
import { Budoux } from '@/components/Budoux';
import { footerNavLinks, navHref, sharedContent } from '@/content/shared';

interface SiteFooterProps {
  lang: Lang;
}

// DESIGN.md §6 "フッター: ink 反転面（paper 文字）。封蝋モチーフの定位置" /
// §2 "paper 文字 on ink: 16.02:1"（AAA）for the inverted-surface contrast.
export function SiteFooter({ lang }: SiteFooterProps) {
  const copy = sharedContent[lang];
  const fontClass = lang === 'ja' ? 'font-sans-ja' : 'font-sans';
  const headingFontClass = lang === 'ja' ? 'font-sans-ja' : 'font-serif';
  const focusRing =
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal';

  return (
    <footer className="border-t border-hairline bg-ink text-paper">
      <div className="mx-auto max-w-section px-4 py-16 lg:px-8">
        <p className={`text-h3 ${headingFontClass}`}>{copy.brand}</p>

        <nav aria-label={copy.footerLabel} className="mt-8">
          <ul className={`flex flex-wrap gap-x-6 gap-y-3 text-caption ${fontClass}`}>
            {footerNavLinks.map((item) => (
              <li key={item.slug}>
                <a
                  href={navHref(item.slug, lang)}
                  className={`text-paper/80 transition-colors duration-instant ease-out hover:text-paper ${focusRing}`}
                >
                  {lang === 'ja' ? <Budoux text={item.ja} /> : item.en}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className={`mt-8 text-caption text-paper/60 ${fontClass}`}>{copy.copyright}</p>
      </div>
    </footer>
  );
}
