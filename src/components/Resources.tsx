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
      category: 'Design System',
      icon: FileText,
      items: [
        {
          title: 'Buzzvil Design System',
          description: 'Complete design system with tokens, components, and patterns for AdTech interfaces',
          type: 'Figma File',
          size: '4.2 MB',
          updated: '3 days ago',
          icon: FileText,
          link: 'https://www.figma.com/@buzzvil',
        },
        {
          title: 'Reward UI Components',
          description: 'Specialized components for reward-based interactions and gamification',
          type: 'Figma File',
          size: '2.8 MB',
          updated: '1 week ago',
          icon: Code2,
          link: 'https://www.figma.com/@buzzvil',
        },
        {
          title: 'Mobile Design Kit',
          description: 'Mobile-first components optimized for reward and engagement patterns',
          type: 'Figma File',
          size: '3.5 MB',
          updated: '5 days ago',
          icon: FileText,
          link: 'https://www.figma.com/@buzzvil',
        },
      ],
    },
    {
      category: 'Templates & Patterns',
      icon: Image,
      items: [
        {
          title: 'AdTech Wireframes',
          description: 'Wireframe templates for advertisement interfaces and user flows',
          type: 'Figma File',
          size: '2.1 MB',
          updated: '2 weeks ago',
          icon: FileText,
          link: 'https://www.figma.com/@buzzvil',
        },
        {
          title: 'User Journey Templates',
          description: 'Templates for mapping reward-based user experiences',
          type: 'Figma File',
          size: '1.6 MB',
          updated: '1 week ago',
          icon: Image,
          link: 'https://www.figma.com/@buzzvil',
        },
        {
          title: 'Dashboard Layouts',
          description: 'Pre-built dashboard layouts for analytics and campaign management',
          type: 'Figma File',
          size: '3.8 MB',
          updated: '4 days ago',
          icon: FileText,
          link: 'https://www.figma.com/@buzzvil',
        },
      ],
    },
    {
      category: 'Brand & Assets',
      icon: Download,
      items: [
        {
          title: 'Brand Guidelines',
          description: 'Complete brand guidelines with logo usage and color palettes',
          type: 'Figma File',
          size: '5.2 MB',
          updated: '1 week ago',
          icon: BookOpen,
          link: 'https://www.figma.com/@buzzvil',
        },
        {
          title: 'Icon Library',
          description: 'Comprehensive icon set for AdTech and reward interfaces',
          type: 'Figma File',
          size: '1.9 MB',
          updated: '3 days ago',
          icon: Image,
          link: 'https://www.figma.com/@buzzvil',
        },
        {
          title: 'Illustration Assets',
          description: 'Custom illustrations for user onboarding and empty states',
          type: 'Figma File',
          size: '4.7 MB',
          updated: '2 weeks ago',
          icon: Image,
          link: 'https://www.figma.com/@buzzvil',
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
                      <motion.a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-all duration-200 font-medium"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                        <span>View in Figma</span>
                      </motion.a>
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
              Explore our complete collection of design resources on Figma Community. 
              Follow us for updates and new releases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://www.figma.com/@buzzvil"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-accent/10 text-accent rounded-lg font-semibold hover:bg-accent/20 transition-colors focus-ring"
              >
                Visit Figma Community
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
