'use client';

import { useState, useRef, useCallback } from 'react';
import { Download, RotateCw } from 'lucide-react';
import { LogoMark } from './LogoMark';
import { useLanguage } from '@/contexts/LanguageContext';

const COLOR_OPTIONS = [
  { value: '#FFFFFF', label: 'White' },
  { value: '#000000', label: 'Black' },
  { value: '#EF4444', label: 'Red' },
];

const CUSTOM_COLOR_ID = 'custom';

type AngleKey = 'subtle' | 'standard' | 'strong';
type Direction = 'left' | 'center' | 'right';

const ANGLE_MAP: Record<AngleKey, number> = { subtle: 30, standard: 35, strong: 45 };

const LOGO_PATH =
  'M41.8181 230.081L-7.62572e-05 377.903L295.324 346.128L215.926 619.116C174.403 761.879 290.773 901.214 438.649 885.796L1171.68 809.366C1256.57 800.516 1327.58 741.026 1351.17 659.009L1394.38 508.743L1100.92 538.649L1178.46 266.811C1219.16 124.147 1102.65 -14.409 955.116 1.20647L221.222 78.8856C136.144 87.8907 65.1067 147.758 41.8181 230.081ZM887.842 282.577L588.779 314.352L506.537 604.069L803.731 572.294L887.842 282.577Z';

const DEPTH_STEP = 10;

function buildDepthLayers(count: number): number[] {
  const maxZ = count * DEPTH_STEP;
  return Array.from({ length: count }, (_, i) => (i + 1) * DEPTH_STEP);
}

export function IsometricGenerator() {
  const { t } = useLanguage();
  const [angleKey, setAngleKey] = useState<AngleKey>('standard');
  const [direction, setDirection] = useState<Direction>('left');
  const [depthLayers, setDepthLayers] = useState(3);
  const [color, setColor] = useState('#FFFFFF');
  const [customHex, setCustomHex] = useState('#FFFFFF');
  const [activeColorKey, setActiveColorKey] = useState<string>('#FFFFFF');
  const colorInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const logoColor = activeColorKey === CUSTOM_COLOR_ID ? customHex : color;

  const angle = ANGLE_MAP[angleKey];
  const zRotDeg = direction === 'left' ? 45 : direction === 'right' ? -45 : 0;
  const layers = buildDepthLayers(depthLayers);

  const getTransform = useCallback(() => {
    return `rotateX(${angle}deg) rotateZ(${zRotDeg}deg)`;
  }, [angle, zRotDeg]);

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);
    const previewSize = 512;
    const exportScale = 3;
    const size = previewSize * exportScale;

    try {
      const angleRad = (angle * Math.PI) / 180;
      const zRotRad = (zRotDeg * Math.PI) / 180;
      const logoSize = (previewSize / 2) * exportScale;
      const perspective = 1000;
      const offsetScale = 0.7 * exportScale;
      const cx = size / 2;
      const cy = size / 2;

      const tiltBoost = 1.15;
      const cosA = Math.cos(angleRad);
      const sinA = Math.sin(angleRad);
      const cosATilted = Math.cos(angleRad * tiltBoost);
      const cosZ = Math.cos(zRotRad);
      const sinZ = Math.sin(zRotRad);

      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not found');

      ctx.clearRect(0, 0, size, size);

      const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1395 887"><path fill-rule="evenodd" clip-rule="evenodd" d="${LOGO_PATH}" fill="${logoColor}"/></svg>`;
      const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = reject;
        i.src = svgUrl;
      });

      const m11 = cosZ;
      const m12 = sinZ;
      const m21 = -cosATilted * sinZ;
      const m22 = cosATilted * cosZ;

      const drawLayer = (z: number, opacity: number, brightness: number) => {
        const perspScale = perspective / (perspective + z);
        const w = logoSize * perspScale;
        const h = (887 / 1395) * w;
        const offsetX = -z * sinA * sinZ * offsetScale * perspScale;
        const offsetY = z * sinA * cosZ * offsetScale * perspScale;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        if (z > 0 && brightness < 1) {
          ctx.filter = `brightness(${brightness})`;
        }
        ctx.translate(cx + offsetX, cy + offsetY);
        ctx.transform(m11, m12, m21, m22, 0, 0);
        ctx.drawImage(img, -w / 2, -h / 2, w, h);
        ctx.restore();
      };

      for (let i = layers.length - 1; i >= 0; i--) {
        const opacity = Math.max(0.3, 0.92 - i * 0.08);
        const brightness = Math.max(0.45, 0.95 - i * 0.06);
        drawLayer(layers[i], opacity, brightness);
      }
      drawLayer(0, 1, 1);

      URL.revokeObjectURL(svgUrl);

      const link = document.createElement('a');
      link.download = `Buzzvil_Isometric_${angleKey}_${direction}_depth${depthLayers}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setIsDownloading(false);
    }
  }, [angle, zRotDeg, angleKey, direction, depthLayers, logoColor, layers]);

  const angleOptions: AngleKey[] = ['subtle', 'standard', 'strong'];

  return (
    <section>
      <h3 className="mb-6 font-mono text-xl font-bold uppercase tracking-wider text-foreground">
        {t('brand.isometricGenerator.title')}
      </h3>
      <p className="mb-8 max-w-2xl text-muted-foreground">
        {t('brand.isometricGenerator.description')}
      </p>
      <div className="grid gap-8 rounded-xl border border-border bg-background/50 p-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('brand.isometricGenerator.color')}</label>
            <div className="flex flex-wrap items-center gap-2">
              {COLOR_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => {
                    setActiveColorKey(value);
                    setColor(value);
                  }}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                    activeColorKey === value ? 'border-foreground ring-2 ring-muted-foreground ring-offset-2 ring-offset-background' : 'border-border hover:border-muted-foreground'
                  }`}
                  title={label}
                  style={{ backgroundColor: value }}
                />
              ))}
              <input
                ref={colorInputRef}
                type="color"
                value={customHex}
                onChange={(e) => setCustomHex(e.target.value)}
                className="sr-only"
                tabIndex={-1}
                aria-hidden
              />
              <button
                type="button"
                onClick={() => {
                  setActiveColorKey(CUSTOM_COLOR_ID);
                  colorInputRef.current?.click();
                }}
                className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border-2 transition-all ${
                  activeColorKey === CUSTOM_COLOR_ID ? 'border-foreground ring-2 ring-muted-foreground ring-offset-2 ring-offset-background' : 'border-border hover:border-muted-foreground'
                }`}
                title={t('brand.isometricGenerator.customHex')}
                style={
                  activeColorKey === CUSTOM_COLOR_ID
                    ? { backgroundColor: customHex }
                    : {
                        backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                        backgroundSize: '8px 8px',
                        backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0',
                        backgroundColor: '#888',
                      }
                }
              />
              {activeColorKey === CUSTOM_COLOR_ID && (
                <input
                  type="text"
                  value={customHex}
                  onChange={(e) => setCustomHex(e.target.value.startsWith('#') ? e.target.value : '#' + e.target.value)}
                  className="w-24 rounded border border-border bg-muted/30 px-2 py-1.5 font-mono text-xs outline-none focus:border-foreground"
                  placeholder="#FFFFFF"
                />
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('brand.isometricGenerator.angle')}</label>
            <div className="flex gap-2">
              {angleOptions.map((key) => (
                <button
                  key={key}
                  onClick={() => setAngleKey(key)}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${
                    angleKey === key
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border text-muted-foreground hover:border-muted-foreground'
                  }`}
                >
                  {t(`brand.isometricGenerator.angle${key.charAt(0).toUpperCase() + key.slice(1)}`)}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('brand.isometricGenerator.depth')} <span className="font-mono text-muted-foreground">({depthLayers})</span>
            </label>
            <input
              type="range"
              min={0}
              max={12}
              value={depthLayers}
              onChange={(e) => setDepthLayers(Number(e.target.value))}
              className="w-full accent-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('brand.isometricGenerator.direction')}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setDirection('left')}
                className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                  direction === 'left'
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted-foreground hover:border-muted-foreground'
                }`}
              >
                {t('brand.isometricGenerator.dirLeft')}
              </button>
              <button
                onClick={() => setDirection('center')}
                className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                  direction === 'center'
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted-foreground hover:border-muted-foreground'
                }`}
              >
                {t('brand.isometricGenerator.dirCenter')}
              </button>
              <button
                onClick={() => setDirection('right')}
                className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                  direction === 'right'
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border text-muted-foreground hover:border-muted-foreground'
                }`}
              >
                {t('brand.isometricGenerator.dirRight')}
              </button>
            </div>
          </div>
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-4 text-sm font-bold shadow-sm transition-all hover:bg-muted/30 disabled:opacity-50"
          >
            {isDownloading ? (
              <RotateCw className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {t('brand.isometricGenerator.download')}
          </button>
        </div>

        <div className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-lg border border-border bg-[#0A0A0A]">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px] opacity-[0.08]" />
          <div
            ref={previewRef}
            data-capture-target
            className="relative z-10"
            style={{
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              color: logoColor,
            }}
          >
            <div
              style={{
                transform: getTransform(),
                transition: 'transform 0.2s ease-out',
                transformStyle: 'preserve-3d',
                position: 'relative',
                width: '256px',
                height: '256px',
                perspective: '1000px',
              }}
            >
              <LogoMark color={logoColor} style={{ width: '100%', height: '100%' }} />
              {layers.map((z, i) => {
                const opacity = Math.max(0.3, 0.92 - i * 0.08);
                const brightness = Math.max(0.45, 0.95 - i * 0.06);
                return (
                  <LogoMark
                    key={i}
                    color={logoColor}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: -10 - i,
                      width: '100%',
                      height: '100%',
                      transform: `translateZ(-${z}px)`,
                      opacity,
                      filter: `brightness(${brightness})`,
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="absolute bottom-4 right-4 text-xs font-mono text-muted-foreground">512 × 512 (export: 1536 × 1536)</div>
        </div>
      </div>
    </section>
  );
}
