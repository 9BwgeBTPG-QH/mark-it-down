import { PageShell } from '@/components/PageShell';
import { Budoux } from '@/components/Budoux';
import { Hero } from '@/components/changelog/Hero';
import { VersionBlocks } from '@/components/changelog/VersionBlocks';
import { Cta } from '@/components/changelog/Cta';
import { changelogVersions, type Lang } from '@/content/changelog';

// Shared skeleton for the EN/JA Changelog page pair, restored to
// docs/changelog.html's/-ja.html's original plain markup (#1593 Wave R2
// Batch 3 fidelity requirement): hero -> `.changelog-accordion` (48 flat
// `<details class="accordion-item">` entries, newest first, only the
// newest carrying `latest`/`open`) -> closing CTA. PageShell owns
// SiteNav/SiteFooter (see components/TroubleshootingPage.tsx for the same
// pattern). The old accordion markup is written out directly as native
// <details> — no shared accordion component, no JS — following the
// components/TroubleshootingPage.tsx precedent.
export function ChangelogPage({ lang }: { lang: Lang }) {
  const ja = lang === 'ja';
  const versions = changelogVersions[lang];

  return (
    <PageShell lang={lang} slug="changelog">
      <Hero lang={lang} />
      <div className="changelog-accordion">
        {versions.map((version, i) => (
          <details
            key={i}
            className={version.latest ? 'accordion-item latest' : 'accordion-item'}
            open={version.defaultOpen || undefined}
          >
            <summary className="accordion-header">
              <div className="accordion-title">
                <span className="accordion-icon"></span>
                <span className="accordion-version">{version.version}</span>
                <span className="accordion-highlight">
                  {ja ? <Budoux text={version.highlight} /> : version.highlight}
                </span>
              </div>
              <span className={`accordion-status ${version.statusClass}`}>{version.status}</span>
            </summary>
            <div className="accordion-content">
              <VersionBlocks lang={lang} theme={version.theme} sections={version.sections} />
            </div>
          </details>
        ))}
      </div>
      <Cta lang={lang} />
    </PageShell>
  );
}
