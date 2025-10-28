'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionNavigation from '@/components/ui/SectionNavigation';
import ProductPrinciples from '@/components/product/ProductPrinciples';
import ProductGuidelines from '@/components/product/ProductGuidelines';
import SectionPlaceholder from '@/components/ui/SectionPlaceholder';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { PageHero } from '@/components/ui/PageHero';
import { Download, Code } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductPage() {
  const { t } = useLanguage();
  
  const sections = [
    { id: 'principles', label: t('product.sections.principles') },
    { id: 'guidelines', label: t('product.sections.guidelines') },
    { id: 'resources', label: t('product.sections.resources') }
  ];

  return (
    <main className="min-h-screen relative">
      <Header />
      
      <SectionNavigation sections={sections} />
      
      {/* Intro Screen */}
      <PageHero
        icon={Code}
        title={t('nav.product')}
        description={t('product.intro.catchphrase')}
        maxWidth="7xl"
      />
      
      <div id="principles" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <AnimatedSection delay={0.1}>
          <ProductPrinciples />
        </AnimatedSection>
      </div>
      
      <div id="guidelines" className="scroll-mt-24">
        <AnimatedSection delay={0.2}>
          <ProductGuidelines />
        </AnimatedSection>
      </div>
      
      <div id="resources" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <AnimatedSection delay={0.3}>
          <SectionPlaceholder
            title={t('product.resources.title')}
            description={t('product.resources.description')}
            icon={Download}
          />
        </AnimatedSection>
      </div>
      <Footer />
    </main>
  );
}