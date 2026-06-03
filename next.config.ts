import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

type RemotePattern = { protocol: 'http' | 'https'; hostname: string; pathname?: string };

// Base Next config wrapped with next-intl to inject locale support.
const remotePatterns: RemotePattern[] = [
  { protocol: 'http', hostname: 'www.hisense-ir.com' },
  { protocol: 'https', hostname: 'www.hisense-ir.com' },
];

const mediaBase = process.env.NEXT_PUBLIC_MEDIA_BASE_URL;
if (mediaBase) {
  try {
    const mediaUrl = new URL(mediaBase);
    const host = mediaUrl.hostname;
    const protocols =
      mediaUrl.protocol === 'http:'
        ? ['http']
        : mediaUrl.protocol === 'https:'
          ? ['https']
          : ['http', 'https'];
    protocols.forEach((protocol) => {
      if (
        !remotePatterns.some(
          (pattern) => pattern.hostname === host && pattern.protocol === protocol,
        )
      ) {
        remotePatterns.push({ protocol: protocol as 'http' | 'https', hostname: host });
      }
    });
  } catch {
    // ignore invalid media base; fall back to default host list
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
