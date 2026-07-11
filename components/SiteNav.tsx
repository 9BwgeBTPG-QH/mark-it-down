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

// DESIGN.md §6 "ナビ：常時表示・sticky。ブラー背景は使わず paper 不透明 +
// hairline 下線". Mobile collapse is the checkbox-hack pattern (no client
// JS): a `peer` checkbox toggles the nav list via `peer-checked:`. The
// checkbox stays `sr-only` (not `hidden`) so it remains focusable/reachable
// by keyboard per DESIGN.md §7 — `display: none` would drop it from the tab
// order entirely. No aria-hidden on it: a focusable element hidden from AT
// fails axe aria-hidden-focus (Lighthouse a11y, #1593 Phase 4); the <label>
// association provides its accessible name instead.
export function SiteNav({ lang, currentSlug = 'index', langSwitchSlug = currentSlug }: SiteNavProps) {
  const copy = sharedContent[lang];
  const fontClass = lang === 'ja' ? 'font-sans-ja' : 'font-sans';
  const headingFontClass = lang === 'ja' ? 'font-sans-ja' : 'font-serif';
  const focusRing =
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal';

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper">
      <div className="mx-auto flex max-w-section items-center justify-between px-4 py-4 lg:px-8">
        <a href={navHref('index', lang)} className={`text-h3 text-ink ${headingFontClass} ${focusRing}`}>
          {copy.brand}
        </a>

        <input type="checkbox" id="site-nav-toggle" className="peer sr-only" />
        <label
          htmlFor="site-nav-toggle"
          className={`cursor-pointer rounded-sm border border-hairline px-3 py-2 text-caption text-ink-2 lg:hidden ${fontClass}`}
        >
          {copy.menuToggle}
        </label>

        <nav aria-label={copy.navLabel} className="hidden w-full peer-checked:block lg:block lg:w-auto">
          <ul
            className={`mt-4 flex flex-col gap-4 border-t border-hairline pt-4 text-caption lg:mt-0 lg:flex-row lg:items-center lg:gap-6 lg:border-0 lg:pt-0 ${fontClass}`}
          >
            {primaryNavLinks.map((item) => {
              const isCurrent = item.slug === currentSlug;
              return (
                <li key={item.slug}>
                  <a
                    href={navHref(item.slug, lang)}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`transition-colors duration-instant ease-out ${focusRing} ${
                      isCurrent ? 'text-seal' : 'text-ink-2 hover:text-seal'
                    }`}
                  >
                    {lang === 'ja' ? <Budoux text={item.ja} /> : item.en}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href={langSwitchHref(lang, langSwitchSlug)}
                hrefLang={lang === 'en' ? 'ja' : 'en'}
                className={`text-ink-muted transition-colors duration-instant ease-out hover:text-seal ${focusRing}`}
              >
                {copy.langSwitchLabel}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
