import { mediaUrl } from '@/lib/mediaUrl';
import { type TvProduct } from '@/types/tv';

// Bundled refrigerator catalog used when a database is not available.
const productAsset = (path: string) => mediaUrl(`/products/Refrigerator/${path}`);
const logoAsset = (path: string) => mediaUrl(`/products/Refrigerator/logos/${path}`);

const sbs650Hero = productAsset('sbs-650/Sbs-650-1.jpg');
const sbs650Poster = productAsset('sbs-650/Sbs-650-2.jpg');
const sbs650Gallery = [
  productAsset('sbs-650/Sbs-650-1.jpg'),
  productAsset('sbs-650/Sbs-650-2.jpg'),
  productAsset('sbs-650/Sbs-650-3.jpg'),
  productAsset('sbs-650/Sbs-650-4.jpg'),
];

const sbs650FeatureCards = [
  {
    title: 'ICE & WATER DISPENSER',
    description: 'Plenty of Ice and Water',
    image: logoAsset('sbs-650/1-ice-water-dispencer-icon-lg.png'),
  },
  {
    title: 'INDEPENDENT FRIDGE AND FREEZER ZONE',
    description: 'Staying fresh for longer',
    image: logoAsset('sbs-650/2-independent-zones-icon-lg.png'),
  },
  {
    title: 'SELF-CLOSING SYSTEM',
    description: 'Door close automatically',
    image: logoAsset('sbs-650/4-self-closing-icon-lg.png'),
  },
  {
    title: 'MULTI-AIR FLOW',
    description: 'Constant temp keeps things fresh',
    image: logoAsset('sbs-650/5-multi-air-flow-icon-lg.png'),
  },
  {
    title: 'DIGITAL SENSORS',
    description: 'Always right, always optimal',
    image: logoAsset('sbs-650/6-digital-sensors-icon-lg.png'),
  },
];

const sbs650CopyEn = {
  name: 'Hisense SBS-650 Side-by-Side Refrigerator',
  tagline: 'Ice & water dispenser, independent cooling, and multi-air flow freshness.',
  description:
    'SBS-650 pairs an ice and water dispenser with independent fridge/freezer cooling, multi-air flow circulation, self-closing doors, and digital sensors for consistently fresh storage.',
  highlights: [
    'Ice and water dispenser with multiple serving options.',
    'Independent fridge/freezer cooling for longer freshness.',
    'Self-closing doors up to 15° open angle.',
    'Multi-air flow keeps temperature consistent.',
    'Five digital sensors optimize cooling performance.',
  ],
  blocks: {
    featureIntro: {
      title: 'Premium Side-by-Side Experience',
      text: 'SBS-650',
    },
    masterMoment: {
      title: 'Designed for modern kitchens and real-life storage needs.',
    },
    iceWaterDispenser: {
      title: 'ICE & WATER DISPENSER',
      text: 'Plenty of Ice and Water. Equipped with an ice and water dispenser, which can produce ice and water per day. The ice is enough to satisfy the entire family. You can choose from ice cubes, crushed ice and cooled water all at the push of a button.',
    },
    independentZones: {
      title: 'INDEPENDENT FRIDGE AND FREEZER ZONE',
      text: 'Staying fresh for longer. The independent temp system control cools the fridge and freezer separately, so it maintains a high humidity level in the fridge and ingredients stay fresher for longer.',
    },
    selfClosingSystem: {
      title: 'SELF-CLOSING SYSTEM',
      text: 'Door close automatically. The door is supposed to close automatically even when the door opens up to 15°.',
    },
    multiAirFlow: {
      title: 'MULTI-AIR FLOW',
      text: 'Constant temp keeps things fresh. Thanks to the even distribution of cold air achieved by the Hisense Multi Air Flow System, an optimum temperature is consistently maintained throughout your fridge freezer – keeping food chilled to perfection no matter where it is placed.',
    },
    digitalSensors: {
      title: 'DIGITAL SENSORS',
      text: 'Always right, always optimal. Five high-effective Digital Temp Sensors are built in the refrigerator, as shown in the picture, which are engineered to adjust cooling.',
    },
  },
};

const sbs650CopyFa = {
  name: 'یخچال ساید‌بای‌ساید هایسنس SBS-650',
  tagline: 'آبریز و یخ‌ ساز، سرمایش مستقل و جریان هوای چندگانه.',
  description:
    'SBS-650 با آبریز و یخ‌ساز، سرمایش مستقل یخچال و فریزر، جریان هوای چندگانه، سیستم خودبسته‌شونده و سنسورهای دیجیتال، تازگی یکنواخت مواد غذایی را حفظ می‌کند.',
  highlights: [
    'آبریز و یخ‌ساز با چند حالت سرو.',
    'خنک‌سازی مستقل یخچال و فریزر برای تازگی بیشتر.',
    'بسته‌شدن خودکار در تا زاویه ۱۵ درجه.',
    'جریان هوای چندگانه برای یکنواختی دما.',
    'پنج سنسور دیجیتال برای تنظیم دقیق سرمایش.',
  ],
  blocks: {
    featureIntro: {
      title: 'تجربه‌ای پریمیوم در یخچال ساید‌بای‌ساید',
      text: 'SBS-650',
    },
    masterMoment: {
      title: 'طراحی شده برای آشپزخانه‌های مدرن و ذخیره‌سازی واقعی.',
    },
    iceWaterDispenser: {
      title: 'آبریز و یخ‌ساز',
      text: 'یخ و آب فراوان. مجهز به آبریز و یخ‌ساز است که هر روز آب و یخ تولید می‌کند. یخ تولیدی برای تمام خانواده کافی است. با فشردن یک دکمه می‌توانید بین یخ قالبی، یخ خرد‌شده و آب خنک انتخاب کنید.',
    },
    independentZones: {
      title: 'ناحیه مستقل یخچال و فریزر',
      text: 'تازگی طولانی‌تر. سیستم کنترل دمای مستقل، یخچال و فریزر را جداگانه خنک می‌کند؛ بنابراین رطوبت بالای یخچال حفظ می‌شود و مواد غذایی مدت بیشتری تازه می‌مانند.',
    },
    selfClosingSystem: {
      title: 'سیستم بسته‌شدن خودکار در',
      text: 'بسته‌شدن خودکار در. حتی اگر در تا زاویه ۱۵ درجه باز بماند، به‌صورت خودکار بسته می‌شود.',
    },
    multiAirFlow: {
      title: 'جریان هوای چندگانه',
      text: 'دمای یکنواخت، تازگی بیشتر. به لطف توزیع یکنواخت هوای سرد توسط سیستم Multi Air Flow هایسنس، دمای بهینه در تمام بخش‌های یخچال‌فریزر حفظ می‌شود و مواد غذایی در هر قفسه‌ای کاملاً خنک می‌مانند.',
    },
    digitalSensors: {
      title: 'سنسورهای دیجیتال',
      text: 'همیشه دقیق، همیشه بهینه. پنج سنسور دیجیتال دماییِ پربازده در یخچال تعبیه شده است که برای تنظیم هوشمند سرمایش طراحی شده‌اند.',
    },
  },
};

const placeholderCopyEn = (name: string) => ({
  name,
  tagline: 'Details coming soon.',
  description: 'Product content will be added soon.',
  highlights: [],
  blocks: {},
});

const placeholderCopyFa = (name: string) => ({
  name,
  tagline: 'جزئیات به‌زودی اضافه می‌شود.',
  description: 'اطلاعات این محصول به‌زودی تکمیل خواهد شد.',
  highlights: [],
  blocks: {},
});

const createPlaceholder = (id: string, label: string, image: string): TvProduct => ({
  id,
  sku: label,
  series: label,
  seriesLabel: label,
  panel: '',
  resolution: '',
  refreshRate: '',
  os: '',
  sound: '',
  connectivity: [],
  tuner: '',
  extras: [],
  image,
  gallery: [image],
  copy: {
    en: placeholderCopyEn(label),
    fa: placeholderCopyFa(label),
  },
});

export const REF_PRODUCTS: TvProduct[] = [
  {
    id: 'sbs-650',
    sku: 'SBS-650',
    series: 'SBS-650',
    seriesLabel: 'SBS-650 Side-by-Side',
    panel: '',
    resolution: '',
    refreshRate: '',
    os: '',
    sound: '',
    connectivity: [],
    tuner: '',
    extras: [
      'Ice & Water Dispenser',
      'Independent Fridge & Freezer Zone',
      'Self-closing System',
      'Multi-Air Flow',
      'Digital Sensors',
    ],
    image: sbs650Hero,
    posterImage: sbs650Poster,
    gallery: sbs650Gallery,
    banners: [
      {
        id: 'sbs-650-banner',
        desktop: productAsset('sbs-650/Sbs-650-1.jpg'),
        mobile: productAsset('sbs-650/Sbs-650-2.jpg'),
        alt: 'Hisense SBS-650',
      },
      {
        id: 'sbs-650-banner-2',
        desktop: productAsset('sbs-650/Sbs-650-3.jpg'),
        mobile: productAsset('sbs-650/Sbs-650-4.jpg'),
        alt: 'Hisense SBS-650',
      },
      {
        id: 'sbs-650-banner-3',
        desktop: productAsset('sbs-650/Sbs-650-4.jpg'),
        mobile: productAsset('sbs-650/Sbs-650-4.jpg'),
        alt: 'Hisense SBS-650',
      },
    ],
    featureCards: sbs650FeatureCards,
    sectionGroups: [
      {
        kind: 'stacked',
        textFirst: true,
        sections: [
          {
            image: productAsset('sbs-650/1-ice-water-dispencer.jpg'),
            copyKey: 'iceWaterDispenser',
          },
          { image: productAsset('sbs-650/2-independent-zones.jpg'), copyKey: 'independentZones' },
          { image: productAsset('sbs-650/4-self-closing.jpg'), copyKey: 'selfClosingSystem' },
          { image: productAsset('sbs-650/5-multi-air-flow.jpg'), copyKey: 'multiAirFlow' },
          { image: productAsset('sbs-650/6-digital-sensors.jpg'), copyKey: 'digitalSensors' },
        ],
      },
    ],
    specs: {
      en: [
        'Side-by-side refrigerator & freezer',
        'Water dispenser and ice maker',
        'No-frost system',
        'Multi-air flow circulation',
        'Super freeze',
        'Digital display',
        'Automatic defrost system',
        'Adjustable shelves',
        'Uniform cabinet lighting',
        'Easy-access drawers',
        'Height (cm): 179',
        'Width (cm): 91',
        'Depth (cm): 73',
        'Net weight (kg): 107',
        'Net fridge capacity (L): 415',
        'Net freezer capacity (L): 186',
      ],
      fa: [
        'یخچال و فریزر ساید بای ساید',
        'مجهز به آبریز و یخساز',
        'سیستم بدون برفک',
        'سیستم گردش هوا در طبقات',
        'انجماد سریع',
        'صفحه نمایش دیجیتال',
        'سیستم یخ‌زدایی خودکار',
        'قابلیت جابجایی طبقات',
        'نور یکنواخت در فضای کابین یخچال',
        'قابلیت دسترسی سریع و آسان به مواد غذایی در کشو',
        'ارتفاع (cm): 179',
        'پهنا (cm): 91',
        'عمق (cm): 73',
        'وزن خالص (kg): 107',
        'ظرفیت خالص یخچال (L): 415',
        'ظرفیت خالص فریزر (L): 186',
      ],
    },
    copy: {
      en: sbs650CopyEn,
      fa: sbs650CopyFa,
    },
  },
  createPlaceholder('rft-560', 'RFT-560', productAsset('rft-560/new-image-66c2e70071a8e.png')),
  createPlaceholder('rfc500', 'RFC500', productAsset('rfc-500/new-image-66c2e70071a8e.png')),
  createPlaceholder('rfc300', 'RFC300', productAsset('rfc-300/bd_96_product_image_1_1.png')),
  createPlaceholder('twin270-370', 'Twin 270-370', productAsset('banner/refrigerator-no-2.webp')),
  createPlaceholder('fc-310', 'FC-310', productAsset('fc-310/product_image_1.png')),
  createPlaceholder('fc-210', 'FC-210', productAsset('fc-210/product_image_1.jpg')),
];
