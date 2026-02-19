'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionHeader } from '../ui/SectionHeader';
import { BlurReveal } from '../ui/BlurReveal';

const Values = () => {
  const { t } = useLanguage();

  const values = [
    { id: 'build', shortTitle: t('values.build.shortTitle'), title: t('values.build.title'), description: t('values.build.content'), tagline: t('values.build.tagline'), alignmentQuestion: t('values.build.alignmentQuestion'), characteristics: [t('values.build.characteristics.0'), t('values.build.characteristics.1'), t('values.build.characteristics.2'), t('values.build.characteristics.3')] },
    { id: 'clarity', shortTitle: t('values.clarity.shortTitle'), title: t('values.clarity.title'), description: t('values.clarity.content'), tagline: t('values.clarity.tagline'), alignmentQuestion: t('values.clarity.alignmentQuestion'), characteristics: [t('values.clarity.characteristics.0'), t('values.clarity.characteristics.1'), t('values.clarity.characteristics.2'), t('values.clarity.characteristics.3')] },
    { id: 'grit', shortTitle: t('values.grit.shortTitle'), title: t('values.grit.title'), description: t('values.grit.content'), tagline: t('values.grit.tagline'), alignmentQuestion: t('values.grit.alignmentQuestion'), characteristics: [t('values.grit.characteristics.0'), t('values.grit.characteristics.1'), t('values.grit.characteristics.2'), t('values.grit.characteristics.3')] },
    { id: 'explore', shortTitle: t('values.explore.shortTitle'), title: t('values.explore.title'), description: t('values.explore.content'), tagline: t('values.explore.tagline'), alignmentQuestion: t('values.explore.alignmentQuestion'), characteristics: [t('values.explore.characteristics.0'), t('values.explore.characteristics.1'), t('values.explore.characteristics.2'), t('values.explore.characteristics.3')] },
    { id: 'team', shortTitle: t('values.team.shortTitle'), title: t('values.team.title'), description: t('values.team.content'), tagline: t('values.team.tagline'), alignmentQuestion: t('values.team.alignmentQuestion'), characteristics: [t('values.team.characteristics.0'), t('values.team.characteristics.1'), t('values.team.characteristics.2'), t('values.team.characteristics.3')] },
  ];

  return (
    <section id="values" className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-14"
        >
          <BlurReveal>
            <SectionHeader
              title={t('values.title')}
              description={t('values.subtitle')}
              titleSize="5xl"
              descriptionSize="lg"
            />
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
                    {t('values.alignmentQuestionLabel')}
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-foreground min-w-[280px]">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {values.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b border-border/60 last:border-b-0 hover:bg-muted/10 transition-colors"
                  >
                    <td className="px-6 py-5 align-top">
                      <span className="font-semibold text-white block">{v.shortTitle}</span>
                      <span className="text-sm text-muted-foreground italic">{v.tagline}</span>
                    </td>
                    <td className="px-6 py-5 align-top">
                      <p className="text-sm italic text-muted-foreground">
                        &ldquo;{v.alignmentQuestion}&rdquo;
                      </p>
                    </td>
                    <td className="px-6 py-5 text-muted-foreground leading-relaxed">
                      {v.description}
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

export default Values;
