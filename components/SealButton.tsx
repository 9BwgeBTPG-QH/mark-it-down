import type { AnchorHTMLAttributes, ReactNode } from 'react';
import type { Lang } from '@/content/index';

interface SealButtonProps extends Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target' | 'rel' | 'aria-label'> {
  variant?: 'primary' | 'secondary';
  // Unused since the original-design rollback (styling is class-based via
  // app/original.css); accepted so existing call sites keep compiling.
  lang?: Lang;
  children: ReactNode;
  className?: string;
  // GA cta_click label, read by GoogleAnalytics' delegated click listener.
  'data-ga-cta'?: string;
}

// Original-design CTA button (eed65be .btn / .btn-primary / .btn-secondary,
// restored 2026-07-12): rendering delegates entirely to app/original.css's
// class rules — this component only maps the variant to the old class names.
// The component name is kept (SealButton) to avoid touching ~20 call sites;
// it no longer carries the Manuscript & Ink "seal" semantics.
export function SealButton({
  href,
  variant = 'primary',
  lang: _lang,
  children,
  className = '',
  ...anchorProps
}: SealButtonProps) {
  const variantClass = variant === 'primary' ? 'btn btn-primary' : 'btn btn-secondary';

  return (
    <a href={href} className={`${variantClass} ${className}`.trim()} {...anchorProps}>
      {children}
    </a>
  );
}
