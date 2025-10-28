'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionNavigation from '@/components/ui/SectionNavigation';
import SectionPlaceholder from '@/components/ui/SectionPlaceholder';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { PageHero } from '@/components/ui/PageHero';
import { Award, FileText, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BrandPage() {
  const { t } = useLanguage();
  
  const sections = [
    { id: 'principles', label: t('brand.sections.principles') },
    { id: 'guidelines', label: t('brand.sections.guidelines') },
    { id: 'resources', label: t('brand.sections.resources') }
  ];

  return (
    <main className="min-h-screen relative">
      <Header />
      
      <SectionNavigation sections={sections} />
      
      {/* Intro Screen */}
      <PageHero
        icon={Award}
        title={t('nav.brand')}
        description={t('brand.intro.catchphrase')}
        maxWidth="4xl"
      />
      
      <div id="principles" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <AnimatedSection delay={0.1}>
          <SectionPlaceholder
            title={t('brand.principles.title')}
            description={t('brand.principles.description')}
            icon={Award}
          />
        </AnimatedSection>
      </div>
      
      <div id="guidelines" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <AnimatedSection delay={0.2}>
          <SectionPlaceholder
            title={t('brand.guidelines.title')}
            description={t('brand.guidelines.description')}
            icon={FileText}
          />
        </AnimatedSection>
      </div>
      
      <div id="resources" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <AnimatedSection delay={0.3}>
          <SectionPlaceholder
            title={t('brand.resources.title')}
            description={t('brand.resources.description')}
            icon={Download}
          />
        </AnimatedSection>
      </div>
      <Footer />
    </main>
  );
}