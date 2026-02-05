'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  direction: 'forward' | 'back'; // Forward navigation (slide left, fade) or back (slide right, fade)
  duration?: number;
  easing?: number[]; // Cubic bezier easing
}

/**
 * Page transition patterns
 * Forward navigation: slide left + fade
 * Back navigation: slide right + fade
 */
export function PageTransition({
  children,
  direction = 'forward',
  duration = 0.3,
  easing = [0.4, 0, 0.2, 1], // easeInOut cubic bezier
}: PageTransitionProps) {
  const variants = {
    forward: {
      hidden: {
        x: '100%',
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration,
          ease: easing,
        },
      },
      exit: {
        x: '-100%',
        opacity: 0,
        transition: {
          duration,
          ease: easing,
        },
      },
    },
    back: {
      hidden: {
        x: '-100%',
        opacity: 0,
      },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          duration,
          ease: easing,
        },
      },
      exit: {
        x: '100%',
        opacity: 0,
        transition: {
          duration,
          ease: easing,
        },
      },
    },
  };

  const currentVariants = variants[direction];

  return (
    <motion.div
      variants={currentVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

/**
 * PageTransition wrapper with AnimatePresence for route transitions
 */
export function PageTransitionWrapper({
  children,
  key,
  direction = 'forward',
  duration = 0.3,
  easing = [0.4, 0, 0.2, 1],
}: PageTransitionProps & { key?: string | number }) {
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={key} direction={direction} duration={duration} easing={easing}>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
}
