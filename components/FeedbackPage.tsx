import { Budoux } from '@/components/Budoux';
import { PageShell } from '@/components/PageShell';
import { BrokenLines } from '@/components/index/BrokenLines';
import { feedbackContent, feedbackTypeItems, feedbackFormEmbed, type Lang } from '@/content/feedback';

// Old docs/feedback.html / docs/feedback-ja.html page, restored verbatim from
// eed65be (original-design rollback, 2026-07-12): page-title h1 -> form-info
// (h2, 2-line intro via BrokenLines, mailto line, feedback-types 3-item
// list) -> embedded Google Form iframe. The old page's own inline <style>
// block (.form-container/.form-embed/.form-info/.feedback-types, including
// its `max-width: 768px` responsive min-height rule for the iframe) has no
// equivalent in app/original.css and cannot be expressed via an inline style
// prop because of the media query, so it is reproduced here verbatim as a
// literal <style> element rather than edited into the shared stylesheet.
export function FeedbackPage({ lang }: { lang: Lang }) {
  const copy = feedbackContent[lang];
  const types = feedbackTypeItems[lang];
  const embed = feedbackFormEmbed[lang];
  const ja = lang === 'ja';

  return (
    <PageShell lang={lang} slug="feedback">
      <style>{`
        .form-container {
          max-width: 800px;
          margin: 0 auto;
          padding: var(--spacing-lg) 0;
        }

        .form-embed {
          width: 100%;
          min-height: 800px;
          border: 1px solid var(--border-primary);
          border-radius: var(--radius-lg);
          background: white;
          box-shadow: var(--shadow-md);
        }

        .form-info {
          text-align: center;
          margin-bottom: var(--spacing-xl);
        }

        .form-info h2 {
          margin-bottom: var(--spacing-md);
        }

        .form-info p {
          max-width: 500px;
          margin: 0 auto var(--spacing-sm);
        }

        .feedback-types {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
          max-width: 600px;
          margin: var(--spacing-xl) auto;
          padding: 0;
          list-style: none;
        }

        .feedback-types li {
          text-align: center;
          padding: var(--spacing-md);
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
        }

        .feedback-types li h3 {
          font-size: var(--font-size-base);
          margin-bottom: var(--spacing-xs);
        }

        .feedback-types li p {
          font-size: var(--font-size-sm);
          color: var(--text-muted);
          margin: 0;
        }

        @media (max-width: 768px) {
          .form-embed {
            min-height: 1000px;
          }
        }
      `}</style>

      <h1 className="page-title">{ja ? <Budoux text={copy.h1} /> : copy.h1}</h1>
      <div className="form-container">
        <div className="form-info">
          <h2>{ja ? <Budoux text={copy.formHeading} /> : copy.formHeading}</h2>
          <p>
            <BrokenLines lines={[copy.formBodyLine1, copy.formBodyLine2]} ja={ja} />
          </p>
          <p>
            {ja ? <Budoux text={copy.emailLabel} /> : copy.emailLabel}{' '}
            <a href={`mailto:${copy.emailAddress}`}>{copy.emailAddress}</a>
          </p>

          <ul className="feedback-types" role="list">
            {types.map((item) => (
              <li key={item.heading}>
                <h3>{ja ? <Budoux text={item.heading} /> : item.heading}</h3>
                <p>{ja ? <Budoux text={item.body} /> : item.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <iframe
          src={embed.src}
          className="form-embed"
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
          title={embed.title}
        >
          {embed.loadingFallback}
        </iframe>
      </div>
    </PageShell>
  );
}
