'use client';

import React from 'react';
import { BlurReveal } from './BlurReveal';
import { SectionTitle } from './SectionTitle';

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  descriptionSize?: 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
}

export function SectionHeader({ 
  title, 
  description, 
  className = '',
  titleSize = '4xl',
  descriptionSize = 'xl',
  centered = true
}: SectionHeaderProps) {
  const titleSizeClass = {
    'sm': 'text-sm',
    'md': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl md:text-5xl',
    '5xl': 'text-5xl md:text-6xl'
  }[titleSize];

  const descriptionSizeClass = {
    'sm': 'text-sm',
    'md': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl'
  }[descriptionSize];

  const containerClass = centered ? 'text-center' : '';

  return (
    <div className={`${containerClass} mb-16 ${className}`}>
      <BlurReveal duration={600}>
        <SectionTitle>
          <h2 className={`${titleSizeClass} font-bold text-white mb-6`}>
            {title}
          </h2>
          {description && (
            <p className={`${descriptionSizeClass} text-muted-foreground max-w-3xl mx-auto leading-relaxed`}>
              {description}
            </p>
          )}
        </SectionTitle>
      </BlurReveal>
    </div>
  );
}
