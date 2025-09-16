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

// Philosophy-based color palettes - meaningful yet creative and varied
const PHILOSOPHY_COLORS = {
  'rewarded': ["#FFD700", "#FF6B35", "#FFE135"], // Gold, burnt orange, bright yellow - success with warmth
  'playful': ["#FF69B4", "#00CED1", "#FF1493", "#32CD32"], // Hot pink, turquoise, deep pink, lime - vibrant energy
  'scalable': ["#32CD32", "#00FA9A", "#7FFF00", "#228B22"], // Lime, spring green, chartreuse, forest - growth spectrum
  'one-team': ["#4169E1", "#1E90FF", "#87CEEB", "#4682B4"], // Royal blue, dodger blue, sky blue, steel blue - unity depth
  'clarity': ["#F0F8FF", "#E6E6FA", "#FFFFFF", "#B0C4DE"], // Alice blue, lavender, white, light steel - clear spectrum
  'grit': ["#8B0000", "#DC143C", "#B22222", "#FF4500"], // Dark red, crimson, fire brick, orange red - power with energy
};

// Work style-based internal color animation variants - smooth and meaningful
const WORK_STYLE_ANIMATIONS = {
  'iterative': {
    // Smooth, rhythmic pulse - like a heartbeat
    color1: {
      animate: {
        scale: [1, 1.15, 1],
        translateX: [0, 2, 0],
        translateY: [0, -1, 0],
      },
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.9, 1],
        translateX: [0, -1, 0],
        translateY: [0, 2, 0],
      },
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  },
  'detail-oriented': {
    // Gentle, precise movements - like fine-tuning
    color1: {
      animate: {
        scale: [1, 1.05, 1],
        translateX: [0, 1, 0],
        translateY: [0, 0.5, 0],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.98, 1],
        translateX: [0, -0.5, 0],
        translateY: [0, -1, 0],
      },
      transition: {
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  },
  'big-picture': {
    // Slow, majestic movements - like conducting an orchestra
    color1: {
      animate: {
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
        translateX: [0, 8, 0],
        translateY: [0, -6, 0],
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.85, 1],
        rotate: [0, -180, -360],
        translateX: [0, -6, 0],
        translateY: [0, 8, 0],
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  },
  'collaborative': {
    // Harmonious, flowing movements - like a dance
    color1: {
      animate: {
        scale: [1, 1.1, 1],
        translateX: [0, 6, 0],
        translateY: [0, -4, 0],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.95, 1],
        translateX: [0, -4, 0],
        translateY: [0, 6, 0],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  },
  'experimental': {
    // Dynamic, creative movements - like artistic expression
    color1: {
      animate: {
        scale: [1, 1.3, 0.8, 1.2, 1],
        rotate: [0, 90, 180, 270, 360],
        translateX: [0, 8, -6, 4, 0],
        translateY: [0, -6, 8, -4, 0],
      },
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.8, 1.2, 0.9, 1],
        rotate: [0, -90, -180, -270, -360],
        translateX: [0, -6, 4, -8, 0],
        translateY: [0, 4, -8, 6, 0],
      },
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  },
  'systematic': {
    // Precise, rhythmic movements - like a metronome
    color1: {
      animate: {
        scale: [1, 1.02, 1],
        translateX: [0, 1, 0],
        translateY: [0, 0.5, 0],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.98, 1],
        translateX: [0, -0.5, 0],
        translateY: [0, -1, 0],
      },
      transition: {
        duration: 2,
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
  
  // Use philosophy-based colors if available, otherwise use default colors
  const colors = philosophy && PHILOSOPHY_COLORS[philosophy as keyof typeof PHILOSOPHY_COLORS] 
    ? PHILOSOPHY_COLORS[philosophy as keyof typeof PHILOSOPHY_COLORS]
    : defaultColors;
    
  const properties = generateColors(name, colors);

  const maskId = React.useId();
  const filterId = React.useId();

  // Get animation props based on working style
  const animationConfig = workingStyle && WORK_STYLE_ANIMATIONS[workingStyle as keyof typeof WORK_STYLE_ANIMATIONS]
    ? WORK_STYLE_ANIMATIONS[workingStyle as keyof typeof WORK_STYLE_ANIMATIONS]
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
