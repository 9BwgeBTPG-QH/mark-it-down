import type { ReactNode } from 'react';
import { Lora, Raleway } from 'next/font/google';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
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
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' });
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway', display: 'swap' });

export default function EnLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${raleway.variable}`}>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
