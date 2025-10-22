'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MissionVision from '@/components/MissionVision';
import { PhilosophyAnimation } from '@/components/PhilosophyAnimation';
import Values from '@/components/Values';
import Team from '@/components/Team';
import Tools from '@/components/Tools';
import Footer from '@/components/Footer';
import InteractiveMinimap from '@/components/InteractiveMinimap';
import SectionNavigation from '@/components/SectionNavigation';
import { ParallaxSection } from '@/components/ParallaxSection';
import { LanguageTransitionWrapper } from '@/components/LanguageTransitionWrapper';

export default function Home() {
  const sections = [
    { id: 'mission-vision', label: 'The Mission' },
    { id: 'philosophy', label: 'Our Mindset' },
    { id: 'values', label: 'How we work' },
    { id: 'team', label: 'The team' },
    { id: 'tools', label: 'Tools' },
  ];

  return (
    <main className="min-h-screen">
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
                  Philosophy
                </h2>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="text-center p-12 bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border">
                  <PhilosophyAnimation isActive={true} />
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    At Buzzvil, Design shapes how people experience advertising, not as interruptions, but as delightful moments of connection. We believe every interaction, from brand touchpoints to in-product experiences, should feel playful, engaging, and effortless. Our role is to unify how Buzzvil looks, feels, and behaves across the ecosystem, turning campaigns and platforms into one coherent, delightful experience. Guided by our principles and a One-Team spirit, we design to inspire trust, drive performance, and set new standards for what AdTech can be.
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