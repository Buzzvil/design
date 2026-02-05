'use client';

import { FocusStates } from '@/lib/patterns/micro-interactions/FocusStates';
import { InputProps } from './Input.types';
import React from 'react';

/**
 * Input component
 * Consumes theme tokens only, mobile-optimized
 */
export function Input({
  value,
  placeholder,
  type = 'text',
  size = 'md',
  variant = 'default',
  disabled = false,
  error = false,
  label,
  helperText,
  leftIcon,
  rightIcon,
  onChange,
  onBlur,
  onFocus,
  className = '',
}: InputProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  };

  const variantClasses = {
    default: 'bg-[var(--lib-input-background)] border-[var(--lib-input-border)]',
    outline: 'bg-transparent border-2 border-[var(--lib-input-border)]',
  };

  const errorClasses = error
    ? 'border-[var(--lib-color-error)] focus:border-[var(--lib-color-error)] focus:ring-[var(--lib-color-error)]'
    : 'focus:border-[var(--lib-input-focusBorder)] focus:ring-[var(--lib-input-focusBorder)]';

  const baseClasses = `w-full rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${errorClasses}`;

  return (
    <div className={`space-y-1 ${className}`} style={{ fontFamily: 'var(--lib-font-sans)' }}>
      {label && (
        <label
          className="block text-sm font-medium"
          style={{
            color: 'var(--lib-color-foreground)',
          }}
        >
          {label}
        </label>
      )}
      <FocusStates>
        <div className="relative flex items-center">
          {leftIcon && (
            <div
              className="absolute left-3 text-muted-foreground"
              style={{ color: 'var(--lib-color-mutedForeground)' }}
            >
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.value)}
            onBlur={onBlur}
            onFocus={onFocus}
            className={`${baseClasses} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`}
            style={{
              color: 'var(--lib-input-foreground)',
              borderRadius: 'var(--lib-input-radius)',
              fontFamily: 'var(--lib-font-sans)',
            }}
          />
          {rightIcon && (
            <div
              className="absolute right-3 text-muted-foreground"
              style={{ color: 'var(--lib-color-mutedForeground)' }}
            >
              {rightIcon}
            </div>
          )}
        </div>
      </FocusStates>
      {helperText && (
        <p
          className={`text-xs ${error ? 'text-[var(--lib-color-error)]' : 'text-[var(--lib-color-mutedForeground)]'}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
