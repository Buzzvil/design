'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from '../ui/BlurReveal';
import { SectionTitle } from '../ui/SectionTitle';

const PRINCIPLE_IDS = ['adaptive', 'motion', 'real', 'clarity', 'consistent'] as const;

export function BrandPrinciples() {
  const { t } = useLanguage();

  const principles = PRINCIPLE_IDS.map((id) => ({
    id,
    shortTitle: t(`brand.principles.${id}.shortTitle`),
    title: t(`brand.principles.${id}.title`),
    description: t(`brand.principles.${id}.description`),
    alignmentQuestion: t(`brand.principles.${id}.alignmentQuestion`),
  }));

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-14"
        >
          <BlurReveal>
            <SectionTitle>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('brand.principles.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('brand.principles.description')}
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
                    {t('brand.principles.alignmentQuestionLabel')}
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-foreground min-w-[280px]">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {principles.map((p) => (
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
}
