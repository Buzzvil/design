'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionNavigation from '@/components/SectionNavigation';
import ProductPrinciples from '@/components/ProductPrinciples';
import SectionPlaceholder from '@/components/SectionPlaceholder';
import { FileText, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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