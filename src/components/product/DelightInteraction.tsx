'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface DelightInteractionProps {
  isActive: boolean;
}

const DelightInteraction = ({ isActive }: DelightInteractionProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isActive ? 1 : 0.3, scale: isActive ? 1 : 0.8 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-500/40 rounded-full flex items-center justify-center cursor-pointer"
      >
        <motion.div
          animate={{ 
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 180 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <Heart className="w-8 h-8 text-pink-500" />
        </motion.div>
        
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
        )}
      </motion.div>
      
      <div className="text-center">
        <motion.p
          animate={{ 
            color: isHovered ? "#ec4899" : "#6b7280",
            scale: isHovered ? 1.05 : 1 
          }}
          className="text-lg font-semibold transition-colors duration-300"
        >
          {isHovered ? "Delightful!" : "Hover to delight"}
        </motion.p>
        <p className="text-sm text-muted-foreground">interaction design</p>
      </div>
    </motion.div>
  );
};

export { DelightInteraction };
