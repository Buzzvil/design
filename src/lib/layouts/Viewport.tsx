'use client';

import React from 'react';

interface ViewportProps {
  children: React.ReactNode;
  width?: number; // Viewport width in pixels (default: 375 for mobile)
  height?: number; // Viewport height in pixels (default: 667 for mobile)
  scale?: number; // Scale factor (default: 1)
  className?: string;
}

/**
 * Mobile viewport simulation utilities
 * For component showcase and testing
 */
export function Viewport({
  children,
  width = 375, // Standard mobile width
  height = 667, // Standard mobile height
  scale = 0.8, // Default scale to fit on screen
  className = '',
}: ViewportProps) {
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  
  return (
    <div
      className={`mx-auto rounded-lg overflow-hidden border shadow-lg ${className}`}
      style={{
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`,
        maxWidth: '100%',
        maxHeight: '90vh',
        backgroundColor: 'var(--lib-color-background)',
        borderColor: 'var(--lib-color-border)',
        fontFamily: 'var(--lib-font-sans)',
      }}
    >
      <div
        className="w-full h-full overflow-auto"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
