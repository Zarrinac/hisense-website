import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import type { ContentSectionData } from '@/components/tv/ContentSections';
import FeatureIntro from '@/components/tv/product-detail/FeatureIntro';
import SectionGroupsRenderer, {
  type NormalizedSectionGroup,
} from '@/components/tv/product-detail/SectionGroupsRenderer';
import SpecsSection from '@/components/tv/product-detail/SpecsSection';
import type { BreadcrumbItem } from '@/components/tv/product-detail/Breadcrumbs';
import type { CopyBlock, CopyBlockKey, TvSectionConfig, TvSectionGroup } from '@/types/tv';
import RefrigeratorHero from '@/components/refrigerator/RefrigeratorHero';
import { REF_PRODUCTS } from '@/content/RefProducts';
import { routing } from '@/i18n/routing';

// Builds the refrigerator detail page from bundled content.

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
  'premiumFlatDoor',
  'myFreshChoice',
  'tripleZone',
  'bigCapacity',
  'metalGlideDrawers',
  'metalCooling',
  'adjustableShelves',
  'waterDispenser',
  'inverterTechnology',
  'preciseTempControl',
  'metalRecessedHandle',
  'bigDoorBalcony',
  'biggerDrawers',
  'superCool',
  'doorAlarm',
  'iceWaterDispenser',
  'independentZones',
  'selfClosingSystem',
  'multiAirFlow',
  'digitalSensors',
];

const COPY_BLOCK_KEYS_SET = new Set(COPY_BLOCK_KEYS);

export const dynamic = 'force-dynamic';

const resolveLocale = (locale?: string): 'fa' | 'en' => (locale === 'fa' ? 'fa' : 'en');

type CopyBlocksInput = (typeof REF_PRODUCTS)[number]['copy']['en']['blocks'];

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

const buildDefaultSectionGroups = (product: (typeof REF_PRODUCTS)[number]): TvSectionGroup[] => {
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
  product: (typeof REF_PRODUCTS)[number],
  blocks: Blocks,
): NormalizedSectionGroup[] => {
  const defaultSectionGroups = buildDefaultSectionGroups(product);
  const sectionGroupConfigs: TvSectionGroup[] = Array.isArray(product.sectionGroups)
    ? (product.sectionGroups ?? [])
        .filter(
          (group): group is NonNullable<(typeof REF_PRODUCTS)[number]['sectionGroups']>[number] =>
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

const resolveSpecs = (
  specs: Record<'en' | 'fa', string[]> | undefined,
  lang: 'fa' | 'en',
): string[] => {
  if (!specs) return [];
  if (lang === 'fa' && Array.isArray(specs.fa)) return specs.fa;
  if (Array.isArray(specs.en)) return specs.en;
  return [];
};

const getSeriesDisplay = (product: (typeof REF_PRODUCTS)[number]) =>
  product.seriesLabel ?? product.series;

const buildBreadcrumbItems = (
  locale: string,
  categoryLabel: string,
  productLabel: string,
  productId: string,
): BreadcrumbItem[] => [
  { label: categoryLabel, href: `/${locale}/refrigerator` },
  { label: productLabel, href: `/${locale}/refrigerator/${productId}` },
];

const findProduct = (productId: string) => {
  const normalized = productId.toLowerCase();
  return (
    REF_PRODUCTS.find(
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
    acc[lang] = `/${lang}/refrigerator/${productId}`;
    return acc;
  }, {});
  languageAlternates['x-default'] = `/${routing.defaultLocale}/refrigerator/${productId}`;

  return {
    title: copy.name,
    description: copy.tagline,
    keywords: [product.id, product.series, 'Hisense', 'Refrigerator'],
    openGraph: {
      title: copy.name,
      description: copy.tagline,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      url: `/${localeParam}/refrigerator/${productId}`,
      type: 'website',
    },
    alternates: {
      canonical: `/${localeParam}/refrigerator/${productId}`,
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

export default async function RefrigeratorProductPage({ params }: PageProps) {
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

  const routeTranslations = await getTranslations('Routes.refrigerator');
  const copy = product.copy[lang];
  const blocks = filterBlocks(copy.blocks);
  const featureIntroTitle = blocks.featureIntro?.title;
  const featureIntroText = blocks.featureIntro?.text;
  const masterMomentTitle = blocks.masterMoment?.title;
  const sectionGroups = buildSectionGroups(product, blocks);
  const specDetails: string[] = resolveSpecs(product.specs, lang);
  const seriesDisplay = getSeriesDisplay(product);
  const breadcrumbItems = buildBreadcrumbItems(
    locale,
    routeTranslations('title'),
    copy.name || product.id,
    productId,
  );

  return (
    <div className="pb-16 space-y-16 lg:space-y-20 lg:pb-24" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <RefrigeratorHero
        locale={locale}
        lang={lang}
        breadcrumbItems={breadcrumbItems}
        productName={copy.name || product.id}
        seriesDisplay={seriesDisplay}
        tagline={copy.tagline}
        gallery={
          Array.isArray(product.gallery) && product.gallery.length > 0
            ? product.gallery
            : [product.image]
        }
      />

      <FeatureIntro title={featureIntroTitle} text={featureIntroText} />

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

      <SectionGroupsRenderer sectionGroups={sectionGroups} lang={lang} />

      <SpecsSection items={specDetails} lang={lang} />
    </div>
  );
}
