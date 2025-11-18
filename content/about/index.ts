import type { Locale } from '@/i18n/routing';
import type { AboutPageContent } from './types';
import faContent from './fa.json';
import enContent from './en.json';

const ABOUT_CONTENT_MAP: Record<Locale, AboutPageContent> = {
  fa: faContent as AboutPageContent,
  en: enContent as AboutPageContent,
};

export function getAboutContent(locale: Locale): AboutPageContent {
  return ABOUT_CONTENT_MAP[locale] ?? ABOUT_CONTENT_MAP.fa;
}
