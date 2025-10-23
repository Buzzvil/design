'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const BUZZVIL_VALUES = [
  {
    id: 'build-open',
    title: 'Build in the Open',
    shortTitle: 'Build in the Open',
    description: 'We start rough, share early, and iterate fast. Every designer has access to AI tools that accelerate exploration. Feedback and quick loops help us refine ideas into solid, production-ready solutions.',
    tagline: 'iterate fast.',
    colors: ['#FF6B35', '#FFD700', '#FFE135', '#FF8C00'],
    characteristics: ['Rapid Prototyping', 'AI-Powered Exploration', 'Early Sharing', 'Quick Iteration']
  },
  {
    id: 'clarity-feedback',
    title: 'Clarity Through Feedback',
    shortTitle: 'Be Crystal Clear',
    description: 'We communicate with candor and precision. Feedback is how we grow: giving it clearly, receiving it openly, and applying it constructively. Clear communication builds trust and avoids wasted effort.',
    tagline: 'Clarity first, feedback always.',
    colors: ['#F0F8FF', '#E6E6FA', '#FFFFFF', '#B0C4DE'],
    characteristics: ['Candor & Precision', 'Open Communication', 'Constructive Growth', 'Trust Building']
  },
  {
    id: 'design-grit',
    title: 'Own it, Ship It',
    shortTitle: 'Own it, Ship It',
    description: 'Designers don\'t just stop at drafts. We take ownership of user stories and projects, pushing them from first sketches through to production. We lead with persistence and craft until the outcome is real.',
    tagline: 'Grit.',
    colors: ['#8B0000', '#DC143C', '#B22222', '#FF4500'],
    characteristics: ['Full Ownership', 'End-to-End Delivery', 'Persistence', 'Production Focus']
  },
  {
    id: 'bold-explorers',
    title: 'Bold Explorers',
    shortTitle: 'Explorers',
    description: 'We embrace research, experimentation, and AI adoption as core to our craft. With powerful tools and a culture of inquiry, we have no excuse not to explore widely, validate rigorously, and design with confidence.',
    tagline: 'Explore boldly, research deeply.',
    colors: ['#4A90E2', '#7B68EE', '#9370DB', '#8A2BE2'],
    characteristics: ['Research-Driven', 'AI Adoption', 'Wide Exploration', 'Rigorous Validation']
  },
  {
    id: 'one-ux',
    title: 'One-UX',
    shortTitle: 'One-UX',
    description: 'We align as a design team before we scale out. That means syncing often, sharing conventions, and applying consistent practices. Our alignment ensures partners, users, and advertisers experience Buzzvil design as one coherent system.',
    tagline: 'Align first, scale together.',
    colors: ['#2E8B57', '#3CB371', '#20B2AA', '#00CED1'],
    characteristics: ['Team Alignment', 'Shared Conventions', 'Consistent Practices', 'Coherent System']
  }
];

const Values = () => {
  const { t } = useLanguage();
  const [selectedValue, setSelectedValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isValuesInView, setIsValuesInView] = useState(false);
  const valuesSectionRef = useRef<HTMLDivElement>(null);
  const valuesNavRef = useRef<HTMLDivElement>(null);
  const valuesIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get translated values
  const getTranslatedValues = () => [
    {
      id: 'build-open',
      title: t('values.build.title'),
      shortTitle: t('values.build.shortTitle'),
      description: t('values.build.content'),
      tagline: t('values.build.tagline'),
      colors: ['#FF6B35', '#FFD700', '#FFE135', '#FF8C00'],
      characteristics: [
        t('values.build.characteristics.0'),
        t('values.build.characteristics.1'),
        t('values.build.characteristics.2'),
        t('values.build.characteristics.3')
      ]
    },
    {
      id: 'clarity-feedback',
      title: t('values.clarity.title'),
      shortTitle: t('values.clarity.shortTitle'),
      description: t('values.clarity.content'),
      tagline: t('values.clarity.tagline'),
      colors: ['#F0F8FF', '#E6E6FA', '#FFFFFF', '#B0C4DE'],
      characteristics: [
        t('values.clarity.characteristics.0'),
        t('values.clarity.characteristics.1'),
        t('values.clarity.characteristics.2'),
        t('values.clarity.characteristics.3')
      ]
    },
    {
      id: 'design-grit',
      title: t('values.grit.title'),
      shortTitle: t('values.grit.shortTitle'),
      description: t('values.grit.content'),
      tagline: t('values.grit.tagline'),
      colors: ['#8B0000', '#DC143C', '#B22222', '#FF4500'],
      characteristics: [
        t('values.grit.characteristics.0'),
        t('values.grit.characteristics.1'),
        t('values.grit.characteristics.2'),
        t('values.grit.characteristics.3')
      ]
    },
    {
      id: 'bold-explorers',
      title: t('values.explore.title'),
      shortTitle: t('values.explore.shortTitle'),
      description: t('values.explore.content'),
      tagline: t('values.explore.tagline'),
      colors: ['#4A90E2', '#7B68EE', '#9370DB', '#8A2BE2'],
      characteristics: [
        t('values.explore.characteristics.0'),
        t('values.explore.characteristics.1'),
        t('values.explore.characteristics.2'),
        t('values.explore.characteristics.3')
      ]
    },
    {
      id: 'one-ux',
      title: t('values.team.title'),
      shortTitle: t('values.team.shortTitle'),
      description: t('values.team.content'),
      tagline: t('values.team.tagline'),
      colors: ['#2E8B57', '#3CB371', '#20B2AA', '#00CED1'],
      characteristics: [
        t('values.team.characteristics.0'),
        t('values.team.characteristics.1'),
        t('values.team.characteristics.2'),
        t('values.team.characteristics.3')
      ]
    }
  ];

  const translatedValues = getTranslatedValues();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === valuesSectionRef.current) {
            setIsValuesInView(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (valuesSectionRef.current) observer.observe(valuesSectionRef.current);

    return () => {
      if (valuesSectionRef.current) observer.unobserve(valuesSectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isHovered && isValuesInView) {
      valuesIntervalRef.current = setInterval(() => {
        setSelectedValue(prev => (prev + 1) % translatedValues.length);
      }, 5000);
    }

    return () => {
      if (valuesIntervalRef.current) clearInterval(valuesIntervalRef.current);
    };
  }, [isHovered, isValuesInView, translatedValues.length]);

  useEffect(() => {
    if (valuesNavRef.current) {
      const activeButton = valuesNavRef.current.children[selectedValue] as HTMLElement;
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [selectedValue]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isValuesInView) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          setSelectedValue(prev => prev === 0 ? translatedValues.length - 1 : prev - 1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          setSelectedValue(prev => (prev + 1) % translatedValues.length);
          break;
        case 'Home':
          event.preventDefault();
          setSelectedValue(0);
          break;
        case 'End':
          event.preventDefault();
          setSelectedValue(translatedValues.length - 1);
          break;
      }
    };

    if (isValuesInView) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isValuesInView, translatedValues.length]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" ref={valuesSectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {t('values.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('values.subtitle')}
          </p>
        </div>

        {/* Value Navigation */}
        <div className="flex justify-center mb-12 px-4">
          <div className="overflow-x-auto scrollbar-hide bg-muted/30 p-2 rounded-xl max-w-full">
            <div 
              ref={valuesNavRef}
              className="flex gap-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {translatedValues.map((value, index) => (
                <button
                  key={value.id}
                  onClick={() => setSelectedValue(index)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm whitespace-nowrap ${
                    selectedValue === index
                      ? 'bg-white text-black'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {value.shortTitle}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Value Content with Enhanced 3D Transitions */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative overflow-hidden perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className="flex transition-all duration-700 ease-out"
              style={{ 
                transform: `translateX(-${selectedValue * 100}%)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {translatedValues.map((value, index) => {
                const isActive = index === selectedValue;
                const distance = Math.abs(index - selectedValue);
                
                return (
                  <div
                    key={value.id}
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
                      {/* Color Palette */}
                      <div className="flex justify-center mb-8">
                        {value.colors.map((color, colorIndex) => (
                          <div
                            key={colorIndex}
                            className="w-12 h-12 rounded-full border-2 border-border shadow-lg transition-all duration-700"
                            style={{ 
                              backgroundColor: color,
                              transform: isActive ? 'scale(1)' : 'scale(0.8)',
                              opacity: isActive ? 1 : 0.6,
                              marginLeft: colorIndex > 0 ? '-6px' : '0px',
                              zIndex: value.colors.length - colorIndex,
                            }}
                          />
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="text-4xl md:text-5xl font-bold text-center mb-4 transition-all duration-700">
                        {value.title}
                      </h3>

                      {/* Tagline */}
                      <p className="text-lg text-accent font-medium text-center mb-6 transition-all duration-700">
                        {value.tagline}
                      </p>

                      {/* Description */}
                      <p className="text-xl text-muted-foreground text-center mb-8 leading-relaxed transition-all duration-700">
                        {value.description}
                      </p>

                      {/* Characteristics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {value.characteristics.map((characteristic, charIndex) => (
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

export default Values;
