import type { Lang } from '@/content/index';
import { Budoux } from '@/components/Budoux';
import { footerNavLinks, navHref, langSwitchHref, sharedContent } from '@/content/shared';

interface SiteFooterProps {
  lang: Lang;
  // Same-page EN/JA switch target, passed through from PageShell like SiteNav.
  langSwitchSlug?: string;
}

// Original-design footer (eed65be:docs/*.html, restored 2026-07-12): brand
// row (icon + name), full footer-nav list with the language switcher as the
// last item, copyright line. Styling comes from app/original.css class names.
export function SiteFooter({ lang, langSwitchSlug = 'index' }: SiteFooterProps) {
  const copy = sharedContent[lang];

  return (
    <footer role="contentinfo">
      <div className="footer-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icon-128.png" alt="" aria-hidden="true" />
        <span>{copy.brand}</span>
      </div>
      <nav className="footer-nav" aria-label={copy.footerLabel}>
        <ul>
          {footerNavLinks.map((item) => (
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
