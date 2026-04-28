import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import OfficialLinksSection from '@/components/seo/OfficialLinksSection';
import ServiceCenterFinder from '@/components/service-centers/ServiceCenterFinder';
import { loadServiceCenterData, normalizeServiceCenterFilters } from '@/lib/serviceCenterSource';
import { routing, type Locale } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hisense-ir.com';

const PAGE_CONTENT = {
  fa: {
    title: 'نزدیک‌ترین نماینده خدمات به خود را پیدا کنید',
    description:
      'لیست نمایندگان رسمی خدمات پس از فروش صنایع زرین نمای کاسپین شامل اطلاعات تماس و آدرس نمایندگان مجاز در سراسر کشور است. با انتخاب شهر و نوع فعالیت، نزدیک‌ترین نمایندگی خدمات هایسنس را پیدا کنید.',
    table: {
      provinceLabel: 'استان',
      cityLabel: 'شهر',
      serviceKindLabel: 'نوع فعالیت',
      allCities: 'همه شهرها',
      allServiceKinds: 'همه فعالیت‌ها',
      provincePlaceholder: '-- انتخاب استان --',
      cityPlaceholder: '-- ابتدا استان را انتخاب کنید --',
      serviceKindPlaceholder: '-- انتخاب فعالیت --',
      submitLabel: 'نمایش مشخصات',
      resetLabel: 'پاک کردن فیلترها',
      resultCount: '{count} نماینده',
      emptyTitle: 'نماینده‌ای با این فیلترها پیدا نشد.',
      emptyDescription: 'لطفاً استان، شهر یا نوع فعالیت دیگری را انتخاب کنید.',
      noDataTitle: 'اطلاعات نمایندگان هنوز ثبت نشده است.',
      noDataDescription:
        'ساختار جدول و فیلترها آماده است. پس از دریافت اطلاعات رسمی نمایندگان خدمات، ردیف‌ها در همین بخش نمایش داده می‌شوند.',
      initialTitle: 'برای مشاهده نمایندگان، فیلترها را انتخاب کنید.',
      initialDescription:
        'استان و نوع فعالیت موردنظر را انتخاب کنید و روی نمایش مشخصات بزنید. در صورت خالی گذاشتن فیلترها، همه نمایندگان نمایش داده می‌شوند.',
      headers: {
        province: 'استان',
        city: 'شهر',
        serviceKind: 'نوع فعالیت نماینده',
        representativeName: 'نام و نام خانوادگی',
        representativeCode: 'کد نمایندگی',
        primaryPhone: 'شماره اصلی',
        mobilePhone: 'شماره همراه',
        address: 'آدرس',
      },
    },
    officialLinks: {
      eyebrow: 'مسیرهای مرتبط',
      title: 'لینک‌های خدمات و پشتیبانی',
      items: [
        {
          href: '/hisense-repair',
          label: 'خدمات تعمیر و پشتیبانی',
          description: 'ثبت درخواست و آشنایی با خدمات رسمی محصولات Hisense.',
        },
        {
          href: '/portal',
          label: 'پرتال نمایندگان خدمات',
          description: 'دسترسی نمایندگان خدمات پس از فروش به پرتال رسمی.',
        },
        {
          href: '/request-representation',
          label: 'درخواست نمایندگی خدمات',
          description: 'ارسال درخواست همکاری برای نمایندگی خدمات پس از فروش.',
        },
        {
          href: '/contact-us',
          label: 'تماس با پشتیبانی',
          description: 'راه‌های رسمی ارتباط با امور مشتریان و خدمات.',
        },
      ],
    },
  },
  en: {
    title: 'Find the nearest service representative',
    description:
      'Find official Zarrin Namaye Caspian after-sales service representatives across Iran. Filter by city and service type to locate the nearest authorized Hisense service center.',
    table: {
      provinceLabel: 'Province',
      cityLabel: 'City',
      serviceKindLabel: 'Service type',
      allCities: 'All cities',
      allServiceKinds: 'All service types',
      provincePlaceholder: '-- Select province --',
      cityPlaceholder: '-- Select province first --',
      serviceKindPlaceholder: '-- Select service type --',
      submitLabel: 'Show details',
      resetLabel: 'Clear filters',
      resultCount: '{count} representatives',
      emptyTitle: 'No representatives match these filters.',
      emptyDescription: 'Please choose another province, city, or service type.',
      noDataTitle: 'Representative data has not been added yet.',
      noDataDescription:
        'The table and filters are ready. Official service representative rows will appear here after the data is provided.',
      initialTitle: 'Choose filters to view representatives.',
      initialDescription:
        'Select a province and service type, then choose Show details. Leave filters empty to show all representatives.',
      headers: {
        province: 'Province',
        city: 'City',
        serviceKind: 'Service type',
        representativeName: 'Representative name',
        representativeCode: 'Representative code',
        primaryPhone: 'Primary phone',
        mobilePhone: 'Mobile',
        address: 'Address',
      },
    },
    officialLinks: {
      eyebrow: 'Related paths',
      title: 'Service and support links',
      items: [
        {
          href: '/hisense-repair',
          label: 'Repair and support',
          description: 'Request support and learn about official Hisense service.',
        },
        {
          href: '/portal',
          label: 'Service representative portal',
          description: 'Official portal access for after-sales service representatives.',
        },
        {
          href: '/request-representation',
          label: 'Request service representation',
          description: 'Apply to become an after-sales service representative.',
        },
        {
          href: '/contact-us',
          label: 'Contact support',
          description: 'Official channels for customer care and service.',
        },
      ],
    },
  },
} satisfies Record<Locale, unknown>;

type FindServiceCenterPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function firstSearchValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const routeTranslations = await getTranslations('Routes.findServiceCenter');
  const localizedPath = `/${locale}/find-service-center`;
  const languageAlternates = routing.locales.reduce<Record<string, string>>((acc, lang) => {
    acc[lang] = `${SITE_URL}/${lang}/find-service-center`;
    return acc;
  }, {});
  languageAlternates['x-default'] = `${SITE_URL}/${routing.defaultLocale}/find-service-center`;

  return {
    title: routeTranslations('title'),
    description: routeTranslations('description'),
    alternates: {
      canonical: localizedPath,
      languages: languageAlternates,
    },
    openGraph: {
      title: routeTranslations('title'),
      description: routeTranslations('description'),
      url: `${SITE_URL}${localizedPath}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: routeTranslations('title'),
      description: routeTranslations('description'),
    },
  };
}

export default async function FindServiceCenterPage({ searchParams }: FindServiceCenterPageProps) {
  const locale = (await getLocale()) as Locale;
  const content = PAGE_CONTENT[locale];
  const isRTL = locale === 'fa';
  const resolvedSearchParams = (await searchParams) ?? {};
  const hasSearched = firstSearchValue(resolvedSearchParams.submitted) === '1';
  const selectedFilters = normalizeServiceCenterFilters({
    provinceId: firstSearchValue(resolvedSearchParams.province),
    cityId: firstSearchValue(resolvedSearchParams.city),
    serviceKind: firstSearchValue(resolvedSearchParams.service),
  });
  const serviceCenterData = await loadServiceCenterData(locale, selectedFilters, hasSearched);
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: content.title,
    description: content.description,
    url: `${SITE_URL}/${locale}/find-service-center`,
    inLanguage: locale === 'fa' ? 'fa-IR' : 'en-US',
  };
  const resolveHref = (href: string) => (href.startsWith('/') ? `/${locale}${href}` : href);

  return (
    <div className="space-y-10 pb-16 pt-10 sm:space-y-12 sm:pt-14" dir={isRTL ? 'rtl' : 'ltr'}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <section className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-(--default-black-font) sm:text-4xl">
          {content.title}
        </h1>
        <p className="mx-auto mt-5 max-w-4xl text-sm leading-7 text-(--text-muted-color) sm:text-base sm:leading-8">
          {content.description}
        </p>
      </section>

      <ServiceCenterFinder
        locale={locale}
        centers={serviceCenterData.centers}
        locations={serviceCenterData.locations}
        copy={content.table}
        selectedFilters={selectedFilters}
        hasSearched={hasSearched}
        totalCount={serviceCenterData.totalCount}
      />

      <OfficialLinksSection
        locale={locale}
        eyebrow={content.officialLinks.eyebrow}
        title={content.officialLinks.title}
        items={content.officialLinks.items.map((item) => ({
          ...item,
          href: resolveHref(item.href),
        }))}
      />
    </div>
  );
}
