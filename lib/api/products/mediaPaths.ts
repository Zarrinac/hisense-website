import { useLocalContent } from '@/lib/contentSource';
import type { ApiBanner, ApiFeatureCard, ApiProduct, ApiSection } from './types';

// Normalize a media path to a public URL while preserving absolute paths.
export const toPublicMediaPath = (input?: string | null): string => {
  if (!input) return '';
  if (input.startsWith('http')) return input; // keep absolute URLs
  const path = input.startsWith('/') ? input : `/${input}`;

  if (useLocalContent) {
    return path.startsWith('/media/') ? path.replace(/^\/media/, '') : path;
  }

  if (path.startsWith('/media/')) return path;

  // DB convention
  if (path.startsWith('/products/')) return `/media${path}`;

  // other media dirs if any exist in DB
  if (path.startsWith('/banner/')) return `/media${path}`;
  if (path.startsWith('/images/')) return `/media${path}`;
  if (path.startsWith('/tv-banner/')) return `/media${path}`;

  return path;
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
