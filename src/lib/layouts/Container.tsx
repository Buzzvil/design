'use client';

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

/**
 * Mobile-first container component
 * Responsive padding optimized for mobile
 */
export function Container({
  children,
  maxWidth = 'xl',
  padding = 'md',
  className = '',
}: ContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  };

  const paddingClasses = {
    none: '',
    sm: 'px-3 py-4', // Mobile-optimized padding
    md: 'px-4 py-6',
    lg: 'px-6 py-8',
    xl: 'px-8 py-10',
  };

  return (
    <div
      className={`mx-auto w-full ${maxWidthClasses[maxWidth]} ${paddingClasses[padding]} ${className}`}
      style={{
        fontFamily: 'var(--lib-font-sans)',
      }}
    >
      {children}
    </div>
  );
}
