'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionNavigation from '@/components/SectionNavigation';
import ProductPrinciples from '@/components/ProductPrinciples';
import SectionPlaceholder from '@/components/SectionPlaceholder';
import { FileText, Download, Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export default function ProductPage() {
  const { t } = useLanguage();
  
  const sections = [
    { id: 'principles', label: t('product.sections.principles') },
    { id: 'guidelines', label: t('product.sections.guidelines') },
    { id: 'resources', label: t('product.sections.resources') }
  ];

  return (
    <main className="min-h-screen">
      <Header />
      
      <SectionNavigation sections={sections} />
      
      {/* Intro Screen */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <Menu className="w-16 h-16 text-white mx-auto mb-6" />
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
      
      <div id="guidelines" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <SectionPlaceholder
          title={t('product.guidelines.title')}
          description={t('product.guidelines.description')}
          icon={FileText}
        />
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