import { mediaUrl } from '@/lib/mediaUrl';
import { type TvFeatureCard, type TvProduct } from '@/types/tv';

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

const rft560FeatureCards = [
  {
    title: 'SLEEK WATER DISPENSER',
    description: 'Sleek water dispenser',
    image: logoAsset('rft-560/1-sleek-water-dispenser-icon.png'),
  },
  {
    title: 'DURABLE INVERTER',
    description: 'Durable inverter',
    image: logoAsset('rft-560/2-durable-inverter-icon.png'),
  },
  {
    title: 'TOTAL NO FROST',
    description: 'Total no frost',
    image: logoAsset('rft-560/3-total-no-frost-icon.png'),
  },
  {
    title: 'MULTI AIR FLOW',
    description: 'Multi air flow',
    image: logoAsset('rft-560/5-multiair-flow.png'),
  },
  {
    title: 'ELECTRONIC TOUCH CONTROL',
    description: 'Electronic touch control',
    image: logoAsset('rft-560/6-electronic-touch-control.png'),
  },
  {
    title: 'SOFT LED LIGHTING',
    description: 'Soft LED lighting',
    image: logoAsset('rft-560/7-soft-led-lighting.png'),
  },
  {
    title: 'SUPER FREEZE',
    description: 'Super freeze',
    image: logoAsset('rft-560/8-super-freeze.png'),
  },
];

const rfc500FeatureCards: TvFeatureCard[] = [
  {
    title: 'PREMIUM FLAT DOOR DESIGN',
    description: 'Designed with attention to details',
    image: logoAsset('rfc-500/1-premium-flat-door-icon.png'),
  },
  {
    title: 'BIG CAPACITY',
    description: 'Big capacity for more storage space',
    image: logoAsset('rfc-500/2-big-capacity-icon.png'),
    layout: 'inline',
  },
  {
    title: 'METAL COOLING',
    description: 'Cool air in every corner',
    image: logoAsset('rfc-500/3-metal-cooling-icon.png'),
  },
  {
    title: 'MICRO VENTS TECHNOLOGY',
    description: 'Same temperature on every shelf',
    image: logoAsset('rfc-500/4-micro-vents-technology-icon.png'),
  },
  {
    title: 'DURABLE INVERTER',
    description: 'For energy savings and longer lifespan',
    image: logoAsset('rfc-500/5-durable-inverter-icon.png'),
  },
  {
    title: 'MOISTURE FRESH CRISPER',
    description: 'Keep your produce fresh',
    image: logoAsset('rfc-500/6-moisture-fresh-crisper-icon.png'),
  },
  {
    title: 'SLEEK WATER DISPENSER',
    description: 'Always refreshed',
    image: logoAsset('rfc-500/7-sleek-water-dispenser-icon.png'),
  },
];

const rft560Hero = productAsset('rft-560/rft-560-2.png');
const rft560Poster = productAsset('rft-560/rft-560-3.png');
const rft560Gallery = [
  productAsset('rft-560/rft-560-2.png'),
  productAsset('rft-560/rft-560-3.png'),
  productAsset('rft-560/rft-560-4.png'),
  productAsset('rft-560/rft-560-5.png'),
];
const rft560Banner = productAsset('rft-560/top-page-banner.png');

const rfc500Hero = productAsset('rfc-500/rfc-500-1.png');
const rfc500Poster = productAsset('rfc-500/rfc-500-2.png');
const rfc500Gallery = [
  productAsset('rfc-500/rfc-500-1.png'),
  productAsset('rfc-500/rfc-500-2.png'),
  productAsset('rfc-500/rfc-500-3.png'),
  productAsset('rfc-500/rfc-500-4.png'),
  productAsset('rfc-500/rfc-500-5.png'),
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
      text: 'Constant temp keeps things fresh. Thanks to the even distribution of cold air achieved by the Hisense Multi Air Flow System, an optimum temperature is consistently maintained throughout your fridge freezer - keeping food chilled to perfection no matter where it is placed.',
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

const rft560CopyEn = {
  name: 'Hisense RFT-560 Top-Mount Refrigerator',
  tagline: 'Space beyond imagination.',
  description:
    'RFT-560 combines generous capacity with precise cooling, advanced no-frost performance, and flexible storage to keep everything fresh and organized.',
  highlights: [
    'Sleek water dispenser integrated into the flat door.',
    'Durable inverter cooling for stable temperatures and lower energy use.',
    'Total No Frost circulation prevents ice build-up.',
    'Fresh Zone keeps meat and fish at an ideal temperature.',
    'Multi Air Flow distributes cold air evenly.',
  ],
  blocks: {
    featureIntro: {
      title: 'Space beyond imagination',
      text: 'Top-Mount RT Series',
    },
    sleekWaterDispenser: {
      title: 'SLEEK WATER DISPENSER',
      text: 'Our sleek water dispenser seamlessly integrates into the flat door of the refrigerator. Simply fill the water tank with fresh water and enjoy perfectly chilled water anytime.',
    },
    durableInverter: {
      title: 'DURABLE INVERTER',
      text: "Durable Inverter technology adjusts power as needed, keeping your food perfectly chilled while reducing energy consumption. This innovative system saves you money on energy bills and ensures quieter, more stable performance. Enjoy a whisper-quiet kitchen, reduced spending, and a refrigerator that's built to last.",
    },
    totalNoFrost: {
      title: 'TOTAL NO FROST',
      text: "More advanced than traditional frost-free systems, Hisense's innovative Total No Frost Technology circulates cold air throughout the fridge and freezer, preventing ice crystals from forming and eliminating the need for manual defrosting.",
    },
    bigCapacity: {
      title: 'BIG CAPACITY',
      text: 'Enjoy ample storage space in both the fridge and freezer, accommodating any shape or type of food. The doors open wide, providing a clear view of everything at a glance.',
    },
    largeCrisperPlus: {
      title: 'LARGE CRISPER PLUS',
      text: 'The deeper and wider crisper provides ample space to store large quantities of groceries, allowing you to take the supermarket home.',
    },
    premiumDesign: {
      title: 'PREMIUM DESIGN',
      text: 'The premium door and handle, along with the inox panel, perfectly complement this series of refrigerators. They offer a high-quality texture, are easy to clean, and fit seamlessly into any kitchen.',
    },
    counterDepth: {
      title: 'COUNTER DEPTH',
      text: 'The new design of this series, at 600 mm, ensures a perfect fit in your kitchen while offering plenty of flexible storage.',
    },
    freshZone: {
      title: 'FRESH ZONE',
      text: "A separate zone in the upper fridge maintains a constant critical temperature and ideal humidity. This lower temperature zone keeps fish and meat fresh and hygienic for longer, ensuring they are perfectly preserved until it's time to cook.",
    },
    removableTwistIceMaker: {
      title: 'REMOVABLE TWIST ICE MAKER',
      text: 'The detachable Hisense twist ice maker is the perfect accessory for all your small-scale needs. The simple twist feature makes removing the ice from the mold incredibly simple and the dedicated container makes it easy to store.',
    },
    multiAirFlow: {
      title: 'MULTI AIR FLOW',
      text: 'The Multi Air Flow System ensures even distribution of cold air, maintaining an optimal temperature throughout the fridge freezer. This keeps food perfectly chilled, no matter where it is placed.',
    },
    electronicTouchControl: {
      title: 'ELECTRONIC TOUCH CONTROL',
      text: "This user-friendly control lets you easily set the fridge or freezer temperature to suit your food needs. It's clear, easy to reach, and simple to use.",
    },
    softLedLighting: {
      title: 'SOFT LED LIGHTING',
      text: "Illuminate every corner with soft, cool light to help you quickly find food items. The cold light doesn't raise the internal temperature and is environmentally friendly.",
    },
    superFreeze: {
      title: 'SUPER FREEZE',
      text: 'Super Freeze rapidly lowers the freezer temperature, freezing your food faster than usual. This helps lock in the vitamins and nutritional content of food, preserving freshness like when you first bought it and extending the shelf life of your food.',
    },
  },
};

const rft560CopyFa = {
  name: 'یخچال فریزر هایسنس RFT-560',
  tagline: 'فضایی فراتر از تصور.',
  description:
    'RFT-560 با ظرفیت بالا، سرمایش دقیق، عملکرد بدون برفک و فضای ذخیره‌سازی منعطف، تازگی و نظم مواد غذایی را حفظ می‌کند.',
  highlights: [
    'آبریز شیک یکپارچه با درِ تخت.',
    'فناوری اینورتر بادوام با مصرف انرژی کمتر.',
    'سیستم Total No Frost برای جلوگیری از برفک.',
    'ناحیه Fresh Zone برای حفظ تازگی گوشت و ماهی.',
    'جریان هوای چندگانه برای سرمایش یکنواخت.',
  ],
  blocks: {
    featureIntro: {
      title: 'فضایی فراتر از تصور',
      text: 'سری RT فریزر بالا',
    },
    sleekWaterDispenser: {
      title: 'آبریز شیک',
      text: 'آبریز شیک به‌صورت یکپارچه در درِ تخت یخچال ادغام شده است. کافی است مخزن را با آب تازه پر کنید تا هر زمان از آب خنک لذت ببرید.',
    },
    durableInverter: {
      title: 'اینورتر بادوام',
      text: 'فناوری اینورتر بادوام توان را متناسب با نیاز تنظیم می‌کند تا مواد غذایی کاملاً خنک بمانند و مصرف انرژی کاهش یابد. این سیستم نوآورانه هزینه برق را کم کرده و عملکردی آرام‌تر و پایدارتر فراهم می‌کند. نتیجه‌اش آشپزخانه‌ای کم‌صدا، هزینه کمتر و یخچالی ماندگار است.',
    },
    totalNoFrost: {
      title: 'بدون برفک کامل',
      text: 'فناوری نوآورانه Total No Frost هایسنس، هوای سرد را در یخچال و فریزر به گردش درمی‌آورد و از تشکیل کریستال‌های یخ جلوگیری می‌کند؛ بنابراین نیازی به برفک‌زدایی دستی نیست.',
    },
    bigCapacity: {
      title: 'ظرفیت بالا',
      text: 'فضای ذخیره‌سازی گسترده در یخچال و فریزر، برای هر نوع مواد غذایی. درها به‌طور کامل باز می‌شوند تا همه چیز را یکجا ببینید.',
    },
    largeCrisperPlus: {
      title: 'کشوی بزرگ Crisper Plus',
      text: 'کشوی عمیق‌تر و عریض‌تر، فضای کافی برای نگهداری حجم زیاد مواد غذایی فراهم می‌کند تا خرید بزرگ را یکجا در خانه داشته باشید.',
    },
    premiumDesign: {
      title: 'طراحی پریمیوم',
      text: 'در و دستگیره پریمیوم به‌همراه پنل اینوکس، این سری یخچال‌ها را کامل می‌کنند؛ بافتی باکیفیت، تمیزکاری آسان و هماهنگی با هر آشپزخانه.',
    },
    counterDepth: {
      title: 'عمق کانتری',
      text: 'طراحی جدید این سری با عمق ۶۰۰ میلی‌متر، نصب کاملاً هم‌سطح با کابینت را ممکن می‌کند و در عین حال فضای ذخیره‌سازی منعطف فراهم می‌آورد.',
    },
    freshZone: {
      title: 'ناحیه Fresh Zone',
      text: 'ناحیه‌ای مجزا در بخش بالایی یخچال با دمای ثابت و رطوبت ایده‌آل. این ناحیه با دمای پایین‌تر، گوشت و ماهی را برای مدت بیشتری تازه و بهداشتی نگه می‌دارد تا زمان پخت کاملاً سالم بمانند.',
    },
    removableTwistIceMaker: {
      title: 'یخ‌ساز پیچشی قابل جداسازی',
      text: 'یخ‌ساز پیچشی قابل جداسازی هایسنس برای نیازهای روزمره ایده‌آل است. با پیچاندن ساده، یخ‌ها به‌راحتی جدا می‌شوند و محفظه اختصاصی نگهداری یخ را آسان می‌کند.',
    },
    multiAirFlow: {
      title: 'جریان هوای چندگانه',
      text: 'سیستم Multi Air Flow با توزیع یکنواخت هوای سرد، دمای بهینه را در سراسر یخچال‌فریزر حفظ می‌کند تا مواد غذایی در هر قفسه‌ای کاملاً خنک بمانند.',
    },
    electronicTouchControl: {
      title: 'کنترل لمسی الکترونیکی',
      text: 'کنترل کاربرپسند لمسی به شما امکان می‌دهد دمای یخچال یا فریزر را متناسب با نیازتان تنظیم کنید؛ واضح، در دسترس و ساده.',
    },
    softLedLighting: {
      title: 'نورپردازی LED ملایم',
      text: 'با نور ملایم و خنک LED تمام گوشه‌ها روشن می‌شوند تا سریع‌تر مواد غذایی را پیدا کنید. این نور دمای داخلی را بالا نمی‌برد و دوستدار محیط زیست است.',
    },
    superFreeze: {
      title: 'انجماد سریع',
      text: 'انجماد سریع دمای فریزر را به‌سرعت پایین می‌آورد تا مواد غذایی زودتر منجمد شوند. این کار ویتامین‌ها و ارزش غذایی را حفظ کرده و تازگی را مانند روز اول نگه می‌دارد.',
    },
  },
};

const rfc500CopyEn = {
  name: 'Hisense RFC-500 French Door Refrigerator',
  tagline: 'Premium flat-door design with advanced cooling and flexible storage.',
  description:
    'RFC-500 combines a premium flat-door design with advanced cooling technologies, big capacity storage, and practical daily convenience.',
  highlights: [
    'Premium flat door design that fits any kitchen.',
    'Big capacity with four wide-opening doors.',
    'Metal Cooling keeps temperature and humidity consistent.',
    'Micro Vents Technology maintains even cooling on every shelf.',
    'Durable inverter for quieter, efficient performance.',
  ],
  blocks: {
    premiumFlatDoor: {
      title: 'PREMIUM FLAT DOOR DESIGN',
      text: 'Designed with attention to details. With its perfect width and flat doors design, this premium flat door refrigerator fits every kitchen. Seamlessly fits into any kitchen. No chance accidental collisions with protruding surfaces. Premium design and feel.',
    },
    bigCapacity: {
      title: 'BIG CAPACITY',
      text: "Big capacity for more storage space. There's plenty of space in the fridge and freezer to store any shape or type of food. It also has four doors that open out wide, so you can see everything at a glance. Better organization and easier to access. Less trips to the store. Everything is more visible.",
    },
    metalCooling: {
      title: 'METAL COOLING',
      text: 'Cool air in every corner. The innovative fridge has multiple air vents that evenly distribute the cool air in every corner of the fridge. In addition, the rear wall of the fridge is covered in metal, ensuring the cool air is distributed evenly from the inside out. The combination of advanced technology guarantees ideal temperature and humidity levels throughout. Even cooling throughout the refrigerator. Good level of humidity control. More consistent temperature control.',
    },
    microVentsTechnology: {
      title: 'MICRO VENTS TECHNOLOGY',
      text: "Same temperature on every shelf. This smart cooling technology maintains even temperature throughout entire fridge. Small vents on the back column and its sides keep a stable environment inside the compartment, so you can simply place your groceries on whatever shelf you'd like. However, drawers for meat and fresh produce have specially dedicated temperature to keep them fresh for longer. Even cooling throughout the fridge. Locks in nutrients in food faster. Keeps food fresh longer.",
    },
    durableInverter: {
      title: 'DURABLE INVERTER',
      text: "For energy savings and a longer lasting appliance. Modern inverter compressors measure the conditions inside your fridge and adjust the cooling output accordingly, to ensure a stable temperature, save energy and run quieter, while also extending your appliance's lifespan. More consistent refrigerator temperature. Longer appliance lifespan. Quieter operation.",
    },
    moistureFreshCrisper: {
      title: 'MOISTURE - FRESH CRISPER',
      text: "Keep your produce fresh with just the right humidity. Fruit and vegetable box has a moisture adjustable system, which you regulate manually to meet different food's storage requirements in order to keep it fresh for longer time. Prolonged freshness. Preservation of nutritional properties. Freshly hydrated food.",
    },
    sleekWaterDispenser: {
      title: 'SLEEK WATER DISPENSER',
      text: 'Always refreshed. A sleek water dispenser that seamlessly integrated to the flat door of the refrigerator. Just pour fresh water in the water tank and enjoy it perfectly chilled, anytime. Constantly freshly chilled water. Cool - sleek design. Easy and quick function.',
    },
  },
};

const rfc500CopyFa = {
  name: 'یخچال فریزر هایسنس RFC-500',
  tagline: 'طراحی تخت پریمیوم با سرمایش پیشرفته و فضای ذخیره‌سازی منعطف.',
  description:
    'RFC-500 با طراحی تخت پریمیوم، فناوری‌های سرمایش پیشرفته، ظرفیت بالا و امکانات کاربردی روزانه، تجربه‌ای مدرن برای نگهداری مواد غذایی فراهم می‌کند.',
  highlights: [
    'طراحی تخت پریمیوم هماهنگ با هر آشپزخانه.',
    'ظرفیت بالا با چهار درب عریض.',
    'Metal Cooling برای پایداری دما و رطوبت.',
    'Micro Vents Technology برای سرمایش یکنواخت در هر طبقه.',
    'اینورتر بادوام برای عملکرد کم‌مصرف و کم‌صدا.',
  ],
  blocks: {
    premiumFlatDoor: {
      title: 'طراحی درِ تخت پریمیوم',
      text: 'طراحی با دقت بالا. با پهنای مناسب و درهای تخت، این یخچال‌فریزر در هر آشپزخانه‌ای به‌خوبی می‌نشیند. هماهنگی کامل با فضای آشپزخانه. بدون برخورد ناخواسته با سطوح بیرون‌زده. طراحی و حس پریمیوم.',
    },
    bigCapacity: {
      title: 'ظرفیت بالا',
      text: 'ظرفیت بالا برای فضای ذخیره‌سازی بیشتر. فضای کافی در یخچال و فریزر برای هر شکل و نوع مواد غذایی وجود دارد. چهار درب عریض با بازشوی کامل، دید یکپارچه به همه چیز را فراهم می‌کند. نظم بهتر و دسترسی آسان‌تر. رفت‌وآمد کمتر برای خرید. دید بهتر به محتویات.',
    },
    metalCooling: {
      title: 'خنک‌سازی فلزی',
      text: 'هوای خنک در هر گوشه. این یخچال با دریچه‌های متعدد، هوای خنک را در تمام بخش‌ها پخش می‌کند. همچنین دیواره پشتی فلزی باعث توزیع یکنواخت سرما از داخل به بیرون می‌شود. ترکیب این فناوری‌ها دما و رطوبت ایده‌آل را در تمام فضا حفظ می‌کند. سرمایش یکنواخت در کل یخچال. کنترل رطوبت مناسب. پایداری بیشتر دما.',
    },
    microVentsTechnology: {
      title: 'فناوری Micro Vents',
      text: 'دمای یکسان در تمام طبقات. این فناوری هوشمند، دمای یکنواخت را در کل یخچال حفظ می‌کند. دریچه‌های کوچک در ستون پشتی و کناره‌ها محیطی پایدار ایجاد می‌کنند تا مواد غذایی را روی هر طبقه‌ای قرار دهید. کشوهای گوشت و سبزیجات نیز دمای اختصاصی دارند تا مدت بیشتری تازه بمانند. سرمایش یکنواخت در سراسر یخچال. حفظ سریع‌تر مواد مغذی. ماندگاری بیشتر تازگی.',
    },
    durableInverter: {
      title: 'اینورتر بادوام',
      text: 'برای صرفه‌جویی در انرژی و طول عمر بیشتر دستگاه. کمپرسورهای اینورتر مدرن شرایط داخل یخچال را سنجیده و خروجی سرمایش را تنظیم می‌کنند تا دما پایدار بماند، مصرف انرژی کاهش یابد و صدای عملکرد کمتر شود؛ همچنین طول عمر دستگاه افزایش می‌یابد. دمای یکنواخت‌تر. عمر مفید بیشتر. عملکرد کم‌صدا.',
    },
    moistureFreshCrisper: {
      title: 'کشوی رطوبت‌دار Fresh Crisper',
      text: 'تازگی میوه و سبزیجات با رطوبت مناسب. کشوی میوه و سبزی دارای سیستم تنظیم رطوبت است که به‌صورت دستی تنظیم می‌شود تا شرایط نگهداری برای هر نوع ماده غذایی فراهم شود و مدت بیشتری تازه بمانند. تازگی طولانی‌تر. حفظ ارزش غذایی. مواد غذایی با رطوبت مناسب.',
    },
    sleekWaterDispenser: {
      title: 'آبریز شیک',
      text: 'همیشه تازه. آبریز شیک به‌صورت یکپارچه در درِ تخت یخچال ادغام شده است. فقط مخزن را با آب تازه پر کنید تا هر زمان آب خنک در دسترس باشد. آب خنک همیشه تازه. طراحی شیک و خنک. عملکرد سریع و آسان.',
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
  {
    id: 'rft-560',
    sku: 'RFT-560',
    series: 'RFT-560',
    seriesLabel: 'Top-Mount RT Series',
    panel: '',
    resolution: '',
    refreshRate: '',
    os: '',
    sound: '',
    connectivity: [],
    tuner: '',
    extras: ['Sleek Water Dispenser', 'Durable Inverter', 'Total No Frost'],
    availableColors: {
      en: ['White', 'Silver'],
      fa: ['سفید', 'نقره‌ای'],
    },
    image: rft560Hero,
    posterImage: rft560Poster,
    topBanner: rft560Banner,
    gallery: rft560Gallery,
    featureCards: rft560FeatureCards,
    sectionGroups: [
      {
        kind: 'content',
        sections: [
          {
            image: productAsset('rft-560/1-sleek-water-dispenser.png'),
            copyKey: 'sleekWaterDispenser',
          },
          { image: productAsset('rft-560/2-durable-inverter.png'), copyKey: 'durableInverter' },
          { image: productAsset('rft-560/3-total-no-frost.png'), copyKey: 'totalNoFrost' },
        ],
      },
      {
        kind: 'overlay',
        sections: [
          { image: productAsset('rft-560/4-big-capacity.png'), copyKey: 'bigCapacity' },
          { image: productAsset('rft-560/5-large-crisper-plus.png'), copyKey: 'largeCrisperPlus' },
        ],
      },
      {
        kind: 'stacked',
        textFirst: true,
        sections: [
          { image: productAsset('rft-560/6-premium-design.png'), copyKey: 'premiumDesign' },
        ],
      },
      {
        kind: 'overlay',
        sections: [{ image: productAsset('rft-560/7-counter-depth.png'), copyKey: 'counterDepth' }],
      },
      {
        kind: 'content',
        sections: [
          { image: productAsset('rft-560/8-fresh-zone.png'), copyKey: 'freshZone' },
          {
            image: productAsset('rft-560/9-removeable-twist-ice-maker.jpg'),
            copyKey: 'removableTwistIceMaker',
          },
          { image: productAsset('rft-560/10-multi-air-flow.png'), copyKey: 'multiAirFlow' },
        ],
      },
      {
        kind: 'overlay',
        sections: [
          {
            image: productAsset('rft-560/11-electronic-touch-control.png'),
            copyKey: 'electronicTouchControl',
          },
          { image: productAsset('rft-560/12-soft-led-lighting.png'), copyKey: 'softLedLighting' },
          { image: productAsset('rft-560/13-super-freeze.png'), copyKey: 'superFreeze' },
        ],
      },
    ],
    specs: {
      en: [
        'Super Freeze',
        'Water dispenser',
        'No-frost system',
        'Digital display',
        'Adjustable shelves',
        'Automatic defrost system',
        'Self-diagnostic system',
        'Multi-air flow circulation',
        'Uniform cabinet lighting',
        'Easy-access drawers',
        'Height (cm): 185',
        'Width (cm): 80',
        'Depth (cm): 68',
        'Net weight (kg): 79',
        'Net fridge capacity (L): 431',
        'Net freezer capacity (L): 117',
        'Refrigerant: R600a',
      ],
      fa: [
        'انجماد سریع',
        'مجهز به آبریز',
        'سیستم بدون برفک',
        'صفحه نمایش دیجیتال',
        'قابلیت جابجایی طبقات',
        'سیستم یخ‌زدایی خودکار',
        'سیستم عیب‌یابی خودکار',
        'سیستم گردش هوا در طبقات',
        'نور یکنواخت در فضای کابین یخچال',
        'قابلیت دسترسی سریع و آسان به مواد غذایی در کشو',
        'ارتفاع (cm): 185',
        'پهنا (cm): 80',
        'عمق (cm): 68',
        'وزن خالص (kg): 79',
        'ظرفیت خالص یخچال (L): 431',
        'ظرفیت خالص فریزر (L): 117',
        'گاز مبرد: R600a',
      ],
    },
    copy: {
      en: rft560CopyEn,
      fa: rft560CopyFa,
    },
  },
  {
    id: 'rfc500',
    sku: 'RFC500',
    series: 'RFC500',
    seriesLabel: 'RFC-500 French Door',
    panel: '',
    resolution: '',
    refreshRate: '',
    os: '',
    sound: '',
    connectivity: [],
    tuner: '',
    extras: ['Premium Flat Door Design', 'Big Capacity', 'Metal Cooling'],
    image: rfc500Hero,
    posterImage: rfc500Poster,
    gallery: rfc500Gallery,
    availableColors: {
      en: ['White', 'Silver'],
      fa: ['سفید', 'نقره‌ای'],
    },
    featureCards: rfc500FeatureCards,
    sectionGroups: [
      {
        kind: 'stacked',
        textFirst: true,
        sections: [
          { image: productAsset('rfc-500/1-premium-flat-door.jpg'), copyKey: 'premiumFlatDoor' },
        ],
      },
      {
        kind: 'overlay',
        sections: [
          {
            image: productAsset('rfc-500/2-big-capacity.jpg'),
            copyKey: 'bigCapacity',
            textPosition: 'right',
          },
          { image: productAsset('rfc-500/3-metal-cooling.jpg'), copyKey: 'metalCooling' },
        ],
      },
      {
        kind: 'content',
        sections: [
          {
            image: productAsset('rfc-500/4-micro-vents-technology.jpg'),
            copyKey: 'microVentsTechnology',
          },
          { image: productAsset('rfc-500/5-durable-inverter.jpg'), copyKey: 'durableInverter' },
          {
            image: productAsset('rfc-500/6-moisture-fresh-crisper.jpg'),
            copyKey: 'moistureFreshCrisper',
          },
          {
            image: productAsset('rfc-500/7-sleek-water-dispenser.jpg'),
            copyKey: 'sleekWaterDispenser',
          },
        ],
      },
    ],
    specs: {
      fa: [
        'انجماد سریع',
        'مجهز به آبریز',
        'سیستم بدون برفک',
        'قابلیت جابجایی طبقات',
        'سیستم یخ زدایی خودکار',
        'سیستم عیب یابی خودکار',
        'سیستم گردش هوا در طبقات',
        'نور یکنواخت در فضای کابین یخچال',
        'قابلیت دسترسی سریع و آسان به مواد غذایی در کشو',
        'ارتفاع (cm): 173',
        'پهنا (cm): 80',
        'عمق (cm): 70',
        'وزن خاص یخچال (kg): 86',
        'ظرفیت خالص یخچال (L): 353',
        'ظرفیت خالص فریزر (L): 147',
        'گاز مبرد: R600a',
      ],
      en: [
        'Super freeze',
        'Water dispenser',
        'No-frost system',
        'Adjustable shelves',
        'Automatic defrost system',
        'Self-diagnostic system',
        'Multi-air flow circulation',
        'Uniform cabinet lighting',
        'Easy-access drawers',
        'Height (cm): 173',
        'Width (cm): 80',
        'Depth (cm): 70',
        'Net weight (kg): 86',
        'Net fridge capacity (L): 353',
        'Net freezer capacity (L): 147',
        'Refrigerant: R600a',
      ],
    },
    copy: {
      en: rfc500CopyEn,
      fa: rfc500CopyFa,
    },
  },
  createPlaceholder('rfc300', 'RFC300', productAsset('rfc-300/bd_96_product_image_1_1.png')),
  createPlaceholder('twin270-370', 'Twin 270-370', productAsset('banner/refrigerator-no-2.webp')),
  createPlaceholder('fc-310', 'FC-310', productAsset('fc-310/product_image_1.png')),
  createPlaceholder('fc-210', 'FC-210', productAsset('fc-210/product_image_1.jpg')),
];
