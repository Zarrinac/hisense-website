import { type StaticImageData } from 'next/image';
import tv100Q7Hero from '@/public/products/tvs/100Q7/hero.png';
import tv100U7KHero from '@/public/products/tvs/100U7K/hero.png';

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
  copy: Record<'en' | 'fa', TvProductCopy>;
};

export const TV_PRODUCTS: TvProduct[] = [
  {
    id: '100Q7N',
    sku: '100Q7N',
    size: '100\"',
    series: 'Q7N',
    panel: 'QLED & DLED',
    resolution: '4K (3840×2160)',
    refreshRate: '144Hz + HDR',
    os: 'VIDAA U7.6',
    sound: '2.1ch 2×15W + 20W built-in sub, Dolby surround',
    connectivity: ['WiFi', 'Bluetooth 5', 'HDMI ×4', 'USB 2.0 ×2', 'SPDIF', 'AV', 'Headphone'],
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
          '100-inch QLED 4K (3840×2160) with HDR and 178° viewing.',
          'VIDAA U7.6 smart platform with AI upscaling from HD to 4K.',
          'Hi-View Engine X + Dynamic X-Display for controlled brightness and contrast.',
          '144Hz Game Mode Pro with Quantum Dot Colour and low-latency response.',
          '2.1ch 2×15W + 20W subwoofer, Dolby surround, and CineStage X Surround.',
          'WiFi, Bluetooth 5, HDMI ×4, USB 2.0 ×2, SPDIF, AV, and headphone out.',
        ],
      },
      fa: {
        name: 'تلویزیون 100Q7N هایسنس',
        tagline: 'نمایشگر ۱۰۰ اینچی QLED با نرخ ۱۴۴ هرتز و ارتقاء هوشمند 4K.',
        description:
          'تلویزیون پرچمدار ۱۰۰ اینچی با رنگ‌های Quantum Dot، زاویه دید گسترده و سیستم عامل VIDAA U7.6؛ مناسب سالن‌های سینمای خانگی و گیمینگ.',
        highlights: [
          'نمایشگر QLED 4K (۳۸۴۰×۲۱۶۰) با HDR و زاویه دید ۱۷۸ درجه.',
          'سیستم هوشمند VIDAA U7.6 با ارتقاء تصویر HD به 4K توسط هوش مصنوعی.',
          'پردازشگر Hi-View Engine X و Dynamic X-Display برای روشنایی و کنتراست دقیق.',
          'حالت Game Mode Pro با نرخ ۱۴۴ هرتز و رنگ‌های Quantum Dot برای تاخیر کم.',
          'صدای ۲.۱ کانال (۲×۱۵ وات + ساب ۲۰ وات)، دالبی و CineStage X Surround.',
          'اتصال WiFi، بلوتوث ۵، چهار HDMI، دو USB 2.0، SPDIF، AV و خروجی هدفون.',
        ],
      },
    },
  },
  {
    id: '100U7K',
    sku: '100U7K',
    size: '100\"',
    series: 'U7K',
    panel: 'Mini-LED X',
    resolution: '4K (3840×2160)',
    refreshRate: '144Hz + HDR',
    os: 'VIDAA U7',
    sound: '5.1ch 2×15W + 20W + 2×5W built-in sub, Dolby surround',
    connectivity: ['WiFi', 'Bluetooth 5', 'HDMI ×4', 'USB 2.0 ×2', 'SPDIF', 'AV'],
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
    image: tv100U7KHero,
    copy: {
      en: {
        name: 'Hisense 100U7K Mini-LED 4K TV',
        tagline: '100-inch Mini-LED X with 144Hz, wide colour, and cinematic 5.1-channel audio.',
        description:
          'Mini-LED X backlight with Quantum Dot colour, 144Hz motion, and 6.5ms response time—paired with VIDAA U7 smart OS and immersive 5.1-channel sound.',
        highlights: [
          '100-inch Mini-LED X 4K (3840×2160) with HDR and 178° viewing.',
          '144Hz refresh with 6.5ms response for smooth sports and gaming.',
          'Hi-View Engine X, Dynamic X-Display, and Quantum Dot Colour accuracy.',
          '5.1ch audio: 2×15W + 20W + 2×5W with built-in sub and Dolby surround.',
          'Time Shift, DVB-T/T2 tuner, and TV recording support.',
          'WiFi, Bluetooth 5, HDMI ×4, USB 2.0 ×2, SPDIF, and AV connectivity.',
        ],
      },
      fa: {
        name: 'تلویزیون 100U7K هایسنس (Mini-LED)',
        tagline: 'نمایشگر ۱۰۰ اینچی Mini-LED X با نرخ ۱۴۴ هرتز و صدای سینمایی ۵.۱ کاناله.',
        description:
          'پس‌زمینه Mini-LED X با رنگ‌های Quantum Dot، حرکت ۱۴۴ هرتز و پاسخ ۶.۵ میلی‌ثانیه؛ همراه با سیستم هوشمند VIDAA U7 و صدای فراگیر ۵.۱ کانال.',
        highlights: [
          'نمایشگر ۱۰۰ اینچی Mini-LED X با وضوح 4K (۳۸۴۰×۲۱۶۰) و HDR.',
          'نرخ ۱۴۴ هرتز و پاسخ ۶.۵ میلی‌ثانیه برای ورزش و گیمینگ روان.',
          'پردازشگر Hi-View Engine X، نمایشگر Dynamic X و رنگ‌های Quantum Dot.',
          'صدای ۵.۱ کانال (۲×۱۵ وات + ۲۰ وات + ۲×۵ وات) با ساب داخلی و دالبی.',
          'Time Shift، تیونر DVB-T/T2 و امکان ضبط برنامه‌های تلویزیونی.',
          'اتصال WiFi، بلوتوث ۵، چهار HDMI، دو USB 2.0، SPDIF و AV.',
        ],
      },
    },
  },
];
