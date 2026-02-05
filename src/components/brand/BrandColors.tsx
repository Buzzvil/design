'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export const COLORS = {
  grayscale: [
    { name: 'White', value: '#FFFFFF', text: '#000000' },
    { name: 'Gray 5', value: '#FAFAFA', text: '#000000' },
    { name: 'Gray 10', value: '#F5F5F5', text: '#000000' },
    { name: 'Gray 20', value: '#E5E5E5', text: '#000000' },
    { name: 'Gray 30', value: '#D4D4D4', text: '#000000' },
    { name: 'Gray 40', value: '#A3A3A3', text: '#000000' },
    { name: 'Gray 50', value: '#737373', text: '#FFFFFF' },
    { name: 'Gray 60', value: '#525252', text: '#FFFFFF' },
    { name: 'Gray 70', value: '#404040', text: '#FFFFFF' },
    { name: 'Gray 80', value: '#262626', text: '#FFFFFF' },
    { name: 'Gray 90', value: '#171717', text: '#FFFFFF' },
    { name: 'Gray 100', value: '#0A0A0A', text: '#FFFFFF' },
    { name: 'Gray 110', value: '#050505', text: '#FFFFFF' },
    { name: 'Black', value: '#000000', text: '#FFFFFF' },
  ],
  red: [
    { name: 'Red 10', value: '#FEF2F2', text: '#000000' },
    { name: 'Red 20', value: '#FECACA', text: '#000000' },
    { name: 'Red 30', value: '#FCA5A5', text: '#000000' },
    { name: 'Red 40', value: '#F87171', text: '#000000' },
    { name: 'Red 50', value: '#EF4444', text: '#FFFFFF' },
    { name: 'Red 60', value: '#DC2626', text: '#FFFFFF' },
    { name: 'Red 70', value: '#B91C1C', text: '#FFFFFF' },
    { name: 'Red 80', value: '#991B1B', text: '#FFFFFF' },
    { name: 'Red 90', value: '#7F1D1D', text: '#FFFFFF' },
    { name: 'Red 100', value: '#450A0A', text: '#FFFFFF' },
  ],
  orange: [
    { name: 'Orange 10', value: '#FFF7ED', text: '#000000' },
    { name: 'Orange 20', value: '#FFEDD5', text: '#000000' },
    { name: 'Orange 30', value: '#FED7AA', text: '#000000' },
    { name: 'Orange 40', value: '#FDBA74', text: '#000000' },
    { name: 'Orange 50', value: '#FB923C', text: '#000000' },
    { name: 'Orange 60', value: '#F97316', text: '#FFFFFF' },
    { name: 'Orange 70', value: '#EA580C', text: '#FFFFFF' },
    { name: 'Orange 80', value: '#C2410C', text: '#FFFFFF' },
    { name: 'Orange 90', value: '#9A3412', text: '#FFFFFF' },
    { name: 'Orange 100', value: '#7C2D12', text: '#FFFFFF' },
  ],
};

function ColorSwatch({
  name,
  value,
  textColor,
  copyText,
}: {
  name: string;
  value: string;
  textColor: string;
  copyText: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = value;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback failed
      }
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={copyToClipboard}
      className="group relative flex h-24 w-full cursor-pointer flex-col justify-between rounded-lg p-3 shadow-sm transition-all hover:shadow-md"
      style={{ backgroundColor: value, color: textColor }}
    >
      <div className="flex justify-between">
        <span className="text-xs font-bold uppercase tracking-wider opacity-70">
          {name}
        </span>
        {copied && <span className="text-xs font-bold">{copyText}</span>}
      </div>
      <div className="font-mono text-sm opacity-90">{value}</div>
    </motion.div>
  );
}

export function BrandColors() {
  const { t } = useLanguage();

  return (
    <div className="space-y-12">
      <section>
        <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-foreground mb-6">
          {t('brand.colors.grayscale')}
        </h3>
        <p className="mb-6 max-w-2xl text-muted-foreground">
          {t('brand.colors.grayscaleDesc')}
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
          {COLORS.grayscale.map((c) => (
            <ColorSwatch
              key={c.name}
              name={c.name}
              value={c.value}
              textColor={c.text}
              copyText={t('brand.colors.copied')}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-foreground mb-6">
          {t('brand.colors.red')}
        </h3>
        <p className="mb-6 max-w-2xl text-muted-foreground">
          {t('brand.colors.redDesc')}
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5 lg:grid-cols-10">
          {COLORS.red.map((c) => (
            <ColorSwatch
              key={c.name}
              name={c.name}
              value={c.value}
              textColor={c.text}
              copyText={t('brand.colors.copied')}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-foreground mb-6">
          {t('brand.colors.orange')}
        </h3>
        <p className="mb-6 max-w-2xl text-muted-foreground">
          {t('brand.colors.orangeDesc')}
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5 lg:grid-cols-10">
          {COLORS.orange.map((c) => (
            <ColorSwatch
              key={c.name}
              name={c.name}
              value={c.value}
              textColor={c.text}
              copyText={t('brand.colors.copied')}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
