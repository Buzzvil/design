'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Globe, Check, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Token structure — sourced from light.tokens.json
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface ThemeColors {
  primary: string;
  primaryContent: string;
  base100: string;
  base200: string;
  base300: string;
  baseContent: string;
  baseContent700: string;
  baseContent600: string;
  baseContent400: string;
  baseContent100: string;
  neutralBlack: string;
  neutralWhite: string;
  stroke100: string;
  background: string;
}

interface ChameleonTheme {
  name: string;
  theme: ThemeColors;
}

/* ━━━ Default (Buzzvil) token set ━━━ */
const DEFAULT_THEME: ChameleonTheme = {
  name: 'Default',
  theme: {
    primary: '#2563EB',
    primaryContent: '#FFFFFF',
    base100: '#FFFFFF',
    base200: '#F3F4F6',
    base300: '#E5E7EB',
    baseContent: '#18181B',
    baseContent700: '#3F3F46',
    baseContent600: '#52525B',
    baseContent400: '#A1A1AA',
    baseContent100: '#FFFFFF',
    neutralBlack: '#000000',
    neutralWhite: '#FFFFFF',
    stroke100: '#E4E4E7',
    background: '#F3F4F6',
  },
};

/* ━━━ Primary opacity levels — always derived from theme/primary ━━━ */
const PRIMARY_OPACITY_LEVELS = [
  { key: '12', alpha: 0.12, label: 'primary-opacity/12' },
  { key: '24', alpha: 0.24, label: 'primary-opacity/24' },
  { key: '56', alpha: 0.56, label: 'primary-opacity/56' },
  { key: '72', alpha: 0.72, label: 'primary-opacity/72' },
] as const;

/* ━━━ Pre-made variations ━━━ */
const PRESETS: ChameleonTheme[] = [
  DEFAULT_THEME,
  {
    name: 'Coral',
    theme: {
      primary: '#EF4444',
      primaryContent: '#FFFFFF',
      base100: '#FFFFFF',
      base200: '#FEF2F2',
      base300: '#FECACA',
      baseContent: '#18181B',
      baseContent700: '#3F3F46',
      baseContent600: '#52525B',
      baseContent400: '#A1A1AA',
      baseContent100: '#FFFFFF',
      neutralBlack: '#000000',
      neutralWhite: '#FFFFFF',
      stroke100: '#FCA5A5',
      background: '#FFF5F5',
    },
  },
  {
    name: 'Forest',
    theme: {
      primary: '#16A34A',
      primaryContent: '#FFFFFF',
      base100: '#FFFFFF',
      base200: '#F0FDF4',
      base300: '#BBF7D0',
      baseContent: '#052E16',
      baseContent700: '#14532D',
      baseContent600: '#166534',
      baseContent400: '#4ADE80',
      baseContent100: '#FFFFFF',
      neutralBlack: '#000000',
      neutralWhite: '#FFFFFF',
      stroke100: '#86EFAC',
      background: '#F0FDF4',
    },
  },
  {
    name: 'Midnight',
    theme: {
      primary: '#A78BFA',
      primaryContent: '#FFFFFF',
      base100: '#1E1B4B',
      base200: '#1A1744',
      base300: '#312E81',
      baseContent: '#F8FAFC',
      baseContent700: '#E0E7FF',
      baseContent600: '#C7D2FE',
      baseContent400: '#94A3B8',
      baseContent100: '#FFFFFF',
      neutralBlack: '#0F0B2E',
      neutralWhite: '#FFFFFF',
      stroke100: '#4338CA',
      background: '#0F0B2E',
    },
  },
];

/* ━━━ Token display map ━━━ */
const THEME_TOKEN_ROWS: { key: keyof ThemeColors; label: string; role: string }[] = [
  { key: 'primary', label: 'theme/primary', role: 'Brand primary' },
  { key: 'primaryContent', label: 'theme/primary-content', role: 'On primary' },
  { key: 'base100', label: 'theme/base_100', role: 'Surface' },
  { key: 'base200', label: 'theme/base_200', role: 'Subtle surface' },
  { key: 'base300', label: 'theme/base_300', role: 'Divider / border fill' },
  { key: 'baseContent', label: 'theme/base-content', role: 'Body text' },
  { key: 'baseContent700', label: 'theme/base-content_700', role: 'Secondary text' },
  { key: 'baseContent600', label: 'theme/base-content_600', role: 'Muted text' },
  { key: 'baseContent400', label: 'theme/base-content_400', role: 'Placeholder' },
  { key: 'stroke100', label: 'theme/stroke_100', role: 'Stroke' },
  { key: 'background', label: 'theme/background', role: 'Page background' },
];


/* ━━━ Helpers ━━━ */
function isLight(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140;
}

function hexToRGBA(hex: string, alpha: number): string {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function lighten(hex: string, amount: number): string {
  const c = hex.replace('#', '');
  const r = Math.min(255, Math.round(parseInt(c.substring(0, 2), 16) + (255 - parseInt(c.substring(0, 2), 16)) * amount));
  const g = Math.min(255, Math.round(parseInt(c.substring(2, 4), 16) + (255 - parseInt(c.substring(2, 4), 16)) * amount));
  const b = Math.min(255, Math.round(parseInt(c.substring(4, 6), 16) + (255 - parseInt(c.substring(4, 6), 16)) * amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/* ━━━ Campaign row sample data ━━━ */
const CAMPAIGN_ROWS = [
  { id: 1, title: '우리은행 인스타그램', subtitle: '인스타 팔로우하기', points: 100 },
  { id: 2, title: '우리은행 페이스북', subtitle: '페이스북 좋아요하면', points: 100 },
  { id: 3, title: '우리은행 채널 친구', subtitle: '카카오톡 채널 추가하면', points: 100 },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Brand color extraction — improved client-side logic
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function normalizeHex(raw: string): string | null {
  let s = raw.trim();
  // 3-char shorthand
  if (/^#[0-9A-Fa-f]{3}$/.test(s)) {
    s = `#${s[1]}${s[1]}${s[2]}${s[2]}${s[3]}${s[3]}`;
  }
  if (/^#[0-9A-Fa-f]{6}$/.test(s)) return s.toUpperCase();
  return null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

function parseRGB(str: string): string | null {
  const m = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (m) return rgbToHex(+m[1], +m[2], +m[3]);
  return null;
}

interface ColorCandidate {
  hex: string;
  freq: number;
  priority: number; // higher = better source
}

function extractBrandColors(html: string): { primary: string; secondary?: string; accent?: string; brandName?: string } | null {
  const colorMap = new Map<string, ColorCandidate>();

  const addColor = (hex: string, priority: number) => {
    const norm = normalizeHex(hex);
    if (!norm) return;
    const existing = colorMap.get(norm);
    if (existing) {
      existing.freq += 1;
      existing.priority = Math.max(existing.priority, priority);
    } else {
      colorMap.set(norm, { hex: norm, freq: 1, priority });
    }
  };

  // 1. meta theme-color — highest priority
  const themeColorMatch = html.match(/<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/i);
  if (themeColorMatch) {
    const parsed = normalizeHex(themeColorMatch[1]) || parseRGB(themeColorMatch[1]);
    if (parsed) addColor(parsed, 100);
  }

  // 2. CSS custom properties with "brand", "primary", "accent", "main" in the name
  const cssVarRegex = /--(?:[a-zA-Z-]*(?:brand|primary|accent|main|theme)[a-zA-Z-]*):\s*([^;}\n]+)/gi;
  let m: RegExpExecArray | null;
  while ((m = cssVarRegex.exec(html)) !== null) {
    const val = m[1].trim();
    const norm = normalizeHex(val) || parseRGB(val);
    if (norm) addColor(norm, 80);
  }

  // 3. Most common colors from CSS (inline + style tags)
  const allHex: string[] = [];
  const hexRegex = /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g;
  const rgbRegex = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*\)/g;

  const styleBlocks = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  const inlineStyles = html.match(/style=["'][^"']*["']/gi) || [];
  const allCSS = [...styleBlocks, ...inlineStyles].join(' ');

  let hm: RegExpExecArray | null;
  while ((hm = hexRegex.exec(allCSS)) !== null) allHex.push(hm[0]);
  while ((hm = rgbRegex.exec(allCSS)) !== null) {
    const parsed = parseRGB(hm[0]);
    if (parsed) allHex.push(parsed);
  }

  // Count frequency
  const freqMap = new Map<string, number>();
  for (const raw of allHex) {
    const norm = normalizeHex(raw);
    if (norm) freqMap.set(norm, (freqMap.get(norm) || 0) + 1);
  }
  for (const [hex, freq] of freqMap) addColor(hex, 10 + Math.min(freq, 30));

  // 4. Link/button colors — often brand colors
  const linkColorRegex = /(?:a\b|\.btn|\.button|\.cta|\.nav-link)[^{]*\{[^}]*(?:color|background(?:-color)?)\s*:\s*([^;}\n]+)/gi;
  while ((m = linkColorRegex.exec(allCSS)) !== null) {
    const val = m[1].trim();
    const norm = normalizeHex(val) || parseRGB(val);
    if (norm) addColor(norm, 50);
  }

  // Score and filter
  const candidates = Array.from(colorMap.values());
  const scored = candidates
    .map((c) => {
      const hex = c.hex.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      const lum = (r * 299 + g * 587 + b * 114) / 1000;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const chroma = max - min;

      // Filter out near-white, near-black, pure grays
      if (lum > 240 || lum < 15) return { ...c, score: 0 };
      if (chroma < 15 && lum > 50 && lum < 200) return { ...c, score: 0 }; // gray

      // Score: priority weight + frequency bonus + saturation bonus + mid-range luminance bonus
      const saturation = max === 0 ? 0 : chroma / max;
      let score = c.priority * 2 + Math.min(c.freq, 20) * 1.5 + saturation * 40;
      if (lum > 40 && lum < 200) score += 15;
      return { ...c, score };
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return null;

  const primary = scored[0].hex;

  // For secondary: pick the next best that's visually distinct
  const secondary = scored.find((s) => {
    if (s.hex === primary) return false;
    const p = primary.replace('#', '');
    const h = s.hex.replace('#', '');
    const dr = parseInt(p.substring(0, 2), 16) - parseInt(h.substring(0, 2), 16);
    const dg = parseInt(p.substring(2, 4), 16) - parseInt(h.substring(2, 4), 16);
    const db = parseInt(p.substring(4, 6), 16) - parseInt(h.substring(4, 6), 16);
    return Math.sqrt(dr * dr + dg * dg + db * db) > 60;
  })?.hex;

  const accent = scored.find((s) => {
    if (s.hex === primary || s.hex === secondary) return false;
    return s.score > 5;
  })?.hex;

  // Try to get brand name
  let brandName: string | undefined;
  const ogTitle = html.match(/<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i);
  if (ogTitle) brandName = ogTitle[1];
  if (!brandName) {
    const title = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (title) brandName = title[1].split(/[|\-–—]/)[0].trim();
  }

  return { primary, secondary, accent, brandName };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Build a ChameleonTheme from extracted brand colors
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function buildThemeFromColors(primary: string, name: string): ChameleonTheme {
  return {
    name,
    theme: {
      primary,
      primaryContent: isLight(primary) ? '#18181B' : '#FFFFFF',
      base100: '#FFFFFF',
      base200: lighten(primary, 0.94),
      base300: lighten(primary, 0.85),
      baseContent: '#18181B',
      baseContent700: '#3F3F46',
      baseContent600: '#52525B',
      baseContent400: '#A1A1AA',
      baseContent100: '#FFFFFF',
      neutralBlack: '#000000',
      neutralWhite: '#FFFFFF',
      stroke100: lighten(primary, 0.8),
      background: lighten(primary, 0.96),
    },
  };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Component
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function ChameleonTheming() {
  const { t } = useLanguage();
  const [activeTheme, setActiveTheme] = useState<ChameleonTheme>(DEFAULT_THEME);
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [grabError, setGrabError] = useState('');
  const [tokensExpanded, setTokensExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const theme = activeTheme;

  /* ─── Grab brand ─── */
  /* Strategy: try the GPT-powered brand-grabber API first (if configured),
     fall back to client-side regex extraction when unavailable. */
  const BRAND_GRABBER_API = process.env.NEXT_PUBLIC_BRAND_GRABBER_URL;

  const grabViaAPI = useCallback(async (url: string): Promise<{ primary: string; brandName?: string } | null> => {
    if (!BRAND_GRABBER_API) return null;
    try {
      const res = await fetch(`${BRAND_GRABBER_API}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: AbortSignal.timeout(30000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      if (data.colors?.primary) {
        return { primary: data.colors.primary, brandName: data.brandName };
      }
      return null;
    } catch {
      return null;
    }
  }, [BRAND_GRABBER_API]);

  const grabViaClientSide = useCallback(async (url: string): Promise<{ primary: string; brandName?: string } | null> => {
    const proxies = [
      (u: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
      (u: string) => `https://corsproxy.io/?${encodeURIComponent(u)}`,
    ];
    let html = '';
    for (const proxy of proxies) {
      try {
        const res = await fetch(proxy(url), { signal: AbortSignal.timeout(12000) });
        if (res.ok) { html = await res.text(); break; }
      } catch { continue; }
    }
    if (!html) return null;
    return extractBrandColors(html);
  }, []);

  const handleGrabBrand = useCallback(async () => {
    let url = urlInput.trim();
    if (!url) return;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    setLoading(true);
    setGrabError('');

    // 1. Try GPT-powered API
    let result = await grabViaAPI(url);

    // 2. Fallback to client-side extraction
    if (!result) {
      result = await grabViaClientSide(url);
    }

    if (!result) {
      setGrabError('Could not extract colors from this URL. Try another site.');
      setLoading(false);
      return;
    }

    let hostname = '';
    try { hostname = new URL(url).hostname.replace(/^www\./, ''); } catch { hostname = 'Custom'; }

    setActiveTheme(buildThemeFromColors(result.primary, result.brandName || hostname));
    setLoading(false);
  }, [urlInput, grabViaAPI, grabViaClientSide]);

  /* ─── Visible token rows ─── */
  const visibleThemeTokens = tokensExpanded ? THEME_TOKEN_ROWS : THEME_TOKEN_ROWS.slice(0, 6);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-6 h-6 text-white" />
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {t('product.chameleon.title')}
            </h3>
          </div>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            {t('product.chameleon.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ─── Left column: presets + URL + token list ─── */}
          <div className="space-y-6">
            {/* Presets */}
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                {t('product.chameleon.presets')}
              </p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setActiveTheme(p)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      theme.name === p.name
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-white/70 hover:bg-white/15'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                      style={{ backgroundColor: p.theme.primary }}
                    />
                    {p.name}
                    {theme.name === p.name && <Check className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>

            {/* URL grabber */}
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                {t('product.chameleon.grabLabel')}{' '}
                <span className="text-white/20 normal-case tracking-normal">(alpha, AI not connected)</span>
              </p>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    ref={inputRef}
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGrabBrand()}
                    placeholder="https://example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>
                <button
                  onClick={handleGrabBrand}
                  disabled={loading || !urlInput.trim()}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/15 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Grab'}
                </button>
              </div>
              {grabError && <p className="text-xs text-red-400 mt-1.5">{grabError}</p>}
            </div>

            {/* Token list */}
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
                {t('product.chameleon.tokens')}
              </p>

              {/* Theme colors */}
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2">
                color / theme
              </p>
              <div className="space-y-px mb-2">
                {visibleThemeTokens.map((tok) => (
                  <div
                    key={tok.key}
                    className="flex items-center gap-3 px-2.5 py-1.5 rounded bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                  >
                    <span
                      className="w-5 h-5 rounded shrink-0 border border-white/10"
                      style={{ backgroundColor: theme.theme[tok.key] }}
                    />
                    <span className="text-xs text-white/50 font-mono flex-1 truncate">
                      {tok.label}
                    </span>
                    <span className="text-[10px] text-white/25 font-mono">
                      {theme.theme[tok.key]}
                    </span>
                  </div>
                ))}
              </div>
              {THEME_TOKEN_ROWS.length > 6 && (
                <button
                  onClick={() => setTokensExpanded(!tokensExpanded)}
                  className="flex items-center gap-1 text-[10px] text-white/30 hover:text-white/50 transition-colors font-mono mb-4"
                >
                  {tokensExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  {tokensExpanded ? 'Show less' : `+ ${THEME_TOKEN_ROWS.length - 6} more`}
                </button>
              )}

              {/* Primary opacity */}
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-2">
                color / primary-opacity
              </p>
              <div className="space-y-px">
                {PRIMARY_OPACITY_LEVELS.map((tok) => (
                  <div
                    key={tok.key}
                    className="flex items-center gap-3 px-2.5 py-1.5 rounded bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                  >
                    <span className="w-5 h-5 rounded shrink-0 border border-white/10 relative overflow-hidden">
                      <span
                        className="absolute inset-0"
                        style={{
                          background: `repeating-conic-gradient(#808080 0% 25%, #c0c0c0 0% 50%) 0 0 / 5px 5px`,
                        }}
                      />
                      <span
                        className="absolute inset-0"
                        style={{ backgroundColor: hexToRGBA(theme.theme.primary, tok.alpha) }}
                      />
                    </span>
                    <span className="text-xs text-white/50 font-mono flex-1 truncate">
                      {tok.label}
                    </span>
                    <span className="text-[10px] text-white/25 font-mono">
                      {'{'}theme/primary{'}'} · {Math.round(tok.alpha * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Right column: live preview — section/module from Figma ─── */}
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
              {t('product.chameleon.preview')}
            </p>

            {/* Phone frame */}
            <AnimatePresence mode="wait">
              <motion.div
                key={theme.name + theme.theme.primary}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="mx-auto max-w-[380px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                style={{ backgroundColor: theme.theme.background }}
              >
                {/* section/module — faithful to Figma design */}
                <div
                  className="flex flex-col gap-3 px-3 py-5"
                  style={{
                    backgroundColor: theme.theme.base100,
                    borderRadius: '16px',
                    margin: '4px 8px 8px',
                  }}
                >
                  {/* Section header */}
                  <div className="flex items-center justify-between px-2 h-7">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-lg font-bold leading-7"
                        style={{ color: theme.theme.baseContent }}
                      >
                        섹션 타이틀
                      </span>
                      <span
                        className="text-[12px] font-bold leading-4 px-1.5 py-1 rounded-md"
                        style={{
                          backgroundColor: theme.theme.primary,
                          color: theme.theme.primaryContent,
                        }}
                      >
                        NEW
                      </span>
                    </div>
                    <span
                      className="text-sm font-medium leading-5"
                      style={{ color: theme.theme.baseContent600 }}
                    >
                      더 보기 &rsaquo;
                    </span>
                  </div>

                  {/* Campaign row items */}
                  {CAMPAIGN_ROWS.map((row) => (
                    <div
                      key={row.id}
                      className="flex items-center gap-5 p-2 rounded-md cursor-pointer transition-colors"
                      style={{ borderRadius: '6px' }}
                    >
                      {/* Logo placeholder */}
                      <div
                        className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{
                          border: `1px solid ${theme.theme.stroke100}`,
                          backgroundColor: theme.theme.base100,
                        }}
                      >
                        <span
                          className="text-[10px] font-bold tracking-wider"
                          style={{ color: theme.theme.baseContent400 }}
                        >
                          LOGO
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-base font-bold leading-6 truncate"
                          style={{ color: theme.theme.baseContent }}
                        >
                          {row.title}
                        </p>
                        <p
                          className="text-sm font-medium leading-5 truncate"
                          style={{ color: theme.theme.baseContent400 }}
                        >
                          {row.subtitle}
                        </p>
                      </div>

                      {/* Point badge */}
                      <div
                        className="shrink-0 flex items-center justify-center px-2 py-1.5 rounded-full min-w-[58px] max-w-[80px]"
                        style={{
                          backgroundColor: hexToRGBA(theme.theme.primary, 0.12),
                        }}
                      >
                        <span
                          className="text-sm font-bold leading-5"
                          style={{ color: theme.theme.primary }}
                        >
                          {row.points}P
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Badge */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: theme.theme.primary }}
              />
              <span className="text-xs text-white/40 font-mono">
                {theme.name} &middot; section/module &middot; {THEME_TOKEN_ROWS.length + PRIMARY_OPACITY_LEVELS.length} tokens
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
