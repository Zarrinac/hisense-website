import type { Prisma, Product, ProductCopy } from '@prisma/client';
import { TV_PRODUCTS } from '@/content/tvProducts';
import type {
  TvBanner,
  TvComparisonConfig,
  TvProduct,
  TvSectionConfig,
  TvSectionGroup,
} from '@/types/tv';
import type {
  ApiBanner,
  ApiComparisonSection,
  ApiCopy,
  ApiCopyBlock,
  ApiExperienceSection,
  ApiFeatureCard,
  ApiLocale,
  ApiProduct,
  ApiSection,
  ApiSectionGroup,
} from './types';

// Normalizes Prisma records and static TV content into the API-facing product shape.

const toSrc = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'src' in (value as { src?: unknown })) {
    const src = (value as { src?: unknown }).src;
    if (typeof src === 'string') return src;
  }
  return '';
};

const normalizeBlocks = (blocks: unknown): Record<string, ApiCopyBlock> => {
  if (!blocks || typeof blocks !== 'object' || Array.isArray(blocks)) return {};
  return Object.entries(blocks as Record<string, unknown>).reduce<Record<string, ApiCopyBlock>>(
    (acc, [key, value]) => {
      if (!value || typeof value !== 'object') return acc;
      const title =
        typeof (value as { title?: unknown }).title === 'string'
          ? (value as { title?: string }).title
          : undefined;
      const text =
        typeof (value as { text?: unknown }).text === 'string'
          ? (value as { text?: string }).text
          : undefined;

      if (title || text) {
        acc[key] = { title, text };
      }
      return acc;
    },
    {},
  );
};

const normalizeCopy = (copy: ProductCopy): ApiCopy => ({
  locale: copy.locale === 'fa' ? 'fa' : 'en',
  name: copy.name,
  tagline: copy.tagline,
  description: copy.description ?? undefined,
  highlights: Array.isArray(copy.highlights)
    ? copy.highlights.filter((item): item is string => typeof item === 'string')
    : [],
  blocks: normalizeBlocks(copy.blocks ?? {}),
});

const toArray = <T>(
  value: Prisma.JsonValue | null | undefined,
  mapper: (item: unknown) => T | null,
): T[] => {
  if (!Array.isArray(value)) return [];
  return value.map(mapper).filter((item): item is T => Boolean(item));
};

const normalizeBanner = (banner: unknown): ApiBanner | null => {
  if (!banner || typeof banner !== 'object') return null;
  const id =
    typeof (banner as { id?: unknown }).id === 'string'
      ? (banner as { id: string }).id
      : crypto.randomUUID();
  const desktop = toSrc((banner as { desktop?: unknown }).desktop);
  const mobile = toSrc((banner as { mobile?: unknown }).mobile);
  const alt =
    typeof (banner as { alt?: unknown }).alt === 'string' ? (banner as { alt: string }).alt : '';

  if (!desktop) return null;
  return {
    id,
    desktop,
    ...(mobile ? { mobile } : {}),
    alt,
  };
};

const normalizeFeatureCard = (card: unknown): ApiFeatureCard | null => {
  if (!card || typeof card !== 'object') return null;
  const title =
    typeof (card as { title?: unknown }).title === 'string'
      ? (card as { title: string }).title
      : '';
  const description =
    typeof (card as { description?: unknown }).description === 'string'
      ? (card as { description: string }).description
      : '';
  const image = toSrc((card as { image?: unknown }).image);
  const imageBlack = toSrc((card as { imageBlack?: unknown }).imageBlack);

  if (!title || !description || !image) return null;

  return {
    title,
    description,
    image,
    ...(imageBlack ? { imageBlack } : {}),
  };
};

const normalizeSection = (section: unknown): ApiSection | null => {
  if (!section || typeof section !== 'object') return null;
  const copyKey =
    typeof (section as { copyKey?: unknown }).copyKey === 'string'
      ? (section as { copyKey: string }).copyKey
      : '';
  const image = toSrc((section as { image?: unknown }).image);
  const textPositionRaw = (section as { textPosition?: unknown }).textPosition;
  const textPosition =
    textPositionRaw === 'left' || textPositionRaw === 'right' ? textPositionRaw : undefined;

  if (!copyKey || !image) return null;

  return {
    copyKey,
    image,
    ...(textPosition ? { textPosition } : {}),
  };
};

const normalizeSectionGroup = (group: unknown): ApiSectionGroup | null => {
  if (!group || typeof group !== 'object') return null;
  const kind = (group as { kind?: unknown }).kind;
  if (kind !== 'content' && kind !== 'stacked' && kind !== 'overlay') return null;

  const sections = Array.isArray((group as { sections?: unknown }).sections)
    ? ((group as { sections?: unknown }).sections as unknown[])
        .map(normalizeSection)
        .filter((section): section is ApiSection => Boolean(section))
    : [];

  if (sections.length === 0) return null;

  const textFirst =
    typeof (group as { textFirst?: unknown }).textFirst === 'boolean'
      ? (group as { textFirst: boolean }).textFirst
      : undefined;

  return {
    kind,
    sections,
    ...(kind === 'stacked' && textFirst ? { textFirst } : {}),
  };
};

const normalizeComparisonSection = (section: unknown): ApiComparisonSection | null => {
  if (!section || typeof section !== 'object') return null;
  const copyKey =
    typeof (section as { copyKey?: unknown }).copyKey === 'string'
      ? (section as { copyKey: string }).copyKey
      : '';
  const before = toSrc((section as { before?: unknown }).before);
  const after = toSrc((section as { after?: unknown }).after);

  if (!copyKey || !before || !after) return null;

  return { copyKey, before, after };
};

const normalizeExperienceSection = (value: unknown): ApiExperienceSection | null => {
  if (!value || typeof value !== 'object') return null;
  const copyKey =
    typeof (value as { copyKey?: unknown }).copyKey === 'string'
      ? (value as { copyKey: string }).copyKey
      : '';
  const image = toSrc((value as { image?: unknown }).image);

  if (!copyKey || !image) return null;
  return { copyKey, image };
};

const normalizeSpecs = (
  specs: Prisma.JsonValue | null | undefined,
): Record<ApiLocale, string[]> => {
  const result: Record<ApiLocale, string[]> = { en: [], fa: [] };
  if (!specs || typeof specs !== 'object' || Array.isArray(specs)) return result;

  const en = (specs as { en?: unknown }).en;
  const fa = (specs as { fa?: unknown }).fa;

  if (Array.isArray(en)) {
    result.en = en.filter((item): item is string => typeof item === 'string');
  }
  if (Array.isArray(fa)) {
    result.fa = fa.filter((item): item is string => typeof item === 'string');
  }

  return result;
};

const fallbackCopy = (locale: ApiLocale, name: string): ApiCopy => ({
  locale,
  name,
  tagline: '',
  highlights: [],
  blocks: {},
});

const pickLocaleCopy = (copies: ProductCopy[], locale: ApiLocale): ApiCopy => {
  const exact = copies.find((item) => item.locale === locale);
  if (exact) return normalizeCopy(exact);
  const english = copies.find((item) => item.locale === 'en');
  if (english) return normalizeCopy(english);
  const first = copies[0];
  if (first) return normalizeCopy(first);
  return fallbackCopy(locale, '');
};

export const normalizeDbProduct = (product: Product & { copies: ProductCopy[] }): ApiProduct => {
  const copyByLocale: Record<ApiLocale, ApiCopy> = {
    en: pickLocaleCopy(product.copies, 'en'),
    fa: pickLocaleCopy(product.copies, 'fa'),
  };

  const slug = product.slug || product.id.toLowerCase();

  return {
    id: product.id,
    slug,
    sku: product.sku,
    size: product.size,
    sizes: Array.isArray(product.sizes) ? product.sizes : [],
    series: product.series,
    seriesLabel: product.seriesLabel,
    panel: product.panel,
    resolution: product.resolution,
    refreshRate: product.refreshRate,
    os: product.os,
    sound: product.sound,
    connectivity: Array.isArray(product.connectivity) ? product.connectivity : [],
    tuner: product.tuner,
    extras: Array.isArray(product.extras) ? product.extras : [],
    imageUrl: product.imageUrl,
    posterImageUrl: product.posterImageUrl,
    heroVideoUrl: product.heroVideoUrl,
    gallery: toArray(product.gallery, toSrc),
    banners: toArray(product.banners, normalizeBanner),
    featureCards: toArray(product.featureCards, normalizeFeatureCard),
    sectionGroups: toArray(product.sectionGroups, normalizeSectionGroup),
    contentSections: toArray(product.contentSections, normalizeSection),
    stackedSections: toArray(product.stackedSections, normalizeSection),
    bottomStackedSections: toArray(product.bottomStackedSections, normalizeSection),
    comparisonSections: toArray(product.comparisonSections, normalizeComparisonSection),
    experienceSection: normalizeExperienceSection(product.experienceSection) ?? undefined,
    badges: toArray(product.badges, toSrc),
    specs: normalizeSpecs(product.specs),
    copy: copyByLocale,
  };
};

const normalizeContentCopy = (copy: TvProduct['copy'][ApiLocale], locale: ApiLocale): ApiCopy => ({
  locale,
  name: copy.name,
  tagline: copy.tagline,
  description: copy.description,
  highlights: Array.isArray(copy.highlights) ? copy.highlights : [],
  blocks: normalizeBlocks(copy.blocks ?? {}),
});

const normalizeSectionFromContent = (section: TvSectionConfig | undefined): ApiSection | null => {
  if (!section) return null;
  return normalizeSection({
    copyKey: section.copyKey,
    image: section.image,
    textPosition: section.textPosition,
  });
};

const normalizeSectionGroupFromContent = (group: TvSectionGroup): ApiSectionGroup | null =>
  normalizeSectionGroup({
    kind: group.kind,
    textFirst: group.textFirst,
    sections: group.sections,
  });

const normalizeComparisonFromContent = (
  comparison: TvComparisonConfig | undefined,
): ApiComparisonSection | null => {
  if (!comparison) return null;
  return normalizeComparisonSection({
    copyKey: comparison.copyKey,
    before: comparison.before,
    after: comparison.after,
  });
};

const normalizeExperienceFromContent = (
  experience: TvSectionConfig | undefined,
): ApiExperienceSection | null => {
  if (!experience) return null;
  return normalizeExperienceSection({
    copyKey: experience.copyKey,
    image: experience.image,
  });
};

const normalizeBannerFromContent = (
  banner: TvBanner | undefined,
  image: string,
): ApiBanner | null => {
  if (!banner) {
    return {
      id: 'default-banner',
      desktop: image,
      alt: '',
    };
  }
  return normalizeBanner({
    id: banner.id,
    desktop: banner.desktop,
    mobile: banner.mobile,
    alt: banner.alt,
  });
};

const buildDefaultSectionGroups = (product: TvProduct): TvSectionGroup[] => {
  const groups: TvSectionGroup[] = [];
  if (product.contentSections) {
    groups.push({ kind: 'content', sections: product.contentSections });
  }
  if (product.stackedSections) {
    groups.push({ kind: 'stacked', sections: product.stackedSections });
  }
  if (product.bottomStackedSections) {
    groups.push({ kind: 'stacked', textFirst: true, sections: product.bottomStackedSections });
  }
  return groups;
};

export const normalizeContentProduct = (product: TvProduct): ApiProduct => {
  const slug = product.id.toLowerCase();
  const bannerList =
    Array.isArray(product.banners) && product.banners.length > 0
      ? product.banners
      : [{ id: 'default-banner', desktop: product.image, alt: product.copy.en.name }];

  const sectionGroups =
    Array.isArray(product.sectionGroups) && product.sectionGroups.length > 0
      ? product.sectionGroups
      : buildDefaultSectionGroups(product);

  const copyByLocale: Record<ApiLocale, ApiCopy> = {
    en: normalizeContentCopy(product.copy.en, 'en'),
    fa: normalizeContentCopy(product.copy.fa ?? product.copy.en, 'fa'),
  };

  return {
    id: product.id,
    slug,
    sku: product.sku,
    size: product.size,
    sizes: Array.isArray(product.sizes) ? product.sizes : [],
    series: product.series,
    seriesLabel: product.seriesLabel,
    panel: product.panel,
    resolution: product.resolution,
    refreshRate: product.refreshRate,
    os: product.os,
    sound: product.sound,
    connectivity: product.connectivity,
    tuner: product.tuner,
    extras: product.extras,
    imageUrl: toSrc(product.image),
    posterImageUrl: product.posterImage ? toSrc(product.posterImage) : undefined,
    heroVideoUrl: product.heroVideo,
    gallery: Array.isArray(product.gallery) ? product.gallery.map(toSrc).filter(Boolean) : [],
    banners: bannerList
      .map((banner) => normalizeBannerFromContent(banner, toSrc(product.image)))
      .filter((banner): banner is ApiBanner => Boolean(banner)),
    featureCards: Array.isArray(product.featureCards)
      ? product.featureCards
          .map((card) => normalizeFeatureCard(card))
          .filter((card): card is ApiFeatureCard => Boolean(card))
      : [],
    sectionGroups: sectionGroups
      .map((group) => normalizeSectionGroupFromContent(group))
      .filter((group): group is ApiSectionGroup => Boolean(group)),
    contentSections: Array.isArray(product.contentSections)
      ? product.contentSections
          .map((section) => normalizeSectionFromContent(section))
          .filter((section): section is ApiSection => Boolean(section))
      : [],
    stackedSections: Array.isArray(product.stackedSections)
      ? product.stackedSections
          .map((section) => normalizeSectionFromContent(section))
          .filter((section): section is ApiSection => Boolean(section))
      : [],
    bottomStackedSections: Array.isArray(product.bottomStackedSections)
      ? product.bottomStackedSections
          .map((section) => normalizeSectionFromContent(section))
          .filter((section): section is ApiSection => Boolean(section))
      : [],
    comparisonSections: Array.isArray(product.comparisonSections)
      ? product.comparisonSections
          .map((section) => normalizeComparisonFromContent(section))
          .filter((section): section is ApiComparisonSection => Boolean(section))
      : [],
    experienceSection:
      normalizeExperienceFromContent(product.experienceSection ?? undefined) ?? undefined,
    badges: Array.isArray(product.badges) ? product.badges.map(toSrc).filter(Boolean) : [],
    specs: {
      en: Array.isArray(product.specs?.en) ? product.specs.en : [],
      fa: Array.isArray(product.specs?.fa) ? product.specs.fa : [],
    },
    copy: copyByLocale,
  };
};

export const FALLBACK_PRODUCTS: ApiProduct[] = TV_PRODUCTS.map(normalizeContentProduct);

export const findFallbackProduct = (idOrSlug: string): ApiProduct | null =>
  FALLBACK_PRODUCTS.find(
    (product) =>
      product.id.toLowerCase() === idOrSlug.toLowerCase() ||
      product.slug.toLowerCase() === idOrSlug.toLowerCase(),
  ) ?? null;

export const normalizeDbProducts = (
  products: (Product & { copies: ProductCopy[] })[],
): ApiProduct[] => products.map(normalizeDbProduct);
