import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true, // use true (308) for production
      },
    ];
  },
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
