'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { BlurReveal } from './BlurReveal';

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

export function SectionTitle({ children, className = '', duration }: SectionTitleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className={`${className} py-2`}>
      {isInView && (
        <BlurReveal duration={duration}>
          {children}
        </BlurReveal>
      )}
      {!isInView && (
        <div style={{ opacity: 0 }}>
          {children}
        </div>
      )}
    </div>
  );
}
