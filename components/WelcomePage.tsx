import { PageShell } from '@/components/PageShell';
import { Hero } from '@/components/welcome/Hero';
import { FirstAction } from '@/components/welcome/FirstAction';
import { Cta } from '@/components/welcome/Cta';
import { WayCards } from '@/components/welcome/WayCards';
import { DataList, CapabilityList } from '@/components/welcome/DetailsContent';
import { welcomeDetailsSummary, welcomeDataItems, welcomeCapabilityItems, type Lang } from '@/content/welcome';

// Shared skeleton for the EN/JA Welcome page pair, restored verbatim from
// docs/welcome.html / docs/welcome-ja.html (original-design rollback, #1593
// Wave R2): h1 -> "Thanks for installing" hero -> `.welcome-body` wrapping
// "First things first" dialog callout -> try-it-now CTA -> "Three ways to
// use" cards -> 2 native <details class="welcome-details"> accordions
// ("About your data" / "What else you can do"). PageShell owns
// SiteNav/SiteFooter.
//
// Not ported: the old page's browser-language auto-redirect <script>
// (separate task) and the old footer's page-specific copyright text, since
// SiteFooter is a shared component.
export function WelcomePage({ lang }: { lang: Lang }) {
  const summary = welcomeDetailsSummary[lang];

  return (
    <PageShell lang={lang} slug="welcome">
      <Hero lang={lang} />
      <div className="welcome-body">
        <FirstAction lang={lang} />
        <Cta lang={lang} />
        <WayCards lang={lang} />
        <details className="welcome-details stagger stagger-8">
          <summary>{summary.data}</summary>
          <div className="detail-content">
            <DataList lang={lang} items={welcomeDataItems[lang]} />
          </div>
        </details>
        <details className="welcome-details stagger stagger-8">
          <summary>{summary.capability}</summary>
          <div className="detail-content">
            <CapabilityList lang={lang} items={welcomeCapabilityItems[lang]} />
          </div>
        </details>
      </div>
    </PageShell>
  );
}
