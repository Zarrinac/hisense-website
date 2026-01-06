import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
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
import type { ApiProduct } from '@/lib/api/products/types';
import { categoryFromSlug, type ProductCategorySlug } from '@/lib/api/products/categories';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

// Builds product detail pages from the API (DB-first) with bundled content as fallback via the API layer.

type PageParams = {
  locale?: string;
  category?: string;
  productId?: string;
};

type PageProps = {
  params: PageParams | Promise<PageParams>;
};

const COPY_BLOCK_KEYS: CopyBlockKey[] = [
  'featureIntro',
  'masterMoment',
  'intelligentProcessor',
  'detail',
  'details',
  'dolby',
  'imax',
  'filmMaker',
  'gamePlay',
  'autoLight',
  'sportsMode',
  'optimization',
  'stayConnected',
  'experience',
  'vrr',
  'screenTear',
  'vividColor',
  'gaming',
  'enhancement',
  'noBlur',
  'fuzzyImage',
  'brightness',
  'gameManagement',
  'movies',
  'biggerScreen',
  'sizes',
  'voiceCommand',
  'nature',
  'depth',
  'entertainment',
  'audio',
  'leaderboard',
  'easyFastSecure',
  'cast',
  'connect',
  'visual',
  'quickWash',
  'allergySteam',
  'stains',
  'selfDiagnostic',
  'durableInverter',
  'quickWashDry',
  'lintClean',
];

const COPY_BLOCK_KEYS_SET = new Set(COPY_BLOCK_KEYS);

export const dynamic = 'force-dynamic';

const resolveLocale = (locale?: string): 'fa' | 'en' => (locale === 'fa' ? 'fa' : 'en');

const toSrc = (image: string | { src: string }) => (typeof image === 'string' ? image : image.src);

type CopyBlocksInput = ApiProduct['copy']['en']['blocks'];

type Blocks = Partial<Record<CopyBlockKey, CopyBlock>>;

const filterBlocks = (copyBlocks: CopyBlocksInput): Blocks => {
  const filtered: Blocks = {};
  if (!copyBlocks) return filtered;
  Object.entries(copyBlocks).forEach(([key, value]) => {
    if (!COPY_BLOCK_KEYS_SET.has(key as CopyBlockKey)) return;
    if (!value || typeof value !== 'object') return;
    const title =
      typeof (value as { title?: unknown }).title === 'string'
        ? (value as { title: string }).title
        : undefined;
    const text =
      typeof (value as { text?: unknown }).text === 'string'
        ? (value as { text: string }).text
        : undefined;
    if (title || text) {
      filtered[key as CopyBlockKey] = { ...(title ? { title } : {}), ...(text ? { text } : {}) };
    }
  });
  return filtered;
};

const getBlock = (blocks: Blocks, key: string): CopyBlock | undefined => {
  if (!COPY_BLOCK_KEYS_SET.has(key as CopyBlockKey)) return undefined;
  return blocks[key as CopyBlockKey];
};

type NormalizedProduct = ApiProduct;

const buildBanners = (product: NormalizedProduct, copyName: string): TvBanner[] =>
  product.banners && product.banners.length > 0
    ? product.banners
    : [{ id: 'default-banner', desktop: product.imageUrl, alt: copyName }];

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
    defaults.push({
      kind: 'content',
      sections: product.contentSections.map((section) => ({
        ...section,
        copyKey: section.copyKey as CopyBlockKey,
      })),
    });
  }
  if (product.stackedSections) {
    defaults.push({
      kind: 'stacked',
      sections: product.stackedSections.map((section) => ({
        ...section,
        copyKey: section.copyKey as CopyBlockKey,
      })),
    });
  }
  if (product.bottomStackedSections) {
    defaults.push({
      kind: 'stacked',
      textFirst: true,
      sections: product.bottomStackedSections.map((section) => ({
        ...section,
        copyKey: section.copyKey as CopyBlockKey,
      })),
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
    ? (product.sectionGroups ?? [])
        .filter(
          (group): group is NonNullable<ApiProduct['sectionGroups']>[number] =>
            Boolean(group) && Array.isArray(group.sections) && typeof group.kind === 'string',
        )
        .map((group) => ({
          ...group,
          sections: group.sections.map((section) => ({
            ...section,
            copyKey: section.copyKey as CopyBlockKey,
          })),
        }))
        .map((group) => group as unknown as TvSectionGroup)
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
  const key = product.experienceSection?.copyKey;
  const experienceBlock = key ? getBlock(blocks, key) : undefined;

  if (!product.experienceSection || !experienceBlock?.title || !experienceBlock?.text) {
    return null;
  }

  return {
    image: product.experienceSection.image,
    title: experienceBlock.title,
    text: experienceBlock.text,
  };
};

const buildComparisonSections = (
  product: NormalizedProduct,
  blocks: Blocks,
): ComparisonSection[] => {
  if (!Array.isArray(product.comparisonSections)) {
    return [];
  }
  const items: ComparisonSection[] = [];
  product.comparisonSections.forEach((section) => {
    const block = getBlock(blocks, section.copyKey);
    if (!block?.title || !block?.text) return;
    items.push({
      title: block.title,
      text: block.text,
      before: section.before,
      after: section.after,
    });
  });
  return items;
};

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
  categoryLabel: string,
  productLabel: string,
  productId: string,
  categorySlug: ProductCategorySlug,
): BreadcrumbItem[] => [
  { label: 'Home', href: `/${locale}` },
  { label: categoryLabel, href: `/${locale}/products/${categorySlug}` },
  { label: productLabel, href: `/${locale}/products/${categorySlug}/${productId}` },
];

const apiBaseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

const productApiUrl = (categorySlug: ProductCategorySlug, id: string) =>
  new URL(`/api/products/${id}?category=${categorySlug}`, apiBaseUrl).toString();

const fetchProduct = async (
  categorySlug: ProductCategorySlug,
  productId: string,
): Promise<NormalizedProduct | null> => {
  try {
    const response = await fetch(productApiUrl(categorySlug, productId), { cache: 'no-store' });
    if (!response.ok) {
      return null;
    }
    const product = (await response.json()) as NormalizedProduct;
    return product;
  } catch {
    return null;
  }
};

const getCategoryCopy = async (categorySlug: ProductCategorySlug) => {
  if (categorySlug === 'tvs') {
    const routeTranslations = await getTranslations('Routes.tvHisense');
    return {
      label: routeTranslations('title'),
      keywords: (product: NormalizedProduct) => [
        product.id,
        product.series,
        product.panel,
        product.resolution,
        product.refreshRate,
        'Hisense',
        'Mini-LED',
        'ULED',
      ],
    };
  }
  if (categorySlug === 'wms') {
    const routeTranslations = await getTranslations('Routes.washingMachine');
    return {
      label: routeTranslations('title'),
      keywords: (product: NormalizedProduct) => [
        product.id,
        product.series,
        'Hisense',
        'Washing machine',
        'Laundry',
      ],
    };
  }
  return {
    label: '',
    keywords: () => [],
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const localeParam = resolved?.locale ?? 'en';
  const categorySlug = (resolved?.category ?? '').toLowerCase() as ProductCategorySlug;
  const productId = resolved?.productId ?? '';
  if (!productId) return {};
  if (!categoryFromSlug(categorySlug)) return {};

  const product = await fetchProduct(categorySlug, productId);
  if (!product) return {};

  const lang = resolveLocale(localeParam);
  const copy = product.copy[lang];
  const imageUrl = toSrc(product.posterImageUrl ?? product.imageUrl);
  const languageAlternates = routing.locales.reduce<Record<string, string>>((acc, locale) => {
    acc[locale] = `/${locale}/products/${categorySlug}/${productId}`;
    return acc;
  }, {});
  languageAlternates['x-default'] =
    `/${routing.defaultLocale}/products/${categorySlug}/${productId}`;
  const categoryCopy = await getCategoryCopy(categorySlug);

  return {
    title: copy.name,
    description: copy.tagline,
    keywords: categoryCopy.keywords(product).filter(Boolean),
    openGraph: {
      title: copy.name,
      description: copy.tagline,
      images: [{ url: imageUrl }],
      url: `/${localeParam}/products/${categorySlug}/${productId}`,
      type: 'website',
    },
    alternates: {
      canonical: `/${localeParam}/products/${categorySlug}/${productId}`,
      languages: languageAlternates,
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.name,
      description: copy.tagline,
      images: [imageUrl],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolved = await params;
  const locale = resolved?.locale ?? 'en';
  const categorySlug = (resolved?.category ?? '').toLowerCase() as ProductCategorySlug;
  const productId = resolved?.productId ?? '';
  const lang = resolveLocale(locale);

  if (!productId || !categoryFromSlug(categorySlug)) {
    notFound();
  }

  const product = await fetchProduct(categorySlug, productId);

  if (!product) {
    notFound();
  }

  const copy = product.copy[lang];
  const blocks = filterBlocks(copy.blocks);
  const featureIntroTitle = blocks.featureIntro?.title;
  const featureIntroText = blocks.featureIntro?.text;
  const masterMomentTitle = blocks.masterMoment?.title;
  const banners = buildBanners(product, copy.name);
  const sectionGroups = buildSectionGroups(product, blocks);
  const experienceSection = buildExperienceSection(product, blocks);
  const comparisonSections = buildComparisonSections(product, blocks);
  const specDetails: string[] = resolveSpecs(product.specs, lang);
  const featureCards = product.featureCards ?? [];
  const compactFeatureTitles =
    categorySlug === 'wms'
      ? new Set(['Quick Wash', 'Allergy Steam'])
      : new Set(['Dolby Vision-Atoms', 'Filmmaker', 'IMAX']);
  const availableSizes = getAvailableSizes(product);
  const seriesDisplay = getSeriesDisplay(product);
  const categoryCopy = await getCategoryCopy(categorySlug);
  const breadcrumbItems = buildBreadcrumbItems(
    locale,
    categoryCopy.label,
    copy.name || product.id,
    productId,
    categorySlug,
  );
  const comparisonLabels = { before: 'Before', after: 'After' };

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
        image={product.imageUrl}
        posterImage={product.posterImageUrl ?? undefined}
        heroVideo={product.heroVideoUrl ?? undefined}
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
