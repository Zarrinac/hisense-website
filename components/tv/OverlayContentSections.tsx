'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { ContentSectionData } from './ContentSections';

type OverlayContentSectionsProps = {
  sections: ContentSectionData[];
  isRTL?: boolean;
};

export default function OverlayContentSections({
  sections,
  isRTL = false,
}: OverlayContentSectionsProps) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(() => sections.map(() => false));

  useEffect(() => {
    const targets = [...refs.current];
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = [...prev];
          entries.forEach((entry) => {
            const indexAttr = (entry.target as HTMLElement).dataset.index;
            if (!indexAttr) return;
            const idx = Number(indexAttr);
            if (entry.isIntersecting) next[idx] = true;
          });
          return next;
        });
      },
      { threshold: 0.35 },
    );

    targets.forEach((el) => el && observer.observe(el));
    return () => {
      targets.forEach((el) => el && observer.unobserve(el));
      observer.disconnect();
    };
  }, [sections]);

  return (
    <div className="w-full mx-auto space-y-12 max-w-360 md:space-y-16" dir={isRTL ? 'rtl' : 'ltr'}>
      {sections.map((section, idx) => {
        const requestedSide = section.textPosition ?? (idx % 2 === 0 ? 'left' : 'right');
        const isTextLeft = isRTL ? requestedSide === 'right' : requestedSide === 'left';
        const gradient = isTextLeft === true ? '' : '';
        const textAlign = isTextLeft ? 'items-start' : 'items-end';
        const textOffset = isTextLeft ? '-translate-x-6' : 'translate-x-6';
        const show = visible[idx];

        return (
          <div
            key={`${section.title}-${idx}`}
            data-index={idx}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            className="relative isolate overflow-hidden rounded-3xl border border-(--border-color) bg-black shadow-2xl aspect-21/9 min-h-[420px]"
          >
            <div className="absolute inset-0">
              <Image
                src={section.image}
                alt={section.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority={idx === 0}
              />
            </div>
            <div className={`absolute inset-0 ${gradient}`} />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/5" />
            <div
              className={`relative z-10 flex h-full w-full items-center px-5 py-10 sm:px-10 lg:px-16 ${isTextLeft ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[400px] space-y-4 text-white drop-shadow-[0_14px_32px_rgba(0,0,0,0.65)] transition-all duration-900 ease-out ${
                  show
                    ? 'opacity-100 translate-y-0 translate-x-0'
                    : `opacity-0 translate-y-4 ${textOffset}`
                } ${textAlign}`}
                style={{ transitionDelay: show ? '140ms' : '0ms' }}
              >
                <h3 className="text-xl font-black leading-tight sm:text-2xl lg:text-3xl">
                  {section.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/85 sm:text-base lg:text-lg">
                  {section.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
