import { mediaUrl } from '@/lib/mediaUrl';
import { type WmProduct } from '@/types/wm';

// Bundled fallback washing machine catalog used when a database is not available.
const productAsset = (path: string) => mediaUrl(`/products/whashing-machine/${path}`);

const quickWashLogo = productAsset('logos/quick-wash.png');
const quickWashDryLogo = productAsset('logos/quick-wash-dry.png');
const allergySteamLogo = productAsset('logos/alregy-steam.png');
const selfDiagnosticLogo = productAsset('logos/selt-diagnostics.png');
const durableInverterLogo = productAsset('logos/durable-inverter.png');
const lintCleanLogo = productAsset('logos/lint-clean.png');

const wm8012HeroWhite = productAsset('8012/8012-image-1.png');
const wm8012HeroSilver = productAsset('8012/8012-image-2.png');
const wm8012GalleryThree = productAsset('8012/8012-image-3.png');
const wm8012GalleryFour = productAsset('8012/8012-image-4.png');
const wm8012QuickWash = productAsset('8012/8012-quick-wash.png');
const wm8012AllergySteam = productAsset('8012/8012-alergy-steam.png');
const wm8012Stains = productAsset('8012/8012-stains.png');
const wm8012SelfDiagnostic = productAsset('8012/8012-selt-diagnostic.png');
const wm8012DurableInverter = productAsset('8012/8012-durable-inverter.png');
const wm8012QuickWashDry = productAsset('8012/8012-quick-wash-dry.png');
const wm8012LintClean = productAsset('8012/8012-lint-clean.png');

const wm8012CopyEn = {
  name: 'Hisense 8012 Washer Dryer Combo',
  tagline: 'Quick Wash & Dry with Allergy Steam and a durable inverter motor.',
  description:
    'The 8012 series washer dryer combo blends fast cycles, steam hygiene, and an efficient BLDC inverter for quiet, confident laundry care.',
  highlights: [
    'Quick Wash options: 15, 30, and 49 minutes.',
    'Allergy Steam removes up to 99.9% of allergens and microbes.',
    'Auto program adjusts cycles for mixed loads and stains.',
    'Self Diagnostic error codes simplify troubleshooting.',
    'Durable BLDC inverter motor reduces noise and energy use.',
    'Quick Wash & Dry completes a full cycle in about 1 hour.',
    'Lint Clean rinse keeps clothes fresh after drying.',
  ],
  blocks: {
    featureIntro: {
      title: 'Smart Washing, Easy Living',
      text: '8012D - 8012DS',
    },
    masterMoment: {
      title: 'Master Every Load',
    },
    quickWash: {
      title: 'Quick Wash',
      text: "When the 49-minute Quick Wash isn't fast enough, use the Quicker function to reduce your wash time to just 30 minutes without compromising on quality. For even faster results, there is a 15-minute quick wash option.",
    },
    allergySteam: {
      title: 'Allergy Steam',
      text: 'At the start of the washing cycle, steam releases to eliminate 99.9% of allergens and microbes, keeping clothes clean and your skin protected.',
    },
    stains: {
      title: 'Never Worry About Stains',
      text: 'Use Auto to recognize your laundry and adjust washing cycles for a tailor-made wash. The Auto program is perfect for a smaller load of mixed fabrics and keeps washing as quick as possible.',
    },
    selfDiagnostic: {
      title: 'Self Diagnostic',
      text: 'If a malfunction happens, the self-diagnostic tools show an error code you can find in the user manual for quick troubleshooting and peace of mind.',
    },
    durableInverter: {
      title: 'Durable Inverter',
      text: 'BLDC inverter motors reduce washing noise and improve efficiency compared to traditional DC motors, giving you quieter washes and lower energy use.',
    },
    quickWashDry: {
      title: 'Quick Wash & Dry',
      text: 'Hisense 2-in-1 solution lets you wash and dry laundry in about 1 hour.',
    },
    lintClean: {
      title: 'Lint Clean',
      text: 'At the end of the rinse cycle, water washes away lint to keep it away from clean clothes and prepare them for drying.',
    },
  },
};

const wm8012CopyFa = {
  name: 'ماشین لباسشویی و خشک‌کن هایسنس 8012',
  tagline: 'شستشو و خشک‌کن سریع با بخار ضدحساسیت و موتور اینورتر بادوام.',
  description:
    'سری 8012 ترکیبی از چرخه‌های سریع، بهداشت بخار و اینورتر کم‌مصرف BLDC را برای شستشویی آرام و مطمئن ارائه می‌دهد.',
  highlights: [
    'گزینه‌های شستشوی سریع: ۱۵، ۳۰ و ۴۹ دقیقه.',
    'بخار ضدحساسیت تا ۹۹٫۹٪ از آلرژن‌ها و میکروب‌ها را از بین می‌برد.',
    'برنامه خودکار چرخه‌ها را برای بارهای ترکیبی و لکه‌ها تنظیم می‌کند.',
    'کدهای خطای عیب‌یابی خودکار، رفع مشکل را ساده می‌کنند.',
    'موتور اینورتر BLDC بادوام، صدا و مصرف انرژی را کاهش می‌دهد.',
    'شستشو و خشک‌کن سریع، یک چرخه کامل را حدود ۱ ساعت انجام می‌دهد.',
    'آبکشی پاک‌کننده پرز، لباس‌ها را پس از خشک‌کردن تازه نگه می‌دارد.',
  ],
  blocks: {
    featureIntro: {
      title: 'شستشوی هوشمند، زندگی آسان',
      text: '8012D - 8012DS',
    },
    masterMoment: {
      title: 'کنترل کامل هر بار شستشو',
    },
    quickWash: {
      title: 'شستشوی سریع',
      text: 'اگر شستشوی سریع ۴۹ دقیقه‌ای کافی نیست، با گزینه سریع‌تر زمان شستشو را بدون افت کیفیت به ۳۰ دقیقه برسانید. برای نتیجه سریع‌تر، گزینه شستشوی ۱۵ دقیقه‌ای هم در دسترس است.',
    },
    allergySteam: {
      title: 'بخار ضدحساسیت',
      text: 'در ابتدای چرخه شستشو، بخار آزاد می‌شود تا ۹۹٫۹٪ آلرژن‌ها و میکروب‌ها را از بین ببرد و لباس‌ها را تمیز و پوست را محافظت کند.',
    },
    stains: {
      title: 'نگران لکه‌ها نباشید',
      text: 'با برنامه خودکار، لباس‌ها شناسایی می‌شوند و چرخه شستشو متناسب با آن تنظیم می‌شود. برنامه Auto برای بارهای کم و پارچه‌های ترکیبی ایده‌آل است و شستشو را تا حد ممکن سریع نگه می‌دارد.',
    },
    selfDiagnostic: {
      title: 'عیب‌یابی خودکار',
      text: 'در صورت بروز مشکل، سیستم عیب‌یابی خودکار کد خطا را نمایش می‌دهد تا با مراجعه به دفترچه راهنما سریع‌تر عیب‌یابی کنید و با خیال راحت ادامه دهید.',
    },
    durableInverter: {
      title: 'اینورتر بادوام',
      text: 'موتور اینورتر BLDC نسبت به موتورهای DC معمولی، صدای کمتر و بازده بالاتری دارد و شستشوی آرام‌تر و مصرف انرژی کمتر را فراهم می‌کند.',
    },
    quickWashDry: {
      title: 'شستشو و خشک‌کن سریع',
      text: 'راهکار ۲ در ۱ هایسنس امکان شستشو و خشک‌کردن لباس‌ها را در حدود ۱ ساعت فراهم می‌کند.',
    },
    lintClean: {
      title: 'پاک‌سازی پرز',
      text: 'در پایان چرخه آبکشی، آب پرزها را می‌شوید تا از لباس‌های تمیز دور شوند و برای خشک‌کردن آماده شوند.',
    },
  },
};

export const WM_PRODUCTS: WmProduct[] = [
  {
    id: '8012',
    sku: '8012',
    sizes: ['White', 'Silver'],
    series: '8012',
    seriesLabel: '8012 Series Washer Dryer Combo',
    panel: 'Washer Dryer Combo',
    resolution: '',
    refreshRate: '',
    os: '',
    sound: '',
    connectivity: [],
    tuner: '',
    extras: [
      'Quick Wash 15/30/49 min',
      'Allergy Steam',
      'Auto Stain Care',
      'Self Diagnostic',
      'Durable Inverter',
      'Quick Wash & Dry',
    ],
    image: wm8012HeroWhite,
    gallery: [wm8012HeroWhite, wm8012HeroSilver, wm8012GalleryThree, wm8012GalleryFour],
    banners: [
      {
        id: '8012-banner',
        desktop: wm8012HeroWhite,
        alt: 'Hisense 8012 washer dryer combo',
      },
    ],
    featureCards: [
      {
        title: 'Quick Wash',
        description: '15, 30, or 49-minute cycles for busy days.',
        image: quickWashLogo,
      },
      {
        title: 'Allergy Steam',
        description: 'Steam penetrates fabric to remove 99.9% of allergens.',
        image: allergySteamLogo,
      },
      {
        title: 'Self Diagnostic',
        description: 'Error codes guide fast troubleshooting.',
        image: selfDiagnosticLogo,
      },
      {
        title: 'Durable Inverter',
        description: 'BLDC motor cuts noise and energy use.',
        image: durableInverterLogo,
      },
      {
        title: 'Quick Wash & Dry',
        description: 'Wash and dry a full load in about 1 hour.',
        image: quickWashDryLogo,
      },
      {
        title: 'Lint Clean',
        description: 'Rinse system keeps lint away from clean clothes.',
        image: lintCleanLogo,
      },
    ],
    contentSections: [
      {
        image: wm8012QuickWash,
        copyKey: 'quickWash',
      },
      {
        image: wm8012AllergySteam,
        copyKey: 'allergySteam',
      },
      {
        image: wm8012Stains,
        copyKey: 'stains',
      },
      {
        image: wm8012SelfDiagnostic,
        copyKey: 'selfDiagnostic',
      },
    ],
    stackedSections: [
      {
        image: wm8012DurableInverter,
        copyKey: 'durableInverter',
      },
      {
        image: wm8012QuickWashDry,
        copyKey: 'quickWashDry',
      },
    ],
    bottomStackedSections: [
      {
        image: wm8012LintClean,
        copyKey: 'lintClean',
      },
    ],
    specs: {
      en: [
        'Washer dryer combo for everyday laundry.',
        'Quick Wash options: 15, 30, and 49 minutes.',
        'Allergy Steam removes up to 99.9% of allergens and microbes.',
        'Auto program adjusts cycles for mixed loads.',
        'Self Diagnostic error codes for easy troubleshooting.',
        'BLDC inverter motor for quiet, efficient operation.',
        'Quick Wash & Dry completes a full cycle in about 1 hour.',
        'Lint Clean rinse keeps clothes fresh after drying.',
      ],
      fa: [
        'ماشین لباسشویی و خشک‌کن برای استفاده روزمره.',
        'گزینه‌های شستشوی سریع: ۱۵، ۳۰ و ۴۹ دقیقه.',
        'بخار ضدحساسیت تا ۹۹٫۹٪ از آلرژن‌ها و میکروب‌ها را از بین می‌برد.',
        'برنامه خودکار چرخه‌ها را برای بارهای ترکیبی تنظیم می‌کند.',
        'کدهای خطای عیب‌یابی خودکار برای رفع مشکل سریع.',
        'موتور اینورتر BLDC برای عملکرد کم‌صدا و بهینه.',
        'شستشو و خشک‌کن سریع یک چرخه کامل را حدود ۱ ساعت انجام می‌دهد.',
        'آبکشی پاک‌کننده پرز، لباس‌ها را پس از خشک‌کردن تازه نگه می‌دارد.',
      ],
    },
    copy: {
      en: wm8012CopyEn,
      fa: wm8012CopyFa,
    },
  },
];
