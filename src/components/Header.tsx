'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Award, Code } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';
import ContactBanner from './ContactBanner';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  const navItems = [
    { name: t('nav.foundations'), href: '/', icon: BookOpen },
    { name: t('nav.brand'), href: '/design/brand', icon: Award },
    { name: t('nav.product'), href: '/design/product', icon: Code },
  ];

  return (
    <>
      <ContactBanner />
      <header className="fixed top-12 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => {
              router.push('/');
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 100);
            }}
          >
            <Logo size={32} className="text-white" />
            <span className="text-lg font-semibold text-foreground">Buzzvil Design</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                whileHover={{ y: -1 }}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-150 group cursor-pointer"
                onClick={() => {
                  if (item.href === '/') {
                    // For homepage, ensure we scroll to top
                    router.push('/');
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 100);
                  } else {
                    router.push(item.href);
                  }
                }}
              >
                <item.icon className="w-4 h-4 text-white group-hover:scale-105 transition-transform duration-150" />
                <span className="font-medium">{item.name}</span>
              </motion.button>
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
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (item.href === '/') {
                      // For homepage, ensure we scroll to top
                      router.push('/');
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 100);
                    } else {
                      router.push(item.href);
                    }
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors cursor-pointer w-full text-left"
                >
                  <item.icon className="w-5 h-5 text-white" />
                  <span className="font-medium">{item.name}</span>
                </motion.button>
              ))}
              <div className="px-4 py-3">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
