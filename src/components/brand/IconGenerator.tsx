'use client';

import { useState, useRef, useMemo } from 'react';
import {
  MagnifyingGlass,
  Trophy,
  Medal,
  Coins,
  GameController,
  Star,
  Gift,
  Crown,
  Target,
  Lightning,
  Fire,
  Heart,
  Diamond,
  Rocket,
  Ticket,
  House,
  User,
  Users,
  Gear,
  Calendar,
  Clock,
  Envelope,
  Chat,
  Phone,
  MapPin,
  Bell,
  Trash,
  Pencil,
  Image,
  Camera,
  Video,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  CaretDown,
  CaretRight,
  List,
  X,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  Bank,
  Wallet,
  Tag,
  Percent,
  CurrencyDollar,
  Desktop,
  DeviceMobile,
  File,
  Folder,
  FileText,
  Copy,
  Download,
} from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';

const COLOR_OPTIONS = [
  { value: '#FFFFFF', label: 'White' },
  { value: '#000000', label: 'Black' },
  { value: '#EF4444', label: 'Red' },
];

const CUSTOM_COLOR_ID = 'custom';

type Weight = 'regular' | 'bold' | 'fill' | 'light' | 'thin' | 'duotone';

const EXTENDED_ICONS: Record<string, React.ComponentType<any>> = {
  Trophy,
  Medal,
  Coins,
  GameController,
  Star,
  Gift,
  Crown,
  Target,
  Lightning,
  Fire,
  Heart,
  Diamond,
  Rocket,
  Ticket,
  House,
  User,
  Users,
  Gear,
  Calendar,
  Clock,
  Envelope,
  Chat,
  Phone,
  MapPin,
  Bell,
  Trash,
  Pencil,
  Image,
  Camera,
  Video,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  CaretDown,
  CaretRight,
  List,
  X,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  Bank,
  Wallet,
  Tag,
  Percent,
  CurrencyDollar,
  Desktop,
  DeviceMobile,
  File,
  Folder,
  FileText,
  Copy,
};

const ICON_NAMES = Object.keys(EXTENDED_ICONS);

export function IconGenerator() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIconName, setSelectedIconName] = useState('Coins');
  const [color, setColor] = useState('#FFFFFF');
  const [customHex, setCustomHex] = useState('#FFFFFF');
  const [activeColorKey, setActiveColorKey] = useState<string>('#FFFFFF');
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [weight, setWeight] = useState<Weight>('regular');
  const [displayLimit, setDisplayLimit] = useState(48);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenIconRef = useRef<HTMLDivElement>(null);

  const filteredIcons = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      const rewardKeywords = ['Trophy', 'Medal', 'Coins', 'Game', 'Star', 'Gift', 'Crown', 'Target', 'Lightning', 'Fire', 'Heart', 'Diamond', 'Rocket', 'Ticket'];
      const prioritized = ICON_NAMES.filter((name) => rewardKeywords.some((k) => name.includes(k)));
      const others = ICON_NAMES.filter((name) => !rewardKeywords.some((k) => name.includes(k)));
      return [...prioritized, ...others];
    }
    return ICON_NAMES.filter((name) => name.toLowerCase().includes(query));
  }, [searchQuery]);

  const SelectedIconComponent = EXTENDED_ICONS[selectedIconName] || Coins;

  const downloadIcon = () => {
    const canvas = canvasRef.current;
    const hiddenIconContainer = hiddenIconRef.current;
    if (!canvas || !hiddenIconContainer) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const svgElement = hiddenIconContainer.querySelector('svg');
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    if (!svgString.includes('xmlns="http://www.w3.org/2000/svg"')) {
      svgString = svgString.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new window.Image();
    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;
      ctx.drawImage(img, 0, 0, 512, 512);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `buzzvil-icon-${selectedIconName.toLowerCase()}-${weight}.png`;
      link.href = dataUrl;
      link.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
  };

  return (
    <div className="space-y-12">
      <section>
        <h3 className="mb-6 font-mono text-xl font-bold uppercase tracking-wider text-foreground">
          {t('brand.iconGenerator.title')}
        </h3>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          {t('brand.iconGenerator.description')}
        </p>
        <div className="grid gap-8 rounded-xl border border-border bg-background/50 p-8 lg:grid-cols-2">
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-medium">{t('brand.iconGenerator.searchLabel')}</label>
              <div className="relative">
                <MagnifyingGlass className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('brand.iconGenerator.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setDisplayLimit(48);
                  }}
                  className="w-full rounded-lg border border-border bg-muted/30 py-3 pl-10 pr-4 text-sm outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <label className="text-sm font-medium">
                {searchQuery ? `${t('brand.iconGenerator.results')} (${filteredIcons.length})` : t('brand.iconGenerator.popular')}
              </label>
              <div className="grid max-h-[300px] grid-cols-6 gap-2 overflow-y-auto rounded-lg border border-border bg-muted/20 p-2">
                {filteredIcons.slice(0, displayLimit).map((name) => {
                  const IconComponent = EXTENDED_ICONS[name];
                  if (!IconComponent) return null;
                  return (
                    <button
                      key={name}
                      onClick={() => setSelectedIconName(name)}
                      className={`group relative flex aspect-square flex-col items-center justify-center rounded-md border transition-all hover:bg-muted/30 ${
                        selectedIconName === name ? 'border-foreground bg-muted/30' : 'border-transparent'
                      }`}
                      title={name}
                    >
                      <IconComponent size={24} weight="regular" className="text-foreground" />
                    </button>
                  );
                })}
                {filteredIcons.length === 0 && (
                  <div className="col-span-6 py-8 text-center text-sm text-muted-foreground">
                    {t('brand.iconGenerator.noResults').replace('{query}', searchQuery)}
                  </div>
                )}
              </div>
              {filteredIcons.length > displayLimit && (
                <button
                  onClick={() => setDisplayLimit((p) => p + 48)}
                  className="w-full rounded-md border border-border py-2 text-xs font-medium text-muted-foreground hover:bg-muted/30"
                >
                  {t('brand.iconGenerator.loadMore')}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('brand.iconGenerator.weight')}</label>
                <div className="flex flex-wrap gap-1">
                  {(['thin', 'light', 'regular', 'bold', 'fill'] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeight(w)}
                      className={`rounded-md border px-2.5 py-1.5 text-xs font-medium capitalize transition-all ${
                        weight === w ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-muted-foreground'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t('brand.iconGenerator.color')}</label>
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
                    title={t('brand.iconGenerator.customHex')}
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
            </div>
            <div className="pt-2">
              <button
                onClick={downloadIcon}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-4 text-sm font-bold shadow-sm transition-colors hover:bg-muted/30"
              >
                <Download weight="bold" className="h-4 w-4" />
                {t('brand.iconGenerator.download')}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium">{t('brand.iconGenerator.preview')}</label>
            <div className="relative flex min-h-[400px] flex-1 items-center justify-center overflow-hidden rounded-lg border border-border bg-[#0A0A0A]">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[length:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px] opacity-[0.05]" />
              <div className="z-10 flex flex-col items-center gap-4 p-12">
                <SelectedIconComponent color={activeColorKey === CUSTOM_COLOR_ID ? customHex : color} weight={weight} size={256} className="transition-all duration-300" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{selectedIconName}</span>
              </div>
              <canvas ref={canvasRef} className="hidden" />
              <div ref={hiddenIconRef} className="absolute -z-50 pointer-events-none opacity-0" style={{ left: '-9999px' }}>
                <SelectedIconComponent color={activeColorKey === CUSTOM_COLOR_ID ? customHex : color} weight={weight} size={512} style={{ width: 512, height: 512 }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
