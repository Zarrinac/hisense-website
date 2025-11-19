import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';
import { HiArrowLongRight } from 'react-icons/hi2';

export type SpotlightCard = {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  image: StaticImageData;
};

type CategorySpotlightsProps = {
  eyebrow?: string;
  title: string;
  items: SpotlightCard[];
  locale?: string;
};

export default function CategorySpotlights({
  eyebrow,
  title,
  items,
  locale,
}: CategorySpotlightsProps) {
  if (!items.length) {
    return null;
  }

  const isRTL = locale === 'fa';

  return (
    <section className="bg-(--background-color) py-16 text-(--default-black-font) lg:py-24">
      <div className="mx-auto flex flex-col gap-10 md:px-12">
        <header className="text-center">
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.45em] text-(--text-subtle-color)">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        </header>

        <div className="flex flex-col">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="mb-2.5 group relative block focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-(--brand-color)"
              aria-label={`${item.cta} - ${item.title}`}
            >
              <div className="relative w-full overflow-hidden bg-black aspect-25/32 md:aspect-56/25">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  sizes="100vw"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 group-hover:from-black/60 group-hover:via-black/20" />

                <div className="relative z-10 flex h-full flex-col justify-between text-white p-4 lg:p-8 2xl:p-10">
                  <h3 className="text-xl font-semibold sm:text-2xl lg:text-4xl text-center">
                    {item.title}
                  </h3>
                  <div className="flex flex-col gap-4 2xl:gap-6 4xl:gap-10">
                    <p className="max-w-2xl text-lg text-white/90 md:font-semibold md:text-xl lg:text-2xl 2xl:text-3xl 4xl:text-4xl">
                      {item.description}
                    </p>
                    <span
                      className={`inline-flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} w-fit items-center gap-2 rounded-full bg-transparent px-3 md:px-5 py-2 md:py-3 text-sm lg:text-lg 4xl:text-3xl font-semibold uppercase tracking-wide border-2 border-(--default-white-font) text-(--default-white-font) transition group-hover:bg-white group-hover:text-(--default-black-font)`}
                    >
                      {item.cta}
                      <HiArrowLongRight
                        className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 4xl:h-8 4xl:w-8"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
