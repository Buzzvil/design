'use client';

import * as React from "react";
import { motion } from "framer-motion";
import { generateColors } from "@/utils/avatar";

const DEFAULT_SIZE = 40;

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  size?: number;
  className?: string;
  philosophy?: string;
  workingStyle?: string;
}

// Buzzvil Values - Color palettes for working styles
const BUZZVIL_VALUE_COLORS = {
  'iterate-fast': ["#FF6B35", "#FFD700", "#FFE135", "#FF8C00"], // Orange, gold, bright yellow, dark orange - speed and energy
  'clarity': ["#F0F8FF", "#E6E6FA", "#FFFFFF", "#B0C4DE"], // Alice blue, lavender, white, light steel - clear spectrum
  'grit': ["#8B0000", "#DC143C", "#B22222", "#FF4500"], // Dark red, crimson, fire brick, orange red - power with energy
  'bold': ["#8B008B", "#FF1493", "#DC143C", "#B22222"], // Dark magenta, deep pink, crimson, fire brick - bold and daring
  'one-team': ["#4169E1", "#1E90FF", "#87CEEB", "#4682B4"], // Royal blue, dodger blue, sky blue, steel blue - unity depth
  'delight': ["#FF69B4", "#00CED1", "#FF1493", "#32CD32"], // Hot pink, turquoise, deep pink, lime - vibrant energy
};

// Buzzvil Design Principles - 3 distinct, smooth animations
const BUZZVIL_PRINCIPLE_ANIMATIONS = {
  'reward-time': {
    // Animation 1: Complex morphing with random-like patterns
    color1: {
      animate: {
        scale: [1, 1.2, 0.8, 1.3, 0.7, 1.15, 0.9, 1.1, 1],
        opacity: [1, 0.6, 1, 0.4, 1, 0.8, 0.9, 0.7, 1],
        rotate: [0, 12, -8, 20, -15, 10, -5, 18, 0],
        x: [0, 2, -1, 3, -2, 1, -1, 2, 0],
        y: [0, -1, 2, -2, 1, -1, 2, -1, 0],
      },
      transition: {
        duration: 8.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.7, 0.8, 0.9, 1]
      }
    },
    color2: {
      animate: {
        scale: [1, 0.7, 1.25, 0.6, 1.4, 0.8, 1.2, 0.9, 1],
        opacity: [1, 0.8, 0.3, 1, 0.5, 0.9, 0.6, 0.8, 1],
        rotate: [0, -18, 15, -25, 12, -8, 22, -12, 0],
        x: [0, -2, 1, -3, 2, -1, 1, -2, 0],
        y: [0, 1, -2, 2, -1, 1, -2, 1, 0],
      },
      transition: {
        duration: 7.2,
        repeat: Infinity,
        ease: "easeOut" as const,
        delay: 1.5,
        times: [0, 0.2, 0.35, 0.5, 0.65, 0.75, 0.85, 0.95, 1]
      }
    }
  },
  'playful': {
    // Animation 2: Wild chaotic morphing with extreme randomness
    color1: {
      animate: {
        scale: [1, 1.4, 0.6, 1.6, 0.4, 1.3, 0.7, 1.5, 0.8, 1.2, 1],
        rotate: [0, 35, -25, 45, -30, 20, -40, 30, -15, 25, 0],
        opacity: [1, 0.3, 1, 0.2, 1, 0.6, 0.8, 0.4, 1, 0.7, 1],
        x: [0, 4, -3, 5, -4, 2, -2, 3, -1, 2, 0],
        y: [0, -3, 4, -5, 3, -2, 2, -3, 1, -2, 0],
        skewX: [0, 8, -6, 12, -8, 4, -4, 6, -2, 4, 0],
        skewY: [0, -6, 8, -10, 6, -3, 3, -5, 2, -3, 0],
      },
      transition: {
        duration: 4.8,
        repeat: Infinity,
        ease: "easeOut" as const,
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    },
    color2: {
      animate: {
        scale: [1, 0.5, 1.5, 0.3, 1.7, 0.6, 1.4, 0.4, 1.6, 0.8, 1],
        rotate: [0, -40, 30, -50, 35, -25, 45, -35, 20, -30, 0],
        opacity: [1, 0.7, 0.2, 1, 0.3, 0.8, 0.5, 1, 0.4, 0.9, 1],
        x: [0, -4, 3, -5, 4, -2, 2, -3, 1, -2, 0],
        y: [0, 3, -4, 5, -3, 2, -2, 3, -1, 2, 0],
        skewX: [0, -8, 6, -12, 8, -4, 4, -6, 2, -4, 0],
        skewY: [0, 6, -8, 10, -6, 3, -3, 5, -2, 3, 0],
      },
      transition: {
        duration: 4.0,
        repeat: Infinity,
        ease: "easeIn" as const,
        delay: 0.8,
        times: [0, 0.12, 0.22, 0.32, 0.42, 0.52, 0.62, 0.72, 0.82, 0.92, 1]
      }
    }
  },
  'scalable': {
    // Animation 3: Complex morphing with fluid-like transformations
    color1: {
      animate: {
        scale: [1, 1.3, 0.7, 1.5, 0.5, 1.4, 0.8, 1.2, 0.9, 1.1, 1],
        opacity: [1, 0.4, 1, 0.3, 1, 0.6, 0.8, 0.5, 1, 0.7, 1],
        rotate: [0, 25, -20, 35, -25, 15, -30, 20, -10, 15, 0],
        x: [0, 3, -2, 4, -3, 1, -2, 2, -1, 1, 0],
        y: [0, -2, 3, -4, 2, -1, 2, -2, 1, -1, 0],
        skewX: [0, 10, -8, 15, -10, 5, -5, 8, -3, 5, 0],
        skewY: [0, -8, 10, -12, 8, -4, 4, -6, 2, -4, 0],
      },
      transition: {
        duration: 9.2,
        repeat: Infinity,
        ease: "easeInOut" as const,
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    },
    color2: {
      animate: {
        scale: [1, 0.6, 1.4, 0.4, 1.6, 0.7, 1.3, 0.5, 1.5, 0.8, 1],
        opacity: [1, 0.8, 0.3, 1, 0.4, 0.9, 0.6, 1, 0.5, 0.8, 1],
        rotate: [0, -30, 25, -40, 30, -20, 35, -25, 15, -20, 0],
        x: [0, -3, 2, -4, 3, -1, 2, -2, 1, -1, 0],
        y: [0, 2, -3, 4, -2, 1, -2, 2, -1, 1, 0],
        skewX: [0, -10, 8, -15, 10, -5, 5, -8, 3, -5, 0],
        skewY: [0, 8, -10, 12, -8, 4, -4, 6, -2, 4, 0],
      },
      transition: {
        duration: 7.5,
        repeat: Infinity,
        ease: "easeOut" as const,
        delay: 1.8,
        times: [0, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95, 1]
      }
    }
  },
};

const defaultColors = ["#F6C750", "#E63525", "#050D4C", "#D4EBEE"];

function AvatarFallback({
  name,
  size = DEFAULT_SIZE,
  className = "",
  philosophy,
  workingStyle,
}: {
  name: string;
  size?: number;
  className?: string;
  philosophy?: string;
  workingStyle?: string;
}) {
  const titleId = React.useId();
  
  // Use Buzzvil value-based colors if available, otherwise use default colors
  const colors = philosophy && BUZZVIL_VALUE_COLORS[philosophy as keyof typeof BUZZVIL_VALUE_COLORS] 
    ? BUZZVIL_VALUE_COLORS[philosophy as keyof typeof BUZZVIL_VALUE_COLORS]
    : defaultColors;
    
  const properties = generateColors(name, colors);

  const maskId = React.useId();
  const filterId = React.useId();

  // Get animation props based on Buzzvil principle
  const animationConfig = workingStyle && BUZZVIL_PRINCIPLE_ANIMATIONS[workingStyle as keyof typeof BUZZVIL_PRINCIPLE_ANIMATIONS]
    ? BUZZVIL_PRINCIPLE_ANIMATIONS[workingStyle as keyof typeof BUZZVIL_PRINCIPLE_ANIMATIONS]
    : null;

  return (
    <div className={`inline-block ${className}`}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        role="img"
        aria-describedby={titleId}
        width={size}
        height={size}
        className="rounded-full"
      >
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={size}
          height={size}
        >
          <rect width={size} height={size} rx={size * 2} fill="#FFFFFF" />
        </mask>
        <g mask={`url(#${maskId})`}>
          {/* Background color - static */}
          <rect width={size} height={size} fill={properties[0].color} />
          
          {/* First animated color layer */}
          <motion.g
            animate={animationConfig?.color1?.animate}
            transition={animationConfig?.color1?.transition}
            style={{
              transformOrigin: `${size / 2}px ${size / 2}px`,
            }}
          >
            <path
              filter={`url(#${filterId})`}
              d="M32.414 59.35L50.376 70.5H72.5v-71H33.728L26.5 13.381l19.057 27.08L32.414 59.35z"
              fill={properties[1].color}
              transform={`
                translate(${properties[1].translateX} ${properties[1].translateY})
                rotate(${properties[1].rotate} ${size / 2} ${size / 2})
                scale(${properties[1].scale})
              `}
            />
          </motion.g>
          
          {/* Second animated color layer */}
          <motion.g
            animate={animationConfig?.color2?.animate}
            transition={animationConfig?.color2?.transition}
            style={{
              transformOrigin: `${size / 2}px ${size / 2}px`,
              mixBlendMode: "overlay",
            }}
          >
            <path
              filter={`url(#${filterId})`}
              d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
              fill={properties[2].color}
              transform={`
                translate(${properties[2].translateX} ${properties[2].translateY})
                rotate(${properties[2].rotate} ${size / 2} ${size / 2})
                scale(${properties[2].scale})
              `}
            />
          </motion.g>
        </g>
        <defs>
          <filter
            id={filterId}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation={7} result="effect1_foregroundBlur" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(
    {
      name,
      size = DEFAULT_SIZE,
      className = "",
      philosophy,
      workingStyle,
      ...rest
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={className}
        {...rest}
      >
        <AvatarFallback 
          name={name} 
          size={size} 
          philosophy={philosophy}
          workingStyle={workingStyle}
        />
      </div>
    );
  }
);

export default Avatar;
