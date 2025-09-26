'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function KeywordAnimation() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(120);
  const textRef = useRef<HTMLDivElement>(null);

  const keywords = [
    t('hero.keyword.rewarded'),
    t('hero.keyword.playful'),
    t('hero.keyword.scalable')
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % keywords.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [keywords]);

  // Update width when keyword changes
  useEffect(() => {
    const updateWidth = () => {
      // Create a temporary element to measure the exact visual width
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.visibility = 'hidden';
      tempDiv.style.whiteSpace = 'nowrap';
      tempDiv.style.fontSize = '1.25rem'; // text-xl
      tempDiv.style.fontFamily = 'inherit';
      tempDiv.style.fontWeight = '500'; // font-medium
      tempDiv.style.letterSpacing = 'normal';
      tempDiv.style.pointerEvents = 'none';
      tempDiv.textContent = keywords[currentIndex];
      document.body.appendChild(tempDiv);
      
      const textWidth = tempDiv.offsetWidth;
      document.body.removeChild(tempDiv);
      
      // Add padding for consistent margins
      const newWidth = Math.max(textWidth + 24, 80); // 24px total padding (12px each side), lower minimum
      setContainerWidth(newWidth);
    };

    // Small delay to ensure measurement happens after text is rendered
    const timeoutId = setTimeout(updateWidth, 100);
    
    return () => clearTimeout(timeoutId);
  }, [currentIndex, keywords]);

  return (
    <motion.div 
      className="relative h-10 sm:h-12 flex items-center justify-center overflow-hidden"
      animate={{ width: containerWidth }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          ref={textRef}
          initial={{ 
            opacity: 0, 
            y: 8, 
            rotateX: 60,
            transformOrigin: 'bottom',
            scale: 0.95
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            transformOrigin: 'bottom',
            scale: 1
          }}
          exit={{ 
            opacity: 0, 
            y: -8, 
            rotateX: -60,
            transformOrigin: 'top',
            scale: 0.95
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            duration: 0.5
          }}
          className="text-xl sm:text-2xl font-medium text-white whitespace-nowrap absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {keywords[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
