import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/design',
  assetPrefix: '/design',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;