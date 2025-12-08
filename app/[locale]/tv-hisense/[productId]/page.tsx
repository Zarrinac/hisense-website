import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { TV_PRODUCTS } from '@/content/tvProducts';
import ContentSections, { type ContentSectionData } from '@/components/tv/ContentSections';
import BannerSection from '@/components/tv/product-detail/BannerSection';
import MobileHeader from '@/components/tv/product-detail/MobileHeader';
import FeatureIntro from '@/components/tv/product-detail/FeatureIntro';
import HeroMedia from '@/components/tv/product-detail/HeroMedia';
import FeatureCardsGrid from '@/components/tv/product-detail/FeatureCardsGrid';
import SectionGroupsRenderer, {
  type NormalizedSectionGroup,
} from '@/components/tv/product-detail/SectionGroupsRenderer';
import ComparisonSections, {
  type ComparisonSection,
} from '@/components/tv/product-detail/ComparisonSections';
import SpecsSection from '@/components/tv/product-detail/SpecsSection';
import type { BreadcrumbItem } from '@/components/tv/product-detail/Breadcrumbs';
import type {
  CopyBlock,
  CopyBlockKey,
  TvBanner,
  TvSectionConfig,
  TvSectionGroup,
} from '@/types/tv';

// Builds the TV detail page from the bundled content, normalizing copy blocks per locale.

type PageParams = {
  locale?: string;
  productId?: string;
};

type PageProps = {
  params: PageParams | Promise<PageParams>;
};

const LOCALES = ['en', 'fa'] as const;

type Blocks = Partial<Record<CopyBlockKey, CopyBlock>>;
type NormalizedProduct = (typeof TV_PRODUCTS)[number];

const resolveLocale = (locale?: string): 'fa' | 'en' => (locale === 'fa' ? 'fa' : 'en');

const findProduct = (productId: string) =>
  TV_PRODUCTS.find((product) => product.id.toLowerCase() === productId.toLowerCase());

const buildBanners = (product: NormalizedProduct, copyName: string): TvBanner[] =>
  product.banners && product.banners.length > 0
    ? product.banners
    : [{ id: 'default-banner', desktop: product.image, alt: copyName }];

const resolveSections = (
  sections: TvSectionConfig[] | undefined,
  blocks: Blocks,
): ContentSectionData[] => {
  if (!sections) return [];

  return sections.reduce<ContentSectionData[]>((acc, section) => {
    const block = blocks[section.copyKey];
    if (!block?.title || !block?.text) return acc;

    const resolved: ContentSectionData = {
      image: section.image,
      title: block.title,
      text: block.text,
      ...(section.textPosition ? { textPosition: section.textPosition } : {}),
    };

    acc.push(resolved);
    return acc;
  }, []);
};

const buildDefaultSectionGroups = (product: NormalizedProduct): TvSectionGroup[] => {
  const defaults: TvSectionGroup[] = [];

  if (product.contentSections) {
    defaults.push({ kind: 'content', sections: product.contentSections });
  }
  if (product.stackedSections) {
    defaults.push({ kind: 'stacked', sections: product.stackedSections });
  }
  if (product.bottomStackedSections) {
    defaults.push({
      kind: 'stacked',
      textFirst: true,
      sections: product.bottomStackedSections,
    });
  }

  return defaults;
};

const buildSectionGroups = (
  product: NormalizedProduct,
  blocks: Blocks,
): NormalizedSectionGroup[] => {
  const defaultSectionGroups = buildDefaultSectionGroups(product);
  const sectionGroupConfigs: TvSectionGroup[] = Array.isArray(product.sectionGroups)
    ? product.sectionGroups.filter(
        (group): group is TvSectionGroup =>
          Boolean(group) && Array.isArray(group.sections) && typeof group.kind === 'string',
      )
    : defaultSectionGroups;

  return sectionGroupConfigs.flatMap((group) => {
    const sections = resolveSections(group?.sections ?? [], blocks);
    if (sections.length === 0) return [];

    const normalized: NormalizedSectionGroup = {
      kind: group.kind,
      sections,
      ...(group.kind === 'stacked' ? { textFirst: Boolean(group.textFirst) } : {}),
    };
    return [normalized];
  });
};

const buildExperienceSection = (
  product: NormalizedProduct,
  blocks: Blocks,
): ContentSectionData | null => {
  const experienceBlock = product.experienceSection
    ? blocks[product.experienceSection.copyKey]
    : undefined;

  if (!product.experienceSection || !experienceBlock?.title || !experienceBlock?.text) {
    return null;
  }

  return {
    image: product.experienceSection.image,
    title: experienceBlock.title,
    text: experienceBlock.text,
  };
};

const buildComparisonSections = (product: NormalizedProduct, blocks: Blocks): ComparisonSection[] =>
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

const resolveSpecs = (
  specs: Record<'en' | 'fa', string[]> | undefined,
  lang: 'fa' | 'en',
): string[] => {
  if (!specs) return [];
  if (lang === 'fa' && Array.isArray(specs.fa)) return specs.fa;
  if (Array.isArray(specs.en)) return specs.en;
  return [];
};

const getAvailableSizes = (product: NormalizedProduct): string[] =>
  product.sizes?.length && product.sizes.length > 0
    ? product.sizes
    : product.size
      ? [product.size]
      : [];

const getSeriesDisplay = (product: NormalizedProduct) =>
  product.seriesLabel ?? [product.series, product.panel].filter(Boolean).join(' ');

const buildBreadcrumbItems = (
  locale: string,
  productLabel: string,
  productId: string,
  lang: 'fa' | 'en',
): BreadcrumbItem[] => [
  { label: lang === 'fa' ? 'خانه' : 'Home', href: `/${locale}` },
  { label: lang === 'fa' ? 'تلویزیون' : 'TV', href: `/${locale}/tv-hisense` },
  { label: productLabel, href: `/${locale}/tv-hisense/${productId}` },
];

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
  const localeParam = resolved?.locale ?? 'en';
  const productId = resolved?.productId ?? '';
  if (!productId) return {};

  const product = findProduct(productId);
  if (!product) return {};

  const lang = resolveLocale(localeParam);
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
      url: `/${localeParam}/tv-hisense/${productId}`,
    },
    alternates: {
      canonical: `/${localeParam}/tv-hisense/${productId}`,
    },
  };
}

export default async function TvProductDetailPage({ params }: PageProps) {
  const resolved = await params;
  const locale = resolved?.locale ?? 'en';
  const productId = resolved?.productId ?? '';
  const lang = resolveLocale(locale);

  if (!productId) {
    notFound();
  }

  const product = findProduct(productId);

  if (!product) {
    notFound();
  }

  const copy = product.copy[lang];
  const blocks: Blocks = copy.blocks ?? {};
  const featureIntroTitle = blocks.featureIntro?.title;
  const featureIntroText = blocks.featureIntro?.text;
  const masterMomentTitle = blocks.masterMoment?.title;
  const banners = buildBanners(product, copy.name);
  const sectionGroups = buildSectionGroups(product, blocks);
  const experienceSection = buildExperienceSection(product, blocks);
  const comparisonSections = buildComparisonSections(product, blocks);
  const specDetails: string[] = resolveSpecs(
    product.specs as Record<'en' | 'fa', string[]> | undefined,
    lang,
  );
  const featureCards = product.featureCards ?? [];
  const compactFeatureTitles = new Set(['Dolby Vision-Atmos', 'Filmmaker', 'IMAX']);
  const availableSizes = getAvailableSizes(product);
  const seriesDisplay = getSeriesDisplay(product);
  const breadcrumbItems = buildBreadcrumbItems(locale, copy.name || product.id, productId, lang);
  const comparisonLabels =
    lang === 'fa' ? { before: 'قبل', after: 'بعد' } : { before: 'Before', after: 'After' };

  return (
    <div className="pb-16 space-y-16 lg:space-y-20 lg:pb-24" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <BannerSection
        banner={banners[0]}
        breadcrumbItems={breadcrumbItems}
        lang={lang}
        seriesDisplay={seriesDisplay}
        availableSizes={availableSizes}
        copyName={copy.name}
      />

      <MobileHeader
        breadcrumbItems={breadcrumbItems}
        lang={lang}
        seriesDisplay={seriesDisplay}
        copyName={copy.name}
        availableSizes={availableSizes}
      />

      <FeatureIntro title={featureIntroTitle} text={featureIntroText} />

      <HeroMedia
        image={product.image}
        posterImage={product.posterImage}
        heroVideo={product.heroVideo}
        alt={copy.name}
      />

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

      <FeatureCardsGrid featureCards={featureCards} compactFeatureTitles={compactFeatureTitles} />

      <SectionGroupsRenderer sectionGroups={sectionGroups} lang={lang} />

      <ComparisonSections
        sections={comparisonSections}
        comparisonLabels={comparisonLabels}
        lang={lang}
      />

      {experienceSection && (
        <ContentSections sections={[experienceSection]} isRTL={lang === 'fa'} isImageLeft={true} />
      )}

      <SpecsSection items={specDetails} lang={lang} />
    </div>
  );
}
