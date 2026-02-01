import { getLocale, getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { mediaUrl } from '@/lib/mediaUrl';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hisense-ir.com';

const bannerAsset = (path: string) => mediaUrl(`/products/Refrigerator/banner/${path}`);
const productAsset = (path: string) => mediaUrl(`/products/Refrigerator/${path}`);

const HERO_BANNERS = {
  desktop: bannerAsset('refrigerator-no-1.webp'),
  mobile: bannerAsset('refrigerator-no-1-mob.webp'),
};

type ProductTitle = Partial<Record<'en' | 'fa', string>>;

type RefrigeratorProduct = {
  id: string;
  label: string;
  image: string;
  title?: string | ProductTitle;
};

const REFRIGERATOR_PRODUCTS = [
  {
    id: 'sbs-650',
    label: 'SBS-650',
    image: productAsset('sbs-650/Sbs-650-card.png'),
    title: {
      fa: 'یخچال فریزر ساید بای ساید 650',
      en: 'Side-by-Side Refrigerator 650',
    },
  },
  { id: 'rft-560', label: 'RFT-560', image: productAsset('rft-560/new-image-66c2e70071a8e.png') },
  { id: 'rfc500', label: 'RFC500', image: productAsset('rfc-500/new-image-66c2e70071a8e.png') },
  { id: 'rfc300', label: 'RFC300', image: productAsset('rfc-300/bd_96_product_image_1_1.png') },
  { id: 'twin270-370', label: 'Twin 270-370', image: bannerAsset('refrigerator-no-2.webp') },
  { id: 'fc-310', label: 'FC-310', image: productAsset('fc-310/product_image_1.png') },
  { id: 'fc-210', label: 'FC-210', image: productAsset('fc-210/product_image_1.jpg') },
] satisfies readonly RefrigeratorProduct[];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const routeTranslations = await getTranslations('Routes.refrigerator');
  const ogImage = HERO_BANNERS.desktop;
  const ogImageUrl =
    typeof ogImage === 'string' && ogImage.length > 0
      ? ogImage.startsWith('http')
        ? ogImage
        : `${SITE_URL}${ogImage}`
      : undefined;

  return {
    title: routeTranslations('title'),
    description: routeTranslations('description'),
    openGraph: {
      title: routeTranslations('title'),
      description: routeTranslations('description'),
      url: `/${locale}/refrigerator`,
      type: 'website',
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: routeTranslations('title'),
      description: routeTranslations('description'),
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    alternates: {
      canonical: `/${locale}/refrigerator`,
    },
    metadataBase: new URL(SITE_URL),
  };
}

export default async function RefrigeratorPage() {
  const locale = await getLocale();
  const routeTranslations = await getTranslations('Routes.refrigerator');

  return (
    <div className="pb-16 space-y-12 lg:space-y-16 lg:pb-24">
      <div className="-mx-4 sm:-mx-6 lg:-mx-10 max-w-360 3xl:mx-auto">
        <div className="relative w-full overflow-hidden rounded-3xl shadow-(--panel-shadow)">
          <div className="relative w-full aspect-16/7">
            <Image
              src={HERO_BANNERS.desktop}
              alt={routeTranslations('title')}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="hidden object-cover md:block"
            />
            <Image
              src={HERO_BANNERS.mobile}
              alt={routeTranslations('title')}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover md:hidden"
            />
          </div>
        </div>
      </div>

      <div className="w-full px-4 mx-auto max-w-480 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {REFRIGERATOR_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/${locale}/refrigerator/${product.id}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-(--border-color) bg-(--surface-color) shadow-(--panel-shadow) transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_color-mix(in_srgb,var(--overlay-color) 55%,transparent)] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--brand-color)"
            >
              <div className="relative w-full overflow-hidden">
                <div className="relative aspect-4/3 w-full bg-(--surface-color)">
                  <Image
                    src={product.image}
                    alt={product.label}
                    fill
                    className="object-contain transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-2 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-(--text-subtle-color)">
                  {product.label}
                </p>
                <h3 className="text-lg font-bold text-(--default-black-font) sm:text-xl">
                  {typeof product.title === 'object'
                    ? (product.title?.[locale as keyof ProductTitle] ?? product.label)
                    : (product.title ?? product.label)}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
