'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MousePointer, Palette, Zap, Eye, Workflow, LucideIcon } from 'lucide-react';

interface Subsection {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  patterns?: string[];
  structure?: string[];
  principles?: string[];
}

const ProductGuidelines = () => {
  const { t } = useLanguage();

  const mainSections = [
    {
      id: 'ux-patterns',
      title: t('product.guidelines.uxPatterns.title'),
      description: t('product.guidelines.uxPatterns.description'),
      subsections: [
        {
          id: 'interaction-patterns',
          icon: MousePointer,
          title: t('product.guidelines.interactionPatterns.title'),
          subtitle: t('product.guidelines.interactionPatterns.subtitle'),
          description: t('product.guidelines.interactionPatterns.description'),
          patterns: [
            t('product.guidelines.interactionPatterns.onLoad'),
            t('product.guidelines.interactionPatterns.onScroll'),
            t('product.guidelines.interactionPatterns.notify'),
            t('product.guidelines.interactionPatterns.alert'),
            t('product.guidelines.interactionPatterns.pauseAsk'),
            t('product.guidelines.interactionPatterns.magnify'),
            t('product.guidelines.interactionPatterns.screenToScreen'),
            t('product.guidelines.interactionPatterns.feedback'),
            t('product.guidelines.interactionPatterns.moreToCome')
          ]
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
      ]
    },
    {
      id: 'visual-patterns',
      icon: Eye,
      title: t('product.guidelines.visualPatterns.title'),
      subtitle: t('product.guidelines.visualPatterns.subtitle'),
      description: t('product.guidelines.visualPatterns.description'),
      principles: [
        t('product.guidelines.visualPatterns.principle1'),
        t('product.guidelines.visualPatterns.principle2'),
        t('product.guidelines.visualPatterns.principle3'),
        t('product.guidelines.visualPatterns.principle4')
      ]
    },
    {
      id: 'integration-workflow',
      icon: Workflow,
      title: t('product.guidelines.integrationWorkflow.title'),
      subtitle: t('product.guidelines.integrationWorkflow.subtitle'),
      description: t('product.guidelines.integrationWorkflow.description'),
      principles: [
        t('product.guidelines.integrationWorkflow.principle1'),
        t('product.guidelines.integrationWorkflow.principle2'),
        t('product.guidelines.integrationWorkflow.principle3'),
        t('product.guidelines.integrationWorkflow.principle4')
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

        {/* Guidelines Sections */}
        <div className="space-y-20">
          {mainSections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border p-8 lg:p-12 shadow-2xl"
            >
              {/* Main Section Header */}
              <div className="flex items-start space-x-6 mb-8">
                {section.icon && (
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    {section.title}
                  </h3>
                  {section.subtitle && (
                    <p className="text-lg text-muted-foreground font-medium mb-4">
                      {section.subtitle}
                    </p>
                  )}
                  <p className="text-muted-foreground leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>

              {/* Subsections or Principles */}
              {section.subsections ? (
                // UX Patterns with subsections
                <div className="space-y-8">
                  {section.subsections.map((subsection: Subsection, subsectionIndex) => (
                    <motion.div
                      key={subsection.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: (sectionIndex * 0.2) + (subsectionIndex * 0.1) }}
                      viewport={{ once: true }}
                      className="bg-muted/20 rounded-xl border border-border/50 p-6"
                    >
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <subsection.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-white mb-1">
                            {subsection.title}
                          </h4>
                          <p className="text-muted-foreground font-medium mb-2">
                            {subsection.subtitle}
                          </p>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {subsection.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(subsection.patterns || subsection.structure || subsection.principles || []).map((item: string, itemIndex: number) => (
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
                    </motion.div>
                  ))}
                </div>
              ) : (
                // Other sections with direct principles
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.principles.map((principle, principleIndex) => (
                    <motion.div
                      key={principleIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: (sectionIndex * 0.2) + (principleIndex * 0.1) }}
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
              )}
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