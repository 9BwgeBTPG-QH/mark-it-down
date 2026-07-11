import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'shade' | 'outline';
  className?: string;
}

// DESIGN.md §6 "カード: paper-shade 面 + hairline。影なし" / §4 "Border: 1px
// solid hairline が基本の面区切り" / "Radius: ... 4px（カード）". `outline`
// swaps the fill to plain paper for cards placed on an already paper-shade
// section (avoids two adjacent same-color surfaces), keeping the same
// hairline border and radius.
export function Card({ children, variant = 'shade', className = '' }: CardProps) {
  const surfaceClass = variant === 'shade' ? 'bg-paper-shade' : 'bg-paper';
  return <div className={`rounded border border-hairline p-6 ${surfaceClass} ${className}`}>{children}</div>;
}
