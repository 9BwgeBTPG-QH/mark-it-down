import { Budoux } from '@/components/Budoux';
import { WarningTriangleIcon } from '@/components/welcome/icons';
import { ScreenshotWithFallback } from '@/components/welcome/ScreenshotWithFallback';
import { welcomeFirstAction, type Lang } from '@/content/welcome';

// "First things first" block (old docs/welcome.html's post-install
// confirmation-dialog callout, #1593 Phase 3-5 final group). The screenshot
// keeps its old onerror-fallback behavior via ScreenshotWithFallback (a
// minimal client-component boundary); the fallback text itself is the old
// page's own plain-text description of the dialog, shown only if the image
// fails to load.
export function FirstAction({ lang }: { lang: Lang }) {
  const copy = welcomeFirstAction[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';

  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <p className={`flex items-center gap-2 text-caption text-ink-muted ${captionFont}`}>
          <WarningTriangleIcon className="text-ink-muted" />
          {copy.label}
        </p>
        <h3 className={`mt-2 text-h3 text-ink ${headingFont}`}>{ja ? <Budoux text={copy.heading} /> : copy.heading}</h3>
        <p className={`mt-2 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={copy.body} /> : copy.body}</p>
        <div className="mt-4 max-w-content">
          <ScreenshotWithFallback
            src={copy.screenshotSrc}
            alt={copy.screenshotAlt}
            fallbackText={copy.fallbackText}
            width={462}
            height={180}
          />
        </div>
        <p className={`mt-4 text-caption text-ink-muted ${bodyFont}`}>{ja ? <Budoux text={copy.subtleNote} /> : copy.subtleNote}</p>
      </div>
    </section>
  );
}
