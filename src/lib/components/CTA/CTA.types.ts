import { ReactNode } from 'react';

export type CTASize = 'sm' | 'md' | 'lg';
export type CTAVariant = 'primary' | 'secondary' | 'outline';

export interface CTAProps {
  children: ReactNode;
  variant?: CTAVariant;
  size?: CTASize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
}
