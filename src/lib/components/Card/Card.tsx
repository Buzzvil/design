'use client';

import { HoverEffects } from '@/lib/patterns/micro-interactions/HoverEffects';
import { CardProps } from './Card.types';

/**
 * Card component
 * Consumes theme tokens only, mobile-optimized
 */
export function Card({
  children,
  title,
  description,
  footer,
  padding = 'md',
  hover = false,
  className = '',
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const cardContent = (
    <div
      className={`rounded-lg border ${paddingClasses[padding]} ${className}`}
      style={{
        backgroundColor: 'var(--lib-card-background)',
        color: 'var(--lib-card-foreground)',
        borderColor: 'var(--lib-card-border)',
        borderRadius: 'var(--lib-card-radius)',
        boxShadow: 'var(--lib-card-shadow)',
        fontFamily: 'var(--lib-font-sans)',
      }}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3
              className="text-lg font-semibold mb-1"
              style={{ color: 'var(--lib-card-foreground)' }}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              className="text-sm"
              style={{ color: 'var(--lib-color-mutedForeground)' }}
            >
              {description}
            </p>
          )}
        </div>
      )}
      <div>{children}</div>
      {footer && <div className="mt-4 pt-4 border-t border-[var(--lib-card-border)]">{footer}</div>}
    </div>
  );

  if (hover) {
    return <HoverEffects effect="lift">{cardContent}</HoverEffects>;
  }

  return cardContent;
}
