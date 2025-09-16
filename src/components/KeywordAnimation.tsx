'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const keywords = ['Rewarded', 'Playful', 'Scalable'];

export function KeywordAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % keywords.length);
    }, 3000); // More time on each word

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-8 sm:h-10 flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0, 
            y: 8, 
            rotateX: 60,
            transformOrigin: 'bottom'
          }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            transformOrigin: 'bottom'
          }}
          exit={{ 
            opacity: 0, 
            y: -8, 
            rotateX: -60,
            transformOrigin: 'top'
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
            duration: 0.4
          }}
          className="text-xl sm:text-2xl font-medium text-white absolute"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {keywords[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
