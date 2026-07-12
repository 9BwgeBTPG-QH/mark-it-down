import { PageShell } from '@/components/PageShell';
import { Budoux } from '@/components/Budoux';
import { SectionBlocks } from '@/components/privacy/SectionBlocks';
import { privacyContent, privacySections, type Lang } from '@/content/privacy';

// Shared skeleton for the EN/JA Privacy Policy page pair, restored to
// docs/privacy-policy.html's/-ja.html's original plain markup (#1593 Wave
// R2 fidelity requirement): `<h1 class="page-title">`, a bold lastUpdated
// line, then each section's bare `<section><h2>...</h2>...</section>` in
// the page's own original order — no wrapper divs, no Tailwind/M&I classes.
// docs/privacy-policy.html and docs/privacy-policy-ja.html order their h2
// sections differently (EN: Overview -> Data Collection -> Data Storage ->
// Web Clipper -> RSS -> ...; JA: Overview -> Web Clipper -> RSS -> Data
// Collection -> Data Storage -> ...), which content/privacy.ts's
// privacySections preserves per language rather than reconciling into one
// shared order.
export function PrivacyPolicyPage({ lang }: { lang: Lang }) {
  const copy = privacyContent[lang];
  const sections = privacySections[lang];
  const ja = lang === 'ja';

  return (
    <PageShell lang={lang} slug="privacy-policy">
      <h1 className="page-title">{ja ? <Budoux text={copy.h1} /> : copy.h1}</h1>
      <p>
        <strong>{ja ? <Budoux text={copy.lastUpdated} /> : copy.lastUpdated}</strong>
      </p>

      {sections.map((section) => (
        <section key={section.id}>
          <h2>{ja ? <Budoux text={section.heading} /> : section.heading}</h2>
          <SectionBlocks lang={lang} blocks={section.blocks} />
        </section>
      ))}
    </PageShell>
  );
}
