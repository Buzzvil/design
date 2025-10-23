'use client';

import { useState, useEffect, useRef } from 'react';
import { Clock, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from '../ui/BlurReveal';
import { SectionTitle } from '../ui/SectionTitle';
import { RewardCounter } from './RewardCounter';
import { DelightInteraction } from './DelightInteraction';
import { ScalableGrowth } from './ScalableGrowth';

const BUZZVIL_PRINCIPLES = [
  {
    id: 'reward-time',
    title: 'Reward = Time',
    shortTitle: 'Reward',
    description: 'Rewards are a transparent and measurable exchange of user attention. Mechanism: 1P ≈ 1 second of attention. This gives consistency to users and predictability to advertisers.',
    icon: Clock,
    characteristics: ['Transparent Exchange', 'Measurable Attention', 'User Consistency', 'Advertiser Predictability']
  },
  {
    id: 'delight-deception',
    title: 'Delight Without Deception',
    shortTitle: 'Delight',
    description: 'Rewards spark motivation, but experiences sustain engagement. We never use dark patterns: never overlay one ad on another, never mislead, never trap. Interactions must feel playful, clear, and respectful.',
    icon: Sparkles,
    characteristics: ['No Dark Patterns', 'Playful Interactions', 'Clear Communication', 'Respectful Design']
  },
  {
    id: 'scalable-design',
    title: 'Scalable by Design',
    shortTitle: 'Scalable',
    description: 'Every design decision must scale across products, partners, and business models. We provide meaningful customization, but avoid unsustainable exceptions. These principles can veto business or product decisions that fragment the system.',
    icon: TrendingUp,
    characteristics: ['Cross-Product Scale', 'Meaningful Customization', 'System Integrity', 'Decision Veto Power']
  }
];

const ProductPrinciples = () => {
  const { t } = useLanguage();
  const [selectedPrinciple, setSelectedPrinciple] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPrinciplesInView, setIsPrinciplesInView] = useState(false);
  const principlesIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const principlesSectionRef = useRef<HTMLDivElement>(null);
  const principlesNavRef = useRef<HTMLDivElement>(null);

  // Get translated principles
  const getTranslatedPrinciples = () => [
    {
      id: 'reward-time',
      title: t('principles.reward.title'),
      shortTitle: t('principles.reward.shortTitle'),
      description: t('principles.reward.content'),
      icon: Clock,
      characteristics: [
        t('principles.reward.characteristics.0'),
        t('principles.reward.characteristics.1'),
        t('principles.reward.characteristics.2'),
        t('principles.reward.characteristics.3')
      ]
    },
    {
      id: 'delight-deception',
      title: t('principles.delight.title'),
      shortTitle: t('principles.delight.shortTitle'),
      description: t('principles.delight.content'),
      icon: Sparkles,
      characteristics: [
        t('principles.delight.characteristics.0'),
        t('principles.delight.characteristics.1'),
        t('principles.delight.characteristics.2'),
        t('principles.delight.characteristics.3')
      ]
    },
    {
      id: 'scalable-design',
      title: t('principles.scalable.title'),
      shortTitle: t('principles.scalable.shortTitle'),
      description: t('principles.scalable.content'),
      icon: TrendingUp,
      characteristics: [
        t('principles.scalable.characteristics.0'),
        t('principles.scalable.characteristics.1'),
        t('principles.scalable.characteristics.2'),
        t('principles.scalable.characteristics.3')
      ]
    }
  ];

  const translatedPrinciples = getTranslatedPrinciples();

  // Intersection Observer for detecting when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === principlesSectionRef.current) {
            setIsPrinciplesInView(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (principlesSectionRef.current) observer.observe(principlesSectionRef.current);

    return () => {
      if (principlesSectionRef.current) observer.unobserve(principlesSectionRef.current);
    };
  }, []);

  // Auto-advance slider every 5 seconds (pause on hover and only when in view)
  useEffect(() => {
    if (!isHovered && isPrinciplesInView) {
      principlesIntervalRef.current = setInterval(() => {
        setSelectedPrinciple(prev => (prev + 1) % translatedPrinciples.length);
      }, 5000);
    }

    return () => {
      if (principlesIntervalRef.current) clearInterval(principlesIntervalRef.current);
    };
  }, [isHovered, isPrinciplesInView, translatedPrinciples.length]);

  // Auto-scroll to active principle tab (only when user is interacting)
  useEffect(() => {
    if (principlesNavRef.current && isHovered) {
      const activeButton = principlesNavRef.current.children[selectedPrinciple] as HTMLElement;
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedPrinciple, isHovered]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isPrinciplesInView) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          setSelectedPrinciple(prev => prev === 0 ? translatedPrinciples.length - 1 : prev - 1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          setSelectedPrinciple(prev => (prev + 1) % translatedPrinciples.length);
          break;
        case ' ':
        case 'Enter':
          event.preventDefault();
          // Pause/resume auto-advance
          setIsHovered(prev => !prev);
          break;
        case 'Home':
          event.preventDefault();
          setSelectedPrinciple(0);
          break;
        case 'End':
          event.preventDefault();
          setSelectedPrinciple(translatedPrinciples.length - 1);
          break;
      }
    };

    if (isPrinciplesInView) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPrinciplesInView, translatedPrinciples.length]);

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
    <section ref={principlesSectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
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
                {t('principles.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('principles.subtitle')}
              </p>
              <div className="text-xs md:text-sm text-muted-foreground/70 flex items-center justify-center gap-2 flex-wrap">
                <span>Use arrow keys to navigate</span>
                <span>•</span>
                <span>Space to pause/resume</span>
              </div>
            </SectionTitle>
          </BlurReveal>
        </motion.div>

        {/* Principle Navigation */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center mb-12"
        >
          <div className="overflow-x-auto scrollbar-hide bg-muted/30 p-2 rounded-xl max-w-full">
            <div 
              ref={principlesNavRef}
              className="flex gap-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {translatedPrinciples.map((principle, index) => (
              <button
                key={principle.id}
                onClick={() => setSelectedPrinciple(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                  selectedPrinciple === index
                    ? 'bg-white text-black'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {principle.shortTitle}
              </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Principle Content with Enhanced 3D Transitions */}
        <motion.div 
          variants={itemVariants}
          className="max-w-4xl mx-auto"
        >
          <div 
            className="relative overflow-hidden perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className="flex transition-all duration-700 ease-out"
              style={{ 
                transform: `translateX(-${selectedPrinciple * 100}%)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {translatedPrinciples.map((principle, index) => {
                const isActive = index === selectedPrinciple;
                const distance = Math.abs(index - selectedPrinciple);
                
                return (
                  <div
                    key={principle.id}
                    className="w-full flex-shrink-0 transition-all duration-700 ease-out"
                    style={{
                      transform: isActive 
                        ? 'translateZ(0px) rotateY(0deg) scale(1)' 
                        : `translateZ(-${distance * 20}px) rotateY(${distance * 5}deg) scale(${1 - distance * 0.05})`,
                      opacity: isActive ? 1 : Math.max(0.3, 1 - distance * 0.3),
                      filter: isActive ? 'blur(0px)' : `blur(${distance * 2}px)`,
                      zIndex: isActive ? 10 : 5 - distance,
                    }}
                  >
                    <div className="bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border p-8 lg:p-12 shadow-2xl">
                      {/* Interactive Component */}
                      {principle.id === 'reward-time' && <RewardCounter isActive={isActive} />}
                      {principle.id === 'delight-deception' && <DelightInteraction isActive={isActive} />}
                      {principle.id === 'scalable-design' && <ScalableGrowth isActive={isActive} />}

                      {/* Title */}
                      <h3 className="text-2xl lg:text-3xl font-bold text-center mb-6 transition-all duration-700">
                        {principle.title}
                      </h3>

                      {/* Description */}
                      <p className="text-lg text-muted-foreground text-center mb-8 leading-relaxed transition-all duration-700">
                        {principle.description}
                      </p>

                      {/* Characteristics */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {principle.characteristics.map((characteristic, charIndex) => (
                          <div
                            key={charIndex}
                            className="p-4 bg-muted/30 rounded-xl border border-border text-center transition-all duration-700"
                            style={{
                              transform: isActive ? 'translateY(0px)' : 'translateY(20px)',
                              opacity: isActive ? 1 : 0.7,
                            }}
                          >
                            <span className="text-sm font-medium">{characteristic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductPrinciples;
