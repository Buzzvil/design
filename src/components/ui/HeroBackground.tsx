'use client';

import { motion } from 'framer-motion';

/* ─── Color palette type ─── */
export interface HeroPalette {
  /** CSS gradient for the base layer */
  gradient: string;
  /** Three blob colors (top-left, bottom-right, center) — raw hex/rgba values */
  blobs: [string, string, string];
  /** Accent dot color for the tag pill (optional) */
  accent?: string;
}

/* ─── Page palettes ─── */

/** Home (Foundations) — neutral white & greys */
export const HOME_PALETTE: HeroPalette = {
  gradient: 'linear-gradient(to bottom right, #0A0A0A, #000000, #111111)',
  blobs: ['#FFFFFF', '#9CA3AF', '#D1D5DB'],
};

/** Brand — white & red */
export const BRAND_PALETTE: HeroPalette = {
  gradient: 'linear-gradient(to bottom right, #1A0A0A, #000000, #0A0A0A)',
  blobs: ['#FFFFFF', '#EF4444', '#DC2626'],
  accent: '#EF4444',
};

/** Product — white & blue */
export const PRODUCT_PALETTE: HeroPalette = {
  gradient: 'linear-gradient(to bottom right, #0A0A1A, #000000, #0A0A0A)',
  blobs: ['#FFFFFF', '#2563EB', '#3B82F6'],
  accent: '#2563EB',
};

/* ─── Component ─── */

export function HeroBackground({ palette = BRAND_PALETTE }: { palette?: HeroPalette }) {
  const [blob1, blob2, blob3] = palette.blobs;

  return (
    <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 opacity-80"
        style={{ background: palette.gradient }}
      />
      <div className="absolute inset-0 opacity-60 mix-blend-screen">
        <motion.div
          className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ backgroundColor: blob1 }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full blur-[100px]"
          style={{ backgroundColor: blob2 }}
          animate={{
            x: [0, -150, 100, 0],
            y: [0, 50, -50, 0],
            scale: [1, 1.3, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-[600px] w-[600px] rounded-full blur-[140px]"
          style={{ backgroundColor: blob3 }}
          animate={{
            x: [-50, 50, -50],
            y: [-50, 50, -50],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
