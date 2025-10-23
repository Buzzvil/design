'use client';

import { useState, useEffect, useRef } from 'react';

interface SectionNavigationProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
  className?: string;
}

export default function SectionNavigation({ sections, className = '' }: SectionNavigationProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');
  const [isInFooter, setIsInFooter] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = sections[0]?.id || '';
      let foundSection = false;
      
      // Check if we're in the footer area or leaving the last section
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const footerThreshold = documentHeight - windowHeight - 100; // 100px before footer
      
      // Also check if we're past the last section
      const lastSection = sections[sections.length - 1];
      let pastLastSection = false;
      if (lastSection) {
        const lastSectionElement = document.getElementById(lastSection.id);
        if (lastSectionElement) {
          const lastSectionRect = lastSectionElement.getBoundingClientRect();
          pastLastSection = lastSectionRect.bottom < windowHeight * 0.3; // 30% from top
        }
      }
      
      const inFooter = scrollPosition > footerThreshold || pastLastSection;
      setIsInFooter(inFooter);
      
      // If we're in footer, keep the last section active or hide navigation
      if (inFooter) {
        currentSection = sections[sections.length - 1]?.id || sections[0]?.id || '';
        foundSection = true;
      } else {
        // Normal section detection
        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
              currentSection = section.id;
              foundSection = true;
            }
          }
        }
      }
      
      // Only update if we found a section or we're in footer
      if (foundSection || inFooter) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Auto-scroll mobile navigation to keep active section in view
  useEffect(() => {
    if (!mobileNavRef.current) return;

    const activeIndex = sections.findIndex(section => section.id === activeSection);
    if (activeIndex === -1) return;

    const container = mobileNavRef.current;
    const activeButton = container.children[activeIndex] as HTMLElement;
    
    if (activeButton) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      // Calculate if button is fully visible
      const isFullyVisible = 
        buttonRect.left >= containerRect.left && 
        buttonRect.right <= containerRect.right;
      
      if (!isFullyVisible) {
        // Scroll to center the active button
        const scrollLeft = activeButton.offsetLeft - (container.offsetWidth / 2) + (activeButton.offsetWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeSection, sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden md:block fixed top-20 right-4 z-40 ${className}`}>
        <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-lg shadow-lg p-3 transition-all duration-300 hover:bg-white/4">
          <div className="space-y-0.5 w-40">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  group relative w-full text-left px-3 py-2 rounded-md transition-all duration-200 ease-out
                  ${activeSection === section.id 
                    ? 'bg-gradient-to-r from-white/10 to-white/5 text-white' 
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }
                  hover:scale-[1.01] active:scale-[0.99]
                `}
                style={{
                  transitionDelay: `${index * 30}ms`
                }}
              >
                {/* White dot indicator */}
                <div 
                  className={`
                    absolute left-2 top-1/2 -translate-y-1/2 w-1 h-1 bg-white/40 rounded-full
                    transition-all duration-200 ease-out
                    ${activeSection === section.id 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-0'
                    }
                  `}
                />
                
                <span className="relative z-10 text-sm font-medium ml-2">
                  {section.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Horizontal Scroll */}
      <nav className={`md:hidden fixed left-4 right-4 z-40 transition-all duration-500 ease-in-out ${isInFooter ? 'bottom-[-100px] opacity-0 pointer-events-none' : 'bottom-4 opacity-100'} ${className}`}>
        <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-lg shadow-lg p-2">
          <div ref={mobileNavRef} className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-md transition-all duration-200 ease-out whitespace-nowrap
                  ${activeSection === section.id 
                    ? 'bg-gradient-to-r from-white/10 to-white/5 text-white' 
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }
                  hover:scale-[1.02] active:scale-[0.98]
                `}
                style={{
                  transitionDelay: `${index * 30}ms`
                }}
              >
                <span className="text-sm font-medium">
                  {section.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
