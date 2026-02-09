'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useLanguage } from '@/contexts/LanguageContext';

/* ── Vector/Lottie preview ── */
function VectorLottiePreview() {
  return (
    <div className="relative w-full h-full bg-[#F5F5F5] flex items-center justify-center overflow-hidden">
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

/* ── Motion placeholder (animated) ── */
function MotionPlaceholder() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative w-full h-full bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
      {/* Animated circles */}
      <motion.div
        className="absolute w-16 h-16 rounded-full border border-[#EF4444]/40"
        animate={inView ? {
          scale: [1, 1.8, 1],
          opacity: [0.4, 0.1, 0.4],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
      />
      <motion.div
        className="absolute w-10 h-10 rounded-full bg-[#F97316]/20"
        animate={inView ? {
          scale: [1, 1.4, 1],
          x: [-10, 10, -10],
          y: [5, -5, 5],
        } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
      />
      <motion.div
        className="absolute w-6 h-6 rounded bg-[#EF4444]/30 rotate-45"
        animate={inView ? {
          rotate: [45, 135, 225, 315, 405],
          scale: [1, 1.2, 0.9, 1.1, 1],
        } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }}
      />
      {/* Pulsing lines */}
      <motion.div
        className="absolute w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={inView ? { x: [-40, 40, -40], opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
      />
      <span className="absolute bottom-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">
        Prefer motion
      </span>
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

export function BrandImagery() {
  const { t } = useLanguage();

  return (
    <div className="space-y-12">
      <section>
        <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-foreground mb-6">
          {t('brand.imagery.title')}
        </h3>
        <p className="mb-10 max-w-2xl text-muted-foreground">
          {t('brand.imagery.description')}
        </p>

        {/* Primary principle: Motion over stills — full width */}
        <div className="mb-8">
          <ImageryCard
            title={t('brand.imagery.motionTitle')}
            description={t('brand.imagery.motionDesc')}
            span
          >
            <MotionPlaceholder />
          </ImageryCard>
        </div>

        {/* Three principles grid */}
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
