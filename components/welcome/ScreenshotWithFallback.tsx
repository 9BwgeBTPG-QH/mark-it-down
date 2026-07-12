'use client';

import { useState } from 'react';
import { WelcomeInline, type WelcomeInlineContent } from '@/components/welcome/InlineText';

interface ScreenshotWithFallbackProps {
  src: string;
  alt: string;
  fallbackText: WelcomeInlineContent;
  ja: boolean;
}

// docs/welcome.html's Chrome-dialog screenshot used a plain <img
// onerror="..."> that swapped to a sibling `.screenshot-fallback` div when
// the screenshot asset failed to load (original-design rollback, #1593 Wave
// R2). Restored as a minimal client-component boundary owning the whole
// `.screenshot` wrapper — app/original.css's `.first-action .screenshot img`
// selector requires the <img> to be a direct child of `.screenshot`, so both
// elements live in one component rather than being split across siblings.
// Plain <img> (not next/image) matches the static-export precedent already
// used in components/SiteNav.tsx / components/SiteFooter.tsx.
export function ScreenshotWithFallback({ src, alt, fallbackText, ja }: ScreenshotWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="screenshot">
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      )}
      {failed && (
        <div className="screenshot-fallback">
          <WelcomeInline content={fallbackText} ja={ja} />
        </div>
      )}
    </div>
  );
}
