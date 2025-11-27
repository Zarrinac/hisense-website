import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image, { type StaticImageData } from 'next/image';
import { TV_PRODUCTS } from '@/content/tvProducts';
import Banner from '@/public/products/tvs/100-U7K-Files/100U7K-Hero.png';
import FeatureCardImage from '@/components/tv/FeatureCardImage';
import ContentSections, { type ContentSectionData } from '@/components/tv/ContentSections';

type PageParams = {
  locale?: string;
  productId?: string;
};

type PageProps = {
  params: PageParams | Promise<PageParams>;
};

type Banner = {
  id: string;
  desktop: StaticImageData;
  mobile?: StaticImageData;
  alt: string;
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

const BANNERS: Banner[] = [{ id: 'banner', desktop: Banner, alt: 'Hisense 100U7K LED hero' }];

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
      images: [{ url: (product.posterImage ?? product.image).src }],
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

  const copy = product.copy[lang];
  const featureIntroTitle = copy.featureIntroTitle;
  const featureIntroText = copy.featureIntroText;
  const masterMomentTitle = copy.masterMomentTitle;
  const contentSections: ContentSectionData[] =
    product.contentSections
      ?.map((section) => {
        const title = copy[section.titleKey];
        const text = copy[section.textKey];
        if (!title || !text) return null;
        return { image: section.image, title, text };
      })
      .filter((section): section is ContentSectionData => Boolean(section)) ?? [];

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

  const featureCards = product.featureCards ?? [];
  const gallery = product.gallery ?? [];

  const compactFeatureTitles = new Set(['Dolby Vision-Atoms', 'Filmmaker', 'IMAX']);

  return (
    <div className="space-y-16 pb-16 lg:space-y-20 lg:pb-24" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      {/* Banner */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-10 max-w-480">
        <div key={BANNERS[0].id} className="relative min-w-0 flex-[0_0_100%]">
          <div className="relative aspect-9/16 w-full md:aspect-video lg:aspect-21/9">
            <Image
              src={BANNERS[0].desktop}
              alt={BANNERS[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              priority
              loading="eager"
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {featureIntroTitle && featureIntroText && (
        <div className="mx-auto w-full max-w-360">
          <div className="rounded-xl border border-(--border-color) bg-(--surface-color) px-6 py-8 text-center ">
            <p
              className="text-2xl font-black md:text-4xl bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--brand-gradient)' }}
            >
              {featureIntroTitle}
            </p>
            <p className="mt-4 text-xs leading-10 text-(--text-muted-color) md:text-base 4xl:text-xl">
              {featureIntroText}
            </p>
          </div>
        </div>
      )}
      <div className="mx-auto w-full max-w-360">
        <div className="relative overflow-hidden bg-black shadow-2xl ring-1 ring-(--border-color)">
          <div className="relative aspect-video w-full">
            {product.heroVideo ? (
              <video
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={(product.posterImage ?? product.image).src}
              >
                <source src={product.heroVideo} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={product.image}
                alt={copy.name}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
          </div>
        </div>
      </div>

      {masterMomentTitle && (
        <div className="mx-auto w-full max-w-360">
          <div className="rounded-xl border border-(--border-color) bg-(--surface-color) px-6 py-8 text-center ">
            <p
              className="text-2xl font-black md:text-4xl bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--brand-gradient)' }}
            >
              {masterMomentTitle}
            </p>
          </div>
        </div>
      )}

      {featureCards.length > 0 && (
        <div className="mx-auto w-full max-w-360">
          <div className="mx-auto w-full grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {featureCards.map((block) => (
              <div
                key={block.title}
                className="flex flex-col gap-2 items-center justify-between rounded-xl border border-(--border-color) bg-(--surface-color) shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="rounded-2xl bg-(--surface-color-2) flex items-center justify-center">
                  {(() => {
                    const isCompact = compactFeatureTitles.has(block.title);
                    const imageClasses = `${isCompact ? 'h-12 mt-4' : 'h-14 mt-2'} w-auto object-contain`;

                    return (
                      <FeatureCardImage
                        title={block.title}
                        image={block.image}
                        imageBlack={block.imageBlack}
                        className={imageClasses}
                      />
                    );
                  })()}
                </div>
                <h4 className="text-xs md:text-sm text-center mb-2 md:mb-2">{block.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {contentSections.length > 0 && (
        <ContentSections sections={contentSections} isRTL={lang === 'fa'} />
      )}

      <div className="mx-auto flex w-full max-w-480 flex-col gap-10 px-4 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 rounded-3xl border border-(--border-color) bg-(--surface-color) p-6 shadow-sm">
            <h2 className="text-xl font-semibold sm:text-2xl">{copy.tagline}</h2>
            <p className="text-sm text-(--text-muted-color)">{copy.description}</p>
            <ul className="grid gap-2 text-sm text-(--default-black-font) sm:grid-cols-2">
              {copy.highlights.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 rounded-xl bg-(--surface-color-2) px-3 py-2 transition duration-300 hover:-translate-y-1 hover:shadow-md"
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

        {product.beforeAfter && (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl border border-(--border-color) bg-(--surface-color) shadow-sm">
              <Image
                src={product.beforeAfter.before}
                alt={lang === 'fa' ? 'قبل' : 'Before'}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-3xl border border-(--border-color) bg-(--surface-color) shadow-sm">
              <Image
                src={product.beforeAfter.after}
                alt={lang === 'fa' ? 'بعد' : 'After'}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        {gallery.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((item, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-(--border-color) bg-(--surface-color) shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <Image
                  src={item}
                  alt={`${copy.name} gallery ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
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
