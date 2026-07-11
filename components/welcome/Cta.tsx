import { welcomeCta, type Lang } from '@/content/welcome';

// Old docs/welcome.html's "try it now" block: an instruction line followed by
// a checkmark-prefixed success line (`<span class="success-marker">&#10003;</span>`,
// #1593 Phase 3-5 final group). The checkmark is a meaningful inline mark
// (confirms success), not decorative, so it stays a rendered prefix rather
// than being folded into successText's plain string — same treatment as
// content/welcome.ts's welcomeDataItems `mark` field. A `sr-only` label gives
// screen readers the same "success" cue the glyph gives sighted users.
export function Cta({ lang }: { lang: Lang }) {
  const copy = welcomeCta[lang];
  const ja = lang === 'ja';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <section className="border-t border-hairline bg-paper-shade">
      <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <p className={`text-h3 text-ink ${bodyFont}`}>{copy.instruction}</p>
        <p className={`mt-2 flex items-start gap-2 text-ink-2 ${bodyFont}`}>
          <span aria-hidden="true" className="text-ink-2">
            &#10003;
          </span>
          <span>
            <span className="sr-only">{ja ? '成功: ' : 'Success: '}</span>
            {copy.successText}
          </span>
        </p>
      </div>
    </section>
  );
}
