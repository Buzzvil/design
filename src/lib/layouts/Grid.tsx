'use client';

import React from 'react';

interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Mobile-first responsive grid system
 * Breakpoints: mobile-first (sm, md, lg)
 */
export function Grid({
  children,
  cols = 1,
  gap = 'md',
  className = '',
}: GridProps) {
  // Mobile-first grid: always 1 column on mobile, then scales up
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  return (
    <div
      className={`grid ${gridCols[cols]} ${gapClasses[gap]} ${className}`}
      style={{
        fontFamily: 'var(--lib-font-sans)',
      }}
    >
      {children}
    </div>
  );
}
