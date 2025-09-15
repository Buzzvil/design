import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: '/design',
  basePath: '/design',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;