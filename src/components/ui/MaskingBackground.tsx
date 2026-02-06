'use client';

import { motion } from 'framer-motion';

/**
 * Vivid animated background for the logo masking treatment.
 * More saturated, more colors, faster motion than HeroBackground.
 */
export function MaskingBackground() {
  return (
    <div className="absolute inset-0 z-0">
      {/* Warm white base */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#FFF5F0] to-[#FFF0E6]" />

      {/* Animated blobs — vivid, fast */}
      <div className="absolute inset-0 mix-blend-multiply">
        {/* Bright red – top-left */}
        <motion.div
          className="absolute top-[10%] left-[10%] h-[60%] w-[60%] rounded-full bg-[#EF4444] blur-[80px]"
          animate={{
            x: [0, 80, -60, 0],
            y: [0, -70, 50, 0],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        {/* Hot orange – bottom-right */}
        <motion.div
          className="absolute bottom-[10%] right-[10%] h-[55%] w-[55%] rounded-full bg-[#F97316] blur-[70px]"
          animate={{
            x: [0, -90, 60, 0],
            y: [0, 40, -60, 0],
            scale: [1, 1.25, 0.85, 1],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        {/* Warm peach – center */}
        <motion.div
          className="absolute top-[25%] left-[30%] h-[50%] w-[50%] rounded-full bg-[#FDBA74] blur-[60px]"
          animate={{
            x: [-30, 50, -40, -30],
            y: [20, -40, 30, 20],
            scale: [1.1, 0.9, 1.2, 1.1],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        {/* White highlight – floating */}
        <motion.div
          className="absolute top-[15%] right-[20%] h-[40%] w-[40%] rounded-full bg-white blur-[50px]"
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 30, 0],
            scale: [0.8, 1.2, 0.9, 0.8],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
        />
        {/* Deep red – accent */}
        <motion.div
          className="absolute bottom-[20%] left-[25%] h-[35%] w-[35%] rounded-full bg-[#DC2626] blur-[60px]"
          animate={{
            x: [20, -50, 30, 20],
            y: [-20, 40, -30, -20],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const }}
        />
      </div>

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
