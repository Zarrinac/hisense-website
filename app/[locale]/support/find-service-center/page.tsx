import { redirect } from 'next/navigation';
import type { Locale } from '@/i18n/routing';

type LegacyFindServiceCenterPageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

export default async function LegacyFindServiceCenterPage({
  params,
}: LegacyFindServiceCenterPageProps) {
  const { locale } = await params;

  redirect(`/${locale}/find-service-center`);
}
