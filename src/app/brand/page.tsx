'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionNavigation from '@/components/ui/SectionNavigation';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Award } from 'lucide-react';
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
      
      <div id="principles" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection delay={0.1}>
              <SectionHeader
                title={t('brand.principles.title')}
                description={t('brand.principles.description')}
              />
            </AnimatedSection>
          </div>
        </section>
      </div>
      
      <div id="guidelines" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection delay={0.2}>
              <SectionHeader
                title={t('brand.guidelines.title')}
                description={t('brand.guidelines.description')}
              />
            </AnimatedSection>
          </div>
        </section>
      </div>
      
      <div id="resources" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection delay={0.3}>
              <SectionHeader
                title={t('brand.resources.title')}
                description={t('brand.resources.description')}
              />
            </AnimatedSection>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}