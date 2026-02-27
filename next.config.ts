import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.otruyenapi.com',
      },
      {
        protocol: 'https',
        hostname: '**.otruyencdn.com',
      },
    ],
  },
};

export default nextConfig;
