import { WelcomeInline } from '@/components/welcome/InlineText';
import { welcomeCta, type Lang } from '@/content/welcome';

// docs/welcome.html's "try it now" block: an instruction line followed by a
// checkmark-prefixed success line (`<span class="success-marker">&#10003;</span>`),
// restored verbatim as a `.welcome-cta` <div> (original-design rollback,
// #1593 Wave R2 — the old markup is a div, not a section, and sits directly
// inside `.welcome-body`).
export function Cta({ lang }: { lang: Lang }) {
  const copy = welcomeCta[lang];
  const ja = lang === 'ja';

  return (
    <div className="welcome-cta stagger stagger-3">
      <p className="cta-instruction">
        <WelcomeInline content={copy.instruction} ja={ja} />
      </p>
      <p className="cta-success">
        <span className="success-marker">&#10003;</span> <WelcomeInline content={copy.successText} ja={ja} />
      </p>
    </div>
  );
}
