'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, X, Coffee, Calendar, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContactForm from '../ui/ContactForm';

const ContactBanner = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { t } = useLanguage();

  if (isDismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-white/10 via-white/5 to-white/10 border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Content */}
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Coffee className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-foreground">
                  {t('banner.title')}
                </span>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="w-3 h-3" />
                <span>design-team@buzzvil.com</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{t('banner.requirements.schedule')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{t('banner.requirements.info')}</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => setIsFormOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 text-sm font-medium shadow-sm"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">{t('banner.cta')}</span>
            <span className="sm:hidden">{t('banner.cta.short')}</span>
          </motion.button>

          {/* Dismiss Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDismissed(true)}
            className="ml-3 p-1 rounded-lg hover:bg-muted/50 transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        </div>

        {/* Mobile Requirements */}
        <div className="md:hidden mt-2 pb-2">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{t('banner.requirements.schedule')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>{t('banner.requirements.info')}</span>
            </div>
          </div>
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
