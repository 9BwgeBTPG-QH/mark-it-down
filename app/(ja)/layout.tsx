import type { ReactNode } from 'react';
import { Lora, Raleway } from 'next/font/google';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import '../globals.css';
// Original-design stylesheet (eed65be:docs/style.src.css port) — loaded after
// globals.css so its rules win over Tailwind preflight (#1593 rollback).
import '../original.css';

// Independent root layout for the (ja) route group — see app/(en)/layout.tsx
// for why this can't be a single shared root layout. Raleway is loaded here
// too (latin subset only, like the old site's unicode-range slices): the
// original --font-sans stack starts with Raleway for latin glyphs even on JA
// pages, with JA glyphs falling through to the system stack.
// SiteNav/SiteFooter moved to PageShell (Phase 3) — see app/(en)/layout.tsx
// for why this layout no longer renders them directly.
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' });
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway', display: 'swap' });

export default function JaLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={`${lora.variable} ${raleway.variable}`}>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
