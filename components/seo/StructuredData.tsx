'use client';

import { OrganizationJsonLd, ProductJsonLd } from 'next-seo';
import type { Locale } from '@/i18n/routing';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.hisense-ir.com';
const LOGO_URL = `${SITE_URL}/favicon.svg`;

const ORGANIZATION_CONTENT = {
  fa: {
    name: 'شرکت صنایع زرین نمای کاسپین',
    description:
      'تنها نماینده رسمی هایسنس در ایران با شبکه فروش و خدمات پس از فروش سراسری برای محصولات خانگی و صنعتی.',
  },
  en: {
    name: 'Zarrin Namaye caspian Industries',
    description:
      'Exclusive Hisense distributor in Iran delivering nationwide sales and after-sales service for consumer electronics and HVAC systems.',
  },
};

const PRODUCT_CONTENT = {
  fa: {
    name: 'کولر گازی و تهویه مطبوع هایسنس',
    description:
      'عرضه رسمی کولر گازی، داکت اسپلیت و تهویه مطبوع خانگی و صنعتی هایسنس با گارانتی زرین نمای کاسپین و پوشش خدمات پس از فروش سراسری.',
  },
  en: {
    name: 'Hisense Residential & Commercial HVAC Systems',
    description:
      'Official distribution of Hisense split AC, duct AC, and commercial HVAC solutions across Iran with certified after-sales coverage.',
  },
};

type StructuredDataProps = {
  locale: Locale;
};

export default function StructuredData({ locale }: StructuredDataProps) {
  const orgContent = ORGANIZATION_CONTENT[locale];
  const productContent = PRODUCT_CONTENT[locale];

  return (
    <>
      <OrganizationJsonLd
        type="Organization"
        name={orgContent.name}
        legalName={orgContent.name}
        url={SITE_URL}
        logo={LOGO_URL}
        identifier={`${SITE_URL}#organization`}
        sameAs={[
          'https://www.instagram.com/hisenseiran',
          'https://www.linkedin.com/company/zarrin-namaye-caspian',
        ]}
        description={orgContent.description}
        contactPoint={[
          {
            contactType: 'customer service',
            telephone: '+98-21-72133',
          },
        ]}
        address={{
          streetAddress: 'Kameliya Dead end, Sasanipour St.',
          addressLocality: 'Tehran',
          addressRegion: 'Tehran',
          postalCode: '1994736431',
          addressCountry: 'IR',
        }}
      />

      <ProductJsonLd
        type="Product"
        name={productContent.name}
        description={productContent.description}
        brand={{ name: 'Hisense' }}
        manufacturer={{
          name: 'Hisense',
          logo: LOGO_URL,
        }}
        sku="hisense-hvac"
        mpn="hisense-hvac"
        image={`${SITE_URL}/banner/Fix-Banner-07.jpg`}
        offers={[
          {
            price: '0.00',
            priceCurrency: 'IRR',
            availability: 'https://schema.org/PreOrder',
            url: `${SITE_URL}/${locale}`,
            itemCondition: 'https://schema.org/NewCondition',
            seller: {
              name: ORGANIZATION_CONTENT.en.name,
            },
          },
        ]}
        aggregateRating={{
          ratingValue: 5,
          reviewCount: 25,
        }}
      />
    </>
  );
}
