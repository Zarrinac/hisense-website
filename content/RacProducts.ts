import { mediaUrl } from '@/lib/mediaUrl';
import type { WmProduct } from '@/types/wm';
import type { TvFeatureCard, TvSectionGroup } from '@/types/tv';

const productAsset = (path: string) => mediaUrl(`/products/rac/${path}`);
const logoAsset = (path: string) => mediaUrl(`/products/rac/logos/${path}`);

const btuFromModel = (modelCode: string): string => {
  if (modelCode.includes('-09')) return '9000 BTU';
  if (modelCode.includes('-12')) return '12000 BTU';
  if (modelCode.includes('-18')) return '18000 BTU';
  if (modelCode.includes('-24')) return '24000 BTU';
  if (modelCode.includes('-30')) return '30000 BTU';
  return '';
};

const tqFeatureCards: TvFeatureCard[] = [
  {
    title: 'ACCURATE TEMPERATURE CONTROL',
    description: 'Set the temperature you like and it will be kept',
    image: logoAsset('2-accurate-tempereture-control-icon.png'),
  },
  {
    title: 'I FEEL',
    description: 'The temperature you feel is the temperature you need',
    image: logoAsset('3-accurate-tempereture-control-icon.png'),
  },
  {
    title: '4D AUTO-SWING',
    description: 'Better airflow distribution and comfort',
    image: logoAsset('4-4d-auto-swing-icon.png'),
  },
  {
    title: 'ANTI-CORROSION GOLDEN FIN',
    description: 'Higher anti-corrosion durability and efficiency',
    image: logoAsset('5-anti-corrosion-golden-fin-icon.jpg'),
  },
];

const tgFeatureCards: TvFeatureCard[] = [
  {
    title: 'HIGH ENERGY EFFICIENCY',
    description: 'Up to 30% lower power consumption',
    image: logoAsset('5-high-energy-efficiency-icon.png'),
  },
  {
    title: '4D AUTO-SWING',
    description: 'Better airflow distribution and comfort',
    image: logoAsset('6-4d-auto-swing-icon.png'),
  },
  {
    title: 'ANTI-CORROSION GOLDEN FIN',
    description: 'Higher anti-corrosion durability and efficiency',
    image: logoAsset('7-anti-corrosion-golden-fin-icon.jpg'),
  },
];

const tqGallery = [
  productAsset('tq-hrtc-series/tq-1.jpg'),
  productAsset('tq-hrtc-series/tq-2.jpg'),
  productAsset('tq-hrtc-series/tq-3.jpg'),
  productAsset('tq-hrtc-series/tq-4.jpg'),
  productAsset('tq-hrtc-series/tq-5.jpg'),
];

const tgGallery = [
  productAsset('tg-series/tg-1.png'),
  productAsset('tg-series/tg-2.png'),
  productAsset('tg-series/tg-3.png'),
  productAsset('tg-series/tg-4.png'),
  productAsset('tg-series/tg-5.png'),
];

const vqGallery = [productAsset('vq-series/vq-card.jpg')];

const tqSectionGroups: TvSectionGroup[] = [
  {
    kind: 'content',
    sections: [
      { image: productAsset('tq-hrtc-series/1-4-in-1-filter.jpg'), copyKey: 'fourInOneFilter' },
      {
        image: productAsset('tq-hrtc-series/2-accurate-tempereture-control.jpg'),
        copyKey: 'accurateTemperatureControl',
      },
      { image: productAsset('tq-hrtc-series/3-i-feel.jpg'), copyKey: 'iFeel' },
      { image: productAsset('tq-hrtc-series/4-4d-auto-swing.jpg'), copyKey: 'autoSwing4d' },
      {
        image: productAsset('tq-hrtc-series/5-anti-corrosion-golden-fin.jpg'),
        copyKey: 'antiCorrosionGoldenFin',
      },
      { image: productAsset('tq-hrtc-series/6-easy-cleaning.png'), copyKey: 'easyCleaning' },
      {
        image: productAsset('tq-hrtc-series/7-easy-installations.jpg'),
        copyKey: 'easyInstallations',
      },
      { image: productAsset('tq-hrtc-series/8-easy-maintenance.jpg'), copyKey: 'easyMaintenance' },
    ],
  },
];

const tgSectionGroups: TvSectionGroup[] = [
  {
    kind: 'content',
    sections: [
      {
        image: productAsset('tg-series/1-anion- sterilization.jpg'),
        copyKey: 'anionSterilization',
      },
      { image: productAsset('tg-series/2-4-in-1-filter.jpg'), copyKey: 'fourInOneFilter' },
      {
        image: productAsset('tg-series/3-accurate-tempereture-control.jpg'),
        copyKey: 'accurateTemperatureControl',
      },
      { image: productAsset('tg-series/4-i-feel.jpg'), copyKey: 'iFeel' },
      {
        image: productAsset('tg-series/5-high-energy-efficiency.png'),
        copyKey: 'highEnergyEfficiency',
      },
      { image: productAsset('tg-series/6-4d-auto-swing.jpg'), copyKey: 'autoSwing4d' },
      {
        image: productAsset('tg-series/7-anti-corrosion-golden-fin.jpg'),
        copyKey: 'antiCorrosionGoldenFin',
      },
      { image: productAsset('tg-series/8-easy-cleaning.png'), copyKey: 'easyCleaning' },
      { image: productAsset('tg-series/9-wider-tubing-space.jpg'), copyKey: 'easyInstallations' },
      {
        image: productAsset('tg-series/10-Quick-easy-replace-pcb.jpg'),
        copyKey: 'easyMaintenance',
      },
    ],
  },
];

const tqBlocksEn = {
  featureIntro: {
    title: 'TQ Series',
    text: 'Reliable comfort with precise control and easy serviceability.',
  },
  fourInOneFilter: {
    title: '4-IN-1 FILTER',
    text: 'The combination of four filters can effectively remove all kinds of dust and odor in the air and refresh the indoor air.',
  },
  accurateTemperatureControl: {
    title: 'ACCURATE TEMPERATURE CONTROL',
    text: 'Set the temperature you like and it will be kept. With ultra wide frequency control technology, control is more accurate to prevent room temperature fluctuations and keep you comfortable.',
  },
  iFeel: {
    title: 'I FEEL',
    text: 'The temperature you feel is the temperature you need. The air conditioner senses temperature through the remote and adjusts temperature and wind speed for better comfort.',
  },
  autoSwing4d: {
    title: '4D AUTO-SWING',
    text: 'The horizontal and vertical auto swing improves distribution of cooling, prevents direct blowing, and improves comfort.',
  },
  antiCorrosionGoldenFin: {
    title: 'ANTI-CORROSION GOLDEN FIN',
    text: 'Based on salt spray testing, the anti-corrosion level is 3 to 4 times higher than common fins and provides better hydrophilic performance and heat exchange efficiency.',
  },
  easyCleaning: {
    title: 'EASY CLEANING',
    text: 'The indoor unit can be disassembled and cleaned in less than one minute.',
  },
  easyInstallations: {
    title: 'EASY INSTALLATIONS',
    text: 'Gas and liquid pipes can be connected while the AC is mounted on the wall, using a unique installation structure for convenient and efficient setup.',
  },
  easyMaintenance: {
    title: 'EASY MAINTENANCE',
    text: 'New indoor structure design means there is no need to move the evaporator when checking the PCB or cross-flow fan motor.',
  },
};

const tqBlocksFa = {
  featureIntro: {
    title: 'سری TQ',
    text: 'عملکرد پایدار با کنترل دقیق دما و نگهداری آسان.',
  },
  fourInOneFilter: {
    title: 'فیلتر ۴ در ۱',
    text: 'ترکیب چهار فیلتر می‌تواند انواع گرد و غبار و بوهای نامطبوع را از هوا حذف کرده و هوای تازه‌تری در فضای داخلی ایجاد کند.',
  },
  accurateTemperatureControl: {
    title: 'کنترل دقیق دما',
    text: 'دمای دلخواه را تنظیم کنید تا ثابت بماند. با فناوری کنترل فرکانس گسترده، نوسان دمای اتاق کاهش یافته و آسایش بیشتری فراهم می‌شود.',
  },
  iFeel: {
    title: 'I FEEL',
    text: 'دمایی که احساس می‌کنید، همان دمای موردنیاز شماست. دستگاه با سنجش دما از طریق ریموت، دما و سرعت باد را متناسب تنظیم می‌کند.',
  },
  autoSwing4d: {
    title: 'نوسان خودکار ۴ جهته',
    text: 'نوسان افقی و عمودی خودکار، توزیع یکنواخت‌تری از هوا ایجاد می‌کند و از وزش مستقیم جلوگیری می‌کند.',
  },
  antiCorrosionGoldenFin: {
    title: 'فین طلایی ضدخوردگی',
    text: 'طبق تست اسپری نمک، سطح مقاومت به خوردگی فین طلایی ۳ تا ۴ برابر بیشتر از فین‌های معمولی است و راندمان تبادل حرارتی بالاتری دارد.',
  },
  easyCleaning: {
    title: 'نظافت آسان',
    text: 'یونیت داخلی در کمتر از یک دقیقه قابل باز شدن و نظافت است.',
  },
  easyInstallations: {
    title: 'نصب آسان',
    text: 'با ساختار ویژه نصب، لوله‌های گاز و مایع پس از نصب دستگاه روی دیوار به‌راحتی متصل می‌شوند.',
  },
  easyMaintenance: {
    title: 'سرویس آسان',
    text: 'در ساختار جدید یونیت داخلی، برای بررسی PCB یا موتور فن عرضی نیازی به جابه‌جایی اواپراتور نیست.',
  },
};

const tgBlocksEn = {
  featureIntro: {
    title: 'TG Series',
    text: 'Healthy air, stable comfort, and higher energy efficiency.',
  },
  anionSterilization: {
    title: 'ANION STERILIZATION',
    text: 'Efficient sterilization for healthier life. Anions generated by the AC help eliminate bacteria, mold, viruses, and pollen, creating fresher indoor air.',
  },
  fourInOneFilter: tqBlocksEn.fourInOneFilter,
  accurateTemperatureControl: tqBlocksEn.accurateTemperatureControl,
  iFeel: tqBlocksEn.iFeel,
  highEnergyEfficiency: {
    title: 'HIGH ENERGY EFFICIENCY',
    text: 'By using 3D inverter technology with optimized air duct and advanced louver fin, efficiency is significantly improved and power consumption can be reduced by up to 30%.',
  },
  autoSwing4d: tqBlocksEn.autoSwing4d,
  antiCorrosionGoldenFin: tqBlocksEn.antiCorrosionGoldenFin,
  easyCleaning: tqBlocksEn.easyCleaning,
  easyInstallations: tqBlocksEn.easyInstallations,
  easyMaintenance: tqBlocksEn.easyMaintenance,
};

const tgBlocksFa = {
  featureIntro: {
    title: 'سری TG',
    text: 'هوایی سالم‌تر، آسایش پایدارتر و مصرف انرژی بهینه‌تر برای خانه‌های مدرن.',
  },
  anionSterilization: {
    title: 'استریلیزاسیون یونی',
    text: 'تولید یون‌های منفی به کاهش مؤثر باکتری‌ها، ویروس‌ها، قارچ‌ها و آلرژن‌ها کمک کرده و کیفیت هوای محیط را به‌طور محسوسی بهبود می‌بخشد.',
  },
  fourInOneFilter: tqBlocksFa.fourInOneFilter,
  accurateTemperatureControl: tqBlocksFa.accurateTemperatureControl,
  iFeel: tqBlocksFa.iFeel,
  highEnergyEfficiency: {
    title: 'بازدهی انرژی بالا',
    text: 'با بهره‌گیری از فناوری اینورتر سه‌بعدی، طراحی بهینه مسیر هوا و فین‌های پیشرفته، مصرف انرژی کاهش یافته و راندمان دستگاه تا ۳۰٪ بهبود می‌یابد.',
  },
  autoSwing4d: tqBlocksFa.autoSwing4d,
  antiCorrosionGoldenFin: tqBlocksFa.antiCorrosionGoldenFin,
  easyCleaning: tqBlocksFa.easyCleaning,
  easyInstallations: tqBlocksFa.easyInstallations,
  easyMaintenance: tqBlocksFa.easyMaintenance,
};

const tqCommonSpecsFa = [
  '• مبرد R410A',
  '• مجهز به فیلتر ۴ در ۱',
  '• مصرف انرژی بهینه و عملکرد قدرتمند',
  '• محدوده ولتاژ کاری ۱۸۷ تا ۲۶۴ ولت',
  '• فیلتر ۴ در ۱',
  '• فیلتر HEPA (حذف ۹۹.۷٪ ذرات تا ۰.۳ میکرون)',
  '• فیلتر یون نقره‌ای',
  '• فیلتر ویتامین C',
  '• فیلتر کاتچین',
  '• گارانتی: ۱۸ ماه قطعات / ۵ سال کمپرسور',
];

const tgCommonSpecsFa = [
  '• مبرد R410A',
  '• مجهز به فیلتر ۴ در ۱',
  '• مصرف انرژی بهینه و عملکرد قدرتمند',
  '• محدوده ولتاژ کاری ۱۵۰ تا ۲۶۴ ولت',
  '• عملکرد پایدار در دمای محیط تا ۵۰ درجه سانتی‌گراد',
  '• فیلتر HEPA (حذف ۹۹.۷٪ ذرات تا ۰.۳ میکرون)',
  '• فیلتر یون نقره‌ای',
  '• فیلتر ویتامین C',
  '• فیلتر کاتچین',
  '• گارانتی: ۱۸ ماه قطعات / ۵ سال کمپرسور',
];

const tqCommonSpecsEn = [
  'R410A refrigerant',
  '4-in-1 filter',
  'Energy saving and high performance',
  'Operating voltage range: 187 ~ 264',
  'Warranty: Parts 18 months / Compressor 5 years',
];

const tgCommonSpecsEn = [
  'R410A refrigerant',
  '4-in-1 filter',
  'Energy saving and high performance',
  'Operating voltage range: 150 ~ 264',
  'Operating temperature up to 50°C',
  'Warranty: Parts 18 months / Compressor 5 years',
];

const hrhSpecs: Record<string, Record<'fa' | 'en', string[]>> = {
  'hrh-09tq': {
    fa: [
      ...tqCommonSpecsFa,
      'ابعاد پنل: پهنا 836 – ارتفاع 270 – عمق 210',
      'ابعاد بسته بندی پنل: پهنا 930 – ارتفاع 335 – عمق 260',
      'وزن خالص پنل: 8kg',
      'ابعاد موتور: پهنا 660 – ارتفاع 482 – عمق 240',
      'ابعاد بسته بندی موتور: پهنا 780 – ارتفاع 530 – عمق 315',
      'وزن خالص موتور: 24kg',
      'محدوده دمای کارکرد تا 46 درجه',
    ],
    en: [
      ...tqCommonSpecsEn,
      'Indoor unit dimensions (W×H×D): 836 × 270 × 210',
      'Indoor package dimensions (W×H×D): 930 × 335 × 260',
      'Indoor net weight: 8kg',
      'Outdoor unit dimensions (W×H×D): 660 × 482 × 240',
      'Outdoor package dimensions (W×H×D): 780 × 530 × 315',
      'Outdoor net weight: 24kg',
      'Operating temperature up to 46°C',
    ],
  },
  'hrh-12tq': {
    fa: [
      ...tqCommonSpecsFa,
      'ابعاد پنل: پهنا 836 – ارتفاع 270 – عمق 210',
      'ابعاد بسته بندی پنل: پهنا 930 – ارتفاع 335 – عمق 260',
      'وزن خالص پنل: 8.4kg',
      'ابعاد موتور: پهنا 715 – ارتفاع 240 – عمق 482',
      'ابعاد بسته بندی موتور: پهنا 830 – ارتفاع 530 – عمق 315',
      'وزن خالص موتور: 27kg',
      'محدوده دمای کارکرد تا 46 درجه',
    ],
    en: [
      ...tqCommonSpecsEn,
      'Indoor unit dimensions (W×H×D): 836 × 270 × 210',
      'Indoor package dimensions (W×H×D): 930 × 335 × 260',
      'Indoor net weight: 8.4kg',
      'Outdoor unit dimensions (W×H×D): 715 × 240 × 482',
      'Outdoor package dimensions (W×H×D): 830 × 530 × 315',
      'Outdoor net weight: 27kg',
      'Operating temperature up to 46°C',
    ],
  },
  'hrh-18tq': {
    fa: [
      '• گاز R410A',
      '• صرفه جویی در انرژی و عملکرد فوق العاده',
      '• محدوده ولتاژ کارکرد 187 ~ 264',
      '• محدوده دمای کارکرد تا 48 درجه',
      'گارانتی: قطعات 18 ماه / کمپرسور 5 سال',
      'ابعاد پنل: پهنا 1014 – ارتفاع 315 – عمق 231',
      'ابعاد بسته بندی پنل: پهنا 1066 – ارتفاع 390 – عمق 315',
      'وزن خالص پنل: 12.5kg',
      'ابعاد موتور: پهنا 780 – ارتفاع 540 – عمق 260',
      'ابعاد بسته بندی موتور: پهنا 910 – ارتفاع 600 – عمق 360',
      'وزن خالص موتور: 38kg',
    ],
    en: [
      'R410A refrigerant',
      'Energy saving and high performance',
      'Operating voltage range: 187 ~ 264',
      'Operating temperature up to 48°C',
      'Warranty: Parts 18 months / Compressor 5 years',
      'Indoor unit dimensions (W×H×D): 1014 × 315 × 231',
      'Indoor package dimensions (W×H×D): 1066 × 390 × 315',
      'Indoor net weight: 12.5kg',
      'Outdoor unit dimensions (W×H×D): 780 × 540 × 260',
      'Outdoor package dimensions (W×H×D): 910 × 600 × 360',
      'Outdoor net weight: 38kg',
    ],
  },
  'hrh-24tq': {
    fa: [
      ...tqCommonSpecsFa,
      'ابعاد پنل: پهنا 1185 – ارتفاع 315 – عمق 231',
      'ابعاد بسته بندی پنل: پهنا 1236 – ارتفاع 390 – عمق 315',
      'وزن خالص پنل: 14.5kg',
      'ابعاد موتور: پهنا 860 – ارتفاع 650 – عمق 310',
      'ابعاد بسته بندی موتور: پهنا 995 – ارتفاع 730 – عمق 445',
      'وزن خالص موتور: 47kg',
      'محدوده دمای کارکرد تا 46 درجه',
    ],
    en: [
      ...tqCommonSpecsEn,
      'Indoor unit dimensions (W×H×D): 1185 × 315 × 231',
      'Indoor package dimensions (W×H×D): 1236 × 390 × 315',
      'Indoor net weight: 14.5kg',
      'Outdoor unit dimensions (W×H×D): 860 × 650 × 310',
      'Outdoor package dimensions (W×H×D): 995 × 730 × 445',
      'Outdoor net weight: 47kg',
      'Operating temperature up to 46°C',
    ],
  },
  'hrh-30tq': {
    fa: [
      ...tqCommonSpecsFa,
      'ابعاد پنل: پهنا 1185 – ارتفاع 315 – عمق 231',
      'ابعاد بسته بندی پنل: پهنا 1236 – ارتفاع 390 – عمق 315',
      'وزن خالص پنل: 15kg',
      'ابعاد موتور: پهنا 860 – ارتفاع 650 – عمق 310',
      'ابعاد بسته بندی موتور: پهنا 995 – ارتفاع 730 – عمق 445',
      'وزن خالص موتور: 54kg',
      'محدوده دمای کارکرد تا 48 درجه',
    ],
    en: [
      ...tqCommonSpecsEn,
      'Indoor unit dimensions (W×H×D): 1185 × 315 × 231',
      'Indoor package dimensions (W×H×D): 1236 × 390 × 315',
      'Indoor net weight: 15kg',
      'Outdoor unit dimensions (W×H×D): 860 × 650 × 310',
      'Outdoor package dimensions (W×H×D): 995 × 730 × 445',
      'Outdoor net weight: 54kg',
      'Operating temperature up to 48°C',
    ],
  },
};

const hihSpecs: Record<string, Record<'fa' | 'en', string[]>> = {
  'hih-09tg': {
    fa: [
      ...tgCommonSpecsFa,
      'ابعاد پنل: پهنا 880 – ارتفاع 275 – عمق 207',
      'ابعاد بسته بندی پنل: پهنا 930 – ارتفاع 335 – عمق 260',
      'وزن خالص پنل: 8kg',
      'ابعاد موتور: پهنا 660 – ارتفاع 482 – عمق 240',
      'ابعاد بسته بندی موتور: پهنا 780 – ارتفاع 530 – عمق 315',
      'وزن خالص موتور: 23kg',
    ],
    en: [
      ...tgCommonSpecsEn,
      'Indoor unit dimensions (W×H×D): 880 × 275 × 207',
      'Indoor package dimensions (W×H×D): 930 × 335 × 260',
      'Indoor net weight: 8kg',
      'Outdoor unit dimensions (W×H×D): 660 × 482 × 240',
      'Outdoor package dimensions (W×H×D): 780 × 530 × 315',
      'Outdoor net weight: 23kg',
    ],
  },
  'hih-12tg': {
    fa: [
      ...tgCommonSpecsFa,
      'ابعاد پنل: پهنا 880 – ارتفاع 275 – عمق 207',
      'ابعاد بسته بندی پنل: پهنا 930 – ارتفاع 335 – عمق 260',
      'وزن خالص پنل: 8kg',
      'ابعاد موتور: پهنا 660 – ارتفاع 482 – عمق 240',
      'ابعاد بسته بندی موتور: پهنا 780 – ارتفاع 530 – عمق 315',
      'وزن خالص موتور: 23kg',
    ],
    en: [
      ...tgCommonSpecsEn,
      'Indoor unit dimensions (W×H×D): 880 × 275 × 207',
      'Indoor package dimensions (W×H×D): 930 × 335 × 260',
      'Indoor net weight: 8kg',
      'Outdoor unit dimensions (W×H×D): 660 × 482 × 240',
      'Outdoor package dimensions (W×H×D): 780 × 530 × 315',
      'Outdoor net weight: 23kg',
    ],
  },
  'hih-18tg': {
    fa: [
      ...tgCommonSpecsFa,
      'ابعاد پنل: پهنا 880 – ارتفاع 275 – عمق 207',
      'ابعاد بسته بندی پنل: پهنا 930 – ارتفاع 335 – عمق 260',
      'وزن خالص پنل: 8kg',
      'ابعاد موتور: پهنا 660 – ارتفاع 482 – عمق 240',
      'ابعاد بسته بندی موتور: پهنا 780 – ارتفاع 530 – عمق 315',
      'وزن خالص موتور: 23kg',
    ],
    en: [
      ...tgCommonSpecsEn,
      'Indoor unit dimensions (W×H×D): 880 × 275 × 207',
      'Indoor package dimensions (W×H×D): 930 × 335 × 260',
      'Indoor net weight: 8kg',
      'Outdoor unit dimensions (W×H×D): 660 × 482 × 240',
      'Outdoor package dimensions (W×H×D): 780 × 530 × 315',
      'Outdoor net weight: 23kg',
    ],
  },
  'hih-24tg': {
    fa: [
      ...tgCommonSpecsFa,
      'ابعاد پنل: پهنا 880 – ارتفاع 275 – عمق 207',
      'ابعاد بسته بندی پنل: پهنا 930 – ارتفاع 335 – عمق 260',
      'وزن خالص پنل: 8kg',
      'ابعاد موتور: پهنا 660 – ارتفاع 482 – عمق 240',
      'ابعاد بسته بندی موتور: پهنا 780 – ارتفاع 530 – عمق 315',
      'وزن خالص موتور: 23kg',
    ],
    en: [
      ...tgCommonSpecsEn,
      'Indoor unit dimensions (W×H×D): 880 × 275 × 207',
      'Indoor package dimensions (W×H×D): 930 × 335 × 260',
      'Indoor net weight: 8kg',
      'Outdoor unit dimensions (W×H×D): 660 × 482 × 240',
      'Outdoor package dimensions (W×H×D): 780 × 530 × 315',
      'Outdoor net weight: 23kg',
    ],
  },
  'hih-30vq': {
    fa: [
      ...tgCommonSpecsFa,
      'ابعاد پنل: پهنا 880 – ارتفاع 275 – عمق 207',
      'ابعاد بسته بندی پنل: پهنا 930 – ارتفاع 335 – عمق 260',
      'وزن خالص پنل: 8kg',
      'ابعاد موتور: پهنا 660 – ارتفاع 482 – عمق 240',
      'ابعاد بسته بندی موتور: پهنا 780 – ارتفاع 530 – عمق 315',
      'وزن خالص موتور: 23kg',
    ],
    en: [
      ...tgCommonSpecsEn,
      'Indoor unit dimensions (W×H×D): 880 × 275 × 207',
      'Indoor package dimensions (W×H×D): 930 × 335 × 260',
      'Indoor net weight: 8kg',
      'Outdoor unit dimensions (W×H×D): 660 × 482 × 240',
      'Outdoor package dimensions (W×H×D): 780 × 530 × 315',
      'Outdoor net weight: 23kg',
    ],
  },
};

const buildRacProduct = (params: {
  id: string;
  series: string;
  seriesLabel: string;
  image: string;
  gallery: string[];
  specs: Record<'fa' | 'en', string[]>;
  blocksEn: Record<string, { title?: string; text?: string }>;
  blocksFa: Record<string, { title?: string; text?: string }>;
  sectionGroups: TvSectionGroup[];
  featureCards: TvFeatureCard[];
  mode: 'cool-only' | 'hot-cool';
}) => {
  const model = params.id.toUpperCase();
  const btu = btuFromModel(model);
  const modeEn = params.mode === 'cool-only' ? 'Cooling only' : 'Cooling and heating';
  const modeFa = params.mode === 'cool-only' ? 'فقط سرمایشی' : 'سرمایش و گرمایش';
  const isHihSeriesModel = params.id.startsWith('hih-');
  const enName = isHihSeriesModel
    ? `Hisense Inverter Air Conditioner ${model}`
    : `Hisense Air Conditioner ${model}`;
  const faName = isHihSeriesModel
    ? `کولر گازی اینورتر هایسنس ${model}`
    : `کولر گازی هایسنس ${model}`;

  const product: WmProduct = {
    id: params.id,
    sku: model,
    series: params.series,
    seriesLabel: params.seriesLabel,
    sizes: btu ? [btu] : [],
    extras: [
      modeEn,
      ...(params.series.includes('TG') ? ['Anion sterilization'] : []),
      '4-in-1 Filter',
      'I Feel',
      '4D Auto-Swing',
    ],
    image: params.image,
    posterImage: params.image,
    gallery: params.gallery,
    featureCards: params.featureCards,
    sectionGroups: params.sectionGroups,
    specs: params.specs,
    copy: {
      en: {
        name: enName,
        tagline: `${params.seriesLabel} | ${modeEn}`,
        description: params.series.includes('TG')
          ? 'Healthy-air inverter split AC with anion sterilization, 4-in-1 filtration, and precise temperature control.'
          : 'Reliable split AC with 4-in-1 filtration, precise temperature control, and service-friendly structure.',
        highlights: [
          modeEn,
          ...(params.series.includes('TG')
            ? ['Anion Sterilization', 'High Energy Efficiency']
            : ['Accurate Temperature Control']),
          '4D Auto-Swing',
          'Anti-Corrosion Golden Fin',
          'Easy Cleaning and Maintenance',
        ],
        blocks: params.blocksEn,
      },
      fa: {
        name: faName,
        tagline: `${params.seriesLabel} | ${modeFa}`,
        description: params.series.includes('TG')
          ? 'کولر گازی اینورتر هایسنس با استریلیزاسیون یونی، فیلتر ۴ در ۱ و کنترل دقیق دما؛ انتخابی هوشمند برای هوای سالم‌تر و مصرف انرژی بهینه.'
          : 'کولر گازی هایسنس با فیلتر ۴ در ۱، کنترل دقیق دما و ساختار مناسب برای نصب و سرویس آسان؛ عملکردی پایدار برای سرمایش و گرمایش روزمره.',
        highlights: [
          modeFa,
          ...(params.series.includes('TG')
            ? ['استریلیزاسیون یونی', 'بازدهی انرژی بالا با فناوری اینورتر']
            : ['کنترل دقیق و پایدار دما']),
          'نوسان خودکار چهارجهته (4D Auto-Swing)',
          'فین طلایی ضدخوردگی با دوام بالا',
          'نظافت و سرویس آسان',
        ],
        blocks: params.blocksFa,
      },
    },
  };

  return product;
};

const hrhModels = ['hrh-09tq', 'hrh-12tq', 'hrh-18tq', 'hrh-24tq', 'hrh-30tq'];
const hrtcModels = ['hrtc-12tq', 'hrtc-18tq', 'hrtc-24tq', 'hrtc-30vq'];
const hihModels = ['hih-09tg', 'hih-12tg', 'hih-18tg', 'hih-24tg', 'hih-30vq'];

const hrhProducts = hrhModels.map((id) =>
  buildRacProduct({
    id,
    series: 'HRH',
    seriesLabel: 'HRH TQ Series',
    image: productAsset('tq-hrtc-series/tq-card.jpg'),
    gallery: tqGallery,
    specs: hrhSpecs[id],
    blocksEn: tqBlocksEn,
    blocksFa: tqBlocksFa,
    sectionGroups: tqSectionGroups,
    featureCards: tqFeatureCards,
    mode: 'hot-cool',
  }),
);

const hrtcProducts = hrtcModels.map((id) =>
  buildRacProduct({
    id,
    series: 'HRTC',
    seriesLabel: id.includes('30vq') ? 'HRTC VQ Series' : 'HRTC TQ Series',
    image: id.includes('30vq')
      ? productAsset('vq-series/vq-card.jpg')
      : productAsset('tq-hrtc-series/tq-card.jpg'),
    gallery: id.includes('30vq') ? vqGallery : tqGallery,
    specs: hrhSpecs[`hrh-${id.split('-')[1]}tq`] ?? hrhSpecs['hrh-30tq'],
    blocksEn: tqBlocksEn,
    blocksFa: tqBlocksFa,
    sectionGroups: tqSectionGroups,
    featureCards: tqFeatureCards,
    mode: 'cool-only',
  }),
);

const hihProducts = hihModels.map((id) =>
  buildRacProduct({
    id,
    series: 'HIH',
    seriesLabel: id.includes('30vq') ? 'HIH VQ Series' : 'HIH TG Series',
    image: id.includes('30vq')
      ? productAsset('vq-series/vq-card.jpg')
      : productAsset('tg-series/tg-card.jpg'),
    gallery: id.includes('30vq') ? vqGallery : tgGallery,
    specs: hihSpecs[id],
    blocksEn: tgBlocksEn,
    blocksFa: tgBlocksFa,
    sectionGroups: tgSectionGroups,
    featureCards: tgFeatureCards,
    mode: 'hot-cool',
  }),
);

const hfhProducts: WmProduct[] = [
  {
    id: 'hfh-36fm',
    sku: 'HFH-36FM',
    series: 'HFH',
    seriesLabel: 'HFH Series',
    sizes: ['36000 BTU'],
    extras: ['Cooling and heating', '4-in-1 Filter', 'I Feel', '4D Auto-Swing'],
    image: productAsset('hfh-series/hfh-card.jpg'),
    posterImage: productAsset('hfh-series/hfh-card.jpg'),
    gallery: [productAsset('hfh-series/hfh-card.jpg')],
    specs: {
      en: [
        ...tqCommonSpecsEn,
        'Indoor unit dimensions (W×H×D): 1185 × 315 × 231',
        'Indoor package dimensions (W×H×D): 1236 × 390 × 315',
        'Indoor net weight: 15kg',
        'Outdoor unit dimensions (W×H×D): 860 × 650 × 310',
        'Outdoor package dimensions (W×H×D): 995 × 730 × 445',
        'Outdoor net weight: 54kg',
        'Operating temperature up to 48°C',
      ],
      fa: [
        ...tqCommonSpecsFa,
        'ابعاد پنل: پهنا 1185 – ارتفاع 315 – عمق 231',
        'ابعاد بسته بندی پنل: پهنا 1236 – ارتفاع 390 – عمق 315',
        'وزن خالص پنل: 15kg',
        'ابعاد موتور: پهنا 860 – ارتفاع 650 – عمق 310',
        'ابعاد بسته بندی موتور: پهنا 995 – ارتفاع 730 – عمق 445',
        'وزن خالص موتور: 54kg',
        'محدوده دمای کارکرد تا 48 درجه',
      ],
    },
    copy: {
      en: {
        name: 'Hisense Air Conditioner HFH-36FM',
        tagline: 'HFH Series | Cooling and heating',
        description: 'HFH floor-standing series with reliable cooling and heating performance.',
        highlights: ['Cooling and heating', '4-in-1 Filter', '4D Auto-Swing'],
        blocks: {},
      },
      fa: {
        name: 'کولر گازی هایسنس HFH-36FM',
        tagline: 'سری HFH | سرمایش و گرمایش',
        description:
          'کولر گازی ایستاده هایسنس سری HFH با توان سرمایش و گرمایش قدرتمند، مناسب فضاهای بزرگ و تجاری با عملکردی پایدار و مطمئن.',
        highlights: ['سرمایش و گرمایش', 'فیلتر ۴ در ۱', 'نوسان خودکار ۴ جهته'],
        blocks: {},
      },
    },
  },
  {
    id: 'hfh-55fm',
    sku: 'HFH-55FM',
    series: 'HFH',
    seriesLabel: 'HFH Series',
    sizes: ['55000 BTU'],
    extras: ['Cooling and heating', '4-in-1 Filter', 'I Feel', '4D Auto-Swing'],
    image: productAsset('hfh-series/hfh-card.jpg'),
    posterImage: productAsset('hfh-series/hfh-card.jpg'),
    gallery: [productAsset('hfh-series/hfh-card.jpg')],
    specs: {
      en: [
        ...tqCommonSpecsEn,
        'Indoor unit dimensions (W×H×D): 1185 × 315 × 231',
        'Indoor package dimensions (W×H×D): 1236 × 390 × 315',
        'Indoor net weight: 15kg',
        'Outdoor unit dimensions (W×H×D): 860 × 650 × 310',
        'Outdoor package dimensions (W×H×D): 995 × 730 × 445',
        'Outdoor net weight: 54kg',
        'Operating temperature up to 48°C',
      ],
      fa: [
        ...tqCommonSpecsFa,
        'ابعاد پنل: پهنا 1185 – ارتفاع 315 – عمق 231',
        'ابعاد بسته بندی پنل: پهنا 1236 – ارتفاع 390 – عمق 315',
        'وزن خالص پنل: 15kg',
        'ابعاد موتور: پهنا 860 – ارتفاع 650 – عمق 310',
        'ابعاد بسته بندی موتور: پهنا 995 – ارتفاع 730 – عمق 445',
        'وزن خالص موتور: 54kg',
        'محدوده دمای کارکرد تا 48 درجه',
      ],
    },
    copy: {
      en: {
        name: 'Hisense Air Conditioner HFH-55FM',
        tagline: 'HFH Series | Cooling and heating',
        description: 'HFH floor-standing series with reliable cooling and heating performance.',
        highlights: ['Cooling and heating', '4-in-1 Filter', '4D Auto-Swing'],
        blocks: {},
      },
      fa: {
        name: 'کولر گازی هایسنس HFH-55FM',
        tagline: 'سری HFH | سرمایش و گرمایش',
        description: 'سری ایستاده HFH با عملکرد پایدار سرمایش و گرمایش.',
        highlights: ['سرمایش و گرمایش', 'فیلتر ۴ در ۱', 'نوسان خودکار ۴ جهته'],
        blocks: {},
      },
    },
  },
  {
    id: 'hfh-96',
    sku: 'HFH-96',
    series: 'HFH',
    seriesLabel: 'HFH Series',
    extras: ['Floor standing air conditioner'],
    image: productAsset('hfh-series/hfh-96-card.jpg'),
    posterImage: productAsset('hfh-series/hfh-96-card.jpg'),
    gallery: [
      productAsset('hfh-series/hfh-96-card.jpg'),
      productAsset('hfh-series/hfh-96-outdoor.jpg'),
    ],
    specs: {
      en: ['Details will be completed soon.'],
      fa: ['مشخصات این مدل به‌زودی تکمیل می‌شود.'],
    },
    copy: {
      en: {
        name: 'Hisense Air Conditioner HFH-96',
        tagline: 'HFH Series',
        description: 'HFH series content will be completed soon.',
        highlights: ['Floor-standing design'],
        blocks: {},
      },
      fa: {
        name: 'کولر گازی هایسنس HFH-96',
        tagline: 'سری HFH',
        description:
          'مشخصات و اطلاعات کامل این مدل از سری ایستاده HFH به‌زودی در این بخش تکمیل خواهد شد.',
        highlights: ['طراحی ایستاده'],
        blocks: {},
      },
    },
  },
];

export const RAC_PRODUCTS: WmProduct[] = [
  ...hrhProducts,
  ...hihProducts,
  ...hrtcProducts,
  ...hfhProducts,
];
