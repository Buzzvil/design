'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Heart, Figma } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContactBanner from './ContactBanner';
import Logo from './Logo';

const Footer = () => {
  const { t } = useLanguage();
  
  const footerLinks = {
    'Foundations': [
      { name: t('footer.foundations.mission'), href: '#mission-vision' },
      { name: t('footer.foundations.philosophy'), href: '#philosophy' },
      { name: t('footer.foundations.values'), href: '#values' },
      { name: t('footer.foundations.team'), href: '#team' },
      { name: t('footer.foundations.tools'), href: '#tools' },
    ],
    'Brand': [
      { name: t('footer.brand.principles'), href: '/brand#principles' },
      { name: t('footer.brand.guidelines'), href: '/brand#guidelines' },
      { name: t('footer.brand.resources'), href: '/brand#resources' },
    ],
    'Product': [
      { name: t('footer.product.principles'), href: '/product#principles' },
      { name: t('footer.product.guidelines'), href: '/product#guidelines' },
      { name: t('footer.product.resources'), href: '/product#resources' },
    ],
    'Connect': [
      { name: 'Buzzvil', href: 'https://www.buzzvil.com/en' },
      { name: 'Careers', href: 'https://buzzvil.career.greetinghr.com/ko/home' },
      { name: 'Figma', href: 'https://www.figma.com/@buzzvil' },
      { name: 'GitHub', href: 'https://github.com/Buzzvil/design' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/company/buzzvil/' },
    ],
  };

  const socialLinks = [
    { name: 'Email', href: 'mailto:design-team@buzzvil.com', icon: Mail },
    { name: 'Figma', href: 'https://www.figma.com/@buzzvil', icon: Figma },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/buzzvil/', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/Buzzvil/design', icon: Github },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <>
      <ContactBanner />
      <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Logo size={32} className="text-white" />
              <span className="text-xl font-bold gradient-text">Design Buzzvil</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Home to Buzzvil&apos;s design source of truth. We build in the open. This portal is primarily meant to be used internally and by our partners, but we also like anyone to have a look at how we work!
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors group"
                >
                  <social.icon className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={itemVariants}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 4 }}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 text-muted-foreground text-sm mb-4 md:mb-0">
              <span>{t('footer.made')}</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-white" />
              </motion.div>
              <span>{t('footer.by')}</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                {t('footer.terms')}
              </a>
              <span>© 2024 Buzzvil. All rights reserved.</span>
            </div>
          </div>
        </motion.div>
      </div>
      </footer>
    </>
  );
};

export default Footer;
