'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  offset?: number;
}

export function ParallaxSection({ 
  children, 
  className = '', 
  speed = 0.5,
  offset = 0 
}: ParallaxSectionProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, offset - (speed * 100)]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}

// Enhanced parallax with different speeds for different elements
export function ParallaxContainer({ 
  children, 
  className = '',
  backgroundSpeed = 0.3,
  contentSpeed = 0.1
}: {
  children: React.ReactNode;
  className?: string;
  backgroundSpeed?: number;
  contentSpeed?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -backgroundSpeed * 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -contentSpeed * 100]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Background elements can go here */}
      </motion.div>
      <motion.div
        className="relative z-10"
        style={{ y: contentY }}
      >
        {children}
      </motion.div>
    </div>
  );
}
