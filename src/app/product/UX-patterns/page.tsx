'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MousePointer, Palette, Zap, Smartphone, ChevronDown, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionNavigation from '@/components/ui/SectionNavigation';

const UXPatternsPage = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [openPattern, setOpenPattern] = useState<string | null>(null);

  const handlePatternToggle = (patternId: string) => {
    setOpenPattern(openPattern === patternId ? null : patternId);
  };

  const sections = [
    { id: 'interaction-patterns', label: 'Interaction Patterns' },
    { id: 'ui-kit', label: 'UI Kit' },
    { id: 'micro-interactions', label: 'Micro-interactions' }
  ];

  const interactionPatterns = [
    {
      id: 'onLoad',
      title: 'While loading',
      description: t('product.guidelines.interactionPatterns.onLoad.description'),
      tags: ['Skeleton UI', 'Loading states']
    },
    {
      id: 'onScroll',
      title: 'Page Scroll',
      description: t('product.guidelines.interactionPatterns.onScroll.description'),
      tags: ['Vertical scroll', 'Primary interaction']
    },
    {
      id: 'notify',
      title: 'Notify',
      description: t('product.guidelines.interactionPatterns.notify.description'),
      tags: ['Toast', 'Banner']
    },
    {
      id: 'alert',
      title: 'Alert',
      description: t('product.guidelines.interactionPatterns.alert.description'),
      tags: ['Toast', 'Urgent notification']
    },
    {
      id: 'pauseAsk',
      title: 'Pause & Ask',
      description: t('product.guidelines.interactionPatterns.pauseAsk.description'),
      tags: ['Popup', 'Modal']
    },
    {
      id: 'magnify',
      title: 'Magnify',
      description: t('product.guidelines.interactionPatterns.magnify.description'),
      tags: ['Bottomsheet', 'Expandable content']
    },
    {
      id: 'screenToScreen',
      title: 'Screen to Screen',
      description: t('product.guidelines.interactionPatterns.screenToScreen.description'),
      tags: ['Navigation', 'Transitions']
    },
    {
      id: 'feedback',
      title: 'Feedback',
      description: t('product.guidelines.interactionPatterns.feedback.description'),
      tags: ['Touch', 'Swipe', 'Haptic']
    },
    {
      id: 'moreToCome',
      title: 'More to come',
      description: t('product.guidelines.interactionPatterns.moreToCome.description'),
      tags: ['Future patterns']
    }
  ];

  const subsections = [
    {
      id: 'interaction-patterns',
      icon: MousePointer,
      title: t('product.guidelines.interactionPatterns.title'),
      subtitle: t('product.guidelines.interactionPatterns.subtitle'),
      description: t('product.guidelines.interactionPatterns.description')
    },
    {
      id: 'ui-kit',
      icon: Palette,
      title: t('product.guidelines.uiKit.title'),
      subtitle: t('product.guidelines.uiKit.subtitle'),
      description: t('product.guidelines.uiKit.description'),
      structure: [
        t('product.guidelines.uiKit.atoms'),
        t('product.guidelines.uiKit.modules'),
        t('product.guidelines.uiKit.views')
      ]
    },
    {
      id: 'micro-interaction-patterns',
      icon: Zap,
      title: t('product.guidelines.microInteractionPatterns.title'),
      subtitle: t('product.guidelines.microInteractionPatterns.subtitle'),
      description: t('product.guidelines.microInteractionPatterns.description'),
      patterns: [
        t('product.guidelines.microInteractionPatterns.livingIcons'),
        t('product.guidelines.microInteractionPatterns.emphasisOn'),
        t('product.guidelines.microInteractionPatterns.rewardDelights'),
        t('product.guidelines.microInteractionPatterns.moreToCome')
      ]
    }
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
            <MousePointer className="w-16 h-16 text-white mx-auto mb-6" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
          >
            UX Patterns
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {t('product.guidelines.uxPatterns.description')}
          </motion.p>
        </div>
      </section>

      <div id="interaction-patterns" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {subsections.map((subsection, sectionIndex) => (
              <motion.div
                key={subsection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border p-8 lg:p-12 shadow-2xl mb-20"
              >
                {/* Subsection Header */}
                <div className="flex items-start space-x-6 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <subsection.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                      {subsection.title}
                    </h2>
                    <p className="text-lg text-muted-foreground font-medium mb-4">
                      {subsection.subtitle}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {subsection.description}
                    </p>
                  </div>
                </div>

                {/* Content */}
                {subsection.id === 'interaction-patterns' ? (
                  // Special accordion UI for Interaction Patterns
                  <div className="space-y-4">
                    {/* Best Practices & Dark Patterns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                      {/* Best Practices */}
                      <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <h3 className="text-lg font-semibold text-white">
                            {t('product.guidelines.interactionPatterns.bestPractices')}
                          </h3>
                        </div>
                        <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                          {t('product.guidelines.interactionPatterns.bestPractices.content')}
                        </div>
                      </div>

                      {/* Dark Patterns */}
                      <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <XCircle className="w-5 h-5 text-red-400" />
                          <h3 className="text-lg font-semibold text-white">
                            {t('product.guidelines.interactionPatterns.darkPatterns')}
                          </h3>
                        </div>
                        <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                          {t('product.guidelines.interactionPatterns.darkPatterns.content')}
                        </div>
                      </div>
                    </div>

                    {/* Patterns Accordion */}
                    <div className="space-y-3">
                      {interactionPatterns.map((pattern, patternIndex) => (
                        <motion.div
                          key={pattern.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: patternIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-br from-background to-muted/20 border border-border rounded-xl overflow-hidden"
                        >
                          {/* Pattern Header */}
                          <button
                            onClick={() => handlePatternToggle(pattern.id)}
                            className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/10 transition-colors"
                          >
                            <div className="flex-1">
                              <h4 className="text-base font-semibold text-white">
                                {pattern.title}
                              </h4>
                            </div>
                            <motion.div
                              animate={{ rotate: openPattern === pattern.id ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
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
                                <div className="px-4 pb-4">
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Description */}
                                    <div className="space-y-3">
                                      <h5 className="text-sm font-medium text-white">
                                        Description
                                      </h5>
                                      <p className="text-muted-foreground leading-relaxed text-sm">
                                        {pattern.description}
                                      </p>
                                      
                                      {/* Tags */}
                                      <div className="flex flex-wrap gap-2 mt-3">
                                        {pattern.tags.map((tag, tagIndex) => (
                                          <span
                                            key={tagIndex}
                                            className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30"
                                          >
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Live Preview */}
                                    <div className="space-y-3">
                                      <h5 className="text-sm font-medium text-white">
                                        Live Preview
                                      </h5>
                                      <div className="relative">
                                        {/* Mobile Frame with 16:9 ratio */}
                                        <div className="w-full max-w-[280px] mx-auto bg-black rounded-[1.5rem] p-1 shadow-2xl">
                                          <div className="bg-muted/20 rounded-[1.25rem] h-[157px] flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
                                            <div className="text-center space-y-2 px-4">
                                              <Smartphone className="w-6 h-6 text-muted-foreground mx-auto" />
                                              <p className="text-xs sm:text-sm text-muted-foreground break-words">
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
                    </div>
                  </div>
                ) : (
                  // Regular grid for other subsections
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(subsection.patterns || subsection.structure || []).map((item: string, itemIndex: number) => (
                      <div
                        key={itemIndex}
                        className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <div id="ui-kit" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Palette className="w-16 h-16 text-white mx-auto mb-6" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
            >
              UI Kit
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              From atoms to modules to views - our comprehensive design system components.
            </motion.p>
          </div>
        </section>
      </div>

      <div id="micro-interactions" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Zap className="w-16 h-16 text-white mx-auto mb-6" />
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
            >
              Micro-interactions
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Delightful details that bring our interfaces to life.
            </motion.p>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default UXPatternsPage;
