'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ko' : 'en');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-200"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-white" />
      <span className="text-sm font-medium text-foreground">
        {language === 'en' ? '한국어' : 'English'}
      </span>
    </motion.button>
  );
};

export default LanguageSwitcher;
