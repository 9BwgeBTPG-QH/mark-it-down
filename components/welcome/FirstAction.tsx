import { Budoux } from '@/components/Budoux';
import { WarningTriangleIcon } from '@/components/welcome/icons';
import { WelcomeInline } from '@/components/welcome/InlineText';
import { ScreenshotWithFallback } from '@/components/welcome/ScreenshotWithFallback';
import { welcomeFirstAction, type Lang } from '@/content/welcome';

// "First things first" block: docs/welcome.html's post-install
// confirmation-dialog callout, restored verbatim as a `.first-action` <div>
// (original-design rollback, #1593 Wave R2 — the old markup is a div, not a
// section, and sits directly inside `.welcome-body`). The screenshot keeps
// its old onerror-fallback behavior via ScreenshotWithFallback.
export function FirstAction({ lang }: { lang: Lang }) {
  const copy = welcomeFirstAction[lang];
  const ja = lang === 'ja';

  return (
    <div className="first-action stagger stagger-2">
      <p className="first-action-label">
        <WarningTriangleIcon />
        {copy.label}
      </p>
      <h3>{ja ? <Budoux text={copy.heading} /> : copy.heading}</h3>
      <p>
        <WelcomeInline content={copy.body} ja={ja} />
      </p>
      <ScreenshotWithFallback
        src={copy.screenshotSrc}
        alt={copy.screenshotAlt}
        fallbackText={copy.fallbackText}
        ja={ja}
      />
      <p className="subtle-note">
        <WelcomeInline content={copy.subtleNote} ja={ja} />
      </p>
    </div>
  );
}
