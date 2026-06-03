import { redirect } from 'next/navigation';
import type { Locale } from '@/i18n/routing';

type LegacyRequestRepresentationPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function LegacyRequestRepresentationPage({
  params,
}: LegacyRequestRepresentationPageProps) {
  const { locale } = await params;

  redirect(`/${locale}/request-representation`);
}
