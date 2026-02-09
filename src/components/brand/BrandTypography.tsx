'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/* ── Font tooltip on hover ── */
function FontTooltip({ font, children }: { font: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative cursor-default"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            className="absolute left-1/2 bottom-[calc(100%+8px)] -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-xs font-bold text-[#0A0A0A] shadow-lg font-mono tracking-wider"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
          >
            {font}
            <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Smooth animated counter (intro + live drift) ── */
function useAnimatedValue(target: number, duration: number, inView: boolean) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);
  const currentRef = useRef(0);

  useEffect(() => {
    if (!inView) return;
    const startVal = currentRef.current;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = startVal + (target - startVal) * eased;
      currentRef.current = val;
      setDisplay(val);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration, inView]);

  return display;
}

/* ── Live-pulse dot ── */
function PulseDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: color }} />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: color }} />
    </span>
  );
}

/* ── Small random nudge helper ── */
function nudge(base: number, pct: number) {
  const delta = base * pct * (Math.random() * 2 - 1);
  return base + delta;
}

/* ── Initial sparkline data ── */
const INITIAL_SPARK = [35, 42, 28, 55, 48, 62, 45, 70, 58, 75, 68, 82, 72, 90, 78, 85, 92, 88, 95, 80];

/* ── Metric definition ── */
interface MetricDef {
  label: string;
  base: number;
  decimals: number;
  prefix: string;
  suffix: string;
  barBase: number;
  color: string;
  drift: number;
}

const METRICS: MetricDef[] = [
  { label: '노출수 IMPRESSIONS', base: 2_847_391, decimals: 0, prefix: '', suffix: '', barBase: 82, color: '#EF4444', drift: 0.04 },
  { label: '클릭률 CTR', base: 4.7, decimals: 1, prefix: '', suffix: '%', barBase: 47, color: '#F97316', drift: 0.015 },
  { label: '수익 REVENUE (K)', base: 128.4, decimals: 1, prefix: '$', suffix: '', barBase: 64, color: '#FDBA74', drift: 0.015 },
  { label: '세션 SESSIONS', base: 91_204, decimals: 0, prefix: '', suffix: '', barBase: 91, color: '#EF4444', drift: 0.015 },
];

/* ── Dataviz panel (mono) ── */
function DatavizPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const introComplete = useRef(false);

  // Live values: start at base, then drift
  const [targets, setTargets] = useState(() => METRICS.map((m) => ({ value: m.base, bar: m.barBase })));
  const [sparkData, setSparkData] = useState(INITIAL_SPARK);
  const [isUpdating, setIsUpdating] = useState(false);

  // After intro (~3s), start random drifts every 4-5s
  useEffect(() => {
    if (!inView) return;
    const introDelay = setTimeout(() => {
      introComplete.current = true;
    }, 3000);
    return () => clearTimeout(introDelay);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const tick = () => {
      if (!introComplete.current) return;

      // Nudge ALL metrics at once
      setTargets(METRICS.map((m) => ({
        value: nudge(m.base, m.drift),
        bar: Math.min(98, Math.max(20, nudge(m.barBase, 0.06))),
      })));
      setIsUpdating(true);
      setTimeout(() => setIsUpdating(false), 1000);

      // Nudge a few sparkline bars
      setSparkData((prev) => {
        const next = [...prev];
        const count = 2 + Math.floor(Math.random() * 3); // 2-4 bars
        for (let n = 0; n < count; n++) {
          const si = Math.floor(Math.random() * next.length);
          next[si] = Math.min(98, Math.max(15, next[si] + Math.round((Math.random() - 0.5) * 10)));
        }
        return next;
      });
    };

    const interval = setInterval(tick, 4000 + Math.random() * 1500); // 4–5.5s
    return () => clearInterval(interval);
  }, [inView]);

  // Animated display values
  const animValues = METRICS.map((m, i) => {
    const introDuration = [2, 1.8, 2.2, 1.6][i];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useAnimatedValue(inView ? targets[i].value : 0, introComplete.current ? 1.5 : introDuration, inView);
  });

  const formatValue = useCallback((raw: number, m: MetricDef) => {
    const num = m.decimals > 0 ? raw.toFixed(m.decimals) : Math.round(raw).toLocaleString();
    return `${m.prefix}${num}${m.suffix}`;
  }, []);

  return (
    <div ref={ref} className="font-mono flex flex-col gap-4 h-full justify-center">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PulseDot color="#EF4444" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Live Metrics
          </span>
        </div>
        <motion.span
          className="text-[10px] text-white/25"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          실시간
        </motion.span>
      </div>

      {/* Metric rows */}
      <div className="flex flex-col gap-3">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            className="flex flex-col gap-1"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 * i }}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] uppercase tracking-wider text-white/30">{m.label}</span>
              <motion.span
                className="text-sm font-bold tabular-nums"
                animate={{ color: isUpdating ? 'rgba(249,115,22,0.9)' : 'rgba(255,255,255,0.8)' }}
                transition={{ duration: 1 }}
              >
                {formatValue(animValues[i], m)}
              </motion.span>
            </div>
            {/* Bar */}
            <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: m.color }}
                initial={{ width: '0%' }}
                animate={inView ? { width: `${targets[i].bar}%` } : { width: '0%' }}
                transition={{ duration: introComplete.current ? 1.5 : 1.2, delay: introComplete.current ? 0 : 0.3 + 0.15 * i, ease: [0.4, 0, 0.2, 1] as const }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sparkline row */}
      <motion.div
        className="mt-1 flex items-end gap-[3px] h-8"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {sparkData.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm min-w-[3px]"
            style={{
              background: i >= 16 ? '#EF4444' : i >= 12 ? '#F97316' : 'rgba(255,255,255,0.15)',
            }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${h}%` } : {}}
            transition={{ duration: introComplete.current ? 1 : 0.6, delay: introComplete.current ? 0 : 0.9 + i * 0.03, ease: [0.4, 0, 0.2, 1] as const }}
          />
        ))}
      </motion.div>
      <div className="flex justify-between text-[9px] text-white/20">
        <span>00:00</span>
        <span className="uppercase tracking-wider">24h Trend</span>
        <span>24:00</span>
      </div>
    </div>
  );
}

/* ── Main composition ── */
function TypographyComposition() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-[#0A0A0A] p-8 sm:p-12 lg:p-16">
      {/* Subtle animated accent glow */}
      <motion.div
        className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-[#EF4444] blur-[160px] opacity-20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' as const }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[250px] w-[250px] rounded-full bg-[#F97316] blur-[140px] opacity-15"
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' as const }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Left — Typography statement */}
        <div className="flex flex-col gap-6">
          {/* Mono kicker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FontTooltip font="Anonymous Pro · 나눔고딕코딩">
              <p className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[#F97316]">
                Design System 26.1 — Typography
              </p>
            </FontTooltip>
          </motion.div>

          {/* Hero headline — Nunito */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FontTooltip font="Nunito">
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]"
                style={{ fontFamily: 'var(--font-nunito)' }}
              >
                Every word{' '}
                <span className="bg-gradient-to-r from-[#EF4444] to-[#F97316] bg-clip-text text-transparent">
                  carries
                </span>
                <br />
                intention.
              </h2>
            </FontTooltip>
          </motion.div>

          {/* Body copy — Inter / Pretendard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FontTooltip font="Inter · Pretendard">
              <p
                className="max-w-md text-base sm:text-lg leading-relaxed text-white/60"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Three typefaces, one voice. From bold headlines to quiet labels,
                our typography is calibrated to feel calm, precise, and unmistakably Buzzvil.
              </p>
            </FontTooltip>
          </motion.div>

        </div>

        {/* Right — Animated dataviz (mono) */}
        <FontTooltip font="Anonymous Pro · 나눔고딕코딩">
          <div className="flex items-center h-full">
            <div className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 backdrop-blur-sm">
              <DatavizPanel />
            </div>
          </div>
        </FontTooltip>
      </div>
    </div>
  );
}

export function BrandTypography() {
  const { t } = useLanguage();

  const cards = [
    {
      title: t('brand.typography.primaryTitle'),
      desc: t('brand.typography.primaryDesc'),
      links: [
        { href: 'https://github.com/orioncactus/pretendard', label: 'Pretendard (KR)' },
        { href: 'https://github.com/rsms/inter', label: 'Inter (EN)' },
      ],
      style: { fontFamily: 'var(--font-inter)' },
      samples: [
        { meta: t('brand.typography.h1Meta'), text: t('brand.typography.h1Text'), className: 'text-2xl font-bold tracking-tight' },
        { meta: t('brand.typography.h2Meta'), text: t('brand.typography.h2Text'), className: 'text-xl font-semibold tracking-tight' },
        { meta: t('brand.typography.bodyMeta'), text: t('brand.typography.bodyText'), className: 'text-sm leading-relaxed text-muted-foreground' },
      ],
    },
    {
      title: t('brand.typography.secondaryTitle'),
      desc: t('brand.typography.secondaryDesc'),
      links: [
        { href: 'https://fonts.google.com/specimen/Nanum+Gothic+Coding', label: 'Nanum Gothic Coding (KR)' },
        { href: 'https://fonts.google.com/specimen/Anonymous+Pro', label: 'Anonymous Pro (EN)' },
      ],
      style: { fontFamily: 'var(--font-mono)' },
      samples: [
        { meta: t('brand.typography.kickerMeta'), text: t('brand.typography.kickerText'), className: 'text-xs font-bold uppercase tracking-wider text-muted-foreground' },
        {
          meta: t('brand.typography.dataMeta'),
          custom: (
            <div className="font-mono text-xs">
              <span className="text-primary">const</span> config = {'{'}
              <br />
              &nbsp;&nbsp;theme: <span className="text-green-500">&apos;dark&apos;</span>,
              <br />
              &nbsp;&nbsp;version: <span className="text-purple-500">2.0</span>
              <br />
              {'}'};
            </div>
          ),
        },
      ],
    },
    {
      title: t('brand.typography.heroTitle'),
      desc: t('brand.typography.heroDesc'),
      link: 'https://github.com/googlefonts/nunito',
      linkLabel: 'Nunito (EN only)',
      style: { fontFamily: 'var(--font-nunito)' },
      samples: [
        { meta: t('brand.typography.heroMeta'), text: 'buzzvil / design', className: 'text-2xl font-extrabold tracking-tight' },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <TypographyComposition />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-border bg-background/50 p-6 flex flex-col"
          >
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 flex-shrink-0">
              {card.desc}
            </p>
            <div className="space-y-4 flex-1" style={card.style}>
              {card.samples.map((sample, i) => (
                <div key={i} className="space-y-1.5">
                  <span className="text-xs text-muted-foreground">
                    {sample.meta}
                  </span>
                  {'custom' in sample && sample.custom ? sample.custom : (
                    <p className={'className' in sample ? sample.className : ''}>{('text' in sample && sample.text) || ''}</p>
                  )}
                </div>
              ))}
            </div>
            {(card.link || card.links) && (
              <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
                {card.link && (
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
                    {card.linkLabel}
                  </a>
                )}
                {card.links?.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden />
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
