'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, Award, Code, ChevronDown, MousePointer, Eye, Workflow } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductSubmenuOpen, setIsProductSubmenuOpen] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  const navItems = [
    { name: t('nav.foundations'), href: '/', icon: BookOpen },
    { name: t('nav.brand'), href: '/brand', icon: Award },
    { 
      name: t('nav.product'), 
      href: '/product', 
      icon: Code,
      hasSubmenu: true,
      submenuItems: [
        { name: t('product.sections.principles'), href: '/product#principles' },
        { name: t('product.sections.guidelines'), href: '/product#guidelines' },
        { name: t('product.sections.resources'), href: '/product#resources' },
        { name: 'UX Patterns', href: '/product/UX-patterns', icon: MousePointer },
        { name: 'Visual Patterns', href: '/product/visual-patterns', icon: Eye },
        { name: 'Workflow & Rituals', href: '/product/workflow-rituals', icon: Workflow },
      ]
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => {
              router.push('/');
            }}
          >
            <Logo size={32} className="text-white" />
            <span className="text-lg font-semibold text-foreground">Buzzvil Design</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative">
                {item.hasSubmenu ? (
                  <div
                    onMouseEnter={() => setIsProductSubmenuOpen(true)}
                    onMouseLeave={() => setIsProductSubmenuOpen(false)}
                    className="relative"
                  >
                    <motion.button
                      whileHover={{ y: -1 }}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-150 group cursor-pointer"
                      onClick={() => {
                        router.push(item.href);
                      }}
                    >
                      <item.icon className="w-4 h-4 text-white group-hover:scale-105 transition-transform duration-150" />
                      <span className="font-medium">{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProductSubmenuOpen ? 'rotate-180' : ''}`} />
                    </motion.button>
                    
                    {/* Submenu */}
                    <AnimatePresence>
                      {isProductSubmenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-background/98 backdrop-blur-sm border border-border rounded-lg shadow-xl z-50"
                        >
                          <div className="py-2">
                            {item.submenuItems?.map((subItem, subIndex) => (
                              <motion.button
                                key={subItem.name}
                                whileHover={{ x: 4 }}
                                onClick={() => {
                                  router.push(subItem.href);
                                  setIsProductSubmenuOpen(false);
                                }}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-accent transition-colors"
                              >
                                {subItem.icon && <subItem.icon className="w-4 h-4 text-muted-foreground" />}
                                <span className={`font-medium ${subItem.icon ? 'text-muted-foreground' : 'text-foreground pl-7'}`}>
                                  {subItem.name}
                                </span>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ y: -1 }}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-150 group cursor-pointer"
                    onClick={() => {
                      router.push(item.href);
                    }}
                  >
                    <item.icon className="w-4 h-4 text-white group-hover:scale-105 transition-transform duration-150" />
                    <span className="font-medium">{item.name}</span>
                  </motion.button>
                )}
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
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <div key={item.name}>
                  {item.hasSubmenu ? (
                    <div>
                      <motion.button
                        onClick={() => {
                          setIsProductSubmenuOpen(!isProductSubmenuOpen);
                        }}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-accent transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5 text-white" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProductSubmenuOpen ? 'rotate-180' : ''}`} />
                      </motion.button>
                      
                      <AnimatePresence>
                        {isProductSubmenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-6 space-y-1">
                              {item.submenuItems?.map((subItem, subIndex) => (
                                <motion.button
                                  key={subItem.name}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsProductSubmenuOpen(false);
                                    router.push(subItem.href);
                                  }}
                                  className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors cursor-pointer w-full text-left"
                                >
                                  {subItem.icon && <subItem.icon className="w-4 h-4 text-muted-foreground" />}
                                  <span className={`font-medium text-sm ${subItem.icon ? 'text-muted-foreground' : 'text-foreground'}`}>
                                    {subItem.name}
                                  </span>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push(item.href);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors cursor-pointer w-full text-left"
                    >
                      <item.icon className="w-5 h-5 text-white" />
                      <span className="font-medium">{item.name}</span>
                    </motion.button>
                  )}
                </div>
              ))}
              <div className="px-4 py-3">
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
