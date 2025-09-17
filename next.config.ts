import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // basePath: '/design', // Commented out for local development
  // assetPrefix: '/design', // Commented out for local development
  images: {
    unoptimized: true,
  },
};

export default nextConfig;