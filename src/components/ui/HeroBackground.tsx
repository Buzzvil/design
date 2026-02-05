'use client';

import { motion } from 'framer-motion';

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 animate-chameleon bg-gradient-to-br from-[#2a0a0a] via-black to-[#1f1005] opacity-80" />
      <div className="absolute inset-0 opacity-60 mix-blend-screen">
        <motion.div
          className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-[#EF4444] blur-[120px]"
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#FB923C] blur-[100px]"
          animate={{
            x: [0, -150, 100, 0],
            y: [0, 50, -50, 0],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] rounded-full bg-[#EF4444] blur-[140px]"
          animate={{
            x: [-50, 50, -50],
            y: [-50, 50, -50],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
