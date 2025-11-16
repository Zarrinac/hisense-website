export const NAV_ITEMS = [
  { key: 'tvAudio', href: '#tv-audio' },
  { key: 'airConditioner', href: '#air-conditioner' },
  { key: 'homeAppliances', href: '#home-appliances' },
  { key: 'b2b', href: '#b2b' },
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
    { title: 'Mini-LED & ULED TVs', description: 'Flagship picture powered by Hi-View Engine.' },
    { title: 'Laser TV & Projectors', description: 'Cinematic scale with remarkable detail.' },
    { title: 'Soundbars', description: 'Immersive Dolby Atmos audio for every space.' },
  ],
  airConditioner: [
    { title: 'Split Systems', description: 'Cooling and heating built for comfort.' },
    { title: 'Portable AC', description: 'Flexible climate control that moves with you.' },
    { title: 'Commercial HVAC', description: 'High-capacity systems for large venues.' },
  ],
  homeAppliances: [
    { title: 'Refrigeration', description: 'EvenTemp cooling to keep food fresher.' },
    { title: 'Laundry', description: 'Washers and dryers with Allergy Steam cycles.' },
    { title: 'Dishwashers', description: 'Efficient cleaning with Deep Clean Spray Arm.' },
  ],
  b2b: [
    { title: 'Professional Displays', description: 'LED walls and signage for retail and venues.' },
    { title: 'Meeting Solutions', description: 'Interactive displays and collaboration tools.' },
    { title: 'Commercial Appliances', description: 'Reliable performance for hospitality needs.' },
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
