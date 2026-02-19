'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { FeaturedUpdate } from './FeaturedUpdate';
import { IsometricGenerator } from '@/components/brand/IsometricGenerator';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function FeaturedUpdateGlobal() {
  const { t } = useLanguage();
  const linkHref = `${BASE_PATH}/brand/#downloads`;

  return (
    <FeaturedUpdate
      heading={t('featured.update.heading')}
      description={t('featured.update.description')}
      linkHref={linkHref}
      linkLabel={t('featured.update.linkLabel')}
    >
      <IsometricGenerator />
    </FeaturedUpdate>
  );
}
