'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface HoverEffectsProps {
  children: React.ReactNode;
  effect?: 'lift' | 'glow' | 'scale';
  intensity?: number;
  className?: string;
}

/**
 * Hover state animations
 * Lift, glow, or scale effects
 */
export function HoverEffects({
  children,
  effect = 'lift',
  intensity = 1,
  className = '',
}: HoverEffectsProps) {
  const effects = {
    lift: {
      y: -2 * intensity,
      boxShadow: `0 ${4 * intensity}px ${12 * intensity}px rgba(0, 0, 0, 0.15)`,
    },
    glow: {
      boxShadow: `0 0 ${20 * intensity}px rgba(var(--lib-color-primary-rgb, 59, 130, 246), 0.5)`,
    },
    scale: {
      scale: 1 + 0.05 * intensity,
    },
  };

  const hoverEffect = effects[effect] || effects.lift;

  return (
    <motion.div
      whileHover={hoverEffect}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
