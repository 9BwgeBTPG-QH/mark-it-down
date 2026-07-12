import type { Lang } from '@/content/index';
import { Budoux } from '@/components/Budoux';
import { footerNavLinks, navHref, langSwitchHref, sharedContent } from '@/content/shared';

interface SiteFooterProps {
  lang: Lang;
  // Same-page EN/JA switch target, passed through from PageShell like SiteNav.
  langSwitchSlug?: string;
}

// 旧サイトの footer はページ毎に3点の差異がある（eed65be 実測）:
// 1. .footer-brand 行は index/welcome/why/okf/clipper/rss のみ
// 2. Philosophy リンク（why.html、JA「MIDとは」）は brand 組から index を
//    除いた5ページのみ、Home の直後に入る
// 3. welcome のみ OKF リンクが無く、JA の FAQ ラベルが「FAQ」
//    （他ページは「よくある質問」）
const BRAND_SLUGS = new Set(['index', 'welcome', 'why', 'okf', 'clipper', 'rss']);
const PHILOSOPHY_SLUGS = new Set(['welcome', 'why', 'okf', 'clipper', 'rss']);
const PHILOSOPHY_LINK = { slug: 'why', en: 'Philosophy', ja: 'MIDとは' };

// Original-design footer (eed65be:docs/*.html, restored 2026-07-12): brand
// row (icon + name), full footer-nav list with the language switcher as the
// last item, copyright line. Styling comes from app/original.css class names.
export function SiteFooter({ lang, langSwitchSlug = 'index' }: SiteFooterProps) {
  const copy = sharedContent[lang];
  const slug = langSwitchSlug;
  const links = footerNavLinks
    .filter((item) => !(slug === 'welcome' && item.slug === 'okf'))
    .map((item) =>
      slug === 'welcome' && item.slug === 'faq' ? { ...item, ja: 'FAQ' } : item,
    );
  if (PHILOSOPHY_SLUGS.has(slug)) links.splice(1, 0, PHILOSOPHY_LINK);

  return (
    <footer role="contentinfo">
      {BRAND_SLUGS.has(slug) && (
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon-128.png" alt="" aria-hidden="true" />
          <span>{copy.brand}</span>
        </div>
      )}
      <nav className="footer-nav" aria-label={copy.footerLabel}>
        <ul>
          {links.map((item) => (
            <li key={item.slug}>
              <a href={navHref(item.slug, lang)}>{lang === 'ja' ? <Budoux text={item.ja} /> : item.en}</a>
            </li>
          ))}
          <li className="lang-switcher">
            <a href={langSwitchHref(lang, langSwitchSlug)} hrefLang={lang === 'en' ? 'ja' : 'en'}>
              {copy.langSwitchLabel}
            </a>
          </li>
        </ul>
      </nav>
      <p>
        <span>{copy.copyright}</span>
      </p>
    </footer>
  );
}
