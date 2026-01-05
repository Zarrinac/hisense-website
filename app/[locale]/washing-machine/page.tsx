import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Visibility } from '@mui/icons-material';
import RouteHero from '@/components/routes/RouteHero';
import { WM_PRODUCTS } from '@/content/WmProducts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hisense-ir.com';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const routeTranslations = await getTranslations('Routes.washingMachine');

  return {
    title: routeTranslations('title'),
    description: routeTranslations('description'),
    openGraph: {
      title: routeTranslations('title'),
      description: routeTranslations('description'),
      url: `/${locale}/washing-machine`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: routeTranslations('title'),
      description: routeTranslations('description'),
    },
    alternates: {
      canonical: `/${locale}/washing-machine`,
    },
    metadataBase: new URL(SITE_URL),
  };
}

export default async function WashingMachinePage() {
  const locale = await getLocale();
  const routeTranslations = await getTranslations('Routes.washingMachine');
  const pageTranslations = await getTranslations('TvHisensePage');
  const lang: 'fa' | 'en' = locale === 'fa' ? 'fa' : 'en';
  const detailsLabel = pageTranslations('actions.details');

  return (
    <div className="pb-16 space-y-12 lg:space-y-16 lg:pb-24">
      <RouteHero
        eyebrow={routeTranslations('eyebrow')}
        title={routeTranslations('title')}
        description={routeTranslations('description')}
      />

      <div className="w-full px-4 mx-auto max-w-480 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {WM_PRODUCTS.map((product) => {
            const copy = product.copy[lang] ?? product.copy.en;
            const seriesLabel = product.seriesLabel ?? product.series;
            const seriesLabelDir =
              lang === 'fa' && /[A-Za-z]/.test(seriesLabel) ? 'ltr' : undefined;
            const featureTags = (product.extras ?? []).slice(0, 3).filter(Boolean);
            const overlayFeatures =
              featureTags.length > 0
                ? featureTags
                : [product.panel, product.refreshRate, product.os].filter(Boolean).slice(0, 3);
            return (
              <Link
                key={product.id}
                href={`/${locale}/washing-machine/${product.id.toLowerCase()}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-(--border-color) bg-(--surface-color) shadow-(--panel-shadow) transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_color-mix(in_srgb,var(--overlay-color) 55%,transparent)] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--brand-color)"
              >
                <div className="relative w-full overflow-hidden">
                  <div className="relative aspect-4/3 w-full bg-(--surface-color)">
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
                          {detailsLabel}
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
                    <span dir={seriesLabelDir}>{seriesLabel}</span>
                  </p>
                  <h3 className="text-lg font-bold text-(--default-black-font) sm:text-xl">
                    {copy.name}
                  </h3>
                  <p className="text-sm text-(--text-muted-color)">{copy.tagline}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
