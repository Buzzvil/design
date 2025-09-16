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

// Philosophy-based color palettes
const PHILOSOPHY_COLORS = {
  'rewarded': ["#FF6B6B", "#FFE66D", "#4ECDC4"],
  'playful': ["#667EEA", "#764BA2", "#F093FB"],
  'scalable': ["#56AB2F", "#A8E6CF", "#FFD93D"],
  'one-team': ["#FF416C", "#FF4B2B", "#FF6B6B"],
  'clarity': ["#2C3E50", "#34495E", "#ECF0F1"],
  'grit': ["#FF9A9E", "#FECFEF", "#FECFEF"],
};

// Work style-based animation variants
const WORK_STYLE_ANIMATIONS = {
  'iterative': {
    animate: {
      rotate: [0, 360],
      scale: [1, 1.1, 1],
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "linear"
    }
  },
  'detail-oriented': {
    animate: {
      scale: [1, 1.05, 1],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  'big-picture': {
    animate: {
      rotate: [0, 180, 360],
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  'collaborative': {
    animate: {
      x: [0, 5, -5, 0],
      y: [0, -5, 5, 0],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  'experimental': {
    animate: {
      scale: [1, 1.2, 0.8, 1],
      rotate: [0, 90, 180, 270, 360],
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  'systematic': {
    animate: {
      scale: [1, 1.02, 1],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear"
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
  const animationProps = workingStyle && WORK_STYLE_ANIMATIONS[workingStyle as keyof typeof WORK_STYLE_ANIMATIONS]
    ? WORK_STYLE_ANIMATIONS[workingStyle as keyof typeof WORK_STYLE_ANIMATIONS]
    : {};

  return (
    <motion.div 
      className={`inline-block ${className}`}
      {...animationProps}
    >
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
          <rect width={size} height={size} fill={properties[0].color} />
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
          <path
            filter={`url(#${filterId})`}
            style={{
              mixBlendMode: "overlay",
            }}
            d="M22.216 24L0 46.75l14.108 38.129L78 86l-3.081-59.276-22.378 4.005 12.972 20.186-23.35 27.395L22.215 24z"
            fill={properties[2].color}
            transform={`
              translate(${properties[2].translateX} ${properties[2].translateY})
              rotate(${properties[2].rotate} ${size / 2} ${size / 2})
              scale(${properties[2].scale})
            `}
          />
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
    </motion.div>
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
