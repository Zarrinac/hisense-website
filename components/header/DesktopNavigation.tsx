'use client';

import Image from 'next/image';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/theme/ThemeToggle';
import Logo from '@/public/icons/hisense-logo-full.svg';
import { NavKey, SubMenuItem } from './navigationData';
import { useEffect, useRef, useState } from 'react';

const PROMO_MESSAGES: Record<
  NavKey | 'default',
  {
    fa: string;
    en: string;
  }
> = {
  tvAudio: {
    fa: 'تلویزیون‌ها و سیستم‌های صوتی هایسنس با کیفیت ULED و Mini-LED را ببینید.',
    en: 'Explore Hisense TVs and audio systems with breathtaking ULED/Mini-LED quality.',
  },
  airConditioner: {
    fa: 'کولرهای خانگی و سیستم‌های تهویه تجاری هایسنس برای هر اقلیم ایران.',
    en: 'Residential splits and commercial HVAC solutions tailored for every climate zone.',
  },
  homeAppliances: {
    fa: 'یخچال‌فریزرها و لباسشویی‌های هایسنس برای سبک زندگی مدرن شما.',
    en: 'Hisense refrigerators, freezers, and washing machines built for premium everyday living.',
  },
  dcode: {
    fa: "تلویزیون‌های هوشمند D'CODE با رابط فارسی و محتوای بومی.",
    en: "D'CODE smart TVs deliver localized content and a seamless Persian interface.",
  },
  about: {
    fa: 'درباره تاریخچه برند و مسئولیت‌پذیری اجتماعی هایسنس ایران بیشتر بدانید.',
    en: 'Learn how Hisense Iran drives innovation, sustainability, and local partnerships.',
  },
  support: {
    fa: 'مرکز تماس، گارانتی و شبکه خدمات پس از فروش در سراسر کشور در دسترس شماست.',
    en: 'Reach nationwide after-sales service, warranty support, and dealer assistance.',
  },
  default: {
    fa: 'درباره برند، خدمات مشتری و شبکه پشتیبانی ما بیشتر بدانید.',
    en: 'Choose a category to learn about the brand, services, and support network.',
  },
};

type LabeledNavItem = {
  key: NavKey;
  href: string;
  label: string;
};

type DesktopNavigationProps = {
  navItems: LabeledNavItem[];
  secondaryNavItems: LabeledNavItem[];
  locale: string;
  activeMenuKey: NavKey | null;
  onMenuKeyChange: (key: NavKey | null) => void;
  activeSubMenuItems: SubMenuItem[] | null;
  activeNavLabel: string;
  iconButtonClass: string;
  searchLabel: string;
  menuLabel: string;
  onOpenMobilePanel: () => void;
  themeDarkLabel: string;
  themeLightLabel: string;
};

export default function DesktopNavigation({
  navItems,
  secondaryNavItems,
  locale,
  activeMenuKey,
  onMenuKeyChange,
  activeSubMenuItems,
  activeNavLabel,
  iconButtonClass,
  searchLabel,
  menuLabel,
  onOpenMobilePanel,
  themeDarkLabel,
  themeLightLabel,
}: DesktopNavigationProps) {
  const [isHidden, setIsHidden] = useState(false);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const promoKey = (activeMenuKey ?? 'default') as keyof typeof PROMO_MESSAGES;
  const promoCopy = locale === 'fa' ? PROMO_MESSAGES[promoKey].fa : PROMO_MESSAGES[promoKey].en;
  const localeKey = locale === 'fa' ? 'fa' : 'en';
  const toLocalePath = (path: string) => {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `/${locale}${normalized}`;
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (activeMenuKey) {
        setIsHidden(false);
        lastScrollY = window.scrollY;
        return;
      }
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeMenuKey]);

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    const container = navContainerRef.current;
    if (!container) {
      onMenuKeyChange(null);
      return;
    }
    if (!(nextTarget instanceof Node)) {
      onMenuKeyChange(null);
      return;
    }
    if (!container.contains(nextTarget)) {
      onMenuKeyChange(null);
    }
  };

  return (
    <div
      ref={navContainerRef}
      className={`sticky top-0 z-40 w-full transform-gpu transition-[transform,opacity] duration-500 ease-in-out ${
        isHidden ? '-translate-y-[105%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
      onMouseLeave={handleMouseLeave}
    >
      <header className="relative flex h-20 items-center justify-between bg-(--surface-color) px-4 shadow-sm lg:px-11">
        <Link href="/" className="flex items-center">
          <Image
            alt="Hisense Logo"
            src={Logo}
            priority
            className={`block h-5 w-[92px] lg:h-6 lg:w-[117px] ${locale === 'fa' ? 'ml-12' : 'mr-12'}`}
          />
        </Link>

        <div className="hidden h-full w-full items-center lg:flex lg:justify-between">
          <nav className="h-full items-center text-sm text-(--default-black-font) lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={toLocalePath(item.href)}
                className="header-nav-link"
                onMouseEnter={() => onMenuKeyChange(item.key)}
                onFocus={() => onMenuKeyChange(item.key)}
                aria-haspopup="true"
                aria-expanded={activeMenuKey === item.key}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <nav className="h-full items-center text-sm text-(--default-black-font) lg:flex">
            {secondaryNavItems.map((item) => (
              <Link
                key={item.key}
                href={toLocalePath(item.href)}
                className="header-nav-link"
                onMouseEnter={() => onMenuKeyChange(item.key)}
                onFocus={() => onMenuKeyChange(item.key)}
                aria-haspopup="true"
                aria-expanded={activeMenuKey === item.key}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className={iconButtonClass}
            aria-label={searchLabel}
            title={searchLabel}
          >
            <SearchIcon fontSize="small" />
          </button>
          <ThemeToggle
            className={iconButtonClass}
            darkLabel={themeDarkLabel}
            lightLabel={themeLightLabel}
          />
          <LanguageSwitcher className={iconButtonClass} />
          <button
            type="button"
            className={`${iconButtonClass} lg:hidden`}
            aria-label={menuLabel}
            title={menuLabel}
            onClick={onOpenMobilePanel}
          >
            <MenuIcon fontSize="small" />
          </button>
        </div>
      </header>

      {activeSubMenuItems && (
        <div className="header-submenu-panel hidden px-4 lg:block">
          <div className="mx-auto flex max-w-6xl gap-10 px-7 py-7">
            <div className="max-w-xs">
              <p className="text-xs uppercase tracking-[0.4em] text-(--text-subtle-color)">
                Explore
              </p>
              <p className="mt-3 text-2xl font-semibold text-(--brand-color)">{activeNavLabel}</p>

              <p className="mt-2 text-sm text-(--text-muted-color)">{promoCopy}</p>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-6">
              {activeSubMenuItems.map((subItem) => (
                <Link
                  key={subItem.title.en}
                  href={`/${locale}${subItem.href}`}
                  className="header-submenu-card focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-(--brand-color)"
                >
                  <p className="text-base font-semibold text-(--default-black-font)">
                    {subItem.title[localeKey]}
                  </p>
                  <p className="mt-2 text-sm text-(--text-muted-color)">
                    {subItem.description[localeKey]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
