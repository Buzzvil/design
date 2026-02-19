'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from '../ui/BlurReveal';
import { SectionTitle } from '../ui/SectionTitle';

const MissionVision = () => {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
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
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Mission — abstract planet */}
          <motion.div
            variants={itemVariants}
            className="relative bg-background/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-border/20 hover:border-border/40 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-6 right-6 w-32 h-32 opacity-30">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/60"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/20 to-primary/30"
                animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40"
                animate={{ scale: [0.95, 1.1, 0.95] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              {t('mission.mission.title')}
            </h3>
            <p className="text-base text-muted-foreground/70 mb-6 font-medium">
              {t('mission.mission.subtitle')}
            </p>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-4 relative z-10">
              {t('mission.mission.content').split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          {/* Vision — blueprint grid */}
          <motion.div
            variants={itemVariants}
            className="relative bg-background/10 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-border/20 hover:border-border/40 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="blueprint-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#blueprint-grid)" className="text-primary/50" />
              </svg>
              <motion.div
                className="absolute bottom-4 right-4 w-24 h-24 border border-primary/40 rounded-lg"
                initial={{ opacity: 0.3 }}
                whileInView={{ opacity: 0.6 }}
                viewport={{ once: true }}
              />
              <motion.div
                className="absolute bottom-8 right-8 w-16 h-16 border border-primary/30 rounded"
                initial={{ opacity: 0.2 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
              />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 relative z-10">
              {t('mission.vision.title')}
            </h3>
            <p className="text-base text-muted-foreground/70 mb-6 font-medium relative z-10">
              {t('mission.vision.subtitle')}
            </p>
            <div className="text-lg text-muted-foreground leading-relaxed space-y-4 relative z-10">
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
