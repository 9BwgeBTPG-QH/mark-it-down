'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ScreenshotWithFallbackProps {
  src: string;
  alt: string;
  fallbackText: string;
  width: number;
  height: number;
}

// Old docs/welcome.html used a plain <img onerror="...swap to a sibling
// fallback div"> for the Chrome-dialog screenshot (#1593 Phase 3-5, final
// group). Restored here as a minimal client-component boundary — the rest of
// WelcomePage stays a server component — per the task's "if the old page had
// real client-side JS functionality, restore it with a minimal
// client-component boundary" requirement.
export function ScreenshotWithFallback({ src, alt, fallbackText, width, height }: ScreenshotWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className="rounded border border-hairline bg-paper-shade p-4 text-ink-2">{fallbackText}</div>;
  }

  return (
    <div className="overflow-hidden rounded border border-hairline bg-paper">
      <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" onError={() => setFailed(true)} />
    </div>
  );
}
