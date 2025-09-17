import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isDev ? '' : '/design',
  assetPrefix: isDev ? '' : '/design',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;