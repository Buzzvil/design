'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionNavigation from '@/components/ui/SectionNavigation';
import ProductPrinciples from '@/components/product/ProductPrinciples';
import InteractionLayers from '@/components/product/InteractionLayers';
import ChameleonTheming from '@/components/product/ChameleonTheming';
import ProductGuidelines from '@/components/product/ProductGuidelines';
import ProductConventions from '@/components/product/ProductConventions';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { HeroBackground, PRODUCT_PALETTE } from '@/components/ui/HeroBackground';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductPage() {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);

  const scrollToPrinciples = () => {
    const el = document.getElementById('principles');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const sections = [
    { id: 'principles', label: t('product.sections.principles') },
    { id: 'layers', label: t('product.sections.layers') },
    { id: 'chameleon', label: t('product.sections.chameleon') },
    { id: 'patterns', label: t('product.sections.patterns') },
    { id: 'conventions', label: t('product.sections.conventions') },
  ];

  return (
    <main className="min-h-screen relative">
      <Header />
      <SectionNavigation sections={sections} />

      {/* Hero */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <HeroBackground palette={PRODUCT_PALETTE} />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center text-white">
          <motion.div
            style={{ opacity: heroOpacity, y: heroY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: PRODUCT_PALETTE.accent }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: PRODUCT_PALETTE.accent }} />
              </span>
              {t('product.hero.tag')}
            </span>

            <h1 className="mb-8 text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight drop-shadow-xl text-white whitespace-pre-line">
              {t('product.hero.title')}
            </h1>

            <p className="mx-auto max-w-2xl text-xl sm:text-2xl leading-relaxed text-white/90 font-light drop-shadow-md">
              {t('product.hero.description')}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToPrinciples}
              className="mt-12 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/20 backdrop-blur-md px-8 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              {t('product.hero.cta')} <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <div id="principles" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <AnimatedSection delay={0.1}>
          <ProductPrinciples />
        </AnimatedSection>
      </div>
      
      <div id="layers" className="scroll-mt-24">
        <InteractionLayers />
      </div>

      <div id="chameleon" className="scroll-mt-24">
        <ChameleonTheming />
      </div>

      <div id="patterns" className="scroll-mt-24">
        <AnimatedSection delay={0.2}>
          <ProductGuidelines />
        </AnimatedSection>
      </div>

      <div id="conventions" className="scroll-mt-24">
        <AnimatedSection delay={0.2}>
          <ProductConventions />
        </AnimatedSection>
      </div>

      <Footer />
    </main>
  );
}
