'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import LivePreview from './LivePreview';
import CodePreview from './CodePreview';

interface InteractionPattern {
  id: string;
  title: string;
  description: string;
  tags: string[];
  code?: string;
}

interface PatternAccordionProps {
  patterns: InteractionPattern[];
  className?: string;
}

const PatternAccordion = ({ patterns, className = '' }: PatternAccordionProps) => {
  const [openPattern, setOpenPattern] = useState<string | null>(null);

  const handlePatternToggle = (patternId: string) => {
    setOpenPattern(openPattern === patternId ? null : patternId);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {patterns.map((pattern, patternIndex) => (
        <motion.div
          key={pattern.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: patternIndex * 0.05 }}
          viewport={{ once: true }}
          className="bg-muted/10 border border-border/50 rounded-lg overflow-hidden"
        >
          {/* Pattern Header */}
          <button
            onClick={() => handlePatternToggle(pattern.id)}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/20 transition-colors"
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
                        <CodePreview
                          code={pattern.code}
                          patternId={pattern.id}
                        />
                      )}
                    </div>

                    {/* Right Column - Live Preview */}
                    <LivePreview title={pattern.title} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default PatternAccordion;
