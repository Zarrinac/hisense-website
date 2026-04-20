import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import createRoutePage from '@/components/routes/createRoutePage';
import { routing } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hisense-ir.com';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const routeTranslations = await getTranslations('Routes.warranty');
  const localizedPath = `/${locale}/warranty-and-guarantee`;
  const languageAlternates = routing.locales.reduce<Record<string, string>>((acc, lang) => {
    acc[lang] = `${SITE_URL}/${lang}/warranty-and-guarantee`;
    return acc;
  }, {});
  languageAlternates['x-default'] = `${SITE_URL}/${routing.defaultLocale}/warranty-and-guarantee`;

  return {
    title: routeTranslations('title'),
    description: routeTranslations('description'),
    alternates: {
      canonical: localizedPath,
      languages: languageAlternates,
    },
    metadataBase: new URL(SITE_URL),
  };
}

// Warranty and guarantee route uses the shared under-construction scaffold.
export default createRoutePage('warranty');
