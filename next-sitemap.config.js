/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zarrinac.com';
const locales = ['fa', 'en'];

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
    return Promise.all(
      locales.map((locale) => {
        const path = `/${locale}`;
        return config.transform(config, path);
      }),
    );
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
