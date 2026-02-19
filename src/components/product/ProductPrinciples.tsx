'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from '../ui/BlurReveal';
import { SectionTitle } from '../ui/SectionTitle';

const ProductPrinciples = () => {
  const { t } = useLanguage();

  const principles = [
    { id: 'simple', shortTitle: t('product.principles.simple.shortTitle'), title: t('product.principles.simple.title'), description: t('product.principles.simple.description'), alignmentQuestion: t('product.principles.simple.alignmentQuestion') },
    { id: 'iconic', shortTitle: t('product.principles.iconic.shortTitle'), title: t('product.principles.iconic.title'), description: t('product.principles.iconic.description'), alignmentQuestion: t('product.principles.iconic.alignmentQuestion') },
    { id: 'delightful', shortTitle: t('product.principles.delightful.shortTitle'), title: t('product.principles.delightful.title'), description: t('product.principles.delightful.description'), alignmentQuestion: t('product.principles.delightful.alignmentQuestion') },
    { id: 'purposeful', shortTitle: t('product.principles.purposeful.shortTitle'), title: t('product.principles.purposeful.title'), description: t('product.principles.purposeful.description'), alignmentQuestion: t('product.principles.purposeful.alignmentQuestion') },
    { id: 'trustworthy', shortTitle: t('product.principles.trustworthy.shortTitle'), title: t('product.principles.trustworthy.title'), description: t('product.principles.trustworthy.description'), alignmentQuestion: t('product.principles.trustworthy.alignmentQuestion') },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-14"
        >
          <BlurReveal>
            <SectionTitle>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('principles.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('principles.subtitle')}
              </p>
            </SectionTitle>
          </BlurReveal>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          className="overflow-hidden rounded-xl border border-border bg-background/40 backdrop-blur-sm"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Principle
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                    {t('product.principles.alignmentQuestionLabel')}
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-foreground min-w-[280px]">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {principles.map((p, i) => (
                  <tr
                    key={p.id}
                    className="border-b border-border/60 last:border-b-0 hover:bg-muted/10 transition-colors"
                  >
                    <td className="px-6 py-5 align-top text-sm font-medium text-foreground">
                      {p.shortTitle}
                    </td>
                    <td className="px-6 py-5 align-top">
                      <span className="font-semibold text-white">{p.title}</span>
                      <p className="mt-2 text-sm italic text-muted-foreground">
                        &ldquo;{p.alignmentQuestion}&rdquo;
                      </p>
                    </td>
                    <td className="px-6 py-5 text-muted-foreground leading-relaxed">
                      {p.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductPrinciples;
