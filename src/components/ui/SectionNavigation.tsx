'use client';

import { useState, useEffect } from 'react';

interface SectionNavigationProps {
  sections: Array<{
    id: string;
    label: string;
  }>;
  className?: string;
}

export default function SectionNavigation({ sections, className = '' }: SectionNavigationProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || '');

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = sections[0]?.id || '';
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            currentSection = section.id;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

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
      <nav className={`md:hidden fixed bottom-4 left-4 right-4 z-40 ${className}`}>
        <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-lg shadow-lg p-2">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
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
