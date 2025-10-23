'use client';

import { motion } from 'framer-motion';
import { Target, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from '../ui/BlurReveal';
import { SectionTitle } from '../ui/SectionTitle';

const MissionVision = () => {
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
                {t('mission.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('mission.subtitle')}
              </p>
            </SectionTitle>
          </BlurReveal>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Mission */}
          <motion.div
            variants={itemVariants}
            className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-border/20 hover:border-border/40 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 mx-auto">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              {t('mission.mission.title')}
            </h3>
            <p className="text-sm text-muted-foreground/70 mb-6 font-medium">
              {t('mission.mission.subtitle')}
            </p>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
              {t('mission.mission.content').split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            variants={itemVariants}
            className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-border/20 hover:border-border/40 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6 mx-auto">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              {t('mission.vision.title')}
            </h3>
            <p className="text-sm text-muted-foreground/70 mb-6 font-medium">
              {t('mission.vision.subtitle')}
            </p>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
              {t('mission.vision.content').split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVision;
