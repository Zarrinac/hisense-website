import Image from 'next/image';
import type { TvBanner } from '@/types/tv';
import Breadcrumbs, { type BreadcrumbItem } from './Breadcrumbs';

// Hero banner for TV detail pages with breadcrumb trail and size badges.

type BannerSectionProps = {
  banner: TvBanner;
  breadcrumbItems: BreadcrumbItem[];
  lang: 'fa' | 'en';
  seriesDisplay: string;
  availableSizes: string[];
  copyName: string;
};

const BannerSection = ({
  banner,
  breadcrumbItems,
  lang,
  seriesDisplay,
  availableSizes,
  copyName,
}: BannerSectionProps) => (
  <div className="-mx-4 sm:-mx-6 lg:-mx-10 max-w-480">
    <div key={banner.id} className="relative min-w-0 flex-[0_0_100%]">
      <div className="relative w-full aspect-9/16 md:aspect-video lg:aspect-21/9">
        <Image
          src={banner.desktop}
          alt={banner.alt}
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          priority
          loading="eager"
          placeholder="blur"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-transparent" />
        <div
          className={`absolute inset-0 hidden sm:flex flex-col justify-between sm:pl-16 sm:pt-4 5xl:pt-28 5xl:pl-28 text-white ${
            lang === 'fa' ? 'items-end text-right' : 'items-start text-left'
          }`}
        >
          <Breadcrumbs
            items={breadcrumbItems}
            lang={lang}
            className="text-[10px] sm:text-xs md:text-sm font-semibold"
            separatorClassName="opacity-70"
          />
          <div className="space-y-2 lg:space-y-3 max-w-4xl h-full flex flex-col justify-center 5xl:pl-36">
            <h1 className="text-2xl font-black leading-tight md:text-[32px] lg:text-[40px] 3xl:text-5xl 5xl:text-[58px] drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
              {seriesDisplay || copyName}
            </h1>
            {availableSizes.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="inline-flex h-3 w-5 items-center justify-center rounded-full bg-(--brand-color) border border-(--brand-color)" />
                <ul className="flex flex-wrap items-center gap-4 text-xs md:text-base 5xl:text-2xl font-semibold">
                  {availableSizes.map((size, idx) => (
                    <li key={`${size}-${idx}`} className="flex items-center gap-2">
                      <span>{size}</span>
                      {idx < availableSizes.length - 1 && (
                        <span aria-hidden className="opacity-70">
                          |
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BannerSection;
