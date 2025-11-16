import Image from 'next/image';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/theme/ThemeToggle';
import Logo from '@/public/icons/hisense-logo-full.svg';
import { NavKey, SubMenuItem } from './navigationData';

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
  return (
    <div className="relative z-40" onMouseLeave={() => onMenuKeyChange(null)}>
      <header className="relative flex h-20 items-center justify-between bg-(--surface-color) px-4 shadow-sm lg:px-11">
        <div className="flex items-center">
          <Image
            alt="Hisense Logo"
            src={Logo}
            priority
            className={`block h-5 w-[92px] lg:h-6 lg:w-[117px] ${locale === 'fa' ? 'ml-12' : 'mr-12'}`}
          />
        </div>

        <div className="hidden h-full w-full items-center lg:flex lg:justify-between">
          <nav className="h-full items-center text-sm text-(--default-black-font) lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
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
                href={item.href}
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
              <p className="mt-2 text-sm text-(--text-muted-color)">
                Discover top categories and start building your perfect setup.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-6">
              {activeSubMenuItems.map((subItem) => (
                <div key={subItem.title} className="header-submenu-card">
                  <p className="text-base font-semibold text-(--default-black-font)">
                    {subItem.title}
                  </p>
                  <p className="mt-2 text-sm text-(--text-muted-color)">{subItem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
