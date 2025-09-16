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

// Buzzvil Values - Color palettes and initial positioning for working styles
const BUZZVIL_VALUE_CONFIG = {
  'iterate-fast': {
    colors: ["#FF6B35", "#FFD700", "#FFE135", "#FF8C00"], // Orange, gold, bright yellow, dark orange - speed and energy
    initialPositions: { color1: { x: 0, y: 0 }, color2: { x: 0, y: 0 } }, // Centered for speed
    shapes: { color1: "sharp", color2: "dynamic" } // Sharp, dynamic shapes for speed
  },
  'clarity': {
    colors: ["#F0F8FF", "#E6E6FA", "#FFFFFF", "#B0C4DE"], // Alice blue, lavender, white, light steel - clear spectrum
    initialPositions: { color1: { x: 0, y: 0 }, color2: { x: 0, y: 0 } }, // Centered for clarity
    shapes: { color1: "clean", color2: "minimal" } // Clean, minimal shapes for clarity
  },
  'grit': {
    colors: ["#8B0000", "#DC143C", "#B22222", "#FF4500"], // Dark red, crimson, fire brick, orange red - power with energy
    initialPositions: { color1: { x: -2, y: -2 }, color2: { x: 2, y: 2 } }, // Offset for power
    shapes: { color1: "bold", color2: "strong" } // Bold, strong shapes for grit
  },
  'bold': {
    colors: ["#8B008B", "#FF1493", "#DC143C", "#B22222"], // Dark magenta, deep pink, crimson, fire brick - bold and daring
    initialPositions: { color1: { x: -3, y: 0 }, color2: { x: 3, y: 0 } }, // Wide spread for boldness
    shapes: { color1: "dramatic", color2: "striking" } // Dramatic, striking shapes for bold
  },
  'one-team': {
    colors: ["#4169E1", "#1E90FF", "#87CEEB", "#4682B4"], // Royal blue, dodger blue, sky blue, steel blue - unity depth
    initialPositions: { color1: { x: 0, y: -2 }, color2: { x: 0, y: 2 } }, // Vertical alignment for unity
    shapes: { color1: "unified", color2: "connected" } // Unified, connected shapes for one-team
  },
  'delight': {
    colors: ["#FF69B4", "#00CED1", "#FF1493", "#32CD32"], // Hot pink, turquoise, deep pink, lime - vibrant energy
    initialPositions: { color1: { x: -2, y: -2 }, color2: { x: 2, y: 2 } }, // Diagonal spread for delight
    shapes: { color1: "playful", color2: "vibrant" } // Playful, vibrant shapes for delight
  },
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

// Buzzvil Design Principles - Enhanced with more movements, slower but more dynamic
const BUZZVIL_PRINCIPLE_ANIMATIONS = {
  'reward-time': {
    // Focus: SCALE + MULTIPLE MOVEMENTS - Time-based breathing with rich movement
    color1: {
      animate: {
        // Primary: Scale variations (breathing effect)
        scale: generateRandomSequence(20, 0.8, 1.4, 1),
        // Enhanced opacity changes
        opacity: generateRandomSequence(20, 0.6, 1.0, 2),
        // More rotation for organic feel
        rotate: generateRandomSequence(20, -30, 30, 3),
        // Enhanced position changes
        x: generateRandomSequence(20, -4, 4, 4),
        y: generateRandomSequence(20, -4, 4, 5),
        // Additional movements
        skewX: generateRandomSequence(20, -15, 15, 6),
        skewY: generateRandomSequence(20, -15, 15, 7),
        scaleX: generateRandomSequence(20, 0.9, 1.2, 8),
        scaleY: generateRandomSequence(20, 0.9, 1.2, 9),
        rotateX: generateRandomSequence(20, -20, 20, 10),
        rotateY: generateRandomSequence(20, -20, 20, 11),
      },
      transition: {
        duration: 8.0 + Math.random() * 3, // Slower but more varied
        repeat: Infinity,
        ease: "easeInOut" as const,
        repeatType: "reverse" as const,
      }
    },
    color2: {
      animate: {
        // Counter-balancing with more movements
        scale: generateRandomSequence(20, 0.7, 1.5, 12),
        opacity: generateRandomSequence(20, 0.5, 1.0, 13),
        rotate: generateRandomSequence(20, -35, 35, 14),
        x: generateRandomSequence(20, -5, 5, 15),
        y: generateRandomSequence(20, -5, 5, 16),
        skewX: generateRandomSequence(20, -18, 18, 17),
        skewY: generateRandomSequence(20, -18, 18, 18),
        scaleX: generateRandomSequence(20, 0.8, 1.3, 19),
        scaleY: generateRandomSequence(20, 0.8, 1.3, 20),
        rotateX: generateRandomSequence(20, -25, 25, 21),
        rotateY: generateRandomSequence(20, -25, 25, 22),
      },
      transition: {
        duration: 7.5 + Math.random() * 2.5,
        repeat: Infinity,
        ease: "easeOut" as const,
        delay: 1.2 + Math.random() * 0.6,
        repeatType: "reverse" as const,
      }
    }
  },
  'playful': {
    // Focus: ROTATION + MULTIPLE MOVEMENTS - Playful spinning with rich dynamics
    color1: {
      animate: {
        // Primary: Enhanced rotation variations
        rotate: generateRandomSequence(25, -360, 360, 23),
        // More scale variations for bouncy effect
        scale: generateRandomSequence(25, 0.8, 1.3, 24),
        // Enhanced opacity for sparkle effect
        opacity: generateRandomSequence(25, 0.7, 1.0, 25),
        // More position changes for floating effect
        x: generateRandomSequence(25, -6, 6, 26),
        y: generateRandomSequence(25, -6, 6, 27),
        // Enhanced skew for playful distortion
        skewX: generateRandomSequence(25, -20, 20, 28),
        skewY: generateRandomSequence(25, -20, 20, 29),
        // Additional movements
        scaleX: generateRandomSequence(25, 0.85, 1.25, 30),
        scaleY: generateRandomSequence(25, 0.85, 1.25, 31),
        rotateX: generateRandomSequence(25, -30, 30, 32),
        rotateY: generateRandomSequence(25, -30, 30, 33),
        rotateZ: generateRandomSequence(25, -45, 45, 34),
      },
      transition: {
        duration: 6.0 + Math.random() * 2.5, // Slower but more dynamic
        repeat: Infinity,
        ease: "easeInOut" as const,
        repeatType: "reverse" as const,
      }
    },
    color2: {
      animate: {
        // Counter-rotating with enhanced movements
        rotate: generateRandomSequence(25, -400, 400, 35),
        scale: generateRandomSequence(25, 0.75, 1.4, 36),
        opacity: generateRandomSequence(25, 0.6, 1.0, 37),
        x: generateRandomSequence(25, -7, 7, 38),
        y: generateRandomSequence(25, -7, 7, 39),
        skewX: generateRandomSequence(25, -22, 22, 40),
        skewY: generateRandomSequence(25, -22, 22, 41),
        scaleX: generateRandomSequence(25, 0.8, 1.3, 42),
        scaleY: generateRandomSequence(25, 0.8, 1.3, 43),
        rotateX: generateRandomSequence(25, -35, 35, 44),
        rotateY: generateRandomSequence(25, -35, 35, 45),
        rotateZ: generateRandomSequence(25, -50, 50, 46),
      },
      transition: {
        duration: 5.5 + Math.random() * 2.0,
        repeat: Infinity,
        ease: "easeOut" as const,
        delay: 0.8 + Math.random() * 0.5,
        repeatType: "reverse" as const,
      }
    }
  },
  'scalable': {
    // Focus: POSITION + MULTIPLE MOVEMENTS - Growth patterns with rich expansion
    color1: {
      animate: {
        // Primary: Enhanced position changes
        x: generateRandomSequence(30, -8, 8, 47),
        y: generateRandomSequence(30, -8, 8, 48),
        // More scale variations for expansion
        scale: generateRandomSequence(30, 0.8, 1.3, 49),
        // Enhanced opacity for layering effect
        opacity: generateRandomSequence(30, 0.7, 1.0, 50),
        // More rotation for organic growth
        rotate: generateRandomSequence(30, -40, 40, 51),
        // Enhanced skew for dynamic scaling
        skewX: generateRandomSequence(30, -12, 12, 52),
        skewY: generateRandomSequence(30, -12, 12, 53),
        // Additional movements
        scaleX: generateRandomSequence(30, 0.85, 1.2, 54),
        scaleY: generateRandomSequence(30, 0.85, 1.2, 55),
        rotateX: generateRandomSequence(30, -25, 25, 56),
        rotateY: generateRandomSequence(30, -25, 25, 57),
        rotateZ: generateRandomSequence(30, -30, 30, 58),
      },
      transition: {
        duration: 9.0 + Math.random() * 3.0, // Slower for growth patterns
        repeat: Infinity,
        ease: "easeInOut" as const,
        repeatType: "reverse" as const,
      }
    },
    color2: {
      animate: {
        // Complementary position patterns with more movements
        x: generateRandomSequence(30, -9, 9, 59),
        y: generateRandomSequence(30, -9, 9, 60),
        scale: generateRandomSequence(30, 0.75, 1.4, 61),
        opacity: generateRandomSequence(30, 0.6, 1.0, 62),
        rotate: generateRandomSequence(30, -45, 45, 63),
        skewX: generateRandomSequence(30, -15, 15, 64),
        skewY: generateRandomSequence(30, -15, 15, 65),
        scaleX: generateRandomSequence(30, 0.8, 1.25, 66),
        scaleY: generateRandomSequence(30, 0.8, 1.25, 67),
        rotateX: generateRandomSequence(30, -30, 30, 68),
        rotateY: generateRandomSequence(30, -30, 30, 69),
        rotateZ: generateRandomSequence(30, -35, 35, 70),
      },
      transition: {
        duration: 8.5 + Math.random() * 2.5,
        repeat: Infinity,
        ease: "easeOut" as const,
        delay: 1.5 + Math.random() * 0.8,
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
  
  // Use Buzzvil value-based configuration if available, otherwise use default colors
  const valueConfig = philosophy && BUZZVIL_VALUE_CONFIG[philosophy as keyof typeof BUZZVIL_VALUE_CONFIG];
  const colors = valueConfig ? valueConfig.colors : defaultColors;
  const initialPositions = valueConfig ? valueConfig.initialPositions : { color1: { x: 0, y: 0 }, color2: { x: 0, y: 0 } };
    
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
                translate(${properties[1].translateX + initialPositions.color1.x} ${properties[1].translateY + initialPositions.color1.y})
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
                translate(${properties[2].translateX + initialPositions.color2.x} ${properties[2].translateY + initialPositions.color2.y})
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