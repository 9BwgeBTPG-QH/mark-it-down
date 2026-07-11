import type { ReactNode } from 'react';
import { Lora, Raleway } from 'next/font/google';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import '../globals.css';

// This is an independent Next.js root layout (via the (en) route group) so
// <html lang> can differ from the (ja) group's layout — a single shared root
// layout can't switch `lang` per request under static export.
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' });
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway', display: 'swap' });

export default function EnLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${raleway.variable}`}>
      <body>
        <SiteNav lang="en" />
        {children}
        <SiteFooter lang="en" />
      </body>
    </html>
  );
}
