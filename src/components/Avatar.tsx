'use client';

import * as React from "react";
import { generateColors } from "@/utils/avatar";

const DEFAULT_SIZE = 40;

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  size?: number;
  className?: string;
}

const colors = ["#F6C750", "#E63525", "#050D4C", "#D4EBEE"];

function AvatarFallback({
  name,
  size = DEFAULT_SIZE,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const titleId = React.useId();
  const properties = generateColors(name, colors);

  const maskId = React.useId();
  const filterId = React.useId();

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
    </div>
  );
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(
    {
      name,
      size = DEFAULT_SIZE,
      className = "",
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
        <AvatarFallback name={name} size={size} />
      </div>
    );
  }
);

export default Avatar;
