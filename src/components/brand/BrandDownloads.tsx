'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Image, Palette, Box } from 'lucide-react';

export function BrandDownloads() {
  const { t } = useLanguage();

  const resources = [
    {
      icon: Image,
      title: t('brand.downloads.logoGenerator'),
      description: t('brand.downloads.logoGeneratorDesc'),
    },
    {
      icon: Palette,
      title: t('brand.downloads.iconGenerator'),
      description: t('brand.downloads.iconGeneratorDesc'),
    },
    {
      icon: Box,
      title: t('brand.downloads.isometricGenerator'),
      description: t('brand.downloads.isometricGeneratorDesc'),
    },
  ];

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {resources.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="flex flex-col rounded-2xl border border-border bg-background/10 backdrop-blur-sm p-8"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-4">{title}</h3>
          <p className="text-muted-foreground mb-6 flex-1">{description}</p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            {t('brand.downloads.comingSoon')}
          </span>
        </div>
      ))}
    </div>
  );
}
