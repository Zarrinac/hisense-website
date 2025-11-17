import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/seo/StructuredData';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import '@/assets/sytles/globals.css';
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

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'Metadata',
  });
  const keywords = t.raw('keywords') as string[] | undefined;
  const metadataBase = new URL(SITE_URL);
  const localizedPath = `/${locale}`;
  const canonicalUrl = `${SITE_URL}${localizedPath}`;
  const languageAlternates = routing.locales.reduce<Record<string, string>>((acc, lang) => {
    acc[lang] = `${SITE_URL}/${lang}`;
    return acc;
  }, {});
  languageAlternates['x-default'] = `${SITE_URL}/${routing.defaultLocale}`;
  const openGraphLocale = OG_LOCALE_MAP[locale as Locale];

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

  setRequestLocale(locale);

  const messages = await getMessages();
  const direction = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning data-theme="light">
      <body className="bg-(--background-color) text-(--default-black-font) transition-colors duration-300">
        <ThemeProvider>
          <StructuredData locale={locale as Locale} />
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main>{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
