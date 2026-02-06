'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Full-bleed rectangle patchwork using brand colors.
 * Each tile changes color independently on its own staggered timer.
 * Grid proportions morph every ~8s for size variation.
 */

/* ── Brand palette ── */
const PALETTE = [
  // Red 50–100
  '#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D', '#450A0A',
  // Orange 50–100
  '#FB923C', '#F97316', '#EA580C', '#C2410C', '#9A3412', '#7C2D12',
  // Gray: White → Gray 90
  '#FFFFFF', '#FAFAFA', '#F5F5F5', '#E5E5E5', '#D4D4D4', '#A3A3A3',
  '#737373', '#525252', '#404040', '#262626', '#171717',
];

function pickColor(exclude: string): string {
  let c: string;
  do { c = PALETTE[Math.floor(Math.random() * PALETTE.length)]; } while (c === exclude);
  return c;
}

/* ── Rectangle definition on a 16×16 square grid ── */
interface Rect {
  col: number;
  row: number;
  spanC: number;
  spanR: number;
}

/*
 * Square 16×16 patchwork (256 cells) — diverse tile shapes.
 * Mix of tall, wide, square, small, and large for rich visual variety.
 */
const RECTS: Rect[] = [
  // Band 0–4
  { col: 0,  row: 0,  spanC: 3, spanR: 5 },  // tall
  { col: 3,  row: 0,  spanC: 5, spanR: 2 },  // wide
  { col: 8,  row: 0,  spanC: 3, spanR: 3 },  // square-ish
  { col: 11, row: 0,  spanC: 2, spanR: 4 },  // tall
  { col: 13, row: 0,  spanC: 3, spanR: 2 },  // wide
  { col: 3,  row: 2,  spanC: 2, spanR: 2 },  // small square
  { col: 5,  row: 2,  spanC: 3, spanR: 4 },  // large tall
  { col: 8,  row: 3,  spanC: 3, spanR: 1 },  // thin wide
  { col: 13, row: 2,  spanC: 3, spanR: 3 },  // square

  // Band 4–8
  { col: 0,  row: 5,  spanC: 5, spanR: 3 },  // wide
  { col: 3,  row: 4,  spanC: 2, spanR: 1 },  // tiny
  { col: 8,  row: 4,  spanC: 5, spanR: 2 },  // wide
  { col: 13, row: 5,  spanC: 1, spanR: 5 },  // very tall narrow
  { col: 14, row: 5,  spanC: 2, spanR: 3 },  // tall
  { col: 5,  row: 6,  spanC: 3, spanR: 2 },  // wide
  { col: 8,  row: 6,  spanC: 2, spanR: 4 },  // tall
  { col: 10, row: 6,  spanC: 3, spanR: 2 },  // wide

  // Band 8–12
  { col: 0,  row: 8,  spanC: 2, spanR: 4 },  // tall
  { col: 2,  row: 8,  spanC: 3, spanR: 2 },  // wide
  { col: 5,  row: 8,  spanC: 3, spanR: 3 },  // square-ish
  { col: 10, row: 8,  spanC: 3, spanR: 3 },  // square
  { col: 14, row: 8,  spanC: 2, spanR: 4 },  // tall
  { col: 2,  row: 10, spanC: 6, spanR: 2 },  // very wide
  { col: 8,  row: 10, spanC: 2, spanR: 2 },  // small square
  { col: 10, row: 11, spanC: 4, spanR: 1 },  // thin wide
  { col: 13, row: 10, spanC: 1, spanR: 2 },  // narrow tall

  // Band 12–16
  { col: 0,  row: 12, spanC: 4, spanR: 4 },  // large square
  { col: 4,  row: 12, spanC: 2, spanR: 2 },  // small square
  { col: 6,  row: 12, spanC: 4, spanR: 2 },  // wide
  { col: 10, row: 12, spanC: 2, spanR: 4 },  // tall
  { col: 12, row: 12, spanC: 4, spanR: 2 },  // wide
  { col: 4,  row: 14, spanC: 3, spanR: 2 },  // wide
  { col: 7,  row: 14, spanC: 3, spanR: 2 },  // wide
  { col: 12, row: 14, spanC: 4, spanR: 2 },  // wide
];

const COLS = 16;
const ROWS = 16;
const COUNT = RECTS.length;

/* ── Grid proportion presets (16 cols, 16 rows) ── */
const COL_PRESETS = [
  Array(16).fill(1),
  [1.3,0.8,1.1,0.7,1.4,0.9,1.2,0.8,1.3,0.7,1.1,0.9,1.4,0.6,1.2,0.8],
  [0.8,1.2,0.7,1.4,0.9,1.1,1.3,0.8,0.7,1.4,0.9,1.2,0.8,1.3,0.7,1.1],
  [1.1,0.9,1.3,0.8,1.2,0.7,0.9,1.4,1.1,0.7,1.3,0.8,1.2,0.9,1.4,0.7],
];
const ROW_PRESETS = [
  Array(16).fill(1),
  [1.3,0.7,1.2,0.8,1.4,0.6,1.1,0.9,1.3,0.7,1.2,0.8,1.1,0.9,1.3,0.7],
  [0.8,1.3,0.7,1.4,0.9,1.1,0.8,1.2,0.7,1.3,0.9,1.4,0.8,1.1,1.2,0.9],
  [1.1,0.9,1.4,0.7,0.8,1.3,1.2,0.7,1.1,0.9,1.3,0.7,1.2,0.8,0.9,1.4],
];

/* ── Component ── */
export function ColorComposition() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  // Per-tile color state
  const [colors, setColors] = useState<string[]>(() => {
    const shuffled = [...PALETTE].sort(() => Math.random() - 0.5);
    return RECTS.map((_, i) => shuffled[i % shuffled.length]);
  });

  // Grid proportion state
  const [colFr, setColFr] = useState(COL_PRESETS[0]);
  const [rowFr, setRowFr] = useState(ROW_PRESETS[0]);

  // Staggered per-tile color changes
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scheduleColorChange = useCallback((idx: number) => {
    // Random delay: 4s to 10s
    const delay = 4000 + Math.random() * 6000;
    timersRef.current[idx] = setTimeout(() => {
      setColors((prev) => {
        const next = [...prev];
        next[idx] = pickColor(prev[idx]);
        return next;
      });
      scheduleColorChange(idx);
    }, delay);
  }, []);

  useEffect(() => {
    if (!inView) return;
    // Stagger initial start: each tile begins after a random offset
    for (let i = 0; i < COUNT; i++) {
      const initialDelay = 1000 + Math.random() * 3000;
      timersRef.current[i] = setTimeout(() => {
        scheduleColorChange(i);
      }, initialDelay);
    }
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, [inView, scheduleColorChange]);

  // Grid proportion morphing every ~8s
  useEffect(() => {
    if (!inView) return;
    let presetIdx = 0;
    const interval = setInterval(() => {
      presetIdx = (presetIdx + 1) % COL_PRESETS.length;
      setColFr(COL_PRESETS[presetIdx]);
      setRowFr(ROW_PRESETS[presetIdx]);
    }, 8000);
    return () => clearInterval(interval);
  }, [inView]);

  const colTemplate = colFr.map((f) => `${f}fr`).join(' ');
  const rowTemplate = rowFr.map((f) => `${f}fr`).join(' ');

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-2xl border border-border"
      style={{ aspectRatio: '3 / 1' }}
    >
      {/* Grid — isometric tilt */}
      <motion.div
        className="absolute inset-[-100%]"
        style={{
          display: 'grid',
          transform: 'rotateX(30deg) rotateZ(-45deg)',
          transformOrigin: 'center center',
          filter: 'blur(24px)',
        }}
        animate={{
          gridTemplateColumns: colTemplate,
          gridTemplateRows: rowTemplate,
        }}
        transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] as const }}
      >
        {RECTS.map((rect, i) => (
          <motion.div
            key={i}
            style={{
              gridColumn: `${rect.col + 1} / span ${rect.spanC}`,
              gridRow: `${rect.row + 1} / span ${rect.spanR}`,
            }}
            initial={{ opacity: 0 }}
            animate={inView ? {
              opacity: 1,
              backgroundColor: colors[i],
            } : {}}
            transition={{
              opacity: { duration: 0.5, delay: i * 0.06 },
              backgroundColor: { duration: 0.5, ease: 'easeOut' as const },
            }}
          />
        ))}
      </motion.div>

      {/* Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
