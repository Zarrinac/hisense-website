import { getLocale, getTranslations } from 'next-intl/server';
import HeroBanner from '@/components/hero/HeroBanner';
import CategorySpotlights from '@/components/home/CategorySpotlights';
import type { SpotlightCard } from '@/components/home/CategorySpotlights';
import Banner02 from '@/public/banner/Fix-Banner-02-Back.jpg';
import Banner03 from '@/public/banner/Fix-Banner-03-Back.jpg';
import Banner04 from '@/public/banner/Fix-Banner-04-Back.jpg';
import Banner05 from '@/public/banner/Fix-Banner-05-Back.jpg';

const SPOTLIGHT_SOURCES = [
  { id: 'tv', href: '/tv-hisense', image: Banner02 },
  { id: 'refrigerator', href: '/refrigerator', image: Banner03 },
  { id: 'washingMachine', href: '/washing-machine', image: Banner04 },
  { id: 'rac', href: '/rac', image: Banner05 },
] as const satisfies ReadonlyArray<Pick<SpotlightCard, 'id' | 'href' | 'image'>>;

export default async function HomePage() {
  const heroTranslations = await getTranslations('HomePage.hero');
  const categoryTranslations = await getTranslations('HomePage.categories');
  const locale = await getLocale();

  const localizedSpotlights: SpotlightCard[] = SPOTLIGHT_SOURCES.map((spotlight) => ({
    ...spotlight,
    eyebrow: categoryTranslations(`items.${spotlight.id}.eyebrow`),
    title: categoryTranslations(`items.${spotlight.id}.title`),
    description: categoryTranslations(`items.${spotlight.id}.description`),
    cta: categoryTranslations(`items.${spotlight.id}.cta`),
    href: `/${locale}${spotlight.href}`,
  }));

  return (
    <>
      <HeroBanner />
      <CategorySpotlights
        eyebrow={categoryTranslations('eyebrow')}
        title={categoryTranslations('title')}
        items={localizedSpotlights}
        locale={locale}
      />
    </>
  );
}
