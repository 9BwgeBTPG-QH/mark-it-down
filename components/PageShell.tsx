import type { ReactNode } from 'react';
import type { Lang } from '@/content/index';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

interface PageShellProps {
  lang: Lang;
  slug: string;
  children: ReactNode;
}

// Per-page shell so SiteNav gets this page's own slug (aria-current +
// same-page EN/JA switch) instead of layout.tsx hardcoding the index
// defaults for every route. app/(en)/layout.tsx and app/(ja)/layout.tsx only
// own <html lang> + fonts + globals.css; every page composes PageShell
// around its own content.
export function PageShell({ lang, slug, children }: PageShellProps) {
  return (
    <>
      <SiteNav lang={lang} currentSlug={slug} />
      <main>{children}</main>
      <SiteFooter lang={lang} />
    </>
  );
}
