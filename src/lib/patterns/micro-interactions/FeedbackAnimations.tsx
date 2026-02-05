'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface FeedbackAnimationsProps {
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  message?: string;
  duration?: number;
  onComplete?: () => void;
  className?: string;
}

/**
 * Feedback animations
 * Success checkmark, error shake, etc.
 */
export function FeedbackAnimations({
  type,
  isVisible,
  message,
  duration = 2000,
  onComplete,
  className = '',
}: FeedbackAnimationsProps) {
  // Success checkmark animation
  const checkmarkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 0.5, ease: 'easeOut' as const },
        opacity: { duration: 0.3 },
      },
    },
  };

  // Error shake animation
  const shakeVariants = {
    hidden: { x: 0 },
    visible: {
      x: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.5,
        ease: 'easeInOut' as const,
      },
    },
  };

  // Color mapping
  const colorMap = {
    success: 'var(--lib-color-success)',
    error: 'var(--lib-color-error)',
    warning: 'var(--lib-color-warning)',
    info: 'var(--lib-color-info)',
  };

  const color = colorMap[type];

  React.useEffect(() => {
    if (isVisible && onComplete) {
      const timer = setTimeout(onComplete, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={type === 'error' ? 'hidden' : { opacity: 0, scale: 0.8 }}
          animate={type === 'error' ? 'visible' : { opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className={`flex items-center gap-2 px-4 py-2 rounded ${className}`}
          style={{
            backgroundColor: color + '20',
            color,
            borderColor: color,
            borderRadius: 'var(--lib-radius-md)',
          }}
          variants={type === 'error' ? shakeVariants : undefined}
        >
          {type === 'success' && (
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              variants={checkmarkVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.path
                d="M5 10 L9 14 L15 6"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={checkmarkVariants}
                initial="hidden"
                animate="visible"
              />
            </motion.svg>
          )}
          {message && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: type === 'success' ? 0.3 : 0 }}
            >
              {message}
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
