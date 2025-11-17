export const NAV_ITEMS = [
  { key: 'tvAudio', href: '#tv-audio' },
  { key: 'airConditioner', href: '#air-conditioner' },
  { key: 'homeAppliances', href: '#home-appliances' },
  { key: 'dcode', href: '#dcode' },
] as const;

export const NAV_SECONDARY_ITEMS = [
  { key: 'about', href: '#about' },
  { key: 'support', href: '#support' },
] as const;

export type NavKey =
  | (typeof NAV_ITEMS)[number]['key']
  | (typeof NAV_SECONDARY_ITEMS)[number]['key'];

export type SubMenuItem = {
  title: string;
  description: string;
};

export const SUB_MENU_CONTENT: Record<NavKey, SubMenuItem[]> = {
  tvAudio: [
    {
      title: 'Hisense TV (LED)',
      description: 'Mini-LED, ULED و Laser TV برای تجربه تصویری جهانی.',
    },
  ],
  airConditioner: [
    {
      title: 'Hisense Residential Air Conditioner',
      description: 'اسپلیت و کولر گازی‌های خانگی با کنترل هوشمند و برچسب انرژی A.',
    },
    {
      title: 'Hisense Commercial Air Conditioner',
      description: 'راهکارهای VRF و داکت‌اسپلیت صنعتی برای پروژه‌های بزرگ.',
    },
  ],
  homeAppliances: [
    {
      title: 'Hisense Refrigerator & Freezer',
      description: 'یخچال، فریزر و ساید بای ساید با تکنولوژی Total No-Frost.',
    },
    {
      title: 'Hisense Washing Machine',
      description: 'ماشین لباسشویی با بخار ضدآلرژی و موتور اینورتر سایلنت.',
    },
  ],
  dcode: [
    {
      title: "D'CODE TV (LED)",
      description: "تلویزیون‌های هوشمند D'CODE با رابط کاربری بومی‌سازی شده.",
    },
  ],
  about: [
    { title: 'Our Story', description: 'A legacy of innovation since 1969.' },
    { title: 'Sustainability', description: 'Responsible manufacturing and design.' },
    { title: 'Careers', description: 'Join a global team shaping the future.' },
  ],
  support: [
    { title: 'Register Product', description: 'Unlock benefits, tips, and tailored updates.' },
    { title: 'Service & Repairs', description: 'Book authorized service visits with ease.' },
    { title: 'Manuals & FAQs', description: 'Find quick answers for every device.' },
  ],
};
