import type { ReactNode } from 'react';
import { Lora } from 'next/font/google';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import '../globals.css';

// Independent root layout for the (ja) route group — see app/(en)/layout.tsx
// for why this can't be a single shared root layout. JA body text uses the
// system JA font stack (DESIGN.md §3), so only Lora is self-hosted here for
// headings; Raleway is EN-only and intentionally not loaded on this branch.
// SiteNav/SiteFooter moved to PageShell (Phase 3) — see app/(en)/layout.tsx
// for why this layout no longer renders them directly.
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' });

export default function JaLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={lora.variable}>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
