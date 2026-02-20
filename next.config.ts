import type { NextConfig } from "next";

const basePath = '/design';
const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://design.buzzvil.com';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_ORIGIN: siteOrigin,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;