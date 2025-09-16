'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Sparkles } from 'lucide-react';
import Avatar from '@/components/Avatar';

interface TestAvatar {
  id: number;
  name: string;
  philosophy: string;
  workingStyle: string;
  role: string;
  description: string;
  keywords: string[];
}

const PHILOSOPHIES = ['rewarded', 'playful', 'scalable', 'one-team', 'clarity', 'grit'];
const WORKING_STYLES = ['iterative', 'detail-oriented', 'big-picture', 'collaborative', 'experimental', 'systematic'];
const NAMES = ['Alex Chen', 'Maya Patel', 'Jordan Kim', 'Sam Wilson', 'Taylor Brown', 'Casey Lee', 'Riley Zhang', 'Morgan Davis'];
const ROLES = ['Product Designer', 'UX Designer', 'UI Designer', 'Design Lead', 'Design Manager'];
const DESCRIPTIONS = [
  'Creating user-centered experiences that drive engagement',
  'Building intuitive interfaces that users love',
  'Leading design strategy and vision for product teams',
  'Crafting beautiful and functional digital products',
  'Designing systems that scale with business growth'
];
const KEYWORDS = [
  ['User Research', 'Prototyping', 'Design Systems'],
  ['Visual Design', 'Branding', 'Illustration'],
  ['Strategy', 'Leadership', 'Cross-functional'],
  ['Accessibility', 'Usability', 'Information Architecture'],
  ['Motion Design', 'Interaction Design', 'Frontend'],
  ['Data Visualization', 'Analytics', 'Growth Design']
];

function generateRandomAvatar(id: number): TestAvatar {
  const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
  const randomPhilosophy = PHILOSOPHIES[Math.floor(Math.random() * PHILOSOPHIES.length)];
  const randomWorkingStyle = WORKING_STYLES[Math.floor(Math.random() * WORKING_STYLES.length)];
  const randomRole = ROLES[Math.floor(Math.random() * ROLES.length)];
  const randomDescription = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];
  const randomKeywords = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];

  return {
    id,
    name: randomName,
    philosophy: randomPhilosophy,
    workingStyle: randomWorkingStyle,
    role: randomRole,
    description: randomDescription,
    keywords: randomKeywords,
  };
}

export default function AvatarTestPage() {
  const [avatars, setAvatars] = useState<TestAvatar[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAvatars = () => {
    setIsGenerating(true);
    
    // Generate 4 random avatars
    const newAvatars = Array.from({ length: 4 }, (_, index) => 
      generateRandomAvatar(index + 1)
    );
    
    setAvatars(newAvatars);
    
    // Reset generating state after animation
    setTimeout(() => setIsGenerating(false), 500);
  };

  useEffect(() => {
    // Generate initial avatars on page load
    generateAvatars();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Avatar Generation Test</h1>
              <p className="text-muted-foreground mt-2">
                Testing philosophy-based colors and work style animations
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateAvatars}
              disabled={isGenerating}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                isGenerating
                  ? 'text-muted-foreground cursor-not-allowed'
                  : 'bg-accent text-white hover:bg-accent/90'
              }`}
            >
              <motion.div
                animate={isGenerating ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.5, repeat: isGenerating ? Infinity : 0 }}
              >
                <RefreshCw className="w-4 h-4" />
              </motion.div>
              <span>{isGenerating ? 'Generating...' : 'Regenerate'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {avatars.map((avatar, index) => (
            <motion.div
              key={avatar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gradient-to-br from-background to-muted/20 p-6 rounded-2xl border border-border shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <Avatar 
                  name={avatar.name} 
                  size={80} 
                  philosophy={avatar.philosophy}
                  workingStyle={avatar.workingStyle}
                />
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{avatar.name}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{avatar.role}</p>
                  <p className="text-muted-foreground text-xs">{avatar.description}</p>
                </div>

                {/* Philosophy & Work Style */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Philosophy:</span>
                    <span className="text-xs font-medium text-accent capitalize px-2 py-1 bg-accent/10 rounded-full">
                      {avatar.philosophy}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Work Style:</span>
                    <span className="text-xs font-medium text-accent capitalize px-2 py-1 bg-accent/10 rounded-full">
                      {avatar.workingStyle.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <h4 className="text-xs font-medium text-foreground mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-1">
                    {avatar.keywords.map((keyword, keywordIndex) => (
                      <span
                        key={keywordIndex}
                        className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-16 p-8 bg-muted/20 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
            <Sparkles className="w-6 h-6 mr-2 text-accent" />
            Generation System
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Philosophy Colors */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Philosophy-Based Colors</h3>
              <div className="space-y-3">
                {PHILOSOPHIES.map((philosophy) => (
                  <div key={philosophy} className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center">
                      <Avatar 
                        name="Test" 
                        size={20} 
                        philosophy={philosophy}
                        workingStyle="systematic"
                      />
                    </div>
                    <span className="text-sm text-foreground capitalize">{philosophy}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Style Animations */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Work Style Animations</h3>
              <div className="space-y-3">
                {WORKING_STYLES.map((style) => (
                  <div key={style} className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full border-2 border-border flex items-center justify-center">
                      <Avatar 
                        name="Test" 
                        size={20} 
                        philosophy="playful"
                        workingStyle={style}
                      />
                    </div>
                    <span className="text-sm text-foreground capitalize">{style.replace('-', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
