'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from '../ui/BlurReveal';
import { KeywordAnimation } from '../ui/KeywordAnimation';

const Hero = () => {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Minimal background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Main Heading */}
        <div className="py-2">
          <BlurReveal>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
            </h1>
          </BlurReveal>
        </div>

        {/* Sentence with Keyword Animation */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="text-xl sm:text-2xl text-muted-foreground flex items-center justify-center flex-wrap gap-1">
            <motion.span 
              className="whitespace-nowrap"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              {t('hero.sentence.start')}
            </motion.span>
            <div className="inline-block text-center">
              <KeywordAnimation />
            </div>
            <motion.span 
              className="whitespace-nowrap"
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              {t('hero.sentence.end')}
            </motion.span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.a
            href="#mission-vision"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-accent/10 text-accent rounded-lg font-medium hover:bg-accent/20 transition-all duration-150 focus-ring"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#mission-vision');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {t('hero.explore')}
          </motion.a>
          <motion.a
            href="/brand/"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 border border-border/50 text-foreground rounded-lg font-medium hover:border-border hover:bg-muted/50 transition-all duration-150 focus-ring"
          >
            {t('hero.brand')}
          </motion.a>
          <motion.a
            href="/product/"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 border border-border/50 text-foreground rounded-lg font-medium hover:border-border hover:bg-muted/50 transition-all duration-150 focus-ring"
          >
            {t('hero.product')}
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-muted-foreground mb-2">{t('hero.scroll')}</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-white" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Minimal fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
