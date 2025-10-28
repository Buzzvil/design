'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const VisualPatternsPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const principles = [
    t('product.guidelines.visualPatterns.principle1'),
    t('product.guidelines.visualPatterns.principle2'),
    t('product.guidelines.visualPatterns.principle3'),
    t('product.guidelines.visualPatterns.principle4')
  ];

  return (
    <main className="min-h-screen relative">
      <Header />
      
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

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {t('product.guidelines.visualPatterns.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-4">
              {t('product.guidelines.visualPatterns.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              {t('product.guidelines.visualPatterns.description')}
            </p>
          </motion.div>

          {/* Visual Patterns Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border p-8 lg:p-12 shadow-2xl"
          >
            {/* Section Header */}
            <div className="flex items-start space-x-6 mb-8">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {t('product.guidelines.visualPatterns.title')}
                </h2>
                <p className="text-lg text-muted-foreground font-medium mb-4">
                  {t('product.guidelines.visualPatterns.subtitle')}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t('product.guidelines.visualPatterns.description')}
                </p>
              </div>
            </div>

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

            {/* Coming Soon Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl border border-primary/20"
            >
              <h3 className="text-xl font-semibold text-white mb-4">
                More Visual Patterns Coming Soon
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We&apos;re continuously expanding our visual pattern library with brand-specific guidelines, 
                component variations, and design tokens. Check back regularly for updates.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default VisualPatternsPage;
