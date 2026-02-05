'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface StaggerProps {
  children: React.ReactNode[];
  delay?: number; // Delay between each child
  direction?: 'up' | 'down' | 'left' | 'right'; // Direction of appearance
  duration?: number; // Duration of each animation
  className?: string;
}

/**
 * Stagger animation pattern
 * Used for rewards or gamified feedback
 * Sequential element appearance with configurable delay and direction
 * Scale + fade variants
 */
export function Stagger({
  children,
  delay = 0.1,
  direction = 'up',
  duration = 0.3,
  className = '',
}: StaggerProps) {
  // Base variants for scale + fade
  const baseVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  // Add direction-based transforms
  const directionTransforms: Record<string, { x?: number; y?: number }> = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 },
  };

  const transform = directionTransforms[direction] || {};

  const variants = {
    hidden: {
      ...baseVariants.hidden,
      ...transform,
    },
    visible: (i: number) => ({
      ...baseVariants.visible,
      x: 0,
      y: 0,
      transition: {
        ...baseVariants.visible.transition,
        delay: i * delay,
      },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={variants}
          custom={index}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
