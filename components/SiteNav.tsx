import type { Lang } from '@/content/index';
import { Budoux } from '@/components/Budoux';
import { primaryNavLinks, navHref, langSwitchHref, sharedContent } from '@/content/shared';

interface SiteNavProps {
  lang: Lang;
  currentSlug?: string;
  // Defaults to currentSlug so the EN/JA switch stays on the same page by
  // default; only needed when a page's language counterpart lives at a
  // different slug than its own.
  langSwitchSlug?: string;
}

// Original-design header (eed65be:docs/*.html, restored 2026-07-12): a plain
// wrapping link list (nav.header-nav) followed by the banner header (logo +
// site title + tagline). All styling comes from app/original.css via the old
// class names — no Tailwind classes here. No mobile hamburger: the old nav
// simply wraps. The old JA pages' inline word-break/ZWSP hints are covered by
// <Budoux> instead (same line-break intent, no inline styles).
export function SiteNav({ lang, currentSlug = 'index', langSwitchSlug = currentSlug }: SiteNavProps) {
  const copy = sharedContent[lang];

  return (
    <>
      <nav className="header-nav" aria-label={copy.navLabel}>
        <ul>
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
      </nav>
      <header role="banner">
        <div className="header-logo">
          <a href={navHref('index', lang)} aria-label={copy.homeAriaLabel}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-128.png" alt="" className="logo-icon" aria-hidden="true" />
            <span className="site-title">{copy.brand}</span>
          </a>
        </div>
        <p className="tagline">{lang === 'ja' ? <Budoux text={copy.tagline} /> : copy.tagline}</p>
      </header>
    </>
  );
}
