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
    // Animation 1: Gentle pulse scale - like a heartbeat or time passing
    color1: {
      animate: {
        scale: [1, 1.08, 1],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.95, 1],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: 0.5
      }
    }
  },
  'playful': {
    // Animation 2: Subtle bouncy movements - like gentle play
    color1: {
      animate: {
        scale: [1, 1.08, 0.98, 1.05, 1],
        translateX: [0, 2, -1.5, 1, 0],
        translateY: [0, -1.5, 2, -1, 0],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.92, 1.05, 0.98, 1],
        translateX: [0, -1.5, 1, -2, 0],
        translateY: [0, 1, -2, 1.5, 0],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  },
  'scalable': {
    // Animation 3: Very subtle expanding movements - like gentle scaling
    color1: {
      animate: {
        scale: [1, 1.05, 1],
        rotate: [0, 120, 240, 360],
        translateX: [0, 1.5, 0],
        translateY: [0, -1, 0],
      },
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.96, 1],
        rotate: [0, -120, -240, -360],
        translateX: [0, -1, 0],
        translateY: [0, 1.5, 0],
      },
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut" as const
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
            {...(animationConfig?.color1 || {})}
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
            {...(animationConfig?.color2 || {})}
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
