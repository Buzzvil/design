'use client';

import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

/**
 * Section component
 * Mobile-optimized section spacing with consistent vertical rhythm
 */
export function Section({
  children,
  spacing = 'md',
  className = '',
}: SectionProps) {
  const spacingClasses = {
    none: '',
    sm: 'py-6 md:py-8', // Mobile-first spacing
    md: 'py-8 md:py-12',
    lg: 'py-12 md:py-16',
    xl: 'py-16 md:py-20',
    '2xl': 'py-20 md:py-24',
  };

  return (
    <section
      className={`${spacingClasses[spacing]} ${className}`}
      style={{
        fontFamily: 'var(--lib-font-sans)',
      }}
    >
      {children}
    </section>
  );
}
