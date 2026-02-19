'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

function buildNavItems(t: (key: string) => string) {
  return [
    {
      name: t('nav.foundations'),
      href: '/',
      sections: [
        { id: 'mission-vision', labelKey: 'nav.sections.mission' },
        { id: 'philosophy', labelKey: 'nav.sections.philosophy' },
        { id: 'values', labelKey: 'nav.sections.values' },
        { id: 'team', labelKey: 'nav.sections.team' },
        { id: 'tools', labelKey: 'nav.sections.tools' },
        { id: 'routines', labelKey: 'nav.sections.routines' },
      ],
    },
    {
      name: t('nav.brand'),
      href: '/brand',
      sections: [
        { id: 'principles', labelKey: 'brand.sections.principles' },
        { id: 'logo', labelKey: 'brand.nav.logo' },
        { id: 'colors', labelKey: 'brand.nav.colors' },
        { id: 'typography', labelKey: 'brand.nav.typography' },
        { id: 'imagery', labelKey: 'brand.nav.imagery' },
        { id: 'downloads', labelKey: 'brand.nav.downloads' },
      ],
    },
    {
      name: t('nav.product'),
      href: '/product',
      sections: [
        { id: 'principles', labelKey: 'product.sections.principles' },
        { id: 'layers', labelKey: 'product.sections.layers' },
        { id: 'chameleon', labelKey: 'product.sections.chameleon' },
        { id: 'patterns', labelKey: 'product.sections.patterns' },
        { id: 'conventions', labelKey: 'product.sections.conventions' },
      ],
    },
  ];
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const router = useRouter();
  const navItems = buildNavItems(t);

  const goToPage = (href: string) => {
    setIsMobileMenuOpen(false);
    setMobileExpandedIndex(null);
    router.push(href);
  };

  const goToSection = (item: (typeof navItems)[0], sectionId: string) => {
    const path = item.href === '/' ? '/' : item.href;
    const pathWithHash = path === '/' ? `/#${sectionId}` : `${path}#${sectionId}`;
    setIsMobileMenuOpen(false);
    setMobileExpandedIndex(null);
    router.push(pathWithHash);
  };

  return (
    <header className="page-header fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <Logo size={28} className="shrink-0 text-foreground" />
            <span className="text-lg font-extrabold text-foreground">buzzvil</span>
            <span className="text-lg font-normal text-muted-foreground">:design</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.button
                  whileHover={{ y: -1 }}
                  onClick={() => goToPage(item.href)}
                  className={`
                    relative flex items-center px-4 py-2 rounded-lg font-medium text-white transition-all duration-200
                    ${hoveredIndex === index ? 'bg-white/10 text-white' : 'hover:opacity-90'}
                  `}
                >
                  {item.name}
                </motion.button>

                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 pt-2 z-[100]"
                    >
                      <div className="bg-background/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl shadow-black/50 p-2 min-w-[11rem]">
                        <div className="space-y-0.5">
                          {item.sections.map((section) => (
                            <button
                              key={section.id}
                              onClick={() => goToSection(item, section.id)}
                              className="group relative w-full text-left px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-all duration-200"
                            >
                              <span className="relative z-10">{t(section.labelKey)}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/98 backdrop-blur-sm border-b border-border"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, index) => (
                <div key={item.name}>
                  <motion.button
                    onClick={() => {
                      const isExpanded = mobileExpandedIndex === index;
                      if (isExpanded) {
                        goToPage(item.href);
                      } else {
                        setMobileExpandedIndex(index);
                      }
                    }}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-left font-medium text-white"
                  >
                    {item.name}
                  </motion.button>
                  <AnimatePresence>
                    {mobileExpandedIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 pl-3 border-l border-white/10 space-y-0.5 py-2">
                          {item.sections.map((section) => (
                            <button
                              key={section.id}
                              onClick={() => goToSection(item, section.id)}
                              className="flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors text-left"
                            >
                              {t(section.labelKey)}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="px-4 py-3 pt-4 border-t border-border">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
