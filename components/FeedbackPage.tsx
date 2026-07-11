import { PageShell } from '@/components/PageShell';
import { Card } from '@/components/Card';
import { feedbackContent, feedbackTypeItems, feedbackFormEmbed, type Lang } from '@/content/feedback';

// Shared skeleton for the EN/JA Feedback page pair (#1593 Phase 3-5, final
// group). Information order follows docs/feedback.html / docs/feedback-ja.html:
// h1 -> "We'd love to hear from you" intro (2 body lines + mailto link) ->
// 3-card feedback-types grid -> embedded Google Form iframe. The old page's
// inline <style> (.form-container/.form-embed/.form-info/.feedback-types) is
// re-expressed with Tailwind utilities and components/Card.tsx rather than a
// bespoke stylesheet; the iframe's min-height flips from 800px (desktop) to
// 1000px (mobile, `max-width: 768px` in the old CSS) because the embedded
// Google Form stacks its fields vertically on narrow viewports.
export function FeedbackPage({ lang }: { lang: Lang }) {
  const copy = feedbackContent[lang];
  const types = feedbackTypeItems[lang];
  const embed = feedbackFormEmbed[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <PageShell lang={lang} slug="feedback">
      <section className="mx-auto max-w-content px-4 py-section-mobile text-center lg:px-8 lg:py-section">
        <h1 className={`text-balance text-h1-mobile text-ink md:text-h1 ${headingFont}`}>{copy.h1}</h1>
        <div className="mx-auto mt-8 max-w-[500px]">
          <h2 className={`text-h2 text-ink ${headingFont}`}>{copy.formHeading}</h2>
          <p className={`mt-4 text-ink-2 ${bodyFont}`}>
            {copy.formBodyLine1}
            <br />
            {copy.formBodyLine2}
          </p>
          <p className={`mt-2 text-ink-2 ${bodyFont}`}>
            {copy.emailLabel}{' '}
            <a
              href={`mailto:${copy.emailAddress}`}
              className="text-seal underline decoration-seal/40 underline-offset-2 transition-colors duration-instant ease-out hover:decoration-seal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal"
            >
              {copy.emailAddress}
            </a>
          </p>
        </div>

        <ul className="mx-auto mt-8 grid max-w-[600px] gap-4 text-left sm:grid-cols-3">
          {types.map((item) => (
            <li key={item.heading}>
              <Card variant="shade" className="text-center">
                <h3 className={`text-body text-ink ${headingFont}`}>{item.heading}</h3>
                <p className={`mt-1 text-caption text-ink-muted ${bodyFont}`}>{item.body}</p>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-hairline bg-paper-shade">
        <div className="mx-auto max-w-[800px] px-4 py-section-mobile lg:px-8 lg:py-section">
          <iframe
            src={embed.src}
            title={embed.title}
            className="min-h-[1000px] w-full rounded border border-hairline bg-white shadow-sm md:min-h-[800px]"
          >
            {embed.loadingFallback}
          </iframe>
        </div>
      </section>
    </PageShell>
  );
}
