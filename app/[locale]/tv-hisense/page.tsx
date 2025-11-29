import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Visibility } from '@mui/icons-material';
import TvHeroCarousel from '@/components/tv/TvHeroCarousel';
import { TV_PRODUCTS } from '@/content/tvProducts';
import tv01 from '@/public/tv-banner/tv01.ux-mini-led-tv.jpg';
import tv02 from '@/public/tv-banner/tv02.u8-mini-led-tv.jpg';
import tv03 from '@/public/tv-banner/tv03.u7-mini-led-tv.jpg';
import tv04 from '@/public/tv-banner/tv04.tv-rgb-ban.jpg';

const HERO_SLIDES = [
  { id: 'rgb', image: tv04 },
  { id: 'ux', image: tv01 },
  { id: 'u8', image: tv02 },
  { id: 'u7', image: tv03 },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const routeTranslations = await getTranslations('Routes.tvHisense');
  const pageTranslations = await getTranslations('TvHisensePage');
  const keywordsRaw: unknown = pageTranslations.raw('metadata.keywords');

  return {
    title: routeTranslations('title'),
    description: routeTranslations('description'),
    keywords: Array.isArray(keywordsRaw) ? keywordsRaw : undefined,
    openGraph: {
      title: routeTranslations('title'),
      description: routeTranslations('description'),
      url: `/${locale}/tv-hisense`,
    },
    alternates: {
      canonical: `/${locale}/tv-hisense`,
    },
  };
}

export default async function TvHisensePage() {
  const locale = await getLocale();
  const routeTranslations = await getTranslations('Routes.tvHisense');
  const pageTranslations = await getTranslations('TvHisensePage');
  const detailsLabel = pageTranslations('actions.details');
  const lang: 'fa' | 'en' = locale === 'fa' ? 'fa' : 'en';
  const detailsTooltip = lang === 'fa' ? 'دیدن جزییات' : 'More details';

  const heroSlides = HERO_SLIDES.map((slide) => ({
    id: slide.id,
    image: slide.image,
    eyebrow: pageTranslations(`heroSlides.${slide.id}.eyebrow`),
    title: pageTranslations(`heroSlides.${slide.id}.title`),
    subtitle: pageTranslations(`heroSlides.${slide.id}.subtitle`),
  }));

  return (
    <div className="pb-16 space-y-14 lg:space-y-20 lg:pb-24">
      <div className="-mx-4 sm:-mx-6 lg:-mx-10 max-w-[1440px] 3xl:mx-auto">
        <TvHeroCarousel slides={heroSlides} locale={locale} />
      </div>

      <div className="w-full px-4 mx-auto max-w-480 sm:px-6 lg:px-10">
        <div className="mb-8 text-center">
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{routeTranslations('title')}</h2>
          <p className="mt-3 text-base text-(--text-muted-color) sm:text-lg">
            {routeTranslations('description')}
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {TV_PRODUCTS.map((product) => {
            const copy = product.copy[lang];
            const featureTags = (product.extras ?? []).slice(0, 3).filter(Boolean);
            const overlayFeatures =
              featureTags.length > 0
                ? featureTags
                : [product.panel, product.refreshRate, product.os].filter(Boolean).slice(0, 3);
            return (
              <Link
                key={product.id}
                href={`/${locale}/tv-hisense/${product.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-(--border-color) bg-(--surface-color) shadow-(--panel-shadow) transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_color-mix(in_srgb,var(--overlay-color) 55%,transparent)] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--brand-color)"
              >
                <div className="relative w-full overflow-hidden">
                  <div className="aspect-4/3 w-full bg-(--surface-color)">
                    <Image
                      src={product.image}
                      alt={copy.name}
                      fill
                      className="object-contain transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-between bg-linear-to-t from-(--overlay-color) via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100">
                    <div className="flex h-10 w-full items-center gap-2 bg-linear-to-b from-(--surface-hover-color) to-(--surface-color) px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-(--default-black-font)">
                      {overlayFeatures.map((feature) => (
                        <span key={feature} className="flex-1 leading-4 text-center">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-center pb-5">
                      <div className="relative inline-flex">
                        <span className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-(--default-black-font) px-3 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition duration-200 peer-hover:opacity-100 peer-focus-visible:opacity-100">
                          {detailsTooltip}
                        </span>
                        <span
                          className="peer inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-(--default-black-font) shadow-sm ring-1 ring-(--border-color) transition duration-200 group-hover:bg-white group-hover:text-black dark:group-hover:text-black hover:bg-(--brand-color) hover:text-white hover:ring-(--brand-color) focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--brand-color)"
                          aria-label={detailsLabel}
                        >
                          <Visibility fontSize="small" className="w-5 h-5" aria-hidden="true" />
                          <span className="sr-only">{detailsLabel}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-1 gap-2 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-(--text-subtle-color)">
                    {product.series}
                  </p>
                  <h3 className="text-lg font-bold text-(--default-black-font) sm:text-xl">
                    {copy.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* <div className="w-full px-4 mx-auto max-w-480 sm:px-6 lg:px-10">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-(--text-subtle-color)">
            {pageTranslations('productSection.eyebrow')}
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            {pageTranslations('productSection.title')}
          </h2>
          <p className="mt-3 text-base text-(--text-muted-color) sm:text-lg">
            {pageTranslations('productSection.description')}
          </p>
        </div>

        <TvProductShowcase
          products={TV_PRODUCTS}
          locale={locale}
          quoteLabel={quoteLabel}
          supportLabel={supportLabel}
        />
      </div> */}
    </div>
  );
}
