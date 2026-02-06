'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { LogoMark } from './LogoMark';
import { LogoWordmark } from './LogoWordmark';
import { MaskingBackground } from '@/components/ui/MaskingBackground';

const LOGO_PATH =
  'M41.8181 230.081L-7.62572e-05 377.903L295.324 346.128L215.926 619.116C174.403 761.879 290.773 901.214 438.649 885.796L1171.68 809.366C1256.57 800.516 1327.58 741.026 1351.17 659.009L1394.38 508.743L1100.92 538.649L1178.46 266.811C1219.16 124.147 1102.65 -14.409 955.116 1.20647L221.222 78.8856C136.144 87.8907 65.1067 147.758 41.8181 230.081ZM887.842 282.577L588.779 314.352L506.537 604.069L803.731 572.294L887.842 282.577Z';

export function BrandLogoSection() {
  const { t } = useLanguage();

  return (
    <div className="space-y-16">
      <section>
        <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-foreground mb-6">
          {t('brand.logo.title')}
        </h3>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          {t('brand.logo.description')}
        </p>

        {/* Default Brand Context - Black & White */}
        <div className="mb-8 grid grid-cols-1 overflow-hidden rounded-xl border border-border md:grid-cols-2">
          <div className="flex flex-col items-center justify-center space-y-8 bg-white p-16">
            <div className="flex flex-col items-center gap-8">
              <LogoMark className="h-24 w-auto text-black" color="#000" />
              <LogoWordmark className="h-8 w-auto text-black" color="#000" />
            </div>
            <span className="font-mono text-xs text-gray-500">
              {t('brand.logo.lightBg')}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center space-y-8 bg-[#0A0A0A] p-16">
            <div className="flex flex-col items-center gap-8">
              <LogoMark className="h-24 w-auto text-white" color="#fff" />
              <LogoWordmark className="h-8 w-auto text-white" color="#fff" />
            </div>
            <span className="font-mono text-xs text-gray-500">
              {t('brand.logo.darkBg')}
            </span>
          </div>
        </div>

        {/* Partner Contexts */}
        <div className="space-y-4">
          <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {t('brand.logo.partnerContext')}
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div
              className="flex flex-col items-center justify-center space-y-6 rounded-xl p-12 transition-all hover:scale-[1.02]"
              style={{ backgroundColor: '#FEE500' }}
            >
              <div className="flex flex-col items-center gap-6">
                <LogoMark className="h-16 w-auto" color="#1E1E1E" />
                <LogoWordmark className="h-6 w-auto" color="#1E1E1E" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#1E1E1E]/60">
                {t('brand.logo.kakaoBank')}
              </span>
            </div>

            <div
              className="flex flex-col items-center justify-center space-y-6 rounded-xl p-12 transition-all hover:scale-[1.02]"
              style={{ backgroundColor: '#112F4E' }}
            >
              <div className="flex flex-col items-center gap-6">
                <LogoMark className="h-16 w-auto text-white" color="#fff" />
                <LogoWordmark className="h-6 w-auto text-white" color="#fff" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/60">
                {t('brand.logo.kBank')}
              </span>
            </div>

            <div
              className="flex flex-col items-center justify-center space-y-6 rounded-xl p-12 transition-all hover:scale-[1.02]"
              style={{ backgroundColor: '#9BCE26' }}
            >
              <div className="flex flex-col items-center gap-6">
                <LogoMark className="h-16 w-auto text-white" color="#fff" />
                <LogoWordmark className="h-6 w-auto text-white" color="#fff" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/60">
                {t('brand.logo.oliveYoung')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Treatment Section */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-foreground mb-6">
          {t('brand.logo.logoTreatment')}
        </h3>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Masking */}
          <div className="space-y-4">
            <div>
              <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                {t('brand.logo.maskingTitle')}
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('brand.logo.maskingDesc')}
              </p>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-white flex items-center justify-center">
              <div className="absolute inset-0 z-0">
                <MaskingBackground />
              </div>
              <div className="absolute inset-0 z-10">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 1395 887"
                  preserveAspectRatio="xMidYMid slice"
                  className="text-[#0A0A0A]"
                >
                  <defs>
                    <mask id="logoStencil">
                      <rect width="100%" height="100%" fill="white" />
                      <g transform="translate(697.5, 443.5) scale(0.65) translate(-697.5, -443.5)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d={LOGO_PATH}
                          fill="black"
                        />
                      </g>
                    </mask>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill="currentColor"
                    mask="url(#logoStencil)"
                  />
                </svg>
              </div>
              <div className="absolute bottom-4 right-4 z-20 rounded bg-black/50 px-2 py-1 text-[10px] font-bold uppercase text-white backdrop-blur">
                Animated Background
              </div>
            </div>
          </div>

          {/* 3D Guidelines */}
          <div className="space-y-4">
            <div>
              <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                {t('brand.logo.threeDTitle')}
              </h4>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('brand.logo.threeDDesc')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-muted/30 p-6 overflow-hidden relative">
                <div className="flex h-32 w-full items-center justify-center perspective-1000">
                  <div
                    className="relative h-20 w-auto"
                    style={{
                      transform: 'rotateX(55deg) rotateZ(45deg)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <LogoMark className="h-full w-auto drop-shadow-xl" />
                  </div>
                </div>
                <span className="font-mono text-xs font-bold uppercase text-green-500 z-10">
                  {t('brand.logo.isometricLabel')}
                </span>
              </div>

              <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-muted/30 p-6 relative">
                <div className="flex h-32 w-full items-center justify-center perspective-1000 overflow-hidden">
                  <div
                    className="relative h-20 w-auto opacity-80"
                    style={{
                      transform: 'rotateX(60deg) rotateY(20deg) skewY(15deg) scale(1.2)',
                    }}
                  >
                    <LogoMark className="h-full w-auto" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-32 w-px rotate-45 bg-red-500" />
                    <div className="absolute h-32 w-px -rotate-45 bg-red-500" />
                  </div>
                </div>
                <span className="font-mono text-xs font-bold uppercase text-red-500">
                  {t('brand.logo.freeformLabel')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clearspace */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-foreground mb-6">
          {t('brand.logo.clearspace')}
        </h3>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          {t('brand.logo.clearspaceDesc')}
        </p>
        <div className="flex items-center justify-center rounded-xl bg-muted/30 p-16">
          <div className="relative border border-dashed border-red-400/50 p-8">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-red-400">
              x
            </div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-xs text-red-400">
              x
            </div>
            <LogoWordmark className="h-12 w-auto" />
          </div>
        </div>
      </section>

      {/* Unacceptable Usage */}
      <section>
        <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-foreground mb-6">
          {t('brand.logo.unacceptable')}
        </h3>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          {t('brand.logo.unacceptableDesc')}
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex aspect-square flex-col items-center justify-center rounded-lg border border-border bg-muted/30 p-6">
            <div className="relative mb-4 flex h-full w-full items-center justify-center">
              <LogoMark className="h-16 w-auto scale-x-[1.5]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-px w-full rotate-45 bg-red-500/50" />
                <div className="absolute h-px w-full -rotate-45 bg-red-500/50" />
              </div>
            </div>
            <span className="text-center font-mono text-xs text-muted-foreground">
              {t('brand.logo.noStretch')}
            </span>
          </div>

          <div className="flex aspect-square flex-col items-center justify-center rounded-lg border border-border bg-muted/30 p-6">
            <div className="relative mb-4 flex h-full w-full items-center justify-center overflow-hidden">
              <LogoMark className="absolute -right-4 h-24 w-auto" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-px w-full rotate-45 bg-red-500/50" />
                <div className="absolute h-px w-full -rotate-45 bg-red-500/50" />
              </div>
            </div>
            <span className="text-center font-mono text-xs text-muted-foreground">
              {t('brand.logo.noCrop')}
            </span>
          </div>

          <div className="flex aspect-square flex-col items-center justify-center rounded-lg border border-border bg-muted/30 p-6">
            <div className="relative mb-4 flex h-full w-full items-center justify-center">
              <LogoMark className="h-16 w-auto rotate-12" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-px w-full rotate-45 bg-red-500/50" />
                <div className="absolute h-px w-full -rotate-45 bg-red-500/50" />
              </div>
            </div>
            <span className="text-center font-mono text-xs text-muted-foreground">
              {t('brand.logo.noRotate')}
            </span>
          </div>

          <div className="flex aspect-square flex-col items-center justify-center rounded-lg border border-border bg-muted/30 p-6">
            <div className="relative mb-4 flex h-full w-full items-center justify-center">
              <svg
                width="64"
                height="64"
                viewBox="0 0 802 484"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-auto fill-current"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.65121 176.844L0 203.89L169.78 185.622L161.1 215.469C119.577 358.231 235.947 497.567 383.823 482.149L613.889 458.161C698.77 449.31 769.782 389.821 793.369 307.804L801.621 279.109L632.915 296.302L641.327 266.811C682.022 124.147 565.509 -14.409 417.978 1.20647L187.055 25.6487C101.977 34.6537 30.9398 94.5213 7.65121 176.844ZM510.416 149.087L338.486 167.355L291.206 333.911L462.06 315.644L510.416 149.087Z"
                  fill="currentColor"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-px w-full rotate-45 bg-red-500/50" />
                <div className="absolute h-px w-full -rotate-45 bg-red-500/50" />
              </div>
            </div>
            <span className="text-center font-mono text-xs text-muted-foreground">
              {t('brand.logo.noDeform')}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
