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

/** Home (Foundations) — one white, one gray for clear contrast */
export const HOME_PALETTE: HeroPalette = {
  gradient: 'linear-gradient(to bottom right, #0A0A0A, #000000, #111111)',
  blobs: ['#FFFFFF', '#374151', '#6B7280'],
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
      <div className="absolute inset-0 opacity-70 mix-blend-screen">
        <motion.div
          className="absolute top-1/4 left-1/4 h-[480px] w-[480px] rounded-full blur-[100px]"
          style={{ backgroundColor: blob1 }}
          animate={{
            x: [0, 80, -120, 40, 0],
            y: [0, -80, 60, -40, 0],
            scale: [1, 1.15, 0.85, 1.1, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 h-[380px] w-[380px] rounded-full blur-[90px]"
          style={{ backgroundColor: blob2 }}
          animate={{
            x: [0, -100, 80, -60, 0],
            y: [0, 60, -80, 30, 0],
            scale: [1.1, 0.9, 1.25, 0.95, 1.1],
          }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 right-1/2 h-[320px] w-[320px] rounded-full blur-[80px] opacity-80"
          style={{ backgroundColor: blob3 }}
          animate={{
            x: [-40, 60, -30, 50, -40],
            y: [-30, -50, 40, -20, -30],
            scale: [0.95, 1.05, 0.9, 1.1, 0.95],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="absolute inset-0 opacity-30 mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
