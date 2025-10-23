'use client';

import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import MissionVision from '@/components/sections/MissionVision';
import { PhilosophyAnimation } from '@/components/sections/PhilosophyAnimation';
import Values from '@/components/sections/Values';
import Team from '@/components/sections/Team';
import Tools from '@/components/sections/Tools';
import Footer from '@/components/layout/Footer';
import InteractiveMinimap from '@/components/ui/InteractiveMinimap';
import SectionNavigation from '@/components/ui/SectionNavigation';
import { ParallaxSection } from '@/components/ui/ParallaxSection';
import { LanguageTransitionWrapper } from '@/components/layout/LanguageTransitionWrapper';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  
  const sections = [
    { id: 'mission-vision', label: 'The Mission' },
    { id: 'philosophy', label: 'Our Mindset' },
    { id: 'values', label: 'The way we work' },
    { id: 'team', label: 'The team' },
    { id: 'tools', label: 'Tools' },
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
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {t('philosophy.title')}
                </h2>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="text-center p-12 bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border">
                  <PhilosophyAnimation isActive={true} />
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {t('philosophy.content')}
                  </p>
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