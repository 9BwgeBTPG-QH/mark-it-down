import { Budoux } from '@/components/Budoux';
import type { WelcomeStrongSegment, WelcomeKbdPairSegment } from '@/content/welcome';

export type WelcomeInlineContent = string | WelcomeStrongSegment | WelcomeKbdPairSegment;

function renderText(text: string, ja: boolean) {
  return ja ? <Budoux text={text} /> : text;
}

function isKbdPair(content: WelcomeInlineContent): content is WelcomeKbdPairSegment {
  return typeof content === 'object' && 'kbd1' in content;
}

function isStrong(content: WelcomeInlineContent): content is WelcomeStrongSegment {
  return typeof content === 'object' && 'strong' in content;
}

// Renders the three inline-content shapes docs/welcome.html / docs/welcome-ja.html
// use throughout the page: plain text, a single <strong> span (content/welcome.ts's
// WelcomeStrongSegment), or a <kbd>+<kbd> pair (WelcomeKbdPairSegment). Shared by
// FirstAction / Cta / WayCards so the segment-rendering logic isn't duplicated
// across all three (#1593 Wave R2 original-design rollback).
export function WelcomeInline({ content, ja }: { content: WelcomeInlineContent; ja: boolean }) {
  if (typeof content === 'string') {
    return <>{renderText(content, ja)}</>;
  }
  if (isKbdPair(content)) {
    return (
      <>
        {content.before ? renderText(content.before, ja) : null}
        <kbd>{content.kbd1}</kbd>
        {content.mid}
        <kbd>{content.kbd2}</kbd>
        {content.after ? renderText(content.after, ja) : null}
      </>
    );
  }
  if (isStrong(content)) {
    return (
      <>
        {content.before ? renderText(content.before, ja) : null}
        <strong>{renderText(content.strong, ja)}</strong>
        {content.after ? renderText(content.after, ja) : null}
      </>
    );
  }
  return null;
}
