import { defineRouting } from 'next-intl/routing';

// Central locale configuration for next-intl routing helpers and middleware.
export const routing = defineRouting({
  locales: ['fa', 'en'],
  defaultLocale: 'fa',
  localeDetection: false,
  pathnames: {
    '/': '/',
  },
});

export type Locale = (typeof routing.locales)[number];

export type Pathname = keyof (typeof routing)['pathnames'];
