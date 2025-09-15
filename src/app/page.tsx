'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Resources from '@/components/Resources';
import Team from '@/components/Team';
import Tools from '@/components/Tools';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from '@/components/BlurReveal';
import { SectionTitle } from '@/components/SectionTitle';
import { ParallaxSection } from '@/components/ParallaxSection';
import { LanguageTransitionWrapper } from '@/components/LanguageTransitionWrapper';

export default function Home() {
  const { t } = useLanguage();
  
  return (
    <main className="min-h-screen">
      <Header />
      <LanguageTransitionWrapper>
        <ParallaxSection speed={0.2}>
          <Hero />
        </ParallaxSection>
      
      {/* Philosophy & Foundations Section */}
      <ParallaxSection speed={0.3} offset={50}>
        <section id="foundations" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionTitle className="mb-4">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {t('foundations.title')}
            </h2>
          </SectionTitle>
          <div className="py-2">
            <BlurReveal>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('foundations.subtitle')}
              </p>
            </BlurReveal>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 relative">
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">{t('foundations.mission.title')}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t('foundations.mission.content')}
            </p>
          </div>
          <div className="p-8 relative">
            <div className="absolute left-0 top-8 bottom-8 w-px bg-border/50 hidden md:block"></div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">{t('foundations.vision.title')}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t('foundations.vision.content')}
            </p>
          </div>
        </div>

        {/* Philosophy: Design as One-Team */}
        <div className="bg-gradient-to-br from-background to-muted/20 p-8 rounded-2xl border border-border shadow-sm mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-4">{t('foundations.philosophy.title')}</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t('foundations.philosophy.content1')}
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t('foundations.philosophy.content2')}
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {t('foundations.philosophy.content3')}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t('foundations.philosophy.content4')}
          </p>
        </div>

        {/* Principles */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-foreground mb-8 text-center">{t('principles.title')}</h3>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="p-6">
              <h4 className="text-xl font-semibold text-foreground mb-3">{t('principles.1.title')}</h4>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('principles.1.content1')}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('principles.1.content2')}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('principles.1.content3')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('principles.1.content4')}
              </p>
            </div>
            <div className="p-6 relative">
              <div className="absolute left-0 top-6 bottom-6 w-px bg-border/50 hidden md:block"></div>
              <h4 className="text-xl font-semibold text-foreground mb-3">{t('principles.2.title')}</h4>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('principles.2.content1')}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('principles.2.content2')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('principles.2.content3')}
              </p>
            </div>
            <div className="p-6 relative">
              <div className="absolute left-0 top-6 bottom-6 w-px bg-border/50 hidden md:block"></div>
              <h4 className="text-xl font-semibold text-foreground mb-3">{t('principles.3.title')}</h4>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('principles.3.content1')}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('principles.3.content2')}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t('principles.3.content3')}
              </p>
            </div>
          </div>
        </div>

        {/* Values (How We Work) */}
        <div>
          <h3 className="text-3xl font-semibold text-foreground mb-8 text-center">{t('values.title')}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Build in the Open */}
            <div className="p-6">
              <h4 className="text-xl font-semibold text-foreground mb-3">{t('values.build.title')}</h4>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('values.build.content')}
              </p>
              <p className="text-primary font-medium">{t('values.build.slogan')}</p>
            </div>
            {/* Clarity Through Feedback */}
            <div className="p-6 relative">
              <div className="absolute left-0 top-6 bottom-6 w-px bg-border/50 hidden md:block"></div>
              <h4 className="text-xl font-semibold text-foreground mb-3">{t('values.clarity.title')}</h4>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('values.clarity.content')}
              </p>
              <p className="text-primary font-medium">{t('values.clarity.slogan')}</p>
            </div>
            {/* Lead with Grit */}
            <div className="p-6 relative">
              <div className="absolute left-0 top-6 bottom-6 w-px bg-border/50 hidden lg:block"></div>
              <h4 className="text-xl font-semibold text-foreground mb-3">{t('values.grit.title')}</h4>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('values.grit.content')}
              </p>
              <p className="text-primary font-medium">{t('values.grit.slogan')}</p>
            </div>
            {/* Bold Explorers */}
            <div className="p-6 relative">
              <div className="absolute left-0 top-6 bottom-6 w-px bg-border/50 hidden md:block"></div>
              <h4 className="text-xl font-semibold text-foreground mb-3">{t('values.explore.title')}</h4>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('values.explore.content')}
              </p>
              <p className="text-primary font-medium">{t('values.explore.slogan')}</p>
            </div>
            {/* One-Team in Practice */}
            <div className="p-6 relative">
              <div className="absolute left-0 top-6 bottom-6 w-px bg-border/50 hidden md:block"></div>
              <h4 className="text-xl font-semibold text-foreground mb-3">{t('values.team.title')}</h4>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('values.team.content')}
              </p>
              <p className="text-primary font-medium">{t('values.team.slogan')}</p>
            </div>
            {/* Delight with Integrity */}
            <div className="p-6 relative">
              <div className="absolute left-0 top-6 bottom-6 w-px bg-border/50 hidden lg:block"></div>
              <h4 className="text-xl font-semibold text-foreground mb-3">{t('values.delight.title')}</h4>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t('values.delight.content')}
              </p>
              <p className="text-primary font-medium">{t('values.delight.slogan')}</p>
            </div>
          </div>
        </div>
        </section>
      </ParallaxSection>

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