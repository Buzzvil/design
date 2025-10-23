'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContactForm from '../ui/ContactForm';

const ContactBanner = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-3">
          {/* Content */}
          <div className="flex items-center space-x-3">
            <Coffee className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-foreground">
              {t('banner.title')}
            </span>
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => setIsFormOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="ml-4 flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 text-sm font-medium shadow-sm"
          >
            <Coffee className="w-4 h-4" />
            <span>Ask for a Coffee Chat!</span>
          </motion.button>
        </div>
      </div>
      
      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </motion.div>
  );
};

export default ContactBanner;
