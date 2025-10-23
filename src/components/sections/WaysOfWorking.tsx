'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from '../ui/BlurReveal';
import { SectionTitle } from '../ui/SectionTitle';
import Values from './Values';
import Team from './Team';
import Tools from './Tools';

const WaysOfWorking = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <BlurReveal>
            <SectionTitle>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('waysOfWorking.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('waysOfWorking.subtitle')}
              </p>
            </SectionTitle>
          </BlurReveal>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-20"
        >
          {/* Our Principles */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('waysOfWorking.principles.title')}
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('waysOfWorking.principles.subtitle')}
              </p>
            </div>
            <Values />
          </motion.div>

          {/* Our Team */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('waysOfWorking.team.title')}
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('waysOfWorking.team.subtitle')}
              </p>
            </div>
            <Team />
          </motion.div>

          {/* Our Stack */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('waysOfWorking.stack.title')}
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('waysOfWorking.stack.subtitle')}
              </p>
            </div>
            <Tools />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WaysOfWorking;
