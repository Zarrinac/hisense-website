'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { BreadcrumbItem } from '@/components/tv/product-detail/Breadcrumbs';
import Breadcrumbs from '@/components/tv/product-detail/Breadcrumbs';
import type { ImageSource } from '@/types/tv';

type RefrigeratorHeroProps = {
  locale: string;
  lang: 'fa' | 'en';
  breadcrumbItems: BreadcrumbItem[];
  productName: string;
  seriesDisplay: string;
  tagline?: string;
  gallery: ImageSource[];
};

export default function RefrigeratorHero({
  lang,
  breadcrumbItems,
  productName,
  seriesDisplay,
  tagline,
  gallery,
}: RefrigeratorHeroProps) {
  const images = useMemo(
    () => (Array.isArray(gallery) && gallery.length > 0 ? gallery : []),
    [gallery],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <section className="w-full">
      <div className="w-full mx-auto max-w-360 px-6 sm:px-8 lg:px-10">
        <Breadcrumbs
          items={breadcrumbItems}
          lang={lang}
          className="text-[10px] sm:text-xs md:text-sm font-semibold"
          separatorClassName="opacity-60"
        />

        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
          <div>
            <div className="relative w-full aspect-3/4 rounded-3xl bg-[linear-gradient(135deg,#fafafa,#eef1f4)] shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
              {activeImage && (
                <Image
                  src={activeImage}
                  alt={productName}
                  fill
                  sizes="(min-width: 1024px) 48vw, 90vw"
                  className="object-contain p-3 sm:p-4 md:p-5"
                  priority
                />
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {images.map((image, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={`${productName}-thumb-${idx}`}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`relative h-14 w-14 overflow-hidden rounded-xl border ${
                        isActive ? 'border-(--brand-color)' : 'border-black/10'
                      }`}
                      aria-label={`Select image ${idx + 1}`}
                    >
                      <Image
                        src={image}
                        alt={`${productName} thumbnail ${idx + 1}`}
                        fill
                        sizes="64px"
                        className="object-contain bg-white/80 p-2"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className={lang === 'fa' ? 'text-right' : 'text-left'}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--text-muted-color)">
              {seriesDisplay}
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight text-(--text-color) sm:text-4xl lg:text-5xl">
              {productName}
            </h1>
            {tagline && (
              <p className="mt-4 text-base leading-relaxed text-(--text-muted-color) sm:text-lg">
                {tagline}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
