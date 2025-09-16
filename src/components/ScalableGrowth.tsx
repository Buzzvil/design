'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScalableGrowthProps {
  isActive: boolean;
}

interface Sphere {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
}

export function ScalableGrowth({ isActive }: ScalableGrowthProps) {
  const [spheres, setSpheres] = useState<Sphere[]>([{
    id: 0,
    x: 64,
    y: 64,
    vx: 0,
    vy: 0,
    mass: 1
  }]); // Start with 1 ball in center
  const [sphereId, setSphereId] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const physicsRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      if (physicsRef.current) {
        clearInterval(physicsRef.current);
      }
      return;
    }

    // Physics simulation loop
    const physicsLoop = () => {
      setSpheres(prev => prev.map(sphere => {
        let newX = sphere.x + sphere.vx;
        let newY = sphere.y + sphere.vy;
        let newVx = sphere.vx;
        let newVy = sphere.vy;
        
                // Bounce off walls (keep spheres inside frame)
                if (newX <= 4 || newX >= 124) {
                  newVx = -newVx * 0.9;
                  newX = Math.max(4, Math.min(124, newX));
                }
                if (newY <= 4 || newY >= 124) {
                  newVy = -newVy * 0.9;
                  newY = Math.max(4, Math.min(124, newY));
                }
        
        // Apply friction
        newVx *= 0.98;
        newVy *= 0.98;
        
        return {
          ...sphere,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy
        };
      }));
    };

    physicsRef.current = setInterval(physicsLoop, 16) as unknown as number;
    
    return () => {
      if (physicsRef.current) {
        clearInterval(physicsRef.current);
      }
    };
  }, [isActive]);

  const handleClick = (e: React.MouseEvent) => {
    if (!isActive) return;
    
    // Add click animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    
    setSpheres(prev => {
      const currentCount = prev.length;
      
      // Multiplication sequence: 1→2→4→8→16→32→64→128→1
      let newCount = currentCount * 2;
      if (newCount > 128) {
        newCount = 1; // Reset to 1
      }
      
      if (newCount === 1) {
        // Reset to single ball in center
        setSphereId(1); // Reset sphereId to 1
        return [{
          id: 0,
          x: 64,
          y: 64,
          vx: 0,
          vy: 0,
          mass: 1
        }];
      }
      
      // Create new spheres by duplicating existing ones with slight variations
      const newSpheres: Sphere[] = [];
      const baseSpheres = prev;
      
      for (let i = 0; i < newCount; i++) {
        const baseSphere = baseSpheres[i % baseSpheres.length];
        newSpheres.push({
          id: sphereId + i,
          x: baseSphere.x + (Math.random() - 0.5) * 20,
          y: baseSphere.y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          mass: 1,
        });
      }
      
      setSphereId(prev => prev + newCount);
      return newSpheres;
    });
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
        className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-xl p-4 backdrop-blur-sm relative overflow-hidden cursor-pointer w-32 h-32 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20"
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
        {/* Initial Sphere - Always visible */}
        {spheres.length > 0 && spheres[0].id === 0 && (
          <div
            className="absolute w-3 h-3 bg-emerald-400 rounded-full z-5"
            style={{
              left: spheres[0].x,
              top: spheres[0].y,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 8px #10b981'
            }}
          />
        )}

        {/* Additional Spheres with Animation */}
        <AnimatePresence>
          {spheres.filter(sphere => sphere.id !== 0).map((sphere, index) => (
            <motion.div
              key={sphere.id}
              initial={{ 
                opacity: 0,
                scale: 0,
                x: sphere.x,
                y: sphere.y
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                x: sphere.x,
                y: sphere.y,
                boxShadow: [
                  '0 0 8px #10b981',
                  '0 0 16px #10b981',
                  '0 0 8px #10b981'
                ]
              }}
              exit={{ 
                opacity: 0,
                scale: 0
              }}
              transition={{ 
                duration: 0.4,
                ease: 'easeOut',
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              className="absolute w-3 h-3 bg-emerald-400 rounded-full z-5"
              style={{
                left: sphere.x,
                top: sphere.y,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
