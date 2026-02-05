'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeroBackground } from '@/components/ui/HeroBackground';

export function BrandHero() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);

  const scrollToLogo = () => {
    const el = document.getElementById('logo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <HeroBackground />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#EF4444] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#EF4444]" />
            </span>
            {t('brand.hero.tag')}
          </span>

          <h1 className="mb-8 text-7xl font-extrabold tracking-tight md:text-9xl drop-shadow-xl text-white whitespace-pre-line">
            {t('brand.hero.title')}
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl font-light drop-shadow-md">
            {t('brand.hero.description')}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToLogo}
            className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/20 backdrop-blur-md px-8 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            {t('brand.hero.cta')} <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
