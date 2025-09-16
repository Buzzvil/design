'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from './BlurReveal';
import { SectionTitle } from './SectionTitle';
import Avatar from './Avatar';
import { loadTeamMembers, TeamMember } from '@/utils/teamParser';
import { useState, useEffect } from 'react';

const Team = () => {
  const { t } = useLanguage();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  
  useEffect(() => {
    // Load team members from XML files
    const members = loadTeamMembers();
    setTeamMembers(members);
  }, []);


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
    <section id="team" className="py-32 bg-muted/30">
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
              {t('team.title')}
            </h2>
          </SectionTitle>
          <BlurReveal>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('team.subtitle')}
            </p>
          </BlurReveal>
          {/* Debug info */}
          <div className="mt-4 p-2 bg-yellow-200 text-black rounded">
            Debug: Hovered member = {hoveredMember || 'none'}
          </div>
        </motion.div>


        {/* Team Members */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.name}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="h-full p-8 bg-background rounded-2xl border border-border hover-lift glass overflow-visible relative">
                {/* Avatar with Buzzvil Animation */}
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative">
                  <div 
                    className="relative"
                    onMouseEnter={() => {
                      console.log('Hovering over:', member.name);
                      setHoveredMember(member.name);
                    }}
                    onMouseLeave={() => {
                      console.log('Leaving:', member.name);
                      setHoveredMember(null);
                    }}
                  >
                    <Avatar 
                      name={member.name} 
                      size={80}
                      philosophy={member.buzzvilValue}
                      workingStyle={member.buzzvilPrinciple}
                    />
                    {/* Tooltip - positioned 8px from top right of avatar */}
                    <div className={`absolute -top-2 -right-2 bg-red-500 border-2 border-yellow-400 rounded-lg px-3 py-2 shadow-lg transition-all duration-200 pointer-events-none z-50 whitespace-nowrap transform -translate-y-1 ${
                      hoveredMember === member.name ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="text-sm font-medium text-white">
                        {member.buzzvilValue.replace('-', ' ')} • {member.buzzvilPrinciple.replace('-', ' ')}
                      </div>
                      {/* Arrow pointing to avatar */}
                      <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-yellow-400"></div>
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>

                {/* Keywords/Expertise Tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.keywords.map((keyword, keywordIndex) => (
                    <span
                      key={keywordIndex}
                      className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Team;
