'use client';

import { motion } from 'framer-motion';
import { ButtonProps } from './Button.types';
import { getButtonClasses } from './Button.variants';

/**
 * Button component
 * Consumes theme tokens only, no hardcoded values
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const classes = getButtonClasses(variant, size);
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${classes} ${widthClass} ${className}`}
      style={{
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
