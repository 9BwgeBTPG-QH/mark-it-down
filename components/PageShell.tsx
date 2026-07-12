import type { ReactNode } from 'react';
import type { Lang } from '@/content/index';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { sharedContent } from '@/content/shared';

interface PageShellProps {
  lang: Lang;
  slug: string;
  children: ReactNode;
}

// Original-design page skeleton (eed65be:docs/*.html, restored 2026-07-12):
// skip link → .container → header-nav + banner header → main#main-content →
// footer. All inside .container, exactly like the old static pages, so
// app/original.css's container/section selectors apply unchanged. Per-page
// shell so SiteNav gets this page's own slug (aria-current + same-page EN/JA
// switch).
export function PageShell({ lang, slug, children }: PageShellProps) {
  const copy = sharedContent[lang];

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        {copy.skipLabel}
      </a>
      <div className="container">
        <SiteNav lang={lang} currentSlug={slug} />
        <main id="main-content" role="main">
          {children}
        </main>
        <SiteFooter lang={lang} langSwitchSlug={slug} />
      </div>
    </>
  );
}
