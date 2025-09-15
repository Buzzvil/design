'use client';

import { motion } from 'framer-motion';
import { Palette, Type, Layout, Eye, Code, Layers } from 'lucide-react';

const Foundations = () => {
  const foundations = [
    {
      icon: Palette,
      title: 'Color System',
      description: 'Our carefully crafted color palette that ensures accessibility and brand consistency across all touchpoints.',
      features: ['Primary & Secondary Colors', 'Semantic Color Tokens', 'Dark Mode Support', 'Accessibility Compliant'],
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      icon: Type,
      title: 'Typography',
      description: 'Typography scale and font families that create clear hierarchy and improve readability.',
      features: ['Font Families', 'Type Scale', 'Line Heights', 'Letter Spacing'],
      gradient: 'from-green-500 to-blue-600',
    },
    {
      icon: Layout,
      title: 'Spacing & Grid',
      description: 'Consistent spacing system and grid layout that creates visual harmony and structure.',
      features: ['8pt Grid System', 'Responsive Breakpoints', 'Container Queries', 'Flexible Layouts'],
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      icon: Eye,
      title: 'Visual Identity',
      description: 'Brand guidelines, logo usage, and visual elements that define our design language.',
      features: ['Logo Guidelines', 'Brand Colors', 'Visual Elements', 'Usage Examples'],
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: Code,
      title: 'Components',
      description: 'Reusable UI components built with accessibility and consistency in mind.',
      features: ['Button Variants', 'Form Elements', 'Navigation', 'Feedback Components'],
      gradient: 'from-teal-500 to-green-600',
    },
    {
      icon: Layers,
      title: 'Design Tokens',
      description: 'Centralized design decisions that ensure consistency across all platforms and devices.',
      features: ['Color Tokens', 'Spacing Tokens', 'Typography Tokens', 'Shadow Tokens'],
      gradient: 'from-indigo-500 to-purple-600',
    },
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="foundations" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Design <span className="gradient-text">Foundations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The building blocks of our design system. These foundations ensure 
            consistency, accessibility, and scalability across all our products.
          </p>
        </motion.div>

        {/* Foundations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {foundations.map((foundation) => (
            <motion.div
              key={foundation.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="h-full p-8 bg-background rounded-2xl border border-border hover-lift glass">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <foundation.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {foundation.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {foundation.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {foundation.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="#resources"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl focus-ring"
          >
            Explore All Resources
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Foundations;
