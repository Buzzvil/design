'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronDown, Smartphone, CheckCircle, XCircle } from 'lucide-react';

interface Pattern {
  id: string;
  title: string;
  description: string;
}

const InteractionPatterns = () => {
  const { t } = useLanguage();
  const [openPattern, setOpenPattern] = useState<string | null>(null);

  const patterns: Pattern[] = [
    {
      id: 'onLoad',
      title: t('product.guidelines.interactionPatterns.onLoad'),
      description: t('product.guidelines.interactionPatterns.onLoad.description')
    },
    {
      id: 'onScroll',
      title: t('product.guidelines.interactionPatterns.onScroll'),
      description: t('product.guidelines.interactionPatterns.onScroll.description')
    },
    {
      id: 'notify',
      title: t('product.guidelines.interactionPatterns.notify'),
      description: t('product.guidelines.interactionPatterns.notify.description')
    },
    {
      id: 'alert',
      title: t('product.guidelines.interactionPatterns.alert'),
      description: t('product.guidelines.interactionPatterns.alert.description')
    },
    {
      id: 'pauseAsk',
      title: t('product.guidelines.interactionPatterns.pauseAsk'),
      description: t('product.guidelines.interactionPatterns.pauseAsk.description')
    },
    {
      id: 'magnify',
      title: t('product.guidelines.interactionPatterns.magnify'),
      description: t('product.guidelines.interactionPatterns.magnify.description')
    },
    {
      id: 'screenToScreen',
      title: t('product.guidelines.interactionPatterns.screenToScreen'),
      description: t('product.guidelines.interactionPatterns.screenToScreen.description')
    },
    {
      id: 'feedback',
      title: t('product.guidelines.interactionPatterns.feedback'),
      description: t('product.guidelines.interactionPatterns.feedback.description')
    },
    {
      id: 'moreToCome',
      title: t('product.guidelines.interactionPatterns.moreToCome'),
      description: t('product.guidelines.interactionPatterns.moreToCome.description')
    }
  ];

  const handlePatternToggle = (patternId: string) => {
    setOpenPattern(openPattern === patternId ? null : patternId);
  };

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
            {t('product.guidelines.interactionPatterns.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            {t('product.guidelines.interactionPatterns.intro')}
          </p>
        </motion.div>

        {/* Best Practices & Dark Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {/* Best Practices */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white">
                {t('product.guidelines.interactionPatterns.bestPractices')}
              </h3>
            </div>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {t('product.guidelines.interactionPatterns.bestPractices.content')}
            </div>
          </div>

          {/* Dark Patterns */}
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-4">
              <XCircle className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-semibold text-white">
                {t('product.guidelines.interactionPatterns.darkPatterns')}
              </h3>
            </div>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {t('product.guidelines.interactionPatterns.darkPatterns.content')}
            </div>
          </div>
        </motion.div>

        {/* Patterns Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {patterns.map((pattern, index) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-background to-muted/20 border border-border rounded-2xl overflow-hidden"
            >
              {/* Pattern Header */}
              <button
                onClick={() => handlePatternToggle(pattern.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/10 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {pattern.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openPattern === pattern.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </button>

              {/* Pattern Content */}
              <AnimatePresence>
                {openPattern === pattern.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Description */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-white mb-3">
                            Description
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {pattern.description}
                          </p>
                        </div>

                        {/* Live Preview */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-white mb-3">
                            Live Preview
                          </h4>
                          <div className="relative">
                            {/* Mobile Frame */}
                            <div className="w-full max-w-sm mx-auto bg-black rounded-3xl p-2 shadow-2xl">
                              <div className="bg-muted/20 rounded-2xl h-96 flex items-center justify-center">
                                <div className="text-center space-y-4">
                                  <Smartphone className="w-12 h-12 text-muted-foreground mx-auto" />
                                  <p className="text-sm text-muted-foreground">
                                    {pattern.title}
                                  </p>
                                  <p className="text-xs text-muted-foreground/70">
                                    Preview coming soon
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InteractionPatterns;
