'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export function BrandTypography() {
  const { t } = useLanguage();

  const cards = [
    {
      title: t('brand.typography.primaryTitle'),
      desc: t('brand.typography.primaryDesc'),
      style: { fontFamily: 'var(--font-inter)' },
      samples: [
        { meta: t('brand.typography.h1Meta'), text: t('brand.typography.h1Text'), className: 'text-2xl font-bold tracking-tight' },
        { meta: t('brand.typography.h2Meta'), text: t('brand.typography.h2Text'), className: 'text-xl font-semibold tracking-tight' },
        { meta: t('brand.typography.bodyMeta'), text: t('brand.typography.bodyText'), className: 'text-sm leading-relaxed text-muted-foreground' },
      ],
    },
    {
      title: t('brand.typography.heroTitle'),
      desc: t('brand.typography.heroDesc'),
      style: { fontFamily: 'var(--font-nunito)' },
      samples: [
        { meta: t('brand.typography.heroMeta'), text: 'buzzvil / design', className: 'text-2xl font-extrabold tracking-tight' },
      ],
    },
    {
      title: t('brand.typography.secondaryTitle'),
      desc: t('brand.typography.secondaryDesc'),
      style: { fontFamily: 'var(--font-mono)' },
      samples: [
        { meta: t('brand.typography.kickerMeta'), text: t('brand.typography.kickerText'), className: 'text-xs font-bold uppercase tracking-wider text-muted-foreground' },
        {
          meta: t('brand.typography.dataMeta'),
          custom: (
            <div className="font-mono text-xs">
              <span className="text-primary">const</span> config = {'{'}
              <br />
              &nbsp;&nbsp;theme: <span className="text-green-500">&apos;dark&apos;</span>,
              <br />
              &nbsp;&nbsp;version: <span className="text-purple-500">2.0</span>
              <br />
              {'}'};
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-border bg-background/50 p-6 flex flex-col"
          >
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 flex-shrink-0">
              {card.desc}
            </p>
            <div className="space-y-4 flex-1" style={card.style}>
              {card.samples.map((sample, i) => (
                <div key={i} className="space-y-1.5">
                  <span className="text-xs text-muted-foreground">
                    {sample.meta}
                  </span>
                  {sample.custom ?? (
                    <p className={sample.className}>{sample.text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
