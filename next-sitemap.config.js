/** @type {import('next-sitemap').IConfig} */
// Locale-aware sitemap generation; defaults root to the FA locale.
const path = require('node:path');

const loadProductSlugs = () => {
  try {
    require('ts-node/register/transpile-only');
    require('tsconfig-paths/register');
    const { TV_PRODUCTS } = require(path.join(__dirname, 'content', 'tvProducts.ts'));
    const { WM_PRODUCTS } = require(path.join(__dirname, 'content', 'WmProducts.ts'));
    const normalize = (products) =>
      Array.from(
        new Set(
          (Array.isArray(products) ? products : [])
            .map((product) => (product?.slug ?? product?.id ?? '').toString().trim())
            .filter(Boolean)
            .map((value) => value.toLowerCase()),
        ),
      );
    return {
      tvs: normalize(TV_PRODUCTS),
      wms: normalize(WM_PRODUCTS),
    };
  } catch {
    return { tvs: [], wms: [] };
  }
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hisense-ir.com';
const locales = ['fa', 'en'];
const staticPaths = [
  '/products/tvs',
  '/rac',
  '/cac',
  '/refrigerator',
  '/products/wms',
  '/about',
  '/contact-us',
  '/hisense-repair',
  '/complaint',
  '/survey',
  '/faq',
  '/warranty-and-guarantee',
  '/portal',
];
const { tvs: tvSlugs, wms: wmSlugs } = loadProductSlugs();
const productPaths = [
  ...tvSlugs.map((slug) => `/products/tvs/${slug}`),
  ...wmSlugs.map((slug) => `/products/wms/${slug}`),
];

const normalizeLocalePath = (inputPath) => (inputPath === '/' ? '/fa' : inputPath);

const buildAlternateRefs = (inputPath) => {
  const normalizedPath = normalizeLocalePath(inputPath);
  const pathSegments = normalizedPath.split('/').filter(Boolean);
  const suffix = pathSegments.length > 1 ? `/${pathSegments.slice(1).join('/')}` : '';

  return [
    ...locales.map((locale) => ({
      href: `${siteUrl}/${locale}${suffix}`,
      hrefIsAbsolute: true,
      hreflang: locale,
    })),
    {
      href: `${siteUrl}/${locales[0]}${suffix}`,
      hrefIsAbsolute: true,
      hreflang: 'x-default',
    },
  ];
};

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
  additionalPaths: async (config) => {
    const localizedStaticPaths = [];

    for (const locale of locales) {
      localizedStaticPaths.push(
        config.transform(config, `/${locale}`),
        ...staticPaths.map((path) => config.transform(config, `/${locale}${path}`)),
        ...productPaths.map((path) => config.transform(config, `/${locale}${path}`)),
      );
    }

    return Promise.all(localizedStaticPaths);
  },
  transform: async (config, path) => {
    const normalizedPath = normalizeLocalePath(path);

    return {
      loc: `${siteUrl}${normalizedPath}`,
      changefreq: config.changefreq ?? 'weekly',
      priority: normalizedPath === '/fa' ? 1 : (config.priority ?? 0.7),
      lastmod: new Date().toISOString(),
      alternateRefs: buildAlternateRefs(normalizedPath),
    };
  },
};
