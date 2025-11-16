import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import '@/assets/sytles/globals.css';
import { routing, type Locale } from '@/i18n/routing';

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

  return {
    title: t('title'),
    description: t('description'),
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
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main>{children}</main>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
