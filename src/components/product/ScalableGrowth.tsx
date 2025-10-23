'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

interface ScalableGrowthProps {
  isActive: boolean;
}

const ScalableGrowth = ({ isActive }: ScalableGrowthProps) => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isActive && !isAnimating) {
      setIsAnimating(true);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    } else if (!isActive) {
      setIsAnimating(false);
      setProgress(0);
    }
  }, [isActive, isAnimating]);

  const bars = Array.from({ length: 8 }, (_, i) => ({
    height: Math.sin((i / 7) * Math.PI) * 40 + 20,
    delay: i * 0.1,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isActive ? 1 : 0.3, scale: isActive ? 1 : 0.8 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <div className="flex items-end space-x-1 h-20">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ 
              height: isActive ? bar.height : 0,
              backgroundColor: isActive ? "#10b981" : "#6b7280"
            }}
            transition={{ 
              duration: 0.5, 
              delay: isActive ? bar.delay : 0,
              repeat: isActive ? Infinity : 0,
              repeatType: "reverse",
              repeatDelay: 2
            }}
            className="w-3 bg-green-500 rounded-t"
          />
        ))}
      </div>
      
      <div className="text-center">
        <motion.div
          animate={{ 
            scale: isActive ? 1.1 : 1,
            rotate: isActive ? 5 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-2"
        >
          <TrendingUp className="w-5 h-5 text-green-500" />
          <span className="text-lg font-semibold text-foreground">
            {progress}%
          </span>
        </motion.div>
        <p className="text-sm text-muted-foreground">scalable growth</p>
      </div>
    </motion.div>
  );
};

export { ScalableGrowth };
