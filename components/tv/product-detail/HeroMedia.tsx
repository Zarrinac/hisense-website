import Image, { type StaticImageData } from 'next/image';

type HeroMediaProps = {
  image: StaticImageData;
  posterImage?: StaticImageData;
  heroVideo?: string;
  alt: string;
};

const HeroMedia = ({ image, posterImage, heroVideo, alt }: HeroMediaProps) => (
  <div className="w-full mx-auto max-w-360">
    <div className="relative overflow-hidden bg-black shadow-2xl ring-1 ring-(--border-color)">
      <div className="relative w-full aspect-video">
        {heroVideo ? (
          <video
            className="object-cover w-full h-full"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={(posterImage ?? image).src}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
      </div>
    </div>
  </div>
);

export default HeroMedia;
