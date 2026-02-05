'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from '../ui/BlurReveal';
import { SectionTitle } from '../ui/SectionTitle';

const ProductPrinciples = () => {
  const { t } = useLanguage();
  const [selectedPrinciple, setSelectedPrinciple] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPrinciplesInView, setIsPrinciplesInView] = useState(false);
  const principlesIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const principlesSectionRef = useRef<HTMLDivElement>(null);
  const principlesNavRef = useRef<HTMLDivElement>(null);

  const getTranslatedPrinciples = () => [
    {
      id: 'simple',
      shortTitle: t('product.principles.simple.shortTitle'),
      title: t('product.principles.simple.title'),
      description: t('product.principles.simple.description'),
      alignmentQuestion: t('product.principles.simple.alignmentQuestion'),
    },
    {
      id: 'iconic',
      shortTitle: t('product.principles.iconic.shortTitle'),
      title: t('product.principles.iconic.title'),
      description: t('product.principles.iconic.description'),
      alignmentQuestion: t('product.principles.iconic.alignmentQuestion'),
    },
    {
      id: 'delightful',
      shortTitle: t('product.principles.delightful.shortTitle'),
      title: t('product.principles.delightful.title'),
      description: t('product.principles.delightful.description'),
      alignmentQuestion: t('product.principles.delightful.alignmentQuestion'),
    },
    {
      id: 'purposeful',
      shortTitle: t('product.principles.purposeful.shortTitle'),
      title: t('product.principles.purposeful.title'),
      description: t('product.principles.purposeful.description'),
      alignmentQuestion: t('product.principles.purposeful.alignmentQuestion'),
    },
    {
      id: 'trustworthy',
      shortTitle: t('product.principles.trustworthy.shortTitle'),
      title: t('product.principles.trustworthy.title'),
      description: t('product.principles.trustworthy.description'),
      alignmentQuestion: t('product.principles.trustworthy.alignmentQuestion'),
    },
  ];

  const translatedPrinciples = getTranslatedPrinciples();

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

  useEffect(() => {
    if (!isHovered && isPrinciplesInView) {
      principlesIntervalRef.current = setInterval(() => {
        setSelectedPrinciple((prev) => (prev + 1) % translatedPrinciples.length);
      }, 5000);
    }

    return () => {
      if (principlesIntervalRef.current) clearInterval(principlesIntervalRef.current);
    };
  }, [isHovered, isPrinciplesInView, translatedPrinciples.length]);

  useEffect(() => {
    if (principlesNavRef.current && isHovered) {
      const activeButton = principlesNavRef.current.children[selectedPrinciple] as HTMLElement;
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [selectedPrinciple, isHovered]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isPrinciplesInView) return;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          setSelectedPrinciple((prev) =>
            prev === 0 ? translatedPrinciples.length - 1 : prev - 1
          );
          break;
        case 'ArrowRight':
          event.preventDefault();
          setSelectedPrinciple((prev) => (prev + 1) % translatedPrinciples.length);
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
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={principlesSectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
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
                {t('principles.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('principles.subtitle')}
              </p>
            </SectionTitle>
          </BlurReveal>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center mb-12 px-4">
          <div className="overflow-x-auto scrollbar-hide bg-muted/30 p-2 rounded-xl max-w-lg">
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
                  className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 text-sm whitespace-nowrap flex-shrink-0 ${
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

        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto px-4"
        >
          <div
            className="relative overflow-hidden perspective-1000 w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="flex transition-all duration-700 ease-out w-full"
              style={{
                transform: `translateX(-${selectedPrinciple * 100}%)`,
                transformStyle: 'preserve-3d',
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
                      minWidth: 0,
                      maxWidth: '100%',
                    }}
                  >
                    <div className="bg-gradient-to-br from-background to-muted/20 rounded-2xl border border-border p-8 lg:p-12 shadow-2xl w-full overflow-hidden">
                      <h3 className="text-2xl lg:text-3xl font-bold text-center mb-6 transition-all duration-700 uppercase tracking-wider">
                        {principle.title}
                      </h3>

                      <p className="text-lg text-muted-foreground text-center mb-8 leading-relaxed transition-all duration-700">
                        {principle.description}
                      </p>

                      <div className="border-t border-border pt-6">
                        <p className="text-sm font-mono text-muted-foreground text-center italic">
                          {t('product.principles.alignmentQuestionLabel')}
                        </p>
                        <p className="text-base text-foreground text-center mt-2 font-medium">
                          &ldquo;{principle.alignmentQuestion}&rdquo;
                        </p>
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
