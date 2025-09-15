'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageTransitionWrapperProps {
  children: React.ReactNode;
}

export function LanguageTransitionWrapper({ children }: LanguageTransitionWrapperProps) {
  const { language } = useLanguage();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedContent, setDisplayedContent] = useState(children);
  const [animationKey, setAnimationKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start transition when language changes
    setIsTransitioning(true);
    setAnimationKey(prev => prev + 1);
    
    // After a brief delay, update the content
    const timer = setTimeout(() => {
      setDisplayedContent(children);
      setIsTransitioning(false);
    }, 400); // Slightly longer for choreography

    return () => clearTimeout(timer);
  }, [language, children]);

  // Function to calculate delay based on element position
  const getElementDelay = (element: HTMLElement, baseDelay: number = 0) => {
    if (!containerRef.current) return baseDelay;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    
    // Calculate relative position (0 to 1)
    const relativeY = (elementRect.top - containerRect.top) / containerRect.height;
    const relativeX = (elementRect.left - containerRect.left) / containerRect.width;
    
    // Create a progressive delay: top to bottom, left to right
    const yDelay = relativeY * 0.3; // Max 300ms for vertical progression
    const xDelay = relativeX * 0.1; // Max 100ms for horizontal progression
    
    return baseDelay + yDelay + xDelay;
  };

  return (
    <div ref={containerRef} className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${language}-${animationKey}`}
          initial={{ 
            opacity: 0,
            y: 20,
            filter: 'blur(8px)'
          }}
          animate={{ 
            opacity: isTransitioning ? 0 : 1,
            y: isTransitioning ? 20 : 0,
            filter: isTransitioning ? 'blur(8px)' : 'blur(0px)'
          }}
          exit={{ 
            opacity: 0,
            y: -20,
            filter: 'blur(8px)'
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: isTransitioning ? 0 : 0.1 // Small delay for enter animation
          }}
        >
          <ChoreographedContent 
            content={displayedContent} 
            isTransitioning={isTransitioning}
            getElementDelay={getElementDelay}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Component to handle choreographed animations for child elements
function ChoreographedContent({ 
  content, 
  isTransitioning, 
  getElementDelay 
}: { 
  content: React.ReactNode; 
  isTransitioning: boolean;
  getElementDelay: (element: HTMLElement, baseDelay?: number) => number;
}) {
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!isTransitioning) {
      // Reset animated elements when transition starts
      setAnimatedElements(new Set());
      
      // Find all major content blocks and animate them with delays
      const timer = setTimeout(() => {
        if (typeof document === 'undefined') return;
        
        const elements = document.querySelectorAll('[data-choreography]');
        elements.forEach((element, index) => {
          const delay = getElementDelay(element as HTMLElement, index * 0.05);
          setTimeout(() => {
            setAnimatedElements(prev => new Set([...prev, element.id || `element-${index}`]));
          }, delay * 1000);
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, getElementDelay]);

  return (
    <div>
      {React.Children.map(content, (child, index) => {
        if (React.isValidElement(child)) {
          const elementId = `section-${index}`;
          const isAnimated = animatedElements.has(elementId);
          
          return (
            <motion.div
              data-choreography
              id={elementId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ 
                opacity: isTransitioning ? 0 : (isAnimated ? 1 : 0.3),
                y: isTransitioning ? 15 : 0
              }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: isTransitioning ? 0 : (typeof document !== 'undefined' ? getElementDelay(document.getElementById(elementId) || document.body, index * 0.05) : 0)
              }}
            >
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </div>
  );
}
