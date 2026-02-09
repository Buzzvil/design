'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionNavigation from '@/components/ui/SectionNavigation';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { BrandHero } from '@/components/brand/BrandHero';
import { BrandLogoSection } from '@/components/brand/BrandLogoSection';
import { BrandColors } from '@/components/brand/BrandColors';
import { BrandTypography } from '@/components/brand/BrandTypography';
import { BrandImagery } from '@/components/brand/BrandImagery';
import { LogoGenerator } from '@/components/brand/LogoGenerator';
import { IconGenerator } from '@/components/brand/IconGenerator';
import { IsometricGenerator } from '@/components/brand/IsometricGenerator';

export default function BrandPage() {
  const { t } = useLanguage();

  const sections = [
    { id: 'logo', label: t('brand.nav.logo') },
    { id: 'colors', label: t('brand.nav.colors') },
    { id: 'typography', label: t('brand.nav.typography') },
    { id: 'imagery', label: t('brand.nav.imagery') },
    { id: 'downloads', label: t('brand.nav.downloads') },
  ];

  return (
    <main className="min-h-screen relative">
      <Header />

      <SectionNavigation sections={sections} />

      {/* Hero - Identity System 2.0 */}
      <BrandHero />

      <div id="logo" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection delay={0.1}>
              <div className="mb-12 border-b border-border pb-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  {t('brand.nav.logo')}
                </h2>
              </div>
              <BrandLogoSection />
            </AnimatedSection>
          </div>
        </section>
      </div>

      <div id="colors" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection delay={0.15}>
              <div className="mb-12 border-b border-border pb-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  {t('brand.nav.colors')}
                </h2>
              </div>
              <BrandColors />
            </AnimatedSection>
          </div>
        </section>
      </div>

      <div id="typography" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection delay={0.2}>
              <div className="mb-12 border-b border-border pb-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  {t('brand.nav.typography')}
                </h2>
              </div>
              <BrandTypography />
            </AnimatedSection>
          </div>
        </section>
      </div>

      <div id="imagery" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection delay={0.25}>
              <div className="mb-12 border-b border-border pb-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  {t('brand.nav.imagery')}
                </h2>
              </div>
              <BrandImagery />
            </AnimatedSection>
          </div>
        </section>
      </div>

      <div id="downloads" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection delay={0.3}>
              <div className="mb-12 border-b border-border pb-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  {t('brand.nav.downloads')}
                </h2>
              </div>
              <div className="space-y-16">
                <LogoGenerator />
                <IconGenerator />
                <IsometricGenerator />
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
