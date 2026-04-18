import { RAC_PRODUCTS } from '@/content/RacProducts';
import { REF_PRODUCTS } from '@/content/RefProducts';
import { TV_PRODUCTS } from '@/content/tvProducts';
import { WM_PRODUCTS } from '@/content/WmProducts';

type LocaleKey = 'en' | 'fa';

export type SubmenuProductLink = {
  id: string;
  name: string;
  href: string;
};

const getLocaleKey = (locale: string): LocaleKey => (locale === 'fa' ? 'fa' : 'en');

const getLocalizedProductName = (
  localeKey: LocaleKey,
  copy: { en?: { name?: string }; fa?: { name?: string } } | undefined,
  fallback: string,
) => copy?.[localeKey]?.name ?? copy?.en?.name ?? fallback;

const toLowerSlug = (value: string) => value.toLowerCase();

const CAC_SOLUTIONS = [
  {
    id: 'vrf',
    name: {
      en: 'VRF Systems',
      fa: 'سیستم های VRF',
    },
    href: '/cac',
  },
  {
    id: 'ducted-hvac',
    name: {
      en: 'Ducted HVAC Systems',
      fa: 'سیستم های داکت اسپلیت',
    },
    href: '/cac',
  },
] as const;

export const buildSubmenuProductLinks = (locale: string): Record<string, SubmenuProductLink[]> => {
  const localeKey = getLocaleKey(locale);

  return {
    '/products/tvs': TV_PRODUCTS.map((product) => ({
      id: toLowerSlug(product.id),
      name: getLocalizedProductName(localeKey, product.copy, product.id),
      href: `/products/tvs/${toLowerSlug(product.id)}`,
    })),
    '/rac': RAC_PRODUCTS.map((product) => ({
      id: toLowerSlug(product.id),
      name: getLocalizedProductName(localeKey, product.copy, product.id),
      href: `/products/rac/${toLowerSlug(product.id)}`,
    })),
    '/cac': CAC_SOLUTIONS.map((solution) => ({
      id: solution.id,
      name: solution.name[localeKey],
      href: solution.href,
    })),
    '/refrigerator': REF_PRODUCTS.map((product) => ({
      id: toLowerSlug(product.id),
      name: getLocalizedProductName(localeKey, product.copy, product.id),
      href: `/refrigerator/${toLowerSlug(product.id)}`,
    })),
    '/products/wms': WM_PRODUCTS.map((product) => ({
      id: toLowerSlug(product.id),
      name: getLocalizedProductName(localeKey, product.copy, product.id),
      href: `/products/wms/${toLowerSlug(product.id)}`,
    })),
  };
};
