'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MousePointer, Palette, Zap, Smartphone, ChevronDown, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionNavigation from '@/components/ui/SectionNavigation';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { BlurReveal } from '@/components/ui/BlurReveal';

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
      description: 'Skeleton screens, loading states, and progressive disclosure patterns that keep users engaged during wait times.',
      tags: ['Skeleton UI', 'Loading States', 'Progressive Disclosure']
    },
    {
      id: 'onScroll',
      title: 'Page Scroll',
      description: 'Default vertical scrolling as the primary interaction pattern, with parallax and reveal animations.',
      tags: ['Vertical Scroll', 'Parallax', 'Reveal Animations']
    },
    {
      id: 'notify',
      title: 'Notify',
      description: 'Toast notifications, banners, and system messages that provide feedback without interrupting user flow.',
      tags: ['Toast', 'Banner', 'System Messages']
    },
    {
      id: 'alert',
      title: 'Alert',
      description: 'Critical notifications and warnings that require immediate user attention and action.',
      tags: ['Critical Alerts', 'Warnings', 'User Attention']
    },
    {
      id: 'pauseAsk',
      title: 'Pause & Ask',
      description: 'Modal dialogs and popups that pause user flow to gather information or confirm actions.',
      tags: ['Modal', 'Popup', 'Confirmation']
    },
    {
      id: 'magnify',
      title: 'Magnify',
      description: 'Bottom sheets and expandable content that provides detailed information without leaving the current context.',
      tags: ['Bottom Sheet', 'Expandable', 'Detail View']
    },
    {
      id: 'screenToScreen',
      title: 'Screen to Screen',
      description: 'Navigation patterns and transitions between different screens and sections of the application.',
      tags: ['Navigation', 'Transitions', 'Screen Flow']
    },
    {
      id: 'feedback',
      title: 'Feedback',
      description: 'Touch, swipe, and gesture-based interactions that provide immediate visual and haptic feedback.',
      tags: ['Touch', 'Swipe', 'Gestures', 'Haptic']
    },
    {
      id: 'moreToCome',
      title: 'More to come',
      description: 'Additional interaction patterns are continuously being developed and refined based on user needs.',
      tags: ['Coming Soon', 'Development', 'User Needs']
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
                    Interaction Patterns
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    {t('product.guidelines.uxPatterns.description')}
                  </p>
                </SectionTitle>
              </BlurReveal>
            </motion.div>

            {/* Best Practices & Dark Patterns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {/* Best Practices */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">
                    {t('product.guidelines.interactionPatterns.bestPractices')}
                  </h3>
                </div>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                  {t('product.guidelines.interactionPatterns.bestPractices.content')}
                </div>
              </motion.div>

              {/* Dark Patterns */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">
                    {t('product.guidelines.interactionPatterns.darkPatterns')}
                  </h3>
                </div>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                  {t('product.guidelines.interactionPatterns.darkPatterns.content')}
                </div>
              </motion.div>
            </div>

            {/* Interaction Patterns Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              {interactionPatterns.map((pattern, patternIndex) => (
                <motion.div
                  key={pattern.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: patternIndex * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-muted/10 border border-border/50 rounded-lg overflow-hidden hover:bg-muted/20 transition-colors"
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
            </motion.div>
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
            
            <BlurReveal>
              <SectionTitle>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  UI Kit
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  From atoms to modules to views - our comprehensive design system components.
                </p>
              </SectionTitle>
            </BlurReveal>
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
            
            <BlurReveal>
              <SectionTitle>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Micro-interactions
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Delightful details that bring our interfaces to life.
                </p>
              </SectionTitle>
            </BlurReveal>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default UXPatternsPage;