import { getTranslations } from 'next-intl/server';
export default async function HomePage() {
  const t = await getTranslations('HomePage.hero');

  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-blue-300 px-6 text-center">
      <h1 className="text-4xl font-bold lg:text-6xl">{t('title')}</h1>
      <p className="max-w-2xl text-lg text-black/80 lg:text-xl">{t('subtitle')}</p>
    </section>
  );
}
