import type { ApiBanner, ApiFeatureCard, ApiProduct, ApiSection } from './types';

// Normalize a media path to a public URL while preserving absolute paths.
export const toPublicMediaPath = (p?: string | null): string => {
  if (!p) return '';
  if (p.startsWith('http')) return p; // keep absolute URLs
  if (p.startsWith('/media/')) return p;

  // DB convention
  if (p.startsWith('/products/')) return `/media${p}`;

  // other media dirs if any exist in DB
  if (p.startsWith('/banner/')) return `/media${p}`;
  if (p.startsWith('/images/')) return `/media${p}`;
  if (p.startsWith('/tv-banner/')) return `/media${p}`;

  return p.startsWith('/') ? p : `/${p}`;
};

type ProductWithMedia = Pick<
  ApiProduct,
  'imageUrl' | 'posterImageUrl' | 'banners' | 'featureCards' | 'sectionGroups' | 'gallery'
> &
  Record<string, unknown>;

export const mapProductMedia = <T extends ProductWithMedia | null | undefined>(prod: T): T => {
  if (!prod) return prod;

  const product: ProductWithMedia = prod;

  product.imageUrl = toPublicMediaPath(product.imageUrl);
  product.posterImageUrl = toPublicMediaPath(product.posterImageUrl);

  if (Array.isArray(product.banners)) {
    product.banners = product.banners.map(
      (banner) =>
        ({
          ...banner,
          desktop: toPublicMediaPath(banner.desktop),
          mobile: toPublicMediaPath(banner.mobile),
        }) satisfies ApiBanner,
    );
  }

  if (Array.isArray(product.featureCards)) {
    product.featureCards = product.featureCards.map(
      (card) =>
        ({
          ...card,
          image: toPublicMediaPath(card.image),
          imageBlack: toPublicMediaPath(card.imageBlack),
        }) satisfies ApiFeatureCard,
    );
  }

  if (Array.isArray(product.sectionGroups)) {
    product.sectionGroups = product.sectionGroups.map((group) => ({
      ...group,
      sections: Array.isArray(group.sections)
        ? group.sections.map(
            (section) =>
              ({
                ...section,
                image: toPublicMediaPath(section.image),
              }) satisfies ApiSection,
          )
        : group.sections,
    }));
  }

  if (Array.isArray(product.gallery)) {
    product.gallery = product.gallery.map((item) => toPublicMediaPath(item));
  }

  return prod;
};
