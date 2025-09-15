'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface AnimatedTextProps {
  text: string;
  isAnimating: boolean;
  onAnimationComplete: () => void;
}

function AnimatedText({ text, isAnimating, onAnimationComplete }: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isAnimating) return;

    const timeout = setTimeout(() => {
      if (isDeleting) {
        // Deleting phase
        if (currentIndex > 0) {
          setDisplayedText(text.slice(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          setIsDeleting(false);
        }
      } else {
        // Typing phase
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          // Finished typing, start deleting after a pause
          setTimeout(() => {
            setIsDeleting(true);
          }, 1000);
        }
      }
    }, isDeleting ? 50 : 100); // Faster deletion, slower typing

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, text, isAnimating]);

  useEffect(() => {
    if (isDeleting && currentIndex === 0) {
      onAnimationComplete();
    }
  }, [isDeleting, currentIndex, onAnimationComplete]);

  return (
    <span className="inline-block min-w-[2ch]">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-0.5 h-4 bg-current ml-0.5"
      />
    </span>
  );
}

export function AnimatedLanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const languages: Array<{ code: 'en' | 'ko'; name: string }> = [
    { code: 'en', name: 'English' },
    { code: 'ko', name: '한국어' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: 'en' | 'ko') => {
    if (newLanguage === language) return;
    
    setIsAnimating(true);
    setIsOpen(false);
    
    // Start the animation sequence
    setTimeout(() => {
      setLanguage(newLanguage);
    }, 1000); // Start changing after deletion begins
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Globe className="w-4 h-4 text-white" />
        <div className="text-sm font-medium text-foreground">
          {isAnimating ? (
            <AnimatedText
              text={currentLanguage?.name || 'English'}
              isAnimating={isAnimating}
              onAnimationComplete={handleAnimationComplete}
            />
          ) : (
            <motion.span
              key={language}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {currentLanguage?.name}
            </motion.span>
          )}
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg py-1 z-50 min-w-[120px]"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-muted/50 transition-colors ${
                  language === lang.code ? 'text-accent font-medium' : 'text-foreground'
                }`}
                whileHover={{ x: 4 }}
                disabled={isAnimating}
              >
                {lang.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
