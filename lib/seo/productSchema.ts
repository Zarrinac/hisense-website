import type { Locale } from '@/i18n/routing';
import { SITE_URL, getLocaleLanguage, toAbsoluteUrl } from './site';

// Shared schema.org Product builder so TV/RAC/WMS/CAC and refrigerator detail
// pages emit consistent Product + Brand structured data. No price/offer is
// emitted because the site does not publish prices; adding `offers` with a
// price/availability later unlocks product rich results.

type ProductJsonLdInput = {
  locale: Locale;
  name: string;
  description?: string;
  /** Absolute canonical URL of the product page. */
  url: string;
  /** Primary image src (relative or absolute). */
  image: string;
  sku?: string | null;
  mpn?: string | null;
  /** Localized category label, e.g. "تلویزیون هایسنس". */
  category?: string;
  /** Optional gallery/extra image srcs. */
  additionalImages?: string[];
};

export const buildProductJsonLd = ({
  locale,
  name,
  description,
  url,
  image,
  sku,
  mpn,
  category,
  additionalImages = [],
}: ProductJsonLdInput) => {
  const images = Array.from(
    new Set(
      [image, ...additionalImages].filter((src): src is string => Boolean(src)).map(toAbsoluteUrl),
    ),
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    ...(description ? { description } : {}),
    ...(images.length > 0 ? { image: images } : {}),
    ...(sku ? { sku } : {}),
    ...(mpn ? { mpn } : {}),
    ...(category ? { category } : {}),
    brand: { '@type': 'Brand', name: 'Hisense' },
    manufacturer: { '@type': 'Organization', name: 'Hisense' },
    url,
    inLanguage: getLocaleLanguage(locale),
    isRelatedTo: { '@id': `${SITE_URL}#organization` },
  };
};
