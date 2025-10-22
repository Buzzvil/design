'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionNavigation from '@/components/SectionNavigation';
import SectionPlaceholder from '@/components/SectionPlaceholder';
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
    <main className="min-h-screen">
      <Header />
      
      <SectionNavigation sections={sections} />
      
      <div id="principles" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <SectionPlaceholder
          title={t('brand.principles.title')}
          description={t('brand.principles.description')}
          icon={Award}
        />
      </div>
      
      <div id="guidelines" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <SectionPlaceholder
          title={t('brand.guidelines.title')}
          description={t('brand.guidelines.description')}
          icon={FileText}
        />
      </div>
      
      <div id="resources" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <SectionPlaceholder
          title={t('brand.resources.title')}
          description={t('brand.resources.description')}
          icon={Download}
        />
      </div>
      <Footer />
    </main>
  );
}