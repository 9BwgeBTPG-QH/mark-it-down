import type { AnchorHTMLAttributes, ReactNode } from 'react';
import type { Lang } from '@/content/index';

interface SealButtonProps extends Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel'> {
  variant?: 'primary' | 'secondary';
  lang?: Lang;
  children: ReactNode;
  className?: string;
  // GA cta_click label, read by GoogleAnalytics' delegated click listener.
  'data-ga-cta'?: string;
}

// DESIGN.md §5 "Seal Press": CTA `:active` presses the seal down —
// `translateY(1px)` + border shifting to `seal-deep`, 120ms — the tactile
// confirmation that a commitment was made. Variants are DESIGN.md §6's two
// static CTA styles (primary: seal fill + white text / secondary: paper fill
// + seal text + 1px seal border). The transform is gated under
// `motion-safe:` rather than added-then-cancelled, so reduced-motion users
// never receive it (DESIGN.md §7).
export function SealButton({
  href,
  variant = 'primary',
  lang,
  children,
  className = '',
  ...anchorProps
}: SealButtonProps) {
  const fontClass = lang === 'ja' ? 'font-sans-ja' : 'font-sans';
  const variantClasses =
    variant === 'primary'
      ? 'border-seal bg-seal text-paper hover:bg-seal-deep hover:border-seal-deep'
      : 'border-seal bg-paper text-seal hover:bg-paper-shade';

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-sm border px-6 py-3 text-body ${fontClass} transition-[transform,background-color,border-color] duration-instant ease-out motion-safe:active:translate-y-px active:border-seal-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal ${variantClasses} ${className}`}
      {...anchorProps}
    >
      {children}
    </a>
  );
}
