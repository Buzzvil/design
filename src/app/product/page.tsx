'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionNavigation from '@/components/ui/SectionNavigation';
import ProductPrinciples from '@/components/product/ProductPrinciples';
import InteractionPatterns from '@/components/product/InteractionPatterns';
import SectionPlaceholder from '@/components/ui/SectionPlaceholder';
import { Download, Code } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function ProductPage() {
  const { t } = useLanguage();
  
  const sections = [
    { id: 'principles', label: t('product.sections.principles') },
    { id: 'patterns', label: t('product.sections.patterns') },
    { id: 'resources', label: t('product.sections.resources') }
  ];

  return (
    <main className="min-h-screen relative">
      <Header />
      
      <SectionNavigation sections={sections} />
      
      {/* Intro Screen */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <Code className="w-16 h-16 text-white mx-auto mb-6" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
          >
            {t('nav.product')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {t('product.intro.catchphrase')}
          </motion.p>
        </div>
      </section>
      
      <div id="principles" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <ProductPrinciples />
      </div>
      
      <div id="patterns" className="scroll-mt-24">
        <InteractionPatterns />
      </div>
      
      <div id="resources" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <SectionPlaceholder
          title={t('product.resources.title')}
          description={t('product.resources.description')}
          icon={Download}
        />
      </div>
      <Footer />
    </main>
  );
}