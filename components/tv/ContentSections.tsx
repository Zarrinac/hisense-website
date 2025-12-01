'use client';

import { useEffect, useRef, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';

export type ContentSectionData = {
  image: StaticImageData;
  title: string;
  text: string;
  textPosition?: 'left' | 'right';
};

type ContentSectionsProps = {
  sections: ContentSectionData[];
  isRTL?: boolean;
};

export default function ContentSections({ sections, isRTL = false }: ContentSectionsProps) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(() => sections.map(() => false));

  useEffect(() => {
    const elements = [...refs.current];
    const observer = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = [...prev];
          entries.forEach((entry) => {
            const indexAttr = (entry.target as HTMLElement).dataset.index;
            if (!indexAttr) return;
            const idx = Number(indexAttr);
            if (entry.isIntersecting) {
              next[idx] = true;
            }
          });
          return next;
        });
      },
      { threshold: 0.5 },
    );

    elements.forEach((el) => el && observer.observe(el));
    return () => {
      elements.forEach((el) => el && observer.unobserve(el));
      observer.disconnect();
    };
  }, [sections.length]);

  return (
    <div className="w-full mx-auto space-y-10 max-w-360 md:space-y-14">
      {sections.map((section, idx) => {
        const isImageRightBase = idx % 2 === 0;
        const isImageRight = isRTL ? !isImageRightBase : isImageRightBase;
        const show = visible[idx];
        const textOffset = isImageRight ? '-translate-x-10' : 'translate-x-10';
        const imageOffset = isImageRight ? 'translate-x-10' : '-translate-x-10';
        return (
          <div
            key={`${section.title}-${idx}`}
            data-index={idx}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            className={`flex flex-col items-center gap-6 ${
              isImageRight ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div
              className={`flex-1 space-y-3 md:space-y-4 transition-all duration-1100 ease-out ${
                show ? 'opacity-100 translate-x-0' : `opacity-0 ${textOffset}`
              }`}
            >
              <h3 className="text-xl font-bold md:text-2xl">{section.title}</h3>
              <p className="text-sm leading-relaxed text-(--text-muted-color) md:text-base">
                {section.text}
              </p>
            </div>
            <div
              className={`flex-1 overflow-hidden rounded-3xl border border-(--border-color) bg-(--surface-color-2) shadow-sm transition-all duration-1100 ease-out ${
                show ? 'opacity-100 translate-x-0' : `opacity-0 ${imageOffset}`
              }`}
            >
              <Image
                src={section.image}
                alt={section.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
