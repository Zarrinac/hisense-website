'use client';

import Image, { type StaticImageData } from 'next/image';
import { useTheme } from '@/components/theme/ThemeProvider';

type FeatureCardImageProps = {
  title: string;
  image: StaticImageData;
  imageBlack?: StaticImageData;
  className: string;
};

export default function FeatureCardImage({
  title,
  image,
  imageBlack,
  className,
}: FeatureCardImageProps) {
  const { theme, isReady } = useTheme();
  const showDarkVariant = isReady && theme === 'dark' && imageBlack;
  const src = showDarkVariant ? imageBlack! : image;

  return <Image src={src} alt={title} className={className} />;
}
