'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Resources from '@/components/Resources';
import Team from '@/components/Team';
import Tools from '@/components/Tools';
import Footer from '@/components/Footer';
import PrinciplesValuesShowcase from '@/components/PrinciplesValuesShowcase';
import InteractiveMinimap from '@/components/InteractiveMinimap';
import { ParallaxSection } from '@/components/ParallaxSection';
import { LanguageTransitionWrapper } from '@/components/LanguageTransitionWrapper';

export default function Home() {
  
  return (
    <main className="min-h-screen">
      <InteractiveMinimap />
      <Header />
      <LanguageTransitionWrapper>
        <ParallaxSection speed={0.2}>
          <Hero />
        </ParallaxSection>
      
        {/* Principles & Values Showcase */}
        <PrinciplesValuesShowcase />

        <ParallaxSection speed={0.4} offset={100}>
          <Resources />
        </ParallaxSection>
        
                <ParallaxSection speed={0.5} offset={150}>
                  <Team />
                </ParallaxSection>
        
        <ParallaxSection speed={0.6} offset={200}>
          <Tools />
        </ParallaxSection>
        
        <ParallaxSection speed={0.7} offset={250}>
          <Footer />
        </ParallaxSection>
      </LanguageTransitionWrapper>
    </main>
  );
}