import { type StaticImageData } from 'next/image';
import tv100Q7Hero from '@/public/products/tvs/100Q7/hero.png';
import u7kHero from '@/public/products/tvs/100-U7K-Files/hero.png';
import u7kVideoPoster from '@/public/products/tvs/100-U7K-Files/new-image-66ab023011a9a.jpg';
import u7kGallery1 from '@/public/products/tvs/100-U7K-Files/new-image-66ab023002196.jpg';
import u7kGallery2 from '@/public/products/tvs/100-U7K-Files/new-image-66ab0230051d6.jpg';
import u7kGallery3 from '@/public/products/tvs/100-U7K-Files/new-image-66ab023007bc9.jpg';
import u7kGallery4 from '@/public/products/tvs/100-U7K-Files/new-image-66ab02301fd16.jpg';
import u7kBefore1 from '@/public/products/tvs/100-U7K-Files/new-before_image-66ab0230189a8.jpg';
import u7kAfter1 from '@/public/products/tvs/100-U7K-Files/new-after_image-66ab023019ca2.jpg';
import u7kFeature1 from '@/public/products/tvs/100-U7K-Files/Feature_Mini-LED-X_b.png';
import u7kFeature2 from '@/public/products/tvs/100-U7K-Files/Feature_Quantum-Dot-Colour_m.png';
import u7kFeature3 from '@/public/products/tvs/100-U7K-Files/Feature_Hi-View-Engine-X_m.png';
import u7kFeature4 from '@/public/products/tvs/100-U7K-Files/Feature_Dynamic-X-Display_m.png';
import u7kFeature5 from '@/public/products/tvs/100-U7K-Files/Feature_144Hz_Game_Mode_PRO_m.png';
import u7kFeature6 from '@/public/products/tvs/100-U7K-Files/Feature_CineStage-X-Surround_m.png';
import u7kBadgeDolby from '@/public/products/tvs/100-U7K-Files/dolby vision-atoms.png';
import u7kBadgeHDR from '@/public/products/tvs/100-U7K-Files/HDR-logo.png';
import u7kBadgeIMAX from '@/public/products/tvs/100-U7K-Files/IMAX-logo.png';
import u7kBadgeHiView from '@/public/products/tvs/100-U7K-Files/Hi-view-green-logo.png';

export type TvProductCopy = {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
};

export type TvProduct = {
  id: string;
  sku: string;
  size: string;
  series: string;
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
  beforeAfter?: { before: StaticImageData; after: StaticImageData };
  featureCards?: { title: string; description: string; image: StaticImageData }[];
  badges?: StaticImageData[];
  copy: Record<'en' | 'fa', TvProductCopy>;
};

export const TV_PRODUCTS: TvProduct[] = [
  {
    id: '100Q7N',
    sku: '100Q7N',
    size: '100"',
    series: 'Q7N',
    panel: 'QLED & DLED',
    resolution: '4K (3840x2160)',
    refreshRate: '144Hz + HDR',
    os: 'VIDAA U7.6',
    sound: '2.1ch 2x15W + 20W built-in sub, Dolby surround',
    connectivity: ['WiFi', 'Bluetooth 5', 'HDMI x4', 'USB 2.0 x2', 'SPDIF', 'AV', 'Headphone'],
    tuner: 'DVB-T/T2, Time Shift',
    extras: [
      'AI Upscaler (HD → 4K)',
      'Hi-View Engine X',
      'Dynamic X-Display',
      '144Hz Game Mode Pro',
      'Quantum Dot Colour',
      'CineStage X Surround',
    ],
    image: tv100Q7Hero,
    copy: {
      en: {
        name: 'Hisense 100Q7N QLED 4K TV',
        tagline: '100-inch QLED with 144Hz motion and AI-powered 4K upscaling.',
        description:
          'A flagship 100-inch QLED display with Quantum Dot colour, wide viewing angles, and VIDAA U7.6 smart OS—built for cinematic rooms and gaming setups.',
        highlights: [
          '100-inch QLED 4K (3840x2160) with HDR and 178° viewing.',
          'VIDAA U7.6 smart platform with AI upscaling from HD to 4K.',
          'Hi-View Engine X + Dynamic X-Display for controlled brightness and contrast.',
          '144Hz Game Mode Pro with Quantum Dot Colour and low-latency response.',
          '2.1ch 2x15W + 20W subwoofer, Dolby surround, and CineStage X Surround.',
          'WiFi, Bluetooth 5, HDMI x4, USB 2.0 x2, SPDIF, AV, and headphone out.',
        ],
      },
      fa: {
        name: 'تلویزیون 100Q7N هایسنس',
        tagline: 'نمایشگر ۱۰۰ اینچی QLED با نرخ ۱۴۴ هرتز و ارتقاء هوشمند 4K.',
        description:
          'تلویزیون پرچمدار ۱۰۰ اینچی با رنگ‌های Quantum Dot، زاویه دید گسترده و سیستم عامل VIDAA U7.6؛ مناسب سالن‌های سینمای خانگی و گیمینگ.',
        highlights: [
          'نمایشگر QLED 4K (۳۸۴۰x۲۱۶۰) با HDR و زاویه دید ۱۷۸ درجه.',
          'سیستم هوشمند VIDAA U7.6 با ارتقاء تصویر HD به 4K توسط هوش مصنوعی.',
          'پردازشگر Hi-View Engine X و Dynamic X-Display برای روشنایی و کنتراست دقیق.',
          'حالت Game Mode Pro با نرخ ۱۴۴ هرتز و رنگ‌های Quantum Dot برای تاخیر کم.',
          'صدای ۲.۱ کانال (۲x۱۵ وات + ساب ۲۰ وات)، دالبی و CineStage X Surround.',
          'اتصال WiFi، بلوتوث ۵، چهار HDMI، دو USB 2.0، SPDIF، AV و خروجی هدفون.',
        ],
      },
    },
  },
  {
    id: '100U7K',
    sku: '100U7K',
    size: '100"',
    series: 'U7K',
    panel: 'Mini-LED X',
    resolution: '4K (3840x2160)',
    refreshRate: '144Hz + HDR',
    os: 'VIDAA U7',
    sound: '5.1ch 2x15W + 20W + 2x5W built-in sub, Dolby surround',
    connectivity: ['WiFi', 'Bluetooth 5', 'HDMI x4', 'USB 2.0 x2', 'SPDIF', 'AV'],
    tuner: 'DVB-T/T2, Time Shift, TV recording',
    extras: [
      'AI Upscaler (HD → 4K)',
      'Hi-View Engine X',
      'Dynamic X-Display',
      '144Hz Game Mode Pro',
      'Quantum Dot Colour',
      'CineStage X Surround',
      'Mini-LED X backlight',
      '6.5ms response time',
    ],
    image: u7kHero,
    heroVideo: 'https://hisenseme.com/storage/13212/new-video-66ab022f82acb.mp4',
    posterImage: u7kVideoPoster,
    gallery: [u7kGallery1, u7kGallery2, u7kGallery3, u7kGallery4],
    beforeAfter: { before: u7kBefore1, after: u7kAfter1 },
    featureCards: [
      {
        title: 'Mini-LED X',
        description:
          'Dense Mini-LED backlight with precise local dimming for deep blacks and bright highlights.',
        image: u7kFeature1,
      },
      {
        title: 'Quantum Dot Colour',
        description: 'Billion+ colour shades with high volume for vivid HDR scenes.',
        image: u7kFeature2,
      },
      {
        title: 'Hi-View Engine X',
        description: 'AI processing that refines contrast, detail, and motion frame by frame.',
        image: u7kFeature3,
      },
      {
        title: 'Dynamic X-Display',
        description: 'Optimized panel uniformity and anti-glare for wide seating and bright rooms.',
        image: u7kFeature4,
      },
      {
        title: '144Hz Game Mode Pro',
        description: 'High refresh rate with low latency for fast games and smooth sports.',
        image: u7kFeature5,
      },
      {
        title: 'CineStage X Surround',
        description: '5.1 channel sound layout with Dolby support and built-in subwoofer.',
        image: u7kFeature6,
      },
    ],
    badges: [u7kBadgeDolby, u7kBadgeHDR, u7kBadgeIMAX, u7kBadgeHiView],
    copy: {
      en: {
        name: 'Hisense 100U7K Mini-LED 4K TV',
        tagline: '100-inch Mini-LED X with 144Hz, wide colour, and cinematic 5.1-channel audio.',
        description:
          'Mini-LED X backlight with Quantum Dot colour, 144Hz motion, and 6.5ms response time—paired with VIDAA U7 smart OS and immersive 5.1-channel sound.',
        highlights: [
          '100-inch Mini-LED X 4K (3840x2160) with HDR and 178° viewing.',
          '144Hz refresh with 6.5ms response for smooth sports and gaming.',
          'Hi-View Engine X, Dynamic X-Display, and Quantum Dot Colour accuracy.',
          '5.1ch audio: 2x15W + 20W + 2x5W with built-in sub and Dolby surround.',
          'Time Shift, DVB-T/T2 tuner, and TV recording support.',
          'WiFi, Bluetooth 5, HDMI x4, USB 2.0 x2, SPDIF, and AV connectivity.',
        ],
      },
      fa: {
        name: 'تلویزیون 100U7K هایسنس (Mini-LED)',
        tagline: 'نمایشگر ۱۰۰ اینچی Mini-LED X با نرخ ۱۴۴ هرتز و صدای سینمایی ۵.۱ کاناله.',
        description:
          'پس‌زمینه Mini-LED X با رنگ‌های Quantum Dot، حرکت ۱۴۴ هرتز و پاسخ ۶.۵ میلی‌ثانیه؛ همراه با سیستم هوشمند VIDAA U7 و صدای فراگیر ۵.۱ کانال.',
        highlights: [
          'نمایشگر ۱۰۰ اینچی Mini-LED X با وضوح 4K (۳۸۴۰x۲۱۶۰) و HDR.',
          'نرخ ۱۴۴ هرتز و پاسخ ۶.۵ میلی‌ثانیه برای ورزش و گیمینگ روان.',
          'پردازشگر Hi-View Engine X، نمایشگر Dynamic X و رنگ‌های Quantum Dot.',
          'صدای ۵.۱ کانال (۲x۱۵ وات + ۲۰ وات + ۲x۵ وات) با ساب داخلی و دالبی.',
          'Time Shift، تیونر DVB-T/T2 و امکان ضبط برنامه‌های تلویزیونی.',
          'اتصال WiFi، بلوتوث ۵، چهار HDMI، دو USB 2.0، SPDIF و AV.',
        ],
      },
    },
  },
];
