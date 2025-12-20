/** @type {import('next-sitemap').IConfig} */
// Locale-aware sitemap generation; defaults root to the FA locale.
const path = require('node:path');

const loadProductSlugs = () => {
  try {
    require('ts-node/register/transpile-only');
    require('tsconfig-paths/register');
    const { TV_PRODUCTS } = require(path.join(__dirname, 'content', 'tvProducts.ts'));
    if (!Array.isArray(TV_PRODUCTS)) return [];
    return Array.from(
      new Set(
        TV_PRODUCTS.map((product) => (product?.slug ?? product?.id ?? '').toString().trim())
          .filter(Boolean)
          .map((value) => value.toLowerCase()),
      ),
    );
  } catch {
    return [];
  }
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hisense-ir.com';
const locales = ['fa', 'en'];
const staticPaths = [
  '/tv-hisense',
  '/rac',
  '/cac',
  '/refrigerator',
  '/led-dcode',
  '/washing-machine',
  '/about',
  '/contact-us',
  '/complaint',
  '/survey',
  '/faq',
  '/warranty-and-guarantee',
  '/portal',
];
const productPaths = loadProductSlugs().map((slug) => `/tv-hisense/${slug}`);

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/api/*'],
  alternateRefs: [
    ...locales.map((locale) => ({
      href: `${siteUrl}/${locale}`,
      hreflang: locale,
    })),
    { href: `${siteUrl}/fa`, hreflang: 'x-default' },
  ],
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
    const normalizedPath = path === '/' ? '/fa' : path;

    return {
      loc: `${siteUrl}${normalizedPath}`,
      changefreq: config.changefreq ?? 'weekly',
      priority: normalizedPath === '/fa' ? 1 : (config.priority ?? 0.7),
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs,
    };
  },
};
