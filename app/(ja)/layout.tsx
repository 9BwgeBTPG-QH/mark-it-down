import type { ReactNode } from 'react';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { LangRedirect } from '@/components/LangRedirect';
import { fontVariables } from '../fonts';
import '../globals.css';
// Original-design stylesheet (eed65be:docs/style.src.css port) — loaded after
// globals.css so its rules win over Tailwind preflight (#1593 rollback).
import '../original.css';

// Independent root layout for the (ja) route group — see app/(en)/layout.tsx
// for why this can't be a single shared root layout. Shared fontVariables load
// latin subsets for all three families: Raleway remains first in the original
// --font-sans stack for latin glyphs, while JA glyphs fall through to the
// system stack.
// SiteNav/SiteFooter moved to PageShell (Phase 3) — see app/(en)/layout.tsx
// for why this layout no longer renders them directly.

export default function JaLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={fontVariables}>
      <head>
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" content="#f2ede4" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a09" media="(prefers-color-scheme: dark)" />
      </head>
      <body>
        <LangRedirect lang="ja" />
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
