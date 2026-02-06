'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '/design';

export function BrandImagery() {
  const { t } = useLanguage();

  return (
    <div className="space-y-12">
      <section>
        <h3 className="font-mono text-xl font-bold uppercase tracking-wider text-foreground mb-6">
          {t('brand.imagery.title')}
        </h3>
        <p className="mb-8 max-w-2xl text-muted-foreground">
          {t('brand.imagery.description')}
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="group overflow-hidden rounded-xl border border-border bg-muted/30">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={`${BASE_PATH}/brand/cc8486b755a5e9170b9179041d244a6ae4e8f63c.png`}
                alt="Visual Identity Application"
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div className="p-4">
              <span className="font-mono text-xs text-muted-foreground">
                {t('brand.imagery.visualIdentity')}
              </span>
            </div>
          </div>
          <div className="group overflow-hidden rounded-xl border border-border bg-muted/30">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={`${BASE_PATH}/brand/7387332a42ee4c4b8b8e2ba38d0485c9f6c96eb2.png`}
                alt="Web Interface"
                fill
                className="object-contain transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div className="p-4">
              <span className="font-mono text-xs text-muted-foreground">
                {t('brand.imagery.webInterface')}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
