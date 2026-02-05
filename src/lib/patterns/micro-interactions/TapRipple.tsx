'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface TapRippleProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

/**
 * Tap ripple effect
 * Material Design-style ripple on tap/click
 */
export function TapRipple({
  children,
  color = 'rgba(0, 0, 0, 0.1)',
  className = '',
}: TapRippleProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onClick={handleTap}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: color,
            width: 0,
            height: 0,
          }}
          animate={{
            width: 200,
            height: 200,
            x: -100,
            y: -100,
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
