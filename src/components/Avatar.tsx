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

// Generate random values for organic, non-looping animations
const generateRandomSequence = (length: number, min: number, max: number, seed: number = 0) => {
  const sequence = [];
  let current = (Math.sin(seed) + 1) / 2; // Start with a random value based on seed
  
  for (let i = 0; i < length; i++) {
    // Use a combination of sine waves and random noise for organic movement
    const sineWave = Math.sin((i / length) * Math.PI * 2 + seed);
    const noise = (Math.random() - 0.5) * 0.3; // Random noise
    const drift = (Math.random() - 0.5) * 0.1; // Slow drift
    
    current = Math.max(min, Math.min(max, current + sineWave * 0.1 + noise + drift));
    sequence.push(current);
  }
  
  return sequence;
};

// Buzzvil Design Principles - Each with a specific property focus and organic randomness
const BUZZVIL_PRINCIPLE_ANIMATIONS = {
  'reward-time': {
    // Focus: SCALE - Time-based breathing and pulsing
    color1: {
      animate: {
        // Primary: Scale variations (breathing effect)
        scale: generateRandomSequence(12, 0.8, 1.3, 1),
        // Secondary: Subtle opacity changes
        opacity: generateRandomSequence(12, 0.7, 1.0, 2),
        // Minimal rotation for organic feel
        rotate: generateRandomSequence(12, -15, 15, 3),
        // Very subtle position changes
        x: generateRandomSequence(12, -2, 2, 4),
        y: generateRandomSequence(12, -2, 2, 5),
      },
      transition: {
        duration: 6.0 + Math.random() * 2, // Random duration for unpredictability
        repeat: Infinity,
        ease: "easeInOut" as const,
        repeatType: "reverse" as const,
      }
    },
    color2: {
      animate: {
        // Counter-balancing scale
        scale: generateRandomSequence(12, 0.7, 1.4, 6),
        opacity: generateRandomSequence(12, 0.6, 1.0, 7),
        rotate: generateRandomSequence(12, -20, 20, 8),
        x: generateRandomSequence(12, -3, 3, 9),
        y: generateRandomSequence(12, -3, 3, 10),
      },
      transition: {
        duration: 5.5 + Math.random() * 1.5,
        repeat: Infinity,
        ease: "easeOut" as const,
        delay: 0.8 + Math.random() * 0.4,
        repeatType: "reverse" as const,
      }
    }
  },
  'playful': {
    // Focus: ROTATION - Playful spinning and tumbling
    color1: {
      animate: {
        // Primary: Rotation variations (playful spinning)
        rotate: generateRandomSequence(15, -180, 180, 11),
        // Secondary: Scale for bouncy effect
        scale: generateRandomSequence(15, 0.9, 1.2, 12),
        // Opacity for sparkle effect
        opacity: generateRandomSequence(15, 0.8, 1.0, 13),
        // Position for floating effect
        x: generateRandomSequence(15, -4, 4, 14),
        y: generateRandomSequence(15, -4, 4, 15),
        // Skew for playful distortion
        skewX: generateRandomSequence(15, -10, 10, 16),
        skewY: generateRandomSequence(15, -10, 10, 17),
      },
      transition: {
        duration: 4.0 + Math.random() * 1.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
        repeatType: "reverse" as const,
      }
    },
    color2: {
      animate: {
        // Counter-rotating for dynamic interaction
        rotate: generateRandomSequence(15, -200, 200, 18),
        scale: generateRandomSequence(15, 0.8, 1.3, 19),
        opacity: generateRandomSequence(15, 0.7, 1.0, 20),
        x: generateRandomSequence(15, -5, 5, 21),
        y: generateRandomSequence(15, -5, 5, 22),
        skewX: generateRandomSequence(15, -12, 12, 23),
        skewY: generateRandomSequence(15, -12, 12, 24),
      },
      transition: {
        duration: 3.5 + Math.random() * 1.0,
        repeat: Infinity,
        ease: "easeOut" as const,
        delay: 0.5 + Math.random() * 0.3,
        repeatType: "reverse" as const,
      }
    }
  },
  'scalable': {
    // Focus: POSITION (X/Y) - Growth and expansion patterns
    color1: {
      animate: {
        // Primary: Position changes (growth patterns)
        x: generateRandomSequence(18, -6, 6, 25),
        y: generateRandomSequence(18, -6, 6, 26),
        // Secondary: Scale for expansion
        scale: generateRandomSequence(18, 0.85, 1.25, 27),
        // Opacity for layering effect
        opacity: generateRandomSequence(18, 0.75, 1.0, 28),
        // Minimal rotation for organic growth
        rotate: generateRandomSequence(18, -25, 25, 29),
        // Skew for dynamic scaling
        skewX: generateRandomSequence(18, -8, 8, 30),
        skewY: generateRandomSequence(18, -8, 8, 31),
      },
      transition: {
        duration: 7.0 + Math.random() * 2.0,
        repeat: Infinity,
        ease: "easeInOut" as const,
        repeatType: "reverse" as const,
      }
    },
    color2: {
      animate: {
        // Complementary position patterns
        x: generateRandomSequence(18, -7, 7, 32),
        y: generateRandomSequence(18, -7, 7, 33),
        scale: generateRandomSequence(18, 0.8, 1.3, 34),
        opacity: generateRandomSequence(18, 0.7, 1.0, 35),
        rotate: generateRandomSequence(18, -30, 30, 36),
        skewX: generateRandomSequence(18, -10, 10, 37),
        skewY: generateRandomSequence(18, -10, 10, 38),
      },
      transition: {
        duration: 6.5 + Math.random() * 1.5,
        repeat: Infinity,
        ease: "easeOut" as const,
        delay: 1.0 + Math.random() * 0.5,
        repeatType: "reverse" as const,
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