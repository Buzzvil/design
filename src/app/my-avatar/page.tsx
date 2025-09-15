'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Download, Palette, Zap, Sparkles } from 'lucide-react';
import Avatar from '@/components/Avatar';

interface AvatarData {
  // Style questions
  primaryColor: string;
  secondaryColor: string;
  animationStyle: string;
  
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

const COLOR_OPTIONS = [
  { name: 'Warm & Energetic', colors: ['#FF6B6B', '#FFE66D', '#4ECDC4'] },
  { name: 'Cool & Professional', colors: ['#667EEA', '#764BA2', '#F093FB'] },
  { name: 'Natural & Organic', colors: ['#56AB2F', '#A8E6CF', '#FFD93D'] },
  { name: 'Bold & Modern', colors: ['#FF416C', '#FF4B2B', '#FF6B6B'] },
  { name: 'Minimal & Clean', colors: ['#2C3E50', '#34495E', '#ECF0F1'] },
  { name: 'Creative & Playful', colors: ['#FF9A9E', '#FECFEF', '#FECFEF'] },
];

const ANIMATION_OPTIONS = [
  { name: 'Quick & Snappy', style: 'quick', description: 'Fast, responsive animations' },
  { name: 'Slow & Smooth', style: 'slow', description: 'Gentle, flowing movements' },
  { name: 'Wavy & Organic', style: 'wavy', description: 'Natural, wave-like motion' },
  { name: 'Springy & Bouncy', style: 'springy', description: 'Energetic, elastic feel' },
  { name: 'Minimal & Subtle', style: 'minimal', description: 'Understated, refined motion' },
  { name: 'Dynamic & Bold', style: 'dynamic', description: 'Strong, impactful animations' },
];

export default function MyAvatarPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [avatarData, setAvatarData] = useState<AvatarData>({
    primaryColor: '',
    secondaryColor: '',
    animationStyle: '',
    role: 'Product Designer',
    organizationDescription: '',
    keywords: ['', '', ''],
  });

  const updateAvatarData = (field: keyof AvatarData, value: string | string[]) => {
    setAvatarData(prev => ({ ...prev, [field]: value }));
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
    <animationStyle>${avatarData.animationStyle}</animationStyle>
  </style>
  <role>
    <title>${avatarData.role}</title>
    <organizationDescription>${avatarData.organizationDescription}</organizationDescription>
  </role>
  <expertise>
    <keywords>
      ${avatarData.keywords.map(keyword => `<keyword>${keyword}</keyword>`).join('\n      ')}
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
              <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Design Style</h2>
              <p className="text-muted-foreground text-lg">Select colors that represent your design aesthetic</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COLOR_OPTIONS.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    updateAvatarData('primaryColor', option.colors[0]);
                    updateAvatarData('secondaryColor', option.colors[1]);
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    avatarData.primaryColor === option.colors[0] 
                      ? 'border-accent bg-accent/10' 
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex space-x-2 mb-4">
                    {option.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <h3 className="font-semibold text-foreground">{option.name}</h3>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Animation Style</h2>
              <p className="text-muted-foreground text-lg">How should your avatar move and interact?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ANIMATION_OPTIONS.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => updateAvatarData('animationStyle', option.style)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    avatarData.animationStyle === option.style 
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
              <p className="text-muted-foreground text-lg">Add 3 keywords that define what you do best</p>
            </div>
            
            <div className="max-w-2xl mx-auto space-y-4">
              {[0, 1, 2].map((index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Keyword {index + 1}
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
                    placeholder={`Expertise ${index + 1}...`}
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
              <h2 className="text-3xl font-bold text-foreground mb-4">Preview & Download</h2>
              <p className="text-muted-foreground text-lg">Review your avatar and download the XML file</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-muted/20 p-8 rounded-2xl border border-border">
                <div className="flex items-center space-x-6 mb-6">
                  <Avatar name="Your Name" size={80} />
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{avatarData.role}</h3>
                    <p className="text-muted-foreground">{avatarData.organizationDescription}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {avatarData.keywords.filter(k => k.trim()).map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Style:</h4>
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-2">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: avatarData.primaryColor }}
                        />
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: avatarData.secondaryColor }}
                        />
                      </div>
                      <span className="text-muted-foreground capitalize">
                        {avatarData.animationStyle} animation
                      </span>
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Avatar</h1>
              <p className="text-muted-foreground">Customize your designer profile</p>
            </div>
            <div className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {STEPS.length}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 py-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      index <= currentStep
                        ? 'border-accent bg-accent text-white'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`w-8 h-0.5 mx-4 ${
                        index < currentStep ? 'bg-accent' : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              disabled={currentStep === STEPS.length - 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === STEPS.length - 1
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
