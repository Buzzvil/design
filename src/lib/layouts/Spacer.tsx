'use client';

import React from 'react';

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  vertical?: boolean;
  horizontal?: boolean;
  className?: string;
}

/**
 * Spacer component
 * Consistent spacing utilities (mobile-optimized)
 */
export function Spacer({
  size = 'md',
  vertical = true,
  horizontal = false,
  className = '',
}: SpacerProps) {
  const sizeClasses = {
    xs: 'h-1 w-1',
    sm: 'h-2 w-2',
    md: 'h-4 w-4',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
    '2xl': 'h-12 w-12',
    '3xl': 'h-16 w-16',
  };

  const baseSpacing = sizeClasses[size];
  const finalClasses = [
    vertical ? baseSpacing.split(' ')[0] : '',
    horizontal ? baseSpacing.split(' ')[1] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={finalClasses} />;
}
