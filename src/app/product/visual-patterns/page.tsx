'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionNavigation from '@/components/ui/SectionNavigation';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { BlurReveal } from '@/components/ui/BlurReveal';

const VisualPatternsPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const sections = [
    { id: 'principles', label: 'Design Principles' },
    { id: 'guidelines', label: 'Visual Guidelines' },
    { id: 'coming-soon', label: 'Coming Soon' }
  ];

  const principles = [
    t('product.guidelines.visualPatterns.principle1'),
    t('product.guidelines.visualPatterns.principle2'),
    t('product.guidelines.visualPatterns.principle3'),
    t('product.guidelines.visualPatterns.principle4')
  ];

  return (
    <main className="min-h-screen relative">
      <Header />
      
      <SectionNavigation sections={sections} />
      
      {/* Back Button */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-muted-foreground hover:text-white transition-colors mb-8"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Guidelines</span>
          </motion.button>
        </div>
      </div>

      {/* Intro Screen */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <Eye className="w-16 h-16 text-white mx-auto mb-6" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
          >
            Visual Patterns
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {t('product.guidelines.visualPatterns.description')}
          </motion.p>
        </div>
      </section>

      <div id="principles" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <BlurReveal>
                <SectionTitle>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Design Principles
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    {t('product.guidelines.visualPatterns.subtitle')}
                  </p>
                </SectionTitle>
              </BlurReveal>
            </motion.div>

            {/* Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {principles.map((principle, principleIndex) => (
                <motion.div
                  key={principleIndex}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: principleIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-6 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-semibold text-sm">
                      {principleIndex + 1}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {principle}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div id="guidelines" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Eye className="w-16 h-16 text-white mx-auto mb-6" />
            </motion.div>
            
            <BlurReveal>
              <SectionTitle>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Visual Guidelines
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive visual standards and brand integration guidelines.
                </p>
              </SectionTitle>
            </BlurReveal>
          </div>
        </section>
      </div>

      <div id="coming-soon" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  More Visual Patterns Coming Soon
                </h2>
                <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                  We&apos;re continuously expanding our visual pattern library with brand-specific guidelines, 
                  component variations, and design tokens. Check back regularly for updates.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default VisualPatternsPage;
