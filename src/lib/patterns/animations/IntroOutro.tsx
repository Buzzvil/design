'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface IntroOutroProps {
  children: React.ReactNode;
  isVisible: boolean;
  size: 'large' | 'small'; // Large for bottom sheets/modals, small for toasts
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'; // For small elements
  onExitComplete?: () => void;
  className?: string;
}

/**
 * Intro/Outro animation patterns
 * Large elements: bottom sheets, modals (slide up/down from bottom, scale + fade, backdrop blur)
 * Small elements: toast notifications (slide in from edge, fade + scale, configurable position)
 */
export function IntroOutro({
  children,
  isVisible,
  size,
  position = 'bottom',
  onExitComplete,
  className = '',
}: IntroOutroProps) {
  // Large element animations (bottom sheets, modals)
  const largeVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        mass: 0.8,
      },
    },
    exit: {
      y: '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  // Small element animations (toast notifications)
  const getSmallVariants = () => {
    const baseVariants = {
      hidden: {
        opacity: 0,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          type: 'spring',
          damping: 20,
          stiffness: 300,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        transition: {
          duration: 0.15,
          ease: 'easeIn',
        },
      },
    };

    // Add position-based transforms
    const positionTransforms: Record<string, { x?: string; y?: string }> = {
      top: { y: '-100%' },
      bottom: { y: '100%' },
      left: { x: '-100%' },
      right: { x: '100%' },
      center: {},
    };

    const transform = positionTransforms[position] || {};

    return {
      hidden: {
        ...baseVariants.hidden,
        ...transform,
      },
      visible: {
        ...baseVariants.visible,
        x: 0,
        y: 0,
      },
      exit: {
        ...baseVariants.exit,
        ...transform,
      },
    };
  };

  const variants = size === 'large' ? largeVariants : getSmallVariants();

  // Position classes for small elements
  const positionClasses: Record<string, string> = {
    top: 'top-4 left-1/2 -translate-x-1/2',
    bottom: 'bottom-4 left-1/2 -translate-x-1/2',
    left: 'left-4 top-1/2 -translate-y-1/2',
    right: 'right-4 top-1/2 -translate-y-1/2',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const positionClass = size === 'small' ? positionClasses[position] : '';

  // Backdrop blur for large elements
  const backdropBlur = size === 'large' ? (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/20 z-40"
        />
      )}
    </AnimatePresence>
  ) : null;

  return (
    <>
      {backdropBlur}
      <AnimatePresence onExitComplete={onExitComplete}>
        {isVisible && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`${size === 'large' ? 'fixed bottom-0 left-0 right-0 z-50' : `fixed z-50 ${positionClass}`} ${className}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
