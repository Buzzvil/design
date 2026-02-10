'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layers, Lock } from 'lucide-react';

/* ────────────────────────────────────────────────────
   Visual: Interaction Patterns
   FAB → popup card → full-page view morph loop
   ──────────────────────────────────────────────────── */
const MORPH_HOLD = [2000, 2200, 1600];
const MORPH_CONFIGS = [
  { width: 42, height: 42, borderRadius: 21, x: 95, y: 50, backgroundColor: '#EF4444' },
  { width: 175, height: 88, borderRadius: 14, x: 0, y: 0, backgroundColor: 'rgba(239,68,68,0.85)' },
  { width: 100, height: 178, borderRadius: 12, x: 0, y: 0, backgroundColor: 'rgba(255,255,255,0.06)' },
];

const InteractionVisual = () => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase((p) => (p + 1) % 3), MORPH_HOLD[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div className="relative w-full h-full bg-[#060606] flex items-center justify-center overflow-hidden">
      <motion.div
        animate={MORPH_CONFIGS[phase]}
        transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.9 }}
        className="relative overflow-hidden"
      >
        {/* FAB: plus */}
        <motion.div
          animate={{ opacity: phase === 0 ? 0.9 : 0 }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[14px] h-[1.5px] bg-white absolute" />
          <div className="h-[14px] w-[1.5px] bg-white absolute" />
        </motion.div>

        {/* Popup: card content */}
        <motion.div
          animate={{ opacity: phase === 1 ? 1 : 0 }}
          transition={{ duration: 0.2, delay: phase === 1 ? 0.25 : 0 }}
          className="absolute inset-0 flex flex-col justify-center px-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-white/30 shrink-0" />
            <div className="w-16 h-[3px] bg-white/50 rounded-sm" />
          </div>
          <div className="w-full h-[2px] bg-white/20 rounded-sm mb-1.5" />
          <div className="w-4/5 h-[2px] bg-white/12 rounded-sm mb-1.5" />
          <div className="w-3/5 h-[2px] bg-white/8 rounded-sm" />
        </motion.div>

        {/* Fullscreen: page layout */}
        <motion.div
          animate={{ opacity: phase === 2 ? 1 : 0 }}
          transition={{ duration: 0.2, delay: phase === 2 ? 0.25 : 0 }}
          className="absolute inset-0 p-3 flex flex-col"
        >
          <div className="w-full h-7 bg-[#EF4444]/30 rounded-sm mb-2.5 shrink-0 flex items-center px-2.5 gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
            <div className="w-12 h-[2px] bg-white/25 rounded-sm" />
            <div className="ml-auto w-8 h-[2px] bg-white/15 rounded-sm" />
          </div>
          <div className="flex gap-2 flex-1 min-h-0">
            <div className="flex-1 bg-white/[0.04] rounded-sm flex flex-col p-2 gap-1.5">
              <div className="w-3/4 h-[2px] bg-white/10 rounded-sm" />
              <div className="w-full h-[2px] bg-white/6 rounded-sm" />
              <div className="w-2/3 h-[2px] bg-white/6 rounded-sm" />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex-[2] bg-white/[0.04] rounded-sm" />
              <div className="flex-1 bg-white/[0.04] rounded-sm" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ────────────────────────────────────────────────────
   Visual: UI Kit
   Toggle switch cycling through brand colors
   ──────────────────────────────────────────────────── */
const TOGGLE_COLORS = ['#EF4444', '#F97316', '#2563EB', '#10B981', '#8B5CF6'];

const UIKitVisual = () => {
  const [isOn, setIsOn] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsOn((prev) => {
        if (prev) setColorIdx((c) => (c + 1) % TOGGLE_COLORS.length);
        return !prev;
      });
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  const activeColor = TOGGLE_COLORS[colorIdx];

  return (
    <div className="relative w-full h-full bg-[#060606] flex items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="absolute rounded-full blur-xl"
        style={{ width: 100, height: 60 }}
        animate={{
          backgroundColor: isOn ? activeColor : 'transparent',
          opacity: isOn ? 0.2 : 0,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Toggle track */}
      <motion.div
        className="relative rounded-full"
        style={{ width: 72, height: 38 }}
        animate={{
          backgroundColor: isOn ? activeColor : 'rgba(255,255,255,0.06)',
          boxShadow: isOn
            ? `0 0 20px ${activeColor}40, inset 0 1px 0 rgba(255,255,255,0.1)`
            : 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
        transition={{ duration: 0.35 }}
      >
        {/* Knob */}
        <motion.div
          className="absolute top-[4px] w-[30px] h-[30px] rounded-full bg-white"
          style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.35)' }}
          animate={{ left: isOn ? 38 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        />
      </motion.div>
    </div>
  );
};

/* ────────────────────────────────────────────────────
   Visual: Visual Language
   Gift icon remapped across publisher themes
   ──────────────────────────────────────────────────── */
const GIFT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 70 70"><g><path d="m65.79 31.136-.02 17.59-26.18 15.21-26.34-15.21.02-17.59 26.34 15.21z" fill="#b15cff"/><path d="m65.788 31.138-.021 17.59-26.175 15.21.021-17.589z" fill="#c27dfe"/><path d="m39.613 46.35-.02 17.588L13.248 48.73l.022-17.589z" fill="#b15cff"/><path d="m55.001 37.407-.021 17.59-4.6 2.673.02-17.59z" fill="#dd4351"/><path d="M65.788 31.138 39.613 46.35 13.271 31.14l26.174-15.21z" fill="#a5593b"/></g><path d="m24.12 37.408.022 17.59 4.6 2.673-.02-17.59z" fill="#ce3e50"/><path d="m67 23.866-.02 7.84-16.18 9.4-11.2 6.51-11.29-6.52-.68-.39-4.34-2.49v-.02l-11.25-6.49.02-7.84 11.21-6.51 4.96-2.89 11.21-6.51 11.33 6.54.06-.03 4.96 2.89-.03.02z" fill="#fd9500"/><g><path d="m67 23.867-.022 7.836-27.382 15.912.022-7.835z" fill="#fd9500"/><path d="m39.618 39.78-.022 7.835-27.559-15.91.023-7.836z" fill="#e88503"/><path d="M67 23.867 39.618 39.78 12.06 23.87 39.442 7.955z" fill="#ffb850"/><path d="m55.79 30.376-.02 7.84-4.97 2.89.03-7.84-27.56-15.91 4.96-2.89z" fill="#dd4351"/><path d="m55.793 30.38-.028 7.838-4.965 2.887.027-7.84z" fill="#f0555d"/><path d="m55.793 30.38-4.968 2.887-27.558-15.911 4.967-2.887z" fill="#dd4351"/><path d="m28.29 33.236.02 7.86-5.02-2.88-.02-7.84 27.56-15.91 4.96 2.89z" fill="#bf364d"/><path d="m23.267 30.38 5.019 2.857 27.507-15.881-4.968-2.887z" fill="#dd4351"/><path d="m23.267 30.38.022 7.836 5.019 2.884-.022-7.863z" fill="#bf364d"/></g><path d="M57.34 22.816c-.05-.13-.1-.27-.15-.39-.97-2.47-2.71-4.53-4.5-5.56-.9-.52-1.82-.78-2.65-.7-.28.03-.6.15-.94.35l-1.42.83h-.01l-2.44 1.42-1.43.83c.02-.01.04-.01.06-.02-.24.12-.48.28-.74.47-1.62-4.04-3.8-9.09-5.24-10.9-.82-1.02-1.72-1.83-2.64-2.36-.44-.25-.88-.45-1.32-.57-.93-.26-1.75-.19-2.41.2l-5.38 3.13c.01 0 .02 0 .03-.01-.33.18-.62.42-.86.75-.06.07-.1.15-.15.23-.75 1.23-.68 3.22.17 5.33.89 2.2 2.44 4.09 4.14 5.08l8.6 4.96.9.52 8.6 4.97c1.43.82 2.74.87 3.66.18-.07.05-.14.11-.22.16l2.71-1.57 1.29-.75 1.42-.83c.27-.16.51-.37.71-.63.87-1.13.94-3.04.21-5.12m-26.15-10.18c-.2-.49-.35-.98-.45-1.45.5.41.99.9 1.45 1.47.65.82 1.5 2.44 2.37 4.31-1.39-.92-2.64-2.51-3.37-4.33m13.19 10.02c.49-.67 1.18-1.58 1.92-2.48.32.11.64.24.96.43.4.23.8.52 1.19.86 1.21 1.06 2.23 2.54 2.87 4.15.05.12.09.24.13.35.11.32.19.62.26.93zm7.53 3.31c-.04-.13-.09-.26-.14-.39.05.12.1.26.15.39.07.21.13.42.19.62-.06-.2-.12-.41-.2-.62" fill="#bf364d"/><g><path d="m26.461 10.196 5.423-3.152q-.413.24-.72.656-.069.096-.133.2c-.662 1.09-.603 2.86.155 4.74.793 1.96 2.176 3.657 3.696 4.535l-5.422 3.15c-1.52-.877-2.903-2.574-3.697-4.535-.758-1.878-.816-3.648-.155-4.739q.064-.104.134-.2.307-.416.72-.655" fill="#dd4351"/><path d="m29.46 20.326 5.422-3.151 8.599 4.964-5.423 3.151zM38.734 25.831l5.423-3.151.223.576-5.423 3.151z" fill="#f0555d"/><path d="m26.092 9.562 5.422-3.151c.657-.381 1.48-.452 2.406-.192a5.7 5.7 0 0 1 1.318.566c.92.53 1.826 1.336 2.638 2.356 1.698 2.14 4.436 8.8 6.057 12.963l.224.576-5.423 3.151-.223-.576c-1.621-4.162-4.36-10.823-6.058-12.963-.812-1.02-1.718-1.825-2.638-2.356a5.7 5.7 0 0 0-1.318-.566c-.926-.26-1.75-.189-2.405.192" fill="#f0555d"/><path d="m27.432 8.783 2.742-1.593c.656-.382 1.48-.453 2.406-.193a5.7 5.7 0 0 1 1.318.566c.92.531 1.826 1.337 2.638 2.357 1.698 2.14 4.436 8.8 6.057 12.963l.224.576-2.743 1.594-.223-.576c-1.621-4.163-4.36-10.824-6.058-12.964-.812-1.02-1.718-1.825-2.638-2.356a5.7 5.7 0 0 0-1.318-.566c-.925-.26-1.749-.189-2.405.192" fill="#f98a94"/><path d="m38.734 25.831.223.576-.898-.518-8.601-4.966c-1.703-.984-3.251-2.882-4.138-5.076-.853-2.111-.918-4.106-.172-5.336q.071-.116.148-.224c.713-.97 1.848-1.297 3.201-.917a5.7 5.7 0 0 1 1.318.566c.92.53 1.826 1.337 2.638 2.356 1.699 2.14 4.437 8.8 6.058 12.963zm-9.274-5.505 8.598 4.964c-1.367-3.508-4.227-10.566-5.87-12.634-.731-.92-1.547-1.644-2.377-2.124a5 5 0 0 0-1.187-.51c-1.217-.342-2.24-.046-2.882.83q-.07.096-.134.2c-.661 1.09-.603 2.86.155 4.738.794 1.96 2.176 3.658 3.697 4.536" fill="#bf364d"/><path d="m38.961 25.812 5.423-3.151 8.599 4.964-5.423 3.151z" fill="#f0555d"/><path d="m44.04 20.3 5.422-3.15c-1.664.966-3.909 3.887-5.078 5.51l-5.423 3.152c1.17-1.624 3.415-4.545 5.078-5.511" fill="#dd4351"/><path d="m56.053 27.93-5.423 3.152c-.806.469-1.898.371-3.07-.306l5.423-3.15c1.172.676 2.264.773 3.07.305" fill="#f0555d"/><path d="M51.913 25.964c.737 2.086.661 4-.202 5.12-.898 1.164-2.45 1.272-4.152.29l-8.602-4.967-.223-.576-.223-.576c1.639-2.28 4.406-5.763 6.11-5.937.832-.083 1.745.176 2.645.696 1.79 1.033 3.533 3.098 4.5 5.558q.077.195.147.392m-.645 4.551c.769-.993.834-2.695.181-4.545a9 9 0 0 0-.13-.352c-.635-1.613-1.655-3.088-2.87-4.15a7.6 7.6 0 0 0-1.187-.86c-.828-.478-1.645-.696-2.377-.622-1.65.168-4.54 3.905-5.924 5.826l8.6 4.964c1.52.878 2.905.781 3.707-.26" fill="#bf364d"/><path d="M57.132 27.932a2.5 2.5 0 0 1-.71.634l-5.423 3.15a2.5 2.5 0 0 0 .71-.633c.865-1.118.942-3.034.206-5.119q-.07-.198-.147-.392c-.97-2.458-2.71-4.524-4.502-5.557-.902-.52-1.814-.78-2.646-.697-.249.026-.524.125-.817.279l5.298-3.081c.337-.198.656-.32.942-.348.831-.085 1.747.175 2.645.696 1.791 1.033 3.535 3.096 4.503 5.558q.076.193.146.392c.737 2.084.66 3.997-.205 5.118" fill="#f0555d"/><path d="M55.706 28.761a2.5 2.5 0 0 1-.711.634l-2.57 1.492a2.5 2.5 0 0 0 .711-.634c.865-1.117.942-3.033.205-5.118q-.07-.199-.146-.392c-.971-2.459-2.711-4.525-4.503-5.558-.901-.52-1.814-.78-2.645-.696-.25.025-.524.124-.817.278l2.445-1.422c.337-.198.655-.319.941-.348.832-.084 1.748.176 2.646.696 1.791 1.033 3.535 3.096 4.502 5.558q.077.193.147.392c.736 2.085.66 3.997-.205 5.118" fill="#f98a94"/></g><g opacity=".7"><path d="m28.546 33.388 10.881 6.392 11.398-6.513-11.299 4.737z" fill="#fff"/></g><g opacity=".7"><path d="M66.996 25.15 67 31.745l-8.805 5.114 7.91-5.691z" fill="#fff"/></g></svg>`;

const ICON_THEMES = [
  { name: 'Default', filter: 'none', color: '#b15cff' },
  { name: 'Buzzvil', filter: 'hue-rotate(-40deg) saturate(1.4) brightness(1.05)', color: '#EF4444' },
  { name: 'Ocean', filter: 'hue-rotate(140deg) saturate(0.9) brightness(1.1)', color: '#0D9488' },
  { name: 'Forest', filter: 'hue-rotate(190deg) saturate(0.85) brightness(1.05)', color: '#059669' },
];

const VisualLanguageVisual = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ICON_THEMES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const theme = ICON_THEMES[idx];

  return (
    <div className="relative w-full h-full bg-[#060606] flex flex-col items-center justify-center overflow-hidden">
      {/* Icon with theme filter */}
      <motion.div
        className="w-[110px] h-[110px]"
        style={{ filter: theme.filter }}
        animate={{ scale: [0.97, 1, 0.97] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        dangerouslySetInnerHTML={{ __html: GIFT_SVG }}
      />

      {/* Theme indicator dots */}
      <div className="flex items-center gap-2.5 mt-3">
        {ICON_THEMES.map((t, i) => (
          <motion.div
            key={t.name}
            className="rounded-full"
            animate={{
              width: i === idx ? 12 : 6,
              height: i === idx ? 6 : 6,
              opacity: i === idx ? 1 : 0.3,
              borderRadius: i === idx ? 3 : 3,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            style={{ backgroundColor: t.color }}
          />
        ))}
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────
   Pattern data
   ──────────────────────────────────────────────────── */
const VISUALS: Record<string, React.FC> = {
  interaction: InteractionVisual,
  uikit: UIKitVisual,
  visual: VisualLanguageVisual,
};

const PATTERN_SECTIONS = [
  {
    key: 'interaction',
    patterns: [
      'Loading & Skeleton States',
      'Scroll Behaviors',
      'Notifications & Alerts',
      'Pause & Ask',
      'Navigation & Routing',
      'Touch & Gesture Feedback',
      'Micro-interactions',
      'Motion & Transitions',
    ],
  },
  {
    key: 'uikit',
    patterns: ['Atoms', 'Modules', 'Views', 'Responsive & Adaptive'],
  },
  {
    key: 'visual',
    patterns: [
      'Visual Hierarchy',
      'Color Application',
      'Typography in Product',
      'Imagery & Iconography',
      'Cross-platform Consistency',
    ],
  },
];

/* ────────────────────────────────────────────────────
   Main component
   ──────────────────────────────────────────────────── */
const ProductGuidelines = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-6 h-6 text-white" />
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {t('product.patterns.title')}
            </h3>
          </div>
          <p className="text-muted-foreground max-w-3xl leading-relaxed mb-3">
            {t('product.patterns.description')}
          </p>
          <p className="text-sm text-white/25 max-w-3xl leading-relaxed">
            {t('product.patterns.libraryDesc')}
          </p>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PATTERN_SECTIONS.map((section, si) => {
            const Visual = VISUALS[section.key];

            return (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: si * 0.12, duration: 0.5 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.015] overflow-hidden flex flex-col"
              >
                {/* Visual header */}
                <div className="w-full h-48 shrink-0">
                  <Visual />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  {/* Title row */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest shrink-0">
                      {String(si + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-base font-bold text-white leading-tight">
                      {t(`product.patterns.${section.key}.title`)}
                    </h4>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-[9px] text-white/20 font-mono cursor-default ml-auto shrink-0">
                      <Lock className="w-2.5 h-2.5" />
                      {t('product.patterns.comingSoon')}
                    </span>
                  </div>

                  {/* Intro */}
                  <p className="text-[13px] text-white/40 leading-relaxed mb-5 flex-1">
                    {t(`product.patterns.${section.key}.intro`)}
                  </p>

                  {/* Pattern pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {section.patterns.map((name) => (
                      <span
                        key={name}
                        className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-white/40 font-medium"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductGuidelines;
