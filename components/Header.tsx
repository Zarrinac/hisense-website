'use client';

import Image from 'next/image';
import Link from 'next/link';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Logo from '@/public/icons/hisense-logo.svg';

const NAV_ITEMS = [
  { key: 'tvAudio', href: '#tv-audio' },
  { key: 'laserTv', href: '#laser-tv' },
  { key: 'homeAppliances', href: '#home-appliances' },
  { key: 'b2b', href: '#b2b' },
  { key: 'about', href: '#about' },
  { key: 'support', href: '#support' },
] as const;

export default function Header() {
  const t = useTranslations('Header');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    if (isPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isPanelOpen]);

  const navItems = useMemo(
    () =>
      NAV_ITEMS.map((item) => ({
        ...item,
        label: t(`navigation.items.${item.key}`),
      })),
    [t],
  );

  const iconButtonClass =
    'inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-[var(--brand-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-color)] disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200';

  return (
    <>
      <header className="relative z-40 flex h-20 items-center justify-between bg-white px-4 shadow-sm dark:bg-slate-950 lg:px-10">
        <div className="flex items-center gap-3">
          <Image
            alt="Hisense Logo"
            src={Logo}
            priority
            className="h-5 w-[92px] lg:h-6 lg:w-[117px]"
          />
        </div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 lg:flex">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href} className="transition hover:text-(--brand-color)">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className={iconButtonClass}
            aria-label={t('actions.search')}
            title={t('actions.search')}
          >
            <SearchIcon fontSize="small" />
          </button>
          <LanguageSwitcher />
          <button
            type="button"
            className={`${iconButtonClass} lg:hidden`}
            aria-label={t('actions.menu')}
            title={t('actions.menu')}
            onClick={() => setIsPanelOpen(true)}
          >
            <MenuIcon fontSize="medium" />
          </button>
        </div>
      </header>

      {isPanelOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsPanelOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative ml-auto flex h-full w-full max-w-md flex-col bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <Image alt="Hisense Logo" src={Logo} className="h-5 w-[92px]" priority />
              <button
                type="button"
                className={iconButtonClass}
                onClick={() => setIsPanelOpen(false)}
                aria-label={t('actions.close')}
                title={t('actions.close')}
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>
            <nav className="mt-10 flex flex-col gap-6 text-lg font-semibold text-slate-900">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="flex items-center justify-between border-b border-slate-100 pb-4 transition hover:text-(--brand-color)"
                  onClick={() => setIsPanelOpen(false)}
                >
                  {item.label}
                  <ChevronRightIcon />
                </a>
              ))}
            </nav>
            <div className="mt-auto pt-10">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-(--brand-color)"
              >
                {t('actions.search')}
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
