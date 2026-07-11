import { PageShell } from '@/components/PageShell';
import { ArchivalAccordion, type ArchivalAccordionItem } from '@/components/ArchivalAccordion';
import { Hero } from '@/components/welcome/Hero';
import { FirstAction } from '@/components/welcome/FirstAction';
import { Cta } from '@/components/welcome/Cta';
import { WayCards } from '@/components/welcome/WayCards';
import { DataList, CapabilityList } from '@/components/welcome/DetailsContent';
import { welcomeDetailsSummary, welcomeDataItems, welcomeCapabilityItems, type Lang } from '@/content/welcome';

// Shared skeleton for the EN/JA Welcome page pair (#1593 Phase 3-5, final
// group). Information order follows docs/welcome.html / docs/welcome-ja.html:
// h1 -> "Thanks for installing" hero -> "First things first" dialog callout
// -> try-it-now CTA -> "Three ways to use" cards -> 2 <details> blocks
// ("About your data" / "What else you can do"). PageShell owns
// SiteNav/SiteFooter (same pattern as components/TroubleshootingPage.tsx).
//
// Not ported: the old page's browser-language auto-redirect <script> (see
// final report — no other migrated page has an equivalent script, and
// hreflang + PageShell's lang-switcher already provide an explicit,
// crawler-safe language-switching mechanism). Also not preserved: the old
// footer's page-specific "© 2026 Mark It Down" copyright text, since
// SiteFooter is a shared component rendering content/shared.ts's uniform
// "© 2025-2026 reduktion.dev" for every page.
export function WelcomePage({ lang }: { lang: Lang }) {
  const summary = welcomeDetailsSummary[lang];
  const items: ArchivalAccordionItem[] = [
    {
      id: 'welcome-data',
      title: summary.data,
      content: <DataList lang={lang} items={welcomeDataItems[lang]} />,
    },
    {
      id: 'welcome-capability',
      title: summary.capability,
      content: <CapabilityList lang={lang} items={welcomeCapabilityItems[lang]} />,
    },
  ];

  return (
    <PageShell lang={lang} slug="welcome">
      <Hero lang={lang} />
      <FirstAction lang={lang} />
      <Cta lang={lang} />
      <WayCards lang={lang} />
      <section className="border-t border-hairline bg-paper-shade">
        <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
          <ArchivalAccordion items={items} lang={lang} />
        </div>
      </section>
    </PageShell>
  );
}
