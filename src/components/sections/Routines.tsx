'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from '../ui/BlurReveal';
import { SectionTitle } from '../ui/SectionTitle';
import { Calendar, Users, UtensilsCrossed, Sparkles } from 'lucide-react';

const Routines = () => {
  const { t } = useLanguage();

  const routines = [
    { id: 'sync', icon: Calendar, titleKey: 'routines.sync.title', descKey: 'routines.sync.description' },
    { id: '1on1', icon: Users, titleKey: 'routines.1on1.title', descKey: 'routines.1on1.description' },
    { id: 'lunch', icon: UtensilsCrossed, titleKey: 'routines.lunch.title', descKey: 'routines.lunch.description' },
    { id: 'week', icon: Sparkles, titleKey: 'routines.week.title', descKey: 'routines.week.description' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="routines" className="py-32 bg-muted/20 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <SectionTitle className="mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {t('routines.title')}
            </h2>
          </SectionTitle>
          <BlurReveal>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              {t('routines.subtitle')}
            </p>
            <div className="max-w-3xl mx-auto text-left rounded-xl border border-border/60 bg-background/40 p-6 lg:p-8">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t('routines.whyTitle')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('routines.whyContent')}
              </p>
            </div>
          </BlurReveal>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {routines.map((r) => (
            <motion.div
              key={r.id}
              variants={itemVariants}
              className="bg-background/60 backdrop-blur-sm rounded-2xl border border-border p-6 lg:p-8 hover:border-border/80 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <r.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(r.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(r.descKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('routines.closing')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Routines;
