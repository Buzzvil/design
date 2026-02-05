'use client';

import React from 'react';

interface FocusStatesProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Focus state utilities
 * Ring and outline styles
 */
export function FocusStates({ children, className = '' }: FocusStatesProps) {
  return (
    <div
      className={`focus:outline-none focus:ring-2 focus:ring-[var(--lib-color-ring)] focus:ring-offset-2 ${className}`}
      style={{
        outline: 'none',
      }}
    >
      {children}
    </div>
  );
}
