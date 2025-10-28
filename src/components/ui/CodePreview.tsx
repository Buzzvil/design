'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';

interface CodePreviewProps {
  code: string;
  patternId: string;
  className?: string;
}

const CodePreview = ({ code, patternId, className = '' }: CodePreviewProps) => {
  const [copiedPattern, setCopiedPattern] = useState<string | null>(null);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedPattern(patternId);
      setTimeout(() => setCopiedPattern(null), 3000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-medium text-white">
          Code Example
        </h5>
        <motion.button
          onClick={handleCopyCode}
          className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-white transition-colors"
          whileTap={{ scale: 0.95 }}
        >
          <Copy className="w-3 h-3" />
          <span>{copiedPattern === patternId ? 'Copied!' : 'Copy'}</span>
        </motion.button>
      </div>
      <div className="bg-muted/10 border border-border/50 rounded-lg p-4 overflow-x-auto">
        <pre className="text-xs text-muted-foreground font-mono leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodePreview;
