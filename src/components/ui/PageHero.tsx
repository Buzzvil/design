'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BlurReveal } from './BlurReveal';
import { LucideIcon } from 'lucide-react';

interface PageHeroProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '7xl';
}

export function PageHero({ 
  icon: Icon, 
  title, 
  description, 
  className = '',
  maxWidth = '4xl'
}: PageHeroProps) {
  const maxWidthClass = {
    'sm': 'max-w-sm',
    'md': 'max-w-md', 
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
    '7xl': 'max-w-7xl'
  }[maxWidth];

  return (
    <section className={`min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className={`${maxWidthClass} mx-auto text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <BlurReveal duration={600}>
            <Icon className="w-16 h-16 text-white mx-auto mb-6" />
          </BlurReveal>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
        >
          <BlurReveal duration={600}>
            {title}
          </BlurReveal>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          <BlurReveal duration={600}>
            {description}
          </BlurReveal>
        </motion.p>
      </div>
    </section>
  );
}
