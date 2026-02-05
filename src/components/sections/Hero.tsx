'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from '../ui/BlurReveal';
import { KeywordAnimation } from '../ui/KeywordAnimation';
import { HeroBackground } from '../ui/HeroBackground';

const Hero = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);

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
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <HeroBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white"
      >
        <motion.div variants={itemVariants} className="py-2">
          <BlurReveal>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight drop-shadow-xl text-white">
              {t('hero.title')}
            </h1>
          </BlurReveal>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-10">
          <div className="text-xl sm:text-2xl text-white/90 flex items-center justify-center flex-wrap gap-1 drop-shadow-md">
            <span className="whitespace-nowrap">{t('hero.sentence.start')}</span>
            <div className="inline-block text-center">
              <KeywordAnimation />
            </div>
            <span className="whitespace-nowrap">{t('hero.sentence.end')}</span>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.a
            href="#mission-vision"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 backdrop-blur-md px-8 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#mission-vision')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('hero.explore')}
          </motion.a>
          <motion.a
            href="/design/brand/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/20"
          >
            {t('hero.brand')}
          </motion.a>
          <motion.a
            href="/design/product/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/20"
          >
            {t('hero.product')}
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <span className="text-sm text-white/70 mb-2">{t('hero.scroll')}</span>
          <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="w-5 h-5 text-white" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
