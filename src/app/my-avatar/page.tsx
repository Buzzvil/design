'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Download, Palette, Zap, Sparkles } from 'lucide-react';
import Avatar from '@/components/Avatar';

interface AvatarData {
  // Style questions
  primaryColor: string;
  secondaryColor: string;
  philosophy: string;
  workingStyle: string;
  
  // Role information
  role: string;
  organizationDescription: string;
  
  // Expertise
  keywords: string[];
}

const STEPS = [
  { id: 'style', title: 'Design Style', icon: Palette },
  { id: 'role', title: 'Role & Organization', icon: Zap },
  { id: 'keywords', title: 'Expertise', icon: Sparkles },
  { id: 'preview', title: 'Preview & Download', icon: Download },
];

const DESIGN_PHILOSOPHY_OPTIONS = [
  { 
    name: 'Rewarded', 
    description: 'Creating experiences that feel valuable and meaningful',
    colors: ['#FF6B6B', '#FFE66D', '#4ECDC4'],
    philosophy: 'rewarded'
  },
  { 
    name: 'Playful', 
    description: 'Bringing joy and delight to every interaction',
    colors: ['#667EEA', '#764BA2', '#F093FB'],
    philosophy: 'playful'
  },
  { 
    name: 'Scalable', 
    description: 'Building systems that grow with our users',
    colors: ['#56AB2F', '#A8E6CF', '#FFD93D'],
    philosophy: 'scalable'
  },
  { 
    name: 'One-Team', 
    description: 'Designing as a unified force across all touchpoints',
    colors: ['#FF416C', '#FF4B2B', '#FF6B6B'],
    philosophy: 'one-team'
  },
  { 
    name: 'Clarity', 
    description: 'Making complex things simple and understandable',
    colors: ['#2C3E50', '#34495E', '#ECF0F1'],
    philosophy: 'clarity'
  },
  { 
    name: 'Grit', 
    description: 'Pushing boundaries and challenging the status quo',
    colors: ['#FF9A9E', '#FECFEF', '#FECFEF'],
    philosophy: 'grit'
  },
];

const WORKING_STYLE_OPTIONS = [
  { 
    name: 'Iterative', 
    description: 'Building and refining through continuous cycles',
    style: 'iterative'
  },
  { 
    name: 'Detail-Oriented', 
    description: 'Focusing on precision and attention to every element',
    style: 'detail-oriented'
  },
  { 
    name: 'Big Picture', 
    description: 'Thinking strategically about overall user experience',
    style: 'big-picture'
  },
  { 
    name: 'Collaborative', 
    description: 'Working closely with cross-functional teams',
    style: 'collaborative'
  },
  { 
    name: 'Experimental', 
    description: 'Testing new approaches and pushing boundaries',
    style: 'experimental'
  },
  { 
    name: 'Systematic', 
    description: 'Following structured processes and methodologies',
    style: 'systematic'
  },
];


export default function MyAvatarPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [avatarData, setAvatarData] = useState<AvatarData>({
    primaryColor: '',
    secondaryColor: '',
    philosophy: '',
    workingStyle: '',
    role: 'Product Designer',
    organizationDescription: '',
    keywords: ['', '', ''],
  });

  const updateAvatarData = (field: keyof AvatarData, value: string | string[]) => {
    setAvatarData(prev => ({ ...prev, [field]: value }));
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0: // Philosophy selection
        return avatarData.philosophy;
      case 1: // Working style selection
        return avatarData.workingStyle;
      case 2: // Role and organization
        return avatarData.role && avatarData.organizationDescription;
      case 3: // Keywords
        return avatarData.keywords[0]?.trim();
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateXML = () => {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <style>
    <primaryColor>${avatarData.primaryColor}</primaryColor>
    <secondaryColor>${avatarData.secondaryColor}</secondaryColor>
    <philosophy>${avatarData.philosophy}</philosophy>
    <workingStyle>${avatarData.workingStyle}</workingStyle>
  </style>
  <role>
    <title>${avatarData.role}</title>
    <organizationDescription>${avatarData.organizationDescription}</organizationDescription>
  </role>
  <expertise>
    <keywords>
      ${avatarData.keywords.filter(k => k.trim()).map(keyword => `<keyword>${keyword}</keyword>`).join('\n      ')}
    </keywords>
  </expertise>
</avatar>`;

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-avatar.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">What drives your design philosophy?</h2>
              <p className="text-muted-foreground text-lg">Choose the principle that resonates most with your approach</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {DESIGN_PHILOSOPHY_OPTIONS.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    updateAvatarData('primaryColor', option.colors[0]);
                    updateAvatarData('secondaryColor', option.colors[1]);
                    updateAvatarData('philosophy', option.philosophy);
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    avatarData.philosophy === option.philosophy 
                      ? 'border-accent bg-accent/10' 
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <h3 className="font-semibold text-foreground mb-3">{option.name}</h3>
                  <p className="text-muted-foreground text-sm">{option.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">How do you approach your work?</h2>
              <p className="text-muted-foreground text-lg">Select the working style that best describes your process</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WORKING_STYLE_OPTIONS.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateAvatarData('workingStyle', option.style)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    avatarData.workingStyle === option.style 
                      ? 'border-accent bg-accent/10' 
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <h3 className="font-semibold text-foreground mb-2">{option.name}</h3>
                  <p className="text-muted-foreground text-sm">{option.description}</p>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Role & Organization</h2>
              <p className="text-muted-foreground text-lg">Tell us about your role at Buzzvil</p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Role
                </label>
                <input
                  type="text"
                  value={avatarData.role}
                  onChange={(e) => updateAvatarData('role', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Product Designer"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Role at Buzzvil (1 sentence)
                </label>
                <textarea
                  value={avatarData.organizationDescription}
                  onChange={(e) => updateAvatarData('organizationDescription', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  rows={3}
                  placeholder="Describe what you do at Buzzvil in one sentence..."
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Your Expertise</h2>
              <p className="text-muted-foreground text-lg">Add keywords that define what you do best (at least 1 required)</p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-4">
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Keyword {index + 1} {index === 0 && <span className="text-accent">*</span>}
                    {index > 0 && <span className="text-muted-foreground text-xs ml-2">(optional)</span>}
                  </label>
                  <input
                    type="text"
                    value={avatarData.keywords[index]}
                    onChange={(e) => {
                      const newKeywords = [...avatarData.keywords];
                      newKeywords[index] = e.target.value;
                      updateAvatarData('keywords', newKeywords);
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder={index === 0 ? "Your primary expertise..." : `Additional expertise ${index}...`}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Your Designer Profile</h2>
              <p className="text-muted-foreground text-lg">Here&apos;s your completed avatar card</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              {/* Complete Profile Card */}
              <div className="bg-gradient-to-br from-background to-muted/20 p-8 rounded-2xl border border-border shadow-lg">
                <div className="flex items-center space-x-6 mb-6">
                  <div className="relative">
                    <Avatar name="Your Name" size={80} />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-background" 
                         style={{ backgroundColor: avatarData.primaryColor }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-1">{avatarData.role}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{avatarData.organizationDescription}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">Philosophy:</span>
                      <span className="text-xs font-medium text-accent capitalize">{avatarData.philosophy}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {avatarData.keywords.filter(k => k.trim()).map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground mb-2">Design Style</h4>
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1">
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: avatarData.primaryColor }}
                            />
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: avatarData.secondaryColor }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground capitalize">
                            {avatarData.workingStyle.replace('-', ' ')} approach
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateXML}
                className="w-full mt-8 bg-accent text-white py-4 px-6 rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download XML File</span>
              </motion.button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 0
                  ? 'text-muted-foreground cursor-not-allowed'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep}
              disabled={currentStep === STEPS.length - 1 || !isStepComplete(currentStep)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === STEPS.length - 1 || !isStepComplete(currentStep)
                  ? 'text-muted-foreground cursor-not-allowed'
                  : 'bg-accent text-white hover:bg-accent/90'
              }`}
            >
              <span>{currentStep === STEPS.length - 1 ? 'Complete' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
