'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface ButtonPressProps {
  children: React.ReactNode;
  onPress?: () => void;
  scale?: number; // Scale down amount on press (default: 0.95)
  duration?: number;
  className?: string;
}

/**
 * Button press animation
 * Scale down on press
 */
export function ButtonPress({
  children,
  onPress,
  scale = 0.95,
  duration = 0.1,
  className = '',
}: ButtonPressProps) {
  return (
    <motion.div
      whileTap={{ scale }}
      onClick={onPress}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
