'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MousePointer, Eye, Workflow, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { SectionHeader } from '../ui/SectionHeader';

const ProductGuidelines = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const guidelineCards = [
    {
      id: 'ux-patterns',
      title: t('product.guidelines.uxPatterns.title'),
      description: t('product.guidelines.uxPatterns.description'),
      icon: MousePointer,
      href: '/product/UX-patterns',
      features: [
        'Interaction Patterns',
        'UI Kit',
        'Micro-interactions'
      ]
    },
    {
      id: 'visual-patterns',
      title: t('product.guidelines.visualPatterns.title'),
      description: t('product.guidelines.visualPatterns.description'),
      icon: Eye,
      href: '/product/visual-patterns',
      features: [
        'Brand Integration',
        'Visual Hierarchy',
        'Consistency Rules'
      ]
    },
    {
      id: 'workflow-rituals',
      title: t('product.guidelines.workflowRituals.title'),
      description: t('product.guidelines.workflowRituals.description'),
      icon: Workflow,
      href: '/product/workflow-rituals',
      features: [
        'Design Handoff',
        'Development Process',
        'Quality Assurance'
      ]
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeader
          title={t('product.guidelines.title')}
          description={t('product.guidelines.intro')}
          titleSize="5xl"
          descriptionSize="xl"
        />

        {/* Guidelines Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guidelineCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              onClick={() => router.push(card.href)}
              className="group cursor-pointer bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Card Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>

              {/* Card Description */}
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                {card.description}
              </p>

              {/* Card Features */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-white mb-3">What&apos;s inside:</h4>
                <div className="flex flex-wrap gap-2">
                  {card.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-3 py-1 bg-muted/30 text-muted-foreground text-xs rounded-full border border-border/50"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGuidelines;