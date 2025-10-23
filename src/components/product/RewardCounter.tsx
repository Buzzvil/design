'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface RewardCounterProps {
  isActive: boolean;
}

const RewardCounter = ({ isActive }: RewardCounterProps) => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isActive && !isRunning) {
      setIsRunning(true);
      const interval = setInterval(() => {
        setCount(prev => (prev + 1) % 100);
      }, 100);
      return () => clearInterval(interval);
    } else if (!isActive) {
      setIsRunning(false);
    }
  }, [isActive, isRunning]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isActive ? 1 : 0.3, scale: isActive ? 1 : 0.8 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <motion.div
        animate={{ rotate: isActive ? 360 : 0 }}
        transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: "linear" }}
        className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/40 rounded-full flex items-center justify-center"
      >
        <Clock className="w-8 h-8 text-accent" />
      </motion.div>
      <div className="text-center">
        <motion.div
          key={count}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold text-foreground"
        >
          {count}
        </motion.div>
        <p className="text-sm text-muted-foreground">rewards generated</p>
      </div>
    </motion.div>
  );
};

export { RewardCounter };
