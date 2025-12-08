import { type StaticImageData } from 'next/image';

// Shape of the TV catalog content used by both pages and API fallbacks.
export type Locale = 'en' | 'fa';

export type CopyBlockKey =
  | 'featureIntro'
  | 'masterMoment'
  | 'intelligentProcessor'
  | 'detail'
  | 'details'
  | 'dolby'
  | 'imax'
  | 'filmMaker'
  | 'gamePlay'
  | 'autoLight'
  | 'sportsMode'
  | 'optimization'
  | 'stayConnected'
  | 'experience'
  | 'vrr'
  | 'screenTear'
  | 'vividColor'
  | 'gaming'
  | 'enhancement'
  | 'noBlur'
  | 'fuzzyImage'
  | 'brightness'
  | 'gameManagement'
  | 'movies'
  | 'biggerScreen'
  | 'sizes'
  | 'voiceCommand'
  | 'nature'
  | 'depth'
  | 'entertainment'
  | 'audio'
  | 'leaderboard'
  | 'easyFastSecure'
  | 'cast'
  | 'connect'
  | 'visual';

export type CopyBlock = {
  title?: string;
  text?: string;
};

export type TvProductCopy = {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  blocks: Partial<Record<CopyBlockKey, CopyBlock>>;
};

export type TvSectionConfig = {
  image: StaticImageData;
  copyKey: CopyBlockKey;
  textPosition?: 'left' | 'right';
};

export type TvComparisonConfig = {
  before: StaticImageData;
  after: StaticImageData;
  copyKey: CopyBlockKey;
};

export type TvSectionGroup = {
  kind: 'content' | 'stacked' | 'overlay';
  textFirst?: boolean;
  sections: TvSectionConfig[];
};

export type TvFeatureCard = {
  title: string;
  description: string;
  image: StaticImageData;
  imageBlack?: StaticImageData;
};

export type TvBanner = {
  id: string;
  desktop: StaticImageData;
  mobile?: StaticImageData;
  alt: string;
};

export type TvProduct = {
  id: string;
  sku: string;
  size?: string;
  sizes?: string[];
  series: string;
  seriesLabel?: string;
  panel: string;
  resolution: string;
  refreshRate: string;
  os: string;
  sound: string;
  connectivity: string[];
  tuner: string;
  extras: string[];
  image: StaticImageData;
  heroVideo?: string;
  posterImage?: StaticImageData;
  gallery?: StaticImageData[];
  contentSections?: TvSectionConfig[];
  stackedSections?: TvSectionConfig[];
  bottomStackedSections?: TvSectionConfig[];
  sectionGroups?: TvSectionGroup[];
  comparisonSections?: TvComparisonConfig[];
  experienceSection?: TvSectionConfig;
  featureCards?: TvFeatureCard[];
  badges?: StaticImageData[];
  banners?: TvBanner[];
  specs?: Record<Locale, string[]>;
  copy: Record<Locale, TvProductCopy>;
};
