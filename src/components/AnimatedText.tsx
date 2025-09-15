'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function AnimatedText({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.5 
}: AnimatedTextProps) {
  const { language } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedContent, setDisplayedContent] = useState(children);

  useEffect(() => {
    // Start animation when language changes
    setIsAnimating(true);
    
    // After a brief delay, update the content
    const timer = setTimeout(() => {
      setDisplayedContent(children);
      setIsAnimating(false);
    }, delay + duration * 1000);

    return () => clearTimeout(timer);
  }, [language, children, delay, duration]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          initial={{ 
            opacity: 0, 
            y: 20,
            filter: 'blur(4px)'
          }}
          animate={{ 
            opacity: isAnimating ? 0 : 1, 
            y: isAnimating ? 20 : 0,
            filter: isAnimating ? 'blur(4px)' : 'blur(0px)'
          }}
          exit={{ 
            opacity: 0, 
            y: -20,
            filter: 'blur(4px)'
          }}
          transition={{ 
            duration: duration,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {displayedContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Specialized component for titles with more dramatic animation
export function AnimatedTitle({ 
  children, 
  className = '', 
  delay = 0 
}: AnimatedTextProps) {
  const { language } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedContent, setDisplayedContent] = useState(children);

  useEffect(() => {
    setIsAnimating(true);
    
    const timer = setTimeout(() => {
      setDisplayedContent(children);
      setIsAnimating(false);
    }, delay + 800);

    return () => clearTimeout(timer);
  }, [language, children, delay]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          initial={{ 
            opacity: 0, 
            y: 30,
            scale: 0.95,
            filter: 'blur(6px)'
          }}
          animate={{ 
            opacity: isAnimating ? 0 : 1, 
            y: isAnimating ? 30 : 0,
            scale: isAnimating ? 0.95 : 1,
            filter: isAnimating ? 'blur(6px)' : 'blur(0px)'
          }}
          exit={{ 
            opacity: 0, 
            y: -30,
            scale: 0.95,
            filter: 'blur(6px)'
          }}
          transition={{ 
            duration: 0.8,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {displayedContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Component for paragraphs with subtle animation
export function AnimatedParagraph({ 
  children, 
  className = '', 
  delay = 0 
}: AnimatedTextProps) {
  const { language } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedContent, setDisplayedContent] = useState(children);

  useEffect(() => {
    setIsAnimating(true);
    
    const timer = setTimeout(() => {
      setDisplayedContent(children);
      setIsAnimating(false);
    }, delay + 400);

    return () => clearTimeout(timer);
  }, [language, children, delay]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          initial={{ 
            opacity: 0, 
            y: 15,
            filter: 'blur(2px)'
          }}
          animate={{ 
            opacity: isAnimating ? 0 : 1, 
            y: isAnimating ? 15 : 0,
            filter: isAnimating ? 'blur(2px)' : 'blur(0px)'
          }}
          exit={{ 
            opacity: 0, 
            y: -15,
            filter: 'blur(2px)'
          }}
          transition={{ 
            duration: 0.4,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {displayedContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
