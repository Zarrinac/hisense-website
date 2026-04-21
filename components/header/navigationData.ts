import type { Locale } from '@/i18n/routing';

// Navigation structure and localized submenu copy used by Header.

export const NAV_ITEMS = [
  { key: 'tvAudio', href: '/products/tvs' },
  { key: 'airConditioner', href: '/rac' },
  { key: 'homeAppliances', href: '/refrigerator' },
] as const;

export const NAV_SECONDARY_ITEMS = [
  { key: 'about', href: '/about' },
  { key: 'support', href: '/contact-us' },
] as const;

export type NavKey =
  | (typeof NAV_ITEMS)[number]['key']
  | (typeof NAV_SECONDARY_ITEMS)[number]['key'];

type LocalizedText = Record<Locale, string>;

export type SubMenuItem = {
  title: LocalizedText;
  description: LocalizedText;
  href: string;
};

export const SUB_MENU_CONTENT: Record<NavKey, SubMenuItem[]> = {
  tvAudio: [
    {
      title: { en: 'Hisense TV (LED)', fa: 'تلویزیون هایسنس (LED)' },
      description: {
        en: 'Mini-LED, ULED, and Laser TV lines for a world-class viewing experience.',
        fa: 'تلویزیون‌های Mini-LED، ULED و Laser برای تجربه تصویری جهانی.',
      },
      href: '/products/tvs',
    },
  ],
  airConditioner: [
    {
      title: { en: 'Hisense Residential Air Conditioner', fa: 'کولر گازی خانگی هایسنس' },
      description: {
        en: 'Smart split ACs with AI controls and energy efficiency label A.',
        fa: 'اسپلیت‌های خانگی با کنترل هوشمند و برچسب انرژی A.',
      },
      href: '/rac',
    },
    {
      title: { en: 'Hisense Commercial Air Conditioner', fa: 'تهویه مطبوع تجاری هایسنس' },
      description: {
        en: 'VRF and ducted HVAC systems engineered for large commercial projects.',
        fa: 'راهکارهای VRF و داکت‌اسپلیت صنعتی برای پروژه‌های بزرگ.',
      },
      href: '/cac',
    },
  ],
  homeAppliances: [
    {
      title: { en: 'Hisense Refrigerator & Freezer', fa: 'یخچال و فریزر هایسنس' },
      description: {
        en: 'Refrigerators, freezers, and side-by-sides powered by Total No-Frost technology.',
        fa: 'یخچال، فریزر و ساید بای ساید با تکنولوژی Total No-Frost.',
      },
      href: '/refrigerator',
    },
    {
      title: { en: 'Hisense Washing Machine', fa: 'ماشین لباسشویی هایسنس' },
      description: {
        en: 'Steam-care washing machines with silent inverter motors.',
        fa: 'ماشین‌های لباسشویی با بخار ضدآلرژی و موتور اینورتر سایلنت.',
      },
      href: '/products/wms',
    },
  ],
  about: [
    {
      title: { en: 'Our Story', fa: 'داستان ما' },
      description: {
        en: 'A legacy of innovation since 1969.',
        fa: 'میراثی از نوآوری از سال ۱۹۶۹.',
      },
      href: '/about',
    },
    {
      title: { en: 'Sustainability', fa: 'پایداری' },
      description: {
        en: 'Responsible manufacturing and design.',
        fa: 'تولید و طراحی مسئولانه.',
      },
      href: '/about',
    },
    {
      title: { en: 'Careers', fa: 'فرصت‌های شغلی' },
      description: {
        en: 'Join a global team shaping the future.',
        fa: 'به تیم جهانی ما بپیوندید و آینده را بسازید.',
      },
      href: '/about',
    },
  ],
  support: [
    {
      title: { en: 'Register Product', fa: 'ثبت محصول' },
      description: {
        en: 'Unlock benefits, tips, and tailored updates.',
        fa: 'مزایا، نکات و به‌روزرسانی‌های اختصاصی را فعال کنید.',
      },
      href: '/portal',
    },
    {
      title: { en: 'Repair & Support', fa: 'خدمات تعمیر و پشتیبانی' },
      description: {
        en: 'Book official service, support, and repair with certified technicians.',
        fa: 'ثبت درخواست خدمات، پشتیبانی و تعمیر رسمی با تکنسین‌های آموزش‌دیده.',
      },
      href: '/hisense-repair',
    },
    {
      title: { en: 'Complaint form', fa: 'فرم شکایت' },
      description: {
        en: 'Submit a service, warranty, or product complaint for official follow-up.',
        fa: 'برای خدمات، گارانتی یا کیفیت محصول، شکایت خود را برای پیگیری رسمی ثبت کنید.',
      },
      href: '/complaint',
    },
    {
      title: { en: 'Contact us', fa: 'تماس با ما' },
      description: {
        en: 'Reach our team for service, warranty, or sales questions.',
        fa: 'برای خدمات، گارانتی یا سوالات فروش با ما در ارتباط باشید.',
      },
      href: '/contact-us',
    },
    {
      title: { en: 'Manuals & FAQs', fa: 'دفترچه‌ها و سوالات متداول' },
      description: {
        en: 'Find quick answers for every device.',
        fa: 'پاسخ سریع برای هر دستگاه را پیدا کنید.',
      },
      href: '/faq',
    },
  ],
};
