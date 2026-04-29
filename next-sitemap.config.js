/** @type {import('next-sitemap').IConfig} */
// Locale-aware sitemap generation; defaults root to the FA locale.
const path = require('node:path');
const fs = require('node:fs');

const readContentFile = (filename) => {
  try {
    return fs.readFileSync(path.join(__dirname, 'content', filename), 'utf8');
  } catch {
    return '';
  }
};

const normalizeValues = (values) =>
  Array.from(
    new Set(
      values
        .map((value) => value.toString().trim())
        .filter(Boolean)
        .map((value) => value.toLowerCase()),
    ),
  );

const extractTopLevelIds = (filename) => {
  const source = readContentFile(filename);
  return normalizeValues(
    [...source.matchAll(/^ {4}id:\s*['"`]([^'"`]+)['"`]/gm)].map((match) => match[1]),
  );
};

const extractStringArray = (filename, variableName) => {
  const source = readContentFile(filename);
  const match = source.match(new RegExp(`const\\s+${variableName}\\s*=\\s*\\[([^\\]]+)\\]`));

  if (!match) {
    return [];
  }

  return normalizeValues([...match[1].matchAll(/['"`]([^'"`]+)['"`]/g)].map((item) => item[1]));
};

const loadProductSlugs = () => {
  return {
    tvs: extractTopLevelIds('tvProducts.ts'),
    wms: extractTopLevelIds('WmProducts.ts'),
    rac: extractTopLevelIds('RacProducts.ts'),
    cac: extractStringArray('CacProducts.ts', 'hidModels'),
    refrigerator: extractTopLevelIds('RefProducts.ts'),
  };
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hisense-ir.com';
const locales = ['fa', 'en'];
const staticPaths = [
  '/products/tvs',
  '/products/rac',
  '/products/cac',
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
  '/find-service-center',
  '/request-representation',
];
const {
  tvs: tvSlugs,
  wms: wmSlugs,
  rac: racSlugs,
  cac: cacSlugs,
  refrigerator: refrigeratorSlugs,
} = loadProductSlugs();
const productPaths = [
  ...tvSlugs.map((slug) => `/products/tvs/${slug}`),
  ...wmSlugs.map((slug) => `/products/wms/${slug}`),
  ...racSlugs.map((slug) => `/products/rac/${slug}`),
  ...cacSlugs.map((slug) => `/products/cac/${slug}`),
  ...refrigeratorSlugs.map((slug) => `/refrigerator/${slug}`),
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
