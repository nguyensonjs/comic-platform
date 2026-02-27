import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.otruyenapi.com',
        pathname: '/uploads/comics/**',
      },
    ],
  },
};

export default nextConfig;
