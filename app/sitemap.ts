import type { MetadataRoute } from 'next';
import { loadProducts } from '@/lib/api/products/source';
import { REF_PRODUCTS } from '@/content/RefProducts';
import { routing } from '@/i18n/routing';
import {
  SITE_CONTENT_LAST_MODIFIED,
  HOME_CONTENT_LAST_MODIFIED,
  PRODUCT_CONTENT_LAST_MODIFIED,
  getLanguageAlternates,
  getLocalizedPath,
  toAbsoluteUrl,
} from '@/lib/seo/site';

// Refresh alongside the public catalog. Each category uses exactly the same
// DB-first/fallback loader as its listing, including models added after a build.
export const revalidate = 3600;

const STATIC_PATHS = [
  '/about',
  '/contact-us',
  '/hisense-repair',
  '/complaint',
  '/survey',
  '/faq',
  '/warranty-and-guarantee',
  '/find-service-center',
  '/request-representation',
];

const CATEGORIES = [
  ['tvs', 'TVS'],
  ['rac', 'RAC'],
  ['cac', 'CAC'],
  ['wms', 'WMS'],
] as const;

type PageEntry = { path: string; lastModified: Date; images?: string[] };

function productModifiedAt(updatedAt?: string): Date {
  const timestamp = updatedAt ? Date.parse(updatedAt) : NaN;
  return Number.isFinite(timestamp) && timestamp > PRODUCT_CONTENT_LAST_MODIFIED.getTime()
    ? new Date(timestamp)
    : PRODUCT_CONTENT_LAST_MODIFIED;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: PageEntry[] = [
    { path: '', lastModified: HOME_CONTENT_LAST_MODIFIED },
    ...STATIC_PATHS.map((path) => ({ path, lastModified: SITE_CONTENT_LAST_MODIFIED })),
  ];

  const catalogs = await Promise.all(
    CATEGORIES.map(async ([slug, category]) => ({ slug, ...(await loadProducts(category)) })),
  );

  for (const { slug, products } of catalogs) {
    const details = products.map((product) => ({
      path: `/products/${slug}/${(product.slug || product.id).toLowerCase()}`,
      lastModified: productModifiedAt(product.updatedAt),
      images: product.imageUrl ? [toAbsoluteUrl(product.imageUrl)] : undefined,
    }));
    entries.push(
      {
        path: `/products/${slug}`,
        lastModified: new Date(
          Math.max(PRODUCT_CONTENT_LAST_MODIFIED.getTime(), ...details.map((p) => +p.lastModified)),
        ),
      },
      ...details,
    );
  }

  // Refrigerator pages intentionally use bundled content, independently of DB.
  entries.push(
    { path: '/refrigerator', lastModified: PRODUCT_CONTENT_LAST_MODIFIED },
    ...REF_PRODUCTS.map((product) => ({
      path: `/refrigerator/${product.id.toLowerCase()}`,
      lastModified: PRODUCT_CONTENT_LAST_MODIFIED,
      images: [
        toAbsoluteUrl(typeof product.image === 'string' ? product.image : product.image.src),
      ],
    })),
  );

  return [...new Map(entries.map((entry) => [entry.path, entry])).values()].flatMap(
    ({ path, lastModified, images }) =>
      routing.locales.map((locale) => ({
        url: toAbsoluteUrl(getLocalizedPath(locale, path)),
        lastModified,
        ...(images ? { images } : {}),
        alternates: { languages: getLanguageAlternates(path) },
      })),
  );
}
