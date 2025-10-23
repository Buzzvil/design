'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Palette } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';

const Tools = () => {
  const { t } = useLanguage();
  
  const tools = [
    {
      category: t('tools.category.design-development'),
      icon: Palette,
      items: [
        {
          name: 'Figma Suite (org)',
          description: 'Our primary design tool for creating interfaces, prototypes, and design systems with team collaboration',
          status: 'Active',
          link: 'https://figma.com',
          features: ['Design System', 'Prototyping', 'Team Collaboration'],
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
        },
        {
          name: 'GPT Business',
          description: 'AI-powered assistant for design ideation, content generation, and workflow optimization',
          status: 'Active',
          link: 'https://openai.com',
          features: ['AI Assistant', 'Content Generation', 'Workflow Optimization'],
          logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
        },
        {
          name: 'Midjourney',
          description: 'AI image generation tool for creating visual concepts, mockups, and design inspiration',
          status: 'Active',
          link: 'https://midjourney.com',
          features: ['AI Art', 'Visual Concepts', 'Design Inspiration'],
          logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Midjourney_Emblem.png',
        },
        {
          name: 'Cursor',
          description: 'AI-powered code editor for design system development and frontend implementation',
          status: 'Active',
          link: 'https://cursor.sh',
          features: ['AI Coding', 'Design System', 'Frontend Development'],
          logo: 'https://cursor.sh/favicon.ico',
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
    <div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {tools.map((category) => (
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

              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((tool) => (
                  <motion.div
                    key={tool.name}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group relative"
                  >
                    <div className="h-full p-6 bg-background rounded-xl border border-border hover-lift glass">
                      {/* Tool Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors overflow-hidden">
                          <Image
                            src={tool.logo}
                            alt={`${tool.name} logo`}
                            width={24}
                            height={24}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              // Fallback to a simple text-based icon if image fails
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="w-6 h-6 flex items-center justify-center text-white font-bold text-xs">${tool.name.charAt(0)}</div>`;
                              }
                            }}
                          />
                        </div>
                      </div>

                      {/* Tool Content */}
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {tool.name}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tool.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <motion.a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 font-medium"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                        <span>{t('tools.visit')}</span>
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

    </div>
  );
};

export default Tools;
