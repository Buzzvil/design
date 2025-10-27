'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MousePointer, Palette, Zap } from 'lucide-react';

const ProductGuidelines = () => {
  const { t } = useLanguage();

  const guidelines = [
    {
      id: 'interaction',
      icon: MousePointer,
      title: t('product.guidelines.interaction.title'),
      subtitle: t('product.guidelines.interaction.subtitle'),
      description: t('product.guidelines.interaction.description'),
      principles: [
        t('product.guidelines.interaction.principle1'),
        t('product.guidelines.interaction.principle2'),
        t('product.guidelines.interaction.principle3'),
        t('product.guidelines.interaction.principle4')
      ]
    },
    {
      id: 'ui-kit',
      icon: Palette,
      title: t('product.guidelines.uiKit.title'),
      subtitle: t('product.guidelines.uiKit.subtitle'),
      description: t('product.guidelines.uiKit.description'),
      principles: [
        t('product.guidelines.uiKit.principle1'),
        t('product.guidelines.uiKit.principle2'),
        t('product.guidelines.uiKit.principle3'),
        t('product.guidelines.uiKit.principle4')
      ]
    },
    {
      id: 'micro-interactions',
      icon: Zap,
      title: t('product.guidelines.microInteractions.title'),
      subtitle: t('product.guidelines.microInteractions.subtitle'),
      description: t('product.guidelines.microInteractions.description'),
      principles: [
        t('product.guidelines.microInteractions.principle1'),
        t('product.guidelines.microInteractions.principle2'),
        t('product.guidelines.microInteractions.principle3'),
        t('product.guidelines.microInteractions.principle4')
      ]
    }
  ];

  return (
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {t('product.guidelines.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t('product.guidelines.intro')}
          </p>
        </motion.div>

        {/* Guidelines Grid */}
        <div className="space-y-16">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={guideline.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border p-8 lg:p-12 shadow-2xl"
            >
              {/* Guideline Header */}
              <div className="flex items-start space-x-6 mb-8">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <guideline.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    {guideline.title}
                  </h3>
                  <p className="text-lg text-muted-foreground font-medium mb-4">
                    {guideline.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {guideline.description}
                  </p>
                </div>
              </div>

              {/* Principles List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guideline.principles.map((principle, principleIndex) => (
                  <motion.div
                    key={principleIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (index * 0.2) + (principleIndex * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg border border-border/50"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {principle}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              {t('product.guidelines.cta.title')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('product.guidelines.cta.description')}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
            >
              {t('product.guidelines.cta.button')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGuidelines;