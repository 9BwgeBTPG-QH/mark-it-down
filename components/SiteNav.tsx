import type { Lang } from '@/content/index';
import { Budoux } from '@/components/Budoux';
import { primaryNavLinks, navHref, langSwitchHref, sharedContent, pageTaglines } from '@/content/shared';

interface SiteNavProps {
  lang: Lang;
  currentSlug?: string;
  // Defaults to currentSlug so the EN/JA switch stays on the same page by
  // default; only needed when a page's language counterpart lives at a
  // different slug than its own.
  langSwitchSlug?: string;
}

// Header: a hamburger nav (top-right, all viewports; CSS-only <details> like
// every other disclosure on this site — no JS. Opening it covers the whole
// viewport with a fullscreen overlay (2026-08-01); the only close affordance
// is the summary itself, rendered as an X above the overlay — Esc-to-close
// remains a known, accepted limitation) followed by the banner header (logo +
// site title + tagline). All styling comes from app/original.css via the old
// class names — no Tailwind classes here. The old JA pages' inline
// word-break/ZWSP hints are covered by <Budoux> instead (same line-break
// intent, no inline styles).
export function SiteNav({ lang, currentSlug = 'index', langSwitchSlug = currentSlug }: SiteNavProps) {
  const copy = sharedContent[lang];
  // 旧サイトはヘッダタグラインがページ毎に異なる（welcome は無し）。
  const tagline =
    currentSlug in pageTaglines[lang] ? pageTaglines[lang][currentSlug] : copy.tagline;
  // 旧 welcome.html はオンボーディング専用ページとして header-nav 自体が無い
  // （ロゴのみの banner header）。eed65be 実測に合わせて非表示にする。
  const showNav = currentSlug !== 'welcome';

  return (
    <>
      {showNav && (
      <nav className="header-nav" aria-label={copy.navLabel}>
        <details className="nav-menu">
          {/* <summary> gets its accessible name from visually-hidden text
              (aria-label on summary is unreliable across screen readers).
              No manual aria-expanded: <details> exposes its own state. */}
          <summary className="nav-menu-toggle">
            <span className="nav-menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="visually-hidden">{copy.navLabel}</span>
          </summary>
          <ul className="nav-menu-panel">
            {primaryNavLinks.map((item) => (
              <li key={item.slug}>
                <a href={navHref(item.slug, lang)} aria-current={item.slug === currentSlug ? 'page' : undefined}>
                  {lang === 'ja' ? <Budoux text={item.ja} /> : item.en}
                </a>
              </li>
            ))}
            <li className="lang-switcher">
              <a href={langSwitchHref(lang, langSwitchSlug)} hrefLang={lang === 'en' ? 'ja' : 'en'}>
                {copy.langSwitchLabel}
              </a>
            </li>
          </ul>
        </details>
      </nav>
      )}
      <header role="banner">
        <div className="header-logo">
          <a href={navHref('index', lang)} aria-label={copy.homeAriaLabel}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-128.png" alt="" className="logo-icon" aria-hidden="true" />
            <span className="site-title">{copy.brand}</span>
          </a>
        </div>
        {tagline !== null && (
          <p className="tagline">
            {/* Budoux only makes sense for CJK text; the shared tagline is an
                English brand phrase on both languages, so gate on content,
                not lang, to avoid feeding English through the CJK parser. */}
            {lang === 'ja' && /[぀-ヿ㐀-鿿]/.test(tagline) ? (
              <Budoux text={tagline} />
            ) : (
              tagline
            )}
          </p>
        )}
      </header>
    </>
  );
}
