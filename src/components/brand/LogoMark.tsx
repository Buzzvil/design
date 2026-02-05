'use client';

import { CSSProperties } from 'react';

interface LogoMarkProps {
  className?: string;
  color?: string;
  style?: CSSProperties;
  strokeOnly?: boolean;
}

const LOGO_PATH =
  'M41.8181 230.081L-7.62572e-05 377.903L295.324 346.128L215.926 619.116C174.403 761.879 290.773 901.214 438.649 885.796L1171.68 809.366C1256.57 800.516 1327.58 741.026 1351.17 659.009L1394.38 508.743L1100.92 538.649L1178.46 266.811C1219.16 124.147 1102.65 -14.409 955.116 1.20647L221.222 78.8856C136.144 87.8907 65.1067 147.758 41.8181 230.081ZM887.842 282.577L588.779 314.352L506.537 604.069L803.731 572.294L887.842 282.577Z';

export const LogoMark = ({ className = '', color = 'currentColor', style, strokeOnly = false }: LogoMarkProps) => (
  <svg
    viewBox="0 0 1395 887"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d={LOGO_PATH}
      fill={strokeOnly ? 'none' : color}
      stroke={strokeOnly ? color : undefined}
      strokeWidth={strokeOnly ? 48 : undefined}
      strokeLinejoin={strokeOnly ? 'round' : undefined}
      strokeLinecap={strokeOnly ? 'round' : undefined}
    />
  </svg>
);
