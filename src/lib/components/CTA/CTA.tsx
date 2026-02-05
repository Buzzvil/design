'use client';

import { motion } from 'framer-motion';
import { CTAProps, CTASize } from './CTA.types';

/**
 * CTA component
 * Uses component-specific tokens (can be customized independently)
 * Optimized for call-to-action use cases
 */
export function CTA({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  className = '',
}: CTAProps) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses: Record<typeof variant, string> = {
    primary: 'bg-[var(--lib-cta-primary)] text-[var(--lib-cta-primaryForeground)] hover:bg-[var(--lib-cta-primaryHover)] active:bg-[var(--lib-cta-primaryActive)] focus:ring-[var(--lib-cta-primary)] shadow-[var(--lib-cta-shadow)] hover:shadow-lg',
    secondary: 'bg-[var(--lib-color-secondary)] text-[var(--lib-color-secondaryForeground)] hover:bg-[var(--lib-color-secondaryHover)] active:bg-[var(--lib-color-secondaryActive)] focus:ring-[var(--lib-color-secondary)]',
    outline: 'border-2 border-[var(--lib-cta-primary)] bg-transparent text-[var(--lib-cta-primary)] hover:bg-[var(--lib-cta-primary)] hover:text-[var(--lib-cta-primaryForeground)] focus:ring-[var(--lib-cta-primary)]',
  };

  const sizeClasses: Record<CTASize, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  const widthClass = fullWidth ? 'w-full' : '';
  const radiusStyle = { borderRadius: 'var(--lib-cta-radius)' };

  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onClick}
      className={`${classes} ${widthClass} ${className}`}
      style={{
        ...radiusStyle,
        fontFamily: 'var(--lib-font-sans)',
      }}
    >
      <motion.span
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="block"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            {children}
          </span>
        ) : (
          children
        )}
      </motion.span>
    </button>
  );
}
