'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface BrandedLoaderProps {
  logo?: string; // Image URL
  brandName?: string; // Text fallback if no logo
  iconColor?: string; // Color for animated icons
  className?: string;
}

/**
 * Customer-branded loading screen
 * Displays logo or brand name with animated game/rewards themed SVG icons
 */
export function BrandedLoader({
  logo,
  brandName,
  iconColor = 'var(--lib-color-primary)',
  className = '',
}: BrandedLoaderProps) {
  // Simple animated SVG icons (placeholders - will be replaced with actual SVGs later)
  const GameIcon = () => (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0.5,
      }}
      style={{ color: iconColor }}
    >
      {/* Simple game controller shape */}
      <motion.rect
        x="8"
        y="12"
        width="24"
        height="16"
        rx="4"
        fill="currentColor"
        opacity="0.8"
      />
      <motion.circle
        cx="14"
        cy="20"
        r="3"
        fill="currentColor"
        opacity="0.9"
      />
      <motion.circle
        cx="26"
        cy="20"
        r="3"
        fill="currentColor"
        opacity="0.9"
      />
      <motion.rect
        x="16"
        y="24"
        width="8"
        height="2"
        rx="1"
        fill="currentColor"
        opacity="0.7"
      />
    </motion.svg>
  );

  const RewardsIcon = () => (
    <motion.svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 10 }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0.4,
      }}
      style={{ color: iconColor }}
    >
      {/* Simple trophy/reward shape */}
      <motion.path
        d="M20 8 L16 14 L12 14 L14 20 L20 28 L26 20 L28 14 L24 14 Z"
        fill="currentColor"
        opacity="0.8"
      />
      <motion.ellipse
        cx="20"
        cy="18"
        rx="6"
        ry="8"
        fill="currentColor"
        opacity="0.9"
      />
      <motion.circle
        cx="20"
        cy="30"
        r="2"
        fill="currentColor"
        opacity="0.7"
      />
    </motion.svg>
  );

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-[var(--lib-color-background)] ${className}`}
      style={{
        fontFamily: 'var(--lib-font-sans)',
      }}
    >
      {/* Logo or Brand Name */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        {logo ? (
          <img
            src={logo}
            alt={brandName || 'Brand logo'}
            className="max-w-[120px] max-h-[120px] object-contain"
          />
        ) : (
          brandName && (
            <h1
              className="text-2xl font-bold"
              style={{
                color: 'var(--lib-color-foreground)',
                fontFamily: 'var(--lib-font-sans)',
              }}
            >
              {brandName}
            </h1>
          )
        )}
      </motion.div>

      {/* Animated Icons */}
      <div className="flex items-center gap-6">
        <GameIcon />
        <RewardsIcon />
      </div>

      {/* Loading indicator */}
      <motion.div
        className="mt-8 flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: iconColor,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
