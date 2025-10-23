'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageTransitionWrapperProps {
  children: React.ReactNode;
}

export function LanguageTransitionWrapper({ children }: LanguageTransitionWrapperProps) {
  const { language } = useLanguage();
  const [displayedContent, setDisplayedContent] = useState(children);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simply update content when language changes - no animation
    setDisplayedContent(children);
  }, [language, children]);


  return (
    <div ref={containerRef} className="relative">
      {displayedContent}
    </div>
  );
}

