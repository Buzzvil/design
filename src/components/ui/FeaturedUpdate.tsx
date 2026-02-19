'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'featured-update-dismissed-version';

interface FeaturedUpdateProps {
  heading: string;
  description: string;
  linkHref: string;
  linkLabel: string;
  children: ReactNode;
  /**
   * Content version (e.g. '1', 'isometric-v2'). When you bump this, the featured card
   * will show again for all users, including those who previously dismissed it.
   */
  contentVersion: string;
  /** localStorage key to store the last dismissed version (default works with contentVersion) */
  storageKey?: string;
}

export function FeaturedUpdate({
  heading,
  description,
  linkHref,
  linkLabel,
  children,
  contentVersion,
  storageKey = STORAGE_KEY,
}: FeaturedUpdateProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (storageKey && typeof localStorage !== 'undefined') {
      const dismissedVersion = localStorage.getItem(storageKey);
      if (dismissedVersion === contentVersion) return;
    }
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, [storageKey, contentVersion]);

  const dismiss = () => {
    setVisible(false);
    if (storageKey && typeof localStorage !== 'undefined') {
      localStorage.setItem(storageKey, contentVersion);
    }
  };

  const goToLink = () => {
    if (linkHref.startsWith('#') && !linkHref.includes('/')) {
      const el = document.querySelector(linkHref);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        dismiss();
      } else {
        window.location.hash = linkHref;
        dismiss();
      }
    } else {
      window.location.href = linkHref;
      dismiss();
    }
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{
            type: 'spring',
            stiffness: 320,
            damping: 30,
            mass: 0.9,
          }}
          className="fixed bottom-4 right-4 left-4 z-50 sm:left-auto sm:w-[min(640px,calc(100vw-2rem))]"
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40 backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, hsl(0 0% 8%) 0%, hsl(0 0% 5%) 50%, hsl(0 0% 7%) 100%)',
            }}
          >
            {/* Accent glow */}
            <div
              className="absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-20 blur-3xl"
              style={{ background: 'radial-gradient(circle, #EF4444 0%, transparent 70%)' }}
            />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/[0.02] blur-2xl" />

            <div className="relative flex flex-col">
              {/* Header row: badge + dismiss */}
              <div className="flex items-start justify-between gap-4 p-4 pb-2 sm:p-5 sm:pb-3">
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white/70"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444] animate-pulse" />
                  New
                </motion.span>
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label="Dismiss"
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Heading */}
              <div className="px-4 pb-1 sm:px-5">
                <motion.h3
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.45 }}
                  className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
                >
                  {heading}
                </motion.h3>
              </div>

              {/* Description */}
              <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.45 }}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.36 }}
                  className="mt-3"
                >
                  <button
                    type="button"
                    onClick={goToLink}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-[#EF4444]/50 hover:bg-[#EF4444]/10 hover:text-foreground"
                  >
                    {linkLabel}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>
              </div>

              {/* Preview: scrollable area containing the interactive content */}
              <div className="border-t border-white/10 bg-black/30">
                <div className="max-h-[min(72vh,580px)] overflow-y-auto scrollbar-hide">
                  <div className="p-3 sm:p-4 [&_.rounded-xl]:rounded-lg">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
