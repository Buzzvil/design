'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Download, BookOpen, FileText, Image, Code2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from './BlurReveal';
import { SectionTitle } from './SectionTitle';

const Resources = () => {
  const { t } = useLanguage();
  
  const resources = [
    {
      category: 'Design Files',
      icon: FileText,
      items: [
        {
          title: 'Figma Design System',
          description: 'Complete design system with components, patterns, and guidelines',
          type: 'Figma File',
          size: '2.4 MB',
          updated: '2 days ago',
          icon: FileText,
        },
        {
          title: 'Brand Assets Pack',
          description: 'Logos, icons, and brand elements in various formats',
          type: 'ZIP Archive',
          size: '15.2 MB',
          updated: '1 week ago',
          icon: Download,
        },
        {
          title: 'UI Component Library',
          description: 'Reusable components with variants and states',
          type: 'Figma File',
          size: '8.7 MB',
          updated: '3 days ago',
          icon: Code2,
        },
      ],
    },
    {
      category: 'Documentation',
      icon: BookOpen,
      items: [
        {
          title: 'Design Guidelines',
          description: 'Comprehensive guide to our design principles and best practices',
          type: 'PDF Document',
          size: '4.1 MB',
          updated: '1 week ago',
          icon: BookOpen,
        },
        {
          title: 'Accessibility Standards',
          description: 'WCAG compliance guidelines and accessibility checklist',
          type: 'PDF Document',
          size: '2.8 MB',
          updated: '2 weeks ago',
          icon: BookOpen,
        },
        {
          title: 'Component Documentation',
          description: 'Detailed documentation for all UI components',
          type: 'Web Page',
          size: 'Online',
          updated: '1 day ago',
          icon: ExternalLink,
        },
      ],
    },
    {
      category: 'Templates',
      icon: Image,
      items: [
        {
          title: 'Presentation Templates',
          description: 'PowerPoint and Keynote templates for design presentations',
          type: 'Template Pack',
          size: '12.3 MB',
          updated: '1 week ago',
          icon: Image,
        },
        {
          title: 'Wireframe Templates',
          description: 'Low-fidelity wireframe templates for rapid prototyping',
          type: 'Figma File',
          size: '3.2 MB',
          updated: '5 days ago',
          icon: FileText,
        },
        {
          title: 'User Journey Maps',
          description: 'Templates for mapping user experiences and touchpoints',
          type: 'Figma File',
          size: '1.8 MB',
          updated: '1 week ago',
          icon: FileText,
        },
      ],
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
    <section id="resources" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <SectionTitle className="mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {t('resources.title')}
            </h2>
          </SectionTitle>
          <BlurReveal>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('resources.subtitle')}
            </p>
          </BlurReveal>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {resources.map((category) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              className="space-y-6"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">{category.category}</h3>
              </div>

              {/* Resources Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((resource) => (
                  <motion.div
                    key={resource.title}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="h-full p-6 bg-background rounded-xl border border-border hover-lift glass">
                      {/* Resource Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <resource.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {resource.type}
                        </span>
                      </div>

                      {/* Resource Content */}
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {resource.description}
                      </p>

                      {/* Resource Meta */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <span>{resource.size}</span>
                        <span>Updated {resource.updated}</span>
                      </div>

                      {/* Action Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-all duration-200 font-medium"
                      >
                        <Download className="w-4 h-4 text-white" />
                        <span>Download</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-2xl border border-primary/10"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Need Something Specific?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can&apos;t find what you&apos;re looking for? Our design team is here to help. 
              Request new resources or get support with existing ones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:design@buzzvil.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-accent/10 text-accent rounded-lg font-semibold hover:bg-accent/20 transition-colors focus-ring"
              >
                Contact Design Team
              </motion.a>
              <motion.a
                href="#tools"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-border/50 text-foreground rounded-lg font-semibold hover:border-border hover:bg-muted/50 transition-colors focus-ring"
              >
                Explore Tools
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resources;
