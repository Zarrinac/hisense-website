import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image, { type StaticImageData } from 'next/image';
import { TV_PRODUCTS } from '@/content/tvProducts';
import FeatureCardImage from '@/components/tv/FeatureCardImage';
import ContentSections, { type ContentSectionData } from '@/components/tv/ContentSections';
import OverlayContentSections from '@/components/tv/OverlayContentSections';
import StackedContentSections from '@/components/tv/StackedContentSections';
import BeforeAfterSlider from '@/components/tv/BeforeAfterSlider';
import { type TvSectionConfig, type TvSectionGroup } from '@/types/tv';

type ComparisonSection = {
  title: string;
  text: string;
  before: StaticImageData;
  after: StaticImageData;
};

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
  const blocks = copy.blocks ?? {};
  const featureIntroTitle = blocks.featureIntro?.title;
  const featureIntroText = blocks.featureIntro?.text;
  const masterMomentTitle = blocks.masterMoment?.title;
  const banners =
    product.banners && product.banners.length > 0
      ? product.banners
      : [{ id: 'default-banner', desktop: product.image, alt: copy.name }];
  const resolveSections = (
    sections?: {
      image: StaticImageData;
      copyKey: keyof typeof copy.blocks;
    }[],
  ) =>
    sections
      ?.map((section) => {
        const block = blocks[section.copyKey];
        if (!block?.title || !block?.text) return null;
        return { image: section.image, title: block.title, text: block.text };
      })
      .filter((section): section is ContentSectionData => Boolean(section)) ?? [];

  const defaultSectionGroups: TvSectionGroup[] = [];
  if (product.contentSections) {
    defaultSectionGroups.push({ kind: 'content', sections: product.contentSections });
  }
  if (product.stackedSections) {
    defaultSectionGroups.push({ kind: 'stacked', sections: product.stackedSections });
  }
  if (product.bottomStackedSections) {
    defaultSectionGroups.push({
      kind: 'stacked',
      textFirst: true,
      sections: product.bottomStackedSections,
    });
  }

  const sectionGroupConfigs: TvSectionGroup[] = Array.isArray(product.sectionGroups)
    ? product.sectionGroups.filter(
        (group): group is TvSectionGroup =>
          Boolean(group) && Array.isArray(group.sections) && typeof group.kind === 'string',
      )
    : defaultSectionGroups;

  type NormalizedSectionGroup = {
    kind: TvSectionGroup['kind'];
    sections: ContentSectionData[];
    textFirst?: boolean;
  };

  const sectionGroups: NormalizedSectionGroup[] = sectionGroupConfigs.flatMap((group) => {
    const sectionsSource: TvSectionConfig[] = group?.sections ?? [];
    const sections = resolveSections(sectionsSource);
    if (sections.length === 0) return [];
    const normalized: NormalizedSectionGroup = {
      kind: group.kind,
      sections,
      ...(group.kind === 'stacked' ? { textFirst: Boolean(group.textFirst) } : {}),
    };
    return [normalized];
  });

  const experienceBlock = product.experienceSection
    ? blocks[product.experienceSection.copyKey]
    : undefined;
  const experienceSection: ContentSectionData | null =
    product.experienceSection && experienceBlock?.title && experienceBlock?.text
      ? {
          image: product.experienceSection.image,
          title: experienceBlock.title,
          text: experienceBlock.text,
        }
      : null;
  const comparisonLabels =
    lang === 'fa' ? { before: 'قبل', after: 'بعد' } : { before: 'Before', after: 'After' };
  const comparisonSections: ComparisonSection[] =
    product.comparisonSections
      ?.map((section) => {
        const block = blocks[section.copyKey];
        if (!block?.title || !block?.text) return null;
        return {
          title: block.title,
          text: block.text,
          before: section.before,
          after: section.after,
        };
      })
      .filter((section): section is ComparisonSection => Boolean(section)) ?? [];
  const resolveSpecs = (specs?: Record<'en' | 'fa', string[]>): string[] => {
    if (!specs) return [];
    if (lang === 'fa' && Array.isArray(specs.fa)) return specs.fa;
    if (Array.isArray(specs.en)) return specs.en;
    return [];
  };

  const specDetails: string[] = resolveSpecs(
    product.specs as Record<'en' | 'fa', string[]> | undefined,
  );

  const featureCards = product.featureCards ?? [];

  const compactFeatureTitles = new Set(['Dolby Vision-Atoms', 'Filmmaker', 'IMAX']);

  const availableSizes =
    product.sizes?.length && product.sizes.length > 0
      ? product.sizes
      : product.size
        ? [product.size]
        : [];
  const seriesDisplay =
    product.seriesLabel ?? [product.series, product.panel].filter(Boolean).join(' ');
  const breadcrumbItems = [
    { label: lang === 'fa' ? 'خانه' : 'Home', href: `/${locale}` },
    { label: lang === 'fa' ? 'تلویزیون' : 'TV', href: `/${locale}/tv-hisense` },
    { label: copy.name || product.id, href: `/${locale}/tv-hisense/${productId}` },
  ];

  return (
    <div className="pb-16 space-y-16 lg:space-y-20 lg:pb-24" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      {/* Banner */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-10 max-w-480">
        <div key={banners[0].id} className="relative min-w-0 flex-[0_0_100%]">
          <div className="relative w-full aspect-9/16 md:aspect-video lg:aspect-21/9">
            <Image
              src={banners[0].desktop}
              alt={banners[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              priority
              loading="eager"
              placeholder="blur"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-transparent" />
            <div
              className={`absolute inset-0 hidden sm:flex flex-col justify-between sm:pl-16 sm:pt-4 5xl:pt-28 5xl:pl-28 text-white ${
                lang === 'fa' ? 'items-end text-right' : 'items-start text-left'
              }`}
            >
              <nav
                aria-label={lang === 'fa' ? 'مسیر راهنما' : 'Breadcrumb'}
                className="text-[10px] sm:text-xs md:text-sm font-semibold"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
              >
                <ol className="flex flex-wrap items-center gap-2">
                  {breadcrumbItems.map((item, idx) => (
                    <li
                      key={item.href}
                      itemProp="itemListElement"
                      itemScope
                      itemType="https://schema.org/ListItem"
                      className="flex items-center gap-2"
                    >
                      <a
                        href={item.href}
                        itemProp="item"
                        className="hover:text-(--brand-color) transition-colors"
                      >
                        <span itemProp="name">{item.label}</span>
                      </a>
                      <meta itemProp="position" content={`${idx + 1}`} />
                      {idx < breadcrumbItems.length - 1 && (
                        <span aria-hidden className="opacity-70">
                          /
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="space-y-2 lg:space-y-3 max-w-4xl h-full flex flex-col justify-center 5xl:pl-36">
                <h1 className="text-2xl font-black leading-tight md:text-[32px] lg:text-[40px] 3xl:text-5xl 5xl:text-[58px] drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
                  {seriesDisplay || copy.name}
                </h1>
                {availableSizes.length > 0 && (
                  <div className="flex items-center gap-4">
                    <div className="inline-flex h-3 w-5 items-center justify-center rounded-full bg-(--brand-color) border border-(--brand-color)" />
                    <ul className="flex flex-wrap items-center gap-4 text-xs md:text-base 5xl:text-2xl font-semibold">
                      {availableSizes.map((size, idx) => (
                        <li key={`${size}-${idx}`} className="flex items-center gap-2">
                          <span>{size}</span>
                          {idx < availableSizes.length - 1 && (
                            <span aria-hidden className="opacity-70">
                              |
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`sm:hidden w-full mx-auto max-w-360 px-4 space-y-3 ${lang === 'fa' ? 'text-right' : 'text-left'}`}
      >
        <nav
          aria-label={lang === 'fa' ? 'مسیر راهنما' : 'Breadcrumb'}
          className="text-xs font-semibold text-(--text-muted-color)"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumbItems.map((item, idx) => (
              <li
                key={item.href}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="flex items-center gap-2"
              >
                <a
                  href={item.href}
                  itemProp="item"
                  className="hover:text-(--brand-color) transition-colors"
                >
                  <span itemProp="name">{item.label}</span>
                </a>
                <meta itemProp="position" content={`${idx + 1}`} />
                {idx < breadcrumbItems.length - 1 && (
                  <span aria-hidden className="text-(--border-color)">
                    /
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-(--default-black-font)">
            {seriesDisplay || copy.name}
          </h1>
          {availableSizes.length > 0 && (
            <ul className="flex flex-wrap items-center gap-3 text-xs sm:text-base text-(--text-muted-color)">
              {availableSizes.map((size, idx) => (
                <li key={`${size}-${idx}`} className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 items-center justify-center rounded-full border border-(--brand-color)" />
                  <span className="font-semibold text-(--default-black-font)">{size}</span>
                  {idx < availableSizes.length - 1 && (
                    <span aria-hidden className="text-(--border-color)">
                      |
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {featureIntroTitle && featureIntroText && (
        <div className="w-full mx-auto max-w-360">
          <div className="text-center ">
            <p
              className="text-2xl font-black text-transparent md:text-4xl bg-clip-text md:py-2"
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
      <div className="w-full mx-auto max-w-360">
        <div className="relative overflow-hidden bg-black shadow-2xl ring-1 ring-(--border-color)">
          <div className="relative w-full aspect-video">
            {product.heroVideo ? (
              <video
                className="object-cover w-full h-full"
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
        <div className="w-full mx-auto max-w-360">
          <div className="text-center ">
            <p
              className="text-2xl font-black text-transparent md:text-4xl bg-clip-text"
              style={{ backgroundImage: 'var(--brand-gradient)' }}
            >
              {masterMomentTitle}
            </p>
          </div>
        </div>
      )}

      {featureCards.length > 0 && (
        <div className="w-full mx-auto max-w-360">
          <div className="grid w-full grid-cols-2 gap-4 mx-auto sm:grid-cols-3 md:grid-cols-5">
            {featureCards.map((block) => (
              <div
                key={block.title}
                className="flex flex-col gap-2 items-center justify-between rounded-xl border border-(--border-color) bg-(--surface-color) shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-(--brand-color) [background:radial-gradient(circle_at_20%_20%,rgba(34,197,235,0.22),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.2),transparent_34%),linear-gradient(145deg,rgba(15,23,42,0.25),rgba(15,23,42,0.1)),var(--surface-color)] dark:[background:var(--surface-color)]"
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
                <h4 className="mb-2 text-xs text-center md:text-sm md:mb-2">{block.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {sectionGroups.map((group, idx) => {
        if (group.kind === 'content') {
          return (
            <ContentSections
              key={`content-${idx}`}
              sections={group.sections}
              isRTL={lang === 'fa'}
            />
          );
        }
        if (group.kind === 'overlay') {
          return (
            <OverlayContentSections
              key={`overlay-${idx}`}
              sections={group.sections}
              isRTL={lang === 'fa'}
            />
          );
        }
        return (
          <StackedContentSections
            key={`stacked-${idx}`}
            sections={group.sections}
            isRTL={lang === 'fa'}
            textFirst={group.textFirst}
          />
        );
      })}

      {comparisonSections.length > 0 && (
        <div className="w-full mx-auto space-y-12 max-w-360">
          {comparisonSections.map((section, idx) => (
            <div key={`${section.title}-${idx}`} className="grid items-center gap-8 lg:grid-cols-2">
              {(() => {
                const isSliderLeftBase = idx % 2 === 0;
                const isSliderLeft = lang === 'fa' ? !isSliderLeftBase : isSliderLeftBase;
                const sliderOrder = isSliderLeft ? 'lg:order-1' : 'lg:order-2';
                const textOrder = isSliderLeft ? 'lg:order-2' : 'lg:order-1';
                return (
                  <>
                    <div className={sliderOrder}>
                      <BeforeAfterSlider
                        before={section.before}
                        after={section.after}
                        beforeLabel={comparisonLabels.before}
                        afterLabel={comparisonLabels.after}
                        isRTL={lang === 'fa'}
                      />
                    </div>
                    <div className={`space-y-3 lg:space-y-4 ${textOrder}`}>
                      <h3 className="text-2xl font-bold md:text-3xl">{section.title}</h3>
                      <p className="text-sm leading-relaxed text-(--text-muted-color) md:text-base">
                        {section.text}
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          ))}
        </div>
      )}
      {experienceSection && (
        <ContentSections sections={[experienceSection]} isRTL={lang === 'fa'} />
      )}

      <div>
        <div className="space-y-4 rounded-3xl border border-(--border-color) bg-(--surface-color) p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-center sm:text-3xl">
            {lang === 'fa' ? 'مشخصات فنی' : 'Specifications'}
          </h2>
          <ul className="grid gap-3 text-sm text-(--default-black-font) sm:grid-cols-2 md:text-base">
            {specDetails.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 rounded-xl bg-(--surface-color-2) px-3 py-2"
              >
                <span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-(--brand-color)" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
