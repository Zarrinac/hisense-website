import { getTranslations } from 'next-intl/server';
import HeroBanner from '@/components/hero/HeroBanner';

export default async function HomePage() {
  const t = await getTranslations('HomePage.hero');

  return (
    <>
      <HeroBanner />
      <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-(--hero-surface-color) px-6 text-center text-(--hero-title-color) transition-colors">
        <h1 className="text-4xl font-bold lg:text-6xl">{t('title')}</h1>
        <p className="max-w-2xl text-lg text-(--hero-subtitle-color) lg:text-xl">{t('subtitle')}</p>
      </section>
    </>
  );
}
