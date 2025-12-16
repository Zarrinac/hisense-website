import { getLocale, getTranslations } from 'next-intl/server';
import HeroBanner from '@/components/hero/HeroBanner';
import CategorySpotlights from '@/components/home/CategorySpotlights';
import type { SpotlightCard } from '@/components/home/CategorySpotlights';
import { mediaUrl } from '@/lib/mediaUrl';

// Locale-aware homepage renders the hero carousel and localized category spotlights.

const bannerAsset = (path: string) => mediaUrl(`/banner/${path}`);

// Locale-aware homepage renders the hero carousel and localized category spotlights.

const SPOTLIGHT_SOURCES = [
  { id: 'tv', href: '/tv-hisense', image: bannerAsset('Fix-Banner-02-Back.jpg') },
  { id: 'refrigerator', href: '/refrigerator', image: bannerAsset('Fix-Banner-03-Back.jpg') },
  { id: 'washingMachine', href: '/washing-machine', image: bannerAsset('Fix-Banner-04-Back.jpg') },
  { id: 'rac', href: '/rac', image: bannerAsset('Fix-Banner-05-Back.jpg') },
] as const satisfies ReadonlyArray<Pick<SpotlightCard, 'id' | 'href' | 'image'>>;

export default async function HomePage() {
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
      <div className="-mx-4 sm:-mx-6 lg:-mx-10">
        <HeroBanner />
      </div>
      <CategorySpotlights
        eyebrow={categoryTranslations('eyebrow')}
        title={categoryTranslations('title')}
        items={localizedSpotlights}
        locale={locale}
      />
    </>
  );
}
