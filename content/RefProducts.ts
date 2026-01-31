import { mediaUrl } from '@/lib/mediaUrl';
import { type TvProduct } from '@/types/tv';

// Bundled refrigerator catalog used when a database is not available.
const productAsset = (path: string) => mediaUrl(`/products/Refrigerator/${path}`);
const logoAsset = (path: string) => mediaUrl(`/products/Refrigerator/logos/${path}`);

const sbs650Hero = productAsset('sbs-650/Sbs-650-1.png');
const sbs650Poster = productAsset('sbs-650/Sbs-650-2.png');
const sbs650Gallery = [
  productAsset('sbs-650/Sbs-650-1.png'),
  productAsset('sbs-650/Sbs-650-2.png'),
  productAsset('sbs-650/Sbs-650-3.png'),
  productAsset('sbs-650/Sbs-650-4.png'),
  productAsset('sbs-650/Sbs-650-5.png'),
];

const sbs650FeatureCards = [
  {
    title: 'Premium Flat Door Design',
    description: 'Modern flat door styling with recessed handles and premium materials.',
    image: logoAsset('1-Premium-Flat-Door-Design-Side-s.png'),
  },
  {
    title: 'My Fresh Choice',
    description: 'Flexible zone converts from -18°C to +5°C for any storage need.',
    image: logoAsset('2-My-Fresh-Choice-lg.png'),
  },
  {
    title: 'Triple Zone',
    description: 'Three independent compartments with their own temperature controls.',
    image: logoAsset('3-Triple-Temp-Zone-Cross-Door-s.png'),
  },
  {
    title: 'Big Capacity',
    description: 'Spacious four-door layout makes storage and access effortless.',
    image: logoAsset('4-Large-Capacity-Cross-Door-s.png'),
  },
  {
    title: 'Metal Glide Drawers',
    description: 'Durable runners make heavy frozen goods easy to reach.',
    image: logoAsset('5-Easy-Approach-Drawers-s.png'),
  },
  {
    title: 'Metal Cooling',
    description: 'Stainless rear wall distributes cool air evenly.',
    image: logoAsset('6-Metal-Tech-Cooling-s.png'),
  },
  {
    title: 'Adjustable Shelves',
    description: 'Cantilever shelves move easily to fit tall items.',
    image: logoAsset('7-Fully-Adjustable-Shelf-s.png'),
  },
  {
    title: 'Water Dispenser',
    description: 'No-plumbed dispenser delivers fresh chilled water on demand.',
    image: logoAsset('8-Sleek-Water-Dispenser-s.png'),
  },
  {
    title: 'Inverter Technology',
    description: 'Adaptive compressor keeps temperature stable and saves energy.',
    image: logoAsset('9-Inverter-Technology-s.png'),
  },
  {
    title: 'Precise Temp Control',
    description: 'Multiple digital sensors optimize cooling performance.',
    image: logoAsset('10-Digital-Temperature-Sensor-s.png'),
  },
  {
    title: 'Metal Recessed Handle',
    description: 'A sleek recessed handle elevates the kitchen look.',
    image: logoAsset('11-Metal-Recessed-Handle-s.png'),
  },
  {
    title: 'Big Door Balcony',
    description: 'Tall door bins fit larger bottles and cartons safely.',
    image: logoAsset('12-Gallon-Door-Storage-s.png'),
  },
  {
    title: 'Bigger Drawers',
    description: 'Extra-deep drawers hold bulky frozen items with ease.',
    image: logoAsset('13-Big-Box-s.png'),
  },
  {
    title: 'Super Cool & Super Freeze',
    description: 'Rapid chill and freeze modes protect food freshness.',
    image: logoAsset('14-Super-Freeze-s.png'),
  },
  {
    title: 'Door Alarm',
    description: 'Alerts you if a door is left open too long.',
    image: logoAsset('15-Door-Alarm-s.png'),
  },
];

const sbs650CopyEn = {
  name: 'Hisense SBS-650 Side-by-Side Refrigerator',
  tagline: 'Premium flat-door design with triple-zone flexibility and smart cooling.',
  description:
    'SBS-650 blends elegant flat-door styling with three independently controlled zones, advanced cooling, and spacious storage to keep every item fresh and easy to reach.',
  highlights: [
    'Triple-zone fridge/freezer/My Fresh Choice compartments.',
    'Metal cooling rear panel for even temperature distribution.',
    'No-plumbed water dispenser with chilled water on demand.',
    'Inverter compressor for energy savings and quieter operation.',
    'Large-capacity four-door layout with easy-glide drawers.',
  ],
  blocks: {
    featureIntro: {
      title: 'Premium Side-by-Side Experience',
      text: 'SBS-650',
    },
    masterMoment: {
      title: 'Designed for modern kitchens and real-life storage needs.',
    },
    premiumFlatDoor: {
      title: 'Premium Flat Door Design',
      text: 'Designed to meet even the most demanding users. With flat doors, recessed handles, and premium materials, this fridge-freezer fits perfectly in modern kitchens.',
    },
    myFreshChoice: {
      title: 'My Fresh Choice',
      text: 'Convert the My Fresh Choice zone from fridge to freezer with temperatures from -18°C to +5°C to match your storage needs.',
    },
    tripleZone: {
      title: 'Triple Zone',
      text: 'Three independent compartments—fridge, freezer, and My Fresh Choice—each with its own controls for flexible storage.',
    },
    bigCapacity: {
      title: 'Big Capacity',
      text: 'Spacious storage and four wide-opening doors make it easy to see and access everything at a glance.',
    },
    metalGlideDrawers: {
      title: 'Metal Glide Drawers',
      text: 'Durable metal runners make even the heaviest frozen items easy to access. The transparent drawer holds up to 27 kg.',
    },
    metalCooling: {
      title: 'Metal Cooling',
      text: 'A stainless-steel rear wall distributes cool air evenly for consistent temperature and humidity.',
    },
    adjustableShelves: {
      title: 'Cantilever Shelves',
      text: 'Fully adjustable shelves let you create room for large bottles, jars, or tall cakes with ease.',
    },
    waterDispenser: {
      title: 'No-plumbed Water Dispenser',
      text: 'Integrated into the flat door—just fill the reservoir and enjoy chilled water anytime.',
    },
    inverterTechnology: {
      title: 'Inverter Technology',
      text: 'The inverter compressor adapts cooling output to save energy, reduce noise, and extend appliance life.',
    },
    preciseTempControl: {
      title: 'Precise Temp Control',
      text: 'Five digital temperature sensors continuously optimize the cooling level for maximum efficiency.',
    },
    metalRecessedHandle: {
      title: 'Metal Recessed Handle',
      text: 'A premium recessed handle blends seamlessly with modern kitchen designs.',
    },
    bigDoorBalcony: {
      title: 'Big Door Balcony',
      text: 'Large door balconies hold taller items, cartons, and bottles with ease—six in total.',
    },
    biggerDrawers: {
      title: 'Bigger Drawers',
      text: 'Two extra-large drawers (220 mm high) are perfect for bulky foods like turkey or meat joints.',
    },
    superCool: {
      title: 'Super Cool & Super Freezer',
      text: 'Super Cool drops the fridge to +2°C for 6 hours; Super Freeze rapidly lowers freezer temperature to lock in freshness.',
    },
    doorAlarm: {
      title: 'Door Alarm',
      text: 'Alerts you if the door is left open and temperatures begin to rise.',
    },
  },
};

const sbs650CopyFa = {
  name: 'یخچال ساید‌بای‌ساید هایسنس SBS-650',
  tagline: 'طراحی تخت پریمیوم با سه ناحیه دمایی و سرمایش هوشمند.',
  description:
    'SBS-650 با طراحی تخت و شیک، سه ناحیه مستقل دمایی، سرمایش یکنواخت و فضای ذخیره‌سازی بزرگ، تازگی مواد غذایی را حفظ می‌کند.',
  highlights: [
    'سه ناحیه مستقل یخچال، فریزر و My Fresh Choice.',
    'پنل فلزی پشت برای توزیع یکنواخت سرما.',
    'آبریز بدون اتصال به لوله آب با آب خنک آماده.',
    'کمپرسور اینورتر برای صرفه‌جویی انرژی و صدای کمتر.',
    'ظرفیت بالا با چهار درب و کشوهای روان.',
  ],
  blocks: {
    featureIntro: {
      title: 'تجربه‌ای پریمیوم در یخچال ساید‌بای‌ساید',
      text: 'SBS-650',
    },
    masterMoment: {
      title: 'طراحی شده برای آشپزخانه‌های مدرن و ذخیره‌سازی واقعی.',
    },
    premiumFlatDoor: {
      title: 'طراحی درِ تخت پریمیوم',
      text: 'با درهای تخت، دستگیره‌های مخفی و متریال باکیفیت، این یخچال‌فریزر انتخابی شایسته برای آشپزخانه‌های مدرن است.',
    },
    myFreshChoice: {
      title: 'ناحیه My Fresh Choice',
      text: 'این ناحیه با دمای قابل تنظیم از ۱۸- تا ۵+ درجه، به‌راحتی از یخچال به فریزر تبدیل می‌شود.',
    },
    tripleZone: {
      title: 'سه ناحیه دمایی',
      text: 'یخچال، فریزر و ناحیه My Fresh Choice هرکدام کنترل دمای مستقل دارند تا با نیاز شما سازگار شوند.',
    },
    bigCapacity: {
      title: 'ظرفیت بزرگ',
      text: 'چهار درب عریض و فضای بزرگ، دید کامل و دسترسی سریع به مواد غذایی را فراهم می‌کند.',
    },
    metalGlideDrawers: {
      title: 'کشوهای ریل فلزی',
      text: 'ریل‌های فلزی مقاوم دسترسی به مواد منجمد سنگین را آسان می‌کنند. هر کشو تا ۲۷ کیلوگرم ظرفیت دارد.',
    },
    metalCooling: {
      title: 'خنک‌سازی فلزی',
      text: 'پنل استیل پشت، سرما را به‌صورت یکنواخت پخش کرده و دما و رطوبت را پایدار نگه می‌دارد.',
    },
    adjustableShelves: {
      title: 'طبقات قابل تنظیم',
      text: 'طبقات به‌راحتی جابه‌جا می‌شوند تا فضای کافی برای بطری‌های بزرگ، شیشه‌ها یا کیک‌های بلند فراهم شود.',
    },
    waterDispenser: {
      title: 'آبریز بدون اتصال به لوله آب',
      text: 'آبریز یکپارچه درِ تخت، فقط با پر کردن مخزن، همیشه آب خنک در دسترس دارد.',
    },
    inverterTechnology: {
      title: 'فناوری اینورتر',
      text: 'کمپرسور اینورتر با تنظیم هوشمند سرمایش، مصرف انرژی را کاهش داده و طول عمر دستگاه را افزایش می‌دهد.',
    },
    preciseTempControl: {
      title: 'کنترل دقیق دما',
      text: 'پنج حسگر دیجیتال، سرمایش را به‌صورت دقیق تنظیم می‌کنند تا بیشترین بهره‌وری حاصل شود.',
    },
    metalRecessedHandle: {
      title: 'دستگیره مخفی فلزی',
      text: 'طراحی مدرن با دستگیره مخفی، هماهنگی کامل با سبک آشپزخانه ایجاد می‌کند.',
    },
    bigDoorBalcony: {
      title: 'جایگاه بزرگ درِ یخچال',
      text: 'بالکن بزرگ درب، بطری‌ها و کارتن‌های بلند را ایمن نگه می‌دارد. در مجموع شش بالکن بزرگ دارد.',
    },
    biggerDrawers: {
      title: 'کشوهای بزرگ‌تر',
      text: 'دو کشوی بزرگ با ارتفاع ۲۲۰ میلی‌متر، برای نگهداری اقلام حجیم مانند گوشت و بوقلمون مناسب‌اند.',
    },
    superCool: {
      title: 'سوپر کول و سوپر فریز',
      text: 'سوپر کول دمای یخچال را برای ۶ ساعت به ۲+ درجه می‌رساند و سوپر فریز مواد غذایی را سریع منجمد می‌کند.',
    },
    doorAlarm: {
      title: 'آلارم درب',
      text: 'در صورت باز ماندن درب، هشدار می‌دهد تا از خروج هوای سرد جلوگیری شود.',
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
      'Premium Flat Door Design',
      'My Fresh Choice',
      'Triple Zone',
      'Metal Cooling',
      'Inverter Technology',
    ],
    image: sbs650Hero,
    posterImage: sbs650Poster,
    gallery: sbs650Gallery,
    banners: [
      {
        id: 'sbs-650-banner',
        desktop: productAsset('sbs-650/Sbs-650-1.png'),
        mobile: productAsset('sbs-650/Sbs-650-2.png'),
        alt: 'Hisense SBS-650',
      },
      {
        id: 'sbs-650-banner-2',
        desktop: productAsset('sbs-650/Sbs-650-3.png'),
        mobile: productAsset('sbs-650/Sbs-650-4.png'),
        alt: 'Hisense SBS-650',
      },
      {
        id: 'sbs-650-banner-3',
        desktop: productAsset('sbs-650/Sbs-650-5.png'),
        mobile: productAsset('sbs-650/Sbs-650-5.png'),
        alt: 'Hisense SBS-650',
      },
    ],
    featureCards: sbs650FeatureCards,
    sectionGroups: [
      {
        kind: 'stacked',
        sections: [
          { image: productAsset('sbs-650/1-premium-flat-door.jpg'), copyKey: 'premiumFlatDoor' },
          { image: productAsset('sbs-650/2-my-fresh-choice.jpg'), copyKey: 'myFreshChoice' },
          { image: productAsset('sbs-650/3-triple-zone.jpg'), copyKey: 'tripleZone' },
        ],
      },
      {
        kind: 'content',
        sections: [
          { image: productAsset('sbs-650/4-big-capacity.jpg'), copyKey: 'bigCapacity' },
          {
            image: productAsset('sbs-650/5-metal-glide-drawers.jpg'),
            copyKey: 'metalGlideDrawers',
          },
          { image: productAsset('sbs-650/6-metal-cooling.jpg'), copyKey: 'metalCooling' },
          { image: productAsset('sbs-650/7-cantilever-shelves.jpg'), copyKey: 'adjustableShelves' },
          { image: productAsset('sbs-650/8-no-plumbed-water.jpg'), copyKey: 'waterDispenser' },
          {
            image: productAsset('sbs-650/9-inverter-technology.jpg'),
            copyKey: 'inverterTechnology',
          },
          {
            image: productAsset('sbs-650/10-precise-temp-control.jpg'),
            copyKey: 'preciseTempControl',
          },
          {
            image: productAsset('sbs-650/11-metal-recessed-handle.jpg'),
            copyKey: 'metalRecessedHandle',
          },
          { image: productAsset('sbs-650/12-big-door-balcony.jpg'), copyKey: 'bigDoorBalcony' },
          { image: productAsset('sbs-650/13-bigger-drawers.jpg'), copyKey: 'biggerDrawers' },
          { image: productAsset('sbs-650/14-super-cool.jpg'), copyKey: 'superCool' },
          { image: productAsset('sbs-650/15-door-alarm.jpg'), copyKey: 'doorAlarm' },
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
