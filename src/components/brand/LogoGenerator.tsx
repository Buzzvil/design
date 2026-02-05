'use client';

import { useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { LogoMark } from './LogoMark';
import { LogoWordmark } from './LogoWordmark';
import { useLanguage } from '@/contexts/LanguageContext';

const COLOR_OPTIONS = [
  { value: '#FFFFFF', label: 'White' },
  { value: '#000000', label: 'Black' },
  { value: '#EF4444', label: 'Red' },
];

const CUSTOM_COLOR_ID = 'custom';

export function LogoGenerator() {
  const [logoType, setLogoType] = useState<'mark' | 'wordmark'>('mark');
  const [color, setColor] = useState('#FFFFFF');
  const [customHex, setCustomHex] = useState('#FFFFFF');
  const [activeColorKey, setActiveColorKey] = useState<string>('#FFFFFF');
  const colorInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();

  const downloadLogo = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const resolvedColor = activeColorKey === CUSTOM_COLOR_ID ? customHex : color;
    const svgString =
      logoType === 'mark'
        ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1395 887" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M41.8181 230.081L-7.62572e-05 377.903L295.324 346.128L215.926 619.116C174.403 761.879 290.773 901.214 438.649 885.796L1171.68 809.366C1256.57 800.516 1327.58 741.026 1351.17 659.009L1394.38 508.743L1100.92 538.649L1178.46 266.811C1219.16 124.147 1102.65 -14.409 955.116 1.20647L221.222 78.8856C136.144 87.8907 65.1067 147.758 41.8181 230.081ZM887.842 282.577L588.779 314.352L506.537 604.069L803.731 572.294L887.842 282.577Z" fill="${resolvedColor}"/></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1703 507" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M92.4879 224.834L82.8127 259.035L151.139 251.683L132.77 314.842C123.163 347.872 150.086 380.109 184.299 376.541L353.895 358.858C373.534 356.811 389.963 343.047 395.42 324.072L405.418 289.306L337.524 296.225L355.464 233.332C364.879 200.325 337.922 168.269 303.79 171.882L133.995 189.853C114.311 191.937 97.8759 205.788 92.4879 224.834ZM288.225 236.98L219.033 244.331L200.006 311.361L268.765 304.009L288.225 236.98Z" fill="${resolvedColor}"/><path d="M585.745 171.386C647.729 171.386 690.08 219.083 690.08 277.722C690.08 336.362 647.729 382.656 586.026 382.656C561.905 382.936 537.785 375.922 517.871 361.894C516.188 371.714 507.774 379.008 497.677 379.008H467.106V280.248L466.826 103.488C466.826 101.524 468.508 100.121 470.191 100.121H502.445C513.945 99.8407 522.92 109.1 522.92 120.322V190.465C541.431 177.559 563.588 171.386 585.745 171.386ZM575.648 330.75C605.098 331.031 628.938 308.024 629.218 278.845C629.218 250.788 607.061 228.061 579.014 226.939C550.125 225.817 526.285 248.263 525.444 277.161C524.322 306.06 547.04 329.909 575.648 330.75ZM883.605 180.645C892.019 180.645 899.031 187.379 898.47 196.076V295.118C898.47 347.023 858.643 387.987 809.28 387.987H794.976C745.614 387.987 705.506 347.584 705.506 295.398V183.731C705.506 182.048 706.908 180.926 708.311 180.926H746.455C755.15 180.926 761.881 187.659 761.881 196.076V294.557C761.881 295.118 761.881 295.959 761.881 296.521C763.003 318.966 782.075 336.081 804.512 334.959C826.389 333.556 843.498 315.319 843.217 293.154V183.451C843.217 181.767 844.62 180.645 846.022 180.645H883.605ZM987.66 331.311V331.873H1078.25L1049.64 381.534C1049.08 382.656 1048.24 382.936 1047.4 382.936H934.09C929.602 382.936 925.395 381.814 921.469 379.569C909.408 372.555 904.921 356.843 912.213 344.779L977.002 231.989C977.282 231.709 977.282 231.709 977.282 231.428C977.282 230.867 976.721 230.025 975.88 230.025H919.786C918.103 230.025 916.981 228.623 916.981 227.22V181.206C916.981 179.523 918.384 178.401 919.786 178.401H1071.52C1071.8 178.401 1071.8 178.401 1072.08 178.401C1072.36 178.681 1072.64 179.523 1072.36 180.084L986.538 329.347C986.258 329.628 986.258 329.628 986.258 329.909C986.258 330.75 987.099 331.311 987.66 331.311ZM1165.48 329.909C1165.48 329.909 1165.2 330.189 1165.2 330.47C1165.2 331.031 1165.76 331.873 1166.6 331.873H1236.16L1207.55 381.534C1206.99 382.656 1206.15 382.936 1205.31 382.936H1070.4C1070.12 382.936 1070.12 382.656 1069.84 382.656C1069.56 382.375 1069.28 381.533 1069.56 380.972L1154.54 232.27C1154.82 231.989 1154.82 231.989 1154.82 231.709C1154.82 231.148 1154.26 230.306 1153.42 230.306H1065.07C1064.79 230.306 1064.79 230.025 1064.51 230.025C1064.23 229.745 1063.95 228.903 1064.23 228.342L1091.71 180.364C1092.28 179.242 1093.12 178.962 1093.96 178.962H1208.11C1212.6 178.962 1216.8 180.084 1220.73 182.328C1232.79 189.343 1237.28 205.055 1229.99 217.119L1165.48 329.909ZM1434.45 179.242C1436.41 179.242 1438.1 179.523 1440.06 180.645C1447.91 183.731 1451.84 192.71 1448.75 200.285L1378.64 380.972C1378.36 382.095 1377.23 382.656 1376.39 382.656H1346.66H1318.9C1317.77 382.656 1316.93 382.095 1316.65 380.972L1238.12 180.926V180.645C1238.12 180.084 1238.68 179.242 1239.52 179.242H1284.12C1292.53 179.242 1300.1 184.292 1303.19 192.429L1337.97 291.47C1346.66 313.635 1347.22 326.261 1347.22 326.261C1348.91 314.197 1351.99 302.413 1356.48 291.47L1395.46 180.926C1395.75 179.803 1396.87 179.242 1397.71 179.242H1434.45ZM1490.26 179.242C1505.13 179.242 1516.63 191.307 1516.63 205.616L1516.91 378.728C1516.91 380.692 1515.23 382.095 1513.54 382.095H1464.18C1462.22 382.095 1460.81 380.411 1460.81 378.728L1460.53 183.451C1460.53 181.206 1462.5 178.962 1465.02 178.962H1490.26V179.242ZM1487.74 95.9127C1504.85 95.9127 1518.59 109.661 1518.59 126.775C1518.59 143.89 1504.85 157.638 1487.74 157.638C1470.63 157.638 1456.89 143.89 1456.89 126.775C1456.89 109.661 1470.63 95.9127 1487.74 95.9127ZM1603.29 123.689V379.008C1603.29 380.692 1601.89 382.375 1599.93 382.375H1550.85C1549.16 382.375 1547.48 380.972 1547.48 379.008L1547.2 106.574C1547.2 104.891 1548.6 103.208 1550.56 103.208H1582.82C1594.04 103.208 1603.29 112.747 1603.29 123.689Z" fill="${resolvedColor}"/></svg>`;

    const img = new Image();
    img.onload = () => {
      const height = 512;
      const width = (img.width / img.height) * height;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `buzzvil-${logoType}-${resolvedColor.replace('#', '')}.png`;
      link.href = dataUrl;
      link.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
  };

  return (
    <div className="space-y-12">
      <section>
        <h3 className="mb-6 font-mono text-xl font-bold uppercase tracking-wider text-foreground">
          {t('brand.logoGenerator.title')}
        </h3>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          {t('brand.logoGenerator.description')}
        </p>
        <div className="grid gap-8 rounded-xl border border-border bg-background/50 p-8 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-medium">{t('brand.logoGenerator.assetType')}</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setLogoType('mark')}
                  className={`flex flex-1 items-center justify-center rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                    logoType === 'mark'
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-transparent text-muted-foreground hover:border-muted-foreground'
                  }`}
                >
                  {t('brand.logoGenerator.mark')}
                </button>
                <button
                  onClick={() => setLogoType('wordmark')}
                  className={`flex flex-1 items-center justify-center rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
                    logoType === 'wordmark'
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border bg-transparent text-muted-foreground hover:border-muted-foreground'
                  }`}
                >
                  {t('brand.logoGenerator.wordmark')}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('brand.logoGenerator.color')}</label>
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
                  title={t('brand.logoGenerator.customHex')}
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
            <div className="pt-4">
              <button
                onClick={downloadLogo}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-4 text-sm font-bold shadow-sm transition-colors hover:bg-muted/30"
              >
                <Download className="h-4 w-4" />
                {t('brand.logoGenerator.download')}
              </button>
            </div>
          </div>
          <div className="relative flex items-center justify-center overflow-hidden rounded-lg border border-border bg-[#0A0A0A]">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px] opacity-[0.05]" />
            <div className="z-10 p-12">
              {logoType === 'mark' ? (
                <LogoMark className="h-48 w-auto transition-colors duration-200" color={activeColorKey === CUSTOM_COLOR_ID ? customHex : color} />
              ) : (
                <LogoWordmark className="h-20 w-auto transition-colors duration-200" color={activeColorKey === CUSTOM_COLOR_ID ? customHex : color} />
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      </section>
    </div>
  );
}
