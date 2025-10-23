'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 24 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 400 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M50.4097 151.781L41 185.043L108.351 177.797L90.5309 239.066C80.9242 272.096 107.848 304.333 142.061 300.766L307.749 283.49C327.387 281.443 343.817 267.679 349.274 248.704L359 214.882L292.075 221.703L309.478 160.693C318.893 127.686 291.937 95.6293 257.804 99.2421L91.9166 116.8C72.2329 118.884 55.7977 132.735 50.4097 151.781ZM243.48 163.303L175.276 170.55L156.52 236.622L224.298 229.376L243.48 163.303Z" 
        fill="currentColor"
      />
    </svg>
  );
};

export default Logo;
