'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PhilosophyAnimationProps {
  isActive: boolean;
}

export function PhilosophyAnimation({ isActive }: PhilosophyAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 flex justify-center"
    >
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* SVG for the connected dots animation */}
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          className="relative"
        >
          <defs>
            {/* Elegant glow filter */}
            <filter id="elegantGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Subtle inner glow */}
            <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Triangle background with 12% opacity */}
          <polygon
            points="30,90 70,30 110,90"
            fill="#FFD700"
            opacity="0.12"
          />

          {/* All edges visible all the time */}
          <line
            x1="30"
            y1="90"
            x2="70"
            y2="30"
            stroke="#FFD700"
            strokeWidth="2"
            opacity="0.3"
          />
          
          <line
            x1="70"
            y1="30"
            x2="110"
            y2="90"
            stroke="#FFD700"
            strokeWidth="2"
            opacity="0.3"
          />
          
          <line
            x1="110"
            y1="90"
            x2="30"
            y2="90"
            stroke="#FFD700"
            strokeWidth="2"
            opacity="0.3"
          />

          {/* Sequential glow effect running around the triangle - only one glows at a time */}
          <line
            x1="30"
            y1="90"
            x2="70"
            y2="30"
            stroke="#FFD700"
            strokeWidth="2"
            filter="url(#elegantGlow)"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;1;0;0;0"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </line>
          
          <line
            x1="70"
            y1="30"
            x2="110"
            y2="90"
            stroke="#FFD700"
            strokeWidth="2"
            filter="url(#elegantGlow)"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;1;0;0"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </line>
          
          <line
            x1="110"
            y1="90"
            x2="30"
            y2="90"
            stroke="#FFD700"
            strokeWidth="2"
            filter="url(#elegantGlow)"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;0;1;0"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </line>

          {/* Three elegant dots with sequential vibrance - following the flow */}
          <circle
            cx="30"
            cy="90"
            r="5"
            fill="#FFD700"
            filter="url(#innerGlow)"
            opacity="0.3"
          >
            <animate
              attributeName="r"
              values="5;7;5;5;5"
              dur="4.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;1;0.3;0.3;0.3"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle
            cx="70"
            cy="30"
            r="5"
            fill="#FFD700"
            filter="url(#innerGlow)"
            opacity="0.3"
          >
            <animate
              attributeName="r"
              values="5;5;7;5;5"
              dur="4.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.3;1;0.3;0.3"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle
            cx="110"
            cy="90"
            r="5"
            fill="#FFD700"
            filter="url(#innerGlow)"
            opacity="0.3"
          >
            <animate
              attributeName="r"
              values="5;5;5;7;5"
              dur="4.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0.3;0.3;1;0.3"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Sequential energy flow particles - following the sequential flow */}
          <circle
            cx="50"
            cy="60"
            r="2"
            fill="#FFD700"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0.8;0;0;0"
              dur="4.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="2;3.5;2;2;2"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle
            cx="90"
            cy="60"
            r="2"
            fill="#FFD700"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;0.8;0;0"
              dur="4.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="2;2;3.5;2;2"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </circle>
          
          <circle
            cx="70"
            cy="90"
            r="2"
            fill="#FFD700"
            opacity="0"
          >
            <animate
              attributeName="opacity"
              values="0;0;0;0.8;0"
              dur="4.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="2;2;2;3.5;2"
              dur="4.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </motion.div>
  );
}
