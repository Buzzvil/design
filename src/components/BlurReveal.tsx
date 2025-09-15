'use client';

import React from 'react';

const DEFAULT_BLUR = 10;
const DEFAULT_DURATION = 2000; // Match original reference

export function BlurReveal({
  children,
  duration = DEFAULT_DURATION,
  blur = DEFAULT_BLUR,
}: {
  children: React.ReactNode;
  blur?: number;
  duration?: number;
}) {
  return (
    <div
      className="relative"
      style={
        {
          "--blur": blur + "px",
        } as React.CSSProperties
      }
    >
      <div 
        className="blur-reveal-banner"
        style={{
          animation: `blurRevealDraw ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
          animationFillMode: 'both',
        }}
      >
        {children}
      </div>
      <Effects />
    </div>
  );
}

function Effects() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      <div 
        className="blur-reveal-blur absolute inset-0"
        style={{
          animation: `blurRevealBlur ${1200}ms ease-out forwards`,
        }}
      />
    </div>
  );
}

// CSS animations will be added to globals.css
