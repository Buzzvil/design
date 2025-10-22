import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // basePath: '/design',
  // assetPrefix: '/design',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;