'use client';

import { useState, useEffect, useRef } from 'react';
import { Clock, Sparkles, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
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

  // Auto-scroll to active principle tab
  useEffect(() => {
    if (principlesNavRef.current) {
      const activeButton = principlesNavRef.current.children[selectedPrinciple] as HTMLElement;
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedPrinciple]);

  return (
    <section ref={principlesSectionRef} className="py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {t('principles.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('principles.subtitle')}
          </p>
        </div>

        {/* Principle Navigation */}
        <div className="flex justify-center mb-12 px-4">
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
        </div>

        {/* Principle Content with Enhanced 3D Transitions */}
        <div className="max-w-4xl mx-auto">
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
                    <div className="bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border p-12 shadow-2xl">
                      {/* Interactive Component */}
                      {principle.id === 'reward-time' && <RewardCounter isActive={isActive} />}
                      {principle.id === 'delight-deception' && <DelightInteraction isActive={isActive} />}
                      {principle.id === 'scalable-design' && <ScalableGrowth isActive={isActive} />}

                      {/* Title */}
                      <h3 className="text-4xl md:text-5xl font-bold text-center mb-6 transition-all duration-700">
                        {principle.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xl text-muted-foreground text-center mb-8 leading-relaxed transition-all duration-700">
                        {principle.description}
                      </p>

                      {/* Characteristics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        </div>
      </div>
    </section>
  );
};

export default ProductPrinciples;
