import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import {
  getMessages,
  getTranslations as getServerTranslations,
  setRequestLocale,
} from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/seo/StructuredData';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { routing, type Locale } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hisense-ir.com';
const OG_LOCALE_MAP: Record<Locale, string> = {
  fa: 'fa_IR',
  en: 'en_US',
};

type LocaleLayoutParams = {
  locale: string;
};

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<LocaleLayoutParams>;
};

function ensureLocale(locale: string): Locale {
  const match = routing.locales.find((value): value is Locale => value === locale);
  if (!match) {
    notFound();
  }
  return match;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LocaleLayoutProps, 'children'>,
): Promise<Metadata> {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const typedLocale = ensureLocale(locale);
  const t = await getServerTranslations({
    locale: typedLocale,
    namespace: 'Metadata',
  });
  const keywords = t.raw('keywords') as string[] | undefined;
  const metadataBase = new URL(SITE_URL);
  const localizedPath = `/${typedLocale}`;
  const canonicalUrl = `${SITE_URL}${localizedPath}`;
  const languageAlternates = routing.locales.reduce<Record<string, string>>((acc, lang) => {
    acc[lang] = `${SITE_URL}/${lang}`;
    return acc;
  }, {});
  languageAlternates['x-default'] = `${SITE_URL}/${routing.defaultLocale}`;
  const openGraphLocale = OG_LOCALE_MAP[typedLocale];

  return {
    metadataBase,
    title: t('title'),
    description: t('description'),
    keywords,
    alternates: {
      canonical: localizedPath,
      languages: languageAlternates,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonicalUrl,
      siteName: 'Zarrin Namaye caspian | Hisense Iran',
      locale: openGraphLocale,
      images: [
        {
          url: `${SITE_URL}/banner/Fix-Banner-07.jpg`,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const typedLocale = ensureLocale(locale);

  setRequestLocale(typedLocale);

  const messages = await getMessages();
  const metadataTranslations = await getServerTranslations({
    locale: typedLocale,
    namespace: 'Metadata',
  });
  const pageTitle = metadataTranslations('title');
  const pageContainerClass = 'mx-auto w-full max-w-[120rem] px-4 sm:px-6 lg:px-10';

  return (
    <ThemeProvider>
      <StructuredData locale={typedLocale} />
      <NextIntlClientProvider locale={typedLocale} messages={messages}>
        <Header />
        <div className={pageContainerClass}>
          <h1 className="sr-only">{pageTitle}</h1>
          <main>{children}</main>
          <Footer />
        </div>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
