'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bookmark } from 'lucide-react';

const CONVENTIONS = ['workflow', 'tokens', 'naming', 'versioning'] as const;

const ProductConventions = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Bookmark className="w-6 h-6 text-white" />
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              {t('product.conventions.title')}
            </h3>
          </div>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            {t('product.conventions.description')}
          </p>
        </motion.div>

        {/* Convention blocks */}
        <div className="space-y-12">
          {CONVENTIONS.map((key, i) => {
            const bulletCount = Number(t(`product.conventions.${key}.bulletCount`));
            const bullets: string[] = [];
            for (let b = 1; b <= bulletCount; b++) {
              bullets.push(t(`product.conventions.${key}.bullet${b}`));
            }

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
              >
                {/* Header row */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    {t(`product.conventions.${key}.title`)}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-sm text-white/50 max-w-3xl leading-relaxed pl-9 mb-4">
                  {t(`product.conventions.${key}.desc`)}
                </p>

                {/* Bullet points */}
                <ul className="pl-9 space-y-2">
                  {bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                      <span className="text-sm text-white/40 leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductConventions;
