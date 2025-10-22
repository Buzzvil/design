'use client';

import { motion } from 'framer-motion';
import { Construction, ArrowRight } from 'lucide-react';

interface SectionPlaceholderProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  comingSoon?: boolean;
}

const SectionPlaceholder = ({ 
  title, 
  description, 
  icon: Icon = Construction,
  comingSoon = true 
}: SectionPlaceholderProps) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="p-6 bg-gradient-to-br from-muted/20 to-muted/10 rounded-2xl border border-border">
                <Icon className="w-12 h-12 text-muted-foreground" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              {title}
            </h2>

            {/* Description */}
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>

            {/* Coming Soon Badge */}
            {comingSoon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-full text-accent font-medium"
              >
                <span>Coming Soon</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            )}

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionPlaceholder;
