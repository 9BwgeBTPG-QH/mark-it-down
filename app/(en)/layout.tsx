import type { ReactNode } from 'react';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { LangRedirect } from '@/components/LangRedirect';
import { THEME_BOOTSTRAP_SCRIPT } from '@/lib/theme';
import { fontVariables } from '../fonts';
import '../globals.css';
// Original-design stylesheet (eed65be:docs/style.src.css port) — loaded after
// globals.css so its rules win over Tailwind preflight (#1593 rollback).
import '../original.css';

// This is an independent Next.js root layout (via the (en) route group) so
// <html lang> can differ from the (ja) group's layout — a single shared root
// layout can't switch `lang` per request under static export. SiteNav/
// SiteFooter moved to PageShell (Phase 3): a shared root layout can't know a
// page's own slug, so each page composes PageShell itself instead of this
// layout rendering the same index-defaulted nav/footer for every route.
export default function EnLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#f2ede4" />
        <script
          id="mid-theme-bootstrap"
          dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }}
        />
      </head>
      <body>
        <LangRedirect lang="en" />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
