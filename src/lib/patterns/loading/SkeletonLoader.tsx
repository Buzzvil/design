'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'list';
  lines?: number;
  className?: string;
}

/**
 * Skeleton loading states
 * Text, card, and list variants with shimmer animation
 */
export function SkeletonLoader({
  variant = 'text',
  lines = 3,
  className = '',
}: SkeletonLoaderProps) {
  const shimmer = {
    background: 'linear-gradient(90deg, var(--lib-color-muted) 25%, var(--lib-color-border) 50%, var(--lib-color-muted) 75%)',
    backgroundSize: '200% 100%',
  };

  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <motion.div
            key={i}
            className="h-4 rounded"
            style={{
              backgroundColor: 'var(--lib-color-muted)',
              width: i === lines - 1 ? '75%' : '100%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '200% 0%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <motion.div
        className={`rounded-lg border p-4 ${className}`}
        style={{
          backgroundColor: 'var(--lib-color-card)',
          borderColor: 'var(--lib-color-border)',
          borderRadius: 'var(--lib-radius-lg)',
        }}
      >
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-full"
              style={{
                backgroundColor: 'var(--lib-color-muted)',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '200% 0%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <div className="flex-1 space-y-2">
              <motion.div
                className="h-4 rounded w-3/4"
                style={{
                  backgroundColor: 'var(--lib-color-muted)',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <motion.div
                className="h-3 rounded w-1/2"
                style={{
                  backgroundColor: 'var(--lib-color-muted)',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: 0.2,
                }}
              />
            </div>
          </div>
          {/* Content */}
          <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
              <motion.div
                key={i}
                className="h-3 rounded"
                style={{
                  backgroundColor: 'var(--lib-color-muted)',
                  width: i === lines - 1 ? '60%' : '100%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3 p-3 rounded"
            style={{
              backgroundColor: 'var(--lib-color-card)',
              borderColor: 'var(--lib-color-border)',
              borderRadius: 'var(--lib-radius-md)',
            }}
          >
            <motion.div
              className="w-10 h-10 rounded"
              style={{
                backgroundColor: 'var(--lib-color-muted)',
              }}
              animate={{
                backgroundPosition: ['0% 0%', '200% 0%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.1,
              }}
            />
            <div className="flex-1 space-y-2">
              <motion.div
                className="h-4 rounded w-2/3"
                style={{
                  backgroundColor: 'var(--lib-color-muted)',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.1 + 0.1,
                }}
              />
              <motion.div
                className="h-3 rounded w-1/2"
                style={{
                  backgroundColor: 'var(--lib-color-muted)',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.1 + 0.2,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
}
