'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MousePointer, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionNavigation from '@/components/ui/SectionNavigation';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import PatternAccordion from '@/components/ui/PatternAccordion';
import { interactionPatterns } from '@/data/interactionPatterns';

const UXPatternsPage = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const sections = [
    { id: 'interaction-patterns', label: t('pages.sections.interactionPatterns') },
    { id: 'ui-kit', label: t('pages.sections.uiKit') },
    { id: 'micro-interactions', label: t('pages.sections.microInteractions') }
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
            <span>{t('pages.backToGuidelines')}</span>
          </motion.button>
        </div>
      </div>

      {/* Intro Screen */}
      <PageHero
        icon={MousePointer}
        title="UX Patterns"
        description={t('product.guidelines.uxPatterns.description')}
        maxWidth="7xl"
      />

      <div id="interaction-patterns" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Interaction Patterns"
              description={t('product.guidelines.uxPatterns.description')}
            />

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
            >
              <PatternAccordion patterns={interactionPatterns} />
            </motion.div>
          </div>
        </section>
      </div>

      <div id="ui-kit" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="UI Kit"
              description="From atoms to modules to views - our comprehensive design system components."
            />

            {/* UI Kit Structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { level: 'Atoms', description: 'Basic building blocks like buttons, inputs, and icons', color: 'from-blue-500/10 to-blue-600/5', borderColor: 'border-blue-500/20' },
                { level: 'Molecules', description: 'Simple combinations of atoms like form fields and search bars', color: 'from-green-500/10 to-green-600/5', borderColor: 'border-green-500/20' },
                { level: 'Organisms', description: 'Complex UI components like headers, sidebars, and cards', color: 'from-purple-500/10 to-purple-600/5', borderColor: 'border-purple-500/20' },
                { level: 'Templates', description: 'Page-level layouts and wireframes without content', color: 'from-orange-500/10 to-orange-600/5', borderColor: 'border-orange-500/20' },
                { level: 'Pages', description: 'Specific instances of templates with real content', color: 'from-pink-500/10 to-pink-600/5', borderColor: 'border-pink-500/20' },
                { level: 'More to come', description: 'Additional components and patterns as we grow', color: 'from-gray-500/10 to-gray-600/5', borderColor: 'border-gray-500/20' }
              ].map((item, index) => (
                <motion.div
                  key={item.level}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br ${item.color} border ${item.borderColor} rounded-xl p-6 hover:scale-105 transition-transform duration-300`}
                >
                  <h3 className="text-lg font-semibold text-white mb-3">{item.level}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div id="micro-interactions" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Micro-interactions"
              description="Delightful details that bring our interfaces to life."
            />

            {/* Micro-interactions Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Living Icons', 
                  description: 'Icons that respond to user actions with subtle animations and state changes',
                  example: 'Button hover states, loading spinners, and interactive icons',
                  color: 'from-cyan-500/10 to-cyan-600/5',
                  borderColor: 'border-cyan-500/20'
                },
                { 
                  title: 'Emphasis On', 
                  description: 'Visual emphasis through scale, color, and motion to guide user attention',
                  example: 'Focus states, selection highlights, and call-to-action animations',
                  color: 'from-yellow-500/10 to-yellow-600/5',
                  borderColor: 'border-yellow-500/20'
                },
                { 
                  title: 'Reward Delights', 
                  description: 'Celebratory animations that provide positive feedback for user actions',
                  example: 'Success animations, achievement unlocks, and completion celebrations',
                  color: 'from-emerald-500/10 to-emerald-600/5',
                  borderColor: 'border-emerald-500/20'
                },
                { 
                  title: 'More to come', 
                  description: 'Additional micro-interaction patterns as we discover new ways to delight users',
                  example: 'Gesture feedback, haptic responses, and contextual animations',
                  color: 'from-gray-500/10 to-gray-600/5',
                  borderColor: 'border-gray-500/20'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br ${item.color} border ${item.borderColor} rounded-xl p-6 hover:scale-105 transition-transform duration-300`}
                >
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.description}</p>
                  <p className="text-muted-foreground/70 text-xs italic">{item.example}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default UXPatternsPage;