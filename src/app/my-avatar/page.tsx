'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Download, Palette, Zap, Sparkles } from 'lucide-react';
import Avatar from '@/components/Avatar';

interface AvatarData {
  // Personal information
  name: string;
  
  // Buzzvil Values & Principles
  buzzvilValue: string;  // What drives your working style
  buzzvilPrinciple: string;  // Your favorite design principle
  
  // Role information
  role: string;
  organizationDescription: string;
  
  // Expertise
  keywords: string[];
}

const STEPS = [
  { id: 'name', title: 'Personal Info', icon: Palette },
  { id: 'values', title: 'Buzzvil Values', icon: Zap },
  { id: 'principles', title: 'Design Principles', icon: Sparkles },
  { id: 'role', title: 'Role & Organization', icon: Palette },
  { id: 'keywords', title: 'Expertise', icon: Sparkles },
  { id: 'preview', title: 'Preview & Download', icon: Download },
];

// Buzzvil Values - Question 1: What drives your working style?
const BUZZVIL_VALUES = [
  { 
    name: 'Iterate Fast', 
    description: 'Moving quickly with rapid prototyping and continuous improvement',
    value: 'iterate-fast'
  },
  { 
    name: 'Clarity', 
    description: 'Making complex things simple and understandable',
    value: 'clarity'
  },
  { 
    name: 'Grit', 
    description: 'Pushing boundaries and challenging the status quo',
    value: 'grit'
  },
  { 
    name: 'Bold', 
    description: 'Taking risks and making courageous design decisions',
    value: 'bold'
  },
  { 
    name: 'One-Team', 
    description: 'Designing as a unified force across all touchpoints',
    value: 'one-team'
  },
  { 
    name: 'Delight', 
    description: 'Bringing joy and delight to every interaction',
    value: 'delight'
  },
];

// Buzzvil Design Principles - Question 2: What's your favorite design principle?
const BUZZVIL_PRINCIPLES = [
  { 
    name: 'Reward = Time', 
    description: 'Creating experiences that feel valuable and meaningful',
    principle: 'reward-time'
  },
  { 
    name: 'Playful', 
    description: 'Bringing joy and delight to every interaction',
    principle: 'playful'
  },
  { 
    name: 'Scalable', 
    description: 'Building systems that grow with our users',
    principle: 'scalable'
  },
];


export default function MyAvatarPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [avatarData, setAvatarData] = useState<AvatarData>({
    name: '',
    buzzvilValue: '',
    buzzvilPrinciple: '',
    role: 'Product Designer',
    organizationDescription: '',
    keywords: ['', '', ''],
  });

  const updateAvatarData = (field: keyof AvatarData, value: string | string[]) => {
    setAvatarData(prev => ({ ...prev, [field]: value }));
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 0: // Name input
        return avatarData.name.trim();
      case 1: // Buzzvil Values selection
        return avatarData.buzzvilValue;
      case 2: // Buzzvil Principles selection
        return avatarData.buzzvilPrinciple;
      case 3: // Role and organization
        return avatarData.role && avatarData.organizationDescription;
      case 4: // Keywords
        return avatarData.keywords[0]?.trim();
      case 5: // Final step - check all required fields
        return (
          avatarData.name.trim() &&
          avatarData.buzzvilValue &&
          avatarData.buzzvilPrinciple &&
          avatarData.role &&
          avatarData.organizationDescription &&
          avatarData.keywords[0]?.trim()
        );
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const generateAvatar = () => {
    setShowPreview(true);
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateXML = () => {
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<avatar>
  <personal>
    <name>${avatarData.name}</name>
  </personal>
  <buzzvil>
    <value>${avatarData.buzzvilValue}</value>
    <principle>${avatarData.buzzvilPrinciple}</principle>
  </buzzvil>
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
              <h2 className="text-3xl font-bold text-foreground mb-4">What&apos;s your name?</h2>
              <p className="text-muted-foreground text-lg">Let&apos;s start with the basics</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={avatarData.name}
                  onChange={(e) => updateAvatarData('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent text-lg"
                  placeholder="Enter your name..."
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">What drives your working style?</h2>
              <p className="text-muted-foreground text-lg">Choose the Buzzvil value that resonates most with your approach</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BUZZVIL_VALUES.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateAvatarData('buzzvilValue', option.value)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    avatarData.buzzvilValue === option.value 
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

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">What&apos;s your favorite Buzzvil design principle?</h2>
              <p className="text-muted-foreground text-lg">Choose the principle that guides your design decisions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BUZZVIL_PRINCIPLES.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateAvatarData('buzzvilPrinciple', option.principle)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    avatarData.buzzvilPrinciple === option.principle 
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

      case 3:
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

      case 4:
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

      case 5:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Generate?</h2>
              <p className="text-muted-foreground text-lg">Review your information and generate your avatar card</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              {/* Summary Card */}
              <div className="bg-gradient-to-br from-background to-muted/20 p-8 rounded-2xl border border-border shadow-lg">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Name</h4>
                    <p className="text-foreground">{avatarData.name}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Buzzvil Value</h4>
                    <p className="text-accent capitalize">{avatarData.buzzvilValue.replace('-', ' ')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Design Principle</h4>
                    <p className="text-muted-foreground capitalize">{avatarData.buzzvilPrinciple.replace('-', ' ')}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Role</h4>
                    <p className="text-muted-foreground">{avatarData.role}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Organization Description</h4>
                    <p className="text-muted-foreground">{avatarData.organizationDescription}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Expertise</h4>
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
                </div>
              </div>
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
            {showPreview ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
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
                          <Avatar 
                            name={avatarData.name} 
                            size={80} 
                            philosophy={avatarData.buzzvilValue}
                            workingStyle={avatarData.buzzvilPrinciple}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-1">{avatarData.name}</h3>
                          <p className="text-muted-foreground text-sm mb-2">{avatarData.role}</p>
                          <p className="text-muted-foreground text-sm">{avatarData.organizationDescription}</p>
                        </div>
                      </div>
                      
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
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={generateXML}
                      className="w-full mt-8 bg-accent text-white py-4 px-6 rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download my avatar</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      {!showPreview && (
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
                onClick={currentStep === STEPS.length - 1 ? generateAvatar : nextStep}
                disabled={!isStepComplete(currentStep)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  !isStepComplete(currentStep)
                    ? 'text-muted-foreground cursor-not-allowed'
                    : 'bg-accent text-white hover:bg-accent/90'
                }`}
              >
                <span>{currentStep === STEPS.length - 1 ? 'Generate my avatar' : 'Next'}</span>
                {currentStep === STEPS.length - 1 ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
