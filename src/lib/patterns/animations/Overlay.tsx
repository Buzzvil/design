'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface OverlayProps {
  children?: React.ReactNode;
  isVisible: boolean;
  onClose?: () => void;
  blur?: boolean; // Enable backdrop blur
  className?: string;
}

/**
 * Overlay animation pattern
 * Fade in/out with optional backdrop blur
 */
export function Overlay({
  children,
  isVisible,
  onClose,
  blur = true,
  className = '',
}: OverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: blur ? 'blur(0px)' : 'none' }}
          animate={{
            opacity: 1,
            backdropFilter: blur ? 'blur(8px)' : 'none',
          }}
          exit={{
            opacity: 0,
            backdropFilter: blur ? 'blur(0px)' : 'none',
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          className={`fixed inset-0 bg-black/40 z-40 ${className}`}
          onClick={onClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
