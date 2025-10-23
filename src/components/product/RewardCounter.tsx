'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RewardCounterProps {
  isActive: boolean;
}

export function RewardCounter({ isActive }: RewardCounterProps) {
  const [sessionTime, setSessionTime] = useState(0);
  const [points, setPoints] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isActive && !isRunning) {
      setIsRunning(true);
    } else if (!isActive && isRunning) {
      setIsRunning(false);
    }
  }, [isActive, isRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSessionTime(prev => {
          const newTime = prev + 1;
          // Update points every second (1P ≈ 1 second)
          setPoints(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 flex justify-center"
    >
      <motion.div 
        className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-4 backdrop-blur-sm w-32 h-32 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
        onClick={handleClick}
        animate={{
          scale: isClicked ? 0.8 : 1,
          rotate: isClicked ? [0, -3, 3, 0] : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 12,
          scale: { duration: 0.15 },
          rotate: { duration: 0.25 }
        }}
      >
        <div className="text-center">
          {/* Session Time and Points in Vertical Layout */}
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-sm text-blue-300 mb-1">Time</div>
              <motion.div
                key={sessionTime}
                initial={{ scale: 1.1, color: '#60a5fa' }}
                animate={{ scale: 1, color: '#ffffff' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="text-sm font-mono font-bold text-white"
              >
                {formatTime(sessionTime)}
              </motion.div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-purple-300 mb-1">Points</div>
              <motion.div
                key={points}
                initial={{ y: -10, scale: 1.2 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }}
                className="text-sm font-bold text-purple-400"
              >
                {points}P
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}