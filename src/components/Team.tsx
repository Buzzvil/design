'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BlurReveal } from './BlurReveal';
import { SectionTitle } from './SectionTitle';
import Avatar from './Avatar';

const Team = () => {
  const { t } = useLanguage();
  
  const teamMembers = [
    {
      name: 'Max',
      role: 'Design Lead',
      bio: 'Leading design strategy and building world-class design teams.',
      expertise: ['Design Strategy', 'Team Leadership', 'Product Design'],
    },
    {
      name: 'Jia',
      role: 'Senior Designer',
      bio: 'Crafting intuitive user experiences that delight and engage.',
      expertise: ['User Research', 'UX Design', 'Prototyping'],
    },
    {
      name: 'Elle',
      role: 'UI Designer',
      bio: 'Creating beautiful, accessible interfaces that bring designs to life.',
      expertise: ['Visual Design', 'Design Systems', 'Accessibility'],
    },
    {
      name: 'Joy',
      role: 'Design Engineer',
      bio: 'Bridging design and development with code and creativity.',
      expertise: ['Frontend Development', 'Design Systems', 'Animation'],
    },
    {
      name: 'Rina',
      role: 'UX Researcher',
      bio: 'Understanding users to inform better design decisions.',
      expertise: ['User Research', 'Data Analysis', 'Usability Testing'],
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
              <div className="h-full p-8 bg-background rounded-2xl border border-border hover-lift glass">
                {/* Avatar */}
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Avatar name={member.name} size={80} />
                </div>

                {/* Member Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                    >
                      {skill}
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
