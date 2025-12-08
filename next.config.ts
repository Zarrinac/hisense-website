import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Base Next config wrapped with next-intl to inject locale support.
const nextConfig: NextConfig = {
  /* config options here */
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
