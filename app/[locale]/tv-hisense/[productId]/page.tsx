import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TV_PRODUCTS } from '@/content/tvProducts';

type PageParams = {
  locale?: string;
  productId?: string;
};

type PageProps = {
  params: PageParams | Promise<PageParams>;
};

const LOCALES = ['en', 'fa'] as const;

export function generateStaticParams() {
  return TV_PRODUCTS.flatMap((product) =>
    LOCALES.map((locale) => ({
      locale,
      productId: product.id.toLowerCase(),
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const locale = resolved?.locale ?? 'en';
  const pid = resolved?.productId ?? '';
  if (!pid) return {};

  const product = TV_PRODUCTS.find((p) => p.id.toLowerCase() === pid.toLowerCase());
  if (!product) return {};

  const lang: 'fa' | 'en' = locale === 'fa' ? 'fa' : 'en';
  const copy = product.copy[lang];

  return {
    title: copy.name,
    description: copy.tagline,
    keywords: [
      product.id,
      product.series,
      product.panel,
      product.resolution,
      product.refreshRate,
      'Hisense',
      'Mini-LED',
      'ULED',
    ],
    openGraph: {
      title: copy.name,
      description: copy.tagline,
      images: [{ url: product.image.src }],
      url: `/${locale}/tv-hisense/${pid}`,
    },
    alternates: {
      canonical: `/${locale}/tv-hisense/${pid}`,
    },
  };
}

export default async function TvProductDetailPage({ params }: PageProps) {
  const resolved = await params;
  const locale = resolved?.locale ?? 'en';
  const productId = resolved?.productId ?? '';
  const lang: 'fa' | 'en' = locale === 'fa' ? 'fa' : 'en';

  if (!productId) {
    notFound();
  }

  const product = TV_PRODUCTS.find((p) => p.id.toLowerCase() === productId.toLowerCase());

  if (!product) {
    notFound();
  }

  const t = await getTranslations('TvHisensePage');
  const copy = product.copy[lang];
  const specLabels =
    lang === 'fa'
      ? {
          size: 'اندازه',
          panel: 'پنل',
          resolution: 'وضوح تصویر',
          refresh: 'نرخ نوسازی',
          os: 'سیستم عامل',
          sound: 'صدا',
          tuner: 'تیونر',
          connectivity: 'اتصالات',
          extras: 'ویژگی‌ها',
        }
      : {
          size: 'Size',
          panel: 'Panel',
          resolution: 'Resolution',
          refresh: 'Refresh rate',
          os: 'Platform',
          sound: 'Sound',
          tuner: 'Tuner',
          connectivity: 'Connectivity',
          extras: 'Features',
        };

  return (
    <div
      className="space-y-12 pb-16 pt-8 lg:space-y-16 lg:pb-24 lg:pt-12"
      dir={lang === 'fa' ? 'rtl' : 'ltr'}
    >
      <div className="mx-auto w-full max-w-480 px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-(--surface-color) shadow-lg ring-1 ring-(--border-color)">
          <div className="relative aspect-video w-full">
            <Image
              src={product.image}
              alt={copy.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/35 to-transparent" />
            <div className="absolute inset-0 flex items-end px-6 pb-10 pt-12 sm:px-10 lg:px-16 lg:pb-14 lg:pt-16">
              <div className="max-w-3xl space-y-3 text-white">
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                  <span>{product.series}</span>
                  <span>{product.panel}</span>
                  <span>{product.refreshRate}</span>
                </p>
                <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                  {copy.name}
                </h1>
                <p className="text-base text-white/80 sm:text-lg">{copy.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-480 flex-col gap-10 px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 rounded-3xl border border-(--border-color) bg-(--surface-color) p-6 shadow-sm">
            <h2 className="text-xl font-semibold sm:text-2xl">{copy.tagline}</h2>
            <p className="text-sm text-(--text-muted-color)">{copy.description}</p>
            <ul className="grid gap-2 text-sm text-(--default-black-font) sm:grid-cols-2">
              {copy.highlights.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 rounded-xl bg-(--surface-color-2) px-3 py-2"
                >
                  <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-(--brand-color)" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 rounded-3xl border border-(--border-color) bg-(--surface-color) p-6 shadow-sm">
            <h3 className="text-lg font-semibold sm:text-xl">
              {specLabels.size} & {specLabels.panel}
            </h3>
            <div className="grid gap-3 text-sm text-(--default-black-font)">
              <Spec label={specLabels.size} value={product.size} />
              <Spec label={specLabels.panel} value={product.panel} />
              <Spec label={specLabels.resolution} value={product.resolution} />
              <Spec label={specLabels.refresh} value={product.refreshRate} />
              <Spec label={specLabels.os} value={product.os} />
              <Spec label={specLabels.sound} value={product.sound} />
              <Spec label={specLabels.tuner} value={product.tuner} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-(--border-color) bg-(--surface-color) p-6 shadow-sm">
            <h4 className="mb-3 text-lg font-semibold">{specLabels.connectivity}</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {product.connectivity.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-(--border-color) px-3 py-1 text-(--default-black-font)"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-(--border-color) bg-(--surface-color) p-6 shadow-sm">
            <h4 className="mb-3 text-lg font-semibold">{specLabels.extras}</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {product.extras.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-(--brand-color)/10 px-3 py-1 text-(--brand-color-dark)"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-(--surface-color-2) px-3 py-2">
      <span className="text-(--default-black-font)">{label}</span>
      <span className="text-(--text-muted-color)">{value}</span>
    </div>
  );
}
