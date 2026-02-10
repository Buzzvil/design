'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

/* ─── Bullet data ─── */
const DELIVERY_BULLETS = [
  'product.layers.delivery.bullet1',
  'product.layers.delivery.bullet2',
  'product.layers.delivery.bullet3',
  'product.layers.delivery.bullet4',
] as const;

const SIGNATURE_BULLETS = [
  'product.layers.signature.bullet1',
  'product.layers.signature.bullet2',
  'product.layers.signature.bullet3',
  'product.layers.signature.bullet4',
] as const;

export default function InteractionLayers() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* ─── Phase mapping (0 → 1 over scroll) ─── */
  // Phase 1: 0.00 – 0.25  → Single circle ("This is a Feature")
  // Phase 2: 0.25 – 0.55  → Reveal inner Signature layer + annotations
  // Phase 3: 0.55 – 1.00  → Separate into two columns with circles + detail cards

  // --- White (Delivery) circle ---
  // Phase 1–2: centered. Phase 3: move right into a two-column layout
  const deliveryScale = useTransform(scrollYProgress, [0, 0.15, 0.55, 0.72], [1, 1, 1, 0.58]);
  const deliveryX = useTransform(scrollYProgress, [0, 0.55, 0.72], [0, 0, 160]);
  const deliveryY = useTransform(scrollYProgress, [0, 0.55, 0.72], [0, 0, -80]);

  // --- Red (Signature) circle ---
  const signatureScale = useTransform(scrollYProgress, [0, 0.2, 0.35, 0.55, 0.72], [0, 0, 0.35, 0.35, 0.48]);
  const signatureOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const signatureX = useTransform(scrollYProgress, [0, 0.55, 0.72], [0, 0, -160]);
  const signatureY = useTransform(scrollYProgress, [0, 0.55, 0.72], [0, 0, -80]);

  // --- Phase labels ---
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.22, 0.3], [0, 1, 1, 0]);
  const annotationOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5, 0.58], [0, 1, 1, 0]);

  // --- Phase 3 ---
  const phase3Opacity = useTransform(scrollYProgress, [0.68, 0.78, 0.92, 1], [0, 1, 1, 0.8]);
  const phase3Y = useTransform(scrollYProgress, [0.68, 0.78], [20, 0]);

  // --- Section title ---
  const titleOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.06], [30, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-center">
        {/* Section title (top) */}
        <motion.div
          className="absolute top-24 left-0 right-0 text-center z-20 px-8"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t('product.layers.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('product.layers.subtitle')}
          </p>
        </motion.div>

        {/* ─── Main stage ─── */}
        <div className="relative w-full max-w-5xl mx-auto h-full flex items-center justify-center px-8">

          {/* Delivery circle (white) */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 280,
              height: 280,
              x: deliveryX,
              y: deliveryY,
              scale: deliveryScale,
              background: 'radial-gradient(circle at 40% 35%, #FFFFFF, #E8E8E8)',
            }}
          >
            <div
              className="absolute inset-0 rounded-full opacity-30 mix-blend-overlay"
              style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
            />
          </motion.div>

          {/* Signature circle (red gradient) */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 280,
              height: 280,
              x: signatureX,
              y: signatureY,
              scale: signatureScale,
              opacity: signatureOpacity,
              background: 'radial-gradient(circle at 45% 40%, #FB923C, #EF4444, #DC2626)',
            }}
          >
            <div
              className="absolute inset-0 rounded-full opacity-20 mix-blend-overlay"
              style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
            />
          </motion.div>

          {/* ─── Phase 1 label ─── */}
          <motion.div
            className="absolute text-center z-10 pointer-events-none"
            style={{ opacity: phase1Opacity, top: '68%' }}
          >
            <p className="text-2xl font-bold text-white mb-1">
              {t('product.layers.phase1.title')}
            </p>
            <p className="text-sm text-white/40 font-mono tracking-wide">
              {t('product.layers.phase1.subtitle')}
            </p>
          </motion.div>

          {/* ─── Phase 2 annotations — color-coded dots match shapes ─── */}
          {/* Delivery label (to the right of the white circle) */}
          <motion.div
            className="absolute z-10 pointer-events-none"
            style={{
              opacity: annotationOpacity,
              top: '50%',
              left: '50%',
              marginLeft: 170,
              marginTop: -80,
            }}
          >
            <div className="max-w-[220px]">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-3 h-3 rounded-full bg-white/80 shrink-0 shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                <span className="h-px flex-1 bg-white/15" />
              </div>
              <p className="text-sm font-bold text-white leading-snug">
                {t('product.layers.phase2.delivery')}
              </p>
              <p className="text-xs text-white/35 font-mono tracking-wide mt-1">
                {t('product.layers.phase2.deliveryEn')}
              </p>
            </div>
          </motion.div>

          {/* Signature label (to the left of the red circle) */}
          <motion.div
            className="absolute z-10 pointer-events-none"
            style={{
              opacity: annotationOpacity,
              top: '50%',
              right: '50%',
              marginRight: 170,
              marginTop: 20,
            }}
          >
            <div className="max-w-[220px]">
              <div className="flex items-center gap-2 mb-1.5 flex-row-reverse">
                <span className="w-3 h-3 rounded-full bg-[#EF4444] shrink-0 shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                <span className="h-px flex-1 bg-[#EF4444]/20" />
              </div>
              <p className="text-sm font-bold text-white leading-snug text-right">
                {t('product.layers.phase2.signature')}
              </p>
              <p className="text-xs text-white/35 font-mono tracking-wide mt-1 text-right">
                {t('product.layers.phase2.signatureEn')}
              </p>
            </div>
          </motion.div>

          {/* ─── Phase 3: two-column layout — circles top, cards directly below ─── */}
          <motion.div
            className="absolute inset-x-0 bottom-[10%] z-10 pointer-events-none px-8"
            style={{ opacity: phase3Opacity, y: phase3Y }}
          >
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              {/* Signature card (left, below red circle) */}
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444] shrink-0" />
                  <p className="text-base font-bold text-white">
                    {t('product.layers.signature.title')}
                  </p>
                </div>
                <p className="text-xs text-white/35 font-mono uppercase tracking-wider mb-2.5 ml-[22px]">
                  {t('product.layers.signature.label')}
                </p>
                <ul className="space-y-1.5 ml-[22px]">
                  {SIGNATURE_BULLETS.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm text-white/55">
                      <span className="w-1 h-1 rounded-full bg-[#EF4444]/50 mt-[7px] shrink-0" />
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery card (right, below white circle) */}
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-3 h-3 rounded-full bg-white/70 shrink-0" />
                  <p className="text-base font-bold text-white">
                    {t('product.layers.delivery.title')}
                  </p>
                </div>
                <p className="text-xs text-white/35 font-mono uppercase tracking-wider mb-2.5 ml-[22px]">
                  {t('product.layers.delivery.label')}
                </p>
                <ul className="space-y-1.5 ml-[22px]">
                  {DELIVERY_BULLETS.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm text-white/55">
                      <span className="w-1 h-1 rounded-full bg-white/35 mt-[7px] shrink-0" />
                      {t(key)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
