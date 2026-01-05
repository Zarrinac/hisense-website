import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
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
import { WM_PRODUCTS } from '@/content/WmProducts';
import { routing } from '@/i18n/routing';

// Builds the washing machine detail page from bundled content.

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

type CopyBlocksInput = (typeof WM_PRODUCTS)[number]['copy']['en']['blocks'];

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

const buildBanners = (product: (typeof WM_PRODUCTS)[number], copyName: string): TvBanner[] =>
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

const buildDefaultSectionGroups = (product: (typeof WM_PRODUCTS)[number]): TvSectionGroup[] => {
  const defaults: TvSectionGroup[] = [];

  if (product.contentSections) {
    defaults.push({
      kind: 'content',
      sections: product.contentSections.map((section) => ({
        ...section,
        copyKey: section.copyKey,
      })),
    });
  }
  if (product.stackedSections) {
    defaults.push({
      kind: 'stacked',
      sections: product.stackedSections.map((section) => ({
        ...section,
        copyKey: section.copyKey,
      })),
    });
  }
  if (product.bottomStackedSections) {
    defaults.push({
      kind: 'stacked',
      textFirst: true,
      sections: product.bottomStackedSections.map((section) => ({
        ...section,
        copyKey: section.copyKey,
      })),
    });
  }

  return defaults;
};

const buildSectionGroups = (
  product: (typeof WM_PRODUCTS)[number],
  blocks: Blocks,
): NormalizedSectionGroup[] => {
  const defaultSectionGroups = buildDefaultSectionGroups(product);
  const sectionGroupConfigs: TvSectionGroup[] = Array.isArray(product.sectionGroups)
    ? (product.sectionGroups ?? [])
        .filter(
          (group): group is NonNullable<(typeof WM_PRODUCTS)[number]['sectionGroups']>[number] =>
            Boolean(group) && Array.isArray(group.sections) && typeof group.kind === 'string',
        )
        .map((group) => ({
          ...group,
          sections: group.sections.map((section) => ({
            ...section,
            copyKey: section.copyKey,
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
  product: (typeof WM_PRODUCTS)[number],
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
  product: (typeof WM_PRODUCTS)[number],
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

const getAvailableSizes = (product: (typeof WM_PRODUCTS)[number]): string[] =>
  product.sizes?.length && product.sizes.length > 0
    ? product.sizes
    : product.size
      ? [product.size]
      : [];

const getSeriesDisplay = (product: (typeof WM_PRODUCTS)[number]) =>
  product.seriesLabel ?? [product.series, product.panel].filter(Boolean).join(' ');

const formatSeriesDisplay = (value: string, lang: 'fa' | 'en') =>
  lang === 'fa' && /[A-Za-z]/.test(value) ? `\u200E${value}\u200E` : value;

const buildBreadcrumbItems = (
  locale: string,
  categoryLabel: string,
  productLabel: string,
  productId: string,
): BreadcrumbItem[] => [
  { label: 'Home', href: `/${locale}` },
  { label: categoryLabel, href: `/${locale}/washing-machine` },
  { label: productLabel, href: `/${locale}/washing-machine/${productId}` },
];

const findProduct = (productId: string) => {
  const normalized = productId.toLowerCase();
  return (
    WM_PRODUCTS.find(
      (product) =>
        product.id.toLowerCase() === normalized || product.sku.toLowerCase() === normalized,
    ) ?? null
  );
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const localeParam = resolved?.locale ?? 'en';
  const productId = resolved?.productId ?? '';
  if (!productId) return {};

  const product = findProduct(productId);
  if (!product) return {};

  const lang = resolveLocale(localeParam);
  const copy = product.copy[lang];
  const imageUrl =
    typeof product.posterImage === 'string'
      ? product.posterImage
      : (product.posterImage?.src ??
        (typeof product.image === 'string' ? product.image : product.image.src));
  const languageAlternates = routing.locales.reduce<Record<string, string>>((acc, lang) => {
    acc[lang] = `/${lang}/washing-machine/${productId}`;
    return acc;
  }, {});
  languageAlternates['x-default'] = `/${routing.defaultLocale}/washing-machine/${productId}`;

  return {
    title: copy.name,
    description: copy.tagline,
    keywords: [
      product.id,
      product.series,
      'Hisense',
      'Washing machine',
      'Washer dryer combo',
      'Laundry',
    ],
    openGraph: {
      title: copy.name,
      description: copy.tagline,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `/${localeParam}/washing-machine/${productId}`,
      type: 'website',
    },
    alternates: {
      canonical: `/${localeParam}/washing-machine/${productId}`,
      languages: languageAlternates,
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.name,
      description: copy.tagline,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function WashingMachineProductPage({ params }: PageProps) {
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

  const routeTranslations = await getTranslations('Routes.washingMachine');
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
  const compactFeatureTitles = new Set(['Quick Wash', 'Allergy Steam']);
  const availableSizes = getAvailableSizes(product);
  const seriesDisplay = formatSeriesDisplay(getSeriesDisplay(product), lang);
  const breadcrumbItems = buildBreadcrumbItems(
    locale,
    routeTranslations('title'),
    copy.name || product.id,
    productId,
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
        image={product.image}
        posterImage={product.posterImage ?? undefined}
        heroVideo={product.heroVideo ?? undefined}
        alt={copy.name}
      />

      {masterMomentTitle && (
        <div className="w-full mx-auto max-w-360">
          <div className="text-center">
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
