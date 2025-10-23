'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface DelightInteractionProps {
  isActive: boolean;
}

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  delay: number;
  angle: number;
  speed: number;
}

export function DelightInteraction({ isActive }: DelightInteractionProps) {
  const [particles, setParticles] = useState<HeartParticle[]>([]);
  const [particleId, setParticleId] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 64, y: 64 }); // Center position
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isActive || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if mouse is inside the container
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      setIsMouseInside(inside);
      
      if (inside) {
        setMousePosition({ x, y });
      } else {
        // Return to center when mouse leaves
        setMousePosition({ x: rect.width / 2, y: rect.height / 2 });
      }
    };

    if (isActive) {
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isActive]);

  const handleClick = (e: React.MouseEvent) => {
    if (!isActive) return;
    
    // Add click animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const bottomY = rect.height - 12; // Generate from bottom of frame
    
    // Create a beautiful burst of hearts with staggered timing (optimized for performance)
    const particleCount = 8; // Reduced from 12 to 8 for better performance
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: particleId + i,
      x: centerX + (Math.random() - 0.5) * 50, // Concentrated around center
      y: bottomY + (Math.random() - 0.5) * 6, // Start from bottom
      delay: i * 30, // Reduced stagger delay for smoother animation
      angle: (i / particleCount) * Math.PI * 2, // Even distribution around circle
      speed: 2 + Math.random() * 2, // Reduced speed variation for smoother motion
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    setParticleId(prev => prev + newParticles.length);
    
    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 3500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 flex justify-center"
    >
      <motion.div 
        ref={containerRef}
        className="bg-gradient-to-br from-pink-500/20 to-red-500/20 border border-pink-400/30 rounded-xl p-4 backdrop-blur-sm relative overflow-hidden cursor-pointer w-32 h-32 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-pink-400/50 hover:shadow-lg hover:shadow-pink-500/20"
        onClick={handleClick}
        style={{ cursor: isActive ? 'none' : 'default' }}
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
        {/* Heart - Shows at center by default, follows cursor when inside */}
        {isActive && (
          <motion.div
            className="absolute pointer-events-none z-20"
            style={{
              left: mousePosition.x - 12,
              top: mousePosition.y - 12,
            }}
            animate={{ 
              scale: isMouseInside ? [1, 1.2, 1] : [1, 1.1, 1],
              rotate: isMouseInside ? [0, 5, -5, 0] : [0, 2, -2, 0]
            }}
            transition={{ 
              scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            }}
          >
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
          </motion.div>
        )}

        {/* Heart Particles */}
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                opacity: 0, 
                scale: 0.2,
                x: particle.x,
                y: particle.y,
                rotate: 0
              }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                scale: [0.3, 1.2, 1.0, 0.7],
                x: particle.x + Math.cos(particle.angle) * particle.speed * 60,
                y: particle.y - particle.speed * 80 - Math.sin(particle.angle) * 20,
                rotate: [0, 180, 360]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 3,
                delay: particle.delay / 1000,
                ease: [0.25, 0.46, 0.45, 0.94],
                times: [0, 0.2, 0.7, 1]
              }}
              className="absolute pointer-events-none z-10"
            >
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400 drop-shadow-lg" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}