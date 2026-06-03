import type { Locale } from '@/i18n/routing';

// Keyword-targeted SEO copy + FAQs for product category pages. The site
// currently ranks for brand/company terms but not product queries
// ("تلویزیون هایسنس", "کولر گازی هایسنس", "قیمت", "خرید"); this indexable text
// and FAQ schema gives Google product-intent content to rank.
//
// TODO (content): this is starter copy — refine wording, add real model names,
// prices/availability, and expand FAQs. Keep the target keywords in the text.

export type CategorySeoFaq = { question: string; answer: string };

export type CategorySeoContent = {
  heading: string;
  paragraphs: string[];
  faqHeading: string;
  faqs: CategorySeoFaq[];
};

export type CategorySeoKey = 'tvs' | 'rac' | 'cac' | 'wms' | 'refrigerator';

export const CATEGORY_SEO_CONTENT: Record<CategorySeoKey, Record<Locale, CategorySeoContent>> = {
  tvs: {
    fa: {
      heading: 'خرید تلویزیون هایسنس؛ راهنمای مدل‌ها و فناوری‌ها',
      paragraphs: [
        'تلویزیون‌های هایسنس با فناوری‌های ULED، Mini-LED و QLED و سیستم‌عامل VIDAA، تصویری روشن با کنتراست بالا را در اندازه‌های مختلف ارائه می‌دهند. در این صفحه می‌توانید جدیدترین مدل‌های تلویزیون هایسنس از جمله سری‌های U7، U8 و A را با مشخصات کامل مقایسه و بررسی کنید.',
        'زرین نمای کاسپین به عنوان نمایندگی رسمی هایسنس در ایران، عرضه تلویزیون اصل به همراه گارانتی رسمی و خدمات پس از فروش سراسری را تضمین می‌کند. برای انتخاب بهترین تلویزیون متناسب با بودجه و فضای خود، مشخصات فنی و امکانات هر مدل را در صفحه محصول مشاهده کنید.',
      ],
      faqHeading: 'سوالات متداول درباره تلویزیون هایسنس',
      faqs: [
        {
          question: 'تلویزیون هایسنس گارانتی رسمی دارد؟',
          answer:
            'بله، تمامی تلویزیون‌های هایسنس عرضه‌شده توسط زرین نمای کاسپین دارای گارانتی رسمی و خدمات پس از فروش سراسری در ایران هستند.',
        },
        {
          question: 'تفاوت فناوری ULED و Mini-LED هایسنس چیست؟',
          answer:
            'فناوری ULED مجموعه‌ای از بهینه‌سازی‌های تصویر هایسنس برای رنگ و کنتراست بهتر است و Mini-LED با نورپردازی پشتی دقیق‌تر، کنتراست و روشنایی بالاتری ارائه می‌دهد.',
        },
        {
          question: 'سیستم‌عامل تلویزیون‌های هایسنس چیست؟',
          answer:
            'بیشتر تلویزیون‌های هوشمند هایسنس از سیستم‌عامل VIDAA بهره می‌برند که دسترسی سریع به سرویس‌های پخش محتوا و اپلیکیشن‌ها را فراهم می‌کند.',
        },
        {
          question: 'نزدیک‌ترین نمایندگی خدمات هایسنس را چگونه پیدا کنم؟',
          answer:
            'از صفحه «یافتن نمایندگی خدمات» می‌توانید بر اساس استان و شهر، نزدیک‌ترین نماینده مجاز خدمات هایسنس را پیدا کنید.',
        },
      ],
    },
    en: {
      heading: 'Hisense TVs: models, technologies, and buying guide',
      paragraphs: [
        'Hisense televisions use ULED, Mini-LED, and QLED technologies with the VIDAA operating system to deliver bright, high-contrast images across a wide range of sizes. Compare the latest Hisense TV models, including the U7, U8, and A series, with full specifications on this page.',
        'As the official Hisense representative in Iran, Zarrin Namaye Caspian supplies genuine TVs with an official warranty and nationwide after-sales service. Review the technical specs and features of each model to choose the best TV for your space and budget.',
      ],
      faqHeading: 'Frequently asked questions about Hisense TVs',
      faqs: [
        {
          question: 'Do Hisense TVs come with an official warranty?',
          answer:
            'Yes. Every Hisense TV supplied by Zarrin Namaye Caspian includes an official warranty and nationwide after-sales service in Iran.',
        },
        {
          question: 'What is the difference between Hisense ULED and Mini-LED?',
          answer:
            'ULED is Hisense’s suite of picture-quality enhancements for better color and contrast, while Mini-LED uses finer backlight control for higher contrast and brightness.',
        },
        {
          question: 'Which operating system do Hisense smart TVs use?',
          answer:
            'Most Hisense smart TVs run the VIDAA operating system, which provides fast access to streaming services and apps.',
        },
      ],
    },
  },
  rac: {
    fa: {
      heading: 'کولر گازی و اسپلیت هایسنس؛ سرمایش کم‌مصرف',
      paragraphs: [
        'کولرهای گازی و اسپلیت هایسنس با فناوری اینورتر، مصرف انرژی کمتر و سرمایش سریع را ارائه می‌دهند. در این صفحه مدل‌های سری HIH و HRH هایسنس را با ظرفیت‌های مختلف برای انتخاب متناسب با متراژ فضای خود مقایسه کنید.',
        'تمامی اسپلیت‌های هایسنس از طریق زرین نمای کاسپین با گارانتی رسمی و خدمات پس از فروش سراسری عرضه می‌شوند. برای مشاهده مشخصات فنی، ظرفیت (BTU) و امکانات هر مدل، وارد صفحه محصول شوید.',
      ],
      faqHeading: 'سوالات متداول درباره کولر گازی هایسنس',
      faqs: [
        {
          question: 'کولر گازی اینورتر هایسنس چه مزیتی دارد؟',
          answer:
            'فناوری اینورتر با تنظیم پیوسته دور کمپرسور، مصرف برق را کاهش می‌دهد، سرمایش پایدارتری ایجاد می‌کند و صدای کارکرد دستگاه را کم می‌کند.',
        },
        {
          question: 'چه ظرفیتی از کولر گازی هایسنس برای فضای من مناسب است؟',
          answer:
            'ظرفیت مناسب به متراژ و شرایط فضا بستگی دارد؛ مدل‌های ۹۰۰۰ تا ۳۰۰۰۰ BTU برای فضاهای کوچک تا بزرگ ارائه می‌شوند. برای انتخاب دقیق با کارشناسان ما تماس بگیرید.',
        },
        {
          question: 'کولر گازی هایسنس گارانتی دارد؟',
          answer:
            'بله، اسپلیت‌های هایسنس با گارانتی رسمی و خدمات پس از فروش سراسری زرین نمای کاسپین عرضه می‌شوند.',
        },
      ],
    },
    en: {
      heading: 'Hisense air conditioners and split units: efficient cooling',
      paragraphs: [
        'Hisense residential air conditioners and split units use inverter technology for lower energy consumption and fast cooling. Compare the Hisense HIH and HRH series across capacities to match the size of your space.',
        'All Hisense split units are supplied through Zarrin Namaye Caspian with an official warranty and nationwide after-sales service. Open a product page to see technical specs, BTU capacity, and features for each model.',
      ],
      faqHeading: 'Frequently asked questions about Hisense air conditioners',
      faqs: [
        {
          question: 'What are the benefits of a Hisense inverter air conditioner?',
          answer:
            'Inverter technology continuously adjusts compressor speed to reduce power consumption, deliver more stable cooling, and run more quietly.',
        },
        {
          question: 'Which Hisense AC capacity suits my room?',
          answer:
            'The right capacity depends on room size and conditions; models from 9,000 to 30,000 BTU cover small to large spaces. Contact our team for an exact recommendation.',
        },
        {
          question: 'Do Hisense air conditioners include a warranty?',
          answer:
            'Yes, Hisense split units are supplied with an official warranty and nationwide after-sales service from Zarrin Namaye Caspian.',
        },
      ],
    },
  },
  cac: {
    fa: {
      heading: 'تهویه مطبوع تجاری و کانالی هایسنس',
      paragraphs: [
        'راهکارهای تهویه مطبوع تجاری (CAC) هایسنس شامل سیستم‌های کانالی و داکت‌اسپلیت برای فضاهای اداری، تجاری و صنعتی است. این سیستم‌ها سرمایش و گرمایش یکنواخت را در فضاهای بزرگ با بازدهی بالا فراهم می‌کنند.',
        'زرین نمای کاسپین مشاوره، تأمین و خدمات پس از فروش سیستم‌های تهویه تجاری هایسنس را در سراسر ایران ارائه می‌دهد. برای انتخاب راهکار مناسب پروژه خود، مشخصات مدل‌های کانالی هایسنس را بررسی کنید.',
      ],
      faqHeading: 'سوالات متداول درباره تهویه مطبوع تجاری هایسنس',
      faqs: [
        {
          question: 'سیستم تهویه مطبوع تجاری هایسنس برای چه فضاهایی مناسب است؟',
          answer:
            'سیستم‌های CAC هایسنس برای فضاهای بزرگ مانند ساختمان‌های اداری، فروشگاه‌ها، رستوران‌ها و مجموعه‌های صنعتی که به سرمایش و گرمایش یکپارچه نیاز دارند مناسب هستند.',
        },
        {
          question: 'آیا برای سیستم‌های کانالی هایسنس خدمات نصب ارائه می‌شود؟',
          answer:
            'بله، زرین نمای کاسپین مشاوره فنی، تأمین تجهیزات و خدمات پس از فروش سیستم‌های تهویه تجاری هایسنس را ارائه می‌دهد.',
        },
      ],
    },
    en: {
      heading: 'Hisense commercial and ducted air conditioning',
      paragraphs: [
        'Hisense commercial air conditioning (CAC) solutions include ducted and duct-split systems for office, retail, and industrial spaces, delivering uniform, high-efficiency cooling and heating across large areas.',
        'Zarrin Namaye Caspian provides consultation, supply, and after-sales service for Hisense commercial HVAC systems across Iran. Review the ducted model specifications to choose the right solution for your project.',
      ],
      faqHeading: 'Frequently asked questions about Hisense commercial HVAC',
      faqs: [
        {
          question: 'What spaces are Hisense commercial HVAC systems suited for?',
          answer:
            'Hisense CAC systems suit large spaces such as office buildings, stores, restaurants, and industrial facilities that require integrated cooling and heating.',
        },
        {
          question: 'Is installation support available for Hisense ducted systems?',
          answer:
            'Yes, Zarrin Namaye Caspian provides technical consultation, equipment supply, and after-sales service for Hisense commercial HVAC systems.',
        },
      ],
    },
  },
  wms: {
    fa: {
      heading: 'ماشین لباسشویی هایسنس؛ شست‌وشوی کم‌مصرف و بی‌صدا',
      paragraphs: [
        'ماشین‌های لباسشویی هایسنس با موتور اینورتر، برنامه‌های شست‌وشوی متنوع و فناوری بخار، شست‌وشویی مؤثر همراه با مصرف کم آب و انرژی ارائه می‌دهند. در این صفحه مدل‌های لباسشویی هایسنس را با ظرفیت و امکانات مختلف مقایسه کنید.',
        'تمامی ماشین‌های لباسشویی هایسنس از طریق زرین نمای کاسپین با گارانتی رسمی و خدمات پس از فروش سراسری عرضه می‌شوند. برای مشاهده ظرفیت، دور موتور و برنامه‌های شست‌وشوی هر مدل وارد صفحه محصول شوید.',
      ],
      faqHeading: 'سوالات متداول درباره ماشین لباسشویی هایسنس',
      faqs: [
        {
          question: 'موتور اینورتر در ماشین لباسشویی هایسنس چه مزیتی دارد؟',
          answer:
            'موتور اینورتر صدای کمتر، دوام بیشتر و مصرف انرژی پایین‌تری دارد و امکان تنظیم دقیق دور موتور را در برنامه‌های مختلف فراهم می‌کند.',
        },
        {
          question: 'ماشین لباسشویی هایسنس گارانتی رسمی دارد؟',
          answer:
            'بله، ماشین‌های لباسشویی هایسنس با گارانتی رسمی و خدمات پس از فروش سراسری زرین نمای کاسپین عرضه می‌شوند.',
        },
      ],
    },
    en: {
      heading: 'Hisense washing machines: efficient, quiet laundry',
      paragraphs: [
        'Hisense washing machines combine inverter motors, varied wash programs, and steam technology for effective cleaning with low water and energy use. Compare Hisense washer models across capacities and features on this page.',
        'All Hisense washing machines are supplied through Zarrin Namaye Caspian with an official warranty and nationwide after-sales service. Open a product page to see capacity, spin speed, and wash programs for each model.',
      ],
      faqHeading: 'Frequently asked questions about Hisense washing machines',
      faqs: [
        {
          question: 'What are the benefits of an inverter motor in a Hisense washer?',
          answer:
            'Inverter motors run more quietly, last longer, use less energy, and allow precise spin-speed control across wash programs.',
        },
        {
          question: 'Do Hisense washing machines include an official warranty?',
          answer:
            'Yes, Hisense washing machines are supplied with an official warranty and nationwide after-sales service from Zarrin Namaye Caspian.',
        },
      ],
    },
  },
  refrigerator: {
    fa: {
      heading: 'یخچال فریزر هایسنس؛ فضای بیشتر و نگهداری بهتر',
      paragraphs: [
        'یخچال فریزرهای هایسنس با فناوری No Frost، کمپرسور اینورتر و سیستم گردش هوای چندگانه، دمای یکنواخت و ماندگاری بیشتر مواد غذایی را تضمین می‌کنند. در این صفحه مدل‌های ساید بای ساید، دوقلو و کمبی هایسنس را با ظرفیت‌های مختلف مقایسه کنید.',
        'یخچال فریزرهای هایسنس از طریق زرین نمای کاسپین با گارانتی رسمی و خدمات پس از فروش سراسری عرضه می‌شوند. برای مشاهده ظرفیت، ابعاد و امکانات هر مدل وارد صفحه محصول شوید.',
      ],
      faqHeading: 'سوالات متداول درباره یخچال فریزر هایسنس',
      faqs: [
        {
          question: 'فناوری No Frost در یخچال هایسنس چیست؟',
          answer:
            'فناوری No Frost با گردش هوای سرد از تشکیل برفک جلوگیری می‌کند و نیاز به یخ‌زدایی دستی را از بین می‌برد و دمای یکنواخت‌تری ایجاد می‌کند.',
        },
        {
          question: 'یخچال فریزر هایسنس گارانتی رسمی دارد؟',
          answer:
            'بله، یخچال فریزرهای هایسنس با گارانتی رسمی و خدمات پس از فروش سراسری زرین نمای کاسپین عرضه می‌شوند.',
        },
      ],
    },
    en: {
      heading: 'Hisense refrigerators: more space, fresher food',
      paragraphs: [
        'Hisense refrigerators use No Frost technology, inverter compressors, and multi-air flow to keep temperatures even and food fresher for longer. Compare Hisense side-by-side, twin, and combi models across capacities on this page.',
        'Hisense refrigerators are supplied through Zarrin Namaye Caspian with an official warranty and nationwide after-sales service. Open a product page to see capacity, dimensions, and features for each model.',
      ],
      faqHeading: 'Frequently asked questions about Hisense refrigerators',
      faqs: [
        {
          question: 'What is No Frost technology in a Hisense refrigerator?',
          answer:
            'No Frost circulates cold air to prevent frost build-up, removes the need for manual defrosting, and maintains a more even temperature.',
        },
        {
          question: 'Do Hisense refrigerators include an official warranty?',
          answer:
            'Yes, Hisense refrigerators are supplied with an official warranty and nationwide after-sales service from Zarrin Namaye Caspian.',
        },
      ],
    },
  },
};
