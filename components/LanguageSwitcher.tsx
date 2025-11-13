'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { type Locale } from '@/i18n/routing';
import LanguageIcon from '@mui/icons-material/Language';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('LanguageSwitcher');
  const [isPending, startTransition] = useTransition();

  const nextLocale: Locale = locale === 'fa' ? 'en' : 'fa';

  const toggleLocale = () => {
    startTransition(() => {
      router.replace({ pathname }, { locale: nextLocale });
    });
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      disabled={isPending}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-(--brand-color) focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--brand-color) disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      aria-label={`${t('label')} ${t(`options.${nextLocale}`)}`}
      title={`${t('label')} ${t(`options.${nextLocale}`)}`}
    >
      <LanguageIcon fontSize="small" />
    </button>
  );
}
