'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import MissionVision from '@/components/sections/MissionVision';
import Values from '@/components/sections/Values';
import Team from '@/components/sections/Team';
import Tools from '@/components/sections/Tools';
import Footer from '@/components/layout/Footer';
import InteractiveMinimap from '@/components/ui/InteractiveMinimap';
import SectionNavigation from '@/components/ui/SectionNavigation';
import { ParallaxSection } from '@/components/ui/ParallaxSection';
import { LanguageTransitionWrapper } from '@/components/layout/LanguageTransitionWrapper';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  // Prevent unwanted scroll behavior on page load
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Ensure page starts at top on load
    window.scrollTo(0, 0);
    
    // Clean up on unmount
    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);
  
  const sections = [
    { id: 'mission-vision', label: t('nav.sections.mission') },
    { id: 'philosophy', label: t('nav.sections.philosophy') },
    { id: 'values', label: t('nav.sections.values') },
    { id: 'team', label: t('nav.sections.team') },
    { id: 'tools', label: t('nav.sections.tools') },
  ];

  return (
    <main className="min-h-screen relative">
      <InteractiveMinimap />
      <Header />
      <SectionNavigation sections={sections} />
      <LanguageTransitionWrapper>
        <ParallaxSection speed={0.2}>
          <Hero />
        </ParallaxSection>
        
        <ParallaxSection speed={0.3} offset={50}>
          <div id="mission-vision" className="scroll-mt-24">
            <MissionVision />
          </div>
        </ParallaxSection>
        
        <ParallaxSection speed={0.4} offset={100}>
          <section id="philosophy" className="py-20 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-8">
              <SectionHeader
                title={t('philosophy.title')}
                description={t('philosophy.subtitle')}
                titleSize="5xl"
                descriptionSize="xl"
              />

              <div className="max-w-4xl mx-auto">
                <div className="text-center p-12 bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border">
                  <div className="mb-8 flex justify-center">
                    <motion.div
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20"
                      animate={{ scale: [1, 1.03, 1], opacity: [0.9, 1, 0.9] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                  <div className="text-xl text-muted-foreground leading-relaxed space-y-4">
                    {t('philosophy.content').split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ParallaxSection>
        
        <ParallaxSection speed={0.5} offset={150}>
          <div id="values" className="scroll-mt-24">
            <Values />
          </div>
        </ParallaxSection>
        
        <ParallaxSection speed={0.6} offset={200}>
          <div id="team" className="scroll-mt-24">
            <Team />
          </div>
        </ParallaxSection>
        
        <ParallaxSection speed={0.7} offset={250}>
          <div id="tools" className="scroll-mt-24">
            <Tools />
          </div>
        </ParallaxSection>
        
        <ParallaxSection speed={0.8} offset={300}>
          <Footer />
        </ParallaxSection>
      </LanguageTransitionWrapper>
    </main>
  );
}