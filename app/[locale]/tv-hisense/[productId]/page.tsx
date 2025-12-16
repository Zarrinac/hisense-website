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

// Builds the TV detail page from the API (DB-first) with bundled content as fallback via the API layer.

// Builds the TV detail page from the bundled content, normalizing copy blocks per locale.

type PageParams = {
  locale?: string;
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
];

const COPY_BLOCK_KEYS_SET = new Set(COPY_BLOCK_KEYS);

export const dynamic = 'force-dynamic';

const resolveLocale = (locale?: string): 'fa' | 'en' => (locale === 'fa' ? 'fa' : 'en');

const toSrc = (image: string | { src: string }) => (typeof image === 'string' ? image : image.src);

type CopyBlocksInput = ApiProduct['copy']['en']['blocks'];

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

type Blocks = Partial<Record<CopyBlockKey, CopyBlock>>;
type NormalizedProduct = ApiProduct;

const getBlock = (blocks: Blocks, key: string): CopyBlock | undefined => {
  if (!COPY_BLOCK_KEYS_SET.has(key as CopyBlockKey)) return undefined;
  return blocks[key as CopyBlockKey];
};

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
  productLabel: string,
  productId: string,
  lang: 'fa' | 'en',
): BreadcrumbItem[] => [
  { label: lang === 'fa' ? 'خانه' : 'Home', href: `/${locale}` },
  { label: lang === 'fa' ? 'تلویزیون' : 'TV', href: `/${locale}/tv-hisense` },
  { label: productLabel, href: `/${locale}/tv-hisense/${productId}` },
];

const apiBaseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

const productApiUrl = (id: string) => new URL(`/api/products/${id}`, apiBaseUrl).toString();

const fetchProduct = async (productId: string): Promise<NormalizedProduct | null> => {
  try {
    const response = await fetch(productApiUrl(productId), { cache: 'no-store' });
    if (!response.ok) {
      return null;
    }
    const product = (await response.json()) as NormalizedProduct;
    return product;
  } catch {
    return null;
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const localeParam = resolved?.locale ?? 'en';
  const productId = resolved?.productId ?? '';
  if (!productId) return {};

  const product = await fetchProduct(productId);
  if (!product) return {};

  const lang = resolveLocale(localeParam);
  const copy = product.copy[lang];
  const imageUrl = toSrc(product.posterImageUrl ?? product.imageUrl);

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
      images: [{ url: imageUrl }],
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

  const product = await fetchProduct(productId);

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
  const compactFeatureTitles = new Set(['Dolby Vision-Atoms', 'Filmmaker', 'IMAX']);
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
