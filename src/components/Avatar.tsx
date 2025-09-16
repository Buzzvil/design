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

// Philosophy-based color palettes - meaningful and purposeful
const PHILOSOPHY_COLORS = {
  'rewarded': ["#FFD700", "#FFA500", "#FF8C00"], // Gold, amber, orange - success and achievement
  'playful': ["#FF69B4", "#00CED1", "#FF1493"], // Hot pink, turquoise, deep pink - fun and vibrant
  'scalable': ["#32CD32", "#00FA9A", "#7FFF00"], // Lime green, medium spring green, chartreuse - growth and expansion
  'one-team': ["#4169E1", "#1E90FF", "#87CEEB"], // Royal blue, dodger blue, sky blue - unity and collaboration
  'clarity': ["#F0F8FF", "#E6E6FA", "#FFFFFF"], // Alice blue, lavender, white - clear and transparent
  'grit': ["#8B0000", "#DC143C", "#B22222"], // Dark red, crimson, fire brick - powerful and determined
};

// Work style-based internal color animation variants - meaningful and purposeful
const WORK_STYLE_ANIMATIONS = {
  'iterative': {
    // Methodical, step-by-step refinement - like polishing a gem
    color1: {
      animate: {
        scale: [1, 1.08, 1.12, 1.08, 1],
        rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
        translateX: [0, 3, 0, -3, 0],
        translateY: [0, -2, 0, 2, 0],
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.95, 0.92, 0.95, 1],
        rotate: [0, -30, -60, -90, -120, -150, -180, -210, -240, -270, -300, -330, -360],
        translateX: [0, -2, 0, 2, 0],
        translateY: [0, 3, 0, -3, 0],
      },
      transition: {
        duration: 8.5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  },
  'detail-oriented': {
    // Precise, careful movements - like a surgeon's hand
    color1: {
      animate: {
        scale: [1, 1.02, 1.04, 1.02, 1],
        translateX: [0, 1, 0.5, -0.5, 0],
        translateY: [0, 0.5, 1, 0.5, 0],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.99, 0.98, 0.99, 1],
        translateX: [0, -0.5, -1, -0.5, 0],
        translateY: [0, -1, -0.5, 0.5, 0],
      },
      transition: {
        duration: 3.2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  },
  'big-picture': {
    // Grand, sweeping movements - like orchestrating a symphony
    color1: {
      animate: {
        scale: [1, 1.3, 1.5, 1.3, 1],
        rotate: [0, 90, 180, 270, 360],
        translateX: [0, 15, 0, -15, 0],
        translateY: [0, -10, 0, 10, 0],
      },
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.7, 0.5, 0.7, 1],
        rotate: [0, -90, -180, -270, -360],
        translateX: [0, -12, 0, 12, 0],
        translateY: [0, 8, 0, -8, 0],
      },
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  },
  'collaborative': {
    // Harmonious, synchronized movements - like a dance partnership
    color1: {
      animate: {
        scale: [1, 1.1, 1, 0.9, 1],
        translateX: [0, 8, 0, -8, 0],
        translateY: [0, -6, 0, 6, 0],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.9, 1, 1.1, 1],
        translateX: [0, -6, 0, 6, 0],
        translateY: [0, 8, 0, -8, 0],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  },
  'experimental': {
    // Bold, unpredictable movements - like a mad scientist's experiment
    color1: {
      animate: {
        scale: [1, 1.4, 0.6, 1.6, 0.8, 1],
        rotate: [0, 72, 144, 216, 288, 360],
        translateX: [0, 15, -10, 8, -12, 0],
        translateY: [0, -12, 15, -8, 10, 0],
      },
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.7, 1.5, 0.5, 1.3, 1],
        rotate: [0, -108, -216, -324, -432, -540],
        translateX: [0, -12, 8, -15, 6, 0],
        translateY: [0, 10, -6, 12, -8, 0],
      },
      transition: {
        duration: 6.5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  },
  'systematic': {
    // Precise, mechanical movements - like clockwork
    color1: {
      animate: {
        scale: [1, 1.01, 1, 0.99, 1],
        translateX: [0, 2, 0, -2, 0],
        translateY: [0, 1, 0, -1, 0],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear" as const
      }
    },
    color2: {
      animate: {
        scale: [1, 0.99, 1, 1.01, 1],
        translateX: [0, -1, 0, 1, 0],
        translateY: [0, -2, 0, 2, 0],
      },
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear" as const
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
