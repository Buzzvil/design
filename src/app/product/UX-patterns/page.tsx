'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { MousePointer, Smartphone, ChevronDown, CheckCircle, XCircle, ArrowLeft, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SectionNavigation from '@/components/ui/SectionNavigation';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { BlurReveal } from '@/components/ui/BlurReveal';

const UXPatternsPage = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [openPattern, setOpenPattern] = useState<string | null>(null);
  const [copiedPattern, setCopiedPattern] = useState<string | null>(null);

  const handlePatternToggle = (patternId: string) => {
    setOpenPattern(openPattern === patternId ? null : patternId);
  };

  const handleCopyCode = async (patternId: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedPattern(patternId);
      setTimeout(() => setCopiedPattern(null), 3000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const sections = [
    { id: 'interaction-patterns', label: 'Interaction Patterns' },
    { id: 'ui-kit', label: 'UI Kit' },
    { id: 'micro-interactions', label: 'Micro-interactions' }
  ];

  const interactionPatterns = [
    {
      id: 'onLoad',
      title: 'While loading',
      description: 'Skeleton screens, loading states, and progressive disclosure patterns that keep users engaged during wait times.',
      tags: ['Skeleton UI', 'Loading States', 'Progressive Disclosure'],
      code: `// Skeleton Loading Component
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

// Usage
{isLoading ? <SkeletonCard /> : <ActualContent />}`
    },
    {
      id: 'onScroll',
      title: 'Page Scroll',
      description: 'Default vertical scrolling as the primary interaction pattern, with parallax and reveal animations.',
      tags: ['Vertical Scroll', 'Parallax', 'Reveal Animations'],
      code: `// Scroll-triggered Animation
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('target');
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return isVisible;
};`
    },
    {
      id: 'notify',
      title: 'Notify',
      description: 'Toast notifications, banners, and system messages that provide feedback without interrupting user flow.',
      tags: ['Toast', 'Banner', 'System Messages'],
      code: `// Toast Notification Hook
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };
  
  return { toasts, showToast };
};`
    },
    {
      id: 'alert',
      title: 'Alert',
      description: 'Critical notifications and warnings that require immediate user attention and action.',
      tags: ['Critical Alerts', 'Warnings', 'User Attention'],
      code: `// Alert Modal Component
const AlertModal = ({ isOpen, onClose, title, message, type }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{message}</p>
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">
          Dismiss
        </button>
      </div>
    </div>
  );
};`
    },
    {
      id: 'pauseAsk',
      title: 'Pause & Ask',
      description: 'Modal dialogs and popups that pause user flow to gather information or confirm actions.',
      tags: ['Modal', 'Popup', 'Confirmation'],
      code: `// Confirmation Dialog
const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
        <p className="mb-4">{message}</p>
        <div className="flex space-x-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2 border rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-blue-500 text-white rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};`
    },
    {
      id: 'magnify',
      title: 'Magnify',
      description: 'Bottom sheets and expandable content that provides detailed information without leaving the current context.',
      tags: ['Bottom Sheet', 'Expandable', 'Detail View'],
      code: `// Bottom Sheet Component
const BottomSheet = ({ isOpen, onClose, children }) => {
  return (
    <div className={\`fixed inset-0 z-50 \${isOpen ? 'block' : 'hidden'}\`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl max-h-96 overflow-y-auto">
        <div className="w-12 h-1 bg-gray-300 rounded mx-auto mt-2 mb-4" />
        {children}
      </div>
    </div>
  );
};`
    },
    {
      id: 'screenToScreen',
      title: 'Screen to Screen',
      description: 'Navigation patterns and transitions between different screens and sections of the application.',
      tags: ['Navigation', 'Transitions', 'Screen Flow'],
      code: `// Page Transition Hook
const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const navigateWithTransition = (path) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      router.push(path);
      setIsTransitioning(false);
    }, 300);
  };
  
  return { isTransitioning, navigateWithTransition };
};`
    },
    {
      id: 'feedback',
      title: 'Feedback',
      description: 'Touch, swipe, and gesture-based interactions that provide immediate visual and haptic feedback.',
      tags: ['Touch', 'Swipe', 'Gestures', 'Haptic'],
      code: `// Touch Feedback Hook
const useTouchFeedback = () => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleTouchStart = () => {
    setIsPressed(true);
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };
  
  const handleTouchEnd = () => {
    setIsPressed(false);
  };
  
  return { isPressed, handleTouchStart, handleTouchEnd };
};`
    },
    {
      id: 'moreToCome',
      title: 'More to come',
      description: 'Additional interaction patterns are continuously being developed and refined based on user needs.',
      tags: ['Coming Soon', 'Development', 'User Needs'],
      code: `// Coming Soon Placeholder
const ComingSoonPattern = () => (
  <div className="text-center py-8">
    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
      <Plus className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-600 mb-2">
      New Pattern Coming Soon
    </h3>
    <p className="text-gray-500">
      We&apos;re constantly developing new interaction patterns based on user needs.
    </p>
  </div>
);`
    }
  ];

  return (
    <main className="min-h-screen relative">
      <Header />
      
      <SectionNavigation sections={sections} />
      
      {/* Back Button */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-muted-foreground hover:text-white transition-colors mb-8"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Guidelines</span>
          </motion.button>
        </div>
      </div>

      {/* Intro Screen */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <MousePointer className="w-16 h-16 text-white mx-auto mb-6" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
          >
            UX Patterns
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            {t('product.guidelines.uxPatterns.description')}
          </motion.p>
        </div>
      </section>

      <div id="interaction-patterns" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <BlurReveal>
                <SectionTitle>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Interaction Patterns
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    {t('product.guidelines.uxPatterns.description')}
                  </p>
                </SectionTitle>
              </BlurReveal>
            </motion.div>

            {/* Best Practices & Dark Patterns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {/* Best Practices */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h3 className="text-lg font-semibold text-white">
                    {t('product.guidelines.interactionPatterns.bestPractices')}
                  </h3>
                </div>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                  {t('product.guidelines.interactionPatterns.bestPractices.content')}
                </div>
              </motion.div>

              {/* Dark Patterns */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <XCircle className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-semibold text-white">
                    {t('product.guidelines.interactionPatterns.darkPatterns')}
                  </h3>
                </div>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                  {t('product.guidelines.interactionPatterns.darkPatterns.content')}
                </div>
              </motion.div>
            </div>

            {/* Interaction Patterns Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              {interactionPatterns.map((pattern, patternIndex) => (
                <motion.div
                  key={pattern.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: patternIndex * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-muted/10 border border-border/50 rounded-lg overflow-hidden hover:bg-muted/20 transition-colors"
                >
                  {/* Pattern Header */}
                  <button
                    onClick={() => handlePatternToggle(pattern.id)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/10 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-white">
                        {pattern.title}
                      </h4>
                    </div>
                    <motion.div
                      animate={{ rotate: openPattern === pattern.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  </button>

                  {/* Pattern Content */}
                  <AnimatePresence>
                    {openPattern === pattern.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column - Description, Tags, and Code */}
                            <div className="space-y-4">
                              {/* Description */}
                              <div className="space-y-3">
                                <h5 className="text-sm font-medium text-white">
                                  Description
                                </h5>
                                <p className="text-muted-foreground leading-relaxed text-sm">
                                  {pattern.description}
                                </p>
                                
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {pattern.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {/* Code Preview */}
                              {pattern.code && (
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <h5 className="text-sm font-medium text-white">
                                      Code Example
                                    </h5>
                                    <motion.button
                                      onClick={() => handleCopyCode(pattern.id, pattern.code)}
                                      className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-white transition-colors"
                                      whileTap={{ scale: 0.95 }}
                                    >
                                      <Copy className="w-3 h-3" />
                                      <span>{copiedPattern === pattern.id ? 'Copied!' : 'Copy'}</span>
                                    </motion.button>
                                  </div>
                                  <div className="bg-muted/10 border border-border/50 rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-xs text-muted-foreground font-mono leading-relaxed">
                                      <code>{pattern.code}</code>
                                    </pre>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Right Column - Live Preview */}
                            <div className="space-y-3">
                              <h5 className="text-sm font-medium text-white">
                                Live Preview
                              </h5>
                              <div className="flex justify-center">
                                {/* Mobile Frame with 9:16 ratio (vertical phone) */}
                                <div className="w-[200px] bg-black rounded-[1.5rem] p-1 shadow-2xl">
                                  <div className="bg-muted/20 rounded-[1.25rem] h-[400px] flex items-center justify-center" style={{ aspectRatio: '9/16' }}>
                                    <div className="text-center space-y-3 px-4">
                                      <Smartphone className="w-8 h-8 text-muted-foreground mx-auto" />
                                      <p className="text-sm text-muted-foreground break-words font-medium">
                                        {pattern.title}
                                      </p>
                                      <p className="text-xs text-muted-foreground/70">
                                        Preview coming soon
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      <div id="ui-kit" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <BlurReveal>
                <SectionTitle>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    UI Kit
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    From atoms to modules to views - our comprehensive design system components.
                  </p>
                </SectionTitle>
              </BlurReveal>
            </motion.div>

            {/* UI Kit Structure */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { level: 'Atoms', description: 'Basic building blocks like buttons, inputs, and icons', color: 'from-blue-500/10 to-blue-600/5', borderColor: 'border-blue-500/20' },
                { level: 'Molecules', description: 'Simple combinations of atoms like form fields and search bars', color: 'from-green-500/10 to-green-600/5', borderColor: 'border-green-500/20' },
                { level: 'Organisms', description: 'Complex UI components like headers, sidebars, and cards', color: 'from-purple-500/10 to-purple-600/5', borderColor: 'border-purple-500/20' },
                { level: 'Templates', description: 'Page-level layouts and wireframes without content', color: 'from-orange-500/10 to-orange-600/5', borderColor: 'border-orange-500/20' },
                { level: 'Pages', description: 'Specific instances of templates with real content', color: 'from-pink-500/10 to-pink-600/5', borderColor: 'border-pink-500/20' },
                { level: 'More to come', description: 'Additional components and patterns as we grow', color: 'from-gray-500/10 to-gray-600/5', borderColor: 'border-gray-500/20' }
              ].map((item, index) => (
                <motion.div
                  key={item.level}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br ${item.color} border ${item.borderColor} rounded-xl p-6 hover:scale-105 transition-transform duration-300`}
                >
                  <h3 className="text-lg font-semibold text-white mb-3">{item.level}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div id="micro-interactions" className="scroll-mt-24">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <BlurReveal>
                <SectionTitle>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Micro-interactions
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Delightful details that bring our interfaces to life.
                  </p>
                </SectionTitle>
              </BlurReveal>
            </motion.div>

            {/* Micro-interactions Examples */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Living Icons', 
                  description: 'Icons that respond to user actions with subtle animations and state changes',
                  example: 'Button hover states, loading spinners, and interactive icons',
                  color: 'from-cyan-500/10 to-cyan-600/5',
                  borderColor: 'border-cyan-500/20'
                },
                { 
                  title: 'Emphasis On', 
                  description: 'Visual emphasis through scale, color, and motion to guide user attention',
                  example: 'Focus states, selection highlights, and call-to-action animations',
                  color: 'from-yellow-500/10 to-yellow-600/5',
                  borderColor: 'border-yellow-500/20'
                },
                { 
                  title: 'Reward Delights', 
                  description: 'Celebratory animations that provide positive feedback for user actions',
                  example: 'Success animations, achievement unlocks, and completion celebrations',
                  color: 'from-emerald-500/10 to-emerald-600/5',
                  borderColor: 'border-emerald-500/20'
                },
                { 
                  title: 'More to come', 
                  description: 'Additional micro-interaction patterns as we discover new ways to delight users',
                  example: 'Gesture feedback, haptic responses, and contextual animations',
                  color: 'from-gray-500/10 to-gray-600/5',
                  borderColor: 'border-gray-500/20'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br ${item.color} border ${item.borderColor} rounded-xl p-6 hover:scale-105 transition-transform duration-300`}
                >
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.description}</p>
                  <p className="text-muted-foreground/70 text-xs italic">{item.example}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default UXPatternsPage;