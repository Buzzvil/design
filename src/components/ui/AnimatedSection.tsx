'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BlurReveal } from './BlurReveal';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  useBlur?: boolean;
}

export function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0, 
  duration = 0.6,
  useBlur = true 
}: AnimatedSectionProps) {
  if (useBlur) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: duration, 
          delay: delay, 
          ease: "easeOut" 
        }}
        viewport={{ once: true, margin: "-100px" }}
        className={className}
      >
        <BlurReveal duration={600}>
          {children}
        </BlurReveal>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: "easeOut" 
      }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
