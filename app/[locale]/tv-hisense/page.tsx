import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import TvHeroCarousel from '@/components/tv/TvHeroCarousel';
import { TV_PRODUCTS } from '@/content/tvProducts';
import tv01 from '@/public/tv-banner/tv01.ux-mini-led-tv.jpg';
import tv02 from '@/public/tv-banner/tv02.u8-mini-led-tv.jpg';
import tv03 from '@/public/tv-banner/tv03.u7-mini-led-tv.jpg';

const HERO_SLIDES = [
  { id: 'ux', image: tv01 },
  { id: 'u8', image: tv02 },
  { id: 'u7', image: tv03 },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const routeTranslations = await getTranslations('Routes.tvHisense');
  const pageTranslations = await getTranslations('TvHisensePage');
  const keywords = pageTranslations.raw('metadata.keywords');

  return {
    title: routeTranslations('title'),
    description: routeTranslations('description'),
    keywords: Array.isArray(keywords) ? keywords : undefined,
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

  const heroSlides = HERO_SLIDES.map((slide) => ({
    id: slide.id,
    image: slide.image,
    eyebrow: pageTranslations(`heroSlides.${slide.id}.eyebrow`),
    title: pageTranslations(`heroSlides.${slide.id}.title`),
    subtitle: pageTranslations(`heroSlides.${slide.id}.subtitle`),
  }));

  return (
    <div className="space-y-14 pb-16 pt-8 lg:space-y-20 lg:pb-24 lg:pt-12">
      <div className="mx-auto w-full max-w-480 px-4 sm:px-6 lg:px-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-(--text-subtle-color)">
              {routeTranslations('eyebrow')}
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{routeTranslations('title')}</h1>
            <p className="mt-3 max-w-3xl text-base text-(--text-muted-color) sm:text-lg">
              {routeTranslations('description')}
            </p>
          </div>
          <Link
            href={`/${locale}/contact-us`}
            className="hidden items-center gap-2 rounded-full border border-(--border-color) px-4 py-2 text-sm font-semibold text-(--default-black-font) transition hover:border-(--brand-color) hover:text-(--brand-color) lg:inline-flex"
          >
            {pageTranslations('hero.cta')}
          </Link>
        </div>

        <TvHeroCarousel slides={heroSlides} locale={locale} />
      </div>

      <div className="mx-auto w-full max-w-480 px-4 sm:px-6 lg:px-10">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-(--text-subtle-color)">
            {pageTranslations('seriesSection.eyebrow')}
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            {pageTranslations('seriesSection.title')}
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {TV_PRODUCTS.map((product) => {
            const copy = product.copy[lang];
            return (
              <Link
                key={product.id}
                href={`/${locale}/tv-hisense/${product.id}`}
                className="group relative block overflow-hidden rounded-3xl border border-(--border-color) bg-(--surface-color) shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--brand-color)"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={copy.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-(--brand-color)">
                      {product.series}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{copy.name}</h3>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <p className="text-sm text-(--text-muted-color)">{copy.tagline}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-(--brand-color) px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-(--brand-color-dark)">
                      {detailsLabel}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* <div className="mx-auto w-full max-w-480 px-4 sm:px-6 lg:px-10">
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
