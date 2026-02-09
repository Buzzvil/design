'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useLanguage } from '@/contexts/LanguageContext';

/* ── Vector/Lottie preview ── */
function VectorLottiePreview() {
  return (
    <div className="relative w-full h-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
      <DotLottieReact
        src={`${BASE_PATH}/brand/vector-lottie.lottie`}
        loop
        autoplay
        className="w-[70%] h-[70%]"
      />
    </div>
  );
}

/* ── Product screenshot (video) ── */
function ProductVideo() {
  return (
    <div className="relative w-full h-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
      {/* Phone frame for vertical video */}
      <div className="relative h-[95%] aspect-[9/19] rounded-[8px] overflow-hidden border-2 border-white/10 bg-black shadow-2xl shadow-black/50">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[10px] bg-black rounded-b-md z-10" />
        {/* Video — crop bottom slightly */}
        <div className="absolute inset-0 bottom-[-4%] overflow-hidden">
          <video
            src={`${BASE_PATH}/brand/product-demo.mp4`}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Team/office photo ── */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/design';

function TeamPhoto() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={`${BASE_PATH}/brand/team-office.png`}
        alt="Buzzvil team in the office"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

/* ── Square drawing + slingshot animation ── */
/*
 * 1. Draw edges one by one
 * 2. Fill with color + round corners
 * 3. Pull left slowly (tension building)
 * 4. Release: spring flings right then bounces back to x:0
 * 5. Fade out → next color → restart
 */
// Brighter/lighter version of each shape color for text
const TEXT_COLOR_MAP: Record<string, string> = {
  '#EF4444': '#FCA5A5', // Red 50 → Red 30
  '#F97316': '#FDBA74', // Orange 60 → Orange 40
  '#DC2626': '#FCA5A5', // Red 60 → Red 30
  '#FB923C': '#FED7AA', // Orange 50 → Orange 30
  '#B91C1C': '#F87171', // Red 70 → Red 40
  '#EA580C': '#FB923C', // Orange 70 → Orange 50
};

function MotionPlaceholder({ onColorChange }: { onColorChange?: (color: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const COLORS = ['#EF4444', '#F97316', '#DC2626', '#FB923C', '#B91C1C', '#EA580C'];
  const colorIdx = useRef(0);
  const [color, setColor] = useState(COLORS[0]);
  const [key, setKey] = useState(0);

  type Phase = 'draw' | 'fill' | 'pull' | 'release' | 'fadeout';
  const [phase, setPhase] = useState<Phase>('draw');

  useEffect(() => {
    if (!inView) return;
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const cycle = (p: Phase) => {
      if (cancelled) return;
      setPhase(p);
      switch (p) {
        case 'draw':
          timeout = setTimeout(() => cycle('fill'), 1500);
          break;
        case 'fill':
          timeout = setTimeout(() => cycle('pull'), 500);
          break;
        case 'pull':
          timeout = setTimeout(() => cycle('release'), 800);
          break;
        case 'release':
          timeout = setTimeout(() => cycle('fadeout'), 3800);
          break;
        case 'fadeout':
          timeout = setTimeout(() => {
            colorIdx.current = (colorIdx.current + 1) % COLORS.length;
            const next = COLORS[colorIdx.current];
            setColor(next);
            onColorChange?.(next);
            setKey((k) => k + 1);
            cycle('draw');
          }, 700);
          break;
      }
    };

    cycle('draw');
    return () => { cancelled = true; clearTimeout(timeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const S = 90;

  // Edge definitions for sequential drawing
  const edges = [
    { x1: 0, y1: 0, x2: S, y2: 0 },
    { x1: S, y1: 0, x2: S, y2: S },
    { x1: S, y1: S, x2: 0, y2: S },
    { x1: 0, y1: S, x2: 0, y2: 0 },
  ];

  const showFill = phase !== 'draw';
  const hasRadius = phase !== 'draw';
  const isFading = phase === 'fadeout';

  // Pull to the far left edge, release with massive energy
  const containerWidth = ref.current?.parentElement?.offsetWidth ?? 1200;
  const pullDistance = -(containerWidth * 0.4); // pull 40% of frame width to the left

  const xTarget =
    phase === 'pull' ? pullDistance :
    phase === 'release' ? 0 :
    0;

  const xTransition =
    phase === 'pull'
      ? { duration: 0.8, ease: [0.4, 0, 1, 1] as const }
      : phase === 'release'
      ? { type: 'spring' as const, stiffness: 150, damping: 3.5, mass: 0.4, velocity: 4000 }
      : { duration: 0 };

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <motion.div
        className="relative"
        style={{ width: S, height: S }}
        animate={{
          x: xTarget,
          opacity: isFading ? 0 : 1,
          scale: isFading ? 0.4 : 1,
        }}
        transition={{
          x: xTransition,
          opacity: isFading ? { duration: 0.4, ease: 'easeIn' as const } : { duration: 0 },
          scale: isFading ? { duration: 0.4, ease: 'easeIn' as const } : { duration: 0 },
        }}
      >
        {/* Edge strokes — drawn sequentially, hidden once fill appears */}
        {!showFill && (
          <svg
            key={key}
            className="absolute inset-0 overflow-visible"
            viewBox={`0 0 ${S} ${S}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {edges.map((edge, i) => {
              const len = Math.hypot(edge.x2 - edge.x1, edge.y2 - edge.y1);
              return (
                <motion.line
                  key={`${key}-${i}`}
                  x1={edge.x1}
                  y1={edge.y1}
                  x2={edge.x2}
                  y2={edge.y2}
                  stroke={color}
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  strokeDasharray={len}
                  initial={{ strokeDashoffset: len }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.28,
                    ease: [0.4, 0, 0.2, 1] as const,
                  }}
                />
              );
            })}
          </svg>
        )}

        {/* Filled shape with rounded corners — replaces strokes entirely */}
        {showFill && (
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: color, borderRadius: 18 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isFading ? 0 : 1 }}
            transition={{ opacity: { duration: 0.2 } }}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ── Principle card ── */
function ImageryCard({
  title,
  description,
  children,
  span = false,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  span?: boolean;
}) {
  return (
    <div className={`group overflow-hidden rounded-xl border border-border bg-muted/30 ${span ? 'md:col-span-2' : ''}`}>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {children}
      </div>
      <div className="p-5 space-y-2">
        <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ── "Don't" badge ── */
function DontBadge({ label, image }: { label: string; image?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-red-500/30 bg-muted/30">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center">
        {image ? (
          <>
            <img src={image} alt={`Don't: ${label}`} className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale" />
            <div className="absolute inset-0 bg-red-950/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(239,68,68,0.03)_10px,rgba(239,68,68,0.03)_20px)]" />
        )}
        <div className="relative flex flex-col items-center gap-3">
          <svg className="w-10 h-10 text-red-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-red-400/70 leading-relaxed font-mono">
          Don&apos;t: {label}
        </p>
      </div>
    </div>
  );
}

function ImageryHeroFrame() {
  const [textColor, setTextColor] = useState(TEXT_COLOR_MAP['#EF4444']);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-[#0A0A0A]" style={{ aspectRatio: '3 / 1' }}>
      {/* Background photo — dimmed & desaturated */}
      <img
        src={`${BASE_PATH}/brand/imagery-bg.png`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale-[60%]"
      />
      <div className="absolute inset-0 bg-black/40" />
      {/* Animation layer */}
      <MotionPlaceholder onColorChange={(c) => setTextColor(TEXT_COLOR_MAP[c] || '#FCA5A5')} />
      {/* Caption */}
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <motion.span
          className="font-mono text-base uppercase tracking-[0.2em] font-medium"
          animate={{ color: textColor }}
          transition={{ duration: 0.6 }}
        >
          &ldquo;Ideas in motion, teams in tension&rdquo;
        </motion.span>
      </div>
    </div>
  );
}

export function BrandImagery() {
  const { t } = useLanguage();

  return (
    <div className="space-y-16">
      {/* Animated frame — right after page-level title */}
      <ImageryHeroFrame />

      {/* Motion Over Stills — subsection */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-foreground mb-4">
          {t('brand.imagery.motionTitle')}
        </h3>
        <p className="mb-4 max-w-2xl text-muted-foreground">
          {t('brand.imagery.description')}
        </p>
        <ul className="mb-8 max-w-2xl text-muted-foreground list-disc pl-5 space-y-2">
          <li>{t('brand.imagery.bullet1')}</li>
          <li>{t('brand.imagery.bullet2')}</li>
        </ul>

        {/* Principles cards */}
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <ImageryCard
            title={t('brand.imagery.vectorTitle')}
            description={t('brand.imagery.vectorDesc')}
          >
            <VectorLottiePreview />
          </ImageryCard>

          <ImageryCard
            title={t('brand.imagery.productTitle')}
            description={t('brand.imagery.productDesc')}
          >
            <ProductVideo />
          </ImageryCard>

          <ImageryCard
            title={t('brand.imagery.teamTitle')}
            description={t('brand.imagery.teamDesc')}
          >
            <TeamPhoto />
          </ImageryCard>
        </div>

        {/* Don'ts row */}
        <div className="grid gap-8 md:grid-cols-3">
          <DontBadge label="Stock photography" image={`${BASE_PATH}/brand/dont-stock.png`} />
          <DontBadge label="Staged scenes" image={`${BASE_PATH}/brand/dont-staged.png`} />
          <DontBadge label="Generic illustrations" image={`${BASE_PATH}/brand/dont-generic.png`} />
        </div>
      </section>
    </div>
  );
}
